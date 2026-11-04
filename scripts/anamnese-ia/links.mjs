/**
 * Gera os links das páginas /anamnese-ia com o código de acesso (?c=...).
 *
 *   node --import ./scripts/anamnese-ia/register.mjs scripts/anamnese-ia/links.mjs
 *
 * Os códigos são segredos: o arquivo vai para docs/anamnese-ia/respostas/
 * (fora do git, porque o repositório é público). Precisa do mesmo
 * ANAMNESE_IA_SEGREDO / SANITY_WRITE_TOKEN configurado na Vercel.
 */
import './env.mjs'
import { mkdirSync, writeFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { codigoPara } from '@/lib/anamnese-ia/acesso'
import { MEDICOS_SITE } from '@/lib/anamnese-ia/prefill'

const ROOT = path.resolve(fileURLToPath(new URL('../../', import.meta.url)))
const BASE = 'https://www.nuvemmedicina.com.br/anamnese-ia'
const link = (caminho, escopo) => `${BASE}${caminho}?c=${codigoPara(escopo)}`

const linhas = [
  '# Links da anamnese da IA (com código de acesso)',
  '',
  'Não publique estes links: quem tem o link pode alterar as respostas daquela página.',
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
  `- Profissional que ainda não está no site: ${link('/medico/novo', 'medico-novo')}`,
  '',
  '## Formulário completo (consolidação)',
  '',
  `- ${link('', 'completo')}`,
  '',
]

const dir = path.join(ROOT, 'docs', 'anamnese-ia', 'respostas')
mkdirSync(dir, { recursive: true })
writeFileSync(path.join(dir, 'links.md'), linhas.join('\n'))
console.log(linhas.join('\n'))
console.log(`\nSalvo em ${path.relative(ROOT, path.join(dir, 'links.md'))} (fora do git).`)
