// Cria os rascunhos do artigo do Summit Belo Horizonte 2026 em pt-BR, es e en.
//
// Uso, a partir da raiz do projeto:
//   node scripts/publicar-summit.mjs          cria os rascunhos no Sanity
//   node scripts/publicar-summit.mjs --teste  só valida, não envia nada
//
// O script não publica nada. A publicação é feita no Studio, nesta ordem:
// pt-BR, depois es, depois en.

import { createClient } from '@sanity/client'
import { readFileSync, existsSync } from 'node:fs'
import { randomUUID } from 'node:crypto'
import { fileURLToPath } from 'node:url'
import path from 'node:path'
import sharp from 'sharp'

const RAIZ = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const TESTE = process.argv.includes('--teste')

try {
  process.loadEnvFile(path.join(RAIZ, '.env.local'))
} catch {
  // Sem .env.local: vale o que estiver no ambiente.
}

const TOKEN = process.env.SANITY_WRITE_TOKEN
const STUDIO = 'https://www.nuvemmedicina.com.br/studio'
const VERA = '5b492da1-2aea-4c14-a4bc-6e1320bae377'
const AGORA = new Date().toISOString()
const HOJE = AGORA.slice(0, 10)

const FOTOS = [
  'turma-summit-bh.jpg',
  'aula-summit-bh.jpg',
  'dra-vera-summit-bh.jpg',
  'alunos-dra-vera-summit-bh.jpg',
  'adium-summit-bh.jpg',
]

// ---------- helpers de Portable Text ----------
const k = () => randomUUID().replace(/-/g, '').slice(0, 12)
const p = (text) => ({
  _type: 'block', _key: k(), style: 'normal', markDefs: [],
  children: [{ _type: 'span', _key: k(), text, marks: [] }],
})
const h2 = (text) => ({ ...p(text), style: 'h2' })
const img = (assetId, alt, caption) => ({
  _type: 'image', _key: k(),
  asset: { _type: 'reference', _ref: assetId },
  alt, caption,
})

