/**
 * Códigos de acesso das páginas /anamnese-ia (só no servidor).
 *
 * Cada link leva um código (?c=...) derivado por HMAC do escopo. Sem o código
 * certo, as rotas /api/anamnese-ia não leem nem gravam nada. O código não fica
 * guardado em lugar nenhum: é recalculado a partir do segredo.
 *
 * Versão 2 (nov/2026): 32 caracteres hexadecimais (128 bits), um código por
 * pessoa, inclusive para cada profissional novo, e uma "geração" por escopo
 * para cancelar um link sem mexer nos outros. Os códigos da versão 1
 * (10 caracteres) não valem mais: gere os links de novo com
 * scripts/anamnese-ia/links.mjs.
 *
 * Cancelar um link: some 1 à geração do escopo em ANAMNESE_IA_GERACOES
 * (JSON, por exemplo {"medico-vera-angelo":2}), na Vercel e no .env.local,
 * e faça um novo deploy. O link antigo para de funcionar e links.mjs passa a
 * gerar o novo.
 *
 * Segredo: ANAMNESE_IA_SEGREDO ou, na falta dele, SANITY_WRITE_TOKEN. Tem de
 * ser o mesmo no computador (scripts/anamnese-ia/links.mjs) e na Vercel.
 */
import { createHmac, timingSafeEqual } from 'node:crypto'
import { MEDICOS_SITE } from './prefill'

const SLUGS = new Set(MEDICOS_SITE.map(m => m.slug))

/** Quem aprova pela clínica (painel). Cada pessoa tem o próprio código. */
export const GESTORES = {
  'painel-ana':  'Ana Paula (gestão)',
  'painel-vera': 'Dra. Vera Ângelo (responsável técnica)',
} as const
export type EscopoGestor = keyof typeof GESTORES

/** Slug de profissional novo: novo-<nome>-<4 letras>, criado por links.mjs. */
export const SLUG_NOVO = /^novo-[a-z0-9-]{4,40}$/

export const slugValido = (slug: string) => SLUGS.has(slug) || SLUG_NOVO.test(slug)

/** Escopo dos formulários (um documento por formulário respondido). */
export function escopoValido(escopo: string) {
  if (['completo', 'clinica', 'validacao'].includes(escopo)) return true
  const m = escopo.match(/^medico-(.+)$/)
  return !!m && slugValido(m[1])
}

export const escopoGestorValido = (escopo: string): escopo is EscopoGestor => escopo in GESTORES

function segredo() {
  const s = process.env.ANAMNESE_IA_SEGREDO || process.env.SANITY_WRITE_TOKEN
  if (!s) throw new Error('Sem ANAMNESE_IA_SEGREDO nem SANITY_WRITE_TOKEN')
  return s
}

function geracao(escopo: string): number {
  try {
    const g = JSON.parse(process.env.ANAMNESE_IA_GERACOES || '{}')[escopo]
    return Number.isInteger(g) && g > 0 ? g : 1
  } catch { return 1 }
}

export function codigoPara(escopo: string) {
  return createHmac('sha256', segredo())
    .update(`anamnese-ia:v2:${escopo}:${geracao(escopo)}`)
    .digest('hex').slice(0, 32).toUpperCase()
}

export function codigoConfere(escopo: string, codigo: string) {
  const esperado = Buffer.from(codigoPara(escopo))
  const recebido = Buffer.from(String(codigo || '').toUpperCase())
  return esperado.length === recebido.length && timingSafeEqual(esperado, recebido)
}

/** Confere o código de um formulário. Devolve a mensagem de erro ou null. */
export function autorizar(escopo: unknown, codigo: unknown) {
  if (typeof escopo !== 'string' || !escopoValido(escopo)) return 'Escopo inválido'
  if (typeof codigo !== 'string' || !codigoConfere(escopo, codigo)) return 'Código de acesso inválido'
  return null
}

/** Confere o código do painel e devolve quem é (ou null). */
export function gestorPeloCodigo(codigo: unknown): EscopoGestor | null {
  if (typeof codigo !== 'string') return null
  return (Object.keys(GESTORES) as EscopoGestor[]).find(e => codigoConfere(e, codigo)) ?? null
}

/**
 * ID no Sanity. O ponto no ID torna o documento privado: a base é pública
 * para leitura (blog), mas documentos com "." no ID só são lidos com token.
 */
export const docId = (escopo: string) => `anamnese-ia.${escopo}`
