'use client'

import { usePathname } from 'next/navigation'
import { Navbar }     from '@/components/layout/Navbar'
import { Footer }     from '@/components/layout/Footer'
import { WaFloat }   from '@/components/ui/WaFloat'
import { RevealInit } from '@/components/ui/RevealInit'
import { NuveteChat } from '@/components/nuvete/NuveteChat'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio  = pathname?.startsWith('/studio')

  if (isStudio) return <>{children}</>

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WaFloat />
      <NuveteChat />
      <RevealInit />
    </>
  )
}
