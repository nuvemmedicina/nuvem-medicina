import { cn } from '@/lib/utils'

interface SectionWrapperProps {
  children:   React.ReactNode
  className?: string
  id?:        string
  dark?:      boolean
}

export function SectionWrapper({ children, className, id, dark }: SectionWrapperProps) {
  return (
    <section
      id={id}
      className={cn(
        'py-24',
        dark ? 'bg-deep border-y border-teal-light/[0.06]' : 'bg-ink',
        className,
      )}
    >
      <div className="max-w-[1240px] mx-auto px-8">
        {children}
      </div>
    </section>
  )
}
