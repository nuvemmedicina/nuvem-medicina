import { defineType, defineField } from 'sanity'
import { InfoIcon } from 'lucide-react'

export const calloutBlockType = defineType({
  name:  'calloutBlock',
  title: 'Destaque / Alerta',
  type:  'object',
  icon:  InfoIcon,
  fields: [
    defineField({
      name:    'tipo',
      title:   'Tipo',
      type:    'string',
      options: {
        list: [
          { title: '💡 Dica',    value: 'dica' },
          { title: '⚠️ Atenção', value: 'atencao' },
          { title: '🚨 Cuidado', value: 'cuidado' },
          { title: 'ℹ️ Info',    value: 'info' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
    }),
    defineField({
      name:  'titulo',
      title: 'Título (opcional)',
      type:  'string',
    }),
    defineField({
      name:       'texto',
      title:      'Texto',
      type:       'text',
      rows:       4,
      validation: Rule => Rule.required(),
    }),
  ],
  preview: {
    select: { titulo: 'titulo', tipo: 'tipo', texto: 'texto' },
    prepare({ titulo, tipo, texto }) {
      const icons: Record<string, string> = { dica: '💡', atencao: '⚠️', cuidado: '🚨', info: 'ℹ️' }
      return {
        title:    `${icons[tipo] ?? 'ℹ️'} ${titulo || texto?.slice(0, 60) || 'Destaque'}`,
        subtitle: 'Bloco de destaque',
      }
    },
  },
})
