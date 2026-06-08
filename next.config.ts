import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'nuvemmedicina.com.br' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Fotos de perfil dos revisores do Google
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },

  // Redirecionamentos de URLs antigas do WordPress → novas URLs do site Next.js
  // Tipo 301 = permanente (preserva SEO / ranking do Google)
  async redirects() {
    return [
      // ── Médicas ────────────────────────────────────────────────────────────
      {
        source:      '/dra-vera-angelo',
        destination: '/equipe/dra-vera',
        permanent:   true,
      },
      {
        source:      '/dra-vera-angelo/',
        destination: '/equipe/dra-vera',
        permanent:   true,
      },
      {
        source:      '/dra-eliane-basques',
        destination: '/equipe/dra-eliane',
        permanent:   true,
      },
      {
        source:      '/dra-eliane-basques/',
        destination: '/equipe/dra-eliane',
        permanent:   true,
      },

      // ── Páginas gerais ─────────────────────────────────────────────────────
      {
        source:      '/equipe-medica',
        destination: '/equipe',
        permanent:   true,
      },
      {
        source:      '/quem-somos',
        destination: '/sobre',
        permanent:   true,
      },
      {
        source:      '/qualidade',
        destination: '/gestao-da-qualidade',
        permanent:   true,
      },
      {
        source:      '/iso-9001',
        destination: '/gestao-da-qualidade',
        permanent:   true,
      },
      {
        source:      '/cursos',
        destination: '/ensino',
        permanent:   true,
      },
    ]
  },
}

export default nextConfig
