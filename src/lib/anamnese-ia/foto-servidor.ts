/**
 * Processamento da foto no servidor (só em rotas da API).
 *
 * 1. Lê o arquivo enviado ao Blob privado e confere o tipo pelo conteúdo.
 * 2. HEIC não chega aqui: o sharp não lê HEIC, então o navegador converte
 *    para JPEG antes do envio ou pede JPG (FotoSecao.tsx).
 * 3. sharp gira conforme a orientação da câmera e grava sem metadados
 *    (EXIF, GPS, modelo do aparelho, perfis). O sharp só copia metadados
 *    quando se pede withMetadata(), o que não fazemos.
 * 4. Grava a original sem metadados (JPEG, resolução cheia) e as versões
 *    4:5 e 1:1 em WebP, todas privadas. O arquivo enviado é apagado.
 */
import { createHash } from 'node:crypto'
import sharp from 'sharp'
import { put, get, del } from '@vercel/blob'
import { FOTO, recorte, tipoPeloConteudo, docFotosId, type DocFotos, type EnvioFoto, type TipoFoto, type VersaoFoto } from './foto'
import { fotoSiteDe } from './fotos-site'
import { idAleatorio, type Sanity } from './servidor'
import { SITE_URL } from '@/lib/site'

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

    // O navegador converte HEIC antes do envio; se um HEIC chegar mesmo
    // assim, a resposta explica o que fazer em vez de falhar calada.
    if (tipo === 'heic') throw new ErroFoto('Fotos HEIC não podem ser abertas aqui. Envie a foto em JPG: pelo próprio iPhone ela já vai convertida; no computador, abra a foto e exporte como JPG.')
    return { tipoEnviado: tipo, bytesEnviados: bruto.length, ...(await gerarVersoes(bruto, pasta, { exigirMinimo: true })) }
  } finally {
    await del(pathnameEnviado).catch(() => {})
  }
}

/**
 * Original sem metadados (JPEG) e versões 4:5 e 1:1 (WebP), todas privadas.
 * Sem `exigirMinimo` (foto já usada no site), aceita foto menor que 1200 px
 * e não amplia: as versões ficam do tamanho que a foto permite.
 */
export async function gerarVersoes(bruto: Buffer, pasta: string, { exigirMinimo, sobrescrever = false }: { exigirMinimo: boolean; sobrescrever?: boolean }) {
  let original: { data: Buffer; info: sharp.OutputInfo }
  try {
    original = await sharp(bruto, { failOn: 'error' }).rotate().jpeg({ quality: 95, mozjpeg: true }).toBuffer({ resolveWithObject: true })
  } catch { throw new ErroFoto('Não conseguimos abrir esta foto. Ela pode estar corrompida.') }
  const { width: largura, height: altura } = original.info
  if (exigirMinimo && Math.min(largura, altura) < FOTO.minLado) {
    throw new ErroFoto(`A foto tem ${largura} × ${altura} px. O lado menor precisa ter pelo menos ${FOTO.minLado} px.`)
  }

  const versao = async (w: number, h: number) => sharp(original.data)
    .extract(recorte(largura, altura, w / h))
    .resize(w, h, { withoutEnlargement: true })
    .webp({ quality: 84 })
    .toBuffer()
  const [v45, v11] = await Promise.all([
    versao(FOTO.versoes.v45.largura, FOTO.versoes.v45.altura),
    versao(FOTO.versoes.v11.largura, FOTO.versoes.v11.altura),
  ])

  const gravar = (nome: string, data: Buffer, contentType: string) =>
    put(`${pasta}/${nome}`, data, { access: 'private', contentType, addRandomSuffix: false, allowOverwrite: sobrescrever })
  const [o, a, b] = await Promise.all([
    gravar('original.jpg', original.data, 'image/jpeg'),
    gravar('site-4x5.webp', v45, 'image/webp'),
    gravar('instagram-1x1.webp', v11, 'image/webp'),
  ])

  return {
    largura, altura,
    sha256: createHash('sha256').update(original.data).digest('hex'),
    arquivos: { original: o.pathname, v45: a.pathname, v11: b.pathname } as Record<VersaoFoto, string>,
  }
}

/**
 * Lê a foto publicada no site. Na Vercel, a pasta public não fica no disco
 * das funções, então a leitura é pelo endereço do site (o mesmo arquivo de
 * public/images, sem alteração).
 */
async function lerFotoDoSite(arquivo: string): Promise<Buffer> {
  const r = await fetch(`${SITE_URL}${arquivo}`, { cache: 'no-store' })
  if (!r.ok) throw new Error(`Foto do site indisponível (${r.status}): ${arquivo}`)
  return Buffer.from(await r.arrayBuffer())
}

/**
 * Importa para o histórico (envio 0) a foto que o site já usa, copiando-a
 * para o Blob privado. Feita uma única vez por profissional; o arquivo em
 * public/images não muda. Sem Blob configurado ou sem foto mapeada, não faz
 * nada. Devolve o documento atualizado.
 */
export async function garantirFotoDoSite(client: Sanity, escopo: string): Promise<DocFotos | null> {
  const id = docFotosId(escopo)
  const atual = (await client.getDocument<DocFotos>(id)) ?? null
  const site = fotoSiteDe(escopo)
  if (!site || atual?.importacaoSite || !blobConfigurado()) return atual
  try {
    await client.createIfNotExists({ _id: id, _type: 'anamneseIaFotos', escopo })
    const doc = await client.getDocument<DocFotos & { _rev: string }>(id)
    if (!doc || doc.importacaoSite) return doc ?? null

    const bruto = await lerFotoDoSite(site.arquivo)
    const em = new Date().toISOString()
    const fotoId = `f-site-${idAleatorio(6)}`
    // Pasta fixa: duas importações ao mesmo tempo gravam o mesmo conteúdo
    const v = await gerarVersoes(bruto, `anamnese-ia/fotos/${escopo}/site`, { exigirMinimo: false, sobrescrever: true })
    const envio: EnvioFoto = {
      _key: fotoId, id: fotoId, numero: 0, origem: 'site', arquivoSite: site.arquivo,
      em, tipoEnviado: tipoPeloConteudo(bruto.subarray(0, 32)) ?? 'jpeg', bytesEnviados: bruto.length, ...v,
    }
    await client.patch(id).ifRevisionId(doc._rev)
      .setIfMissing({ envios: [] })
      .append('envios', [envio])
      .set({ importacaoSite: { em, fotoId, arquivo: site.arquivo } })
      .commit({ visibility: 'sync' })
  } catch (e) {
    // Outra importação ganhou a corrida, ou o site/Blob falhou: segue sem
    // a foto do site agora e tenta de novo na próxima abertura.
    console.error('[anamnese-ia] importação da foto do site', escopo, e instanceof Error ? e.message : e)
  }
  return (await client.getDocument<DocFotos>(id)) ?? null
}
