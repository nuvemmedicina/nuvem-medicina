import type { Metadata } from 'next'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { EQUIPE_SEM_PAGINA, ORDEM_EQUIPE, PROFISSIONAIS, type Foto, type MembroSemPagina, type Profissional } from '@/lib/profissionais'
import { especialidadeDeExibicao, formatarRegistro, iniciais, nomeCompleto } from '@/lib/profissionais-texto'
import { EH_PRODUCAO, publicacaoDe, temPaginaPublica } from '@/lib/profissionais-publicacao'

export const metadata: Metadata = {
  alternates:  { canonical: '/equipe' },
  title:       'Equipe · NU.V.E.M Medicina',
  description: 'Conheça a equipe multidisciplinar da NU.V.E.M Medicina: gastroenterologistas, fisioterapeuta pélvica, cirurgiãs, nefrologista, pediatra e clínicos.',
}

/**
 * Cartões dos profissionais, gerados de src/lib/profissionais.ts.
 *
 * Em produção:
 *   · "o que faz na NU.V.E.M" só aparece quando a página da pessoa está
 *     aprovada (é texto novo, que passa pela aprovação);
 *   · o cartão só leva à página individual quando ela está no ar (aprovada,
 *     ou uma das duas páginas antigas);
 *   · a foto é a que o site já usa, até chegar a aprovada pela anamnese.
 * Na prévia, tudo aparece e todos os cartões com página levam a ela.
 */
type Cartao = {
  chave: string
  nome: string
  registro: string
  especialidade: string
  cargo?: string
  foto: Foto | null
  oQueFaz: string[] | null
  href: string | null
}

async function cartaoDe(p: Profissional): Promise<Cartao> {
  const pub = await publicacaoDe(p)
  const mostrarNovo = pub.aprovada || !EH_PRODUCAO
  return {
    chave: p.slugAnamnese,
    nome: nomeCompleto(p),
    registro: formatarRegistro(p.registro),
    especialidade: especialidadeDeExibicao(p).rotulo,
    cargo: p.cargo,
    foto: pub.aprovada ? pub.foto : p.foto,
    oQueFaz: mostrarNovo ? p.oQueFazNaNuvem.map(s => s.nome) : null,
    href: !EH_PRODUCAO || (await temPaginaPublica(p)) ? `/${p.slug}` : null,
  }
}

function cartaoSemPagina(m: MembroSemPagina): Cartao {
  return {
    chave: m.slugAnamnese,
    nome: nomeCompleto(m),
    registro: formatarRegistro(m.registro),
    especialidade: especialidadeDeExibicao(m).rotulo,
    foto: m.foto,
    oQueFaz: null,
    href: null,
  }
}

async function cartoes() {
  const todos = [
    ...(await Promise.all(PROFISSIONAIS.map(cartaoDe))),
    ...EQUIPE_SEM_PAGINA.map(cartaoSemPagina),
  ]
  return ORDEM_EQUIPE.map(chave => todos.find(c => c.chave === chave)).filter((c): c is Cartao => !!c)
}

const SOCIAS = new Set(['vera-angelo', 'eliane-basques'])

function CartaoProfissional({ c, grande }: { c: Cartao; grande?: boolean }) {
  const corpo = (
    <>
      <div className="relative w-full aspect-[4/5] overflow-hidden bg-mist">
        {c.foto ? (
          <Image src={c.foto.src} alt={c.nome} fill
            sizes={grande ? '(min-width: 768px) 440px, 100vw' : '(min-width: 1024px) 380px, (min-width: 640px) 50vw, 100vw'}
            className="object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
        ) : (
          <span className="absolute inset-0 flex items-center justify-center font-serif text-teal text-[3.5rem]" aria-hidden>
            {iniciais(c.nome.replace(/^Dra?\.\s+/, ''))}
          </span>
        )}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gold" aria-hidden />
      </div>
      <div className="p-6 flex-1 flex flex-col">
        <p className="text-[0.68rem] font-semibold uppercase tracking-[.16em] text-gold-dark mb-2">{c.especialidade}</p>
        <h3 className={`font-serif text-teal leading-tight ${grande ? 'text-[1.9rem]' : 'text-[1.5rem]'}`}>{c.nome}</h3>
        <p className="mt-1 text-[0.75rem] text-steel/60">{c.registro}</p>
        {c.cargo && <p className="mt-2 text-[0.85rem] text-steel/80">{c.cargo}</p>}
        {c.oQueFaz && (
          <div className="mt-4 pt-4 border-t border-teal/10">
            <p className="text-[0.66rem] font-semibold uppercase tracking-[.14em] text-steel/50 mb-2">Na NU.V.E.M</p>
            <ul className="flex flex-wrap gap-1.5">
              {c.oQueFaz.map(s => (
                <li key={s} className="text-[0.72rem] px-2.5 py-1 rounded-full bg-mist/50 border border-teal/10 text-teal">{s}</li>
              ))}
            </ul>
          </div>
        )}
        {c.href && (
          <span className="mt-auto pt-5 inline-flex items-center gap-1.5 text-[0.88rem] font-medium text-teal group-hover:gap-2.5 transition-all">
            Ver página <ArrowRight className="w-3.5 h-3.5" aria-hidden />
          </span>
        )}
      </div>
    </>
  )
  const classe = 'group flex flex-col bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm'
  return c.href
    ? <Link href={c.href} className={`${classe} hover:border-teal/30 hover:-translate-y-1 hover:shadow-md transition-all`}>{corpo}</Link>
    : <div className={classe}>{corpo}</div>
}

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

export default async function EquipePage() {
  const lista = await cartoes()
  const socias = lista.filter(c => SOCIAS.has(c.chave))
  const equipe = lista.filter(c => !SOCIAS.has(c.chave))

  return (
    <>
      <PageHero
        tag="Nossa Equipe"
        title={<>Profissionais unidos pelo <em>cuidado</em></>}
        desc="Equipe multidisciplinar: gastroenterologistas, fisioterapeuta pélvica, cirurgiãs, nefrologista, pediatra e clínicos, em clínica com gestão certificada pela norma ISO 9001."
      />

      {/* Sócias Fundadoras */}
      <SectionWrapper dark grid>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Liderança</p>
          <h2 className="sec-title reveal reveal-d1">Sócias <em>Fundadoras</em></h2>
          <p className="text-[0.97rem] text-steel/65 mt-3 reveal reveal-d2 max-w-xl mx-auto">
            As médicas que fundaram a NU.V.E.M e conduzem a direção técnica da clínica.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {socias.map(c => <CartaoProfissional key={c.chave} c={c} grande />)}
        </div>
      </SectionWrapper>

      {/* Equipe Clínica */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Equipe Multidisciplinar</p>
          <h2 className="sec-title reveal reveal-d1">Profissionais <em>Parceiros</em></h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {equipe.map(c => <CartaoProfissional key={c.chave} c={c} />)}
        </div>
      </SectionWrapper>

      {/* Equipe Técnica */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Equipe Técnica</p>
          <h2 className="sec-title reveal reveal-d1">Quem cuida de <em>você</em></h2>
          <p className="text-[0.97rem] font-light text-steel/60 max-w-lg mx-auto mt-3 reveal reveal-d2">
            Profissionais que cuidam do acolhimento e da rotina da NU.V.E.M.
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
          desc="Agende sua consulta com a equipe multidisciplinar da NU.V.E.M Medicina."
        />
      </SectionWrapper>
    </>
  )
}
