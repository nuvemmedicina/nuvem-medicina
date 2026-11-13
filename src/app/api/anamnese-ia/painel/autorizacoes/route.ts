import { NextRequest, NextResponse } from 'next/server'
import { gestorPeloCodigo } from '@/lib/anamnese-ia/acesso'
import { sanity } from '@/lib/anamnese-ia/servidor'
import { todosRegistros, verificarCorrente, type RegistroAutorizacao } from '@/lib/anamnese-ia/autorizacao'

/**
 * Registro das autorizações de uso de imagem em CSV, para o arquivo da ISO.
 * GET ?c=<código do painel>. Separador ";" e BOM, para abrir certo no Excel.
 */
export const dynamic = 'force-dynamic'

const COLUNAS: [string, (r: RegistroAutorizacao, ok: boolean) => string][] = [
  ['Registro',               r => r._id],
  ['Tipo',                   r => r.tipo === 'aceite' ? 'Aceite' : 'Revogação'],
  ['Nome completo',          r => r.nomeCompleto],
  ['Registro profissional',  r => r.registro],
  ['Slug',                   r => r.slug],
  ['Versão do termo',        r => r.termoVersao],
  ['SHA-256 do texto aceito', r => r.termoSha256],
  ['Data e hora (Brasília)', r => new Date(r.em).toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })],
  ['Data e hora (UTC)',      r => r.em],
  ['Foto',                   r => r.fotoId ?? ''],
  ['IP (parcial)',           r => r.ipParcial],
  ['Registrado por',         r => r.registradoPor],
  ['Motivo',                 r => r.motivo ?? ''],
  ['Registro anterior',      r => r.anteriorId ?? ''],
  ['Hash anterior',          r => r.hashAnterior ?? ''],
  ['Hash',                   r => r.hash],
  ['Corrente íntegra',       (_, ok) => ok ? 'Sim' : 'NÃO: conferir'],
]

const celula = (v: string) => /[";\n\r]/.test(v) || /^[=+\-@]/.test(v) ? `"${(/^[=+\-@]/.test(v) ? `'${v}` : v).replace(/"/g, '""')}"` : v

export async function GET(req: NextRequest) {
  if (!gestorPeloCodigo(req.nextUrl.searchParams.get('c'))) return new NextResponse('Sem acesso', { status: 403 })
  const client = sanity()
  if (!client) return new NextResponse('Servidor sem configuração', { status: 503 })

  const registros = await todosRegistros(client)
  const porEscopo = new Map<string, RegistroAutorizacao[]>()
  for (const r of registros) porEscopo.set(r.escopo, [...(porEscopo.get(r.escopo) ?? []), r])
  const integro = new Map([...porEscopo].map(([e, rs]) => [e, verificarCorrente(rs).ok]))

  const linhas = [
    COLUNAS.map(([t]) => t).join(';'),
    ...registros.map(r => COLUNAS.map(([, f]) => celula(f(r, integro.get(r.escopo) ?? false))).join(';')),
  ]
  const hoje = new Date().toLocaleDateString('sv-SE', { timeZone: 'America/Sao_Paulo' })
  return new NextResponse(`﻿${linhas.join('\r\n')}\r\n`, {
    headers: {
      'Content-Type': 'text/csv; charset=utf-8',
      'Content-Disposition': `attachment; filename="autorizacoes-uso-de-imagem-${hoje}.csv"`,
      'Cache-Control': 'private, no-store',
    },
  })
}
