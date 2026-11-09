/**
 * Profissionais da NU.V.E.M: fonte única dos dados das páginas individuais
 * (/dra-vera-angelo, /dra-eliane-basques, /dra-raissa-dalat...), dos cartões
 * de /equipe e dos dados estruturados (schema.org).
 *
 * Regras (Res. CFM nº 2.336/2023 e LGPD):
 *   · "Especialista em X" só aparece quando há RQE confirmado daquela
 *     especialidade (ver `especialistaEm` em profissionais-texto.ts).
 *   · Motilidade digestiva não é especialidade nem área de atuação do CFM:
 *     aparece só como tema em que a pessoa atua.
 *   · Dado que falta fica como `pendente('...')`. Ele não aparece na página e
 *     entra na lista de pendências do relatório.
 *   · Fisioterapeuta usa o registro do Crefito e nunca aparece como médica.
 *   · Sem superlativo, comparação, promessa de resultado ou depoimento.
 *
 * Este arquivo é só dado (é importado também pelo middleware, que roda na
 * edge): nada de import de servidor aqui.
 *
 * Publicação: `status` e `aprovacoes` dizem se a página pode ir ao ar. Quem
 * decide é profissionais-publicacao.ts (único ponto de troca entre estes
 * campos e a anamnese do PR #142).
 *
 * Dados: arquivos da clínica, versão de 06/11/2026, atualizados pelos anexos
 * validados de 08/11/2026 (tabela de preços e procedimentos; lista e regras
 * de convênio). Registros conferidos no portal do CFM em 08/11/2026 (Vera,
 * Gabriel, Danielle e Amanda) e em 09/11/2026 (Eliane, Raissa, Claudia e
 * Camilla).
 */

// ─── Pendências ──────────────────────────────────────────────────────────────

export const A_CONFIRMAR = '[A CONFIRMAR]'

/** Dado que ainda falta confirmar. Nunca aparece na página. */
export type Pendente = { readonly pendente: string }
export type Talvez<T> = T | Pendente

export const pendente = (oQueFalta: string): Pendente => ({ pendente: `${A_CONFIRMAR} ${oQueFalta}` })
export const ehPendente = (v: unknown): v is Pendente =>
  typeof v === 'object' && v !== null && 'pendente' in v
/** Valor confirmado ou null (para não mostrar). */
export const confirmado = <T,>(v: Talvez<T> | undefined): T | null =>
  v === undefined || ehPendente(v) ? null : v

// ─── Tipos ───────────────────────────────────────────────────────────────────

export type Profissao = 'medica' | 'medico' | 'fisioterapeuta'
export type StatusPagina = 'rascunho' | 'aguardando_medico' | 'aprovada'

export type Rqe = { numero: string; especialidade: Talvez<string> }

export type Registro =
  | { conselho: 'CRM'; uf: Talvez<'MG'>; numero: string; rqes: Rqe[] }
  | { conselho: 'Crefito'; regiao: '4'; numero: string }

export type TipoServico = 'consulta' | 'exame' | 'reabilitacao'

export type Servico = {
  nome: string
  tipo: TipoServico
  /** Como é atendido: "Somente particular", "Particular ou Unimed (...)". */
  convenios: Talvez<string>
  /** Slug de /exames/[slug], quando a página do exame existe. */
  exameSlug?: string
}

export type Teleconsulta = { oferece: false } | { oferece: true; detalhe: string }

export type Foto = {
  src: string
  largura: number
  altura: number
  /** De onde veio: a foto já usada no site ou uma enviada pela anamnese. */
  origem: 'site' | 'anamnese'
}

/** Registro de aprovação: data (AAAA-MM-DD) e versão do texto aprovada. */
export type Aprovacao = { data: string; versao: string; por: string }

/** Livro publicado (autoria, organização ou coorganização). */
export type Livro = {
  titulo: string
  papel: 'Autora' | 'Autor' | 'Organizadora' | 'Organizador' | 'Coorganizadora' | 'Coorganizador'
  editora: string
  ano: string
  /** Capa em public/images. */
  capa: string
  /** Página do livro na editora. */
  href: string
}

