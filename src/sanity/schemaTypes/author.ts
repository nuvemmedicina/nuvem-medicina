import { defineType, defineField } from 'sanity'

export const authorType = defineType({
  name:  'author',
  title: 'Autor',
  type:  'document',
  fields: [
    defineField({ name: 'name',  title: 'Nome',  type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'slug',  title: 'Slug',  type: 'slug', options: { source: 'name' } }),
    defineField({ name: 'image', title: 'Foto',  type: 'image', options: { hotspot: true } }),
    defineField({ name: 'bio',   title: 'Bio',   type: 'text', rows: 3 }),
    defineField({
      name:        'crm',
      title:       'CRM',
      type:        'string',
      description: 'Texto livre, ex.: "CRM MG: 22284 | RQE: 10411 (Gastroenterologia)". Mantido como está para não quebrar o que já existe — use os campos RQE e Titulação abaixo para dados estruturados novos.',
    }),
    defineField({
      name:        'rqe',
      title:       'RQE',
      type:        'array',
      of:          [{ type: 'string' }],
      description: 'Um item por RQE, sem o prefixo "RQE" (ex.: "10411"). Usado nos dados estruturados do artigo.',
    }),
    defineField({
      name:        'titulacao',
      title:       'Titulação',
      type:        'string',
      description: 'Ex.: "Especialista em Gastroenterologia pela FBG". Usado nos dados estruturados do artigo.',
    }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
