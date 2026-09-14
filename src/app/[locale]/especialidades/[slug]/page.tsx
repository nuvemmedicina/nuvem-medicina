import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Image   from 'next/image'
import { getTranslations, getLocale } from 'next-intl/server'
import { ArrowRight, CheckCircle2, Stethoscope } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { IsoSeal } from '@/components/icons/IsoSeal'
import { PageHero }       from '@/components/ui/PageHero'
import { Breadcrumb }     from '@/components/ui/Breadcrumb'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { getEspecialidades, getExames } from '@/lib/content/catalog'
import { getEspecialidadeDetail } from '@/lib/content/especialidades-detail'
import { localizedAlternates } from '@/lib/i18n-seo'
import type { AppLocale } from '@/i18n/routing'
import { renderRich } from '@/lib/rich'
import { JsonLd } from '@/components/ui/JsonLd'
import { especialidadeSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { SITE_URL } from '@/lib/site'
import { ESPECIALIDADES as ESPECIALIDADES_PT } from '@/lib/data'

const BASE_URL = SITE_URL

const OG_LOCALE: Record<AppLocale, string> = { 'pt-BR': 'pt_BR', en: 'en_US', es: 'es_419' }

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props { params: Promise<{ locale: string; slug: string }> }

export async function generateStaticParams() {
  return ESPECIALIDADES_PT.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale, slug } = await params
  const l = locale as AppLocale
  const esp = getEspecialidades(l).find(e => e.slug === slug)
  const detail = getEspecialidadeDetail(l, slug)
  if (!esp) return {}
  const desc = detail?.heroDesc ?? esp.desc
  return {
    title:       esp.title,
    description: desc,
    alternates:  localizedAlternates(`/especialidades/${slug}`, locale),
    openGraph: {
      title:       `${esp.title} | NU.V.E.M Medicina`,
      description: desc,
      locale:      OG_LOCALE[l],
      images: [{
        url:    '/images/nuvem-medicina-bh.jpg',
        width:  1200,
        height: 630,
        alt:    `Consultório NU.V.E.M Medicina — ${esp.title}`,
      }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${esp.title} | NU.V.E.M Medicina`,
      description: desc,
      images:      ['/images/nuvem-medicina-bh.jpg'],
    },
  }
}

export default async function EspecialidadeSlugPage({ params }: Props) {
  const { slug } = await params
  const locale = await getLocale() as AppLocale
  const t = await getTranslations('especialidadeDetail')
  const tList = await getTranslations('especialidadesPage')
  const esp    = getEspecialidades(locale).find(e => e.slug === slug)
  const detail = getEspecialidadeDetail(locale, slug)
  if (!esp || !detail) notFound()

  const relExames = getExames(locale).filter(e => detail.exames.includes(e.id))

  return (
    <>
      <JsonLd data={[
        especialidadeSchema(esp),
        faqSchema(detail.faqs),
        breadcrumbSchema([
          { name: 'Home',              url: BASE_URL },
          { name: tList('listLabel'),  url: `${BASE_URL}/especialidades` },
          { name: esp.title,           url: `${BASE_URL}/especialidades/${esp.slug}` },
        ]),
      ]} />
      <PageHero
        tag={t('heroTag')}
        title={<em>{esp.title}</em>}
        desc={detail.heroDesc}
      >
        <Breadcrumb crumbs={[
          { label: tList('listLabel'), href: '/especialidades' },
          { label: esp.title },
        ]} />
      </PageHero>

      <SectionWrapper mist grid>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Conteúdo principal ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Intro */}
            <div className="space-y-4 text-[0.98rem] font-light text-steel/65 leading-[1.85]">
              {detail.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Sintomas */}
            <div>
              <h2 className="font-serif font-light text-steel text-[1.4rem] mb-1 reveal">
                {t('quandoBuscar')} <em className="italic text-teal">{esp.title}</em>
              </h2>
              <p className="text-[0.85rem] text-steel/50 mb-5 reveal reveal-d1">
                {t('sintomasIntro')}
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 reveal reveal-d2">
                {detail.sintomas.map((s) => (
                  <div key={s} className="flex items-start gap-2.5 bg-white border border-teal/10 rounded-xl px-4 py-3 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <span className="text-[0.85rem] font-light text-steel/70 leading-[1.6]">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* O que tratamos */}
            <div>
              <h2 className="font-serif font-light text-steel text-[1.4rem] mb-6 reveal">
                {t('oQueTratamos')} <em className="italic text-teal">{esp.title}</em>
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

            {/* Diferenciais */}
            <div className="bg-gradient-to-br from-[#001f2e] via-[#002a3d] to-[#00465F] rounded-2xl p-8 reveal">
              <p className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal-light/80 mb-3">{t('porQueNuvem')}</p>
              <h2 className="font-serif font-light text-white text-[1.3rem] mb-6">
                {t('diferenciaisPrefix')} <em>{t('diferenciaisEm')}</em> {t('diferenciaisSuffix')} {esp.title}
              </h2>
              <ul className="space-y-3">
                {detail.diferenciais.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span className="text-[0.88rem] font-light text-white/75 leading-[1.7]">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Para médicos */}
            <div className="border border-teal/15 rounded-2xl p-8 bg-white shadow-sm reveal">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/15 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-teal" />
                </div>
                <p className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal">{t('paraMedicosTag')}</p>
              </div>
              <p className="text-[0.93rem] font-light text-steel/65 leading-[1.82] mb-6">
                {detail.paraMedicos.intro}
              </p>
              <ul className="space-y-2.5 mb-6">
                {detail.paraMedicos.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <span className="text-[0.88rem] font-light text-steel/65 leading-[1.65]">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/contato" className="btn-ghost text-[0.85rem] py-2.5 px-5">
                  {t('falarComClinica')} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/ensino" className="text-[0.85rem] font-medium text-teal hover:text-teal/70 transition-colors inline-flex items-center gap-1.5 py-2.5">
                  {t('conhecaEnsino')} <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            {/* Perguntas Frequentes */}
            <div>
              <h2 className="font-serif font-light text-steel text-[1.4rem] mb-5 reveal">
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

          {/* ── Sidebar ── */}
          <div className="space-y-5">

            {/* Especialista(s) */}
            <div className="bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 pt-5 pb-3">
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40">
                  {detail.especialistas.length > 1 ? t('especialistas') : t('especialista')}
                </h3>
              </div>
              {detail.especialistas.map((esp_item) => {
                const inner = (
                  <div className="flex items-center gap-3 px-5 py-3 hover:bg-teal/4 transition-colors">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-teal/15 shrink-0 relative">
                      <Image
                        src={esp_item.foto}
                        alt={esp_item.nome}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.88rem] font-semibold text-steel leading-tight">{esp_item.nome}</div>
                      <div className="text-[0.75rem] text-teal mt-0.5 leading-tight">{esp_item.esp}</div>
                      {esp_item.crm && <div className="text-[0.68rem] text-steel/35 mt-0.5">{esp_item.crm}</div>}
                    </div>
                    {esp_item.href && <ArrowRight className="w-3.5 h-3.5 text-steel/25 shrink-0" />}
                  </div>
                )
                return esp_item.href ? (
                  <Link key={esp_item.nome} href={esp_item.href} className="block border-t border-teal/8 group">
                    {inner}
                  </Link>
                ) : (
                  <div key={esp_item.nome} className="border-t border-teal/8">{inner}</div>
                )
              })}
              <div className="px-5 pb-5 pt-2">
                <Link href="/equipe" className="text-[0.78rem] text-teal hover:text-teal/70 transition-colors inline-flex items-center gap-1">
                  {t('verEquipeCompleta')} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-teal/10 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-3">{t('areasDeAtuacao')}</h3>
              <div className="flex flex-wrap gap-2">
                {esp.tags.map(tag => (
                  <span key={tag} className="text-[0.78rem] font-medium px-3 py-1.5 rounded-full bg-teal/8 border border-teal/15 text-teal">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Exames relacionados */}
            {relExames.length > 0 && (
              <div className="bg-white border border-teal/10 rounded-2xl p-5 shadow-sm">
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-3">{t('examesRelacionados')}</h3>
                <div className="space-y-2">
                  {relExames.map(e => (
                    <Link
                      key={e.id}
                      href={`/exames/${e.id}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-cloud border border-teal/8 hover:border-teal/22 hover:bg-teal/5 transition-all group"
                    >
                      <span className="text-[0.86rem] text-steel/60 group-hover:text-teal transition-colors">{e.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-steel/30 group-hover:text-teal transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ISO badge */}
            <div className="bg-gold/8 border border-gold/22 rounded-2xl p-5 flex items-center gap-3">
              <IsoSeal size={44} className="shrink-0" />
              <div>
                <p className="text-[0.82rem] text-steel/65 leading-snug">
                  {t('isoBadge')} <strong className="text-steel font-semibold">{t('isoBadgeStrong')}</strong>
                </p>
                <Link href="/gestao-da-qualidade" className="text-[0.72rem] text-teal hover:text-teal/70 transition-colors mt-1 inline-flex items-center gap-1">
                  {t('saibaMais')} <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-teal rounded-2xl p-6">
              <h3 className="text-[0.95rem] font-semibold text-white mb-2">{t('agendarConsulta')}</h3>
              <p className="text-[0.85rem] text-white/70 mb-4 leading-relaxed">
                {t('agendarDesc', { esp: esp.title })}
              </p>
              <Link href="/agendar" className="btn-gold w-full justify-center">
                {t('agendarAgora')}
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
