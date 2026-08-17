/**
 * Consent Mode v2 — consentimento de cookies para GA4 e Google Ads.
 *
 * Padrão negado: nada é medido até a pessoa aceitar. É a prática mais alinhada
 * à LGPD — consentimento prévio, não recusa posterior — e vale para o
 * contêiner GTM inteiro, porque todas as tags nele são tipos nativos do Google
 * (Tag do Google, Vinculador de Conversões, Rastreamento de Conversões do
 * Google Ads, eventos GA4). Todas respeitam o sinal de consentimento da camada
 * de dados automaticamente, sem exigir nenhuma configuração adicional dentro
 * do GTM — só o código precisa emitir o comando `gtag('consent', ...)`.
 *
 * Este arquivo NÃO decide o que entra no dataLayer — essa regra já existe em
 * src/lib/gtm.ts e é independente do consentimento de cookies: mesmo com
 * consentimento concedido, nome, telefone, e-mail e texto livre do paciente
 * continuam fora do dataLayer.
 */

export const CHAVE_CONSENT             = 'nuvem-consent-v1'
export const EVENTO_REABRIR_PREFERENCIAS = 'nuvem:abrir-preferencias-cookies'

export type ConsentCategorias = {
  analytics: boolean
  ads:       boolean
}

type ConsentSalvo = ConsentCategorias & { data: string }

function categoriasValidas(v: unknown): v is ConsentCategorias {
  return (
    typeof v === 'object' && v !== null &&
    typeof (v as ConsentCategorias).analytics === 'boolean' &&
    typeof (v as ConsentCategorias).ads === 'boolean'
  )
}

/** Lê a escolha salva. Retorna null se nunca escolheu, ou se o dado estiver corrompido. */
export function lerConsentSalvo(): ConsentCategorias | null {
  if (typeof window === 'undefined') return null
  try {
    const bruto = window.localStorage.getItem(CHAVE_CONSENT)
    if (!bruto) return null
    const escolha = JSON.parse(bruto)
    return categoriasValidas(escolha) ? escolha : null
  } catch {
    return null
  }
}

/** Salva a escolha e aplica na hora — a mesma sessão já reflete o novo consentimento. */
export function salvarConsent(escolha: ConsentCategorias): void {
  if (typeof window === 'undefined') return
  const registro: ConsentSalvo = { ...escolha, data: new Date().toISOString() }
  try {
    window.localStorage.setItem(CHAVE_CONSENT, JSON.stringify(registro))
  } catch {
    // Armazenamento indisponível (aba anônima, cota excedida): a escolha vale
    // só para esta sessão, e o banner volta a aparecer na próxima visita.
  }
  aplicarConsent(escolha)
}

/** Empurra `gtag('consent', 'update', ...)` para a camada de dados. */
export function aplicarConsent(escolha: ConsentCategorias): void {
  if (typeof window === 'undefined' || typeof window.gtag !== 'function') return
  window.gtag('consent', 'update', {
    analytics_storage:  escolha.analytics ? 'granted' : 'denied',
    ad_storage:          escolha.ads ? 'granted' : 'denied',
    ad_user_data:        escolha.ads ? 'granted' : 'denied',
    ad_personalization:  escolha.ads ? 'granted' : 'denied',
  })
}
