import { cn } from '@/lib/utils'

interface Props { className?: string }

export function CloudLogo({ className }: Props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('w-5 h-5', className)}
      aria-hidden="true"
    >
      <path d="M12 2C8 2 5 5 5 8.5C3.5 8.5 2 10 2 12C2 14 3.5 16 6 16H18C20.5 16 22 14 22 12C22 10 20.5 8.5 19 8.5C19 5 16 2 12 2Z" />
      <line x1="12" y1="16" x2="12" y2="22" />
      <line x1="9"  y1="20" x2="15" y2="20" />
    </svg>
  )
}
