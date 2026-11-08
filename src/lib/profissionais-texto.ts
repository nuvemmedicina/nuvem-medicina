/**
 * Textos derivados dos dados de profissionais.ts. Toda frase da página que
 * depende do profissional sai daqui, nunca escrita à mão no componente.
 */
import {
  confirmado, ehPendente,
  type MembroSemPagina, type Profissional, type Registro, type Servico,
} from './profissionais'

type Pessoa = Pick<Profissional, 'nome' | 'tratamento' | 'profissao' | 'registro' | 'especialidadeExibida'>

export const nomeCompleto = (p: Pick<Pessoa, 'tratamento' | 'nome'>) => `${p.tratamento} ${p.nome}`

/** Registro exatamente como nos dados; o que estiver pendente não aparece. */
export function formatarRegistro(r: Registro): string {
  if (r.conselho === 'Crefito') return `Crefito ${r.regiao}/${r.numero}`
  const uf = confirmado(r.uf)
  const partes = [uf ? `CRM-${uf} ${r.numero}` : `CRM ${r.numero}`]
  for (const rqe of r.rqes) {
    const esp = confirmado(rqe.especialidade)
    partes.push(esp ? `RQE ${rqe.numero} (${esp})` : `RQE ${rqe.numero}`)
  }
  return partes.join(' · ')
}

/** Há RQE confirmado para a especialidade exibida? */
export function temRqeDaEspecialidade(p: Pessoa): boolean {
  if (p.registro.conselho !== 'CRM') return false
  return p.registro.rqes.some(r => confirmado(r.especialidade) === p.especialidadeExibida)
}

const PROFISSAO: Record<Profissional['profissao'], string> = {
  medica: 'Médica',
  medico: 'Médico',
  fisioterapeuta: 'Fisioterapeuta',
}
export const rotuloProfissao = (p: Pick<Pessoa, 'profissao'>) => PROFISSAO[p.profissao]

/**
 * Como a especialidade aparece (Res. CFM nº 2.336/2023):
 *   · com RQE da especialidade → "Gastroenterologia" (pode dizer especialista);
 *   · médico sem RQE confirmado → "Médica com atuação em cirurgia pediátrica";
 *   · fisioterapeuta → "Fisioterapia Pélvica", sempre ao lado de "Fisioterapeuta".
 */
export function especialidadeDeExibicao(p: Pessoa): { rotulo: string; descricao: string } {
  if (p.profissao === 'fisioterapeuta') {
    return { rotulo: p.especialidadeExibida, descricao: `Fisioterapeuta com atuação em ${minuscula(p.especialidadeExibida)}` }
  }
  if (temRqeDaEspecialidade(p)) {
    const quem = p.profissao === 'medica' ? 'Médica especialista' : 'Médico especialista'
    return { rotulo: p.especialidadeExibida, descricao: `${quem} em ${p.especialidadeExibida}` }
  }
  const descricao = `${rotuloProfissao(p)} com atuação em ${minuscula(p.especialidadeExibida)}`
  return { rotulo: descricao, descricao }
}

function minuscula(s: string) {
  return s.toLowerCase()
}

/** Iniciais para quando não há foto ("Vera Ângelo" → "VA"). */
export function iniciais(nome: string) {
  const partes = nome.split(/\s+/).filter(p => p.length > 2)
  return ((partes[0]?.[0] ?? '') + (partes.length > 1 ? partes.at(-1)![0] : ''))
    .normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase()
}

export function mensagemWhatsApp(p: Pick<Pessoa, 'tratamento' | 'nome'>) {
  const artigo = p.tratamento === 'Dr.' ? 'o' : 'a'
  return `Olá! Gostaria de agendar com ${artigo} ${nomeCompleto(p)} na NU.V.E.M.`
}

export const ROTULO_TIPO: Record<Servico['tipo'], string> = {
  consulta: 'Consulta',
  exame: 'Exame',
  reabilitacao: 'Reabilitação',
}

// ─── Atendimento e FAQ ───────────────────────────────────────────────────────

const CONFIRMAR_NO_AGENDAMENTO = 'A equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.'
const CONFIRMAR_MINUSCULA = 'a equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.'

export const temExames = (p: Profissional) => p.oQueFazNaNuvem.some(s => s.tipo === 'exame')

export function textoTeleconsulta(p: Profissional): string | null {
  const t = confirmado(p.teleconsulta)
  if (!t) return null
  return t.oferece ? `Sim, ${t.detalhe}` : 'Não. O atendimento é presencial na NU.V.E.M.'
}

/** Linhas "serviço: como é atendido" com os convênios confirmados. */
export function linhasConvenios(p: Profissional): { servico: string; convenios: string }[] {
  return p.oQueFazNaNuvem
    .map(s => ({ servico: s.nome, convenios: confirmado(s.convenios) }))
    .filter((l): l is { servico: string; convenios: string } => l.convenios !== null)
}

export const LISTA_O_QUE_LEVAR = [
  'Pedido médico (obrigatório para exames)',
  'Guia ou número de autorização (exames por convênio)',
  'Documento com foto',
  'Carteirinha do convênio',
  'Exames anteriores',
  'Lista de medicamentos em uso',
]

