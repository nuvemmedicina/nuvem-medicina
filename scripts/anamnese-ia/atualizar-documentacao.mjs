/**
 * Atualiza toda a documentação da anamnese da IA com as respostas mais recentes.
 *
 *   node --import ./scripts/anamnese-ia/register.mjs scripts/anamnese-ia/atualizar-documentacao.mjs
 *
 * 1. Baixa do Sanity o que foi salvo pelas páginas /anamnese-ia
 *    (docs/anamnese-ia/respostas/servidor/).
 * 2. Junta com o que está em docs/anamnese-ia/respostas/: PDFs de médicos já
 *    transcritos (21-pdf-medico-*.json) e os ajustes da gestão
 *    (45-ajustes-gestao.json, aplicados por último).
 * 3. Gera o PDF da clínica, os 5 anexos da Dr.IAgenda, o Markdown dos preparos
 *    e o relatório em docs/anamnese-ia/respostas/documentos-finais/.
 * 4. Grava e mostra a situação: quem já respondeu, quem está em andamento e
 *    quem ainda não abriu (documentos-finais/situacao.md).
 *
 * Tudo fica em docs/anamnese-ia/respostas/, fora do git (repositório público).
 */
import './env.mjs'
import { execFileSync } from 'node:child_process'
import { existsSync, readFileSync, readdirSync, writeFileSync, mkdirSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { MEDICOS_SITE } from '@/lib/anamnese-ia/prefill'
import { SECOES_CLINICA, TODOS_CAMPOS_MEDICO } from '@/lib/anamnese-ia/schema'
import { PREPAROS_NOVOS } from '@/lib/anamnese-ia/preparos'

const ROOT = path.resolve(fileURLToPath(new URL('../../', import.meta.url)))
const RESP = path.join(ROOT, 'docs', 'anamnese-ia', 'respostas')
const SERV = path.join(RESP, 'servidor')
const SAIDA = path.join(RESP, 'documentos-finais')
const node = (script, args = []) => execFileSync(process.execPath,
  ['--no-warnings', '--import', './scripts/anamnese-ia/register.mjs', `scripts/anamnese-ia/${script}`, ...args],
  { cwd: ROOT, stdio: 'inherit' })

console.log('1) Baixando respostas do servidor…')
node('baixar-respostas.mjs')

console.log('\n2) Gerando documentos…')
node('gerar-documentos.mjs', ['--respostas', SERV, '--respostas', RESP, '--saida', SAIDA])

// ─── Situação ─────────────────────────────────────────────────────────────────
const ler = (dir, fonte) => existsSync(dir)
  ? readdirSync(dir).filter(f => f.endsWith('.json')).map(f => ({ ...JSON.parse(readFileSync(path.join(dir, f), 'utf8')), __fonte: fonte }))
  : []
const docs = [...ler(SERV, 'servidor'), ...ler(RESP, 'arquivo')]
const ajustes = docs.filter(d => d.tipo === 'anamnese-ia/ajustes')
const txt = v => Array.isArray(v) ? v.join(' · ') : String(v ?? '').trim()
const obrig = (campos, v) => { const o = campos.filter(f => f.required); return `${o.filter(f => txt(v[f.id]) && !/_{3,}/.test(txt(v[f.id]))).length}/${o.length}` }

const linhas = [`# Situação da anamnese da IA — ${new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })}`, '']

const clin = docs.find(d => d.tipo === 'anamnese-ia/clinica')
linhas.push('## Gestão (Parte A)', '', clin
  ? `- ${clin.finalizadoEm ? '✅ Enviada' : '⏳ Em andamento'} · obrigatórios completos no formulário: ${obrig(SECOES_CLINICA.flatMap(s => s.fields), clin.valores)}${docs.some(d => d.tipo === 'anamnese-ia/ajustes') ? ' · com ajustes da gestão aplicados' : ''}`
  : '- ❌ Não começou', '')

linhas.push('## Profissionais', '')
const grupos = { enviado: [], pdf: [], andamento: [], falta: [], dispensado: [] }
// Profissionais que a gestão mandou transferir para a recepção (afastados, eventuais)
const dispensados = new Set(ajustes.flatMap(a => Object.entries(a.medicos ?? {})
  .filter(([, v]) => /transferir para a recepção/i.test(v.gatilhos ?? '')).map(([slug]) => slug)))
for (const m of MEDICOS_SITE) {
  const versoes = docs.filter(d => d.tipo === 'anamnese-ia/medico' && d.slug === m.slug)
  const servidor = versoes.find(d => d.__fonte === 'servidor')
  const pdf = versoes.find(d => d.__fonte === 'arquivo')
  if (servidor?.finalizadoEm) grupos.enviado.push(`${m.nome} (${obrig(TODOS_CAMPOS_MEDICO, servidor.valores)})`)
  else if (pdf) grupos.pdf.push(m.nome)
  else if (dispensados.has(m.slug)) grupos.dispensado.push(m.nome)
  else if (servidor) grupos.andamento.push(`${m.nome} (${obrig(TODOS_CAMPOS_MEDICO, servidor.valores)})`)
  else grupos.falta.push(m.nome)
}
const novosMed = docs.filter(d => d.tipo === 'anamnese-ia/medico' && String(d.slug).startsWith('novo-'))
const total = MEDICOS_SITE.length
linhas.push(`Responderam: **${grupos.enviado.length + grupos.pdf.length} de ${total - grupos.dispensado.length}**${grupos.dispensado.length ? ` (${grupos.dispensado.length} dispensado${grupos.dispensado.length > 1 ? 's' : ''})` : ''}${novosMed.length ? ` (+ ${novosMed.length} profissional novo)` : ''}`, '')
if (grupos.enviado.length) linhas.push(`- ✅ Enviaram pelo link: ${grupos.enviado.join(', ')}`)
if (grupos.pdf.length) linhas.push(`- ✅ Responderam por arquivo (PDF ou JSON): ${grupos.pdf.join(', ')}`)
if (grupos.andamento.length) linhas.push(`- ⏳ Começaram e não enviaram: ${grupos.andamento.join(', ')}`)
if (grupos.falta.length) linhas.push(`- ❌ Ainda não abriram: ${grupos.falta.join(', ')}`)
if (grupos.dispensado.length) linhas.push(`- ➖ Dispensados (perguntas sobre eles vão para a recepção): ${grupos.dispensado.join(', ')}`)
linhas.push('')

const val = docs.find(d => d.tipo === 'anamnese-ia/validacao')
const novosOk = (val?.preparosNovos ?? []).filter(p => p.completo).map(p => p.nome)
linhas.push('## Validação dos preparos', '', val
  ? `- ${val.finalizadoEm ? '✅ Enviada' : '⏳ Em andamento'} · ${val.resolvidos} de ${val.total} pontos · preparos novos: ${novosOk.length} de ${PREPAROS_NOVOS.length}${novosOk.length ? ` (${novosOk.join(', ')})` : ''}`
  : '- ❌ Não começou', '')

linhas.push('## Documentos gerados', '', `Pasta: \`${path.relative(ROOT, SAIDA)}\``, '',
  '- clinica-nuvem-dr-iagenda.pdf (documento completo)',
  '- anexos/01 a 05 (PDF + Markdown) para a Dr.IAgenda',
  '- relatorio-validacao.md (o que ainda falta, item a item)', '')

mkdirSync(SAIDA, { recursive: true })
writeFileSync(path.join(SAIDA, 'situacao.md'), linhas.join('\n'))
console.log('\n' + linhas.join('\n'))
