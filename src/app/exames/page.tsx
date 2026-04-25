import type { Metadata } from 'next'
import Link    from 'next/link'
import { ArrowRight, Clock, Shield, Check } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { EXAMES }         from '@/lib/data'

export const metadata: Metadata = {
  title:       'Exames e Diagnósticos',
  description: 'Manometria de alta resolução, pHmetria, testes respiratórios, halimetria e avaliação pélvica em Belo Horizonte. Certificação ISO 9001.',
}

export default function ExamesPage() {
  return (
    <>
      <PageHero
        tag="Exames e Diagnósticos"
        title={<>Precisão técnica <em>certificada</em></>}
        desc="Infraestrutura diagnóstica de última geração operada por especialistas com treinamento e certificação ISO 9001 — os resultados mais confiáveis do segmento."
      />

      <SectionWrapper>
        <div className="space-y-5">
          {EXAMES.map((exame, i) => (
            <Link
              key={exame.id}
              href={`/exames/${exame.id}`}
              className={`group flex flex-col md:flex-row md:items-center gap-6 bg-deep border border-teal-light/[0.08] rounded-2xl p-8 hover:border-teal-light/25 hover:-translate-y-0.5 transition-all reveal reveal-d${i % 3}`}
            >
              <div className="shrink-0">
                <span className="font-serif text-[3.5rem] font-light text-teal-light/[0.1] leading-none group-hover:text-gold/20 transition-colors">
                  {exame.num}
                </span>
              </div>

              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-3 mb-2">
                  <span className="text-[0.65rem] font-bold tracking-[.1em] uppercase text-gold bg-gold-dim border border-gold-line px-2.5 py-0.5 rounded-full">
                    {exame.tag}
                  </span>
                </div>
                <h2 className="text-[1rem] font-semibold text-white mb-1">{exame.title}</h2>
                <p className="text-[0.8rem] text-muted mb-3">{exame.subtitle}</p>
                <p className="text-[0.82rem] font-light text-muted leading-[1.7]">{exame.desc[0]}</p>
              </div>

              <div className="shrink-0 flex flex-col gap-2 md:w-48">
                {exame.info.slice(0, 2).map(({ text }) => (
                  <div key={text} className="flex items-center gap-2 text-[0.72rem] text-faint">
                    <span className="w-1 h-1 rounded-full bg-gold/50 shrink-0" />
                    {text}
                  </div>
                ))}
                <span className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-gold mt-2 group-hover:gap-2.5 transition-all">
                  Ver detalhes <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* Preparos link */}
        <div className="mt-8 p-6 bg-deep border border-teal-light/[0.08] rounded-xl flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h3 className="text-[0.92rem] font-semibold text-white mb-1">Preparos para Exames</h3>
            <p className="text-[0.8rem] text-muted">Guia completo de como se preparar para cada exame da NU.V.E.M.</p>
          </div>
          <Link href="/exames/preparos" className="btn-ghost shrink-0">
            Ver preparos <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <CtaBanner />
      </SectionWrapper>
    </>
  )
}
