/**
 * Falha o build se algum artigo do blog apontar, em `exameRelacionado` ou
 * `especialidadeRelacionada`, para um id que não existe mais em src/lib/data.ts.
 *
 * Exames e especialidades não são documentos no Sanity — são campos de texto
 * validados contra a lista de EXAMES/ESPECIALIDADES no momento da edição. Mas
 * um id pode deixar de existir depois (alguém remove ou renomeia um exame em
 * lib/data.ts) sem que o artigo antigo seja reeditado. Sem esta checagem, o
 * sintoma só aparece como link quebrado no site.
 *
 * Lê src/lib/data.ts diretamente (fonte única de verdade) usando o compilador
 * TypeScript já presente no projeto como devDependency, sem precisar de
 * ts-node/tsx nem duplicar a lista de ids aqui.
 *
 * Uso: node scripts/validar-referencias-blog.mjs
 * Rodado automaticamente antes de `npm run build` (ver "prebuild" no package.json).
 */
import ts from 'typescript'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import { createClient } from '@sanity/client'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

async function carregarCatalogo() {
  const caminho = path.join(__dirname, '..', 'src', 'lib', 'data.ts')
  const fonte = readFileSync(caminho, 'utf8')
  const { outputText } = ts.transpileModule(fonte, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  })
  const modulo = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
  return { EXAMES: modulo.EXAMES, ESPECIALIDADES: modulo.ESPECIALIDADES }
}

const client = createClient({
  projectId: 'q8ibxbuz', dataset: 'production',
  apiVersion: '2024-01-01', useCdn: true,
})

let posts
try {
  posts = await client.fetch(
    `*[_type == "post"]{_id, title, exameRelacionado, especialidadeRelacionada}`
  )
} catch (erro) {
  // Mesmo comportamento do sitemap: indisponibilidade do Sanity não deve
  // derrubar o build. A checagem roda de novo no próximo build.
  console.warn('⚠️  Não foi possível consultar o Sanity para validar referências do blog. Pulando checagem.', erro?.message ?? erro)
  process.exit(0)
}

const { EXAMES, ESPECIALIDADES } = await carregarCatalogo()
const idsExames = new Set(EXAMES.map(e => e.id))
const idsEspecialidades = new Set(ESPECIALIDADES.map(e => e.slug))

const problemas = []
for (const post of posts) {
  if (post.exameRelacionado && !idsExames.has(post.exameRelacionado)) {
    problemas.push(`"${post.title}" (${post._id}): exameRelacionado="${post.exameRelacionado}" não existe em EXAMES`)
  }
  if (post.especialidadeRelacionada && !idsEspecialidades.has(post.especialidadeRelacionada)) {
    problemas.push(`"${post.title}" (${post._id}): especialidadeRelacionada="${post.especialidadeRelacionada}" não existe em ESPECIALIDADES`)
  }
}

if (problemas.length > 0) {
  console.error('❌ Artigos do blog referenciam exames/especialidades que não existem mais em src/lib/data.ts:\n')
  for (const p of problemas) console.error(`   - ${p}`)
  console.error('\nCorrija o artigo no Sanity Studio ou restaure o id em src/lib/data.ts antes de publicar o build.')
  process.exit(1)
}

console.log(`✅ Referências de exame/especialidade dos artigos do blog conferem com src/lib/data.ts (${posts.length} artigo(s) verificado(s)).`)
