import type { Metadata } from 'next'
import Link    from 'next/link'
import Image   from 'next/image'
import { PageHero }      from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }     from '@/components/ui/CtaBanner'
import { CONTATO }       from '@/lib/data'

export const metadata: Metadata = {
  title:       'Sobre a Clínica',
  description: 'Conheça a NU.V.E.M Medicina: história, missão, valores e o diferencial ISO 9001 que nos torna únicos em Belo Horizonte.',
}

const PILARES = [
  { num: '01', title: 'Diagnóstico de Precisão', desc: 'Equipamentos de última geração operados por especialistas certificados, garantindo resultados confiáveis e laudos detalhados.' },
  { num: '02', title: 'Gestão ISO 9001',          desc: 'Únicos no segmento em BH com certificação internacional de qualidade. Cada processo é padronizado, auditado e continuamente melhorado.' },
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
        desc="O ecossistema completo de excelência em saúde digestiva, onde tecnologia de ponta, cuidado humanizado e gestão certificada se unem em um único lugar."
      />

      {/* Missão / Origem */}
      <SectionWrapper dark grid>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <p className="sec-tag reveal">Nossa Origem</p>
            <h2 className="sec-title reveal reveal-d1">
              Um novo clima de <em>saúde</em> para você
            </h2>
            <div className="space-y-5 mt-6 text-[0.98rem] font-light text-steel/65 leading-[1.85]">
              <p className="reveal reveal-d2">
                A NU.V.E.M Medicina nasceu com uma missão clara: oferecer à população de Belo Horizonte
                e região um atendimento em gastroenterologia verdadeiramente especializado, que une
                tecnologia diagnóstica de última geração com um olhar profundamente humano.
              </p>
              <p className="reveal reveal-d3">
                Localizada no coração do bairro Santa Efigênia, a clínica tornou-se referência
                em diagnósticos avançados: manometria de alta resolução, testes respiratórios
                para SIBO e <em><strong>H. pylori</strong></em>, pHmetria, halimetria e muito mais, sob gestão certificada
                pela norma ISO 9001, única no segmento em Belo Horizonte.
              </p>
              <p className="reveal reveal-d4">
                Mais do que uma clínica, a NU.V.E.M é um ecossistema: o braço assistencial
                (NU.V.E.M Medicina) e o braço educacional (NU.V.E.M Ensino) se alimentam mutuamente:
                os casos reais moldam o ensino e o ensino eleva o padrão do atendimento.
              </p>
            </div>
          </div>

          {/* Stats panel */}
          <div className="grid grid-cols-2 gap-4 reveal reveal-d2">
            {[
              { val: '+2.000', label: 'Avaliações Google', sub: '★★★★★', gold: true },
              { val: 'ISO 9001', label: 'Certificação', sub: 'Única no segmento', gold: true },
              { val: '6+', label: 'Anos de história', sub: 'Em constante crescimento', gold: false },
              { val: '6', label: 'Especialidades', sub: 'Equipe integrada', gold: false },
            ].map(s => (
              <div key={s.label} className="bg-white border border-teal/12 rounded-2xl p-6 text-center shadow-sm">
                <span className={`font-serif font-light text-[2.8rem] leading-none block mb-2 ${s.gold ? 'text-gold' : 'text-teal'}`}>
                  {s.val}
                </span>
                <div className="text-[0.75rem] font-semibold uppercase tracking-[.08em] text-steel/55">{s.label}</div>
                <div className="text-[0.72rem] text-steel/35 mt-1">{s.sub}</div>
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
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-teal/8 rounded-2xl overflow-hidden">
          {PILARES.map((p, i) => (
            <div key={p.num} className={`bg-white p-8 hover:bg-teal/5 transition-colors reveal reveal-d${i % 3}`}>
              <span className="font-serif text-[3rem] font-light text-teal/10 leading-none block mb-4">{p.num}</span>
              <h3 className="text-[1rem] font-semibold text-steel mb-3">{p.title}</h3>
              <p className="text-[0.9rem] font-light text-steel/60 leading-[1.75]">{p.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Responsáveis Técnicos */}
      <SectionWrapper mist grid>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Responsabilidade Técnica</p>
          <h2 className="sec-title reveal reveal-d1">Responsáveis <em>Técnicos</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            { nome: CONTATO.diretora.nome, cargo: 'Diretora Técnica',          crm: CONTATO.diretora.crm, rqe: CONTATO.diretora.rqe, esp: 'Gastroenterologista',                foto: '/images/dra-vera.jpg',   href: '/equipe/dra-vera' },
            { nome: 'Dra. Eliane Basques Moura', cargo: 'Diretora Técnica Substituta', crm: 'CRM-MG 27601',           rqe: 'RQE 9324',               esp: 'Cirurgia Pediátrica', foto: '/images/dra-eliane.jpg', href: '/equipe/dra-eliane' },
          ].map(m => (
            <Link key={m.nome} href={m.href} className="group bg-white border border-teal/12 rounded-2xl overflow-hidden reveal shadow-sm hover:border-teal/28 hover:-translate-y-0.5 hover:shadow-md transition-all block">
              {/* Foto */}
              <div className="relative h-52 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg,#003040,#00465F)' }}>
                <Image src={m.foto} alt={m.nome} fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00465F]/60 via-transparent to-transparent" />
              </div>
              {/* Info */}
              <div className="p-6">
                <span className="text-[0.68rem] font-bold uppercase tracking-[.12em] text-teal bg-teal/8 border border-teal/20 px-2.5 py-1 rounded-full">{m.cargo}</span>
                <h3 className="text-[1.05rem] font-semibold text-steel mt-3 mb-1">{m.nome}</h3>
                <p className="text-[0.85rem] text-teal mb-2">{m.esp}</p>
                <p className="text-[0.75rem] text-steel/40">{m.crm} · {m.rqe}</p>
              </div>
            </Link>
          ))}
        </div>
        <p className="text-center text-[0.78rem] text-steel/40 mt-6">
          Inscrito sob CRM n° 0020532-MG · CNPJ {CONTATO.cnpj}
        </p>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner />
      </SectionWrapper>
    </>
  )
}
