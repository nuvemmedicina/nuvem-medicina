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
}

export async function getAllPosts(): Promise<Post[]> {
  return client.fetch(
    `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) {
      _id, title, slug, publishedAt, excerpt, coverImage, author->, categories[]->, readingTime, dataRevisao, respostaDireta
    }`
  )
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  return client.fetch(
    `*[_type == "post" && slug.current == $slug][0] {
      _id, title, slug, publishedAt, excerpt, coverImage { ..., credit }, author->, categories[]->, body, readingTime,
      references[] { _key, citation, url },
      perguntaPrincipal, respostaDireta, exameRelacionado, especialidadeRelacionada, dataRevisao,
      revisadoPor->
    }`,
    { slug }
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
