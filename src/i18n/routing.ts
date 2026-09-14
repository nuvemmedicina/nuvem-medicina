import { defineRouting } from 'next-intl/routing'

/**
 * pt-BR é o idioma default e nunca leva prefixo — preserva as URLs atuais e o
 * mapa de redirects 301 em next.config.ts, que aponta para paths sem prefixo.
 * en/es levam prefixo (/en/..., /es/...).
 */
export const routing = defineRouting({
  locales:       ['pt-BR', 'en', 'es'],
  defaultLocale: 'pt-BR',
  localePrefix:  'as-needed',
})

export type AppLocale = (typeof routing.locales)[number]
