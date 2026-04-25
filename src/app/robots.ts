import type { MetadataRoute } from 'next'

const BASE = 'https://nuvemmedicina.com.br'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      // Standard crawlers
      {
        userAgent: '*',
        allow:     '/',
        disallow:  ['/api/', '/avaliacao/'],
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
