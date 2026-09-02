// ── IsoSection ────────────────────────────────────────────────────────────────
import { Activity, BookOpen, Shield } from 'lucide-react'
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
    <section
      className="py-28 relative overflow-hidden"
      id="qualidade"
      style={{ background: '#00465F' }}
    >
      {/* Dark grid overlay */}
      <div className="absolute inset-0 dark-grid-bg pointer-events-none" />

      {/* Background "ISO" text */}
      <div
        className="absolute right-[-2%] top-1/2 -translate-y-1/2 font-serif text-[18rem] font-light leading-none pointer-events-none select-none"
        style={{ color: 'rgba(203,228,230,0.05)' }}
      >
        ISO
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-20 items-center">

          {/* Content */}
          <div>
            <p className="sec-tag-dark reveal">Gestão da Qualidade</p>
            <h2 className="sec-title-dark reveal reveal-d1">
              Clínica com<br />
              <em>Certificação ISO 9001</em><br />
              em BH
            </h2>
            <p className="text-[0.98rem] font-light leading-[1.85] mt-4 mb-8 reveal reveal-d2 text-muted-dark">
              A ISO 9001 é o padrão internacional de excelência em gestão. Cada processo,
              do agendamento ao diagnóstico, segue protocolos rigorosos de qualidade,
              rastreabilidade e melhoria contínua.
            </p>

            <div className="flex flex-col gap-3.5 mb-8 reveal reveal-d3">
              {pts.map(pt => (
                <div key={pt} className="flex items-center gap-3 text-[0.9rem] text-muted-dark">
                  <span className="block w-[18px] h-px bg-gold shrink-0" />
                  {pt}
                </div>
              ))}
            </div>

            <div className="border-l-[3px] border-gold bg-white/8 rounded-r-xl px-5 py-4 reveal reveal-d4">
              <strong className="block text-[0.88rem] font-semibold text-white mb-1">
                NUVEM MEDICINA · {CONTATO.crmClinica}
              </strong>
              <span className="text-[0.78rem] text-muted-dark">
                {CONTATO.diretora.nome} · {CONTATO.diretora.crm} · {CONTATO.diretora.rqe}
              </span>
            </div>
          </div>

          {/* Diferenciais da Clínica */}
          <div className="reveal reveal-d2">
            <div className="relative border border-white/15 rounded-[20px] p-9 overflow-hidden" style={{ background: 'rgba(203,228,230,0.1)' }}>
              {/* Top gold line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(201,168,76,.55), transparent)' }} />

              <div className="relative z-10">
                <p className="flex items-center gap-2 text-gold text-[0.72rem] font-bold tracking-[.14em] uppercase mb-5">
                  <span className="w-4 h-px bg-gold" />
                  Diferenciais da Clínica
                </p>

                {/* ISO Badge */}
                <div className="flex items-center gap-3.5 p-4 bg-white border border-gold/25 rounded-xl mb-6 shadow-sm">
                  <IsoSeal size={54} className="shrink-0" />
                  <div>
                    <strong className="block text-[0.88rem] font-semibold text-steel mb-0.5">Certificação ISO 9001</strong>
                    <span className="text-[0.76rem] text-steel/55 leading-snug">
                      Clínica com certificação ISO 9001
                    </span>
                  </div>
                </div>

                {/* Feature list */}
                <div className="flex flex-col gap-2.5">
                  {[
                    {
                      Icon: Activity,
                      title: 'Tecnologia Diagnóstica de Ponta',
                      desc: 'Manometria AR, pHmetria, testes respiratórios H₂/CH₄/H₂S',
                    },
                    {
                      Icon: Shield,
                      title: 'Equipe Multidisciplinar',
                      desc: 'Gastro, fisioterapia pélvica, nefrologia, pediatria',
                    },
                    {
                      Icon: BookOpen,
                      title: 'Centro de Ensino Médico',
                      desc: 'Formação hands-on com certificação validada ISO 9001',
                    },
                  ].map(({ Icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex items-start gap-3 p-3.5 rounded-[12px] bg-white border border-teal/10 hover:border-teal/25 hover:-translate-y-0.5 transition-all cursor-default"
                    >
                      <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center text-teal shrink-0">
                        <Icon className="w-[18px] h-[18px]" />
                      </div>
                      <div>
                        <strong className="block text-[0.86rem] font-semibold text-steel mb-0.5">{title}</strong>
                        <span className="text-[0.75rem] text-steel/55">{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  )
}