export type ItemQuandoProcurar = {
  texto: string
  /** Exame de onde saiu (texto "para que serve" de /exames/[slug]). */
  fonte: string
}

export type Profissional = {
  // Identificação
  slug: string                      // endereço da página, sem barra
  slugAnamnese: string              // slug usado em /anamnese-ia (MEDICOS_SITE)
  nome: string                      // sem o tratamento
  tratamento: 'Dra.' | 'Dr.'
  profissao: Profissao
  registro: Registro
  especialidadeExibida: string      // rótulo, nunca "especialista" sem RQE
  cargo?: string

  // Conteúdo
  areasDeAtuacao: string[]          // temas em que atua (não é a "área de atuação" do CFM)
  bio: Talvez<string>
  oQueFazNaNuvem: Servico[]
  /** Exame citado sem link porque ainda não tem página. */
  servicosSemPagina?: string[]
  quandoProcurar?: {
    itens: ItemQuandoProcurar[]
    /** Só aparece em produção depois de validada pela Dra. Vera. */
    validacao: 'rascunho' | { por: string; data: string }
  }

  /** Livros publicados (seção "Publicações", logo depois da formação). */
  livros?: Livro[]

  // Atendimento
  faixaEtaria: Talvez<string>
  teleconsulta: Talvez<Teleconsulta>
  fazConsulta: boolean
  diasDeAtendimento?: Talvez<string>

  // Foto e pendências
  foto: Foto | null
  /** Pendências de texto que não cabem num campo (ex.: termo da bio). */
  pendencias: string[]

  // Publicação
  fase: 1 | 2
  status: StatusPagina
  aprovacoes: { medico?: Aprovacao; clinica?: Aprovacao }

}

/**
 * Pessoa que aparece em /equipe mas não tem página individual nem dados novos
 * (entra só com aprovação da gestão). O cartão continua como está hoje.
 */
export type MembroSemPagina = {
  slugAnamnese: string
  nome: string
  tratamento: 'Dra.' | 'Dr.'
  profissao: Profissao
  registro: Registro
  especialidadeExibida: string
  foto: Foto | null
}

// ─── Textos comuns ───────────────────────────────────────────────────────────

const UNIMED = 'Unimed (Unipart, Unimax, Uniplan)'

const fotoSite = (src: string, lado: number): Foto => ({ src, largura: lado, altura: lado, origem: 'site' })

// ─── Fase 1: páginas novas ou refeitas agora ─────────────────────────────────

