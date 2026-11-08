import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts')

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
  { source: '/halimetria',                                                      destination: '/exames' },
  { source: '/halimetria-e-sialometria',                                        destination: '/exames' },
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

/**
 * Halimetria e sialometria saíram do site (decisão da clínica em 06/11/2026).
 * A página do exame volta para a lista de exames, na língua de origem; os
 * PDFs de preparo voltam para o hub de preparos.
 */
const halimetriaRemovida = [
  { source: '/exames/halimetria-sialometria',    destination: '/exames' },
  { source: '/en/exames/halimetria-sialometria', destination: '/en/exames' },
  { source: '/es/exames/halimetria-sialometria', destination: '/es/exames' },
  { source: '/preparo-halimetria',               destination: '/exames' },
  { source: '/preparo-halimetria-e-sialometria', destination: '/exames' },
  { source: '/pdfs/preparo-halimetria-sialometria.pdf',    destination: '/exames/preparos' },
  { source: '/pdfs/preparo-halimetria-sialometria-v1.pdf', destination: '/exames/preparos' },
].map(r => ({ ...r, permanent: true }))

/**
 * Variantes com erro de digitação de slugs publicados, vistas no Search Console
 * (11/2026). Não existem no Sanity nem em link interno do site: vêm de links
 * externos. Cada uma vai para o slug correto, que não muda. Variantes com
 * acento entram também na forma codificada (%C3%A7...), como chegam na URL.
 */
