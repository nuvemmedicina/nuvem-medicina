/**
 * Gera os documentos da clínica para a Dr.IAgenda:
 *   docs/anamnese-ia/clinica-nuvem-dr-iagenda.html  (fonte do PDF)
 *   docs/anamnese-ia/clinica-nuvem-dr-iagenda.pdf   (A4, via Microsoft Edge headless)
 *   docs/anamnese-ia/clinica-nuvem-dr-iagenda-formulario.pdf
 *       mesma diagramação, com a Parte A em campos editáveis já preenchidos
 *       (para a gestão completar). Para trazer as respostas de volta:
 *       python scripts/anamnese-ia/campos-pdf.py ler <pdf-preenchido> respostas.json
 *       e importar o JSON em /anamnese-ia ("Importar respostas").
 *   docs/anamnese-ia/preparos-para-ia.md            (texto simples para a IA do WhatsApp)
 *   docs/anamnese-ia/relatorio-validacao.md         (pendências [VALIDAR COM A EQUIPE MÉDICA])
 *
 *   docs/anamnese-ia/anexos/  (os 5 tipos de anexo do formulário da Dr.IAgenda,
 *       cada um em PDF e em Markdown — ver gerarAnexos())
 *
 * Uso:
 *   node --import ./scripts/anamnese-ia/register.mjs scripts/anamnese-ia/gerar-documentos.mjs
 *   ... gerar-documentos.mjs --respostas docs/anamnese-ia/respostas
 *
 * --respostas aceita um arquivo ou uma pasta. Numa pasta, lê todos os
 * arquivos exportados pelas páginas /anamnese-ia:
 *   *.json  anamnese-ia/completo · anamnese-ia/clinica · anamnese-ia/medico ·
 *           anamnese-ia/validacao
 *   *.pdf   PDF editável da Parte A preenchido pela gestão (lido com campos-pdf.py)
 * Sem --respostas, tudo sai com os dados do site (pré-preenchimento).
 *
 * Os preparos vêm de src/lib/anamnese-ia/preparos.ts (padrão único).
 */
import { readFileSync, writeFileSync, mkdirSync, existsSync, readdirSync, statSync, copyFileSync } from 'node:fs'
import { execFileSync } from 'node:child_process'
import path from 'node:path'
import { tmpdir } from 'node:os'
import { fileURLToPath, pathToFileURL } from 'node:url'

import { SECOES_CLINICA, CAMPOS_MEDICO } from '@/lib/anamnese-ia/schema'
import { PREFILL_CLINICA, MEDICOS_SITE, prefillMedico } from '@/lib/anamnese-ia/prefill'
import { PREPAROS as PREPAROS_BASE, VALIDAR, CONFORME, DIVERGENCIAS_GERAIS, aplicarValidacao, preparosDosNovos, chaveNovo } from '@/lib/anamnese-ia/preparos'
import { CONTATO } from '@/lib/data'

const ROOT = path.resolve(fileURLToPath(new URL('../../', import.meta.url)))
/*
 * Saída. O repositório é PÚBLICO: documentos gerados com as respostas reais
 * (valores, agendas, regras internas) vão para docs/anamnese-ia/respostas/,
 * que está no .gitignore. Sem respostas (só dados do site), a saída continua
 * em docs/anamnese-ia/. --saida <pasta> força outra pasta.
 */
const iSaida = process.argv.indexOf('--saida')
const OUT = iSaida > -1
  ? path.resolve(process.argv[iSaida + 1])
  : process.argv.includes('--respostas')
    ? path.join(ROOT, 'docs', 'anamnese-ia', 'respostas', 'documentos-finais')
    : path.join(ROOT, 'docs', 'anamnese-ia')
mkdirSync(OUT, { recursive: true })

const EDGE = [
  'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
  'C:/Program Files/Microsoft/Edge/Application/msedge.exe',
].find(p => existsSync(p))

const HOJE = new Date().toLocaleDateString('pt-BR', { timeZone: 'America/Sao_Paulo' })

// ─── Respostas (opcional) ─────────────────────────────────────────────────────
const iResp = process.argv.indexOf('--respostas')
let clinica = { ...PREFILL_CLINICA }
const medicosPorSlug = new Map(MEDICOS_SITE.map(m => [m.slug, prefillMedico(m.slug)]))
let PREPAROS = PREPAROS_BASE
let validacao = null           // { validador, aplicadas, total }
const lidos = []               // resumo do que foi lido, para o console e o relatório

const medicoEm = new Map()     // slug -> momento da versão usada (vale a mais recente)
const ajustes = []             // anamnese-ia/ajustes: aplicados por último

function lerRespostas(alvos) {
  const arquivos = alvos.flatMap(alvo => statSync(alvo).isDirectory()
    ? readdirSync(alvo).filter(f => /\.(json|pdf)$/i.test(f)).map(f => path.join(alvo, f)).sort()
    : [alvo])
  let decisoes = []
  let novos = {}   // respostas dos preparos novos, no formato novo:<slug>:<campo> -> { texto }
  for (const arq of arquivos) {
    let d
    if (/\.pdf$/i.test(arq)) {
      const tmp = path.join(tmpdir(), `anamnese-pdf-${Date.now()}.json`)
      execFileSync('python', ['-W', 'ignore', path.join(ROOT, 'scripts/anamnese-ia/campos-pdf.py'), 'ler', arq, tmp], { stdio: 'ignore' })
      d = JSON.parse(readFileSync(tmp, 'utf8'))
    } else {
      d = JSON.parse(readFileSync(arq, 'utf8'))
    }
    const nome = path.basename(arq)
    switch (d.tipo) {
      case 'anamnese-ia/completo':
        clinica = { ...clinica, ...d.clinica.valores }
        for (const m of d.medicos) medicosPorSlug.set(m.slug || `extra-${medicosPorSlug.size}`, m.valores)
        lidos.push(`${nome}: formulário completo (Parte A + ${d.medicos.length} profissionais)`)
        break
      case 'anamnese-ia/clinica':
        clinica = { ...clinica, ...d.valores }
        lidos.push(`${nome}: Parte A (clínica)`)
        break
      case 'anamnese-ia/medico': {
        // O mesmo profissional pode chegar por PDF, por JSON e pelo link. Vale a versão
        // enviada; entre as não enviadas, a mais completa; empate, a mais recente.
        // (Abrir o link de novo salva só os dados do site e não pode apagar respostas.)
        const slug = d.slug || `extra-${medicosPorSlug.size}`
        const preenchidos = CAMPOS_MEDICO.flatMap(s => s.fields).filter(f => String(d.valores?.[f.id] ?? '').trim()).length
        const nota = [d.finalizadoEm ? 1 : 0, preenchidos, d.exportadoEm ?? '']
        const atual = medicoEm.get(slug)
        const melhor = (a, b) => a[0] !== b[0] ? a[0] > b[0] : a[1] !== b[1] ? a[1] > b[1] : a[2] >= b[2]
        if (atual && !melhor(nota, atual)) { lidos.push(`${nome}: ${d.nome || slug} (ignorado: há versão mais completa)`); break }
        medicosPorSlug.set(slug, d.valores)
        medicoEm.set(slug, nota)
        lidos.push(`${nome}: ${d.nome || slug}${d.finalizadoEm ? ' (enviado)' : d.origem ? '' : ' (em andamento)'}`)
        break
      }
      case 'anamnese-ia/ajustes':
        ajustes.push(d)
        lidos.push(`${nome}: ajustes da gestão`)
        break
      case 'anamnese-ia/validacao':
        decisoes = decisoes.concat(d.itens)
        for (const pn of d.preparosNovos ?? []) {
          if (pn.modo) novos[chaveNovo(pn.slug, 'modo')] = { texto: pn.modo }
          for (const [k, v] of Object.entries(pn.campos ?? {})) novos[chaveNovo(pn.slug, k)] = { texto: v }
        }
        validacao = { validador: d.validador }
        lidos.push(`${nome}: validação dos preparos (${d.resolvidos}/${d.total}, por ${d.validador || 'não informado'})`)
        break
      default:
        console.warn(`Ignorado (formato desconhecido): ${nome}`)
    }
  }
  // Ajustes da gestão por último: sobrescrevem só os campos que trazem
  for (const a of ajustes) {
    clinica = { ...clinica, ...(a.clinica ?? {}) }
    // Decisões da gestão sobre os preparos entram antes das da validação médica:
    // se a equipe médica responder o mesmo ponto, vale a resposta dela.
    if (a.validacao?.length) {
      decisoes = [...a.validacao, ...decisoes]
      if (!validacao) validacao = { validador: 'gestão' }
    }
    for (const [slug, campos] of Object.entries(a.medicos ?? {})) {
      if (medicosPorSlug.has(slug)) medicosPorSlug.set(slug, { ...medicosPorSlug.get(slug), ...campos })
    }
  }
  if (decisoes.length) {
    const r = aplicarValidacao(decisoes)
    PREPAROS = r.preparos
    validacao.aplicadas = r.aplicadas
  }
  const extras = preparosDosNovos(novos, PREPAROS)
  if (extras.length) {
    PREPAROS = [...PREPAROS, ...extras]
    lidos.push(`Preparos novos incluídos: ${extras.map(p => p.nome).join(', ')}`)
  }
}

