'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { AlertTriangle, Check, ChevronDown, Copy, Download, FileSpreadsheet, Loader2, RefreshCw, ShieldCheck } from 'lucide-react'
import { PaginaPrevia } from '@/components/anamnese-ia/PaginaPrevia'
import { CONTEUDO_VAZIO, ETAPAS, iniciais, type ConteudoPagina, type Etapa } from '@/lib/anamnese-ia/pagina'

type Profissional = {
  escopo: string; nome: string; slug: string
  linkAnamnese: string; linkAprovacao: string
  etapa: Etapa; rotulo: string; detalhe: string
  podePublicar: boolean; faltaParaPublicar: string[]; alerta: string | null
  opcao: 'enviada' | 'clinica' | 'sem-foto' | null
  foto: { id: string; em: string; largura: number; altura: number; tipoEnviado: string } | null
  totalEnvios: number; tentativas: number; limiteTentativas: number
  aprovacaoClinica: { fotoId: string | null; porNome: string; em: string } | null
  termo: { versao: string; em: string; fotoId: string | null } | null
  revogadoEm: string | null
  totalRegistros: number; correnteOk: boolean
  texto: { versao: number; conteudo: ConteudoPagina; em: string; por: string } | null
  aprovacaoMedico: { em: string; textoVersao: number } | null
  ultimaAprovacaoMedicoEm: string | null
  ajustes: { em: string; pedido: string } | null
  publicadaEm: string | null
}

const data = (iso?: string | null) => iso ? new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: '2-digit', hour: '2-digit', minute: '2-digit' }) : '–'

const COR: Record<Etapa, string> = {
  'sem-foto':          'bg-steel/10 text-steel/70',
  'foto-enviada':      'bg-gold/15 text-gold-dark',
  'foto-aprovada':     'bg-mist text-teal',
  'aguardando-medico': 'bg-gold/15 text-gold-dark',
  'pagina-aprovada':   'bg-teal/10 text-teal',
  'publicada':         'bg-teal text-white',
}

const botao = 'inline-flex items-center gap-1.5 rounded-lg border border-teal/20 px-3 py-1.5 text-[0.8rem] text-teal hover:bg-teal/5 disabled:opacity-50'
const botaoForte = 'inline-flex items-center gap-1.5 rounded-lg bg-teal px-3.5 py-2 text-[0.82rem] font-semibold text-white hover:bg-teal/90 disabled:opacity-50'

