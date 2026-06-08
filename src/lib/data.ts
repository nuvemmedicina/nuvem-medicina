import type { NavItem, Especialidade, Exame, Depoimento } from '@/types'

// ─── Navigation ──────────────────────────────────────────────────────────────
export const NAV_ITEMS: NavItem[] = [
  {
    label: 'A Clínica',
    href: '/sobre',
    children: [
      { label: 'Sobre a Clínica',         href: '/sobre' },
      { label: 'Equipe',                  href: '/equipe' },
      { label: 'Gestão da Qualidade',     href: '/gestao-da-qualidade' },
      // { label: 'Infraestrutura',       href: '/infraestrutura' }, // em breve — aguardando novas fotos
    ],
  },
  {
    label: 'Especialidades',
    href: '/especialidades',
    children: [
      { label: 'Gastroenterologia',    href: '/especialidades/gastroenterologia' },
      { label: 'Motilidade Digestiva', href: '/especialidades/motilidade-digestiva' },
      { label: 'Fisioterapia Pélvica', href: '/especialidades/fisioterapia-pelvica' },
      { label: 'Halitose',             href: '/especialidades/halitose' },
      { label: 'Pediatria',            href: '/especialidades/pediatria' },
      { label: 'Nefrologia',           href: '/especialidades/nefrologia' },
    ],
  },
  {
    label: 'Exames',
    href: '/exames',
    children: [
      { label: 'Manometria Esofágica',      href: '/exames/manometria-esofagica' },
      { label: 'Manometria Anorretal',      href: '/exames/manometria-anorretal' },
      { label: 'pHmetria e Impedânciometria', href: '/exames/phmetria-impedanciometria' },
      { label: 'Testes Respiratórios',      href: '/exames/testes-respiratorios' },
      { label: 'Halimetria e Sialometria',  href: '/exames/halimetria-sialometria' },
      { label: 'Avaliação Pélvica',         href: '/exames/avaliacao-pelvica' },
      { label: 'Preparos para Exames',      href: '/exames/preparos' },
    ],
  },
  { label: 'ISO 9001', href: '/gestao-da-qualidade' },
  { label: 'Ensino',   href: '/ensino' },
  { label: 'Blog',     href: '/blog' },
]

// ─── Especialidades ───────────────────────────────────────────────────────────
export const ESPECIALIDADES: Especialidade[] = [
  {
    num: '01', slug: 'gastroenterologia',
    title: 'Gastroenterologia',
    desc: 'Equilíbrio intestinal pleno, de sintomas comuns até patologias complexas como SIBO, IMO e DGBI – Distúrbio da Interação Cérebro-Intestino.',
    tags: ['DGBI', 'SIBO / IMO', 'Motilidade'],
    icon: 'Activity',
  },
  {
    num: '02', slug: 'fisioterapia-pelvica',
    title: 'Fisioterapia Pélvica',
    desc: 'Reabilitação do assoalho pélvico, distúrbios digestivos funcionais e incontinência com biofeedback especializado.',
    tags: ['Assoalho Pélvico', 'Biofeedback', 'Reabilitação'],
    icon: 'Globe',
  },
  {
    num: '03', slug: 'halitose',
    title: 'Halitose',
    desc: 'Diagnóstico multidisciplinar completo. Investigamos causas digestivas, orais e sistêmicas com halimetria de precisão.',
    tags: ['Halimetria', 'Sialometria', 'Diagnóstico Integrado'],
    icon: 'Shield',
  },
  {
    num: '04', slug: 'pediatria',
    title: 'Pediatria',
    desc: 'Cuidado integral da saúde digestiva infantil com abordagem acolhedora e integrada à família desde os primeiros anos.',
    tags: ['Saúde Infantil', 'Digestivo', 'Prevenção'],
    icon: 'Users',
  },
  {
    num: '05', slug: 'nefrologia',
    title: 'Nefrologia',
    desc: 'Diagnóstico e tratamento especializado de doenças renais com prevenção e suporte multidisciplinar integrado.',
    tags: ['Saúde Renal', 'Prevenção', 'Suporte Integral'],
    icon: 'Heart',
  },
  {
    num: '06', slug: 'motilidade-digestiva',
    title: 'Motilidade Digestiva',
    desc: 'Avaliação avançada de distúrbios esofágicos e intestinais com manometria, pHmetria e impedânciometria integradas.',
    tags: ['Distúrbios Esofágicos', 'Refluxo', 'Alta Resolução'],
    icon: 'Star',
  },
]

