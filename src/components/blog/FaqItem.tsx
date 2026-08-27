'use client'

import { ChevronDown } from 'lucide-react'
import { pushEvent } from '@/lib/gtm'

interface Props {
  value: {
    pergunta: string
    resposta: string
  }
  artigoTitle?: string
}

const CHAVE_FAQ_ABERTO = 'nuvem-faq-aberto-v1'

/** Dispara `abriu_faq` só na primeira pergunta expandida da sessão, em qualquer artigo. */
function registrarPrimeiraAbertura(artigoTitle?: string) {
  try {
    if (window.sessionStorage.getItem(CHAVE_FAQ_ABERTO)) return
    window.sessionStorage.setItem(CHAVE_FAQ_ABERTO, '1')
  } catch {
    // Armazenamento indisponível (aba anônima, cota excedida): melhor deixar
    // o evento disparar de novo do que perder a medição desta sessão.
  }
  pushEvent({ event: 'abriu_faq', artigo: artigoTitle ?? '' })
}

export function FaqItem({ value, artigoTitle }: Props) {
  const { pergunta, resposta } = value

  return (
    <details
      className="not-prose my-4 group rounded-xl border border-teal/15 bg-white overflow-hidden shadow-sm open:shadow-md transition-shadow"
      onToggle={e => { if (e.currentTarget.open) registrarPrimeiraAbertura(artigoTitle) }}
    >
      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none hover:bg-teal/3 transition-colors">
        <h3 className="text-[0.95rem] font-semibold text-steel leading-snug m-0">{pergunta}</h3>
        <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 pt-1 border-t border-teal/10">
        {/* whitespace-pre-line preserva as quebras de linha que a médica usa
            para separar pontos dentro de uma mesma resposta, sem exigir markup. */}
        <p className="text-[0.9rem] text-steel/70 leading-[1.78] whitespace-pre-line">{resposta}</p>
      </div>
    </details>
  )
}