// ---------- corpo, por idioma ----------
function corpoPt(a) {
  return [
    p('Nos dias 9 e 10 de outubro, Belo Horizonte recebeu a segunda edição do Summit Belo Horizonte, encontro internacional de gastroenterologia realizado pela NU.V.E.M em parceria com a Adium. Durante dois dias, profissionais do Brasil, do Paraguai e da Bolívia se reuniram em torno de uma pergunta comum: como fazer o diagnóstico digestivo chegar mais longe, com mais precisão.'),
    img(a['turma-summit-bh.jpg'], 'Auditório durante a abertura do Summit Belo Horizonte 2026', 'Segunda edição do Summit Belo Horizonte, realizada nos dias 9 e 10 de outubro de 2026.'),
    h2('Quatro eixos, dois dias'),
    p('A programação foi construída sobre quatro eixos: intercâmbio de experiências entre os países participantes, atualização científica, integração regional e aplicação na prática clínica. A divisão entre os dias seguiu essa lógica. O primeiro foi dedicado aos métodos, com oficinas práticas. O segundo, às atualizações e à discussão de casos.'),
    h2('Primeiro dia: o método na mão'),
    p('A sexta-feira começou pelos testes respiratórios, com prática supervisionada e interpretação clínica. É o tipo de conteúdo que não se aprende apenas ouvindo: a leitura de uma curva de hidrogênio e metano exige repetição e discussão de casos reais, e foi assim que a sessão foi conduzida.'),
    img(a['aula-summit-bh.jpg'], 'Profissionais em oficina prática de testes respiratórios', 'Prática supervisionada de testes respiratórios.'),
    p('Na sequência, a manometria esofágica de alta resolução e a pHmetria, com foco na interpretação e nos achados que mudam conduta. A investigação do H. pylori teve oficina prática e discussão sobre diagnóstico.'),
    p('A doença do refluxo foi abordada à luz do Consenso de Lyon 2.0, que reorganizou os critérios diagnósticos e a forma de classificar os achados. A constipação entrou pelo caminho dos métodos, com manometria anorretal e estudo do trânsito colônico.'),
    p('O dia ainda teve oficina de assoalho pélvico e uma sessão sobre avaliação da cavidade oral, com halimetria e sialometria, tema que costuma ficar de fora dos encontros de gastroenterologia e que tem relação direta com queixas digestivas.'),
    h2('Segundo dia: rever o que se sabia'),
    p('O sábado abriu com o Roma V. Os critérios internacionais para os distúrbios da interação intestino-cérebro foram atualizados este ano, dez anos depois da versão anterior, e a sessão tratou justamente do que muda na prática de quem atende.'),
    img(a['dra-vera-summit-bh.jpg'], 'Dra. Vera Ângelo durante apresentação sobre os critérios de Roma V', 'Sessão sobre a atualização dos critérios de Roma.'),
    p('A doença do refluxo voltou, desta vez pela definição e pela fisiopatologia. Houve sessão sobre técnicas de recalibração laríngea, e as intolerâncias alimentares entraram por discussão de casos, com abordagem nutricional das intolerâncias e da disbiose.'),
    p('A programação também apresentou a experiência brasileira em Colokids e encerrou com uma sessão de intercâmbio entre os três países, que acabou sendo um dos momentos mais produtivos do encontro.'),
    img(a['alunos-dra-vera-summit-bh.jpg'], 'Participantes do Brasil, do Paraguai e da Bolívia reunidos', 'Profissionais do Brasil, do Paraguai e da Bolívia.'),
    h2('O que o intercâmbio revelou'),
    p('Os três países chegaram com realidades distintas. Disponibilidade de equipamento, acesso a exames, perfil de encaminhamento e organização dos serviços variam bastante entre eles. As perguntas clínicas, no entanto, são as mesmas.'),
    p('Foi nessa constatação que o encontro mostrou seu valor. Um protocolo que funciona bem num serviço com estrutura completa precisa de adaptação em outro contexto, e essa adaptação é conhecimento que não está em artigo nenhum. Ela se transmite na conversa entre quem atende.'),
    h2('Quem conduziu'),
    p('Participaram da programação a Dra. Vera Ângelo, a Dra. Amanda Araújo, a Dra. Cláudia Utsch, a Dra. Eliane Basques, a Dra. Débora Andrade, a Dra. Juliana Moraes, a Dra. Raíssa Dalat, o Dr. Gabriel Fernandes, a fisioterapeuta Anna Karoline e as técnicas Larissa Simão e Camila Marques. A coordenação científica foi da Dra. Vera Ângelo.'),
    h2('O que fica'),
    p('Encontro científico não termina quando acaba. O que se discute em dois dias volta para o consultório na semana seguinte, em forma de conduta revista, de critério atualizado e de um jeito diferente de olhar para o mesmo exame.'),
    img(a['adium-summit-bh.jpg'], 'Equipe e participantes ao final do segundo dia do Summit', 'Encerramento do segundo dia, com realização da NU.V.E.M em parceria com a Adium.'),
    p('É esse o sentido de uma clínica que também ensina. O método que se aprimora na discussão com colegas de outros países é o mesmo que atende o paciente que chega na segunda-feira.'),
    p('Juntos, fortalecemos a gastroenterologia na América do Sul.'),
  ]
}

