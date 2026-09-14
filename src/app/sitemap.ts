import type { MetadataRoute } from 'next'
import { ESPECIALIDADES, EXAMES } from '@/lib/data'
import { getAllPosts } from '@/lib/sanity/queries'
import { SITE_URL as BASE } from '@/lib/site'
import { routing } from '@/i18n/routing'

/**
 * O sitemap só deve listar URLs que respondem 200 e são autocanônicas.
 * Não incluir aqui: rotas que caem em redirect 301 (ex.: /convenios, que aponta
 * para /convenios-medicos), páginas com noindex (/obrigado), o Studio do Sanity
 * e a página de avaliação, bloqueada no robots.txt.
 *
 * Páginas já traduzidas (en/es) ganham uma entrada por idioma com
 * `alternates.languages` apontando as três versões (hreflang). Páginas ainda
 * só em português (fase 2 do projeto multilíngue) continuam com uma única
 * entrada pt-BR, sem bloco de idiomas.
 */

function withLocale(path: string, locale: string) {
  return locale === routing.defaultLocale ? `${BASE}${path}` : `${BASE}/${locale}${path}`
}

function localizedEntry(
  path: string,
  priority: number,
  changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'],
  lastModified: Date,
): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(
    routing.locales.map(l => [l, withLocale(path, l)]),
  )
  languages['x-default'] = withLocale(path, routing.defaultLocale)

  return routing.locales.map(locale => ({
    url: withLocale(path, locale),
    priority,
    changeFrequency,
    lastModified,
    alternates: { languages },
  }))
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const agora = new Date()

  // ── Páginas traduzidas (pt-BR + en + es) ────────────────────────────────
  const translatedPages = [
    { path: '/',                priority: 1.0,  changeFrequency: 'weekly'  as const },
    { path: '/especialidades',  priority: 0.9,  changeFrequency: 'monthly' as const },
    { path: '/exames',          priority: 0.9,  changeFrequency: 'monthly' as const },
    { path: '/exames/preparos', priority: 0.85, changeFrequency: 'monthly' as const },
    { path: '/blog',            priority: 0.75, changeFrequency: 'weekly'  as const },
    { path: '/agendar',         priority: 0.95, changeFrequency: 'monthly' as const },
    { path: '/contato',         priority: 0.7,  changeFrequency: 'monthly' as const },
  ].flatMap(p => localizedEntry(p.path, p.priority, p.changeFrequency, agora))

  const especialidadePages = ESPECIALIDADES.flatMap(esp =>
    localizedEntry(`/especialidades/${esp.slug}`, 0.85, 'monthly', agora),
  )

  const examePages = EXAMES.flatMap(ex =>
    localizedEntry(`/exames/${ex.id}`, 0.85, 'monthly', agora),
  )

  // ── Páginas ainda só em português (fase 2) ──────────────────────────────
  const ptOnlyPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/sobre`,                   priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/equipe`,                  priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/dra-vera-angelo`,         priority: 0.75, changeFrequency: 'monthly' as const },
    { url: `${BASE}/dra-eliane-basques`,      priority: 0.75, changeFrequency: 'monthly' as const },
    { url: `${BASE}/gestao-da-qualidade`,     priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/ensino`,                  priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/convenios-medicos`,       priority: 0.7,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/direitos-do-paciente`,    priority: 0.4,  changeFrequency: 'yearly'  as const },
    { url: `${BASE}/politica-de-privacidade`, priority: 0.3,  changeFrequency: 'yearly'  as const },
  ].map(p => ({ ...p, lastModified: agora }))

  // Posts do blog. Ainda só em pt-BR (tradução via IA é piloto, fase seguinte
  // deste projeto) — sem bloco de idiomas até existirem posts en/es publicados.
  // Se o Sanity estiver indisponível no build, o sitemap sai sem os posts em
  // vez de derrubar a geração da página inteira.
  let postPages: MetadataRoute.Sitemap = []
  try {
    const posts = await getAllPosts()
    postPages = posts.map(post => ({
      url:             `${BASE}/blog/${post.slug.current}`,
      priority:        0.7,
      changeFrequency: 'monthly' as const,
      lastModified:    post.dataRevisao ? new Date(post.dataRevisao)
                      : post.publishedAt ? new Date(post.publishedAt)
                      : agora,
    }))
  } catch {
    postPages = []
  }

  return [...translatedPages, ...especialidadePages, ...examePages, ...ptOnlyPages, ...postPages]
}
