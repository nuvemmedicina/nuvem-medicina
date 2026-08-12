import { defineType, defineField } from 'sanity'
import { YoutubeIcon } from 'lucide-react'

export const youtubeBlockType = defineType({
  name:  'youtubeBlock',
  title: 'Vídeo do YouTube',
  type:  'object',
  icon:  YoutubeIcon,
  fields: [
    defineField({
      name:        'url',
      title:       'Link do vídeo',
      type:        'url',
      description: 'Cole o link do YouTube. Funciona com Shorts, youtu.be e youtube.com/watch. Ex: https://youtube.com/shorts/oWZKIIzOUbA',
      validation:  Rule => Rule.required().uri({ allowRelative: false, scheme: ['https', 'http'] }),
    }),
    defineField({
      name:        'title',
      title:       'Legenda do vídeo',
      type:        'string',
      description: 'Opcional — aparece abaixo do player.',
    }),
    defineField({
      name:        'formato',
      title:       'Formato do player',
      type:        'string',
      description: 'Automático detecta Shorts (vertical) pelo link. Use as outras opções só para forçar.',
      options: {
        list: [
          { title: 'Automático',            value: 'auto' },
          { title: 'Horizontal (16:9)',     value: 'horizontal' },
          { title: 'Vertical / Shorts (9:16)', value: 'vertical' },
        ],
        layout: 'radio',
      },
      initialValue: 'auto',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'url' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title:    title ?? 'Vídeo do YouTube',
        subtitle: subtitle ?? '',
        media:    () => '▶️',
      }
    },
  },
})
