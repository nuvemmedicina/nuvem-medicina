import { NextRequest, NextResponse } from 'next/server'
import { GESTORES, codigoPara, escopoValido, gestorPeloCodigo } from '@/lib/anamnese-ia/acesso'
import { sanity, idAleatorio, ipParcial, type Sanity } from '@/lib/anamnese-ia/servidor'
import { MEDICOS_SITE } from '@/lib/anamnese-ia/prefill'
import { docFotosId, FOTO, ORIGENS, usaFoto, type AprovacaoClinica } from '@/lib/anamnese-ia/foto'
import { garantirFotoDoSite } from '@/lib/anamnese-ia/foto-servidor'
import { docPaginaId, type Publicacao, type VersaoTexto } from '@/lib/anamnese-ia/pagina'
import { carregarProfissional, conteudoDaAnamnese, hashConteudo, limparConteudo } from '@/lib/anamnese-ia/pagina-servidor'
import { registrar, verificarCorrente } from '@/lib/anamnese-ia/autorizacao'

/**
 * Painel da gestão (/anamnese-ia/painel?c=<código da gestora>).
 *
 * GET  ?c=        lista dos profissionais com status, foto, termo e aprovações
 * POST { c, escopo, acao, ... }
 *   aprovar-foto | desfazer-aprovacao   aprovação da clínica (foto ou "sem foto")
 *   rascunho-texto                      texto montado a partir da anamnese (não grava)
 *   salvar-texto { conteudo }           nova versão do texto da página
 *   publicar | retirar                  marca a página como publicada ou retirada
 *   revogar { motivo }                  registra a revogação da autorização
 *   liberar-envios                      mais 5 tentativas de envio de foto
 */
export const dynamic = 'force-dynamic'

async function escoposDosProfissionais(client: Sanity) {
  const site = MEDICOS_SITE.map(m => ({ escopo: `medico-${m.slug}`, nome: m.nome, slug: m.slug }))
  const novos = await client.fetch<{ escopo: string; dadosJson?: string }[]>(
    '*[_id in path("anamnese-ia.**") && string::startsWith(escopo, "medico-novo-")]{escopo, dadosJson}',
  )
  const vistos = new Set(site.map(s => s.escopo))
  for (const n of novos) {
    if (vistos.has(n.escopo) || !escopoValido(n.escopo)) continue
    vistos.add(n.escopo)
    let nome = ''
    try { nome = String(JSON.parse(n.dadosJson ?? 'null')?.medicos?.[0]?.values?.nome ?? '') } catch { /* vazio */ }
    site.push({ escopo: n.escopo, nome: nome || 'Profissional novo', slug: n.escopo.replace(/^medico-/, '') })
  }
  return site
}

