// ── IsoSection ────────────────────────────────────────────────────────────────
import { CONTATO } from '@/lib/data'
import { IsoSeal } from '@/components/icons/IsoSeal'

export function IsoSection() {
  const pts = [
    'Processos clínicos padronizados e auditados externamente',
    'Rastreabilidade completa de exames e prontuários',
    'Treinamentos e certificações educacionais validados',
    'Indicadores de qualidade monitorados continuamente',
    'Segurança e satisfação do paciente como prioridade absoluta',
  ]

  return (
    <section className="py-28 relative overflow-hidden" id="qualidade"
      style={{ background: 'linear-gradient(160deg, #071520 0%, #00293A 50%, #071520 100%)' }}
    >
      {/* Background "ISO" text */}
      <div className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-serif text-[18rem] font-light leading-none pointer-events-none select-none"
        style={{ color: 'rgba(203,228,230,0.025)' }}>
        ISO
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Content */}
          <div>
            <p className="sec-tag reveal">Gestão da Qualidade</p>
            <h2 className="sec-title reveal reveal-d1">
              A única clínica com<br />
              <em>Certificação ISO 9001</em><br />
              no segmento em BH
            </h2>
            <p className="text-[0.88rem] font-light text-muted leading-[1.85] mt-4 mb-8 reveal reveal-d2">
              A ISO 9001 é o padrão internacional de excelência em gestão. Cada processo —
              do agendamento ao diagnóstico — segue protocolos rigorosos de qualidade,
              rastreabilidade e melhoria contínua.
            </p>

            <div className="flex flex-col gap-3 mb-8 reveal reveal-d3">
              {pts.map(pt => (
                <div key={pt} className="flex items-center gap-3 text-[0.83rem] text-muted">
                  <span className="block w-[18px] h-px bg-gold shrink-0" />
                  {pt}
                </div>
              ))}
            </div>

            <div className="border-l-2 border-gold bg-gold-dim rounded-r-lg px-5 py-4 reveal reveal-d4">
              <strong className="block text-[0.82rem] font-semibold text-white mb-1">
                NUVEM MEDICINA · {CONTATO.crmClinica}
              </strong>
              <span className="text-[0.72rem] text-muted">
                {CONTATO.diretora.nome} · {CONTATO.diretora.crm} · {CONTATO.diretora.rqe}
              </span>
            </div>
          </div>

          {/* Real ISO 9001 Seal */}
          <div className="flex justify-center items-center reveal reveal-d2">
            <div className="relative">
              {/* Subtle glow behind the seal */}
              <div
                className="absolute inset-0 rounded-full blur-[60px] opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
              />
              <IsoSeal
                size={280}
                className="relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
