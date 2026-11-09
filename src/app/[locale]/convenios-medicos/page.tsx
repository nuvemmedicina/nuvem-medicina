import type { Metadata } from 'next'
import Link    from 'next/link'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import {
  CONVENIOS_NA_PAGINA,
  EXAMES_POR_CONVENIO,
  REGRAS_CONVENIO,
  DOCUMENTOS_LEVAR,
  UNIMED_PLANOS,
} from '@/lib/convenios'

export const metadata: Metadata = {
  alternates:  { canonical: '/convenios-medicos' },
  title:       'Convênios Médicos',
  description: 'Convênios aceitos na NU.V.E.M Medicina por profissional e por exame. Todos os profissionais também atendem particular, com recibo para reembolso.',
}

// Lista oficial e regras em src/lib/convenios.ts (versão de 09/11/2026).
export default function ConveniosPage() {
  return (
    <>
      <PageHero
        tag="Convênios"
        title={<>Planos e <em>Convênios</em> aceitos</>}
        desc="Os convênios aceitos dependem do profissional e do exame. Todos os profissionais também atendem particular, com recibo para reembolso."
      />

      <SectionWrapper>
        <div className="max-w-4xl mx-auto space-y-12">

          {/* Consultas, por profissional */}
          <div>
            <h2 className="font-serif font-light text-steel text-[1.7rem] leading-snug mb-2">Consultas por profissional</h2>
            <p className="text-[0.92rem] text-steel/60 mb-5">
              Profissionais que atendem por convênio. Para os demais profissionais, a recepção informa as
              condições de atendimento. Se o seu plano não estiver na lista do profissional, a consulta pode
              ser feita de forma particular.
            </p>
            <ul className="divide-y divide-teal/10 border border-teal/10 rounded-2xl bg-white shadow-sm">
              {CONVENIOS_NA_PAGINA.map(p => (
                <li key={p.nome} className="grid gap-1 sm:grid-cols-[minmax(0,1fr)_minmax(0,1.6fr)] sm:gap-6 p-4 sm:p-5">
                  <div>
                    <p className="text-[0.95rem] font-semibold text-steel">{p.nome}</p>
                    <p className="text-[0.8rem] text-steel/50">{p.area}</p>
                  </div>
                  <p className="text-[0.9rem] text-steel/70 leading-relaxed">{p.convenios}</p>
                </li>
              ))}
            </ul>
          </div>

          {/* Exames */}
          <div>
            <h2 className="font-serif font-light text-steel text-[1.7rem] leading-snug mb-2">Exames</h2>
            <p className="text-[0.92rem] text-steel/60 mb-5">
              Pela {UNIMED_PLANOS}, a clínica realiza somente os exames abaixo. Os demais exames são particulares.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              {EXAMES_POR_CONVENIO.map(e => (
                <div key={e} className="bg-white border border-teal/10 rounded-2xl shadow-sm p-4 text-center text-[0.93rem] font-medium text-steel/70">
                  {e}
                </div>
              ))}
            </div>
          </div>

          {/* Regras e documentos */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="border border-teal/15 rounded-2xl p-6" style={{ background: 'rgba(203,228,230,0.18)' }}>
              <h3 className="text-[1rem] font-semibold text-steel mb-3">Como funciona</h3>
              <ul className="space-y-2.5 text-[0.9rem] text-steel/65 leading-relaxed list-disc pl-5">
                {REGRAS_CONVENIO.map(r => <li key={r}>{r}</li>)}
              </ul>
            </div>
            <div className="border border-teal/15 rounded-2xl p-6 bg-white">
              <h3 className="text-[1rem] font-semibold text-steel mb-3">O que levar</h3>
              <ul className="space-y-2.5 text-[0.9rem] text-steel/65 leading-relaxed list-disc pl-5">
                {DOCUMENTOS_LEVAR.map(d => <li key={d}>{d}</li>)}
              </ul>
            </div>
          </div>

          <div className="border border-teal/15 rounded-xl p-6 text-center" style={{ background: 'rgba(203,228,230,0.18)' }}>
            <h3 className="text-[1rem] font-semibold text-steel mb-2">Dúvida sobre o seu plano?</h3>
            <p className="text-[0.9rem] text-steel/60 mb-4">
              Fale com a recepção antes de agendar. A cobertura e a autorização dependem das regras do seu convênio.
            </p>
            <Link href="/contato" className="btn-gold inline-flex">
              Falar com a recepção
            </Link>
          </div>

          <CtaBanner title="Agende sua consulta" desc="A recepção confirma o profissional, o convênio e o que levar no dia." />
        </div>
      </SectionWrapper>
    </>
  )
}