export type Faq = { pergunta: string; resposta: string; lista?: string[]; nota?: string }

export function perguntasFrequentes(p: Profissional): Faq[] {
  const quem = nomeCompleto(p)

  const exames = temExames(p)
  const pedido: Faq = {
    pergunta: 'Precisa de pedido médico?',
    resposta:
      exames && p.fazConsulta ? `Para exames, sim: o pedido médico é obrigatório. Para a consulta, ${CONFIRMAR_MINUSCULA}`
      : exames ? 'Sim. Os exames precisam de pedido médico.'
      : `Para a consulta, ${CONFIRMAR_MINUSCULA}`,
  }

  const linhas = linhasConvenios(p)
  const faltaAlgum = linhas.length < p.oQueFazNaNuvem.length
  const convenio: Faq = {
    pergunta: 'Atende convênio?',
    resposta: linhas.length === 0 ? CONFIRMAR_NO_AGENDAMENTO : '',
    lista: linhas.map(l => `${l.servico}: ${l.convenios}.`),
    // Regra da lista de convênios validada em 08/11/2026: plano fora da lista
    // do profissional não é atendido; oferece-se o atendimento particular.
    nota: linhas.length === 0 ? undefined
      : faltaAlgum ? `Para os demais atendimentos, ${CONFIRMAR_MINUSCULA}`
      : linhas.every(l => l.convenios === 'Somente particular') ? 'Todo atendimento particular tem recibo para reembolso, que o paciente verifica com o próprio plano.'
      : 'Se o plano não estiver na lista, o atendimento pode ser particular, com recibo para reembolso.',
  }

  const tele = textoTeleconsulta(p)
  const teleconsulta: Faq = {
    pergunta: 'Faz teleconsulta?',
    resposta: !p.fazConsulta
      ? `Não. ${p.tratamento === 'Dr.' ? 'O' : 'A'} ${quem} realiza exames presenciais na NU.V.E.M e não faz consulta.`
      : tele ? (tele.endsWith(".") ? tele : `${tele}.`) : CONFIRMAR_NO_AGENDAMENTO,
  }

  const faixa = confirmado(p.faixaEtaria)
  const idade: Faq = {
    pergunta: 'Qual idade atende?',
    resposta: faixa ? `${faixa}.` : CONFIRMAR_NO_AGENDAMENTO,
  }

  const levar: Faq = { pergunta: 'O que levar?', resposta: 'Leve no dia do atendimento:', lista: LISTA_O_QUE_LEVAR }

  return [pedido, convenio, teleconsulta, idade, levar]
}

/** Passos do atendimento, do agendamento ao laudo. */
export function passosDoAtendimento(p: Profissional): { titulo: string; texto: string }[] {
  const exames = temExames(p)
  return [
    { titulo: 'Agendamento', texto: 'Pelo WhatsApp ou pelo telefone da clínica.' },
    { titulo: 'Preparo', texto: exames ? 'A clínica envia as orientações de preparo do exame.' : 'A clínica envia as orientações para o dia do atendimento.' },
    { titulo: exames && p.fazConsulta ? 'Exame ou consulta' : exames ? 'Exame' : 'Consulta', texto: 'Atendimento na NU.V.E.M, na Rua Ceará, 600, em Belo Horizonte.' },
    exames
      ? { titulo: 'Laudo', texto: 'Enviado para o médico que pediu o exame, com rastreabilidade pela gestão certificada na norma ISO 9001.' }
      : { titulo: 'Registro', texto: 'Atendimento registrado em prontuário, com rastreabilidade pela gestão certificada na norma ISO 9001.' },
  ]
}

// ─── Pendências ──────────────────────────────────────────────────────────────

/** Todas as pendências [A CONFIRMAR] de um profissional, para o relatório. */
export function pendenciasDe(p: Profissional | MembroSemPagina): string[] {
  const achadas: string[] = []
  const visitar = (v: unknown) => {
    if (ehPendente(v)) { achadas.push(v.pendente); return }
    if (Array.isArray(v)) v.forEach(visitar)
    else if (v && typeof v === 'object') Object.values(v).forEach(visitar)
  }
  visitar(p)
  if ('pendencias' in p) achadas.push(...p.pendencias)
  if ('quandoProcurar' in p && p.quandoProcurar?.validacao === 'rascunho') {
    achadas.push('Lista "Quando procurar avaliação": rascunho para validação da Dra. Vera.')
  }
  return [...new Set(achadas)]
}

/**
 * Pendências que impedem a publicação: sem elas a página ficaria incompleta
 * perante o CFM (CRM sem UF) ou sem conteúdo (bio).
 */
export function pendenciasQueBloqueiam(p: Profissional): string[] {
  const motivos: string[] = []
  if (p.registro.conselho === 'CRM' && ehPendente(p.registro.uf)) motivos.push('CRM sem UF confirmada')
  if (ehPendente(p.bio)) motivos.push('bio sem texto confirmado')
  return motivos
}
