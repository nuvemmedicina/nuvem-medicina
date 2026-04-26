import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Linkedin, BookOpen, Award, GraduationCap, Stethoscope, ArrowRight, ExternalLink } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { IsoSeal }        from '@/components/icons/IsoSeal'

export const metadata: Metadata = {
  title:       'Dra. Vera Ângelo · Gastroenterologista',
  description: 'Dra. Vera Ângelo — Mestre e Doutora pela UFMG, especialista em gastroenterologia, motilidade digestiva e testes respiratórios. Diretora Técnica da NU.V.E.M Medicina.',
}

const FORMACAO = [
  {
    icon: GraduationCap,
    titulo: 'Doutorado em Patologia',
    inst:   'Universidade Federal de Minas Gerais (UFMG)',
    detalhe: 'Doutora em Patologia pela maior universidade federal de Minas Gerais',
  },
  {
    icon: GraduationCap,
    titulo: 'Mestrado em Patologia',
    inst:   'Universidade Federal de Minas Gerais (UFMG)',
    detalhe: 'Mestre em Patologia com pesquisa em doenças digestivas',
  },
  {
    icon: Award,
    titulo: 'Título de Especialista em Gastroenterologia',
    inst:   'Federação Brasileira de Gastroenterologia (FBG)',
    detalhe: 'Certificação pela principal entidade de gastroenterologia do país',
  },
  {
    icon: Award,
    titulo: 'Residência Médica em Gastroenterologia',
    inst:   'Hospital Felício Rocho — Belo Horizonte',
    detalhe: 'Formação especializada em gastroenterologia no hospital de referência em BH',
  },
  {
    icon: Award,
    titulo: 'Residência em Clínica Médica e Patologia Clínica',
    inst:   'Hospital Sarah Kubitschek',
    detalhe: 'Base sólida em medicina interna e diagnóstico laboratorial',
  },
]

const EXPERIENCIA = [
  {
    cargo:  'Diretora e Responsável Técnica',
    local:  'NU.V.E.M Medicina e Ensino',
    desc:   'Fundadora e líder do ecossistema NU.V.E.M — clínica e centro de formação profissional em gastroenterologia e motilidade digestiva, certificado ISO 9001.',
    destaque: true,
  },
  {
    cargo:  'Professora Convidada — Pós-Graduação',
    local:  'Hospital Israelita Albert Einstein',
    desc:   'Docente do programa de pós-graduação em Doenças Funcionais e Manometria de um dos principais hospitais do Brasil.',
  },
  {
    cargo:  'Tutora de Treinamentos Especializados',
    local:  'NU.V.E.M Ensino',
    desc:   'Responsável por treinamentos hands-on em doenças funcionais, testes respiratórios (SIBO, H. pylori, intolerâncias) e manometria de alta resolução para profissionais de saúde de todo o Brasil.',
  },
  {
    cargo:  'Sócia Titular — GEDIIB',
    local:  'Grupo de Estudos da Doença Inflamatória Intestinal no Brasil',
    desc:   'Membro ativo do grupo de estudos de referência nacional em doenças inflamatórias intestinais.',
  },
  {
    cargo:  'Sócia Titular',
    local:  'Sociedade Brasileira de Motilidade Digestiva',
    desc:   'Integrante da sociedade científica dedicada ao estudo e desenvolvimento da motilidade digestiva no Brasil.',
  },
]

const LIVROS = [
  {
    titulo:   'Doenças Funcionais em Gastrenterologia',
    ano:      '2025',
    editora:  'Editora Rubio',
    desc:     'Obra de referência abrangente sobre doenças funcionais do aparelho digestivo, com protocolos diagnósticos e terapêuticos atualizados.',
    destaque: true,
  },
  {
    titulo:   'Métodos Diagnósticos em Doenças Funcionais e Motilidade Digestiva',
    ano:      '2025',
    editora:  'Editora Rubio',
    desc:     'Guia completo dos métodos diagnósticos aplicados às doenças funcionais e distúrbios de motilidade, com foco em aplicação clínica prática.',
    destaque: true,
  },
  {
    titulo:   'Manual Prático do Teste Respiratório do Hidrogênio Expirado',
    ano:      '2019',
    editora:  'Editora Rubio',
    desc:     'Manual de referência para diagnóstico de SIBO, intolerâncias alimentares e H. pylori por testes respiratórios — utilizado como base em treinamentos em todo o Brasil.',
    destaque: false,
  },
]

const AREAS = [
  'Gastroenterologia Clínica',
  'Motilidade Digestiva',
  'Testes Respiratórios (SIBO/IMO/H. pylori)',
  'Doenças Funcionais Digestivas',
  'Manometria de Alta Resolução',
  'pHmetria e Impedânciometria',
  'Intolerâncias Alimentares',
  'Disbiose e Microbiota Intestinal',
  'Doença Inflamatória Intestinal',
  'Ensino Médico Especializado',
]

