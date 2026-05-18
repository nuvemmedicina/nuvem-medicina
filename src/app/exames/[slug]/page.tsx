import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Link   from 'next/link'
import Image  from 'next/image'
import { Clock, Shield, Check, ArrowRight, Download } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { Breadcrumb }     from '@/components/ui/Breadcrumb'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { IsoSeal }        from '@/components/icons/IsoSeal'
import { EXAMES, ESPECIALIDADES, EXAM_PDFS } from '@/lib/data'

const ICON_MAP: Record<string, React.ElementType> = { Clock, Shield, Check }

// Extended detail per exam
const EXAM_DETAIL: Record<string, {
  indicacoes: string[]
  preparo:    string[]
  espRel:     string[]
}> = {
  'manometria-esofagica': {
    indicacoes: [
      'Disfagia (dificuldade de deglutição)',
      'Suspeita de acalasia ou outros distúrbios motores esofágicos',
      'Refluxo gastroesofágico refratário ao tratamento',
      'Avaliação pré e pós-operatória de cirurgia antirrefluxo',
      'Dor torácica de causa não cardíaca',
      'Suspeita de espasmo difuso do esôfago',
    ],
    preparo: [
      'Jejum de 6 horas antes do exame',
      'Suspender medicamentos que afetam motilidade esofágica (consultar médico)',
      'Usar roupa confortável',
      'Comparecer com o pedido médico e exames anteriores',
    ],
    espRel: ['motilidade-digestiva', 'gastroenterologia'],
  },
  'manometria-anorretal': {
    indicacoes: [
      'Incontinência fecal',
      'Constipação crônica refratária',
      'Distúrbios do assoalho pélvico',
      'Suspeita de doença de Hirschsprung',
      'Avaliação pré e pós-operatória de cirurgia anorretal',
      'Complementar à avaliação pélvica funcional',
    ],
    preparo: [
      'Realizar enema de limpeza (Minilax® ou similar) 1–2 horas antes do exame',
      'Não é necessário jejum',
      'Usar roupa confortável e calça que possa ser abaixada',
      'Comparecer com o pedido médico e exames anteriores',
      'Informar à equipe o uso de qualquer medicamento',
    ],
    espRel: ['motilidade-digestiva', 'fisioterapia-pelvica'],
  },
  'phmetria-impedanciometria': {
    indicacoes: [
      'Suspeita de DRGE refratária ao tratamento',
      'Sintomas atípicos de refluxo (tosse, rouquidão)',
      'Avaliação pré e pós-operatória antirrefluxo',
      'Refluxo não ácido suspeito',
      'Correlação de sintomas com eventos de refluxo',
    ],
    preparo: [
      'Suspender IBPs por 7 dias (orientação médica)',
      'Suspender antiácidos por 24 horas',
      'Jejum de 4 horas antes da instalação do cateter',
      'Manter atividade normal durante o monitoramento',
    ],
    espRel: ['motilidade-digestiva', 'gastroenterologia'],
  },
  'testes-respiratorios': {
    indicacoes: [
      'Suspeita de SIBO (supercrescimento bacteriano no intestino delgado)',
      'Suspeita de IMO (supercrescimento de metanogênicos) ou LIBO',
      'Intolerância à lactose ou frutose',
      'Diagnóstico de infecção por H. pylori',
      'Síndrome do intestino irritável para investigação etiológica',
      'Confirmação de erradicação após antibioticoterapia',
      'Investigação de gases intestinais (H₂, CH₄, H₂S)',
    ],
    preparo: [
      'Jejum de 12 horas antes do exame',
      'Dieta específica no dia anterior (sem fibras fermentáveis)',
      'Não usar antibióticos nas 4 semanas anteriores',
      'Não fumar 1 hora antes do exame',
      'Não praticar exercícios intensos 1 hora antes',
    ],
    espRel: ['gastroenterologia', 'pediatria'],
  },
  'halimetria-sialometria': {
    indicacoes: [
      'Halitose persistente sem causa oral identificada',
      'Avaliação objetiva antes e após tratamento',
      'Suspeita de halitose de origem digestiva ou sistêmica',
      'Rastreamento de xerostomia associada',
    ],
    preparo: [
      'Não comer nas 3 horas anteriores',
      'Não escovar dentes 2 horas antes',
      'Não usar enxaguante bucal no dia',
      'Não fumar 2 horas antes',
      'Hidratação normal permitida',
    ],
    espRel: ['halitose'],
  },
  'avaliacao-pelvica': {
    indicacoes: [
      'Incontinência urinária ou fecal',
      'Disfunção do assoalho pélvico',
      'Constipação obstrutiva',
      'Dor pélvica crônica',
      'Pré e pós-operatório pélvico',
      'Complementar à manometria anorretal',
    ],
    preparo: [
      'Usar roupa confortável',
      'Não é necessário jejum',
      'Comparecer com exames anteriores se houver',
      'Informar uso de medicamentos',
    ],
    espRel: ['fisioterapia-pelvica'],
  },
}

