/**
 * Preparos de exames em padrão único: fonte para o PDF da clínica (Dr.IAgenda),
 * a versão em Markdown para a IA do WhatsApp e o relatório de validação.
 *
 * REGRA: nada aqui é orientação nova. O texto foi reorganizado a partir dos
 * PDFs oficiais em public/pdfs/preparo-*-v1.pdf (fonte principal). Onde há
 * divergência com outras versões publicadas (página /exames/preparos,
 * src/lib/content/exames-detail.ts, chatbot Nuvete em src/lib/nuvete-data.ts),
 * lacuna ou ambiguidade, o item leva `v` (motivo) e aparece como
 * [VALIDAR COM A EQUIPE MÉDICA] no PDF e no relatório.
 */

export type Item = { t: string; v?: string }
export type Linha = { med: string; conduta: string; obs?: string; v?: string }

export type Preparo = {
  slug:      string
  nome:      string
  sub?:      string
  serve:     string
  ficha:     [string, string][]
  antes:     Item[]
  jejum:     Item[]
  medicamentos: { linhas: Linha[]; notas: Item[] }
  noDia:     Item[]
  durante?:  Item[]
  apos:      Item[]
  contato:   Item[]
  fonte:     string
}

export const VALIDAR = '[VALIDAR COM A EQUIPE MÉDICA]'
export const CONFORME = 'Suspender ou manter medicamentos sempre conforme orientação médica (do médico que solicitou o exame). Nunca suspender por conta própria.'

const CONTATO_PADRAO: Item = { t: 'Em caso de dúvida, entre em contato com a clínica antes do exame: (31) 2537-3131 ou WhatsApp (31) 99726-1029.' }
const LACUNA = (o: string) => `Não informado no preparo oficial (${o}).`

/**
 * Exames que a clínica não realiza (decisão da gestão em 06/11/2026). Ficam
 * registrados abaixo para histórico, mas saem dos documentos, do texto da IA
 * e da página de validação.
 */
export const EXAMES_FORA = new Set(['halimetria-sialometria'])