function corpoEs(a) {
  return [
    p('Los días 9 y 10 de octubre, Belo Horizonte recibió la segunda edición del Summit Belo Horizonte, encuentro internacional de gastroenterología organizado por NU.V.E.M en alianza con Adium. Durante dos días, profesionales de Brasil, Paraguay y Bolivia se reunieron en torno a una pregunta común: cómo hacer que el diagnóstico digestivo llegue más lejos, con más precisión.'),
    img(a['turma-summit-bh.jpg'], 'Auditorio durante la apertura del Summit Belo Horizonte 2026', 'Segunda edición del Summit Belo Horizonte, realizada los días 9 y 10 de octubre de 2026.'),
    h2('Cuatro ejes, dos días'),
    p('El programa se construyó sobre cuatro ejes: intercambio de experiencias entre los países participantes, actualización científica, integración regional y aplicación en la práctica clínica. La división entre los días siguió esa lógica. El primero se dedicó a los métodos, con talleres prácticos. El segundo, a las actualizaciones y a la discusión de casos.'),
    h2('Primer día: el método en la mano'),
    p('El viernes comenzó con las pruebas de aliento, con práctica supervisada e interpretación clínica. Es el tipo de contenido que no se aprende solo escuchando: la lectura de una curva de hidrógeno y metano exige repetición y discusión de casos reales, y así se condujo la sesión.'),
    img(a['aula-summit-bh.jpg'], 'Profesionales en taller práctico de pruebas de aliento', 'Práctica supervisada de pruebas de aliento.'),
    p('A continuación, la manometría esofágica de alta resolución y la pHmetría, con foco en la interpretación y en los hallazgos que cambian la conducta. La investigación de H. pylori tuvo taller práctico y discusión sobre diagnóstico.'),
    p('La enfermedad por reflujo se abordó a la luz del Consenso de Lyon 2.0, que reorganizó los criterios diagnósticos y la forma de clasificar los hallazgos. El estreñimiento entró por el camino de los métodos, con manometría anorrectal y estudio del tránsito colónico.'),
    p('El día tuvo además un taller de piso pélvico y una sesión sobre evaluación de la cavidad oral, con halimetría y sialometría, tema que suele quedar fuera de los encuentros de gastroenterología y que tiene relación directa con las molestias digestivas.'),
    h2('Segundo día: revisar lo que se sabía'),
    p('El sábado abrió con Roma V. Los criterios internacionales para los trastornos de la interacción intestino-cerebro se actualizaron este año, diez años después de la versión anterior, y la sesión trató justamente de lo que cambia en la práctica de quien atiende.'),
    img(a['dra-vera-summit-bh.jpg'], 'La Dra. Vera Ângelo durante su presentación sobre los criterios de Roma V', 'Sesión sobre la actualización de los criterios de Roma.'),
    p('La enfermedad por reflujo volvió, esta vez por la definición y la fisiopatología. Hubo una sesión sobre técnicas de recalibración laríngea, y las intolerancias alimentarias entraron por discusión de casos, con abordaje nutricional de las intolerancias y de la disbiosis.'),
    p('El programa también presentó la experiencia brasileña en Colokids y cerró con una sesión de intercambio entre los tres países, que terminó siendo uno de los momentos más productivos del encuentro.'),
    img(a['alunos-dra-vera-summit-bh.jpg'], 'Participantes de Brasil, Paraguay y Bolivia reunidos', 'Profesionales de Brasil, Paraguay y Bolivia.'),
    h2('Lo que reveló el intercambio'),
    p('Los tres países llegaron con realidades distintas. La disponibilidad de equipos, el acceso a los exámenes, el perfil de derivación y la organización de los servicios varían bastante entre ellos. Las preguntas clínicas, sin embargo, son las mismas.'),
    p('Fue en esa constatación donde el encuentro mostró su valor. Un protocolo que funciona bien en un servicio con estructura completa necesita adaptación en otro contexto, y esa adaptación es conocimiento que no está en ningún artículo. Se transmite en la conversación entre quienes atienden.'),
    h2('Quiénes condujeron'),
    p('Participaron del programa la Dra. Vera Ângelo, la Dra. Amanda Araújo, la Dra. Cláudia Utsch, la Dra. Eliane Basques, la Dra. Débora Andrade, la Dra. Juliana Moraes, la Dra. Raíssa Dalat, el Dr. Gabriel Fernandes, la fisioterapeuta Anna Karoline y las técnicas Larissa Simão y Camila Marques. La coordinación científica estuvo a cargo de la Dra. Vera Ângelo.'),
    h2('Lo que queda'),
    p('Un encuentro científico no termina cuando acaba. Lo que se discute en dos días vuelve al consultorio la semana siguiente, en forma de conducta revisada, de criterio actualizado y de una manera distinta de mirar el mismo examen.'),
    img(a['adium-summit-bh.jpg'], 'Equipo y participantes al final del segundo día del Summit', 'Cierre del segundo día, organizado por NU.V.E.M en alianza con Adium.'),
    p('Ese es el sentido de una clínica que también enseña. El método que se perfecciona en la discusión con colegas de otros países es el mismo que atiende al paciente que llega el lunes.'),
    p('Juntos fortalecemos la gastroenterología en América del Sur.'),
  ]
}

