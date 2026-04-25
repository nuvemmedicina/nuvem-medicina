'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Clock, Shield, Check, ArrowRight } from 'lucide-react'
import { EXAMES } from '@/lib/data'
import { cn }     from '@/lib/utils'

const ICON_MAP: Record<string, React.ElementType> = { Clock, Shield, Check }

export function ExamesSection() {
  const [active, setActive] = useState(EXAMES[0].id)
  const current = EXAMES.find(e => e.id === active) ?? EXAMES[0]

  return (
    <section className="py-28 bg-deep border-y border-teal-light/[0.06]" id="exames">
      <div className="max-w-[1240px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-start">

          {/* ── LEFT ── */}
          <div className="lg:sticky lg:top-[100px]">
            <p className="sec-tag reveal">Exames e Diagnósticos</p>
            <h2 className="sec-title reveal reveal-d1">Precisão técnica <em>certificada</em></h2>
            <p className="text-[0.9rem] font-light text-muted leading-[1.85] mt-4 mb-10 reveal reveal-d2">
              Infraestrutura diagnóstica de última geração operada por especialistas com treinamento e certificação ISO 9001.
            </p>

            <div className="flex flex-col reveal reveal-d3">
              {EXAMES.map(exame => (
                <button
                  key={exame.id}
                  onClick={() => setActive(exame.id)}
                  className={cn(
                    'flex items-center gap-4 py-[18px] border-b border-teal-light/[0.06] text-left transition-all group',
                    active === exame.id ? 'pl-2' : 'hover:pl-2',
                  )}
                >
                  <span className={cn(
                    'font-serif text-[1.1rem] w-9 text-center border rounded-md py-0.5 shrink-0 transition-all',
                    active === exame.id
                      ? 'text-gold border-gold/35'
                      : 'text-faint border-transparent',
                  )}>
                    {exame.num}
                  </span>
                  <div>
                    <strong className={cn(
                      'block text-[0.85rem] font-semibold mb-0.5 transition-colors',
                      active === exame.id ? 'text-white' : 'text-muted group-hover:text-white',
                    )}>
                      {exame.title}
                    </strong>
                    <span className="text-[0.72rem] text-faint">{exame.subtitle}</span>
                  </div>
                  <ArrowRight className={cn(
                    'w-4 h-4 ml-auto shrink-0 transition-all',
                    active === exame.id ? 'text-gold opacity-100 translate-x-1' : 'text-faint opacity-0 group-hover:opacity-60',
                  )} />
                </button>
              ))}
            </div>
          </div>

          {/* ── RIGHT ── */}
          <div className="pt-5">
            <span className="inline-block text-[0.65rem] font-bold tracking-[.12em] uppercase text-gold bg-gold-dim border border-gold-line px-3 py-1 rounded-full mb-5">
              {current.tag}
            </span>

            <h3 className="font-serif font-light text-white text-[1.9rem] leading-snug mb-4">
              {current.title}
            </h3>

            {current.desc.map((p, i) => (
              <p key={i} className="text-[0.85rem] font-light text-muted leading-[1.85] mb-3.5">
                {p}
              </p>
            ))}

            <div className="flex flex-col gap-2.5 my-7">
              {current.info.map(({ icon, text }) => {
                const Icon = ICON_MAP[icon] ?? Check
                return (
                  <div key={text} className="flex items-center gap-3 px-4 py-3 rounded-[10px] bg-teal-light/[0.03] border border-teal-light/[0.07] text-[0.8rem] text-muted">
                    <Icon className="w-4 h-4 text-gold shrink-0" />
                    {text}
                  </div>
                )
              })}
            </div>

            <Link
              href={`/exames/${current.id}`}
              className="btn-gold inline-flex"
            >
              Agendar este Exame <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

        </div>
      </div>
    </section>
  )
}
