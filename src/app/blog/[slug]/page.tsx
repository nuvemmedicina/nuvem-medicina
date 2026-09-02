import type { Metadata } from 'next'
import Link              from 'next/link'
import Image             from 'next/image'
import { notFound }      from 'next/navigation'
import { ArrowLeft }     from 'lucide-react'
import { PortableText }  from '@portabletext/react'
import { SectionWrapper }  from '@/components/ui/SectionWrapper'
import { Breadcrumb }      from '@/components/ui/Breadcrumb'
import { JsonLd }          from '@/components/ui/JsonLd'
import { CalloutBlock }         from '@/components/blog/CalloutBlock'
import { FaqItem }              from '@/components/blog/FaqItem'
import { DownloadBlock }        from '@/components/blog/DownloadBlock'
import { StatBlock }            from '@/components/blog/StatBlock'
import { TableBlock }           from '@/components/blog/TableBlock'
import { YouTubeBlock }         from '@/components/blog/YouTubeBlock'
import { ReferencesAccordion }  from '@/components/blog/ReferencesAccordion'
import { BlocoRespostaDireta }  from '@/components/blog/BlocoRespostaDireta'
import { CartaoAutor }          from '@/components/blog/CartaoAutor'
import { ChamadaExame }         from '@/components/blog/ChamadaExame'
import { getPostBySlug, getAllPosts } from '@/lib/sanity/queries'
import { urlFor }          from '@/lib/sanity/image'
import { postSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { SITE_URL } from '@/lib/site'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  const ogImage = post.coverImage
    ? urlFor(post.coverImage).width(1200).height(630).url()
    : undefined
  // respostaDireta é escrita para responder a pergunta de busca de forma direta,
  // então é a melhor description quando existe; excerpt continua sendo o recuo
  // para os artigos que ainda não a têm preenchida.
  const description = post.respostaDireta ?? post.excerpt
  return {
    title:       post.title,
    description,
    alternates:  { canonical: `/blog/${slug}` },
    openGraph: {
      title:       post.title,
      description,
      type:        'article',
      siteName:    'NU.V.E.M Medicina',
      locale:      'pt_BR',
      publishedTime: post.publishedAt,
      modifiedTime:  post.dataRevisao ?? post.publishedAt,
      ...(ogImage && {
        images: [{ url: ogImage, width: 1200, height: 630, alt: post.title }],
      }),
    },
    twitter: {
      card:        'summary_large_image',
      title:       post.title,
      description,
      ...(ogImage && { images: [ogImage] }),
    },
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

/** Extrai os blocos faqItem do corpo do artigo, na ordem em que aparecem no texto. */
// resposta pode ser string (respostas antigas) ou Portable Text (respostas novas, formatadas).
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function extrairFaqs(body: any[] = []): { pergunta: string; resposta: string | any[] }[] {
  return body
    .filter(b => b._type === 'faqItem' && b.pergunta && b.resposta)
    .map(b => ({ pergunta: b.pergunta, resposta: b.resposta }))
}

// Fábrica em vez de objeto estático: o bloco faqItem precisa do título do
// artigo para o evento `abriu_faq` do dataLayer (ver src/components/blog/FaqItem.tsx).
const buildPtComponents = (artigoTitle: string) => ({
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <Image
          src={urlFor(value).width(1200).url()}
          alt={value.alt ?? ''}
          width={1200}
          height={900}
          className="w-full h-auto rounded-xl"
        />
        {value.caption && <figcaption className="text-center text-[0.78rem] text-steel/50 mt-2">{value.caption}</figcaption>}
      </figure>
    ),
    calloutBlock:  ({ value }: any) => <CalloutBlock value={value} />,
    faqItem:       ({ value }: any) => <FaqItem value={value} artigoTitle={artigoTitle} />,
    downloadBlock: ({ value }: any) => <DownloadBlock value={value} />,
    statBlock:     ({ value }: any) => <StatBlock value={value} />,
    tableBlock:    ({ value }: any) => <TableBlock value={value} />,
    youtubeBlock:  ({ value }: any) => <YouTubeBlock value={value} />,
    spotifyBlock:  ({ value }: any) => value?.episodeId ? (
      <figure className="my-8">
        <iframe
          src={`https://open.spotify.com/embed/episode/${value.episodeId}?utm_source=generator`}
          width="100%"
          height="352"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: '12px' }}
        />
        {value.title && (
          <figcaption className="text-center text-[0.78rem] text-steel/50 mt-2">
            🎙️ {value.title}
          </figcaption>
        )}
      </figure>
    ) : null,
  },
  block: {
    blockquote: ({ children }: any) => (
      <blockquote className="not-italic border-l-4 border-teal/50 rounded-r-xl py-4 px-6 my-8" style={{ background: 'rgba(0,70,95,0.05)' }}>
        <p className="italic text-steel/75 font-light leading-relaxed text-[1rem] before:content-['“'] after:content-['”'] before:text-teal/40 after:text-teal/40 before:mr-0.5 after:ml-0.5 m-0">
          {children}
        </p>
      </blockquote>
    ),
  },
})

