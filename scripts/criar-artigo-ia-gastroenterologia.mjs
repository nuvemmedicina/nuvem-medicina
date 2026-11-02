/**
 * Cria o artigo "inteligência artificial na gastroenterologia" como RASCUNHO no
 * Sanity (_id iniciado por "drafts."). Nunca publica: a publicação é feita
 * manualmente no Studio depois da validação clínica da Dra. Vera Ângelo.
 *
 * Texto original para pacientes, baseado no artigo "Inteligência artificial e
 * Gastroenterologia" (Revista FBG, out. 2026), da Dra. Vera Ângelo e do Prof.
 * Joaquim Prado P. Moraes Filho. Não reproduz trechos do original, que é citado
 * com link como referência (1).
 *
 * O corpo está escrito abaixo com a convenção de marcação ([H2], [H3], [P],
 * [link: URL]...[/link], [CALLOUT], [FAQ]) e é convertido para Portable Text.
 *
 * Antes de gravar, o script:
 *   1. bloqueia a gravação se algum termo proibido aparecer fora de `references`;
 *   2. confere se o slug e o _id ainda não existem;
 *   3. tenta resolver cada DOI em https://doi.org (apenas reporta, não corrige).
 *
 * Uso: node scripts/criar-artigo-ia-gastroenterologia.mjs [--aplicar]
 * Sem --aplicar, só mostra o documento e o relatório (simulação).
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

if (!process.env.SANITY_WRITE_TOKEN && existsSync('.env.local')) {
  for (const linha of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = linha.match(/^\s*SANITY_WRITE_TOKEN\s*=\s*(.+?)\s*$/)
    if (m) process.env.SANITY_WRITE_TOKEN = m[1].replace(/^["']|["']$/g, '')
  }
}
const token = process.env.SANITY_WRITE_TOKEN
if (!token) { console.error('❌ SANITY_WRITE_TOKEN ausente'); process.exit(1) }

const aplicar = process.argv.includes('--aplicar')

const client = createClient({
  projectId: 'q8ibxbuz', dataset: 'production',
  apiVersion: '2024-01-01', token, useCdn: false,
})

const key = () => randomUUID().slice(0, 12)

// _id real da Dra. Vera Ângelo, confirmado por consulta ao Sanity.
const AUTOR_ID = '5b492da1-2aea-4c14-a4bc-6e1320bae377'

// Categoria "Gastroenterologia", confirmada pela equipe.
const CATEGORIA_IDS = ['6ab15a9a-ea2b-4843-9f34-e551a39f096d']

const SLUG = 'inteligencia-artificial-na-gastroenterologia-o-que-muda-para-o-paciente'
const DOC_ID = 'drafts.post-inteligencia-artificial-gastroenterologia'

const URL_FBG = 'https://fbg.org.br/revista-fbg/2026/10/29/inteligencia-artificial-e-gastroenterologia/'

const CORPO = `
[P] A inteligência artificial já faz parte da medicina: aparece na leitura de exames, na organização de prontuários e na produção de textos. Na gastroenterologia não é diferente. Para o paciente, a pergunta que importa é simples: essa tecnologia torna o cuidado mais preciso e mais atento a cada pessoa?
[P] Esse foi o tema do artigo "Inteligência artificial e Gastroenterologia", publicado em outubro de 2026 na [link: ${URL_FBG}]Revista FBG[/link], da Federação Brasileira de Gastroenterologia. O texto é assinado pela [link: /dra-vera-angelo]Dra. Vera Ângelo[/link], responsável técnica da NU.V.E.M Medicina, e pelo Prof. Joaquim Prado P. Moraes Filho, professor associado de Gastroenterologia da Faculdade de Medicina da USP (1). A seguir, explicamos em linguagem simples os principais pontos e o que eles significam para quem cuida da saúde digestiva.
[H2] O que é inteligência artificial na saúde
[P] De forma resumida, são programas de computador treinados com grandes volumes de dados, como imagens, traçados de exames e registros clínicos, para reconhecer padrões. Na saúde, eles podem sugerir uma leitura, destacar um achado ou organizar informações. Não examinam o paciente nem conhecem a sua história.
[H2] Onde a IA está sendo estudada na saúde digestiva
[H3] Exames de motilidade
[P] Na [link: /exames/manometria-esofagica]manometria esofágica de alta resolução[/link], exame que avalia as contrações do esôfago, programas de IA vêm sendo testados para reconhecer padrões no traçado. As revisões disponíveis mostram resultados promissores, mas com métodos muito diferentes entre si e validação ainda insuficiente (1). A interpretação continua seguindo a Classificação de Chicago 4.0, usada internacionalmente para esse exame, e precisa ser cruzada com os sintomas e com outros exames.
[P] Na [link: /exames/phmetria-impedanciometria]pHmetria com impedanciometria[/link], exame que investiga o refluxo, a análise automatizada pode reduzir o trabalho repetitivo de revisão do registro. Os estudos, porém, ainda têm amostras limitadas e não demonstraram benefício direto para o paciente (1).
[H3] Biópsias e patologia digital
[P] Na patologia digital, as lâminas das biópsias são digitalizadas e podem ser analisadas com apoio de IA. Um exemplo estudado é a [link: /blog/esofagite-eosinofilica-tratamento-com-ibps-e-diagnostico]esofagite eosinofílica[/link], em que o diagnóstico depende da contagem de eosinófilos, um tipo de célula de defesa, no tecido do esôfago. Essa contagem pode variar de um observador para outro, e os modelos de IA conseguem localizar e contar essas células, o que pode tornar a medição mais reprodutível (1).
[P] Ainda assim, um programa que funciona bem onde foi desenvolvido pode ter outro desempenho com outra coloração, outro scanner ou fragmentos de qualidade diferente. Por isso a leitura continua sendo revisada pelo patologista e interpretada pelo gastroenterologista junto com o quadro clínico (1).
[H3] Distúrbios da interação intestino-cérebro
[P] Nos [link: /blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro]distúrbios da interação intestino-cérebro (DGBIs)[/link], como a síndrome do intestino irritável, a IA pode ajudar a organizar relatos de sintomas e a identificar perfis de pacientes, combinando sintomas, fatores psicossociais e dados da microbiota. As pesquisas mostram sinais interessantes, mas com muita variação entre os estudos (1).
[P] Nesses quadros, escutar o paciente, reconhecer que os sintomas são reais e decidir o tratamento em conjunto fazem parte do próprio cuidado, e isso não pode ser reproduzido por um algoritmo. Se a tecnologia assumir tarefas repetitivas, pode sobrar mais tempo para a consulta (1).
[H3] Doença inflamatória intestinal, fígado e pâncreas
[P] Na doença inflamatória intestinal, dados coletados com apoio de IA vêm sendo associados a sinais que podem anteceder uma piora, e na doença de Crohn modelos de imagem foram estudados na enterotomografia. No fígado, há estudos com IA aplicada a exames de imagem, biópsias e avaliação de fibrose e gordura. No pâncreas, a IA foi testada em tomografia, ressonância e ecoendoscopia, inclusive para diferenciar lesões benignas e malignas. Em todos esses campos, boa parte das pesquisas é retrospectiva, feita em poucos centros, e precisa ser confirmada antes de chegar à rotina (1).
[H2] O que não muda
[P] O artigo deixa uma mensagem clara: a IA é mais uma ferramenta, e a responsabilidade pela interpretação e pela decisão continua com o médico (1). Um resultado sugerido por um programa precisa ser colocado no contexto de cada pessoa: os sintomas, o exame físico, a história e a evolução ao longo do tempo.
[CALLOUT tipo=atencao titulo="Resposta fluente não é resposta certa"] Ferramentas de IA que conversam e escrevem textos podem soar convincentes e, ainda assim, trazer informações erradas, desatualizadas ou que não se aplicam ao seu caso. Se quiser usá-las para organizar dúvidas, leve as perguntas para a consulta e não mude nem suspenda um tratamento por conta própria.
[H2] O que isso significa para você
[P] Na prática, mesmo quando um exame passa por uma etapa de análise apoiada por IA, a interpretação continua sendo responsabilidade de um médico. E, diante de sintomas digestivos persistentes, quem define o caminho é a avaliação médica: a consulta, os exames indicados para o seu caso e o acompanhamento ao longo do tempo.
[H2] Para profissionais de saúde
[P] O artigo completo, com as 17 publicações científicas que embasam cada ponto, pode ser lido na [link: ${URL_FBG}]Revista FBG[/link]. A Dra. Vera Ângelo é mestre e doutora em Patologia pela Faculdade de Medicina da UFMG e pós-graduanda em Inteligência Artificial para Médicos pela Faculdade Unimed.
[H2] Perguntas frequentes
[FAQ] Pergunta: A inteligência artificial já é usada nos exames digestivos? Resposta: Ela vem sendo estudada em exames como a manometria esofágica, a pHmetria e a análise de biópsias. Os estudos ainda pedem mais validação antes do uso amplo, e a interpretação do resultado continua com o médico.
[FAQ] Pergunta: Posso usar uma ferramenta de IA para entender meus sintomas? Resposta: Ela pode ajudar a organizar dúvidas antes da consulta, mas pode errar mesmo quando parece segura. Essas ferramentas não examinam você nem conhecem a sua história, e não substituem a avaliação médica.
[FAQ] Pergunta: A IA vai substituir o gastroenterologista? Resposta: O artigo publicado na Revista FBG defende que não. A IA pode apoiar a leitura de exames e reduzir tarefas repetitivas, mas a escuta, o exame físico, a interpretação no contexto de cada paciente e a decisão compartilhada continuam sendo papel do médico.
[P] Este conteúdo tem caráter informativo e não substitui a consulta médica. Responsável técnica: Dra. Vera Ângelo, CRM-MG 22284, RQE 10411 (Gastroenterologia) e RQE 22736 (Patologia Clínica), diretora técnica da NU.V.E.M Medicina, CRM-MG 20532.
`

const REFERENCIAS = [
  ['ANDRADE, V. L. Â.; MORAES FILHO, J. P. P. Inteligência artificial e Gastroenterologia. Revista FBG, Federação Brasileira de Gastroenterologia, out. 2026. Acesso em 2 nov. 2026.', URL_FBG],
]

// ─── Conversão para Portable Text ────────────────────────────────────────────

/** Converte um parágrafo com marcações [link: URL]texto[/link] em spans e markDefs. */
function paragrafo(texto, style = 'normal') {
  const children = []
  const markDefs = []
  const re = /\[link: ([^\]]+)\](.*?)\[\/link\]/g
  let ultimo = 0
  let m
  while ((m = re.exec(texto))) {
    if (m.index > ultimo) children.push({ _type: 'span', _key: key(), text: texto.slice(ultimo, m.index), marks: [] })
    const linkKey = key()
    markDefs.push({ _type: 'link', _key: linkKey, href: m[1] })
    children.push({ _type: 'span', _key: key(), text: m[2], marks: [linkKey] })
    ultimo = re.lastIndex
  }
  if (ultimo < texto.length) children.push({ _type: 'span', _key: key(), text: texto.slice(ultimo), marks: [] })
  return { _type: 'block', _key: key(), style, markDefs, children }
}

