import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { Instagram, Award, GraduationCap, Stethoscope, ArrowRight } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { IsoSeal }        from '@/components/icons/IsoSeal'

export const metadata: Metadata = {
  title:       'Dra. Vera Ângelo · Gastroenterologista',
  description: 'Dra. Vera Ângelo, Mestre e Doutora pela UFMG, especialista em gastroenterologia, motilidade digestiva e testes respiratórios. Diretora Técnica da NU.V.E.M Medicina.',
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
    inst:   'Hospital Felício Rocho · Belo Horizonte',
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
    desc:   'Fundadora e líder do ecossistema NU.V.E.M: clínica e centro de formação profissional em gastroenterologia e motilidade digestiva, certificado ISO 9001.',
    destaque: true,
  },
  {
    cargo:  'Professora Convidada · Pós-Graduação',
    local:  'Hospital Israelita Albert Einstein',
    desc:   'Docente do programa de pós-graduação em Doenças Funcionais e Manometria de um dos principais hospitais do Brasil.',
    destaque: false,
  },
  {
    cargo:  'Tutora de Treinamentos Especializados',
    local:  'NU.V.E.M Ensino',
    desc:   'Responsável por treinamentos hands-on em DGBI – Distúrbio da Interação Cérebro-Intestino, testes respiratórios (SIBO, H. pylori, intolerâncias) e manometria de alta resolução para profissionais de saúde de todo o Brasil.',
    destaque: false,
  },
  {
    cargo:  'Sócia Titular · GEDIIB',
    local:  'Grupo de Estudos da Doença Inflamatória Intestinal no Brasil',
    desc:   'Membro ativo do grupo de estudos de referência nacional em doenças inflamatórias intestinais.',
    destaque: false,
  },
  {
    cargo:  'Sócia Titular',
    local:  'Sociedade Brasileira de Motilidade Digestiva',
    desc:   'Integrante da sociedade científica dedicada ao estudo e desenvolvimento da motilidade digestiva no Brasil.',
    destaque: false,
  },
]

const LIVROS = [
  {
    titulo:   'Doenças Funcionais na Gastrenterologia',
    papel:    'Organizadora',
    ano:      '2025',
    editora:  'Editora Rubio',
    capa:     '/images/livro-doencas-funcionais-gastroenterologia.jpg',
    href:     'https://rubio.com.br/livro/a61637/9786588340783/doencas-funcionais-na-gatroenterologia.html',
    destaque: true,
  },
  {
    titulo:   'Métodos Diagnósticos em Doenças Funcionais e Motilidade Digestiva',
    papel:    'Coorganizadora',
    ano:      '2025',
    editora:  'Editora Rubio',
    capa:     '/images/livro-metodos-diagnosticos-motilidade.jpg',
    href:     'https://rubio.com.br/livro/c58906/9786588340844/metodos-diagnosticos-em-doencas-funcionais-e-motilidade-digestiva-do-nucleo-de-fisiologia-gastrintes.html',
    destaque: true,
  },
  {
    titulo:   'Perguntas e Respostas Comentadas de Gastrenterologia Clínica e Hepatologia',
    papel:    'Organizadora',
    ano:      '2025',
    editora:  'Editora Rubio',
    capa:     '/images/livro-gastrenterologia-clinica-hepatologia.jpg',
    href:     'https://rubio.com.br/livro/a62313/9786588340998/perguntas-e-respostas-comentadas-de-gastrenterologia-clinica-e-hepatologia.html',
    destaque: true,
  },
  {
    titulo:   'Testes Respiratórios em Gastrenterologia: Hidrogênio, Metano e Helicobacter pylori',
    papel:    'Autora',
    ano:      '2024',
    editora:  'Editora Rubio',
    capa:     '/images/livro-testes-respiratorios-gastrenterologia.jpg',
    href:     'https://rubio.com.br/livro/a62312/9786588340974/testes-respiratorios-em-gastrenterologia-hidrogenio-metano-e-helicobacter-pylori.html',
    destaque: false,
  },
]

