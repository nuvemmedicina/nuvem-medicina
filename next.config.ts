import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/convenios',         destination: '/convenios-medicos',  permanent: true },
      { source: '/equipe/dra-vera',   destination: '/dra-vera-angelo',    permanent: true },
      { source: '/equipe/dra-eliane', destination: '/dra-eliane-basques', permanent: true },
    ]
  },
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'nuvemmedicina.com.br' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
}

export default nextConfig
