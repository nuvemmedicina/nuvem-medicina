import { Download, FileText } from 'lucide-react'

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
    <div className="not-prose my-6 rounded-xl border border-teal/20 bg-teal/4 px-5 py-4 flex items-center justify-between gap-4 flex-wrap">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-lg bg-teal/12 border border-teal/20 flex items-center justify-center shrink-0">
          <FileText className="w-5 h-5 text-teal" />
        </div>
        <div>
          <p className="text-[0.92rem] font-semibold text-steel leading-snug">{titulo}</p>
          {descricao && <p className="text-[0.78rem] text-steel/55 mt-0.5">{descricao}</p>}
        </div>
      </div>
      <a
        href={url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-teal text-white text-[0.82rem] font-semibold hover:bg-teal/90 transition-colors shrink-0"
      >
        <Download className="w-3.5 h-3.5" />
        {label}
      </a>
    </div>
  )
}
