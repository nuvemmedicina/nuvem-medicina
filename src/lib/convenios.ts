/**
 * Convênios aceitos: fonte única para a página /convenios-medicos, as páginas
 * de exame, a nuvete e o llms.txt.
 *
 * Origem: lista oficial da clínica para a Dr.IAgenda, versão de 09/11/2026
 * (docs/anamnese-ia/respostas/documentos-finais/anexos/03-lista-e-regras-de-convenio.md).
 * Ao mudar um convênio, mude aqui e no documento da anamnese.
 *
 * Fora do site, de propósito:
 *  · Nutrologia da Dra. Danielle ("somente particular"): aguarda confirmação
 *    do RQE de Nutrologia antes de ser publicada.
 *  · Trânsito colônico (Dra. Eliane, somente particular): o exame ainda não
 *    tem página nem preparo oficial no site.
 */

export const UNIMED_PLANOS = 'Unimed (Unipart, Unimax, Uniplan)'

export type ConvenioProfissional = {
  nome:      string
  area:      string
  convenios: string
}

export const CONVENIOS_POR_PROFISSIONAL: ConvenioProfissional[] = [
  { nome: 'Dra. Vera Ângelo',                     area: 'Gastroenterologia e Motilidade',          convenios: `${UNIMED_PLANOS} e Amagis Saúde` },
  { nome: 'Dra. Danielle Martins',                area: 'Gastroenterologia e Motilidade',          convenios: 'Agros, Allianz, Amagis, Amil, AMMP, Assefaz, Saúde Caixa, Care Plus, Cemig, Cenibra, Copass, Correios (Postal), Desban, Fundação Libertas, Fundaffemg, Fusex, Omint, Petrobras, Proasa e Vale' },
  { nome: 'Dra. Claudia Utsch',                   area: 'Gastroenterologia',                       convenios: 'Unimed' },
  { nome: 'Dra. Camilla Mendes',                  area: 'Clínica Médica',                          convenios: UNIMED_PLANOS },
  { nome: 'Dra. Mariana Fernandes',               area: 'Pediatria',                               convenios: 'Unimed (Unimed Seguros, Unipart e Unimax)' },
  { nome: 'Dra. Amanda Araújo',                   area: 'Gastroenterologia e Motilidade Digestiva', convenios: `pHmetria esofágica: ${UNIMED_PLANOS} ou particular` },
  { nome: 'Dra. Eliane Basques',                  area: 'Cirurgia Pediátrica',                     convenios: `Manometria anorretal: ${UNIMED_PLANOS} ou particular` },
  { nome: 'Dr. Gabriel de Souza Fernandes Filho', area: 'Gastroenterologia',                       convenios: 'Somente particular' },
  { nome: 'Dra. Raissa Dalat',                    area: 'Cirurgia Pediátrica',                     convenios: 'Somente particular' },
  { nome: 'Dra. Anna Karoline Rocha',             area: 'Fisioterapia Pélvica',                    convenios: 'Somente particular' },
  { nome: 'Dra. Adrianna Buzatti Viana',          area: 'Cirurgia Pediátrica',                     convenios: 'Consulte a recepção' },
  { nome: 'Dra. Luiza Auarek',                    area: 'Nefrologia',                              convenios: 'Consulte a recepção' },
]

/**
 * Fora da tabela da página /convenios-medicos (decisão da clínica em
 * 09/11/2026): quem atende somente particular e quem tem convênio a confirmar
 * com a recepção. A nuvete continua recebendo a lista completa, para responder
 * sobre esses profissionais.
 */
const FORA_DA_PAGINA = new Set(['Somente particular', 'Consulte a recepção'])

export const CONVENIOS_NA_PAGINA = CONVENIOS_POR_PROFISSIONAL.filter(p => !FORA_DA_PAGINA.has(p.convenios))

/** Exames que podem ser feitos por convênio. Os demais são somente particulares. */
export const EXAMES_POR_CONVENIO = [
  'pHmetria esofágica',
  'Manometria esofágica convencional',
  'Manometria anorretal',
]

export const REGRAS_CONVENIO = [
  'Todos os profissionais atendem particular, com recibo para reembolso. O recibo é emitido em até 2 dias úteis.',
  'Se o seu plano não estiver na lista do profissional, a consulta pode ser feita de forma particular.',
  `Exames por convênio: somente pHmetria esofágica, manometria esofágica convencional e manometria anorretal, pela ${UNIMED_PLANOS}. Os demais exames são particulares.`,
  'Teleconsulta: somente particular.',
  'Coparticipação e necessidade de autorização prévia seguem as regras do seu plano. Confirme com o seu convênio.',
  'O reembolso é verificado por você com o seu convênio. A clínica não informa valores de reembolso.',
]

export const DOCUMENTOS_LEVAR = [
  'Carteirinha do convênio (obrigatória ao usar o plano)',
  'Guia ou número de autorização (exames por convênio)',
  'Pedido médico (obrigatório para exames)',
  'Documento com foto',
  'Exames anteriores relacionados',
  'Lista de medicamentos em uso',
]

type Locale = 'pt-BR' | 'en' | 'es'

/** Texto curto de convênio para cada página de exame, por idioma. */
const EXAME_CONVENIO: Record<string, Record<Locale, string>> = {
  'manometria-esofagica': {
    'pt-BR': `Manometria convencional: ${UNIMED_PLANOS} ou particular. Alta resolução: somente particular.`,
    en:      'Conventional manometry: Unimed (Unipart, Unimax, Uniplan) or self-pay. High resolution: self-pay only.',
    es:      'Manometría convencional: Unimed (Unipart, Unimax, Uniplan) o particular. Alta resolución: solo particular.',
  },
  'manometria-anorretal': {
    'pt-BR': `${UNIMED_PLANOS} ou particular.`,
    en:      'Unimed (Unipart, Unimax, Uniplan) or self-pay.',
    es:      'Unimed (Unipart, Unimax, Uniplan) o particular.',
  },
  'phmetria-impedanciometria': {
    'pt-BR': `pHmetria esofágica: ${UNIMED_PLANOS} ou particular. ImpedanciopHmetria: somente particular.`,
    en:      'Esophageal pH monitoring: Unimed (Unipart, Unimax, Uniplan) or self-pay. Impedance-pH monitoring: self-pay only.',
    es:      'pHmetría esofágica: Unimed (Unipart, Unimax, Uniplan) o particular. ImpedanciopHmetría: solo particular.',
  },
}

const SOMENTE_PARTICULAR: Record<Locale, string> = {
  'pt-BR': 'Somente particular.',
  en:      'Self-pay only.',
  es:      'Solo particular.',
}

export function convenioDoExame(slug: string, locale: string): string {
  const l = (['pt-BR', 'en', 'es'].includes(locale) ? locale : 'pt-BR') as Locale
  return EXAME_CONVENIO[slug]?.[l] ?? SOMENTE_PARTICULAR[l]
}

/** Bloco de texto para o prompt da nuvete. */
export function convenioParaPrompt(): string {
  return [
    'Os convênios dependem do profissional e do exame:',
    ...CONVENIOS_POR_PROFISSIONAL.map(p => `- ${p.nome} (${p.area}): ${p.convenios}`),
    '',
    ...REGRAS_CONVENIO.map(r => `- ${r}`),
    '',
    'A nuvete não confirma cobertura de procedimento: informa a lista acima e, se o plano da pessoa não estiver nela ou houver dúvida de cobertura, orienta falar com a equipe pelo WhatsApp. Lista completa em https://www.nuvemmedicina.com.br/convenios-medicos.',
  ].join('\n')
}
