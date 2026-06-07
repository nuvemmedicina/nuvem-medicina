'use client'

import { useEffect } from 'react'

/**
 * RevealInit
 * Ativa a animação de entrada (.reveal → .visible) usando IntersectionObserver.
 *
 * Problemas resolvidos:
 * - Componentes async (streaming SSR) chegam ao DOM depois da hidratação inicial
 *   → MutationObserver observa novos elementos adicionados ao body
 * - rootMargin positivo garante que itens já visíveis ativem imediatamente
 * - Fallback de 2s: qualquer .reveal ainda invisível é mostrado (segurança)
 */
export function RevealInit() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      // rootMargin positivo: elementos entram no "radar" 60px antes de aparecer
      { threshold: 0.05, rootMargin: '60px 0px 60px 0px' },
    )

    // Observa todos os .reveal já presentes no DOM
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el))

    // Observa .reveal de componentes que chegam depois (streaming / async server components)
    const mutationObs = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType !== Node.ELEMENT_NODE) return
          const el = node as Element
          // O próprio nó pode ser .reveal
          if (el.classList?.contains('reveal')) observer.observe(el)
          // Filhos dentro do nó adicionado
          el.querySelectorAll?.('.reveal').forEach((child) => observer.observe(child))
        })
      })
    })
    mutationObs.observe(document.body, { childList: true, subtree: true })

    // Fallback de segurança: após 2s, mostra qualquer .reveal ainda oculto
    const fallback = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.visible)').forEach((el) => {
        el.classList.add('visible')
      })
    }, 2000)

    return () => {
      observer.disconnect()
      mutationObs.disconnect()
      clearTimeout(fallback)
    }
  }, [])

  return null
}
