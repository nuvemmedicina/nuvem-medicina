import { IsoSeal }      from '@/components/icons/IsoSeal'
import { HeroCarousel } from '@/components/sections/HeroCarousel'

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* Light grid background — the "tech" checkered look */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      {/* Soft mist orb top-right */}
      <div
        className="absolute -top-[15%] -right-[8%] w-[600px] h-[600px] rounded-full animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(203,228,230,.55) 0%, transparent 65%)' }}
      />

      {/* Second orb bottom-left */}
      <div
        className="absolute bottom-[0%] -left-[5%] w-[380px] h-[380px] rounded-full animate-[drift_16s_ease-in-out_infinite_reverse] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,70,95,.06) 0%, transparent 65%)' }}
      />

      {/* Vertical teal accent line */}
      <div
        className="absolute top-0 bottom-0 w-px opacity-20 pointer-events-none"
        style={{
          right: '30%',
          background: 'linear-gradient(to bottom, transparent, rgba(0,70,95,.35) 30%, rgba(0,70,95,.35) 70%, transparent)',
        }}
      />

      {/* Decorative ISO seal watermark */}
      <div className="absolute right-[6%] top-1/2 -translate-y-1/2 opacity-[0.045] animate-seal-spin pointer-events-none select-none hidden xl:block">
        <IsoSeal size={280} />
      </div>

      {/* Content — carrossel de slides */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-8 pt-[120px] pb-20">
        <HeroCarousel />
      </div>

    </section>
  )
}
