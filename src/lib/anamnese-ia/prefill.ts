/**
 * Pré-preenchimento da anamnese com o que já existe no site.
 *
 * Fontes: src/lib/data.ts (CONTATO, EXAMES), src/lib/schema.ts (horários),
 * src/lib/nuvete-data.ts (como chegar, prazos de laudo, pedido médico),
 * /convenios-medicos e /equipe. Tudo aqui é ponto de partida: a gestão
 * confere e corrige no formulário. Campos sem fonte no site ficam vazios.
 */
import { CONTATO } from '@/lib/data'
import type { Values } from './schema'

export const PREFILL_CLINICA: Values = {
  nomeClinica:      'NU.V.E.M Medicina',
  tipoAtendimento:  'Clínica com múltiplos profissionais',
  iaServePara:      'Para outros profissionais também',
  cnpj:             CONTATO.cnpj,
  crmClinica:       CONTATO.crmClinica,
  diretoriaTecnica: `${CONTATO.diretora.nome} · ${CONTATO.diretora.crm} · ${CONTATO.diretora.rqe}`,

  endereco: `${CONTATO.endereco}\n${CONTATO.bairro}\n${CONTATO.cep}\nMapa: ${CONTATO.maps}`,
  chegada:  'Próximo ao metrô Santa Efigênia. Várias linhas de ônibus passam pela Rua Ceará.',
  estacionamento: 'Estacionamentos privados nas proximidades.',
  horarioClinica: 'Segunda a quinta: 7h às 17h30\nSexta: 7h às 16h30\nSábado e domingo: fechado',
  fuso: 'Horário de Brasília (America/Sao_Paulo, UTC−3)',
  canais: [
    `Telefone: ${CONTATO.telefone}`,
    `WhatsApp: ${CONTATO.whatsapp}`,
    `E-mail: ${CONTATO.email}`,
    'Site: https://www.nuvemmedicina.com.br',
    `Instagram: ${CONTATO.instagram}`,
    `YouTube: ${CONTATO.youtube}`,
  ].join('\n'),

  modalidade: 'Presencial',
  especialidades: 'Gastroenterologia · Motilidade digestiva · Fisioterapia pélvica · Halitose · Pediatria · Nefrologia · Cirurgia pediátrica · Clínica médica',
  examesOferecidos: [
    'Manometria esofágica de alta resolução: exame de 10 a 20 min (permanência de cerca de 2 h); sem sedação; pedido médico obrigatório; valor: ___; IA pode agendar? ___',
    'Manometria anorretal: 40 a 60 min; sem sedação; pedido médico obrigatório; valor: ___; IA pode agendar? ___',
    'pHmetria e impedanciometria esofágica: instalação de 15 a 20 min e monitoramento de 24 h; pedido médico obrigatório; valor: ___; IA pode agendar? ___',
    'Teste respiratório para H. pylori: 30 a 40 min; pedido médico obrigatório; valor: ___; IA pode agendar? ___',
    'Teste respiratório para SIBO / IMO / lactose / frutose (H₂, CH₄, H₂S): 2 a 3 h; pedido médico obrigatório; valor: ___; IA pode agendar? ___',
    'Avaliação pélvica com biofeedback eletromiográfico: 40 a 60 min; pedido médico obrigatório; realizada pela fisioterapeuta; valor: ___; IA pode agendar? ___',
    'Consultas médicas · ver Parte B (cada profissional).',
  ].join('\n'),
  diferenciais: 'Certificação ISO 9001 de gestão da qualidade. Equipe multidisciplinar (gastroenterologia, motilidade digestiva, fisioterapia pélvica, pediatria, cirurgia pediátrica, nefrologia e clínica médica). Exames funcionais digestivos realizados na própria clínica. NU.V.E.M Ensino: cursos para profissionais de saúde.',
  historia: 'Clínica fundada em 2018 em Belo Horizonte pelas sócias Dra. Vera Ângelo e Dra. Eliane Basques. ___ (completar)',
  prazosLaudos: 'Manometria: até 3 dias úteis\npHmetria: alguns dias após a devolução do equipamento\nTestes respiratórios: até 3 dias úteis',

  convenios: 'Sim: Unimed BH, Amil, Porto Seguro Saúde, Hapvida, Plamed e Samp.\nTambém atendimento particular com recibo para reembolso (verificar com o plano).',
  regrasConvenio: 'Exames: levar a guia ou o número de autorização do convênio no dia; o paciente deve verificar a cobertura e a necessidade de autorização prévia com o convênio.\n___ (coparticipação, coleta de carteirinha, procedimentos não cobertos, o que fazer se o convênio não estiver na lista)',
  reembolso: 'Atendimento particular com emissão de recibo para reembolso. ___ (prazo e documentos)',

  documentosLevar: 'Pedido médico (obrigatório para exames)\nGuia ou número de autorização do convênio (exames por convênio)\nExames anteriores relacionados\nLista de medicamentos em uso\n___ (documento com foto e carteirinha? confirmar)',
  posConfirmacao: 'Enviar o preparo do exame agendado e o endereço da clínica. ___ (completar)',
  triagemGeral: 'Consulta ou exame? Qual exame/especialidade?\nTem pedido médico? (necessário para a maioria dos exames; consulta não precisa de encaminhamento)\nConvênio ou particular? Qual convênio?\nIdade do paciente (para direcionar pediatria)\n___ (completar)',

  preparo: 'Os preparos padronizados dos exames estão no PDF da clínica (anexo "Orientações de preparo"). A IA deve enviar o preparo correspondente ao exame após confirmar o agendamento e, em dúvidas sobre suspensão de medicamentos, orientar que o paciente fale com o médico solicitante ou com a clínica, nunca suspender por conta própria.',

  qualificaAgenda: 'Qualificar e agendar',
  tomDeVoz: 'Acolhedor, claro e objetivo. Linguagem simples, sem termos técnicos sem explicação. Trata o paciente por "você". ___ (emojis? assinatura?)',
  nuncaFazer: [
    'Não dar diagnóstico nem interpretar sintomas ou resultados de exames.',
    'Não indicar, alterar ou suspender medicamentos: suspensões de preparo sempre "conforme orientação do médico solicitante".',
    'Não prometer resultados nem usar superlativos ("o melhor", "o mais preciso", "referência"): normas do CFM sobre publicidade médica.',
    'Não informar valores que a clínica não autorizou a IA a informar.',
    'Não pedir dados de saúde além do necessário para agendar (LGPD).',
    'Não confirmar cobertura de convênio sem verificação da equipe.',
    '___ (completar)',
  ].join('\n'),
  faq: [
    'Preciso de pedido médico? Para a maioria dos exames, sim. Para consultas, não é necessário encaminhamento.',
    'Quanto tempo demora o laudo? Ver "Prazos de entrega de laudos".',
    'Vocês aceitam meu convênio? Ver lista de convênios; se não estiver na lista, transferir para a equipe.',
    'Onde fica a clínica? Ver endereço e instruções de chegada.',
    '___ (completar)',
  ].join('\n'),

  gatilhosPadrao: ['Pedido de humano', 'Urgência', 'Reclamação', 'Receita e atestado'],
  anexos: ['Orientações de preparo'],
}