const PREPAROS_TODOS: Preparo[] = [
  // ── 1. Manometria esofágica ────────────────────────────────────────────────
  {
    slug: 'manometria-esofagica',
    nome: 'Manometria Esofágica de Alta Resolução',
    serve: 'Avalia os movimentos do esôfago e o funcionamento dos esfíncteres. Ajuda no diagnóstico de acalasia, disfagia (dificuldade para engolir) e refluxo refratário.',
    ficha: [['Duração do exame', '10 a 20 minutos'], ['Tempo total na clínica', 'cerca de 2 horas'], ['Sedação', 'não há'], ['Pedido médico', 'obrigatório']],
    antes: [
      { t: 'Verifique com o seu convênio a cobertura e a necessidade de autorização prévia.' },
      { t: 'Medicamentos: veja a tabela abaixo (alguns são suspensos 48 horas antes).' },
    ],
    jejum: [
      { t: 'Jejum absoluto (inclusive de água) a partir das 22h da noite anterior ao exame.', v: 'O site (/exames/preparos e card da página do exame) e o chatbot Nuvete dizem "jejum de 6 horas". O PDF oficial diz jejum absoluto a partir das 22h. Confirmar qual vale.' },
      { t: 'Casos especiais (crianças, idosos, diabéticos etc.): o tempo de jejum é avaliado individualmente.' },
    ],
    medicamentos: {
      linhas: [
        { med: 'Para dor torácica (se for o caso): Dilacoron, Isordil, Cardizem e Diltiazem', conduta: 'Suspender 48 horas antes', obs: 'Somente com orientação médica' },
        { med: 'Para motilidade: Domperidona, Metoclopramida, Bromoprida ou similares', conduta: 'Suspender 48 horas antes', obs: 'Somente com orientação médica' },
        { med: 'Omeprazol, Pantoprazol, Lansoprazol, antiácidos, Sucrafilm ou Lufta Gastro Pro', conduta: 'Pode manter', obs: 'Não interfere neste exame' },
        { med: 'Medicamentos para hipertensão, diabetes, problemas pulmonares e cardiológicos', conduta: 'Pode manter', v: 'O card do site diz "podem ser tomados normalmente com o mínimo de água possível"; o PDF pede jejum absoluto inclusive de água a partir das 22h. Definir como o paciente toma esses medicamentos no dia.' },
      ],
      notas: [],
    },
    noDia: [
      { t: 'Levar o pedido médico e exames anteriores (endoscopia digestiva, raio-X do esôfago).' },
      { t: 'Levar a guia ou o número de autorização do convênio.' },
      { t: 'Chegada antecipada: ' + LACUNA('o card do site diz 15 minutos antes'), v: 'Definir a antecedência de chegada.' },
      { t: 'Acompanhante: ' + LACUNA('sem orientação'), v: 'Definir se é necessário ou recomendado.' },
      { t: 'Roupa: ' + LACUNA('o card do site diz roupas com abertura frontal, evitar gola alta'), v: 'Confirmar orientação de vestimenta.' },
      { t: 'Como é o exame: uma sonda fina é introduzida pelo nariz; o desconforto é momentâneo e bem tolerado pela maioria dos pacientes.' },
    ],
    apos: [{ t: 'Você pode retornar às atividades normais imediatamente, inclusive dirigir.' }],
    contato: [CONTATO_PADRAO, { t: 'Se você usa algum dos medicamentos da tabela e não recebeu orientação do seu médico sobre suspendê-lo, fale com o médico solicitante ou com a clínica antes do exame.' }],
    fonte: 'public/pdfs/preparo-manometria-esofagica-v1.pdf',
  },

  // ── 2. Manometria anorretal ────────────────────────────────────────────────
  {
    slug: 'manometria-anorretal',
    nome: 'Manometria Anorretal',
    serve: 'Avalia o funcionamento do esfíncter anal e do assoalho pélvico. Ajuda no diagnóstico de incontinência fecal, constipação obstrutiva e dificuldades para evacuar.',
    ficha: [['Duração', '40 a 60 minutos'], ['Sedação', 'não há'], ['Jejum', 'não é necessário'], ['Pedido médico', 'obrigatório']],
    antes: [{ t: 'Compre o MINILAX na farmácia (não precisa de receita).' }],
    jejum: [{ t: 'Não é necessário jejum: pode se alimentar normalmente.' }],
    medicamentos: {
      linhas: [],
      notas: [
        { t: 'Informe à equipe TODOS os medicamentos em uso, especialmente anticoagulantes.' },
        { t: 'Suspensão de medicamentos: ' + LACUNA('sem orientação de suspensão'), v: 'Confirmar se algum medicamento deve ser suspenso (o chatbot cita supositórios; o site cita laxativos e fitoterápicos apenas para informar).' },
      ],
    },
    noDia: [
      { t: 'Preparo intestinal (essencial): aplicar 02 MINILAX 2 horas antes do horário agendado, conforme as instruções da embalagem, deitado de lado com os joelhos dobrados. Aguardar a evacuação completa antes de sair para a clínica.', v: 'Divergência entre versões: o site diz "enema Minilax® ou similar 1 a 2 horas antes"; o chatbot Nuvete diz "enema retal (Fleet) 2 horas antes"; as versões em inglês e espanhol citam Fleet®. Confirmar produto, quantidade e horário.' },
      { t: 'Levar o pedido médico e exames anteriores (ultrassom pélvico, colonoscopia).' },
      { t: 'Roupa confortável e fácil de remover (calça larga ou saia). Higiene íntima normal.' },
      { t: 'Acompanhante: não é obrigatório, mas é bem-vindo.' },
      { t: 'Chegar 10 minutos antes do horário agendado.' },
      { t: 'Como é o exame: é feito deitado de lado; uma pequena sonda é introduzida delicadamente. O procedimento é bem tolerado.' },
    ],
    apos: [{ t: LACUNA('sem orientação para depois do exame'), v: 'Definir orientações pós-exame (retorno às atividades, sinais de alerta).' }],
    contato: [CONTATO_PADRAO],
    fonte: 'public/pdfs/preparo-manometria-anorretal-v1.pdf',
  },

  // ── 3. pHmetria e impedanciometria ─────────────────────────────────────────
  {
    slug: 'phmetria-impedanciometria',
    nome: 'pHmetria e Impedanciometria Esofágica',
    sub: 'Monitoramento de 24 horas',
    serve: 'Registra o refluxo do estômago para o esôfago durante 24 horas, enquanto você mantém sua rotina normal.',
    ficha: [['Instalação', '15 a 20 minutos'], ['Monitoramento', '24 horas contínuas'], ['Atividade', 'normal durante o exame'], ['Pedido médico', 'obrigatório']],
    antes: [
      { t: 'Suspensão de medicamentos: veja a tabela abaixo. A suspensão correta é fundamental para o resultado.' },
      { t: 'Em alguns casos o médico pede que o exame seja feito em uso dos medicamentos. Essa orientação deve estar escrita no pedido médico.' },
    ],
    jejum: [
      { t: 'Jejum ABSOLUTO a partir das 22h da noite anterior (nem água). Casos específicos são avaliados individualmente.', v: 'O site e o chatbot Nuvete dizem "jejum de 4 horas antes da instalação do cateter". Confirmar qual vale.' },
    ],
    medicamentos: {
      linhas: [
        { med: 'Inibidores de bomba de prótons (IBP): omeprazol, pantoprazol, esomeprazol, lansoprazol', conduta: 'Suspender 10 dias antes', obs: 'Somente com autorização do médico solicitante', v: 'O site e o chatbot dizem 7 dias; o PDF oficial diz 10 dias.' },
        { med: 'Procinéticos: domperidona, metoclopramida, bromoprida', conduta: 'Suspender 48 horas antes', obs: 'Somente com autorização do médico solicitante' },
        { med: 'Antiácidos: Mylanta, Gaviscon, Luftal, bicarbonato', conduta: 'Suspender 48 horas antes', obs: 'Somente com autorização do médico solicitante', v: 'O site diz 24 horas antes; o PDF oficial diz 48 horas.' },
        { med: 'Bloqueadores H2: ranitidina, famotidina', conduta: 'Suspender 48 horas antes', obs: 'Somente com autorização do médico solicitante' },
      ],
      notas: [{ t: 'NUNCA suspenda IBP ou qualquer medicamento por conta própria. Em caso de dúvida, ligue para a clínica antes de parar qualquer medicamento.' }],
    },
    noDia: [
      { t: 'Tome banho antes de ir para a clínica.' },
      { t: 'Use blusa de botão na frente, para facilitar a colocação. Evite roupas apertadas ou com zíper.' },
      { t: 'Chegada antecipada e acompanhante: ' + LACUNA('sem orientação'), v: 'Definir antecedência de chegada e se acompanhante é necessário.' },
    ],
    durante: [
      { t: 'Mantenha a atividade normal: trabalhar, caminhar, dormir.' },
      { t: 'Registre no diário de sintomas fornecido pela clínica: horário das refeições, sintomas e posição (deitado, sentado, em pé).' },
      { t: 'Não ingira café, chás com cafeína, refrigerantes com cafeína ou qualquer medicamento para refluxo.', v: 'O chatbot Nuvete acrescenta "evitar alimentos muito ácidos (limão, vinagre)", que não está no PDF oficial. Confirmar.' },
      { t: 'Banho: após a colocação do aparelho não é permitido tomar banho; evitar banho de imersão. Não pode molhar o aparelho.', v: 'Contradição dentro do PDF oficial: o item 2 diz que não será permitido tomar banho; o item 7 diz que uma ducha rápida é permitida com cuidado. Definir a orientação.' },
      { t: 'Mantenha a cabeceira da cama na posição habitual (não elevar artificialmente).' },
    ],
    apos: [{ t: 'Retirada do aparelho: ' + LACUNA('não diz quando nem onde devolver o equipamento'), v: 'Definir orientação de retorno à clínica para retirada/devolução do aparelho após 24 horas.' }],
    contato: [CONTATO_PADRAO, { t: 'Antes de suspender qualquer medicamento, se tiver dúvida sobre a autorização do seu médico.' }],
    fonte: 'public/pdfs/preparo-phmetria-impedanciometria-v1.pdf',
  },

  // ── 4. Teste respiratório H. pylori ────────────────────────────────────────
  {
    slug: 'teste-respiratorio-hpylori',
    nome: 'Teste Respiratório para H. pylori',
    serve: 'Exame não invasivo para diagnóstico e para confirmar a eliminação da bactéria Helicobacter pylori, associada a gastrite, úlcera e outros problemas do estômago.',
    ficha: [['Duração', '30 a 40 minutos'], ['Método', 'não invasivo'], ['Pedido médico', 'obrigatório, com o tipo de exame especificado']],
    antes: [{ t: 'Alguns medicamentos precisam ser suspensos semanas antes: veja a tabela abaixo.' }],
    jejum: [{ t: 'Jejum de 2 horas antes do exame. Somente água é permitida.', v: 'O chatbot Nuvete diz "jejum de 4 horas"; o PDF oficial diz 2 horas. Confirmar.' }],
    medicamentos: {
      linhas: [
        { med: 'Antibióticos (amoxicilina, claritromicina, metronidazol etc.)', conduta: 'Suspender 4 semanas antes', obs: 'Somente com orientação médica' },
        { med: 'IBP (omeprazol, pantoprazol etc.)', conduta: 'Suspender 2 semanas antes', obs: 'Somente com orientação do médico solicitante' },
        { med: 'Bismuto (Bepanthol, De-Nol etc.)', conduta: 'Suspender 4 semanas antes', obs: 'Interfere diretamente no resultado', v: 'O PDF cita "Bepanthol" como exemplo de bismuto. Conferir o exemplo (Bepantol é um produto de dexpantenol, não de bismuto).' },
        { med: 'Análogos de GLP-1 (Ozempic®, Rybelsus®, Wegovy®, Mounjaro®)', conduta: 'Suspender 3 semanas antes', obs: 'Somente com orientação médica' },
      ],
      notas: [{ t: 'NUNCA suspenda medicamentos por conta própria. Sempre consulte o médico que solicitou o exame antes de interromper qualquer tratamento.' }],
    },
    noDia: [
      { t: 'Não fume no dia do exame (o tabaco interfere no resultado).' },
      { t: 'Não masque chiclete nem chupe balas nas 2 horas anteriores.' },
      { t: 'Escove os dentes normalmente, mas não engula o creme dental.' },
      { t: 'Leve o pedido médico e informe à equipe todos os medicamentos em uso.' },
      { t: 'Chegada antecipada e acompanhante: ' + LACUNA('sem orientação'), v: 'Definir antecedência de chegada e se acompanhante é necessário.' },
    ],
    apos: [{ t: LACUNA('sem orientação para depois do exame'), v: 'Confirmar se pode voltar às atividades e à alimentação normalmente.' }],
    contato: [CONTATO_PADRAO],
    fonte: 'public/pdfs/preparo-teste-respiratorio-hpylori-v1.pdf',
  },

  // ── 5. Teste respiratório SIBO / IMO / lactose / frutose ───────────────────
  {
    slug: 'teste-respiratorio-sibo-imo',
    nome: 'Teste Respiratório para SIBO, IMO, Lactose e Frutose',
    sub: 'H₂ · CH₄ · H₂S',
    serve: 'Avalia supercrescimento bacteriano (SIBO/IMO), intolerâncias alimentares e outros distúrbios digestivos pela análise do ar exalado. Sem coleta de sangue.',
    ficha: [['Duração', '2 a 3 horas'], ['Método', 'não invasivo, sem coleta de sangue'], ['Pedido médico', 'obrigatório']],
    antes: [
      { t: 'Dieta do dia anterior (muito importante). PODE comer: arroz branco cozido; carne bovina, frango ou peixe grelhado (sem temperos industrializados); ovos cozidos, mexidos ou estrelados; azeite de oliva e sal a gosto; água à vontade.' },
      { t: 'NÃO pode comer no dia anterior: feijão, lentilha, ervilha, grão-de-bico e derivados; leite, queijo, iogurte e laticínios; pão, massas, biscoitos, farinha de trigo; frutas (especialmente maçã, pera, banana, melancia); brócolis, couve, repolho, cebola, alho, aspargos; mel, açúcar, refrigerantes, sucos; álcool de qualquer tipo.' },
      { t: 'Colonoscopia ou enema opaco: aguardar 2 semanas após o procedimento (preparo intestinal) para fazer o exame.' },
      { t: 'Probióticos: ' + LACUNA('o PDF não cita'), v: 'O site e o chatbot Nuvete pedem "não usar probióticos nas 2 semanas anteriores", que não está no PDF oficial. Confirmar.' },
    ],
    jejum: [{ t: 'Jejum completo de 12 horas antes do exame. Somente água é permitida, em pequena quantidade, até 0h.', v: 'Ambíguo: não fica claro se a água é permitida depois de 0h. Confirmar.' }],
    medicamentos: {
      linhas: [
        { med: 'Antibióticos (exceto colírios): amoxicilina, claritromicina, metronidazol etc.', conduta: 'Suspender 4 semanas antes', obs: 'Somente com orientação médica' },
        { med: 'Análogos de GLP-1 (Ozempic®, Rybelsus®, Wegovy®, Mounjaro®)', conduta: 'Suspender 3 semanas antes', obs: 'Somente com orientação médica' },
        { med: 'Laxativos', conduta: 'Suspender 5 a 7 dias antes', obs: 'Se clinicamente possível, com orientação médica', v: 'O chatbot Nuvete diz "não usar laxativos nas 24 horas anteriores"; o PDF oficial diz 5 a 7 dias.' },
      ],
      notas: [],
    },
    noDia: [
      { t: 'Faça uma boa higiene da boca e use enxaguante bucal sem álcool.', v: 'O site diz "não escovar os dentes com creme dental 30 minutos antes" e o chatbot diz "não escovar os dentes 30 min antes". Confirmar a orientação de higiene oral.' },
      { t: 'Não fume no dia do exame. Não use chicletes ou balas.', v: 'O site e o chatbot dizem "não fumar 1 hora antes"; o PDF oficial diz no dia do exame.' },
      { t: 'Não pratique exercícios físicos intensos na 1 hora anterior.' },
      { t: 'Chegue 10 minutos antes, com o pedido médico em mãos.' },
      { t: 'Use roupas confortáveis: o exame é realizado sentado.' },
      { t: 'Acompanhante: ' + LACUNA('sem orientação'), v: 'Definir se acompanhante é necessário (exame de 2 a 3 horas).' },
    ],
    apos: [{ t: LACUNA('sem orientação para depois do exame'), v: 'Confirmar se pode voltar à alimentação e aos medicamentos normalmente.' }],
    contato: [CONTATO_PADRAO],
    fonte: 'public/pdfs/preparo-teste-respiratorio-sibo-imo-v1.pdf',
  },

  // ── 6. Halimetria e sialometria ────────────────────────────────────────────
  {
    slug: 'halimetria-sialometria',
    nome: 'Halimetria e Sialometria',
    sub: 'Diagnóstico de halitose',
    serve: 'A halimetria mede os compostos sulfurados que causam o mau hálito. A sialometria avalia a produção de saliva. Qualquer substância na boca pode alterar o resultado.',
    ficha: [['Duração', '30 a 40 minutos'], ['Método', 'não invasivo'], ['Pedido médico', 'obrigatório']],
    antes: [
      { t: '3 semanas antes: não utilizar antibióticos. Caso tenha utilizado, informe a clínica.' },
      { t: '24 horas antes: não comer alho, cebola e comidas com temperos fortes (pimentas, curry etc.).' },
      { t: '24 horas antes: não utilizar cosméticos aromáticos nem enxaguantes bucais.' },
      { t: '24 horas antes: não ingerir bebidas alcoólicas.' },
      { t: '12 horas antes: não fumar.', v: 'Contradição no PDF oficial: "12 horas antes: não fumar" e, na tabela, "não fumar nas 2 h anteriores". O site e o chatbot dizem 2 horas. Definir.' },
    ],
    jejum: [
      { t: '3 horas antes: não tomar café nem chá aromatizado.' },
      { t: '2 horas antes: é obrigatório comer algo (uma refeição leve é suficiente).' },
      { t: 'Bebidas: somente água é permitida.' },
      { t: 'O quadro-resumo do PDF indica "Jejum: 3 horas".', v: 'Contradição: o PDF indica jejum de 3 horas e, ao mesmo tempo, refeição leve obrigatória 2 horas antes. O site e o chatbot dizem "não comer nas 3 horas anteriores". Definir a regra de alimentação.' },
    ],
    medicamentos: {
      linhas: [{ med: 'Antibióticos', conduta: 'Não utilizar nas 3 semanas anteriores', obs: 'Se tiver utilizado, informe a clínica' }],
      notas: [{ t: 'Informe à equipe todos os medicamentos em uso.' }],
    },
    noDia: [
      { t: 'Escove os dentes imediatamente após a refeição, usando sua pasta habitual.', v: 'O site e o chatbot dizem "não escovar os dentes nas 2 horas anteriores". Confirmar.' },
      { t: 'Não use enxaguantes bucais. Evite perfume, desodorante e cremes com fragrância forte.' },
      { t: 'Evite atividade física intensa na 1 hora anterior.' },
      { t: 'Leve o pedido médico.' },
      { t: 'Chegada antecipada e acompanhante: ' + LACUNA('sem orientação'), v: 'Definir antecedência de chegada e se acompanhante é necessário.' },
      { t: 'Como é o exame: rápido, indolor e não invasivo; você sopra em um aparelho que mede os gases do ar exalado.' },
    ],
    apos: [{ t: LACUNA('sem orientação para depois do exame'), v: 'Confirmar se há orientação pós-exame.' }],
    contato: [CONTATO_PADRAO, { t: 'Se você usou antibiótico nas últimas 3 semanas.' }],
    fonte: 'public/pdfs/preparo-halimetria-sialometria-v1.pdf',
  },

  // ── 7. Avaliação pélvica ───────────────────────────────────────────────────
  {
    slug: 'avaliacao-pelvica',
    nome: 'Avaliação Pélvica com Biofeedback Eletromiográfico',
    serve: 'Avalia o funcionamento do assoalho pélvico, para diagnóstico e tratamento de incontinência urinária ou fecal, disfunções pélvicas e constipação obstrutiva. Realizada pela fisioterapeuta.',
    ficha: [['Duração', '40 a 60 minutos'], ['Método', 'não invasivo'], ['Jejum', 'não é necessário'], ['Pedido médico', 'obrigatório']],
    antes: [
      { t: 'Se possível, faça um diário miccional nos 3 dias anteriores.' },
      { t: 'Anote seus sintomas: frequência urinária, episódios de perda, constipação, dor pélvica.' },
      { t: 'Anote seu histórico: partos, cirurgias pélvicas, prolapsos, tratamentos anteriores.' },
    ],
    jejum: [{ t: 'Não é necessário jejum: pode se alimentar normalmente.' }],
    medicamentos: {
      linhas: [],
      notas: [
        { t: 'Leve a lista de todos os medicamentos em uso, inclusive vitaminas, suplementos e fitoterápicos, e informe especialmente anticolinérgicos e diuréticos.' },
        { t: 'Suspensão de medicamentos: ' + LACUNA('sem orientação de suspensão'), v: 'Confirmar se algum medicamento deve ser suspenso.' },
      ],
    },
    noDia: [
      { t: 'Higiene íntima normal.' },
      { t: 'Roupas confortáveis e fáceis de remover (calça larga, legging ou saia).' },
      { t: 'Leve o pedido médico e exames anteriores, se houver: manometria anorretal, ultrassom pélvico, urodinâmica.' },
      { t: 'Chegue 10 minutos antes.' },
      { t: 'Acompanhante: ' + LACUNA('sem orientação'), v: 'Definir se acompanhante é permitido/recomendado.' },
      { t: 'A avaliação é realizada com respeito e privacidade; tire suas dúvidas antes de iniciar.' },
    ],
    apos: [{ t: LACUNA('sem orientação para depois do exame'), v: 'Confirmar se há orientação pós-avaliação.' }],
    contato: [CONTATO_PADRAO],
    fonte: 'public/pdfs/preparo-avaliacao-pelvica-v1.pdf',
  },
]

