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
    defineField({ name: 'crm',   title: 'CRM',   type: 'string' }),
  ],
  preview: {
    select: { title: 'name', media: 'image' },
  },
})
