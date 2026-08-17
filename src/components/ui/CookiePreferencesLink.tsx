'use client'

import { EVENTO_REABRIR_PREFERENCIAS } from '@/lib/consent'

/**
 * Reabre o ConsentBanner a qualquer momento — LGPD exige que retirar o
 * consentimento seja tão fácil quanto dá-lo, então precisa de um jeito
 * permanente de voltar à escolha, não só o banner na primeira visita.
 *
 * Componente próprio (em vez de handler direto no Footer) para o Footer
 * continuar sendo Server Component — só este botão precisa de 'use client'.
 */
export function CookiePreferencesLink() {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(EVENTO_REABRIR_PREFERENCIAS))}
      className="text-[0.72rem] text-white/35 hover:text-teal-light transition-colors"
    >
      Preferências de Cookies
    </button>
  )
}
