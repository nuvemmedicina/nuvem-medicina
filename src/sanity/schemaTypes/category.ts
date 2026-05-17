import { defineType, defineField } from 'sanity'

export const categoryType = defineType({
  name:  'category',
  title: 'Categoria',
  type:  'document',
  fields: [
    defineField({ name: 'title', title: 'Nome', type: 'string', validation: Rule => Rule.required() }),
    defineField({ name: 'color', title: 'Cor (ex: teal, gold)', type: 'string' }),
    defineField({ name: 'description', title: 'Descrição', type: 'text', rows: 2 }),
  ],
})
