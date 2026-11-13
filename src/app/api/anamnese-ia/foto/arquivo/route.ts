import { NextRequest, NextResponse } from 'next/server'
import { autorizar, escopoValido, gestorPeloCodigo } from '@/lib/anamnese-ia/acesso'
import { sanity } from '@/lib/anamnese-ia/servidor'
import { docFotosId, type DocFotos, type VersaoFoto } from '@/lib/anamnese-ia/foto'
import { lerBlob } from '@/lib/anamnese-ia/foto-servidor'

/**
 * Entrega uma imagem privada: GET ?escopo=&c=&id=&v=v45|v11|original
 *
 * - Com o código do profissional: só as versões 4:5 e 1:1 das fotos dele.
 * - Com o código do painel: qualquer versão, inclusive a original.
 * Nunca fica em cache público e nunca é indexada.
 */
export const dynamic = 'force-dynamic'

const VERSOES: VersaoFoto[] = ['v45', 'v11', 'original']

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams
  const escopo = q.get('escopo') ?? ''
  const c = q.get('c')
  const v = (q.get('v') ?? 'v45') as VersaoFoto
  if (!escopoValido(escopo) || !VERSOES.includes(v)) return new NextResponse('Pedido inválido', { status: 400 })
  const gestor = gestorPeloCodigo(c)
  if (!gestor && (autorizar(escopo, c) || v === 'original')) return new NextResponse('Sem acesso', { status: 403 })

  const client = sanity()
  if (!client) return new NextResponse('Servidor sem configuração', { status: 503 })
  const doc = await client.getDocument<DocFotos>(docFotosId(escopo))
  const envio = doc?.envios?.find(e => e.id === (q.get('id') || doc.atual))
  if (!envio) return new NextResponse('Foto não encontrada', { status: 404 })

  const arq = await lerBlob(envio.arquivos[v], 40 * 1024 * 1024)
  if (!arq) return new NextResponse('Arquivo não encontrado', { status: 404 })
  const nome = `${escopo}-${envio.id}-${v}.${v === 'original' ? 'jpg' : 'webp'}`
  return new NextResponse(new Uint8Array(arq.buffer), {
    headers: {
      'Content-Type': arq.contentType || 'application/octet-stream',
      'Cache-Control': 'private, no-store',
      'X-Robots-Tag': 'noindex, nofollow, noimageindex',
      'Content-Disposition': `${q.get('baixar') ? 'attachment' : 'inline'}; filename="${nome}"`,
    },
  })
}