// ─── Profissionais já cadastrados no site (/equipe) ───────────────────────────
type MedicoSite = { slug: string; nome: string; registro: string; especialidade: string; areas: string; bio?: string; realiza?: string }

export const MEDICOS_SITE: MedicoSite[] = [
  { slug: 'vera-angelo', nome: 'Dra. Vera Ângelo', registro: 'CRM-MG 22284 · RQE 10411 · RQE 22736', especialidade: 'Gastroenterologia e Motilidade', areas: 'SIBO / IMO · Testes respiratórios · Motilidade digestiva · DGBI', bio: 'Sócia fundadora e diretora técnica da NU.V.E.M. Mestre e Doutora pela UFMG. Professora convidada do Hospital Israelita Albert Einstein. Autora de obras pela Editora Rubio.' },
  { slug: 'eliane-basques', nome: 'Dra. Eliane Basques', registro: 'CRM-MG 27601 · RQE 9324', especialidade: 'Cirurgia Pediátrica', areas: 'Manometria anorretal · Assoalho pélvico · Cirurgia pediátrica · Casos interdisciplinares', bio: 'Cirurgiã pediátrica, cofundadora da NU.V.E.M. Atua em manometria anorretal e disfunções do assoalho pélvico, na interface entre gastroenterologia e cirurgia.', realiza: 'Manometria anorretal · ___' },
  { slug: 'amanda-araujo', nome: 'Dra. Amanda Araújo', registro: 'CRM-MG 86343 · RQE 58941 (Clínica Médica) · RQE 66655 (Gastroenterologia)', especialidade: 'Gastroenterologia e Motilidade Digestiva', areas: 'Gastroenterologia · Motilidade digestiva' },
  { slug: 'anna-karoline', nome: 'Dra. Anna Karoline', registro: 'Crefito 4/270579-F', especialidade: 'Fisioterapia Pélvica', areas: 'Biofeedback EMG · Assoalho pélvico · Incontinência', bio: 'Fisioterapeuta especializada em assoalho pélvico, biofeedback eletromiográfico e tratamento de incontinência.', realiza: 'Avaliação pélvica com biofeedback eletromiográfico · ___' },
  { slug: 'adrianna-buzatti-viana', nome: 'Dra. Adrianna Buzatti Viana', registro: 'CRM-MG 71689 · RQE 44101 · RQE 59942', especialidade: 'Cirurgia Pediátrica', areas: 'Cirurgia pediátrica · Casos complexos' },
  { slug: 'claudia-utsch', nome: 'Dra. Claudia Utsch', registro: 'CRM-MG 47651 · RQE 51470 · RQE 51471', especialidade: 'Gastroenterologia', areas: 'Gastroenterologia clínica · Doenças digestivas' },
  { slug: 'camilla-mendes', nome: 'Dra. Camilla Mendes', registro: 'CRM 61518', especialidade: 'Clínica Médica', areas: 'Clínica médica · Medicina interna' },
  { slug: 'danielle-martins', nome: 'Dra. Danielle Martins', registro: 'CRM 72935', especialidade: 'Gastroenterologia e Motilidade', areas: 'Gastroenterologia · DGBI' },
  { slug: 'gabriel-fernandes-filho', nome: 'Dr. Gabriel de Souza Fernandes Filho', registro: '', especialidade: 'Gastroenterologia', areas: 'Gastroenterologia clínica' },
  { slug: 'luiza-auarek', nome: 'Dra. Luiza Auarek', registro: 'CRM 81521 · RQE 62607 · RQE 54226', especialidade: 'Nefrologia', areas: 'Nefrologia · Interface GI-renal', bio: 'Nefrologista. Atende doença renal crônica, nefrolitíase, hipertensão de causa renal e alterações em exames, de forma integrada ao acompanhamento digestivo.' },
  { slug: 'mariana-fernandes', nome: 'Dra. Mariana Fernandes', registro: 'CRM 65936', especialidade: 'Pediatria', areas: 'Saúde digestiva infantil · Pediatria', bio: 'Pediatra com atuação em saúde digestiva infantil: constipação, dor abdominal recorrente, refluxo e problemas alimentares em crianças e adolescentes.' },
  { slug: 'raissa-dalat', nome: 'Dra. Raissa Dalat', registro: 'CRM-MG 78824 · RQE 61983', especialidade: 'Cirurgia Pediátrica', areas: 'Cirurgia pediátrica' },
]

export function prefillMedico(slug?: string): Values {
  const m = MEDICOS_SITE.find(x => x.slug === slug)
  const base: Values = { locais: 'Sede da clínica (Rua Ceará, 600 – Sala 101, Santa Efigênia, BH)' }
  if (!m) return base
  return {
    ...base,
    nome: m.nome, registro: m.registro, especialidade: m.especialidade, areas: m.areas,
    ...(m.bio ? { bio: m.bio } : {}),
    ...(m.realiza ? { realiza: m.realiza } : {}),
  }
}