const slugsComErro = [
  { source: '/blog/candidiase-de-repetica-qual-a-relacao-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-repeticao-qual-a-relacao-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repeticao-qual-a-reacao-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repeticao-qual-a-relação-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repeticao-qual-a-rela%C3%A7%C3%A3o-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repetica-qual-a-re-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repeticao-qual-a-rela-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repeticao-qual-a-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repeticao-qual-a-rela-ao-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intesto', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repeticaoo-qual-a-relacao-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repocao-qual-a-relacao-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repete-qual-a-relacao-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-de-repeteicao-qual-a-reacao-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-repeticao-qual-a-re-acao-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-repeticao-qual-a-re-relacao-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-repeticao-qual-relacao-com-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-repeticao-qual-a-relação-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/candidiase-repeticao-qual-a-rela%C3%A7%C3%A3o-com-o-intestino', destination: '/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino' },
  { source: '/blog/intolerancia-a-histamina-fique-atento-a-chegar-esta-condicao-patologica', destination: '/blog/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica' },
  { source: '/blog/intolerancia-a-fique-atento-a-esta-condicao-patologica', destination: '/blog/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica' },
  { source: '/blog/intolerancia-a-histamina-fique-atento-a-dessa-condicao-patologica', destination: '/blog/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica' },
  { source: '/blog/intolerancia-a-histamina-fique-atento-a-staf-condicao-patologica', destination: '/blog/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica' },
  { source: '/blog/saude/doencas-e-sintomas/intolerancia-a-histamina', destination: '/blog/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica' },
  { source: '/blog/teste-respiratorio-sibo-imo-intoleranciasil', destination: '/blog/teste-respiratorio-sibo-imo-intolerancias' },
  { source: '/blog/imo-supercrescimento-metanogenico-guia-completo', destination: '/blog/imo-supercrescimento-metanogenico-intestinal-guia-completo' },
  { source: '/blog/vida-celiaca-em-casa-com-gluten-como-sobreviver-e-viver-bem-dividindo-a-comida', destination: '/blog/vida-celiaca-em-casa-com-gluten-como-sobreviver-e-viver-bem-dividindo-a-cozinha' },
  { source: '/exames/testes-respiratorios-sibo-e-h-pylori-em-bh', destination: '/exames/testes-respiratorios' },
].map(r => ({ ...r, permanent: true }))

/**
 * Artigos do WordPress antigo que ainda aparecem no Search Console (11/2026)
 * e não têm o mesmo slug no Sanity. Destino aprovado pela clínica, nesta
 * ordem de preferência: artigo de tema parecido, página de exame ou de
 * especialidade, e /blog só em último caso. Motivo de cada um em
 * RELATORIO-CORRECOES.md.
 */
const artigosSemPar = [
  { source: '/flatulencia-um-tabu-social-nuvem-medicina', destination: '/blog/inchaco-e-distensao-abdominal-abordagem-atualizada-roma-v' },
  { source: '/disfagia-secundaria-a-clozapina-uma-relacao-negligenciada', destination: '/exames/manometria-esofagica' },
  { source: '/intolerancia-a-sacarose-e-sintomas-inexplicaveis-do-trato-gastrointestinal', destination: '/blog/teste-respiratorio-sibo-imo-intolerancias' },
  { source: '/disfagia-globus-tosse-cronica-laringofaringea', destination: '/exames/phmetria-impedanciometria' },
  { source: '/impacto-do-uso-de-probioticos-nas-prostatites', destination: '/blog' },
  { source: '/voce-ja-ouviu-falar-sobre-os-dilemas-da-vida-celiaca', destination: '/blog/vida-celiaca-em-casa-com-gluten-como-sobreviver-e-viver-bem-dividindo-a-cozinha' },
  { source: '/dez-equivocos-no-diagnostico-das-intolerancias-a-carboidratos-2', destination: '/blog/teste-respiratorio-sibo-imo-intolerancias' },
  { source: '/reacao-adversa-aos-salicilatos-alimentares', destination: '/blog/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica' },
  { source: '/supercrescimento-fungico-intestinal-uma-condicao-patologica-pouco-conhecida', destination: '/blog/sibo-supercrescimento-bacteriano-no-intestino-delgado-guia-completo' },
  { source: '/cepa-probiotica-para-saude-gastrointestinal', destination: '/blog/a-suplementacao-de-probioticos-para-o-tratamento-de-h-pylori-visando-minimizar-os-efeitos' },
  { source: '/transtorno-alimentar-restritivo-evitativo-tare', destination: '/blog' },
  { source: '/disbiose-doencas-inflamatorias-intestinais', destination: '/especialidades/gastroenterologia' },
  { source: '/leaky-gut-syndrome-o-que-sabemos-sobre-ela', destination: '/especialidades/gastroenterologia' },
  { source: '/mulungu-e-sua-atividade-antimicrobiana-na-cavidade-oral', destination: '/blog' },
  { source: '/sindrome-do-intestino-irritavel-e-a-relacao-com-a-saude-e-a-autoestima-da-mulher', destination: '/blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro' },
  { source: '/como-o-uso-de-probioticos-pode-auxiliar-na-prevencao-de-vaginose-bacteriana-recorrente', destination: '/blog' },
  { source: '/title-regurgitacao-infantil', destination: '/especialidades/pediatria' },
  { source: '/alergia-alfa-gal-e-anafilaxia-tardia-a-carne-vermelha-que-sindrome-e-essa', destination: '/blog' },
  { source: '/como-os-probioticos-topicos-podem-auxiliar-no-tratamento-dermatologico', destination: '/blog' },
  { source: '/gastroparesia-por-canabinoides-o-que-se-sabe', destination: '/blog/sindrome-de-hiperemese-por-canabinoides-como-diferenciar-do-vomito-ciclico' },
  { source: '/treinamento-vesical-bexiga-hiperativa', destination: '/especialidades/fisioterapia-pelvica' },
  { source: '/diarreia-do-viajante-no-pos-pandemia', destination: '/especialidades/gastroenterologia' },
  { source: '/atualizacao-do-manejo-da-doenca-do-refluxo-gastroesofagico-refrataria', destination: '/exames/phmetria-impedanciometria' },
  { source: '/sindrome-latex-fruta-como-diagnosticar-e-tratar', destination: '/blog' },
  { source: '/existe-vantagem-de-probiotico-multicepas-x-cepa-unica', destination: '/blog/a-suplementacao-de-probioticos-para-o-tratamento-de-h-pylori-visando-minimizar-os-efeitos' },
  { source: '/gluten-e-risco-de-neoplasias-gastrointestinais', destination: '/blog/vida-celiaca-em-casa-com-gluten-como-sobreviver-e-viver-bem-dividindo-a-cozinha' },
  { source: '/deficiencia-de-taurina-como-fator-de-envelhecimento', destination: '/blog/microbioma-intestinal-e-longevidade' },
  { source: '/h-pylori-novas-perspectivas-com-lgg-podcast', destination: '/blog/a-suplementacao-de-probioticos-para-o-tratamento-de-h-pylori-visando-minimizar-os-efeitos' },
  { source: '/uso-prolongado-de-inibidores-de-bomba-de-protons-mitos-e-verdades', destination: '/blog/existe-relacao-entre-uso-de-inibidores-de-bomba-de-protons-ibps-e-demencia' },
  { source: '/o-uso-de-probioticos-na-dor-abdominal-funcional-pode-ser-benefico', destination: '/blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro' },
  { source: '/e-possivel-atuar-na-microbiota-de-pacientes-com-dermatite-atopica', destination: '/blog' },
  { source: '/transtorno-comportamental-disbiose-intestinal', destination: '/blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro' },
  { source: '/efeitos-das-preferencias-alimentares-na-composicao-de-microbiota', destination: '/blog/microbioma-intestinal-e-longevidade' },
  { source: '/impacto-dos-probioticos-no-tratamento-e-na-prevencao-de-doencas-comuns-na-infancia', destination: '/especialidades/pediatria' },
  { source: '/roupa-intima-inteligente-microbiota', destination: '/blog' },
  { source: '/influencia-da-microbiota-nas-escolhas-alimentares', destination: '/blog/microbioma-intestinal-e-longevidade' },
  { source: '/doenca-celiaca-e-a-dieta-sem-gluten', destination: '/blog/vida-celiaca-em-casa-com-gluten-como-sobreviver-e-viver-bem-dividindo-a-cozinha' },
  { source: '/risco-de-obesidade-e-disbiose-podcast', destination: '/blog/microbioma-intestinal-e-longevidade' },
  { source: '/brain-fog-disbiose-e-probioticos-o-que-ha-de:resto(.*)', destination: '/blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro' },
].map(r => ({ ...r, permanent: true }))

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
      { source: '/profissionais-parceiros',       destination: '/equipe',             permanent: true },
      { source: '/eleve-sua-carreira-na-saude-conheca-a-excelencia-dos-cursos-da-nuvem-ensino', destination: '/ensino', permanent: true },
      { source: '/eleve-sua-carreira-na-saude-nuvem-ensino', destination: '/ensino', permanent: true },
      { source: '/avaliacao-nuvem-medicina',      destination: '/avaliacao',          permanent: true },
      { source: '/preparos-for-exames',           destination: '/exames/preparos',    permanent: true },
      // Categorias com página própria: precisam vir antes da regra geral de /category.
      { source: '/category/dra-vera-angelo',      destination: '/dra-vera-angelo',    permanent: true },
      { source: '/category/nuvem-ensino',         destination: '/ensino',             permanent: true },
      { source: '/youtube',                       destination: 'https://www.youtube.com/@NuvemMedicina', permanent: true },

      ...halimetriaRemovida,
      ...slugsComErro,
      ...artigosSemPar,
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
    const noindex = [{ key: 'X-Robots-Tag', value: 'noindex, nofollow' }]
    // Rotas de API e o Studio do Sanity nunca são indexados, em nenhum ambiente.
    const internas = [
      { source: '/api/:path*',    headers: noindex },
      { source: '/studio',        headers: noindex },
      { source: '/studio/:path*', headers: noindex },
    ]
    // Deploys de preview e desenvolvimento não podem ser indexados: são cópias
    // integrais do site em outro host e competem com o domínio real na busca.
    if (process.env.VERCEL_ENV === 'production') return internas
    return [...internas, { source: '/:path*', headers: noindex }]
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

export default withNextIntl(nextConfig)
