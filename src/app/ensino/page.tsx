import type { Metadata } from 'next'
import Link    from 'next/link'
import Image   from 'next/image'
import { ExternalLink, ArrowRight } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { renderRich } from '@/lib/rich'

export const metadata: Metadata = {
  title:       'NU.V.E.M Ensino · Formação Médica Especializada',
  description: 'Centro de formação profissional com metodologia hands-on, certificação ISO 9001 e treinamento baseado em casos reais da Clínica NU.V.E.M.',
}

const TRILHAS = [
  {
    num: 'I', title: 'Gastroenterologia & Motilidade',
    desc: 'SIBO, IMO, LIBO, SIFO e H. pylori. Domínio completo dos testes respiratórios, manometria esofágica e pHmetria avançada.',
    publico: ['Gastroenterologistas', 'Clínicos Gerais', 'Médicos de Família'],
  },
  {
    num: 'II', title: 'Saúde Pélvica & Pediatria Integrada',
    desc: 'Disfunções do assoalho pélvico, biofeedback eletromiográfico e casos interdisciplinares com visão cirúrgica pediátrica integrada.',
    publico: ['Fisioterapeutas', 'Ginecologistas', 'Gastroenterologistas', 'Pediatras'],
  },
  {
    num: 'III', title: 'Diagnóstico de Patologias Orais',
    desc: 'Halitose, halimetria e sialometria. Protocolo diagnóstico multidisciplinar completo e estratégias terapêuticas integradas.',
    publico: ['Gastroenterologistas', 'Odontólogos', 'Clínicos Gerais'],
  },
]

