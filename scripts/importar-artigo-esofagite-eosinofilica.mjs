/**
 * Republica o artigo "Esofagite Eosinofílica (EoE): O Papel dos IBPs no Tratamento
 * e Panorama Atual" no Sanity, como RASCUNHO (aparece no Studio para revisão
 * antes de publicar).
 *
 * A imagem de capa NÃO é enviada por aqui — ela é escolhida/editada direto no Studio.
 *
 * Uso: adicione ao .env.local a linha
 *   SANITY_WRITE_TOKEN=<token com permissao de Editor>
 * e rode:
 *   node scripts/importar-artigo-esofagite-eosinofilica.mjs
 *
 * O token nunca é gravado neste arquivo.
 */
import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'

// Lê SANITY_WRITE_TOKEN do ambiente ou do .env.local (que não vai para o git).
if (!process.env.SANITY_WRITE_TOKEN && existsSync('.env.local')) {
  for (const linha of readFileSync('.env.local', 'utf8').split('\n')) {
    const m = linha.match(/^\s*SANITY_WRITE_TOKEN\s*=\s*(.+?)\s*$/)
    if (m) process.env.SANITY_WRITE_TOKEN = m[1].replace(/^["']|["']$/g, '')
  }
}

const token = process.env.SANITY_WRITE_TOKEN
if (!token) {
  console.error('❌ Defina SANITY_WRITE_TOKEN antes de rodar. Veja o cabeçalho deste arquivo.')
  process.exit(1)
}

const AUTOR_VERA = '5b492da1-2aea-4c14-a4bc-6e1320bae377'
const CAT_GASTRO = '6ab15a9a-ea2b-4843-9f34-e551a39f096d'
const SLUG       = 'esofagite-eosinofilica-tratamento-com-ibps-e-diagnostico'
const PDF_URL    = 'https://nuvemmedicina.com.br/pdfs/esofagite-eosinofilica-eoe-v1.pdf'

const client = createClient({
  projectId:  'q8ibxbuz',
  dataset:    'production',
  apiVersion: '2024-01-01',
  token,
  useCdn:     false,
})

const k = () => randomUUID().slice(0, 12)

/** Parágrafo (ou título) de texto simples. */
const p = (text, style = 'normal') => ({
  _type: 'block', _key: k(), style, markDefs: [],
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
})

/**
 * Bloco com trechos em negrito.
 * Uso: rich(['Texto normal ', ['negrito', 'strong'], ' e mais texto.'])
 */
const rich = (partes, { style = 'normal', listItem } = {}) => ({
  _type: 'block', _key: k(), style, markDefs: [],
  ...(listItem ? { listItem, level: 1 } : {}),
  children: partes.map(parte =>
    Array.isArray(parte)
      ? { _type: 'span', _key: k(), text: parte[0], marks: [parte[1]] }
      : { _type: 'span', _key: k(), text: parte, marks: [] },
  ),
})

const li = text => ({
  _type: 'block', _key: k(), style: 'normal', listItem: 'bullet', level: 1, markDefs: [],
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
})

const liRich = partes => rich(partes, { listItem: 'bullet' })

const body = [
  p('A Esofagite Eosinofílica (EoE) tem se tornado uma condição cada vez mais diagnosticada na prática clínica gastroenterológica. Caracterizada como uma doença imunomediada crônica, ela impacta diretamente a qualidade de vida dos pacientes, podendo evoluir de um quadro inflamatório para complicações estruturais graves, como a estenose esofágica.'),

  p('O que é a Esofagite Eosinofílica?', 'h2'),
  p('A EoE ocorre devido a uma resposta imunoalérgica (predominantemente a antígenos alimentares) que recruta eosinófilos para a mucosa do esôfago. Esse infiltrado inflamatório causa danos estruturais e sintomas que variam conforme a idade:'),

  p('Em crianças', 'h3'),
  li('Recusa alimentar'),
  li('Náuseas e vômitos'),
  li('Atraso no crescimento'),

  p('Em adolescentes e adultos', 'h3'),
  li('Disfagia (dificuldade para engolir)'),
  li('Impactação alimentar'),
  li('Sensação de entalo'),

  {
    _type: 'statBlock', _key: k(),
    titulo: 'A EoE em números',
    items: [
      { _type: 'statItem', _key: k(), valor: '40',  label: 'casos por 100.000 habitantes (prevalência)', fonte: 'Meta-análise global com mais de 288 milhões de participantes' },
      { _type: 'statItem', _key: k(), valor: '5,3', label: 'casos por 100.000 habitantes (incidência anual)', fonte: 'Meta-análise global com mais de 288 milhões de participantes' },
    ],
  },
  p('A doença afeta majoritariamente homens jovens com histórico de atopia (asma, rinite ou eczema).'),

  p('Diagnóstico: sintomas e histopatologia', 'h2'),
  p('O diagnóstico de precisão da EoE baseia-se em um tripé fundamental:'),
  li('Sintomas clínicos'),
  li('Achados endoscópicos'),
  li('Análise histológica'),

  {
    _type: 'calloutBlock', _key: k(), tipo: 'info',
    titulo: 'Dra. Vera Ângelo destaca: a importância da EDA',
    texto:
      'Na Endoscopia Digestiva Alta (EDA), a observação criteriosa busca por sinais clássicos da doença: edema, sulcos lineares, exsudatos esbranquiçados e anéis esofágicos.',
  },
  {
    _type: 'calloutBlock', _key: k(), tipo: 'atencao',
    titulo: 'Confirmação histológica',
    texto:
      'Requer o encontro de pelo menos 15 eosinófilos por campo de grande aumento (CGA) na biópsia esofágica. A confirmação exige biópsia das áreas de pior aparência do esôfago, descartando outras causas de eosinofilia.',
  },

  p('O papel dos IBPs no tratamento: além da supressão ácida', 'h2'),
  rich([
    'Embora os Inibidores de Bomba de Prótons (IBPs) sejam conhecidos por reduzir a acidez gástrica, sua eficácia na EoE vai muito além, apresentando ',
    ['efeitos anti-inflamatórios diretos', 'strong'],
    ':',
  ]),

  p('1. Inibição da eotaxina-3', 'h3'),
  p('Bloqueiam a expressão desta proteína, que é a principal responsável por atrair e recrutar eosinófilos para o tecido esofágico.'),

  p('2. Restauração da barreira epitelial', 'h3'),
  p('Ao elevar o pH do refluxato, os IBPs ajudam a fechar os espaços intercelulares dilatados, impedindo a penetração de antígenos alimentares.'),

  p('3. Ação em citocinas Th2', 'h3'),
  p('Reduzem a resposta inflamatória imunomediada por interleucinas como IL-4 e IL-13, centrais na fisiopatologia da doença.'),

  {
    _type: 'calloutBlock', _key: k(), tipo: 'dica',
    titulo: 'Na prática: pantoprazol magnésico 40 mg',
    texto:
      'No material analisado, o uso de pantoprazol magnésico 40 mg (duas vezes ao dia) resultou em melhora significativa, levando à remissão clínica e histológica completa em pacientes com disfagia grave.',
  },

  p('Outras abordagens terapêuticas', 'h2'),
  {
    _type: 'calloutBlock', _key: k(), tipo: 'info',
    texto:
      'Caso o paciente não responda aos IBPs, as diretrizes mais recentes (como as da ACG 2025) recomendam as opções abaixo.',
  },
  liRich([['Esteroides tópicos deglutidos (ETDs): ', 'strong'], 'uso de budesonida ou fluticasona. Atuam localmente na mucosa com mínima absorção pelo organismo.']),
  liRich([['Dietas de eliminação: ', 'strong'], 'retirada estratégica de alimentos gatilhos como leite, ovos, trigo e soja, sob supervisão nutricional.']),
  liRich([['Terapias biológicas: ', 'strong'], 'o dupilumabe é a escolha preferencial para casos refratários ou pacientes com múltiplas alergias atópicas.']),
  liRich([['Dilatação endoscópica: ', 'strong'], 'procedimento físico indicado especificamente para tratar a estenose (estreitamento) do canal esofágico.']),

  p('Conclusão e importância da avaliação médica', 'h2'),
  {
    _type: 'calloutBlock', _key: k(), tipo: 'atencao',
    titulo: 'Doença progressiva',
    texto:
      'A Esofagite Eosinofílica não deve ser negligenciada. Por ser uma condição progressiva, a detecção precoce e o início imediato do tratamento com IBPs podem evitar a evolução para a forma fibroestenosante. Isso garante que o paciente recupere a funcionalidade do esôfago e sua qualidade de vida, evitando intervenções invasivas no futuro.',
  },
  p('Os IBPs desempenham papel fundamental no manejo da EoE, sendo considerados terapia de primeira linha. É essencial avaliar a resposta a esses medicamentos antes de prosseguir para abordagens mais restritivas.', 'blockquote'),
  p('— Dra. Vera Ângelo'),

  {
    _type: 'downloadBlock', _key: k(),
    titulo:    'Esofagite Eosinofílica (EoE): o dossiê clínico moderno',
    descricao: 'Panorama atual: do diagnóstico ao papel transformador dos IBPs no tratamento.',
    url:       PDF_URL,
    label:     'Baixar PDF',
  },

  {
    _type: 'calloutBlock', _key: k(), tipo: 'info',
    titulo: 'Conteúdo educacional',
    texto:
      'Esta publicação tem caráter exclusivamente informativo e educativo, respeitando integralmente as normas da Resolução CFM nº 2.336/2023 e o Art. 75 do Código de Ética Médica. O material aqui apresentado reflete o panorama atual da medicina baseada em evidências.\n\n' +
      'As informações aqui contidas não substituem a consulta médica, o diagnóstico ou o tratamento especializado.',
  },
]

async function main() {
  const doc = {
    _id:   `drafts.${randomUUID()}`,
    _type: 'post',
    title: 'Esofagite Eosinofílica (EoE): O Papel dos IBPs no Tratamento e Panorama Atual',
    slug:  { _type: 'slug', current: SLUG },
    author: { _type: 'reference', _ref: AUTOR_VERA },
    excerpt: 'Doença imunomediada crônica que pode evoluir para estenose esofágica. Entenda o diagnóstico e por que os IBPs são considerados terapia de primeira linha.',
    categories: [{ _type: 'reference', _ref: CAT_GASTRO, _key: k() }],
    publishedAt: new Date().toISOString(),
    readingTime: 6,
    body,
  }

  const criado = await client.create(doc)
  console.log('\n✅ Rascunho criado:', criado._id)
  console.log('   Abra o Studio → Artigos, adicione a imagem de capa, revise e clique em "Publish".')
  console.log(`   URL final: https://nuvemmedicina.com.br/blog/${SLUG}`)
}

main().catch(err => {
  console.error('\n❌ Falhou:', err.message)
  process.exit(1)
})
