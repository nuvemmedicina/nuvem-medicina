/**
 * Publicação das páginas de profissionais: ÚNICO ponto que decide de onde vêm
 * status, foto e aprovações, e o que vai ao ar.
 *
 * ── Fonte dos dados de publicação ────────────────────────────────────────────
 *   'manual'   (hoje) campos `status`, `foto` e `aprovacoes` de profissionais.ts,
 *              atualizados à mão conforme as aprovações chegam.
 *   'anamnese' (depois do merge do PR #142) lê status, foto aprovada e
 *              aprovações do Sanity, gravados pela anamnese. Para ligar, siga
 *              RELATORIO-PAGINAS-PROFISSIONAIS.md, seção "Como ligar a anamnese".
 *
 * ── Regras ───────────────────────────────────────────────────────────────────
 *   · Produção (VERCEL_ENV=production): só página aprovada gera rota e entra
 *     no sitemap. Dra. Vera e Dra. Eliane continuam com a página antiga, no
 *     mesmo endereço, até a nova ser aprovada.
 *   · Prévia da Vercel e computador local: todas as páginas aparecem, com a
 *     faixa "Rascunho · aguardando aprovação" e noindex.
 *   · "Aprovada" vale só se médico e clínica aprovaram a versão ATUAL do texto
 *     (a versão é um hash do conteúdo: mudou o texto, a aprovação cai) e não
 *     há pendência que bloqueie (ex.: CRM sem UF).
 */
import { createHash } from 'node:crypto'
import {
  PROFISSIONAIS,
  type Aprovacao, type Foto, type Profissional, type StatusPagina,
} from './profissionais'
import { pendenciasQueBloqueiam } from './profissionais-texto'

type FontePublicacao = 'manual' | 'anamnese'
export const FONTE_PUBLICACAO = 'manual' as FontePublicacao

export const EH_PRODUCAO = process.env.VERCEL_ENV === 'production'

/** Páginas que já estavam no ar e continuam até a versão nova ser aprovada. */
export const PAGINAS_ANTIGAS = new Set(['dra-vera-angelo', 'dra-eliane-basques'])

/**
 * Versão do modelo da página. Suba este número quando mudar um texto fixo do
 * componente que os profissionais aprovam (FAQ, passos): as aprovações antigas
 * deixam de valer e a página volta para "aguardando".
 */
export const MODELO_VERSAO = 1

// ─── Versão do texto ─────────────────────────────────────────────────────────

/** JSON com as chaves em ordem alfabética, para o hash não depender da ordem. */
function jsonEstavel(v: unknown): string {
  if (Array.isArray(v)) return `[${v.map(jsonEstavel).join(',')}]`
  if (v && typeof v === 'object') {
    return `{${Object.keys(v).sort().map(k => `${JSON.stringify(k)}:${jsonEstavel((v as Record<string, unknown>)[k])}`).join(',')}}`
  }
  return JSON.stringify(v)
}

/**
 * Versão do texto: 10 caracteres do sha256 de tudo o que aparece na página
 * (inclui a foto). Ficam de fora só os campos de controle.
 */
export function versaoDoTexto(p: Profissional, foto: Foto | null = p.foto): string {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { status, aprovacoes, pendencias, fase, ...conteudo } = p
  const base = jsonEstavel({ modelo: MODELO_VERSAO, ...conteudo, foto: foto?.src ?? null })
  return createHash('sha256').update(base).digest('hex').slice(0, 10)
}

// ─── Leitura da publicação ───────────────────────────────────────────────────

type DadosPublicacao = { status: StatusPagina; foto: Foto | null; aprovacoes: { medico?: Aprovacao; clinica?: Aprovacao } }

function lerManual(p: Profissional): DadosPublicacao {
  return { status: p.status, foto: p.foto, aprovacoes: p.aprovacoes }
}