// --respostas pode aparecer várias vezes (ex.: pasta do servidor + pasta com PDFs transcritos e ajustes)
const alvosResp = process.argv.flatMap((a, i) => a === '--respostas' ? [process.argv[i + 1]] : [])
if (alvosResp.length) lerRespostas(alvosResp)
const medicos = [...medicosPorSlug.values()]
const temRespostas = lidos.length > 0
const origemDados = temRespostas
  ? `respostas da anamnese (${lidos.length} arquivo${lidos.length > 1 ? 's' : ''}), consolidadas em ${new Date().toLocaleDateString('pt-BR')}`
  : 'pré-preenchimento com dados do site (formulário ainda não respondido)'

// ─── Utilidades ───────────────────────────────────────────────────────────────
const esc = s => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;')
const txt = v => Array.isArray(v) ? v.join(' · ') : String(v ?? '').trim()
const html = s => esc(s).replace(/\n/g, '<br>').replace(/_{3,}/g, '<span class="lacuna">___</span>')

const pendencias = [] // { exame, secao, item, motivo }

function itemHtml(it, exame, secao) {
  if (!it.v) return `<li>${html(it.t)}</li>`
  pendencias.push({ exame, secao, item: it.t, motivo: it.v })
  return `<li>${html(it.t)} <span class="validar">${VALIDAR}</span><span class="motivo">${html(it.v)}</span></li>`
}
const lista = (itens, exame, secao) => itens.length
  ? `<ul>${itens.map(i => itemHtml(i, exame, secao)).join('')}</ul>` : ''

// ─── Capítulo 1: Parte A ──────────────────────────────────────────────────────
/*
 * Versão formulário: cada pergunta vira uma caixa vazia com dois marcadores
 * de texto invisíveis (canto superior esquerdo e inferior direito). Depois da
 * impressão, campos-pdf.py localiza os marcadores, apaga-os e cria ali um
 * campo editável (AcroForm) já preenchido com o valor atual.
 */
const camposForm = [] // { marcador, id, tipo, valor, opcoes, multilinha }

// Fontes padrão de formulário PDF (Helvetica/WinAnsi) não têm subscritos nem "−".
const paraWinAnsi = s => s
  .replace(/[₀-₉]/g, c => String(c.charCodeAt(0) - 0x2080))
  .replace(/−/g, '-')

function linhasEstimadas(v, porLinha = 92) {
  return v.split('\n').reduce((n, l) => n + Math.max(1, Math.ceil(l.length / porLinha)), 0)
}

function caixaCampo(f) {
  const n = String(camposForm.length).padStart(3, '0')
  const v = paraWinAnsi(txt(clinica[f.id]))
  if (f.type === 'checks') {
    const marcados = Array.isArray(clinica[f.id]) ? clinica[f.id] : []
    return `<div class="opcoes">${f.options.map((o, j) => {
      const mk = `CB${n}${String(j).padStart(2, '0')}Q`
      camposForm.push({ marcador: mk, id: f.id, tipo: 'check', opcao: o, valor: marcados.includes(o) })
      return `<span class="op"><span class="cx"><i class="mk">${mk}</i></span>${esc(o)}</span>`
    }).join('')}</div>`
  }
  const multilinha = f.type === 'textarea'
  const linhas = multilinha ? Math.max(f.rows ?? 3, linhasEstimadas(v) + 1) : 1
  const altura = multilinha ? 2.4 + linhas * 4.3 : 7.5
  camposForm.push({ marcador: `FS${n}Q`, fim: `FE${n}Q`, id: f.id, tipo: f.type === 'select' ? 'combo' : 'texto', valor: v, opcoes: f.options ?? [], multilinha })
  return `<div class="campo" style="height:${altura.toFixed(1)}mm"><i class="mk">FS${n}Q</i><i class="mk mk-fim">FE${n}Q</i></div>`
}

function capituloClinica(form = false) {
  if (form) camposForm.length = 0
  return SECOES_CLINICA.map((s, i) => `
    <section class="bloco">
      <h3 id="sec-${s.id}">1.${i + 1} ${esc(s.title)}</h3>
      <dl>${s.fields.map(f => {
        const v = txt(clinica[f.id])
        const rotulo = `<dt>${esc(f.label)}${f.required ? ' <span class="obr">*</span>' : ''}${f.orig ? ` <span class="orig">orig. ${esc(f.orig)}</span>` : ''}</dt>`
        if (form) return `<div class="par">${rotulo}${f.help ? `<p class="ajuda">${esc(f.help)}</p>` : ''}<dd>${caixaCampo(f)}</dd></div>`
        return `<div class="par">${rotulo}
          <dd>${v ? html(v) : '<span class="preencher">[A PREENCHER PELA GESTÃO]</span>'}</dd></div>`
      }).join('')}</dl>
    </section>`).join('')
}