export async function GET(req: NextRequest) {
  const gestor = gestorPeloCodigo(req.nextUrl.searchParams.get('c'))
  if (!gestor) return NextResponse.json({ erro: 'Código de acesso inválido' }, { status: 403 })
  const client = sanity()
  if (!client) return NextResponse.json({ erro: 'Servidor sem configuração' }, { status: 503 })

  const lista = await escoposDosProfissionais(client)
  const profissionais = await Promise.all(lista.map(async p => {
    // Primeira abertura: copia a foto que o site já usa para o histórico (envio 0)
    await garantirFotoDoSite(client, p.escopo)
    const { fotos, pagina, registros, vigente, situacao: s } = await carregarProfissional(client, p.escopo)
    const atual = usaFoto(fotos?.opcao) ? fotos?.envios?.find(e => e.id === fotos?.atual) ?? null : null
    const daSite = fotos?.envios?.find(e => e.id === fotos.importacaoSite?.fotoId) ?? null
    const aprovacaoMedico = (pagina?.decisoes ?? []).filter(d => d.tipo === 'aprovou').at(-1) ?? null
    const ultimoAjuste = (pagina?.decisoes ?? []).filter(d => d.tipo === 'ajustes').at(-1) ?? null
    return {
      ...p,
      // Links do profissional (a gestora já tem esses códigos em links.md)
      linkAnamnese: `/anamnese-ia/medico/${p.slug}?c=${codigoPara(p.escopo)}`,
      linkAprovacao: `/anamnese-ia/medico/${p.slug}/aprovacao?c=${codigoPara(p.escopo)}`,
      etapa: s.etapa, rotulo: s.rotulo, detalhe: s.detalhe,
      podePublicar: s.podePublicar, faltaParaPublicar: s.faltaParaPublicar, alerta: s.alertaPublicada,
      opcao: fotos?.opcao ?? null,
      origem: fotos?.opcao ? ORIGENS[fotos.opcao] : daSite ? 'Sem resposta (há foto atual do site)' : 'Sem resposta',
      foto: atual ? { id: atual.id, em: atual.em, largura: atual.largura, altura: atual.altura, tipoEnviado: atual.tipoEnviado, numero: atual.numero ?? null, origem: atual.origem ?? 'envio' } : null,
      fotoSite: daSite ? { id: daSite.id, importadaEm: daSite.em, largura: daSite.largura, altura: daSite.altura, arquivo: daSite.arquivoSite ?? '' } : null,
      totalEnvios: fotos?.envios?.filter(e => e.origem !== 'site').length ?? 0,
      tentativas: fotos?.tentativas ?? 0,
      limiteTentativas: FOTO.tentativas + (fotos?.tentativasExtras ?? 0),
      aprovacaoClinica: s.aprovadaPelaClinica ? fotos?.aprovacaoClinica ?? null : null,
      termo: vigente ? { versao: vigente.termoVersao, em: vigente.em, fotoId: vigente.fotoId } : null,
      revogadoEm: registros.at(-1)?.tipo === 'revogacao' ? registros.at(-1)!.em : null,
      totalRegistros: registros.length,
      correnteOk: verificarCorrente(registros).ok,
      texto: s.texto ? { versao: s.texto.versao, conteudo: s.texto.conteudo, em: s.texto.em, por: s.texto.por } : null,
      aprovacaoMedico: aprovacaoMedico && s.aprovadaPeloMedico ? { em: aprovacaoMedico.em, textoVersao: aprovacaoMedico.textoVersao } : null,
      ultimaAprovacaoMedicoEm: aprovacaoMedico?.em ?? null,
      ajustes: ultimoAjuste && s.decisaoAtual?.tipo === 'ajustes' ? { em: ultimoAjuste.em, pedido: ultimoAjuste.pedido ?? '' } : null,
      publicadaEm: s.publicadaAtual?.em ?? null,
    }
  }))
  return NextResponse.json({ gestor, gestorNome: GESTORES[gestor], profissionais })
}

