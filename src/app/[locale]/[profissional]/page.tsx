import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { PaginaProfissional } from '@/components/profissionais/PaginaProfissional'
import { PaginaAntigaVera, metadataAntigaVera } from '@/components/profissionais/antigas/PaginaAntigaVera'
import { PaginaAntigaEliane, metadataAntigaEliane } from '@/components/profissionais/antigas/PaginaAntigaEliane'
import { profissionalPorSlug } from '@/lib/profissionais'
import { especialidadeDeExibicao, nomeCompleto } from '@/lib/profissionais-texto'
import { modoDaPagina, publicacaoDe, slugsComRota } from '@/lib/profissionais-publicacao'

/**
 * Páginas dos profissionais (/dra-vera-angelo, /dra-raissa-dalat...).
 *
 * Só geramos as rotas que este ambiente pode mostrar (ver
 * src/lib/profissionais-publicacao.ts): em produção, as aprovadas e as duas
 * páginas antigas; na prévia, todas. Qualquer outro endereço dá 404.
 * Só em português: en/es voltam para cá pelo middleware.
 */
export const dynamicParams = false

type Props = { params: Promise<{ locale: string; profissional: string }> }

export async function generateStaticParams({ params }: { params: { locale: string } }) {
  if (params.locale !== 'pt-BR') return []
  return (await slugsComRota()).map(profissional => ({ profissional }))
}

const ANTIGAS = {
  'dra-vera-angelo':    { Pagina: PaginaAntigaVera,   metadata: metadataAntigaVera },
  'dra-eliane-basques': { Pagina: PaginaAntigaEliane, metadata: metadataAntigaEliane },
} as const

async function carregar(slug: string) {
  const p = profissionalPorSlug(slug)
  if (!p) notFound()
  const modo = await modoDaPagina(p)
  if (modo === 'nenhuma') notFound()
  return { p, modo }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { profissional } = await params
  const { p, modo } = await carregar(profissional)
  if (modo === 'antiga') return ANTIGAS[p.slug as keyof typeof ANTIGAS].metadata

  const { foto } = await publicacaoDe(p)
  const esp = especialidadeDeExibicao(p)
  const titulo = `${nomeCompleto(p)} · ${esp.rotulo}`
  const servicos = p.oQueFazNaNuvem.map(s => s.nome.toLowerCase()).join(', ')
  const descricao = `${nomeCompleto(p)}, ${esp.descricao.charAt(0).toLowerCase()}${esp.descricao.slice(1)}. Na NU.V.E.M Medicina, em Belo Horizonte: ${servicos}.`

  return {
    title: titulo,
    description: descricao,
    alternates: { canonical: `/${p.slug}` },
    ...(modo === 'previa' && { robots: { index: false, follow: false } }),
    openGraph: {
      title: titulo,
      description: descricao,
      ...(foto && { images: [{ url: foto.src, width: foto.largura, height: foto.altura, alt: nomeCompleto(p) }] }),
    },
    twitter: { card: foto ? 'summary_large_image' : 'summary', title: titulo, ...(foto && { images: [foto.src] }) },
  }
}

export default async function PaginaDoProfissional({ params }: Props) {
  const { profissional } = await params
  const { p, modo } = await carregar(profissional)

  if (modo === 'antiga') {
    const { Pagina } = ANTIGAS[p.slug as keyof typeof ANTIGAS]
    return <Pagina />
  }

  const { foto } = await publicacaoDe(p)
  return <PaginaProfissional p={p} foto={foto} previa={modo === 'previa'} />
}
