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

/**
 * URLs herdadas do site em WordPress anterior à migração para Next.js (abril de
 * 2026). Levantadas em 17/08/2026 a partir do relatório "Não encontrado (404)"
 * do Search Console — 123 URLs únicas, das 162 que o card de indexação mostrava
 * (o restante eram variações de query string do mesmo path). O Google ainda as
 * rastreia porque seguem linkadas de fora: posts antigos do Instagram com
 * parâmetros fbclid/gclid, e a própria indexação residual do WordPress.
 *
 * Nove artigos batem exatamente com o slug de um post do blog atual — o mesmo
 * texto, publicado de novo sem redirect na migração.
 */
const blogAntigos = [
  'candidiase-de-repeticao-qual-a-relacao-com-o-intestino',
  'efetividade-da-osteopatia-na-constipacao-refrataria-por-ptose-do-colon-transverso',
  'esofagite-eosinofilica-tratamento-com-ibps-e-diagnostico',
  'existe-relacao-entre-uso-de-inibidores-de-bomba-de-protons-ibps-e-demencia',
  'incoordenacao-abdomino-anal-nas-desordens-da-evacuacao',
  'intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica',
  'intolerancia-a-lactose-e-supercrescimento-bacteriano-do-intestino-delgado',
  'microbioma-intestinal-e-longevidade',
  'o-que-e-incontinencia-fecal',
].map(slug => ({
  source:      `/${slug}`,
  destination: `/blog/${slug}`,
  permanent:   true,
}))

/**
 * Três URLs antigas do blog cujo slug não bate exatamente com o post atual,
 * mas que são o mesmo artigo revisado — confirmado com a clínica em 18/08/2026.
 * Diferente do bloco acima (mapeamento automático por slug idêntico), aqui o
 * destino é escrito à mão, então cada linha carrega o antigo e o novo lado a
 * lado por clareza.
 */
const blogRevisados = [
  { source: '/sindrome-de-hiperemese-por-canabinoides', destination: '/blog/sindrome-de-hiperemese-por-canabinoides-como-diferenciar-do-vomito-ciclico' },
  { source: '/esofagite-eosinofilica-guia-completo-da-federacao-brasileira-de-gastroenterologia', destination: '/blog/esofagite-eosinofilica-tratamento-com-ibps-e-diagnostico' },
  { source: '/roma-atualizacao-sobre-inchaco-e-distensao-abdominal', destination: '/blog/inchaco-e-distensao-abdominal-abordagem-atualizada-roma-v' },
].map(r => ({ ...r, permanent: true }))

// URLs antigas dos exames e de artigos sobre eles, sem o prefixo /exames/ atual.
const examesAntigos = [
  { source: '/manometria-esofagica',                                            destination: '/exames/manometria-esofagica' },
  { source: '/manometria-anorretal',                                            destination: '/exames/manometria-anorretal' },
  { source: '/para-que-serve-e-como-funciona-o-exame-de-manometria-anorretal',   destination: '/exames/manometria-anorretal' },
  { source: '/halimetria',                                                      destination: '/exames/halimetria-sialometria' },
  { source: '/halimetria-e-sialometria',                                        destination: '/exames/halimetria-sialometria' },
  { source: '/ph-impedanciometria-esofagica',                                   destination: '/exames/phmetria-impedanciometria' },
  { source: '/phimpedanciometria-esofagica',                                    destination: '/exames/phmetria-impedanciometria' },
  { source: '/phmetria-esofagicas',                                             destination: '/exames/phmetria-impedanciometria' },
  { source: '/impedancio-phmetria',                                             destination: '/exames/phmetria-impedanciometria' },
  { source: '/teste-respiratorio-h-pylori',                                     destination: '/exames/testes-respiratorios' },
  { source: '/teste-respiratorio-para-h-pylori',                                destination: '/exames/testes-respiratorios' },
  { source: '/teste-respiratorio-de-hidrogenio-e-metano',                       destination: '/exames/testes-respiratorios' },
  { source: '/teste-respiratorio-de-hidrogenio-expirado',                       destination: '/exames/testes-respiratorios' },
  { source: '/exame-para-teste-respiratorio',                                   destination: '/exames/testes-respiratorios' },
].map(r => ({ ...r, permanent: true }))

