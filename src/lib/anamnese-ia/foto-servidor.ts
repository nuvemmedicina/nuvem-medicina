/**
 * Processamento da foto no servidor (só em rotas da API).
 *
 * 1. Lê o arquivo enviado ao Blob privado e confere o tipo pelo conteúdo.
 * 2. HEIC é convertido com heic-convert (o sharp não lê HEIC).
 * 3. sharp gira conforme a orientação da câmera e grava sem metadados
 *    (EXIF, GPS, modelo do aparelho, perfis). O sharp só copia metadados
 *    quando se pede withMetadata(), o que não fazemos.
 * 4. Grava a original sem metadados (JPEG, resolução cheia) e as versões
 *    4:5 e 1:1 em WebP, todas privadas. O arquivo enviado é apagado.
 */
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import heicConvert from 'heic-convert'
import { put, get, del } from '@vercel/blob'
import { FOTO, recorte, tipoPeloConteudo, type TipoFoto, type VersaoFoto } from './foto'

export class ErroFoto extends Error {}

export const blobConfigurado = () => !!process.env.BLOB_READ_WRITE_TOKEN

async function lerStream(stream: ReadableStream<Uint8Array>, limite: number) {
  const partes: Uint8Array[] = []
  let total = 0
  const leitor = stream.getReader()
  for (;;) {
    const { done, value } = await leitor.read()
    if (done) break
    total += value.length
    if (total > limite) { await leitor.cancel(); throw new ErroFoto('A foto passa de 10 MB. Envie uma versão menor.') }
    partes.push(value)
  }
  return Buffer.concat(partes)
}

/** Lê um arquivo privado do Blob. */
export async function lerBlob(pathname: string, limite = FOTO.maxBytes + 1024) {
  const r = await get(pathname, { access: 'private', useCache: false })
  if (!r || r.statusCode !== 200) return null
  return { buffer: await lerStream(r.stream, limite), contentType: r.blob.contentType }
}

export type FotoProcessada = {
  tipoEnviado: TipoFoto
  bytesEnviados: number
  largura: number
  altura: number
  sha256: string
  arquivos: Record<VersaoFoto, string>
}

/**
 * Processa o envio guardado em `pathnameEnviado` e grava as versões em
 * `pasta` (anamnese-ia/fotos/<escopo>/<id>). Sempre apaga o arquivo enviado.
 */
export async function processarFoto(pathnameEnviado: string, pasta: string): Promise<FotoProcessada> {
  try {
    const lido = await lerBlob(pathnameEnviado)
    if (!lido) throw new ErroFoto('Não encontramos a foto enviada. Tente de novo.')
    const bruto = lido.buffer
    if (bruto.length > FOTO.maxBytes) throw new ErroFoto('A foto passa de 10 MB. Envie uma versão menor.')

    const tipo = tipoPeloConteudo(bruto.subarray(0, 32))
    if (!tipo) throw new ErroFoto('O arquivo não é uma foto JPG, PNG, WebP ou HEIC.')

    let entrada: Buffer = bruto
    if (tipo === 'heic') {
      try { entrada = Buffer.from(await heicConvert({ buffer: bruto, format: 'JPEG', quality: 0.95 })) }
      catch { throw new ErroFoto('Não conseguimos abrir esta foto HEIC. Tente enviar em JPG.') }
    }

    // Original na orientação certa e sem metadados
    let original: { data: Buffer; info: sharp.OutputInfo }
    try {
      original = await sharp(entrada, { failOn: 'error' }).rotate().jpeg({ quality: 95, mozjpeg: true }).toBuffer({ resolveWithObject: true })
    } catch { throw new ErroFoto('Não conseguimos abrir esta foto. Ela pode estar corrompida.') }
    const { width: largura, height: altura } = original.info
    if (Math.min(largura, altura) < FOTO.minLado) {
      throw new ErroFoto(`A foto tem ${largura} × ${altura} px. O lado menor precisa ter pelo menos ${FOTO.minLado} px.`)
    }

    const versao = async (w: number, h: number) => sharp(original.data)
      .extract(recorte(largura, altura, w / h))
      .resize(w, h)
      .webp({ quality: 84 })
      .toBuffer()
    const [v45, v11] = await Promise.all([
      versao(FOTO.versoes.v45.largura, FOTO.versoes.v45.altura),
      versao(FOTO.versoes.v11.largura, FOTO.versoes.v11.altura),
    ])

    const gravar = (nome: string, data: Buffer, contentType: string) =>
      put(`${pasta}/${nome}`, data, { access: 'private', contentType, addRandomSuffix: false, allowOverwrite: false })
    const [o, a, b] = await Promise.all([
      gravar('original.jpg', original.data, 'image/jpeg'),
      gravar('site-4x5.webp', v45, 'image/webp'),
      gravar('instagram-1x1.webp', v11, 'image/webp'),
    ])

    return {
      tipoEnviado: tipo,
      bytesEnviados: bruto.length,
      largura, altura,
      sha256: createHash('sha256').update(original.data).digest('hex'),
      arquivos: { original: o.pathname, v45: a.pathname, v11: b.pathname },
    }
  } finally {
    await del(pathnameEnviado).catch(() => {})
  }
}
