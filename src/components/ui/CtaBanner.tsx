import Link    from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { CONTATO } from '@/lib/data'

const waMsg = encodeURIComponent('Olá! Gostaria de agendar uma consulta na NU.V.E.M Medicina.')

interface CtaBannerProps {
  title?:      string
  desc?:       string
  linkEnsino?: boolean
}

export function CtaBanner({
  title = 'Pronto para cuidar da sua saúde digestiva?',
  desc  = 'Agende sua consulta e experimente o padrão de excelência ISO 9001 da NU.V.E.M Medicina.',
  linkEnsino = false,
}: CtaBannerProps) {
  return (
    <div
      className="relative rounded-2xl overflow-hidden p-10 md:p-14 my-16"
      style={{ background: '#00465F' }}
    >
      {/* Dark grid */}
      <div className="absolute inset-0 dark-grid-bg pointer-events-none" />

      {/* Teal top line */}
      <div className="absolute top-0 left-0 right-0 h-[3px] gold-line" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="font-serif font-light text-white text-[1.9rem] leading-snug mb-3">
            {title}
          </h2>
          <p className="text-[0.95rem] font-light text-white/65 leading-relaxed">{desc}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <a
            href={`${CONTATO.whatsappUrl}?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-gold"
          >
            <Calendar className="w-4 h-4" />
            Agendar Consulta
          </a>
          {linkEnsino && (
            <a
              href="https://www.nuvemensino.com.br/"
              target="_blank" rel="noopener noreferrer"
              className="btn-ghost-dark"
            >
              NU.V.E.M Ensino <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
