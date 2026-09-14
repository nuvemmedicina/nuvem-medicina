export const metadata = { title: 'Studio · NU.V.E.M Medicina' }

/**
 * Root layout independente do Studio (padrão "multiple root layouts" do
 * Next.js). Fora do segmento [locale] de propósito: é uma ferramenta interna,
 * sempre em português, sem GTM/consent — já bloqueada no robots.txt.
 */
export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