export const PREPAROS: Preparo[] = PREPAROS_TODOS.filter(p => !EXAMES_FORA.has(p.slug))

/**
 * Divergências que não cabem num item do preparo (afetam o site/chatbot
 * como um todo). Entram só no relatório de validação.
 */
export const DIVERGENCIAS_GERAIS: string[] = [
  'O chatbot Nuvete (src/lib/nuvete-data.ts) e a página /exames/preparos repetem os preparos com várias orientações diferentes dos PDFs oficiais (jejum, tempos de suspensão, enema, higiene oral). Depois da validação, atualizar o site e o chatbot para não haver duas orientações diferentes publicadas.',
  'O chatbot Nuvete lista "Teste Respiratório: Lactose / Frutose" como preparo separado; o PDF oficial reúne SIBO, IMO, lactose e frutose num único preparo. Confirmar se o preparo é o mesmo.',
  'O chatbot Nuvete apresenta o teste de H. pylori como "UREA". Confirmar o nome a ser usado pela IA.',
  'As versões em inglês e espanhol de exames-detail.ts foram traduzidas por IA e citam Fleet® no enema da manometria anorretal (o PDF oficial cita Minilax).',
  'Textos com superlativos publicados no chatbot ("referência nacional", "o protocolo mais completo disponível", "altamente preciso") e no PDF de H. pylori ("o método não invasivo mais preciso") podem conflitar com as normas do CFM sobre publicidade médica. Foram retirados nesta versão padronizada.',
]

