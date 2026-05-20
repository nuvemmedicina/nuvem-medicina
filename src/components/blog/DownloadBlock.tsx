import { Download, FileText, ArrowRight } from 'lucide-react'

interface Props {
  value: {
    titulo:     string
    descricao?: string
    url:        string
    label?:     string
  }
}

export function DownloadBlock({ value }: Props) {
  const { titulo, descricao, url, label = 'Baixar material' } = value

  return (
    <div className="not-prose my-8 rounded-2xl overflow-hidden shadow-sm" style={{ background: '#d7e7e7' }}>
      {/* Top accent bar */}
      <div className="h-[3px] bg-gradient-to-r from-teal to-teal/30" />

      <div className="px-6 py-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        {/* Left: icon + text */}
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-white border border-teal/20 shadow-sm flex items-center justify-center shrink-0">
            <FileText className="w-5 h-5 text-teal" />
          </div>
          <div>
            <p className="text-[0.65rem] font-bold uppercase tracking-[.12em] text-teal/70 mb-1">
              Material gratuito
            </p>
            <p className="text-[1rem] font-semibold text-steel leading-snug">{titulo}</p>
            {descricao && (
              <p className="text-[0.82rem] text-steel/60 mt-1 leading-relaxed">{descricao}</p>
            )}
          </div>
        </div>

        {/* Right: CTA button */}
        <a
          href={url}
          target="_blank"
          rel="noopener noreferrer"
          className="group inline-flex items-center gap-2.5 px-5 py-3 rounded-xl bg-teal text-white text-[0.85rem] font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 shrink-0 self-start sm:self-auto"
        >
          <Download className="w-4 h-4" />
          {label}
          <ArrowRight className="w-3.5 h-3.5 opacity-60 group-hover:translate-x-0.5 transition-transform" />
        </a>
      </div>
    </div>
  )
}
