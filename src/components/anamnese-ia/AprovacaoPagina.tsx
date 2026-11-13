'use client'

import { useCallback, useEffect, useState } from 'react'
import Image from 'next/image'
import { Check, Loader2, MessageSquare, ShieldCheck } from 'lucide-react'
import { PaginaPrevia } from '@/components/anamnese-ia/PaginaPrevia'
import type { ConteudoPagina, Etapa } from '@/lib/anamnese-ia/pagina'

type Dados = {
  etapa: Etapa
  rotulo: string
  texto: { versao: number; conteudo: ConteudoPagina; em: string } | null
  fotoId: string | null
  prontaParaAprovar: boolean
  decisaoAtual: { tipo: 'aprovou' | 'ajustes'; em: string; pedido: string } | null
  publicada: boolean
}

const dataHora = (iso: string) => new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

/** Aprovação final da página pelo profissional. */
export function AprovacaoPagina({ slug }: { slug: string }) {
  const escopo = `medico-${slug}`
  const [codigo, setCodigo] = useState<string | null | undefined>(undefined)
  const [dados, setDados] = useState<Dados | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [ocupado, setOcupado] = useState(false)
  const [ajustando, setAjustando] = useState(false)
  const [pedido, setPedido] = useState('')

  useEffect(() => {
    try { setCodigo(new URLSearchParams(window.location.search).get('c')) } catch { setCodigo(null) }
  }, [])

  const carregar = useCallback(async () => {
    if (!codigo) return
    setErro(null)
    try {
      const r = await fetch(`/api/anamnese-ia/pagina?escopo=${encodeURIComponent(escopo)}&c=${encodeURIComponent(codigo)}`, { cache: 'no-store' })
      const d = await r.json()
      if (!r.ok) throw new Error(r.status === 403 ? 'Link antigo ou inválido. Peça o link novo à clínica.' : d.erro || 'Erro ao carregar')
      setDados(d)
    } catch (e) { setErro(e instanceof Error ? e.message : 'Erro ao carregar') }
  }, [codigo, escopo])
  useEffect(() => { carregar() }, [carregar])

  const decidir = async (acao: 'aprovar' | 'ajustes') => {
    if (!dados?.texto || !codigo) return
    setOcupado(true); setErro(null)
    try {
      const r = await fetch('/api/anamnese-ia/pagina', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ escopo, c: codigo, acao, textoVersao: dados.texto.versao, fotoId: dados.fotoId, pedido }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d.erro || 'Não foi possível registrar agora.')
      setAjustando(false); setPedido('')
      await carregar()
    } catch (e) { setErro(e instanceof Error ? e.message : 'Não foi possível registrar agora.') }
    finally { setOcupado(false) }
  }

  const foto = dados?.fotoId && codigo
    ? `/api/anamnese-ia/foto/arquivo?escopo=${encodeURIComponent(escopo)}&c=${encodeURIComponent(codigo)}&id=${dados.fotoId}&v=v45`
    : null

  return (
    <div className="min-h-screen bg-cloud font-sans">
      <header className="border-b border-teal/10 bg-white">
        <div className="mx-auto flex max-w-4xl items-center px-4 py-3">
          <Image src="/images/logo.svg" alt="NU.V.E.M Medicina" width={120} height={32} className="h-7 w-auto" priority />
        </div>
      </header>
      <main className="mx-auto max-w-4xl px-4 py-8 sm:py-12">
        <p className="mb-2 text-[0.72rem] font-semibold uppercase tracking-[.14em] text-gold-dark">Sua página no site</p>
        <h1 className="mb-3 font-serif text-[2rem] font-medium leading-tight text-teal">Aprovação da <em>sua página</em></h1>
        <p className="mb-6 max-w-2xl text-[0.95rem] leading-relaxed text-steel/65">Confira a foto e o texto. A página só vai ao ar depois da sua aprovação e da aprovação da clínica.</p>

        {codigo === null && <p className="rounded-xl bg-mist/40 p-4 text-[0.88rem] text-steel/70">Abra o link que a clínica mandou para você.</p>}
        {codigo && !dados && !erro && <p className="flex items-center gap-2 text-[0.88rem] text-steel/55"><Loader2 className="h-4 w-4 animate-spin" /> Carregando…</p>}

        {dados && !dados.texto && (
          <p className="rounded-xl bg-mist/40 p-4 text-[0.88rem] text-steel/70">A clínica ainda está preparando o texto da sua página. Avisaremos quando estiver pronto.</p>
        )}

        {dados?.texto && (
          <>
            <PaginaPrevia conteudo={dados.texto.conteudo} foto={foto} />
            <p className="mt-2 text-[0.76rem] text-steel/50">Versão {dados.texto.versao} do texto, de {dataHora(dados.texto.em)}. {dados.fotoId ? 'Foto aplicada no formato do site (4:5).' : 'Página sem foto, com as suas iniciais.'}</p>

            <section className="mt-6 rounded-2xl border border-teal/15 bg-white p-5 shadow-sm sm:p-7">
              {dados.decisaoAtual?.tipo === 'aprovou' ? (
                <p className="inline-flex items-center gap-2 text-[0.92rem] font-medium text-teal"><Check className="h-5 w-5" /> Você aprovou esta versão em {dataHora(dados.decisaoAtual.em)}. Obrigado!</p>
              ) : dados.decisaoAtual?.tipo === 'ajustes' && !ajustando ? (
                <div className="text-[0.9rem] text-steel/75">
                  <p className="mb-2 font-medium text-teal">Recebemos seu pedido de ajustes em {dataHora(dados.decisaoAtual.em)}.</p>
                  <p className="mb-3 whitespace-pre-line rounded-xl bg-mist/30 p-3">{dados.decisaoAtual.pedido}</p>
                  <p>A clínica vai preparar uma nova versão e te avisar.</p>
                </div>
              ) : !dados.prontaParaAprovar ? (
                <p className="text-[0.9rem] text-steel/70">A clínica ainda está conferindo a foto. Assim que terminar, você poderá aprovar por aqui.</p>
              ) : (
                <>
                  <h2 className="mb-1 text-[1.05rem] font-semibold text-teal">Está tudo certo?</h2>
                  <p className="mb-4 text-[0.86rem] text-steel/60">Sua aprovação vale para esta versão do texto e da foto. Se algo mudar, pediremos de novo.</p>
                  {ajustando ? (
                    <>
                      <label htmlFor="pedido" className="mb-1.5 block text-[0.88rem] font-medium text-steel">O que você quer ajustar?</label>
                      <textarea id="pedido" rows={4} value={pedido} onChange={e => setPedido(e.target.value)}
                        className="mb-3 w-full rounded-xl border border-teal/15 bg-white px-3.5 py-2.5 text-[0.92rem] text-steel outline-none focus:border-teal focus:ring-2 focus:ring-teal/15" />
                      <div className="flex flex-wrap gap-2.5">
                        <button type="button" disabled={ocupado || !pedido.trim()} onClick={() => decidir('ajustes')} className="inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 text-[0.9rem] font-semibold text-white disabled:opacity-50">
                          {ocupado ? <Loader2 className="h-4 w-4 animate-spin" /> : <MessageSquare className="h-4 w-4" />} Enviar pedido
                        </button>
                        <button type="button" onClick={() => setAjustando(false)} className="px-3 text-[0.84rem] text-steel/60 hover:underline">Voltar</button>
                      </div>
                    </>
                  ) : (
                    <div className="flex flex-wrap gap-2.5">
                      <button type="button" disabled={ocupado} onClick={() => decidir('aprovar')} className="inline-flex items-center gap-2 rounded-xl bg-gold px-5 py-3 text-[0.92rem] font-semibold text-ink hover:bg-gold-light disabled:opacity-50">
                        {ocupado ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} Aprovo a publicação
                      </button>
                      <button type="button" disabled={ocupado} onClick={() => setAjustando(true)} className="inline-flex items-center gap-2 rounded-xl border border-teal/25 px-5 py-3 text-[0.92rem] font-medium text-teal hover:bg-teal/5">
                        <MessageSquare className="h-4 w-4" /> Quero ajustes
                      </button>
                    </div>
                  )}
                </>
              )}
            </section>
          </>
        )}

        {erro && <p role="alert" className="mt-4 rounded-xl bg-red-50 p-3 text-[0.86rem] text-red-800">{erro}</p>}
        <p className="mt-8 flex gap-2 text-[0.76rem] text-steel/45"><ShieldCheck className="h-4 w-4 shrink-0" /> Página interna, fora das buscas. Nada desta página vai para ferramentas de medição.</p>
      </main>
    </div>
  )
}
