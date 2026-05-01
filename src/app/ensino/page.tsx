import type { Metadata } from 'next'
import Link    from 'next/link'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'

export const metadata: Metadata = {
  title:       'NU.V.E.M Ensino · Formação Médica Especializada',
  description: 'Centro de formação profissional com metodologia hands-on, certificação ISO 9001 e treinamento baseado em casos reais da Clínica NU.V.E.M.',
}

const TRILHAS = [
  {
    num: 'I', title: 'Gastroenterologia & Motilidade',
    desc: 'SIBO, IMO, LIBO, SIFO e H. pylori — domínio completo dos testes respiratórios, manometria esofágica e pHmetria avançada.',
    publico: ['Gastroenterologistas', 'Clínicos Gerais', 'Médicos de Família'],
  },
  {
    num: 'II', title: 'Saúde Pélvica & Pediatria Integrada',
    desc: 'Disfunções do assoalho pélvico, biofeedback eletromiográfico e casos interdisciplinares com visão cirúrgica pediátrica integrada.',
    publico: ['Fisioterapeutas', 'Ginecologistas', 'Gastroenterologistas', 'Pediatras'],
  },
  {
    num: 'III', title: 'Diagnóstico de Patologias Orais',
    desc: 'Halitose, halimetria e sialometria — protocolo diagnóstico multidisciplinar completo e estratégias terapêuticas integradas.',
    publico: ['Gastroenterologistas', 'Odontólogos', 'Clínicos Gerais'],
  },
]

const FORMATOS = [
  { format: 'Aperfeiçoamento Teórico', price: '~R$ 450,00', desc: 'Atualização em novos protocolos baseados em evidências. Presencial ou online.', publico: 'Estudantes, generalistas e profissionais em nivelamento teórico.', cta: false },
  { format: 'Treinamento Hands-On', price: 'R$ 2.200 – R$ 5.000', desc: 'Imersão presencial na Clínica NU.V.E.M com equipamentos de ponta. Individual ou em grupos de até 4 participantes.', publico: 'Especialistas buscando domínio técnico e certificação validada.', cta: true },
]

