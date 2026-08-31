'use client'

import { usePathname } from 'next/navigation'
import { Navbar }     from '@/components/layout/Navbar'
import { Footer }     from '@/components/layout/Footer'
import { WaFloat }     from '@/components/ui/WaFloat'
import { RevealInit }  from '@/components/ui/RevealInit'
import { NuveteChat }  from '@/components/nuvete/NuveteChat'
import { ConsentBanner } from '@/components/ui/ConsentBanner'

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')
  // /links é a página da bio do Instagram: layout próprio, sem cabeçalho,
  // rodapé, botão flutuante de WhatsApp ou chat da Nuvete.
  const isLinkBio = pathname?.startsWith('/links')

  if (isStudio || isLinkBio) return <>{children}</>

  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
      <WaFloat />
      <NuveteChat />
      <RevealInit />
      <ConsentBanner />
    </>
  )
}
