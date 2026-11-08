/**
 * Camada de dados do Google Tag Manager.
 *
 * REGRA DE OURO — LGPD e política do Google
 * Esta é uma clínica médica. Nunca envie pelo dataLayer:
 *   · nome, e-mail, telefone, CPF ou qualquer identificador do paciente;
 *   · texto livre digitado pelo paciente (na Nuvete o paciente descreve
 *     sintomas, o que é dado pessoal sensível de saúde);
 *   · qualquer coisa que ligue uma condição clínica a uma pessoa.
 *
 * O que pode ser enviado é comportamento de navegação: qual página originou o
 * contato, qual exame estava sendo consultado, qual arquivo foi baixado.
 * O tipo de exame descreve o conteúdo visitado, não o diagnóstico de alguém.
 */

export const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID ?? ''

/**
 * Rotas internas sem medição nenhuma: a anamnese da IA e a aprovação das
 * páginas dos médicos. Os links levam um código de acesso (?c=...) e as
 * respostas são dados da equipe: nada disso pode ir ao GTM, ao GA4 ou ao
 * Meta Pixel. O mesmo padrão é usado no script do GTM (GoogleTagManager.tsx).
 */
export const ROTA_SEM_MEDICAO = '^/(?:(?:en|es|pt-BR)/)?anamnese-ia(?:/|$)'

export function rotaSemMedicao(pathname: string): boolean {
  return new RegExp(ROTA_SEM_MEDICAO).test(pathname)
}

export type GTMEvent = {
  event: string
  [key: string]: unknown
}

/**
 * Empurra um evento para o dataLayer.
 * Silencioso no servidor e antes do GTM carregar — o array é criado sob demanda
 * e o GTM consome o que já estiver enfileirado assim que inicializa.
 */
export function pushEvent(payload: GTMEvent): void {
  if (typeof window === 'undefined') return
  if (rotaSemMedicao(window.location.pathname)) return
  window.dataLayer = window.dataLayer ?? []
  window.dataLayer.push(payload)
}

/** Caminho da página atual, usado como `origem_pagina` nos eventos. */
export function origemPagina(): string {
  if (typeof window === 'undefined') return ''
  return window.location.pathname
}
