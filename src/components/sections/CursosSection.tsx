// ── CursosSection ──────────────────────────────────────────────────────────────
// Seção de cursos e palestras da NU.V.E.M Ensino e parceiros.
// Usada na home e na página /ensino.

import Image from 'next/image'
import { ExternalLink, CalendarDays, Monitor, MapPin } from 'lucide-react'
import { CURSOS, type Curso } from '@/lib/cursos'

const MODALIDADE_ICON = {
  Online:      Monitor,
  Presencial:  MapPin,
  Híbrido:     CalendarDays,
}

const TIPO_COLOR: Record<Curso['tipo'], string> = {
  Curso:      'bg-teal/10 text-teal border-teal/20',
  Palestra:   'bg-gold/10 text-[#8a6800] border-gold/30',
  Workshop:   'bg-teal/10 text-teal border-teal/20',
  Congresso:  'bg-steel/10 text-steel/70 border-steel/20',
  Live:       'bg-rose-50 text-rose-600 border-rose-200',
}

function CursoCard({ curso, index }: { curso: Curso; index: number }) {
  const ModalIcon = MODALIDADE_ICON[curso.modalidade]

  return (
    <a
      href={curso.href}
      target="_blank"
      rel="noopener noreferrer"
      className={`group flex flex-col bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm hover:border-teal/28 hover:-translate-y-1 hover:shadow-lg transition-all reveal reveal-d${index % 3}`}
    >
      {/* Imagem */}
      <div className="relative h-52 w-full overflow-hidden bg-gradient-to-br from-[#002a3d] to-[#00465F] shrink-0">
        <Image
          src={curso.imagem}
          alt={curso.titulo}
          fill
          className="object-cover object-top group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#001a27]/70 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`text-[0.6rem] font-bold tracking-[.1em] uppercase px-2.5 py-1 rounded-full border backdrop-blur-sm ${TIPO_COLOR[curso.tipo]}`}>
            {curso.tipo}
          </span>
          {curso.parceiro && (
            <span className="text-[0.6rem] font-semibold px-2.5 py-1 rounded-full bg-white/90 text-steel/70 border border-white/50 backdrop-blur-sm">
              {curso.parceiro}
            </span>
          )}
        </div>

        {/* Modalidade + data */}
        <div className="absolute bottom-3 left-3 flex items-center gap-3">
          <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-white/85">
            <ModalIcon className="w-3 h-3" />
            {curso.modalidade}
          </span>
          {curso.data && (
            <span className="flex items-center gap-1.5 text-[0.7rem] font-medium text-white/85">
              <CalendarDays className="w-3 h-3" />
              {curso.data}
            </span>
          )}
        </div>
      </div>

      {/* Conteúdo */}
      <div className="flex flex-col flex-1 p-6">
        <h3 className="text-[1rem] font-semibold text-steel leading-snug mb-2 group-hover:text-teal transition-colors">
          {curso.titulo}
        </h3>
        {curso.subtitulo && (
          <p className="text-[0.82rem] font-medium text-teal/70 mb-2">{curso.subtitulo}</p>
        )}
        <p className="text-[0.85rem] font-light text-steel/60 leading-[1.72] flex-1">
          {curso.descricao}
        </p>
        <div className="mt-5 flex items-center gap-1.5 text-[0.85rem] font-semibold text-teal group-hover:gap-2.5 transition-all">
          Inscrever-se <ExternalLink className="w-3.5 h-3.5" />
        </div>
      </div>
    </a>
  )
}

interface Props {
  /** Limita o número de cursos exibidos (útil na home) */
  limit?: number
  /** Exibe no modo compacto com fundo escuro (padrão da seção ensino da home) */
  dark?: boolean
}

export function CursosSection({ limit, dark = false }: Props) {
  const cursos = limit ? CURSOS.slice(0, limit) : CURSOS

  if (cursos.length === 0) return null

  return (
    <section
      className={`py-24 border-t border-teal/8 ${dark ? 'bg-[#001f2e]' : 'bg-white'}`}
      id="cursos"
    >
      <div className="max-w-[1240px] mx-auto px-8">

        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:justify-between lg:items-end gap-6 mb-12">
          <div>
            <p className={`sec-tag reveal ${dark ? 'text-teal-light' : ''}`}>Cursos & Palestras</p>
            <h2 className={`sec-title reveal reveal-d1 ${dark ? 'text-white' : ''}`}>
              Formação e <em>atualização</em> científica
            </h2>
            <p className={`text-[0.95rem] font-light leading-[1.85] mt-3 max-w-xl reveal reveal-d2 ${dark ? 'text-white/60' : 'text-steel/60'}`}>
              Cursos, palestras e workshops com a equipe NU.V.E.M e parceiros de referência nacional.
              Conteúdo aplicado à prática clínica real.
            </p>
          </div>
          {!limit && (
            <a
              href="https://cursos.nuvemensino.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className={`shrink-0 reveal reveal-d2 inline-flex items-center gap-2 text-[0.88rem] font-semibold border-b-2 pb-0.5 hover:gap-3 transition-all ${
                dark
                  ? 'text-teal-light border-teal/30 hover:border-teal-light'
                  : 'text-teal border-teal/25 hover:border-teal'
              }`}
            >
              Ver todos os cursos <ExternalLink className="w-3.5 h-3.5" />
            </a>
          )}
        </div>

        {/* Grid */}
        <div className={`grid gap-6 ${
          cursos.length === 1
            ? 'grid-cols-1 max-w-md'
            : cursos.length === 2
              ? 'grid-cols-1 md:grid-cols-2 max-w-2xl'
              : 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3'
        }`}>
          {cursos.map((curso, i) => (
            <CursoCard key={curso.id} curso={curso} index={i} />
          ))}
        </div>

      </div>
    </section>
  )
}
