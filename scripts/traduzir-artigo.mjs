/**
 * Traduz um artigo do blog (pt-BR) para outro(s) idioma(s) usando IA, e grava
 * o resultado no Sanity como RASCUNHO — nunca publica sozinho. Revisão da
 * equipe clínica é obrigatória antes de publicar qualquer tradução.
 *
 * Uso:
 *   node scripts/traduzir-artigo.mjs <slug-pt-BR> --to=en,es [--dry-run]
 *
 * --dry-run imprime o documento traduzido sem gravar nada no Sanity — use
 * sempre na primeira vez que traduzir um artigo novo, para conferir a
 * qualidade antes de gastar uma chamada de gravação.
 *
 * Variáveis de ambiente necessárias (lidas de .env.local se não estiverem
 * já no ambiente — nunca gravadas neste arquivo):
 *   SANITY_WRITE_TOKEN   token do Sanity com permissão de Editor
 *   ANTHROPIC_API_KEY    chave da API da Anthropic
 *
 * O QUE É TRADUZIDO: title, excerpt, perguntaPrincipal, respostaDireta,
 * coverImage.alt, e o corpo do artigo (body) — parágrafos, títulos, blocos
 * de callout/FAQ/download/estatística/tabela/legendas de imagem e vídeo.
 *
 * O QUE NÃO É TRADUZIDO (fica igual ao original): slug (mesma URL relativa
 * em todos os idiomas), author/revisadoPor/categories (referências),
 * exameRelacionado/especialidadeRelacionada (identificadores — o rótulo
 * exibido já vem traduzido pela camada de mensagens do site, não pelo
 * identificador em si), coverImage.credit, references[].citation/url
 * (citações bibliográficas), statBlock.items[].valor/fonte.
 *
 * LIMITAÇÃO CONHECIDA: parágrafos com formatação (negrito/link) NO MEIO da
 * frase são traduzidos como texto único e a formatação inline é perdida
 * (fica só no início do parágrafo) — o script avisa no console quando isso
 * acontece, para o revisor reformatar manualmente no Studio se necessário.
 * Parágrafos simples, sem formatação inline, não são afetados.
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

// ─── Ambiente ──────────────────────────────────────────────────────────────

function lerEnvLocal(nome) {
  if (process.env[nome]) return process.env[nome]
  if (!existsSync('.env.local')) return undefined
  const re = new RegExp(`^\\s*${nome}\\s*=\\s*(.+?)\\s*$`)
  for (const linha of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = linha.match(re)
    if (m) return m[1].replace(/^["']|["']$/g, '')
  }
  return undefined
}

const SANITY_TOKEN    = lerEnvLocal('SANITY_WRITE_TOKEN')
const ANTHROPIC_KEY   = lerEnvLocal('ANTHROPIC_API_KEY')

if (!SANITY_TOKEN) {
  console.error('❌ Defina SANITY_WRITE_TOKEN (env ou .env.local).')
  process.exit(1)
}
if (!ANTHROPIC_KEY) {
  console.error('❌ Defina ANTHROPIC_API_KEY (env ou .env.local).')
  process.exit(1)
}

const client = createClient({
  projectId:  'q8ibxbuz',
  dataset:    'production',
  apiVersion: '2024-01-01',
  token:      SANITY_TOKEN,
  useCdn:     false,
})

// ─── CLI ───────────────────────────────────────────────────────────────────

const args    = process.argv.slice(2)
const slug    = args.find(a => !a.startsWith('--'))
const toArg   = args.find(a => a.startsWith('--to='))
const dryRun  = args.includes('--dry-run')

const LANG_LABEL = {
  en: 'English (US), for an international audience visiting a Brazilian medical clinic',
  es: 'Spanish (neutral Latin American), for an international audience visiting a Brazilian medical clinic',
}

if (!slug || !toArg) {
  console.error('Uso: node scripts/traduzir-artigo.mjs <slug-pt-BR> --to=en,es [--dry-run]')
  process.exit(1)
}

const targets = toArg.replace('--to=', '').split(',').map(s => s.trim()).filter(Boolean)
for (const lang of targets) {
  if (!LANG_LABEL[lang]) {
    console.error(`❌ Idioma "${lang}" não suportado. Idiomas disponíveis: ${Object.keys(LANG_LABEL).join(', ')}`)
    process.exit(1)
  }
}

// ─── Coleta dos trechos traduzíveis (mutação in-place via closures) ────────

function collectTranslatableUnits(doc) {
  const units = []
  const add = (text, set) => { if (text && text.trim()) units.push({ text, set }) }

  add(doc.title,             v => { doc.title = v })
  add(doc.excerpt,           v => { doc.excerpt = v })
  add(doc.perguntaPrincipal, v => { doc.perguntaPrincipal = v })
  add(doc.respostaDireta,    v => { doc.respostaDireta = v })
  if (doc.coverImage) add(doc.coverImage.alt, v => { doc.coverImage.alt = v })

  function walkBlocks(blocks) {
    for (const block of blocks ?? []) {
      switch (block._type) {
        case 'block': {
          const children = block.children ?? []
          if (children.length === 1) {
            add(children[0].text, v => { children[0].text = v })
          } else if (children.length > 1) {
            const joined = children.map(c => c.text ?? '').join('')
            add(joined, v => {
              children[0].text = v
              for (let i = 1; i < children.length; i++) children[i].text = ''
              console.warn(`  ⚠️  Formatação inline (negrito/link) simplificada em: "${joined.slice(0, 70)}${joined.length > 70 ? '…' : ''}" — revise manualmente no Studio se necessário.`)
            })
          }
          break
        }
        case 'image':
          add(block.alt, v => { block.alt = v })
          add(block.caption, v => { block.caption = v })
          break
        case 'calloutBlock':
          add(block.titulo, v => { block.titulo = v })
          add(block.texto, v => { block.texto = v })
          break
        case 'faqItem':
          add(block.pergunta, v => { block.pergunta = v })
          if (typeof block.resposta === 'string') {
            add(block.resposta, v => { block.resposta = v })
          } else if (Array.isArray(block.resposta)) {
            walkBlocks(block.resposta)
          }
          break
        case 'downloadBlock':
          add(block.titulo, v => { block.titulo = v })
          add(block.descricao, v => { block.descricao = v })
          add(block.label, v => { block.label = v })
          break
        case 'statBlock':
          add(block.titulo, v => { block.titulo = v })
          for (const item of block.items ?? []) {
            add(item.label, v => { item.label = v })
          }
          break
        case 'tableBlock':
          add(block.caption, v => { block.caption = v })
          for (const row of block.rows ?? []) {
            const cells = row.cells ?? []
            cells.forEach((cell, i) => add(cell, v => { cells[i] = v }))
          }
          break
        case 'spotifyBlock':
          add(block.title, v => { block.title = v })
          break
        case 'youtubeBlock':
          add(block.title, v => { block.title = v })
          break
      }
    }
  }
  walkBlocks(doc.body)

  return units
}

// ─── Chamada à API da Anthropic ─────────────────────────────────────────────

const LOTE = 40 // trechos por chamada — evita respostas longas demais de uma vez

async function translateBatch(texts, langLabel) {
  const prompt = `Translate the following ${texts.length} strings from Brazilian Portuguese to ${langLabel}.

Context: this is medical/educational content for a gastroenterology clinic's website (NU.V.E.M Medicina). Keep medical terminology accurate and use a professional, warm tone appropriate for a healthcare provider addressing patients. Do NOT translate: proper nouns, doctor names and titles (Dra., Dr.), brand/equipment names (e.g. HealthGo AIR, Dynamed), medical abbreviations (SIBO, IMO, DGBI, H. pylori, ISO 9001), or units/measurements.

Return ONLY a raw JSON array of ${texts.length} strings, in the exact same order, with no markdown code fences and no other text before or after it.

Input:
${JSON.stringify(texts)}`

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_KEY,
      'anthropic-version': '2023-06-01',
    },
    body: JSON.stringify({
      model: 'claude-sonnet-4-6',
      max_tokens: 8192,
      messages: [{ role: 'user', content: prompt }],
    }),
  })

  const data = await response.json()
  if (!response.ok) {
    throw new Error(`Erro na API Anthropic: ${data.error?.message ?? response.statusText}`)
  }

  const raw = data.content?.[0]?.text ?? ''
  let translated
  try {
    translated = JSON.parse(raw)
  } catch {
    const match = raw.match(/\[[\s\S]*\]/)
    if (!match) throw new Error(`Resposta da IA não é um JSON array válido:\n${raw.slice(0, 500)}`)
    translated = JSON.parse(match[0])
  }
  if (!Array.isArray(translated) || translated.length !== texts.length) {
    throw new Error(`Esperava um array de ${texts.length} strings, recebi ${Array.isArray(translated) ? translated.length : typeof translated}.`)
  }
  return translated
}

async function translateAll(texts, langLabel) {
  const resultado = []
  for (let i = 0; i < texts.length; i += LOTE) {
    const lote = texts.slice(i, i + LOTE)
    console.log(`  traduzindo trechos ${i + 1}–${i + lote.length} de ${texts.length}…`)
    const traduzido = await translateBatch(lote, langLabel)
    resultado.push(...traduzido)
  }
  return resultado
}

// ─── Main ────────────────────────────────────────────────────────────────

async function main() {
  console.log(`→ Buscando artigo "${slug}" (pt-BR)…`)
  const original = await client.fetch(
    `*[_type == "post" && slug.current == $slug && coalesce(language, "pt-BR") == "pt-BR"][0]`,
    { slug }
  )
  if (!original) {
    console.error(`❌ Artigo "${slug}" não encontrado (ou não está marcado como pt-BR).`)
    process.exit(1)
  }
  console.log(`  encontrado: "${original.title}" (${original._id})`)

  for (const lang of targets) {
    console.log(`\n=== Traduzindo para ${lang.toUpperCase()} ===`)

    const doc = structuredClone(original)
    delete doc._id
    delete doc._rev
    delete doc._createdAt
    delete doc._updatedAt
    delete doc._system // metadado de fetch do Sanity, não é conteúdo do documento

    const units = collectTranslatableUnits(doc)
    console.log(`  ${units.length} trecho(s) de texto a traduzir…`)

    const traduzidos = await translateAll(units.map(u => u.text), LANG_LABEL[lang])
    units.forEach((u, i) => u.set(traduzidos[i]))

    doc.language = lang
    doc.translationOf = { _type: 'reference', _ref: original._id }

    if (dryRun) {
      console.log(`\n  [--dry-run] documento traduzido para ${lang} (NÃO gravado):\n`)
      console.log(JSON.stringify(doc, null, 2))
      continue
    }

    const draftId = `drafts.${randomUUID()}`
    const criado = await client.create({ ...doc, _id: draftId, _type: 'post' })
    console.log(`\n  ✅ Rascunho criado: ${criado._id}`)
    console.log(`     Revise no Studio (Artigos) antes de publicar — a tradução não vai ao ar sozinha.`)
  }
}

main().catch(err => {
  console.error('\n❌ Falhou:', err.message)
  process.exit(1)
})
