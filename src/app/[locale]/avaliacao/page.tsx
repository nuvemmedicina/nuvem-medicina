import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { AvaliacaoForm } from './AvaliacaoForm'
import { IsoSeal }      from '@/components/icons/IsoSeal'
import { localizedAlternates } from '@/lib/i18n-seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'avaliacaoPage' })
  return {
    alternates:  localizedAlternates('/avaliacao', locale),
    title:       t('metaTitle'),
    description: t('metaDescription'),
    robots:      { index: false }, // NPS page — don't index
  }
}

export default async function AvaliacaoPage() {
  const t = await getTranslations('avaliacaoPage')
  return (
    <div className="min-h-screen bg-cloud flex flex-col">
      {/* Top gradient bar */}
      <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #00465F, #0e7fa5)' }} />

      {/* Main */}
      <main className="flex-1 flex items-center justify-center px-4 pb-16">
        <div className="w-full max-w-lg">
          {/* Card */}
          <div className="bg-white border border-teal/12 rounded-2xl overflow-hidden shadow-xl">
            {/* Teal top line */}
            <div className="h-1 w-full" style={{ background: 'linear-gradient(90deg, #00465F, #0e7fa5)' }} />

            <div className="px-8 pt-8 pb-10">
              {/* ISO + headline */}
              <div className="flex items-center gap-3 mb-6">
                <IsoSeal size={44} />
                <div>
                  <p className="text-[0.65rem] font-bold uppercase tracking-[.12em] text-teal">{t('isoTag')}</p>
                  <p className="text-[0.72rem] text-steel/60">{t('isoSub')}</p>
                </div>
              </div>

              <h1 className="font-serif font-light text-steel text-[1.9rem] leading-tight mb-2">
                {t('titleLine1')}<br />
                <em className="italic text-teal" style={{ fontStyle: 'italic' }}>{t('titleEm')}</em>
              </h1>
              <p className="text-[0.85rem] text-steel/65 mb-8 leading-relaxed">
                {t.rich('desc', { br: () => <br /> })}
              </p>

              <AvaliacaoForm />
            </div>
          </div>

          {/* Footer note */}
          <p className="text-center text-[0.68rem] text-steel/40 mt-6 leading-relaxed px-4">
            {t('footerNote')}<br />
            © {new Date().getFullYear()} NU.V.E.M Medicina · <a href="https://www.nuvemmedicina.com.br" className="hover:text-teal transition-colors">nuvemmedicina.com.br</a>
          </p>
        </div>
      </main>
    </div>
  )
}
