'use client'

import { cn }           from '@/lib/utils'
import { NuveteAvatar } from './NuveteAvatar'
import type { Msg }     from './NuveteChat'

// Very simple markdown renderer for chat (bold + line breaks + lists)
function renderMarkdown(text: string) {
  const lines = text.split('\n')
  return lines.map((line, i) => {
    const parts = line.split(/\*\*(.*?)\*\*/g)
    const rendered = parts.map((part, j) =>
      j % 2 === 1 ? <strong key={j} className="font-semibold text-steel">{part}</strong> : part
    )
    if (line.startsWith('- ')) {
      return (
        <li key={i} className="flex gap-2 items-start">
          <span className="w-1.5 h-1.5 rounded-full bg-teal mt-[7px] shrink-0" />
          <span>{parts.map((part, j) => j % 2 === 1 ? <strong key={j} className="font-semibold text-steel">{part}</strong> : part.replace(/^- /, ''))}</span>
        </li>
      )
    }
    if (line === '') return <br key={i} />
    return <p key={i} className="leading-relaxed">{rendered}</p>
  })
}

interface Props {
  msg:     Msg
  onAcao: (acao: string) => void
}

export function NuveteMessage({ msg, onAcao }: Props) {
  const isUser = msg.role === 'user'

  if (isUser) {
    return (
      <div className="flex justify-end">
        <div className="max-w-[82%] bg-teal text-white text-[0.8rem] rounded-2xl rounded-br-sm px-4 py-2.5 leading-relaxed">
          {msg.text}
        </div>
      </div>
    )
  }

  return (
    <div className="flex gap-2.5 items-end">
      <NuveteAvatar size={28} className="mb-0.5 shrink-0" />
      <div className="flex flex-col gap-1.5 max-w-[88%]">
        {/* Bubble */}
        <div
          className={cn(
            'bg-cloud border border-teal/10 rounded-2xl rounded-bl-sm px-4 py-3 text-[0.8rem] text-steel/70',
            msg.typing && 'min-w-[60px]',
          )}
        >
          {msg.typing ? (
            // Typing indicator
            <div className="flex gap-1 items-center py-1">
              {[0, 1, 2].map(i => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-teal-mid animate-bounce"
                  style={{ animationDelay: `${i * 150}ms` }}
                />
              ))}
            </div>
          ) : (
            <div className="space-y-1">
              {renderMarkdown(msg.text)}
            </div>
          )}
        </div>

        {/* Action buttons */}
        {!msg.typing && msg.botoes && msg.botoes.length > 0 && (
          <div className="flex flex-wrap gap-1.5 mt-0.5">
            {msg.botoes.map((btn, i) => (
              <button
                key={i}
                onClick={() => onAcao(btn.acao)}
                className="text-[0.7rem] font-medium px-2.5 py-1.5 rounded-full bg-white border border-teal/15 text-teal/75 hover:border-teal/40 hover:text-teal transition-all"
              >
                {btn.label}
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
