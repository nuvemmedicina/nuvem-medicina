// ── DepoimentosSection ────────────────────────────────────────────────────────
import { DEPOIMENTOS } from '@/lib/data'

export function DepoimentosSection() {
  return (
    <section className="py-28 bg-white border-t border-teal/8 relative overflow-hidden" id="depoimentos">
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-8">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-14">
          <div>
            <p className="sec-tag reveal">Depoimentos</p>
            <h2 className="sec-title reveal reveal-d1">O que dizem nossos <em>pacientes e alunos</em></h2>
          </div>
          <div className="reveal reveal-d1 text-right">
            <div className="flex gap-1 justify-end mb-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-gold text-lg">★</span>
              ))}
            </div>
            <div className="text-[0.82rem] text-steel/55">
              Baseado em <strong className="text-steel">2.000 avaliações</strong> no Google
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEPOIMENTOS.map((dep, i) => (
            <div
              key={dep.id}
              className={`bg-cloud border border-teal/10 rounded-[14px] p-7 hover:border-teal/25 hover:-translate-y-1 hover:shadow-md transition-all reveal reveal-d${Math.min(i % 3, 4)}`}
            >
              <div className="font-serif text-[2.8rem] font-light text-teal/25 leading-none mb-1.5">&ldquo;</div>
              <p className="text-[0.9rem] font-light text-steel/65 leading-[1.82] mb-5">{dep.text}</p>
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-[0.82rem] font-semibold text-white shrink-0">
                  {dep.initials}
                </div>
                <div>
                  <div className="text-[0.88rem] font-semibold text-steel">{dep.name}</div>
                  <div className="text-[0.75rem] text-steel/45">{dep.role}</div>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: dep.stars }).map((_, j) => (
                      <span key={j} className="text-gold text-[12px]">★</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