export const PROFISSIONAIS: Profissional[] = [
  {
    slug: 'dra-vera-angelo',
    slugAnamnese: 'vera-angelo',
    nome: 'Vera Ângelo',
    tratamento: 'Dra.',
    profissao: 'medica',
    registro: {
      conselho: 'CRM', uf: 'MG', numero: '22284',
      rqes: [
        { numero: '10411', especialidade: 'Gastroenterologia' },
        { numero: '22736', especialidade: 'Medicina do Trabalho' },
      ],
    },
    especialidadeExibida: 'Gastroenterologia',
    cargo: 'Sócia fundadora e Diretora Técnica',
    areasDeAtuacao: [
      'SIBO e IMO',
      'Testes respiratórios',
      'Motilidade digestiva',
      'Distúrbios da interação cérebro-intestino (DGBI)',
    ],
    bio: 'Sócia fundadora e diretora técnica da NU.V.E.M. Mestre e Doutora pela UFMG. Professora convidada do Hospital Israelita Albert Einstein. Autora de obras pela Editora Rubio.',
    oQueFazNaNuvem: [
      { nome: 'Consulta', tipo: 'consulta', convenios: `Particular, ${UNIMED} ou Amagis Saúde` },
      { nome: 'Teste respiratório para SIBO', tipo: 'exame', convenios: 'Somente particular', exameSlug: 'testes-respiratorios' },
      { nome: 'Teste respiratório para SIBO + IMO (metano)', tipo: 'exame', convenios: 'Somente particular', exameSlug: 'testes-respiratorios' },
    ],
    quandoProcurar: {
      validacao: { por: 'Dra. Vera Ângelo', data: '2026-11-09' },
      itens: [
        { texto: 'Gases e inchaço na barriga que se repetem', fonte: 'testes-respiratorios' },
        { texto: 'Suspeita de SIBO ou IMO levantada pelo médico', fonte: 'testes-respiratorios' },
        { texto: 'Intestino irritável em investigação', fonte: 'testes-respiratorios' },
      ],
    },
    // Livros que estavam na página antiga (mesmos títulos, capas e links).
    livros: [
      {
        titulo: 'Doenças Funcionais na Gastrenterologia',
        papel: 'Organizadora', editora: 'Editora Rubio', ano: '2025',
        capa: '/images/livro-doencas-funcionais-gastroenterologia.jpg',
        href: 'https://rubio.com.br/livro/a61637/9786588340783/doencas-funcionais-na-gatroenterologia.html',
      },
      {
        titulo: 'Métodos Diagnósticos em Doenças Funcionais e Motilidade Digestiva',
        papel: 'Coorganizadora', editora: 'Editora Rubio', ano: '2025',
        capa: '/images/livro-metodos-diagnosticos-motilidade.jpg',
        href: 'https://rubio.com.br/livro/c58906/9786588340844/metodos-diagnosticos-em-doencas-funcionais-e-motilidade-digestiva-do-nucleo-de-fisiologia-gastrintes.html',
      },
      {
        titulo: 'Perguntas e Respostas Comentadas de Gastrenterologia Clínica e Hepatologia',
        papel: 'Organizadora', editora: 'Editora Rubio', ano: '2025',
        capa: '/images/livro-gastrenterologia-clinica-hepatologia.jpg',
        href: 'https://rubio.com.br/livro/a62313/9786588340998/perguntas-e-respostas-comentadas-de-gastrenterologia-clinica-e-hepatologia.html',
      },
      {
        titulo: 'Testes Respiratórios em Gastrenterologia: Hidrogênio, Metano e Helicobacter pylori',
        papel: 'Autora', editora: 'Editora Rubio', ano: '2024',
        capa: '/images/livro-testes-respiratorios-gastrenterologia.jpg',
        href: 'https://rubio.com.br/livro/a62312/9786588340974/testes-respiratorios-em-gastrenterologia-hidrogenio-metano-e-helicobacter-pylori.html',
      },
    ],
    faixaEtaria: '12 a 99 anos',
    teleconsulta: { oferece: true, detalhe: 'no atendimento particular' },
    fazConsulta: true,
    foto: fotoSite('/images/dra-vera.jpg', 900),
    pendencias: [
      'A página antiga e o blog citam "Patologia Clínica"; no CFM o RQE 22736 é de Medicina do Trabalho. Confirmar a menção do blog e o item "Residência em Clínica Médica e Patologia Clínica" da página antiga.',
    ],
    fase: 1,
    status: 'aprovada',
    // Texto aprovado em 09/11/2026 (versão com os livros, 2a689f0041) e lista
    // "Quando procurar avaliação" validada pela Dra. Vera no mesmo dia; a
    // aprovação foi registrada de novo na versão com a lista validada.
    aprovacoes: {
      medico:  { data: '2026-11-09', versao: '2597ae4057', por: 'Dra. Vera Ângelo' },
      clinica: { data: '2026-11-09', versao: '2597ae4057', por: 'Ana Paula, gestão do site, em nome da clínica' },
    },
  },

  {
    slug: 'dra-eliane-basques',
    slugAnamnese: 'eliane-basques',
    nome: 'Eliane Basques',
    tratamento: 'Dra.',
    profissao: 'medica',
    registro: {
      conselho: 'CRM', uf: 'MG', numero: '27601',
      rqes: [
        { numero: '9324', especialidade: 'Cirurgia Pediátrica' },
        { numero: '70957', especialidade: 'Cirurgia Geral' },
      ],
    },
    especialidadeExibida: 'Cirurgia Pediátrica',
    cargo: 'Cofundadora e Diretora Técnica Substituta',
    areasDeAtuacao: ['Manometria anorretal', 'Assoalho pélvico', 'Casos interdisciplinares'],
    bio: 'Cirurgiã pediátrica, cofundadora da NU.V.E.M. Atua em manometria anorretal e disfunções do assoalho pélvico, na interface entre gastroenterologia e cirurgia.',
    oQueFazNaNuvem: [
      { nome: 'Manometria anorretal', tipo: 'exame', convenios: `Particular ou ${UNIMED}`, exameSlug: 'manometria-anorretal' },
      { nome: 'Trânsito colônico', tipo: 'exame', convenios: 'Somente particular' },
    ],
    servicosSemPagina: ['Trânsito colônico'],
    quandoProcurar: {
      validacao: { por: 'Dra. Vera Ângelo', data: '2026-11-09' },
      itens: [
        { texto: 'Perda involuntária de fezes', fonte: 'manometria-anorretal' },
        { texto: 'Prisão de ventre que continua mesmo com o tratamento', fonte: 'manometria-anorretal' },
        { texto: 'Alterações do assoalho pélvico', fonte: 'manometria-anorretal' },
        { texto: 'Suspeita de doença de Hirschsprung', fonte: 'manometria-anorretal' },
        { texto: 'Avaliação antes ou depois de cirurgia anorretal', fonte: 'manometria-anorretal' },
      ],
    },
    faixaEtaria: '1 a 80 anos',
    teleconsulta: { oferece: false },
    fazConsulta: false,
    diasDeAtendimento: 'Somente às quintas-feiras',
    foto: fotoSite('/images/dra-eliane.jpg', 900),
    pendencias: [],
    fase: 1,
    status: 'aprovada',
    // Aprovação do profissional informada pela gestão do site em 09/11/2026
    // (versão 85c578a344); registrada de novo na versão com os RQEs conferidos no
    // CFM em 09/11/2026.
    aprovacoes: {
      medico:  { data: '2026-11-09', versao: '8fb5e24ec0', por: 'Dra. Eliane Basques' },
      clinica: { data: '2026-11-09', versao: '8fb5e24ec0', por: 'Ana Paula, gestão do site, em nome da clínica' },
    },
  },

  {
    slug: 'dra-raissa-dalat',
    slugAnamnese: 'raissa-dalat',
    nome: 'Raissa Dalat',
    tratamento: 'Dra.',
    profissao: 'medica',
    registro: {
      conselho: 'CRM', uf: 'MG', numero: '78824',
      rqes: [{ numero: '61983', especialidade: 'Cirurgia Pediátrica' }],
    },
    especialidadeExibida: 'Cirurgia Pediátrica',
    areasDeAtuacao: ['Cirurgia pediátrica geral', 'Coloproctologia infantil'],
    bio: 'Cirurgiã pediátrica com atuação em cirurgia pediátrica geral e coloproctologia infantil, pós-graduada em doenças funcionais do aparelho digestivo e manometrias.',
    oQueFazNaNuvem: [
      { nome: 'Consulta de cirurgia pediátrica geral', tipo: 'consulta', convenios: 'Somente particular' },
      { nome: 'Consulta de coloproctologia infantil', tipo: 'consulta', convenios: 'Somente particular' },
    ],
    faixaEtaria: '0 a 14 anos',
    teleconsulta: { oferece: true, detalhe: 'no atendimento particular' },
    fazConsulta: true,
    foto: fotoSite('/images/raissa-dalat.jpg', 700),
    pendencias: [
      'Bio: manter "doenças funcionais do aparelho digestivo" só se for o nome oficial do curso (confirmar com a médica). No resto do site usamos DGBI.',
    ],
    fase: 1,
    status: 'aprovada',
    // Aprovação do profissional informada pela gestão do site em 09/11/2026
    // (versão b7ffad55df); registrada de novo na versão com os RQEs conferidos no
    // CFM em 09/11/2026.
    aprovacoes: {
      medico:  { data: '2026-11-09', versao: '1c1c5bcf6f', por: 'Dra. Raissa Dalat' },
      clinica: { data: '2026-11-09', versao: '1c1c5bcf6f', por: 'Ana Paula, gestão do site, em nome da clínica' },
    },
  },

  {
    slug: 'dra-anna-karoline',
    slugAnamnese: 'anna-karoline',
    nome: 'Anna Karoline Rocha',
    tratamento: 'Dra.',
    profissao: 'fisioterapeuta',
    registro: { conselho: 'Crefito', regiao: '4', numero: '270579-F' },
    especialidadeExibida: 'Fisioterapia Pélvica',
    areasDeAtuacao: ['Assoalho pélvico', 'Biofeedback eletromiográfico'],
    bio: 'Fisioterapeuta com atuação em assoalho pélvico e biofeedback eletromiográfico (incontinência urinária e fecal, constipação, dor pélvica, pré e pós-parto, entre outros).',
    oQueFazNaNuvem: [
      { nome: 'Avaliação pélvica com biofeedback eletromiográfico', tipo: 'exame', convenios: 'Somente particular', exameSlug: 'avaliacao-pelvica' },
      { nome: 'Reabilitação do assoalho pélvico', tipo: 'reabilitacao', convenios: 'Somente particular' },
    ],
    quandoProcurar: {
      validacao: { por: 'Dra. Vera Ângelo', data: '2026-11-09' },
      itens: [
        { texto: 'Perda involuntária de urina ou de fezes', fonte: 'avaliacao-pelvica' },
        { texto: 'Alterações do assoalho pélvico', fonte: 'avaliacao-pelvica' },
        { texto: 'Dificuldade para evacuar ligada ao assoalho pélvico', fonte: 'avaliacao-pelvica' },
        { texto: 'Dor pélvica que se prolonga', fonte: 'avaliacao-pelvica' },
        { texto: 'Preparo ou recuperação de cirurgia pélvica', fonte: 'avaliacao-pelvica' },
      ],
    },
    faixaEtaria: pendente('faixa etária: os dados de 06/11 dizem "12 a 90 anos" e a anamnese dela diz "15 a 90 anos"'),
    teleconsulta: { oferece: true, detalhe: 'no atendimento particular' },
    fazConsulta: true,
    foto: fotoSite('/images/anna-karoline.jpg', 900),
    pendencias: [
      'Tratamento "Dra." para fisioterapeuta: confirmar com a gestão. A página sempre diz "fisioterapeuta" e nunca "médica".',
    ],
    fase: 1,
    status: 'aprovada',
    // Aprovação do profissional informada pela gestão do site em 09/11/2026.
    aprovacoes: {
      medico:  { data: '2026-11-09', versao: '22ade9e187', por: 'Dra. Anna Karoline Rocha' },
      clinica: { data: '2026-11-09', versao: '22ade9e187', por: 'Ana Paula, gestão do site, em nome da clínica' },
    },
  },

  {
    slug: 'dr-gabriel-fernandes-filho',
    slugAnamnese: 'gabriel-fernandes-filho',
    nome: 'Gabriel de Souza Fernandes Filho',
    tratamento: 'Dr.',
    profissao: 'medico',
    registro: {
      conselho: 'CRM', uf: 'MG', numero: '81843',
      rqes: [
        { numero: '54179', especialidade: 'Clínica Médica' },
        { numero: '61806', especialidade: 'Gastroenterologia' },
      ],
    },
    especialidadeExibida: 'Gastroenterologia',
    areasDeAtuacao: ['Manometria esofágica', 'pHmetria e impedanciopHmetria'],
    bio: 'Médico pela UFJF, com residência em Gastroenterologia pelo IPSEMG. Realiza manometria, pHmetria e impedanciopHmetria na NU.V.E.M. Atua nos hospitais Eduardo de Menezes, Orizonti e Mater Dei.',
    oQueFazNaNuvem: [
      { nome: 'Consulta', tipo: 'consulta', convenios: 'Somente particular' },
      { nome: 'Manometria esofágica de alta resolução', tipo: 'exame', convenios: 'Somente particular', exameSlug: 'manometria-esofagica' },
      { nome: 'Manometria esofágica convencional', tipo: 'exame', convenios: 'Somente particular', exameSlug: 'manometria-esofagica' },
      { nome: 'pHmetria esofágica', tipo: 'exame', convenios: 'Somente particular', exameSlug: 'phmetria-impedanciometria' },
      { nome: 'ImpedanciopHmetria esofágica', tipo: 'exame', convenios: 'Somente particular', exameSlug: 'phmetria-impedanciometria' },
    ],
    quandoProcurar: {
      validacao: { por: 'Dra. Vera Ângelo', data: '2026-11-09' },
      itens: [
        { texto: 'Dificuldade para engolir', fonte: 'manometria-esofagica' },
        { texto: 'Refluxo que continua mesmo com o tratamento', fonte: 'manometria-esofagica' },
        { texto: 'Dor no peito quando o coração já foi avaliado', fonte: 'manometria-esofagica' },
        { texto: 'Tosse ou rouquidão que o médico relaciona ao refluxo', fonte: 'phmetria-impedanciometria' },
        { texto: 'Avaliação antes ou depois de cirurgia para refluxo', fonte: 'phmetria-impedanciometria' },
      ],
    },
    faixaEtaria: 'A partir de 15 anos',
    teleconsulta: { oferece: false },
    fazConsulta: true,
    foto: fotoSite('/images/dr-Gabriel-de-Souza-Fernandes-Filho.jpg', 1691),
    pendencias: [
      'Consulta: os dados de 06/11 diziam que ele só faz exames; a tabela validada de 08/11 inclui consulta particular. A página segue a tabela.',
    ],
    fase: 1,
    status: 'aprovada',
    // Aprovação do profissional informada pela gestão do site em 09/11/2026.
    aprovacoes: {
      medico:  { data: '2026-11-09', versao: '8daf788a11', por: 'Dr. Gabriel de Souza Fernandes Filho' },
      clinica: { data: '2026-11-09', versao: '8daf788a11', por: 'Ana Paula, gestão do site, em nome da clínica' },
    },
  },

  {
    slug: 'dra-amanda-araujo',
    slugAnamnese: 'amanda-araujo',
    nome: 'Amanda Araújo',
    tratamento: 'Dra.',
    profissao: 'medica',
    registro: {
      conselho: 'CRM', uf: 'MG', numero: '86343',
      rqes: [
        { numero: '58941', especialidade: 'Clínica Médica' },
        { numero: '66655', especialidade: 'Gastroenterologia' },
      ],
    },
    especialidadeExibida: 'Gastroenterologia',
    areasDeAtuacao: ['Motilidade digestiva', 'Disfagia', 'Refluxo', 'Acalasia'],
    bio: 'Gastroenterologista com atuação em motilidade, disfagia, refluxo e acalasia.',
    oQueFazNaNuvem: [
      { nome: 'Manometria esofágica de alta resolução', tipo: 'exame', convenios: 'Somente particular', exameSlug: 'manometria-esofagica' },
      { nome: 'pHmetria esofágica', tipo: 'exame', convenios: `Particular ou ${UNIMED}`, exameSlug: 'phmetria-impedanciometria' },
      { nome: 'ImpedanciopHmetria esofágica', tipo: 'exame', convenios: 'Somente particular', exameSlug: 'phmetria-impedanciometria' },
    ],
    quandoProcurar: {
      validacao: { por: 'Dra. Vera Ângelo', data: '2026-11-09' },
      itens: [
        { texto: 'Dificuldade para engolir', fonte: 'manometria-esofagica' },
        { texto: 'Suspeita de acalasia', fonte: 'manometria-esofagica' },
        { texto: 'Refluxo que continua mesmo com o tratamento', fonte: 'manometria-esofagica' },
        { texto: 'Dor no peito quando o coração já foi avaliado', fonte: 'manometria-esofagica' },
        { texto: 'Tosse ou rouquidão que o médico relaciona ao refluxo', fonte: 'phmetria-impedanciometria' },
      ],
    },
    faixaEtaria: pendente('faixa etária: "4 meses a 80 anos"'),
    teleconsulta: { oferece: false },
    fazConsulta: false,
    foto: fotoSite('/images/Amanda-Araujo.jpg', 1691),
    pendencias: [],
    fase: 1,
    status: 'aprovada',
    // Aprovação do profissional informada pela gestão do site em 09/11/2026.
    aprovacoes: {
      medico:  { data: '2026-11-09', versao: '24ebb384d3', por: 'Dra. Amanda Araújo' },
      clinica: { data: '2026-11-09', versao: '24ebb384d3', por: 'Ana Paula, gestão do site, em nome da clínica' },
    },
  },

  // ─── Fase 2: só rascunho (sem rota em produção) ────────────────────────────

  {
    slug: 'dra-danielle-martins',
    slugAnamnese: 'danielle-martins',
    nome: 'Danielle Martins',
    tratamento: 'Dra.',
    profissao: 'medica',
    registro: {
      conselho: 'CRM', uf: 'MG', numero: '72935',
      rqes: [
        { numero: '55612', especialidade: 'Clínica Médica' },
        { numero: '60835', especialidade: 'Gastroenterologia' },
      ],
    },
    especialidadeExibida: 'Gastroenterologia',
    areasDeAtuacao: ['Gastroenterologia clínica'],
    bio: 'Graduada pela Unifenas-BH, membro titular da Federação Brasileira de Gastroenterologia, pós-graduada em Nutrologia, docente do curso de Medicina do UniBH, corpo clínico da NU.V.E.M e da Rede Mater Dei.',
    oQueFazNaNuvem: [
      { nome: 'Consulta de gastroenterologia', tipo: 'consulta', convenios: 'Particular ou convênios: Agros, Allianz, Amagis, Amil, AMMP, Assefaz, Saúde Caixa, Care Plus, Cemig, Cenibra, Copass, Correios (Postal), Desban, Fundação Libertas, Fundaffemg, Fusex, Omint, Petrobras, Proasa e Vale' },
      { nome: 'Consulta de nutrologia', tipo: 'consulta', convenios: 'Somente particular' },
    ],
    faixaEtaria: 'A partir de 16 anos',
    teleconsulta: { oferece: true, detalhe: 'no atendimento particular' },
    fazConsulta: true,
    foto: fotoSite('/images/danielle-martins.jpg', 900),
    pendencias: [],
    fase: 2,
    status: 'aprovada',
    // Aprovação do profissional informada pela gestão do site em 09/11/2026.
    aprovacoes: {
      medico:  { data: '2026-11-09', versao: '49d9899a98', por: 'Dra. Danielle Martins' },
      clinica: { data: '2026-11-09', versao: '49d9899a98', por: 'Ana Paula, gestão do site, em nome da clínica' },
    },
  },

  {
    slug: 'dra-claudia-utsch',
    slugAnamnese: 'claudia-utsch',
    nome: 'Claudia Utsch',
    tratamento: 'Dra.',
    profissao: 'medica',
    registro: {
      conselho: 'CRM', uf: 'MG', numero: '47651',
      rqes: [
        { numero: '51470', especialidade: 'Gastroenterologia' },
        { numero: '51471', especialidade: 'Endoscopia' },
      ],
    },
    especialidadeExibida: 'Gastroenterologia',
    areasDeAtuacao: ['Gastroenterologia clínica'],
    // Bio a partir do currículo enviado pela gestão em 09/11/2026.
    bio: 'Mestre em Doenças Inflamatórias Intestinais pela Universidade Federal de São Paulo (Unifesp), com residência médica em Gastroenterologia e em Endoscopia Digestiva pela Unifesp. Título de Endoscopia pela Sociedade Brasileira de Endoscopia Digestiva (Sobed) e de Gastroenterologia pela Federação Brasileira de Gastroenterologia (FBG).',
    oQueFazNaNuvem: [
      { nome: 'Consulta', tipo: 'consulta', convenios: 'Particular ou Unimed' },
    ],
    faixaEtaria: '14 a 95 anos',
    teleconsulta: { oferece: false },
    fazConsulta: true,
    foto: fotoSite('/images/claudia-utsch.jpg', 900),
    pendencias: [
      'Convênios: a lista validada diz só "Unimed", sem os planos. Confirmar se são Unipart, Unimax e Uniplan.',
    ],
    fase: 2,
    status: 'aprovada',
    // Aprovação do profissional informada pela gestão do site em 09/11/2026
    // (versão 7268ebc8f1); registrada de novo na versão com os RQEs conferidos no
    // CFM em 09/11/2026.
    aprovacoes: {
      medico:  { data: '2026-11-09', versao: 'd25e45946b', por: 'Dra. Claudia Utsch' },
      clinica: { data: '2026-11-09', versao: 'd25e45946b', por: 'Ana Paula, gestão do site, em nome da clínica' },
    },
  },

  {
    slug: 'dra-camilla-mendes',
    slugAnamnese: 'camilla-mendes',
    nome: 'Camilla Mendes',
    tratamento: 'Dra.',
    profissao: 'medica',
    registro: {
      conselho: 'CRM', uf: 'MG', numero: '61518',
      rqes: [
        { numero: '48369', especialidade: 'Clínica Médica' },
        { numero: '69179', especialidade: 'Hepatologia, área de atuação' },
      ],
    },
    especialidadeExibida: 'Clínica Médica',
    areasDeAtuacao: ['Clínica médica'],
    bio: pendente('bio'),
    oQueFazNaNuvem: [
      { nome: 'Consulta de clínica médica', tipo: 'consulta', convenios: `Particular ou ${UNIMED}` },
    ],
    faixaEtaria: '18 a 65 anos',
    teleconsulta: { oferece: false },
    fazConsulta: true,
    foto: fotoSite('/images/camilla-mendes.jpg', 900),
    pendencias: [],
    fase: 2,
    status: 'rascunho',
    aprovacoes: {},
  },
]

