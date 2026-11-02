/**
 * Cria as versões em inglês e espanhol do artigo sobre IA na gastroenterologia como RASCUNHOS no
 * Sanity. Nunca publica: cada tradução precisa de revisão antes de ir ao ar.
 *
 * Diferente de scripts/traduzir-artigo.mjs, este script troca o texto trecho a
 * trecho (span a span), então os links no meio dos parágrafos são mantidos.
 * As traduções ficam em scripts/traducoes/artigo-ia-gastroenterologia.mjs, na mesma ordem dos
 * trechos do artigo em português; cada entrada guarda o começo do texto
 * original para o script conferir o alinhamento antes de gravar.
 *
 * Uso:
 *   node scripts/traduzir-artigo-ia.mjs --listar   lista os trechos do original
 *   node scripts/traduzir-artigo-ia.mjs            simulação
 *   node scripts/traduzir-artigo-ia.mjs --aplicar  grava os rascunhos
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { TRADUCOES } from './traducoes/artigo-ia-gastroenterologia.mjs'

if (!process.env.SANITY_WRITE_TOKEN && existsSync('.env.local')) {
  for (const linha of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = linha.match(/^\s*SANITY_WRITE_TOKEN\s*=\s*(.+?)\s*$/)
    if (m) process.env.SANITY_WRITE_TOKEN = m[1].replace(/^["']|["']$/g, '')
  }
}
const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('❌ SANITY_WRITE_TOKEN ausente'); process.exit(1) }

const aplicar = process.argv.includes('--aplicar')
const listar  = process.argv.includes('--listar')

const client = createClient({
  projectId: 'q8ibxbuz', dataset: 'production',
  apiVersion: '2024-01-01', token, useCdn: false,
})

const ORIGINAL_ID = 'post-inteligencia-artificial-gastroenterologia'
const IDIOMAS = ['en', 'es']

// Termos que não podem aparecer no texto traduzido (fora de `references`).
// Os marcados com palavraInteira só contam como palavra isolada.
const TERMOS = {
  en: [
    ['\u2014'], ['\u2013'], ['functional disease'], ['best', true], ['unique'], ['leader'], ['leading'],
    ['pioneer'], ['exclusiv'], ['most complete'], ['cure', true], ['cured', true], ['cures', true], ['guarantee'],
  ],
  es: [
    ['\u2014'], ['\u2013'], ['enfermedad funcional'], ['enfermedades funcionales'], ['mejor', true], ['único'],
    ['única'], ['líder'], ['pioner'], ['exclusiv'], ['el más completo'], ['cura', true], ['curar', true], ['garant'],
  ],
}

// ─── Trechos traduzíveis, na ordem em que aparecem ──────────────────────────

/** Devolve [{ texto, set }] para cada trecho de texto não vazio do documento. */
function trechos(doc) {
  const lista = []
  const add = (obj, campo) => { if (obj?.[campo]?.trim()) lista.push({ texto: obj[campo], set: v => { obj[campo] = v } }) }

  add(doc, 'title')
  add(doc, 'excerpt')
  add(doc, 'perguntaPrincipal')
  add(doc, 'respostaDireta')
  add(doc.coverImage, 'alt')

  const blocos = lista_ => {
    for (const b of lista_ ?? []) {
      if (b._type === 'block') b.children.forEach(s => add(s, 'text'))
      else if (b._type === 'calloutBlock') { add(b, 'titulo'); add(b, 'texto') }
      else if (b._type === 'faqItem') { add(b, 'pergunta'); blocos(b.resposta) }
      else if (b._type === 'downloadBlock') { add(b, 'titulo'); add(b, 'descricao'); add(b, 'label') }
      else throw new Error(`Tipo de bloco sem tratamento: ${b._type}`)
    }
  }
  blocos(doc.body)
  return lista
}

// ─── Main ────────────────────────────────────────────────────────────────────

const original = await client.getDocument(ORIGINAL_ID)
if (!original) { console.error(`❌ Artigo ${ORIGINAL_ID} não encontrado`); process.exit(1) }

if (listar) {
  trechos(structuredClone(original)).forEach((t, i) => console.log(`${i}\t${JSON.stringify(t.texto)}`))
  process.exit(0)
}

const erros = []
const linksEmPortugues = []

// Páginas sem tradução, lidas de src/middleware.ts para não duplicar a lista.
const PT_ONLY = [...readFileSync('src/middleware.ts', 'utf8')
  .match(/PT_ONLY_SEGMENTS = \[([\s\S]*?)\]/)[1]
  .matchAll(/'([^']+)'/g)].map(m => m[1])
const docs = []