function corpoEn(a) {
  return [
    p('On October 9 and 10, Belo Horizonte hosted the second edition of Summit Belo Horizonte, an international gastroenterology meeting organized by NU.V.E.M in partnership with Adium. Over two days, professionals from Brazil, Paraguay and Bolivia came together around a shared question: how to make digestive diagnostics reach further, with greater precision.'),
    img(a['turma-summit-bh.jpg'], 'Auditorium during the opening of Summit Belo Horizonte 2026', 'Second edition of Summit Belo Horizonte, held on October 9 and 10, 2026.'),
    h2('Four themes, two days'),
    p('The program was built on four themes: exchange of experience among the participating countries, scientific updates, regional integration and application in clinical practice. The split between the two days followed that logic. The first was devoted to methods, with hands-on workshops. The second, to updates and case discussion.'),
    h2('Day one: the method in your hands'),
    p('Friday opened with breath testing, combining supervised practice and clinical interpretation. This is the kind of content you cannot learn by listening alone: reading a hydrogen and methane curve takes repetition and discussion of real cases, and that is how the session was run.'),
    img(a['aula-summit-bh.jpg'], 'Professionals in a hands-on breath testing workshop', 'Supervised practice in breath testing.'),
    p('Next came high-resolution esophageal manometry and pH monitoring, focused on interpretation and on the findings that change management. H. pylori investigation had a hands-on workshop and a discussion of diagnosis.'),
    p('Reflux disease was addressed in light of the Lyon Consensus 2.0, which reorganized the diagnostic criteria and the way findings are classified. Constipation was approached through methods, with anorectal manometry and colonic transit studies.'),
    p('The day also included a pelvic floor workshop and a session on oral cavity assessment, with halimetry and sialometry, a topic usually left out of gastroenterology meetings and one directly related to digestive complaints.'),
    h2('Day two: revisiting what we thought we knew'),
    p('Saturday opened with Rome V. The international criteria for disorders of gut-brain interaction were updated this year, ten years after the previous version, and the session dealt precisely with what changes for clinicians in practice.'),
    img(a['dra-vera-summit-bh.jpg'], 'Dr. Vera Ângelo presenting on the Rome V criteria', 'Session on the update to the Rome criteria.'),
    p('Reflux disease returned, this time through definition and pathophysiology. There was a session on laryngeal recalibration techniques, and food intolerances were covered through case discussion, with a nutritional approach to intolerances and dysbiosis.'),
    p('The program also presented the Brazilian experience with Colokids and closed with an exchange session among the three countries, which turned out to be one of the most productive moments of the meeting.'),
    img(a['alunos-dra-vera-summit-bh.jpg'], 'Participants from Brazil, Paraguay and Bolivia together', 'Professionals from Brazil, Paraguay and Bolivia.'),
    h2('What the exchange revealed'),
    p('The three countries arrived with different realities. Equipment availability, access to testing, referral patterns and service organization vary considerably among them. The clinical questions, however, are the same.'),
    p('That realization is where the meeting showed its worth. A protocol that works well in a fully equipped service needs adaptation in another setting, and that adaptation is knowledge found in no paper. It passes from one clinician to another in conversation.'),
    h2('Who led the sessions'),
    p('The program featured Dr. Vera Ângelo, Dr. Amanda Araújo, Dr. Cláudia Utsch, Dr. Eliane Basques, Dr. Débora Andrade, Dr. Juliana Moraes, Dr. Raíssa Dalat, Dr. Gabriel Fernandes, physiotherapist Anna Karoline and technicians Larissa Simão and Camila Marques. Scientific coordination was led by Dr. Vera Ângelo.'),
    h2('What remains'),
    p('A scientific meeting does not end when it is over. What is discussed across two days returns to the office the following week, as revised management, as updated criteria, and as a different way of looking at the same test.'),
    img(a['adium-summit-bh.jpg'], 'Team and participants at the end of the second day of the Summit', 'Closing of the second day, hosted by NU.V.E.M in partnership with Adium.'),
    p('That is the point of a clinic that also teaches. The method sharpened in discussion with colleagues from other countries is the same one that serves the patient who walks in on Monday.'),
    p('Together, we strengthen gastroenterology in South America.'),
  ]
}

