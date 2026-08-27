interface Props {
  pergunta?: string
  resposta?: string
}

export function BlocoRespostaDireta({ pergunta, resposta }: Props) {
  if (!resposta) return null

  return (
    <div className="bg-white border border-teal/10 rounded-2xl p-6 shadow-sm">
      {pergunta && (
        <p className="text-[0.68rem] font-bold uppercase tracking-[.12em] text-teal mb-2">{pergunta}</p>
      )}
      <p className="text-[0.95rem] text-steel/75 leading-relaxed">{resposta}</p>
    </div>
  )
}
