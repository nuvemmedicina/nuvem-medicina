import Link    from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { CONTATO } from '@/lib/data'

const waMsg = encodeURIComponent('Olá! Gostaria de agendar uma consulta na NU.V.E.M Medicina.')

interface CtaBannerProps {
  title?:   string
  desc?:    string
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
      style={{
        background:
          'linear-gradient(135deg, rgba(0,70,95,.5) 0%, rgba(0,41,58,.8) 100%)',
        border: '1px solid rgba(203,228,230,.1)',
      }}
    >
      {/* Gold top line */}
      <div className="absolute top-0 left-0 right-0 h-px gold-line" />

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-xl">
          <h2 className="font-serif font-light text-white text-[1.7rem] leading-snug mb-3">
            {title}
          </h2>
          <p className="text-[0.85rem] font-light text-muted leading-relaxed">{desc}</p>
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
              href="https://cursos.nuvemensino.com.br"
              target="_blank" rel="noopener noreferrer"
              className="btn-ghost"
            >
              NU.V.E.M Ensino <ArrowRight className="w-4 h-4" />
            </a>
          )}
        </div>
      </div>
    </div>
  )
}