// ─── Respiratory test extra content ──────────────────────────────────────────
const RESP_PDFS = [
  {
    label: 'Preparo — H₂ · CH₄ · H₂S',
    sub:   'SIBO, IMO, LIBO e intolerâncias',
    href:  '/pdfs/preparo-teste-respiratorio-sibo-imo.pdf',
  },
  {
    label: 'Preparo — H. pylori',
    sub:   'Diagnóstico e controle de erradicação',
    href:  '/pdfs/preparo-teste-respiratorio-hpylori.pdf',
  },
]

const RESP_VIDEOS = [
  {
    title:  'Teste Respiratório com HealthGo AIR',
    embed:  'https://www.youtube.com/embed/k2hAIvNGD6I',
  },
  {
    title:  'Teste Respiratório — NU.V.E.M Ensino',
    embed:  'https://www.youtube.com/embed/t6pcq9TjFCU',
    short:  true,
  },
]

const RESP_PHOTOS = [
  { src: '/images/teste-respiratorio-1.webp', alt: 'Realização do teste respiratório com equipamento HealthGo AIR na NU.V.E.M Medicina' },
  { src: '/images/teste-respiratorio-2.webp', alt: 'Teste respiratório no espaço NU.V.E.M Ensino em Belo Horizonte' },
]