// ─── Pendências para a página /anamnese-ia/validacao ──────────────────────────
export type Pendencia = {
  id:     string   // estável enquanto o conteúdo deste arquivo não mudar de posição
  slug:   string
  exame:  string
  secao:  string
  texto:  string
  motivo: string
}

const SECOES: [keyof Preparo, string][] = [
  ['antes', 'Antes do exame'], ['jejum', 'Jejum'], ['noDia', 'No dia do exame'],
  ['durante', 'Durante o monitoramento'], ['apos', 'Após o exame'], ['contato', 'Quando entrar em contato'],
]

export function listarPendencias(): Pendencia[] {
  const out: Pendencia[] = []
  for (const p of PREPAROS) {
    const add = (chave: string, secao: string, texto: string, motivo?: string) => {
      if (motivo) out.push({ id: `${p.slug}:${chave}`, slug: p.slug, exame: p.nome, secao, texto, motivo })
    }
    for (const [k, nome] of SECOES.slice(0, 2)) (p[k] as Item[] | undefined)?.forEach((it, i) => add(`${k}-${i}`, nome, it.t, it.v))
    p.medicamentos.linhas.forEach((l, i) => add(`med-${i}`, 'Medicamentos', `${l.med}: ${l.conduta}${l.obs ? ` (${l.obs})` : ''}`, l.v))
    p.medicamentos.notas.forEach((it, i) => add(`nota-${i}`, 'Medicamentos', it.t, it.v))
    for (const [k, nome] of SECOES.slice(2)) (p[k] as Item[] | undefined)?.forEach((it, i) => add(`${k}-${i}`, nome, it.t, it.v))
  }
  return out
}

