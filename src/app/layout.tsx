import type { Metadata } from 'next'
import { Poppins, Cormorant_Garamond } from 'next/font/google'
import '@/styles/globals.css'
import { SiteShell }        from '@/components/layout/SiteShell'
import { JsonLd }            from '@/components/ui/JsonLd'
import { GoogleAnalytics }   from '@/components/ui/GoogleAnalytics'
import {
  organizationSchema,
  websiteSchema,
  ratingSchema,
  localBusinessSchema,
  directorSchema,
} from '@/lib/schema'

// ── Fonts ─────────────────────────────────────────────────────────────────────
const poppins = Poppins({
  subsets:  ['latin'],
  weight:   ['300', '400', '500', '600', '700', '800'],
  variable: '--font-poppins',
  display:  'swap',
})

const cormorant = Cormorant_Garamond({
  subsets:  ['latin'],
  weight:   ['300', '400', '500'],
  style:    ['normal', 'italic'],
  variable: '--font-cormorant',
  display:  'swap',
})

// ── Metadata ──────────────────────────────────────────────────────────────────
export const metadata: Metadata = {
  title: {
    default:  'NU.V.E.M Medicina — Excelência em Saúde Digestiva · Belo Horizonte',
    template: '%s | NU.V.E.M Medicina',
  },
  description:
    'Clínica especializada em gastroenterologia, manometria, testes respiratórios (SIBO/H. pylori), fisioterapia pélvica e ensino médico. ISO 9001. Santa Efigênia, Belo Horizonte – MG.',
  keywords: [
    'gastroenterologia belo horizonte', 'manometria esofágica BH', 'teste respiratório SIBO BH',
    'fisioterapia pélvica belo horizonte', 'halitose diagnóstico BH', 'ISO 9001 clínica BH',
    'nuvem medicina', 'Dra Vera Ângelo', 'H pylori teste respiratório', 'pHmetria esofágica',
    'SIBO tratamento belo horizonte', 'intolerância lactose teste', 'clínica gastro BH',
  ],
  authors:      [{ name: 'NU.V.E.M Medicina', url: 'https://nuvemmedicina.com.br' }],
  creator:      'NU.V.E.M Medicina',
  publisher:    'NU.V.E.M Medicina',
  category:     'health',
  metadataBase:  new URL('https://nuvemmedicina.com.br'),
  alternates:   { canonical: '/' },
  openGraph: {
    type:        'website',
    locale:      'pt_BR',
    url:         'https://nuvemmedicina.com.br',
    siteName:    'NU.V.E.M Medicina',
    title:       'NU.V.E.M Medicina — Gastroenterologia e Diagnóstico Avançado em BH',
    description: 'Clínica especializada com ISO 9001. Manometria, testes respiratórios, pHmetria e fisioterapia pélvica em Belo Horizonte.',
    images: [{
      url:    '/images/vera-eliane.jpg',
      width:  1200,
      height: 630,
      alt:    'Dra. Vera Ângelo e Dra. Eliane Basques — Fundadoras da NU.V.E.M Medicina',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'NU.V.E.M Medicina — Gastroenterologia com ISO 9001 em BH',
    description: 'Clínica especializada com certificação ISO 9001. SIBO, H. pylori, manometria, fisioterapia pélvica.',
    images:      ['/images/vera-eliane.jpg'],
  },
  robots: {
    index:          true,
    follow:         true,
    googleBot: {
      index:                    true,
      follow:                   true,
      'max-video-preview':      -1,
      'max-image-preview':      'large',
      'max-snippet':            -1,
    },
  },
  verification: {
    google:  process.env.GOOGLE_VERIFICATION  ?? '',
    // Add other verification tokens as env vars
  },
  other: {
    // AI/LLM discovery hints
    'llms-txt':        'https://nuvemmedicina.com.br/llms.txt',
    'ai-content-type': 'medical-clinic',
    'geo.region':      'BR-MG',
    'geo.placename':   'Belo Horizonte',
    'geo.position':    '-19.9245;-43.9352',
    'ICBM':            '-19.9245, -43.9352',
  },
}

// ── Layout ────────────────────────────────────────────────────────────────────
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className={`${poppins.variable} ${cormorant.variable}`}>
      <body>
        <SiteShell>{children}</SiteShell>
        {/* Global structured data for all pages */}
        <JsonLd data={[organizationSchema, websiteSchema, ratingSchema, localBusinessSchema, directorSchema]} />
        {/* Google Analytics GA4 — Measurement ID é público por natureza */}
        <GoogleAnalytics measurementId="G-J90YW71NMZ" />
      </body>
    </html>
  )
}
