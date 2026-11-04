/**
 * Códigos de acesso das páginas /anamnese-ia (só no servidor).
 *
 * Cada link leva um código (?c=...) derivado por HMAC do escopo. Sem o código
 * certo, a rota /api/anamnese-ia não lê nem grava nada. O código não fica
 * guardado em lugar nenhum: é recalculado a partir do segredo.
 *
 * Segredo: ANAMNESE_IA_SEGREDO ou, na falta dele, SANITY_WRITE_TOKEN. Tem de
 * ser o mesmo no computador (scripts/anamnese-ia/links.mjs) e na Vercel.
 */
import { createHmac, timingSafeEqual } from 'node:crypto'
import { MEDICOS_SITE } from './prefill'

const SLUGS = new Set(MEDICOS_SITE.map(m => m.slug))

/** Escopo do documento (um por formulário respondido). */
export function escopoValido(escopo: string) {
  if (['completo', 'clinica', 'validacao'].includes(escopo)) return true
  const m = escopo.match(/^medico-(.+)$/)
  if (!m) return false
  return SLUGS.has(m[1]) || /^novo-[a-z0-9-]{4,40}$/.test(m[1])
}

/** Escopo usado no código: todos os "profissional novo" compartilham o mesmo link. */
export const escopoDoCodigo = (escopo: string) => escopo.startsWith('medico-novo-') ? 'medico-novo' : escopo

function segredo() {
  const s = process.env.ANAMNESE_IA_SEGREDO || process.env.SANITY_WRITE_TOKEN
  if (!s) throw new Error('Sem ANAMNESE_IA_SEGREDO nem SANITY_WRITE_TOKEN')
  return s
}

export function codigoPara(escopoBase: string) {
  return createHmac('sha256', segredo()).update(`anamnese-ia:v1:${escopoBase}`).digest('hex').slice(0, 10).toUpperCase()
}

export function codigoConfere(escopo: string, codigo: string) {
  const esperado = Buffer.from(codigoPara(escopoDoCodigo(escopo)))
  const recebido = Buffer.from(String(codigo || '').toUpperCase())
  return esperado.length === recebido.length && timingSafeEqual(esperado, recebido)
}

/**
 * ID no Sanity. O ponto no ID torna o documento privado: a base é pública
 * para leitura (blog), mas documentos com "." no ID só são lidos com token.
 */
export const docId = (escopo: string) => `anamnese-ia.${escopo}`
