/**
 * Permite que os scripts em Node importem os módulos TypeScript de src/
 * (Node 24 remove os tipos sozinho): resolve o alias "@/" e completa a
 * extensão ".ts" nos imports relativos sem extensão.
 *
 * Uso: node --import ./scripts/anamnese-ia/register.mjs <script>
 */
import { existsSync } from 'node:fs'
import { fileURLToPath, pathToFileURL } from 'node:url'
import path from 'node:path'

const SRC = path.resolve(fileURLToPath(new URL('../../src/', import.meta.url)))

function comExtensao(abs) {
  for (const ext of ['', '.ts', '.tsx', '/index.ts']) {
    if (existsSync(abs + ext) && !(ext === '' && !path.extname(abs))) return abs + ext
  }
  return null
}

export async function resolve(specifier, context, next) {
  if (specifier.startsWith('@/')) {
    const f = comExtensao(path.join(SRC, specifier.slice(2)))
    if (f) return next(pathToFileURL(f).href, context)
  }
  if ((specifier.startsWith('./') || specifier.startsWith('../')) && context.parentURL?.startsWith('file:')) {
    const abs = path.resolve(path.dirname(fileURLToPath(context.parentURL)), specifier)
    if (!path.extname(abs)) {
      const f = comExtensao(abs)
      if (f) return next(pathToFileURL(f).href, context)
    }
  }
  return next(specifier, context)
}
