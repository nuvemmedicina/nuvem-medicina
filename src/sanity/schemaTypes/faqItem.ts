import { defineType, defineField, defineArrayMember } from 'sanity'
import { HelpCircleIcon } from 'lucide-react'

export const faqItemType = defineType({
  name:  'faqItem',
  title: 'Pergunta Frequente (FAQ)',
  type:  'object',
  icon:  HelpCircleIcon,
  fields: [
    defineField({
      name:        'pergunta',
      title:       'Pergunta',
      type:        'string',
      description: 'Apenas texto simples, sem formatação. Não cole marcação de título, negrito ou links aqui: eles aparecerão exatamente como digitados na página.',
      validation:  Rule => Rule.required(),
    }),
    defineField({
      name:  'resposta',
      title: 'Resposta',
      type:  'array',
      of: [
        defineArrayMember({
          type:   'block',
          styles: [{ title: 'Normal', value: 'normal' }],
          lists:  [{ title: 'Lista com marcadores', value: 'bullet' }],
          marks: {
            decorators: [
              { title: 'Negrito', value: 'strong' },
              { title: 'Itálico', value: 'em' },
            ],
            annotations: [],
          },
        }),
      ],
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: { pergunta: 'pergunta' },
    prepare({ pergunta }) {
      return { title: `❓ ${pergunta ?? 'FAQ'}`, subtitle: 'Pergunta frequente' }
    },
  },
})
