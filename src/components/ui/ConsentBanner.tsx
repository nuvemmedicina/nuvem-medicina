'use client'

import { useEffect, useState } from 'react'
import { Cookie } from 'lucide-react'
import {
  lerConsentSalvo,
  salvarConsent,
  EVENTO_REABRIR_PREFERENCIAS,
  type ConsentCategorias,
} from '@/lib/consent'

function Interruptor({ ativo, onChange, disabled }: { ativo: boolean; onChange?: (v: boolean) => void; disabled?: boolean }) {
  if (disabled) {
    return (
      <div className="w-10 h-6 rounded-full bg-teal/30 relative shrink-0" aria-hidden="true">
        <div className="absolute right-0.5 top-0.5 w-5 h-5 rounded-full bg-teal" />
      </div>
    )
  }
  return (
    <button
      type="button"
      role="switch"
      aria-checked={ativo}
      onClick={() => onChange?.(!ativo)}
      className={`w-10 h-6 rounded-full relative shrink-0 transition-colors ${ativo ? 'bg-teal' : 'bg-steel/15'}`}
    >
      <div
        className={`absolute top-0.5 w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${ativo ? 'translate-x-[18px]' : 'translate-x-0.5'}`}
      />
    </button>
  )
}

export function ConsentBanner() {
  const [visivel, setVisivel]           = useState(false)
  const [personalizar, setPersonalizar] = useState(false)
  const [escolha, setEscolha]           = useState<ConsentCategorias>({ analytics: true, ads: true })

  useEffect(() => {
    const salvo = lerConsentSalvo()
    if (!salvo) {
      setVisivel(true)
    } else {
      setEscolha(salvo)
    }

    // Reabre pelo link "Preferências de Cookies" no rodapé.
    const reabrir = () => {
      setEscolha(lerConsentSalvo() ?? { analytics: true, ads: true })
      setPersonalizar(true)
      setVisivel(true)
    }
    window.addEventListener(EVENTO_REABRIR_PREFERENCIAS, reabrir)
    return () => window.removeEventListener(EVENTO_REABRIR_PREFERENCIAS, reabrir)
  }, [])

  if (!visivel) return null

  const confirmar = (final: ConsentCategorias) => {
    salvarConsent(final)
    setVisivel(false)
    setPersonalizar(false)
  }

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Preferências de cookies"
      className="fixed inset-x-0 bottom-0 z-[400] p-4 sm:p-5"
    >
      <div className="max-w-3xl mx-auto bg-white border border-teal/15 rounded-2xl shadow-xl p-5 sm:p-6">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-lg bg-teal/8 flex items-center justify-center text-teal shrink-0">
            <Cookie className="w-[18px] h-[18px]" />
          </div>
          <p className="text-[0.88rem] text-steel/70 leading-relaxed">
            Usamos cookies para analisar o uso do site e medir nossas campanhas, conforme nossa{' '}
            <a href="/politica-de-privacidade" className="text-teal font-medium hover:underline">
              Política de Privacidade
            </a>
            . Nenhum dado de saúde é coletado por esses cookies.
          </p>
        </div>

        {personalizar && (
          <div className="mt-4 space-y-3.5 border-t border-teal/10 pt-4">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.85rem] font-semibold text-steel">Cookies essenciais</p>
                <p className="text-[0.78rem] text-steel/55">Necessários para o site funcionar. Sempre ativos.</p>
              </div>
              <Interruptor ativo disabled />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.85rem] font-semibold text-steel">Cookies analíticos</p>
                <p className="text-[0.78rem] text-steel/55">Como o site é usado, de forma agregada (Google Analytics).</p>
              </div>
              <Interruptor
                ativo={escolha.analytics}
                onChange={v => setEscolha(e => ({ ...e, analytics: v }))}
              />
            </div>

            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-[0.85rem] font-semibold text-steel">Cookies de publicidade</p>
                <p className="text-[0.78rem] text-steel/55">Medem o resultado de campanhas (Google Ads). Nunca vinculados a dados de saúde.</p>
              </div>
              <Interruptor
                ativo={escolha.ads}
                onChange={v => setEscolha(e => ({ ...e, ads: v }))}
              />
            </div>
          </div>
        )}

        <div className="flex flex-wrap gap-3 mt-5">
          {personalizar ? (
            <button onClick={() => confirmar(escolha)} className="btn-gold text-[0.85rem] py-2.5 px-5">
              Salvar preferências
            </button>
          ) : (
            <>
              <button onClick={() => confirmar({ analytics: true, ads: true })} className="btn-gold text-[0.85rem] py-2.5 px-5">
                Aceitar todos
              </button>
              <button onClick={() => confirmar({ analytics: false, ads: false })} className="btn-ghost text-[0.85rem] py-2.5 px-5">
                Recusar
              </button>
              <button
                onClick={() => setPersonalizar(true)}
                className="text-[0.85rem] font-medium text-teal hover:text-teal/70 transition-colors px-2"
              >
                Personalizar
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
