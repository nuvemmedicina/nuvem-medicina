import { NextRequest, NextResponse } from 'next/server'
import { handleUpload, type HandleUploadBody } from '@vercel/blob/client'
import { autorizar } from '@/lib/anamnese-ia/acesso'
import { sanity } from '@/lib/anamnese-ia/servidor'
import { FOTO, docFotosId, fotoAprovada, estadoPublico, type DocFotos } from '@/lib/anamnese-ia/foto'
import { blobConfigurado } from '@/lib/anamnese-ia/foto-servidor'

/**
 * Libera o envio direto do navegador para o Vercel Blob privado (sem passar
 * pelo limite de 4,5 MB das funções). Confere o código do link, o caminho,
 * o tipo, o tamanho e o limite de tentativas. Cada liberação conta como uma
 * tentativa.
 */
export const dynamic = 'force-dynamic'

class Recusa extends Error {}

export async function POST(req: NextRequest) {
  if (!blobConfigurado()) return NextResponse.json({ erro: 'O envio de fotos ainda não está configurado. Fale com a clínica.' }, { status: 503 })
  const client = sanity()
  if (!client) return NextResponse.json({ erro: 'Servidor sem configuração' }, { status: 503 })

  let body: HandleUploadBody
  try { body = await req.json() } catch { return NextResponse.json({ erro: 'JSON inválido' }, { status: 400 }) }

  try {
    const resposta = await handleUpload({
      body,
      request: req,
      onBeforeGenerateToken: async (pathname, clientPayload) => {
        let p: { escopo?: unknown; c?: unknown } = {}
        try { p = JSON.parse(clientPayload || '{}') } catch { /* vazio */ }
        const erro = autorizar(p.escopo, p.c)
        if (erro) throw new Recusa(erro)
        const escopo = p.escopo as string
        if (!pathname.startsWith(`anamnese-ia/envios/${escopo}/`) || pathname.includes('..')) throw new Recusa('Caminho inválido')

        const id = docFotosId(escopo)
        const doc = await client.getDocument<DocFotos>(id)
        if (fotoAprovada(doc ?? null)) throw new Recusa('Sua foto já foi aprovada pela clínica. Para trocar, fale com a equipe.')
        if (estadoPublico(doc ?? null).tentativasRestantes <= 0) throw new Recusa('Você chegou ao limite de envios por este link. Fale com a clínica para liberar mais.')

        await client.transaction()
          .createIfNotExists({ _id: id, _type: 'anamneseIaFotos', escopo })
          .patch(id, q => q.setIfMissing({ tentativas: 0 }).inc({ tentativas: 1 }))
          .commit({ visibility: 'sync' })

        return {
          allowedContentTypes: [...FOTO.tipos],
          maximumSizeInBytes: FOTO.maxBytes,
          addRandomSuffix: true,
          validUntil: Date.now() + 10 * 60 * 1000,
        }
      },
    })
    return NextResponse.json(resposta)
  } catch (e) {
    if (e instanceof Recusa) return NextResponse.json({ erro: e.message }, { status: 403 })
    console.error('[/api/anamnese-ia/foto/token]', e)
    return NextResponse.json({ erro: 'Não foi possível liberar o envio agora. Tente de novo.' }, { status: 400 })
  }
}
