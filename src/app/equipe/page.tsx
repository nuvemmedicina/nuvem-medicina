import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'

export const metadata: Metadata = {
  title:       'Equipe · NU.V.E.M Medicina',
  description: 'Conheça a equipe multidisciplinar da NU.V.E.M Medicina: gastroenterologistas, fisioterapeuta pélvica, cirurgiãs, nefrologista, pediatra e clínicos.',
}

const SOCIAS = [
  {
    nome:  'Dra. Vera Ângelo',
    esp:   'Gastroenterologia e Motilidade',
    crm:   'CRM-MG 22284 · RQE 10411 · RQE 22736',
    cargo: 'Sócia Fundadora · Diretora Técnica',
    foto:  '/images/dra-vera.jpg',
    slug:  'dra-vera',
    areas: ['SIBO / IMO', 'Testes Respiratórios', 'Motilidade Digestiva', 'DGBI'],
    bio:   'Mestre e Doutora pela UFMG. Professora convidada do Hospital Israelita Albert Einstein. Autora de diversas obras pela Editora Rubio. Referência nacional em testes respiratórios e motilidade digestiva.',
  },
  {
    nome:  'Dra. Eliane Basques',
    esp:   'Manometria Anorretal',
    crm:   'CRM-MG 27601 · RQE 9324',
    cargo: 'Sócia Fundadora · Diretora Técnica Substituta',
    foto:  '/images/dra-eliane.jpg',
    slug:  'dra-eliane',
    areas: ['Manometria Anorretal', 'Assoalho Pélvico', 'Cirurgia Pediátrica', 'Casos Interdisciplinares'],
    bio:   'Cirurgiã pediátrica com expertise em manometria anorretal e disfunções do assoalho pélvico. Cofundadora da NU.V.E.M, atua na interface entre gastroenterologia e cirurgia.',
  },
]

const EQUIPE = [
  { nome: 'Dra. Amanda Araújo',          esp: 'Gastroenterologia e Motilidade Digestiva', reg: '',                          foto: '/images/Amanda-Araujo.jpg',          areas: ['Gastroenterologia', 'Motilidade Digestiva'] },
  { nome: 'Dra. Anna Karoline',          esp: 'Fisioterapia Pélvica',           reg: 'Crefito 4/270579-F',                  foto: '/images/anna-karoline.jpg',          areas: ['Biofeedback EMG', 'Assoalho Pélvico', 'Incontinência'] },
  { nome: 'Dra. Adrianna Buzatti Viana', esp: 'Cirurgia Pediátrica',            reg: 'CRMMG 71689 · RQE 44101 · RQE 59942', foto: '/images/adrianna-buzatti-viana.jpg', areas: ['Cirurgia Pediátrica', 'Casos Complexos'] },
  { nome: 'Dra. Claudia Utsch',          esp: 'Gastroenterologia',              reg: 'CRM 47651-MG · RQE 51470 · 51471',    foto: '/images/claudia-utsch.jpg',          areas: ['Gastroenterologia Clínica', 'Doenças Digestivas'] },
  { nome: 'Dra. Camilla Mendes',         esp: 'Clínica Médica',                 reg: 'CRM 61518',                            foto: '/images/camilla-mendes.jpg',         areas: ['Clínica Médica', 'Medicina Interna'] },
  { nome: 'Dra. Danielle Martins',       esp: 'Gastroenterologia e Motilidade', reg: 'CRM 72935',                            foto: '/images/danielle-martins.jpg',       areas: ['Gastroenterologia', 'DGBI'] },
  { nome: 'Dr. Gabriel de Souza Fernandes Filho', esp: 'Gastroenterologia',    reg: '',                                     foto: '/images/dr-Gabriel-de-Souza-Fernandes-Filho.jpg', areas: ['Gastroenterologia Clínica'] },
  { nome: 'Dra. Larissa Veiga Raña',    esp: 'Gastroenterologia',              reg: 'CRMMG 73632 · RQE 65001',              foto: '/images/larissa-veiga-rana.jpg',     areas: ['Gastroenterologia Clínica'] },
  { nome: 'Dra. Luiza Auarek',          esp: 'Nefrologia',                     reg: 'CRM 81521 · RQE 62607 · RQE 54226',   foto: '/images/luiza-auarek.jpg',           areas: ['Nefrologia', 'Interface GI-Renal'] },
  { nome: 'Dra. Mariana Fernandes',      esp: 'Pediatria',                      reg: 'CRM 65936',                            foto: '/images/mariana-fernandes.jpg',      areas: ['Saúde Digestiva Infantil', 'Pediatria'] },
  { nome: 'Dra. Raissa Dalat',          esp: 'Cirurgia Pediátrica',            reg: 'CRMMG 78824 · RQE 61983',              foto: '/images/raissa-dalat.jpg',           areas: ['Cirurgia Pediátrica'] },
  { nome: 'Dr. Thiago Guimarães',       esp: 'Clínica Médica e Hematologia',   reg: 'RQE 50.163',                           foto: '/images/thiago-guimaraes.jpg',       areas: ['Clínica Médica', 'Hematologia'] },
]

