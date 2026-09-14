import { routing } from '@/i18n/routing'

/**
 * Gera `alternates.canonical` (auto-referente por idioma) e
 * `alternates.languages` (cluster de hreflang) a partir de um path relativo
 * já sem prefixo de idioma (ex.: "/especialidades/gastroenterologia").
 *
 * pt-BR é o defaultLocale e nunca leva prefixo (localePrefix: 'as-needed'),
 * então withLocale('pt-BR') devolve o path puro.
 */
export function localizedAlternates(path: string, locale: string) {
  const withLocale = (l: string) => (l === routing.defaultLocale ? path : `/${l}${path}`)

  return {
    canonical: withLocale(locale),
    languages: {
      'pt-BR':      withLocale('pt-BR'),
      en:           withLocale('en'),
      es:           withLocale('es'),
      'x-default':  withLocale(routing.defaultLocale),
    },
  }
}