/**
 * Leitura pela anamnese (PR #142). Fica desligada até o merge: os módulos
 * src/lib/anamnese-ia/pagina-servidor.ts e foto.ts só existem naquela branch.
 * O código a colocar aqui está no relatório.
 */
async function lerDaAnamnese(p: Profissional): Promise<DadosPublicacao> {
  throw new Error(
    `FONTE_PUBLICACAO = 'anamnese' ainda não está ligada (profissional ${p.slug}). ` +
    'Faça o merge do PR #142 e siga RELATORIO-PAGINAS-PROFISSIONAIS.md.',
  )
}

export type Publicacao = {
  status: StatusPagina
  /** Aprovada de fato: pode ir para produção. */
  aprovada: boolean
  foto: Foto | null
  versao: string
  aprovacoes: DadosPublicacao['aprovacoes']
  /** Por que não está aprovada (vazio quando aprovada). */
  motivos: string[]
}

const avisados = new Set<string>()

export async function publicacaoDe(p: Profissional): Promise<Publicacao> {
  const dados = FONTE_PUBLICACAO === 'anamnese' ? await lerDaAnamnese(p) : lerManual(p)
  const versao = versaoDoTexto(p, dados.foto)

  const motivos: string[] = []
  if (dados.status !== 'aprovada') motivos.push(`status "${dados.status}"`)
  if (dados.aprovacoes.medico?.versao !== versao) motivos.push(`falta a aprovação ${p.profissao === 'fisioterapeuta' ? 'da profissional' : 'do médico'} para a versão ${versao}`)
  if (dados.aprovacoes.clinica?.versao !== versao) motivos.push(`falta a aprovação da clínica para a versão ${versao}`)
  motivos.push(...pendenciasQueBloqueiam(p))

  // Marcada como aprovada, mas a aprovação não vale: avisa no build.
  if (dados.status === 'aprovada' && motivos.length > 0 && !avisados.has(p.slug)) {
    avisados.add(p.slug)
    console.warn(`[profissionais] ${p.slug} está com status "aprovada", mas não vai ao ar: ${motivos.join('; ')}`)
  }

  return { status: dados.status, aprovada: motivos.length === 0, foto: dados.foto, versao, aprovacoes: dados.aprovacoes, motivos }
}

/**
 * O que a rota /<slug> mostra:
 *   'nova'   página nova, aprovada (produção e prévia)
 *   'previa' página nova com a faixa de rascunho (só fora de produção)
 *   'antiga' página antiga, enquanto a nova não é aprovada (só em produção)
 *   'nenhuma' sem rota
 */
export type ModoPagina = 'nova' | 'previa' | 'antiga' | 'nenhuma'

export async function modoDaPagina(p: Profissional): Promise<ModoPagina> {
  const { aprovada } = await publicacaoDe(p)
  if (aprovada) return 'nova'
  if (!EH_PRODUCAO) return 'previa'
  if (PAGINAS_ANTIGAS.has(p.slug)) return 'antiga'
  return 'nenhuma'
}

/** Slugs com rota neste ambiente. */
export async function slugsComRota(): Promise<string[]> {
  const modos = await Promise.all(PROFISSIONAIS.map(async p => [p.slug, await modoDaPagina(p)] as const))
  return modos.filter(([, m]) => m !== 'nenhuma').map(([s]) => s)
}

/** Slugs no sitemap: só o que é público em produção (aprovada ou antiga). */
export async function slugsNoSitemap(): Promise<string[]> {
  const res = await Promise.all(PROFISSIONAIS.map(async p => {
    const { aprovada } = await publicacaoDe(p)
    return aprovada || PAGINAS_ANTIGAS.has(p.slug) ? p.slug : null
  }))
  return res.filter((s): s is string => s !== null)
}

/** A página individual está no ar em produção (nova aprovada ou antiga)? */
export async function temPaginaPublica(p: Profissional): Promise<boolean> {
  const { aprovada } = await publicacaoDe(p)
  return aprovada || PAGINAS_ANTIGAS.has(p.slug)
}
