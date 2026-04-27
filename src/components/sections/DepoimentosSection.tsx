// ── DepoimentosSection ────────────────────────────────────────────────────────
import { DEPOIMENTOS } from '@/lib/data'

export function DepoimentosSection() {
  return (
    <section className="py-28 bg-deep border-t border-teal-light/[0.06]" id="depoimentos">
      <div className="max-w-[1240px] mx-auto px-8">

        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-14">
          <div>
            <p className="sec-tag reveal">Depoimentos</p>
            <h2 className="sec-title reveal reveal-d1">O que dizem nossos <em>pacientes e alunos</em></h2>
          </div>
          <div className="reveal reveal-d1 text-right">
            <div className="flex gap-1 justify-end mb-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-gold text-sm">★</span>
              ))}
            </div>
            <div className="text-[0.75rem] text-muted">
              Baseado em <strong className="text-white">1.991 avaliações</strong> no Google
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {DEPOIMENTOS.map((dep, i) => (
            <div
              key={dep.id}
              className={`bg-ink border border-teal-light/[0.08] rounded-[14px] p-7 hover:border-teal-light/[0.18] hover:-translate-y-0.5 transition-all reveal reveal-d${Math.min(i % 3, 4)}`}
            >
              <div className="font-serif text-[2.5rem] font-light text-gold opacity-40 leading-none mb-1.5">&ldquo;</div>
              <p className="text-[0.83rem] font-light text-muted leading-[1.8] mb-5">{dep.text}</p>
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-full bg-teal flex items-center justify-center text-[0.8rem] font-semibold text-teal-light shrink-0">
                  {dep.initials}
                </div>
                <div>
                  <div className="text-[0.8rem] font-semibold text-white">{dep.name}</div>
                  <div className="text-[0.7rem] text-faint">{dep.role}</div>
                  <div className="flex gap-0.5 mt-1">
                    {Array.from({ length: dep.stars }).map((_, j) => (
                      <span key={j} className="text-gold text-[11px]">★</span>
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
