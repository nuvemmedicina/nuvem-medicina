import { NextRequest, NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { escopoValido, codigoConfere, docId } from '@/lib/anamnese-ia/acesso'

/**
 * Salva e lê as respostas das páginas /anamnese-ia no Sanity (documentos
 * privados "anamnese-ia.<escopo>"). Exige o código de acesso do link.
 * Não guarda dados de pacientes: os formulários são sobre a clínica.
 */
export const dynamic = 'force-dynamic'

const LIMITE = 300_000 // caracteres do JSON

function sanity() {
  const token = process.env.SANITY_WRITE_TOKEN
  if (!token) return null
  return createClient({ projectId: 'q8ibxbuz', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token })
}

function autorizar(escopo: unknown, codigo: unknown) {
  if (typeof escopo !== 'string' || !escopoValido(escopo)) return 'Escopo inválido'
  if (typeof codigo !== 'string' || !codigoConfere(escopo, codigo)) return 'Código de acesso inválido'
  return null
}

type Doc = { escopo: string; dadosJson?: string; atualizadoEm?: string; finalizadoEm?: string }

export async function GET(req: NextRequest) {
  const escopo = req.nextUrl.searchParams.get('escopo')
  const erro = autorizar(escopo, req.nextUrl.searchParams.get('c'))
  if (erro) return NextResponse.json({ erro }, { status: 403 })
  const client = sanity()
  if (!client) return NextResponse.json({ erro: 'Servidor sem configuração' }, { status: 503 })
  try {
    const doc = await client.getDocument<Doc>(docId(escopo!))
    if (!doc?.dadosJson) return NextResponse.json({ existe: false })
    return NextResponse.json({ existe: true, dados: JSON.parse(doc.dadosJson), atualizadoEm: doc.atualizadoEm, finalizadoEm: doc.finalizadoEm ?? null })
  } catch (e) {
    console.error('[/api/anamnese-ia GET]', e)
    return NextResponse.json({ erro: 'Erro ao ler' }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  let body: { escopo?: unknown; c?: unknown; dados?: unknown; finalizar?: unknown }
  try { body = await req.json() } catch { return NextResponse.json({ erro: 'JSON inválido' }, { status: 400 }) }
  const erro = autorizar(body.escopo, body.c)
  if (erro) return NextResponse.json({ erro }, { status: 403 })
  const dadosJson = JSON.stringify(body.dados ?? null)
  if (dadosJson.length > LIMITE) return NextResponse.json({ erro: 'Respostas grandes demais' }, { status: 413 })
  const client = sanity()
  if (!client) return NextResponse.json({ erro: 'Servidor sem configuração' }, { status: 503 })

  const escopo = body.escopo as string
  const id = docId(escopo)
  const agora = new Date().toISOString()
  try {
    await client.transaction()
      .createIfNotExists({ _id: id, _type: 'anamneseIaResposta', escopo })
      .patch(id, p => p.set({ dadosJson, atualizadoEm: agora, versao: 'v1', ...(body.finalizar ? { finalizadoEm: agora } : {}) }))
      .commit({ visibility: 'sync' })
    return NextResponse.json({ ok: true, atualizadoEm: agora, ...(body.finalizar ? { finalizadoEm: agora } : {}) })
  } catch (e) {
    console.error('[/api/anamnese-ia POST]', e)
    return NextResponse.json({ erro: 'Erro ao salvar' }, { status: 500 })
  }
}