// ─── PDF por exame ────────────────────────────────────────────────────────────
export const EXAM_PDFS: Record<string, string> = {
  'manometria-esofagica':      '/pdfs/preparo-manometria-esofagica-v1.pdf',
  'manometria-anorretal':      '/pdfs/preparo-manometria-anorretal-v1.pdf',
  'phmetria-impedanciometria': '/pdfs/preparo-phmetria-impedanciometria-v1.pdf',
  'testes-respiratorios':      '/pdfs/preparo-teste-respiratorio-sibo-imo-v1.pdf',
  'halimetria-sialometria':    '/pdfs/preparo-halimetria-sialometria-v1.pdf',
  'avaliacao-pelvica':         '/pdfs/preparo-avaliacao-pelvica-v1.pdf',
}

// ─── Exames ───────────────────────────────────────────────────────────────────
export const EXAMES: Exame[] = [
  {
    id: 'manometria-esofagica', num: '01',
    title: 'Manometria Esofágica',
    subtitle: 'Alta Resolução · Esôfago',
    tag: 'Alta Resolução',
    desc: [
      'Avalia com precisão a motilidade do esôfago e a função do esfíncter esofágico inferior, sendo essencial no diagnóstico de acalasia, disfagia e refluxo gastroesofágico.',
      'Equipamentos de última geração com mapeamento completo da pressão esofágica em alta resolução. Laudos emitidos por especialistas certificados ISO 9001.',
    ],
    info: [
      { icon: 'Clock',   text: 'Duração: 30–45 minutos' },
      { icon: 'Shield',  text: 'Certificação ISO 9001, padrão internacional' },
      { icon: 'Check',   text: 'Preparo específico · sem sedação' },
    ],
  },
  {
    id: 'manometria-anorretal', num: '02',
    title: 'Manometria Anorretal',
    subtitle: 'Alta Resolução · Canal Anal',
    tag: 'Alta Resolução',
    desc: [
      'Avalia a função dos esfíncteres do canal anal e reto, sendo fundamental no diagnóstico de incontinência fecal, constipação crônica e distúrbios do assoalho pélvico.',
      'Protocolo completo com biofeedback integrado. Equipamentos de última geração com laudos certificados ISO 9001.',
    ],
    info: [
      { icon: 'Clock',   text: 'Duração: 30–45 minutos' },
      { icon: 'Shield',  text: 'Certificação ISO 9001, padrão internacional' },
      { icon: 'Check',   text: 'Preparo com enema · sem sedação' },
    ],
  },
  {
    id: 'phmetria-impedanciometria', num: '03',
    title: 'pHmetria e Impedânciometria',
    subtitle: 'Monitoramento 24h',
    tag: 'Monitoramento 24h',
    desc: [
      'Monitoramento ambulatorial que registra episódios de refluxo ácido e não-ácido ao longo de 24 horas, correlacionando sintomas com eventos de refluxo em atividade normal.',
      'A impedânciometria detecta refluxo independente do pH, sendo essencial nos casos de refluxo refratário ao tratamento convencional.',
    ],
    info: [
      { icon: 'Clock',  text: 'Monitoramento ambulatorial de 24 horas' },
      { icon: 'Check',  text: 'Atividade normal durante todo o exame' },
    ],
  },
  {
    id: 'testes-respiratorios', num: '04',
    title: 'Testes Respiratórios',
    subtitle: 'H₂ · CH₄ · H₂S · H. pylori',
    tag: 'Não Invasivo',
    desc: [
      'Diagnóstico de SIBO, IMO, intolerâncias alimentares e H. pylori por análise do ar exalado. Sem coleta de sangue, sem desconforto e com alta especificidade diagnóstica.',
      'Protocolo NU.V.E.M detecta H₂, CH₄ e H₂S em um único exame, com cobertura de SIBO, LIBO, SIFO e infecção por H. pylori.',
    ],
    info: [
      { icon: 'Check',  text: 'Sem coleta de sangue · sem sedação' },
      { icon: 'Clock',  text: 'Duração: 2–3 horas conforme substrato' },
    ],
  },
  {
    id: 'halimetria-sialometria', num: '05',
    title: 'Halimetria e Sialometria',
    subtitle: 'Diagnóstico de Halitose',
    tag: 'Diagnóstico Preciso',
    desc: [
      'A halimetria quantifica objetivamente compostos sulfurados voláteis causadores da halitose, com diagnóstico diferencial entre causas orais, digestivas e sistêmicas.',
      'A sialometria avalia o fluxo salivar, sendo essencial na investigação de xerostomia e suas relações com halitose e doenças sistêmicas.',
    ],
    info: [
      { icon: 'Shield', text: 'Protocolo multidisciplinar exclusivo NU.V.E.M' },
    ],
  },
  {
    id: 'avaliacao-pelvica', num: '06',
    title: 'Avaliação Pélvica',
    subtitle: 'Biofeedback e Eletromiografia',
    tag: 'Especialidade Integrada',
    desc: [
      'Avaliação funcional completa do assoalho pélvico com biofeedback eletromiográfico para diagnóstico e reabilitação de disfunções pélvicas, incontinência e constipação obstrutiva.',
    ],
    info: [
      { icon: 'Check', text: 'Integração GI + Fisioterapia Pélvica' },
      { icon: 'Check', text: 'Abordagem não invasiva e humanizada' },
    ],
  },
]

