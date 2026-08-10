import type { Metadata } from 'next'
import { AvaliacaoForm } from './AvaliacaoForm'
import { IsoSeal }      from '@/components/icons/IsoSeal'

export const metadata: Metadata = {
  alternates:  { canonical: '/avaliacao' },
  title:       'Avalie sua Experiência · NU.V.E.M Medicina',
  description: 'Conte como foi sua experiência na NU.V.E.M Medicina. Sua opinião nos ajuda a continuar melhorando o atendimento.',
  robots:      { index: false }, // NPS page — don't index
}

export default function AvaliacaoPage() {
  return (
    <div className="min-h-screen bg-cloud flex flex-col">
      {/* Top gradient bar */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #00465F, #0e7fa5)' }} />

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-lg">
          {/* Card */}
          <div className="bg-white border border-teal/12 rounded-2xl overflow-hidden shadow-xl">
            {/* Teal top line */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #00465F, #0e7fa5)' }} />

            <div className="px-8 pt-8 pb-10">
              {/* ISO + headline */}
              <div className="flex items-center gap-3 mb-6">
                <IsoSeal size={44} />
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[.12em] text-teal">Avaliação de Qualidade ISO 9001</p>
                  <p className="text-[0.72rem] text-steel/60">Sua opinião faz parte do nosso sistema de gestão</p>
                </div>
              </div>

              <h1 className="font-serif font-light text-steel text-[1.9rem] leading-tight mb-2">
                Sua opinião faz a<br />
                <em className="italic text-teal" style={{ fontStyle: 'italic' }}>NU.V.E.M crescer.</em>
              </h1>
              <p className="text-[0.85rem] text-steel/65 mb-8 leading-relaxed">
                Olá! Queremos entender como foi sua experiência conosco.<br />
                Leva menos de 30 segundos. 💙
              </p>

              <AvaliacaoForm />
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-[0.68rem] text-steel/40 mt-6 leading-relaxed px-4">
            Suas respostas são tratadas com confidencialidade conforme a LGPD.<br />
            © {new Date().getFullYear()} NU.V.E.M Medicina · <a href="https://www.nuvemmedicina.com.br" className="hover:text-teal transition-colors">nuvemmedicina.com.br</a>
          </p>
        </div>
      </main>
    </div>
  )
}
