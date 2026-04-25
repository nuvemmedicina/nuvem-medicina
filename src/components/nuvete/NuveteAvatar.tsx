// ─── NuveteAvatar ─────────────────────────────────────────────────────────────
import { cn } from '@/lib/utils'
import Image   from 'next/image'

interface AvatarProps { size?: number; pulse?: boolean; className?: string }

export function NuveteAvatar({ size = 40, pulse = false, className }: AvatarProps) {
  return (
    <div
      className={cn('relative rounded-full shrink-0 overflow-hidden border-2 border-gold/40 bg-navy', className)}
      style={{ width: size, height: size }}
    >
      {/* Fallback gradient if image not set */}
      <div className="absolute inset-0 rounded-full bg-gradient-to-br from-teal to-navy flex items-center justify-center">
        <svg viewBox="0 0 343.39 245.26" className="w-[65%] h-[65%]" fill="none">
          <path fill="rgba(203,228,230,0.9)"
            d="M301.89,167.91h-105.33v-17.58h8.67c1.29,0,2.48-.67,3.14-1.77s.69-2.47.09-3.61l-25.03-46.83c-.64-1.19-1.88-1.94-3.23-1.94s-2.59.74-3.22,1.94l-25.03,46.83c-.61,1.13-.57,2.5.09,3.61.66,1.1,1.85,1.77,3.14,1.77h8.66v47.02c0,.97.38,1.9,1.07,2.59.68.69,1.61,1.07,2.59,1.07h4.47l-14.79,27.68-14.79-27.68h4.48c2.02,0,3.66-1.64,3.66-3.66v-25.78c0-2.02-1.64-3.66-3.66-3.66H63.67c-23.84,0-41.41-9.22-49.47-25.95-7.19-14.92-5.72-33.99,3.74-48.59,8.47-13.09,21.79-20.29,37.51-20.29h0c2.51,0,5.1.19,7.7.56l.92.13c1.71.24,3.35-.74,3.95-2.36l.34-.93c6.75-18.26,21.75-30.56,39.16-32.09,12.87-1.13,25.49,3.88,34.98,13.75l1.19,1.24c.85.87,2.07,1.27,3.28,1.06,1.2-.21,2.22-1.01,2.71-2.12l.71-1.61c11.32-25.56,32.47-40.82,56.59-40.82h0c5.08,0,10.26.68,15.39,2.01,26.57,6.9,52.94,32.33,51.97,73.59l-.04,1.5c-.02,1.08.42,2.1,1.22,2.82.8.71,1.87,1.04,2.94.9l1.38-.19c3.4-.47,6.75-.71,9.93-.71,16.59,0,29.45,6.33,37.16,18.3,7.93,12.3,9.03,29.28,2.76,42.28-5.45,11.29-15.33,17.51-27.8,17.51"
          />
        </svg>
      </div>
      {/* Real photo if available */}
      <Image
        src="/images/nuvete.png"
        alt="Nuvete"
        fill
        className="object-cover rounded-full"
        onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
      />
      {pulse && (
        <span className="absolute bottom-0 right-0 w-3 h-3 rounded-full bg-emerald-400 border-2 border-deep" />
      )}
    </div>
  )
}
