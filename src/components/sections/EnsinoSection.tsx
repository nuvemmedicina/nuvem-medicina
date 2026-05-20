import Link from 'next/link'
import { ExternalLink } from 'lucide-react'
import { renderRich } from '@/lib/rich'

const STEPS = [
  {
    num: '1', label: 'Fase 01', highlight: false,
    title: 'Atualização Teórica',
    desc: 'Protocolos baseados em evidências, com novas diretrizes para H. pylori, SIBO, IMO e distúrbios funcionais digestivos com especialistas da clínica.',
  },
  {
    num: '2', label: 'Fase 02', highlight: false,
    title: 'Simulação Interdisciplinar',
    desc: 'Discussão de casos reais da Clínica NU.V.E.M, integrando gastroenterologia, cirurgia pediátrica e fisioterapia em cenários clínicos complexos.',
  },
  {
    num: '3', label: 'Fase 03: Premium', highlight: true,
    title: 'Imersão Hands-On',
    desc: 'Treinamento prático presencial com equipamentos de ponta na NU.V.E.M. Domínio da execução técnica e certificação ISO 9001 incluída.',
  },
]

const MULT = [
  { num: '4', label: 'Fase 04', highlight: false,
    title: 'Validação Clínica Diária',
    desc: 'Casos reais da clínica moldam os treinamentos e a produção de conteúdo científico atualizado.' },
  { num: '5', label: 'Fase 05', highlight: false,
    title: 'Treinamento de Elite',
    desc: 'Especialistas repassam expertise prática e domínio técnico para médicos, fisioterapeutas e alunos.' },
  { num: '6', label: 'Fase 06: Resultado', highlight: true,
    title: 'Elevação da Prática Médica',
    desc: 'Alunos levam a excelência para seus consultórios. O Efeito Multiplicador NU.V.E.M em ação.' },
]

export function EnsinoSection() {
  return (
    <section className="py-28 bg-cloud border-t border-teal/8 overflow-hidden" id="ensino">

      <div className="max-w-[1240px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-14">
          <div className="max-w-xl">
            <p className="sec-tag reveal">NU.V.E.M Ensino</p>
            <h2 className="sec-title reveal reveal-d1">A Elevação da <em>Prática Clínica</em></h2>
            <p className="text-[0.98rem] font-light text-steel/60 leading-[1.85] mt-4 reveal reveal-d2">
              Formação interdisciplinar para médicos, fisioterapeutas e especialistas.
              Do conceito à maestria, com metodologia baseada em casos reais.
            </p>
          </div>
          <a
            href="https://cursos.nuvemensino.com.br"
            target="_blank" rel="noopener noreferrer"
            className="reveal reveal-d2 inline-flex items-center gap-2 text-teal text-[0.88rem] font-semibold border-b-2 border-teal/25 pb-0.5 hover:border-teal hover:gap-3.5 transition-all shrink-0"
          >
            Acessar NU.V.E.M Ensino <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-teal/8 rounded-2xl overflow-hidden mb-3 reveal">
          {STEPS.map(step => (
            <div
              key={step.num}
              className={`relative p-9 overflow-hidden transition-all ${
                step.highlight
                  ? 'bg-teal'
                  : 'bg-white hover:bg-teal/5'
              }`}
            >
              <span
                className="absolute top-4 right-5 font-serif text-[4rem] font-light leading-none pointer-events-none select-none"
                style={{ color: step.highlight ? 'rgba(255,255,255,0.1)' : 'rgba(0,70,95,0.06)' }}
              >
                {step.num}
              </span>
              <span className={`text-[0.68rem] font-bold tracking-[.12em] uppercase block mb-4 ${step.highlight ? 'text-gold' : 'text-teal'}`}>
                {step.label}
              </span>
              <h3 className={`text-[1rem] font-semibold mb-2.5 ${step.highlight ? 'text-white' : 'text-steel'}`}>{step.title}</h3>
              <p className={`text-[0.85rem] font-light leading-[1.75] mb-4 ${step.highlight ? 'text-white/75' : 'text-steel/60'}`}>{renderRich(step.desc)}</p>
            </div>
          ))}
        </div>

        {/* Multiplicador */}
        <div className="rounded-2xl overflow-hidden mt-3 reveal" style={{ background: '#d7e7e7' }}>
          <div className="px-6 pt-5 pb-1">
            <p className="text-[0.62rem] font-bold tracking-[.14em] uppercase text-teal/60">O Efeito Multiplicador</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-teal/10 p-px rounded-b-2xl">
            {MULT.map(step => (
              <div
                key={step.num}
                className={`relative p-9 overflow-hidden transition-all ${
                  step.highlight
                    ? 'bg-gradient-to-br from-[#001f2e] via-[#002a3d] to-[#00465F]'
                    : 'bg-white hover:bg-teal/5'
                }`}
              >
                {step.highlight && (
                  <div className="absolute inset-0 hero-grid-bg opacity-20 pointer-events-none" />
                )}
                <span
                  className="absolute top-4 right-5 font-serif text-[4rem] font-light leading-none pointer-events-none select-none"
                  style={{ color: step.highlight ? 'rgba(255,255,255,0.08)' : 'rgba(0,70,95,0.06)' }}
                >
                  {step.num}
                </span>
                <span className={`text-[0.68rem] font-bold tracking-[.12em] uppercase block mb-4 ${step.highlight ? 'text-gold' : 'text-teal'}`}>
                  {step.label}
                </span>
                <h3 className={`text-[1rem] font-semibold mb-2.5 ${step.highlight ? 'text-white' : 'text-steel'}`}>{step.title}</h3>
                <p className={`text-[0.85rem] font-light leading-[1.75] ${step.highlight ? 'text-white/70' : 'text-steel/60'}`}>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