// ─── Capítulo 2: Preparos ─────────────────────────────────────────────────────
function capituloPreparos(prefixo = '2.') {
  return PREPAROS.map((p, i) => {
    const n = `${prefixo}${i + 1}`
    const tabela = p.medicamentos.linhas.length ? `
      <table class="meds"><thead><tr><th>Medicamento</th><th>Conduta</th><th>Observação</th></tr></thead><tbody>
      ${p.medicamentos.linhas.map(l => {
        if (l.v) pendencias.push({ exame: p.nome, secao: 'Medicamentos', item: `${l.med}: ${l.conduta}`, motivo: l.v })
        return `<tr><td>${esc(l.med)}</td><td class="conduta">${esc(l.conduta)}</td><td>${esc(l.obs ?? '')}${l.v ? ` <span class="validar">${VALIDAR}</span><span class="motivo">${html(l.v)}</span>` : ''}</td></tr>`
      }).join('')}</tbody></table>` : ''
    return `
    <section class="preparo" id="prep-${p.slug}">
      <h2 class="cap-sub"><span class="num">${n}</span> ${esc(p.nome)}</h2>
      ${p.sub ? `<p class="sub">${esc(p.sub)}</p>` : ''}
      <p class="serve">${esc(p.serve)}</p>
      <div class="ficha">${p.ficha.map(([k, v]) => `<div><span>${esc(k)}</span><strong>${esc(v)}</strong></div>`).join('')}</div>
      <h4>Antes do exame (dias anteriores)</h4>${lista(p.antes, p.nome, 'Antes do exame') || '<p class="vazio">Sem orientações específicas.</p>'}
      <h4>Jejum</h4>${lista(p.jejum, p.nome, 'Jejum')}
      <h4>Medicamentos</h4>
      <p class="conforme">${esc(CONFORME)}</p>
      ${tabela}${lista(p.medicamentos.notas, p.nome, 'Medicamentos')}
      <h4>No dia do exame</h4>${lista(p.noDia, p.nome, 'No dia do exame')}
      ${p.durante ? `<h4>Durante o monitoramento</h4>${lista(p.durante, p.nome, 'Durante o monitoramento')}` : ''}
      <h4>Após o exame</h4>${lista(p.apos, p.nome, 'Após o exame')}
      <h4>Quando entrar em contato com a clínica</h4>${lista(p.contato, p.nome, 'Contato')}
      <p class="fonte">Fonte: ${esc(p.fonte)}</p>
    </section>`
  }).join('')
}

// ─── Capítulo 3: Profissionais ────────────────────────────────────────────────
function capituloMedicos() {
  const campo = (m, id) => txt(m[id])
  return `<div class="medicos">${medicos.map(m => `
    <div class="medico">
      <p class="m-nome">${esc(campo(m, 'nome') || 'Profissional')}</p>
      <p class="m-esp">${esc(campo(m, 'especialidade'))}${campo(m, 'registro') ? ` · ${esc(campo(m, 'registro'))}` : ' · <span class="preencher">registro a preencher</span>'}</p>
      ${campo(m, 'areas') ? `<p><b>Áreas:</b> ${esc(campo(m, 'areas'))}</p>` : ''}
      ${campo(m, 'bio') ? `<p>${esc(campo(m, 'bio'))}</p>` : ''}
      ${['realiza', 'faixaEtaria', 'diasHorarios', 'duracao', 'teleconsulta', 'retorno']
        .map(id => {
          const f = CAMPOS_MEDICO.flatMap(s => s.fields).find(x => x.id === id)
          return campo(m, id) ? `<p><b>${esc(f.label)}:</b> ${html(campo(m, id))}</p>` : ''
        }).join('')}
    </div>`).join('')}</div>
    <p class="nota">${temRespostas ? 'Resumo a partir das respostas da Parte B.' : 'Resumo a partir dos dados do site. Agenda, valores, retorno, faixa etária e teleconsulta entram quando cada profissional responder a Parte B do formulário.'}</p>`
}

// ─── HTML ─────────────────────────────────────────────────────────────────────
const logo = `data:image/svg+xml;base64,${readFileSync(path.join(ROOT, 'public/images/logo.svg')).toString('base64')}`

