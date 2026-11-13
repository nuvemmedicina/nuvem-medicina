'use client'

import { TERMO, blocosTermo, type DadosTermo } from '@/lib/anamnese-ia/termo-imagem'

/**
 * Termo de autorização de uso de imagem, exibido antes do botão de envio da
 * foto. A caixa de aceite começa desmarcada e é obrigatória.
 */
export function TermoAutorizacao({ dados, onDados, aceito, onAceito }: {
  dados: DadosTermo
  onDados: (d: DadosTermo) => void
  aceito: boolean
  onAceito: (v: boolean) => void
}) {
  const campo = 'w-full rounded-xl border border-teal/15 bg-white px-3.5 py-2.5 text-[0.92rem] text-steel outline-none focus:border-teal focus:ring-2 focus:ring-teal/15'
  return (
    <div className="mb-5 rounded-2xl border border-teal/15 bg-cloud p-4 sm:p-5">
      <h4 className="mb-1 text-[0.95rem] font-semibold text-teal">{TERMO.titulo}</h4>
      <p className="mb-3 text-[0.74rem] text-steel/50">Versão {TERMO.versao} · {TERMO.revisao}</p>

      <div className="mb-4 grid gap-3 sm:grid-cols-2">
        <label className="text-[0.84rem] font-medium text-steel">
          Nome completo<span className="ml-0.5 text-gold-dark">*</span>
          <input type="text" className={`${campo} mt-1`} value={dados.nomeCompleto} autoComplete="name"
            onChange={e => onDados({ ...dados, nomeCompleto: e.target.value })} />
        </label>
        <label className="text-[0.84rem] font-medium text-steel">
          Registro profissional<span className="ml-0.5 text-gold-dark">*</span>
          <input type="text" className={`${campo} mt-1`} value={dados.registro}
            onChange={e => onDados({ ...dados, registro: e.target.value })} />
        </label>
      </div>

      <div tabIndex={0} role="region" aria-label="Texto do termo de autorização"
        className="mb-4 max-h-56 overflow-y-auto rounded-xl border border-teal/10 bg-white p-4 text-[0.84rem] leading-relaxed text-steel/80 focus:outline-none focus:ring-2 focus:ring-teal/20">
        {blocosTermo(dados).map((b, i) => b.tipo === 'p'
          ? <p key={i} className="mb-3 last:mb-0">{b.texto}</p>
          : <ul key={i} className="mb-3 list-disc pl-5">{b.itens.map(t => <li key={t}>{t}</li>)}</ul>)}
      </div>

      <label className="flex cursor-pointer items-start gap-2.5 text-[0.86rem] text-steel">
        <input type="checkbox" className="mt-0.5 h-4 w-4 shrink-0 accent-[#00465F]" checked={aceito} onChange={e => onAceito(e.target.checked)} />
        <span>Li e autorizo o uso da minha imagem e do meu nome nos termos acima.</span>
      </label>
      {(!dados.nomeCompleto.trim() || !dados.registro.trim()) && (
        <p className="mt-2 text-[0.78rem] text-gold-dark">Preencha seu nome completo e o registro para continuar.</p>
      )}
    </div>
  )
}
