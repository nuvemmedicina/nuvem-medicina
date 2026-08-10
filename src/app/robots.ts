import type { MetadataRoute } from 'next'
import { SITE_URL as BASE } from '@/lib/site'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers
      {
        userAgent: '*',
        allow:     '/',
        // /studio é o painel do Sanity e não deve ser rastreado.
        // /obrigado NÃO entra aqui de propósito: a página já declara noindex no
        // próprio HTML, e bloqueá-la no robots impediria o Google de rastreá-la
        // para ler esse noindex — ela continuaria indexável por links externos.
        disallow:  ['/api/', '/avaliacao/', '/studio/'],
      },
      // ── AI crawlers — allow all public content for LLM indexing ──────────────
      // This helps ChatGPT, Perplexity, Claude, Gemini etc. index the clinic
      {
        userAgent: 'GPTBot',         // OpenAI / ChatGPT
        allow:     '/',
        disallow:  ['/api/'],
      },
      {
        userAgent: 'ClaudeBot',      // Anthropic / Claude
        allow:     '/',
        disallow:  ['/api/'],
      },
      {
        userAgent: 'PerplexityBot',  // Perplexity AI
        allow:     '/',
        disallow:  ['/api/'],
      },
      {
        userAgent: 'Google-Extended', // Gemini / Google AI
        allow:     '/',
        disallow:  ['/api/'],
      },
      {
        userAgent: 'Bytespider',     // ByteDance / Doubao
        allow:     '/',
        disallow:  ['/api/'],
      },
      {
        userAgent: 'CCBot',          // Common Crawl (training data)
        allow:     '/',
      },
    ],
    sitemap:    `${BASE}/sitemap.xml`,
    host:       BASE,
  }
}
