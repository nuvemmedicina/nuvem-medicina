'use client'

import Script from 'next/script'

interface Props {
  measurementId: string
}

/**
 * GoogleAnalytics
 * Carrega o GA4 via next/script com strategy="afterInteractive"
 * para não bloquear o carregamento da página.
 */
export function GoogleAnalytics({ measurementId }: Props) {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}
