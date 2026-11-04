import type { Metadata } from 'next'
import { AnamneseForm } from '@/components/anamnese-ia/AnamneseForm'

/**
 * Só a Parte A (dados da clínica), para a gestão responder pelo navegador.
 * Mesmo formulário de /anamnese-ia; o JSON exportado aqui é importado lá.
 */
export const metadata: Metadata = {
  title:  'Anamnese da IA · dados da clínica',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default function AnamneseClinicaPage() {
  return <AnamneseForm modo="clinica" />
}
