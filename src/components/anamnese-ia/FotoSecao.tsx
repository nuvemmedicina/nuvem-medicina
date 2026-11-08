'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { upload } from '@vercel/blob/client'
import { Camera, Check, ImageOff, Building2, Loader2, RefreshCw } from 'lucide-react'
import { FOTO, tipoPeloConteudo, type EstadoFotoPublico, type OpcaoFoto, type TipoFoto } from '@/lib/anamnese-ia/foto'

/**
 * Seção "Sua foto para o site" da anamnese do profissional.
 * Só funciona com o código do link (?c=...). A foto vai direto do aparelho
 * para o armazenamento privado e é processada no servidor.
 */

const MIME: Record<TipoFoto, string> = { jpeg: 'image/jpeg', png: 'image/png', webp: 'image/webp', heic: 'image/heic' }
const EXT:  Record<TipoFoto, string> = { jpeg: 'jpg', png: 'png', webp: 'webp', heic: 'heic' }

type Escolhida = { file: File; tipo: TipoFoto; url: string | null; largura?: number; altura?: number }

const MSG_HEIC = 'Este navegador não abre fotos HEIC, o formato padrão do iPhone. Envie a foto em JPG: pelo próprio iPhone ela já vai convertida; no computador, abra a foto e exporte como JPG.'

/**
 * Converte HEIC em JPEG no próprio aparelho (Safari abre HEIC; Chrome e Edge
 * no Windows, não). O desenho no canvas já sai sem metadados. Limita o lado
 * maior a 4096 px, abaixo do limite de canvas do iPhone. Devolve null se o
 * navegador não conseguir abrir a foto.
 */
async function heicParaJpeg(file: File): Promise<File | null> {
  let bmp: ImageBitmap
  try { bmp = await createImageBitmap(file, { imageOrientation: 'from-image' }) } catch { return null }
  try {
    const escala = Math.min(1, 4096 / Math.max(bmp.width, bmp.height))
    const c = document.createElement('canvas')
    c.width = Math.round(bmp.width * escala)
    c.height = Math.round(bmp.height * escala)
    const ctx = c.getContext('2d')
    if (!ctx) return null
    ctx.drawImage(bmp, 0, 0, c.width, c.height)
    const blob = await new Promise<Blob | null>(r => c.toBlob(r, 'image/jpeg', 0.92))
    return blob ? new File([blob], 'foto.jpg', { type: 'image/jpeg' }) : null
  } catch { return null }
  finally { bmp.close() }
}

const dataHora = (iso: string) => new Date(iso).toLocaleString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' })

/** Duas molduras, como a foto vai aparecer no site e no Instagram. */
function Molduras({ src, src11, legenda }: { src: string; src11?: string; legenda?: string }) {
  return (
    <div>
      <div className="flex flex-wrap items-end gap-4">
        {(['v45', 'v11'] as const).map(v => (
          <figure key={v} className="m-0">
            <div className={`${v === 'v45' ? 'aspect-[4/5] w-40 sm:w-48' : 'aspect-square w-36 sm:w-40'} overflow-hidden rounded-xl border border-teal/15 bg-mist/40 shadow-sm`}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={v === 'v11' && src11 ? src11 : src} alt={`Prévia ${FOTO.versoes[v].rotulo}`} className="h-full w-full object-cover" style={{ objectPosition: `50% ${FOTO.topo * 100}%` }} />
            </div>
            <figcaption className="mt-1.5 text-center text-[0.74rem] text-steel/55">{FOTO.versoes[v].rotulo}</figcaption>
          </figure>
        ))}
      </div>
      {legenda && <p className="mt-2 text-[0.76rem] text-steel/50">{legenda}</p>}
    </div>
  )
}

