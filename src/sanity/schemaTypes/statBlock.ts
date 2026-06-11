import { defineType, defineField } from 'sanity'
import { BarChartIcon } from 'lucide-react'

export const statBlockType = defineType({
  name:  'statBlock',
  title: 'Estatísticas em Destaque',
  type:  'object',
  icon:  BarChartIcon,
  fields: [
    defineField({
      name:  'titulo',
      title: 'Título da seção (opcional)',
      type:  'string',
    }),
    defineField({
      name:  'items',
      title: 'Itens',
      type:  'array',
      of: [{
        type:  'object',
        name:  'statItem',
        title: 'Estatística',
        fields: [
          defineField({ name: 'valor', title: 'Valor',  type: 'string', description: 'Ex: 95%, +2.000, ISO 9001' }),
          defineField({ name: 'label', title: 'Label',  type: 'string', description: 'Ex: de satisfação' }),
          defineField({ name: 'fonte', title: 'Fonte (opcional)', type: 'string' }),
        ],
        preview: {
          select: { valor: 'valor', label: 'label' },
          prepare: ({ valor, label }) => ({ title: valor, subtitle: label }),
        },
      }],
      validation: Rule => Rule.required().min(2).max(4),
    }),
  ],
  preview: {
    select: { titulo: 'titulo', items: 'items' },
    prepare({ titulo, items }) {
      return {
        title:    `📊 ${titulo || 'Estatísticas'}`,
        subtitle: `${items?.length ?? 0} item(s)`,
      }
    },
  },
})
