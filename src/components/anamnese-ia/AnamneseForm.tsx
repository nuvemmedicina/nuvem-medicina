'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import {
  Plus, Trash2, Link2, Download, FileText, Upload, Check, ChevronDown, RotateCcw, ShieldCheck,
} from 'lucide-react'
import {
  SECOES_CLINICA, CAMPOS_MEDICO, TODOS_CAMPOS_MEDICO, progressoSecao, preenchido,
  type Field, type Section, type Values, type Value,
} from '@/lib/anamnese-ia/schema'
import { PREFILL_CLINICA, MEDICOS_SITE, prefillMedico } from '@/lib/anamnese-ia/prefill'
import { useServidor, rotuloStatus, useHoje } from '@/components/anamnese-ia/useServidor'
import { normalizarInstagram, erroInstagram } from '@/lib/anamnese-ia/formatos'
import { FotoSecao } from '@/components/anamnese-ia/FotoSecao'

// ─── Tipos e armazenamento ────────────────────────────────────────────────────
type Medico = { uid: string; slug?: string; values: Values }
type Estado = { clinica: Values; medicos: Medico[]; atualizadoEm?: string }

/** completo = Parte A + Parte B · clinica = só Parte A (gestão) · medico = um profissional */
type Modo = 'completo' | 'clinica' | 'medico'

const VERSAO = 'v1'
const chave = (modo: Modo, slug?: string) =>
  modo === 'medico' ? `anamnese-ia:${VERSAO}:medico:${slug ?? 'novo'}` : `anamnese-ia:${VERSAO}:${modo}`

function novoUid() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function inicialPara(modo: Modo, slug?: string): Estado {
  if (modo === 'completo') return estadoInicial()
  if (modo === 'clinica')  return { clinica: { ...PREFILL_CLINICA }, medicos: [] }
  // profissional novo: uid próprio, que vira o escopo no servidor (medico-novo-<uid>)
  return { clinica: {}, medicos: [{ uid: slug ?? novoUid(), slug, values: prefillMedico(slug) }] }
}

function estadoInicial(): Estado {
  return {
    clinica: { ...PREFILL_CLINICA },
    medicos: MEDICOS_SITE.map(m => ({ uid: m.slug, slug: m.slug, values: prefillMedico(m.slug) })),
  }
}

function lerRascunho<T>(k: string): T | null {
  try {
    const raw = window.localStorage.getItem(k)
    return raw ? (JSON.parse(raw) as T) : null
  } catch { return null }
}

function salvarRascunho(k: string, v: unknown) {
  try { window.localStorage.setItem(k, JSON.stringify(v)); return true } catch { return false }
}

function baixar(nome: string, conteudo: string) {
  const blob = new Blob([conteudo], { type: 'application/json;charset=utf-8' })
  const url  = URL.createObjectURL(blob)
  const a    = document.createElement('a')
  a.href = url; a.download = nome; a.click()
  setTimeout(() => URL.revokeObjectURL(url), 1000)
}