// ─── Depoimentos ─────────────────────────────────────────────────────────────
export const DEPOIMENTOS: Depoimento[] = [
  {
    id: '1', initials: 'VR', stars: 5, name: 'Vinnie Riego', role: 'Paciente da clínica',
    text: 'Atendimento excelente do início ao fim. A estrutura da clínica é moderna, bem equipada e transmite bastante confiança. São especialistas que realmente buscam a causa do problema, não só os sintomas.',
  },
  {
    id: '2', initials: 'DM', stars: 5, name: 'Débora Melo', role: 'Profissional de saúde · Curso Hands-On',
    text: 'A clínica Nuvem conta com uma estrutura incrível e o curso de teste respiratório foi maravilhoso, sem defeitos! Obrigada Dra. Vera e equipe pela recepção e acolhimento!',
  },
  {
    id: '3', initials: 'FC', stars: 5, name: 'Fernando Covezzi', role: 'Médico · Treinamento NU.V.E.M Ensino',
    text: 'Dra. Vera é extremamente didática e prática. Vale a pena o investimento e o deslocamento para BH. Se você pretende trabalhar com testes respiratórios, precisa desse curso.',
  },
  {
    id: '4', initials: 'HM', stars: 5, name: 'Heitor Maciel', role: 'Paciente',
    text: 'Ótimo atendimento, bem humanos. Só tenho a agradecer à Dra. Vera e toda a equipe pela atenção e cuidado durante todo o atendimento.',
  },
  {
    id: '5', initials: 'JC', stars: 5, name: 'Jéssica Cronemberger', role: 'Profissional · Ensino',
    text: 'Excelente curso e muito completo, tanto na parte teórica quanto na prática. A estrutura da clínica é impecável e a didática da Dra. Vera faz toda a diferença.',
  },
  {
    id: '6', initials: 'SN', stars: 5, name: 'Suzete Notaroberto', role: 'Profissional de saúde',
    text: 'Minha experiência foi excelente em todos os sentidos. Aulas maravilhosas, atualizadas, didáticas e práticas. Voltarei com certeza!',
  },
]

// ─── Contato ──────────────────────────────────────────────────────────────────
export const CONTATO = {
  telefone:    '(31) 2537-3131',
  whatsapp:    '(31) 99726-1029',
  whatsappUrl: 'https://wa.me/553197261029',
  email:       'contato@nuvemmedicina.com.br',
  endereco:    'Rua Ceará, 600 – Sala 101',
  bairro:      'Santa Efigênia, Belo Horizonte – MG',
  cep:         'CEP 30150-310',
  horario:     'Segunda a Sexta · 7h às 17h30',
  maps:        'https://goo.gl/maps/BELYyu7yUHd41gdc8',
  instagram:   'https://instagram.com/nuvemmedicina',
  youtube:     'https://www.youtube.com/@NuvemMedicina',
  crmClinica:  'CRM-MG 20532',
  cnpj:        '42.678.705/0001-02',
  diretora: {
    nome: 'Dra. Vera Ângelo',
    crm:  'CRM-MG 22284',
    rqe:  'RQE 10411 · RQE 22736',
  },
}
