/**
 * Carrega .env.local (sem dependências) para os scripts da anamnese.
 * Não sobrescreve variáveis já definidas no ambiente.
 */
import { existsSync, readFileSync } from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const ROOT = path.resolve(fileURLToPath(new URL('../../', import.meta.url)))
const arq = path.join(ROOT, '.env.local')
if (existsSync(arq)) {
  for (const linha of readFileSync(arq, 'utf8').split(/\r?\n/)) {
    const m = linha.match(/^\s*([A-Z0-9_]+)\s*=\s*(.*?)\s*$/)
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '')
  }
}
