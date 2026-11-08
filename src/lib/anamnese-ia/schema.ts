/**
 * Anamnese da IA de atendimento (Dr.IAgenda): estrutura do formulário.
 *
 * O formulário original da Dr.IAgenda (cockpit.infradriagenda.com/anamnese-v2)
 * mistura dados da clínica com dados de cada médico. Aqui ele é dividido em:
 *   - Parte A (CLÍNICA): respondida uma única vez pela gestão;
 *   - Parte B (MÉDICOS): um bloco por profissional, só com o que é individual.
 *
 * `orig` aponta o número da pergunta no formulário original (mapeamento
 * validado em 04/11/2026), para a Dr.IAgenda conseguir cruzar as respostas.
 * Campos sem `orig` são acréscimos nossos.
 *
 * LGPD: este formulário não coleta dados de pacientes.
 */

export type FieldType = 'text' | 'textarea' | 'select' | 'checks'

export type Field = {
  id:        string
  label:     string
  help?:     string
  type:      FieldType
  required?: boolean
  options?:  string[]
  orig?:     string
  rows?:     number
}

export type Section = {
  id:     string
  title:  string
  desc?:  string
  fields: Field[]
}

export type Value  = string | string[]
export type Values = Record<string, Value>

// ─── Parte A · Clínica ────────────────────────────────────────────────────────
export const SECOES_CLINICA: Section[] = [
  {
    id: 'identificacao',
    title: 'Identificação e escopo',
    desc: 'Dados da contratação e de quem a IA vai atender.',
    fields: [
      { id: 'emailCompra',      label: 'E-mail utilizado na compra', type: 'text', required: true, orig: '1' },
      { id: 'nomeClinica',      label: 'Nome da clínica', type: 'text', required: true, orig: '6' },
      { id: 'responsavel',      label: 'Responsável pelo preenchimento (nome e cargo)', type: 'text', required: true, orig: '5', help: 'No original: "Qual seu nome Dr(a)?". Aqui, quem responde pela clínica.' },
      { id: 'tipoAtendimento',  label: 'Tipo de atendimento', type: 'select', required: true, orig: '7', options: ['Individual', 'Clínica com múltiplos profissionais'] },
      { id: 'iaServePara',      label: 'A IA vai servir apenas para você ou para outros profissionais também?', type: 'select', required: true, orig: '2', options: ['Apenas para mim', 'Para outros profissionais também'] },
      { id: 'cnpj',             label: 'CNPJ', type: 'text' },
      { id: 'crmClinica',       label: 'Registro da clínica no CRM', type: 'text' },
      { id: 'diretoriaTecnica', label: 'Diretoria técnica (nome, CRM e RQE)', type: 'textarea', rows: 2 },
    ],
  },
  {
    id: 'localizacao',
    title: 'Localização, horários e contato',
    fields: [
      { id: 'endereco',        label: 'Endereço completo da clínica', type: 'textarea', required: true, orig: '36', rows: 3 },
      { id: 'chegada',         label: 'Instruções de chegada', type: 'textarea', required: true, orig: '37', help: 'Pontos de referência, transporte público, acesso ao prédio, recepção.' },
      { id: 'estacionamento',  label: 'Estacionamento', type: 'textarea', rows: 2, help: 'Tem estacionamento próprio ou conveniado? Valor? Onde fica?' },
      { id: 'horarioClinica',  label: 'Horário de funcionamento da clínica', type: 'textarea', required: true, orig: '24', rows: 3, help: 'Horário da clínica. A agenda de cada médico vai na Parte B.' },
      { id: 'feriados',        label: 'Feriados, recessos e férias coletivas', type: 'textarea', rows: 2 },
      { id: 'fuso',            label: 'Fuso horário', type: 'text', required: true, orig: '26' },
      { id: 'canais',          label: 'Canais de contato (telefone, WhatsApp, e-mail, site, redes)', type: 'textarea', required: true, rows: 5 },
      { id: 'horarioWhatsapp', label: 'Horário em que há atendente humano no WhatsApp', type: 'text', help: 'Fora desse horário, o que a IA deve dizer quando precisar transferir?' },
    ],
  },
  {
    id: 'servicos',
    title: 'Serviços, exames e posicionamento',
    fields: [
      { id: 'modalidade',      label: 'Modalidade de atendimento (padrão da clínica)', type: 'select', required: true, orig: '4', options: ['Presencial', 'Online', 'Presencial e online'], help: 'Teleconsulta de cada médico vai na Parte B.' },
      { id: 'especialidades',  label: 'Especialidades e áreas de atuação da clínica', type: 'textarea', required: true, orig: '34', rows: 4 },
      { id: 'examesOferecidos', label: 'Exames e procedimentos realizados na clínica (estruturado)', type: 'textarea', required: true, orig: '21', rows: 10, help: 'Para cada um: nome, duração, valor particular, o que está incluso, pré-requisito (pedido médico, autorização), se a IA pode informar o valor e se a IA pode agendar.' },
      { id: 'valorProcedimento', label: 'Valores dos exames e procedimentos (tabela da clínica)', type: 'textarea', orig: '17', rows: 5, help: 'Se preferir, anexe a tabela de preços. Valores de consulta de cada médico vão na Parte B.' },
      { id: 'naoRealiza',      label: 'O que a clínica não realiza e quem não atende', type: 'textarea', required: true, orig: '22', help: 'Para a IA não agendar errado. Ex.: "não realizamos endoscopia". Restrições de cada médico vão na Parte B. Se não houver, escreva "não há restrições".' },
      { id: 'dores',           label: 'Principais dores e problemas dos pacientes que procuram a clínica', type: 'textarea', required: true, orig: '18' },
      { id: 'diferenciais',    label: 'O que diferencia a clínica', type: 'textarea', required: true, orig: '33', help: 'Atenção às normas do CFM: sem promessas de resultado, sem superlativos ("o melhor", "referência", "o mais preciso").' },
      { id: 'historia',        label: 'História da clínica', type: 'textarea', required: true, orig: '35', help: 'A trajetória e a formação de cada médico vão na Parte B.' },
      { id: 'prazosLaudos',    label: 'Prazos de entrega de laudos', type: 'textarea', rows: 4 },
    ],
  },
  {
    id: 'convenios',
    title: 'Convênios',
    fields: [
      { id: 'convenios',       label: 'Aceita convênio? Se sim, quais?', type: 'textarea', required: true, orig: '10', help: 'Lista geral da clínica. Exceções por médico vão na Parte B.' },
      { id: 'regrasConvenio',  label: 'Regras detalhadas de convênios', type: 'textarea', required: true, orig: '11', rows: 6, help: 'O que cobre, coparticipação, guia/autorização prévia, coleta de carteirinha, procedimentos não cobertos e o que fazer se o convênio do paciente não estiver na lista.' },
    ],
  },
  {
    id: 'pagamento',
    title: 'Pagamento',
    fields: [
      { id: 'cobraAntecipado', label: 'A IA deve cobrar pagamento antecipado?', type: 'select', required: true, orig: '3', options: ['Não', 'Sim'] },
      { id: 'dinamicaPagamento', label: 'Qual a dinâmica do pagamento?', type: 'textarea', required: true, orig: '12', help: 'Ex.: pagamento na recepção no dia; sinal para reservar horário; reembolso com recibo.' },
      { id: 'metodos',         label: 'Métodos de pagamento', type: 'text', required: true, orig: '13' },
      { id: 'comoAntecipado',  label: 'Se cobrar antecipado, como deve ser feito?', type: 'textarea', orig: '14', help: 'Quem envia PIX/link, comprovante e prazo para segurar o horário.' },
      { id: 'parcelamento',    label: 'Regras de parcelamento', type: 'textarea', required: true, orig: '15', help: 'Número de parcelas, juros, valor mínimo e serviços parceláveis. Se não parcela, escreva "não parcelamos".' },
      { id: 'reembolso',       label: 'Recibo e reembolso', type: 'textarea', rows: 2, help: 'Emite recibo/nota? Em quanto tempo? Ajuda com documentos para reembolso?' },
    ],
  },
  {
    id: 'agenda',
    title: 'Agenda e confirmação',
    fields: [
      { id: 'regrasAgenda',    label: 'Regras de agenda da clínica', type: 'textarea', required: true, orig: '9', help: 'Agenda única ou separada por médico? O paciente escolhe o profissional ou é por disponibilidade?' },
      { id: 'restricoesAgenda', label: 'Restrições gerais de agenda', type: 'textarea', required: true, orig: '25', help: 'Ex.: exames só de manhã, intervalo entre atendimentos, salas compartilhadas. Restrições de cada médico vão na Parte B.' },
      { id: 'antecedencia',    label: 'Antecedência mínima para agendar', type: 'text', required: true, orig: '27' },
      { id: 'prontuario',      label: 'Usa algum prontuário ou sistema de agenda? Qual?', type: 'text', required: true, orig: '28', help: 'Ex.: iClinic, Feegow, Doctoralia, agenda própria, planilha ou nenhum.' },
      { id: 'dadosConfirmacao', label: 'Dados que a IA deve pedir ao paciente para confirmar o agendamento', type: 'textarea', required: true, orig: '29', help: 'Só a lista de campos (ex.: nome completo, data de nascimento, convênio). Não escreva dados de pacientes aqui.' },
      { id: 'triagemGeral',    label: 'Perguntas antes de marcar (triagem geral)', type: 'textarea', required: true, orig: '30', help: 'Perguntas que valem para todos. Perguntas específicas de cada médico vão na Parte B.' },
      { id: 'documentosLevar', label: 'Documentos que o paciente deve levar', type: 'textarea', required: true, rows: 3 },
      { id: 'posConfirmacao',  label: 'Orientações após confirmar o agendamento', type: 'textarea', required: true, orig: '41', help: 'Ex.: enviar o preparo do exame, endereço, lembrete de chegar com antecedência.' },
    ],
  },
  {
    id: 'politicas',
    title: 'Políticas e exceções',
    fields: [
      { id: 'cancelamento',    label: 'Política de cancelamento', type: 'textarea', required: true, orig: '38' },
      { id: 'remarcacao',      label: 'Remarcação e no-show (falta sem aviso)', type: 'textarea', required: true, orig: '39' },
      { id: 'pacienteAntigo',  label: 'Paciente antigo e indicação', type: 'textarea', required: true, orig: '40' },
      { id: 'atraso',          label: 'Tolerância de atraso', type: 'text', required: true, orig: '42' },
    ],
  },
  {
    id: 'preparos',
    title: 'Preparos de exames',
    fields: [
      { id: 'preparo',         label: 'Preparo pré e pós', type: 'textarea', required: true, orig: '23', rows: 4, help: 'Jejum, medicação, roupa, exames a levar e orientações pós-procedimento. Os preparos padronizados vão no PDF da clínica, anexado como "Orientações de preparo".' },
    ],
  },
  {
    id: 'secretaria',
    title: 'Secretária IA',
    fields: [
      { id: 'nomeIA',          label: 'Nome da Secretária IA', type: 'text', required: true, orig: '31' },
      { id: 'qualificaAgenda', label: 'A IA vai apenas qualificar ou também agendar?', type: 'select', required: true, orig: '32', options: ['Apenas qualificar', 'Qualificar e agendar'] },
      { id: 'tomDeVoz',        label: 'Tom de voz da IA', type: 'textarea', required: true, help: 'Ex.: acolhedor, claro, sem gírias, trata por "você", usa emojis com moderação.' },
      { id: 'nuncaFazer',      label: 'O que a IA nunca deve dizer ou fazer', type: 'textarea', required: true, rows: 8 },
      { id: 'faq',             label: 'Perguntas frequentes (pergunta e resposta)', type: 'textarea', required: true, rows: 10 },
    ],
  },
  {
    id: 'humano',
    title: 'Encaminhamento humano, urgência e anexos',
    desc: 'Encaminhamento humano é quando a IA para de responder e passa o paciente para alguém da equipe (não é encaminhamento médico).',
    fields: [
      { id: 'gatilhosPadrao',  label: 'Gatilhos padrão de atendimento humano', type: 'checks', orig: '43–49', options: ['Pedido de humano', 'Desconto', 'Urgência', 'Reclamação', 'Receita e atestado', 'Indicação', 'Pós-operatório'] },
      { id: 'urgencia',        label: 'Regra de urgência: o que a IA deve fazer', type: 'textarea', required: true, help: 'Quais sinais a IA trata como urgência e o que ela responde (ex.: orientar a procurar pronto atendimento e transferir para a equipe). Texto a ser definido pela equipe médica.' },
      { id: 'gatilhosEspecificos', label: 'Gatilhos específicos da clínica para atendimento humano', type: 'textarea', orig: '50', help: 'Gatilhos de cada médico vão na Parte B.' },
      { id: 'transferencia',   label: 'Para quem transferir e como', type: 'textarea', rows: 2, help: 'Nome/função de quem assume, canal e horário.' },
      { id: 'anexos',          label: 'Anexos que serão enviados à Dr.IAgenda', type: 'checks', orig: '52', options: ['Orientações de preparo', 'Tabela de preços e procedimentos', 'Lista e regras de convênio', 'Script ou fluxo de atendimento', 'Outro material de apoio'] },
      { id: 'observacoes',     label: 'Observações gerais', type: 'textarea', orig: '51' },
    ],
  },
]