export async function POST(req: NextRequest) {
  let body: { c?: unknown; escopo?: unknown; acao?: unknown; conteudo?: unknown; motivo?: unknown }
  try { body = await req.json() } catch { return NextResponse.json({ erro: 'JSON inválido' }, { status: 400 }) }
  const gestor = gestorPeloCodigo(body.c)
  if (!gestor) return NextResponse.json({ erro: 'Código de acesso inválido' }, { status: 403 })
  const escopo = typeof body.escopo === 'string' ? body.escopo : ''
  if (!escopoValido(escopo) || !escopo.startsWith('medico-')) return NextResponse.json({ erro: 'Profissional inválido' }, { status: 400 })
  const client = sanity()
  if (!client) return NextResponse.json({ erro: 'Servidor sem configuração' }, { status: 503 })

  const agora = new Date().toISOString()
  const porNome = GESTORES[gestor]
  const { fotos, situacao: s, vigente } = await carregarProfissional(client, escopo)
  const idFotos = docFotosId(escopo)
  const idPagina = docPaginaId(escopo)
  const erro = (msg: string, status = 409) => NextResponse.json({ erro: msg }, { status })

  switch (body.acao) {
    case 'aprovar-foto': {
      let fotoId: string | null
      if (fotos?.opcao === 'sem-foto') fotoId = null
      else if (usaFoto(fotos?.opcao) && fotos?.atual) {
        if (vigente?.fotoId !== fotos.atual) return erro('Esta foto não tem autorização de uso de imagem vigente.')
        fotoId = fotos.atual
      } else return erro('Não há foto nem a opção "sem foto" para aprovar.')
      const aprovacao: AprovacaoClinica = { fotoId, por: gestor, porNome, em: agora }
      await client.patch(idFotos).set({ aprovacaoClinica: aprovacao })
        .setIfMissing({ historicoAprovacoes: [] })
        .append('historicoAprovacoes', [{ ...aprovacao, _key: idAleatorio(8), acao: 'aprovou' }])
        .commit({ visibility: 'sync' })
      break
    }
    case 'desfazer-aprovacao': {
      if (!fotos?.aprovacaoClinica) return erro('Não há aprovação da clínica para desfazer.')
      await client.patch(idFotos).set({ aprovacaoClinica: null })
        .setIfMissing({ historicoAprovacoes: [] })
        .append('historicoAprovacoes', [{ fotoId: fotos.aprovacaoClinica.fotoId, por: gestor, porNome, em: agora, _key: idAleatorio(8), acao: 'desfez' }])
        .commit({ visibility: 'sync' })
      break
    }
    case 'rascunho-texto':
      return NextResponse.json({ conteudo: await conteudoDaAnamnese(client, escopo) })
    case 'salvar-texto': {
      const conteudo = limparConteudo((body.conteudo ?? {}) as Record<string, unknown>)
      if (!conteudo.nome) return erro('O nome é obrigatório.', 400)
      const sha = hashConteudo(conteudo)
      if (s.texto?.sha256 === sha) return erro('O texto não mudou.', 400)
      const versao: VersaoTexto = { _key: idAleatorio(8), versao: (s.texto?.versao ?? 0) + 1, conteudo, sha256: sha, em: agora, por: porNome }
      await client.transaction()
        .createIfNotExists({ _id: idPagina, _type: 'anamneseIaPagina', escopo })
        .patch(idPagina, p => p.setIfMissing({ textos: [] }).append('textos', [versao]))
        .commit({ visibility: 'sync' })
      break
    }
    case 'publicar':
    case 'retirar': {
      if (body.acao === 'publicar' && !s.podePublicar) return erro(`Ainda falta: ${s.faltaParaPublicar.join('; ')}.`)
      if (body.acao === 'publicar' && s.publicadaAtual) return erro('Esta versão já está marcada como publicada.')
      const pub: Publicacao = { _key: idAleatorio(8), em: agora, por: gestor, porNome, textoVersao: s.texto?.versao ?? 0, fotoId: s.fotoId, acao: body.acao === 'publicar' ? 'publicou' : 'retirou' }
      await client.transaction()
        .createIfNotExists({ _id: idPagina, _type: 'anamneseIaPagina', escopo })
        .patch(idPagina, p => p.setIfMissing({ publicacoes: [] }).append('publicacoes', [pub]))
        .commit({ visibility: 'sync' })
      break
    }
    case 'revogar': {
      if (!vigente) return erro('Não há autorização vigente para revogar.')
      const motivo = typeof body.motivo === 'string' ? body.motivo.trim().slice(0, 500) : ''
      if (!motivo) return erro('Escreva como o pedido chegou (por exemplo: "WhatsApp em 10/11, pela própria médica").', 400)
      await registrar(client, {
        tipo: 'revogacao', escopo, nomeCompleto: vigente.nomeCompleto, registro: vigente.registro,
        termoVersao: vigente.termoVersao, termoSha256: vigente.termoSha256, fotoId: vigente.fotoId,
        ipParcial: ipParcial(req), registradoPor: porNome, motivo,
      })
      // A foto deixa de valer: sai a aprovação da clínica (fica no histórico)
      if (fotos?.aprovacaoClinica) {
        await client.patch(idFotos).set({ aprovacaoClinica: null })
          .setIfMissing({ historicoAprovacoes: [] })
          .append('historicoAprovacoes', [{ fotoId: fotos.aprovacaoClinica.fotoId, por: gestor, porNome, em: agora, _key: idAleatorio(8), acao: 'desfez' }])
          .commit({ visibility: 'sync' })
      }
      break
    }
    case 'liberar-envios':
      await client.transaction()
        .createIfNotExists({ _id: idFotos, _type: 'anamneseIaFotos', escopo })
        .patch(idFotos, p => p.setIfMissing({ tentativasExtras: 0 }).inc({ tentativasExtras: 5 }))
        .commit({ visibility: 'sync' })
      break
    default:
      return erro('Ação inválida', 400)
  }
  return NextResponse.json({ ok: true })
}
