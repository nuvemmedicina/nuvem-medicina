import type { Metadata } from 'next'
import { AvaliacaoForm } from './AvaliacaoForm'
import { LogoBranco }   from '@/components/icons/LogoBranco'
import { IsoSeal }      from '@/components/icons/IsoSeal'

export const metadata: Metadata = {
  title:       'Avalie sua Experiência · NU.V.E.M Medicina',
  description: 'Conte como foi sua experiência na NU.V.E.M Medicina. Sua opinião nos ajuda a continuar melhorando o atendimento.',
  robots:      { index: false }, // NPS page — don't index
}

export default function AvaliacaoPage() {
  return (
    <div className="min-h-screen bg-ink flex flex-col">
      {/* Top gradient */}
      <div className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(0,70,95,.4) 0%, transparent 60%)',
        }}
      />

      {/* Header */}
      <header className="relative z-10 flex justify-center pt-10 pb-6">
        <a href="/" aria-label="NU.V.E.M Medicina — Página inicial">
          <LogoBranco className="h-10 w-auto opacity-90" />
        </a>
      </header>

      {/* Main */}
      <main className="relative z-10 flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-lg">
          {/* Card */}
          <div className="bg-deep border border-teal-light/10 rounded-2xl overflow-hidden shadow-2xl">
            {/* Gold top line */}
            <div className="h-px w-full bg-gradient-to-r from-transparent via-gold/50 to-transparent" />

            <div className="px-8 pt-8 pb-10">
              {/* ISO + headline */}
              <div className="flex items-center gap-3 mb-6">
                <IsoSeal size={44} />
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[.12em] text-gold">Avaliação de Qualidade ISO 9001</p>
                  <p className="text-[0.72rem] text-muted">Sua opinião faz parte do nosso sistema de gestão</p>
                </div>
              </div>

              <h1 className="font-serif font-light text-white text-[1.9rem] leading-tight mb-2">
                Sua opinião faz a<br />
                <em className="italic text-gold" style={{ fontStyle: 'italic' }}>NU.V.E.M crescer.</em>
              </h1>
              <p className="text-[0.85rem] text-muted mb-8 leading-relaxed">
                Olá! Queremos entender como foi sua experiência conosco.<br />
                Leva menos de 30 segundos. 💙
              </p>

              <AvaliacaoForm />
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-[0.68rem] text-faint mt-6 leading-relaxed px-4">
            Suas respostas são tratadas com confidencialidade conforme a LGPD.<br />
            © {new Date().getFullYear()} NU.V.E.M Medicina · <a href="https://nuvemmedicina.com.br" className="hover:text-teal-light transition-colors">nuvemmedicina.com.br</a>
          </p>
        </div>
      </main>
    </div>
  )
}
