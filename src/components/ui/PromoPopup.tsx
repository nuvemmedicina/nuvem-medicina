'use client'

import { useEffect, useState } from 'react'
import { X } from 'lucide-react'

const STORAGE_KEY = 'promo-popup-dici-2026'
const DELAY_MS    = 4000

export function PromoPopup() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    if (sessionStorage.getItem(STORAGE_KEY)) return
    const t = setTimeout(() => setVisible(true), DELAY_MS)
    return () => clearTimeout(t)
  }, [])

  function close() {
    sessionStorage.setItem(STORAGE_KEY, '1')
    setVisible(false)
  }

  if (!visible) return null

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,20,35,0.65)', backdropFilter: 'blur(4px)' }}
      onClick={close}
    >
      <div
        className="relative w-full max-w-sm rounded-2xl overflow-hidden shadow-2xl"
        onClick={e => e.stopPropagation()}
      >
        {/* Topo com gradiente escuro */}
        <div className="relative" style={{ background: 'linear-gradient(135deg, #002535, #00465F)', paddingBottom: '56%' }}>
          {/* Badge data */}
          <div className="absolute top-4 left-4 bg-[#E8392A] text-white rounded-xl px-4 py-2 text-center z-10 shadow-lg">
            <p className="text-[0.6rem] font-semibold uppercase tracking-widest leading-none mb-0.5">Aula Gratuita</p>
            <p className="text-[1rem] font-bold leading-tight">22 de Julho</p>
            <p className="text-[0.85rem] font-semibold leading-none">19:30H</p>
          </div>

          {/* Decoração de neurônios (SVG abstrato) */}
          <svg className="absolute inset-0 w-full h-full opacity-30" viewBox="0 0 400 230" preserveAspectRatio="xMidYMid slice" xmlns="http://www.w3.org/2000/svg">
            <circle cx="200" cy="115" r="8" fill="#00D4C8" />
            <circle cx="320" cy="60"  r="5" fill="#00D4C8" />
            <circle cx="80"  cy="80"  r="5" fill="#00D4C8" />
            <circle cx="350" cy="160" r="4" fill="#00D4C8" />
            <circle cx="50"  cy="170" r="4" fill="#00D4C8" />
            <line x1="200" y1="115" x2="320" y2="60"  stroke="#00D4C8" strokeWidth="1.5" />
            <line x1="200" y1="115" x2="80"  y2="80"  stroke="#00D4C8" strokeWidth="1.5" />
            <line x1="200" y1="115" x2="350" y2="160" stroke="#00D4C8" strokeWidth="1.5" />
            <line x1="200" y1="115" x2="50"  y2="170" stroke="#00D4C8" strokeWidth="1.5" />
            <line x1="320" y1="60"  x2="350" y2="160" stroke="#00D4C8" strokeWidth="1" strokeDasharray="4 4" />
            <line x1="80"  y1="80"  x2="50"  y2="170" stroke="#00D4C8" strokeWidth="1" strokeDasharray="4 4" />
          </svg>

          {/* Foto da Dra. Vera */}
          <img
            src="/images/dra-vera.jpg"
            alt="Dra. Vera Ângelo"
            className="absolute bottom-0 left-1/2 -translate-x-1/2 h-[90%] object-cover object-top"
          />
        </div>

        {/* Faixa vermelha */}
        <div className="bg-[#E8392A] text-white text-center py-2.5 px-4">
          <p className="text-[0.65rem] font-bold uppercase tracking-[.12em]">Aula Gratuita com a Dra. Vera Ângelo</p>
        </div>

        {/* Parte branca */}
        <div className="bg-white text-center px-6 py-5">
          <p className="font-black text-[1.8rem] leading-none tracking-tight text-[#002535] uppercase mb-1">Roma V</p>
          <p className="font-bold text-[0.85rem] uppercase tracking-wide text-[#002535] mb-4">O Novo Marco da Gastroenterologia</p>
          <p className="text-[0.72rem] text-gray-400 mb-2">Faça sua inscrição gratuita:</p>
          <a
            href="https://www.nuvemensino.com.br/live"
            target="_blank"
            rel="noopener noreferrer"
            onClick={close}
            className="inline-block w-full bg-[#002535] hover:bg-[#00465F] transition-colors text-white font-semibold text-[0.85rem] py-3 rounded-xl"
          >
            Inscrever-se gratuitamente →
          </a>
          <button onClick={close} className="mt-3 text-[0.72rem] text-gray-400 hover:text-gray-600 transition-colors">
            Agora não
          </button>
        </div>

        {/* Botão fechar */}
        <button
          onClick={close}
          className="absolute top-3 right-3 bg-black/30 hover:bg-black/50 text-white rounded-full p-1 transition-colors z-20"
          aria-label="Fechar"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  )
}
