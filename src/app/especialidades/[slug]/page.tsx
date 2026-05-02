import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Link    from 'next/link'
import { ArrowRight } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { Breadcrumb }     from '@/components/ui/Breadcrumb'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { ESPECIALIDADES, EXAMES } from '@/lib/data'
import { renderRich } from '@/lib/rich'

// Static data per speciality
const DETAIL: Record<string, {
  heroDesc: string
  intro:    string[]
  topics:   { title: string; body: string }[]
  exames:   string[]
}> = {
  gastroenterologia: {
    heroDesc: 'Especialidade focada no equilíbrio intestinal pleno, tratamos desde sintomas comuns até patologias complexas como SIBO, IMO, disbiose e DGBI – Distúrbio da Interação Cérebro-Intestino.',
    intro: [
      'A gastroenterologia da NU.V.E.M abrange o diagnóstico e tratamento completo das doenças do aparelho digestivo, com foco especial em DGBI – Distúrbio da Interação Cérebro-Intestino, disbiose intestinal e distúrbios de motilidade.',
      'Nossa abordagem integra avaliação clínica detalhada, exames de alta precisão como testes respiratórios e manometria, e protocolos terapêuticos baseados nas evidências científicas mais recentes.',
    ],
    topics: [
      { title: 'SIBO e IMO',                  body: 'Supercrescimento bacteriano no intestino delgado e supercrescimento de metanogênicos, diagnosticados pelos testes respiratórios com precisão.' },
      { title: 'DGBI – Distúrbio da Interação Cérebro-Intestino', body: 'Síndrome do intestino irritável, dispepsia funcional e constipação funcional investigadas com metodologia completa e personalizada, seguindo as diretrizes Roma V.' },
      { title: 'Intolerâncias Alimentares',   body: 'Lactose, frutose e outras intolerâncias identificadas por testes respiratórios, sem biópsia ou coleta de sangue.' },
      { title: 'Helicobacter pylori',         body: 'Diagnóstico preciso por teste respiratório (não endoscópico) e manejo terapêutico com acompanhamento pós-tratamento.' },
    ],
    exames: ['testes-respiratorios', 'manometria-esofagica', 'phmetria-impedanciometria'],
  },
  'fisioterapia-pelvica': {
    heroDesc: 'Reabilitação especializada do assoalho pélvico: incontinência, disfunções pélvicas e distúrbios digestivos funcionais tratados com biofeedback e protocolos individualizados.',
    intro: [
      'A fisioterapia pélvica da NU.V.E.M é integrada ao tratamento gastroenterológico, reconhecendo que o assoalho pélvico desempenha papel fundamental na fisiologia digestiva e urinária.',
      'Utilizamos biofeedback eletromiográfico, eletroestimulação e técnicas manuais para reabilitar pacientes com disfunções complexas de forma não invasiva e humanizada.',
    ],
    topics: [
      { title: 'Incontinência Urinária e Fecal', body: 'Reabilitação muscular por biofeedback e treinamento vesical com resultados comprovados em casos de leve a moderada complexidade.' },
      { title: 'Disfunção do Assoalho Pélvico', body: 'Hipertonia, hipotonia e assimetria do assoalho pélvico avaliadas e tratadas com protocolos individualizados.' },
      { title: 'Constipação Obstrutiva',          body: 'Disfunção evacuatória tratada com biofeedback anorretal integrado à avaliação gastroenterológica da manometria anorretal.' },
      { title: 'Integração GI + Pélvico',         body: 'Abordagem única na NU.V.E.M que combina gastroenterologia e fisioterapia pélvica para resultados superiores em casos complexos.' },
    ],
    exames: ['avaliacao-pelvica', 'manometria-anorretal'],
  },
  halitose: {
    heroDesc: 'Diagnóstico multidisciplinar completo da halitose. Investigamos causas digestivas, orais e sistêmicas com halimetria e sialometria de alta precisão.',
    intro: [
      'A halitose é uma condição complexa que exige abordagem multidisciplinar. Na NU.V.E.M, investigamos todas as origens possíveis: digestivas, orais, nasofaríngeas e sistêmicas.',
      'Nossa abordagem combina halimetria quantitativa, sialometria, avaliação gastroenterológica e, quando necessário, parceria com odontologia e otorrinolaringologia.',
    ],
    topics: [
      { title: 'Halimetria',  body: 'Quantificação objetiva de compostos sulfurados voláteis (CSV) no ar exalado, para diagnóstico preciso e rastreamento da resposta terapêutica.' },
      { title: 'Sialometria', body: 'Medição do fluxo salivar em repouso e estimulado, essencial no diagnóstico de xerostomia e suas relações com halitose.' },
      { title: 'Halitose Digestiva', body: 'Investigação de SIBO, gastroparesia e refluxo como causas de mau hálito de origem gastrointestinal.' },
      { title: 'Protocolo Integrado', body: 'Plano terapêutico personalizado que combina tratamento da causa raiz com estratégias de manutenção a longo prazo.' },
    ],
    exames: ['halimetria-sialometria', 'testes-respiratorios'],
  },
  pediatria: {
    heroDesc: 'Cuidado integral da saúde digestiva infantil. Prevenção, diagnóstico e tratamento com abordagem acolhedora e integrada à família.',
    intro: [
      'A pediatria da NU.V.E.M oferece atenção especializada à saúde digestiva de crianças e adolescentes, com ambiente acolhedor e equipe treinada para o atendimento pediátrico.',
      'Trabalhamos em estreita colaboração com gastroenterologistas e cirurgião pediátrica para oferecer a melhor conduta em casos complexos.',
    ],
    topics: [
      { title: 'Saúde Digestiva Infantil', body: 'Constipação, refluxo, cólicas persistentes e distúrbios funcionais avaliados com abordagem gentil e baseada em evidências pediátricas.' },
      { title: 'Intolerâncias Alimentares', body: 'Diagnóstico de intolerância à lactose, frutose e proteína do leite de vaca (APLV) com protocolos adaptados à faixa etária.' },
      { title: 'H. pylori em Crianças', body: 'Investigação e tratamento da infecção por H. pylori com métodos não invasivos adaptados à pediatria.' },
      { title: 'Integração Cirúrgica', body: 'Casos que necessitam de avaliação cirúrgica são conduzidos em conjunto com a Dra. Eliane Basques Moura (Cirurgia Pediátrica).' },
    ],
    exames: ['testes-respiratorios'],
  },
  nefrologia: {
    heroDesc: 'Diagnóstico e tratamento especializado de doenças renais, com prevenção, acompanhamento e cuidado integral com suporte multidisciplinar.',
    intro: [
      'O serviço de nefrologia da NU.V.E.M oferece diagnóstico precoce e acompanhamento de doenças renais, com foco em prevenção e qualidade de vida a longo prazo.',
      'A integração com gastroenterologia permite abordagem conjunta de condições que envolvem rim e trato digestivo.',
    ],
    topics: [
      { title: 'Doença Renal Crônica', body: 'Acompanhamento clínico e orientação para retardo da progressão da DRC com estratégias baseadas em evidências.' },
      { title: 'Litíase Renal',        body: 'Investigação de cálculos renais recorrentes com avaliação metabólica completa e orientação dietética personalizada.' },
      { title: 'Infecções Urinárias',  body: 'Manejo de ITU recorrente com investigação de fatores predisponentes e tratamento direcionado.' },
      { title: 'Integração GI-Renal',  body: 'Interface entre doenças digestivas e renais: oxalúria entérica, disbiose e saúde renal abordados conjuntamente.' },
    ],
    exames: [],
  },
  'motilidade-digestiva': {
    heroDesc: 'Avaliação avançada dos distúrbios esofágicos e intestinais com manometria de alta resolução, pHmetria e impedânciometria integradas.',
    intro: [
      'A avaliação de motilidade digestiva é uma das especialidades mais avançadas da NU.V.E.M, utilizando equipamentos de última geração para mapear com precisão os distúrbios do esôfago e do trato gastrointestinal.',
      'Nossos laudos detalhados permitem diagnóstico definitivo de acalasia, refluxo refratário, disfagia e outros distúrbios que frequentemente passam despercebidos em investigações convencionais.',
    ],
    topics: [
      { title: 'Acalasia e Distúrbios Motores', body: 'Diagnóstico definitivo por manometria esofágica de alta resolução com classificação completa pela Classificação de Chicago.' },
      { title: 'Refluxo Gastroesofágico Refratário', body: 'Investigação avançada por pHmetria e impedânciometria para casos que não respondem ao tratamento convencional.' },
      { title: 'Disfagia',               body: 'Avaliação completa da deglutição com manometria para identificar a causa funcional ou obstrutiva da disfagia.' },
      { title: 'Constipação Crônica',    body: 'Manometria anorretal para diferenciação entre constipação de trânsito lento e disfunção defecatória.' },
    ],
    exames: ['manometria-esofagica', 'manometria-anorretal', 'phmetria-impedanciometria'],
  },
}

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ESPECIALIDADES.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const esp = ESPECIALIDADES.find(e => e.slug === slug)
  if (!esp) return {}
  return {
    title:       esp.title,
    description: DETAIL[esp.slug]?.heroDesc ?? esp.desc,
  }
}

