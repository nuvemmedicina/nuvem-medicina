import { defineType, defineField } from 'sanity'

export const tableBlock = defineType({
  name:  'tableBlock',
  title: 'Tabela',
  type:  'object',
  fields: [
    defineField({
      name:        'caption',
      title:       'Legenda',
      type:        'string',
      description: 'Opcional — aparece abaixo da tabela.',
    }),
    defineField({
      name:         'hasHeader',
      title:        'Primeira linha é cabeçalho',
      type:         'boolean',
      initialValue: true,
    }),
    defineField({
      name:  'rows',
      title: 'Linhas',
      type:  'array',
      of: [
        {
          type:  'object',
          name:  'tableRow',
          title: 'Linha',
          fields: [
            defineField({
              name:        'cells',
              title:       'Células',
              description: 'Adicione uma entrada por célula, na ordem das colunas.',
              type:        'array',
              of:          [{ type: 'string' }],
            }),
          ],
          preview: {
            select: { cells: 'cells' },
            prepare({ cells }: { cells?: string[] }) {
              return { title: cells?.join(' | ') ?? 'Linha vazia' }
            },
          },
        },
      ],
    }),
  ],
  preview: {
    select: { caption: 'caption', rows: 'rows' },
    prepare({ caption, rows }: { caption?: string; rows?: unknown[] }) {
      const n = rows?.length ?? 0
      return {
        title:    caption ?? 'Tabela',
        subtitle: `${n} linha${n !== 1 ? 's' : ''}`,
      }
    },
  },
})
