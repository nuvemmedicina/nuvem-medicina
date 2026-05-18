import type { MetadataRoute } from 'next'
import { ESPECIALIDADES, EXAMES } from '@/lib/data'

const BASE = 'https://nuvemmedicina.com.br'

export default function sitemap(): MetadataRoute.Sitemap {
  const staticPages = [
    { url: BASE,                                  priority: 1.0,  changeFrequency: 'weekly'  as const },
    { url: `${BASE}/sobre`,                       priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/equipe`,                      priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/gestao-da-qualidade`,         priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/especialidades`,              priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/exames`,                      priority: 0.9,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/exames/preparos`,             priority: 0.85, changeFrequency: 'monthly' as const },
    { url: `${BASE}/ensino`,                      priority: 0.8,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/blog`,                        priority: 0.75, changeFrequency: 'weekly'  as const },
    { url: `${BASE}/agendar`,                     priority: 0.95, changeFrequency: 'monthly' as const },
    { url: `${BASE}/contato`,                     priority: 0.7,  changeFrequency: 'monthly' as const },
    { url: `${BASE}/convenios`,                   priority: 0.7,  changeFrequency: 'monthly' as const },
  ]

  const especialidadePages = ESPECIALIDADES.map(esp => ({
    url:              `${BASE}/especialidades/${esp.slug}`,
    priority:         0.85,
    changeFrequency:  'monthly' as const,
  }))

  const examePages = EXAMES.map(ex => ({
    url:              `${BASE}/exames/${ex.id}`,
    priority:         0.85,
    changeFrequency:  'monthly' as const,
  }))

  return [
    ...staticPages,
    ...especialidadePages,
    ...examePages,
  ].map(page => ({
    ...page,
    lastModified: new Date(),
  }))
}
