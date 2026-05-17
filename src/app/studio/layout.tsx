export const metadata = { title: 'Studio · NU.V.E.M Medicina' }

export default function StudioLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
