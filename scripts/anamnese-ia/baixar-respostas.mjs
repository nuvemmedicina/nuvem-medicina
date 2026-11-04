/**
 * Baixa do Sanity as respostas salvas pelas páginas /anamnese-ia e grava
 * em docs/anamnese-ia/respostas/servidor/ nos mesmos formatos do botão
 * "Baixar JSON" — prontos para o gerador:
 *
 *   node --import ./scripts/anamnese-ia/register.mjs scripts/anamnese-ia/baixar-respostas.mjs
 *   node --import ./scripts/anamnese-ia/register.mjs scripts/anamnese-ia/gerar-documentos.mjs --respostas docs/anamnese-ia/respostas/servidor
 *
 * A pasta está fora do git (repositório público).
 */
import './env.mjs'
import { mkdirSync, writeFileSync, rmSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createClient } from '@sanity/client'
import { listarPendencias } from '@/lib/anamnese-ia/preparos'

const ROOT = path.resolve(fileURLToPath(new URL('../../', import.meta.url)))
const DIR  = path.join(ROOT, 'docs', 'anamnese-ia', 'respostas', 'servidor')

const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('Falta SANITY_WRITE_TOKEN no .env.local'); process.exit(1) }
const client = createClient({ projectId: 'q8ibxbuz', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token })

const docs = await client.fetch('*[_id in path("anamnese-ia.**")]{escopo, dadosJson, atualizadoEm, finalizadoEm} | order(escopo asc)')

rmSync(DIR, { recursive: true, force: true })
mkdirSync(DIR, { recursive: true })

const base = d => ({ versao: 'v1', exportadoEm: d.atualizadoEm, finalizadoEm: d.finalizadoEm ?? null })
const quando = d => `${d.finalizadoEm ? 'ENVIADO' : 'em andamento'} · salvo em ${new Date(d.atualizadoEm).toLocaleString('pt-BR')}`
const resumo = []

for (const d of docs) {
  const dados = JSON.parse(d.dadosJson || 'null')
  if (!dados) continue
  let arquivo, conteudo
  if (d.escopo === 'completo') {
    arquivo = '00-completo.json'
    conteudo = { tipo: 'anamnese-ia/completo', ...base(d),
      clinica: { valores: dados.clinica },
      medicos: dados.medicos.map(m => ({ slug: m.slug, nome: m.values.nome, valores: m.values })) }
  } else if (d.escopo === 'clinica') {
    arquivo = '10-clinica.json'
    conteudo = { tipo: 'anamnese-ia/clinica', ...base(d), valores: dados.clinica }
  } else if (d.escopo.startsWith('medico-')) {
    const m = dados.medicos?.[0]
    if (!m) continue
    arquivo = `20-${d.escopo}.json`
    conteudo = { tipo: 'anamnese-ia/medico', ...base(d), slug: m.slug ?? d.escopo.replace(/^medico-/, ''), nome: m.values.nome ?? '', valores: m.values }
  } else if (d.escopo === 'validacao') {
    const pend = listarPendencias()
    const ok = pend.filter(p => { const r = dados.respostas?.[p.id]; return r?.decisao && (r.decisao !== 'corrigir' || r.orientacao?.trim()) }).length
    arquivo = '30-validacao.json'
    conteudo = { tipo: 'anamnese-ia/validacao', ...base(d), validador: dados.validador, observacoes: dados.observacoes,
      resolvidos: ok, total: pend.length, itens: pend.map(p => ({ ...p, ...dados.respostas?.[p.id] })) }
  } else continue
  writeFileSync(path.join(DIR, arquivo), JSON.stringify(conteudo, null, 2))
  resumo.push(`${arquivo.padEnd(42)} ${quando(d)}`)
}

console.log(resumo.length ? resumo.join('\n') : 'Nenhuma resposta salva no servidor ainda.')
console.log(`\n${resumo.length} arquivo(s) em ${path.relative(ROOT, DIR)} (fora do git).`)