function converterCorpo(marcado) {
  const blocos = []
  for (const linha of marcado.split('\n').map(l => l.trim()).filter(Boolean)) {
    let m
    if ((m = linha.match(/^\[(H2|H3)\] (.+)$/))) {
      blocos.push(paragrafo(m[2], m[1].toLowerCase()))
    } else if ((m = linha.match(/^\[P\] (.+)$/))) {
      blocos.push(paragrafo(m[1]))
    } else if ((m = linha.match(/^\[CALLOUT tipo=(\w+) titulo="([^"]+)"\] (.+)$/))) {
      blocos.push({ _type: 'calloutBlock', _key: key(), tipo: m[1], titulo: m[2], texto: m[3] })
    } else if ((m = linha.match(/^\[FAQ\] Pergunta: (.+?) Resposta: (.+)$/))) {
      const paragrafos = m[2].split(/ Resposta: /)
      blocos.push({
        _type: 'faqItem', _key: key(), pergunta: m[1],
        resposta: paragrafos.map(p => paragrafo(p)),
      })
    } else {
      throw new Error(`Linha sem marcação reconhecida: ${linha.slice(0, 80)}`)
    }
  }
  return blocos
}

const body = converterCorpo(CORPO)

const doc = {
  _id:   DOC_ID,
  _type: 'post',
  language: 'pt-BR',
  title: 'Inteligência artificial na gastroenterologia: o que muda (e o que não muda) para o paciente',
  slug:  { _type: 'slug', current: SLUG },
  author: { _type: 'reference', _ref: AUTOR_ID },
  perguntaPrincipal: 'a inteligência artificial pode diagnosticar problemas digestivos sozinha',
  respostaDireta: 'Não. A inteligência artificial vem sendo estudada como apoio na leitura de exames como manometria, pHmetria e biópsias, mas os resultados ainda precisam de validação clínica. A interpretação e a decisão continuam com o médico, que considera os sintomas e a história de cada paciente.',
  excerpt: 'A inteligência artificial chegou aos exames digestivos. Entenda onde ela pode ajudar, quais são os limites atuais e por que a decisão continua com o médico.',
  especialidadeRelacionada: 'gastroenterologia',
  // Valor inicial do schema; a data real é ajustada na publicação.
  publishedAt: new Date().toISOString(),
  ...(CATEGORIA_IDS.length > 0 && {
    categories: CATEGORIA_IDS.map(id => ({ _type: 'reference', _ref: id, _key: key() })),
  }),
  body,
  references: REFERENCIAS.map(([citation, url]) => ({ _type: 'citationItem', _key: key(), citation, url })),
}

// ─── Contagem de palavras e tempo de leitura ─────────────────────────────────

function textoDoBloco(b) {
  if (b._type === 'block') return b.children.map(c => c.text).join('')
  if (b._type === 'calloutBlock') return `${b.titulo} ${b.texto}`
  if (b._type === 'faqItem') return `${b.pergunta} ${b.resposta.map(textoDoBloco).join(' ')}`
  return ''
}
const textoCorpo = body.map(textoDoBloco).join(' ')
const palavras = textoCorpo.split(/\s+/).filter(Boolean).length
doc.readingTime = Math.ceil(palavras / 200)

// ─── Checagem de termos (tudo menos `references`) ───────────────────────────

// Os dois primeiros termos são o travessão e o meio-travessão, escritos por código Unicode.
const TERMOS = ['\u2014', '\u2013', 'doenças funcionais', 'doença funcional', 'único', 'única', 'melhor', 'referência', 'líder', 'pioneir', 'exclusiv', 'o mais completo', 'cura', 'curar', 'garant']
const CHAVES_IGNORADAS = new Set(['references', '_key', '_type', '_ref', '_id'])

function coletarTextos(valor, caminho, saida) {
  if (typeof valor === 'string') saida.push([caminho, valor])
  else if (Array.isArray(valor)) valor.forEach((v, i) => coletarTextos(v, `${caminho}[${i}]`, saida))
  else if (valor && typeof valor === 'object') {
    for (const [k, v] of Object.entries(valor)) if (!CHAVES_IGNORADAS.has(k)) coletarTextos(v, caminho ? `${caminho}.${k}` : k, saida)
  }
  return saida
}

// Estes termos só contam como palavra inteira, para não barrar "procurar",
// "escuras", "melhorar" ou "melhora". Os demais continuam valendo como trecho
// de palavra (ex.: "pioneir" pega "pioneiro" e "pioneira").
const PALAVRA_INTEIRA = new Set(['melhor', 'cura', 'curar'])

function regexDoTermo(termo) {
  const escapado = termo.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
  return PALAVRA_INTEIRA.has(termo)
    ? new RegExp(`(?<!\\p{L})${escapado}(?!\\p{L})`, 'giu')
    : new RegExp(escapado, 'giu')
}

const ocorrencias = []
for (const [caminho, texto] of coletarTextos(doc, '', [])) {
  for (const termo of TERMOS) {
    for (const m of texto.matchAll(regexDoTermo(termo))) {
      ocorrencias.push({ termo, caminho, trecho: texto.slice(Math.max(0, m.index - 40), m.index + termo.length + 40) })
    }
  }
}

// ─── Limites do schema (a API não valida, o Studio sim) ─────────────────────

const avisosSchema = []
if (doc.respostaDireta.length > 320) avisosSchema.push(`respostaDireta tem ${doc.respostaDireta.length} caracteres (máximo do schema: 320)`)
if (doc.excerpt.length > 200) avisosSchema.push(`excerpt tem ${doc.excerpt.length} caracteres (máximo do schema: 200)`)
const palavrasResposta = doc.respostaDireta.split(/\s+/).filter(Boolean).length
if (palavrasResposta > 60) avisosSchema.push(`respostaDireta tem ${palavrasResposta} palavras (orientação do schema: até sessenta)`)

// ─── DOIs ────────────────────────────────────────────────────────────────────

async function verificarUrl(url) {
  try {
    const r = await fetch(url, { method: 'GET', redirect: 'manual', signal: AbortSignal.timeout(15000) })
    return { status: r.status, destino: r.headers.get('location') }
  } catch (e) {
    return { status: 'erro', destino: e.message }
  }
}

const verificacoesDoi = []
for (const r of doc.references) {
  const res = await verificarUrl(r.url)
  const ehDoi = r.url.startsWith('https://doi.org/')
  const resolveu = ehDoi ? (res.status >= 300 && res.status < 400) : (res.status >= 200 && res.status < 400)
  verificacoesDoi.push({ url: r.url, ehDoi, resolveu, ...res })
}

// ─── Relatório ───────────────────────────────────────────────────────────────

console.log(JSON.stringify(doc, null, 2))
console.log('\n══════ RELATÓRIO ══════')
console.log(`_id: ${doc._id}`)
console.log(`Palavras no corpo: ${palavras}`)
console.log(`readingTime: ${doc.readingTime} min`)
console.log(`Blocos: ${body.length} (${body.filter(b => b._type === 'faqItem').length} FAQ, ${body.filter(b => b._type === 'calloutBlock').length} callouts)`)
console.log(`Categorias: ${CATEGORIA_IDS.length ? CATEGORIA_IDS.join(', ') : '(nenhuma, aguardando confirmação)'}`)

console.log('\nLinks no corpo:')
for (const b of body.flatMap(b => b._type === 'faqItem' ? b.resposta : [b])) {
  for (const md of b.markDefs ?? []) console.log(`  ${md.href}`)
}

console.log('\nVerificação de referências:')
for (const v of verificacoesDoi) {
  console.log(`  ${v.resolveu ? '✅' : '⚠️'} ${v.url}  →  ${v.status}${v.destino ? ` ${v.destino}` : ''}`)
}

if (avisosSchema.length) {
  console.log('\n⚠️  Limites do schema:')
  for (const a of avisosSchema) console.log(`  ${a}`)
}

if (ocorrencias.length) {
  console.log(`\n❌ Termos bloqueados encontrados (${ocorrencias.length}):`)
  for (const o of ocorrencias) console.log(`  "${o.termo}" em ${o.caminho}: ...${o.trecho}...`)
} else {
  console.log('\n✅ Nenhum termo bloqueado encontrado')
}

if (!aplicar) {
  console.log('\n(simulação: rode com --aplicar para gravar o rascunho)')
  process.exit(0)
}

// ─── Gravação ────────────────────────────────────────────────────────────────

if (ocorrencias.length) { console.error('\n❌ Gravação cancelada: há termos bloqueados no texto.'); process.exit(1) }
if (CATEGORIA_IDS.length === 0) { console.error('\n❌ Gravação cancelada: categoria ainda não confirmada.'); process.exit(1) }

const existentes = await client.fetch(
  '*[_type=="post" && (slug.current==$slug || _id in [$id, $idPublicado])]{_id}',
  { slug: SLUG, id: DOC_ID, idPublicado: DOC_ID.replace(/^drafts\./, '') },
  { perspective: 'raw' },
)
if (existentes.length) { console.error(`\n❌ Gravação cancelada: já existe documento com este slug ou _id: ${existentes.map(e => e._id).join(', ')}`); process.exit(1) }

const resultado = await client.createIfNotExists(doc)
console.log(`\n✅ Rascunho gravado: ${resultado._id}`)
console.log(`   Studio: /studio/structure/post;${DOC_ID.replace(/^drafts\./, '')}`)
