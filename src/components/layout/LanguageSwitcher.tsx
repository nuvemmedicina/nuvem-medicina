'use client'

import { useLocale } from 'next-intl'
import { usePathname, useRouter } from '@/i18n/navigation'
import { routing } from '@/i18n/routing'
import { cn } from '@/lib/utils'

const LABELS: Record<string, string> = {
  'pt-BR': 'PT',
  en:      'EN',
  es:      'ES',
}

interface Props {
  variant?: 'desktop' | 'mobile'
}

export function LanguageSwitcher({ variant = 'desktop' }: Props) {
  const locale   = useLocale()
  const pathname = usePathname()
  const router   = useRouter()

  return (
    <div
      role="group"
      aria-label="Idioma / Language / Idioma"
      className={cn(
        'flex items-center gap-1',
        variant === 'mobile' && 'justify-center',
      )}
    >
      {routing.locales.map(l => (
        <button
          key={l}
          type="button"
          aria-current={l === locale}
          onClick={() => router.replace(pathname, { locale: l })}
          className={cn(
            'text-[0.72rem] font-semibold px-2 py-1 rounded-md transition-colors',
            variant === 'desktop'
              ? (l === locale ? 'text-teal bg-teal/8' : 'text-steel/45 hover:text-teal')
              : (l === locale ? 'text-white bg-white/15' : 'text-white/50 hover:text-white'),
          )}
        >
          {LABELS[l]}
        </button>
      ))}
    </div>
  )
}
