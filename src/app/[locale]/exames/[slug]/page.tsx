
import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Image  from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import { Clock, Shield, Check, ArrowRight, Download } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { PageHero }       from '@/components/ui/PageHero'
import { Breadcrumb }     from '@/components/ui/Breadcrumb'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { IsoSeal }        from '@/components/icons/IsoSeal'
import { EXAM_PDFS, CONVENIOS_DESTAQUE, EXAMES as EXAMES_PT } from '@/lib/data'
import { getExames, getEspecialidades } from '@/lib/content/catalog'
import { getExameDetail, type PreparoCard } from '@/lib/content/exames-detail'
import { getRespExtra } from '@/lib/content/exames-resp-extra'
import { localizedAlternates } from '@/lib/i18n-seo'
import type { AppLocale } from '@/i18n/routing'
import { PhotoCarousel } from '@/components/ui/PhotoCarousel'
import { JsonLd } from '@/components/ui/JsonLd'
import { examSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { SITE_URL } from '@/lib/site'

const BASE_URL = SITE_URL

const ICON_MAP: Record<string, React.ElementType> = { Clock, Shield, Check }

const OG_LOCALE: Record<AppLocale, string> = { 'pt-BR': 'pt_BR', en: 'en_US', es: 'es_419' }

interface Props { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return EXAMES_PT.map(e => ({ slug: e.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const l = locale as AppLocale
  const exame = getExames(l).find(e => e.id === slug)
  if (!exame) return {}
  // seoTitle/seoDescription são escritos para intenção de busca, com a cidade
  // (ex.: "manometria esofágica bh") — diferente de title/desc, que seguem em
  // linguagem clínica no corpo da página.
  const title = exame.seoTitle       ?? exame.title
  const desc  = exame.seoDescription ?? exame.desc[0]
  return {
    title,
    description: desc,
    alternates:  localizedAlternates(`/exames/${slug}`, locale),
    openGraph: {
      title:       `${title} | NU.V.E.M Medicina`,
      description: desc,
      locale:      OG_LOCALE[l],
      images: [{
        url:    '/images/nuvem-medicina-bh.jpg',
        width:  1200,
        height: 630,
        alt:    `Consultório NU.V.E.M Medicina — ${exame.title}`,
      }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${title} | NU.V.E.M Medicina`,
      description: desc,
      images:      ['/images/nuvem-medicina-bh.jpg'],
    },
  }
}

export default async function ExameSlugPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale() as AppLocale
  const t = await getTranslations('exameDetail')
  const tList = await getTranslations('examesPage')
  const EXAMES = getExames(locale)
  const ESPECIALIDADES = getEspecialidades(locale)
  const RESP = getRespExtra(locale)
  const RESP_PDFS = RESP.pdfs
  const RESP_VIDEOS = RESP.videos
  const RESP_TECNOLOGIAS = RESP.tecnologias
  const exame  = EXAMES.find(e => e.id === slug)
  const detail = getExameDetail(locale, slug)
  if (!exame || !detail) notFound()

  const espRel = ESPECIALIDADES.filter(e => detail.espRel.includes(e.slug))
  const pdfUrl = EXAM_PDFS[slug]
  const isResp = slug === 'testes-respiratorios'

  return (
    <>
      <JsonLd data={[
        examSchema(exame),
        faqSchema(detail.faqs),
        breadcrumbSchema([
          { name: 'Home',             url: BASE_URL },
          { name: tList('listLabel'), url: `${BASE_URL}/exames` },
          { name: exame.title,        url: `${BASE_URL}/exames/${exame.id}` },
        ]),
      ]} />
      {isResp ? (
        <div className="relative pt-[76px] pb-20 overflow-hidden bg-white">
          <div className="absolute -top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(203,228,230,.50) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
          <div className="absolute top-0 bottom-0 w-px opacity-20 pointer-events-none"
            style={{ right: '25%', background: 'linear-gradient(to bottom, transparent, rgba(0,70,95,.30) 30%, rgba(0,70,95,.30) 70%, transparent)' }} />
          <div className="relative z-10 max-w-[1240px] mx-auto px-8 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="sec-tag">{t('heroTag')}</p>
                <h1 className="sec-title" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}>
                  <em>{exame.title}</em>
                </h1>
                <p className="text-[1rem] font-light text-steel/60 leading-[1.85] max-w-xl mt-4">{exame.subtitle}</p>
                <div className="mt-8">
                  <Breadcrumb crumbs={[{ label: tList('listLabel'), href: '/exames' }, { label: exame.title }]} />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-teal/10">
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <iframe src={RESP_VIDEOS[0].embed} title={RESP_VIDEOS[0].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="absolute inset-0 w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageHero tag={t('heroTag')} title={<em>{exame.title}</em>} desc={exame.subtitle}>
          <Breadcrumb crumbs={[
            { label: tList('listLabel'), href: '/exames' },
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

            {/* ── Fotos / Carrossel ───────────────────────────────────── */}
            {detail.photos && detail.photos.length > 0 && (
              <div>
                <h2 className="font-serif font-light text-steel text-[1.5rem] mb-5">
                  {t('exameNaPratica')} <em className="italic text-teal">{t('pratica')}</em>
                </h2>
                <PhotoCarousel images={detail.photos} />
              </div>
            )}

            {/* ── Tecnologias (somente testes respiratórios) ──────────── */}
            {isResp && (
              <div className="space-y-6">
                <h2 className="font-serif font-light text-steel text-[1.5rem]">
                  {t('nossasTecnologias')} <em className="italic text-teal">{t('tecnologias')}</em>
                </h2>
                {RESP_TECNOLOGIAS.map((tec) => (
                  <div key={tec.name}
                    className={`flex flex-col ${tec.imgLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'} bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-teal/22 transition-all`}>
                    <div className="relative sm:w-[42%] shrink-0" style={{ minHeight: '260px' }}>
                      <Image src={tec.src} alt={tec.alt} fill className="object-cover" />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                      <div>
                        <span className="inline-block text-[0.6rem] font-bold uppercase tracking-[.12em] text-teal bg-teal/8 border border-teal/20 px-2.5 py-0.5 rounded-full mb-3">{tec.badge}</span>
                        <h3 className="text-[1.05rem] font-semibold text-steel mb-0.5">{tec.name}</h3>
                        <p className="text-[0.72rem] font-medium text-teal/70 uppercase tracking-[.08em] mb-3">{tec.sub}</p>
                        <p className="text-[0.85rem] font-light text-steel/60 leading-relaxed">{tec.desc}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {tec.specs.map(s => (
                          <div key={s.label} className="bg-cloud border border-teal/8 rounded-xl px-3 py-2">
                            <p className="text-[0.6rem] font-bold uppercase tracking-[.1em] text-steel/35 mb-0.5">{s.label}</p>
                            <p className="text-[0.78rem] font-semibold text-steel/75">{s.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Indicações ──────────────────────────────────────────── */}
            <div>
              <h2 className="font-serif font-light text-steel text-[1.5rem] mb-5">
                {t('indicacoesDo')} <em className="italic text-teal" style={{ fontStyle: 'italic' }}>{t('exameEm')}</em>
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
                    {t('preparosPara')} <em className="italic text-teal">{t('oExame')}</em>
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
                          {t('baixarPdf')}
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* ── Dieta do dia anterior ─────────────────────────── */}
                  <div className="rounded-2xl overflow-hidden border border-teal/15 shadow-sm">
                    {/* Header */}
                    <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #002535, #00465F)' }}>
                      <span className="text-2xl">🥗</span>
                      <div>
                        <p className="text-white font-semibold text-[0.95rem]">{RESP.diet.tituloRefeicao}</p>
                        <p className="text-white/55 text-[0.75rem]">{RESP.diet.subtitulo}</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 space-y-5">
                      {/* Permitido × Proibido */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Permitido */}
                        <div className="rounded-xl bg-teal/5 border border-teal/15 p-4">
                          <p className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-teal mb-3 flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-teal text-white text-[0.6rem] flex items-center justify-center">✓</span>
                            {RESP.diet.permitidoLabel}
                          </p>
                          <ul className="space-y-1.5">
                            {RESP.diet.permitido.map(item => (
                              <li key={item} className="text-[0.8rem] text-steel/65 flex items-start gap-2">
                                <span className="text-teal mt-0.5 shrink-0">·</span>{item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Proibido */}
                        <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                          <p className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-red-500 mb-3 flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[0.6rem] flex items-center justify-center">✕</span>
                            {RESP.diet.proibidoLabel}
                          </p>
                          <ul className="space-y-1.5">
                            {RESP.diet.proibido.map(item => (
                              <li key={item} className="text-[0.8rem] text-steel/65 flex items-start gap-2">
                                <span className="text-red-400 mt-0.5 shrink-0">·</span>{item}
                              </li>
                            ))}
                          </ul>
                          <p className="text-[0.65rem] text-steel/35 mt-2">{RESP.diet.proibidoNota}</p>
                        </div>
                      </div>

                      {/* Jejum e horários */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {RESP.diet.jejum.map(item => (
                          <div key={item.label} className="flex items-center gap-3 bg-cloud border border-teal/10 rounded-xl px-4 py-3">
                            <span className="text-xl shrink-0">{item.icon}</span>
                            <div>
                              <p className="text-[0.62rem] font-bold uppercase tracking-[.08em] text-steel/35">{item.label}</p>
                              <p className="text-[0.8rem] font-semibold text-steel/75">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Suspensão de medicamentos */}
                      <div>
                        <p className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-2">{RESP.diet.medsTitulo}</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {RESP.diet.meds.map(m => (
                            <div key={m.med} className="bg-gold/8 border border-gold/20 rounded-xl px-3 py-2.5 text-center">
                              <p className="text-[0.72rem] font-bold text-gold">{m.prazo}</p>
                              <p className="text-[0.72rem] text-steel/55">{m.med}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-[0.7rem] text-steel/40 mt-2">{RESP.diet.medsNota}</p>
                      </div>

                      {/* No dia */}
                      <div className="flex flex-wrap gap-2 pt-1 border-t border-teal/8">
                        {RESP.diet.noDia.map(item => (
                          <span key={item} className="text-[0.75rem] text-steel/60 bg-cloud border border-teal/10 px-3 py-1.5 rounded-full">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                </>
              ) : (
                /* Preparo padrão para outros exames */
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <h2 className="font-serif font-light text-steel text-[1.5rem]">
                      {t('comoSe')} <em className="italic text-teal" style={{ fontStyle: 'italic' }}>{t('preparar')}</em>
                    </h2>
                    {pdfUrl && (
                      <a
                        href={pdfUrl}
                        download
                        className="inline-flex items-center gap-2 text-[0.88rem] font-semibold text-teal bg-teal/8 border border-teal/20 px-4 py-2.5 rounded-xl hover:bg-teal hover:text-white hover:border-teal transition-all shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        {t('baixarPreparoPdf')}
                      </a>
                    )}
                  </div>

                  {detail.preparoCards ? (
                    /* Cards com ícones, badges e seções */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(() => {
                        type Sec = { name?: string; cards: PreparoCard[] }
                        const sections: Sec[] = []
                        detail.preparoCards!.forEach(card => {
                          const last = sections[sections.length - 1]
                          if (!last || last.name !== card.section) sections.push({ name: card.section, cards: [card] })
                          else last.cards.push(card)
                        })
                        return sections.map((sec, si) => (
                          <div key={sec.name ?? si} className="contents">
                            {sec.name && (
                              <div className="col-span-full flex items-center gap-3 mt-2">
                                <span className="h-px flex-1 bg-teal/12" />
                                <p className="text-[0.67rem] font-bold uppercase tracking-[.12em] text-steel/35 whitespace-nowrap">{sec.name}</p>
                                <span className="h-px flex-1 bg-teal/12" />
                              </div>
                            )}
                            {sec.cards.map(card => (
                              <div
                                key={card.title}
                                className={`rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex gap-4 items-start ${
                                  card.variant === 'warning'
                                    ? 'bg-gold/6 border border-gold/20 hover:border-gold/35'
                                    : card.variant === 'permitted'
                                    ? 'bg-teal/5 border border-teal/15 hover:border-teal/28'
                                    : 'bg-white border border-teal/10 hover:border-teal/22'
                                }`}
                              >
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-[1.25rem] leading-none ${
                                  card.variant === 'warning'
                                    ? 'bg-gold/10 border border-gold/20'
                                    : card.variant === 'permitted'
                                    ? 'bg-teal/10 border border-teal/20'
                                    : 'bg-teal/8 border border-teal/15'
                                }`}>
                                  {card.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  {card.badge && (
                                    <span className={`inline-block text-[0.6rem] font-bold uppercase tracking-[.1em] px-2 py-0.5 rounded-full mb-1.5 border ${
                                      card.variant === 'warning'
                                        ? 'text-gold bg-gold/10 border-gold/25'
                                        : 'text-teal bg-teal/8 border-teal/20'
                                    }`}>
                                      {card.badge}
                                    </span>
                                  )}
                                  <p className="text-[0.88rem] font-semibold text-steel mb-1">{card.title}</p>
                                  <p className="text-[0.82rem] font-light text-steel/60 leading-relaxed">{card.body}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      })()}
                    </div>
                  ) : (
                    /* Lista numerada (fallback) */
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
                  )}
                </>
              )}
            </div>

            {/* ── Perguntas Frequentes ──────────────────────────────────── */}
            <div>
              <h2 className="font-serif font-light text-steel text-[1.5rem] mb-5">
                {t('perguntasFrequentes')} <em className="italic text-teal">{t('frequentes')}</em>
              </h2>
              <div className="space-y-3">
                {detail.faqs.map(faq => (
                  <details key={faq.pergunta} className="group bg-white border border-teal/10 rounded-2xl px-5 py-4 shadow-sm open:border-teal/25">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-[0.92rem] font-semibold text-steel">
                      {faq.pergunta}
                      <span className="text-teal text-[1.1rem] shrink-0 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="text-[0.86rem] font-light text-steel/60 leading-[1.7] mt-3">{faq.resposta}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Info chips */}
            <div className="bg-white border border-teal/10 rounded-2xl p-6 space-y-3 shadow-sm">
              <h3 className="text-[0.75rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-4">{t('informacoes')}</h3>
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

            {/* Convênios aceitos — Convênios Médicos é a 2ª página mais
                visitada do site depois da home. A dúvida sobre cobertura
                surge antes da decisão de agendar; responder aqui evita que
                a pessoa saia da página de exame para procurar por conta própria. */}
            <div className="bg-white border border-teal/10 rounded-2xl p-6 shadow-sm">
              <h3 className="text-[0.75rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-3">{t('conveniosAceitos')}</h3>
              <p className="text-[0.88rem] text-steel/65 leading-relaxed mb-4">
                {t('conveniosDesc', { convenios: CONVENIOS_DESTAQUE.join(', ') })}
              </p>
              <Link
                href="/convenios-medicos"
                className="text-[0.85rem] font-medium text-teal hover:text-teal/70 transition-colors inline-flex items-center gap-1.5"
              >
                {t('verConveniosCompletos')} <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* PDF Download — dois botões para testes resp., um para outros */}
            {isResp ? (
              <div className="bg-teal/8 border border-teal/18 rounded-2xl p-5 space-y-3">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[.08em] text-teal mb-1">{t('preparosDoExame')}</h3>
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
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[.08em] text-teal mb-3">{t('preparoDoExame')}</h3>
                <p className="text-[0.82rem] text-steel/60 mb-4 leading-relaxed">
                  {t('baixeGuiaCalma')}
                </p>
                <a
                  href={pdfUrl}
                  download
                  className="btn-teal w-full justify-center text-[0.9rem] py-3"
                >
                  <Download className="w-4 h-4" />
                  {t('baixarPreparoPdf')}
                </a>
              </div>
            ) : null}

            {/* ISO badge */}
            <div className="bg-gold/8 border border-gold/22 rounded-2xl p-5 flex items-center gap-3">
              <IsoSeal size={44} className="shrink-0" />
              <p className="text-[0.82rem] text-steel/65 leading-snug">
                {t('isoBadge')} <strong className="text-steel font-semibold">{t('isoBadgeStrong')}</strong>
              </p>
            </div>

            {/* Especialidades relacionadas */}
            {espRel.length > 0 && (
              <div className="bg-white border border-teal/10 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[0.75rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-4">{t('especialidadesRelacionadas')}</h3>
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
              {t('agendarEsteExame')}
            </Link>

            {/* Vídeo NU.V.E.M Ensino — somente testes respiratórios */}
            {isResp && (
              <div className="rounded-2xl overflow-hidden shadow-md border border-teal/10">
                <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
                  <iframe src={RESP_VIDEOS[1].embed} title={RESP_VIDEOS[1].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="absolute inset-0 w-full h-full" />
                </div>
              </div>
            )}

            {/* Vídeo específico do exame */}
            {!isResp && detail.video && (
              <div className="rounded-2xl overflow-hidden shadow-md border border-teal/10">
                <div className="relative w-full" style={{ aspectRatio: detail.video.short ? '9/16' : '16/9' }}>
                  <iframe
                    src={detail.video.embed}
                    title={detail.video.title}
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