export default function DraVeraPage() {
  return (
    <>
      <PageHero
        tag="Nossa Equipe"
        title={<>Dra. <em>Vera Ângelo</em></>}
        desc="Gastroenterologista · Mestre e Doutora pela UFMG · Diretora Técnica da NU.V.E.M Medicina"
      />

      {/* Profile section */}
      <SectionWrapper dark>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Left — foto + info card */}
          <div className="space-y-5 reveal">
            {/* Foto */}
            <div className="relative">
              <div className="w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden border-2 border-gold/30">
                <Image
                  src="/images/dra-vera.jpg"
                  alt="Dra. Vera Ângelo"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              {/* Gold line */}
              <div className="absolute bottom-0 left-0 right-0 max-w-[280px] mx-auto h-1 gold-line rounded-b-2xl" />
            </div>

            {/* Info card */}
            <div className="bg-ink border border-teal-light/[0.08] rounded-xl p-6 space-y-4">
              <div>
                <h2 className="text-[1.1rem] font-semibold text-white">Dra. Vera Ângelo</h2>
                <p className="text-[0.82rem] text-gold mt-1">Gastroenterologista</p>
              </div>

              <div className="space-y-2 text-[0.78rem] text-muted">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
                  CRM-MG 22284
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
                  RQE 10411 · RQE 22736
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold/60 shrink-0" />
                  Diretora Técnica — NU.V.E.M
                </div>
              </div>

              <div className="pt-2 border-t border-teal-light/[0.08]">
                <p className="text-[0.68rem] font-bold uppercase tracking-[.1em] text-faint mb-3">Redes Sociais</p>
                <div className="flex gap-2">
                  <a
                    href="https://www.instagram.com/veraangelo/"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-3 py-2 rounded-lg bg-deep border border-teal-light/[0.08] text-[0.75rem] text-muted hover:border-gold/30 hover:text-gold transition-all"
                  >
                    <Instagram className="w-3.5 h-3.5" />
                    Instagram
                  </a>
                </div>
              </div>

              <div className="pt-2 border-t border-teal-light/[0.08]">
                <div className="flex items-center gap-3">
                  <IsoSeal className="w-10 h-10 shrink-0" />
                  <p className="text-[0.72rem] text-faint leading-relaxed">
                    Clínica certificada <span className="text-gold font-medium">ISO 9001</span> — padrão internacional de qualidade
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right — bio + areas + CTA */}
          <div className="lg:col-span-2 space-y-8">

            {/* Bio */}
            <div className="reveal reveal-d1">
              <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-faint mb-4">Sobre a Dra. Vera</p>
              <div className="space-y-4 text-[0.9rem] font-light text-muted leading-[1.85]">
                <p>
                  A Dra. Vera Ângelo é Mestre e Doutora em Patologia pela Universidade Federal de
                  Minas Gerais (UFMG) e Gastroenterologista com Título de Especialista pela
                  Federação Brasileira de Gastroenterologia. Com formação sólida e trajetória
                  dedicada às doenças funcionais digestivas, tornou-se uma das principais
                  referências nacionais em testes respiratórios e motilidade digestiva.
                </p>
                <p>
                  Fundadora da NU.V.E.M Medicina, criou um ecossistema único que integra
                  assistência clínica de excelência com formação profissional avançada.
                  Professora convidada do Hospital Israelita Albert Einstein no programa de
                  pós-graduação em Doenças Funcionais e Manometria, é autora de três livros
                  pela Editora Rubio — obras de referência utilizadas em programas de
                  formação em todo o Brasil.
                </p>
                <p>
                  Sócia Titular do GEDIIB e da Sociedade Brasileira de Motilidade Digestiva,
                  a Dra. Vera mantém-se na vanguarda da produção científica e da prática
                  clínica, traduzindo o conhecimento mais recente em cuidado concreto e
                  humanizado para cada paciente da NU.V.E.M.
                </p>
              </div>
            </div>

            {/* Areas */}
            <div className="reveal reveal-d2">
              <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-faint mb-3">
                Áreas de atuação
              </p>
              <div className="flex flex-wrap gap-2">
                {AREAS.map(area => (
                  <span
                    key={area}
                    className="text-[0.72rem] font-medium px-3 py-1.5 rounded-full bg-teal-light/[0.06] border border-teal-light/10 text-muted hover:border-gold/30 hover:text-white transition-all"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-wrap gap-3 reveal reveal-d3">
              <Link href="/agendar" className="btn-gold">
                <Stethoscope className="w-4 h-4" />
                Agendar com a Dra. Vera
              </Link>
              <a
                href="https://www.instagram.com/veraangelo/"
                target="_blank" rel="noopener noreferrer"
                className="btn-ghost"
              >
                <Instagram className="w-4 h-4" />
                Seguir no Instagram
              </a>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Formação */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Formação Acadêmica</p>
          <h2 className="sec-title reveal reveal-d1">Títulos e <em>Especializações</em></h2>
        </div>
        <div className="space-y-4 max-w-3xl mx-auto">
          {FORMACAO.map((f, i) => (
            <div
              key={f.titulo}
              className={`flex items-start gap-5 bg-deep border border-teal-light/[0.08] rounded-xl p-6 hover:border-gold/25 transition-all reveal reveal-d${i % 3}`}
            >
              <div className="w-11 h-11 rounded-lg bg-gold-dim border border-gold/25 flex items-center justify-center text-gold shrink-0">
                <f.icon className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-[0.95rem] font-semibold text-white mb-1">{f.titulo}</h3>
                <p className="text-[0.82rem] text-gold mb-1">{f.inst}</p>
                <p className="text-[0.78rem] text-faint leading-relaxed">{f.detalhe}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Experiência */}
      <SectionWrapper dark>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Trajetória Profissional</p>
          <h2 className="sec-title reveal reveal-d1">Experiência e <em>Atuação</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 max-w-4xl mx-auto">
          {EXPERIENCIA.map((e, i) => (
            <div
              key={e.cargo}
              className={`bg-ink border rounded-xl p-7 hover:-translate-y-0.5 transition-all reveal reveal-d${i % 2} ${e.destaque ? 'border-gold/25 md:col-span-2' : 'border-teal-light/[0.08]'}`}
            >
              {e.destaque && (
                <span className="inline-block text-[0.65rem] font-bold tracking-[.12em] uppercase text-gold bg-gold-dim border border-gold-line px-2.5 py-0.5 rounded-full mb-3">
                  Cargo Principal
                </span>
              )}
              <h3 className="text-[0.95rem] font-semibold text-white mb-1">{e.cargo}</h3>
              <p className="text-[0.82rem] text-gold mb-3">{e.local}</p>
              <p className="text-[0.82rem] font-light text-muted leading-[1.75]">{e.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Livros */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Publicações</p>
          <h2 className="sec-title reveal reveal-d1">Livros e <em>Contribuições Literárias</em></h2>
          <p className="text-[0.88rem] text-muted mt-3 reveal reveal-d2">
            Autora de obras de referência pela Editora Rubio, utilizadas em programas de formação em todo o Brasil.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {LIVROS.map((livro, i) => (
            <div
              key={livro.titulo}
              className={`relative bg-deep border rounded-2xl p-7 hover:-translate-y-1 transition-all reveal reveal-d${i} flex flex-col ${livro.destaque ? 'border-gold/25' : 'border-teal-light/[0.08]'}`}
            >
              <div className="w-12 h-12 rounded-xl bg-gold-dim border border-gold/25 flex items-center justify-center text-gold mb-5">
                <BookOpen className="w-5 h-5" />
              </div>

              {livro.destaque && (
                <span className="inline-block text-[0.62rem] font-bold tracking-[.1em] uppercase text-gold bg-gold-dim border border-gold-line px-2 py-0.5 rounded-full mb-3 w-fit">
                  Novo · {livro.ano}
                </span>
              )}
              {!livro.destaque && (
                <span className="text-[0.7rem] text-faint mb-3 block">{livro.ano}</span>
              )}

              <h3 className="text-[0.92rem] font-semibold text-white mb-2 leading-snug flex-1">
                {livro.titulo}
              </h3>
              <p className="text-[0.75rem] text-gold mb-3">{livro.editora}</p>
              <p className="text-[0.8rem] font-light text-muted leading-[1.7]">{livro.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Equipe link */}
      <SectionWrapper dark>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          <div>
            <p className="sec-tag reveal">Nossa Equipe</p>
            <h3 className="text-[1.3rem] font-serif font-light text-white mt-1 reveal reveal-d1">
              Conheça também a <em className="text-gold italic" style={{fontStyle:'italic'}}>Dra. Eliane</em>
            </h3>
            <p className="text-[0.85rem] text-muted mt-2 reveal reveal-d2">
              Diretora Técnica Substituta · Cirurgiã Pediátrica · CRM-MG 27601
            </p>
          </div>
          <Link href="/equipe/dra-eliane" className="btn-ghost shrink-0 reveal reveal-d2">
            Ver perfil completo <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner
          title="Agende sua consulta com a Dra. Vera"
          desc="Atendimento especializado em gastroenterologia, motilidade digestiva e testes respiratórios com padrão ISO 9001."
        />
      </SectionWrapper>
    </>
  )
}
