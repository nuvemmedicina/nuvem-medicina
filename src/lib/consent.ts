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
 * O único evento que este arquivo emite é `consentimento_concedido`, só com
 * dados da página (ver emitirConsentimentoConcedido). A regra do que pode
 * entrar no dataLayer está em src/lib/gtm.ts e é independente do
 * consentimento de cookies: mesmo com
 * consentimento concedido, nome, telefone, e-mail e texto livre do paciente
 * continuam fora do dataLayer.
 */

import { pushEvent } from '@/lib/gtm'

export const CHAVE_CONSENT            = 'nuvem-consent-v1'
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

/**
 * Estado do analytics que está valendo nesta visita. `null` até a primeira
 * escolha da sessão: nesse caso vale o que estava salvo quando o site carregou
 * (o mesmo que o ConsentDefault aplicou antes do GTM).
 */
let analyticsAtual: boolean | null = null

/** Caminhos que já emitiram `consentimento_concedido` nesta visita. */
const paginasComConsentimento = new Set<string>()

/**
 * Emite `consentimento_concedido` com os dados da página atual.
 *
 * POR QUE EXISTE
 * O page_view da tag do Google sai no carregamento, quando o analytics ainda
 * está negado. No modo avançado do Consent Mode ele vira um sinal sem cookie,
 * que não aparece nos relatórios, e o GA4 não reenvia o page_view quando a
 * pessoa aceita. Os eventos seguintes (rolagem, cliques) já saem com
 * consentimento e contam o usuário. Resultado: usuários sem visualização.
 * Uma tag GA4 `page_view` no GTM, acionada por este evento, cobre essa lacuna.
 * Ver TRACKING.md.
 *
 * `page_location` leva a URL completa de propósito: a query string traz
 * utm_* e gclid, e é deste page_view que o GA4 tira a origem da sessão de quem
 * aceitou. Os formulários do site não usam GET, então não há dado pessoal nela.
 */
function emitirConsentimentoConcedido(): void {
  const caminho = window.location.pathname
  if (paginasComConsentimento.has(caminho)) return
  paginasComConsentimento.add(caminho)
  pushEvent({
    event:         'consentimento_concedido',
    page_location: window.location.href,
    page_path:     caminho,
    page_title:    document.title,
  })
}

/** Salva a escolha e aplica na hora: a mesma sessão já reflete o novo consentimento. */
export function salvarConsent(escolha: ConsentCategorias): void {
  if (typeof window === 'undefined') return
  const analyticsAntes = analyticsAtual ?? lerConsentSalvo()?.analytics === true
  const registro: ConsentSalvo = { ...escolha, data: new Date().toISOString() }
  try {
    window.localStorage.setItem(CHAVE_CONSENT, JSON.stringify(registro))
  } catch {
    // Armazenamento indisponível (aba anônima, cota excedida): a escolha vale
    // só para esta sessão, e o banner volta a aparecer na próxima visita.
  }
  aplicarConsent(escolha)
  analyticsAtual = escolha.analytics

  // Só na passagem de negado para concedido. Quem volta com o aceite já salvo
  // não passa por aqui com analyticsAntes = false, e quem recusa nunca dispara.
  // A ordem importa: o update de consentimento já está no dataLayer antes deste
  // evento, então a tag acionada por ele sai com analytics concedido.
  if (!analyticsAntes && escolha.analytics) emitirConsentimentoConcedido()
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
