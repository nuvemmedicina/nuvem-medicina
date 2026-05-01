import Link from 'next/link'
import { ChevronRight } from 'lucide-react'

interface Crumb { label: string; href?: string }

export function Breadcrumb({ crumbs }: { crumbs: Crumb[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[0.78rem] text-steel/40 mb-4 flex-wrap">
      <Link href="/" className="hover:text-teal transition-colors">Início</Link>
      {crumbs.map((crumb, i) => (
        <span key={crumb.label} className="flex items-center gap-1.5">
          <ChevronRight className="w-3 h-3 opacity-40" />
          {crumb.href && i < crumbs.length - 1 ? (
            <Link href={crumb.href} className="hover:text-teal transition-colors">
              {crumb.label}
            </Link>
          ) : (
            <span className="text-steel/65">{crumb.label}</span>
          )}
        </span>
      ))}
    </nav>
  )
}
