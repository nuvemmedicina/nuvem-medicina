import type { Metadata } from 'next'
import { Painel } from '@/components/anamnese-ia/Painel'

/**
 * Painel da gestão: fotos, autorizações de uso de imagem e aprovações das
 * páginas dos médicos. Protegido pelo código de cada gestora (?c=...), gerado
 * por scripts/anamnese-ia/links.mjs. Noindex, fora do sitemap e sem medição.
 */
export const metadata: Metadata = {
  title:  'Painel das fotos e páginas',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function PainelPage() {
  return <Painel />
}
