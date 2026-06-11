import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/equipe/dra-vera',   destination: '/dra-vera-angelo',    permanent: true },
      { source: '/equipe/dra-eliane', destination: '/dra-eliane-basques', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'nuvemmedicina.com.br' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      // Fotos de perfil dos revisores do Google
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },

  async redirects() {
    return [
      // /convenios → /convenios-medicos (URL original do site antigo)
      { source: '/convenios', destination: '/convenios-medicos', permanent: true },
    ]
  },
}

export default nextConfig
