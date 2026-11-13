import { NextRequest, NextResponse } from 'next/server'
import { autorizar } from '@/lib/anamnese-ia/acesso'
import { sanity, idAleatorio, ipParcial } from '@/lib/anamnese-ia/servidor'
import { docPaginaId, type Decisao } from '@/lib/anamnese-ia/pagina'
import { carregarProfissional } from '@/lib/anamnese-ia/pagina-servidor'

/**
 * Aprovação da página pelo profissional (link /anamnese-ia/medico/<slug>/aprovacao).
 *
 * GET  ?escopo=&c=   prévia: texto atual, foto da página e situação
 * POST { escopo, c, acao: 'aprovar' | 'ajustes', textoVersao, fotoId, pedido? }
 *
 * A decisão só vale para a versão exata que a pessoa viu: se o texto ou a
 * foto mudaram nesse meio-tempo, o servidor recusa e pede para recarregar.
 */
export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const escopo = req.nextUrl.searchParams.get('escopo')
  const erro = autorizar(escopo, req.nextUrl.searchParams.get('c'))
  if (erro || !escopo?.startsWith('medico-')) return NextResponse.json({ erro: erro ?? 'Escopo inválido' }, { status: 403 })
  const client = sanity()
  if (!client) return NextResponse.json({ erro: 'Servidor sem configuração' }, { status: 503 })
  const { situacao: s } = await carregarProfissional(client, escopo)
  return NextResponse.json({
    etapa: s.etapa, rotulo: s.rotulo,
    texto: s.texto ? { versao: s.texto.versao, conteudo: s.texto.conteudo, em: s.texto.em } : null,
    fotoId: s.fotoId,
    prontaParaAprovar: s.aprovadaPelaClinica && !!s.texto,
    decisaoAtual: s.decisaoAtual ? { tipo: s.decisaoAtual.tipo, em: s.decisaoAtual.em, pedido: s.decisaoAtual.pedido ?? '' } : null,
    publicada: !!s.publicadaAtual,
  })
}

export async function POST(req: NextRequest) {
  let body: { escopo?: unknown; c?: unknown; acao?: unknown; textoVersao?: unknown; fotoId?: unknown; pedido?: unknown }
  try { body = await req.json() } catch { return NextResponse.json({ erro: 'JSON inválido' }, { status: 400 }) }
  const erro = autorizar(body.escopo, body.c)
  const escopo = body.escopo as string
  if (erro || !escopo.startsWith('medico-')) return NextResponse.json({ erro: erro ?? 'Escopo inválido' }, { status: 403 })
  if (body.acao !== 'aprovar' && body.acao !== 'ajustes') return NextResponse.json({ erro: 'Ação inválida' }, { status: 400 })
  const pedido = typeof body.pedido === 'string' ? body.pedido.trim().slice(0, 3000) : ''
  if (body.acao === 'ajustes' && !pedido) return NextResponse.json({ erro: 'Conte o que você quer ajustar.' }, { status: 400 })

  const client = sanity()
  if (!client) return NextResponse.json({ erro: 'Servidor sem configuração' }, { status: 503 })
  const { situacao: s } = await carregarProfissional(client, escopo)
  if (!s.texto || !s.aprovadaPelaClinica) return NextResponse.json({ erro: 'A página ainda não está pronta para aprovação.' }, { status: 409 })
  if (body.textoVersao !== s.texto.versao || (body.fotoId ?? null) !== s.fotoId) {
    return NextResponse.json({ erro: 'A página mudou enquanto você olhava. Recarregue para ver a versão nova.' }, { status: 409 })
  }

  const decisao: Decisao = {
    _key: idAleatorio(8),
    tipo: body.acao === 'aprovar' ? 'aprovou' : 'ajustes',
    textoVersao: s.texto.versao,
    textoSha256: s.texto.sha256,
    fotoId: s.fotoId,
    em: new Date().toISOString(),
    ...(pedido && body.acao === 'ajustes' ? { pedido } : {}),
    ipParcial: ipParcial(req),
  }
  const id = docPaginaId(escopo)
  await client.patch(id).setIfMissing({ decisoes: [] }).append('decisoes', [decisao]).commit({ visibility: 'sync' })
  return NextResponse.json({ ok: true, decisao: { tipo: decisao.tipo, em: decisao.em, pedido: decisao.pedido ?? '' } })
}
