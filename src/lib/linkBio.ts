import { CONTATO, EXAMES } from '@/lib/data'

// ─── Tipos ──────────────────────────────────────────────────────────────────
// Espelham o schema em src/sanity/schemaTypes/linkBio.ts e linkDestino.ts.

export type LinkBioTipoDestino = 'interno' | 'externo' | 'whatsapp' | 'telefone'

export type LinkBioDestino = {
  tipo:         LinkBioTipoDestino
  rotaInterna?: string
  linkExterno?: string
}

export type LinkBioItem = {
  _key:    string
  rotulo:  string
  destino: LinkBioDestino
}

export type LinkBioDestaque = LinkBioItem & {
  descricao?: string
  ativo?:     boolean
}

export type LinkBioBloco = {
  _key:   string
  titulo: string
  itens:  LinkBioItem[]
}

export type LinkBio = {
  posicionamento?:    string
  chamadaPrincipal:   { rotulo: string; destino: LinkBioDestino }
  destaques?:         LinkBioDestaque[]
  blocos?:            LinkBioBloco[]
  mensagemWhatsapp?:  string
  avisoTemporario?:   { texto?: string; ativo?: boolean }
}

/**
 * Conteúdo inicial do singleton, usado em duas situações:
 *  1. Como retorno da página quando o documento ainda não existe no Sanity
 *     (site publicado antes da primeira edição no Studio, ou Sanity fora do ar).
 *  2. Como fonte para scripts/seed-link-bio.mjs, que grava esta mesma lista
 *     como o primeiro documento — assim o valor inicial só é escrito uma vez,
 *     aqui.
 *
 * Rótulos e a linha de posicionamento são propositalmente genéricos: texto
 * médico e de marketing é decisão da clínica, não do código.
 */
export const DEFAULT_LINK_BIO: LinkBio = {
  posicionamento: 'Texto provisório — atualizar no Studio.',
  chamadaPrincipal: {
    rotulo:  'Agendar consulta',
    destino: { tipo: 'interno', rotaInterna: '/agendar' },
  },
  destaques: [],
  blocos: [
    {
      _key:   'bloco-convenios',
      titulo: 'Convênios',
      itens: [
        { _key: 'item-convenios', rotulo: 'Convênios atendidos', destino: { tipo: 'interno', rotaInterna: '/convenios-medicos' } },
      ],
    },
    {
      _key:   'bloco-exames',
      titulo: 'Exames diagnósticos',
      itens: EXAMES.map(exame => ({
        _key:    `item-exame-${exame.id}`,
        rotulo:  exame.title,
        destino: { tipo: 'interno' as const, rotaInterna: `/exames/${exame.id}` },
      })),
    },
    {
      _key:   'bloco-preparos',
      titulo: 'Preparos',
      itens: [
        { _key: 'item-preparos', rotulo: 'Preparos para exames', destino: { tipo: 'interno', rotaInterna: '/exames/preparos' } },
      ],
    },
    {
      _key:   'bloco-blog',
      titulo: 'Blog',
      itens: [
        { _key: 'item-blog', rotulo: 'Blog da NU.V.E.M', destino: { tipo: 'interno', rotaInterna: '/blog' } },
      ],
    },
    {
      _key:   'bloco-contato',
      titulo: 'Fale com a gente',
      itens: [
        { _key: 'item-whatsapp',  rotulo: 'WhatsApp',    destino: { tipo: 'whatsapp' } },
        { _key: 'item-telefone',  rotulo: 'Telefone',    destino: { tipo: 'telefone' } },
        { _key: 'item-como-chegar', rotulo: 'Como chegar', destino: { tipo: 'externo', linkExterno: CONTATO.maps } },
      ],
    },
  ],
  mensagemWhatsapp: 'Olá! Vim pelo link da bio e gostaria de agendar uma consulta ou exame na NU.V.E.M Medicina.',
  avisoTemporario: { texto: '', ativo: false },
}

/** Resolve o destino gravado no Sanity para o href final do elemento. */
export function resolverHref(destino: LinkBioDestino, mensagemWhatsapp?: string): string {
  switch (destino.tipo) {
    case 'externo':
      return destino.linkExterno ?? '#'
    case 'whatsapp': {
      const msg = mensagemWhatsapp ?? DEFAULT_LINK_BIO.mensagemWhatsapp ?? ''
      return `${CONTATO.whatsappUrl}?text=${encodeURIComponent(msg)}`
    }
    case 'telefone':
      return `tel:${CONTATO.telefone.replace(/\D/g, '')}`
    case 'interno':
    default:
      return destino.rotaInterna ?? '/'
  }
}

/** Links externos (WhatsApp e site de terceiros) abrem em nova aba; internos e tel: não. */
export function ehLinkExterno(destino: LinkBioDestino): boolean {
  return destino.tipo === 'externo' || destino.tipo === 'whatsapp'
}
