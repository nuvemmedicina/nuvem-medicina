import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Link from 'next/link'
import { Clock, Shield, Check, ArrowRight } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { Breadcrumb }     from '@/components/ui/Breadcrumb'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { IsoSeal }        from '@/components/icons/IsoSeal'
import { EXAMES, ESPECIALIDADES } from '@/lib/data'

const ICON_MAP: Record<string, React.ElementType> = { Clock, Shield, Check }

// Extended detail per exam
const EXAM_DETAIL: Record<string, {
  indicacoes: string[]
  preparo:    string[]
  espRel:     string[]
}> = {
  manometria: {
    indicacoes: ['Disfagia (dificuldade de deglutição)', 'Suspeita de acalasia ou outros distúrbios motores', 'Refluxo gastroesofágico refratário', 'Antes de cirurgia antirrefluxo', 'Constipação crônica refratária', 'Incontinência fecal'],
    preparo:    ['Jejum de 6 horas antes do exame', 'Suspender medicamentos que afetam motilidade (consultar médico)', 'Usar roupa confortável', 'Comparecer com o pedido médico'],
    espRel:     ['motilidade-digestiva', 'gastroenterologia'],
  },
  phmetria: {
    indicacoes: ['Suspeita de DRGE refratária ao tratamento', 'Sintomas atípicos de refluxo (tosse, rouquidão)', 'Avaliação pré e pós-operatória antirrefluxo', 'Refluxo não ácido suspeito', 'Correlação de sintomas com eventos de refluxo'],
    preparo:    ['Suspender IBPs por 7 dias (orientação médica)', 'Suspender antiácidos por 24 horas', 'Jejum de 4 horas antes da instalação do cateter', 'Manter atividade normal durante o monitoramento'],
    espRel:     ['motilidade-digestiva', 'gastroenterologia'],
  },
  respiratorio: {
    indicacoes: ['Suspeita de SIBO, IMO ou LIBO', 'Intolerância à lactose ou frutose', 'Diagnóstico de infecção por H. pylori', 'Síndrome do intestino irritável para investigação', 'Após antibioticoterapia para confirmação de erradicação'],
    preparo:    ['Jejum de 12 horas antes do exame', 'Dieta específica no dia anterior (sem fibras fermentáveis)', 'Não usar antibióticos nas 4 semanas anteriores', 'Não fumar 1 hora antes', 'Não praticar exercícios intensos 1 hora antes'],
    espRel:     ['gastroenterologia', 'pediatria'],
  },
  halimetria: {
    indicacoes: ['Halitose persistente sem causa oral identificada', 'Avaliação objetiva antes e após tratamento', 'Suspeita de halitose de origem digestiva ou sistêmica', 'Rastreamento de xerostomia associada'],
    preparo:    ['Não comer nas 3 horas anteriores', 'Não escovar dentes 2 horas antes', 'Não usar enxaguante bucal no dia', 'Não fumar 2 horas antes', 'Hidratação normal permitida'],
    espRel:     ['halitose'],
  },
  pelvico: {
    indicacoes: ['Incontinência urinária ou fecal', 'Disfunção do assoalho pélvico', 'Constipação obstrutiva', 'Dor pélvica crônica', 'Pré e pós-operatório pélvico', 'Complementar à manometria anorretal'],
    preparo:    ['Usar roupa confortável', 'Não é necessário jejum', 'Comparecer com exames anteriores se houver', 'Informar uso de medicamentos'],
    espRel:     ['fisioterapia-pelvica'],
  },
}

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return EXAMES.map(e => ({ slug: e.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exame = EXAMES.find(e => e.id === slug)
  if (!exame) return {}
  return { title: exame.title, description: exame.desc[0] }
}
export default async function ExameSlugPage({ params }: Props) {
  const { slug } = await params
  const exame  = EXAMES.find(e => e.id === slug)
  const detail = EXAM_DETAIL[slug]
  if (!exame || !detail) notFound()

  const espRel = ESPECIALIDADES.filter(e => detail.espRel.includes(e.slug))

  return (
    <>
      <PageHero tag="Exames" title={<em>{exame.title}</em>} desc={exame.subtitle}>
        <Breadcrumb crumbs={[
          { label: 'Exames', href: '/exames' },
          { label: exame.title },
        ]} />
      </PageHero>

      <SectionWrapper dark>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Main */}
          <div className="lg:col-span-2 space-y-10">
            {/* Tag + desc */}
            <div>
              <span className="inline-block text-[0.65rem] font-bold tracking-[.12em] uppercase text-gold bg-gold-dim border border-gold-line px-3 py-1 rounded-full mb-5">
                {exame.tag}
              </span>
              <div className="space-y-4">
                {exame.desc.map((p, i) => (
                  <p key={i} className="text-[0.88rem] font-light text-muted leading-[1.85]">{p}</p>
                ))}
              </div>
            </div>

            {/* Indicações */}
            <div>
              <h2 className="font-serif font-light text-white text-[1.4rem] mb-5">
                Indicações do <em className="italic text-gold" style={{fontStyle:'italic'}}>exame</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.indicacoes.map(ind => (
                  <div key={ind} className="flex items-start gap-3 p-4 bg-ink border border-teal-light/[0.08] rounded-xl text-[0.82rem] text-muted">
                    <span className="w-[18px] h-px bg-gold shrink-0 mt-3" />
                    {ind}
                  </div>
                ))}
              </div>
            </div>

            {/* Preparo */}
            <div>
              <h2 className="font-serif font-light text-white text-[1.4rem] mb-5">
                Como se <em className="italic text-gold" style={{fontStyle:'italic'}}>preparar</em>
              </h2>
              <div className="bg-ink border border-teal-light/[0.08] rounded-xl overflow-hidden">
                {detail.preparo.map((p, i) => (
                  <div key={p} className={`flex items-start gap-4 p-4 text-[0.83rem] text-muted ${i < detail.preparo.length - 1 ? 'border-b border-teal-light/[0.05]' : ''}`}>
                    <span className="w-6 h-6 rounded-full bg-teal/30 text-teal-light text-[0.7rem] font-semibold flex items-center justify-center shrink-0">{i + 1}</span>
                    {p}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">
            {/* Info chips */}
            <div className="bg-ink border border-teal-light/[0.08] rounded-xl p-6 space-y-3">
              <h3 className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-faint mb-4">Informações</h3>
              {exame.info.map(({ icon, text }) => {
                const Icon = ICON_MAP[icon] ?? Check
                return (
                  <div key={text} className="flex items-center gap-3 text-[0.8rem] text-muted">
                    <Icon className="w-4 h-4 text-gold shrink-0" />
                    {text}
                  </div>
                )
              })}
            </div>

            {/* ISO badge */}
            <div className="bg-gold-dim border border-gold-line rounded-xl p-5 flex items-center gap-3">
              <IsoSeal size={44} className="shrink-0" />
              <p className="text-[0.75rem] text-muted leading-snug">
                Exame realizado com protocolo <strong className="text-white font-medium">certificado ISO 9001</strong>
              </p>
            </div>

            {/* Especialidades relacionadas */}
            {espRel.length > 0 && (
              <div className="bg-ink border border-teal-light/[0.08] rounded-xl p-6">
                <h3 className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-faint mb-4">Especialidades relacionadas</h3>
                <div className="space-y-2">
                  {espRel.map(e => (
                    <Link key={e.slug} href={`/especialidades/${e.slug}`}
                      className="flex items-center justify-between p-3 rounded-lg bg-deep border border-teal-light/[0.07] hover:border-gold/25 transition-all group">
                      <span className="text-[0.8rem] text-muted group-hover:text-white transition-colors">{e.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-faint group-hover:text-gold transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link href="/agendar" className="btn-gold w-full justify-center">
              Agendar este Exame
            </Link>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner />
      </SectionWrapper>
    </>
  )
}
