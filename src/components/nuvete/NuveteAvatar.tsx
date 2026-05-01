import { cn } from '@/lib/utils'
import Image   from 'next/image'

interface AvatarProps { size?: number; pulse?: boolean; className?: string }

export function NuveteAvatar({ size = 40, pulse = false, className }: AvatarProps) {
  return (
    <div
      className={cn('relative rounded-full shrink-0 overflow-hidden border-2 border-gold/40 bg-navy', className)}
      style={{ width: size, height: size }}
    >
      <Image
        src="/images/nuvete.jpg"
        alt="Nuvete — Assistente NU.V.E.M"
        fill
        className="object-cover object-top rounded-full"
        sizes={`${size}px`}
      />
    </div>
  )
}
