'use client'

import { useEffect, useRef } from 'react'
import { GTM_ID } from '@/lib/gtm'

/**
 * ConversaoTag — página /obrigado.
 *
 * Dispara duas coisas distintas, por motivos distintos:
 *
 * 1. A CONVERSÃO DO GOOGLE ADS. Fica aqui, e não no formulário, porque uma
 *    conversão disparada imediatamente antes de uma navegação costuma ser
 *    perdida: a requisição é cancelada junto com a página. A página de
 *    obrigado é o padrão justamente por já estar carregada quando dispara.
 *
 * 2. O evento `agendamento_solicitado` no GA4, que mede a chegada a esta
 *    página. Ele é diferente do `envio_agendamento`, disparado no próprio
 *    formulário (ver AgendarForm.tsx), que carrega o `servico_interesse` e é
 *    o evento com valor analítico.
 *
 *    ATENÇÃO ao marcar eventos principais no GA4: marque apenas UM dos dois
 *    como conversão e importe apenas UM para o Google Ads. Marcar os dois faz
 *    cada agendamento contar em dobro e derruba artificialmente o custo por
 *    conversão. A recomendação é usar `envio_agendamento`, que traz o exame.
 *
 * O rótulo da conversão vem de variável de ambiente: ele é criado dentro da
 * conta do Google Ads e trocá-lo não deve exigir deploy de código.
 */

// Formato: 'AW-000000000/AbC-D_efGhIjKlMnOp' — copiado da ação de conversão
// criada em Google Ads › Metas › Conversões. Precisa ser o AW da conta
// 935-818-7344, que não é necessariamente o mesmo AW já usado no layout.
const CONVERSION_SEND_TO = process.env.NEXT_PUBLIC_ADS_CONVERSION_LABEL ?? ''

export function ConversaoTag() {
  // Evita disparo duplo no remount do StrictMode em desenvolvimento.
  const disparado = useRef(false)

  useEffect(() => {
    if (disparado.current) return
    disparado.current = true

    if (typeof window.gtag === 'function') {
      window.gtag('event', 'agendamento_solicitado', {
        event_category: 'agendamento',
        event_label:    'pagina_obrigado',
      })

      if (CONVERSION_SEND_TO) {
        window.gtag('event', 'conversion', { send_to: CONVERSION_SEND_TO })
      } else if (process.env.NODE_ENV === 'development') {
        console.warn(
          '[ConversaoTag] NEXT_PUBLIC_ADS_CONVERSION_LABEL não definida — ' +
          'nenhuma conversão está sendo enviada ao Google Ads.'
        )
      }
    }

    // Espelha no dataLayer para quem preferir acionar a conversão pelo GTM.
    if (GTM_ID) {
      window.dataLayer = window.dataLayer ?? []
      window.dataLayer.push({ event: 'pagina_obrigado' })
    }
  }, [])

  return null
}
