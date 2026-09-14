import { client } from './client'
import type { LinkBio } from '@/lib/linkBio'

export type Reference = {
  _key:     string
  citation: string
  url?:     string
}

export type Autor = {
  name:  string
  slug?: { current: string }
  bio?:  string
  crm?:  string
  rqe?:  string[]
  titulacao?: string
  image?: { asset: { _ref: string } }
}

export type Post = {
  _id:         string
  title:       string
  slug:        { current: string }
  publishedAt: string
  excerpt:     string
  coverImage?: { asset: { _ref: string }; credit?: string }
  author?:     Autor
  categories?: { title: string; color?: string }[]
  body:        // eslint-disable-next-line @typescript-eslint/no-explicit-any
               any[]
  readingTime?: number
  references?:  Reference[]
  perguntaPrincipal?: string
  respostaDireta?:    string
  exameRelacionado?:  string
  especialidadeRelacionada?: string
  revisadoPor?: Autor
  dataRevisao?: string
  language?:      string
  translationOf?: { _ref: string }
}

/**
 * `language` é opcional e por padrão filtra pt-BR — todo chamador existente
 * (sitemap, Nuvete, llms.txt) continua vendo só os artigos em português sem
 * precisar passar nada. `coalesce(language, "pt-BR")` cobre os posts
 * publicados antes do campo existir, que não têm valor gravado.
 */
export async function getAllPosts(language = 'pt-BR'): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current) && coalesce(language, "pt-BR") == $language] | order(publishedAt desc) {
      _id, title, slug, publishedAt, excerpt, coverImage, author->, categories[]->, readingTime, dataRevisao, respostaDireta
    }`,
    { language }
  )
}

export async function getPostBySlug(slug: string, language = 'pt-BR'): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug && coalesce(language, "pt-BR") == $language][0] {
      _id, title, slug, publishedAt, excerpt, coverImage { ..., credit }, author->, categories[]->, body, readingTime,
      references[] { _key, citation, url },
      perguntaPrincipal, respostaDireta, exameRelacionado, especialidadeRelacionada, dataRevisao,
      revisadoPor->
    }`,
    { slug, language }
  )
}

export async function getCategories() {
  return client.fetch(`*[_type == "category"] | order(title asc) { _id, title, color }`)
}

/** Documento único que alimenta /links. Retorna null se ainda não foi criado no Studio. */
export async function getLinkBio(): Promise<LinkBio | null> {
  return client.fetch(
    `*[_type == "linkBio"][0] {
      posicionamento,
      chamadaPrincipal,
      destaques[] { _key, rotulo, descricao, destino, ativo },
      blocos[] { _key, titulo, itens[] { _key, rotulo, destino } },
      mensagemWhatsapp,
      avisoTemporario,
    }`
  )
}
