'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { pushEvent, tipoAtendimentoDoCaminho } from '@/lib/gtm'
import { resolverHref, ehLinkExterno, type LinkBioDestino } from '@/lib/linkBio'

interface Props {
  /** Texto do botão. Só para leitura de quem chama: não vai para o dataLayer. */
  rotulo:            string
  destino:           LinkBioDestino
  bloco:             string
  posicao:           number
  mensagemWhatsapp?: string
  className?:        string
  children:          ReactNode
}

/**
 * Único ponto de JavaScript no cliente da página /links: dispara o evento de
 * clique e decide entre <Link> (navegação interna, sem parâmetro de campanha)
 * e <a> (WhatsApp, telefone, link externo). Ver documentação em
 * docs/utm-links-bio.md sobre por que os links internos não levam UTM.
 */
export function LinkBioButton({ destino, bloco, posicao, mensagemWhatsapp, className, children }: Props) {
  const href   = resolverHref(destino, mensagemWhatsapp)
  const externo = ehLinkExterno(destino)

  // Sem `rotulo` e sem `destino`: nos itens de exame o rótulo é o nome do exame
  // e o destino é a página dele, e a escolha da pessoa por um exame específico
  // não entra no dataLayer (ver src/lib/gtm.ts). Bloco e posição identificam o
  // botão; o tipo de destino e o tipo de atendimento dizem para onde ele leva.
  const handleClick = () => {
    pushEvent({
      event:            'clique_link_bio',
      tipo_destino:     destino.tipo,
      tipo_atendimento: destino.tipo === 'interno' ? tipoAtendimentoDoCaminho(href) : 'institucional',
      bloco,
      posicao,
    })
  }

  if (destino.tipo === 'interno') {
    return (
      <Link href={href} className={className} onClick={handleClick}>
        {children}
      </Link>
    )
  }

  return (
    <a
      href={href}
      target={externo ? '_blank' : undefined}
      rel={externo ? 'noopener noreferrer' : undefined}
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  )
}