/**
 * Aparecem em /equipe como hoje, sem página individual. Só ganham página com
 * aprovação da gestão.
 */
export const EQUIPE_SEM_PAGINA: MembroSemPagina[] = [
  {
    slugAnamnese: 'adrianna-buzatti-viana', nome: 'Adrianna Buzatti Viana', tratamento: 'Dra.', profissao: 'medica',
    registro: { conselho: 'CRM', uf: 'MG', numero: '71689', rqes: [{ numero: '44101', especialidade: pendente('especialidade') }, { numero: '59942', especialidade: pendente('especialidade') }] },
    especialidadeExibida: 'Cirurgia Pediátrica', foto: fotoSite('/images/adrianna-buzatti-viana.jpg', 900),
  },
  {
    slugAnamnese: 'luiza-auarek', nome: 'Luiza Auarek', tratamento: 'Dra.', profissao: 'medica',
    registro: { conselho: 'CRM', uf: pendente('UF'), numero: '81521', rqes: [{ numero: '62607', especialidade: pendente('especialidade') }, { numero: '54226', especialidade: pendente('especialidade') }] },
    especialidadeExibida: 'Nefrologia', foto: fotoSite('/images/luiza-auarek.jpg', 900),
  },
  {
    slugAnamnese: 'mariana-fernandes', nome: 'Mariana Fernandes', tratamento: 'Dra.', profissao: 'medica',
    registro: { conselho: 'CRM', uf: pendente('UF'), numero: '65936', rqes: [] },
    especialidadeExibida: 'Pediatria', foto: fotoSite('/images/mariana-fernandes.jpg', 900),
  },
]

/** Ordem dos cartões em /equipe (sócias primeiro, depois ordem alfabética). */
export const ORDEM_EQUIPE = [
  'vera-angelo', 'eliane-basques',
  'adrianna-buzatti-viana', 'amanda-araujo', 'anna-karoline', 'camilla-mendes', 'claudia-utsch',
  'danielle-martins', 'gabriel-fernandes-filho', 'luiza-auarek', 'mariana-fernandes', 'raissa-dalat',
]

/** Slugs de todas as páginas (para o middleware tratar como só em português). */
export const SLUGS_PROFISSIONAIS = PROFISSIONAIS.map(p => p.slug)

export const profissionalPorSlug = (slug: string) => PROFISSIONAIS.find(p => p.slug === slug)
