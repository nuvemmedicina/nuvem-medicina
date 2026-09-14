'use client'

import { useEffect, useRef, useState } from 'react'
import { useTranslations } from 'next-intl'
import { Menu, X, Calendar } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { NAV_ITEMS } from '@/lib/data'
import { cn } from '@/lib/utils'
import { LogoTeal } from '@/components/icons/LogoTeal'
import { LogoBranco } from '@/components/icons/LogoBranco'
import { LanguageSwitcher } from '@/components/layout/LanguageSwitcher'

export function Navbar() {
  const t = useTranslations('nav')
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  return (
    <>
      <nav
        ref={navRef}
        className={cn(
          'fixed top-0 left-0 right-0 z-[200] transition-all duration-400',
          scrolled
            ? 'bg-white/95 backdrop-blur-sm border-b border-teal/10 shadow-sm'
            : 'bg-white/80 backdrop-blur-sm border-b border-teal/5',
        )}
      >
        <div className="max-w-[1240px] mx-auto px-8 h-[76px] flex items-center justify-between">

          <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="NU.V.E.M Medicina">
            <LogoTeal className="h-10 w-auto opacity-95" />
          </Link>

          <div className="hidden lg:flex items-center gap-1">
            {NAV_ITEMS.map(item => (
              <div key={item.href} className="relative">
                {item.children ? (
                  <button
                    className={cn('nav-link flex items-center gap-1', activeDropdown === item.href && 'text-teal')}
                    onMouseEnter={() => setActiveDropdown(item.href)}
                    onMouseLeave={() => setActiveDropdown(null)}
                    onClick={() => setActiveDropdown(activeDropdown === item.href ? null : item.href)}
                  >
                    {t(item.key)}
                    <svg className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M6 9l6 6 6-6"/>
                    </svg>
                  </button>
                ) : (
                  <Link href={item.href} className="nav-link">{t(item.key)}</Link>
                )}
                {item.children && activeDropdown === item.href && (
                  <div
                    className="absolute top-full left-0 pt-2 min-w-[240px]"
                    onMouseEnter={() => setActiveDropdown(item.href)}
                    onMouseLeave={() => setActiveDropdown(null)}
                  >
                    <div className="bg-white border border-teal/12 rounded-2xl shadow-xl overflow-hidden">
                      <div className="h-px teal-line" />
                      {item.children.map(child => (
                        <Link
                          key={child.href}
                          href={child.href}
                          className="flex items-center gap-2.5 px-4 py-3.5 text-[0.82rem] text-steel/65 hover:text-teal hover:bg-teal/5 transition-colors"
                        >
                          <span className="w-1.5 h-1.5 rounded-full bg-teal/35 shrink-0" />
                          {t(child.key)}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="hidden lg:flex items-center gap-4">
            <LanguageSwitcher />
            <a href="tel:3125373131" className="text-[0.82rem] text-steel/55 hover:text-teal transition-colors">
              (31) 2537-3131
            </a>
            <Link href="/agendar" className="btn-nav-cta">
              <Calendar className="w-3.5 h-3.5" />
              {t('agendarCta')}
            </Link>
          </div>

          <button
            className="lg:hidden text-steel p-2 relative z-[300]"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Menu"
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {mobileOpen && (
        <div style={{ position:'fixed', inset:0, background:'#00465F', zIndex:150, overflowY:'auto', paddingTop:'76px' }}>
          <div className="px-6 pt-4 pb-10">
            <div className="h-px bg-gradient-to-r from-transparent via-white/30 to-transparent mb-4" />
            {NAV_ITEMS.map(item => (
              <div key={item.href}>
                <Link
                  href={item.href}
                  className="block py-4 text-[1.05rem] font-semibold text-white border-b border-white/10 hover:text-teal-light transition-colors"
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.key)}
                </Link>
                {item.children && (
                  <div className="pl-4 py-1">
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="block py-3 text-[0.9rem] text-white/60 hover:text-white transition-colors"
                        onClick={() => setMobileOpen(false)}
                      >
                        {t(child.key)}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            ))}
            <div className="mt-6 flex flex-col gap-4">
              <LanguageSwitcher variant="mobile" />
              <a href="tel:3125373131" className="text-center text-white/60 py-2 text-[1rem]">
                (31) 2537-3131
              </a>
              <Link href="/agendar" className="btn-gold justify-center" onClick={() => setMobileOpen(false)}>
                <Calendar className="w-4 h-4" />
                {t('agendarCta')}
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
