/**
 * Tipos globais da camada de dados do Google Tag Manager.
 *
 * Declaração única para todo o projeto — não repetir `declare global` em
 * componentes, porque declarações divergentes de `window.dataLayer` se
 * conflitam e quebram o type-check.
 */
export {}

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
    gtag?: (...args: unknown[]) => void
  }
}
