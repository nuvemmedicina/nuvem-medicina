import type { Metadata } from 'next'
import { AnamneseForm } from '@/components/anamnese-ia/AnamneseForm'

/**
 * Formulário interno para a anamnese da IA de atendimento (Dr.IAgenda).
 * Fora do sitemap, sem link no menu e com noindex: é uma ferramenta de
 * trabalho da gestão, não uma página para pacientes.
 */
export const metadata: Metadata = {
  title:  'Anamnese da IA de atendimento',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function AnamneseIAPage() {
  return <AnamneseForm modo="completo" />
}
