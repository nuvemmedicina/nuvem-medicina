'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'

type Step = 'nps' | 'motivo' | 'email' | 'done'

// NPS color mapping
function getNpsColor(score: number) {
  if (score <= 6)  return { ring: 'border-red-400',    bg: 'bg-red-50',          text: 'text-red-600' }
  if (score <= 8)  return { ring: 'border-yellow-400', bg: 'bg-yellow-50',       text: 'text-yellow-600' }
  return                  { ring: 'border-emerald-400',bg: 'bg-emerald-50',      text: 'text-emerald-600' }
}

export function AvaliacaoForm() {
  const t = useTranslations('avaliacaoForm')

  function getNpsLabel(score: number | null) {
    if (score === null) return ''
    if (score <= 6)  return t('npsLabelBaixo')
    if (score <= 8)  return t('npsLabelMedio')
    if (score === 9) return t('npsLabel9')
    return t('npsLabelTop')
  }

  const [step,      setStep]    = useState<Step>('nps')
  const [score,     setScore]   = useState<number | null>(null)
  const [motivo,    setMotivo]  = useState('')
  const [email,     setEmail]   = useState('')
  const [loading,   setLoading] = useState(false)
  const [error,     setError]   = useState('')

  const handleScore = (s: number) => {
    setScore(s)
    setTimeout(() => setStep('motivo'), 300)
  }

  const handleSubmit = async () => {
    setLoading(true)
    setError('')

    try {
      await fetch('/api/avaliacao', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body:    JSON.stringify({ score, motivo, email, ts: new Date().toISOString() }),
      }).catch(() => {})

      setStep('done')
    } catch {
      setError(t('erroEnvio'))
    }
    setLoading(false)
  }

  // ── NPS Step ────────────────────────────────────────────────────────────────
  if (step === 'nps') return (
    <div className="space-y-6">
      <div>
        <p className="text-[0.82rem] font-semibold text-steel mb-1">
          {t('npsPergunta')}
        </p>
        <div className="flex justify-between text-[0.65rem] text-steel/45 mt-1 mb-4">
          <span>{t('npsBaixo')}</span>
          <span>{t('npsAlto')}</span>
        </div>

        {/* Score buttons */}
        <div className="grid grid-cols-11 gap-1">
          {Array.from({ length: 11 }, (_, i) => i).map(s => {
            const colors = getNpsColor(s)
            const selected = score === s
            return (
              <button
                key={s}
                onClick={() => handleScore(s)}
                className={cn(
                  'aspect-square flex items-center justify-center text-[0.8rem] font-semibold rounded-lg border-2 transition-all duration-150 hover:scale-110',
                  selected
                    ? `${colors.ring} ${colors.bg} ${colors.text} scale-110`
                    : 'border-teal/15 text-steel/55 hover:border-teal/40 hover:text-teal',
                )}
              >
                {s}
              </button>
            )
          })}
        </div>

        {score !== null && (
          <p className={cn('text-center text-[0.82rem] font-semibold mt-3 transition-all', getNpsColor(score).text)}>
            {getNpsLabel(score)}
          </p>
        )}
      </div>
    </div>
  )

  // ── Motivo Step ─────────────────────────────────────────────────────────────
  if (step === 'motivo') {
    const colors = score !== null ? getNpsColor(score) : { ring: 'border-teal/40', bg: '', text: 'text-steel' }
    return (
      <div className="space-y-5">
        {/* Score summary */}
        <div className={cn('flex items-center gap-3 p-3 rounded-xl border', colors.ring, colors.bg)}>
          <span className={cn('text-2xl font-medium font-serif', colors.text)}>{score}</span>
          <div>
            <p className={cn('text-[0.78rem] font-semibold', colors.text)}>{getNpsLabel(score)}</p>
            <button onClick={() => setStep('nps')} className="text-[0.68rem] text-steel/45 hover:text-steel/70 transition-colors underline">
              {t('alterarNota')}
            </button>
          </div>
        </div>

        <div>
          <label className="block text-[0.78rem] font-semibold text-steel mb-2">
            {t('motivoLabel')}{' '}
            <span className="text-steel/45 font-normal">{t('opcional')}</span>
          </label>
          <textarea
            value={motivo}
            onChange={e => setMotivo(e.target.value)}
            rows={3}
            maxLength={500}
            placeholder={
              score !== null && score <= 6
                ? t('motivoPlaceholderBaixo')
                : score !== null && score >= 9
                ? t('motivoPlaceholderAlto')
                : t('motivoPlaceholderMedio')
            }
            className="w-full bg-cloud border border-teal/15 rounded-xl px-4 py-3 text-[0.82rem] text-steel placeholder:text-steel/40 outline-none focus:border-teal/40 transition-colors resize-none"
          />
          <p className="text-right text-[0.65rem] text-steel/40 mt-1">{motivo.length}/500</p>
        </div>

        <div className="flex gap-3">
          <button
            onClick={() => setStep('email')}
            className="flex-1 text-white text-[0.82rem] font-semibold py-3 rounded-xl hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(135deg, #00465F, #0e7fa5)', boxShadow: '0 8px 24px rgba(0,70,95,.25)' }}
          >
            {t('continuar')}
          </button>
          <button
            onClick={handleSubmit}
            disabled={loading}
            className="text-[0.78rem] text-steel/55 hover:text-steel border border-teal/15 hover:border-teal/30 rounded-xl px-4 transition-colors"
          >
            {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : t('pular')}
          </button>
        </div>
      </div>
    )
  }

  // ── Email Step ───────────────────────────────────────────────────────────────
  if (step === 'email') return (
    <div className="space-y-5">
      <div>
        <label className="block text-[0.78rem] font-semibold text-steel mb-2">
          {t('emailLabel')} <span className="text-steel/45 font-normal">{t('emailSub')}</span>
        </label>
        <input
          type="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
          placeholder={t('emailPlaceholder')}
          className="w-full bg-cloud border border-teal/15 rounded-xl px-4 py-3 text-[0.82rem] text-steel placeholder:text-steel/40 outline-none focus:border-teal/40 transition-colors"
        />
      </div>

      {error && (
        <p className="text-[0.78rem] text-red-600 bg-red-50 border border-red-200 rounded-lg px-3 py-2">
          {error}
        </p>
      )}

      <div className="flex gap-3">
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="flex-1 flex items-center justify-center gap-2 text-white text-[0.82rem] font-semibold py-3 rounded-xl hover:-translate-y-0.5 transition-all disabled:opacity-60"
          style={{ background: 'linear-gradient(135deg, #00465F, #0e7fa5)', boxShadow: '0 8px 24px rgba(0,70,95,.25)' }}
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
          {loading ? t('enviando') : t('enviarAvaliacao')}
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="text-[0.78rem] text-steel/55 hover:text-steel border border-teal/15 hover:border-teal/30 rounded-xl px-4 transition-colors"
        >
          {t('pular')}
        </button>
      </div>

      <p className="text-center text-[0.65rem] text-steel/40">
        {t('lgpdEmail')}
      </p>
    </div>
  )

  // ── Done ─────────────────────────────────────────────────────────────────────
  return (
    <div className="text-center py-4 space-y-5">
      {/* Animated checkmark */}
      <div className="w-16 h-16 rounded-full bg-teal/8 border border-teal/20 flex items-center justify-center mx-auto">
        <svg viewBox="0 0 24 24" fill="none" stroke="#00465F" strokeWidth="2.5" className="w-8 h-8 animate-[fadeUp_.5s_ease-out_both]">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>

      <div>
        <h2 className="font-serif font-light text-steel text-[1.5rem] mb-2">
          {t('obrigado')}
        </h2>
        <p className="text-[0.85rem] text-steel/65 leading-relaxed">
          {t('registradoComSucesso')}<br />
          {score !== null && score >= 9
            ? t('felizesTop')
            : t('felizesMedio')}
        </p>
      </div>

      {/* NPS score summary */}
      {score !== null && (
        <div className={cn('inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[0.78rem] font-semibold mx-auto', getNpsColor(score).ring, getNpsColor(score).bg, getNpsColor(score).text)}>
          {t('notaLabel', { score })} {getNpsLabel(score)}
        </div>
      )}

      {/* Share if promoter */}
      {score !== null && score >= 9 && (
        <div className="pt-2 space-y-3">
          <p className="text-[0.78rem] text-steel/65">
            {t('pedirGoogle')}
          </p>
          <a
            href="https://share.google/b7FR17p6wrkEOZ5JR"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-white text-[0.8rem] font-semibold px-5 py-2.5 rounded-xl hover:-translate-y-0.5 transition-all"
            style={{ background: 'linear-gradient(135deg, #00465F, #0e7fa5)', boxShadow: '0 8px 24px rgba(0,70,95,.25)' }}
          >
            {t('avaliarGoogle')}
          </a>
        </div>
      )}

      <a
        href="/"
        className="inline-flex items-center gap-1.5 text-[0.78rem] text-steel/55 hover:text-teal transition-colors"
      >
        {t('voltarSite')}
      </a>
    </div>
  )
}