const TECNICA = [
  { nome: 'Elisangela Duarte', cargo: 'Gerente',               foto: '/images/elisangela.jpg' },
  { nome: 'Larissa Simão',     cargo: 'Técnica de Enfermagem', foto: '/images/larissa.jpg'    },
  { nome: 'Camila Marques',    cargo: 'Técnica de Enfermagem', foto: '/images/camila.jpg'     },
  { nome: 'Nazinha',           cargo: 'Recepcionista',         foto: '/images/nazinha.jpg'    },
]

const PARCEIROS = [
  { nome: 'Viabile Projetos Arquitetônicos', papel: 'Projeto Arquitetônico' },
  { nome: 'Carmem Santiago',                 papel: 'Criação da Marca e Papelaria' },
  { nome: 'Perícia MG',                      papel: 'Engenharia de Segurança e NRs' },
  { nome: 'Engenharia ECO7',                 papel: 'Execução da Obra' },
  { nome: 'Ana Webdesign',                   papel: 'Site e Mídias Sociais' },
  { nome: 'TGL Contabilidade',               papel: 'Contabilidade' },
]

export default function EquipePage() {
  return (
    <>
      <PageHero
        tag="Nossa Equipe"
        title={<>Especialistas unidos pelo <em>cuidado</em></>}
        desc="Uma equipe multidisciplinar de excelência: gastroenterologistas, fisioterapeuta pélvica, cirurgiãs, nefrologista, pediatra e clínicos, unidos pelo padrão ISO 9001."
      />

      {/* Sócias Fundadoras */}
      <SectionWrapper dark grid>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Liderança</p>
          <h2 className="sec-title reveal reveal-d1">Sócias <em>Fundadoras</em></h2>
          <p className="text-[0.97rem] text-steel/65 mt-3 reveal reveal-d2 max-w-xl mx-auto">
            As médicas que fundaram a NU.V.E.M e definem o padrão de excelência da clínica.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SOCIAS.map((s, i) => (
            <Link key={s.slug} href={`/equipe/${s.slug}`}
              className={`group block bg-white border border-teal/12 rounded-2xl overflow-hidden hover:border-teal/30 hover:-translate-y-1 hover:shadow-md transition-all reveal reveal-d${i}`}>
              <div className="relative h-72 w-full overflow-hidden" style={{background:'linear-gradient(135deg,#003040,#00465F)'}}>
                <Image src={s.foto} alt={s.nome} fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#00465F]/80 via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal bg-white/90 border border-teal/20 px-3 py-1 rounded-full backdrop-blur-sm">
                    Sócia Fundadora
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-[1.1rem] font-semibold text-steel mb-1">{s.nome}</h3>
                <p className="text-[0.93rem] text-teal mb-1">{s.esp}</p>
                <p className="text-[0.72rem] text-steel/40 mb-4">{s.crm}</p>
                <p className="text-[0.9rem] font-light text-steel/60 leading-[1.75] mb-5">{s.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {s.areas.map(a => (
                    <span key={a} className="text-[0.68rem] font-medium px-2.5 py-1 rounded-full bg-teal/8 border border-teal/15 text-teal/80">{a}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[0.9rem] font-medium text-teal group-hover:gap-2.5 transition-all">
                  Ver perfil completo <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </SectionWrapper>

      {/* Equipe Clínica */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Equipe Multidisciplinar</p>
          <h2 className="sec-title reveal reveal-d1">Profissionais <em>Parceiros</em></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EQUIPE.map((m, i) => (
            <div key={m.nome}
              className={`group bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm hover:border-teal/28 hover:-translate-y-1 hover:shadow-lg transition-all reveal reveal-d${i % 3}`}>
              <div className="relative h-60 w-full overflow-hidden" style={{ background: 'linear-gradient(135deg,#003040,#00465F)' }}>
                <Image src={m.foto} alt={m.nome} fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-[#001a27]/60 via-transparent to-transparent" />
              </div>
              <div className="p-5">
                <h3 className="text-[0.95rem] font-semibold text-steel leading-tight mb-0.5">{m.nome}</h3>
                <p className="text-[0.8rem] text-teal mb-1">{m.esp}</p>
                <p className="text-[0.7rem] text-steel/40 mb-3">{m.reg}</p>
                <div className="flex flex-wrap gap-1.5">
                  {m.areas.map(a => (
                    <span key={a} className="text-[0.65rem] font-medium px-2 py-1 rounded-full bg-teal/8 border border-teal/10 text-steel/50">{a}</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Equipe Técnica */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Equipe Técnica</p>
          <h2 className="sec-title reveal reveal-d1">Quem cuida de <em>você</em></h2>
          <p className="text-[0.97rem] font-light text-steel/60 max-w-lg mx-auto mt-3 reveal reveal-d2">
            Profissionais dedicados que garantem o acolhimento e a excelência operacional da NU.V.E.M.
          </p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-5 max-w-3xl mx-auto">
          {TECNICA.map((m, i) => (
            <div
              key={m.nome}
              className={`group flex flex-col items-center text-center reveal reveal-d${i % 4}`}
            >
              <div className="relative w-24 h-24 rounded-full overflow-hidden border-2 border-teal/15 shadow-sm group-hover:border-teal/40 group-hover:shadow-md transition-all duration-300 mb-4">
                <Image src={m.foto} alt={m.nome} fill className="object-cover object-top" />
              </div>
              <h3 className="text-[0.9rem] font-semibold text-steel leading-tight mb-1">{m.nome}</h3>
              <span className="text-[0.68rem] font-bold tracking-[.1em] uppercase text-teal/60">{m.cargo}</span>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Parceiros */}
      <SectionWrapper dark grid>
        <div className="text-center mb-10">
          <p className="sec-tag justify-center reveal">Ecossistema NU.V.E.M</p>
          <h2 className="sec-title reveal reveal-d1">Parceiros <em>Estratégicos</em></h2>
          <p className="text-[0.93rem] text-steel/65 mt-3 reveal reveal-d2 max-w-lg mx-auto">
            Profissionais e empresas que contribuíram para construir e estruturar a NU.V.E.M.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {PARCEIROS.map((p, i) => (
            <div key={p.nome} className={`bg-white border border-teal/10 rounded-xl p-5 shadow-sm hover:border-teal/22 transition-all reveal reveal-d${i % 3}`}>
              <span className="block w-5 h-px bg-teal mb-3" />
              <h3 className="text-[0.97rem] font-semibold text-steel mb-1">{p.nome}</h3>
              <p className="text-[0.75rem] text-steel/55">{p.papel}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner
          title="Conheça nossa equipe pessoalmente"
          desc="Agende sua consulta e experimente o cuidado multidisciplinar com padrão ISO 9001 da NU.V.E.M Medicina."
        />
      </SectionWrapper>
    </>
  )
}
