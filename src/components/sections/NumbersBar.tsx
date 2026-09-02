// NumbersBar
const NUMBERS = [
  { val: '+2.000', gold: true,  label: 'Avaliações Google',  sub: '★★★★★ Nota máxima' },
  { val: 'ISO 9001', gold: false, label: 'Certificação de Qualidade', sub: 'Gestão certificada BH' },
  { val: '6',     gold: false, label: 'Especialidades',      sub: 'Equipe integrada' },
  { val: '7',     gold: true,  label: 'Tipos de Exames',     sub: 'Alta resolução diagnóstica' },
]

export function NumbersBar() {
  return (
    <div className="bg-white border-y border-teal/8 py-14 relative overflow-hidden">
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-0">
          {NUMBERS.map((n, i) => (
            <div
              key={n.label}
              className={`text-center py-6 px-5 reveal reveal-d${i} relative ${i < NUMBERS.length - 1 ? 'after:absolute after:right-0 after:top-[20%] after:bottom-[20%] after:w-px after:bg-teal/10' : ''}`}
            >
              <span className={`font-serif font-light text-[3.2rem] leading-none block mb-2 ${n.gold ? 'text-gold' : 'text-teal'}`}>
                {n.val}
              </span>
              <div className="text-[0.75rem] font-medium tracking-[.1em] uppercase text-steel/55">{n.label}</div>
              <div className="text-[0.72rem] text-steel/35 mt-1">{n.sub}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