const estilos = cabecalho => `
<style>
  :root { --teal:#00465F; --teal-mid:#0A5E7E; --mist:#CBE4E6; --gold:#C9A84C; --gold-dark:#A67C2E; --steel:#363636; }
  @page {
    size: A4; margin: 27mm 18mm 20mm;
    @top-left    { content: url("${logo}"); width: 22mm; height: 13mm; vertical-align: bottom; padding-bottom: 4mm; }
    @top-right   { content: "${cabecalho}"; font: 500 7.5pt Poppins, sans-serif; color: #00465F; vertical-align: bottom; padding-bottom: 5mm; }
    @bottom-left { content: "NU.V.E.M Medicina · Documento interno · ${HOJE}"; font: 400 7pt Poppins, sans-serif; color: #8a8a8a; }
    @bottom-right{ content: "Página " counter(page) " de " counter(pages); font: 500 7.5pt Poppins, sans-serif; color: #00465F; }
  }
  @page capa { margin: 0; @top-left { content: none } @top-right { content: none } @bottom-left { content: none } @bottom-right { content: none } }
  * { box-sizing: border-box; }
  html { -webkit-print-color-adjust: exact; print-color-adjust: exact; }
  body { font-family: Poppins, sans-serif; font-weight: 400; font-size: 9.6pt; line-height: 1.5; color: var(--steel); margin: 0; }
  .capa { page: capa; height: 297mm; padding: 34mm 24mm 22mm; display: flex; flex-direction: column; background: linear-gradient(160deg, #00465F 0%, #00293A 100%); color: #fff; break-after: page; }
  .capa .logo { width: 62mm; background: #fff; border-radius: 4mm; padding: 5mm 7mm; }
  .capa .tag { margin-top: auto; font-size: 8.5pt; letter-spacing: .18em; text-transform: uppercase; color: var(--gold); font-weight: 600; }
  .capa h1 { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 34pt; line-height: 1.08; margin: 4mm 0 6mm; }
  .capa h1 em { color: var(--gold); }
  .capa p { color: rgba(255,255,255,.75); max-width: 135mm; margin: 0 0 2mm; }
  .capa .rodape { margin-top: 18mm; padding-top: 5mm; border-top: 1px solid rgba(255,255,255,.2); font-size: 8pt; color: rgba(255,255,255,.6); }
  h1.cap { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 25pt; color: var(--teal); margin: 0 0 2mm; break-before: page; }
  h1.cap + .intro { color: #666; margin: 0 0 6mm; }
  h2.cap-sub { font-size: 14pt; font-weight: 600; color: var(--teal); margin: 0 0 1mm; }
  h2.cap-sub .num { color: var(--gold-dark); margin-right: 1.5mm; }
  h3 { font-size: 11pt; font-weight: 600; color: var(--teal); border-bottom: 1.5px solid var(--mist); padding-bottom: 1.2mm; margin: 6mm 0 3mm; break-after: avoid; }
  h4 { font-size: 9pt; font-weight: 600; text-transform: uppercase; letter-spacing: .08em; color: var(--teal-mid); margin: 4.5mm 0 1.5mm; break-after: avoid; }
  .sumario ol { list-style: none; padding: 0; margin: 0; }
  .sumario li { display: flex; align-items: baseline; gap: 2mm; padding: 1.3mm 0; }
  .sumario li.n0 { font-weight: 600; color: var(--teal); margin-top: 3mm; font-size: 10.5pt; }
  .sumario li.n1 { padding-left: 7mm; color: #555; }
  .sumario .pontos { flex: 1; border-bottom: 1px dotted #bbb; transform: translateY(-1mm); }
  .sumario a { color: inherit; text-decoration: none; }
  .aviso { background: #f5fafa; border: 1px solid var(--mist); border-left: 3px solid var(--gold); border-radius: 2mm; padding: 3.5mm 4.5mm; margin: 6mm 0; font-size: 8.8pt; }
  .aviso b { color: var(--teal); }
  .par { break-inside: avoid; margin-bottom: 2.6mm; }
  dl { margin: 0; } dt { font-size: 8pt; font-weight: 600; color: #666; } dd { margin: .5mm 0 0; }
  .orig { font-weight: 400; color: #aaa; }
  .preencher { color: var(--gold-dark); font-weight: 600; font-size: 8.5pt; }
  .lacuna { color: var(--gold-dark); font-weight: 600; }
  .preparo { break-before: page; }
  .preparo .sub { margin: 0; color: var(--gold-dark); font-weight: 500; }
  .serve { margin: 2mm 0 3mm; font-size: 10pt; }
  .ficha { display: flex; flex-wrap: wrap; gap: 2mm; margin: 0 0 1mm; }
  .ficha div { background: #f2f8f8; border: 1px solid var(--mist); border-radius: 1.8mm; padding: 1.6mm 3mm; font-size: 8.2pt; }
  .ficha span { color: #777; margin-right: 1.4mm; } .ficha strong { color: var(--teal); font-weight: 600; }
  ul { margin: 0; padding-left: 4.6mm; } li { margin: 0 0 1.3mm; break-inside: avoid; } li::marker { color: var(--gold); }
  .validar { display: inline-block; background: #fff3d6; color: #8a5a00; border: 1px solid #e8c56a; border-radius: 1mm; font-size: 7pt; font-weight: 600; padding: 0 1.2mm; margin-left: 1mm; letter-spacing: .02em; }
  .motivo { display: block; font-size: 7.8pt; font-style: italic; color: #8a5a00; margin-top: .6mm; }
  .conforme { margin: 0 0 2mm; font-size: 8.6pt; color: var(--teal); font-weight: 500; }
  table.meds { width: 100%; border-collapse: collapse; margin: 1mm 0 2.5mm; font-size: 8.4pt; }
  .meds th { text-align: left; background: var(--teal); color: #fff; font-weight: 500; padding: 1.6mm 2mm; }
  .meds td { border-bottom: 1px solid #e3eeee; padding: 1.6mm 2mm; vertical-align: top; }
  .meds tr { break-inside: avoid; } .meds td.conduta { font-weight: 600; color: var(--teal); white-space: nowrap; }
  .vazio { color: #888; margin: 0; }
  .fonte { margin-top: 5mm; font-size: 7.2pt; color: #aaa; }
  .medicos { display: grid; grid-template-columns: 1fr 1fr; gap: 3.5mm; margin-top: 4mm; }
  .medico { border: 1px solid var(--mist); border-radius: 2mm; padding: 3.2mm 3.8mm; break-inside: avoid; font-size: 8.4pt; }
  .medico p { margin: 0 0 1mm; } .m-nome { font-weight: 600; color: var(--teal); font-size: 10pt; } .m-esp { color: #777; font-size: 7.8pt; }
  .nota { font-size: 8pt; color: #888; margin-top: 4mm; }
  .campo { position: relative; border: 1px solid #b9d6d9; border-radius: 1.4mm; background: #f7fbfb; margin-top: .8mm; }
  .mk { position: absolute; font: normal 3pt/1 Helvetica, sans-serif; color: #f7fbfb; white-space: nowrap; }
  .campo .mk { left: .4mm; top: .4mm; } .campo .mk-fim { left: auto; top: auto; right: .4mm; bottom: .4mm; }
  .opcoes { display: flex; flex-wrap: wrap; gap: 1.6mm 5mm; margin-top: 1mm; }
  .op { display: inline-flex; align-items: center; gap: 1.6mm; }
  .cx { position: relative; width: 3.8mm; height: 3.8mm; border: 1px solid #8fbcc1; border-radius: .7mm; background: #f7fbfb; }
  .cx .mk { left: .2mm; top: .2mm; font-size: 1.6pt; }
  .ajuda { margin: .2mm 0 0; font-size: 7.6pt; color: #8a8a8a; line-height: 1.35; }
  .obr { color: var(--gold-dark); }

  .anexo-topo { border-bottom: 2px solid var(--teal); padding-bottom: 4mm; margin-bottom: 6mm; }
  .anexo-topo .tag { font-size: 7.8pt; letter-spacing: .16em; text-transform: uppercase; color: var(--gold-dark); font-weight: 600; margin: 0; }
  .anexo-topo h1 { font-family: 'Cormorant Garamond', serif; font-weight: 500; font-size: 26pt; color: var(--teal); margin: 1mm 0 1.5mm; line-height: 1.1; }
  .anexo-topo p { margin: 0; color: #666; font-size: 8.8pt; }
  table.tab { width: 100%; border-collapse: collapse; margin: 2mm 0 4mm; font-size: 8.2pt; }
  .tab th { text-align: left; background: var(--teal); color: #fff; font-weight: 500; padding: 1.6mm 2mm; vertical-align: bottom; }
  .tab td { border-bottom: 1px solid #e3eeee; padding: 1.6mm 2mm; vertical-align: top; }
  .tab tr { break-inside: avoid; } .tab td:first-child { font-weight: 600; color: var(--teal); }
  .passo { break-inside: avoid; border-left: 3px solid var(--mist); padding: .5mm 0 .5mm 4mm; margin: 0 0 4mm; }
  .passo h3 { border: 0; margin: 0 0 1.5mm; padding: 0; }
  .passo h3 .num { color: var(--gold-dark); margin-right: 1.5mm; }
  .rascunho { background: #fff3d6; border: 1px solid #e8c56a; border-radius: 2mm; padding: 3mm 4mm; font-size: 8.6pt; color: #7a5200; margin: 0 0 5mm; }
</style>`

