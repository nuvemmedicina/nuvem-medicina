'use client'

import { useEffect, useRef } from 'react'
import { pushEvent } from '@/lib/gtm'

/**
 * ConversaoTag — página /obrigado.
 *
 * Emite `pagina_obrigado` na camada de dados. Quem transforma isso em conversão
 * do Google Ads é a tag `Ads · agendamento` do contêiner, com o rótulo da ação
 * criada na conta 935-818-7344.
 *
 * POR QUE AQUI, E NÃO NO FORMULÁRIO
 * Uma conversão disparada imediatamente antes de uma navegação costuma ser
 * perdida — a requisição é cancelada junto com a página. A página de obrigado
 * já está carregada quando dispara, e por isso é o padrão para esse caso.
 *
 * RELAÇÃO COM O `envio_agendamento`
 * O formulário emite `envio_agendamento` com o serviço de interesse; é o evento
 * de leitura, e o que responde qual exame gera agendamento. Este aqui existe
 * para a otimização de lances do Ads. São o mesmo agendamento medido em dois
 * pontos: marque apenas UM como evento principal no GA4 e importe apenas UM
 * para o Ads, senão cada agendamento conta em dobro.
 *
 * Não chame `window.gtag` daqui. O gtag deixou de ser carregado pelo layout, e
 * passou a vir do contêiner — o que significa que ele pode não existir ainda no
 * momento em que este efeito roda. A camada de dados não tem esse problema:
 * o que for empurrado antes do contêiner carregar é processado assim que ele
 * inicializa.
 */
export function ConversaoTag() {
  // Evita disparo duplo no remount do StrictMode em desenvolvimento.
  const disparado = useRef(false)

  useEffect(() => {
    if (disparado.current) return
    disparado.current = true

    pushEvent({ event: 'pagina_obrigado' })
  }, [])

  return null
}
