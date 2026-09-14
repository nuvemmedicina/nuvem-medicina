'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { Globe, Check } from 'lucide-react'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const LABELS: Record<string, string> = {
  'pt-BR': 'PT',
  en:      'EN',
  es:      'ES',
}

const NAMES: Record<string, string> = {
  'pt-BR': 'Português',
  en:      'English',
  es:      'Español',
}

interface Props {
  variant?: 'desktop' | 'mobile'
}

export function LanguageSwitcher({ variant = 'desktop' }: Props) {
  const locale   = useLocale()
  const pathname = usePathname()
  const router   = useRouter()
  const [open, setOpen] = useState(false)

  const select = (l: string) => {
    router.replace(pathname, { locale: l })
    setOpen(false)
  }

  if (variant === 'mobile') {
    return (
      <div role="group" aria-label="Idioma / Language / Idioma" className="flex items-center justify-center gap-2">
        {routing.locales.map(l => (
          <button
            key={l}
            type="button"
            aria-current={l === locale}
            onClick={() => select(l)}
            className={cn(
              'text-[0.78rem] font-semibold px-4 py-2 rounded-lg border transition-colors',
              l === locale
                ? 'text-white bg-white/15 border-white/25'
                : 'text-white/50 border-white/10 hover:text-white hover:border-white/25',
            )}
          >
            {LABELS[l]}
          </button>
        ))}
      </div>
    )
  }

  return (
    <div
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <button
        type="button"
        className={cn('nav-link flex items-center gap-1.5', open && 'text-teal')}
        aria-label="Idioma / Language / Idioma"
        onClick={() => setOpen(o => !o)}
      >
        <Globe className="w-[15px] h-[15px]" />
        {LABELS[locale]}
        <svg className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M6 9l6 6 6-6"/>
        </svg>
      </button>

      {open && (
        <div className="absolute top-full right-0 pt-2 min-w-[160px]">
          <div className="bg-white border border-teal/12 rounded-2xl shadow-xl overflow-hidden">
            <div className="h-px teal-line" />
            {routing.locales.map(l => (
              <button
                key={l}
                type="button"
                aria-current={l === locale}
                onClick={() => select(l)}
                className="w-full flex items-center justify-between gap-2.5 px-4 py-3 text-[0.82rem] text-steel/65 hover:text-teal hover:bg-teal/5 transition-colors"
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-teal/35 shrink-0" />
                  {NAMES[l]}
                </span>
                {l === locale && <Check className="w-3.5 h-3.5 text-teal shrink-0" />}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
