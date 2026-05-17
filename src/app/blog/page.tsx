import type { Metadata } from 'next'
import Link              from 'next/link'
import Image             from 'next/image'
import { PageHero }      from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { getAllPosts }    from '@/lib/sanity/queries'
import { urlFor }        from '@/lib/sanity/image'

export const revalidate = 60

export const metadata: Metadata = {
  title:       'Blog · Conteúdo Científico',
  description: 'Artigos e conteúdos sobre gastroenterologia, saúde digestiva, testes respiratórios, fisioterapia pélvica e ensino médico pela equipe NU.V.E.M.',
}

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  // collect unique categories from published posts
  const allCats = Array.from(
    new Set(posts.flatMap(p => p.categories?.map(c => c.title) ?? []))
  ).sort()

  return (
    <>
      <PageHero
        tag="Blog"
        title={<>Conteúdo <em>científico</em> especializado</>}
        desc="Artigos produzidos pela equipe NU.V.E.M sobre gastroenterologia, saúde digestiva, diagnóstico avançado e ensino médico baseado em evidências."
      />

      <SectionWrapper>
        {/* Category filters – decorative (client filtering would need 'use client') */}
        {allCats.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-12">
            <span className="px-4 py-2 rounded-full text-white text-[0.72rem] font-semibold"
              style={{ background: 'linear-gradient(135deg, #00465F, #0e7fa5)' }}>
              Todos
            </span>
            {allCats.map(cat => (
              <span key={cat}
                className="px-4 py-2 rounded-full bg-cloud border border-teal/12 text-[0.72rem] font-medium text-steel/60">
                {cat}
              </span>
            ))}
          </div>
        )}

        {/* Posts grid */}
        {posts.length === 0 ? (
          <p className="text-center text-steel/50 py-24 text-[0.9rem]">Nenhum artigo publicado ainda.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post, i) => {
              const cat = post.categories?.[0]?.title ?? ''
              return (
                <article
                  key={post._id}
                  className={`group bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm hover:border-teal/25 hover:-translate-y-1 hover:shadow-md transition-all reveal reveal-d${i % 3}`}
                >
                  {/* Cover image or placeholder */}
                  {post.coverImage ? (
                    <div className="relative h-44 w-full overflow-hidden">
                      <Image
                        src={urlFor(post.coverImage).width(640).height(360).url()}
                        alt={post.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ) : (
                    <div className="h-40 flex items-center justify-center border-b border-teal/8"
                      style={{ background: 'linear-gradient(135deg, rgba(203,228,230,0.35), rgba(0,70,95,0.08))' }}>
                      <span className="font-serif text-[0.68rem] uppercase tracking-[.15em] text-teal/40">{cat}</span>
                    </div>
                  )}

                  <div className="p-7">
                    <div className="flex items-center gap-3 mb-3">
                      {cat && (
                        <span className="text-[0.65rem] font-semibold uppercase tracking-[.1em] text-teal bg-teal/8 border border-teal/15 px-2.5 py-0.5 rounded-full">
                          {cat}
                        </span>
                      )}
                      {post.publishedAt && (
                        <span className="text-[0.68rem] text-steel/40">{formatDate(post.publishedAt)}</span>
                      )}
                    </div>
                    <h2 className="text-[0.92rem] font-semibold text-steel leading-snug mb-3 group-hover:text-teal transition-colors">
                      {post.title}
                    </h2>
                    {post.excerpt && (
                      <p className="text-[0.78rem] font-light text-steel/60 leading-[1.7] mb-5 line-clamp-3">{post.excerpt}</p>
                    )}
                    <Link
                      href={`/blog/${post.slug.current}`}
                      className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-teal border-b border-teal/25 pb-px hover:gap-2.5 transition-all"
                    >
                      Ler artigo →
                    </Link>
                  </div>
                </article>
              )
            })}
          </div>
        )}
      </SectionWrapper>
    </>
  )
}