function montarHtml(paginas = {}, form = false) {
  pendencias.length = 0
  const cap1 = capituloClinica(form)
  const cap2 = capituloPreparos()
  const cap3 = capituloMedicos()
  const sumario = [
    ['cap1', '1. Informações da clínica', 0],
    ...SECOES_CLINICA.map((s, i) => [`sec-${s.id}`, `1.${i + 1} ${s.title}`, 1]),
    ['cap2', '2. Preparos de exames', 0],
    ...PREPAROS.map((p, i) => [`prep-${p.slug}`, `2.${i + 1} ${p.nome}`, 1]),
    ['cap3', '3. Profissionais', 0],
  ]
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8">
<title>NU.V.E.M Medicina · Informações da clínica para a Dr.IAgenda</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
${estilos('Informações da clínica · Dr.IAgenda')}</head><body>

<section class="capa">
  <img class="logo" src="${logo}" alt="NU.V.E.M Medicina">
  <p class="tag">${form ? 'Formulário para a gestão · IA de atendimento' : 'Documento interno · IA de atendimento'}</p>
  <h1>Informações da clínica<br>para a <em>Dr.IAgenda</em></h1>
  <p>Dados da clínica pedidos na anamnese da Secretária IA, preparos de exames em padrão único e resumo dos profissionais.</p>
  <p>${form ? 'Os campos da Parte A já vêm preenchidos com os dados do site: confira, corrija e complete o que falta. Preencha no Adobe Acrobat Reader, no Edge ou no Chrome e salve o arquivo.' : `Origem dos dados da clínica: ${esc(origemDados)}.`}</p>
  <div class="rodape">NU.V.E.M Medicina · ${esc(CONTATO.endereco)}, ${esc(CONTATO.bairro)} · ${esc(CONTATO.telefone)}<br>
  ${esc(CONTATO.crmClinica)} · Diretora técnica: ${esc(CONTATO.diretora.nome)} (${esc(CONTATO.diretora.crm)} · ${esc(CONTATO.diretora.rqe)}) · Versão de ${HOJE}</div>
</section>

<section class="sumario">
  <h1 class="cap" style="break-before:auto">Sumário</h1>
  <ol>${sumario.map(([id, t, nv]) => `<li class="n${nv}"><a href="#${id}">${esc(t)}</a><span class="pontos"></span><span>${paginas[id] ?? ''}</span></li>`).join('')}</ol>
  <div class="aviso"><b>Como ler este documento.</b> Os preparos foram reorganizados a partir dos PDFs oficiais da clínica, sem criar orientações novas.
  Itens marcados com <span class="validar">${VALIDAR}</span> têm divergência entre versões publicadas, lacuna ou instrução ambígua e precisam ser confirmados antes de a IA usar o texto.
  Campos marcados <span class="preencher">[A PREENCHER PELA GESTÃO]</span> e trechos <span class="lacuna">___</span> ainda não têm resposta.</div>
</section>

<h1 class="cap" id="cap1">1. Informações da clínica</h1>
<p class="intro">Parte A da anamnese: o que vale para a clínica inteira. A numeração "orig." indica a pergunta correspondente no formulário da Dr.IAgenda.</p>
${form ? `<div class="aviso"><b>Como preencher.</b> Clique dentro das caixas para editar. Os campos já trazem os dados do site; substitua os trechos ___ e preencha as caixas vazias. Campos com <span class="obr">*</span> são obrigatórios. Não escreva dados de pacientes (LGPD). Ao terminar, salve o PDF e envie de volta.</div>` : ''}
${cap1}

<h1 class="cap" id="cap2" style="margin-bottom:2mm">2. Preparos de exames</h1>
<p class="intro">Cada preparo segue a mesma estrutura: para que serve, antes do exame, jejum, medicamentos, no dia do exame, após o exame e quando entrar em contato com a clínica.</p>
<div class="aviso"><b>Medicamentos:</b> ${esc(CONFORME)}</div>
${cap2.replace('<section class="preparo"', '<section class="preparo" style="break-before:auto"')}

<h1 class="cap" id="cap3">3. Profissionais</h1>
${cap3}
</body></html>`
}

// ─── PDF com sumário paginado (2 passadas) ────────────────────────────────────
function imprimir(htmlPath, pdfPath) {
  execFileSync(EDGE, ['--headless=new', '--disable-gpu', '--no-pdf-header-footer', '--virtual-time-budget=10000',
    `--print-to-pdf=${pdfPath}`, pathToFileURL(htmlPath).href], { stdio: 'ignore' })
}

function localizarPaginas(pdfPath) {
  const alvos = {
    cap1: '1. Informações da clínica', cap2: '2. Preparos de exames', cap3: '3. Profissionais',
    ...Object.fromEntries(SECOES_CLINICA.map((s, i) => [`sec-${s.id}`, `1.${i + 1} ${s.title}`])),
    ...Object.fromEntries(PREPAROS.map((p, i) => [`prep-${p.slug}`, `2.${i + 1} ${p.nome}`])),
  }
  const py = `
import json, sys, pymupdf
doc = pymupdf.open(sys.argv[1]); alvos = json.loads(sys.argv[2]); res = {}
norm = lambda s: ' '.join(s.split())
textos = [norm(p.get_text()) for p in doc]
for k, t in alvos.items():
    for i in range(2, len(textos)):
        if norm(t) in textos[i]:
            res[k] = i + 1; break
print(json.dumps(res))`
  try {
    return JSON.parse(execFileSync('python', ['-c', py, pdfPath, JSON.stringify(alvos)], { encoding: 'utf8' }))
  } catch (e) {
    console.warn('Aviso: não foi possível numerar o sumário (python + pymupdf).', e.message)
    return {}
  }
}

function gerarPdf(htmlPath, pdfPath, form) {
  writeFileSync(htmlPath, montarHtml({}, form))
  imprimir(htmlPath, pdfPath)
  const paginas = localizarPaginas(pdfPath)
  writeFileSync(htmlPath, montarHtml(paginas, form))
  imprimir(htmlPath, pdfPath)
  console.log('PDF:', path.relative(ROOT, pdfPath), '· sumário com', Object.keys(paginas).length, 'entradas numeradas')
}

const htmlPath = path.join(OUT, 'clinica-nuvem-dr-iagenda.html')
const pdfPath  = path.join(OUT, 'clinica-nuvem-dr-iagenda.pdf')
if (EDGE) {
  // 1) Versão formulário (Parte A editável, pré-preenchida)
  const tmpHtml  = path.join(tmpdir(), 'clinica-nuvem-formulario.html')
  const tmpPdf   = path.join(tmpdir(), 'clinica-nuvem-formulario-base.pdf')
  const formPdf  = path.join(OUT, 'clinica-nuvem-dr-iagenda-formulario.pdf')
  const metaJson = path.join(tmpdir(), 'clinica-nuvem-campos.json')
  gerarPdf(tmpHtml, tmpPdf, true)
  writeFileSync(metaJson, JSON.stringify(camposForm))
  execFileSync('python', ['-W', 'ignore', path.join(ROOT, 'scripts/anamnese-ia/campos-pdf.py'), 'criar', tmpPdf, metaJson, formPdf], { stdio: 'inherit' })
  // 2) Versão de leitura (por último: o relatório usa as pendências desta passada)
  gerarPdf(htmlPath, pdfPath, false)
} else {
  writeFileSync(htmlPath, montarHtml())
  console.warn('Microsoft Edge não encontrado: gerado só o HTML.')
}

// ─── Markdown para a IA ───────────────────────────────────────────────────────
const mdItem = it => `- ${it.t}${it.v ? ` ${VALIDAR}` : ''}`
const md = [
  '# Preparos de exames — NU.V.E.M Medicina',
  '',
  `Versão de ${HOJE}. Texto para a Secretária IA consultar ao responder pacientes no WhatsApp.`,
  '',
  '## Regras para a IA',
  '',
  '- Envie ao paciente apenas o preparo do exame que ele vai fazer.',
  '- Medicamentos: ' + CONFORME + ' Se o paciente perguntar se pode suspender ou manter um remédio, oriente que confirme com o médico que pediu o exame ou transfira para a equipe.',
  '- Não interprete sintomas, não dê diagnóstico e não altere nenhuma orientação abaixo.',
  `- Itens marcados ${VALIDAR} ainda não foram confirmados pela equipe médica: não envie esses itens ao paciente; transfira a dúvida para a equipe.`,
  `- Dúvidas: telefone ${CONTATO.telefone} ou WhatsApp ${CONTATO.whatsapp}.`,
  '',
  ...PREPAROS.flatMap(p => [
    `## ${p.nome}${p.sub ? ` (${p.sub})` : ''}`,
    '',
    `**Para que serve:** ${p.serve}`,
    '',
    ...p.ficha.map(([k, v]) => `- ${k}: ${v}`),
    '',
    '### Antes do exame (dias anteriores)', '', ...(p.antes.length ? p.antes.map(mdItem) : ['- Sem orientações específicas.']), '',
    '### Jejum', '', ...p.jejum.map(mdItem), '',
    '### Medicamentos', '', `- ${CONFORME}`,
    ...p.medicamentos.linhas.map(l => `- ${l.med}: ${l.conduta}${l.obs ? ` (${l.obs})` : ''}${l.v ? ` ${VALIDAR}` : ''}`),
    ...p.medicamentos.notas.map(mdItem), '',
    '### No dia do exame', '', ...p.noDia.map(mdItem), '',
    ...(p.durante ? ['### Durante o monitoramento', '', ...p.durante.map(mdItem), ''] : []),
    '### Após o exame', '', ...p.apos.map(mdItem), '',
    '### Quando entrar em contato com a clínica', '', ...p.contato.map(mdItem), '',
  ]),
].join('\n')
writeFileSync(path.join(OUT, 'preparos-para-ia.md'), md)

