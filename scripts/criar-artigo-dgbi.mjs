/**
 * Cria o artigo "o que é DGBI" como RASCUNHO no Sanity (_id iniciado por
 * "drafts."). Nunca publica: a publicação é feita manualmente no Studio depois
 * da validação clínica da Dra. Vera Ângelo.
 *
 * O corpo está escrito abaixo com a mesma convenção de marcação do texto
 * aprovado ([H2], [H3], [P], [link: URL]...[/link], [CALLOUT], [FAQ]) e é
 * convertido para Portable Text sem alterar nenhuma palavra.
 *
 * Antes de gravar, o script:
 *   1. bloqueia a gravação se algum termo proibido aparecer fora de `references`;
 *   2. confere se o slug e o _id ainda não existem;
 *   3. tenta resolver cada DOI em https://doi.org (apenas reporta, não corrige).
 *
 * Uso: node scripts/criar-artigo-dgbi.mjs [--aplicar]
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

const SLUG = 'o-que-e-dgbi-disturbio-interacao-intestino-cerebro'
const DOC_ID = 'drafts.post-dgbi-disturbio-interacao-intestino-cerebro'

const CORPO = `
[P] Você sente a barriga estufar ao longo do dia, tem uma dor que vai e volta, uma azia que não passa ou um intestino que alterna entre preso e solto. Fez exames de sangue, endoscopia, talvez colonoscopia, e ouviu que estava tudo normal. Os sintomas, porém, continuam. Essa situação é frequente no consultório de gastroenterologia e tem nome: distúrbio da interação intestino-cérebro, conhecido pela sigla em inglês DGBI (disorder of gut-brain interaction).
[P] Exame normal não significa sintoma inventado. Significa que a origem do incômodo não está numa lesão visível, e sim na forma como o sistema digestivo funciona e se comunica com o sistema nervoso. Este artigo explica o que a ciência sabe hoje sobre esses distúrbios, como o diagnóstico é feito e quando procurar avaliação.
[H2] O que é um DGBI
[P] A Fundação Roma, organização internacional que reúne especialistas e publica os critérios usados em todo o mundo para classificar esses quadros, define os DGBIs como um grupo de distúrbios com sintomas gastrointestinais crônicos ou recorrentes, sem uma doença estrutural que os explique de forma clara (1).
[P] Na prática, a endoscopia, a colonoscopia, a ultrassonografia e os exames laboratoriais podem vir sem alterações, e ainda assim os sintomas são reais, podem ser medidos por questionários validados e têm impacto concreto na rotina, no trabalho e no sono.
[P] Os DGBIs podem acometer qualquer parte do trato digestivo, do esôfago até o ânus. Entre os mais conhecidos estão a síndrome do intestino irritável, a dispepsia funcional, que causa desconforto persistente na parte alta da barriga com empachamento ou sensação de estômago cheio logo no começo da refeição, e a constipação crônica. A edição mais recente dos critérios, chamada Roma V, descreve 25 distúrbios desse grupo em adultos e 27 em crianças (1).
[H2] Por que o nome mudou
[P] Durante décadas, esses quadros foram agrupados sob um nome que usava a palavra "funcional". O termo acabou associado à ideia de um problema sem causa orgânica, e muitos pacientes ouviram que o sintoma era emocional, imaginário ou "de nervoso".
[P] A Fundação Roma substituiu essa nomenclatura por considerar a palavra inespecífica e estigmatizante, e porque o conhecimento científico avançou. Hoje se entende que esses distúrbios envolvem alterações na função do sistema digestivo e na regulação do eixo intestino-cérebro. A nova denominação foi definida por um processo formal de consenso entre especialistas, conhecido como método Delphi (1, 2).
[CALLOUT tipo=info titulo="DGBI e DICI são a mesma coisa"] Em português, você também pode encontrar a sigla DICI, de distúrbios da interação cérebro-intestino. Ela se refere ao mesmo grupo de condições descrito pelos critérios de Roma.
[H2] O que acontece no organismo
[P] O intestino tem uma rede própria de neurônios, o sistema nervoso entérico, que troca informações o tempo todo com o cérebro por meio de nervos, hormônios, células de defesa e substâncias produzidas pelas bactérias intestinais. Esse circuito de mão dupla é chamado de eixo intestino-cérebro (3).
[P] Nos DGBIs, os sintomas parecem surgir de uma combinação de mecanismos, que varia de pessoa para pessoa. A Fundação Roma descreve cinco deles (1, 4).
[H3] O movimento do intestino muda de ritmo
[P] As contrações que empurram o alimento ao longo do tubo digestivo podem ficar aceleradas, lentas ou descoordenadas. Isso contribui para diarreia, intestino preso, sensação de estômago pesado ou refluxo.
[H3] O intestino fica mais sensível
[P] Estímulos que normalmente passariam despercebidos, como a distensão causada por uma quantidade habitual de gases, passam a ser sentidos como dor ou desconforto. Esse fenômeno se chama hipersensibilidade visceral e ajuda a explicar por que algumas pessoas sentem a barriga muito estufada sem ter excesso de gás.
[H3] A mucosa e as defesas do intestino se alteram
[P] A camada que reveste o intestino e as células de defesa próximas a ela podem apresentar uma ativação discreta, que não aparece como inflamação nos exames de rotina. Um exemplo bem estudado é a síndrome do intestino irritável que começa depois de uma gastroenterite infecciosa (5).
[H3] A microbiota intestinal se modifica
[P] A composição e a atividade das bactérias que vivem no intestino podem ser diferentes nas pessoas com DGBI, com possível influência sobre gases, sensibilidade e trânsito intestinal. A ciência ainda não estabeleceu se essas diferenças são causa, consequência ou as duas coisas ao mesmo tempo, e esse é hoje um dos pontos mais pesquisados da área (3).
[H3] O cérebro processa os sinais de outro jeito
[P] Os sinais que chegam do intestino podem ser amplificados no sistema nervoso central. Estresse, ansiedade e noites mal dormidas interferem nesse processamento, e o desconforto intestinal persistente, por sua vez, também afeta o humor e o sono. A influência corre nos dois sentidos.
[H2] DGBI quer dizer que o problema é psicológico?
[P] Não. Essa é justamente a confusão que a mudança de nome procura desfazer. Falar em interação intestino-cérebro é descrever uma via biológica de comunicação entre dois órgãos, e não afirmar que o sintoma é imaginado.
[P] Uma pessoa não precisa ter ansiedade ou depressão para receber o diagnóstico de DGBI. Da mesma forma, quem tem ansiedade ou depressão também pode ter doenças orgânicas do aparelho digestivo, que precisam ser investigadas. Uma coisa não exclui a outra.
[H2] São distúrbios comuns?
[P] Sim. Um estudo internacional conduzido pela Fundação Roma em dezenas de países encontrou, em questionários respondidos pela internet, mais de 40% dos adultos preenchendo critérios para ao menos um DGBI. Nas entrevistas domiciliares feitas no mesmo estudo, a proporção foi menor, o que mostra como a forma de coletar os dados influencia a estimativa. Nos dois formatos, esses distúrbios apareceram associados a pior qualidade de vida e a maior uso de serviços de saúde (6).
[H2] Como é feito o diagnóstico
[P] O diagnóstico de um DGBI não é simplesmente o que sobra quando todos os exames dão negativos. Os critérios de Roma permitem um diagnóstico positivo, construído a partir do padrão dos sintomas: onde o incômodo aparece, como se relaciona com a evacuação ou com a alimentação, há quanto tempo está presente e com que frequência se repete (2, 7).
[P] A consulta, com história clínica detalhada e exame físico, é a base de tudo. Os exames complementares entram de forma dirigida, para afastar outras doenças quando há indicação ou para medir como um determinado órgão está funcionando. Dependendo da queixa, o médico pode pedir exames de sangue e de fezes, endoscopia, colonoscopia e exames de função digestiva, como a [link: /exames/manometria-esofagica]manometria esofágica de alta resolução[/link], a [link: /exames/phmetria-impedanciometria]pHmetria com impedanciometria[/link], a [link: /exames/manometria-anorretal]manometria anorretal[/link] e os [link: /exames/testes-respiratorios]testes respiratórios[/link]. Nem todo paciente precisa de todos eles, e a indicação é sempre individual.
[CALLOUT tipo=atencao titulo="Sinais que pedem avaliação médica sem demora"] Perda de peso sem explicação, sangue nas fezes ou fezes muito escuras, anemia, febre, vômitos que não passam, dificuldade progressiva para engolir, sintomas que acordam você durante a noite, sintomas que começaram recentemente em idade mais avançada e histórico familiar de câncer de intestino, doença celíaca ou doença inflamatória intestinal. Esses sinais não significam necessariamente uma doença grave, mas indicam que outras causas precisam ser investigadas antes de se pensar em DGBI.
[H2] Como é o tratamento
[P] O tratamento varia conforme o distúrbio e conforme os mecanismos que predominam em cada pessoa. Um passo que costuma ser subestimado é a própria explicação do diagnóstico: entender o que está acontecendo no corpo e construir uma boa relação com o médico fazem parte do cuidado (4).
[P] Ajustes na alimentação podem ajudar, sempre com orientação profissional. Em alguns casos de síndrome do intestino irritável, por exemplo, pode ser indicada uma redução temporária de carboidratos que fermentam com facilidade no intestino, seguida de reintrodução gradual, para evitar restrições desnecessárias (8).
[P] Os medicamentos são escolhidos de acordo com o sintoma principal. Entre eles estão os chamados neuromoduladores, remédios que atuam na comunicação entre o intestino e o sistema nervoso. Alguns pertencem a classes também usadas no tratamento da depressão, mas, nos DGBIs, são prescritos com outro objetivo, que é reduzir a sensibilidade e a dor (9).
[P] Terapias psicológicas voltadas para o intestino, como a terapia cognitivo-comportamental e a hipnoterapia dirigida ao intestino, também têm estudos favoráveis em alguns DGBIs (10). Quando há dificuldade para evacuar por falta de coordenação da musculatura do assoalho pélvico, a [link: /especialidades/fisioterapia-pelvica]fisioterapia pélvica com biofeedback[/link] pode fazer parte do plano.
[P] O objetivo do tratamento é reduzir os sintomas e melhorar a qualidade de vida. A evolução costuma ter fases de melhora e de piora, e a resposta a cada abordagem varia de pessoa para pessoa, por isso o acompanhamento é contínuo.
[H2] Como a NU.V.E.M Medicina acompanha esses pacientes
[P] Na NU.V.E.M Medicina, em Belo Horizonte, a avaliação de quem convive com sintomas digestivos persistentes combina consulta de [link: /especialidades/gastroenterologia]gastroenterologia[/link], exames de função digestiva realizados na própria clínica e, quando indicado, fisioterapia pélvica. A clínica tem certificação ISO 9001 em gestão da qualidade.
[H2] Para profissionais de saúde
[P] A NU.V.E.M Medicina tem uma frente de ensino, a NU.V.E.M Ensino, dedicada à formação de profissionais de saúde. O [link: https://www.nuvemensino.com.br/cursos/dici-neurogastroenterologia-2026?utm_source=nuvemmedicina&utm_medium=blog&utm_campaign=artigo-dgbi]Curso de Aperfeiçoamento em DICI: Neurogastroenterologia e Métodos Diagnósticos Complementares[/link] aborda a fisiopatologia dos distúrbios da interação intestino-cérebro com base nos critérios de Roma, a abordagem clínica do paciente, a interpretação dos exames complementares, como testes respiratórios, manometrias e pHmetria, e os distúrbios da defecação e do assoalho pélvico, com discussão de casos clínicos. A Dra. Vera Ângelo é diretora científica da NU.V.E.M Ensino e professora do curso.
[P] O curso é voltado a médicos, nutricionistas, enfermeiros, fisioterapeutas e outros profissionais de saúde interessados em neurogastroenterologia.
[H2] Perguntas frequentes
[FAQ] Pergunta: Se meus exames deram normais, por que continuo sentindo dor e inchaço? Resposta: Porque os exames de rotina procuram lesões, inflamações e alterações de estrutura. Nos distúrbios da interação intestino-cérebro, o problema está na forma como o sistema digestivo funciona e se comunica com o sistema nervoso, algo que muitas vezes não aparece nesses exames. Resposta: Exame normal ajuda a afastar outras doenças, mas não significa que o sintoma não exista. Uma avaliação médica detalhada pode identificar o padrão dos sintomas e orientar o cuidado.
[FAQ] Pergunta: DGBI é a mesma coisa que síndrome do intestino irritável? Resposta: A síndrome do intestino irritável é um dos DGBIs, e um dos mais conhecidos. O grupo inclui também distúrbios do esôfago, do estômago, do intestino e da região anorretal, como a dispepsia funcional e a constipação crônica.
[FAQ] Pergunta: Ansiedade e estresse causam DGBI? Resposta: Estresse e ansiedade podem influenciar a forma como o cérebro processa os sinais do intestino e, por isso, podem piorar os sintomas em algumas pessoas. Isso não quer dizer que sejam a causa isolada, nem que o problema seja psicológico. Resposta: A relação acontece nos dois sentidos: sintomas intestinais persistentes também afetam o humor e o sono. Muitas pessoas com DGBI não têm ansiedade ou depressão.
[FAQ] Pergunta: DGBI tem tratamento? Resposta: Sim. O tratamento é individual e pode envolver orientação sobre o diagnóstico, ajustes na alimentação com acompanhamento profissional, medicamentos voltados para o sintoma principal, terapias psicológicas focadas no intestino e fisioterapia pélvica, conforme o caso. Resposta: São condições que costumam ter fases de melhora e de piora. O objetivo é reduzir os sintomas e melhorar a qualidade de vida, e a resposta a cada abordagem varia de pessoa para pessoa.
[FAQ] Pergunta: Como sei se preciso de algum exame específico? Resposta: Quem define é o médico, a partir da consulta. Exames de função digestiva, como manometria, pHmetria e testes respiratórios, são indicados conforme a queixa e a suspeita clínica. Nem todo paciente com DGBI precisa deles.
[FAQ] Pergunta: Quando devo procurar atendimento com mais urgência? Resposta: Procure avaliação sem demora se houver perda de peso sem explicação, sangue nas fezes ou fezes muito escuras, anemia, febre, vômitos persistentes, dificuldade progressiva para engolir, sintomas que acordam durante a noite ou histórico familiar de câncer de intestino, doença celíaca ou doença inflamatória intestinal.
[FAQ] Pergunta: Qual a diferença entre DGBI e doença inflamatória intestinal? Resposta: Na doença de Crohn e na retocolite ulcerativa existe inflamação que pode ser vista em exames como a colonoscopia e a biópsia. Nos DGBIs, os sintomas acontecem sem uma lesão estrutural que os explique. As duas situações podem até coexistir na mesma pessoa, e por isso a avaliação médica é importante.
[FAQ] Pergunta: Crianças também podem ter DGBI? Resposta: Sim. Os critérios de Roma têm uma classificação própria para crianças e adolescentes, que inclui quadros como a dor abdominal recorrente e a constipação. A avaliação deve ser feita por profissional com experiência em saúde digestiva infantil.
[P] Este conteúdo tem caráter informativo e não substitui a consulta médica. Responsável técnica: Dra. Vera Ângelo, CRM-MG 22284, RQE 10411 (Gastroenterologia) e RQE 22736 (Patologia Clínica), diretora técnica da NU.V.E.M Medicina, CRM-MG 20532.
`

const REFERENCIAS = [
  ['THE ROME FOUNDATION. What is a Disorder of Gut-Brain Interaction (DGBI)? Acesso em 29 set. 2026.', 'https://theromefoundation.org/what-is-a-disorder-of-gut-brain-interaction-dgbi/'],
  ['DROSSMAN, D. A.; HASLER, W. L. Rome IV: Functional GI Disorders: Disorders of Gut-Brain Interaction. Gastroenterology. 2016;150(6):1257-1261.', 'https://doi.org/10.1053/j.gastro.2016.03.035'],
  ['MAYER, E. A.; NANCE, K.; CHEN, S. The Gut-Brain Axis. Annual Review of Medicine. 2022;73:439-453.', 'https://doi.org/10.1146/annurev-med-042320-014032'],
  ['DROSSMAN, D. A. Functional Gastrointestinal Disorders: History, Pathophysiology, Clinical Features, and Rome IV. Gastroenterology. 2016;150(6):1262-1279.', 'https://doi.org/10.1053/j.gastro.2016.02.032'],
  ['BARBARA, G. et al. Rome Foundation Working Team Report on Post-Infection Irritable Bowel Syndrome. Gastroenterology. 2019;156(1):46-58.', 'https://doi.org/10.1053/j.gastro.2018.07.011'],
  ['SPERBER, A. D. et al. Worldwide Prevalence and Burden of Functional Gastrointestinal Disorders, Results of Rome Foundation Global Study. Gastroenterology. 2021;160(1):99-114.', 'https://doi.org/10.1053/j.gastro.2020.04.014'],
  ['BLACK, C. J. et al. Functional gastrointestinal disorders: advances in understanding and management. The Lancet. 2020;396(10263):1664-1674.', 'https://doi.org/10.1016/S0140-6736(20)32115-2'],
  ['LACY, B. E. et al. ACG Clinical Guideline: Management of Irritable Bowel Syndrome. American Journal of Gastroenterology. 2021;116(1):17-44.', 'https://doi.org/10.14309/ajg.0000000000001036'],
  ['DROSSMAN, D. A. et al. Neuromodulators for Functional Gastrointestinal Disorders (Disorders of Gut-Brain Interaction): A Rome Foundation Working Team Report. Gastroenterology. 2018;154(4):1140-1171.', 'https://doi.org/10.1053/j.gastro.2017.11.279'],
  ['KEEFER, L.; KO, C. W.; FORD, A. C. AGA Clinical Practice Update on Management of Chronic Gastrointestinal Pain in Disorders of Gut-Brain Interaction: Expert Review. Clinical Gastroenterology and Hepatology. 2021;19(12):2481-2488.', 'https://doi.org/10.1016/j.cgh.2021.07.006'],
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
  title: 'Exames normais, mas a barriga continua incomodando? Entenda o que é um DGBI',
  slug:  { _type: 'slug', current: SLUG },
  author: { _type: 'reference', _ref: AUTOR_ID },
  perguntaPrincipal: 'por que sinto dor e inchaço na barriga se os exames deram normais',
  respostaDireta: 'Quando dor, inchaço, azia ou alteração do intestino persistem e os exames não mostram uma lesão que explique os sintomas, uma possibilidade é um DGBI, distúrbio da interação intestino-cérebro. É uma condição real, reconhecida pelos critérios de Roma, em que a comunicação entre o intestino e o sistema nervoso funciona de forma alterada. O diagnóstico é médico.',
  excerpt: 'Barriga estufada, dor que vai e volta e exames normais: entenda o que são os distúrbios da interação intestino-cérebro (DGBIs), por que o nome mudou, como é feito o diagnóstico e quando procurar avaliação.',
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
