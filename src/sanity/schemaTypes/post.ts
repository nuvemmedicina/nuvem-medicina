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
        defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
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
      name:  'body',
      title: 'Conteúdo',
      type:  'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt', title: 'Texto alternativo', type: 'string' }),
            defineField({ name: 'caption', title: 'Legenda', type: 'string' }),
          ],
        },
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
