'use client'

import { useCallback, useEffect, useRef, useState } from 'react'

/**
 * Sincroniza um formulário /anamnese-ia com /api/anamnese-ia.
 *
 * - O código de acesso vem da URL (?c=...). Sem código, nada vai ao servidor
 *   e o formulário funciona só com o rascunho do navegador.
 * - Ao abrir, carrega o que está salvo no servidor e usa essa versão se for
 *   mais recente que o rascunho local (permite continuar em outro aparelho).
 * - A cada alteração, salva no servidor (com espera de 1,5 s).
 * - enviar() salva e marca como concluído.
 */
export type StatusServidor = 'sem-codigo' | 'carregando' | 'salvo' | 'salvando' | 'pendente' | 'erro' | 'acesso-negado'

export function useServidor<T extends { atualizadoEm?: string }>({
  escopo, estado, carregado, aoCarregarRemoto,
}: {
  escopo: string
  estado: T
  carregado: boolean               // rascunho local já restaurado
  aoCarregarRemoto: (dados: T) => void
}) {
  const [codigo, setCodigo] = useState<string | null>(null)
  const [status, setStatus] = useState<StatusServidor>('carregando')
  const [salvoEm, setSalvoEm] = useState<string | null>(null)
  const [finalizadoEm, setFinalizadoEm] = useState<string | null>(null)
  const [pronto, setPronto] = useState(false)   // leitura remota concluída
  const [tentativa, setTentativa] = useState(0) // nova leitura após falha
  const ultimoEnviado = useRef<string>('')
  const estadoRef = useRef(estado)
  estadoRef.current = estado

  useEffect(() => {
    try {
      const c = new URLSearchParams(window.location.search).get('c')
      setCodigo(c)
      if (!c) setStatus('sem-codigo')
    } catch { setStatus('sem-codigo') }
  }, [])

  // Carrega do servidor depois de restaurar o rascunho local
  useEffect(() => {
    if (!carregado || !codigo || pronto) return
    let vivo = true
    ;(async () => {
      try {
        const r = await fetch(`/api/anamnese-ia?escopo=${encodeURIComponent(escopo)}&c=${encodeURIComponent(codigo)}`, { cache: 'no-store' })
        if (!vivo) return
        if (r.status === 403) { setStatus('acesso-negado'); setPronto(true); return }
        if (!r.ok) throw new Error(String(r.status))
        const d = await r.json()
        if (d.existe) {
          // compara o momento da última edição de cada versão (não o da gravação)
          const local  = estadoRef.current.atualizadoEm
          const remoto = d.dados?.atualizadoEm ?? d.atualizadoEm
          if (!local || (remoto && remoto > local)) {
            ultimoEnviado.current = JSON.stringify(d.dados)
            aoCarregarRemoto(d.dados)
          }
          setSalvoEm(d.atualizadoEm ?? null)
          setFinalizadoEm(d.finalizadoEm ?? null)
        }
        setStatus('salvo')
        setPronto(true)
      } catch {
        // Sem leitura não há gravação (para não sobrescrever o servidor com um
        // rascunho mais antigo). Tenta ler de novo em 10 s.
        if (!vivo) return
        setStatus('erro')
        setTimeout(() => { if (vivo) setTentativa(n => n + 1) }, 10_000)
      }
    })()
    return () => { vivo = false }
  }, [carregado, codigo, escopo, pronto, aoCarregarRemoto, tentativa])

  const salvar = useCallback(async (finalizar = false) => {
    if (!codigo) return false
    const corpo = JSON.stringify(estadoRef.current)
    setStatus('salvando')
    try {
      const r = await fetch('/api/anamnese-ia', {
        method: 'POST', headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ escopo, c: codigo, dados: estadoRef.current, finalizar }),
      })
      if (r.status === 403) { setStatus('acesso-negado'); return false }
      if (!r.ok) throw new Error(String(r.status))
      const d = await r.json()
      ultimoEnviado.current = corpo
      setSalvoEm(d.atualizadoEm)
      if (d.finalizadoEm) setFinalizadoEm(d.finalizadoEm)
      setStatus('salvo')
      return true
    } catch {
      setStatus('erro')
      return false
    }
  }, [codigo, escopo])

  // Salva a cada alteração
  useEffect(() => {
    if (!pronto || !codigo || status === 'acesso-negado') return
    if (JSON.stringify(estado) === ultimoEnviado.current) return
    setStatus('pendente')
    const t = setTimeout(() => { salvar() }, 1500)
    return () => clearTimeout(t)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [estado, pronto, codigo])

  return { codigo, status, salvoEm, finalizadoEm, enviar: () => salvar(true) }
}

/** Texto curto do estado da gravação, para o cabeçalho. */
export function rotuloStatus(s: StatusServidor, salvoEm: string | null) {
  const hora = salvoEm ? new Date(salvoEm).toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) : ''
  switch (s) {
    case 'sem-codigo':    return 'Link sem código: respostas só neste navegador'
    case 'carregando':    return 'Carregando respostas…'
    case 'salvando':      return 'Salvando…'
    case 'pendente':      return 'Alterações não salvas…'
    case 'salvo':         return hora ? `Salvo às ${hora}` : 'Conectado'
    case 'erro':          return 'Sem conexão: respostas guardadas neste navegador'
    case 'acesso-negado': return 'Código de acesso inválido: respostas só neste navegador'
  }
}