function slugify(s: string) {
  return s.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase()
    .replace(/^(dra?\.?\s+)/, '').replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

/** Exporta respostas com o rótulo de cada pergunta (e o nº no formulário original). */
function exportarSecoes(secoes: Section[], values: Values) {
  return secoes.map(s => ({
    secao: s.title,
    respostas: s.fields.map(f => ({
      id: f.id, pergunta: f.label, ...(f.orig ? { perguntaOriginal: f.orig } : {}),
      resposta: values[f.id] ?? (f.type === 'checks' ? [] : ''),
    })),
  }))
}

function exportMedico(m: Medico) {
  return {
    tipo: 'anamnese-ia/medico', versao: VERSAO, exportadoEm: new Date().toISOString(),
    slug: m.slug ?? slugify(String(m.values.nome ?? '')),
    nome: m.values.nome ?? '',
    valores: m.values,
    secoes: exportarSecoes(CAMPOS_MEDICO, m.values),
  }
}

function exportClinica(v: Values) {
  return {
    tipo: 'anamnese-ia/clinica', versao: VERSAO, exportadoEm: new Date().toISOString(),
    valores: v,
    secoes: exportarSecoes(SECOES_CLINICA, v),
  }
}

// ─── Campo ────────────────────────────────────────────────────────────────────
function Campo({ f, value, onChange, escopo }: {
  f: Field; value: Value | undefined; onChange: (v: Value) => void; escopo: string
}) {
  const id  = `${escopo}-${f.id}`
  const vazio = f.required && !preenchido(value)
  const base = 'w-full rounded-xl border bg-white px-3.5 py-2.5 text-[0.92rem] text-steel outline-none transition focus:border-teal focus:ring-2 focus:ring-teal/15'
  const erro  = f.formato === 'instagram' ? erroInstagram(String(value ?? '')) : null
  const borda = erro ? 'border-red-300' : vazio ? 'border-gold/60' : 'border-teal/15'
  const aoSair = () => {
    if (f.formato !== 'instagram') return
    const n = normalizarInstagram(String(value ?? ''))
    if (n !== String(value ?? '')) onChange(n)
  }
  const extras = f.formato === 'instagram'
    ? { autoCapitalize: 'none', autoCorrect: 'off', spellCheck: false, placeholder: '@seuperfil', 'aria-invalid': !!erro, 'aria-describedby': erro ? `${id}-erro` : undefined }
    : {}

  return (
    <div className="mb-5">
      <label htmlFor={id} className="mb-1.5 flex flex-wrap items-baseline gap-x-2 text-[0.88rem] font-medium text-steel">
        <span>{f.label}{f.required && <span className="ml-0.5 text-gold-dark" aria-label="obrigatório">*</span>}</span>
        {f.orig && <span className="text-[0.68rem] font-normal text-steel/35">orig. {f.orig}</span>}
      </label>
      {f.help && <p className="mb-2 text-[0.78rem] leading-snug text-steel/50">{f.help}</p>}

      {f.type === 'text' && (
        <input id={id} type="text" className={`${base} ${borda}`} value={String(value ?? '')}
          required={f.required} onChange={e => onChange(e.target.value)} onBlur={aoSair} {...extras} />
      )}
      {erro && <p id={`${id}-erro`} className="mt-1.5 text-[0.78rem] text-red-700">{erro}</p>}
      {f.type === 'textarea' && (
        <textarea id={id} rows={f.rows ?? 3} className={`${base} ${borda} leading-relaxed`} value={String(value ?? '')}
          required={f.required} onChange={e => onChange(e.target.value)} />
      )}
      {f.type === 'select' && (
        <select id={id} className={`${base} ${borda}`} value={String(value ?? '')}
          required={f.required} onChange={e => onChange(e.target.value)}>
          <option value="">Selecione…</option>
          {f.options!.map(o => <option key={o} value={o}>{o}</option>)}
        </select>
      )}
      {f.type === 'checks' && (
        <div id={id} role="group" className="grid grid-cols-1 gap-2 sm:grid-cols-2">
          {f.options!.map(o => {
            const arr = Array.isArray(value) ? value : []
            const on  = arr.includes(o)
            return (
              <label key={o} className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[0.88rem] transition ${on ? 'border-teal bg-teal/5 text-teal' : 'border-teal/15 bg-white text-steel/70'}`}>
                <input type="checkbox" className="h-4 w-4 accent-[#00465F]" checked={on}
                  onChange={() => onChange(on ? arr.filter(x => x !== o) : [...arr, o])} />
                {o}
              </label>
            )
          })}
        </div>
      )}
    </div>
  )
}

export function Barra({ ok, total }: { ok: number; total: number }) {
  const pct = total ? Math.round((ok / total) * 100) : 100
  return (
    <div className="flex items-center gap-2">
      <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-teal/10">
        <div className="h-full rounded-full bg-teal transition-all" style={{ width: `${pct}%` }} />
      </div>
      <span className="w-12 text-right text-[0.72rem] tabular-nums text-steel/50">{ok}/{total}</span>
    </div>
  )
}

function SecaoCard({ s, values, onChange, escopo, numero }: {
  s: Section; values: Values; onChange: (id: string, v: Value) => void; escopo: string; numero?: string
}) {
  const p = progressoSecao(s.fields, values)
  return (
    <section id={`${escopo}-${s.id}`} className="scroll-mt-24 rounded-2xl border border-teal/10 bg-white p-5 shadow-sm sm:p-7">
      <header className="mb-5">
        <div className="mb-2 flex items-center justify-between gap-3">
          <h3 className="text-[1.05rem] font-semibold text-teal">{numero && <span className="mr-1.5 text-gold-dark">{numero}</span>}{s.title}</h3>
          {p.total > 0 && p.ok === p.total && <span className="inline-flex items-center gap-1 rounded-full bg-teal/8 px-2 py-0.5 text-[0.7rem] font-medium text-teal"><Check className="h-3 w-3" />completa</span>}
        </div>
        {s.desc && <p className="mb-3 text-[0.82rem] text-steel/55">{s.desc}</p>}
        {p.total > 0 && <Barra {...p} />}
      </header>
      {s.fields.map(f => (
        <Campo key={f.id} f={f} value={values[f.id]} escopo={escopo} onChange={v => onChange(f.id, v)} />
      ))}
    </section>
  )
}

// ─── Versão para impressão / PDF ──────────────────────────────────────────────
function RespostaImpressa({ v }: { v: Value | undefined }) {
  const txt = Array.isArray(v) ? v.join(' · ') : (v ?? '')
  return txt
    ? <p className="whitespace-pre-wrap text-[10.5pt] leading-snug text-steel">{txt}</p>
    : <p className="text-[10pt] italic text-steel/40">(não respondido)</p>
}

function Impressao({ clinica, medicos }: { clinica?: Values; medicos: Medico[] }) {
  const data = useHoje()
  return (
    <div className="hidden print:block">
      <div className="mb-6 flex items-center justify-between border-b-2 border-teal pb-3">
        <Image src="/images/logo.svg" alt="NU.V.E.M Medicina" width={150} height={40} />
        <div className="text-right text-[9pt] text-steel/60">
          <p className="font-semibold text-teal">Anamnese da IA de atendimento · Dr.IAgenda</p>
          <p>Gerado em {data}</p>
        </div>
      </div>
      {clinica && (
        <>
          <h1 className="mb-4 text-[16pt] font-semibold text-teal">Parte A — Clínica</h1>
          {SECOES_CLINICA.map(s => (
            <div key={s.id} className="mb-5">
              <h2 className="mb-2 border-b border-teal/20 pb-1 text-[12pt] font-semibold text-teal">{s.title}</h2>
              {s.fields.map(f => (
                <div key={f.id} className="mb-2.5 break-inside-avoid">
                  <p className="text-[9pt] font-semibold text-steel/70">{f.label}{f.orig && <span className="font-normal text-steel/40"> · orig. {f.orig}</span>}</p>
                  <RespostaImpressa v={clinica[f.id]} />
                </div>
              ))}
            </div>
          ))}
        </>
      )}
      {medicos.map((m, i) => (
        <div key={m.uid} className={clinica || i > 0 ? 'break-before-page' : ''}>
          <h1 className="mb-4 text-[16pt] font-semibold text-teal">Parte B — {String(m.values.nome || 'Profissional')}</h1>
          {CAMPOS_MEDICO.map(s => (
            <div key={s.id} className="mb-4">
              <h2 className="mb-2 border-b border-teal/20 pb-1 text-[12pt] font-semibold text-teal">{s.title}</h2>
              {s.fields.map(f => (
                <div key={f.id} className="mb-2.5 break-inside-avoid">
                  <p className="text-[9pt] font-semibold text-steel/70">{f.label}</p>
                  <RespostaImpressa v={m.values[f.id]} />
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  )
}

// ─── Formulário ───────────────────────────────────────────────────────────────
export function AnamneseForm({ modo, slug }: { modo: Modo; slug?: string }) {
  const k = chave(modo, slug)
  const [estado, setEstado] = useState<Estado>(() => inicialPara(modo, slug))
  const temClinica = modo !== 'medico'
  const temMedicos = modo === 'completo'
  const [carregado, setCarregado] = useState(false)
  const [salvoEm, setSalvoEm]     = useState<string | null>(null)
  const [semStorage, setSemStorage] = useState(false)
  const [aviso, setAviso]         = useState<string | null>(null)
  const inputImport = useRef<HTMLInputElement>(null)

  // Restaura rascunho
  useEffect(() => {
    const r = lerRascunho<Estado>(k)
    if (r && r.clinica && Array.isArray(r.medicos)) setEstado(r)
    setCarregado(true)
  }, [k])

  // Salva rascunho a cada alteração (depois de restaurar)
  useEffect(() => {
    if (!carregado) return
    const t = setTimeout(() => {
      const ok = salvarRascunho(k, estado)
      setSemStorage(!ok)
      if (ok) setSalvoEm(new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }))
    }, 400)
    return () => clearTimeout(t)
  }, [estado, carregado, k])

  // Servidor (Sanity, via /api/anamnese-ia) — só quando o link tem ?c=código
  const escopo = modo === 'medico'
    ? (slug ? `medico-${slug}` : `medico-novo-${estado.medicos[0]?.uid ?? 'x'}`)
    : modo
  const aoCarregarRemoto = useCallback((d: Estado) => {
    if (d && d.clinica && Array.isArray(d.medicos)) setEstado(d)
  }, [])
  const servidor = useServidor({ escopo, estado, carregado, aoCarregarRemoto })
  const servidorAtivo = !!servidor.codigo && servidor.status !== 'acesso-negado'
  const enviar = async () => {
    const ok = await servidor.enviar()
    setAviso(ok ? 'Respostas enviadas. Obrigado!' : 'Não foi possível enviar agora. Suas respostas estão guardadas neste navegador; tente de novo em instantes.')
  }

  useEffect(() => {
    if (!aviso) return
    const t = setTimeout(() => setAviso(null), 3500)
    return () => clearTimeout(t)
  }, [aviso])

  const setClinica = (id: string, v: Value) =>
    setEstado(e => ({ ...e, clinica: { ...e.clinica, [id]: v }, atualizadoEm: new Date().toISOString() }))
  const setMedico = (uid: string, id: string, v: Value) =>
    setEstado(e => ({ ...e, medicos: e.medicos.map(m => m.uid === uid ? { ...m, values: { ...m.values, [id]: v } } : m), atualizadoEm: new Date().toISOString() }))

  const adicionarMedico = () => {
    const uid = novoUid()
    setEstado(e => ({ ...e, medicos: [...e.medicos, { uid, values: prefillMedico() }] }))
    setTimeout(() => document.getElementById(`med-${uid}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' }), 50)
  }
  const removerMedico = (m: Medico) => {
    if (!window.confirm(`Remover ${m.values.nome || 'este profissional'} do formulário?`)) return
    setEstado(e => ({ ...e, medicos: e.medicos.filter(x => x.uid !== m.uid) }))
  }

  const linkMedico = (m: Medico) => {
    const s = m.slug ?? 'novo'
    return `${window.location.origin}/anamnese-ia/medico/${s}`
  }
  const copiarLink = async (m: Medico) => {
    const url = linkMedico(m)
    try { await navigator.clipboard.writeText(url); setAviso('Link copiado.') }
    catch { window.prompt('Copie o link:', url) }
  }

  const progressoClinica = useMemo(() => {
    const r = SECOES_CLINICA.map(s => progressoSecao(s.fields, estado.clinica))
    return { ok: r.reduce((a, b) => a + b.ok, 0), total: r.reduce((a, b) => a + b.total, 0) }
  }, [estado.clinica])
  const progressoMed = (m: Medico) => progressoSecao(TODOS_CAMPOS_MEDICO, m.values)

  const dataArq = new Date().toISOString().slice(0, 10)
  const baixarCompleto = () => baixar(`anamnese-ia-nuvem-${dataArq}.json`, JSON.stringify({
    tipo: 'anamnese-ia/completo', versao: VERSAO, exportadoEm: new Date().toISOString(),
    clinica: exportClinica(estado.clinica),
    medicos: estado.medicos.map(exportMedico),
  }, null, 2))
  const baixarClinica = () => baixar(`anamnese-ia-clinica-${dataArq}.json`, JSON.stringify(exportClinica(estado.clinica), null, 2))
  const baixarMedico  = (m: Medico) => {
    const d = exportMedico(m)
    baixar(`anamnese-ia-medico-${d.slug || 'profissional'}-${dataArq}.json`, JSON.stringify(d, null, 2))
  }

  const importar = async (file: File) => {
    try {
      const d = JSON.parse(await file.text())
      if (d?.tipo === 'anamnese-ia/medico' && d.valores) {
        setEstado(e => {
          const existe = e.medicos.find(m => m.slug && m.slug === d.slug)
          if (existe) return { ...e, medicos: e.medicos.map(m => m === existe ? { ...m, values: d.valores } : m) }
          return { ...e, medicos: [...e.medicos, { uid: novoUid(), slug: d.slug || undefined, values: d.valores }] }
        })
        setAviso(`Respostas de ${d.nome || 'profissional'} importadas.`)
      } else if (d?.tipo === 'anamnese-ia/completo' && d.clinica?.valores) {
        if (!window.confirm('Substituir todo o formulário pelo arquivo importado?')) return
        setEstado({ clinica: d.clinica.valores, medicos: d.medicos.map((m: { slug?: string; valores: Values }) => ({ uid: m.slug || novoUid(), slug: m.slug, values: m.valores })) })
        setAviso('Formulário importado.')
      } else if (d?.tipo === 'anamnese-ia/clinica' && d.valores) {
        setEstado(e => ({ ...e, clinica: d.valores }))
        setAviso('Parte A importada.')
      } else {
        setAviso('Arquivo não reconhecido.')
      }
    } catch { setAviso('Não foi possível ler o arquivo.') }
  }

  const limpar = () => {
    if (!window.confirm(servidorAtivo ? 'Apagar todas as respostas (neste navegador e no servidor) e voltar aos dados do site?' : 'Apagar o rascunho deste navegador e voltar aos dados do site?')) return
    try { window.localStorage.removeItem(k) } catch { /* sem storage */ }
    setEstado(inicialPara(modo, slug))
  }

  const medicoUnico = modo === 'medico' ? estado.medicos[0] : undefined

  return (
    <div className="min-h-screen bg-cloud font-sans print:min-h-0 print:bg-white">
      {/* Cabeçalho fixo */}
      <header className="sticky top-0 z-30 border-b border-teal/10 bg-white/95 backdrop-blur print:hidden">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Image src="/images/logo.svg" alt="NU.V.E.M Medicina" width={120} height={32} className="h-7 w-auto" priority />
          <p className="text-right text-[0.72rem] leading-tight text-steel/50">
            {servidor.codigo
              ? <span className={servidor.status === 'erro' || servidor.status === 'acesso-negado' ? 'text-gold-dark' : ''}>{rotuloStatus(servidor.status, servidor.salvoEm)}</span>
              : semStorage
              ? <span className="text-gold-dark">Rascunho não pôde ser salvo neste navegador. Exporte o JSON antes de sair.</span>
              : salvoEm ? <>Rascunho salvo às {salvoEm}<br className="sm:hidden" /><span className="hidden sm:inline"> · </span>neste navegador</> : 'Carregando rascunho…'}
          </p>
        </div>
      </header>

      <div className="mx-auto max-w-6xl px-4 py-8 print:hidden sm:py-12">
        {/* Introdução */}
        <div className="mb-8 max-w-3xl">
          <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[.14em] text-gold-dark">Uso interno · Dr.IAgenda</p>
          <h1 className="mb-3 font-serif text-[2rem] font-medium leading-tight text-teal sm:text-[2.5rem]">
            {modo === 'completo' && <>Anamnese da <em>IA de atendimento</em></>}
            {modo === 'clinica' && <>Anamnese da IA: <em>dados da clínica</em></>}
            {modo === 'medico' && <>Anamnese da IA: <em>{String(medicoUnico?.values.nome || 'profissional')}</em></>}
          </h1>
          <p className="text-[0.95rem] leading-relaxed text-steel/65">
            {modo === 'completo'
              ? 'A Parte A reúne o que vale para a clínica inteira e é respondida uma única vez pela gestão. A Parte B tem um bloco por profissional, só com o que é individual. Cada profissional pode responder pelo próprio link.'
              : modo === 'clinica'
              ? 'Parte A da anamnese da Dr.IAgenda: o que vale para a clínica inteira (endereço, horários, convênios, pagamento, agenda, políticas e regras da Secretária IA). É respondida uma única vez pela gestão. Agenda, valores e restrições de cada profissional ficam com os próprios profissionais.'
              : 'Responda apenas o que é individual: agenda, valores, retorno, restrições e a sua apresentação. As informações da clínica (endereço, convênios, políticas, preparos) já são respondidas pela gestão.'}
          </p>
          <div className="mt-4 flex gap-2.5 rounded-xl border border-teal/15 bg-mist/30 p-3.5 text-[0.8rem] leading-snug text-steel/70">
            <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-teal" />
            <p>Campos pré-preenchidos com dados do site: confira tudo. Trechos com <strong>___</strong> precisam ser completados. <strong>Não escreva dados de pacientes</strong> neste formulário (LGPD).</p>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[260px_1fr]">
          {/* Índice e progresso */}
          <aside className="lg:sticky lg:top-20 lg:self-start">
            <nav className="rounded-2xl border border-teal/10 bg-white p-4 shadow-sm">
              {temClinica && (
                <>
                  <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40">Parte A · Clínica</p>
                  <div className="mb-3"><Barra {...progressoClinica} /></div>
                  <ul className="mb-4 hidden space-y-0.5 lg:block">
                    {SECOES_CLINICA.map((s, i) => {
                      const p = progressoSecao(s.fields, estado.clinica)
                      return (
                        <li key={s.id}>
                          <a href={`#a-${s.id}`} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[0.8rem] text-steel/60 hover:bg-teal/5 hover:text-teal">
                            <span>A{i + 1}. {s.title}</span>
                            <span className={`text-[0.68rem] tabular-nums ${p.ok === p.total ? 'text-teal' : 'text-steel/35'}`}>{p.ok === p.total ? '✓' : `${p.ok}/${p.total}`}</span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                  {temMedicos && <>
                  <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40">Parte B · Profissionais ({estado.medicos.length})</p>
                  <ul className="hidden max-h-[38vh] space-y-0.5 overflow-auto lg:block">
                    {estado.medicos.map(m => {
                      const p = progressoMed(m)
                      return (
                        <li key={m.uid}>
                          <a href={`#med-${m.uid}`} className="flex items-center justify-between gap-2 rounded-lg px-2 py-1.5 text-[0.8rem] text-steel/60 hover:bg-teal/5 hover:text-teal">
                            <span className="truncate">{String(m.values.nome || 'Novo profissional')}</span>
                            <span className={`text-[0.68rem] tabular-nums ${p.ok === p.total ? 'text-teal' : 'text-steel/35'}`}>{p.ok === p.total ? '✓' : `${p.ok}/${p.total}`}</span>
                          </a>
                        </li>
                      )
                    })}
                  </ul>
                  </>}
                </>
              )}
              {modo === 'medico' && medicoUnico && (
                <>
                  <p className="mb-1 text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40">Seu progresso</p>
                  <Barra {...progressoMed(medicoUnico)} />
                </>
              )}
              <p className="mt-3 text-[0.72rem] text-steel/40"><span className="text-gold-dark">*</span> obrigatório</p>
            </nav>
          </aside>

          <main className="min-w-0 space-y-6">
            {temClinica && (
              <>
                <h2 className="pt-1 text-[0.78rem] font-bold uppercase tracking-[.12em] text-teal">Parte A · Clínica <span className="font-normal normal-case tracking-normal text-steel/45">(respondida uma vez pela gestão)</span></h2>
                {SECOES_CLINICA.map((s, i) => (
                  <SecaoCard key={s.id} s={s} numero={`A${i + 1}.`} values={estado.clinica} escopo="a" onChange={setClinica} />
                ))}

                {temMedicos && <>
                <div className="flex flex-wrap items-end justify-between gap-3 pt-6">
                  <h2 className="text-[0.78rem] font-bold uppercase tracking-[.12em] text-teal">Parte B · Profissionais <span className="font-normal normal-case tracking-normal text-steel/45">(um bloco por profissional)</span></h2>
                  <button type="button" onClick={() => inputImport.current?.click()} className="inline-flex items-center gap-1.5 text-[0.8rem] font-medium text-teal hover:underline">
                    <Upload className="h-3.5 w-3.5" /> Importar respostas (JSON)
                  </button>
                </div>

                {estado.medicos.map(m => {
                  const p = progressoMed(m)
                  return (
                    <details key={m.uid} id={`med-${m.uid}`} className="group scroll-mt-24 rounded-2xl border border-teal/10 bg-white shadow-sm">
                      <summary className="flex cursor-pointer list-none items-center gap-3 p-5 sm:px-7 [&::-webkit-details-marker]:hidden">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[1rem] font-semibold text-steel">{String(m.values.nome || 'Novo profissional')}</p>
                          <p className="mb-2 truncate text-[0.78rem] text-steel/50">{String(m.values.especialidade || '—')}{m.values.registro ? ` · ${m.values.registro}` : ''}</p>
                          <Barra {...p} />
                        </div>
                        <ChevronDown className="h-5 w-5 shrink-0 text-steel/40 transition group-open:rotate-180" />
                      </summary>
                      <div className="border-t border-teal/8 px-5 pb-6 pt-4 sm:px-7">
                        <div className="mb-5 flex flex-wrap gap-2">
                          {m.slug && (
                            <button type="button" onClick={() => copiarLink(m)} className="inline-flex items-center gap-1.5 rounded-lg border border-teal/20 px-3 py-1.5 text-[0.78rem] text-teal hover:bg-teal/5">
                              <Link2 className="h-3.5 w-3.5" /> Copiar link individual
                            </button>
                          )}
                          <button type="button" onClick={() => baixarMedico(m)} className="inline-flex items-center gap-1.5 rounded-lg border border-teal/20 px-3 py-1.5 text-[0.78rem] text-teal hover:bg-teal/5">
                            <Download className="h-3.5 w-3.5" /> JSON deste profissional
                          </button>
                          <button type="button" onClick={() => removerMedico(m)} className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-1.5 text-[0.78rem] text-red-700 hover:bg-red-50">
                            <Trash2 className="h-3.5 w-3.5" /> Remover
                          </button>
                        </div>
                        {CAMPOS_MEDICO.map(s => (
                          <div key={s.id} className="mb-2">
                            <h4 className="mb-3 mt-2 text-[0.75rem] font-bold uppercase tracking-[.1em] text-teal/70">{s.title}</h4>
                            {s.fields.map(f => (
                              <Campo key={f.id} f={f} value={m.values[f.id]} escopo={`m-${m.uid}`} onChange={v => setMedico(m.uid, f.id, v)} />
                            ))}
                          </div>
                        ))}
                      </div>
                    </details>
                  )
                })}

                <button type="button" onClick={adicionarMedico} className="flex w-full items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-teal/25 py-4 text-[0.9rem] font-medium text-teal transition hover:border-teal/50 hover:bg-teal/5">
                  <Plus className="h-4 w-4" /> Adicionar profissional
                </button>
                </>}
              </>
            )}

            {modo === 'medico' && medicoUnico && CAMPOS_MEDICO.map((s, i) => (
              <SecaoCard key={s.id} s={s} numero={`${i + 1}.`} values={medicoUnico.values} escopo="m" onChange={(id, v) => setMedico(medicoUnico.uid, id, v)} />
            ))}

            {modo === 'medico' && medicoUnico && (
              <FotoSecao escopo={escopo} codigo={servidorAtivo ? servidor.codigo : null} />
            )}

            {/* Finalizar */}
            <section className="rounded-2xl border border-teal/15 bg-teal p-5 text-white shadow-sm sm:p-7">
              <h3 className="mb-1 text-[1.05rem] font-semibold">{servidorAtivo ? 'Enviar respostas' : 'Finalizar e exportar'}</h3>
              {servidorAtivo && (
                <div className="mb-4">
                  <p className="mb-3 text-[0.84rem] leading-relaxed text-white/75">
                    Suas respostas são salvas automaticamente enquanto você preenche, e você pode continuar em outro aparelho pelo mesmo link. Quando terminar, toque em <strong>Enviar respostas</strong>.
                  </p>
                  {servidor.finalizadoEm && (
                    <p className="mb-3 inline-flex items-center gap-1.5 rounded-lg bg-white/10 px-3 py-1.5 text-[0.8rem]">
                      <Check className="h-3.5 w-3.5" /> Enviado em {new Date(servidor.finalizadoEm).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', hour: '2-digit', minute: '2-digit' })}. Alterações depois disso continuam sendo salvas.
                    </p>
                  )}
                  <div>
                    <button type="button" onClick={enviar} disabled={servidor.status === 'salvando'} className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 text-[0.92rem] font-semibold text-ink hover:bg-gold-light disabled:opacity-60">
                      <Check className="h-4 w-4" /> {servidor.finalizadoEm ? 'Enviar de novo' : 'Enviar respostas'}
                    </button>
                  </div>
                  <p className="mt-4 text-[0.74rem] text-white/50">Se quiser uma cópia, use os botões abaixo.</p>
                </div>
              )}
              <p className={`mb-5 text-[0.84rem] leading-relaxed text-white/70 ${servidorAtivo ? 'hidden' : ''}`}>
                {modo === 'completo'
                  ? 'Gere o PDF (use "Salvar como PDF" na janela de impressão) e o JSON para enviar à Dr.IAgenda. A Parte A e cada profissional também podem ser exportados separadamente.'
                  : modo === 'clinica'
                  ? 'Gere o PDF (use "Salvar como PDF" na janela de impressão) e o JSON da Parte A. Envie o JSON para quem está consolidando a anamnese: ele é importado no formulário principal.'
                  : 'Gere o PDF e o JSON das suas respostas e envie para a gestão da clínica, que vai juntá-las ao formulário principal.'}
              </p>
              <div className="flex flex-wrap gap-2.5">
                <button type="button" onClick={() => window.print()} className={servidorAtivo ? 'inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-[0.86rem] font-medium hover:bg-white/10' : 'inline-flex items-center gap-2 rounded-xl bg-gold px-4 py-2.5 text-[0.86rem] font-semibold text-ink hover:bg-gold-light'}>
                  <FileText className="h-4 w-4" /> Exportar PDF
                </button>
                {modo === 'completo' ? (
                  <>
                    <button type="button" onClick={baixarCompleto} className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-[0.86rem] font-medium hover:bg-white/10">
                      <Download className="h-4 w-4" /> JSON completo
                    </button>
                    <button type="button" onClick={baixarClinica} className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-[0.86rem] font-medium hover:bg-white/10">
                      <Download className="h-4 w-4" /> JSON só da Parte A
                    </button>
                  </>
                ) : modo === 'clinica' ? (
                  <button type="button" onClick={baixarClinica} className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-[0.86rem] font-medium hover:bg-white/10">
                    <Download className="h-4 w-4" /> Baixar JSON
                  </button>
                ) : medicoUnico && (
                  <button type="button" onClick={() => baixarMedico(medicoUnico)} className="inline-flex items-center gap-2 rounded-xl border border-white/30 px-4 py-2.5 text-[0.86rem] font-medium hover:bg-white/10">
                    <Download className="h-4 w-4" /> Baixar JSON
                  </button>
                )}
                <button type="button" onClick={limpar} className="inline-flex items-center gap-2 rounded-xl px-3 py-2.5 text-[0.8rem] text-white/60 hover:text-white">
                  <RotateCcw className="h-3.5 w-3.5" /> Limpar rascunho
                </button>
              </div>
            </section>
          </main>
        </div>
      </div>

      <input ref={inputImport} type="file" accept="application/json,.json" className="hidden"
        onChange={e => { const f = e.target.files?.[0]; if (f) importar(f); e.target.value = '' }} />

      {aviso && (
        <div role="status" className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-sm rounded-xl bg-ink px-4 py-3 text-center text-[0.85rem] text-white shadow-lg print:hidden">{aviso}</div>
      )}

      <div className="px-2">
        <Impressao clinica={temClinica ? estado.clinica : undefined} medicos={temMedicos || modo === 'medico' ? estado.medicos : []} />
      </div>
    </div>
  )
}
