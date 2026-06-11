import { defineType, defineField } from 'sanity'

export const spotifyBlockType = defineType({
  name:  'spotifyBlock',
  title: 'Podcast Spotify',
  type:  'object',
  fields: [
    defineField({
      name:        'episodeId',
      title:       'ID do Episódio',
      type:        'string',
      description: 'Cole o ID do episódio — parte do link após /episode/. Ex: 3KQYcT5hpDRdOSHh5yeL5I',
      validation:  Rule => Rule.required(),
    }),
    defineField({
      name:        'title',
      title:       'Título do Episódio',
      type:        'string',
      description: 'Opcional — usado como legenda abaixo do player',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'episodeId' },
    prepare({ title, subtitle }: { title?: string; subtitle?: string }) {
      return {
        title:    title ?? 'Podcast Spotify',
        subtitle: subtitle ? `ID: ${subtitle}` : '',
        media:    () => '🎙️',
      }
    },
  },
})