// ---------- documentos ----------
function documentos(a) {
  const capa = (alt) => ({
    _type: 'image',
    asset: { _type: 'reference', _ref: a['turma-summit-bh.jpg'] },
    alt,
    credit: 'NU.V.E.M Medicina',
  })

  // O original em pt-BR ainda não existe publicado. Uma referência forte a um
  // documento inexistente é recusada pelo Sanity, então a referência nasce
  // fraca e o Studio a torna forte quando a tradução for publicada, como faz
  // com qualquer referência criada pela interface.
  const original = {
    _type: 'reference',
    _ref: 'summit-bh-2026',
    _weak: true,
    _strengthenOnPublish: { type: 'post' },
  }

  const comum = {
    _type: 'post',
    author: { _type: 'reference', _ref: VERA },
    revisadoPor: { _type: 'reference', _ref: VERA },
    dataRevisao: HOJE,
    publishedAt: AGORA,
    readingTime: 7,
    exameRelacionado: 'testes-respiratorios',
  }

  return [
    {
      ...comum,
      _id: 'drafts.summit-bh-2026',
      language: 'pt-BR',
      title: 'Summit Belo Horizonte 2026: dois dias de diagnóstico digestivo com Brasil, Paraguai e Bolívia',
      slug: { _type: 'slug', current: 'summit-belo-horizonte-2026-brasil-paraguai-bolivia' },
      perguntaPrincipal: 'O que foi discutido no Summit Belo Horizonte 2026?',
      respostaDireta: 'Nos dias 9 e 10 de outubro, a NU.V.E.M reuniu em Belo Horizonte profissionais do Brasil, do Paraguai e da Bolívia para dois dias de atualização em diagnóstico digestivo, com oficinas práticas de testes respiratórios, manometria, pHmetria e assoalho pélvico, além de sessões sobre Roma V e intolerâncias alimentares.',
      excerpt: 'Dois dias de atualização em diagnóstico digestivo com profissionais do Brasil, do Paraguai e da Bolívia. Veja o que foi discutido no Summit BH 2026.',
      coverImage: capa('Auditório durante a abertura do Summit Belo Horizonte 2026'),
      body: corpoPt(a),
    },
    {
      ...comum,
      _id: 'drafts.summit-bh-2026-es',
      language: 'es',
      translationOf: original,
      title: 'Summit Belo Horizonte 2026: dos días de diagnóstico digestivo con Brasil, Paraguay y Bolivia',
      slug: { _type: 'slug', current: 'summit-belo-horizonte-2026-brasil-paraguay-bolivia' },
      perguntaPrincipal: '¿Qué se discutió en el Summit Belo Horizonte 2026?',
      respostaDireta: 'Los días 9 y 10 de octubre, NU.V.E.M reunió en Belo Horizonte a profesionales de Brasil, Paraguay y Bolivia para dos días de actualización en diagnóstico digestivo, con talleres prácticos de pruebas de aliento, manometría, pHmetría y piso pélvico, además de sesiones sobre Roma V e intolerancias alimentarias.',
      excerpt: 'Dos días de actualización en diagnóstico digestivo con profesionales de Brasil, Paraguay y Bolivia. Conozca lo que se discutió en el Summit BH 2026.',
      coverImage: capa('Auditorio durante la apertura del Summit Belo Horizonte 2026'),
      body: corpoEs(a),
    },
    {
      ...comum,
      _id: 'drafts.summit-bh-2026-en',
      language: 'en',
      translationOf: original,
      title: 'Summit Belo Horizonte 2026: two days of digestive diagnostics with Brazil, Paraguay and Bolivia',
      slug: { _type: 'slug', current: 'summit-belo-horizonte-2026-brazil-paraguay-bolivia' },
      perguntaPrincipal: 'What was discussed at Summit Belo Horizonte 2026?',
      respostaDireta: 'On October 9 and 10, NU.V.E.M brought together professionals from Brazil, Paraguay and Bolivia in Belo Horizonte for two days of updates in digestive diagnostics, with hands-on workshops in breath testing, manometry, pH monitoring and pelvic floor, plus sessions on Rome V and food intolerances.',
      excerpt: 'Two days of updates in digestive diagnostics with professionals from Brazil, Paraguay and Bolivia. See what was discussed at Summit BH 2026.',
      coverImage: capa('Auditorium during the opening of Summit Belo Horizonte 2026'),
      body: corpoEn(a),
    },
  ]
}

