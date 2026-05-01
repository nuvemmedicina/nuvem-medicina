import Link from 'next/link'
import { ArrowRight, Activity, Globe, Shield, Users, Heart, Star } from 'lucide-react'
import { ESPECIALIDADES } from '@/lib/data'

const ICON_MAP: Record<string, React.ElementType> = {
  Activity, Globe, Shield, Users, Heart, Star,
}

export function EspecialidadesSection() {
  return (
    <section className="section bg-cloud py-28 relative overflow-hidden" id="especialidades">
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-14">
          <div className="max-w-xl">
            <p className="sec-tag reveal">Especialidades Médicas</p>
            <h2 className="sec-title reveal reveal-d1">
              Cuidado integral com <em>precisão diagnóstica</em>
            </h2>
            <p className="text-[0.98rem] font-light text-steel/60 leading-[1.85] mt-4 reveal reveal-d2">
              Tratamos desde sintomas comuns até patologias complexas do aparelho digestivo,
              com abordagem integrada e baseada em evidências científicas.
            </p>
          </div>
          <Link
            href="/especialidades"
            className="reveal reveal-d2 inline-flex items-center gap-2 text-teal text-[0.88rem] font-semibold border-b-2 border-teal/25 pb-0.5 hover:border-teal hover:gap-3.5 transition-all shrink-0"
          >
            Ver todas as especialidades <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-teal/8 rounded-2xl overflow-hidden">
          {ESPECIALIDADES.map((esp, i) => {
            const Icon = ICON_MAP[esp.icon] ?? Activity
            return (
              <Link
                key={esp.slug}
                href={`/especialidades/${esp.slug}`}
                className={`group block bg-white p-9 relative overflow-hidden hover:bg-teal transition-colors reveal reveal-d${Math.min(i % 3, 4)}`}
              >
                {/* Decorative number */}
                <span className="absolute top-5 right-6 font-serif text-[3.5rem] font-light text-teal/[0.07] leading-none group-hover:text-white/10 transition-colors pointer-events-none select-none">
                  {esp.num}
                </span>

                {/* Bottom teal line on hover → transforms to white on dark bg */}
                <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-teal to-transparent opacity-0 group-hover:opacity-0 transition-opacity" />

                {/* Icon */}
                <div className="w-12 h-12 rounded-[10px] border border-teal/15 flex items-center justify-center text-teal mb-5 group-hover:border-white/30 group-hover:bg-white/15 group-hover:text-white transition-all">
                  <Icon className="w-[22px] h-[22px]" />
                </div>

                <h3 className="text-[1rem] font-semibold text-steel mb-2.5 group-hover:text-white transition-colors">{esp.title}</h3>
                <p className="text-[0.88rem] font-light text-steel/60 leading-[1.75] mb-4 group-hover:text-white/75 transition-colors">{esp.desc}</p>

                <div className="flex flex-wrap gap-1.5">
                  {esp.tags.map(tag => (
                    <span
                      key={tag}
                      className="text-[0.68rem] font-medium tracking-[.05em] px-2.5 py-1 rounded-full bg-teal/8 border border-teal/12 text-steel/55 group-hover:bg-white/15 group-hover:border-white/20 group-hover:text-white/80 transition-all"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Arrow on hover */}
                <ArrowRight className="absolute bottom-7 right-7 w-4 h-4 text-teal opacity-0 group-hover:text-white group-hover:opacity-70 transition-all" />
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
