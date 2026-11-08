import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { AprovacaoPagina } from '@/components/anamnese-ia/AprovacaoPagina'
import { slugValido } from '@/lib/anamnese-ia/acesso'

/**
 * Aprovação final da página do profissional no site, pelo próprio
 * profissional. Usa o mesmo link (e código) da anamnese dele, com /aprovacao
 * no fim. Ferramenta interna: noindex, fora do sitemap e sem medição.
 */
export const metadata: Metadata = {
  title:  'Aprovação da sua página',
  robots: { index: false, follow: false, googleBot: { index: false, follow: false } },
}

export default async function AprovacaoPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  if (!slugValido(slug)) notFound()
  return <AprovacaoPagina slug={slug} />
}
