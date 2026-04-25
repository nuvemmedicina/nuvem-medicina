import Link from 'next/link'
import { ArrowRight, Activity, Globe, Shield, Users, Heart, Star } from 'lucide-react'
import { ESPECIALIDADES } from '@/lib/data'

const ICON_MAP: Record<string, React.ElementType> = {
  Activity, Globe, Shield, Users, Heart, Star,
}

export function EspecialidadesSection() {
  return (
    <section className="section bg-ink py-28" id="especialidades">
      <div className="max-w-[1240px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-14">
          <div className="max-w-xl">
            <p className="sec-tag reveal">Especialidades Médicas</p>
            <h2 className="sec-title reveal reveal-d1">
              Cuidado integral com <em>precisão diagnóstica</em>
            </h2>
            <p className="text-[0.9rem] font-light text-muted leading-[1.85] mt-4 reveal reveal-d2">
              Tratamos desde sintomas comuns até patologias complexas do aparelho digestivo,
              com abordagem integrada e baseada em evidências científicas.
            </p>
          </div>
          <Link
            href="/especialidades"
            className="reveal reveal-d2 inline-flex items-center gap-2 text-gold text-[0.8rem] font-medium border-b border-gold/35 pb-0.5 hover:gap-3.5 transition-all shrink-0"
          >
            Ver todas as especialidades <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-teal-light/[0.06] rounded-2xl overflow-hidden">
          {ESPECIALIDADES.map((esp, i) => {
            const Icon = ICON_MAP[esp.icon] ?? Activity
            return (
              <Link
                key={esp.slug}
                href={`/especialidades/${esp.slug}`}
                className={`group block bg-deep p-9 relative overflow-hidden hover:bg-[#0A1A24] transition-colors reveal reveal-d${Math.min(i % 3, 4)}`}
              >
                {/* Decorative number */}
                <span className="absolute top-5 right-6 font-serif text-[3.5rem] font-light text-teal-light/[0.07] leading-none group-hover:text-gold/15 transition-colors pointer-events-none select-none">
                  {esp.num}
                </span>

                {/* Bottom gold line on hover */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent opacity-0 group-hover:opacity-60 transition-opacity" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-[10px] border border-teal-light/10 flex items-center justify-center text-teal-light mb-5 group-hover:border-gold/35 group-hover:bg-gold-dim group-hover:text-gold transition-all">
                  <Icon className="w-[22px] h-[22px]" />
                </div>

                <h3 className="text-[0.95rem] font-semibold text-white mb-2.5">{esp.title}</h3>
                <p className="text-[0.8rem] font-light text-muted leading-[1.75] mb-4">{esp.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {esp.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[0.65rem] font-medium tracking-[.05em] px-2.5 py-1 rounded-full bg-teal-light/[0.06] border border-teal-light/10 text-faint"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
