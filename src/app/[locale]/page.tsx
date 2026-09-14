import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { HeroSection }          from '@/components/sections/HeroSection'

import { EspecialidadesSection } from '@/components/sections/EspecialidadesSection'
import { ExamesSection }         from '@/components/sections/ExamesSection'
import { IsoSection }            from '@/components/sections/IsoSection'
import { CursosSection }         from '@/components/sections/CursosSection'
import { DepoimentosSection }    from '@/components/sections/DepoimentosSection'
import { CtaSection }            from '@/components/sections/CtaSection'
import { localizedAlternates }   from '@/lib/i18n-seo'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'home.meta' })
  return {
    alternates: localizedAlternates('/', locale),
    title:      t('title'),
  }
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
     
      <EspecialidadesSection />
      <ExamesSection />
      <IsoSection />
      <CursosSection limit={3} />
      <DepoimentosSection />
      <CtaSection />
    </>
  )
}