const INSTRUTORES = [
  {
    nome:  'Dra. Vera Ângelo',
    esp:   'Gastroenterologia e Motilidade Digestiva',
    crm:   'CRM-MG 22284 · RQE 10411 · RQE 22736',
    foto:  '/images/dra-vera.jpg',
    role:  'Fundadora e Diretora Técnica',
    bio:   'Mestre e Doutora pela UFMG. Professora convidada do Hospital Israelita Albert Einstein. Autora de diversas obras pela Editora Rubio. Referência nacional em testes respiratórios e motilidade digestiva.',
    href:  '/equipe/dra-vera',
  },
  {
    nome:  'Dra. Eliane Basques',
    esp:   'Manometria Anorretal · Cirurgia Pediátrica',
    crm:   'CRM-MG 27601 · RQE 9324',
    foto:  '/images/dra-eliane.jpg',
    role:  'Diretora Técnica Substituta',
    bio:   'Cirurgiã pediátrica e especialista em manometria anorretal. Cofundadora da NU.V.E.M, traz a visão cirúrgica integrada ao ensino de diagnóstico funcional avançado.',
    href:  '/equipe/dra-eliane',
  },
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
      <SectionWrapper dark grid>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="sec-tag reveal">Nossa Proposta</p>
            <h2 className="sec-title reveal reveal-d1">Do conceito à <em>maestria</em></h2>
            <div className="space-y-4 mt-6 text-[0.97rem] font-light text-steel/65 leading-[1.85] reveal reveal-d2">
              <p>
                O NU.V.E.M Ensino é o braço educacional do ecossistema NU.V.E.M. Utilizamos os
                casos reais da própria clínica como matéria-prima do aprendizado, uma metodologia
                que garante aplicabilidade imediata e domínio técnico real.
              </p>
              <p>
                Nossos professores são os mesmos especialistas que atendem diariamente na NU.V.E.M,
                com expertise prática consolidada em diagnósticos avançados, testes respiratórios e
                manometria de alta resolução.
              </p>
              <p>
                A formação culmina em <strong className="text-steel font-medium">certificação validada
                pelo sistema ISO 9001</strong>, o mesmo padrão que certifica os processos clínicos
                da clínica, conferindo credibilidade e rastreabilidade ao seu desenvolvimento profissional.
              </p>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4 reveal reveal-d2">
            {[
              { val: '3',        label: 'Trilhas de formação', teal: false },
              { val: 'ISO 9001', label: 'Certificação validada', teal: true },
              { val: 'Hands-On', label: 'Metodologia prática', teal: false },
              { val: 'Real',     label: 'Casos da clínica', teal: false },
            ].map(s => (
              <div key={s.label} className="bg-white border border-teal/10 rounded-xl p-6 text-center shadow-sm">
                <span className={`font-serif font-light text-[2.4rem] leading-none block mb-2 ${s.teal ? 'text-teal' : 'text-steel'}`}>
                  {s.val}
                </span>
                <div className="text-[0.72rem] font-medium uppercase tracking-[.08em] text-steel/50">{s.label}</div>
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {[
            {
              n: '1', label: 'Fase 01', title: 'Atualização Teórica',
              desc: 'Protocolos baseados em evidências científicas atuais, com novas diretrizes para H. pylori, SIBO, IMO e distúrbios funcionais digestivos.',
              hl: false, badge: null,
            },
            {
              n: '2', label: 'Fase 02', title: 'Simulação Interdisciplinar',
              desc: 'Discussão de casos reais da Clínica NU.V.E.M, integrando gastroenterologia, cirurgia pediátrica e fisioterapia em cenários clínicos complexos.',
              hl: false, badge: null,
            },
            {
              n: '3', label: 'Fase 03', title: 'Imersão Hands-On',
              desc: 'Treinamento prático presencial com equipamentos de ponta na NU.V.E.M. Domínio da execução técnica e certificação ISO 9001 incluída.',
              hl: true, badge: 'Premium',
            },
          ].map((step, i) => (
            <div
              key={step.n}
              className={`relative rounded-2xl p-9 overflow-hidden group cursor-default transition-all duration-300 reveal reveal-d${i} ${
                step.hl
                  ? 'bg-gradient-to-br from-[#001f2e] via-[#002a3d] to-[#00465F] border border-white/8 shadow-xl hover:-translate-y-2 hover:shadow-2xl'
                  : 'bg-white border border-teal/12 shadow-sm hover:-translate-y-2 hover:shadow-xl hover:border-teal/28'
              }`}
            >
              {/* Grid texture overlay — só no card premium */}
              {step.hl && (
                <div className="absolute inset-0 hero-grid-bg opacity-25 pointer-events-none" />
              )}

              {/* Número decorativo — escala suave no hover */}
              <span
                className="absolute top-3 right-5 font-serif text-[5.5rem] font-light leading-none select-none pointer-events-none transition-all duration-500 group-hover:scale-110 group-hover:-translate-y-1"
                style={{ color: step.hl ? 'rgba(255,255,255,0.07)' : 'rgba(0,70,95,0.06)' }}
              >
                {step.n}
              </span>

              {/* Conteúdo */}
              <div className="relative z-10">
                {/* Barra de acento superior */}
                <div className={`w-9 h-[3px] rounded-full mb-7 transition-all duration-300 group-hover:w-14 ${step.hl ? 'bg-gold' : 'bg-teal'}`} />

                {/* Label + badge Premium */}
                <div className="flex items-center gap-2 mb-3">
                  <span className={`text-[0.63rem] font-bold tracking-[.14em] uppercase ${step.hl ? 'text-white/45' : 'text-teal/55'}`}>
                    {step.label}
                  </span>
                  {step.badge && (
                    <span className="text-[0.58rem] font-bold tracking-[.1em] uppercase text-gold bg-gold/15 border border-gold/25 px-2 py-0.5 rounded-full">
                      {step.badge}
                    </span>
                  )}
                </div>

                <h3 className={`text-[1.05rem] font-semibold mb-3 leading-snug ${step.hl ? 'text-white' : 'text-steel'}`}>
                  {step.title}
                </h3>
                <p className={`text-[0.84rem] font-light leading-[1.82] ${step.hl ? 'text-white/60' : 'text-steel/55'}`}>
                  {renderRich(step.desc)}
                </p>

                {/* Chip ISO — só no Premium */}
                {step.hl && (
                  <div className="mt-6">
                    <span className="inline-flex items-center gap-1.5 text-[0.68rem] font-semibold text-gold bg-gold/12 border border-gold/22 px-3 py-1.5 rounded-full">
                      ✦ Certificação ISO 9001 inclusa
                    </span>
                  </div>
                )}

                {/* Arrow — aparece suavemente no hover */}
                <div className={`mt-5 flex items-center gap-1.5 text-[0.73rem] font-medium transition-all duration-300 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 ${step.hl ? 'text-gold' : 'text-teal'}`}>
                  Saiba mais <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Trilhas */}
      <SectionWrapper dark grid>
        <div className="text-center mb-14">
          <p className="sec-tag justify-center reveal">Trilhas de Formação</p>
          <h2 className="sec-title reveal reveal-d1">Escolha sua <em>especialização</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {TRILHAS.map((t, i) => (
            <div key={t.num} className={`bg-white border border-teal/10 rounded-2xl p-8 shadow-sm hover:border-teal/22 hover:-translate-y-0.5 transition-all reveal reveal-d${i}`}>
              <div className="font-serif text-[3rem] font-light text-teal/20 leading-none mb-4">{t.num}</div>
              <h3 className="text-[0.95rem] font-semibold text-steel mb-3">{t.title}</h3>
              <p className="text-[0.9rem] font-light text-steel/60 leading-[1.75] mb-5">{t.desc}</p>
              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-2">Público-alvo</p>
                <div className="flex flex-wrap gap-1.5">
                  {t.publico.map(p => (
                    <span key={p} className="text-[0.66rem] font-medium px-2 py-1 rounded-full bg-teal/8 border border-teal/12 text-teal/75">{p}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Instrutores */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Corpo Docente</p>
          <h2 className="sec-title reveal reveal-d1">Aprenda com quem <em>pratica</em></h2>
          <p className="text-[0.97rem] font-light text-steel/60 max-w-xl mx-auto mt-3 reveal reveal-d2">
            Os mesmos especialistas que atendem pacientes na NU.V.E.M são os seus professores.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-3xl mx-auto">
          {INSTRUTORES.map((inst, i) => (
            <Link key={inst.nome} href={inst.href}
              className={`group block bg-white border border-teal/12 rounded-2xl overflow-hidden hover:border-teal/28 hover:-translate-y-1 hover:shadow-md transition-all reveal reveal-d${i}`}>
              <div className="relative h-56 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg,#003040,#00465F)' }}>
                <Image src={inst.foto} alt={inst.nome} fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00465F]/70 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[0.62rem] font-bold tracking-[.12em] uppercase text-teal bg-white/90 border border-teal/20 px-3 py-1 rounded-full">
                    {inst.role}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-[1rem] font-semibold text-steel mb-0.5">{inst.nome}</h3>
                <p className="text-[0.85rem] text-teal mb-1">{inst.esp}</p>
                <p className="text-[0.72rem] text-steel/40 mb-3">{inst.crm}</p>
                <p className="text-[0.85rem] font-light text-steel/60 leading-[1.72] mb-4">{inst.bio}</p>
                <span className="inline-flex items-center gap-1.5 text-[0.85rem] font-medium text-teal group-hover:gap-2.5 transition-all">
                  Ver perfil completo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* CTA to external */}
      <SectionWrapper dark grid>
        <div className="text-center">
          <p className="sec-tag justify-center reveal">Plataforma de Cursos</p>
          <h2 className="sec-title reveal reveal-d1 mb-4">Acesse o portal <em>NU.V.E.M Ensino</em></h2>
          <p className="text-[0.97rem] font-light text-steel/60 max-w-md mx-auto mb-10 reveal reveal-d2">
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
