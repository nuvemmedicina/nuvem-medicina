'use client'

import Link from 'next/link'
import { Calendar, ArrowRight } from 'lucide-react'
import { CONTATO, EXAMES, ESPECIALIDADES } from '@/lib/data'
import { CtaBanner } from '@/components/ui/CtaBanner'
import { pushEvent } from '@/lib/gtm'

interface Props {
  exameRelacionado?:         string
  especialidadeRelacionada?: string
  artigoTitle:               string
  fallbackTitle?:            string
  fallbackDesc?:             string
}

/**
 * Se o valor gravado no artigo não corresponder a nenhum exame/especialidade
 * atual (ex.: id removido de lib/data.ts depois da publicação), cai no
 * CtaBanner genérico em vez de gerar um link quebrado.
 */
export function ChamadaExame({ exameRelacionado, especialidadeRelacionada, artigoTitle, fallbackTitle, fallbackDesc }: Props) {
  const exame = exameRelacionado ? EXAMES.find(e => e.id === exameRelacionado) : undefined
  const especialidade = !exame && especialidadeRelacionada
    ? ESPECIALIDADES.find(e => e.slug === especialidadeRelacionada)
    : undefined

  const alvo = exame
    ? { nome: exame.title, linha: exame.subtitle, href: `/exames/${exame.id}` }
    : especialidade
      ? { nome: especialidade.title, linha: especialidade.desc, href: `/especialidades/${especialidade.slug}` }
      : null

  if (!alvo) return <CtaBanner title={fallbackTitle} desc={fallbackDesc} />

  const waMsg = encodeURIComponent(`Olá! Li o artigo "${artigoTitle}" e gostaria de agendar: ${alvo.nome}.`)
  const tipoDestino = exame ? 'exame' : 'especialidade'

  return (
    <div className="relative rounded-2xl overflow-hidden p-10 md:p-14 my-16" style={{ background: '#00465F' }}>
      <div className="absolute inset-0 dark-grid-bg pointer-events-none" />
      <div className="absolute top-0 left-0 right-0 h-[3px] gold-line" />

      <div className="relative z-10 flex flex-col md:flex-row md:items-center md:justify-between gap-8">
        <div className="max-w-xl">
          <p className="text-[0.68rem] font-bold uppercase tracking-[.12em] text-teal-light mb-2">Exame relacionado</p>
          <h2 className="font-serif font-light text-white text-[1.9rem] leading-snug mb-3">{alvo.nome}</h2>
          <p className="text-[0.95rem] font-light text-white/65 leading-relaxed">{alvo.linha}</p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 shrink-0">
          <Link
            href={alvo.href}
            className="btn-gold"
            onClick={() => pushEvent({ event: 'clique_cta_artigo', artigo: artigoTitle, destino: alvo.href, tipo_destino: tipoDestino })}
          >
            Ver o exame <ArrowRight className="w-4 h-4" />
          </Link>
          <a
            href={`${CONTATO.whatsappUrl}?text=${waMsg}`}
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost-dark"
            onClick={() => pushEvent({ event: 'clique_cta_artigo', artigo: artigoTitle, destino: CONTATO.whatsappUrl, tipo_destino: 'whatsapp' })}
          >
            <Calendar className="w-4 h-4" />
            Agendar via WhatsApp
          </a>
        </div>
      </div>
    </div>
  )
}
