import type { Metadata } from 'next'
import Link    from 'next/link'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'

export const metadata: Metadata = {
  alternates:  { canonical: '/convenios-medicos' },
  title:       'Convênios Médicos',
  description: 'Confira os planos de saúde e convênios aceitos na NU.V.E.M Medicina em Belo Horizonte.',
}

const CONVENIOS = [
  'Unimed BH', 'Bradesco Saúde', 'Amil',
  'Porto Seguro Saúde', 'Hapvida', 'Plamed', 'Samp',
  'Particular (com recibo)', 'Reembolso (verificar com plano)',
]

export default function ConveniosPage() {
  return (
    <>
      <PageHero
        tag="Convênios"
        title={<>Planos e <em>Convênios</em> aceitos</>}
        desc="Trabalhamos com os principais planos de saúde da região. Consulte também a possibilidade de atendimento particular com emissão de recibo para reembolso."
      />

      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 mb-12">
            {CONVENIOS.map((c, i) => (
              <div key={c} className={`bg-white border border-teal/10 rounded-2xl shadow-sm p-4 text-center text-[0.93rem] font-medium text-steel/65 hover:border-teal/25 hover:text-steel transition-all reveal reveal-d${i % 3}`}>
                {c}
              </div>
            ))}
          </div>

          <div className="border border-teal/15 rounded-xl p-6 text-center" style={{ background: 'rgba(203,228,230,0.18)' }}>
            <h3 className="text-[1rem] font-semibold text-steel mb-2">Não encontrou seu plano?</h3>
            <p className="text-[0.9rem] text-steel/60 mb-4">
              Entre em contato para verificar a cobertura do seu convênio ou as condições para atendimento particular.
            </p>
            <Link href="/contato" className="btn-gold inline-flex">
              Consultar disponibilidade
            </Link>
          </div>

          <CtaBanner title="Agende sua consulta" desc="Nossa equipe verifica a cobertura do seu plano e orienta sobre os próximos passos." />
        </div>
      </SectionWrapper>
    </>
  )
}
