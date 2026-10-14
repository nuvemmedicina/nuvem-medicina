'use client'

import { useEffect, useSyncExternalStore } from 'react'

/**
 * Ponte entre uma página com slug diferente por idioma (artigo do blog) e o
 * LanguageSwitcher, que mora no Navbar do layout e não recebe props da página.
 * A página publica aqui o caminho de cada versão (sem prefixo de idioma), e o
 * seletor só usa esse mapa enquanto estiver no mesmo pathname que o registrou.
 */

type Registro = {
  pathname:  string
  /** Caminho sem prefixo de idioma de cada versão existente. */
  caminhos:  Record<string, string>
  /** Destino para idiomas sem versão (ex.: "/blog"). */
  recuo:     string
}

let atual: Registro | null = null
const ouvintes = new Set<() => void>()

function definir(r: Registro | null) {
  atual = r
  ouvintes.forEach(o => o())
}

function assinar(o: () => void) {
  ouvintes.add(o)
  return () => { ouvintes.delete(o) }
}

export function useTraducoesDaPagina() {
  return useSyncExternalStore(assinar, () => atual, () => null)
}

export function TraducoesDaPagina({ pathname, caminhos, recuo }: Registro) {
  // Serializado para o efeito não rodar de novo a cada render por causa de um objeto novo.
  const chave = JSON.stringify(caminhos)
  useEffect(() => {
    const registro = { pathname, caminhos: JSON.parse(chave), recuo }
    definir(registro)
    return () => { if (atual === registro) definir(null) }
  }, [pathname, chave, recuo])
  return null
}
