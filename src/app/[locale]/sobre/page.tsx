import type { Metadata } from 'next'
import Link    from 'next/link'
import Image   from 'next/image'
import { Microscope, ShieldCheck, Users, Heart, GraduationCap, TrendingUp } from 'lucide-react'
import { PageHero }      from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }     from '@/components/ui/CtaBanner'
import { CONTATO }       from '@/lib/data'

export const metadata: Metadata = {
  alternates:  { canonical: '/sobre' },
  title:       'Sobre a Clínica',
  description: 'Conheça a NU.V.E.M Medicina: história, missão, valores e o diferencial ISO 9001 em Belo Horizonte.',
}

const PILARES = [
  { num: '01', Icon: Microscope,   title: 'Diagnóstico de Precisão', desc: 'Equipamentos de última geração operados por especialistas certificados, garantindo resultados confiáveis e laudos detalhados.' },
  { num: '02', Icon: ShieldCheck,  title: 'Gestão ISO 9001',          desc: 'Certificação internacional de qualidade. Cada processo é padronizado, auditado e continuamente melhorado.' },
  { num: '03', Icon: Users,        title: 'Equipe Multidisciplinar',  desc: 'Gastroenterologistas, fisioterapeutas pélvicos, nefrologista, pediatra e especialistas em halitose trabalhando de forma integrada.' },
  { num: '04', Icon: Heart,        title: 'Cuidado Humanizado',        desc: 'Escuta ativa, respeito ao tempo do paciente e comunicação clara em cada etapa do atendimento.' },
  { num: '05', Icon: GraduationCap,title: 'Ensino Médico de Elite',    desc: 'Centro de formação profissional com metodologia hands-on baseada nos casos reais da própria clínica.' },
  { num: '06', Icon: TrendingUp,   title: 'Melhoria Contínua',         desc: 'Indicadores de qualidade monitorados mensalmente e ações de melhoria implementadas de forma sistemática e documentada.' },
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
                pela norma ISO 9001.
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
              { val: 'ISO 9001', label: 'Certificação', sub: 'Gestão certificada', gold: true },
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
      <section className="py-24 relative overflow-hidden" style={{ background: '#d7e7e7' }}>
        {/* Subtle grid overlay */}
        <div className="absolute inset-0 hero-grid-bg pointer-events-none opacity-30" />

        <div className="relative z-10 max-w-[1240px] mx-auto px-8">
          <div className="text-center mb-14">
            <p className="sec-tag justify-center reveal">Nossos Pilares</p>
            <h2 className="sec-title reveal reveal-d1">O que nos torna <em>únicos</em></h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {PILARES.map((p, i) => (
              <div
                key={p.num}
                className={`group relative bg-white rounded-2xl p-8 shadow-sm border border-white/80 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 overflow-hidden reveal reveal-d${i % 3}`}
              >
                {/* Accent bar top */}
                <div className="absolute top-0 left-0 right-0 h-[3px] bg-gradient-to-r from-teal/60 to-teal/20 rounded-t-2xl group-hover:from-teal group-hover:to-teal/50 transition-all duration-300" />

                {/* Number decorativo */}
                <span className="absolute top-4 right-6 font-serif text-[4rem] font-light leading-none select-none text-teal/8 group-hover:text-teal/14 transition-colors duration-300">
                  {p.num}
                </span>

                {/* Ícone */}
                <div className="w-11 h-11 rounded-xl bg-teal/10 border border-teal/20 flex items-center justify-center text-teal mb-5 group-hover:bg-teal group-hover:text-white transition-all duration-300">
                  <p.Icon className="w-5 h-5" />
                </div>

                <h3 className="text-[1rem] font-semibold text-steel mb-3 leading-snug">{p.title}</h3>
                <p className="text-[0.88rem] font-light text-steel/60 leading-[1.78]">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Responsáveis Técnicos */}
      <SectionWrapper mist grid>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Responsabilidade Técnica</p>
          <h2 className="sec-title reveal reveal-d1">Responsáveis <em>Técnicos</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
          {[
            { nome: CONTATO.diretora.nome, cargo: 'Diretora Técnica',          crm: CONTATO.diretora.crm, rqe: CONTATO.diretora.rqe, esp: 'Gastroenterologista',                foto: '/images/dra-vera.jpg',   href: '/dra-vera-angelo' },
            { nome: 'Dra. Eliane Basques Moura', cargo: 'Diretora Técnica Substituta', crm: 'CRM-MG 27601',           rqe: 'RQE 9324',               esp: 'Cirurgia Pediátrica', foto: '/images/dra-eliane.jpg', href: '/dra-eliane-basques' },
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
