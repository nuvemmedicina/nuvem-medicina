'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Send, ChevronDown, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import {
  NUVETE_PERSONA,
  NUVETE_TOPICOS,
  NUVETE_RESPOSTAS,
  PREPAROS_EXAMES,
  type NuveteTopico,
} from '@/lib/nuvete-data'
import { CONTATO } from '@/lib/data'
import { NuveteAvatar } from './NuveteAvatar'
import { NuveteBubble } from './NuveteBubble'
import { NuveteMessage } from './NuveteMessage'

export type Msg = {
  id:       string
  role:     'nuvete' | 'user'
  text:     string
  botoes?:  { label: string; acao: string }[]
  typing?:  boolean
}

function makeId() { return Math.random().toString(36).slice(2) }

// ─── System prompt sent to Claude API ─────────────────────────────────────────
const SYSTEM_PROMPT = `Você é a Nuvete, assistente virtual da NU.V.E.M Medicina — clínica especializada em gastroenterologia, diagnóstico avançado e ensino médico em Belo Horizonte, certificada ISO 9001.

SEU PAPEL:
- Responder dúvidas sobre a clínica, especialidades, exames e preparos
- Ajudar no agendamento direcionando para WhatsApp ou formulário
- Orientar preparos para exames de forma clara e precisa
- Ser acolhedora, técnica e objetiva

REGRAS ABSOLUTAS:
- NUNCA faça diagnósticos médicos ou interprete exames
- NUNCA recomende medicamentos
- NUNCA substitua consulta médica
- Para dúvidas clínicas pessoais: redirecione sempre para consultar o médico
- Seja clara: "Sou uma assistente virtual. Para avaliação médica, consulte nossos especialistas."

INFORMAÇÕES DA CLÍNICA:
- Nome: NU.V.E.M Medicina | CRM-MG 20532
- Diretora: Dra. Vera Ângelo (Gastroenterologista) | CRM-MG 22284 | RQE 10411 | RQE 22736
- Endereço: Rua Ceará, 600 – Sala 101, Santa Efigênia, BH/MG
- Telefone: (31) 2537-3131 | WhatsApp: (31) 99726-1029
- Horário: Segunda a Sexta, 7h30–17h30
- Site: nuvemmedicina.com.br | Instagram: @NuvemMedicina
- Certificação: ISO 9001 — única clínica do segmento em BH

ESPECIALIDADES: Gastroenterologia, Motilidade Digestiva, Fisioterapia Pélvica, Halitose, Pediatria, Nefrologia

EXAMES: Manometria Esofágica AR, Manometria Anorretal, pHmetria 24h, pH-Impedânciometria, Testes Respiratórios (H₂/CH₄/H₂S, H. pylori, Lactose, Frutose), Halimetria, Sialometria, Biofeedback/EMG Pélvico

PREPAROS RESUMIDOS:
- Manometria esofágica: jejum 6h, suspender medicamentos de motilidade com orientação médica
- pHmetria 24h: suspender IBP 7 dias (com médico), jejum 4h antes
- Testes respiratórios SIBO: jejum 12h, dieta restritiva dia anterior, sem antibióticos 4 semanas
- Halimetria: sem comida 3h antes, sem escovação 2h antes, sem enxaguante no dia
- H. pylori (ureia): jejum 4h, sem antibióticos 4 semanas, IBP 2 semanas com médico

ENSINO: NU.V.E.M Ensino — formação hands-on para profissionais, certificação ISO 9001. Trilhas: Gastroenterologia & Motilidade, Saúde Pélvica, Halitose.

FORMATO DE RESPOSTAS:
- Respostas curtas e objetivas (máx 3 parágrafos para o chat)
- Use markdown: **negrito** para destaques, listas com -
- Sempre termine com uma chamada para ação clara quando relevante
- Se pedir agendamento: forneça WhatsApp (31) 99726-1029 e telefone (31) 2537-3131
- Idioma: português brasileiro informal mas profissional`