function Cartao({ p, codigo, acao, ocupado }: {
  p: Profissional; codigo: string
  acao: (escopo: string, acao: string, extra?: Record<string, unknown>) => Promise<unknown>
  ocupado: boolean
}) {
  const [conteudo, setConteudo] = useState<ConteudoPagina>(p.texto?.conteudo ?? CONTEUDO_VAZIO)
  const [motivo, setMotivo] = useState('')
  const arquivo = (v: string, baixar = false) => p.foto
    ? `/api/anamnese-ia/foto/arquivo?escopo=${encodeURIComponent(p.escopo)}&c=${encodeURIComponent(codigo)}&id=${p.foto.id}&v=${v}${baixar ? '&baixar=1' : ''}`
    : ''
  const fotoPagina = p.opcao === 'enviada' && p.foto ? arquivo('v45') : null
  const alterado = JSON.stringify(conteudo) !== JSON.stringify(p.texto?.conteudo ?? CONTEUDO_VAZIO)
  const copiar = async (caminho: string) => {
    const url = `${window.location.origin}${caminho}`
    try { await navigator.clipboard.writeText(url) } catch { window.prompt('Copie o link:', url) }
  }
  const campo = 'w-full rounded-lg border border-teal/15 bg-white px-3 py-2 text-[0.86rem] text-steel outline-none focus:border-teal'

  return (
    <details className="group rounded-2xl border border-teal/10 bg-white shadow-sm">
      <summary className="flex cursor-pointer list-none items-center gap-3 p-4 sm:px-5 [&::-webkit-details-marker]:hidden">
        {p.foto && p.opcao === 'enviada'
          // eslint-disable-next-line @next/next/no-img-element
          ? <img src={arquivo('v11')} alt="" className="h-12 w-12 shrink-0 rounded-full border border-teal/10 object-cover" />
          : <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-teal/10 text-[0.9rem] font-medium text-teal">{iniciais(p.nome)}</span>}
        <div className="min-w-0 flex-1">
          <p className="truncate text-[0.95rem] font-semibold text-steel">{p.nome}</p>
          <p className="mt-0.5 flex flex-wrap items-center gap-x-2 gap-y-1 text-[0.74rem] text-steel/55">
            <span className={`rounded-full px-2 py-0.5 font-medium ${COR[p.etapa]}`}>{p.rotulo}</span>
            {p.detalhe && <span>{p.detalhe}</span>}
            {p.alerta && <span className="inline-flex items-center gap-1 text-red-700"><AlertTriangle className="h-3.5 w-3.5" />{p.alerta}</span>}
          </p>
        </div>
        <dl className="hidden shrink-0 grid-cols-3 gap-x-4 text-[0.72rem] text-steel/60 lg:grid">
          <div><dt className="text-steel/40">Termo</dt><dd>{p.termo ? `v${p.termo.versao} · ${data(p.termo.em)}` : p.revogadoEm ? `revogado ${data(p.revogadoEm)}` : '–'}</dd></div>
          <div><dt className="text-steel/40">Aprovação do médico</dt><dd>{data(p.aprovacaoMedico?.em)}</dd></div>
          <div><dt className="text-steel/40">Publicada</dt><dd>{data(p.publicadaEm)}</dd></div>
        </dl>
        <ChevronDown className="h-5 w-5 shrink-0 text-steel/40 transition group-open:rotate-180" />
      </summary>

      <div className="space-y-6 border-t border-teal/8 p-4 sm:p-5">
        <dl className="grid grid-cols-2 gap-3 text-[0.8rem] text-steel/70 sm:grid-cols-4">
          <div><dt className="text-[0.7rem] uppercase tracking-wide text-steel/40">Termo aceito</dt><dd>{p.termo ? `Versão ${p.termo.versao}` : '–'}</dd></div>
          <div><dt className="text-[0.7rem] uppercase tracking-wide text-steel/40">Data da autorização</dt><dd>{data(p.termo?.em)}</dd></div>
          <div><dt className="text-[0.7rem] uppercase tracking-wide text-steel/40">Aprovação da clínica</dt><dd>{p.aprovacaoClinica ? `${p.aprovacaoClinica.porNome} · ${data(p.aprovacaoClinica.em)}` : '–'}</dd></div>
          <div><dt className="text-[0.7rem] uppercase tracking-wide text-steel/40">Aprovação do médico</dt><dd>{p.aprovacaoMedico ? `Texto v${p.aprovacaoMedico.textoVersao} · ${data(p.aprovacaoMedico.em)}` : p.ultimaAprovacaoMedicoEm ? `Versão anterior (${data(p.ultimaAprovacaoMedicoEm)})` : '–'}</dd></div>
        </dl>
        {!p.correnteOk && (
          <p className="flex gap-2 rounded-xl bg-red-50 p-3 text-[0.82rem] text-red-800"><AlertTriangle className="h-4 w-4 shrink-0" /> Os registros de autorização deste profissional foram alterados fora do sistema. Confira no Sanity antes de usar.</p>
        )}

        <div className="flex flex-wrap gap-2">
          <button type="button" className={botao} onClick={() => copiar(p.linkAnamnese)}><Copy className="h-3.5 w-3.5" /> Link da anamnese</button>
          <button type="button" className={botao} onClick={() => copiar(p.linkAprovacao)}><Copy className="h-3.5 w-3.5" /> Link de aprovação da página</button>
        </div>

        {/* Foto */}
        <section>
          <h3 className="mb-2 text-[0.78rem] font-bold uppercase tracking-[.1em] text-teal/70">Foto</h3>
          {p.opcao === 'enviada' && p.foto ? (
            <div className="flex flex-wrap items-start gap-4">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={arquivo('v45')} alt="" className="aspect-[4/5] w-32 rounded-xl border border-teal/10 object-cover" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={arquivo('v11')} alt="" className="aspect-square w-28 rounded-xl border border-teal/10 object-cover" />
              <div className="text-[0.8rem] text-steel/65">
                <p>Enviada em {data(p.foto.em)} · original {p.foto.largura} × {p.foto.altura} px ({p.foto.tipoEnviado.toUpperCase()})</p>
                <p>{p.totalEnvios} envio(s) no histórico · {p.tentativas} de {p.limiteTentativas} tentativas usadas</p>
                <div className="mt-2 flex flex-wrap gap-2">
                  <a className={botao} href={arquivo('original', true)}><Download className="h-3.5 w-3.5" /> Original</a>
                  <a className={botao} href={arquivo('v45', true)}><Download className="h-3.5 w-3.5" /> 4:5</a>
                  <a className={botao} href={arquivo('v11', true)}><Download className="h-3.5 w-3.5" /> 1:1</a>
                </div>
              </div>
            </div>
          ) : (
            <p className="text-[0.84rem] text-steel/65">
              {p.opcao === 'clinica' ? 'O profissional pediu que a clínica providencie a foto.' : p.opcao === 'sem-foto' ? 'O profissional não quer foto no site.' : 'Nenhuma foto enviada.'}
              {p.tentativas > 0 && ` ${p.tentativas} de ${p.limiteTentativas} tentativas usadas.`}
            </p>
          )}
          <div className="mt-3 flex flex-wrap gap-2">
            {!p.aprovacaoClinica && (p.opcao === 'sem-foto' || (p.opcao === 'enviada' && p.foto)) && (
              <button type="button" disabled={ocupado} className={botaoForte} onClick={() => acao(p.escopo, 'aprovar-foto')}>
                <Check className="h-4 w-4" /> {p.opcao === 'sem-foto' ? 'Confirmar página sem foto' : 'Aprovar foto'}
              </button>
            )}
            {p.aprovacaoClinica && <button type="button" disabled={ocupado} className={botao} onClick={() => acao(p.escopo, 'desfazer-aprovacao')}>Desfazer aprovação da clínica</button>}
            {p.tentativas >= p.limiteTentativas && <button type="button" disabled={ocupado} className={botao} onClick={() => acao(p.escopo, 'liberar-envios')}>Liberar mais 5 envios</button>}
          </div>
        </section>

        {/* Texto */}
        <section>
          <h3 className="mb-2 text-[0.78rem] font-bold uppercase tracking-[.1em] text-teal/70">Texto da página {p.texto && <span className="font-normal normal-case tracking-normal text-steel/45">· versão {p.texto.versao}, {data(p.texto.em)}, por {p.texto.por}</span>}</h3>
          {p.ajustes && (
            <div className="mb-3 rounded-xl bg-gold/10 p-3 text-[0.84rem] text-steel/80">
              <p className="mb-1 font-medium text-gold-dark">Pedido de ajustes do médico ({data(p.ajustes.em)}):</p>
              <p className="whitespace-pre-line">{p.ajustes.pedido}</p>
            </div>
          )}
          <div className="grid gap-3 lg:grid-cols-2">
            <div className="grid gap-2.5">
              {([
                ['nome', 'Nome', 1], ['registro', 'Registro profissional', 1], ['especialidade', 'Especialidade', 1],
                ['areas', 'Áreas de atuação (separe com ·)', 2], ['bio', 'Apresentação', 6], ['instagram', 'Instagram', 1],
              ] as const).map(([k, rotulo, linhas]) => (
                <label key={k} className="text-[0.78rem] font-medium text-steel/70">
                  {rotulo}
                  {linhas > 1
                    ? <textarea rows={linhas} className={`${campo} mt-1`} value={conteudo[k]} onChange={e => setConteudo({ ...conteudo, [k]: e.target.value })} />
                    : <input type="text" className={`${campo} mt-1`} value={conteudo[k]} onChange={e => setConteudo({ ...conteudo, [k]: e.target.value })} />}
                </label>
              ))}
              <div className="flex flex-wrap gap-2">
                <button type="button" disabled={ocupado} className={botao} onClick={async () => {
                  const r = await acao(p.escopo, 'rascunho-texto') as { conteudo?: ConteudoPagina } | null
                  if (r?.conteudo) setConteudo(r.conteudo)
                }}>Preencher com a anamnese</button>
                <button type="button" disabled={ocupado || !alterado || !conteudo.nome.trim()} className={botaoForte} onClick={() => acao(p.escopo, 'salvar-texto', { conteudo })}>
                  Salvar como versão {(p.texto?.versao ?? 0) + 1}
                </button>
              </div>
              {alterado && p.texto && <p className="text-[0.76rem] text-gold-dark">Salvar uma versão nova pede uma nova aprovação do médico.</p>}
            </div>
            <div>
              <p className="mb-1.5 text-[0.74rem] text-steel/45">Prévia{alterado ? ' (com as alterações ainda não salvas)' : ''}</p>
              <PaginaPrevia conteudo={conteudo} foto={fotoPagina} />
            </div>
          </div>
        </section>

        {/* Publicação */}
        <section>
          <h3 className="mb-2 text-[0.78rem] font-bold uppercase tracking-[.1em] text-teal/70">Publicação</h3>
          <p className="mb-2 text-[0.8rem] text-steel/60">A publicação no site é feita no código, depois de tudo aprovado. Marque aqui quando a página for ao ar.</p>
          {!p.podePublicar && <p className="mb-2 text-[0.8rem] text-steel/70">Ainda falta: {p.faltaParaPublicar.join('; ')}.</p>}
          <div className="flex flex-wrap gap-2">
            <button type="button" disabled={ocupado || !p.podePublicar || !!p.publicadaEm} className={botaoForte} onClick={() => acao(p.escopo, 'publicar')}>Marcar como publicada</button>
            {(p.publicadaEm || p.alerta) && <button type="button" disabled={ocupado} className={botao} onClick={() => acao(p.escopo, 'retirar')}>Marcar como retirada do site</button>}
          </div>
        </section>

        {/* Revogação */}
        {p.termo && (
          <section>
            <h3 className="mb-2 text-[0.78rem] font-bold uppercase tracking-[.1em] text-red-800/70">Revogar autorização</h3>
            <p className="mb-2 text-[0.8rem] text-steel/60">Use quando o profissional pedir. Cria um registro novo (o aceite continua no histórico) e tira a aprovação da foto. Retire a imagem do site em até 10 dias úteis.</p>
            <div className="flex flex-wrap gap-2">
              <input type="text" value={motivo} onChange={e => setMotivo(e.target.value)} placeholder='Como chegou o pedido (ex.: "WhatsApp, 10/11, pela própria médica")' className={`${campo} max-w-md flex-1`} />
              <button type="button" disabled={ocupado || !motivo.trim()} className="inline-flex items-center gap-1.5 rounded-lg border border-red-300 px-3 py-1.5 text-[0.8rem] text-red-800 hover:bg-red-50 disabled:opacity-50"
                onClick={() => { if (window.confirm(`Registrar a revogação da autorização de ${p.nome}?`)) acao(p.escopo, 'revogar', { motivo }) }}>
                Registrar revogação
              </button>
            </div>
          </section>
        )}
      </div>
    </details>
  )
}

export function Painel() {
  const [codigo, setCodigo] = useState<string | null | undefined>(undefined)
  const [dados, setDados] = useState<{ gestorNome: string; profissionais: Profissional[] } | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [aviso, setAviso] = useState<string | null>(null)
  const [ocupado, setOcupado] = useState(false)
  const [filtro, setFiltro] = useState<Etapa | 'todos'>('todos')
  const [chave, setChave] = useState(0)

  useEffect(() => {
    try { setCodigo(new URLSearchParams(window.location.search).get('c')) } catch { setCodigo(null) }
  }, [])

  const carregar = useCallback(async () => {
    if (!codigo) return
    try {
      const r = await fetch(`/api/anamnese-ia/painel?c=${encodeURIComponent(codigo)}`, { cache: 'no-store' })
      const d = await r.json()
      if (!r.ok) throw new Error(d.erro || 'Erro ao carregar')
      setDados(d); setErro(null)
    } catch (e) { setErro(e instanceof Error ? e.message : 'Erro ao carregar') }
  }, [codigo])
  useEffect(() => { carregar() }, [carregar])

  useEffect(() => {
    if (!aviso) return
    const t = setTimeout(() => setAviso(null), 3500)
    return () => clearTimeout(t)
  }, [aviso])

  const acao = async (escopo: string, nome: string, extra: Record<string, unknown> = {}) => {
    if (!codigo) return null
    setOcupado(true)
    try {
      const r = await fetch('/api/anamnese-ia/painel', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ c: codigo, escopo, acao: nome, ...extra }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d.erro || 'Não foi possível concluir.')
      if (nome !== 'rascunho-texto') {
        setAviso('Feito.')
        await carregar()
        if (nome === 'salvar-texto') setChave(n => n + 1)
      }
      return d
    } catch (e) { setAviso(e instanceof Error ? e.message : 'Não foi possível concluir.'); return null }
    finally { setOcupado(false) }
  }

  const lista = dados?.profissionais.filter(p => filtro === 'todos' || p.etapa === filtro) ?? []

  return (
    <div className="min-h-screen bg-cloud font-sans">
      <header className="sticky top-0 z-30 border-b border-teal/10 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <Image src="/images/logo.svg" alt="NU.V.E.M Medicina" width={120} height={32} className="h-7 w-auto" priority />
          {dados && <p className="text-right text-[0.74rem] text-steel/55">{dados.gestorNome}</p>}
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[.14em] text-gold-dark">Uso interno</p>
        <h1 className="mb-2 font-serif text-[2rem] font-medium leading-tight text-teal">Fotos e páginas <em>dos médicos</em></h1>
        <p className="mb-6 max-w-3xl text-[0.9rem] text-steel/60">Acompanhe as fotos, as autorizações de uso de imagem e as aprovações. Uma página só vai ao ar com autorização aceita (ou sem foto), aprovação do médico e aprovação da clínica.</p>

        {codigo === null && <p className="rounded-xl bg-mist/40 p-4 text-[0.88rem] text-steel/70">Abra o painel pelo link com o seu código.</p>}
        {erro && <p role="alert" className="rounded-xl bg-red-50 p-3 text-[0.86rem] text-red-800">{erro}</p>}
        {codigo && !dados && !erro && <p className="flex items-center gap-2 text-[0.88rem] text-steel/55"><Loader2 className="h-4 w-4 animate-spin" /> Carregando…</p>}

        {dados && codigo && (
          <>
            <div className="mb-4 flex flex-wrap items-center gap-2">
              <a href={`/api/anamnese-ia/painel/autorizacoes?c=${encodeURIComponent(codigo)}`} className={botaoForte}><FileSpreadsheet className="h-4 w-4" /> Baixar registro de autorizações (CSV)</a>
              <button type="button" className={botao} onClick={carregar}><RefreshCw className="h-3.5 w-3.5" /> Atualizar</button>
              <select value={filtro} onChange={e => setFiltro(e.target.value as Etapa | 'todos')} className="rounded-lg border border-teal/20 bg-white px-2.5 py-1.5 text-[0.8rem] text-steel">
                <option value="todos">Todos os status ({dados.profissionais.length})</option>
                {(Object.keys(ETAPAS) as Etapa[]).map(e => (
                  <option key={e} value={e}>{ETAPAS[e]} ({dados.profissionais.filter(p => p.etapa === e).length})</option>
                ))}
              </select>
            </div>
            <div className="space-y-3">
              {lista.map(p => <Cartao key={`${p.escopo}-${p.texto?.versao ?? 0}-${chave}`} p={p} codigo={codigo} acao={acao} ocupado={ocupado} />)}
              {lista.length === 0 && <p className="text-[0.86rem] text-steel/55">Ninguém neste status.</p>}
            </div>
          </>
        )}
        <p className="mt-8 flex gap-2 text-[0.76rem] text-steel/45"><ShieldCheck className="h-4 w-4 shrink-0" /> Página interna, fora das buscas e sem medição. Não compartilhe o link.</p>
      </main>
      {aviso && <div role="status" className="fixed inset-x-4 bottom-4 z-40 mx-auto max-w-sm rounded-xl bg-ink px-4 py-3 text-center text-[0.85rem] text-white shadow-lg">{aviso}</div>}
    </div>
  )
}
