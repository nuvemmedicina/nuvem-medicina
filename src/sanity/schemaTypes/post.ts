import { defineType, defineField } from 'sanity'

export const postType = defineType({
  name:  'post',
  title: 'Artigo',
  type:  'document',
  fields: [
    defineField({
      name:       'title',
      title:      'Título',
      type:       'string',
      validation: Rule => Rule.required().min(5).max(120),
    }),
    defineField({
      name:  'slug',
      title: 'URL do artigo',
      type:  'slug',
      options: { source: 'title', maxLength: 96 },
      validation: Rule => Rule.required(),
    }),
    defineField({
      name:  'author',
      title: 'Autor',
      type:  'reference',
      to:    [{ type: 'author' }],
    }),
    defineField({
      name:  'coverImage',
      title: 'Imagem de capa',
      type:  'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt',    title: 'Texto alternativo', type: 'string' }),
        defineField({ name: 'credit', title: 'Fonte da imagem',   type: 'string', description: 'Ex: Adobe Stock, Shutterstock, nome do fotógrafo' }),
      ],
    }),
    defineField({
      name:       'excerpt',
      title:      'Resumo',
      type:       'text',
      rows:       3,
      description: 'Aparece na listagem do blog e no compartilhamento nas redes sociais.',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name:  'categories',
      title: 'Categorias',
      type:  'array',
      of:    [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name:        'publishedAt',
      title:       'Data de publicação',
      type:        'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name:  'readingTime',
      title: 'Tempo de leitura (minutos)',
      type:  'number',
    }),
    defineField({
      name:        'references',
      title:       'Referências Bibliográficas',
      type:        'array',
      description: 'Lista de referências citadas no artigo. Aparece como seção dobrável ao final do post.',
      of: [
        {
          type:  'object',
          name:  'citationItem',
          title: 'Referência',
          fields: [
            defineField({
              name:       'citation',
              title:      'Citação',
              type:       'text',
              rows:       2,
              description: 'Ex: SOUZA, M. et al. Título do artigo. Revista. 2024;10(2):100–110.',
              validation:  Rule => Rule.required(),
            }),
            defineField({
              name:        'url',
              title:       'Link (DOI ou URL)',
              type:        'url',
              description: 'Opcional — Ex: https://doi.org/10.1000/xyz123',
            }),
          ],
          preview: {
            select: { title: 'citation' },
            prepare({ title }: { title?: string }) {
              return { title: title ?? 'Referência sem texto' }
            },
          },
        },
      ],
    }),

    defineField({
      name:  'body',
      title: 'Conteúdo',
      type:  'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt',     title: 'Texto alternativo', type: 'string' }),
            defineField({ name: 'caption', title: 'Legenda',           type: 'string' }),
          ],
        },
        { type: 'calloutBlock' },
        { type: 'faqItem' },
        { type: 'downloadBlock' },
        { type: 'statBlock' },
        { type: 'spotifyBlock' },
        { type: 'youtubeBlock' },
        { type: 'tableBlock' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'coverImage' },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `Por ${author}` : '', media }
    },
  },
})
