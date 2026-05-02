'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { X, Send, Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { NUVETE_TOPICOS, NUVETE_RESPOSTAS, PREPAROS_EXAMES } from '@/lib/nuvete-data'
import { CONTATO } from '@/lib/data'
import { NuveteAvatar } from './NuveteAvatar'
import { NuveteMessage } from './NuveteMessage'

export type Msg = {
  id:      string
  role:    'nuvete' | 'user'
  text:    string
  botoes?: { label: string; acao: string }[]
  typing?: boolean
}

function makeId() { return Math.random().toString(36).slice(2) }

const SAUDACAO = `Olá! Eu sou a Nuvete 💙 assistente virtual da NU.V.E.M Medicina.\n\nPosso te ajudar com preparos para exames, informações sobre nossa clínica e agendamentos. Como posso te ajudar hoje?`

export function NuveteChat() {
  const [open,    setOpen]    = useState(false)
  const [msgs,    setMsgs]    = useState<Msg[]>([])
  const [input,   setInput]   = useState('')
  const [loading, setLoading] = useState(false)
  const [started, setStarted] = useState(false)
  const [unread,  setUnread]  = useState(1)
  const bottomRef = useRef<HTMLDivElement>(null)
  const inputRef  = useRef<HTMLInputElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [msgs])

  useEffect(() => {
    if (open) {
      setUnread(0)
      setTimeout(() => inputRef.current?.focus(), 300)
      if (!started) {
        setStarted(true)
        setMsgs([{ id: makeId(), role: 'nuvete', text: SAUDACAO }])
      }
    }
  }, [open, started])

  const addMsg = useCallback((msg: Omit<Msg, 'id'>) => {
    setMsgs(prev => [...prev, { ...msg, id: makeId() }])
  }, [])

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
      const p = PREPAROS_EXAMES.find(x => x.id === id)
      if (p) {
        const lista = p.itens.map(i => `- ${i}`).join('\n')
        const aviso = p.aviso ? `\n\n⚠️ *${p.aviso}*` : ''
        addMsg({
          role: 'nuvete',
          text: `${p.emoji} **Preparo — ${p.nome}**\nDuração aproximada: ${p.duracao}\n\n${lista}${aviso}\n\nQualquer dúvida sobre o preparo, estou aqui! 💙`,
          botoes: [
            { label: '📅 Agendar este exame', acao: 'whatsapp' },
            { label: '❓ Outra dúvida', acao: 'topicos' },
          ],
        })
      }
      return
    }
    if (acao === 'topicos') {
      addMsg({ role: 'nuvete', text: 'Claro! Em que mais posso te ajudar? 😊' })
      return
    }
  }, [addMsg])

  const handleTopico = useCallback((topico: typeof NUVETE_TOPICOS[0]) => {
    addMsg({ role: 'user', text: topico.label })
    if (topico.id === 'preparo') {
      addMsg({
        role: 'nuvete',
        text: 'Para qual exame você gostaria de saber o preparo? 💙',
        botoes: PREPAROS_EXAMES.map(p => ({
          label: `${p.emoji} ${p.nome}`,
          acao: `preparo:${p.id}`,
        })),
      })
      return
    }
    if (topico.id === 'agendar') {
      addMsg({
        role: 'nuvete',
        text: `Fico feliz em te ajudar com o agendamento! 💙\n\n📱 **WhatsApp:** ${CONTATO.whatsapp}\n📞 **Telefone:** ${CONTATO.telefone}\n⏰ Segunda a Sexta, 7h30 às 17h30\n\nNossa equipe vai te atender com muito carinho!`,
        botoes: [
          { label: '📱 Abrir WhatsApp agora', acao: 'whatsapp' },
          { label: '📋 Formulário online', acao: 'link:/agendar' },
        ],
      })
      return
    }
    if (topico.id === 'especialidades') {
      addMsg({
        role: 'nuvete',
        text: '🩺 **Nossas especialidades:**\n\n🔹 Gastroenterologia\n🔹 Fisioterapia Pélvica\n🔹 Halitose\n🔹 Pediatria\n🔹 Nefrologia\n🔹 Motilidade Digestiva\n\nQual especialidade você gostaria de conhecer melhor?',
        botoes: [
          { label: '🩺 Ver todas', acao: 'link:/especialidades' },
          { label: '📅 Agendar consulta', acao: 'whatsapp' },
        ],
      })
      return
    }
    if (topico.id === 'equipe') {
      addMsg({
        role: 'nuvete',
        text: '👩‍⚕️ **Nossa equipe:**\n\n- **Dra. Vera Ângelo** — Gastroenterologista, Mestre e Doutora pela UFMG, fundadora da NU.V.E.M e referência em motilidade digestiva\n- **Dra. Eliane Basques Moura** — Cirurgiã Pediátrica, Diretora Técnica Substituta\n- Fisioterapeutas pélvicos, nefrologista, pediatra e especialistas em halitose\n\nGostaria de saber mais sobre alguma médica?',
        botoes: [
          { label: '👩‍⚕️ Dra. Vera Ângelo', acao: 'link:/equipe/dra-vera' },
          { label: '👩‍⚕️ Dra. Eliane', acao: 'link:/equipe/dra-eliane' },
          { label: '👥 Toda a equipe', acao: 'link:/equipe' },
        ],
      })
      return
    }
    sendToAI(topico.label)
  }, [addMsg])

  const sendToAI = useCallback(async (text: string) => {
    setLoading(true)
    const typingId = makeId()
    setMsgs(prev => [...prev, { id: typingId, role: 'nuvete', text: '', typing: true }])

    try {
      const lower = text.toLowerCase()
      const match = NUVETE_RESPOSTAS.find(r => r.gatilhos.some(g => lower.includes(g)))
      if (match) {
        await new Promise(r => setTimeout(r, 500))
        setMsgs(prev => prev.map(m =>
          m.id === typingId ? { ...m, text: match.resposta, botoes: match.botoes, typing: false } : m
        ))
        setLoading(false)
        return
      }

      const history = msgs
        .filter(m => !m.typing && m.text)
        .slice(-12)
        .map(m => ({ role: m.role === 'user' ? 'user' : 'assistant', content: m.text }))
      history.push({ role: 'user', content: text })

      const res = await fetch('/api', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })
      const data = await res.json()
      const reply = data.text ?? 'Desculpe, não consegui processar agora. Entre em contato pelo WhatsApp (31) 99726-1029 💙'
      const hasAgendamento = reply.toLowerCase().includes('agendar') || reply.toLowerCase().includes('whatsapp')

      setMsgs(prev => prev.map(m =>
        m.id === typingId ? {
          ...m, text: reply, typing: false,
          botoes: hasAgendamento ? [{ label: '📱 Abrir WhatsApp', acao: 'whatsapp' }] : undefined,
        } : m
      ))
    } catch {
      setMsgs(prev => prev.map(m =>
        m.id === typingId ? {
          ...m,
          text: 'Ops, tive um probleminha! 😊 Entre em contato pelo WhatsApp que nossa equipe te ajuda com carinho! 💙',
          typing: false,
          botoes: [{ label: '📱 Abrir WhatsApp', acao: 'whatsapp' }],
        } : m
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

  return (
    <>
      <button
        onClick={() => setOpen(o => !o)}
        className={cn('fixed bottom-7 left-7 z-[300] flex items-center gap-2.5 transition-all duration-300',
          open ? 'opacity-0 pointer-events-none scale-75' : 'opacity-100 scale-100')}
        aria-label="Abrir chat com a Nuvete"
      >
        <div className="relative">
          <NuveteAvatar size={56} pulse />
          {unread > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-gold text-ink text-[0.6rem] font-bold flex items-center justify-center shadow-lg">{unread}</span>
          )}
        </div>
        <div className="bg-white border border-teal/15 rounded-xl px-3.5 py-2 shadow-xl hidden sm:block">
          <p className="text-[0.72rem] font-semibold text-steel">Nuvete</p>
          <p className="text-[0.65rem] text-steel/50">Posso te ajudar 💙</p>
        </div>
      </button>

      <div
        className={cn('fixed bottom-7 left-7 z-[300] w-[370px] max-w-[calc(100vw-2rem)] transition-all duration-300 origin-bottom-left',
          open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-90 translate-y-4 pointer-events-none')}
        style={{ maxHeight: 'calc(100dvh - 6rem)' }}
      >
        <div className="flex flex-col bg-white border border-teal/12 rounded-2xl overflow-hidden shadow-2xl" style={{ maxHeight: 'inherit' }}>
          <div className="flex items-center gap-3 px-4 py-3 border-b border-teal/10 shrink-0"
            style={{ background: 'linear-gradient(135deg, #00465F, #0e7fa5)' }}>
            <NuveteAvatar size={40} />
            <div className="flex-1 min-w-0">
              <p className="text-[0.88rem] font-semibold text-white">Nuvete</p>
              <p className="text-[0.68rem] text-white/65">Assistente da NU.V.E.M Medicina</p>
            </div>
            <div className="flex items-center gap-1.5 mr-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[0.65rem] text-white/65">Online</span>
            </div>
            <button onClick={() => setOpen(false)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-white/50 hover:text-white hover:bg-white/15 transition-colors">
              <X className="w-4 h-4" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 min-h-0">
            {msgs.length === 1 && (
              <div className="flex flex-wrap gap-1.5 pb-1">
                {NUVETE_TOPICOS.map(t => (
                  <button key={t.id} onClick={() => handleTopico(t)}
                    className="text-[0.7rem] font-medium px-2.5 py-1.5 rounded-full bg-cloud border border-teal/15 text-teal/70 hover:border-teal/35 hover:text-teal transition-all">
                    {t.emoji} {t.label}
                  </button>
                ))}
              </div>
            )}
            {msgs.map(msg => <NuveteMessage key={msg.id} msg={msg} onAcao={handleAcao} />)}
            <div ref={bottomRef} />
          </div>

          <div className="px-4 py-1.5 border-t border-teal/8 shrink-0">
            <p className="text-[0.6rem] text-steel/35 text-center">Assistente virtual — não realiza diagnósticos médicos</p>
          </div>

          <div className="px-3 pb-3 shrink-0">
            <div className="flex items-center gap-2 bg-cloud border border-teal/15 rounded-xl px-3 py-2 focus-within:border-teal/35 transition-colors">
              <input ref={inputRef} type="text" value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend() } }}
                placeholder="Escreva sua dúvida..." disabled={loading}
                className="flex-1 bg-transparent text-[0.82rem] text-steel placeholder:text-steel/40 outline-none min-w-0" />
              <button onClick={handleSend} disabled={!input.trim() || loading}
                className={cn('w-7 h-7 rounded-lg flex items-center justify-center transition-all shrink-0',
                  input.trim() && !loading
                    ? 'text-white hover:scale-110'
                    : 'bg-teal/10 text-steel/30 cursor-not-allowed')}
                style={input.trim() && !loading ? { background: 'linear-gradient(135deg,#00465F,#0e7fa5)' } : undefined}>
                {loading ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <Send className="w-3.5 h-3.5" />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
