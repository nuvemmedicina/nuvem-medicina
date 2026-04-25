import type { Metadata } from 'next'
import Link    from 'next/link'
import { PageHero }      from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }     from '@/components/ui/CtaBanner'
import { CONTATO }       from '@/lib/data'

export const metadata: Metadata = {
  title:       'Sobre a Clínica',
  description: 'Conheça a NU.V.E.M Medicina — história, missão, valores e o diferencial ISO 9001 que nos torna únicos em Belo Horizonte.',
}

const PILARES = [
  { num: '01', title: 'Diagnóstico de Precisão', desc: 'Equipamentos de última geração operados por especialistas certificados, garantindo resultados confiáveis e laudos detalhados.' },
  { num: '02', title: 'Gestão ISO 9001',          desc: 'Únicos no segmento em BH com certificação internacional de qualidade — cada processo é padronizado, auditado e continuamente melhorado.' },
  { num: '03', title: 'Equipe Multidisciplinar',  desc: 'Gastroenterologistas, fisioterapeutas pélvicos, nefrologista, pediatra e especialistas em halitose trabalhando de forma integrada.' },
  { num: '04', title: 'Cuidado Humanizado',        desc: 'Escuta ativa, respeito ao tempo do paciente e comunicação clara em cada etapa do atendimento.' },
  { num: '05', title: 'Ensino Médico de Elite',    desc: 'Centro de formação profissional com metodologia hands-on baseada nos casos reais da própria clínica.' },
  { num: '06', title: 'Melhoria Contínua',         desc: 'Indicadores de qualidade monitorados mensalmente e ações de melhoria implementadas de forma sistemática e documentada.' },
]

export default function SobrePage() {
  return (
    <>
      <PageHero
        tag="A Clínica"
        title={<>Sobre a <em>NU.V.E.M</em> Medicina</>}
        desc="O ecossistema completo de excelência em saúde digestiva — onde tecnologia de ponta, cuidado humanizado e gestão certificada se unem em um único lugar."
      />

      {/* Missão / Visão / Valores */}
      <SectionWrapper dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="sec-tag reveal">Nossa Origem</p>
            <h2 className="sec-title reveal reveal-d1">
              Um novo clima de <em>saúde</em> para você
            </h2>
            <div className="space-y-5 mt-6 text-[0.88rem] font-light text-muted leading-[1.85]">
              <p className="reveal reveal-d2">
                A NU.V.E.M Medicina nasceu com uma missão clara: oferecer à população de Belo Horizonte
                e região um atendimento em gastroenterologia verdadeiramente especializado, que une
                tecnologia diagnóstica de última geração com um olhar profundamente humano.
              </p>
              <p className="reveal reveal-d3">
                Localizada no coração do bairro Santa Efigênia, a clínica tornou-se referência
                em diagnósticos avançados — manometria de alta resolução, testes respiratórios
                para SIBO e H. pylori, pHmetria, halimetria e muito mais — sob gestão certificada
                pela norma ISO 9001, única no segmento em Belo Horizonte.
              </p>
              <p className="reveal reveal-d4">
                Mais do que uma clínica, a NU.V.E.M é um ecossistema: o braço assistencial
                (NU.V.E.M Medicina) e o braço educacional (NU.V.E.M Ensino) se alimentam mutuamente —
                os casos reais moldam o ensino e o ensino eleva o padrão do atendimento.
              </p>
            </div>
          </div>

          {/* Stats panel */}
          <div className="grid grid-cols-2 gap-4 reveal reveal-d2">
            {[
              { val: '1.991', label: 'Avaliações Google', sub: '★★★★★', gold: true },
              { val: 'ISO 9001', label: 'Certificação', sub: 'Única no segmento', gold: true },
              { val: '6+', label: 'Anos de história', sub: 'Em constante crescimento', gold: false },
              { val: '6', label: 'Especialidades', sub: 'Equipe integrada', gold: false },
            ].map(s => (
              <div key={s.label} className="bg-ink border border-teal-light/[0.08] rounded-xl p-6 text-center">
                <span className={`font-serif font-light text-[2.8rem] leading-none block mb-2 ${s.gold ? 'text-gold' : 'text-white'}`}>
                  {s.val}
                </span>
                <div className="text-[0.72rem] font-semibold uppercase tracking-[.08em] text-muted">{s.label}</div>
                <div className="text-[0.7rem] text-faint mt-1">{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Pilares */}
      <SectionWrapper>
        <div className="text-center mb-14">
          <p className="sec-tag justify-center reveal">Nossos Pilares</p>
          <h2 className="sec-title reveal reveal-d1">O que nos torna <em>únicos</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-teal-light/[0.06] rounded-2xl overflow-hidden">
          {PILARES.map((p, i) => (
            <div key={p.num} className={`bg-deep p-8 hover:bg-[#0A1A24] transition-colors reveal reveal-d${i % 3}`}>
              <span className="font-serif text-[3rem] font-light text-teal-light/[0.08] leading-none block mb-4">{p.num}</span>
              <h3 className="text-[0.95rem] font-semibold text-white mb-3">{p.title}</h3>
              <p className="text-[0.82rem] font-light text-muted leading-[1.75]">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Responsáveis Técnicos */}
      <SectionWrapper dark>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Responsabilidade Técnica</p>
          <h2 className="sec-title reveal reveal-d1">Responsáveis <em>Técnicos</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            { nome: CONTATO.diretora.nome, cargo: 'Diretora Técnica', crm: CONTATO.diretora.crm, rqe: CONTATO.diretora.rqe, esp: 'Gastroenterologista' },
            { nome: 'Dra. Eliane Basques Moura', cargo: 'Diretora Técnica Substituta', crm: 'CRM-MG 27601', rqe: 'RQE 9324', esp: 'Cirurgia Pediátrica' },
          ].map(m => (
            <div key={m.nome} className="bg-ink border border-teal-light/[0.08] rounded-xl p-7 reveal">
              <div className="w-14 h-14 rounded-full bg-teal flex items-center justify-center text-lg font-semibold text-teal-light mb-4">
                {m.nome.split(' ').slice(1, 3).map(w => w[0]).join('')}
              </div>
              <span className="text-[0.65rem] font-bold uppercase tracking-[.12em] text-gold bg-gold-dim border border-gold-line px-2.5 py-1 rounded-full">{m.cargo}</span>
              <h3 className="text-[1rem] font-semibold text-white mt-3 mb-1">{m.nome}</h3>
              <p className="text-[0.8rem] text-gold mb-2">{m.esp}</p>
              <p className="text-[0.72rem] text-faint">{m.crm} · {m.rqe}</p>
            </div>
          ))}
        </div>
        <p className="text-center text-[0.75rem] text-faint mt-6">
          Inscrito sob CRM n° 0020532-MG · CNPJ {CONTATO.cnpj}
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner />
      </SectionWrapper>
    </>
  )
}
