import type { Metadata } from 'next'
import { HeroSection }          from '@/components/sections/HeroSection'

import { EspecialidadesSection } from '@/components/sections/EspecialidadesSection'
import { ExamesSection }         from '@/components/sections/ExamesSection'
import { IsoSection }            from '@/components/sections/IsoSection'
import { EnsinoSection }         from '@/components/sections/EnsinoSection'
import { DepoimentosSection }    from '@/components/sections/DepoimentosSection'
import { CtaSection }            from '@/components/sections/CtaSection'

export const metadata: Metadata = {
  title: 'NU.V.E.M Medicina — Excelência em Saúde Digestiva · Belo Horizonte',
}

export default function HomePage() {
  return (
    <>
      <HeroSection />
     
      <EspecialidadesSection />
      <ExamesSection />
      <IsoSection />
      <EnsinoSection />
      <DepoimentosSection />
      <CtaSection />
    </>
  )
}