// ---------- 1. validação, antes de qualquer envio ----------
function validar() {
  let erro = false

  if (!TOKEN) {
    console.error('  SANITY_WRITE_TOKEN ausente em .env.local.')
    erro = true
  }

  for (const nome of FOTOS) {
    const ok = existsSync(path.join(RAIZ, 'public', 'images', nome))
    console.log(`  ${nome}: ${ok ? 'ok' : 'NÃO ENCONTRADA'}`)
    if (!ok) erro = true
  }

  // Limites do schema conferidos com IDs provisórios, para que um texto longo
  // demais pare o script antes de qualquer foto subir.
  const provisorios = Object.fromEntries(FOTOS.map(n => [n, 'image-provisorio']))
  const limites = { title: 120, respostaDireta: 320, excerpt: 200 }
  for (const d of documentos(provisorios)) {
    for (const [campo, max] of Object.entries(limites)) {
      const n = d[campo].length
      console.log(`  ${d.language} ${campo}: ${n}/${max} ${n > max ? 'ACIMA DO LIMITE' : 'ok'}`)
      if (n > max) erro = true
    }
  }

  if (erro) {
    console.error('\nValidação falhou. Nada foi enviado ao Sanity.')
    process.exit(1)
  }
}

// ---------- 2. upload das fotos, uma vez só ----------
async function subirFotos(client) {
  const ids = {}
  for (const [i, nome] of FOTOS.entries()) {
    const buffer = await sharp(readFileSync(path.join(RAIZ, 'public', 'images', nome)))
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 82 })
      .toBuffer()

    const asset = await client.assets.upload('image', buffer, {
      filename: nome,
      contentType: 'image/jpeg',
    })
    ids[nome] = asset._id
    console.log(`  [${i + 1}/${FOTOS.length}] ${nome} -> ${asset._id}`)
  }
  return ids
}

// ---------- execução ----------
console.log('Validando...')
validar()

if (TESTE) {
  console.log('\nModo --teste: validação concluída, nada foi enviado ao Sanity.')
  process.exit(0)
}

const client = createClient({
  projectId: 'q8ibxbuz',
  dataset: 'production',
  apiVersion: '2026-01-01',
  token: TOKEN,
  useCdn: false,
})

try {
  console.log('\nSubindo as fotos...')
  const assets = await subirFotos(client)

  console.log('\nCriando os rascunhos...')
  const tx = client.transaction()
  for (const d of documentos(assets)) tx.createOrReplace(d)
  await tx.commit()
} catch (e) {
  // Só a mensagem do erro: o objeto completo pode carregar os cabeçalhos da
  // requisição, e com eles o token.
  console.error(`\nFalhou: ${e?.message ?? 'erro desconhecido'}`)
  process.exit(1)
}

const link = (id) => `${STUDIO}/intent/edit/id=${id};type=post`
console.log('\nPronto. Três rascunhos criados:')
console.log(`  pt-BR  ${link('summit-bh-2026')}`)
console.log(`  es     ${link('summit-bh-2026-es')}`)
console.log(`  en     ${link('summit-bh-2026-en')}`)
console.log('\n**************************************************************')
console.log('  ATENÇÃO: os três estão em RASCUNHO. Nada foi publicado.')
console.log('  No Studio, clique em Publish nesta ordem: pt-BR, es, en.')
console.log('**************************************************************')
