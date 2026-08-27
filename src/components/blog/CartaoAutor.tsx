import Image from 'next/image'
import { ShieldCheck } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import type { Autor } from '@/lib/sanity/queries'

interface Props {
  autor:        Autor
  revisadoPor?: Autor
  dataRevisao?: string
}

/**
 * dataRevisao é um campo `date` do Sanity (só "AAAA-MM-DD", sem hora). Passar
 * essa string direto para `new Date()` faz o JS interpretar como meia-noite
 * UTC, que em fusos atrás de UTC (Brasil) exibe o dia anterior. Construir a
 * data a partir dos componentes evita a conversão de fuso.
 */
function formatarData(dataStr: string) {
  const [ano, mes, dia] = dataStr.split('-').map(Number)
  return new Date(ano, mes - 1, dia).toLocaleDateString('pt-BR', { day: '2-digit', month: 'long', year: 'numeric' })
}

export function CartaoAutor({ autor, revisadoPor, dataRevisao }: Props) {
  return (
    <div className="mt-12 pt-8 border-t border-teal/10">
      <div className="flex items-start gap-4">
        {autor.image && (
          <div className="w-14 h-14 rounded-full overflow-hidden shrink-0 relative border border-teal/15">
            <Image src={urlFor(autor.image).width(112).height(112).url()} alt={autor.name} fill className="object-cover" />
          </div>
        )}
        <div>
          <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-teal mb-0.5">Autor</p>
          <p className="text-[0.97rem] font-semibold text-steel">{autor.name}</p>
          {(autor.titulacao || autor.crm) && (
            <p className="text-[0.75rem] text-steel/45 mt-0.5">
              {[autor.titulacao, autor.crm].filter(Boolean).join(' · ')}
            </p>
          )}
          {autor.bio && <p className="text-[0.82rem] text-steel/55 mt-1 leading-relaxed">{autor.bio}</p>}
        </div>
      </div>

      {revisadoPor && (
        <div className="flex items-center gap-2 mt-4 pl-[4.5rem] text-[0.78rem] text-steel/45">
          <ShieldCheck className="w-3.5 h-3.5 text-teal/55 shrink-0" />
          <span>
            Revisão técnica: <span className="font-medium text-steel/60">{revisadoPor.name}</span>
            {dataRevisao && ` · ${formatarData(dataRevisao)}`}
          </span>
        </div>
      )}
    </div>
  )
}
