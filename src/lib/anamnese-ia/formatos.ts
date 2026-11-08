/**
 * Ajustes de formato de campos da anamnese (cliente e servidor).
 */

/**
 * Instagram: aceita "@perfil", "perfil" ou o link do perfil e devolve
 * "@perfil". Texto vazio continua vazio.
 */
export function normalizarInstagram(v: string): string {
  let s = String(v ?? '').trim()
  if (!s) return ''
  s = s.replace(/^https?:\/\//i, '').replace(/^(www\.)?(instagram\.com|instagr\.am)\//i, '')
  s = s.split(/[/?#\s]/)[0].replace(/^@+/, '')
  return s ? `@${s.toLowerCase()}` : ''
}

/** Regras do Instagram: até 30 letras, números, ponto e sublinhado. */
export function erroInstagram(v: string): string | null {
  const s = normalizarInstagram(v)
  if (!s) return null
  const nome = s.slice(1)
  if (!/^[a-z0-9._]{1,30}$/.test(nome)) return 'Use só letras, números, ponto e sublinhado (até 30).'
  if (nome.startsWith('.') || nome.endsWith('.') || nome.includes('..')) return 'O perfil não pode começar nem terminar com ponto.'
  return null
}

/** Link do perfil, para a página do site. */
export function linkInstagram(v: string) {
  const s = normalizarInstagram(v)
  return s ? `https://www.instagram.com/${s.slice(1)}/` : ''
}
