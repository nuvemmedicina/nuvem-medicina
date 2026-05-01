'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, Shield, Check, ArrowRight, Download } from 'lucide-react'
import { EXAMES, EXAM_PDFS } from '@/lib/data'
import { cn }     from '@/lib/utils'

const ICON_MAP: Record<string, React.ElementType> = { Clock, Shield, Check }

export function ExamesSection() {
  const [active, setActive] = useState(EXAMES[0].id)
  const current = EXAMES.find(e => e.id === active) ?? EXAMES[0]
  const pdfUrl = EXAM_PDFS[current.id]

  return (
    <section className="py-28 relative overflow-hidden" id="exames"
      style={{ background: 'rgba(203,228,230,0.18)' }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* ── LEFT ── */}
          <div className="lg:sticky lg:top-[100px]">
            <p className="sec-tag reveal">Exames e Diagnósticos</p>
            <h2 className="sec-title reveal reveal-d1">Precisão técnica <em>certificada</em></h2>
            <p className="text-[0.98rem] font-light text-steel/60 leading-[1.85] mt-4 mb-10 reveal reveal-d2">
              Infraestrutura diagnóstica de última geração operada por especialistas com treinamento e certificação ISO 9001.
            </p>

            <div className="flex flex-col reveal reveal-d3 bg-white rounded-2xl border border-teal/10 overflow-hidden shadow-sm">
              {EXAMES.map(exame => (
                <button
                  key={exame.id}
                  onClick={() => setActive(exame.id)}
                  className={cn(
                    'flex items-center gap-4 py-[18px] px-5 border-b border-teal/8 text-left transition-all group last:border-b-0',
                    active === exame.id ? 'bg-teal/5' : 'hover:bg-teal/3',
                  )}
                >
                  <span className={cn(
                    'font-serif text-[1.1rem] w-9 text-center border rounded-md py-0.5 shrink-0 transition-all',
                    active === exame.id
                      ? 'text-teal border-teal/35 bg-teal/8'
                      : 'text-steel/30 border-transparent',
                  )}>
                    {exame.num}
                  </span>
                  <div>
                    <strong className={cn(
                      'block text-[0.9rem] font-semibold mb-0.5 transition-colors',
                      active === exame.id ? 'text-teal' : 'text-steel/65 group-hover:text-steel',
                    )}>
                      {exame.title}
                    </strong>
                    <span className={cn('text-[0.75rem]', active === exame.id ? 'text-teal/55' : 'text-steel/35')}>
                      {exame.subtitle}
                    </span>
                  </div>
                  <ArrowRight className={cn(
                    'w-4 h-4 ml-auto shrink-0 transition-all',
                    active === exame.id ? 'text-teal opacity-100 translate-x-1' : 'text-steel/25 opacity-0 group-hover:opacity-50',
                  )} />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="pt-5">
            <div className="bg-white rounded-2xl border border-teal/10 p-8 shadow-sm">
              <span className="inline-block text-[0.68rem] font-bold tracking-[.12em] uppercase text-gold bg-gold/10 border border-gold/25 px-3 py-1 rounded-full mb-5">
                {current.tag}
              </span>

              <h3 className="font-serif font-light text-steel text-[2rem] leading-snug mb-4">
                {current.title}
              </h3>

              {current.desc.map((p, i) => (
                <p key={i} className="text-[0.93rem] font-light text-steel/65 leading-[1.85] mb-3.5">
                  {p}
                </p>
              ))}

              <div className="flex flex-col gap-2.5 my-7">
                {current.info.map(({ icon, text }) => {
                  const Icon = ICON_MAP[icon] ?? Check
                  return (
                    <div key={text} className="flex items-center gap-3 px-4 py-3 rounded-[10px] bg-teal/5 border border-teal/10 text-[0.88rem] text-steel/65">
                      <Icon className="w-4 h-4 text-teal shrink-0" />
                      {text}
                    </div>
                  )
                })}
              </div>

              <div className="flex flex-wrap gap-3">
                <Link href={`/exames/${current.id}`} className="btn-teal">
                  Saiba mais <ArrowRight className="w-4 h-4" />
                </Link>
                {pdfUrl && (
                  <a
                    href={pdfUrl}
                    download
                    className="btn-download"
                  >
                    <Download className="w-4 h-4" />
                    Baixar Preparo
                  </a>
                )}
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
