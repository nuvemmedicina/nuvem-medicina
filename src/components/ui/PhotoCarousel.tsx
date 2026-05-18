'use client'
import { useState } from 'react'
import Image from 'next/image'
import { ChevronLeft, ChevronRight } from 'lucide-react'

interface CarouselImage {
  src: string
  alt: string
}

interface Props {
  images: CarouselImage[]
}

export function PhotoCarousel({ images }: Props) {
  const [current, setCurrent] = useState(0)

  if (!images || images.length === 0) return null

  if (images.length === 1) {
    return (
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-teal/10" style={{ aspectRatio: '4/3' }}>
        <Image src={images[0].src} alt={images[0].alt} fill className="object-cover" />
      </div>
    )
  }

  const prev = () => setCurrent(i => (i - 1 + images.length) % images.length)
  const next = () => setCurrent(i => (i + 1) % images.length)

  return (
    <div className="space-y-3">
      {/* Main image */}
      <div className="relative rounded-2xl overflow-hidden shadow-sm border border-teal/10 bg-steel/5" style={{ aspectRatio: '4/3' }}>
        {images.map((img, i) => (
          <div
            key={img.src}
            className={`absolute inset-0 transition-opacity duration-500 ${i === current ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </div>
        ))}

        {/* Prev / Next buttons */}
        <button
          onClick={prev}
          aria-label="Anterior"
          className="absolute left-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
        >
          <ChevronLeft className="w-5 h-5 text-steel" />
        </button>
        <button
          onClick={next}
          aria-label="Próxima"
          className="absolute right-3 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white/80 backdrop-blur-sm shadow-md flex items-center justify-center hover:bg-white transition-colors z-10"
        >
          <ChevronRight className="w-5 h-5 text-steel" />
        </button>

        {/* Dot indicators */}
        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setCurrent(i)}
              aria-label={`Imagem ${i + 1}`}
              className={`h-2 rounded-full transition-all duration-300 ${i === current ? 'bg-white w-5' : 'bg-white/50 w-2 hover:bg-white/75'}`}
            />
          ))}
        </div>

        {/* Counter badge */}
        <div className="absolute top-3 right-3 text-[0.68rem] font-semibold text-white bg-black/35 backdrop-blur-sm px-2 py-0.5 rounded-full z-10">
          {current + 1} / {images.length}
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-2">
        {images.map((img, i) => (
          <button
            key={img.src}
            onClick={() => setCurrent(i)}
            className={`relative flex-1 rounded-xl overflow-hidden border-2 transition-all duration-200 ${
              i === current
                ? 'border-teal shadow-sm'
                : 'border-transparent opacity-55 hover:opacity-80'
            }`}
            style={{ aspectRatio: '4/3' }}
          >
            <Image src={img.src} alt={img.alt} fill className="object-cover" />
          </button>
        ))}
      </div>
    </div>
  )
}