// ─── Parte B · Médicos (um bloco por profissional) ─────────────────────────────
export const CAMPOS_MEDICO: Section[] = [
  {
    id: 'identificacao',
    title: 'Identificação',
    fields: [
      { id: 'nome',          label: 'Nome como deve ser apresentado', type: 'text', required: true, orig: '5' },
      { id: 'registro',      label: 'Registro profissional (CRM/RQE, Crefito etc.)', type: 'text', required: true },
      { id: 'especialidade', label: 'Especialidade', type: 'text', required: true, orig: '34' },
      { id: 'areas',         label: 'Áreas de atuação', type: 'textarea', required: true, orig: '34', rows: 2 },
      { id: 'bio',           label: 'Mini bio para a IA apresentar o profissional', type: 'textarea', required: true, orig: '35', rows: 4, help: 'Formação e trajetória, em 2 a 4 linhas. Normas do CFM: sem superlativos nem promessas de resultado.' },
    ],
  },
  {
    id: 'atendimento',
    title: 'O que atende',
    fields: [
      { id: 'realiza',       label: 'Consultas, exames e procedimentos que realiza', type: 'textarea', required: true, orig: '21', rows: 4, help: 'Para procedimentos próprios: nome, duração, valor, se a IA pode informar o valor e se a IA pode agendar.' },
      { id: 'faixaEtaria',   label: 'Faixa etária atendida', type: 'text', required: true, orig: '22' },
      { id: 'naoAtende',     label: 'O que não realiza, quem não atende e restrições', type: 'textarea', required: true, orig: '22', help: 'Ex.: "não agendar X sem triagem", "não atende gestantes". Se não houver, escreva "não há restrições".' },
      { id: 'dores',         label: 'Principais queixas dos pacientes que atende', type: 'textarea', orig: '18', rows: 2 },
      { id: 'triagem',       label: 'Perguntas de triagem específicas antes de marcar', type: 'textarea', orig: '30', rows: 3 },
    ],
  },
  {
    id: 'agenda',
    title: 'Agenda',
    fields: [
      { id: 'diasHorarios',  label: 'Dias e horários de atendimento', type: 'textarea', required: true, orig: '24', rows: 3 },
      { id: 'locais',        label: 'Locais de atendimento', type: 'textarea', required: true, rows: 2, help: 'Se atende apenas na sede da clínica, deixe como está.' },
      { id: 'duracao',       label: 'Duração da consulta', type: 'text', required: true, orig: '19' },
      { id: 'restricoes',    label: 'Restrições de agenda', type: 'textarea', orig: '25', rows: 2, help: 'Ex.: consulta de manhã, procedimento à tarde.' },
      { id: 'encaixes',      label: 'Aceita encaixes? Em quais condições?', type: 'textarea', rows: 2 },
      { id: 'teleconsulta',  label: 'Teleconsulta', type: 'select', required: true, orig: '4', options: ['Não', 'Sim', 'Apenas retorno'] },
    ],
  },
  {
    id: 'valores',
    title: 'Valores, convênios e retorno',
    fields: [
      { id: 'valorConsulta', label: 'Valor da consulta particular', type: 'text', required: true, orig: '16' },
      { id: 'valoresOutros', label: 'Valores de procedimentos próprios', type: 'textarea', orig: '17', rows: 2 },
      { id: 'convenios',     label: 'Convênios (só se forem diferentes da lista da clínica)', type: 'textarea', orig: '10', rows: 2 },
      { id: 'retorno',       label: 'Regra de retorno', type: 'textarea', required: true, orig: '20', rows: 2, help: 'Prazo em dias, valor do retorno e se a IA pode agendar sozinha.' },
    ],
  },
  {
    id: 'humano',
    title: 'Transferência e observações',
    fields: [
      { id: 'gatilhos',      label: 'Situações em que a IA deve transferir para a equipe', type: 'textarea', orig: '50', rows: 2 },
      { id: 'diferenciais',  label: 'Diferenciais (opcional)', type: 'textarea', orig: '33', rows: 2, help: 'Normas do CFM: sem superlativos nem promessas de resultado.' },
      { id: 'observacoes',   label: 'Observações', type: 'textarea', orig: '51', rows: 2 },
    ],
  },
]

export const TODOS_CAMPOS_MEDICO = CAMPOS_MEDICO.flatMap(s => s.fields)

/** Campo obrigatório está preenchido? */
export function preenchido(v: Value | undefined) {
  if (Array.isArray(v)) return v.length > 0
  return !!v && v.trim().length > 0
}

export function progressoSecao(fields: Field[], values: Values) {
  const obrig = fields.filter(f => f.required)
  const ok    = obrig.filter(f => preenchido(values[f.id])).length
  return { ok, total: obrig.length }
}
