'use client'

import { useState } from 'react'
import Link          from 'next/link'
import Image         from 'next/image'
import { urlFor }    from '@/lib/sanity/image'
import type { Post } from '@/lib/sanity/queries'

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('pt-BR', {
    day: '2-digit', month: 'long', year: 'numeric',
  })
}

interface Props {
  posts:      Post[]
  categories: string[]
}

export function BlogGrid({ posts, categories }: Props) {
  const [active, setActive] = useState<string>('Todos')

  const filtered = active === 'Todos'
    ? posts
    : posts.filter(p => p.categories?.some(c => c.title === active))

  return (
    <>
      {/* Filtros */}
      {categories.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-12">
          {['Todos', ...categories].map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`px-4 py-2 rounded-full text-[0.72rem] font-semibold transition-all ${
                active === cat
                  ? 'text-white shadow-sm'
                  : 'bg-cloud border border-teal/12 text-steel/60 hover:border-teal/30 hover:text-steel/80'
              }`}
              style={
                active === cat
                  ? { background: 'linear-gradient(135deg, #00465F, #0e7fa5)' }
                  : undefined
              }
            >
              {cat}
            </button>
          ))}
        </div>
      )}

      {/* Grid */}
      {filtered.length === 0 ? (
        <p className="text-center text-steel/50 py-24 text-[0.9rem]">
          Nenhum artigo nesta categoria.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((post, i) => {
            const cat = post.categories?.[0]?.title ?? ''
            return (
              <article
                key={post._id}
                className={`group bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm hover:border-teal/25 hover:-translate-y-1 hover:shadow-md transition-all reveal reveal-d${i % 3}`}
              >
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
                  <div
                    className="h-40 flex items-center justify-center border-b border-teal/8"
                    style={{ background: 'linear-gradient(135deg, rgba(203,228,230,0.35), rgba(0,70,95,0.08))' }}
                  >
                    <span className="font-serif text-[0.68rem] uppercase tracking-[.15em] text-teal/40">{cat}</span>
                  </div>
                )}

                <div className="p-6">
                  {cat && (
                    <span className="inline-block text-[0.6rem] font-bold uppercase tracking-[.12em] text-teal bg-teal/8 border border-teal/20 px-2.5 py-0.5 rounded-full mb-3">
                      {cat}
                    </span>
                  )}
                  <h2 className="text-[0.93rem] font-semibold text-steel leading-snug mb-2 group-hover:text-teal transition-colors">
                    {post.title}
                  </h2>
                  {post.publishedAt && (
                    <p className="text-[0.65rem] text-steel/35 mb-3">{formatDate(post.publishedAt)}</p>
                  )}
                  {post.excerpt && (
                    <p className="text-[0.78rem] font-light text-steel/60 leading-[1.7] mb-5 line-clamp-3">
                      {post.excerpt}
                    </p>
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
    </>
  )
}
