/**
 * Converte o campo `resposta` dos blocos faqItem de texto simples (string)
 * para texto formatado (Portable Text), acompanhando a mudança do schema em
 * src/sanity/schemaTypes/faqItem.ts.
 *
 * Cada linha do texto antigo vira um parágrafo (bloco "normal") separado, para
 * preservar as quebras de linha que hoje dependem de whitespace-pre-line no
 * front-end. Nenhuma formatação é inventada: nada de negrito, itálico ou lista
 * é adicionado a respostas que não tinham marcação nenhuma.
 *
 * Uso: node scripts/migrar-faq-resposta-portable-text.mjs [--aplicar]
 * Sem --aplicar, só mostra o que seria alterado (dry-run).
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

if (!process.env.SANITY_WRITE_TOKEN && existsSync('.env.local')) {
  for (const linha of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = linha.match(/^\s*SANITY_WRITE_TOKEN\s*=\s*(.+?)\s*$/)
    if (m) process.env.SANITY_WRITE_TOKEN = m[1].replace(/^["']|["']$/g, '')
  }
}
const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('❌ SANITY_WRITE_TOKEN ausente'); process.exit(1) }

const aplicar = process.argv.includes('--aplicar')

const client = createClient({
  projectId: 'q8ibxbuz', dataset: 'production',
  apiVersion: '2024-01-01', token, useCdn: false,
})

function paraPortableText(textoSimples) {
  return textoSimples
    .split('\n')
    .map(linha => linha.trim())
    .filter(Boolean)
    .map(linha => ({
      _type: 'block',
      _key:  randomUUID().slice(0, 12),
      style: 'normal',
      markDefs: [],
      children: [
        { _type: 'span', _key: randomUUID().slice(0, 12), text: linha, marks: [] },
      ],
    }))
}

const docs = await client.fetch(
  '*[_type=="post" && count(body[_type=="faqItem" && string::length(resposta) > 0]) > 0]{_id, title, body}'
)

if (docs.length === 0) {
  console.log('Nenhum artigo com resposta de FAQ em texto simples. Nada a fazer.')
  process.exit(0)
}

for (const doc of docs) {
  const alterados = doc.body.filter(b => b._type === 'faqItem' && typeof b.resposta === 'string')
  if (alterados.length === 0) continue

  console.log(`\n📄 ${doc.title}  (${doc._id})`)
  for (const b of alterados) {
    console.log(`   "${b.pergunta}"`)
    console.log(`     antes: ${JSON.stringify(b.resposta)}`)
  }

  if (aplicar) {
    const novoBody = doc.body.map(b =>
      b._type === 'faqItem' && typeof b.resposta === 'string'
        ? { ...b, resposta: paraPortableText(b.resposta) }
        : b
    )
    await client.patch(doc._id).set({ body: novoBody }).commit()
    console.log('   ✅ atualizado')
  }
}

if (!aplicar) console.log('\n(simulação — rode com --aplicar para gravar)')
