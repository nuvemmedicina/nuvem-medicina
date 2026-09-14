'use client'

import { useState }  from 'react'
import { useRouter } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { Send }      from 'lucide-react'
import { CONTATO }   from '@/lib/data'
import { getEspecialidades, getExames } from '@/lib/content/catalog'
import type { AppLocale } from '@/i18n/routing'
import { formatWhatsAppMessage } from '@/lib/utils'
import { pushEvent, origemPagina } from '@/lib/gtm'

export function AgendarForm() {
  const router              = useRouter()
  const locale               = useLocale() as AppLocale
  const t                    = useTranslations('agendarForm')
  const SERVICOS = [
    { group: t('grupoConsultas'), options: getEspecialidades(locale).map(e => e.title) },
    { group: t('grupoExames'),    options: getExames(locale).map(e => e.title) },
    { group: t('grupoEnsino'),    options: [t('ensinoOpt1'), t('ensinoOpt2'), t('ensinoOpt3')] },
  ]
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

    // O window.open precisa acontecer AINDA dentro do gesto do usuário.
    // Dentro do setTimeout anterior, o Safari do iOS classificava a chamada
    // como pop-up e bloqueava: o paciente via "Solicitação enviada!", o
    // WhatsApp nunca abria e a conversão era registrada assim mesmo.
    const janela = window.open(`${CONTATO.whatsappUrl}?text=${msg}`, '_blank')

    // Só o serviço de interesse acompanha o evento. Nome, telefone, e-mail e
    // a mensagem livre NÃO entram no dataLayer — ver src/lib/gtm.ts.
    pushEvent({
      event:             'envio_agendamento',
      servico_interesse: form.servico || 'nao_informado',
      origem_pagina:     origemPagina(),
      // Permite medir quantos envios perdem o WhatsApp por bloqueio de pop-up.
      whatsapp_abriu:    Boolean(janela),
    })

    setSent(true)
    // A conversão do Google Ads é disparada na página /obrigado.
    setTimeout(() => router.push('/obrigado'), 800)
  }

  const inputCls = (key: string) =>
    `w-full bg-white border rounded-lg px-4 py-3 text-[0.93rem] text-steel placeholder-steel/40 outline-none transition-all ${
      errors[key]
        ? 'border-red-500/60 focus:border-red-400'
        : 'border-teal/15 focus:border-teal/40 focus:bg-cloud'
    }`

  if (sent) return (
    <div className="text-center py-10">
      <div className="w-14 h-14 rounded-full bg-teal/8 border border-teal/20 flex items-center justify-center text-teal mx-auto mb-4">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-6 h-6">
          <polyline points="20 6 9 17 4 12"/>
        </svg>
      </div>
      <h3 className="text-steel font-semibold mb-2">{t('solicitacaoEnviada')}</h3>
      <p className="text-[0.9rem] text-steel/65">{t('abrindoWhatsapp')}</p>
    </div>
  )

  return (
    <form onSubmit={submit} noValidate className="space-y-4">
      <div>
        <label className="block text-[0.72rem] font-semibold uppercase tracking-[.04em] text-steel/45 mb-1.5">
          {t('nomeCompleto')}
        </label>
        <input type="text" placeholder={t('nomePlaceholder')} value={form.nome}
          onChange={e => update('nome', e.target.value)} className={inputCls('nome')} />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-[0.72rem] font-semibold uppercase tracking-[.04em] text-steel/45 mb-1.5">
            {t('telefone')}
          </label>
          <input type="tel" placeholder="(31) 00000-0000" value={form.telefone}
            onChange={e => update('telefone', e.target.value)} className={inputCls('telefone')} />
        </div>
        <div>
          <label className="block text-[0.72rem] font-semibold uppercase tracking-[.04em] text-steel/45 mb-1.5">
            {t('email')}
          </label>
          <input type="email" placeholder="seu@email.com" value={form.email}
            onChange={e => update('email', e.target.value)} className={inputCls('email')} />
        </div>
      </div>

      <div>
        <label className="block text-[0.72rem] font-semibold uppercase tracking-[.04em] text-steel/45 mb-1.5">
          {t('servicoInteresse')}
        </label>
        <select value={form.servico} onChange={e => update('servico', e.target.value)}
          className={`${inputCls('servico')} appearance-none`}
        >
          <option value="">{t('selecione')}</option>
          {SERVICOS.map(grp => (
            <optgroup key={grp.group} label={grp.group}>
              {grp.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
            </optgroup>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-[0.72rem] font-semibold uppercase tracking-[.04em] text-steel/45 mb-1.5">
          {t('mensagemOpcional')}
        </label>
        <textarea rows={3} placeholder={t('mensagemPlaceholder')} value={form.mensagem}
          onChange={e => update('mensagem', e.target.value)}
          className={`${inputCls('mensagem')} resize-none`}
        />
      </div>

      <div className="flex items-start gap-2 p-3 bg-teal/5 border border-teal/10 rounded-lg text-[0.72rem] text-steel/50">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="w-4 h-4 text-teal shrink-0 mt-0.5">
          <circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>
        </svg>
        {t('lgpd')}
      </div>

      <button type="submit" className="btn-gold w-full justify-center py-3.5 text-[0.87rem]">
        <Send className="w-4 h-4" />
        {t('enviarSolicitacao')}
      </button>
    </form>
  )
}
