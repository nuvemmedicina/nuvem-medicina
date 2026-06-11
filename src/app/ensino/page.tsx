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
    href:  '/dra-vera-angelo',
  },
  {
    nome:  'Dra. Eliane Basques',
    esp:   'Manometria Anorretal · Cirurgia Pediátrica',
    crm:   'CRM-MG 27601 · RQE 9324',
    foto:  '/images/dra-eliane.jpg',
    role:  'Diretora Técnica Substituta',
    bio:   'Cirurgiã pediátrica e especialista em manometria anorretal. Cofundadora da NU.V.E.M, traz a visão cirúrgica integrada ao ensino de diagnóstico funcional avançado.',
    href:  '/dra-eliane-basques',
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-teal/8 rounded-2xl overflow-hidden">
          {[
            { n:'1', label:'Fase 01', title:'Atualização Teórica',        desc:'Protocolos baseados em evidências científicas atuais, com novas diretrizes para H. pylori, SIBO, IMO e distúrbios funcionais digestivos.', price:'~R$ 450,00 · Presencial ou online', hl:false },
            { n:'2', label:'Fase 02', title:'Simulação Interdisciplinar', desc:'Discussão de casos reais da Clínica NU.V.E.M, integrando gastroenterologia, cirurgia pediátrica e fisioterapia em cenários clínicos complexos.', price:'Casos reais · Equipe especializada', hl:false },
            { n:'3', label:'Fase 03: Premium', title:'Imersão Hands-On', desc:'Treinamento prático presencial com equipamentos de ponta na NU.V.E.M. Domínio da execução técnica e certificação ISO 9001 incluída.', price:'R$ 2.200 – R$ 5.000 · Certificação inclusa', hl:true },
          ].map(step => (
            <div key={step.n} className={`relative p-9 overflow-hidden reveal ${
              step.hl
                ? 'bg-teal'
                : 'bg-white hover:bg-teal/4 transition-colors'
            }`}>
              <span className="absolute top-4 right-5 font-serif text-[4rem] font-light leading-none select-none pointer-events-none"
                style={{ color: step.hl ? 'rgba(255,255,255,0.12)' : 'rgba(0,70,95,0.06)' }}>
                {step.n}
              </span>
              <span className={`text-[0.65rem] font-bold tracking-[.12em] uppercase block mb-4 ${step.hl ? 'text-teal-light' : 'text-teal'}`}>
                {step.label}
              </span>
              <h3 className={`text-[0.95rem] font-semibold mb-2.5 ${step.hl ? 'text-white' : 'text-steel'}`}>{step.title}</h3>
              <p className={`text-[0.78rem] font-light leading-[1.75] mb-4 ${step.hl ? 'text-white/75' : 'text-steel/60'}`}>{renderRich(step.desc)}</p>
              <div className={`text-[0.9rem] font-medium ${step.hl ? 'text-teal-light' : 'text-teal'}`}>{step.price}</div>
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
