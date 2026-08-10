import Script from 'next/script'
import { GTM_ID } from '@/lib/gtm'

/**
 * Contêiner do Google Tag Manager.
 *
 * DIVISÃO DE RESPONSABILIDADE — importante para não contar nada duas vezes.
 *
 * O `layout.tsx` continua carregando o Google tag (gtag.js) da conta do Google
 * Ads, que já configura AW-345758268 e G-J90YW71NMZ. É ele quem envia o
 * `page_view`. O GTM entra apenas para os EVENTOS de conversão.
 *
 * Enquanto essa divisão valer, o contêiner do GTM NÃO pode conter uma tag de
 * configuração do Google (Google Tag) apontando para G-J90YW71NMZ: haveria
 * duas configurações do GA4 na mesma página e todo pageview seria contado em
 * dobro. Use apenas tags do tipo "GA4 Event".
 *
 * Se um dia toda a coleta for migrada para dentro do GTM, o caminho é: criar a
 * tag de configuração no GTM, validar no DebugView, e só então remover o bloco
 * gtag do layout — nessa ordem, nunca simultaneamente.
 *
 * Sem `NEXT_PUBLIC_GTM_ID` definido, o componente não renderiza nada. Isso
 * mantém o site inalterado até o contêiner estar configurado e publicado.
 */
export function GoogleTagManager() {
  if (!GTM_ID) return null

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','${GTM_ID}');`}
    </Script>
  )
}

/**
 * Fallback para navegadores sem JavaScript. Vai no início do <body>.
 */
export function GoogleTagManagerNoScript() {
  if (!GTM_ID) return null

  return (
    <noscript>
      <iframe
        src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
        height="0"
        width="0"
        style={{ display: 'none', visibility: 'hidden' }}
      />
    </noscript>
  )
}
