'use client'

import { useState } from 'react'
import { ChevronDown, BookOpen, ExternalLink } from 'lucide-react'
import type { Reference } from '@/lib/sanity/queries'

interface Props {
  references: Reference[]
}

export function ReferencesAccordion({ references }: Props) {
  const [open, setOpen] = useState(false)

  if (!references || references.length === 0) return null

  return (
    <div className="mt-12 border border-teal/15 rounded-2xl overflow-hidden">
      {/* Header — clicável */}
      <button
        onClick={() => setOpen(prev => !prev)}
        className="w-full flex items-center justify-between px-6 py-4 text-left hover:bg-teal/5 transition-colors"
        aria-expanded={open}
      >
        <span className="flex items-center gap-2.5 text-[0.88rem] font-semibold text-steel uppercase tracking-[.08em]">
          <BookOpen className="w-4 h-4 text-teal" />
          Referências Bibliográficas
          <span className="text-[0.72rem] font-normal normal-case tracking-normal text-steel/40">
            ({references.length})
          </span>
        </span>
        <ChevronDown
          className={`w-4 h-4 text-teal/60 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
        />
      </button>

      {/* Conteúdo expansível */}
      <div
        className={`transition-all duration-300 ease-in-out overflow-hidden ${open ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'}`}
      >
        <ol className="px-6 pb-6 pt-2 space-y-3 border-t border-teal/10 list-none">
          {references.map((ref, i) => (
            <li key={ref._key} className="flex gap-3">
              <span className="shrink-0 mt-0.5 w-5 h-5 rounded-full bg-teal/10 flex items-center justify-center text-[0.62rem] font-bold text-teal">
                {i + 1}
              </span>
              <p className="text-[0.82rem] text-steel/65 leading-relaxed">
                {ref.citation}
                {ref.url && (
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ml-1.5 inline-flex items-center gap-0.5 text-teal hover:underline"
                  >
                    <ExternalLink className="w-3 h-3" />
                    <span className="text-[0.75rem]">DOI</span>
                  </a>
                )}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </div>
  )
}
