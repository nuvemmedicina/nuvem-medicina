interface Props {
  value: {
    url:      string
    title?:   string
    formato?: 'auto' | 'horizontal' | 'vertical'
  }
}

/** Extrai o ID do vídeo a partir de qualquer formato de link do YouTube. */
function extrairVideoId(url: string): { id: string | null; isShort: boolean } {
  try {
    const u = new URL(url.trim())
    const host = u.hostname.replace(/^www\./, '')

    if (host === 'youtu.be') {
      return { id: u.pathname.split('/')[1] || null, isShort: false }
    }

    if (host.endsWith('youtube.com') || host.endsWith('youtube-nocookie.com')) {
      const partes = u.pathname.split('/').filter(Boolean)

      if (partes[0] === 'shorts')  return { id: partes[1] ?? null, isShort: true }
      if (partes[0] === 'embed')   return { id: partes[1] ?? null, isShort: false }
      if (partes[0] === 'live')    return { id: partes[1] ?? null, isShort: false }
      if (u.pathname === '/watch') return { id: u.searchParams.get('v'), isShort: false }
    }
  } catch {
    return { id: null, isShort: false }
  }
  return { id: null, isShort: false }
}

export function YouTubeBlock({ value }: Props) {
  const { url, title, formato = 'auto' } = value
  const { id, isShort } = extrairVideoId(url ?? '')

  if (!id) return null

  const vertical =
    formato === 'vertical'   ? true
    : formato === 'horizontal' ? false
    : isShort

  return (
    <figure className="not-prose my-8">
      <div
        className={`relative w-full overflow-hidden rounded-xl bg-black shadow-sm ${vertical ? 'max-w-[340px] mx-auto' : ''}`}
        style={{ aspectRatio: vertical ? '9 / 16' : '16 / 9' }}
      >
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}?rel=0`}
          title={title ?? 'Vídeo do YouTube'}
          className="absolute inset-0 w-full h-full"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
          allowFullScreen
          loading="lazy"
        />
      </div>
      {title && (
        <figcaption className="text-center text-[0.78rem] text-steel/50 mt-2">
          ▶️ {title}
        </figcaption>
      )}
    </figure>
  )
}
