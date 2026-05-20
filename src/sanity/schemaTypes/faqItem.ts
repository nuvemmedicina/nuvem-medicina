import { defineType, defineField } from 'sanity'
import { HelpCircleIcon } from 'lucide-react'

export const faqItemType = defineType({
  name:  'faqItem',
  title: 'Pergunta Frequente (FAQ)',
  type:  'object',
  icon:  HelpCircleIcon,
  fields: [
    defineField({
      name:       'pergunta',
      title:      'Pergunta',
      type:       'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name:       'resposta',
      title:      'Resposta',
      type:       'text',
      rows:       5,
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
