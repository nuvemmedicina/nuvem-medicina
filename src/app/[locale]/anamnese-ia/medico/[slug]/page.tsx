import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnamneseForm } from '@/components/anamnese-ia/AnamneseForm'
import { MEDICOS_SITE } from '@/lib/anamnese-ia/prefill'

/**
 * Link individual: cada profissional responde só a própria parte (Parte B).
 * `/anamnese-ia/medico/novo` serve para quem ainda não está no site.
 */
export const metadata: Metadata = {
  title:  'Anamnese da IA de atendimento',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

const SLUGS = [...MEDICOS_SITE.map(m => m.slug), 'novo']

export function generateStaticParams() {
  return SLUGS.map(slug => ({ slug }))
}

export default async function AnamneseMedicoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!SLUGS.includes(slug)) notFound()
  return <AnamneseForm modo="medico" slug={slug === 'novo' ? undefined : slug} />
}
