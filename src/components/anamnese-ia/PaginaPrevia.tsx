import { Instagram } from 'lucide-react'
import { iniciais, type ConteudoPagina } from '@/lib/anamnese-ia/pagina'
import { linkInstagram } from '@/lib/anamnese-ia/formatos'

/**
 * Prévia da página do profissional (aprovação e painel). Mostra a foto 4:5
 * aplicada ou, sem foto, as iniciais.
 */
export function PaginaPrevia({ conteudo, foto }: { conteudo: ConteudoPagina; foto: string | null }) {
  const areas = conteudo.areas.split(/\s*[·;\n]\s*|\s*,\s*/).filter(Boolean)
  return (
    <article className="overflow-hidden rounded-2xl border border-teal/10 bg-white shadow-sm">
      <div className="grid gap-6 bg-gradient-to-br from-mist/50 to-white p-5 sm:grid-cols-[200px_1fr] sm:p-8">
        <div className="mx-auto w-44 sm:mx-0 sm:w-full">
          {foto ? (
            <div className="aspect-[4/5] overflow-hidden rounded-2xl border border-teal/10 bg-mist/40 shadow">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={foto} alt={`Foto de ${conteudo.nome}`} className="h-full w-full object-cover" />
            </div>
          ) : (
            <div className="flex aspect-[4/5] items-center justify-center rounded-2xl bg-teal text-[2.6rem] font-light tracking-wider text-white" aria-label="Página sem foto">
              {iniciais(conteudo.nome) || '?'}
            </div>
          )}
        </div>
        <div className="min-w-0">
          <h2 className="font-serif text-[1.9rem] font-medium leading-tight text-teal">{conteudo.nome || 'Nome'}</h2>
          {conteudo.registro && <p className="mt-1 text-[0.84rem] text-steel/60">{conteudo.registro}</p>}
          {conteudo.especialidade && <p className="mt-3 text-[1rem] font-medium text-gold-dark">{conteudo.especialidade}</p>}
          {areas.length > 0 && (
            <ul className="mt-3 flex flex-wrap gap-1.5">
              {areas.map(a => <li key={a} className="rounded-full bg-teal/10 px-2.5 py-1 text-[0.76rem] text-teal">{a}</li>)}
            </ul>
          )}
          {conteudo.bio && <p className="mt-4 whitespace-pre-line text-[0.92rem] leading-relaxed text-steel/80">{conteudo.bio}</p>}
          {conteudo.instagram && (
            <a href={linkInstagram(conteudo.instagram)} target="_blank" rel="noopener noreferrer" className="mt-4 inline-flex items-center gap-1.5 text-[0.86rem] font-medium text-teal hover:underline">
              <Instagram className="h-4 w-4" /> {conteudo.instagram}
            </a>
          )}
        </div>
      </div>
    </article>
  )
}