export default function EnsinoPage() {
  return (
    <>
      <PageHero
        tag="NU.V.E.M Ensino"
        title={<>A Elevação da <em>Prática Clínica</em></>}
        desc="Formação interdisciplinar para médicos, fisioterapeutas e especialistas. Do conceito à maestria, com certificação ISO 9001 validada."
      />

      {/* Proposta de valor */}
      <SectionWrapper dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="sec-tag reveal">Nossa Proposta</p>
            <h2 className="sec-title reveal reveal-d1">Do conceito à <em>maestria</em></h2>
            <div className="space-y-4 mt-6 text-[0.97rem] font-light text-muted leading-[1.85] reveal reveal-d2">
              <p>
                O NU.V.E.M Ensino é o braço educacional do ecossistema NU.V.E.M. Utilizamos os
                casos reais da própria clínica como matéria-prima do aprendizado — uma metodologia
                que garante aplicabilidade imediata e domínio técnico real.
              </p>
              <p>
                Nossos professores são os mesmos especialistas que atendem diariamente na NU.V.E.M,
                com expertise prática consolidada em diagnósticos avançados, testes respiratórios e
                manometria de alta resolução.
              </p>
              <p>
                A formação culmina em <strong className="text-steel font-medium">certificação validada
                pelo sistema ISO 9001</strong> — o mesmo padrão que certifica os processos clínicos
                da clínica, conferindo credibilidade e rastreabilidade ao seu desenvolvimento profissional.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 reveal reveal-d2">
            {[
              { val: '3', label: 'Trilhas de formação', gold: false },
              { val: 'ISO 9001', label: 'Certificação validada', gold: true },
              { val: 'Hands-On', label: 'Metodologia prática', gold: false },
              { val: 'Real', label: 'Casos da clínica', gold: false },
            ].map(s => (
              <div key={s.label} className="bg-ink border border-teal-light/[0.08] rounded-xl p-6 text-center">
                <span className={`font-serif font-light text-[2.4rem] leading-none block mb-2 ${s.gold ? 'text-gold' : 'text-steel'}`}>{s.val}</span>
                <div className="text-[0.72rem] font-medium uppercase tracking-[.08em] text-muted">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Metodologia */}
      <SectionWrapper>
        <div className="text-center mb-14">
          <p className="sec-tag justify-center reveal">Metodologia</p>
          <h2 className="sec-title reveal reveal-d1">Do conceito à <em>execução</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-teal/5 rounded-2xl overflow-hidden">
          {[
            { n:'1', label:'Fase 01', title:'Atualização Teórica', desc:'Protocolos baseados em evidências científicas atuais — novas diretrizes para H. pylori, SIBO, IMO e distúrbios funcionais digestivos.', price:'~R$ 450,00 · Presencial ou online', hl:false },
            { n:'2', label:'Fase 02', title:'Simulação Interdisciplinar', desc:'Discussão de casos reais da Clínica NU.V.E.M, integrando gastroenterologia, cirurgia pediátrica e fisioterapia em cenários clínicos complexos.', price:'Casos reais · Equipe especializada', hl:false },
            { n:'3', label:'Fase 03 — Premium', title:'Imersão Hands-On', desc:'Treinamento prático presencial com equipamentos de ponta na NU.V.E.M. Domínio da execução técnica e certificação ISO 9001 incluída.', price:'R$ 2.200 – R$ 5.000 · Certificação inclusa', hl:true },
          ].map(step => (
            <div key={step.n} className={`relative p-9 overflow-hidden reveal ${step.hl ? 'bg-[#0A1A24] border-t border-gold/30' : 'bg-cloud hover:bg-teal/5 transition-colors'}`}>
              <span className="absolute top-4 right-5 font-serif text-[4rem] font-light leading-none select-none pointer-events-none"
                style={{ color: step.hl ? 'rgba(201,168,76,.12)' : 'rgba(203,228,230,.07)' }}>
                {step.n}
              </span>
              <span className={`text-[0.65rem] font-bold tracking-[.12em] uppercase block mb-4 text-gold`}>{step.label}</span>
              <h3 className="text-[0.95rem] font-semibold text-steel mb-2.5">{step.title}</h3>
              <p className="text-[0.78rem] font-light text-muted leading-[1.75] mb-4">{step.desc}</p>
              <div className="text-[0.9rem] font-medium text-gold">{step.price}</div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Trilhas */}
      <SectionWrapper dark>
        <div className="text-center mb-14">
          <p className="sec-tag justify-center reveal">Trilhas de Formação</p>
          <h2 className="sec-title reveal reveal-d1">Escolha sua <em>especialização</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TRILHAS.map((t, i) => (
            <div key={t.num} className={`bg-ink border border-teal-light/[0.08] rounded-2xl p-8 hover:border-gold/25 transition-all reveal reveal-d${i}`}>
              <div className="font-serif text-[3rem] font-light text-gold opacity-30 leading-none mb-4">{t.num}</div>
              <h3 className="text-[0.95rem] font-semibold text-steel mb-3">{t.title}</h3>
              <p className="text-[0.9rem] font-light text-muted leading-[1.75] mb-5">{t.desc}</p>
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[.1em] text-faint mb-2">Público-alvo</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.publico.map(p => (
                    <span key={p} className="text-[0.66rem] font-medium px-2 py-1 rounded-full bg-teal/8 border border-teal/10 text-faint">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA to external */}
      <SectionWrapper>
        <div className="text-center">
          <p className="sec-tag justify-center reveal">Plataforma de Cursos</p>
          <h2 className="sec-title reveal reveal-d1 mb-4">Acesse o portal <em>NU.V.E.M Ensino</em></h2>
          <p className="text-[0.97rem] font-light text-muted max-w-md mx-auto mb-10 reveal reveal-d2">
            Confira a agenda de cursos, inscrições e materiais disponíveis na plataforma exclusiva do NU.V.E.M Ensino.
          </p>
          <div className="flex flex-wrap gap-4 justify-center reveal reveal-d3">
            <a href="https://cursos.nuvemensino.com.br" target="_blank" rel="noopener noreferrer" className="btn-gold">
              <ExternalLink className="w-4 h-4" />
              Acessar Portal de Cursos
            </a>
            <Link href="/contato" className="btn-ghost">
              Solicitar informações <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
