'use client'

import { useState } from 'react'
import { Send }     from 'lucide-react'
import { CONTATO, ESPECIALIDADES, EXAMES } from '@/lib/data'
import { formatWhatsAppMessage } from '@/lib/utils'

const SERVICOS = [
  { group: 'Consultas', options: ESPECIALIDADES.map(e => e.title) },
  { group: 'Exames',    options: EXAMES.map(e => e.title) },
  { group: 'Ensino',    options: ['Aperfeiçoamento Teórico', 'Treinamento Hands-On', 'Informações sobre Programas'] },
]

export function AgendarForm() {
  const [form, setForm]     = useState({ nome: '', telefone: '', email: '', servico: '', mensagem: '' })
  const [sent, setSent]     = useState(false)
  const [errors, setErrors] = useState<Record<string, boolean>>({})

  const update = (k: string, v: string) => {
    setForm(f => ({ ...f, [k]: v }))
    setErrors(e => ({ ...e, [k]: false }))
  }

  const submit = (ev: React.FormEvent) => {
    ev.preventDefault()
    const errs: Record<string, boolean> = {}
    if (!form.nome.trim())     errs.nome     = true
    if (!form.telefone.trim()) errs.telefone = true
    if (!form.servico)         errs.servico  = true
    if (Object.keys(errs).length) { setErrors(errs); return }

    const msg = formatWhatsAppMessage(form.nome, form.telefone, form.servico, form.mensagem)
    setSent(true)
    setTimeout(() => {
      window.open(`${CONTATO.whatsappUrl}?text=${msg}`, '_blank')
    }, 800)
  }

  const inputCls = (key: string) =>
    `w-full bg-white border rounded-lg px-4 py-3 text-[0.93rem] text-steel placeholder-faint outline-none transition-all ${
      errors[key]
        ? 'border-red-500/60 focus:border-red-400'
        : 'border-teal/15 focus:border-teal/40 focus:bg-cloud'
    }`

  if (sent) return (
    <div className="text-center py-10">
      <div className="w-14 h-14 rounded-full bg-gold-dim border border-gold/35 flex items-center justify-center text-gold mx-auto mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3 className="text-steel font-semibold mb-2">Solicitação enviada!</h3>
      <p className="text-[0.9rem] text-muted">Abrindo WhatsApp para confirmar o agendamento…</p>
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div>
        <label className="block text-[0.72rem] font-semibold uppercase tracking-[.04em] text-faint mb-1.5">
          Nome Completo *
        </label>
        <input type="text" placeholder="Seu nome completo" value={form.nome}
          onChange={e => update('nome', e.target.value)} className={inputCls('nome')} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[0.72rem] font-semibold uppercase tracking-[.04em] text-faint mb-1.5">
            Telefone *
          </label>
          <input type="tel" placeholder="(31) 00000-0000" value={form.telefone}
            onChange={e => update('telefone', e.target.value)} className={inputCls('telefone')} />
        </div>
        <div>
          <label className="block text-[0.72rem] font-semibold uppercase tracking-[.04em] text-faint mb-1.5">
            E-mail
          </label>
          <input type="email" placeholder="seu@email.com" value={form.email}
            onChange={e => update('email', e.target.value)} className={inputCls('email')} />
        </div>
      </div>

      <div>
        <label className="block text-[0.72rem] font-semibold uppercase tracking-[.04em] text-faint mb-1.5">
          Serviço de Interesse *
        </label>
        <select value={form.servico} onChange={e => update('servico', e.target.value)}
          className={`${inputCls('servico')} appearance-none`}
        >
          <option value="">Selecione...</option>
          {SERVICOS.map(grp => (
            <optgroup key={grp.group} label={grp.group}>
              {grp.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[0.72rem] font-semibold uppercase tracking-[.04em] text-faint mb-1.5">
          Mensagem (opcional)
        </label>
        <textarea rows={3} placeholder="Descreva brevemente sua necessidade…" value={form.mensagem}
          onChange={e => update('mensagem', e.target.value)}
          className={`${inputCls('mensagem')} resize-none`}
        />
      </div>

      <div className="flex items-start gap-2 p-3 bg-teal/5 border border-teal/10 rounded-lg text-[0.72rem] text-faint">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-teal-mid shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        Seus dados são protegidos conforme a LGPD e usados exclusivamente para contato de agendamento.
      </div>

      <button type="submit" className="btn-gold w-full justify-center py-3.5 text-[0.87rem]">
        <Send className="w-4 h-4" />
        Enviar Solicitação
      </button>
    </form>
  )
}
