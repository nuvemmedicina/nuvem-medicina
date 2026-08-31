import { defineType, defineField } from 'sanity'

/**
 * Singleton que alimenta a página /links (o link único da bio do Instagram).
 * Existe porque o bloco "Em destaque" precisa mudar toda semana, acompanhando
 * as publicações do perfil — se depender de deploy, na terceira semana
 * ninguém troca mais. Configurado como documento único em sanity.config.ts
 * (sem opção de criar um segundo).
 */
export const linkBioType = defineType({
  name:  'linkBio',
  title: 'Página de Links',
  type:  'document',
  fields: [
    defineField({
      name:        'posicionamento',
      title:       'Linha de posicionamento',
      description: 'Uma frase curta, exibida abaixo do nome da clínica no topo da página.',
      type:        'string',
      validation:  Rule => Rule.max(100),
    }),
    defineField({
      name:        'chamadaPrincipal',
      title:       'Chamada principal',
      description: 'Botão em destaque no topo da página, normalmente para agendamento.',
      type:        'object',
      fields: [
        defineField({ name: 'rotulo', title: 'Texto do botão', type: 'string', validation: Rule => Rule.required().max(40) }),
        defineField({ name: 'destino', title: 'Destino', type: 'linkDestino', validation: Rule => Rule.required() }),
      ],
      validation: Rule => Rule.required(),
    }),
    defineField({
      name:        'destaques',
      title:       'Em destaque',
      description: 'Itens que acompanham as publicações da semana no Instagram. Até 3 itens.',
      type:        'array',
      of: [{
        type: 'object',
        name: 'destaque',
        fields: [
          defineField({ name: 'rotulo',    title: 'Título do item',    type: 'string', validation: Rule => Rule.required().max(60) }),
          defineField({ name: 'descricao', title: 'Descrição curta',   type: 'string', validation: Rule => Rule.max(100) }),
          defineField({ name: 'destino',   title: 'Destino',           type: 'linkDestino', validation: Rule => Rule.required() }),
          defineField({ name: 'ativo',     title: 'Ativo',             type: 'boolean', initialValue: true }),
        ],
        preview: {
          select: { title: 'rotulo', ativo: 'ativo' },
          prepare({ title, ativo }) {
            return { title, subtitle: ativo === false ? 'Inativo' : 'Ativo' }
          },
        },
      }],
      validation: Rule => Rule.max(3),
    }),
    defineField({
      name:        'blocos',
      title:       'Blocos fixos',
      description: 'Grupos fixos da página, ex.: Exames diagnósticos, Preparos, Convênios, Blog, Fale com a gente.',
      type:        'array',
      of: [{
        type: 'object',
        name: 'bloco',
        fields: [
          defineField({ name: 'titulo', title: 'Título do bloco', type: 'string', validation: Rule => Rule.required().max(40) }),
          defineField({
            name:  'itens',
            title: 'Itens',
            type:  'array',
            of: [{
              type: 'object',
              name: 'itemBloco',
              fields: [
                defineField({ name: 'rotulo',  title: 'Rótulo',  type: 'string', validation: Rule => Rule.required().max(60) }),
                defineField({ name: 'destino', title: 'Destino', type: 'linkDestino', validation: Rule => Rule.required() }),
              ],
              preview: { select: { title: 'rotulo' } },
            }],
            validation: Rule => Rule.min(1),
          }),
        ],
        preview: {
          select: { title: 'titulo', itens: 'itens' },
          prepare({ title, itens }) {
            const total = Array.isArray(itens) ? itens.length : 0
            return { title, subtitle: `${total} item${total === 1 ? '' : 's'}` }
          },
        },
      }],
    }),
    defineField({
      name:        'mensagemWhatsapp',
      title:       'Mensagem padrão do WhatsApp',
      description: 'Texto pré-preenchido quando alguém clica em qualquer destino do tipo WhatsApp nesta página.',
      type:        'text',
      rows:        2,
      validation:  Rule => Rule.max(300),
    }),
    defineField({
      name:        'avisoTemporario',
      title:       'Aviso temporário',
      description: 'Recesso, feriado, mudança de horário. Some da página quando desativado.',
      type:        'object',
      fields: [
        defineField({ name: 'texto', title: 'Texto do aviso', type: 'string', validation: Rule => Rule.max(140) }),
        defineField({ name: 'ativo', title: 'Ativo', type: 'boolean', initialValue: false }),
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: 'Página de Links' }
    },
  },
})
