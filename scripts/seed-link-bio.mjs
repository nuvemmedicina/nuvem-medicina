/**
 * Cria (ou substitui) o documento único "linkBio" no Sanity com o conteúdo
 * inicial que também serve de fallback em src/lib/linkBio.ts (DEFAULT_LINK_BIO).
 * Mantenha os dois em sincronia se um dia mudar um dos dois.
 *
 * Idempotente: usa createOrReplace com _id fixo "linkBio", então rodar de novo
 * não duplica o documento — apenas sobrescreve com este conteúdo. Não rode de
 * novo depois que alguém já editou o documento no Studio, ou a edição se perde.
 *
 * Uso: adicione ao .env.local a linha
 *   SANITY_WRITE_TOKEN=<token com permissao de Editor>
 * e rode:
 *   node scripts/seed-link-bio.mjs
 *
 * O token nunca é gravado neste arquivo.
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import ts from 'typescript'

const __dirname = path.dirname(fileURLToPath(import.meta.url))

if (!process.env.SANITY_WRITE_TOKEN && existsSync('.env.local')) {
  for (const linha of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = linha.match(/^\s*SANITY_WRITE_TOKEN\s*=\s*(.+?)\s*$/)
    if (m) process.env.SANITY_WRITE_TOKEN = m[1].replace(/^["']|["']$/g, '')
  }
}

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('❌ Defina SANITY_WRITE_TOKEN antes de rodar. Veja o cabeçalho deste arquivo.')
  process.exit(1)
}

// Lê src/lib/data.ts diretamente (fonte única de verdade), mesma técnica de
// scripts/validar-referencias-blog.mjs: usa o compilador TypeScript já
// presente no projeto, sem precisar de ts-node/tsx.
async function carregarCatalogo() {
  const caminho = path.join(__dirname, '..', 'src', 'lib', 'data.ts')
  const fonte = readFileSync(caminho, 'utf8')
  const { outputText } = ts.transpileModule(fonte, {
    compilerOptions: { module: ts.ModuleKind.ES2022, target: ts.ScriptTarget.ES2022 },
  })
  const modulo = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString('base64')}`)
  return { EXAMES: modulo.EXAMES, CONTATO: modulo.CONTATO }
}

const client = createClient({
  projectId:  'q8ibxbuz',
  dataset:    'production',
  apiVersion: '2024-01-01',
  token,
  useCdn:     false,
})

async function main() {
  const { EXAMES, CONTATO } = await carregarCatalogo()

  const doc = {
    _id:   'linkBio',
    _type: 'linkBio',
    posicionamento: 'Texto provisório — atualizar no Studio.',
    chamadaPrincipal: {
      rotulo:  'Agendar consulta',
      destino: { tipo: 'interno', rotaInterna: '/agendar' },
    },
    destaques: [],
    blocos: [
      {
        _key: 'bloco-convenios', _type: 'bloco', titulo: 'Convênios',
        itens: [
          { _key: 'item-convenios', _type: 'itemBloco', rotulo: 'Convênios atendidos', destino: { _type: 'linkDestino', tipo: 'interno', rotaInterna: '/convenios-medicos' } },
        ],
      },
      {
        _key: 'bloco-exames', _type: 'bloco', titulo: 'Exames diagnósticos',
        itens: EXAMES.map(exame => ({
          _key:    `item-exame-${exame.id}`,
          _type:   'itemBloco',
          rotulo:  exame.title,
          destino: { _type: 'linkDestino', tipo: 'interno', rotaInterna: `/exames/${exame.id}` },
        })),
      },
      {
        _key: 'bloco-preparos', _type: 'bloco', titulo: 'Preparos',
        itens: [
          { _key: 'item-preparos', _type: 'itemBloco', rotulo: 'Preparos para exames', destino: { _type: 'linkDestino', tipo: 'interno', rotaInterna: '/exames/preparos' } },
        ],
      },
      {
        _key: 'bloco-blog', _type: 'bloco', titulo: 'Blog',
        itens: [
          { _key: 'item-blog', _type: 'itemBloco', rotulo: 'Blog da NU.V.E.M', destino: { _type: 'linkDestino', tipo: 'interno', rotaInterna: '/blog' } },
        ],
      },
      {
        _key: 'bloco-contato', _type: 'bloco', titulo: 'Fale com a gente',
        itens: [
          { _key: 'item-whatsapp',    _type: 'itemBloco', rotulo: 'WhatsApp',    destino: { _type: 'linkDestino', tipo: 'whatsapp' } },
          { _key: 'item-telefone',    _type: 'itemBloco', rotulo: 'Telefone',    destino: { _type: 'linkDestino', tipo: 'telefone' } },
          { _key: 'item-como-chegar', _type: 'itemBloco', rotulo: 'Como chegar', destino: { _type: 'linkDestino', tipo: 'externo', linkExterno: CONTATO.maps } },
        ],
      },
    ],
    mensagemWhatsapp: 'Olá! Vim pelo link da bio e gostaria de agendar uma consulta ou exame na NU.V.E.M Medicina.',
    avisoTemporario: { texto: '', ativo: false },
  }

  await client.createOrReplace(doc)
  console.log('✅ Documento "linkBio" criado/atualizado no Sanity.')
}

main().catch(err => {
  console.error('❌ Falha ao gravar o documento:', err.message)
  process.exit(1)
})
