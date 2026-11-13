/**
 * Utilidades de servidor das rotas /api/anamnese-ia (não importar no cliente).
 */
import { createClient } from 'next-sanity'
import type { NextRequest } from 'next/server'

/** Cliente do Sanity com token de escrita (documentos privados "anamnese-ia.*"). */
export function sanity() {
  const token = process.env.SANITY_WRITE_TOKEN
  if (!token) return null
  return createClient({ projectId: 'q8ibxbuz', dataset: 'production', apiVersion: '2024-01-01', useCdn: false, token })
}
export type Sanity = NonNullable<ReturnType<typeof sanity>>

/**
 * Parte inicial do IP, para rastreabilidade sem guardar o endereço completo:
 * IPv4 com os 2 primeiros números (189.6.x.x) e IPv6 com os 2 primeiros grupos.
 */
export function ipParcial(req: NextRequest): string {
  const ip = (req.headers.get('x-forwarded-for') ?? '').split(',')[0].trim() || req.headers.get('x-real-ip') || ''
  if (!ip) return 'desconhecido'
  const v4 = ip.replace(/^::ffff:/, '').match(/^(\d{1,3})\.(\d{1,3})\.\d{1,3}\.\d{1,3}$/)
  if (v4) return `${v4[1]}.${v4[2]}.x.x`
  if (ip.includes(':')) return `${ip.split(':').slice(0, 2).join(':')}:x`
  return 'desconhecido'
}

/** Identificador curto e difícil de adivinhar (para IDs de envio e registros). */
export function idAleatorio(bytes = 9) {
  const b = new Uint8Array(bytes)
  crypto.getRandomValues(b)
  return Buffer.from(b).toString('base64url').toLowerCase().replace(/[^a-z0-9]/g, '').slice(0, bytes + 3)
}
