import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'

export const metadata: Metadata = {
  title:       'Equipe · NU.V.E.M Medicina',
  description: 'Conheça a equipe multidisciplinar da NU.V.E.M Medicina — gastroenterologistas, fisioterapeuta pélvica, cirurgiãs, nefrologista, pediatra e clínicos.',
}

const SOCIAS = [
  {
    nome:  'Dra. Vera Ângelo',
    esp:   'Gastroenterologia e Motilidade',
    crm:   'CRM-MG 22284 · RQE 10411 · RQE 22736',
    cargo: 'Sócia Fundadora · Diretora Técnica',
    foto:  '/images/dra-vera.jpg',
    slug:  'dra-vera',
    areas: ['SIBO / IMO', 'Testes Respiratórios', 'Motilidade Digestiva', 'Doenças Funcionais'],
    bio:   'Mestre e Doutora pela UFMG. Professora convidada do Hospital Israelita Albert Einstein. Autora de 3 livros pela Editora Rubio. Referência nacional em testes respiratórios e motilidade digestiva.',
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
  { nome: 'Dra. Anna Karoline',          esp: 'Fisioterapia Pélvica',           foto: '/images/anna-karoline.jpg',          areas: ['Biofeedback EMG', 'Assoalho Pélvico', 'Incontinência'] },
  { nome: 'Dra. Adrianna Buzatti Viana', esp: 'Cirurgia Pediátrica',            foto: '/images/adrianna-buzatti-viana.jpg', areas: ['Cirurgia Pediátrica', 'Casos Complexos'] },
  { nome: 'Dra. Claudia Utsch',          esp: 'Gastroenterologia',              foto: '/images/claudia-utsch.jpg',          areas: ['Gastroenterologia Clínica', 'Doenças Digestivas'] },
  { nome: 'Dra. Camilla Mendes',         esp: 'Clínica Médica',                 foto: '/images/camilla-mendes.jpg',         areas: ['Clínica Médica', 'Medicina Interna'] },
  { nome: 'Dra. Danielle Martins',       esp: 'Gastroenterologia',              foto: '/images/danielle-martins.jpg',       areas: ['Gastroenterologia', 'Doenças Funcionais'] },
  { nome: 'Dr. Felipe Nelson',           esp: 'Gastroenterologia e Motilidade', foto: '/images/felipe-nelson.jpg',          areas: ['Manometria', 'pHmetria', 'Refluxo'] },
  { nome: 'Dra. Larissa Veiga Raña',    esp: 'Gastroenterologia',              foto: '/images/larissa-veiga-rana.jpg',     areas: ['Gastroenterologia Clínica'] },
  { nome: 'Dra. Luiza Auarek',          esp: 'Nefrologia',                     foto: '/images/luiza-auarek.jpg',           areas: ['Nefrologia', 'Interface GI-Renal'] },
  { nome: 'Dra. Mariana Fernandes',      esp: 'Pediatria',                      foto: '/images/mariana-fernandes.jpg',      areas: ['Saúde Digestiva Infantil', 'Pediatria'] },
  { nome: 'Dra. Raissa Dalat',          esp: 'Cirurgia Pediátrica',            foto: '/images/raissa-dalat.jpg',           areas: ['Cirurgia Pediátrica'] },
  { nome: 'Dr. Thiago Guimarães',       esp: 'Clínica Médica e Hematologia',   foto: '/images/thiago-guimaraes.jpg',       areas: ['Clínica Médica', 'Hematologia'] },
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
        desc="Uma equipe multidisciplinar de excelência — gastroenterologistas, fisioterapeuta pélvica, cirurgiãs, nefrologista, pediatra e clínicos, unidos pelo padrão ISO 9001."
      />

      {/* Sócias Fundadoras */}
      <SectionWrapper dark>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Liderança</p>
          <h2 className="sec-title reveal reveal-d1">Sócias <em>Fundadoras</em></h2>
          <p className="text-[0.88rem] text-muted mt-3 reveal reveal-d2 max-w-xl mx-auto">
            As médicas que fundaram a NU.V.E.M e definem o padrão de excelência da clínica.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {SOCIAS.map((s, i) => (
            <Link key={s.slug} href={`/equipe/${s.slug}`}
              className={`group block bg-ink border border-gold/20 rounded-2xl overflow-hidden hover:border-gold/50 hover:-translate-y-1 transition-all reveal reveal-d${i}`}>
              <div className="relative h-72 w-full" style={{background:'linear-gradient(135deg,#071520,#00293A)'}}>
                <Image src={s.foto} alt={s.nome} fill
                  className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
                <div className="absolute top-4 left-4">
                  <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-gold bg-ink/80 border border-gold/40 px-3 py-1 rounded-full backdrop-blur-sm">
                    Sócia Fundadora
                  </span>
                </div>
              </div>
              <div className="p-7">
                <h3 className="text-[1.1rem] font-semibold text-white mb-1">{s.nome}</h3>
                <p className="text-[0.85rem] text-gold mb-1">{s.esp}</p>
                <p className="text-[0.72rem] text-faint mb-4">{s.crm}</p>
                <p className="text-[0.82rem] font-light text-muted leading-[1.75] mb-5">{s.bio}</p>
                <div className="flex flex-wrap gap-1.5 mb-5">
                  {s.areas.map(a => (
                    <span key={a} className="text-[0.68rem] font-medium px-2.5 py-1 rounded-full bg-gold-dim border border-gold/20 text-gold/80">{a}</span>
                  ))}
                </div>
                <span className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-gold group-hover:gap-2.5 transition-all">
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
          <h2 className="sec-title reveal reveal-d1">Profissionais <em>Especialistas</em></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EQUIPE.map((m, i) => (
            <div key={m.nome}
              className={`bg-deep border border-teal-light/[0.08] rounded-xl p-6 hover:border-teal-light/25 hover:-translate-y-0.5 transition-all reveal reveal-d${i % 3}`}>
              <div className="flex items-center gap-4 mb-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border border-teal-light/20 shrink-0 relative">
                  <Image src={m.foto} alt={m.nome} fill className="object-cover object-top" />
                </div>
                <div>
                  <h3 className="text-[0.92rem] font-semibold text-white leading-tight">{m.nome}</h3>
                  <p className="text-[0.78rem] text-gold mt-0.5">{m.esp}</p>
                </div>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {m.areas.map(a => (
                  <span key={a} className="text-[0.65rem] font-medium px-2 py-1 rounded-full bg-teal-light/[0.06] border border-teal-light/10 text-faint">{a}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Parceiros */}
      <SectionWrapper dark>
        <div className="text-center mb-10">
          <p className="sec-tag justify-center reveal">Ecossistema NU.V.E.M</p>
          <h2 className="sec-title reveal reveal-d1">Parceiros <em>Estratégicos</em></h2>
          <p className="text-[0.85rem] text-muted mt-3 reveal reveal-d2 max-w-lg mx-auto">
            Profissionais e empresas que contribuíram para construir e estruturar a NU.V.E.M.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {PARCEIROS.map((p, i) => (
            <div key={p.nome} className={`bg-ink border border-teal-light/[0.08] rounded-xl p-5 reveal reveal-d${i % 3}`}>
              <span className="block w-5 h-px bg-gold mb-3" />
              <h3 className="text-[0.88rem] font-semibold text-white mb-1">{p.nome}</h3>
              <p className="text-[0.75rem] text-muted">{p.papel}</p>
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