/**
 * Foto do profissional para o site: regras comuns ao navegador e ao servidor.
 *
 * Fluxo: o navegador envia o arquivo direto para o Vercel Blob privado
 * (rota /api/anamnese-ia/foto/token libera o envio), o servidor confere,
 * limpa os metadados e gera as versões (rota /api/anamnese-ia/foto). Nada
 * disso é público: as imagens só saem pela rota /api/anamnese-ia/foto/arquivo,
 * com o código do link do profissional ou do painel.
 */

export const FOTO = {
  maxBytes:  10 * 1024 * 1024,   // 10 MB
  minLado:   1200,               // px no lado menor
  tentativas: 15,                // envios por link (o painel pode liberar mais)
  tipos: ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'] as const,
  accept: 'image/jpeg,image/png,image/webp,image/heic,image/heif,.jpg,.jpeg,.png,.webp,.heic,.heif',
  versoes: {
    v45: { largura: 1200, altura: 1500, rotulo: 'Site (4:5)' },
    v11: { largura: 1080, altura: 1080, rotulo: 'Instagram (1:1)' },
  },
  /**
   * Posição vertical do recorte: 25% da sobra fica acima. Em foto vertical do
   * peito para cima, preserva a cabeça. A prévia usa o mesmo valor
   * (object-position: 50% 25%).
   */
  topo: 0.25,
} as const

export type VersaoFoto = keyof typeof FOTO.versoes | 'original'
export type TipoFoto = 'jpeg' | 'png' | 'webp' | 'heic'

/** Tipo pelo conteúdo do arquivo (assinatura dos primeiros bytes). */
export function tipoPeloConteudo(b: Uint8Array): TipoFoto | null {
  if (b.length < 12) return null
  if (b[0] === 0xff && b[1] === 0xd8 && b[2] === 0xff) return 'jpeg'
  if (b[0] === 0x89 && b[1] === 0x50 && b[2] === 0x4e && b[3] === 0x47) return 'png'
  const ascii = (i: number, n: number) => String.fromCharCode(...b.slice(i, i + n))
  if (ascii(0, 4) === 'RIFF' && ascii(8, 4) === 'WEBP') return 'webp'
  if (ascii(4, 4) === 'ftyp' && ['heic', 'heix', 'hevc', 'hevx', 'heim', 'heis', 'mif1', 'msf1'].includes(ascii(8, 4))) return 'heic'
  return null
}

/** Caixa de recorte para a proporção pedida, centralizada na horizontal. */
export function recorte(largura: number, altura: number, proporcao: number) {
  let w = largura
  let h = Math.round(largura / proporcao)
  if (h > altura) { h = altura; w = Math.round(altura * proporcao) }
  return {
    left: Math.round((largura - w) / 2),
    top:  Math.round((altura - h) * FOTO.topo),
    width: w,
    height: h,
  }
}

// ─── Estado guardado no Sanity (documento anamnese-ia.fotos.<escopo>) ─────────

export type OpcaoFoto = 'enviada' | 'clinica' | 'sem-foto'

export type EnvioFoto = {
  _key:    string
  id:      string          // identificador da foto (vai no registro da autorização)
  em:      string
  tipoEnviado: TipoFoto
  bytesEnviados: number
  largura: number          // da original, já na orientação certa
  altura:  number
  sha256:  string          // da original sem metadados
  arquivos: Record<VersaoFoto, string>   // caminhos no Blob privado
  autorizacaoId?: string
}

export type AprovacaoClinica = { fotoId: string | null; por: string; porNome: string; em: string }

export type DocFotos = {
  _id: string
  escopo: string
  opcao?: OpcaoFoto
  opcaoEm?: string
  atual?: string            // id do envio em uso
  envios?: EnvioFoto[]
  tentativas?: number
  tentativasExtras?: number
  aprovacaoClinica?: AprovacaoClinica | null
  historicoAprovacoes?: (AprovacaoClinica & { _key: string; acao: 'aprovou' | 'desfez' })[]
}

/** O que o navegador do profissional recebe (sem caminhos internos). */
export type EstadoFotoPublico = {
  opcao: OpcaoFoto | null
  opcaoEm: string | null
  atual: { id: string; em: string; largura: number; altura: number } | null
  totalEnvios: number
  aprovada: boolean
  tentativasRestantes: number
}

export function estadoPublico(d: DocFotos | null): EstadoFotoPublico {
  const atual = d?.envios?.find(e => e.id === d.atual) ?? null
  const limite = FOTO.tentativas + (d?.tentativasExtras ?? 0)
  return {
    opcao: d?.opcao ?? null,
    opcaoEm: d?.opcaoEm ?? null,
    atual: atual ? { id: atual.id, em: atual.em, largura: atual.largura, altura: atual.altura } : null,
    totalEnvios: d?.envios?.length ?? 0,
    aprovada: fotoAprovada(d),
    tentativasRestantes: Math.max(0, limite - (d?.tentativas ?? 0)),
  }
}

/** A clínica aprovou exatamente a escolha atual (foto em uso ou "sem foto")? */
export function fotoAprovada(d: DocFotos | null) {
  const a = d?.aprovacaoClinica
  if (!a || !d?.opcao) return false
  if (d.opcao === 'sem-foto') return a.fotoId === null
  if (d.opcao === 'enviada') return !!d.atual && a.fotoId === d.atual
  return false
}

export const docFotosId = (escopo: string) => `anamnese-ia.fotos.${escopo}`