// ─── Relatório de validação ───────────────────────────────────────────────────
const faltam = SECOES_CLINICA.flatMap(s => s.fields
  .filter(f => !txt(clinica[f.id]) || /_{3,}/.test(txt(clinica[f.id])))
  .map(f => `- **${s.title}** · ${f.label}${f.required ? ' *(obrigatório)*' : ''}${txt(clinica[f.id]) ? ' — parcialmente preenchido (tem ___)' : ''}`))
const semRegistro = medicos.filter(m => !txt(m.registro)).map(m => `- ${txt(m.nome)}: registro profissional (CRM/RQE) não consta no site`)

const rel = [
  '# Relatório de validação — preparos e dados da clínica',
  '',
  `Gerado em ${HOJE} junto com \`clinica-nuvem-dr-iagenda.pdf\`. Fonte principal dos preparos: PDFs oficiais \`public/pdfs/preparo-*-v1.pdf\`. Comparados com: página \`/exames/preparos\`, \`src/lib/content/exames-detail.ts\` e chatbot Nuvete (\`src/lib/nuvete-data.ts\`).`,
  '',
  `## 1. Itens ${VALIDAR} (${pendencias.length})`,
  '',
  ...PREPAROS.flatMap(p => {
    const ps = pendencias.filter(x => x.exame === p.nome)
    return ps.length ? [`### ${p.nome}`, '', ...ps.map(x => `- [ ] **${x.secao}:** ${x.item}\n  - ${x.motivo}`), ''] : []
  }),
  '## 2. Divergências gerais entre versões publicadas',
  '',
  ...DIVERGENCIAS_GERAIS.map(d => `- ${d}`),
  '',
  '## 3. Ajustes de texto feitos na padronização (sem mudar orientação clínica)',
  '',
  '- Retirados superlativos e promessas para seguir as normas do CFM: "o método não invasivo mais preciso" (H. pylori), "O exame não causa dor" (manometria esofágica), "laudo com o diagnóstico diferencial completo" (halimetria).',
  '- Corrigidos erros de digitação dos PDFs ("esfinsteres", texto repetido no PDF de H. pylori).',
  '- Termos técnicos explicados entre parênteses (ex.: disfagia = dificuldade para engolir).',
  '- Toda menção a suspender ou manter medicamentos passou a trazer "conforme orientação médica".',
  '',
  `## 4. Dados da clínica que faltam (Parte A) — ${faltam.length}`,
  '',
  ...faltam,
  '',
  '## 5. Profissionais',
  '',
  ...(semRegistro.length ? semRegistro : ['- Todos com registro.']),
  '- Agenda, valores, duração, retorno, faixa etária, teleconsulta e restrições: dependem da Parte B (link individual de cada profissional).',
  '- A Dra. Anna Karoline é fisioterapeuta (Crefito); foi mantida na Parte B como profissional que realiza a avaliação pélvica.',
  '',
].join('\n')
writeFileSync(path.join(OUT, 'relatorio-validacao.md'), rel)

console.log(`Markdown e relatório gerados em ${path.relative(ROOT, OUT)} · ${pendencias.length} itens a validar · ${faltam.length} campos da Parte A pendentes`)

// ─── Anexos do formulário da Dr.IAgenda ───────────────────────────────────────
/*
 * Os 5 tipos de anexo que o formulário da Dr.IAgenda aceita. Cada anexo é
 * descrito uma vez como uma lista de blocos e vira PDF (para a Dr.IAgenda) e
 * Markdown (para a IA, a Nuvete e o site).
 *
 * Blocos: { titulo, campos: [ids da Parte A] }
 *         { titulo, tabela: { cols, linhas } }
 *         { titulo, html, md }                  (conteúdo livre)
 *         { passo: n, titulo, campos?, extra? } (passos do script de atendimento)
 */
const CAMPO_A   = Object.fromEntries(SECOES_CLINICA.flatMap(s => s.fields).map(f => [f.id, f]))
const TODOS_MED = Object.fromEntries(CAMPOS_MEDICO.flatMap(s => s.fields).map(f => [f.id, f.label]))
const PREENCHER     = '[A PREENCHER PELA GESTÃO]'
const PREENCHER_MED = '[a preencher pelo profissional]'
const vA = id => txt(clinica[id])
const vM = (m, id) => txt(m[id])

function paresHtml(ids) {
  return `<dl>${ids.map(id => `<div class="par"><dt>${esc(CAMPO_A[id].label)}</dt><dd>${vA(id) ? html(vA(id)) : `<span class="preencher">${PREENCHER}</span>`}</dd></div>`).join('')}</dl>`
}
function paresMd(ids) {
  return ids.map(id => {
    const v = vA(id) || PREENCHER
    return v.includes('\n')
      ? `**${CAMPO_A[id].label}:**\n\n${v.split('\n').map(l => `- ${l}`).join('\n')}`
      : `**${CAMPO_A[id].label}:** ${v}`
  }).join('\n\n')
}
function tabelaHtml({ cols, linhas }) {
  return `<table class="tab"><thead><tr>${cols.map(c => `<th>${esc(c)}</th>`).join('')}</tr></thead><tbody>${
    linhas.map(l => `<tr>${l.map(c => `<td>${c ? html(c) : `<span class="preencher">${PREENCHER_MED}</span>`}</td>`).join('')}</tr>`).join('')}</tbody></table>`
}
function tabelaMd({ cols, linhas }) {
  const cel = c => (c || PREENCHER_MED).replace(/\n/g, '<br>').replace(/\|/g, '/')
  return [`| ${cols.join(' | ')} |`, `| ${cols.map(() => '---').join(' | ')} |`, ...linhas.map(l => `| ${l.map(cel).join(' | ')} |`)].join('\n')
}
const tabela = t => ({ html: tabelaHtml(t), md: tabelaMd(t) })
const texto  = t => ({ html: `<p>${esc(t)}</p>`, md: t })

