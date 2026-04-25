'use client'

import Link              from 'next/link'
import { useEffect, useRef, useState } from 'react'
import { Menu, X, Calendar } from 'lucide-react'
import { NAV_ITEMS }    from '@/lib/data'
import { cn }           from '@/lib/utils'
import { LogoBranco }   from '@/components/icons/LogoBranco'
import { IconeBranco }  from '@/components/icons/IconeBranco'

export function Navbar() {
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)
  const navRef = useRef<HTMLElement>(null)

  // Scroll detection
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', handler, { passive: true })
    return () => window.removeEventListener('scroll', handler)
  }, [])

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(e.target as Node)) {
        setActiveDropdown(null)
        setMobileOpen(false)
      }
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  return (
    <nav
      ref={navRef}
      className={cn(
        'fixed top-0 left-0 right-0 z-[100] transition-all duration-400',
        scrolled
          ? 'bg-ink/88 backdrop-blur-xl border-b border-teal-light/[0.08]'
          : 'bg-transparent',
      )}
    >
      <div className="max-w-[1240px] mx-auto px-8 h-[76px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 shrink-0" aria-label="NU.V.E.M Medicina — Página inicial">
          {/* Icon only on small nav; full logo on wider screens */}
          <IconeBranco className="h-7 w-auto lg:hidden opacity-90" />
          <LogoBranco  className="hidden lg:block h-8 w-auto opacity-90 hover:opacity-100 transition-opacity" />
        </Link>

        {/* Desktop nav */}
        <div className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map(item => (
            <div key={item.href} className="relative">
              {item.children ? (
                <button
                  className={cn(
                    'nav-link flex items-center gap-1',
                    activeDropdown === item.href && 'text-white',
                  )}
                  onMouseEnter={() => setActiveDropdown(item.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                  onClick={() => setActiveDropdown(
                    activeDropdown === item.href ? null : item.href,
                  )}
                >
                  {item.label}
                  <svg className="w-3 h-3 opacity-60" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M6 9l6 6 6-6"/>
                  </svg>
                </button>
              ) : (
                <Link href={item.href} className="nav-link">
                  {item.label}
                </Link>
              )}

              {/* Dropdown */}
              {item.children && activeDropdown === item.href && (
                <div
                  className="absolute top-full left-0 pt-2 min-w-[220px]"
                  onMouseEnter={() => setActiveDropdown(item.href)}
                  onMouseLeave={() => setActiveDropdown(null)}
                >
                  <div className="bg-deep border border-teal-light/10 rounded-xl shadow-2xl overflow-hidden">
                    <div className="h-px gold-line" />
                    {item.children.map(child => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="flex items-center gap-2 px-4 py-3 text-[0.78rem] text-muted hover:text-white hover:bg-teal-light/5 transition-colors"
                      >
                        <span className="w-1 h-1 rounded-full bg-gold/50 shrink-0" />
                        {child.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:flex items-center gap-4">
          <a
            href="tel:3125373131"
            className="text-[0.78rem] text-muted hover:text-gold transition-colors"
          >
            (31) 2537-3131
          </a>
          <Link href="/agendar" className="btn-nav-cta">
            <Calendar className="w-3.5 h-3.5" />
            Agendar Consulta
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="lg:hidden text-muted p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Menu"
        >
          {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div
          className="lg:hidden px-6 pb-6 border-b border-teal-light/[0.08]"
          style={{
            background: '#050E14',
            position: 'fixed',
            top: '76px',
            left: 0,
            right: 0,
            bottom: 0,
            overflowY: 'auto',
            zIndex: 99,
          }}
        >
          <div className="gold-line mb-4" />
          {NAV_ITEMS.map(item => (
            <div key={item.href}>
              <Link
                href={item.href}
                className="block py-3.5 text-[0.9rem] font-medium text-white border-b border-teal-light/[0.08] hover:text-gold transition-colors"
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
              </Link>
              {item.children && (
                <div className="pl-4 py-1">
                  {item.children.map(child => (
                    <Link
                      key={child.href}
                      href={child.href}
                      className="block py-2.5 text-[0.82rem] text-muted hover:text-teal-light transition-colors"
                      onClick={() => setMobileOpen(false)}
                    >
                      {child.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          ))}
          <div className="mt-6 flex flex-col gap-3 pb-8">
            <a href="tel:3125373131" className="text-[0.85rem] text-muted text-center py-2">
              (31) 2537-3131
            </a>
            <Link href="/agendar" className="btn-gold justify-center" onClick={() => setMobileOpen(false)}>
              <Calendar className="w-4 h-4" />
              Agendar Consulta
            </Link>
          </div>
        </div>
      )}
    </nav>
  )
}