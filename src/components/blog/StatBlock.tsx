interface StatItem {
  valor: string
  label: string
  fonte?: string
}

interface Props {
  value: {
    titulo?: string
    items:   StatItem[]
  }
}

export function StatBlock({ value }: Props) {
  const { titulo, items = [] } = value
  const cols = items.length <= 2 ? 'grid-cols-2' : items.length === 3 ? 'grid-cols-3' : 'grid-cols-2 md:grid-cols-4'

  return (
    <div className="not-prose my-8 rounded-2xl border border-teal/15 overflow-hidden" style={{ background: '#d7e7e7' }}>
      {titulo && (
        <div className="px-6 pt-5 pb-1">
          <p className="text-[0.7rem] font-bold uppercase tracking-[.12em] text-teal/70">{titulo}</p>
        </div>
      )}
      <div className={`grid ${cols} divide-x divide-teal/10`}>
        {items.map((item, i) => (
          <div key={i} className="px-6 py-5 text-center">
            <span className="font-serif font-light text-[2.2rem] leading-none text-teal block mb-1">
              {item.valor}
            </span>
            <p className="text-[0.78rem] font-medium text-steel/65 leading-snug">{item.label}</p>
            {item.fonte && (
              <p className="text-[0.65rem] text-steel/35 mt-1">{item.fonte}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
