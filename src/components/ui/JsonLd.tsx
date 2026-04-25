interface Props {
  data: Record<string, unknown> | Record<string, unknown>[]
}

/**
 * Renders a JSON-LD <script> tag for structured data.
 * Use in page.tsx files as a Server Component.
 * Multiple schemas can be passed as an array.
 */
export function JsonLd({ data }: Props) {
  return (
    <script
      type="application/ld+json"
      // biome-ignore lint/security/noDangerouslySetInnerHtml
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  )
}
