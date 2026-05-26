import type { Metadata } from 'next'
import Link              from 'next/link'
import Image             from 'next/image'
import { notFound }      from 'next/navigation'
import { ArrowLeft }     from 'lucide-react'
import { PortableText }  from '@portabletext/react'
import { SectionWrapper }  from '@/components/ui/SectionWrapper'
import { CtaBanner }       from '@/components/ui/CtaBanner'
import { CalloutBlock }    from '@/components/blog/CalloutBlock'
import { FaqItem }         from '@/components/blog/FaqItem'
import { DownloadBlock }   from '@/components/blog/DownloadBlock'
import { StatBlock }       from '@/components/blog/StatBlock'
import { getPostBySlug, getAllPosts } from '@/lib/sanity/queries'
import { urlFor }          from '@/lib/sanity/image'

export const revalidate = 60

export async function generateStaticParams() {
  const posts = await getAllPosts()
  return posts.map(p => ({ slug: p.slug.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) return {}
  return {
    title:       `${post.title} · NU.V.E.M Medicina`,
    description: post.excerpt,
    openGraph:   post.coverImage ? { images: [urlFor(post.coverImage).width(1200).height(630).url()] } : {},
  }
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

const ptComponents = {
  types: {
    image: ({ value }: any) => (
      <figure className="my-8">
        <div className="relative w-full rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
          <Image src={urlFor(value).width(1200).url()} alt={value.alt ?? ''} fill className="object-cover" />
        </div>
        {value.caption && <figcaption className="text-center text-[0.78rem] text-steel/50 mt-2">{value.caption}</figcaption>}
      </figure>
    ),
    calloutBlock:  ({ value }: any) => <CalloutBlock value={value} />,
    faqItem:       ({ value }: any) => <FaqItem value={value} />,
    downloadBlock: ({ value }: any) => <DownloadBlock value={value} />,
    statBlock:     ({ value }: any) => <StatBlock value={value} />,
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
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const post = await getPostBySlug(slug)
  if (!post) notFound()

  return (
    <>
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
          <h1 className="font-serif font-semibold text-white text-[2rem] md:text-[2.6rem] leading-tight mb-4">{post.title}</h1>
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
            <Image src={urlFor(post.coverImage).width(1200).height(675).url()} alt={post.title} fill className="object-cover" />
          </div>
        </div>
      )}

      {/* Body */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg prose-headings:font-serif prose-headings:font-semibold prose-headings:text-steel prose-p:text-steel/70 prose-p:leading-relaxed prose-a:text-teal prose-strong:text-steel prose-li:text-steel/70 max-w-none">
            {post.body && <PortableText value={post.body} components={ptComponents} />}
          </div>

          {/* Author card */}
          {post.author && (
            <div className="mt-12 pt-8 border-t border-teal/10 flex items-start gap-4">
              {post.author.image && (
                <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 relative border border-teal/15">
                  <Image src={urlFor(post.author.image).width(112).height(112).url()} alt={post.author.name} fill className="object-cover" />
                </div>
              )}
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-teal mb-0.5">Autor</p>
                <p className="text-[0.97rem] font-semibold text-steel">{post.author.name}</p>
                {post.author.bio && <p className="text-[0.82rem] text-steel/55 mt-1 leading-relaxed">{post.author.bio}</p>}
              </div>
            </div>
          )}
        </div>
      </SectionWrapper>

      <SectionWrapper dark grid>
        <CtaBanner
          title="Gostou do conteúdo?"
          desc="Agende uma consulta com nossa equipe especializada e cuide da sua saúde digestiva."
        />
      </SectionWrapper>
    </>
  )
}