// Idem para especialidades, sem o prefixo /especialidades/.
const especialidadesAntigas = [
  { source: '/gastroenterologia',            destination: '/especialidades/gastroenterologia' },
  { source: '/nefrologia',                   destination: '/especialidades/nefrologia' },
  { source: '/halitose',                     destination: '/especialidades/halitose' },
  { source: '/fisioterapia-pelvica',         destination: '/especialidades/fisioterapia-pelvica' },
  { source: '/pediatria-e-saude-da-familia', destination: '/especialidades/pediatria' },
].map(r => ({ ...r, permanent: true }))

// Páginas de preparo em formatos antigos (variações de grafia acumuladas ao
// longo dos anos no WordPress). Todas convergem para o hub atual de preparos,
// que lista o PDF de cada exame. /preparo-colonoscopia é a única sem exame
// correspondente na clínica hoje — mesmo assim manda para o hub em vez de
// deixar 404, para quem chegou buscando "preparo" ter onde continuar.
const preparosAntigos = [
  'preparo-colonoscopia',
  'preparo-halimetria',
  'preparo-halimetria-e-sialometria',
  'preparo-impedancio-phmetria',
  'preparo-impedanciophmetria-esofagica',
  'preparo-manometria-anorretal',
  'preparo-manometria-esofagica',
  'preparo-para-criancas-phmetria-esofagica',
  'preparo-para-teste-respiratorio-para-h-pylori',
  'preparo-ph-impedanciometria-esofagica',
  'preparo-phimpedanciometria-esofagica',
  'preparo-phmetria-esofagica',
  'preparo-teste-respiratorio-com-hidrogenio-e-metano',
  'preparo-teste-respiratorio-com-hidrogenio-expirado',
  'preparo-teste-respiratorio-h-pylori',
  'preparo-teste-respiratorio-hidrogenio-metano',
  'guia-de-preparo-teste-respiratorio-para-pesquisa-de-h-pylori',
].map(slug => ({
  source:      `/${slug}`,
  destination: '/exames/preparos',
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

      // Endereço curto que as pessoas tentam adivinhar para a página de links da bio.
      { source: '/bio',                           destination: '/links',              permanent: true },

      // Página removida em ca59088. /sobre é o destino mais próximo em conteúdo.
      { source: '/parceiros',                     destination: '/sobre',              permanent: true },

      // Páginas institucionais do WordPress, em endereços diferentes dos atuais.
      { source: '/atendimentos',                  destination: '/especialidades',     permanent: true },
      { source: '/equipe-nuvem',                  destination: '/equipe',             permanent: true },
      { source: '/agende-sua-consulta',           destination: '/agendar',            permanent: true },
      { source: '/gestao-da-qualidade-iso-9001',  destination: '/gestao-da-qualidade', permanent: true },
      { source: '/certificacao-iso-9001',         destination: '/gestao-da-qualidade', permanent: true },
      { source: '/dra-eliane-basques-moura',      destination: '/dra-eliane-basques', permanent: true },
      { source: '/profissionais-parceiros',       destination: '/sobre',              permanent: true },
      { source: '/eleve-sua-carreira-na-saude-conheca-a-excelencia-dos-cursos-da-nuvem-ensino', destination: '/ensino', permanent: true },
      { source: '/youtube',                       destination: 'https://www.youtube.com/@NuvemMedicina', permanent: true },

      ...pdfsRenomeados,
      ...blogAntigos,
      ...blogRevisados,
      ...examesAntigos,
      ...especialidadesAntigas,
      ...preparosAntigos,

      // Ruído estrutural do WordPress sem conteúdo por trás: paginação do blog,
      // arquivos por categoria, por autor e por data. Sem página equivalente
      // específica — manda para a listagem do blog, que é o destino mais
      // próximo do que a pessoa procurava.
      { source: '/page/:num*',     destination: '/blog', permanent: true },
      { source: '/category/:path*', destination: '/blog', permanent: true },
      { source: '/author/:path*',  destination: '/blog', permanent: true },
      { source: '/:year(\\d{4})/:rest*', destination: '/blog', permanent: true },
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
