/**
 * Página do profissional no site: conteúdo versionado, aprovações e status.
 * (Tipos e regras comuns ao navegador e ao servidor.)
 *
 * Documento privado anamnese-ia.pagina.<escopo> no Sanity:
 *   textos[]    cada versão do conteúdo, escrita pela clínica no painel
 *   decisoes[]  "aprovou" ou "ajustes" do profissional, ligadas à versão do
 *               texto e à foto exatas que ele viu
 *   publicacoes[]  marcação de publicada (feita no painel depois do deploy)
 *
 * Nada aqui é apagado: novas versões e decisões entram no fim das listas.
 */
import type { DocFotos } from './foto'
import { fotoAprovada } from './foto'

export type ConteudoPagina = {
  nome: string
  registro: string
  especialidade: string
  areas: string
  bio: string
  instagram: string
}

export type VersaoTexto = { _key: string; versao: number; conteudo: ConteudoPagina; sha256: string; em: string; por: string }
export type Decisao = {
  _key: string
  tipo: 'aprovou' | 'ajustes'
  textoVersao: number
  textoSha256: string
  fotoId: string | null
  em: string
  pedido?: string
  ipParcial: string
}
export type Publicacao = { _key: string; em: string; por: string; porNome: string; textoVersao: number; fotoId: string | null; acao: 'publicou' | 'retirou' }

export type DocPagina = {
  _id: string
  escopo: string
  textos?: VersaoTexto[]
  decisoes?: Decisao[]
  publicacoes?: Publicacao[]
}

export const docPaginaId = (escopo: string) => `anamnese-ia.pagina.${escopo}`

export const CONTEUDO_VAZIO: ConteudoPagina = { nome: '', registro: '', especialidade: '', areas: '', bio: '', instagram: '' }

export const ETAPAS = {
  'sem-foto':          'Sem foto',
  'foto-enviada':      'Foto enviada',
  'foto-aprovada':     'Foto aprovada pela clínica',
  'aguardando-medico': 'Página aguardando aprovação do médico',
  'pagina-aprovada':   'Página aprovada',
  'publicada':         'Publicada',
} as const
export type Etapa = keyof typeof ETAPAS

/** Foto que entra na página: o envio atual ou null quando a página sai sem foto. */
export function fotoDaPagina(fotos: DocFotos | null): string | null {
  return fotos?.opcao === 'enviada' ? fotos.atual ?? null : null
}

export type Situacao = {
  etapa: Etapa
  rotulo: string
  detalhe: string
  texto: VersaoTexto | null
  fotoId: string | null
  /** Última decisão do profissional para a versão atual (texto e foto). */
  decisaoAtual: Decisao | null
  aprovadaPeloMedico: boolean
  aprovadaPelaClinica: boolean
  autorizacaoOk: boolean
  podePublicar: boolean
  faltaParaPublicar: string[]
  publicadaAtual: Publicacao | null
  /** Publicada antes, mas com versão diferente da atual ou autorização revogada. */
  alertaPublicada: string | null
}

/**
 * Calcula a situação de um profissional.
 * `autorizacaoFotoId`: fotoId do aceite vigente (undefined = sem aceite vigente).
 */
export function situacao(fotos: DocFotos | null, pagina: DocPagina | null, autorizacaoFotoId: string | null | undefined): Situacao {
  const texto = pagina?.textos?.at(-1) ?? null
  const fotoId = fotoDaPagina(fotos)
  const semFoto = fotos?.opcao === 'sem-foto'
  const aprovadaPelaClinica = fotoAprovada(fotos)
  const autorizacaoOk = semFoto || (!!fotoId && autorizacaoFotoId === fotoId)

  const daVersao = (pagina?.decisoes ?? []).filter(d => texto && d.textoVersao === texto.versao && d.textoSha256 === texto.sha256 && d.fotoId === fotoId)
  const decisaoAtual = daVersao.at(-1) ?? null
  const aprovadaPeloMedico = decisaoAtual?.tipo === 'aprovou'

  const ultimaPub = pagina?.publicacoes?.at(-1) ?? null
  const publicadaAtual = ultimaPub?.acao === 'publicou' && texto && ultimaPub.textoVersao === texto.versao && ultimaPub.fotoId === fotoId ? ultimaPub : null

  const faltaParaPublicar = [
    !autorizacaoOk && 'autorização de uso de imagem aceita (ou a opção "sem foto")',
    !aprovadaPelaClinica && 'aprovação da clínica',
    !texto && 'texto da página',
    !aprovadaPeloMedico && 'aprovação do médico',
  ].filter(Boolean) as string[]

  let etapa: Etapa
  if (publicadaAtual && faltaParaPublicar.length === 0) etapa = 'publicada'
  else if (aprovadaPelaClinica && texto && aprovadaPeloMedico) etapa = 'pagina-aprovada'
  else if (aprovadaPelaClinica && texto) etapa = 'aguardando-medico'
  else if (aprovadaPelaClinica) etapa = 'foto-aprovada'
  else if (fotos?.opcao === 'enviada' && fotos.atual) etapa = 'foto-enviada'
  else etapa = 'sem-foto'

  const detalhe =
    etapa === 'sem-foto'
      ? fotos?.opcao === 'clinica' ? 'Pediu que a clínica providencie a foto.'
      : semFoto ? 'Não quer foto no site. Falta a clínica confirmar.'
      : 'Ainda não enviou foto.'
    : etapa === 'foto-aprovada' && semFoto ? 'Página sem foto, confirmada pela clínica. Falta o texto.'
    : etapa === 'foto-aprovada' ? 'Falta o texto da página.'
    : etapa === 'aguardando-medico' && decisaoAtual?.tipo === 'ajustes' ? 'O médico pediu ajustes.'
    : ''

  let alertaPublicada: string | null = null
  if (ultimaPub?.acao === 'publicou' && !publicadaAtual) alertaPublicada = 'A versão publicada não é mais a atual: revise e publique de novo ou retire do site.'
  if (ultimaPub?.acao === 'publicou' && !autorizacaoOk && !semFoto) alertaPublicada = 'Autorização revogada ou ausente: retire a foto do site em até 10 dias úteis.'

  return {
    etapa, rotulo: etapa === 'foto-aprovada' && semFoto ? 'Sem foto, confirmado pela clínica' : ETAPAS[etapa], detalhe,
    texto, fotoId, decisaoAtual, aprovadaPeloMedico, aprovadaPelaClinica, autorizacaoOk,
    podePublicar: faltaParaPublicar.length === 0, faltaParaPublicar, publicadaAtual, alertaPublicada,
  }
}

/** Iniciais para a página sem foto ("Dra. Vera Ângelo" → "VA"). */
export function iniciais(nome: string) {
  const partes = nome.replace(/^(dra?\.?\s+)/i, '').split(/\s+/).filter(p => p.length > 2 || /^[A-ZÀ-Ý]/.test(p))
  return ((partes[0]?.[0] ?? '') + (partes.length > 1 ? partes.at(-1)![0] : ''))
    .normalize('NFD').replace(/[̀-ͯ]/g, '').toUpperCase()
}