// ─── Aplicar a validação da equipe médica ─────────────────────────────────────
export type DecisaoValidacao = { id: string; decisao?: 'manter' | 'corrigir' | 'remover'; orientacao?: string }

/**
 * Devolve uma cópia dos preparos com as decisões de /anamnese-ia/validacao:
 * manter → tira a marca de validação; corrigir → troca o texto pela
 * orientação informada; remover → apaga o item. Itens sem decisão continuam
 * marcados. Os IDs seguem a mesma ordem de listarPendencias().
 */
export function aplicarValidacao(decisoes: DecisaoValidacao[]): { preparos: Preparo[]; aplicadas: number } {
  const porId = new Map(decisoes.filter(d => d.decisao).map(d => [d.id, d]))
  let aplicadas = 0
  const preparos: Preparo[] = PREPAROS.map(p => {
    const item = (chave: string, it: Item): Item | null => {
      const d = porId.get(`${p.slug}:${chave}`)
      if (!it.v || !d) return it
      aplicadas++
      if (d.decisao === 'remover') return null
      if (d.decisao === 'corrigir' && d.orientacao?.trim()) return { t: d.orientacao.trim() }
      return { t: it.t }
    }
    const itens = (k: string, arr?: Item[]) => arr?.map((it, i) => item(`${k}-${i}`, it)).filter((x): x is Item => !!x)
    const linhas = p.medicamentos.linhas.flatMap((l, i): Linha[] => {
      const d = porId.get(`${p.slug}:med-${i}`)
      if (!l.v || !d) return [l]
      aplicadas++
      if (d.decisao === 'remover') return []
      const { v: _v, ...resto } = l
      if (d.decisao === 'corrigir' && d.orientacao?.trim()) return [{ ...resto, conduta: d.orientacao.trim(), obs: undefined }]
      return [resto]
    })
    return {
      ...p,
      antes: itens('antes', p.antes)!, jejum: itens('jejum', p.jejum)!,
      medicamentos: { linhas, notas: itens('nota', p.medicamentos.notas)! },
      noDia: itens('noDia', p.noDia)!, durante: itens('durante', p.durante),
      apos: itens('apos', p.apos)!, contato: itens('contato', p.contato)!,
    }
  })
  return { preparos, aplicadas }
}