const AREAS = [
  'Gastroenterologia Clínica',
  'Motilidade Digestiva',
  'Testes Respiratórios (SIBO/IMO/H. pylori)',
  'DGBI – Distúrbio da Interação Cérebro-Intestino',
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

      <SectionWrapper dark grid>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 items-start">

          {/* Left */}
          <div className="space-y-5 reveal">
            <div className="relative">
              <div className="w-full aspect-square max-w-[280px] mx-auto rounded-2xl overflow-hidden border-2 border-teal/20">
                <Image
                  src="/images/dra-vera.jpg"
                  alt="Dra. Vera Ângelo"
                  fill
                  className="object-cover object-top"
                  priority
                />
              </div>
              <div className="absolute bottom-0 left-0 right-0 max-w-[280px] mx-auto h-1 gold-line rounded-b-2xl" />
            </div>

            <div className="bg-white border border-teal/10 rounded-xl p-6 space-y-4 shadow-sm">
              <div>
                <h2 className="text-[1.1rem] font-semibold text-steel">Dra. Vera Ângelo</h2>
                <p className="text-[0.9rem] text-teal mt-1">Gastroenterologista</p>
              </div>
              <div className="space-y-2 text-[0.78rem] text-steel/60">
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal/50 shrink-0" />
                  CRM-MG 22284
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal/50 shrink-0" />
                  RQE 10411 · RQE 22736
                </div>
                <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal/50 shrink-0" />
                  Diretora Técnica · NU.V.E.M
                </div>
              </div>
              <div className="pt-2 border-t border-teal/10">
                <p className="text-[0.68rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-3">Redes Sociais</p>
                <a
                  href="https://www.instagram.com/veraangelo/"
                  target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-cloud border border-teal/10 text-[0.75rem] text-steel/60 hover:border-teal/30 hover:text-teal transition-all"
                >
                  <Instagram className="w-3.5 h-3.5" />
                  Instagram
                </a>
              </div>
              <div className="flex items-center gap-3 pt-2 border-t border-teal/10">
                <IsoSeal size={40} />
                <div>
                  <p className="text-[0.72rem] font-semibold text-steel">ISO 9001</p>
                  <p className="text-[0.65rem] text-steel/40">Diretora Técnica</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="lg:col-span-2 space-y-8">
            <div className="reveal reveal-d1">
              <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-steel/45 mb-4">Sobre a Dra. Vera</p>
              <div className="space-y-4 text-[1rem] font-light text-steel/65 leading-[1.85]">
                <p>
                  A Dra. Vera Ângelo é Mestre e Doutora em Patologia pela Universidade Federal de
                  Minas Gerais (UFMG) e Gastroenterologista com Título de Especialista pela
                  Federação Brasileira de Gastroenterologia. Com formação sólida e trajetória
                  dedicada ao DGBI – Distúrbio da Interação Cérebro-Intestino, tornou-se uma das principais
                  referências nacionais em testes respiratórios e motilidade digestiva.
                </p>
                <p>
                  Fundadora da NU.V.E.M Medicina, criou um ecossistema único que integra
                  assistência clínica de excelência com formação profissional avançada.
                  Professora convidada do Hospital Israelita Albert Einstein no programa de
                  pós-graduação em Doenças Funcionais e Manometria, é autora de diversas obras
                  pela Editora Rubio, sendo os três lançamentos mais recentes destaques em
                  programas de formação em todo o Brasil.
                </p>
                <p>
                  Sócia Titular do GEDIIB e da Sociedade Brasileira de Motilidade Digestiva,
                  a Dra. Vera mantém-se na vanguarda da produção científica e da prática
                  clínica, traduzindo o conhecimento mais recente em cuidado concreto e
                  humanizado para cada paciente da NU.V.E.M.
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
                Agendar com a Dra. Vera
              </Link>
              <a href="https://www.instagram.com/veraangelo/" target="_blank" rel="noopener noreferrer" className="btn-ghost">
                <Instagram className="w-4 h-4" />
                Seguir no Instagram
              </a>
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
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Publicações</p>
          <h2 className="sec-title reveal reveal-d1">Livros e <em>Contribuições Literárias</em></h2>
          <p className="text-[0.97rem] text-steel/60 mt-3 reveal reveal-d2">
            Autora de obras de referência pela Editora Rubio, utilizadas em programas de formação em todo o Brasil.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {LIVROS.map((livro, i) => (
            <a
              key={livro.titulo}
              href={livro.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative bg-white border rounded-2xl overflow-hidden shadow-sm hover:-translate-y-2 hover:shadow-xl transition-all duration-300 reveal reveal-d${i} flex flex-col ${livro.destaque ? 'border-teal/20' : 'border-teal/10'}`}
            >
              {/* Cover image */}
              <div className="relative w-full aspect-[3/4] bg-gradient-to-br from-[#002a3d] to-[#00465F] overflow-hidden">
                <Image
                  src={livro.capa}
                  alt={`Capa: ${livro.titulo}`}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
                {livro.destaque && (
                  <div className="absolute top-2 left-2">
                    <span className="text-[0.55rem] font-bold tracking-[.1em] uppercase text-teal bg-white/90 border border-teal/20 px-2 py-0.5 rounded-full">
                      Novo · {livro.ano}
                    </span>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-4 flex flex-col flex-1">
                <span className="text-[0.65rem] font-bold tracking-[.08em] uppercase text-teal/70 mb-1.5">{livro.papel}</span>
                <h3 className="text-[0.82rem] font-semibold text-steel leading-snug mb-2 flex-1">{livro.titulo}</h3>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-teal/8">
                  <span className="text-[0.7rem] text-steel/45">{livro.editora} · {livro.ano}</span>
                  <ArrowRight className="w-3.5 h-3.5 text-teal opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </div>
            </a>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper dark>
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 max-w-3xl mx-auto">
          <div>
            <p className="sec-tag reveal">Nossa Equipe</p>
            <h3 className="text-[1.3rem] font-serif font-light text-steel mt-1 reveal reveal-d1">
              Conheça também a <em className="text-teal italic">Dra. Eliane</em>
            </h3>
            <p className="text-[0.93rem] text-steel/60 mt-2 reveal reveal-d2">
              Diretora Técnica Substituta · Cirurgiã Pediátrica · CRM-MG 27601
            </p>
          </div>
          <Link href="/dra-eliane-basques" className="btn-ghost shrink-0 reveal reveal-d2">
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
