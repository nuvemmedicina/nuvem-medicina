import { NextRequest, NextResponse } from 'next/server'
import { autorizar } from '@/lib/anamnese-ia/acesso'
import { sanity, idAleatorio } from '@/lib/anamnese-ia/servidor'
import { docFotosId, estadoPublico, fotoAprovada, type DocFotos, type EnvioFoto, type OpcaoFoto } from '@/lib/anamnese-ia/foto'
import { processarFoto, blobConfigurado, ErroFoto } from '@/lib/anamnese-ia/foto-servidor'

/**
 * Foto do profissional (documento privado anamnese-ia.fotos.<escopo>).
 *
 * GET  ?escopo=&c=                         estado da foto
 * POST { escopo, c, acao: 'processar', pathname }   processa um envio
 * POST { escopo, c, acao: 'opcao', opcao }          "clínica providencia" ou "sem foto"
 *
 * Cada envio fica no histórico (envios[]); trocar a foto só muda "atual".
 * Depois que a clínica aprova, o profissional não troca mais por aqui.
 */
export const dynamic = 'force-dynamic'
export const maxDuration = 60

const OPCOES: OpcaoFoto[] = ['clinica', 'sem-foto']

export async function GET(req: NextRequest) {
  const escopo = req.nextUrl.searchParams.get('escopo')
  const erro = autorizar(escopo, req.nextUrl.searchParams.get('c'))
  if (erro) return NextResponse.json({ erro }, { status: 403 })
  const client = sanity()
  if (!client) return NextResponse.json({ erro: 'Servidor sem configuração' }, { status: 503 })
  const doc = await client.getDocument<DocFotos>(docFotosId(escopo!))
  return NextResponse.json({ ...estadoPublico(doc ?? null), envioConfigurado: blobConfigurado() })
}

export async function POST(req: NextRequest) {
  let body: { escopo?: unknown; c?: unknown; acao?: unknown; pathname?: unknown; opcao?: unknown }
  try { body = await req.json() } catch { return NextResponse.json({ erro: 'JSON inválido' }, { status: 400 }) }
  const erro = autorizar(body.escopo, body.c)
  if (erro) return NextResponse.json({ erro }, { status: 403 })
  const client = sanity()
  if (!client) return NextResponse.json({ erro: 'Servidor sem configuração' }, { status: 503 })

  const escopo = body.escopo as string
  const id = docFotosId(escopo)
  const doc = (await client.getDocument<DocFotos>(id)) ?? null
  if (fotoAprovada(doc)) return NextResponse.json({ erro: 'Sua foto já foi aprovada pela clínica. Para trocar, fale com a equipe.' }, { status: 409 })
  const agora = new Date().toISOString()

  if (body.acao === 'opcao') {
    const opcao = body.opcao as OpcaoFoto
    if (!OPCOES.includes(opcao)) return NextResponse.json({ erro: 'Opção inválida' }, { status: 400 })
    await client.transaction()
      .createIfNotExists({ _id: id, _type: 'anamneseIaFotos', escopo })
      .patch(id, p => p.set({ opcao, opcaoEm: agora }))
      .commit({ visibility: 'sync' })
    const novo = await client.getDocument<DocFotos>(id)
    return NextResponse.json(estadoPublico(novo ?? null))
  }

  if (body.acao !== 'processar') return NextResponse.json({ erro: 'Ação inválida' }, { status: 400 })
  if (!blobConfigurado()) return NextResponse.json({ erro: 'O envio de fotos ainda não está configurado.' }, { status: 503 })
  const pathname = typeof body.pathname === 'string' ? body.pathname : ''
  if (!pathname.startsWith(`anamnese-ia/envios/${escopo}/`) || pathname.includes('..')) {
    return NextResponse.json({ erro: 'Caminho inválido' }, { status: 400 })
  }

  const fotoId = `f-${agora.slice(0, 10).replace(/-/g, '')}-${idAleatorio(6)}`
  try {
    const r = await processarFoto(pathname, `anamnese-ia/fotos/${escopo}/${fotoId}`)
    const envio: EnvioFoto = { _key: fotoId, id: fotoId, em: agora, ...r }
    await client.transaction()
      .createIfNotExists({ _id: id, _type: 'anamneseIaFotos', escopo })
      .patch(id, p => p.setIfMissing({ envios: [] }).append('envios', [envio]).set({ atual: fotoId, opcao: 'enviada', opcaoEm: agora }))
      .commit({ visibility: 'sync' })
    const novo = await client.getDocument<DocFotos>(id)
    return NextResponse.json(estadoPublico(novo ?? null))
  } catch (e) {
    if (e instanceof ErroFoto) return NextResponse.json({ erro: e.message }, { status: 422 })
    console.error('[/api/anamnese-ia/foto POST]', e)
    return NextResponse.json({ erro: 'Não foi possível processar a foto agora. Tente de novo.' }, { status: 500 })
  }
}
