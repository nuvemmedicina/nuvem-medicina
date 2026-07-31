'use client'
// ── HeroCarousel ──────────────────────────────────────────────────────────────
// Carrossel do hero da home: autoplay 5s, pausa no hover, loop infinito.
// Slides definidos em src/lib/hero-slides.tsx.
import { useCallback, useEffect, useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react'
import { HERO_SLIDES } from '@/lib/hero-slides'

function CtaLink({ href, className, children }: { href: string; className: string; children: React.ReactNode }) {
  const externo = href.startsWith('http')
  if (externo) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    )
  }
  return <Link href={href} className={className}>{children}</Link>
}

export function HeroCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 5000, stopOnInteraction: false, stopOnMouseEnter: true })],
  )
  const [selected, setSelected] = useState(0)

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelected(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    onSelect()
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])
  const scrollTo   = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi])

  return (
    <div className="relative opacity-0 animate-[fadeUp_.9s_.2s_var(--ease-out)_forwards]">

      {/* Viewport */}
      <div ref={emblaRef} className="overflow-hidden">
        <div className="flex">
          {HERO_SLIDES.map(({ id, badge, title, description, imagem, primaryCta, secondaryCta }, i) => (
            <div key={id} className="min-w-0 flex-[0_0_100%]">
              <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-12 lg:gap-16 items-center">

                {/* Texto */}
                <div className="max-w-[640px]">

                  {/* Eyebrow / badge */}
                  <p className="inline-flex items-center gap-2.5 text-teal text-[0.78rem] font-bold tracking-[.16em] uppercase mb-7">
                    <span className="block w-7 h-px bg-teal" />
                    {badge}
                  </p>

                  {/* Título */}
                  <h1
                    className="font-serif font-light leading-[1.08] tracking-tight text-steel mb-8"
                    style={{ fontSize: 'clamp(2rem, 3.3vw, 3.2rem)' }}
                  >
                    {title}
                  </h1>

                  {/* Descrição */}
                  <p className="text-[1.05rem] font-light text-steel/65 leading-[1.82] max-w-[540px] mb-11">
                    {description}
                  </p>

                  {/* CTAs */}
                  <div className="flex flex-wrap gap-3.5 mb-4">
                    <CtaLink href={primaryCta.href} className="btn-gold">
                      <primaryCta.Icon className="w-4 h-4" />
                      {primaryCta.label}
                    </CtaLink>
                    <CtaLink href={secondaryCta.href} className="btn-ghost">
                      {secondaryCta.label}
                      <ArrowRight className="w-4 h-4" />
                    </CtaLink>
                  </div>

                </div>

                {/* Imagem */}
                <div className="relative hidden lg:block rounded-[20px] overflow-hidden border border-teal/15" style={{ aspectRatio: '4/5' }}>
                  <Image
                    src={imagem.src}
                    alt={imagem.alt}
                    fill
                    priority={i === 0}
                    sizes="400px"
                    className="object-cover"
                  />
                </div>

              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Controles: setas (sm+) e dots */}
      <div className="flex items-center gap-5 mt-8">
        <button
          onClick={scrollPrev}
          aria-label="Slide anterior"
          className="hidden sm:flex w-10 h-10 rounded-full border border-teal/20 bg-white/70 backdrop-blur-sm items-center justify-center text-teal hover:bg-teal hover:text-white transition-colors"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={scrollNext}
          aria-label="Próximo slide"
          className="hidden sm:flex w-10 h-10 rounded-full border border-teal/20 bg-white/70 backdrop-blur-sm items-center justify-center text-teal hover:bg-teal hover:text-white transition-colors"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2">
          {HERO_SLIDES.map((slide, i) => (
            <button
              key={slide.id}
              onClick={() => scrollTo(i)}
              aria-label={`Ir para o slide ${i + 1}`}
              aria-current={i === selected}
              className={`h-2 rounded-full transition-all duration-300 ${
                i === selected ? 'bg-teal w-7' : 'bg-teal/25 w-2 hover:bg-teal/50'
              }`}
            />
          ))}
        </div>
      </div>

    </div>
  )
}