function renderBlocos(blocos) {
  const h = blocos.map(b => {
    const extra = b.extra?.html ?? ''
    if (b.passo) return `<div class="passo"><h3><span class="num">${b.passo}.</span>${esc(b.titulo)}</h3>${b.campos ? paresHtml(b.campos) : ''}${extra}</div>`
    return `<h3>${esc(b.titulo)}</h3>${b.campos ? paresHtml(b.campos) : ''}${extra}`
  }).join('')
  const m = blocos.map(b => [
    b.passo ? `## ${b.passo}. ${b.titulo}` : `## ${b.titulo}`,
    b.campos ? paresMd(b.campos) : '',
    b.extra?.md ?? '',
  ].filter(Boolean).join('\n\n')).join('\n\n')
  return { h, m }
}

/*
 * Procedimentos de cada profissional com o valor da tabela de preços da
 * clínica (campo valorProcedimento da Parte A). O que cada um realiza vem do
 * formulário dele; o valor vem sempre da tabela, para não haver dois preços.
 */
const PROCEDIMENTOS = [
  { nome: 'Manometria esofágica de alta resolução', tab: /^manometria esof[áa]gica de alta/i,
    acha: l => /manometria esof/i.test(l) && (/alta resolu/i.test(l) || !/convencional/i.test(l)) },
  { nome: 'Manometria esofágica convencional', tab: /^manometria esof[áa]gica convencional/i,
    acha: l => /manometria esof/i.test(l) && (/convencional/i.test(l) || !/alta resolu/i.test(l)) },
  { nome: 'pHmetria esofágica', tab: /^phmetria/i, acha: l => /(^|[^a-zà-ú])ph ?metria/i.test(l) },
  { nome: 'ImpedanciopHmetria esofágica', tab: /^impedanciophmetria/i, acha: l => /imped[âa]n/i.test(l) },
  { nome: 'Manometria anorretal', tab: /^manometria anorretal/i, acha: l => /manometria anorretal/i.test(l) },
  { nome: 'Trânsito colônico', tab: /^tr[âa]nsito/i, acha: l => /tr[âa]nsito col/i.test(l) },
  { nome: 'Teste respiratório para SIBO', tab: /sibo:/i, acha: l => /sibo/i.test(l) && !/metano|imo/i.test(l) },
  { nome: 'Teste respiratório para SIBO + IMO (metano)', tab: /sibo \+ imo/i, acha: l => /sibo/i.test(l) && /metano|imo/i.test(l) },
  { nome: 'Teste respiratório para intolerância à lactose', tab: /lactose/i, acha: l => /lactose/i.test(l) },
  { nome: 'Teste respiratório para intolerância à frutose', tab: /frutose/i, acha: l => /frutose/i.test(l) },
  { nome: 'Teste respiratório para H. pylori', tab: /pylori/i, acha: l => /pylori/i.test(l) },
  { nome: 'Avaliação pélvica com biofeedback', tab: /p[ée]lvica/i, acha: l => /p[ée]lvic|biofeedback/i.test(l) },
]
// "mil Reais", "600,00 REAIS", "R$600" → "R$ 1.000", "R$ 600"
function reais(v) {
  if (!v) return v
  const n = /^\s*mil(\s|$)/i.test(v) ? 1000 : Number((v.match(/\d[\d.]*/)?.[0] ?? '').replace(/\./g, ''))
  return n ? `R$ ${n.toLocaleString('pt-BR')}` : v
}
function precoTabela(re) {
  const linha = txt(clinica.valorProcedimento).split('\n').find(l => re.test(l.trim()))
  const v = linha?.split(':').slice(1).join(':').trim()
  return v && !/_{3,}/.test(v) ? v : 'valor a confirmar com a gestão'
}
function procedimentosDe(m) {
  const realiza = vM(m, 'realiza')
  if (/transferir para a recep/i.test(realiza)) return [['Qualquer pergunta', 'Não informar; transferir para a recepção']]
  const linhasR = realiza.split(/\n|·/).map(l => l.trim()).filter(Boolean)
  // Os valores informados pelo profissional dizem qual manometria esofágica ele faz
  const linhasV = vM(m, 'valoresOutros').split(/\n|·/).map(l => l.trim()).filter(Boolean)
  const especifica = p => /manometria esof/i.test(p.nome) && linhasV.some(l => /manometria esof/i.test(l))
  const achados = PROCEDIMENTOS.filter(p => linhasR.some(p.acha) && (!especifica(p) || linhasV.some(p.acha)))
  const consulta = linhasR.some(l => /consulta/i.test(l)) || /\d/.test(vM(m, 'valorConsulta')) || !achados.length
  return [
    ...(consulta ? [['Consulta', reais(vM(m, 'valorConsulta')) || 'ver tabela de consultas']] : []),
    ...achados.map(p => [p.nome, precoTabela(p.tab)]),
  ]
}