// ─── Preparos novos (sem preparo cadastrado) ──────────────────────────────────
/*
 * Exames que entraram na tabela da clínica em 06/11/2026 sem preparo escrito.
 * A equipe médica preenche em /anamnese-ia/validacao, na estrutura padrão.
 * As respostas ficam em respostas["novo:<slug>:<campo>"].texto.
 */
export type PreparoNovo = {
  slug: string
  nome: string
  responsavel: string
  contexto: string
  mesmoQue?: { slug: string; nome: string }
}

export const PREPAROS_NOVOS: PreparoNovo[] = [
  {
    slug: 'transito-colonico', nome: 'Trânsito colônico', responsavel: 'Dra. Eliane Basques',
    contexto: 'Exame realizado pela Dra. Eliane, somente particular (R$ 1.300). Ainda não há preparo escrito.',
  },
  {
    slug: 'manometria-esofagica-convencional', nome: 'Manometria esofágica convencional (8 canais)', responsavel: 'Dra. Vera Ângelo',
    contexto: 'Exame menos completo que a manometria de alta resolução (24 canais), R$ 700. Ainda não há preparo escrito.',
    mesmoQue: { slug: 'manometria-esofagica', nome: 'Manometria Esofágica de Alta Resolução' },
  },
]

/** Campos do preparo novo, na mesma estrutura dos preparos padronizados. */
export const CAMPOS_NOVO: { id: string; label: string; ajuda: string; obrigatorio?: boolean }[] = [
  { id: 'serve',        label: 'Para que serve', ajuda: '1 a 2 linhas, em linguagem simples.', obrigatorio: true },
  { id: 'ficha',        label: 'Duração, sedação e pedido médico', ajuda: 'Ex.: 40 minutos; sem sedação; pedido médico obrigatório.' },
  { id: 'antes',        label: 'Antes do exame (dias anteriores)', ajuda: 'Dieta, cuidados, o que comprar. Um item por linha.' },
  { id: 'jejum',        label: 'Jejum', ajuda: 'Se não precisa, escreva "Não é necessário jejum".', obrigatorio: true },
  { id: 'medicamentos', label: 'Medicamentos', ajuda: 'O que suspender (e com quanto tempo de antecedência) e o que manter. Um por linha.', obrigatorio: true },
  { id: 'noDia',        label: 'No dia do exame', ajuda: 'O que levar, roupa, acompanhante, chegada antecipada. Um item por linha.', obrigatorio: true },
  { id: 'apos',         label: 'Após o exame', ajuda: 'Retorno às atividades, cuidados, entrega do laudo.' },
  { id: 'contato',      label: 'Quando entrar em contato com a clínica', ajuda: 'Situações em que o paciente deve ligar.' },
]

