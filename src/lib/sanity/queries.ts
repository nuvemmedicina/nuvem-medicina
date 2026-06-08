import { client } from './client'

export type Reference = {
  _key:     string
  citation: string
  url?:     string
}

export type Post = {
  _id:         string
  title:       string
  slug:        { current: string }
  publishedAt: string
  excerpt:     string
  coverImage?: { asset: { _ref: string }; credit?: string }
  author?:     { name: string; bio?: string; image?: { asset: { _ref: string } } }
  categories?: { title: string; color?: string }[]
  body:        // eslint-disable-next-line @typescript-eslint/no-explicit-any
               any[]
  readingTime?: number
  references?:  Reference[]
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id, title, slug, publishedAt, excerpt, coverImage, author->, categories[]->, readingTime
    }`
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, excerpt, coverImage { ..., credit }, author->, categories[]->, body, readingTime,
      references[] { _key, citation, url }
    }`,
    { slug }
  )
}

export async function getCategories() {
  return client.fetch(`*[_type == "category"] | order(title asc) { _id, title, color }`)
}
