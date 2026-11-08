import Script from 'next/script'
import { GTM_ID, ROTA_SEM_MEDICAO } from '@/lib/gtm'

/**
 * Contêiner do Google Tag Manager: única fonte de medição do site.
 *
 * O contêiner GTM-N78Z3XT carrega, no acionador Initialization - All Pages:
 *   · a tag do Google do GA4  (G-J90YW71NMZ), com send_page_view
 *   · a tag do Google do Ads  (AW-18362842181)
 *   · o Vinculador de conversões
 * e, sobre elas, os sete eventos do relatório e as três conversões do Ads.
 *
 * NÃO adicione um bloco gtag ao layout. Ele configuraria as mesmas propriedades
 * uma segunda vez, e cada visita passaria a contar em dobro: sem erro nenhum
 * aparecer. Foi exatamente para evitar essa janela que a remoção do gtag e a
 * definição de NEXT_PUBLIC_GTM_ID subiram no mesmo deploy.
 *
 * SÓ EM PRODUÇÃO: o contêiner carrega apenas quando VERCEL_ENV é
 * 'production'. Em desenvolvimento local e nos deploys de preview da Vercel ele
 * não carrega, para testes não mandarem eventos ao GA4 e ao Ads reais. O
 * dataLayer continua sendo preenchido normalmente (pushEvent, consentimento),
 * então dá para conferir os eventos no console com `window.dataLayer`. Para
 * testar as tags, use o GTM Preview no site em produção (ver TRACKING.md).
 *
 * ATENÇÃO: sem `NEXT_PUBLIC_GTM_ID` o componente não renderiza nada, e, desde
 * a migração, isso significa o site inteiro sem medição alguma. A variável
 * precisa existir nos três ambientes da Vercel.
 */
const GTM_ATIVO = Boolean(GTM_ID) && process.env.VERCEL_ENV === 'production'

export function GoogleTagManager() {
  if (!GTM_ATIVO) return null

  return (
    <Script id="gtm-init" strategy="afterInteractive">
      {`if(!new RegExp(${JSON.stringify(ROTA_SEM_MEDICAO)}).test(location.pathname))(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
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
  if (!GTM_ATIVO) return null

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
