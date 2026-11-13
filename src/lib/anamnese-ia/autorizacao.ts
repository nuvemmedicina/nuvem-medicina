/**
 * Registro das autorizações de uso de imagem (rastreabilidade ISO 9001).
 *
 * Cada aceite ou revogação é um documento NOVO no Sanity, com ID privado
 * anamnese-ia.autorizacao.<escopo>.<data>-<aleatório>. Ele é criado com
 * create(), que falha se o ID já existir, e nenhuma rota da API altera ou
 * apaga esses documentos. Uma revogação não muda o aceite: gera outro
 * registro.
 *
 * Cada registro guarda o hash (SHA-256) do anterior do mesmo profissional e
 * o próprio hash. Se alguém editar um registro direto no Sanity, a corrente
 * deixa de bater e o painel mostra o aviso (verificarCorrente).
 *
 * Não guardamos o IP completo: só a parte inicial (ipParcial).
 */
import { createHash } from 'node:crypto'
import type { Sanity } from './servidor'
import { idAleatorio } from './servidor'

export type TipoRegistro = 'aceite' | 'revogacao'

export type RegistroAutorizacao = {
  _id: string
  _type: 'anamneseIaAutorizacao'
  tipo: TipoRegistro
  escopo: string
  slug: string
  nomeCompleto: string
  registro: string
  termoVersao: string
  termoSha256: string
  fotoId: string | null
  em: string
  ipParcial: string
  /** 'profissional' (pelo link da anamnese) ou o gestor que registrou. */
  registradoPor: string
  motivo?: string
  anteriorId: string | null
  hashAnterior: string | null
  hash: string
}

const CAMPOS_HASH: (keyof RegistroAutorizacao)[] = [
  '_id', 'tipo', 'escopo', 'slug', 'nomeCompleto', 'registro', 'termoVersao', 'termoSha256',
  'fotoId', 'em', 'ipParcial', 'registradoPor', 'motivo', 'anteriorId', 'hashAnterior',
]

export const sha256 = (s: string) => createHash('sha256').update(s, 'utf8').digest('hex')

export function hashRegistro(r: Omit<RegistroAutorizacao, 'hash'>) {
  return sha256(JSON.stringify(CAMPOS_HASH.map(k => [k, (r as Record<string, unknown>)[k] ?? null])))
}

export const slugDoEscopo = (escopo: string) => escopo.replace(/^medico-/, '')

/** Registros de um profissional, do mais antigo ao mais novo. */
export function registrosDe(client: Sanity, escopo: string) {
  return client.fetch<RegistroAutorizacao[]>(
    '*[_type == "anamneseIaAutorizacao" && escopo == $escopo] | order(em asc, _id asc)',
    { escopo },
  )
}

export function todosRegistros(client: Sanity) {
  return client.fetch<RegistroAutorizacao[]>('*[_type == "anamneseIaAutorizacao"] | order(escopo asc, em asc, _id asc)')
}

/** Cria um registro novo (nunca altera os existentes). */
export async function registrar(client: Sanity, dados: Omit<RegistroAutorizacao, '_id' | '_type' | 'em' | 'anteriorId' | 'hashAnterior' | 'hash' | 'slug'>) {
  const anteriores = await registrosDe(client, dados.escopo)
  const ultimo = anteriores.at(-1) ?? null
  const em = new Date().toISOString()
  const base: Omit<RegistroAutorizacao, 'hash'> = {
    _id: `anamnese-ia.autorizacao.${dados.escopo}.${em.replace(/[-:.TZ]/g, '').slice(0, 14)}-${idAleatorio(6)}`,
    _type: 'anamneseIaAutorizacao',
    ...dados,
    slug: slugDoEscopo(dados.escopo),
    em,
    anteriorId: ultimo?._id ?? null,
    hashAnterior: ultimo?.hash ?? null,
  }
  const registro: RegistroAutorizacao = { ...base, hash: hashRegistro(base) }
  await client.create(registro, { visibility: 'sync' })
  return registro
}

/** A autorização vale hoje? (último registro é um aceite) */
export function autorizacaoVigente(registros: RegistroAutorizacao[]) {
  const ultimo = registros.at(-1)
  return ultimo?.tipo === 'aceite' ? ultimo : null
}

/** Confere a corrente de hashes de um profissional. */
export function verificarCorrente(registros: RegistroAutorizacao[]) {
  let anterior: RegistroAutorizacao | null = null
  for (const r of registros) {
    // hashRegistro só lê CAMPOS_HASH: _rev, _createdAt etc. do Sanity não contam
    if (hashRegistro(r) !== r.hash) return { ok: false, registro: r._id }
    if ((anterior?.hash ?? null) !== r.hashAnterior || (anterior?._id ?? null) !== r.anteriorId) return { ok: false, registro: r._id }
    anterior = r
  }
  return { ok: true as const }
}
