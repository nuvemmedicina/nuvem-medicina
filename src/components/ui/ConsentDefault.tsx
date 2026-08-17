import Script from 'next/script'
import { CHAVE_CONSENT } from '@/lib/consent'

/**
 * Define o consentimento padrão como negado ANTES do contêiner GTM carregar.
 * Precisa vir antes — se o GTM carregar primeiro e alguma tag disparar antes
 * deste comando, ela dispara sem saber que deveria estar negada por padrão.
 *
 * `strategy="beforeInteractive"` garante isso independente da ordem no JSX:
 * o Next.js sempre executa scripts beforeInteractive antes de afterInteractive
 * (a estratégia do GoogleTagManager).
 *
 * Se a pessoa já escolheu antes (localStorage), aplica a escolha salva na
 * mesma passada — evita que quem já aceitou veja um instante de "negado" a
 * cada nova visita, antes do React hidratar e o ConsentBanner rodar seu efeito.
 */
export function ConsentDefault() {
  return (
    <Script id="consent-default" strategy="beforeInteractive">
      {`
        window.dataLayer = window.dataLayer || [];
        function gtag(){ window.dataLayer.push(arguments); }
        window.gtag = gtag;

        gtag('consent', 'default', {
          analytics_storage:  'denied',
          ad_storage:          'denied',
          ad_user_data:        'denied',
          ad_personalization:  'denied',
        });

        try {
          var salvo = JSON.parse(localStorage.getItem('${CHAVE_CONSENT}'));
          if (salvo && typeof salvo.analytics === 'boolean' && typeof salvo.ads === 'boolean') {
            gtag('consent', 'update', {
              analytics_storage:  salvo.analytics ? 'granted' : 'denied',
              ad_storage:          salvo.ads ? 'granted' : 'denied',
              ad_user_data:        salvo.ads ? 'granted' : 'denied',
              ad_personalization:  salvo.ads ? 'granted' : 'denied',
            });
          }
        } catch (e) {}
      `}
    </Script>
  )
}
