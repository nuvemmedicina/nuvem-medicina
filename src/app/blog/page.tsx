import type { Metadata }  from 'next'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { BlogGrid }       from '@/components/blog/BlogGrid'
import { getAllPosts }     from '@/lib/sanity/queries'

export const revalidate = 60

export const metadata: Metadata = {
  title:       'Blog · Conteúdo Científico',
  description: 'Artigos e conteúdos sobre gastroenterologia, saúde digestiva, testes respiratórios, fisioterapia pélvica e ensino médico pela equipe NU.V.E.M.',
}

export default async function BlogPage() {
  const posts = await getAllPosts()

  const categories = Array.from(
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
        <BlogGrid posts={posts} categories={categories} />
      </SectionWrapper>
    </>
  )
}
