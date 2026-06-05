import { cn } from '@/lib/utils'

interface PageHeroProps {
  tag:        string
  title:      React.ReactNode
  desc?:      string
  className?: string
  children?:  React.ReactNode
  bgImage?:   string  // URL da imagem de fundo opcional
  bgOpacity?: number  // opacidade (padrão 0.12)
}

export function PageHero({ tag, title, desc, className, children, bgImage, bgOpacity = 0.12 }: PageHeroProps) {
  return (
    <div
      className={cn(
        'relative pt-[76px] pb-20 overflow-hidden bg-white',
        className,
      )}
    >
      {/* Imagem de fundo opcional */}
      {bgImage && (
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            backgroundImage: `url(${bgImage})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center right',
            opacity: bgOpacity,
          }}
        />
      )}

      {/* Mist orb top right */}
      <div
        className="absolute -top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(203,228,230,.50) 0%, transparent 65%)' }}
      />

      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      {/* Teal accent line */}
      <div
        className="absolute top-0 bottom-0 w-px opacity-20 pointer-events-none"
        style={{
          right: '25%',
          background: 'linear-gradient(to bottom, transparent, rgba(0,70,95,.30) 30%, rgba(0,70,95,.30) 70%, transparent)',
        }}
      />

      <div className="relative z-10 max-w-[1240px] mx-auto px-8 pt-16">
        <p className="sec-tag">{tag}</p>
        <h1 className="sec-title max-w-3xl" style={{ fontSize: 'clamp(2.6rem, 4vw, 3.8rem)' }}>
          {title}
        </h1>
        {desc && (
          <p className="text-[1rem] font-light text-steel/60 leading-[1.85] max-w-xl mt-4">
            {desc}
          </p>
        )}
        {children && <div className="mt-8">{children}</div>}
      </div>
    </div>
  )
}
