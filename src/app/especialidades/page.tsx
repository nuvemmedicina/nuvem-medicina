import type { Metadata } from 'next'
import Link    from 'next/link'
import { ArrowRight, Activity, Globe, Shield, Users, Heart, Star } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { ESPECIALIDADES } from '@/lib/data'

export const metadata: Metadata = {
  title:       'Especialidades Médicas',
  description: 'Gastroenterologia, fisioterapia pélvica, halitose, pediatria, nefrologia e motilidade digestiva em Belo Horizonte. Equipe multidisciplinar ISO 9001.',
}

const ICON_MAP: Record<string, React.ElementType> = {
  Activity, Globe, Shield, Users, Heart, Star,
}

export default function EspecialidadesPage() {
  return (
    <>
      <PageHero
        tag="Especialidades Médicas"
        title={<>Cuidado integral com <em>precisão diagnóstica</em></>}
        desc="Tratamos desde sintomas comuns até patologias complexas do aparelho digestivo, com abordagem multidisciplinar integrada e baseada em evidências científicas."
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {ESPECIALIDADES.map((esp, i) => {
            const Icon = ICON_MAP[esp.icon] ?? Activity
            return (
              <Link
                key={esp.slug}
                href={`/especialidades/${esp.slug}`}
                className={`group block bg-deep border border-teal-light/[0.08] rounded-2xl p-8 hover:border-teal-light/25 hover:-translate-y-1 transition-all reveal reveal-d${i % 3}`}
              >
                <div className="flex items-start justify-between mb-5">
                  <div className="w-12 h-12 rounded-[10px] border border-teal-light/10 flex items-center justify-center text-teal-light group-hover:border-gold/35 group-hover:bg-gold-dim group-hover:text-gold transition-all">
                    <Icon className="w-[22px] h-[22px]" />
                  </div>
                  <span className="font-serif text-[3rem] font-light text-teal-light/[0.07] leading-none group-hover:text-gold/15 transition-colors">
                    {esp.num}
                  </span>
                </div>
                <h2 className="text-[1rem] font-semibold text-white mb-2.5">{esp.title}</h2>
                <p className="text-[0.82rem] font-light text-muted leading-[1.75] mb-5">{esp.desc}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {esp.tags.map(tag => (
                    <span key={tag} className="text-[0.65rem] font-medium px-2.5 py-1 rounded-full bg-teal-light/[0.06] border border-teal-light/10 text-faint">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-gold border-b border-gold/30 pb-px group-hover:gap-2.5 transition-all">
                  Saiba mais <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </Link>
            )
          })}
        </div>

        <CtaBanner />
      </SectionWrapper>
    </>
  )
}
