import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AnamneseForm } from '@/components/anamnese-ia/AnamneseForm'
import { MEDICOS_SITE } from '@/lib/anamnese-ia/prefill'
import { SLUG_NOVO } from '@/lib/anamnese-ia/acesso'

/**
 * Link individual: cada profissional responde só a própria parte (Parte B).
 * Profissional que ainda não está no site: /anamnese-ia/medico/novo-<nome>-<id>,
 * com link e código próprios gerados por scripts/anamnese-ia/links.mjs --novo.
 * /anamnese-ia/medico/novo continua abrindo um rascunho só no navegador.
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
  if (!SLUGS.includes(slug) && !SLUG_NOVO.test(slug)) notFound()
  return <AnamneseForm modo="medico" slug={slug === 'novo' ? undefined : slug} />
}
