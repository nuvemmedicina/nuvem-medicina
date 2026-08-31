import { defineType, defineField } from 'sanity'
import { EXAMES, ESPECIALIDADES } from '../../lib/data'

// Rotas internas fixas que fazem sentido como destino de um item da página de
// links. Curada à mão porque cobre páginas de propósitos diferentes (hub,
// listagem, institucional), diferente de exames e especialidades, que vêm
// direto do catálogo logo abaixo.
const ROTAS_FIXAS = [
  { title: 'Agendar consulta',        value: '/agendar' },
  { title: 'Convênios médicos',       value: '/convenios-medicos' },
  { title: 'Blog',                    value: '/blog' },
  { title: 'Preparos para exames',    value: '/exames/preparos' },
  { title: 'Todos os exames',         value: '/exames' },
  { title: 'Todas as especialidades', value: '/especialidades' },
  { title: 'Contato',                 value: '/contato' },
]

// Listas geradas a partir de src/lib/data.ts — mesma solução usada no campo
// "Exame relacionado" dos artigos do blog (ver src/sanity/schemaTypes/post.ts).
// Impede gravar uma rota para um exame ou especialidade que não existe.
const EXAME_ROTAS = EXAMES.map(e => ({ title: `Exame · ${e.title}`, value: `/exames/${e.id}` }))
const ESPECIALIDADE_ROTAS = ESPECIALIDADES.map(e => ({ title: `Especialidade · ${e.title}`, value: `/especialidades/${e.slug}` }))

const ROTA_INTERNA_OPTIONS = [...ROTAS_FIXAS, ...EXAME_ROTAS, ...ESPECIALIDADE_ROTAS]
const ROTA_INTERNA_VALUES = ROTA_INTERNA_OPTIONS.map(o => o.value)

export const linkDestinoType = defineType({
  name:  'linkDestino',
  title: 'Destino',
  type:  'object',
  fields: [
    defineField({
      name:    'tipo',
      title:   'Tipo de destino',
      type:    'string',
      options: {
        list: [
          { title: 'Página do site', value: 'interno' },
          { title: 'Link externo',   value: 'externo' },
          { title: 'WhatsApp',       value: 'whatsapp' },
          { title: 'Telefone',       value: 'telefone' },
        ],
        layout: 'radio',
      },
      initialValue: 'interno',
      validation:   Rule => Rule.required(),
    }),
    defineField({
      name:    'rotaInterna',
      title:   'Página do site',
      type:    'string',
      options: { list: ROTA_INTERNA_OPTIONS },
      hidden:  ({ parent }) => parent?.tipo !== 'interno',
      validation: Rule => Rule.custom((value, context) => {
        const tipo = (context.parent as { tipo?: string } | undefined)?.tipo
        if (tipo !== 'interno') return true
        if (!value) return 'Selecione a página de destino'
        return ROTA_INTERNA_VALUES.includes(value as string)
          ? true
          : `"${value}" não corresponde a nenhuma página cadastrada em src/lib/data.ts ou na lista de rotas fixas`
      }),
    }),
    defineField({
      name:   'linkExterno',
      title:  'Link externo',
      type:   'url',
      hidden: ({ parent }) => parent?.tipo !== 'externo',
      validation: Rule => Rule.custom((value, context) => {
        const tipo = (context.parent as { tipo?: string } | undefined)?.tipo
        if (tipo !== 'externo') return true
        if (!value) return 'Informe o link completo, começando com http:// ou https://'
        return /^https?:\/\//.test(value)
          ? true
          : 'O link precisa começar com http:// ou https://'
      }),
    }),
  ],
  preview: {
    select: { tipo: 'tipo', rotaInterna: 'rotaInterna', linkExterno: 'linkExterno' },
    prepare({ tipo, rotaInterna, linkExterno }) {
      if (tipo === 'whatsapp')  return { title: 'WhatsApp' }
      if (tipo === 'telefone')  return { title: 'Telefone' }
      if (tipo === 'externo')   return { title: linkExterno || 'Link externo (vazio)' }
      return { title: rotaInterna || 'Página do site (vazio)' }
    },
  },
})