function definirAnexos() {
  const profs = medicos.map(m => ({ nome: vM(m, 'nome') || 'Profissional', m }))
  const linhas = ids => profs.map(({ nome, m }) => [nome, ...ids.map(id => vM(m, id))])
  const soCom = (id, cols) => profs.filter(({ m }) => vM(m, id)).map(({ nome, m }) => [nome, ...cols.map(c => vM(m, c))])

  const gatilhosMed  = soCom('gatilhos', ['gatilhos'])

  return [
    {
      arquivo: '01-orientacoes-de-preparo', tipo: 'Orientações de preparo',
      titulo: 'Orientações de preparo dos exames',
      sub: validacao
        ? `Preparos padronizados com a validação da equipe médica (${validacao.validador || 'validador não informado'}).`
        : 'Preparos padronizados a partir dos PDFs oficiais. Itens marcados ainda aguardam a validação da equipe médica.',
      corpo: `<div class="aviso"><b>Medicamentos:</b> ${esc(CONFORME)}</div>${capituloPreparos('').replace('<section class="preparo"', '<section class="preparo" style="break-before:auto"')}`,
      md,
    },
    {
      arquivo: '02-tabela-de-precos-e-procedimentos', tipo: 'Tabela de preços e procedimentos',
      titulo: 'Tabela de preços e procedimentos',
      sub: 'Exames da clínica, consultas de cada profissional e regras de pagamento.',
      blocos: [
        { titulo: 'Exames e procedimentos realizados na clínica', campos: ['examesOferecidos', 'valorProcedimento'] },
        { titulo: 'Consultas por profissional', extra: tabela({ cols: ['Profissional', 'Especialidade', 'Duração', 'Consulta particular', 'Retorno', 'Teleconsulta'], linhas: linhas(['especialidade', 'duracao', 'valorConsulta', 'retorno', 'teleconsulta']).map(l => (l[3] = reais(l[3]), l)) }) },
        { titulo: 'O que cada profissional realiza e quanto custa', extra: (() => {
          const t = tabela({ cols: ['Profissional', 'Consulta ou exame', 'Valor'], linhas: profs.map(({ nome, m }) => {
            const p = procedimentosDe(m)
            return [nome, p.map(x => x[0]).join('\n'), p.map(x => x[1]).join('\n')]
          }) })
          const nota = 'Valores dos exames conforme a tabela de preços da clínica (acima). Consultas: valor informado por cada profissional. O que cada um realiza vem do formulário do profissional.'
          return { html: `<div style="break-inside:avoid"><p>${esc(nota)}</p>${t.html}</div>`, md: `${nota}\n\n${t.md}` }
        })() },
        { titulo: 'Pagamento', campos: ['cobraAntecipado', 'dinamicaPagamento', 'metodos', 'comoAntecipado', 'parcelamento', 'reembolso'] },
        { titulo: 'Regra para a IA', extra: texto('A IA só informa valores que a clínica autorizou (indicado em cada exame e procedimento). Descontos e negociação de valores são sempre transferidos para a equipe.') },
      ],
    },
    {
      arquivo: '03-lista-e-regras-de-convenio', tipo: 'Lista e regras de convênio',
      titulo: 'Lista e regras de convênio',
      sub: 'Convênios aceitos por profissional, regras de autorização e o que fazer quando o plano não é atendido.',
      blocos: [
        { titulo: 'Convênios por profissional', extra: tabela({ cols: ['Profissional', 'Especialidade', 'Convênios aceitos'], linhas: linhas(['especialidade', 'convenios']) }) },
        { titulo: 'Convênios da clínica', campos: ['convenios'] },
        { titulo: 'Regras', campos: ['regrasConvenio', 'documentosLevar', 'reembolso'] },
        { titulo: 'Regra para a IA', extra: texto('A IA não confirma cobertura de procedimento: informa a lista de convênios e, se o plano do paciente não estiver na lista ou houver dúvida de cobertura, transfere para a equipe.') },
      ],
    },
    {
      arquivo: '04-script-de-atendimento', tipo: 'Script ou fluxo de atendimento',
      titulo: 'Script e fluxo de atendimento',
      sub: 'Ordem da conversa da Secretária IA no WhatsApp, montada a partir da anamnese.',
      aviso: 'Rascunho montado a partir das respostas da anamnese. Precisa ser aprovado pela gestão antes do envio à Dr.IAgenda.',
      blocos: [
        { passo: 1, titulo: 'Apresentação e tom de voz', campos: ['nomeIA', 'tomDeVoz', 'qualificaAgenda'] },
        { passo: 2, titulo: 'Entender a necessidade', campos: ['triagemGeral', 'especialidades'],
          extra: tabela({ cols: ['Profissional', 'Especialidade', 'Faixa etária', 'Perguntas de triagem'], linhas: linhas(['especialidade', 'faixaEtaria', 'triagem']) }) },
        { passo: 3, titulo: 'O que não agendar', campos: ['naoRealiza'],
          extra: tabela({ cols: ['Profissional', 'Não realiza / restrições'], linhas: linhas(['naoAtende']) }) },
        { passo: 4, titulo: 'Agendar', campos: ['regrasAgenda', 'restricoesAgenda', 'antecedencia', 'horarioClinica', 'dadosConfirmacao'],
          extra: tabela({ cols: ['Profissional', 'Dias e horários', 'Duração', 'Encaixes'], linhas: linhas(['diasHorarios', 'duracao', 'encaixes']) }) },
        { passo: 5, titulo: 'Depois de confirmar', campos: ['posConfirmacao', 'documentosLevar', 'preparo'] },
        { passo: 6, titulo: 'Cancelamento, remarcação e atrasos', campos: ['cancelamento', 'remarcacao', 'atraso', 'pacienteAntigo'] },
        { passo: 7, titulo: 'Quando transferir para a equipe', campos: ['gatilhosPadrao', 'gatilhosEspecificos', 'urgencia', 'transferencia', 'horarioWhatsapp'],
          extra: gatilhosMed.length ? tabela({ cols: ['Profissional', 'Transferir quando'], linhas: gatilhosMed }) : undefined },
        { passo: 8, titulo: 'O que a IA nunca faz', campos: ['nuncaFazer'] },
        { passo: 9, titulo: 'Perguntas frequentes', campos: ['faq'] },
      ],
    },
    {
      arquivo: '05-material-de-apoio-clinica', tipo: 'Outro material de apoio',
      titulo: 'Informações da clínica',
      sub: 'Parte A da anamnese e resumo dos profissionais.',
      copiaDe: pdfPath,   // o PDF é o documento completo da clínica; o Markdown resume os mesmos dados
      blocos: [
        ...SECOES_CLINICA.map(s => ({ titulo: s.title, campos: s.fields.map(f => f.id) })),
        { titulo: 'Profissionais', extra: { html: '', md: profs.map(({ nome, m }) => [
          `### ${nome}`, '',
          ...['especialidade', 'registro', 'areas', 'bio', 'realiza', 'faixaEtaria', 'diasHorarios', 'duracao', 'teleconsulta', 'retorno']
            .filter(id => vM(m, id)).map(id => `- **${TODOS_MED[id]}:** ${vM(m, id).replace(/\n/g, ' · ')}`),
        ].join('\n')).join('\n\n') } },
      ],
    },
  ]
}

function anexoHtml(a, corpo) {
  return `<!doctype html>
<html lang="pt-BR"><head><meta charset="utf-8"><title>NU.V.E.M Medicina · ${esc(a.titulo)}</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,500;1,500&family=Poppins:wght@300;400;500;600&display=swap" rel="stylesheet">
${estilos(`${a.tipo} · Dr.IAgenda`)}</head><body>
<div class="anexo-topo"><p class="tag">Anexo para a Dr.IAgenda · ${esc(a.tipo)}</p><h1>${esc(a.titulo)}</h1>
<p>${esc(a.sub ?? '')} NU.V.E.M Medicina · ${esc(CONTATO.endereco)}, ${esc(CONTATO.bairro)} · versão de ${HOJE}.</p></div>
${a.aviso ? `<div class="rascunho">${esc(a.aviso)}</div>` : ''}
${corpo}
</body></html>`
}

function gerarAnexos() {
  const dir = path.join(OUT, 'anexos')
  mkdirSync(dir, { recursive: true })
  for (const a of definirAnexos()) {
    const { h, m } = a.blocos ? renderBlocos(a.blocos) : { h: a.corpo, m: '' }
    const topoMd = [`# ${a.titulo} — NU.V.E.M Medicina`, '', `Anexo para a Dr.IAgenda: ${a.tipo}. Versão de ${HOJE}. ${a.sub ?? ''}`.trim(), ...(a.aviso ? ['', `> ${a.aviso}`] : []), ''].join('\n')
    writeFileSync(path.join(dir, `${a.arquivo}.md`), a.md ?? `${topoMd}\n${m}\n`)
    const pdf = path.join(dir, `${a.arquivo}.pdf`)
    if (a.copiaDe) { if (existsSync(a.copiaDe)) copyFileSync(a.copiaDe, pdf); continue }
    if (!EDGE) continue
    const tmpHtml = path.join(tmpdir(), `anexo-${a.arquivo}.html`)
    writeFileSync(tmpHtml, anexoHtml(a, h))
    imprimir(tmpHtml, pdf)
  }
  console.log(`Anexos: ${path.relative(ROOT, dir)} (5 PDFs + 5 Markdown)`)
}

gerarAnexos()
if (lidos.length) console.log('Respostas lidas:\n  ' + lidos.join('\n  ') + (validacao ? `\n  Validação aplicada a ${validacao.aplicadas} itens.` : ''))