// ─────────────────────────────────────────────────────────────────────────────

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
  const pdfUrl = EXAM_PDFS[slug]
  const isResp = slug === 'testes-respiratorios'

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      {isResp ? (
        /* Hero split: texto à esq, vídeo HealthGo à dir */
        <div className="relative pt-[76px] pb-20 overflow-hidden bg-white">
          <div className="absolute -top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(203,228,230,.50) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
          <div className="absolute top-0 bottom-0 w-px opacity-20 pointer-events-none"
            style={{ right: '25%', background: 'linear-gradient(to bottom, transparent, rgba(0,70,95,.30) 30%, rgba(0,70,95,.30) 70%, transparent)' }} />

          <div className="relative z-10 max-w-[1240px] mx-auto px-8 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              {/* Texto */}
              <div>
                <p className="sec-tag">Exames</p>
                <h1 className="sec-title" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}>
                  <em>{exame.title}</em>
                </h1>
                <p className="text-[1rem] font-light text-steel/60 leading-[1.85] max-w-xl mt-4">
                  {exame.subtitle}
                </p>
                <div className="mt-8">
                  <Breadcrumb crumbs={[
                    { label: 'Exames', href: '/exames' },
                    { label: exame.title },
                  ]} />
                </div>
              </div>
              {/* Vídeo HealthGo */}
              <div className="rounded-2xl overflow-hidden shadow-xl border border-teal/10">
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <iframe
                    src={RESP_VIDEOS[0].embed}
                    title={RESP_VIDEOS[0].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageHero tag="Exames" title={<em>{exame.title}</em>} desc={exame.subtitle}>
          <Breadcrumb crumbs={[
            { label: 'Exames', href: '/exames' },
            { label: exame.title },
          ]} />
        </PageHero>
      )}

      <SectionWrapper mist>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Main ──────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Tag + desc */}
            <div>
              <span className="inline-block text-[0.68rem] font-bold tracking-[.12em] uppercase text-gold bg-gold/10 border border-gold/25 px-3 py-1 rounded-full mb-5">
                {exame.tag}
              </span>
              <div className="space-y-4">
                {exame.desc.map((p, i) => (
                  <p key={i} className="text-[0.98rem] font-light text-steel/65 leading-[1.85]">{p}</p>
                ))}
              </div>
            </div>

            {/* ── Fotos (somente testes respiratórios) ────────────────── */}
            {isResp && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {RESP_PHOTOS.map(photo => (
                  <div key={photo.src} className="relative rounded-2xl overflow-hidden shadow-md" style={{ aspectRatio: '1/1' }}>
                    <Image
                      src={photo.src}
                      alt={photo.alt}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            )}

            {/* ── Indicações ──────────────────────────────────────────── */}
            <div>
              <h2 className="font-serif font-light text-steel text-[1.5rem] mb-5">
                Indicações do <em className="italic text-teal" style={{ fontStyle: 'italic' }}>exame</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.indicacoes.map(ind => (
                  <div key={ind} className="flex items-start gap-3 p-4 bg-white border border-teal/10 rounded-xl text-[0.9rem] text-steel/65 hover:border-teal/22 transition-colors">
                    <span className="w-[18px] h-px bg-teal shrink-0 mt-3.5" />
                    {ind}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Preparo ─────────────────────────────────────────────── */}
            <div>
              {isResp ? (
                /* Dois cards de preparo para testes respiratórios */
                <>
                  <h2 className="font-serif font-light text-steel text-[1.5rem] mb-6">
                    Preparos para <em className="italic text-teal">o exame</em>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    {RESP_PDFS.map(pdf => (
                      <div key={pdf.href} className="bg-white border border-teal/12 rounded-2xl p-6 shadow-sm flex flex-col gap-3 hover:border-teal/28 transition-colors">
                        <div>
                          <p className="text-[0.82rem] font-bold text-steel mb-0.5">{pdf.label}</p>
                          <p className="text-[0.75rem] text-steel/45 leading-snug">{pdf.sub}</p>
                        </div>
                        <a
                          href={pdf.href}
                          download
                          className="mt-auto inline-flex items-center justify-center gap-2 text-[0.85rem] font-semibold text-teal bg-teal/8 border border-teal/22 px-4 py-2.5 rounded-xl hover:bg-teal hover:text-white hover:border-teal transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Baixar PDF
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* Lista de preparo geral */}
                  <p className="text-[0.82rem] font-semibold uppercase tracking-[.08em] text-steel/40 mb-3">Orientações gerais</p>
                  <div className="bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm">
                    {detail.preparo.map((p, i) => (
                      <div
                        key={p}
                        className={`flex items-start gap-4 p-5 text-[0.9rem] text-steel/65 ${i < detail.preparo.length - 1 ? 'border-b border-teal/8' : ''}`}
                      >
                        <span className="w-7 h-7 rounded-full bg-teal/10 text-teal text-[0.72rem] font-semibold flex items-center justify-center shrink-0 border border-teal/18">
                          {i + 1}
                        </span>
                        {p}
                      </div>
                    ))}
                  </div>
                </>
              ) : (
                /* Preparo padrão para outros exames */
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <h2 className="font-serif font-light text-steel text-[1.5rem]">
                      Como se <em className="italic text-teal" style={{ fontStyle: 'italic' }}>preparar</em>
                    </h2>
                    {pdfUrl && (
                      <a
                        href={pdfUrl}
                        download
                        className="inline-flex items-center gap-2 text-[0.88rem] font-semibold text-teal bg-teal/8 border border-teal/20 px-4 py-2.5 rounded-xl hover:bg-teal hover:text-white hover:border-teal transition-all shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        Baixar Preparo em PDF
                      </a>
                    )}
                  </div>
                  <div className="bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm">
                    {detail.preparo.map((p, i) => (
                      <div
                        key={p}
                        className={`flex items-start gap-4 p-5 text-[0.9rem] text-steel/65 ${i < detail.preparo.length - 1 ? 'border-b border-teal/8' : ''}`}
                      >
                        <span className="w-7 h-7 rounded-full bg-teal/10 text-teal text-[0.72rem] font-semibold flex items-center justify-center shrink-0 border border-teal/18">
                          {i + 1}
                        </span>
                        {p}
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Info chips */}
            <div className="bg-white border border-teal/10 rounded-2xl p-6 space-y-3 shadow-sm">
              <h3 className="text-[0.75rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-4">Informações</h3>
              {exame.info.map(({ icon, text }) => {
                const Icon = ICON_MAP[icon] ?? Check
                return (
                  <div key={text} className="flex items-center gap-3 text-[0.88rem] text-steel/65">
                    <Icon className="w-4 h-4 text-teal shrink-0" />
                    {text}
                  </div>
                )
              })}
            </div>

            {/* PDF Download — dois botões para testes resp., um para outros */}
            {isResp ? (
              <div className="bg-teal/8 border border-teal/18 rounded-2xl p-5 space-y-3">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[.08em] text-teal mb-1">Preparos do Exame</h3>
                {RESP_PDFS.map(pdf => (
                  <a
                    key={pdf.href}
                    href={pdf.href}
                    download
                    className="flex items-center gap-3 w-full bg-white border border-teal/20 rounded-xl px-4 py-3 text-[0.82rem] font-semibold text-teal hover:bg-teal hover:text-white hover:border-teal transition-all"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span className="leading-snug">{pdf.label}</span>
                  </a>
                ))}
              </div>
            ) : pdfUrl ? (
              <div className="bg-teal/8 border border-teal/18 rounded-2xl p-5">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[.08em] text-teal mb-3">Preparo do Exame</h3>
                <p className="text-[0.82rem] text-steel/60 mb-4 leading-relaxed">
                  Baixe o guia completo de preparo em PDF para ler com calma em casa.
                </p>
                <a
                  href={pdfUrl}
                  download
                  className="btn-teal w-full justify-center text-[0.9rem] py-3"
                >
                  <Download className="w-4 h-4" />
                  Baixar Preparo em PDF
                </a>
              </div>
            ) : null}

            {/* ISO badge */}
            <div className="bg-gold/8 border border-gold/22 rounded-2xl p-5 flex items-center gap-3">
              <IsoSeal size={44} className="shrink-0" />
              <p className="text-[0.82rem] text-steel/65 leading-snug">
                Exame realizado com protocolo <strong className="text-steel font-semibold">certificado ISO 9001</strong>
              </p>
            </div>

            {/* Especialidades relacionadas */}
            {espRel.length > 0 && (
              <div className="bg-white border border-teal/10 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[0.75rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-4">Especialidades relacionadas</h3>
                <div className="space-y-2">
                  {espRel.map(e => (
                    <Link key={e.slug} href={`/especialidades/${e.slug}`}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-cloud border border-teal/8 hover:border-teal/22 hover:bg-teal/5 transition-all group">
                      <span className="text-[0.88rem] text-steel/60 group-hover:text-teal transition-colors">{e.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-steel/30 group-hover:text-teal transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link href="/agendar" className="btn-gold w-full justify-center">
              Agendar este Exame
            </Link>

            {/* Vídeo NU.V.E.M Ensino — somente testes respiratórios */}
            {isResp && (
              <div className="rounded-2xl overflow-hidden shadow-md border border-teal/10">
                <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
                  <iframe
                    src={RESP_VIDEOS[1].embed}
                    title={RESP_VIDEOS[1].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner />
      </SectionWrapper>
    </>
  )
}
