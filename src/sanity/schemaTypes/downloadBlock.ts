import { defineType, defineField } from 'sanity'
import { DownloadIcon } from 'lucide-react'

export const downloadBlockType = defineType({
  name:  'downloadBlock',
  title: 'Botão de Download',
  type:  'object',
  icon:  DownloadIcon,
  fields: [
    defineField({
      name:       'titulo',
      title:      'Título do material',
      type:       'string',
      validation: Rule => Rule.required(),
    }),
    defineField({
      name:  'descricao',
      title: 'Descrição curta (opcional)',
      type:  'string',
    }),
    defineField({
      name:        'url',
      title:       'URL do arquivo (PDF, etc.)',
      type:        'url',
      description: 'Link direto para o arquivo ou para uma página externa de download.',
      validation:  Rule => Rule.required().uri({ allowRelative: false, scheme: ['https', 'http'] }),
    }),
    defineField({
      name:         'label',
      title:        'Texto do botão',
      type:         'string',
      initialValue: 'Baixar material',
    }),
  ],
  preview: {
    select: { titulo: 'titulo', label: 'label' },
    prepare({ titulo, label }) {
      return { title: `⬇️ ${titulo ?? 'Download'}`, subtitle: label ?? 'Baixar material' }
    },
  },
})
