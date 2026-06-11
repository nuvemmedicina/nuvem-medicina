import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Award, GraduationCap, Stethoscope, ArrowRight } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { IsoSeal }        from '@/components/icons/IsoSeal'

export const metadata: Metadata = {
  title:       'Dra. Eliane Basques · Manometria Anorretal',
  description: 'Dra. Eliane Basques Moura — Cirurgiã Pediátrica e especialista em Manometria Anorretal. Sócia Fundadora e Diretora Técnica Substituta da NU.V.E.M Medicina.',
}

const FORMACAO = [
  {
    icon: Award,
    titulo: 'Especialização em Manometria Anorretal',
    inst:   'NU.V.E.M Medicina · Belo Horizonte',
    detalhe: 'Especialista na avaliação funcional do assoalho pélvico e diagnóstico de disfunções anorretais.',
  },
  {
    icon: Award,
    titulo: 'Título de Especialista em Cirurgia Pediátrica',
    inst:   'Sociedade Brasileira de Cirurgia Pediátrica (SBCP)',
    detalhe: 'Certificação na especialidade com foco em casos complexos e interdisciplinares.',
  },
  {
    icon: GraduationCap,
    titulo: 'Residência Médica em Cirurgia Pediátrica',
    inst:   'Hospital das Clínicas da UFMG',
    detalhe: 'Formação especializada em cirurgia pediátrica no hospital universitário de referência em Minas Gerais.',
  },
  {
    icon: GraduationCap,
    titulo: 'Graduação em Medicina',
    inst:   'Universidade Federal de Minas Gerais (UFMG)',
    detalhe: 'Formação médica na maior universidade federal de Minas Gerais.',
  },
]

const EXPERIENCIA = [
  {
    cargo:    'Sócia Fundadora · Diretora Técnica Substituta',
    local:    'NU.V.E.M Medicina e Ensino',
    desc:     'Cofundadora da NU.V.E.M, responsável técnica substituta e especialista em manometria anorretal. Atua na interface entre gastroenterologia, fisioterapia pélvica e cirurgia nos casos mais complexos.',
    destaque: true,
  },
  {
    cargo:    'Especialista em Manometria Anorretal',
    local:    'NU.V.E.M Medicina',
    desc:     'Realiza a avaliação funcional do assoalho pélvico, diagnóstico de incontinência fecal, constipação obstrutiva e disfunções defecatórias com protocolo ISO 9001.',
    destaque: false,
  },
  {
    cargo:    'Cirurgiã Pediátrica',
    local:    'Hospital das Clínicas · UFMG · BH',
    desc:     'Atuação em cirurgia pediátrica com foco em casos que envolvem o trato gastrointestinal e necessidade de visão cirúrgica integrada ao cuidado gastroenterológico.',
    destaque: false,
  },
  {
    cargo:    'Colaboradora em Casos Interdisciplinares',
    local:    'NU.V.E.M Medicina',
    desc:     'Integração única entre cirurgia pediátrica e gastroenterologia, oferecendo à NU.V.E.M uma perspectiva cirúrgica nos casos que demandam abordagem multidisciplinar complexa.',
    destaque: false,
  },
]

const AREAS = [
  'Manometria Anorretal',
  'Avaliação Funcional do Assoalho Pélvico',
  'Incontinência Fecal',
  'Constipação Obstrutiva',
  'Disfunção Defecatória',
  'Cirurgia Pediátrica',
  'Casos Interdisciplinares',
  'Interface Gastro-Cirúrgica',
  'Saúde Digestiva Pediátrica',
]

