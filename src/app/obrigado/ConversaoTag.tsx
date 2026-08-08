'use client'

import { useEffect, useRef } from 'react'

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}

/**
 * ConversaoTag
 * Dispara o evento de conversão quando a página de obrigado é exibida.
 *
 * O Google tag do container AW-345758268 já é carregado no layout raiz, então
 * aqui só precisamos empurrar o evento. O GA4 (G-J90YW71NMZ) recebe o evento
 * `agendamento_solicitado`, que pode ser importado como conversão no Google Ads
 * — ou, se preferir usar uma ação de conversão criada direto no Ads, basta
 * preencher CONVERSION_LABEL abaixo com o rótulo fornecido pela plataforma
 * (formato: 'AW-345758268/xxxxxxxxxxxxxxxxx').
 */
const CONVERSION_LABEL = '' // ex.: 'AW-345758268/AbC-D_efGhIjKlMnOp'

export function ConversaoTag() {
  // Evita conversão dupla no remount do StrictMode (dev)
  const disparado = useRef(false)

  useEffect(() => {
    if (disparado.current) return
    if (typeof window.gtag !== 'function') return
    disparado.current = true

    window.gtag('event', 'agendamento_solicitado', {
      event_category: 'agendamento',
      event_label:    'pagina_obrigado',
    })

    if (CONVERSION_LABEL) {
      window.gtag('event', 'conversion', { send_to: CONVERSION_LABEL })
    }
  }, [])

  return null
}
