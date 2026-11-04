import type { Metadata } from 'next'
import { ValidacaoForm } from '@/components/anamnese-ia/ValidacaoForm'

/**
 * Validação dos preparos pela equipe médica (itens [VALIDAR COM A EQUIPE
 * MÉDICA] de src/lib/anamnese-ia/preparos.ts). Ferramenta interna: noindex,
 * fora do sitemap e do menu.
 */
export const metadata: Metadata = {
  title:  'Validação dos preparos de exames',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function ValidacaoPage() {
  return <ValidacaoForm />
}
