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

  // Redirecionamentos 301 — preservam SEO ao migrar URLs do WordPress
  async redirects() {
    return [
      // URLs antigas do WordPress → manter compatibilidade
      {
        source:      '/equipe/dra-vera',
        destination: '/dra-vera-angelo',
        permanent:   true,
      },
      {
        source:      '/equipe/dra-eliane',
        destination: '/dra-eliane-basques',
        permanent:   true,
      },
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
