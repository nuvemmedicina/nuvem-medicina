'use client'

import { useCallback, useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { Download, FileText, RotateCcw, ShieldCheck, Check } from 'lucide-react'
import { listarPendencias, PREPAROS, VALIDAR, PREPAROS_NOVOS, CAMPOS_NOVO, chaveNovo, novoCompleto } from '@/lib/anamnese-ia/preparos'
import { Barra } from '@/components/anamnese-ia/AnamneseForm'
import { useServidor, rotuloStatus, useHoje } from '@/components/anamnese-ia/useServidor'

/**
 * Validação dos preparos pela equipe médica: um cartão por item marcado
 * [VALIDAR COM A EQUIPE MÉDICA] em src/lib/anamnese-ia/preparos.ts, mais a
 * seção "Preparos novos" (exames sem preparo escrito, PREPAROS_NOVOS).
 * Mais de uma pessoa pode usar o link: cada resposta guarda quem ("por") e
 * quando ("em"), e o servidor junta item a item (lib/anamnese-ia/mesclar.ts).
 * Rascunho no navegador; exporta JSON e PDF (impressão).
 */

const DECISOES = [
  { v: 'manter',   label: 'Manter como proposto' },
  { v: 'corrigir', label: 'Corrigir' },
  { v: 'remover',  label: 'Remover este item' },
] as const
type Decisao = typeof DECISOES[number]['v']

type Resposta = { decisao?: Decisao; orientacao?: string; comentario?: string; texto?: string; em?: string; por?: string }
type Estado = { validador: string; respostas: Record<string, Resposta>; observacoes: string; observacoesEm?: string; atualizadoEm?: string }

const CHAVE = 'anamnese-ia:v1:validacao'
const VAZIO: Estado = { validador: '', respostas: {}, observacoes: '' }

const resolvida = (r?: Resposta) =>
  !!r?.decisao && (r.decisao !== 'corrigir' || !!r.orientacao?.trim())

function ler(): Estado | null {
  try { const r = window.localStorage.getItem(CHAVE); return r ? JSON.parse(r) as Estado : null } catch { return null }
}
function gravar(e: Estado) {
  try { window.localStorage.setItem(CHAVE, JSON.stringify(e)); return true } catch { return false }
}

export function ValidacaoForm() {
  const pendencias = useMemo(() => listarPendencias(), [])
  const hoje = useHoje()
  const [estado, setEstado] = useState<Estado>(VAZIO)
  const [carregado, setCarregado] = useState(false)
  const [salvoEm, setSalvoEm] = useState<string | null>(null)
  const [semStorage, setSemStorage] = useState(false)

  useEffect(() => { const r = ler(); if (r?.respostas) setEstado(r); setCarregado(true) }, [])
  useEffect(() => {
    if (!carregado) return
    const t = setTimeout(() => {
      const ok = gravar(estado); setSemStorage(!ok)
      if (ok) setSalvoEm(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }, 400)
    return () => clearTimeout(t)
  }, [estado, carregado])

  const agora = () => new Date().toISOString()
  const setResp = (id: string, patch: Resposta) =>
    setEstado(e => {
      const t = agora()
      return { ...e, atualizadoEm: t, respostas: { ...e.respostas, [id]: { ...e.respostas[id], ...patch, em: t, por: e.validador || undefined } } }
    })

  // Servidor (Sanity, via /api/anamnese-ia) — só quando o link tem ?c=código
  const aoCarregarRemoto = useCallback((d: Estado) => { if (d?.respostas) setEstado(d) }, [])
  const servidor = useServidor({ escopo: 'validacao', estado, carregado, aoCarregarRemoto })
  const servidorAtivo = !!servidor.codigo && servidor.status !== 'acesso-negado'
  const [aviso, setAviso] = useState<string | null>(null)
  useEffect(() => { if (!aviso) return; const t = setTimeout(() => setAviso(null), 4000); return () => clearTimeout(t) }, [aviso])
  const enviar = async () => {
    const ok = await servidor.enviar()
    setAviso(ok ? 'Validação enviada. Obrigada!' : 'Não foi possível enviar agora. As respostas estão guardadas neste navegador; tente de novo em instantes.')
  }

  const okItens = pendencias.filter(p => resolvida(estado.respostas[p.id])).length
  const okNovos = PREPAROS_NOVOS.filter(p => novoCompleto(p, estado.respostas)).length
  const ok = okItens + okNovos
  const total = pendencias.length + PREPAROS_NOVOS.length
  const novosExport = () => PREPAROS_NOVOS.map(p => ({
    ...p,
    modo: estado.respostas[chaveNovo(p.slug, 'modo')]?.texto ?? null,
    completo: novoCompleto(p, estado.respostas),
    campos: Object.fromEntries(CAMPOS_NOVO.map(c => [c.id, estado.respostas[chaveNovo(p.slug, c.id)]?.texto ?? ''])),
  }))
  const grupos = PREPAROS.map(p => ({ p, itens: pendencias.filter(x => x.slug === p.slug) })).filter(g => g.itens.length)

  const baixarJson = () => {
    const dados = {
      tipo: 'anamnese-ia/validacao', versao: 'v1', exportadoEm: new Date().toISOString(),
      validador: estado.validador, observacoes: estado.observacoes,
      resolvidos: okItens, total: pendencias.length,
      itens: pendencias.map(p => ({ ...p, ...estado.respostas[p.id] })),
      preparosNovos: novosExport(),
    }
    const url = URL.createObjectURL(new Blob([JSON.stringify(dados, null, 2)], { type: 'application/json;charset=utf-8' }))
    const a = document.createElement('a')
    a.href = url; a.download = `validacao-preparos-${new Date().toISOString().slice(0, 10)}.json`; a.click()
    setTimeout(() => URL.revokeObjectURL(url), 1000)
  }
  const limpar = () => {
    if (!window.confirm(servidorAtivo ? 'Apagar todas as respostas (neste navegador e no servidor)?' : 'Apagar todas as respostas deste navegador?')) return
    try { window.localStorage.removeItem(CHAVE) } catch { /* sem storage */ }
    setEstado(VAZIO)
  }

  const input = 'w-full rounded-xl border border-teal/15 bg-white px-3.5 py-2.5 text-[0.92rem] text-steel outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/15'

  return (
    <div className="min-h-screen bg-cloud font-sans print:min-h-0 print:bg-white">
      <header className="sticky top-0 z-30 border-b border-teal/10 bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-4xl items-center justify-between gap-3 px-4 py-3">
          <Image src="/images/logo.svg" alt="NU.V.E.M Medicina" width={120} height={32} className="h-7 w-auto" priority />
          <div className="w-40 sm:w-56">
            <Barra ok={ok} total={total} />
            <p className="mt-0.5 text-right text-[0.68rem] text-steel/45">
              {servidor.codigo
                ? <span className={servidor.status === 'erro' || servidor.status === 'acesso-negado' ? 'text-gold-dark' : ''}>{rotuloStatus(servidor.status, servidor.salvoEm)}</span>
                : semStorage ? <span className="text-gold-dark">Rascunho não salvo: exporte o JSON</span> : salvoEm ? `Salvo às ${salvoEm}` : 'Carregando…'}
            </p>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-4xl px-4 py-8 print:hidden sm:py-12">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[.14em] text-gold-dark">Equipe médica · Preparos de exames</p>
        <h1 className="mb-3 font-serif text-[2rem] font-medium leading-tight text-teal sm:text-[2.5rem]">Validação dos <em>preparos</em></h1>
        <p className="mb-4 text-[0.95rem] leading-relaxed text-steel/65">
          Os preparos dos {PREPAROS.length} exames foram padronizados a partir dos PDFs oficiais da clínica, sem orientação nova. Nos {pendencias.length} pontos abaixo há divergência entre o PDF, o site e a Nuvete (chat do site), lacuna ou instrução ambígua. No final, há {PREPAROS_NOVOS.length} exames novos que ainda não têm preparo escrito. A decisão de vocês vale para a IA do WhatsApp, a Nuvete, o site e os PDFs de preparo.
        </p>
        <div className="mb-8 flex gap-2.5 rounded-xl border border-teal/15 bg-mist/30 p-3.5 text-[0.8rem] leading-snug text-steel/70">
          <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
          <p>Para cada ponto, escolha <strong>Manter</strong>, <strong>Corrigir</strong> (escrevendo a orientação correta) ou <strong>Remover</strong>. As respostas ficam salvas neste navegador. Ao terminar, toque em <strong>Baixar JSON</strong> e envie o arquivo. Não escreva dados de pacientes.</p>
        </div>

        <section className="mb-6 rounded-2xl border border-teal/10 bg-white p-5 shadow-sm sm:p-7">
          <label htmlFor="validador" className="mb-1.5 block text-[0.88rem] font-medium text-steel">Seu nome e CRM<span className="ml-0.5 text-gold-dark">*</span></label>
          <p className="mb-2 text-[0.78rem] leading-snug text-steel/50">Este link pode ser usado por mais de um médico (por exemplo, a Dra. Eliane para o trânsito colônico). Escreva o seu nome antes de responder: cada resposta fica registrada com quem respondeu, e as respostas de um não apagam as do outro.</p>
          <input id="validador" className={input} value={estado.validador} onChange={e => setEstado(s => ({ ...s, atualizadoEm: agora(), validador: e.target.value }))} />
        </section>

        <div className="space-y-8">
          {grupos.map(({ p, itens }, gi) => {
            const feitos = itens.filter(x => resolvida(estado.respostas[x.id])).length
            return (
              <section key={p.slug} id={p.slug} className="scroll-mt-24">
                <div className="mb-3 flex items-end justify-between gap-3">
                  <h2 className="text-[1.05rem] font-semibold text-teal"><span className="mr-1.5 text-gold-dark">{gi + 1}.</span>{p.nome}</h2>
                  <span className={`shrink-0 text-[0.72rem] tabular-nums ${feitos === itens.length ? 'text-teal' : 'text-steel/45'}`}>{feitos}/{itens.length}</span>
                </div>
                <div className="space-y-4">
                  {itens.map(x => {
                    const r = estado.respostas[x.id] ?? {}
                    const pronto = resolvida(r)
                    return (
                      <article key={x.id} className={`rounded-2xl border bg-white p-5 shadow-sm transition sm:p-6 ${pronto ? 'border-teal/30' : 'border-teal/10'}`}>
                        <div className="mb-2 flex items-center justify-between gap-2">
                          <span className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-teal/70">{x.secao}</span>
                          {pronto && <span className="inline-flex items-center gap-1 rounded-full bg-teal/8 px-2 py-0.5 text-[0.7rem] font-medium text-teal"><Check className="h-3 w-3" />respondido</span>}
                        </div>
                        <p className="mb-1 text-[0.72rem] font-semibold text-steel/45">Texto proposto</p>
                        <p className="mb-3 text-[0.92rem] leading-relaxed text-steel">{x.texto}</p>
                        <div className="mb-4 rounded-xl border border-[#e8c56a] bg-[#fff8e6] px-3.5 py-2.5 text-[0.82rem] leading-snug text-[#7a5200]">
                          <span className="font-semibold">Por que validar:</span> {x.motivo}
                        </div>
                        <fieldset>
                          <legend className="sr-only">Decisão</legend>
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
                            {DECISOES.map(d => (
                              <label key={d.v} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-[0.86rem] transition ${r.decisao === d.v ? 'border-teal bg-teal/5 font-medium text-teal' : 'border-teal/15 text-steel/70'}`}>
                                <input type="radio" name={x.id} className="h-4 w-4 accent-[#00465F]" checked={r.decisao === d.v} onChange={() => setResp(x.id, { decisao: d.v })} />
                                {d.label}
                              </label>
                            ))}
                          </div>
                        </fieldset>
                        {r.decisao === 'corrigir' && (
                          <div className="mt-3">
                            <label htmlFor={`${x.id}-o`} className="mb-1.5 block text-[0.84rem] font-medium text-steel">Orientação correta<span className="ml-0.5 text-gold-dark">*</span></label>
                            <textarea id={`${x.id}-o`} rows={3} className={`${input} ${r.orientacao?.trim() ? '' : 'border-gold/60'}`} value={r.orientacao ?? ''} onChange={e => setResp(x.id, { orientacao: e.target.value })} />
                          </div>
                        )}
                        <div className="mt-3">
                          <label htmlFor={`${x.id}-c`} className="mb-1.5 block text-[0.78rem] text-steel/55">Comentário (opcional)</label>
                          <input id={`${x.id}-c`} className={input} value={r.comentario ?? ''} onChange={e => setResp(x.id, { comentario: e.target.value })} />
                        </div>
                      </article>
                    )
                  })}
                </div>
              </section>
            )
          })}
        </div>

        <section id="preparos-novos" className="mt-10 scroll-mt-24">
          <div className="mb-3 flex items-end justify-between gap-3">
            <h2 className="text-[1.05rem] font-semibold text-teal"><span className="mr-1.5 text-gold-dark">{grupos.length + 1}.</span>Preparos novos</h2>
            <span className={`shrink-0 text-[0.72rem] tabular-nums ${okNovos === PREPAROS_NOVOS.length ? 'text-teal' : 'text-steel/45'}`}>{okNovos}/{PREPAROS_NOVOS.length}</span>
          </div>
          <p className="mb-4 text-[0.86rem] leading-relaxed text-steel/60">Exames que ainda não têm preparo escrito. Preencha na mesma estrutura dos outros preparos, com um item por linha. Os campos com <span className="text-gold-dark">*</span> são obrigatórios.</p>
          <div className="space-y-4">
            {PREPAROS_NOVOS.map(p => {
              const r = estado.respostas
              const modo = r[chaveNovo(p.slug, 'modo')]?.texto
              const pronto = novoCompleto(p, r)
              const mostrarCampos = !p.mesmoQue || modo === 'diferente'
              return (
                <article key={p.slug} className={`rounded-2xl border bg-white p-5 shadow-sm sm:p-6 ${pronto ? 'border-teal/30' : 'border-teal/10'}`}>
                  <div className="mb-1 flex items-center justify-between gap-2">
                    <h3 className="text-[1rem] font-semibold text-steel">{p.nome}</h3>
                    {pronto && <span className="inline-flex items-center gap-1 rounded-full bg-teal/8 px-2 py-0.5 text-[0.7rem] font-medium text-teal"><Check className="h-3 w-3" />respondido</span>}
                  </div>
                  <p className="mb-1 text-[0.78rem] font-medium text-teal/80">Quem preenche: {p.responsavel}</p>
                  <p className="mb-4 text-[0.82rem] leading-snug text-steel/55">{p.contexto}</p>
                  {p.mesmoQue && (
                    <fieldset className="mb-4">
                      <legend className="mb-2 text-[0.86rem] font-medium text-steel">O preparo é o mesmo da {p.mesmoQue.nome}?<span className="ml-0.5 text-gold-dark">*</span></legend>
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {[['mesmo', 'Sim, o mesmo preparo'], ['diferente', 'Não, é diferente']].map(([v, label]) => (
                          <label key={v} className={`flex cursor-pointer items-center gap-2 rounded-xl border px-3 py-2.5 text-[0.86rem] transition ${modo === v ? 'border-teal bg-teal/5 font-medium text-teal' : 'border-teal/15 text-steel/70'}`}>
                            <input type="radio" name={chaveNovo(p.slug, 'modo')} className="h-4 w-4 accent-[#00465F]" checked={modo === v} onChange={() => setResp(chaveNovo(p.slug, 'modo'), { texto: v })} />
                            {label}
                          </label>
                        ))}
                      </div>
                    </fieldset>
                  )}
                  {mostrarCampos && CAMPOS_NOVO.map(c => {
                    const id = chaveNovo(p.slug, c.id)
                    const v = r[id]?.texto ?? ''
                    return (
                      <div key={c.id} className="mb-4">
                        <label htmlFor={id} className="mb-1 block text-[0.86rem] font-medium text-steel">{c.label}{c.obrigatorio && <span className="ml-0.5 text-gold-dark">*</span>}</label>
                        <p className="mb-1.5 text-[0.76rem] text-steel/50">{c.ajuda}</p>
                        <textarea id={id} rows={c.id === 'serve' || c.id === 'ficha' ? 2 : 3} className={`${input} ${c.obrigatorio && !v.trim() ? 'border-gold/60' : ''}`} value={v} onChange={e => setResp(id, { texto: e.target.value })} />
                      </div>
                    )
                  })}
                </article>
              )
            })}
          </div>
        </section>

        <section className="mt-8 rounded-2xl border border-teal/10 bg-white p-5 shadow-sm sm:p-7">
          <label htmlFor="obs" className="mb-1.5 block text-[0.88rem] font-medium text-steel">Observações gerais</label>
          <textarea id="obs" rows={4} className={input} value={estado.observacoes} onChange={e => { const t = agora(); setEstado(s => ({ ...s, atualizadoEm: t, observacoesEm: t, observacoes: e.target.value })) }} />
        </section>

        <section className="mt-6 rounded-2xl bg-teal p-5 text-white shadow-sm sm:p-7">
          <h3 className="mb-1 text-[1.05rem] font-semibold">{servidorAtivo ? 'Enviar validação' : 'Finalizar e exportar'}</h3>
          {servidorAtivo ? (
            <div className="mb-4">
              <p className="mb-3 text-[0.84rem] leading-relaxed text-white/75">{okItens} de {pendencias.length} pontos e {okNovos} de {PREPAROS_NOVOS.length} preparos novos respondidos. As respostas são salvas automaticamente e podem ser continuadas em outro aparelho pelo mesmo link. Quando terminar, toque em <strong>Enviar validação</strong>.</p>
              {servidor.finalizadoEm && (
                <p className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[0.8rem]"><Check className="h-3.5 w-3.5" /> Enviada em {new Date(servidor.finalizadoEm).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}. Alterações depois disso continuam sendo salvas.</p>
              )}
              <div><button type="button" onClick={enviar} disabled={servidor.status === 'salvando'} className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 text-[0.92rem] font-semibold text-ink hover:bg-gold-light disabled:opacity-60"><Check className="h-4 w-4" /> {servidor.finalizadoEm ? 'Enviar de novo' : 'Enviar validação'}</button></div>
              <p className="mt-4 text-[0.74rem] text-white/50">Se quiser uma cópia, use os botões abaixo.</p>
            </div>
          ) : (
            <p className="mb-5 text-[0.84rem] leading-relaxed text-white/70">{okItens} de {pendencias.length} pontos e {okNovos} de {PREPAROS_NOVOS.length} preparos novos respondidos. Baixe o JSON e envie o arquivo; o PDF serve como registro (use &quot;Salvar como PDF&quot; na janela de impressão).</p>
          )}
          <div className="flex flex-wrap gap-2.5">
            <button type="button" onClick={baixarJson} className={servidorAtivo ? 'inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-[0.86rem] font-medium hover:bg-white/10' : 'inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-[0.86rem] font-semibold text-ink hover:bg-gold-light'}><Download className="h-4 w-4" /> Baixar JSON</button>
            <button type="button" onClick={() => window.print()} className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-[0.86rem] font-medium hover:bg-white/10"><FileText className="h-4 w-4" /> Exportar PDF</button>
            {!servidorAtivo && <button type="button" onClick={limpar} className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-[0.8rem] text-white/60 hover:text-white"><RotateCcw className="h-3.5 w-3.5" /> Limpar respostas</button>}
          </div>
        </section>
      </div>

      {aviso && <div role="status" className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-sm rounded-xl bg-ink px-4 py-3 text-center text-[0.85rem] text-white shadow-lg print:hidden">{aviso}</div>}

      {/* Impressão */}
      <div className="hidden px-2 print:block">
        <div className="mb-5 flex items-center justify-between border-b-2 border-teal pb-3">
          <Image src="/images/logo.svg" alt="NU.V.E.M Medicina" width={150} height={40} />
          <div className="text-right text-[9pt] text-steel/60">
            <p className="font-semibold text-teal">Validação dos preparos de exames</p>
            <p>{hoje} · {ok}/{total} respondidos</p>
          </div>
        </div>
        <p className="mb-4 text-[10pt]"><strong>Validado por:</strong> {estado.validador || '(não informado)'}</p>
        {grupos.map(({ p, itens }) => (
          <div key={p.slug} className="mb-4">
            <h2 className="mb-2 border-b border-teal/20 pb-1 text-[12pt] font-semibold text-teal">{p.nome}</h2>
            {itens.map(x => {
              const r = estado.respostas[x.id] ?? {}
              const dec = DECISOES.find(d => d.v === r.decisao)?.label
              return (
                <div key={x.id} className="mb-3 break-inside-avoid text-[9.5pt]">
                  <p className="text-[8.5pt] font-semibold text-steel/60">{x.secao}</p>
                  <p>{x.texto}</p>
                  <p className="text-[8.5pt] italic text-[#7a5200]">{x.motivo}</p>
                  <p className="mt-0.5"><strong>Decisão:</strong> {dec ?? <span className="italic text-steel/40">{VALIDAR}</span>}{r.decisao === 'corrigir' && r.orientacao ? `: ${r.orientacao}` : ''}{r.comentario ? ` · ${r.comentario}` : ''}</p>
                </div>
              )
            })}
          </div>
        ))}
        <div className="mb-4 break-before-page">
          <h2 className="mb-2 border-b border-teal/20 pb-1 text-[12pt] font-semibold text-teal">Preparos novos</h2>
          {PREPAROS_NOVOS.map(p => {
            const r = estado.respostas
            const modo = r[chaveNovo(p.slug, 'modo')]?.texto
            return (
              <div key={p.slug} className="mb-3 break-inside-avoid text-[9.5pt]">
                <p className="font-semibold">{p.nome} <span className="font-normal text-steel/60">· {p.responsavel}</span></p>
                {p.mesmoQue && modo === 'mesmo'
                  ? <p>Mesmo preparo da {p.mesmoQue.nome}.</p>
                  : CAMPOS_NOVO.map(c => {
                      const v = r[chaveNovo(p.slug, c.id)]?.texto
                      return <p key={c.id} className="whitespace-pre-wrap"><strong>{c.label}:</strong> {v || <span className="italic text-steel/40">(não respondido)</span>}</p>
                    })}
              </div>
            )
          })}
        </div>
        {estado.observacoes && <p className="mt-4 whitespace-pre-wrap text-[9.5pt]"><strong>Observações gerais:</strong> {estado.observacoes}</p>}
      </div>
    </div>
  )
}
