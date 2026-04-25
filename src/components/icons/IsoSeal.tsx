import Image from 'next/image'
import { cn }  from '@/lib/utils'

interface Props {
  className?: string
  size?:      number   // px — both width and height (square)
  priority?:  boolean
}

/**
 * Selo ISO 9001 oficial com gradiente dourado.
 * Usa next/image para carregar o SVG de /public/images/iso-9001.svg
 * — o SVG contém gradientes complexos que exigem renderização externa.
 */
export function IsoSeal({ className, size = 200, priority = false }: Props) {
  return (
    <Image
      src="/images/iso-9001.svg"
      alt="Certificação ISO 9001"
      width={size}
      height={size}
      priority={priority}
      className={cn('w-auto', className)}
      style={{ width: size, height: size }}
    />
  )
}
