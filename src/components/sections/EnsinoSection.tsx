import Link from 'next/link'
import { ExternalLink } from 'lucide-react'

const STEPS = [
  {
    num: '1', label: 'Fase 01', highlight: false,
    title: 'Atualização Teórica',
    desc: 'Protocolos baseados em evidências — novas diretrizes para H. pylori, SIBO, IMO e distúrbios funcionais digestivos com especialistas da clínica.',
    price: '~R$ 450,00 · Presencial ou online',
  },
  {
    num: '2', label: 'Fase 02', highlight: false,
    title: 'Simulação Interdisciplinar',
    desc: 'Discussão de casos reais da Clínica NU.V.E.M, integrando gastroenterologia, cirurgia pediátrica e fisioterapia em cenários clínicos complexos.',
    price: 'Casos reais · Equipe especializada',
  },
  {
    num: '3', label: 'Fase 03 — Premium', highlight: true,
    title: 'Imersão Hands-On',
    desc: 'Treinamento prático presencial com equipamentos de ponta na NU.V.E.M. Domínio da execução técnica e certificação ISO 9001 incluída.',
    price: 'R$ 2.200 – R$ 5.000 · Certificação inclusa',
  },
]

const MULT = [
  { num: 'I',   title: 'Validação Clínica Diária',    desc: 'Casos reais da clínica moldam os treinamentos e a produção de conteúdo científico atualizado.' },
  { num: 'II',  title: 'Treinamento de Elite',         desc: 'Especialistas repassam expertise prática e domínio técnico para médicos, fisioterapeutas e alunos.' },
  { num: 'III', title: 'Elevação da Prática Médica',   desc: 'Alunos levam a excelência para seus consultórios — o Efeito Multiplicador NU.V.E.M em ação.' },
]

export function EnsinoSection() {
  return (
    <section className="py-28 bg-ink border-t border-teal-light/[0.06]" id="ensino">
      <div className="max-w-[1240px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-14">
          <div className="max-w-xl">
            <p className="sec-tag reveal">NU.V.E.M Ensino</p>
            <h2 className="sec-title reveal reveal-d1">A Elevação da <em>Prática Clínica</em></h2>
            <p className="text-[0.9rem] font-light text-muted leading-[1.85] mt-4 reveal reveal-d2">
              Formação interdisciplinar para médicos, fisioterapeutas e especialistas.
              Do conceito à maestria, com metodologia baseada em casos reais.
            </p>
          </div>
          <a
            href="https://cursos.nuvemensino.com.br"
            target="_blank" rel="noopener noreferrer"
            className="reveal reveal-d2 inline-flex items-center gap-2 text-gold text-[0.8rem] font-medium border-b border-gold/35 pb-0.5 hover:gap-3.5 transition-all shrink-0"
          >
            Acessar NU.V.E.M Ensino <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-teal-light/[0.05] rounded-2xl overflow-hidden mb-3 reveal">
          {STEPS.map(step => (
            <div
              key={step.num}
              className={`relative p-9 overflow-hidden transition-colors ${
                step.highlight
                  ? 'bg-[#0A1A24] border-t border-gold/30'
                  : 'bg-deep hover:bg-[#0A1A24]'
              }`}
            >
              <span className="absolute top-4 right-5 font-serif text-[4rem] font-light leading-none pointer-events-none select-none"
                style={{ color: step.highlight ? 'rgba(201,168,76,0.12)' : 'rgba(203,228,230,0.07)' }}
              >
                {step.num}
              </span>
              <span className={`text-[0.65rem] font-bold tracking-[.12em] uppercase block mb-4 ${step.highlight ? 'text-gold' : 'text-gold'}`}>
                {step.label}
              </span>
              <h3 className="text-[0.95rem] font-semibold text-white mb-2.5">{step.title}</h3>
              <p className="text-[0.78rem] font-light text-muted leading-[1.75] mb-4">{step.desc}</p>
              <div className="text-[0.8rem] font-medium text-gold">{step.price}</div>
            </div>
          ))}
        </div>

        {/* Multiplicador */}
        <div className="grid grid-cols-1 md:grid-cols-3 rounded-xl overflow-hidden border border-teal-light/[0.07] reveal">
          {MULT.map((m, i) => (
            <div
              key={m.num}
              className={`p-7 transition-colors hover:bg-sky-faint relative group ${i < MULT.length - 1 ? 'border-b md:border-b-0 md:border-r border-teal-light/[0.07]' : ''}`}
            >
              <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-gold/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="font-serif text-[2rem] font-light text-gold-light opacity-50 mb-2">{m.num}</div>
              <h4 className="text-[0.85rem] font-semibold text-white mb-2">{m.title}</h4>
              <p className="text-[0.76rem] font-light text-muted leading-[1.7]">{m.desc}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
