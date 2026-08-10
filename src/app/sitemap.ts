import type { MetadataRoute } from 'next'
import { ESPECIALIDADES, EXAMES } from '@/lib/data'
import { getAllPosts } from '@/lib/sanity/queries'
import { SITE_URL as BASE } from '@/lib/site'

/**
 * O sitemap só deve listar URLs que respondem 200 e são autocanônicas.
 * Não incluir aqui: rotas que caem em redirect 301 (ex.: /convenios, que aponta
 * para /convenios-medicos), páginas com noindex (/obrigado), o Studio do Sanity
 * e a página de avaliação, bloqueada no robots.txt.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const agora = new Date()

  const staticPages = [
    { url: BASE,                              priority: 1.0,  changeFrequency: 'weekly'  as const },
    { url: `${BASE}/sobre`,                   priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/equipe`,                  priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/dra-vera-angelo`,         priority: 0.75, changeFrequency: 'monthly' as const },
    { url: `${BASE}/dra-eliane-basques`,      priority: 0.75, changeFrequency: 'monthly' as const },
    { url: `${BASE}/gestao-da-qualidade`,     priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/especialidades`,          priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/exames`,                  priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/exames/preparos`,         priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/ensino`,                  priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/blog`,                    priority: 0.75, changeFrequency: 'weekly'  as const },
    { url: `${BASE}/agendar`,                 priority: 0.95, changeFrequency: 'monthly' as const },
    { url: `${BASE}/contato`,                 priority: 0.7,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/convenios-medicos`,       priority: 0.7,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/direitos-do-paciente`,    priority: 0.4,  changeFrequency: 'yearly'  as const },
    { url: `${BASE}/politica-de-privacidade`, priority: 0.3,  changeFrequency: 'yearly'  as const },
  ].map(p => ({ ...p, lastModified: agora }))

  const especialidadePages = ESPECIALIDADES.map(esp => ({
    url:             `${BASE}/especialidades/${esp.slug}`,
    priority:        0.85,
    changeFrequency: 'monthly' as const,
    lastModified:    agora,
  }))

  const examePages = EXAMES.map(ex => ({
    url:             `${BASE}/exames/${ex.id}`,
    priority:        0.85,
    changeFrequency: 'monthly' as const,
    lastModified:    agora,
  }))

  // Posts do blog. Se o Sanity estiver indisponível no build, o sitemap sai sem
  // os posts em vez de derrubar a geração da página inteira.
  let postPages: MetadataRoute.Sitemap = []
  try {
    const posts = await getAllPosts()
    postPages = posts.map(post => ({
      url:             `${BASE}/blog/${post.slug.current}`,
      priority:        0.7,
      changeFrequency: 'monthly' as const,
      lastModified:    post.publishedAt ? new Date(post.publishedAt) : agora,
    }))
  } catch {
    postPages = []
  }

  return [...staticPages, ...especialidadePages, ...examePages, ...postPages]
}