for (const lang of IDIOMAS) {
  const doc = structuredClone(original)
  for (const campo of ['_rev', '_createdAt', '_updatedAt', '_system', 'dataRevisao']) delete doc[campo]

  const lista = trechos(doc)
  if (lista.length !== TRADUCOES.length) {
    erros.push(`${lang}: o original tem ${lista.length} trechos e o arquivo de traduções tem ${TRADUCOES.length}`)
    continue
  }
  lista.forEach((t, i) => {
    const { pt, [lang]: traducao } = TRADUCOES[i]
    if (!t.texto.startsWith(pt)) erros.push(`${lang}: trecho ${i} desalinhado. Original: "${t.texto.slice(0, 40)}", esperado: "${pt}"`)
    else if (!traducao?.length) erros.push(`${lang}: trecho ${i} sem tradução`)
    else t.set(traducao)
  })

  // Links internos ganham o prefixo do idioma (pt-BR não tem prefixo), exceto
  // páginas que só existem em português (lista do middleware) e artigos do
  // blog que ainda não têm versão PUBLICADA neste idioma (rascunho daria 404):
  // esses continuam em pt-BR.
  const slugsTraduzidos = new Set(await client.fetch(
    '*[_type == "post" && language == $lang && !(_id in path("drafts.**"))].slug.current', { lang }, { perspective: 'raw' },
  ))
  const prefixar = bs => bs?.forEach(b => {
    b.markDefs?.forEach(md => {
      if (!md.href?.startsWith('/')) return
      const segmento = md.href.split('/')[1]
      const slugBlog = segmento === 'blog' ? md.href.split('/')[2] : null
      if (PT_ONLY.includes(segmento) || (slugBlog && !slugsTraduzidos.has(slugBlog))) {
        linksEmPortugues.push(`${lang}: ${md.href}`)
        return
      }
      md.href = `/${lang}${md.href}`
    })
    if (b._type === 'faqItem') prefixar(b.resposta)
  })
  prefixar(doc.body)

  doc._id = `drafts.${ORIGINAL_ID}-${lang}`
  doc.language = lang
  doc.translationOf = { _type: 'reference', _ref: ORIGINAL_ID }

  const textoCorpo = trechos(structuredClone(doc)).slice(doc.coverImage?.alt ? 5 : 4).map(t => t.texto).join(' ')
  doc.readingTime = Math.ceil(textoCorpo.split(/\s+/).filter(Boolean).length / 200)

  // Checagem de termos em tudo que não é `references`.
  const { references, ...semReferencias } = doc
  const textos = []
  const coletar = v => {
    if (typeof v === 'string') textos.push(v)
    else if (Array.isArray(v)) v.forEach(coletar)
    else if (v && typeof v === 'object') for (const [k, x] of Object.entries(v)) if (!k.startsWith('_')) coletar(x)
  }
  coletar(semReferencias)
  for (const [termo, palavraInteira] of TERMOS[lang]) {
    const escapado = termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
    const re = new RegExp(palavraInteira ? `(?<!\\p{L})${escapado}(?!\\p{L})` : escapado, 'giu')
    for (const t of textos) for (const m of t.matchAll(re)) {
      erros.push(`${lang}: termo bloqueado "${termo}" em ...${t.slice(Math.max(0, m.index - 40), m.index + termo.length + 40)}...`)
    }
  }

  if (doc.respostaDireta.length > 320) erros.push(`${lang}: respostaDireta com ${doc.respostaDireta.length} caracteres (máximo 320)`)
  if (doc.excerpt.length > 200) erros.push(`${lang}: excerpt com ${doc.excerpt.length} caracteres (máximo 200)`)

  docs.push(doc)
}

for (const doc of docs) {
  console.log(`\n══════ ${doc.language.toUpperCase()} ══════`)
  console.log(JSON.stringify(doc, null, 2))
}

console.log('\n══════ RELATÓRIO ══════')
for (const doc of docs) {
  const links = doc.body.flatMap(b => b.markDefs ?? []).map(md => md.href)
  console.log(`\n${doc.language}: ${doc._id}`)
  console.log(`  título: ${doc.title}`)
  console.log(`  readingTime: ${doc.readingTime} min | respostaDireta: ${doc.respostaDireta.length} car. | excerpt: ${doc.excerpt.length} car.`)
  console.log(`  links: ${links.join(', ')}`)
}

if (linksEmPortugues.length) {
  console.log('\nLinks mantidos em pt-BR (página sem versão publicada neste idioma):')
  for (const l of linksEmPortugues) console.log(`  ${l}`)
}

if (erros.length) {
  console.log(`\n❌ Problemas (${erros.length}):`)
  for (const e of erros) console.log(`  ${e}`)
} else {
  console.log('\n✅ Alinhamento, termos e limites do schema conferidos')
}

if (!aplicar) { console.log('\n(simulação: rode com --aplicar para gravar os rascunhos)'); process.exit(0) }
if (erros.length) { console.error('\n❌ Gravação cancelada.'); process.exit(1) }

for (const doc of docs) {
  const existe = await client.fetch('*[_id in [$id, $pub]][0]._id', { id: doc._id, pub: doc._id.replace(/^drafts\./, '') })
  if (existe) { console.error(`❌ ${doc.language}: já existe ${existe}, nada gravado para este idioma`); continue }
  const r = await client.createIfNotExists(doc)
  console.log(`✅ Rascunho gravado: ${r._id}`)
}
