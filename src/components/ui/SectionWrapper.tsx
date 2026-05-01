import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children:   React.ReactNode
  className?: string
  id?:        string
  dark?:      boolean  // uses cloud bg instead of white
  mist?:      boolean  // uses mist/teal-light tint
}

export function SectionWrapper({ children, className, id, dark, mist }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-24 relative overflow-hidden',
        dark  ? 'bg-cloud border-y border-teal/8' : '',
        mist  ? 'border-y border-teal/8' : '',
        !dark && !mist ? 'bg-white' : '',
        className,
      )}
      style={mist ? { background: 'rgba(203,228,230,0.15)' } : undefined}
    >
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-8">
        {children}
      </div>
    </section>
  )
}
