/**
 * Leitura conjunta de foto, página e autorizações de um profissional
 * (só no servidor).
 */
import { docId } from './acesso'
import { docFotosId, type DocFotos } from './foto'
import { docPaginaId, situacao, CONTEUDO_VAZIO, type ConteudoPagina, type DocPagina } from './pagina'
import { registrosDe, autorizacaoVigente, sha256 } from './autorizacao'
import { normalizarInstagram } from './formatos'
import { MEDICOS_SITE } from './prefill'
import type { Sanity } from './servidor'

export async function carregarProfissional(client: Sanity, escopo: string) {
  const [fotos, pagina, registros] = await Promise.all([
    client.getDocument<DocFotos>(docFotosId(escopo)),
    client.getDocument<DocPagina>(docPaginaId(escopo)),
    registrosDe(client, escopo),
  ])
  const vigente = autorizacaoVigente(registros)
  return {
    fotos: fotos ?? null,
    pagina: pagina ?? null,
    registros,
    vigente,
    situacao: situacao(fotos ?? null, pagina ?? null, vigente ? vigente.fotoId : undefined),
  }
}

export const hashConteudo = (c: ConteudoPagina) => sha256(JSON.stringify([c.nome, c.registro, c.especialidade, c.areas, c.bio, c.instagram]))

/** Limpa e limita o conteúdo vindo do painel. */
export function limparConteudo(c: Partial<Record<keyof ConteudoPagina, unknown>>): ConteudoPagina {
  const t = (v: unknown, max: number) => String(v ?? '').replace(/\r\n/g, '\n').trim().slice(0, max)
  return {
    nome: t(c.nome, 120),
    registro: t(c.registro, 160),
    especialidade: t(c.especialidade, 160),
    areas: t(c.areas, 500),
    bio: t(c.bio, 2000),
    instagram: normalizarInstagram(t(c.instagram, 80)),
  }
}

/** Rascunho do texto da página a partir da anamnese (ou do cadastro do site). */
export async function conteudoDaAnamnese(client: Sanity, escopo: string): Promise<ConteudoPagina> {
  const doc = await client.getDocument<{ dadosJson?: string }>(docId(escopo))
  let v: Record<string, unknown> = {}
  try { v = JSON.parse(doc?.dadosJson ?? 'null')?.medicos?.[0]?.values ?? {} } catch { /* vazio */ }
  const site = MEDICOS_SITE.find(m => `medico-${m.slug}` === escopo)
  const s = (k: string, alt = '') => String(v[k] ?? '').trim() || alt
  return limparConteudo({
    ...CONTEUDO_VAZIO,
    nome: s('nome', site?.nome),
    registro: s('registro', site?.registro),
    especialidade: s('especialidade', site?.especialidade),
    areas: s('areas', site?.areas),
    bio: s('bio', site?.bio),
    instagram: s('instagram'),
  })
}
