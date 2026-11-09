'use client'

import { useState } from 'react'
import { MapPin, ExternalLink } from 'lucide-react'
import { CONTATO } from '@/lib/data'

/**
 * Mapa da clínica com carregamento por clique.
 *
 * O Google Maps incorporado grava cookies do Google, que não fazem parte das
 * categorias do banner de consentimento (só analytics e anúncios). Por isso o
 * mapa só é carregado quando a pessoa pede; antes disso aparece um quadro com
 * o endereço e o link para abrir no Google Maps (clique_mapa no GTM).
 */
const ENDERECO_MAPA = 'Rua Ceará, 600, Santa Efigênia, Belo Horizonte - MG, 30150-310'
const URL_EMBED = `https://www.google.com/maps?q=${encodeURIComponent(ENDERECO_MAPA)}&z=16&output=embed`

export function MapaClinica() {
  const [carregado, setCarregado] = useState(false)

  return (
    <div className="relative w-full h-full min-h-[320px] rounded-2xl overflow-hidden border border-gold/40 bg-mist">
      {carregado ? (
        <iframe
          src={URL_EMBED}
          title="Mapa: NU.V.E.M Medicina, Rua Ceará, 600, Belo Horizonte"
          className="absolute inset-0 w-full h-full border-0"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : (
        // Em fluxo normal (não absoluto): o quadro cresce com o conteúdo e nada é cortado no celular.
        <div className="relative h-full min-h-[320px] flex flex-col items-center justify-center text-center px-5 py-8 hero-grid-bg">
          <span className="shrink-0 w-12 h-12 rounded-full bg-white border border-gold/50 flex items-center justify-center mb-4">
            <MapPin className="w-5 h-5 text-teal" aria-hidden />
          </span>
          <p className="font-serif text-[1.4rem] text-teal leading-tight">{CONTATO.endereco}</p>
          <p className="text-[0.85rem] text-steel/70 mt-1">{CONTATO.bairro} · {CONTATO.cep}</p>
          <div className="mt-5 flex flex-col sm:flex-row gap-2">
            <button
              type="button"
              onClick={() => setCarregado(true)}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-teal text-white text-[0.88rem] font-semibold px-5 py-3 hover:bg-teal-mid transition-colors"
            >
              Mostrar mapa
            </button>
            <a
              href={CONTATO.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-teal/30 text-teal text-[0.88rem] font-semibold px-5 py-3 hover:bg-white transition-colors"
            >
              Abrir no Google Maps <ExternalLink className="w-3.5 h-3.5" aria-hidden />
            </a>
          </div>
          <p className="mt-4 text-[0.72rem] text-steel/55 max-w-xs">
            O mapa é do Google Maps e só carrega quando você clica.
          </p>
        </div>
      )}
    </div>
  )
}
