/**
 * Gera os links das páginas /anamnese-ia com o código de acesso (?c=...).
 *
 *   node --import ./scripts/anamnese-ia/register.mjs scripts/anamnese-ia/links.mjs
 *   ... links.mjs --novo "Dra. Fulana de Tal" [--novo "Dr. Outro"]
 *
 * --novo cria o link de um profissional que ainda não está no site, com
 * código só dele. Guarde a lista: o identificador do link é aleatório e a
 * lista de novos fica em docs/anamnese-ia/respostas/novos.json.
 *
 * Os códigos são segredos: o arquivo vai para docs/anamnese-ia/respostas/
 * (fora do git, porque o repositório é público). Precisa do mesmo
 * ANAMNESE_IA_SEGREDO / SANITY_WRITE_TOKEN (e ANAMNESE_IA_GERACOES, se houver)
 * configurado na Vercel.
 */
import './env.mjs'
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs'
import { randomBytes } from 'node:crypto'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { codigoPara, GESTORES } from '@/lib/anamnese-ia/acesso'
import { MEDICOS_SITE } from '@/lib/anamnese-ia/prefill'

const ROOT = path.resolve(fileURLToPath(new URL('../../', import.meta.url)))
const BASE = 'https://www.nuvemmedicina.com.br/anamnese-ia'
const link = (caminho, escopo) => `${BASE}${caminho}?c=${codigoPara(escopo)}`

const dir = path.join(ROOT, 'docs', 'anamnese-ia', 'respostas')
mkdirSync(dir, { recursive: true })

// Profissionais novos: um link por pessoa
const arqNovos = path.join(dir, 'novos.json')
const novos = existsSync(arqNovos) ? JSON.parse(readFileSync(arqNovos, 'utf8')) : []
const slugify = s => s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
  .replace(/^(dra?\.?\s+)/, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '').slice(0, 30)
process.argv.forEach((a, i) => {
  if (a !== '--novo') return
  const nome = String(process.argv[i + 1] ?? '').trim()
  if (!nome) return
  const slug = `novo-${slugify(nome) || 'profissional'}-${randomBytes(3).toString('hex').slice(0, 4)}`
  novos.push({ nome, slug, criadoEm: new Date().toISOString() })
})
writeFileSync(arqNovos, JSON.stringify(novos, null, 2))

const linhas = [
  '# Links da anamnese da IA (com código de acesso)',
  '',
  'Não publique estes links: quem tem o link pode alterar as respostas daquela página.',
  'Códigos da versão 2 (32 caracteres). Os links antigos, de 10 caracteres, não funcionam mais.',
  '',
  '## Gestão (Parte A · dados da clínica)',
  '',
  `- ${link('/clinica', 'clinica')}`,
  '',
  '## Validação dos preparos (equipe médica)',
  '',
  `- ${link('/validacao', 'validacao')}`,
  '',
  '## Profissionais (Parte B)',
  '',
  ...MEDICOS_SITE.map(m => `- ${m.nome}: ${link(`/medico/${m.slug}`, `medico-${m.slug}`)}`),
  ...novos.map(n => `- ${n.nome} (novo): ${link(`/medico/${n.slug}`, `medico-${n.slug}`)}`),
  '',
  'Para um profissional que ainda não está no site, rode de novo com --novo "Nome".',
  '',
  '## Formulário completo (consolidação)',
  '',
  `- ${link('', 'completo')}`,
  '',
  '## Painel das fotos e autorizações (um link por pessoa)',
  '',
  ...Object.entries(GESTORES).map(([escopo, nome]) => `- ${nome}: ${link('/painel', escopo)}`),
  '',
]

writeFileSync(path.join(dir, 'links.md'), linhas.join('\n'))
console.log(linhas.join('\n'))
console.log(`\nSalvo em ${path.relative(ROOT, path.join(dir, 'links.md'))} (fora do git).`)
