import type { Metadata } from 'next'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { ArrowRight, Download } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { EXAM_PDFS } from '@/lib/data'
import { getExames } from '@/lib/content/catalog'
import { localizedAlternates } from '@/lib/i18n-seo'
import { routing, type AppLocale } from '@/i18n/routing'

interface Props { params: Promise<{ locale: string }> }

export function generateStaticParams() {
  return routing.locales.map(locale => ({ locale }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'examesPage' })
  return {
    alternates:  localizedAlternates('/exames', locale),
    title:       t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function ExamesPage({ params }: Props) {
  const { locale } = await params
  setRequestLocale(locale)
  const t = await getTranslations('examesPage')
  const EXAMES = getExames(locale as AppLocale)

  return (
    <>
      <PageHero
        tag={t('tag')}
        title={t.rich('title', { em: chunks => <em>{chunks}</em> })}
        desc={t('desc')}
      />

      <SectionWrapper mist grid>
        <div className="space-y-5">
          {EXAMES.map((exame, i) => {
            const pdfUrl = EXAM_PDFS[exame.id]
            return (
              <div
                key={exame.id}
                className={`group flex flex-col md:flex-row md:items-center gap-6 bg-white border border-teal/10 rounded-2xl p-8 hover:border-teal/22 hover:-translate-y-0.5 hover:shadow-md transition-all reveal reveal-d${i % 3}`}
              >
                <div className="shrink-0">
                  <span className="font-serif text-[3.5rem] font-light text-teal/10 leading-none group-hover:text-teal/18 transition-colors">
                    {exame.num}
                  </span>
                </div>

                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-3 mb-2">
                    <span className="text-[0.68rem] font-bold tracking-[.1em] uppercase text-gold bg-gold/10 border border-gold/25 px-2.5 py-0.5 rounded-full">
                      {exame.tag}
                    </span>
                  </div>
                  <h2 className="text-[1.05rem] font-semibold text-steel mb-1">{exame.title}</h2>
                  <p className="text-[0.85rem] text-steel/45 mb-3">{exame.subtitle}</p>
                  <p className="text-[0.9rem] font-light text-steel/60 leading-[1.72]">{exame.desc[0]}</p>
                </div>

                <div className="shrink-0 flex flex-col gap-3 md:w-52">
                  {exame.info.slice(0, 2).map(({ text }) => (
                    <div key={text} className="flex items-center gap-2 text-[0.78rem] text-steel/45">
                      <span className="w-1.5 h-1.5 rounded-full bg-teal/35 shrink-0" />
                      {text}
                    </div>
                  ))}
                  <div className="flex flex-col gap-2 mt-1">
                    <Link
                      href={`/exames/${exame.id}`}
                      className="inline-flex items-center gap-1.5 text-[0.85rem] font-semibold text-teal group-hover:gap-2.5 transition-all"
                    >
                      {t('verDetalhes')} <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {pdfUrl && (
                      <a
                        href={pdfUrl}
                        download
                        className="inline-flex items-center gap-1.5 text-[0.78rem] text-steel/45 hover:text-teal transition-colors"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {t('baixarPreparo')}
                      </a>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Preparos link */}
        <div className="mt-8 p-6 bg-white border border-teal/10 rounded-2xl flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-sm">
          <div>
            <h3 className="text-[1rem] font-semibold text-steel mb-1">{t('preparosTitle')}</h3>
            <p className="text-[0.88rem] text-steel/55">{t('preparosDesc')}</p>
          </div>
          <Link href="/exames/preparos" className="btn-teal shrink-0">
            {t('verPreparos')} <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <CtaBanner />
      </SectionWrapper>
    </>
  )
}
