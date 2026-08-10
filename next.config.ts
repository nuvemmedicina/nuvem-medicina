import type { NextConfig } from 'next'

/**
 * Redirects 301 das URLs antigas que hoje caem em 404.
 *
 * Os sete PDFs de preparo foram renomeados para o sufixo -v1 no commit 89e01ca
 * (18/05/2026) e a página /parceiros foi removida em ca59088 (20/05/2026), ambos
 * dentro da janela de medição do relatório. As URLs antigas seguem indexadas no
 * Google e linkadas em posts, laudos impressos e mensagens de WhatsApp antigas,
 * e respondem 404 desde então.
 */
const pdfsRenomeados = [
  'preparo-manometria-esofagica',
  'preparo-manometria-anorretal',
  'preparo-phmetria-impedanciometria',
  'preparo-teste-respiratorio-sibo-imo',
  'preparo-teste-respiratorio-hpylori',
  'preparo-halimetria-sialometria',
  'preparo-avaliacao-pelvica',
].map(nome => ({
  source:      `/pdfs/${nome}.pdf`,
  destination: `/pdfs/${nome}-v1.pdf`,
  permanent:   true,
}))

const nextConfig: NextConfig = {
  async redirects() {
    return [
      { source: '/convenios',                     destination: '/convenios-medicos',  permanent: true },
      { source: '/equipe/dra-vera',               destination: '/dra-vera-angelo',    permanent: true },
      { source: '/equipe/dra-eliane',              destination: '/dra-eliane-basques', permanent: true },
      { source: '/atendimentos-e-especialidades', destination: '/especialidades',     permanent: true },
      { source: '/preparos-para-exames',          destination: '/exames/preparos',    permanent: true },

      // Página removida em ca59088. /sobre é o destino mais próximo em conteúdo.
      { source: '/parceiros',                     destination: '/sobre',              permanent: true },

      ...pdfsRenomeados,
    ]
  },

  async headers() {
    // Deploys de preview e desenvolvimento não podem ser indexados: são cópias
    // integrais do site em outro host e competem com o domínio real na busca.
    if (process.env.VERCEL_ENV === 'production') return []
    return [{
      source:  '/:path*',
      headers: [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }],
    }]
  },

  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'nuvemmedicina.com.br' },
      { protocol: 'https', hostname: 'www.nuvemmedicina.com.br' },
      { protocol: 'https', hostname: 'cdn.sanity.io' },
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
    ],
  },
}

export default nextConfig