export const chaveNovo = (slug: string, campo: string) => `novo:${slug}:${campo}`

type RespNovo = Record<string, { texto?: string } | undefined>

/** O preparo novo foi respondido? (mesmo preparo de outro exame, ou campos obrigatórios preenchidos) */
export function novoCompleto(p: PreparoNovo, r: RespNovo) {
  const modo = r[chaveNovo(p.slug, 'modo')]?.texto
  if (p.mesmoQue && modo === 'mesmo') return true
  if (p.mesmoQue && modo !== 'diferente') return false
  const texto = (id: string) => r[chaveNovo(p.slug, id)]?.texto?.trim() ?? ''
  // Proposta usada como ponto de partida: só conta quando não sobra nenhum [definir]/[confirmar]
  if (CAMPOS_NOVO.some(c => PENDENTE_NA_PROPOSTA.test(texto(c.id)))) return false
  return CAMPOS_NOVO.filter(c => c.obrigatorio).every(c => !!texto(c.id))
}

/** Marcas deixadas nas propostas para o médico completar (ver lib/anamnese-ia/propostas.ts). */
export const PENDENTE_NA_PROPOSTA = /\[(definir|confirmar)\]/i

/**
 * Converte as respostas dos preparos novos em Preparo (para o PDF e o Markdown).
 * `validados`: preparos já com a validação aplicada, para o "mesmo preparo" herdar as decisões.
 */
