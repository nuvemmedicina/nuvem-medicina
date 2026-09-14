import type { Metadata }  from 'next'
import { getTranslations } from 'next-intl/server'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { BlogGrid }       from '@/components/blog/BlogGrid'
import { getAllPosts }     from '@/lib/sanity/queries'
import { localizedAlternates } from '@/lib/i18n-seo'

interface Props { params: Promise<{ locale: string }> }

export const revalidate = 60

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'blogPage' })
  return {
    alternates:  localizedAlternates('/blog', locale),
    title:       t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function BlogPage({ params }: Props) {
  const { locale } = await params
  const posts = await getAllPosts(locale)
  const t = await getTranslations('blogPage')

  const categories = Array.from(
    new Set(posts.flatMap(p => p.categories?.map(c => c.title) ?? []))
  ).sort()

  return (
    <>
      <PageHero
        tag={t('tag')}
        title={t.rich('title', { em: chunks => <em>{chunks}</em> })}
        desc={t('desc')}
      />

      <SectionWrapper>
        <BlogGrid posts={posts} categories={categories} />
      </SectionWrapper>
    </>
  )
}
