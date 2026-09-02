import { defineType, defineField } from 'sanity'
import { EXAMES, ESPECIALIDADES } from '../../lib/data'

// Listas geradas a partir de src/lib/data.ts — fonte única de verdade.
// Exames e especialidades ainda não são documentos no Sanity (são páginas
// estáticas do site), então este é um campo de texto com opções, não uma
// referência. A validação abaixo impede gravar qualquer valor fora desta
// lista, e scripts/validar-referencias-blog.mjs falha o build caso um
// artigo já publicado aponte para um id que deixou de existir aqui.
const EXAME_OPTIONS = EXAMES.map(e => ({ title: e.title, value: e.id }))
const ESPECIALIDADE_OPTIONS = ESPECIALIDADES.map(e => ({ title: e.title, value: e.slug }))
const EXAME_IDS = EXAME_OPTIONS.map(o => o.value)
const ESPECIALIDADE_IDS = ESPECIALIDADE_OPTIONS.map(o => o.value)

export const postType = defineType({
  name:  'post',
  title: 'Artigo',
  type:  'document',
  fields: [
    defineField({
      name:       'title',
      title:      'Título',
      type:       'string',
      validation: Rule => Rule.required().min(5).max(120),
    }),
    defineField({
      name:  'slug',
      title: 'URL do artigo',
      type:  'slug',
      description: 'Escreva a URL manualmente: apenas letras minúsculas, sem acento, com hífen entre as palavras (ex.: "disturbios-intestinais"). Se este artigo já foi publicado, não altere o valor deste campo: trocar a URL quebra o histórico de busca do Google e exige criar um redirecionamento 301.',
      validation: Rule => Rule
        .required()
        .custom(value => {
          if (!value?.current) return true
          return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(value.current)
            ? true
            : 'Use apenas letras minúsculas sem acento, números e hífen entre as palavras, sem espaços nem outros caracteres. Exemplo: "disturbios-intestinais".'
        }),
    }),
    defineField({
      name:  'author',
      title: 'Autor',
      type:  'reference',
      to:    [{ type: 'author' }],
    }),
    defineField({
      name:        'perguntaPrincipal',
      title:       'Pergunta principal',
      type:        'string',
      description: 'A pergunta escrita como o paciente digitaria no Google, ex.: "disbiose intestinal causa candidíase". Usada como título da seção de resposta direta, logo após o título do artigo.',
    }),
    defineField({
      name:        'respostaDireta',
      title:       'Resposta direta',
      type:        'text',
      rows:        3,
      description: 'Responda a pergunta principal em até sessenta palavras, sem introdução nem contextualização histórica. Aparece em destaque logo abaixo do título, antes da imagem de capa.',
      validation:  Rule => Rule.max(320),
    }),
    defineField({
      name:  'coverImage',
      title: 'Imagem de capa',
      type:  'image',
      options: { hotspot: true },
      fields: [
        defineField({ name: 'alt',    title: 'Texto alternativo', type: 'string' }),
        defineField({ name: 'credit', title: 'Fonte da imagem',   type: 'string', description: 'Ex: Adobe Stock, Shutterstock, nome do fotógrafo' }),
      ],
    }),
    defineField({
      name:       'excerpt',
      title:      'Resumo',
      type:       'text',
      rows:       3,
      description: 'Aparece na listagem do blog e no compartilhamento nas redes sociais.',
      validation: Rule => Rule.max(200),
    }),
    defineField({
      name:  'categories',
      title: 'Categorias',
      type:  'array',
      of:    [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name:       'exameRelacionado',
      title:      'Exame relacionado',
      type:       'string',
      description: 'Exame que investiga o problema deste artigo. Define o destino da chamada ao final do texto. Se não houver exame relacionado, deixe em branco e preencha "Especialidade relacionada" — na falta dos dois, a chamada genérica de agendamento é exibida.',
      options: { list: EXAME_OPTIONS },
      validation: Rule => Rule.custom(value => {
        if (!value) return true
        return EXAME_IDS.includes(value as string)
          ? true
          : `"${value}" não corresponde a nenhum exame cadastrado em src/lib/data.ts`
      }),
    }),
    defineField({
      name:       'especialidadeRelacionada',
      title:      'Especialidade relacionada',
      type:       'string',
      description: 'Usada como destino alternativo da chamada ao final do artigo quando não houver um exame específico relacionado.',
      options: { list: ESPECIALIDADE_OPTIONS },
      validation: Rule => Rule.custom(value => {
        if (!value) return true
        return ESPECIALIDADE_IDS.includes(value as string)
          ? true
          : `"${value}" não corresponde a nenhuma especialidade cadastrada em src/lib/data.ts`
      }),
    }),
    defineField({
      name:        'publishedAt',
      title:       'Data de publicação',
      type:        'datetime',
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name:  'readingTime',
      title: 'Tempo de leitura (minutos)',
      type:  'number',
    }),
    defineField({
      name:  'revisadoPor',
      title: 'Revisado por',
      type:  'reference',
      to:    [{ type: 'author' }],
      description: 'Quem fez a revisão técnica do conteúdo, quando diferente do autor que escreveu o artigo.',
    }),
    defineField({
      name:        'dataRevisao',
      title:       'Data da última revisão clínica',
      type:        'date',
      description: 'Data em que o conteúdo foi revisado tecnicamente pela última vez. Usada para atualizar a data de modificação do artigo nos metadados e no sitemap.',
    }),
    defineField({
      name:        'references',
      title:       'Referências Bibliográficas',
      type:        'array',
      description: 'Lista de referências citadas no artigo. Aparece como seção dobrável ao final do post.',
      of: [
        {
          type:  'object',
          name:  'citationItem',
          title: 'Referência',
          fields: [
            defineField({
              name:       'citation',
              title:      'Citação',
              type:       'text',
              rows:       2,
              description: 'Ex: SOUZA, M. et al. Título do artigo. Revista. 2024;10(2):100–110.',
              validation:  Rule => Rule.required(),
            }),
            defineField({
              name:        'url',
              title:       'Link (DOI ou URL)',
              type:        'url',
              description: 'Opcional — Ex: https://doi.org/10.1000/xyz123',
            }),
          ],
          preview: {
            select: { title: 'citation' },
            prepare({ title }: { title?: string }) {
              return { title: title ?? 'Referência sem texto' }
            },
          },
        },
      ],
    }),

    defineField({
      name:  'body',
      title: 'Conteúdo',
      type:  'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            defineField({ name: 'alt',     title: 'Texto alternativo', type: 'string' }),
            defineField({ name: 'caption', title: 'Legenda',           type: 'string' }),
          ],
        },
        { type: 'calloutBlock' },
        { type: 'faqItem' },
        { type: 'downloadBlock' },
        { type: 'statBlock' },
        { type: 'spotifyBlock' },
        { type: 'youtubeBlock' },
        { type: 'tableBlock' },
      ],
    }),
  ],
  preview: {
    select: { title: 'title', author: 'author.name', media: 'coverImage' },
    prepare({ title, author, media }) {
      return { title, subtitle: author ? `Por ${author}` : '', media }
    },
  },
})