export function FotoSecao({ escopo, codigo, children, podeEnviar = true, aoEnviar }: {
  escopo: string
  codigo: string | null
  /** Conteúdo antes do botão de envio (o termo de autorização). */
  children?: React.ReactNode
  /** Falso enquanto falta algo (por exemplo, o aceite do termo). */
  podeEnviar?: boolean
  /** Dados extras enviados junto com o processamento da foto. */
  aoEnviar?: () => Record<string, unknown>
}) {
  const [estado, setEstado] = useState<(EstadoFotoPublico & { envioConfigurado?: boolean }) | null>(null)
  const [erroCarga, setErroCarga] = useState(false)
  const [escolha, setEscolha] = useState<OpcaoFoto>('enviada')
  const [arquivo, setArquivo] = useState<Escolhida | null>(null)
  const [erro, setErro] = useState<string | null>(null)
  const [ocupado, setOcupado] = useState<string | null>(null)
  const [trocando, setTrocando] = useState(false)
  const [versao, setVersao] = useState(0)
  const input = useRef<HTMLInputElement>(null)

  const carregar = useCallback(async () => {
    if (!codigo) return
    try {
      const r = await fetch(`/api/anamnese-ia/foto?escopo=${encodeURIComponent(escopo)}&c=${encodeURIComponent(codigo)}`, { cache: 'no-store' })
      if (!r.ok) throw new Error(String(r.status))
      const d = await r.json()
      setEstado(d)
      if (d.opcao) setEscolha(d.opcao)
      setErroCarga(false)
    } catch { setErroCarga(true) }
  }, [codigo, escopo])

  useEffect(() => { carregar() }, [carregar])
  useEffect(() => () => { if (arquivo?.url) URL.revokeObjectURL(arquivo.url) }, [arquivo])

  const escolher = async (original: File) => {
    setErro(null)
    setArquivo(null)
    let file = original
    let tipo = tipoPeloConteudo(new Uint8Array(await file.slice(0, 32).arrayBuffer()))
    if (!tipo) { setErro('Este arquivo não é uma foto JPG, PNG, WebP ou HEIC.'); return }

    // HEIC (padrão do iPhone): o servidor não lê. Converte aqui, se o navegador
    // abrir HEIC (Safari); se não abrir, pede JPG com uma explicação clara.
    if (tipo === 'heic') {
      setOcupado('Convertendo a foto…')
      const jpg = await heicParaJpeg(file)
      setOcupado(null)
      if (!jpg) { setErro(MSG_HEIC); return }
      file = jpg; tipo = 'jpeg'
    }

    if (file.size > FOTO.maxBytes) { setErro('A foto passa de 10 MB. Envie uma versão menor.'); return }
    let largura: number, altura: number
    try {
      const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' })
      largura = bmp.width; altura = bmp.height
      bmp.close()
    } catch { setErro('Não conseguimos abrir esta foto. Tente outra, em JPG.'); return }
    if (Math.min(largura, altura) < FOTO.minLado) {
      setErro(`A foto tem ${largura} × ${altura} px. O lado menor precisa ter pelo menos ${FOTO.minLado} px.`)
      return
    }
    setArquivo({ file, tipo, url: URL.createObjectURL(file), largura, altura })
  }

  const enviar = async () => {
    if (!codigo || !arquivo || !podeEnviar) return
    setErro(null)
    setOcupado('Enviando a foto…')
    try {
      const enviado = await upload(`anamnese-ia/envios/${escopo}/foto.${EXT[arquivo.tipo]}`, arquivo.file, {
        access: 'private',
        handleUploadUrl: '/api/anamnese-ia/foto/token',
        clientPayload: JSON.stringify({ escopo, c: codigo }),
        contentType: MIME[arquivo.tipo],
        multipart: arquivo.file.size > 5 * 1024 * 1024,
      })
      setOcupado('Preparando as versões…')
      const r = await fetch('/api/anamnese-ia/foto', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ escopo, c: codigo, acao: 'processar', pathname: enviado.pathname, ...(aoEnviar?.() ?? {}) }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d.erro || 'Não foi possível enviar agora. Tente de novo.')
      setEstado(e => ({ ...e, ...d }))
      setArquivo(null)
      setTrocando(false)
      setVersao(n => n + 1)
    } catch (e) {
      const msg = e instanceof Error ? e.message : ''
      setErro(/client token|Failed to/i.test(msg) || !msg ? 'Não foi possível liberar o envio. Confira a conexão e tente de novo. Se continuar, fale com a clínica.' : msg)
      carregar()
    } finally { setOcupado(null) }
  }

  const salvarOpcao = async (opcao: OpcaoFoto) => {
    setEscolha(opcao)
    setErro(null)
    if (opcao === 'enviada' || !codigo) return
    setOcupado('Salvando…')
    try {
      const r = await fetch('/api/anamnese-ia/foto', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ escopo, c: codigo, acao: 'opcao', opcao }),
      })
      const d = await r.json().catch(() => ({}))
      if (!r.ok) throw new Error(d.erro || 'Não foi possível salvar agora.')
      setEstado(e => ({ ...e, ...d }))
    } catch (e) { setErro(e instanceof Error ? e.message : 'Não foi possível salvar agora.') }
    finally { setOcupado(null) }
  }

  const srcServidor = (v: 'v45' | 'v11' = 'v45') => estado?.atual && codigo
    ? `/api/anamnese-ia/foto/arquivo?escopo=${encodeURIComponent(escopo)}&c=${encodeURIComponent(codigo)}&id=${estado.atual.id}&v=${v}&r=${versao}`
    : ''

  const aprovada = !!estado?.aprovada
  const temFoto = estado?.opcao === 'enviada' && !!estado.atual

  return (
    <section id="m-foto" className="scroll-mt-24 rounded-2xl border border-teal/10 bg-white p-5 shadow-sm sm:p-7">
      <header className="mb-4">
        <h3 className="flex items-center gap-2 text-[1.05rem] font-semibold text-teal"><Camera className="h-5 w-5" /> Sua foto para o site</h3>
        <p className="mt-1 text-[0.85rem] text-steel/60">A foto aparece na sua página do site e pode ir para o Instagram da clínica. Nada é publicado sem a sua aprovação.</p>
      </header>

      {!codigo ? (
        <p className="rounded-xl bg-mist/40 p-3.5 text-[0.85rem] text-steel/70">Para enviar a foto, abra o link que a clínica mandou para você.</p>
      ) : erroCarga ? (
        <p className="rounded-xl bg-gold/10 p-3.5 text-[0.85rem] text-steel/75">Não conseguimos carregar esta parte agora. <button type="button" className="font-medium text-teal underline" onClick={carregar}>Tentar de novo</button></p>
      ) : !estado ? (
        <p className="flex items-center gap-2 text-[0.85rem] text-steel/55"><Loader2 className="h-4 w-4 animate-spin" /> Carregando…</p>
      ) : (
        <>
          {aprovada && (
            <p className="mb-4 inline-flex items-center gap-1.5 rounded-lg bg-teal/8 px-3 py-1.5 text-[0.82rem] font-medium text-teal">
              <Check className="h-4 w-4" /> {estado.opcao === 'sem-foto' ? 'A clínica confirmou: sua página sai sem foto.' : 'Foto aprovada pela clínica.'} Para mudar, fale com a equipe.
            </p>
          )}

          {temFoto && !trocando && (
            <div className="mb-5">
              <Molduras src={srcServidor('v45')} src11={srcServidor('v11')} legenda={`Foto enviada em ${dataHora(estado.atual!.em)}. Assim ela vai aparecer.${aprovada ? '' : ' A clínica ainda vai conferir.'}`} />
              {!aprovada && (
                <button type="button" onClick={() => setTrocando(true)} className="mt-3 inline-flex items-center gap-1.5 rounded-lg border border-teal/20 px-3 py-1.5 text-[0.8rem] text-teal hover:bg-teal/5">
                  <RefreshCw className="h-3.5 w-3.5" /> Trocar a foto
                </button>
              )}
            </div>
          )}

          {!aprovada && (!temFoto || trocando) && (
            <>
              <fieldset className="mb-5 space-y-2" disabled={!!ocupado}>
                <legend className="sr-only">Como prefere?</legend>
                {([
                  ['enviada', 'Vou enviar minha foto', Camera],
                  ['clinica', 'Prefiro que a clínica providencie uma foto', Building2],
                  ['sem-foto', 'Não quero foto no site', ImageOff],
                ] as const).map(([v, rotulo, Icone]) => (
                  <label key={v} className={`flex cursor-pointer items-center gap-2.5 rounded-xl border px-3 py-2.5 text-[0.88rem] transition ${escolha === v ? 'border-teal bg-teal/5 text-teal' : 'border-teal/15 bg-white text-steel/75'}`}>
                    <input type="radio" name="opcao-foto" className="h-4 w-4 accent-[#00465F]" checked={escolha === v} onChange={() => salvarOpcao(v)} />
                    <Icone className="h-4 w-4 shrink-0" /> {rotulo}
                  </label>
                ))}
              </fieldset>

              {escolha === 'clinica' && estado.opcao === 'clinica' && (
                <p className="mb-2 rounded-xl bg-mist/40 p-3.5 text-[0.85rem] text-steel/75">Combinado. A clínica vai entrar em contato para providenciar a foto. Você ainda pode enviar a sua, se quiser.</p>
              )}
              {escolha === 'sem-foto' && estado.opcao === 'sem-foto' && (
                <p className="mb-2 rounded-xl bg-mist/40 p-3.5 text-[0.85rem] text-steel/75">Tudo bem. Sua página sai sem foto, só com as suas iniciais.</p>
              )}

              {escolha === 'enviada' && (
                <>
                  <ul className="mb-4 grid gap-1.5 text-[0.85rem] text-steel/70 sm:grid-cols-2">
                    {['Foto profissional, vertical, do peito para cima.', 'Fundo neutro e boa luz.', 'Pode ser com jaleco, no ambiente de trabalho.', 'Sem pacientes na foto.'].map(t => (
                      <li key={t} className="flex gap-2"><Check className="mt-0.5 h-4 w-4 shrink-0 text-teal" />{t}</li>
                    ))}
                  </ul>
                  <p className="mb-3 text-[0.78rem] text-steel/50">JPG, PNG, WebP ou HEIC, até 10 MB, com pelo menos {FOTO.minLado} px no lado menor. Fotos HEIC do iPhone são convertidas para JPG antes do envio.</p>

                  <input ref={input} type="file" accept={FOTO.accept} className="hidden"
                    onChange={e => { const f = e.target.files?.[0]; if (f) escolher(f); e.target.value = '' }} />
                  <button type="button" disabled={!!ocupado || estado.tentativasRestantes <= 0 || estado.envioConfigurado === false} onClick={() => input.current?.click()}
                    className="mb-4 inline-flex items-center gap-2 rounded-xl border border-teal/25 px-4 py-2.5 text-[0.88rem] font-medium text-teal hover:bg-teal/5 disabled:opacity-50">
                    <Camera className="h-4 w-4" /> {arquivo ? 'Escolher outra foto' : 'Escolher foto'}
                  </button>
                  {estado.envioConfigurado === false && <p className="mb-3 text-[0.82rem] text-gold-dark">O envio de fotos ainda está sendo configurado. Volte em breve ou fale com a clínica.</p>}
                  {estado.tentativasRestantes <= 0 && <p className="mb-3 text-[0.82rem] text-gold-dark">Você chegou ao limite de envios por este link. Fale com a clínica para liberar mais.</p>}

                  {arquivo && (
                    <div className="mb-5">
                      {arquivo.url && <Molduras src={arquivo.url} legenda="Prévia. Confira antes de enviar." />}
                    </div>
                  )}

                  {arquivo && children}

                  {arquivo && (
                    <div className="flex flex-wrap items-center gap-3">
                      <button type="button" onClick={enviar} disabled={!!ocupado || !podeEnviar}
                        className="inline-flex items-center gap-2 rounded-xl bg-teal px-5 py-3 text-[0.92rem] font-semibold text-white hover:bg-teal/90 disabled:opacity-50">
                        {ocupado ? <Loader2 className="h-4 w-4 animate-spin" /> : <Check className="h-4 w-4" />} {ocupado ?? 'Enviar foto'}
                      </button>
                      {trocando && <button type="button" onClick={() => { setTrocando(false); setArquivo(null) }} className="text-[0.82rem] text-steel/60 hover:underline">Cancelar</button>}
                    </div>
                  )}
                </>
              )}
            </>
          )}

          {ocupado && !arquivo && <p className="mt-2 flex items-center gap-2 text-[0.82rem] text-steel/55"><Loader2 className="h-4 w-4 animate-spin" /> {ocupado}</p>}
          {erro && <p role="alert" className="mt-3 rounded-xl bg-red-50 p-3 text-[0.84rem] text-red-800">{erro}</p>}
        </>
      )}
    </section>
  )
}