export function NuveteChat() {
  const [open,     setOpen]     = useState(false)
  const [msgs,     setMsgs]     = useState<Msg[]>([])
  const [input,    setInput]    = useState('')
  const [loading,  setLoading]  = useState(false)
  const [started,  setStarted]  = useState(false)
  const [unread,   setUnread]   = useState(1) // badge inicial
  const bottomRef  = useRef<HTMLDivElement>(null)
  const inputRef   = useRef<HTMLInputElement>(null)

  // Scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  // Focus input when chat opens
  useEffect(() => {
    if (open) {
      setUnread(0)
      inputRef.current?.focus()
      if (!started) {
        setStarted(true)
        // Greeting
        setMsgs([{
          id:   makeId(),
          role: 'nuvete',
          text: NUVETE_PERSONA.saudacao,
        }])
      }
    }
  }, [open, started])

  const addMsg = useCallback((msg: Omit<Msg, 'id'>) => {
    setMsgs(prev => [...prev, { ...msg, id: makeId() }])
  }, [])

  // ── Handle quick action buttons ───────────────────────────────────────────
  const handleAcao = useCallback((acao: string) => {
    if (acao === 'whatsapp') {
      const msg = encodeURIComponent('Olá! Gostaria de agendar uma consulta na NU.V.E.M Medicina.')
      window.open(`${CONTATO.whatsappUrl}?text=${msg}`, '_blank')
      return
    }
    if (acao.startsWith('link:')) {
      const url = acao.replace('link:', '')
      if (url.startsWith('http')) window.open(url, '_blank')
      else window.location.href = url
      return
    }
    if (acao.startsWith('preparo:')) {
      const id = acao.replace('preparo:', '')
      const preparo = PREPAROS_EXAMES.find(p => p.id === id)
      if (preparo) {
        const lista = preparo.itens.map(i => `- ${i}`).join('\n')
        const aviso = preparo.aviso ? `\n\n⚠️ *${preparo.aviso}*` : ''
        addMsg({
          role: 'nuvete',
          text: `${preparo.emoji} **Preparo — ${preparo.nome}**\nDuração aproximada: ${preparo.duracao}\n\n${lista}${aviso}`,
          botoes: [
            { label: '📅 Agendar este exame', acao: 'whatsapp' },
            { label: '❓ Tenho outra dúvida', acao: 'topicos' },
          ],
        })
      }
      return
    }
    if (acao === 'topicos') {
      addMsg({
        role:   'nuvete',
        text:   'Claro! Como posso te ajudar agora?',
      })
      return
    }
  }, [addMsg])

  // ── Handle topic quick-picks ──────────────────────────────────────────────
  const handleTopico = useCallback((topico: NuveteTopico) => {
    addMsg({ role: 'user', text: topico.label })

    if (topico.id === 'preparo') {
      addMsg({
        role: 'nuvete',
        text: 'Para qual exame você quer saber o preparo?',
        botoes: PREPAROS_EXAMES.map(p => ({
          label: `${p.emoji} ${p.nome}`,
          acao:  `preparo:${p.id}`,
        })),
      })
      return
    }
    if (topico.id === 'agendar') {
      addMsg({
        role: 'nuvete',
        text: `Para agendar na NU.V.E.M:\n\n📱 **WhatsApp:** ${CONTATO.whatsapp}\n📞 **Telefone:** ${CONTATO.telefone}\n\nHorário: Segunda a Sexta, 7h30–17h30`,
        botoes: [
          { label: '📱 Abrir WhatsApp', acao: 'whatsapp' },
          { label: '📋 Formulário online', acao: 'link:/agendar' },
        ],
      })
      return
    }
    // For others, send to AI
    sendToAI(topico.label)
  }, [addMsg])

  // ── Main AI call ──────────────────────────────────────────────────────────
  const sendToAI = useCallback(async (text: string) => {
    setLoading(true)
    const typingId = makeId()
    setMsgs(prev => [...prev, { id: typingId, role: 'nuvete', text: '', typing: true }])

    try {
      // Try local knowledge first
      const lower = text.toLowerCase()
      const match = NUVETE_RESPOSTAS.find(r =>
        r.gatilhos.some(g => lower.includes(g))
      )

      if (match) {
        // Small delay for realism
        await new Promise(r => setTimeout(r, 600))
        setMsgs(prev => prev.map(m =>
          m.id === typingId
            ? { ...m, text: match.resposta, botoes: match.botoes, typing: false }
            : m
        ))
        setLoading(false)
        return
      }

      // Call Claude API
      const history = msgs
        .filter(m => !m.typing)
        .slice(-10) // last 10 messages for context
        .map(m => ({
          role:    m.role === 'user' ? 'user' : 'assistant',
          content: m.text,
        }))

      history.push({ role: 'user', content: text })

      const res = await fetch('https://api.anthropic.com/v1/messages', {
        method:  'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model:      'claude-sonnet-4-20250514',
          max_tokens: 1000,
          system:     SYSTEM_PROMPT,
          messages:   history,
        }),
      })

      const data = await res.json()
      const reply = data.content?.[0]?.text ?? 'Desculpe, não consegui processar sua pergunta. Entre em contato pelo WhatsApp: (31) 99726-1029'

      setMsgs(prev => prev.map(m =>
        m.id === typingId
          ? { ...m, text: reply, typing: false }
          : m
      ))
    } catch {
      setMsgs(prev => prev.map(m =>
        m.id === typingId
          ? { ...m, text: 'Desculpe, tive um problema. Fale diretamente pelo WhatsApp (31) 99726-1029 🙂', typing: false, botoes: [{ label: '📱 Abrir WhatsApp', acao: 'whatsapp' }] }
          : m
      ))
    }

    setLoading(false)
  }, [msgs])

  const handleSend = useCallback(async () => {
    const text = input.trim()
    if (!text || loading) return
    setInput('')
    addMsg({ role: 'user', text })
    await sendToAI(text)
  }, [input, loading, addMsg, sendToAI])

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() }
  }

  return (
    <>
      {/* ── Floating Button ── */}
      <button
        onClick={() => setOpen(o => !o)}
        className={cn(
          'fixed bottom-7 left-7 z-50 flex items-center gap-2.5 transition-all duration-300',
          open ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100',
        )}
        aria-label="Abrir chat da Nuvete"
      >
        <div className="relative">
          <NuveteAvatar size={56} pulse />
          {/* Unread badge */}
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-ink text-[0.6rem] font-bold flex items-center justify-center shadow-lg">
              {unread}
            </span>
          )}
        </div>
        <div className="bg-deep border border-teal-light/20 rounded-xl px-3.5 py-2 shadow-xl hidden sm:block">
          <p className="text-[0.72rem] font-semibold text-white">Nuvete</p>
          <p className="text-[0.65rem] text-muted">Posso te ajudar 👋</p>
        </div>
      </button>

      {/* ── Chat Window ── */}
      <div
        className={cn(
          'fixed bottom-7 left-7 z-50 w-[360px] max-w-[calc(100vw-2rem)] transition-all duration-300 origin-bottom-left',
          open
            ? 'opacity-100 scale-100 translate-y-0'
            : 'opacity-0 scale-90 translate-y-4 pointer-events-none',
        )}
        style={{ maxHeight: 'calc(100vh - 7rem)' }}
      >
        <div className="flex flex-col bg-deep border border-teal-light/10 rounded-2xl overflow-hidden shadow-2xl" style={{ maxHeight: 'inherit' }}>

          {/* Header */}
          <div className="flex items-center gap-3 px-4 py-3 border-b border-teal-light/[0.08] shrink-0"
            style={{ background: 'linear-gradient(135deg, #071520, #00293A)' }}
          >
            <NuveteAvatar size={38} />
            <div className="flex-1 min-w-0">
              <p className="text-[0.85rem] font-semibold text-white">{NUVETE_PERSONA.nome}</p>
              <p className="text-[0.68rem] text-muted truncate">{NUVETE_PERSONA.descricao}</p>
            </div>
            <div className="flex items-center gap-1">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[0.65rem] text-muted">Online</span>
            </div>
            <button
              onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-faint hover:text-white hover:bg-teal-light/10 transition-colors ml-1"
              aria-label="Fechar chat"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">

            {/* Quick topics (shown only at start) */}
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-1.5 pb-1">
                {NUVETE_TOPICOS.map(t => (
                  <button
                    key={t.id}
                    onClick={() => handleTopico(t)}
                    className="text-[0.7rem] font-medium px-2.5 py-1.5 rounded-full bg-teal-light/[0.06] border border-teal-light/15 text-muted hover:border-teal-light/35 hover:text-white transition-all"
                  >
                    {t.emoji} {t.label}
                  </button>
                ))}
              </div>
            )}

            {/* Message list */}
            {msgs.map(msg => (
              <NuveteMessage
                key={msg.id}
                msg={msg}
                onAcao={handleAcao}
              />
            ))}

            <div ref={bottomRef} />
          </div>

          {/* Disclaimer */}
          <div className="px-4 py-2 border-t border-teal-light/[0.06] shrink-0">
            <p className="text-[0.6rem] text-faint text-center leading-relaxed">
              Assistente virtual — não realiza diagnósticos médicos
            </p>
          </div>

          {/* Input */}
          <div className="px-3 pb-3 shrink-0">
            <div className="flex items-center gap-2 bg-ink border border-teal-light/15 rounded-xl px-3 py-2 focus-within:border-teal-light/35 transition-colors">
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Escreva sua dúvida..."
                disabled={loading}
                className="flex-1 bg-transparent text-[0.82rem] text-white placeholder:text-faint outline-none min-w-0"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || loading}
                className={cn(
                  'w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0',
                  input.trim() && !loading
                    ? 'bg-gold text-ink hover:scale-110'
                    : 'bg-teal-light/10 text-faint cursor-not-allowed',
                )}
                aria-label="Enviar mensagem"
              >
                {loading
                  ? <Loader2 className="w-3.5 h-3.5 animate-spin" />
                  : <Send className="w-3.5 h-3.5" />
                }
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