export function preparosDosNovos(r: RespNovo, validados: Preparo[] = PREPAROS): Preparo[] {
  const linhas = (t?: string): Item[] => (t ?? '').split('\n').map(s => s.trim()).filter(Boolean).map(t => ({ t }))
  const out: Preparo[] = []
  for (const p of PREPAROS_NOVOS) {
    if (!novoCompleto(p, r)) continue
    const modo = r[chaveNovo(p.slug, 'modo')]?.texto
    const base = p.mesmoQue && validados.find(x => x.slug === p.mesmoQue!.slug)
    if (base && modo === 'mesmo') {
      out.push({ ...base, slug: p.slug, nome: p.nome, sub: `Mesmo preparo da ${p.mesmoQue!.nome}`, fonte: `Validação da equipe médica (${p.responsavel})` })
      continue
    }
    const v = (id: string) => r[chaveNovo(p.slug, id)]?.texto
    out.push({
      slug: p.slug, nome: p.nome, serve: v('serve') ?? '',
      ficha: v('ficha') ? [['Informações', v('ficha')!]] : [],
      antes: linhas(v('antes')), jejum: linhas(v('jejum')),
      medicamentos: { linhas: [], notas: linhas(v('medicamentos')) },
      noDia: linhas(v('noDia')), apos: linhas(v('apos')),
      contato: linhas(v('contato')).length ? linhas(v('contato')) : [{ t: 'Em caso de dúvida, entre em contato com a clínica antes do exame: (31) 2537-3131 ou WhatsApp (31) 99726-1029.' }],
      fonte: `Escrito pela equipe médica na validação (${p.responsavel})`,
    })
  }
  return out
}
