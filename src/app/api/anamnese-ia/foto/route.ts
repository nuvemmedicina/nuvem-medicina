import { NextRequest, NextResponse } from 'next/server'
import { autorizar } from '@/lib/anamnese-ia/acesso'
import { del } from '@vercel/blob'
import { sanity, idAleatorio, ipParcial } from '@/lib/anamnese-ia/servidor'
import { docFotosId, estadoPublico, fotoAprovada, type DocFotos, type EnvioFoto, type OpcaoFoto } from '@/lib/anamnese-ia/foto'
import { processarFoto, blobConfigurado, garantirFotoDoSite, ErroFoto } from '@/lib/anamnese-ia/foto-servidor'
import { TERMO, textoTermo } from '@/lib/anamnese-ia/termo-imagem'
import { registrar, sha256 } from '@/lib/anamnese-ia/autorizacao'

/**
 * Foto do profissional (documento privado anamnese-ia.fotos.<escopo>).
 *
 * GET  ?escopo=&c=   estado da foto. Na primeira abertura, importa para o
 *                    histórico (envio 0) a foto que o site já usa.
 * POST { escopo, c, acao: 'processar', pathname, aceite, termoVersao, nomeCompleto, registro }
 *      processa um envio novo
 * POST { escopo, c, acao: 'aprovar-site', aceite, termoVersao, nomeCompleto, registro }
 *      "Aprovo esta foto": usa a foto atual do site
 * POST { escopo, c, acao: 'opcao', opcao }   "clínica providencia" ou "sem foto"
 *
 * "processar" e "aprovar-site" exigem o aceite do termo e criam o registro
 * da autorização; sem o aceite, nada é registrado.
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
  const doc = await garantirFotoDoSite(client, escopo!)
  return NextResponse.json({ ...estadoPublico(doc), envioConfigurado: blobConfigurado() })
}

type Corpo = {
  escopo?: unknown; c?: unknown; acao?: unknown; pathname?: unknown; opcao?: unknown
  aceite?: unknown; termoVersao?: unknown; nomeCompleto?: unknown; registro?: unknown
}

/** Confere o aceite do termo. Devolve os dados ou null. */
function aceiteDoTermo(body: Corpo) {
  const nomeCompleto = typeof body.nomeCompleto === 'string' ? body.nomeCompleto.trim().slice(0, 160) : ''
  const registro = typeof body.registro === 'string' ? body.registro.trim().slice(0, 160) : ''
  if (body.aceite !== true || body.termoVersao !== TERMO.versao || !nomeCompleto || !registro) return null
  return { nomeCompleto, registro }
}

const SEM_ACEITE = 'Para continuar, preencha seu nome completo e o registro e marque a autorização de uso de imagem.'

export async function POST(req: NextRequest) {
  let body: Corpo
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
  const responder = async () => NextResponse.json(estadoPublico((await client.getDocument<DocFotos>(id)) ?? null))

  if (body.acao === 'opcao') {
    const opcao = body.opcao as OpcaoFoto
    if (!OPCOES.includes(opcao)) return NextResponse.json({ erro: 'Opção inválida' }, { status: 400 })
    await client.transaction()
      .createIfNotExists({ _id: id, _type: 'anamneseIaFotos', escopo })
      .patch(id, p => p.set({ opcao, opcaoEm: agora }))
      .commit({ visibility: 'sync' })
    return responder()
  }

  if (body.acao === 'aprovar-site') {
    const fotoSite = doc?.envios?.find(e => e.id === doc.importacaoSite?.fotoId)
    if (!doc || !fotoSite) return NextResponse.json({ erro: 'Não encontramos a foto atual do site. Envie uma foto nova.' }, { status: 409 })
    const termo = aceiteDoTermo(body)
    if (!termo) return NextResponse.json({ erro: SEM_ACEITE }, { status: 400 })
    await registrar(client, {
      tipo: 'aceite', escopo, ...termo,
      termoVersao: TERMO.versao, termoSha256: sha256(textoTermo(termo)),
      fotoId: fotoSite.id, ipParcial: ipParcial(req), registradoPor: 'profissional',
    })
    await client.patch(id).set({ atual: fotoSite.id, opcao: 'site', opcaoEm: agora }).commit({ visibility: 'sync' })
    return responder()
  }

  if (body.acao !== 'processar') return NextResponse.json({ erro: 'Ação inválida' }, { status: 400 })
  if (!blobConfigurado()) return NextResponse.json({ erro: 'O envio de fotos ainda não está configurado.' }, { status: 503 })
  const pathname = typeof body.pathname === 'string' ? body.pathname : ''
  if (!pathname.startsWith(`anamnese-ia/envios/${escopo}/`) || pathname.includes('..')) {
    return NextResponse.json({ erro: 'Caminho inválido' }, { status: 400 })
  }

  // Termo de autorização: sem o aceite da versão atual, a foto não é aceita
  const termo = aceiteDoTermo(body)
  if (!termo) {
    await del(pathname).catch(() => {})
    return NextResponse.json({ erro: SEM_ACEITE }, { status: 400 })
  }

  const fotoId = `f-${agora.slice(0, 10).replace(/-/g, '')}-${idAleatorio(6)}`
  try {
    const r = await processarFoto(pathname, `anamnese-ia/fotos/${escopo}/${fotoId}`)
    const aceite = await registrar(client, {
      tipo: 'aceite', escopo, ...termo,
      termoVersao: TERMO.versao, termoSha256: sha256(textoTermo(termo)),
      fotoId, ipParcial: ipParcial(req), registradoPor: 'profissional',
    })
    const numero = (doc?.envios ?? []).filter(e => e.origem !== 'site').length + 1
    const envio: EnvioFoto = { _key: fotoId, id: fotoId, numero, origem: 'envio', em: agora, ...r, autorizacaoId: aceite._id }
    await client.transaction()
      .createIfNotExists({ _id: id, _type: 'anamneseIaFotos', escopo })
      .patch(id, p => p.setIfMissing({ envios: [] }).append('envios', [envio]).set({ atual: fotoId, opcao: 'enviada', opcaoEm: agora }))
      .commit({ visibility: 'sync' })
    return responder()
  } catch (e) {
    if (e instanceof ErroFoto) return NextResponse.json({ erro: e.message }, { status: 422 })
    console.error('[/api/anamnese-ia/foto POST]', e)
    return NextResponse.json({ erro: 'Não foi possível processar a foto agora. Tente de novo.' }, { status: 500 })
  }
}
