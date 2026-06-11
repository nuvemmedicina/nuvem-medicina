import { ChevronDown } from 'lucide-react'

interface Props {
  value: {
    pergunta: string
    resposta: string
  }
}

export function FaqItem({ value }: Props) {
  const { pergunta, resposta } = value

  return (
    <details className="not-prose my-4 group rounded-xl border border-teal/15 bg-white overflow-hidden shadow-sm open:shadow-md transition-shadow">
      <summary className="flex items-center justify-between gap-4 px-5 py-4 cursor-pointer select-none list-none hover:bg-teal/3 transition-colors">
        <span className="text-[0.95rem] font-semibold text-steel leading-snug">{pergunta}</span>
        <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
      </summary>
      <div className="px-5 pb-5 pt-1 border-t border-teal/10">
        <p className="text-[0.9rem] text-steel/70 leading-[1.78]">{resposta}</p>
      </div>
    </details>
  )
}
