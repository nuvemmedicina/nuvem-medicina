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

/**
 * Variante de `localizedAlternates` para conteúdo cujo slug muda por idioma
 * (artigos do blog). Recebe as versões existentes e só declara hreflang para
 * os idiomas que de fato têm a página; x-default aponta para a versão pt-BR,
 * ou para a versão atual quando não há pt-BR.
 */
export function translatedAlternates(
  basePath: string,
  locale: string,
  versions: { language: string; slug: string }[],
) {
  const withLocale = (l: string, slug: string) => {
    const path = `${basePath}/${slug}`
    return l === routing.defaultLocale ? path : `/${l}${path}`
  }

  const languages: Record<string, string> = {}
  for (const l of routing.locales) {
    const v = versions.find(x => x.language === l)
    if (v) languages[l] = withLocale(l, v.slug)
  }
  const atual = versions.find(x => x.language === locale)
  const padrao = languages[routing.defaultLocale] ?? (atual && withLocale(locale, atual.slug))
  if (padrao) languages['x-default'] = padrao

  return {
    canonical: atual ? withLocale(locale, atual.slug) : undefined,
    languages,
  }
}
