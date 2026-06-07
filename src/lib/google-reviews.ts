/**
 * google-reviews.ts
 * Busca avaliações reais do Google Places API (server-side only).
 *
 * Variáveis de ambiente necessárias (.env.local / Vercel):
 *   GOOGLE_PLACES_API_KEY  — chave da API do Google Cloud (Places API habilitada)
 *   GOOGLE_PLACE_ID        — Place ID da clínica no Google Maps
 *
 * Cache: revalidado a cada 6 horas (Next.js fetch cache).
 */

export interface GoogleReview {
  authorName:   string
  authorPhoto?: string
  rating:       number
  text:         string
  relativeTime: string
  url?:         string
}

export interface GooglePlaceData {
  overallRating:  number
  totalRatings:   number
  reviews:        GoogleReview[]
  mapsUrl?:       string
}

// Resposta raw da Places API (Legacy Details endpoint)
interface PlacesApiResponse {
  status: string
  error_message?: string
  result?: {
    rating:              number
    user_ratings_total:  number
    url?:                string
    reviews?: {
      author_name:                  string
      profile_photo_url?:           string
      rating:                       number
      text:                         string
      relative_time_description:    string
    }[]
  }
}

export async function fetchGoogleReviews(): Promise<GooglePlaceData | null> {
  const apiKey  = process.env.GOOGLE_PLACES_API_KEY
  const placeId = process.env.GOOGLE_PLACE_ID

  if (!apiKey || !placeId) {
    // Não configurado → usa fallback estático no componente
    return null
  }

  const fields = 'rating,user_ratings_total,url,reviews'
  const endpoint = `https://maps.googleapis.com/maps/api/place/details/json`
  const url = `${endpoint}?place_id=${placeId}&fields=${fields}&language=pt-BR&reviews_sort=most_relevant&key=${apiKey}`

  try {
    const res = await fetch(url, {
      next: { revalidate: 21600 }, // cache 6 horas
    })

    if (!res.ok) {
      console.error('[google-reviews] HTTP error:', res.status)
      return null
    }

    const data: PlacesApiResponse = await res.json()

    if (data.status !== 'OK' || !data.result) {
      console.error('[google-reviews] API error:', data.status, data.error_message)
      return null
    }

    const { rating, user_ratings_total, url: mapsUrl, reviews = [] } = data.result

    const filtered = reviews
      .filter(r => r.text && r.text.trim().length > 0)
      .map(r => ({
        authorName:   r.author_name,
        authorPhoto:  r.profile_photo_url,
        rating:       r.rating,
        text:         r.text.trim(),
        relativeTime: r.relative_time_description,
      }))

    return {
      overallRating: rating,
      totalRatings:  user_ratings_total,
      reviews:       filtered,
      mapsUrl,
    }
  } catch (err) {
    console.error('[google-reviews] fetch failed:', err)
    return null
  }
}

/** Formata o total de avaliações ex: 2034 → "+2.000" */
export function formatRatingCount(n: number): string {
  if (n >= 1000) {
    const k = Math.floor(n / 1000)
    return `+${k}.000`
  }
  return `+${n}`
}
