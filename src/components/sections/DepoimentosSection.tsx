// ── DepoimentosSection ────────────────────────────────────────────────────────
// Componente async: busca avaliações reais do Google Places API.
// Se a API não estiver configurada ou falhar, exibe os depoimentos estáticos.

import Image from 'next/image'
import { ExternalLink } from 'lucide-react'
import { DEPOIMENTOS }   from '@/lib/data'
import { fetchGoogleReviews, formatRatingCount, type GoogleReview } from '@/lib/google-reviews'
import { CONTATO } from '@/lib/data'

// ─── Card para avaliação real do Google ──────────────────────────────────────

function GoogleReviewCard({ review, index }: { review: GoogleReview; index: number }) {
  return (
    <div
      className={`bg-cloud border border-teal/10 rounded-[14px] p-7 hover:border-teal/25 hover:-translate-y-1 hover:shadow-md transition-all reveal reveal-d${Math.min(index % 3, 4)}`}
    >
      {/* Aspas decorativas */}
      <div className="font-serif text-[2.8rem] font-light text-teal/25 leading-none mb-1.5">&ldquo;</div>

      {/* Texto */}
      <p className="text-[0.9rem] font-light text-steel/65 leading-[1.82] mb-5 line-clamp-5">
        {review.text}
      </p>

      {/* Autor */}
      <div className="flex items-center gap-2.5">
        {review.authorPhoto ? (
          <div className="w-10 h-10 rounded-full overflow-hidden shrink-0 border border-teal/15">
            <Image
              src={review.authorPhoto}
              alt={review.authorName}
              width={40}
              height={40}
              className="object-cover w-full h-full"
              unoptimized
            />
          </div>
        ) : (
          <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-[0.82rem] font-semibold text-white shrink-0">
            {review.authorName.slice(0, 2).toUpperCase()}
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="text-[0.88rem] font-semibold text-steel truncate">{review.authorName}</div>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className="flex gap-0.5">
              {Array.from({ length: review.rating }).map((_, j) => (
                <span key={j} className="text-gold text-[12px]">★</span>
              ))}
            </div>
            <span className="text-[0.68rem] text-steel/35">{review.relativeTime}</span>
          </div>
        </div>
        {/* Google icon */}
        <svg viewBox="0 0 24 24" className="w-4 h-4 shrink-0 opacity-40" fill="none">
          <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
          <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
          <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
          <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
        </svg>
      </div>
    </div>
  )
}

// ─── Card para depoimento estático ───────────────────────────────────────────

function StaticCard({ dep, index }: { dep: typeof DEPOIMENTOS[0]; index: number }) {
  return (
    <div
      className={`bg-cloud border border-teal/10 rounded-[14px] p-7 hover:border-teal/25 hover:-translate-y-1 hover:shadow-md transition-all reveal reveal-d${Math.min(index % 3, 4)}`}
    >
      <div className="font-serif text-[2.8rem] font-light text-teal/25 leading-none mb-1.5">&ldquo;</div>
      <p className="text-[0.9rem] font-light text-steel/65 leading-[1.82] mb-5">{dep.text}</p>
      <div className="flex items-center gap-2.5">
        <div className="w-10 h-10 rounded-full bg-teal flex items-center justify-center text-[0.82rem] font-semibold text-white shrink-0">
          {dep.initials}
        </div>
        <div>
          <div className="text-[0.88rem] font-semibold text-steel">{dep.name}</div>
          <div className="text-[0.75rem] text-steel/45">{dep.role}</div>
          <div className="flex gap-0.5 mt-1">
            {Array.from({ length: dep.stars }).map((_, j) => (
              <span key={j} className="text-gold text-[12px]">★</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Componente principal (async server component) ────────────────────────────

export async function DepoimentosSection() {
  const googleData = await fetchGoogleReviews()

  const totalLabel   = googleData ? formatRatingCount(googleData.totalRatings) : '+2.000'
  const usingGoogle  = !!googleData && googleData.reviews.length > 0
  const mapsUrl      = googleData?.mapsUrl ?? CONTATO.maps

  // Limita a 3 avaliações do Google
  const googleReviews = (googleData?.reviews ?? []).slice(0, 3)

  return (
    <section className="py-28 bg-white border-t border-teal/8 relative overflow-hidden" id="depoimentos">
      {/* Grid overlay */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-14">
          <div>
            <p className="sec-tag reveal">Depoimentos</p>
            <h2 className="sec-title reveal reveal-d1">O que dizem nossos <em>pacientes e alunos</em></h2>
          </div>
          <div className="reveal reveal-d1 flex flex-col items-end gap-1">
            <div className="flex gap-1 justify-end">
              {Array.from({ length: 5 }).map((_, i) => (
                <span key={i} className="text-gold text-lg">★</span>
              ))}
            </div>
            <div className="text-[0.82rem] text-steel/55">
              Baseado em <strong className="text-steel">{totalLabel} avaliações</strong> no Google
            </div>
            {usingGoogle && (
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 text-[0.72rem] text-teal hover:text-teal/70 transition-colors"
              >
                Ver todas no Google <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {usingGoogle
            ? googleReviews.map((review, i) => (
                <GoogleReviewCard key={`g-${i}`} review={review} index={i} />
              ))
            : DEPOIMENTOS.map((dep, i) => (
                <StaticCard key={dep.id} dep={dep} index={i} />
              ))
          }
        </div>

        {/* Atribuição Google — exigida pelos Termos de Serviço quando usando a API */}
        {usingGoogle && (
          <div className="mt-10 flex items-center justify-center gap-2 opacity-40">
            <span className="text-[0.7rem] text-steel/50 uppercase tracking-wider">Avaliações de</span>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_92x30dp.png"
              alt="Google"
              className="h-[18px]"
            />
          </div>
        )}
      </div>
    </section>
  )
}