export default async function EspecialidadeSlugPage({ params }: Props) {
  const { slug } = await params
  const esp    = ESPECIALIDADES.find(e => e.slug === slug)
  const detail = DETAIL[slug]
  if (!esp || !detail) notFound()

  const relExames = EXAMES.filter(e => detail.exames.includes(e.id))

  return (
    <>
      <PageHero
        tag="Especialidade"
        title={<em>{esp.title}</em>}
        desc={detail.heroDesc}
      >
        <Breadcrumb crumbs={[
          { label: 'Especialidades', href: '/especialidades' },
          { label: esp.title },
        ]} />
      </PageHero>

      <SectionWrapper mist grid>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Main content */}
          <div className="lg:col-span-2">
            <div className="space-y-4 text-[0.98rem] font-light text-steel/65 leading-[1.85] mb-10">
              {detail.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            <h2 className="font-serif font-light text-steel text-[1.6rem] mb-6">
              O que tratamos em <em className="italic text-teal" style={{ fontStyle: 'italic' }}>{esp.title}</em>
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {detail.topics.map((t, i) => (
                <div
                  key={t.title}
                  className={`bg-white border border-teal/10 rounded-2xl p-6 hover:border-teal/22 hover:-translate-y-0.5 transition-all reveal reveal-d${i % 2} shadow-sm`}
                >
                  <span className="block w-5 h-px bg-teal mb-3" />
                  <h3 className="text-[0.95rem] font-semibold text-steel mb-2">{t.title}</h3>
                  <p className="text-[0.88rem] font-light text-steel/60 leading-[1.72]">{renderRich(t.body)}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-5">

            {/* Tags */}
            <div className="bg-white border border-teal/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[0.75rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-4">Áreas de atuação</h3>
              <div className="flex flex-wrap gap-2">
                {esp.tags.map(tag => (
                  <span key={tag} className="text-[0.78rem] font-medium px-3 py-1.5 rounded-full bg-teal/8 border border-teal/15 text-teal">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Related exams */}
            {relExames.length > 0 && (
              <div className="bg-white border border-teal/10 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[0.75rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-4">Exames relacionados</h3>
                <div className="space-y-2">
                  {relExames.map(e => (
                    <Link
                      key={e.id}
                      href={`/exames/${e.id}`}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-cloud border border-teal/8 hover:border-teal/22 hover:bg-teal/5 transition-all group"
                    >
                      <span className="text-[0.88rem] text-steel/60 group-hover:text-teal transition-colors">{e.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-steel/30 group-hover:text-teal transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* CTA box */}
            <div className="bg-teal rounded-2xl p-6">
              <h3 className="text-[0.95rem] font-semibold text-white mb-2">Agendar consulta</h3>
              <p className="text-[0.85rem] text-white/70 mb-4 leading-relaxed">Atendimento especializado em {esp.title} com equipe certificada ISO 9001.</p>
              <Link href="/agendar" className="btn-gold w-full justify-center">
                Agendar agora
              </Link>
            </div>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner />
      </SectionWrapper>
    </>
  )
}
