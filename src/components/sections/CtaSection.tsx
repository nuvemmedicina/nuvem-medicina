import { Phone, MapPin, Clock } from 'lucide-react'
import { CONTATO } from '@/lib/data'

const waMsg = encodeURIComponent('Olá! Gostaria de agendar uma consulta na NU.V.E.M Medicina.')

export function CtaSection() {
  return (
    <section
      className="py-28 text-center relative overflow-hidden border-t border-teal/8"
      id="agendar"
      style={{ background: '#d7e7e7' }}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none opacity-40" />

      {/* Radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,70,95,.10) 0%, transparent 70%)' }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-8">
        <div className="reveal">
          <p className="inline-block text-[0.75rem] font-bold tracking-[.16em] uppercase text-teal mb-5">
            Agendar Consulta
          </p>
          <h2
            className="font-serif font-light text-steel leading-tight mb-4"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.6rem)' }}
          >
            Cuide da sua saúde digestiva<br />
            com quem entende <em className="italic text-teal" style={{ fontStyle: 'italic' }}>de verdade</em>
          </h2>
          <p className="text-[0.98rem] font-light text-steel/60 max-w-[520px] mx-auto mb-11 leading-[1.85]">
            Entre em contato para agendar sua consulta ou solicitar informações sobre nossos programas de ensino.
          </p>

          <div className="flex flex-wrap gap-3.5 justify-center mb-12">
            <a
              href={`${CONTATO.whatsappUrl}?text=${waMsg}`}
              target="_blank" rel="noopener noreferrer"
              className="btn-gold"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
              </svg>
              Falar no WhatsApp
            </a>
            <a href={`tel:${CONTATO.telefone.replace(/\D/g, '')}`} className="btn-ghost">
              <Phone className="w-4 h-4" />
              {CONTATO.telefone}
            </a>
          </div>

          <div className="flex flex-wrap gap-8 justify-center">
            {[
              { Icon: MapPin, text: `${CONTATO.endereco} · ${CONTATO.bairro}` },
              { Icon: Clock,  text: CONTATO.horario },
            ].map(({ Icon, text }) => (
              <div key={text} className="flex items-center gap-2.5 text-[0.9rem] text-steel/55">
                <Icon className="w-4 h-4 text-teal shrink-0" />
                {text}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