function pessoaParaSchema(autor?: NonNullable<Awaited<ReturnType<typeof getPostBySlug>>>['author']) {
  if (!autor) return undefined
  return {
    name:       autor.name,
    slug:       autor.slug?.current,
    crm:        autor.crm,
    rqe:        autor.rqe,
    titulacao:  autor.titulacao,
    image:      autor.image ? urlFor(autor.image).width(400).height(400).url() : undefined,
  }
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  const faqs = extrairFaqs(post.body)
  const coverImageUrl = post.coverImage ? urlFor(post.coverImage).width(1200).height(675).url() : undefined

  return (
    <>
      <JsonLd data={[
        postSchema({
          title:         post.title,
          slug:          post.slug.current,
          description:   post.respostaDireta ?? post.excerpt,
          datePublished: post.publishedAt,
          dataRevisao:   post.dataRevisao,
          image:         coverImageUrl,
          author:        pessoaParaSchema(post.author),
          revisadoPor:   pessoaParaSchema(post.revisadoPor),
          citations:     post.references?.map(r => r.citation),
        }),
        ...(faqs.length >= 2 ? [faqSchema(faqs)] : []),
        breadcrumbSchema([
          { name: 'Home', url: SITE_URL },
          { name: 'Blog', url: `${SITE_URL}/blog` },
          { name: post.title, url: `${SITE_URL}/blog/${post.slug.current}` },
        ]),
      ]} />

      {/* Hero */}
      <div className="relative pt-32 pb-16 overflow-hidden" style={{ background: 'linear-gradient(135deg, #002535, #00465F)' }}>
        <div className="absolute inset-0 dark-grid-bg pointer-events-none opacity-60" />
        <div className="relative z-10 max-w-3xl mx-auto px-6">
          <Link href="/blog" className="inline-flex items-center gap-2 text-[0.78rem] text-white/55 hover:text-white mb-8 transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" /> Voltar ao blog
          </Link>
          {post.categories && post.categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-4">
              {post.categories.map(cat => (
                <span key={cat.title} className="text-[0.62rem] font-bold tracking-[.1em] uppercase px-2.5 py-1 rounded-full bg-teal/20 text-teal-light border border-teal/30">
                  {cat.title}
                </span>
              ))}
            </div>
          )}
          <h1 className="font-serif font-medium text-white text-[1.95rem] md:text-[2.5rem] leading-tight mb-4">{post.title}</h1>

          {post.respostaDireta && (
            <div className="mb-6">
              <BlocoRespostaDireta pergunta={post.perguntaPrincipal} resposta={post.respostaDireta} />
            </div>
          )}

          {post.excerpt && <p className="text-[0.97rem] text-white/65 leading-relaxed mb-6">{post.excerpt}</p>}
          <div className="flex items-center gap-4 text-[0.78rem] text-white/50">
            {post.author && <span>Por {post.author.name}</span>}
            {post.publishedAt && <><span>·</span><span>{formatDate(post.publishedAt)}</span></>}
            {post.readingTime && <><span>·</span><span>{post.readingTime} min de leitura</span></>}
          </div>
        </div>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div className="max-w-3xl mx-auto px-6 -mt-8 relative z-10">
          <div className="relative w-full rounded-2xl overflow-hidden shadow-xl" style={{ aspectRatio: '16/9' }}>
            <Image src={coverImageUrl!} alt={post.title} fill className="object-cover" />
          </div>
          {post.coverImage.credit && (
            <p className="text-[0.7rem] text-steel/40 mt-1.5 text-right">
              Imagem: {post.coverImage.credit}
            </p>
          )}
        </div>
      )}

      {/* Body */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <Breadcrumb crumbs={[{ label: 'Blog', href: '/blog' }, { label: post.title }]} />

          {/* Títulos em Cormorant 500 — o peso 600 não é carregado pela fonte e o
              navegador simulava um negrito artificial, pesado demais ao lado do
              corpo em Poppins Light. */}
          <div className="prose prose-lg prose-headings:font-serif prose-headings:font-medium prose-headings:text-steel prose-headings:leading-snug prose-h2:text-[1.65rem] md:prose-h2:text-[1.85rem] prose-h2:mt-11 prose-h2:mb-4 prose-h3:text-[1.4rem] md:prose-h3:text-[1.5rem] prose-h3:mt-9 prose-h3:mb-3 prose-h4:text-[1.3rem] md:prose-h4:text-[1.35rem] prose-p:text-steel/70 prose-p:leading-relaxed prose-a:text-teal prose-strong:text-steel prose-li:text-steel/70 max-w-none">
            {post.body && <PortableText value={post.body} components={buildPtComponents(post.title)} />}
          </div>

          {/* Referências bibliográficas */}
          {post.references && post.references.length > 0 && (
            <ReferencesAccordion references={post.references} />
          )}

          {/* Author card */}
          {post.author && (
            <CartaoAutor autor={post.author} revisadoPor={post.revisadoPor} dataRevisao={post.dataRevisao} />
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper dark grid>
        <ChamadaExame
          exameRelacionado={post.exameRelacionado}
          especialidadeRelacionada={post.especialidadeRelacionada}
          artigoTitle={post.title}
          fallbackTitle="Gostou do conteúdo?"
          fallbackDesc="Agende uma consulta com nossa equipe especializada e cuide da sua saúde digestiva."
        />
      </SectionWrapper>
    </>
  )
}
