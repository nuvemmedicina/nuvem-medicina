'use client'

import type { ReactNode } from 'react'
import Link from 'next/link'
import { pushEvent } from '@/lib/gtm'
import { resolverHref, ehLinkExterno, type LinkBioDestino } from '@/lib/linkBio'

interface Props {
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
export function LinkBioButton({ rotulo, destino, bloco, posicao, mensagemWhatsapp, className, children }: Props) {
  const href   = resolverHref(destino, mensagemWhatsapp)
  const externo = ehLinkExterno(destino)

  const handleClick = () => {
    pushEvent({ event: 'clique_link_bio', rotulo, destino: href, bloco, posicao })
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
