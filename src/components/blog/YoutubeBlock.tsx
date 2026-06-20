interface Props {
  value: {
    videoId:  string
    title?:   string
    caption?: string
  }
}

export function YoutubeBlock({ value }: Props) {
  if (!value?.videoId) return null

  return (
    <figure className="not-prose my-8">
      <div className="relative w-full rounded-xl overflow-hidden shadow-lg" style={{ aspectRatio: '16/9' }}>
        <iframe
          src={`https://www.youtube.com/embed/${value.videoId}`}
          title={value.title ?? 'Vídeo'}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 w-full h-full"
          loading="lazy"
        />
      </div>
      {value.caption && (
        <figcaption className="text-center text-[0.78rem] text-steel/50 mt-2">
          {value.caption}
        </figcaption>
      )}
    </figure>
  )
}