export default function DraElianePage() {
  return (
    <>
      <PageHero
        tag="Nossa Equipe"
        title={<>Dra. <em>Eliane Basques</em></>}
        desc="Cirurgiã Pediátrica · Especialista em Manometria Anorretal · Sócia Fundadora da NU.V.E.M Medicina"
      />

      <SectionWrapper dark grid>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Left */}
          <div className="space-y-5 reveal">
            <div className="relative">
              <div className="w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden border-2 border-teal/20">
                <Image
                  src="/images/dra-eliane.jpg"
                  alt="Dra. Eliane Basques Moura"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 max-w-[280px] mx-auto h-1 gold-line rounded-b-2xl" />
            </div>

            <div className="bg-white border border-teal/10 rounded-xl p-6 space-y-4 shadow-sm">
              <div>
                <h2 className="text-[1.1rem] font-semibold text-steel">Dra. Eliane Basques</h2>
                <p className="text-[0.9rem] text-teal mt-1">Cirurgiã Pediátrica · Manometria Anorretal</p>
              </div>
              <div className="space-y-2 text-[0.78rem] text-steel/60">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal/50 shrink-0" />
                  CRM-MG 27601
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal/50 shrink-0" />
                  RQE 9324
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal/50 shrink-0" />
                  Sócia Fundadora · NU.V.E.M
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal/50 shrink-0" />
                  Diretora Técnica Substituta
                </div>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-teal/10">
                <IsoSeal size={40} />
                <div>
                  <p className="text-[0.72rem] font-semibold text-steel">ISO 9001</p>
                  <p className="text-[0.65rem] text-steel/40">Diretora Técnica Substituta</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 space-y-8">
            <div className="reveal reveal-d1">
              <p className="sec-tag">Sobre a médica</p>
              <h2 className="sec-title mt-2 mb-5">
                Expertise única em <em>manometria anorretal</em>
              </h2>
              <div className="space-y-4 text-[0.97rem] font-light text-steel/60 leading-[1.85]">
                <p>
                  A Dra. Eliane Basques Moura é cirurgiã pediátrica e especialista em manometria
                  anorretal, com formação sólida pelo Hospital das Clínicas da UFMG e Título de
                  Especialista pela Sociedade Brasileira de Cirurgia Pediátrica.
                </p>
                <p>
                  Cofundadora da NU.V.E.M Medicina e Diretora Técnica Substituta, a Dra. Eliane
                  traz para a clínica uma combinação rara: a visão cirúrgica pediátrica aliada
                  à expertise em avaliação funcional do assoalho pélvico. Essa integração permite
                  abordar casos complexos de incontinência fecal, constipação obstrutiva e
                  disfunções defecatórias com uma perspectiva completa e diferenciada.
                </p>
                <p>
                  Na NU.V.E.M, realiza manometrias anorretais com protocolo ISO 9001,
                  colaborando ativamente com a equipe de gastroenterologia e fisioterapia
                  pélvica nos casos interdisciplinares que exigem olhar cirúrgico integrado.
                </p>
              </div>
            </div>

            <div className="reveal reveal-d2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-steel/45 mb-3">Áreas de atuação</p>
              <div className="flex flex-wrap gap-2">
                {AREAS.map(area => (
                  <span key={area}
                    className="text-[0.72rem] font-medium px-3 py-1.5 rounded-full bg-teal/8 border border-teal/10 text-steel/60 hover:border-teal/30 hover:text-teal transition-all">
                    {area}
                  </span>
                ))}
              </div>
            </div>

            <div className="flex flex-wrap gap-3 reveal reveal-d3">
              <Link href="/agendar" className="btn-gold">
                <Stethoscope className="w-4 h-4" />
                Agendar com a Dra. Eliane
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Formação Acadêmica</p>
          <h2 className="sec-title reveal reveal-d1">Títulos e <em>Especializações</em></h2>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {FORMACAO.map((f, i) => (
            <div key={f.titulo}
              className={`flex items-start gap-5 bg-white border border-teal/10 rounded-2xl shadow-sm p-6 hover:border-teal/25 transition-all reveal reveal-d${i % 3}`}>
              <div className="w-11 h-11 rounded-lg bg-teal/8 border border-teal/20 flex items-center justify-center text-teal shrink-0">
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[0.95rem] font-semibold text-steel mb-1">{f.titulo}</h3>
                <p className="text-[0.9rem] text-teal mb-1">{f.inst}</p>
                <p className="text-[0.78rem] text-steel/45 leading-relaxed">{f.detalhe}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper dark grid>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Trajetória Profissional</p>
          <h2 className="sec-title reveal reveal-d1">Experiência e <em>Atuação</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {EXPERIENCIA.map((e, i) => (
            <div key={e.cargo}
              className={`bg-white border rounded-xl p-7 shadow-sm hover:-translate-y-0.5 transition-all reveal reveal-d${i % 2} ${e.destaque ? 'border-teal/20 md:col-span-2' : 'border-teal/10'}`}>
              {e.destaque && (
                <span className="inline-block text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal bg-teal/8 border border-teal/20 px-2.5 py-0.5 rounded-full mb-3">
                  Cargo Principal
                </span>
              )}
              <h3 className="text-[0.95rem] font-semibold text-steel mb-1">{e.cargo}</h3>
              <p className="text-[0.9rem] text-teal mb-3">{e.local}</p>
              <p className="text-[0.9rem] font-light text-steel/60 leading-[1.75]">{e.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          <div>
            <p className="sec-tag reveal">Nossa Equipe</p>
            <h3 className="text-[1.3rem] font-serif font-light text-steel mt-1 reveal reveal-d1">
              Conheça também a <em className="text-teal italic">Dra. Vera Ângelo</em>
            </h3>
            <p className="text-[0.93rem] text-steel/60 mt-2 reveal reveal-d2">
              Diretora Técnica · Gastroenterologista · Doutora pela UFMG
            </p>
          </div>
          <Link href="/dra-vera-angelo" className="btn-ghost shrink-0 reveal reveal-d2">
            Ver perfil completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner
          title="Agende com a Dra. Eliane"
          desc="Atendimento especializado em manometria anorretal e avaliação funcional do assoalho pélvico com padrão ISO 9001."
        />
      </SectionWrapper>
    </>
  )
}
