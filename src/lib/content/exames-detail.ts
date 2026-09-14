/**
 * Conteúdo detalhado de cada exame (página /exames/[slug]), por idioma.
 * pt-BR é a fonte original (movida de
 * src/app/[locale]/exames/[slug]/page.tsx); en/es são traduções por IA.
 *
 * ATENÇÃO: as seções `preparo`/`preparoCards` contêm instruções clínicas
 * (jejum, suspensão de medicamentos, dieta) traduzidas por IA. Recomenda-se
 * revisão da equipe clínica (Dra. Vera Ângelo) antes de considerar
 * definitivas as versões en/es — erros aqui afetam o preparo real do
 * paciente para o exame.
 */
import type { AppLocale } from '@/i18n/routing'

export interface PreparoCard {
  icon:      string
  title:     string
  body:      string
  badge?:    string
  section?:  string
  variant?:  'default' | 'warning' | 'permitted'
}

export interface Faq { pergunta: string; resposta: string }

export interface ExameDetailData {
  indicacoes:    string[]
  preparo:       string[]
  preparoCards?: PreparoCard[]
  photos?:       { src: string; alt: string }[]
  video?:        { embed: string; title: string; short?: boolean }
  espRel:        string[]
  faqs:          Faq[]
}

// ─── Português (fonte original) ───────────────────────────────────────────

const DETAIL_PT: Record<string, ExameDetailData> = {
  'manometria-esofagica': {
    indicacoes: [
      'Disfagia (dificuldade de deglutição)',
      'Suspeita de acalasia ou outros distúrbios motores esofágicos',
      'Refluxo gastroesofágico refratário ao tratamento',
      'Avaliação pré e pós-operatória de cirurgia antirrefluxo',
      'Dor torácica de causa não cardíaca',
      'Suspeita de espasmo difuso do esôfago',
    ],
    faqs: [
      { pergunta: 'O que é a manometria esofágica?', resposta: 'É um exame que mede a pressão e a coordenação dos movimentos musculares do esôfago durante a deglutição, avaliando se os músculos e o esfíncter esofágico inferior funcionam corretamente.' },
      { pergunta: 'A manometria esofágica dói?', resposta: 'Não é um exame doloroso, mas pode causar desconforto leve durante a passagem do cateter fino pelo nariz até o esôfago. A maioria dos pacientes tolera bem o procedimento.' },
      { pergunta: 'Quanto tempo dura o exame?', resposta: 'A manometria esofágica de alta resolução dura entre 30 e 45 minutos, incluindo o posicionamento do cateter e a realização das deglutições avaliadas.' },
      { pergunta: 'Precisa de sedação ou anestesia?', resposta: 'Não. O exame é realizado sem sedação, em ambiente ambulatorial, com aplicação apenas de um gel anestésico local no nariz para maior conforto.' },
      { pergunta: 'Quando o médico costuma solicitar esse exame?', resposta: 'É indicado em casos de dificuldade para engolir, suspeita de acalasia, refluxo persistente sem resposta ao tratamento, dor torácica sem causa cardíaca e antes de cirurgias antirrefluxo.' },
    ],
    preparo: [
      'Jejum de 6 horas antes do exame',
      'Suspender medicamentos que afetam motilidade esofágica (consultar médico)',
      'Usar roupa confortável',
      'Comparecer com o pedido médico e exames anteriores',
    ],
    preparoCards: [
      { section: 'Suspensão de Medicamentos', icon: '💊', badge: '48h antes',        title: 'Procinéticos',           body: 'Suspender Bromoprida e Domperidona. Se houver dor torácica, suspender também Dilacoron, Isordil, Cardizem e Diltiazem; consulte seu médico.' },
      { section: 'Suspensão de Medicamentos', icon: '✅', badge: 'Véspera até 22h',   title: 'Medicamentos Permitidos', body: 'IBPs (Omeprazol, Pantoprazol, Lansoprazol), antiácidos simples, Sucrafilm e Lufta Gastro Pro podem ser usados normalmente.', variant: 'permitted' },
      { section: 'Suspensão de Medicamentos', icon: '⚠️',                             title: 'Uso Contínuo',           body: 'Medicamentos para hipertensão, diabetes, coração e pulmão podem ser tomados normalmente com o mínimo de água possível.', variant: 'warning' },
      { section: 'Preparação para o Jejum',   icon: '🍽️', badge: 'A partir das 22h', title: 'Jejum Absoluto',         body: 'Jejum absoluto a partir das 22h da noite anterior ao exame, inclusive água.' },
      { section: 'Preparação para o Jejum',   icon: '🩺',                             title: 'Casos Especiais',        body: 'Para crianças, idosos e diabéticos, o tempo de jejum será avaliado individualmente no agendamento.' },
      { section: 'No Dia do Exame',           icon: '🆔',                             title: 'Documentação',           body: 'Traga documento com foto, pedido médico original e carteirinha do convênio.' },
      { section: 'No Dia do Exame',           icon: '📄',                             title: 'Exames Anteriores',      body: 'Leve resultado da última endoscopia digestiva ou Raio-X contrastado do esôfago, se possuir.' },
      { section: 'No Dia do Exame',           icon: '👕',                             title: 'Vestimenta',             body: 'Use roupas confortáveis com abertura frontal. Evite camisas de gola alta.' },
      { section: 'No Dia do Exame',           icon: '⏰',                             title: 'Horário',                body: 'Chegue com 15 minutos de antecedência para os trâmites de cadastro e recepção.' },
    ],
    video: { embed: 'https://www.youtube.com/embed/0CS9j6SrcXU', title: 'Manometria Esofágica | NU.V.E.M Medicina', short: true },
    espRel: ['motilidade-digestiva', 'gastroenterologia'],
  },
  'manometria-anorretal': {
    indicacoes: [
      'Incontinência fecal',
      'Constipação crônica refratária',
      'Distúrbios do assoalho pélvico',
      'Suspeita de doença de Hirschsprung',
      'Avaliação pré e pós-operatória de cirurgia anorretal',
      'Complementar à avaliação pélvica funcional',
    ],
    preparo: [
      'Realizar enema de limpeza (Minilax® ou similar) 1-2 horas antes do exame',
      'Não é necessário jejum',
      'Usar roupa confortável e calça que possa ser abaixada',
      'Comparecer com o pedido médico e exames anteriores',
      'Informar à equipe o uso de qualquer medicamento',
    ],
    preparoCards: [
      { icon: '🚿', badge: '1-2h antes',   title: 'Enema de Limpeza', body: 'Realizar enema (Minilax® ou similar) 1 a 2 horas antes do exame para limpeza do canal anal.' },
      { icon: '🍽️', title: 'Sem Jejum',    body: 'Não é necessário jejum. Você pode se alimentar normalmente antes do exame.' },
      { icon: '👕', title: 'Vestimenta',    body: 'Use roupa confortável e calça que possa ser abaixada com facilidade.' },
      { icon: '📋', title: 'Documentos',    body: 'Traga o pedido médico e exames anteriores disponíveis (ultrassom pélvico, manometria prévia).' },
      { icon: '💊', title: 'Medicamentos',  body: 'Informe à equipe todos os medicamentos em uso, incluindo laxativos e fitoterápicos.' },
    ],
    faqs: [
      { pergunta: 'O que é a manometria anorretal?', resposta: 'É um exame que mede a força e a coordenação dos músculos do ânus e do reto, avaliando a função dos esfíncteres durante o repouso e a evacuação.' },
      { pergunta: 'A manometria anorretal dói?', resposta: 'Não é dolorosa, apenas desconfortável durante a introdução de um cateter fino e flexível no canal anal. A maioria dos pacientes relata boa tolerância.' },
      { pergunta: 'Quanto tempo dura o exame?', resposta: 'O exame dura entre 30 e 45 minutos, incluindo a avaliação da pressão de repouso, contração voluntária e esforço evacuatório.' },
      { pergunta: 'Preciso fazer algum preparo especial?', resposta: 'Sim, recomenda-se um enema de limpeza 1 a 2 horas antes do exame. Não é necessário jejum.' },
      { pergunta: 'Para que serve esse exame?', resposta: 'É usado para investigar incontinência fecal, constipação crônica refratária, distúrbios do assoalho pélvico e suspeita de doença de Hirschsprung.' },
    ],
    espRel: ['motilidade-digestiva', 'fisioterapia-pelvica'],
  },
  'phmetria-impedanciometria': {
    indicacoes: [
      'Suspeita de DRGE refratária ao tratamento',
      'Sintomas atípicos de refluxo (tosse, rouquidão)',
      'Avaliação pré e pós-operatória antirrefluxo',
      'Refluxo não ácido suspeito',
      'Correlação de sintomas com eventos de refluxo',
    ],
    preparo: [
      'Suspender IBPs por 7 dias (orientação médica)',
      'Suspender antiácidos por 24 horas',
      'Jejum de 4 horas antes da instalação do cateter',
      'Manter atividade normal durante o monitoramento',
    ],
    preparoCards: [
      { icon: '💊', badge: '7 dias antes',  title: 'Protetores Gástricos', body: 'Suspender IBPs (Omeprazol, Pantoprazol, Esomeprazol) somente com orientação do médico solicitante.' },
      { icon: '💊', badge: '24h antes',     title: 'Antiácidos',           body: 'Suspender antiácidos simples (Leite de Magnésia, Gaviscon, Luftal) 24 horas antes da instalação do cateter.' },
      { icon: '🍽️', badge: '4h antes',     title: 'Jejum',                body: 'Jejum de 4 horas antes da colocação do cateter. Após a instalação, alimente-se normalmente.' },
      { icon: '👕', title: 'Vestimenta',    body: 'Use blusa de botão frontal: o gravador portátil ficará preso ao seu corpo durante as 24 horas de monitoramento.' },
      { icon: '🏠', title: 'Rotina Normal', body: 'Mantenha sua rotina habitual de trabalho e atividades domésticas durante todo o exame.' },
      { icon: '📝', title: 'Diário do Exame', body: 'Registre sintomas, horários das refeições e posições no diário fornecido pela clínica: é essencial para o laudo.' },
    ],
    photos: [
      { src: '/images/phmetria-1.webp', alt: 'Equipamentos AL-3 e AL-4 ZpH para pHmetria e impedânciometria' },
      { src: '/images/phmetria-2.webp', alt: 'Paciente utilizando o gravador portátil durante o monitoramento de 24h' },
    ],
    faqs: [
      { pergunta: 'O que é a pHmetria e impedânciometria?', resposta: 'É um monitoramento ambulatorial de 24 horas que registra episódios de refluxo ácido e não ácido através de um cateter fino ou cápsula, correlacionando os eventos com os sintomas relatados pelo paciente.' },
      { pergunta: 'É incômodo usar o aparelho por 24 horas?', resposta: 'Pode causar um leve desconforto na garganta nas primeiras horas, mas o gravador é portátil e permite manter as atividades normais do dia a dia durante todo o monitoramento.' },
      { pergunta: 'Preciso ficar internado durante o exame?', resposta: 'Não. O exame é totalmente ambulatorial: o paciente volta para casa com o gravador portátil e retorna à clínica no dia seguinte para a retirada do equipamento.' },
      { pergunta: 'Quando esse exame é indicado?', resposta: 'É indicado em casos de refluxo refratário ao tratamento, sintomas atípicos como tosse crônica e rouquidão, e na avaliação pré e pós-operatória de cirurgia antirrefluxo.' },
    ],
    espRel: ['motilidade-digestiva', 'gastroenterologia'],
  },
  'testes-respiratorios': {
    indicacoes: [
      'Suspeita de SIBO (supercrescimento bacteriano no intestino delgado)',
      'Suspeita de IMO (supercrescimento de metanogênicos) ou LIBO',
      'Intolerância à lactose ou frutose',
      'Diagnóstico de infecção por H. pylori',
      'Síndrome do intestino irritável para investigação etiológica',
      'Confirmação de erradicação após antibioticoterapia',
      'Investigação de gases intestinais (H₂, CH₄, H₂S)',
    ],
    preparo: [
      'Jejum de 12 horas antes do exame',
      'Dieta específica no dia anterior (sem fibras fermentáveis)',
      'Não usar antibióticos nas 4 semanas anteriores',
      'Não fumar 1 hora antes do exame',
      'Não praticar exercícios intensos 1 hora antes',
    ],
    faqs: [
      { pergunta: 'O que é o teste respiratório?', resposta: 'É um exame não invasivo que mede a concentração de gases (hidrogênio, metano e gás sulfídrico) no ar exalado para diagnosticar SIBO, IMO, intolerâncias alimentares e infecção por H. pylori.' },
      { pergunta: 'O teste respiratório dói?', resposta: 'Não. Não há agulhas, cortes ou desconforto: o paciente apenas sopra em um bocal a intervalos regulares durante o exame.' },
      { pergunta: 'Quanto tempo dura o teste respiratório?', resposta: 'A duração varia entre 2 e 3 horas, dependendo do substrato utilizado (glicose, lactulose, lactose ou frutose) e da condição investigada.' },
      { pergunta: 'Quais doenças o teste respiratório consegue detectar?', resposta: 'O exame detecta SIBO (supercrescimento bacteriano no intestino delgado), IMO, intolerância à lactose e frutose, e infecção por H. pylori, entre outras condições.' },
      { pergunta: 'Preciso de algum preparo antes do exame?', resposta: 'Sim. É necessário jejum de 12 horas e uma dieta específica no dia anterior, sem alimentos fermentáveis. O guia completo de preparo está disponível em PDF para download.' },
    ],
    espRel: ['gastroenterologia', 'pediatria'],
  },
  'halimetria-sialometria': {
    indicacoes: [
      'Halitose persistente sem causa oral identificada',
      'Avaliação objetiva antes e após tratamento',
      'Suspeita de halitose de origem digestiva ou sistêmica',
      'Rastreamento de xerostomia associada',
    ],
    preparo: [
      'Não comer nas 3 horas anteriores',
      'Não escovar dentes 2 horas antes',
      'Não usar enxaguante bucal no dia',
      'Não fumar 2 horas antes',
      'Hidratação normal permitida',
    ],
    preparoCards: [
      { icon: '🍽️', badge: '3h antes',  title: 'Alimentação',          body: 'Não comer nas 3 horas anteriores ao exame. Refeições alteram a composição do ar expirado.' },
      { icon: '🦷', badge: '2h antes',  title: 'Higiene Oral',          body: 'Não escovar os dentes nas 2 horas anteriores. Não usar enxaguante, spray ou qualquer produto bucal no dia.' },
      { icon: '🚭', badge: '2h antes',  title: 'Sem Fumar',             body: 'Não fumar nas 2 horas anteriores ao exame. O cigarro interfere diretamente na medição dos gases.' },
      { icon: '🌸', title: 'Sem Perfume', body: 'Não usar perfume ou desodorante com fragrância forte no dia, pois podem interferir na leitura do halímetro.' },
      { icon: '💧', title: 'Hidratação',  body: 'Beber água normalmente é permitido e recomendado para a sialometria.' },
    ],
    faqs: [
      { pergunta: 'O que é a halimetria?', resposta: 'É um exame que mede objetivamente, em partes por bilhão, os compostos sulfurados voláteis presentes no ar exalado, principais responsáveis pelo mau hálito.' },
      { pergunta: 'O que é a sialometria?', resposta: 'É a medição do fluxo salivar em repouso e estimulado, usada para identificar boca seca (xerostomia) como possível causa ou agravante da halitose.' },
      { pergunta: 'Os exames de halimetria e sialometria doem?', resposta: 'Não. São exames simples, rápidos e indolores, realizados com um aparelho específico chamado halímetro.' },
      { pergunta: 'Quanto tempo duram os exames?', resposta: 'A halimetria e a sialometria juntas duram cerca de 30 minutos.' },
      { pergunta: 'A halitose sempre tem origem na boca?', resposta: 'Não. A halitose pode ter origem digestiva (refluxo, SIBO), nasofaríngea ou sistêmica. Por isso o protocolo da NU.V.E.M investiga todas as possíveis causas em conjunto.' },
    ],
    espRel: ['halitose'],
  },
  'avaliacao-pelvica': {
    indicacoes: [
      'Incontinência urinária ou fecal',
      'Disfunção do assoalho pélvico',
      'Constipação obstrutiva',
      'Dor pélvica crônica',
      'Pré e pós-operatório pélvico',
      'Complementar à manometria anorretal',
    ],
    preparo: [
      'Usar roupa confortável',
      'Não é necessário jejum',
      'Comparecer com exames anteriores se houver',
      'Informar uso de medicamentos',
    ],
    preparoCards: [
      { icon: '🍽️', title: 'Sem Jejum',        body: 'Não é necessário jejum. Pode se alimentar normalmente antes do exame.' },
      { icon: '👕', title: 'Vestimenta',        body: 'Use roupa confortável e de fácil remoção para facilitar a avaliação.' },
      { icon: '🚿', title: 'Higiene',           body: 'Realize higiene íntima normal no dia do exame. Não é necessário nenhum preparo especial.' },
      { icon: '📋', title: 'Exames Anteriores', body: 'Traga exames anteriores se houver (manometria anorretal, ultrassom pélvico, urodinâmica).' },
      { icon: '💊', title: 'Medicamentos',      body: 'Informe à equipe o uso de qualquer medicamento, especialmente os que afetam a musculatura.' },
    ],
    faqs: [
      { pergunta: 'O que é a avaliação pélvica?', resposta: 'É um exame funcional do assoalho pélvico realizado com biofeedback eletromiográfico, que mede a atividade muscular durante o repouso, contração e esforço.' },
      { pergunta: 'A avaliação pélvica dói?', resposta: 'Não. É um exame indolor e não invasivo, conduzido com sensores externos ou internos de baixa complexidade.' },
      { pergunta: 'Quanto tempo dura o exame?', resposta: 'A avaliação pélvica completa dura entre 40 e 60 minutos.' },
      { pergunta: 'Para quem é indicada essa avaliação?', resposta: 'É indicada para pacientes com incontinência urinária ou fecal, disfunção do assoalho pélvico, constipação obstrutiva e dor pélvica crônica.' },
      { pergunta: 'Preciso de algum preparo especial?', resposta: 'Não. Basta usar roupas confortáveis; não é necessário jejum nem preparo intestinal.' },
    ],
    espRel: ['fisioterapia-pelvica'],
  },
}

// ─── English ───────────────────────────────────────────────────────────────

const DETAIL_EN: Record<string, ExameDetailData> = {
  'manometria-esofagica': {
    indicacoes: [
      'Dysphagia (difficulty swallowing)',
      'Suspected achalasia or other esophageal motor disorders',
      'Gastroesophageal reflux refractory to treatment',
      'Pre- and post-operative evaluation of anti-reflux surgery',
      'Chest pain with no cardiac cause',
      'Suspected diffuse esophageal spasm',
    ],
    faqs: [
      { pergunta: 'What is esophageal manometry?', resposta: 'It’s an exam that measures the pressure and coordination of the esophagus’s muscular movements during swallowing, evaluating whether the muscles and lower esophageal sphincter work correctly.' },
      { pergunta: 'Does esophageal manometry hurt?', resposta: 'It’s not a painful exam, but it can cause mild discomfort while the thin catheter passes through the nose into the esophagus. Most patients tolerate the procedure well.' },
      { pergunta: 'How long does the exam take?', resposta: 'High-resolution esophageal manometry takes between 30 and 45 minutes, including catheter placement and the evaluated swallows.' },
      { pergunta: 'Do I need sedation or anesthesia?', resposta: 'No. The exam is performed without sedation, in an outpatient setting, with only a local anesthetic gel applied to the nose for comfort.' },
      { pergunta: 'When does a doctor usually order this exam?', resposta: 'It’s indicated for difficulty swallowing, suspected achalasia, persistent reflux unresponsive to treatment, chest pain with no cardiac cause, and before anti-reflux surgery.' },
    ],
    preparo: [
      '6-hour fasting before the exam',
      'Suspend medications that affect esophageal motility (consult your doctor)',
      'Wear comfortable clothing',
      'Bring your medical referral and previous exams',
    ],
    preparoCards: [
      { section: 'Medication Suspension', icon: '💊', badge: '48h before',            title: 'Prokinetics',           body: 'Suspend Bromopride and Domperidone. If you have chest pain, also suspend Dilacoron, Isordil, Cardizem and Diltiazem; consult your doctor.' },
      { section: 'Medication Suspension', icon: '✅', badge: 'Night before, until 10pm', title: 'Allowed Medications', body: 'PPIs (Omeprazole, Pantoprazole, Lansoprazole), simple antacids, Sucralfate and Lufta Gastro Pro can be used normally.', variant: 'permitted' },
      { section: 'Medication Suspension', icon: '⚠️',                                   title: 'Ongoing Use',         body: 'Medications for hypertension, diabetes, heart and lung conditions can be taken normally with the least amount of water possible.', variant: 'warning' },
      { section: 'Fasting Preparation',   icon: '🍽️', badge: 'From 10pm',            title: 'Absolute Fasting',      body: 'Absolute fasting from 10pm the night before the exam, including water.' },
      { section: 'Fasting Preparation',   icon: '🩺',                                   title: 'Special Cases',       body: 'For children, elderly patients and diabetics, fasting time will be assessed individually when scheduling.' },
      { section: 'On Exam Day',           icon: '🆔',                                   title: 'Documentation',       body: 'Bring a photo ID, the original medical referral and your insurance card.' },
      { section: 'On Exam Day',           icon: '📄',                                   title: 'Previous Exams',      body: 'Bring the result of your last upper endoscopy or contrast esophagram, if you have one.' },
      { section: 'On Exam Day',           icon: '👕',                                   title: 'Clothing',            body: 'Wear comfortable clothing with a front opening. Avoid high-neck shirts.' },
      { section: 'On Exam Day',           icon: '⏰',                                   title: 'Arrival Time',        body: 'Arrive 15 minutes early for registration and check-in.' },
    ],
    video: { embed: 'https://www.youtube.com/embed/0CS9j6SrcXU', title: 'Esophageal Manometry | NU.V.E.M Medicina', short: true },
    espRel: ['motilidade-digestiva', 'gastroenterologia'],
  },
  'manometria-anorretal': {
    indicacoes: [
      'Fecal incontinence',
      'Refractory chronic constipation',
      'Pelvic floor disorders',
      'Suspected Hirschsprung’s disease',
      'Pre- and post-operative evaluation of anorectal surgery',
      'Complementary to functional pelvic assessment',
    ],
    preparo: [
      'Cleansing enema (Fleet® or similar) 1-2 hours before the exam',
      'Fasting is not required',
      'Wear comfortable clothing and pants that can be easily lowered',
      'Bring your medical referral and previous exams',
      'Inform staff of any medications you are taking',
    ],
    preparoCards: [
      { icon: '🚿', badge: '1-2h before', title: 'Cleansing Enema', body: 'Perform an enema (Fleet® or similar) 1 to 2 hours before the exam to clean the anal canal.' },
      { icon: '🍽️', title: 'No Fasting',  body: 'Fasting is not required. You may eat normally before the exam.' },
      { icon: '👕', title: 'Clothing',     body: 'Wear comfortable clothing and pants that can be easily lowered.' },
      { icon: '📋', title: 'Documents',    body: 'Bring your medical referral and any available previous exams (pelvic ultrasound, prior manometry).' },
      { icon: '💊', title: 'Medications',  body: 'Inform staff of all medications in use, including laxatives and herbal supplements.' },
    ],
    faqs: [
      { pergunta: 'What is anorectal manometry?', resposta: 'It’s an exam that measures the strength and coordination of the anal and rectal muscles, evaluating sphincter function at rest and during evacuation.' },
      { pergunta: 'Does anorectal manometry hurt?', resposta: 'It’s not painful, only uncomfortable during the introduction of a thin, flexible catheter into the anal canal. Most patients report good tolerance.' },
      { pergunta: 'How long does the exam take?', resposta: 'The exam takes between 30 and 45 minutes, including the assessment of resting pressure, voluntary contraction and evacuation effort.' },
      { pergunta: 'Do I need any special preparation?', resposta: 'Yes, a cleansing enema is recommended 1 to 2 hours before the exam. Fasting is not required.' },
      { pergunta: 'What is this exam used for?', resposta: 'It’s used to investigate fecal incontinence, refractory chronic constipation, pelvic floor disorders and suspected Hirschsprung’s disease.' },
    ],
    espRel: ['motilidade-digestiva', 'fisioterapia-pelvica'],
  },
  'phmetria-impedanciometria': {
    indicacoes: [
      'Suspected GERD refractory to treatment',
      'Atypical reflux symptoms (cough, hoarseness)',
      'Pre- and post-operative anti-reflux evaluation',
      'Suspected non-acid reflux',
      'Correlating symptoms with reflux events',
    ],
    preparo: [
      'Suspend PPIs for 7 days (with medical guidance)',
      'Suspend antacids for 24 hours',
      '4-hour fasting before catheter placement',
      'Maintain normal activity during monitoring',
    ],
    preparoCards: [
      { icon: '💊', badge: '7 days before', title: 'Gastric Protectors', body: 'Suspend PPIs (Omeprazole, Pantoprazole, Esomeprazole) only with guidance from the referring physician.' },
      { icon: '💊', badge: '24h before',    title: 'Antacids',           body: 'Suspend simple antacids (Milk of Magnesia, Gaviscon, Luftal) 24 hours before catheter placement.' },
      { icon: '🍽️', badge: '4h before',    title: 'Fasting',            body: '4-hour fasting before catheter placement. After placement, eat normally.' },
      { icon: '👕', title: 'Clothing',      body: 'Wear a front-button shirt: the portable recorder will be attached to your body throughout the 24-hour monitoring.' },
      { icon: '🏠', title: 'Normal Routine',body: 'Keep your usual work and household routine throughout the exam.' },
      { icon: '📝', title: 'Exam Diary',    body: 'Record symptoms, meal times and positions in the diary provided by the clinic: it’s essential for the report.' },
    ],
    photos: [
      { src: '/images/phmetria-1.webp', alt: 'AL-3 and AL-4 ZpH equipment for pH monitoring and impedance testing' },
      { src: '/images/phmetria-2.webp', alt: 'Patient using the portable recorder during 24h monitoring' },
    ],
    faqs: [
      { pergunta: 'What is pH and impedance monitoring?', resposta: 'It’s a 24-hour ambulatory monitoring that records acid and non-acid reflux episodes through a thin catheter or capsule, correlating events with symptoms reported by the patient.' },
      { pergunta: 'Is it uncomfortable to wear the device for 24 hours?', resposta: 'It may cause mild throat discomfort in the first few hours, but the recorder is portable and allows you to keep your normal daily activities throughout monitoring.' },
      { pergunta: 'Do I need to be hospitalized during the exam?', resposta: 'No. The exam is fully ambulatory: the patient goes home with the portable recorder and returns to the clinic the next day to have the equipment removed.' },
      { pergunta: 'When is this exam indicated?', resposta: 'It’s indicated for reflux refractory to treatment, atypical symptoms such as chronic cough and hoarseness, and pre- and post-operative evaluation of anti-reflux surgery.' },
    ],
    espRel: ['motilidade-digestiva', 'gastroenterologia'],
  },
  'testes-respiratorios': {
    indicacoes: [
      'Suspected SIBO (small intestinal bacterial overgrowth)',
      'Suspected IMO (methanogen overgrowth) or LIBO',
      'Lactose or fructose intolerance',
      'Diagnosis of H. pylori infection',
      'Irritable bowel syndrome for etiological investigation',
      'Confirmation of eradication after antibiotic therapy',
      'Investigation of intestinal gases (H₂, CH₄, H₂S)',
    ],
    preparo: [
      '12-hour fasting before the exam',
      'Specific diet the day before (no fermentable fiber)',
      'No antibiotics in the previous 4 weeks',
      'No smoking 1 hour before the exam',
      'No intense exercise 1 hour before',
    ],
    faqs: [
      { pergunta: 'What is the breath test?', resposta: 'It’s a non-invasive exam that measures the concentration of gases (hydrogen, methane and hydrogen sulfide) in exhaled breath to diagnose SIBO, IMO, food intolerances and H. pylori infection.' },
      { pergunta: 'Does the breath test hurt?', resposta: 'No. There are no needles, cuts or discomfort: the patient simply blows into a mouthpiece at regular intervals during the exam.' },
      { pergunta: 'How long does the breath test take?', resposta: 'Duration varies between 2 and 3 hours, depending on the substrate used (glucose, lactulose, lactose or fructose) and the condition being investigated.' },
      { pergunta: 'What conditions can the breath test detect?', resposta: 'The exam detects SIBO (small intestinal bacterial overgrowth), IMO, lactose and fructose intolerance, and H. pylori infection, among other conditions.' },
      { pergunta: 'Do I need any preparation before the exam?', resposta: 'Yes. A 12-hour fast and a specific diet the day before are required, with no fermentable foods. The complete prep guide is available as a downloadable PDF.' },
    ],
    espRel: ['gastroenterologia', 'pediatria'],
  },
  'halimetria-sialometria': {
    indicacoes: [
      'Persistent halitosis with no identified oral cause',
      'Objective evaluation before and after treatment',
      'Suspected halitosis of digestive or systemic origin',
      'Screening for associated xerostomia',
    ],
    preparo: [
      'No eating in the 3 hours before',
      'No brushing teeth 2 hours before',
      'No mouthwash on the day',
      'No smoking 2 hours before',
      'Normal hydration is allowed',
    ],
    preparoCards: [
      { icon: '🍽️', badge: '3h before', title: 'Eating',        body: 'Do not eat in the 3 hours before the exam. Meals alter the composition of exhaled air.' },
      { icon: '🦷', badge: '2h before', title: 'Oral Hygiene',  body: 'Do not brush your teeth in the 2 hours before. Do not use mouthwash, spray or any oral product on the day.' },
      { icon: '🚭', badge: '2h before', title: 'No Smoking',    body: 'Do not smoke in the 2 hours before the exam. Cigarettes directly interfere with gas measurement.' },
      { icon: '🌸', title: 'No Perfume', body: 'Do not wear perfume or strongly scented deodorant on the day, as they may interfere with the halimeter reading.' },
      { icon: '💧', title: 'Hydration',  body: 'Drinking water normally is allowed and recommended for sialometry.' },
    ],
    faqs: [
      { pergunta: 'What is halimetry?', resposta: 'It’s an exam that objectively measures, in parts per billion, the volatile sulfur compounds present in exhaled breath, the main cause of bad breath.' },
      { pergunta: 'What is sialometry?', resposta: 'It’s the measurement of salivary flow at rest and stimulated, used to identify dry mouth (xerostomia) as a possible cause or aggravating factor of halitosis.' },
      { pergunta: 'Do halimetry and sialometry hurt?', resposta: 'No. They are simple, quick and painless exams, performed with a specific device called a halimeter.' },
      { pergunta: 'How long do the exams take?', resposta: 'Halimetry and sialometry together take about 30 minutes.' },
      { pergunta: 'Does halitosis always originate in the mouth?', resposta: 'No. Halitosis can have a digestive (reflux, SIBO), nasopharyngeal or systemic origin. That’s why the NU.V.E.M protocol investigates every possible cause together.' },
    ],
    espRel: ['halitose'],
  },
  'avaliacao-pelvica': {
    indicacoes: [
      'Urinary or fecal incontinence',
      'Pelvic floor dysfunction',
      'Obstructive constipation',
      'Chronic pelvic pain',
      'Pre- and post-operative pelvic evaluation',
      'Complementary to anorectal manometry',
    ],
    preparo: [
      'Wear comfortable clothing',
      'Fasting is not required',
      'Bring previous exams, if any',
      'Inform staff of any medications in use',
    ],
    preparoCards: [
      { icon: '🍽️', title: 'No Fasting',      body: 'Fasting is not required. You may eat normally before the exam.' },
      { icon: '👕', title: 'Clothing',         body: 'Wear comfortable, easily removable clothing to facilitate the assessment.' },
      { icon: '🚿', title: 'Hygiene',          body: 'Perform normal personal hygiene on the day of the exam. No special preparation is required.' },
      { icon: '📋', title: 'Previous Exams',   body: 'Bring previous exams if available (anorectal manometry, pelvic ultrasound, urodynamics).' },
      { icon: '💊', title: 'Medications',      body: 'Inform staff of any medications in use, especially those that affect muscle function.' },
    ],
    faqs: [
      { pergunta: 'What is the pelvic floor assessment?', resposta: 'It’s a functional pelvic floor exam performed with electromyographic biofeedback, which measures muscle activity at rest, during contraction and during straining.' },
      { pergunta: 'Does the pelvic floor assessment hurt?', resposta: 'No. It’s a painless, non-invasive exam, conducted with low-complexity external or internal sensors.' },
      { pergunta: 'How long does the exam take?', resposta: 'The complete pelvic floor assessment takes between 40 and 60 minutes.' },
      { pergunta: 'Who is this assessment recommended for?', resposta: 'It’s recommended for patients with urinary or fecal incontinence, pelvic floor dysfunction, obstructive constipation and chronic pelvic pain.' },
      { pergunta: 'Do I need any special preparation?', resposta: 'No. Just wear comfortable clothing; fasting or bowel prep is not required.' },
    ],
    espRel: ['fisioterapia-pelvica'],
  },
}

// ─── Español ───────────────────────────────────────────────────────────────

const DETAIL_ES: Record<string, ExameDetailData> = {
  'manometria-esofagica': {
    indicacoes: [
      'Disfagia (dificultad para tragar)',
      'Sospecha de acalasia u otros trastornos motores esofágicos',
      'Reflujo gastroesofágico refractario al tratamiento',
      'Evaluación pre y posoperatoria de cirugía antirreflujo',
      'Dolor torácico sin causa cardíaca',
      'Sospecha de espasmo esofágico difuso',
    ],
    faqs: [
      { pergunta: '¿Qué es la manometría esofágica?', resposta: 'Es un examen que mide la presión y la coordinación de los movimientos musculares del esófago durante la deglución, evaluando si los músculos y el esfínter esofágico inferior funcionan correctamente.' },
      { pergunta: '¿La manometría esofágica duele?', resposta: 'No es un examen doloroso, pero puede causar molestias leves durante el paso del catéter fino por la nariz hasta el esófago. La mayoría de los pacientes tolera bien el procedimiento.' },
      { pergunta: '¿Cuánto dura el examen?', resposta: 'La manometría esofágica de alta resolución dura entre 30 y 45 minutos, incluyendo la colocación del catéter y las degluciones evaluadas.' },
      { pergunta: '¿Necesita sedación o anestesia?', resposta: 'No. El examen se realiza sin sedación, en ambiente ambulatorio, aplicando solo un gel anestésico local en la nariz para mayor comodidad.' },
      { pergunta: '¿Cuándo suele solicitar este examen el médico?', resposta: 'Se indica en casos de dificultad para tragar, sospecha de acalasia, reflujo persistente sin respuesta al tratamiento, dolor torácico sin causa cardíaca y antes de cirugías antirreflujo.' },
    ],
    preparo: [
      'Ayuno de 6 horas antes del examen',
      'Suspender medicamentos que afecten la motilidad esofágica (consultar al médico)',
      'Usar ropa cómoda',
      'Presentarse con la orden médica y exámenes anteriores',
    ],
    preparoCards: [
      { section: 'Suspensión de Medicamentos', icon: '💊', badge: '48h antes',              title: 'Procinéticos',            body: 'Suspender Bromoprida y Domperidona. Si hay dolor torácico, suspender también Dilacoron, Isordil, Cardizem y Diltiazem; consulte a su médico.' },
      { section: 'Suspensión de Medicamentos', icon: '✅', badge: 'Víspera hasta las 22h',   title: 'Medicamentos Permitidos', body: 'Los IBP (Omeprazol, Pantoprazol, Lansoprazol), antiácidos simples, Sucralfato y Lufta Gastro Pro pueden usarse normalmente.', variant: 'permitted' },
      { section: 'Suspensión de Medicamentos', icon: '⚠️',                                   title: 'Uso Continuo',            body: 'Los medicamentos para hipertensión, diabetes, corazón y pulmón pueden tomarse normalmente con la menor cantidad de agua posible.', variant: 'warning' },
      { section: 'Preparación para el Ayuno',  icon: '🍽️', badge: 'Desde las 22h',          title: 'Ayuno Absoluto',          body: 'Ayuno absoluto desde las 22h de la noche anterior al examen, incluida el agua.' },
      { section: 'Preparación para el Ayuno',  icon: '🩺',                                   title: 'Casos Especiales',        body: 'En niños, adultos mayores y diabéticos, el tiempo de ayuno se evaluará individualmente al momento de agendar.' },
      { section: 'El Día del Examen',          icon: '🆔',                                   title: 'Documentación',           body: 'Traiga documento con foto, orden médica original y carné del seguro.' },
      { section: 'El Día del Examen',          icon: '📄',                                   title: 'Exámenes Anteriores',     body: 'Traiga el resultado de su última endoscopia digestiva o radiografía contrastada del esófago, si tiene.' },
      { section: 'El Día del Examen',          icon: '👕',                                   title: 'Vestimenta',              body: 'Use ropa cómoda con abertura frontal. Evite camisas de cuello alto.' },
      { section: 'El Día del Examen',          icon: '⏰',                                   title: 'Horario',                 body: 'Llegue con 15 minutos de anticipación para los trámites de registro.' },
    ],
    video: { embed: 'https://www.youtube.com/embed/0CS9j6SrcXU', title: 'Manometría Esofágica | NU.V.E.M Medicina', short: true },
    espRel: ['motilidade-digestiva', 'gastroenterologia'],
  },
  'manometria-anorretal': {
    indicacoes: [
      'Incontinencia fecal',
      'Estreñimiento crónico refractario',
      'Trastornos del piso pélvico',
      'Sospecha de enfermedad de Hirschsprung',
      'Evaluación pre y posoperatoria de cirugía anorrectal',
      'Complementaria a la evaluación pélvica funcional',
    ],
    preparo: [
      'Realizar un enema de limpieza (Fleet® o similar) 1-2 horas antes del examen',
      'No es necesario ayuno',
      'Usar ropa cómoda y pantalón que pueda bajarse con facilidad',
      'Presentarse con la orden médica y exámenes anteriores',
      'Informar al equipo sobre el uso de cualquier medicamento',
    ],
    preparoCards: [
      { icon: '🚿', badge: '1-2h antes', title: 'Enema de Limpieza', body: 'Realizar un enema (Fleet® o similar) 1 a 2 horas antes del examen para limpiar el canal anal.' },
      { icon: '🍽️', title: 'Sin Ayuno',  body: 'No es necesario el ayuno. Puede alimentarse normalmente antes del examen.' },
      { icon: '👕', title: 'Vestimenta',  body: 'Use ropa cómoda y pantalón que pueda bajarse con facilidad.' },
      { icon: '📋', title: 'Documentos',  body: 'Traiga la orden médica y exámenes anteriores disponibles (ecografía pélvica, manometría previa).' },
      { icon: '💊', title: 'Medicamentos', body: 'Informe al equipo todos los medicamentos en uso, incluidos laxantes y fitoterápicos.' },
    ],
    faqs: [
      { pergunta: '¿Qué es la manometría anorrectal?', resposta: 'Es un examen que mide la fuerza y la coordinación de los músculos del ano y el recto, evaluando la función de los esfínteres en reposo y durante la evacuación.' },
      { pergunta: '¿La manometría anorrectal duele?', resposta: 'No es dolorosa, solo incómoda durante la introducción de un catéter fino y flexible en el canal anal. La mayoría de los pacientes reporta buena tolerancia.' },
      { pergunta: '¿Cuánto dura el examen?', resposta: 'El examen dura entre 30 y 45 minutos, incluyendo la evaluación de la presión en reposo, la contracción voluntaria y el esfuerzo evacuatorio.' },
      { pergunta: '¿Necesito alguna preparación especial?', resposta: 'Sí, se recomienda un enema de limpieza 1 a 2 horas antes del examen. No es necesario el ayuno.' },
      { pergunta: '¿Para qué sirve este examen?', resposta: 'Se usa para investigar incontinencia fecal, estreñimiento crónico refractario, trastornos del piso pélvico y sospecha de enfermedad de Hirschsprung.' },
    ],
    espRel: ['motilidade-digestiva', 'fisioterapia-pelvica'],
  },
  'phmetria-impedanciometria': {
    indicacoes: [
      'Sospecha de ERGE refractaria al tratamiento',
      'Síntomas atípicos de reflujo (tos, ronquera)',
      'Evaluación pre y posoperatoria antirreflujo',
      'Sospecha de reflujo no ácido',
      'Correlación de síntomas con eventos de reflujo',
    ],
    preparo: [
      'Suspender los IBP durante 7 días (con orientación médica)',
      'Suspender antiácidos durante 24 horas',
      'Ayuno de 4 horas antes de la colocación del catéter',
      'Mantener actividad normal durante el monitoreo',
    ],
    preparoCards: [
      { icon: '💊', badge: '7 días antes', title: 'Protectores Gástricos', body: 'Suspender los IBP (Omeprazol, Pantoprazol, Esomeprazol) solo con orientación del médico derivante.' },
      { icon: '💊', badge: '24h antes',    title: 'Antiácidos',            body: 'Suspender antiácidos simples (Leche de Magnesia, Gaviscon, Luftal) 24 horas antes de la colocación del catéter.' },
      { icon: '🍽️', badge: '4h antes',    title: 'Ayuno',                 body: 'Ayuno de 4 horas antes de la colocación del catéter. Después de la colocación, aliméntese normalmente.' },
      { icon: '👕', title: 'Vestimenta',   body: 'Use una blusa con botones al frente: el grabador portátil quedará sujeto a su cuerpo durante las 24 horas de monitoreo.' },
      { icon: '🏠', title: 'Rutina Normal',body: 'Mantenga su rutina habitual de trabajo y actividades domésticas durante todo el examen.' },
      { icon: '📝', title: 'Diario del Examen', body: 'Registre síntomas, horarios de comidas y posiciones en el diario proporcionado por la clínica: es esencial para el informe.' },
    ],
    photos: [
      { src: '/images/phmetria-1.webp', alt: 'Equipos AL-3 y AL-4 ZpH para pHmetría e impedancia' },
      { src: '/images/phmetria-2.webp', alt: 'Paciente usando el grabador portátil durante el monitoreo de 24h' },
    ],
    faqs: [
      { pergunta: '¿Qué es la pHmetría e impedancia?', resposta: 'Es un monitoreo ambulatorio de 24 horas que registra episodios de reflujo ácido y no ácido mediante un catéter fino o cápsula, correlacionando los eventos con los síntomas relatados por el paciente.' },
      { pergunta: '¿Es incómodo usar el equipo durante 24 horas?', resposta: 'Puede causar una leve molestia en la garganta en las primeras horas, pero el grabador es portátil y permite mantener las actividades normales del día a día durante todo el monitoreo.' },
      { pergunta: '¿Necesito estar hospitalizado durante el examen?', resposta: 'No. El examen es totalmente ambulatorio: el paciente regresa a casa con el grabador portátil y vuelve a la clínica al día siguiente para retirar el equipo.' },
      { pergunta: '¿Cuándo se indica este examen?', resposta: 'Se indica en casos de reflujo refractario al tratamiento, síntomas atípicos como tos crónica y ronquera, y en la evaluación pre y posoperatoria de cirugía antirreflujo.' },
    ],
    espRel: ['motilidade-digestiva', 'gastroenterologia'],
  },
  'testes-respiratorios': {
    indicacoes: [
      'Sospecha de SIBO (sobrecrecimiento bacteriano del intestino delgado)',
      'Sospecha de IMO (sobrecrecimiento de metanógenos) o LIBO',
      'Intolerancia a la lactosa o la fructosa',
      'Diagnóstico de infección por H. pylori',
      'Síndrome del intestino irritable para investigación etiológica',
      'Confirmación de erradicación después de antibioticoterapia',
      'Investigación de gases intestinales (H₂, CH₄, H₂S)',
    ],
    preparo: [
      'Ayuno de 12 horas antes del examen',
      'Dieta específica el día anterior (sin fibras fermentables)',
      'No usar antibióticos en las 4 semanas anteriores',
      'No fumar 1 hora antes del examen',
      'No realizar ejercicio intenso 1 hora antes',
    ],
    faqs: [
      { pergunta: '¿Qué es la prueba respiratoria?', resposta: 'Es un examen no invasivo que mide la concentración de gases (hidrógeno, metano y sulfuro de hidrógeno) en el aire exhalado para diagnosticar SIBO, IMO, intolerancias alimentarias e infección por H. pylori.' },
      { pergunta: '¿La prueba respiratoria duele?', resposta: 'No. No hay agujas, cortes ni molestias: el paciente solo sopla en una boquilla a intervalos regulares durante el examen.' },
      { pergunta: '¿Cuánto dura la prueba respiratoria?', resposta: 'La duración varía entre 2 y 3 horas, según el sustrato utilizado (glucosa, lactulosa, lactosa o fructosa) y la condición investigada.' },
      { pergunta: '¿Qué enfermedades puede detectar la prueba respiratoria?', resposta: 'El examen detecta SIBO (sobrecrecimiento bacteriano del intestino delgado), IMO, intolerancia a la lactosa y la fructosa, e infección por H. pylori, entre otras condiciones.' },
      { pergunta: '¿Necesito alguna preparación antes del examen?', resposta: 'Sí. Se requiere un ayuno de 12 horas y una dieta específica el día anterior, sin alimentos fermentables. La guía completa de preparación está disponible en PDF para descargar.' },
    ],
    espRel: ['gastroenterologia', 'pediatria'],
  },
  'halimetria-sialometria': {
    indicacoes: [
      'Halitosis persistente sin causa oral identificada',
      'Evaluación objetiva antes y después del tratamiento',
      'Sospecha de halitosis de origen digestivo o sistémico',
      'Cribado de xerostomía asociada',
    ],
    preparo: [
      'No comer en las 3 horas anteriores',
      'No cepillarse los dientes 2 horas antes',
      'No usar enjuague bucal el día del examen',
      'No fumar 2 horas antes',
      'Se permite la hidratación normal',
    ],
    preparoCards: [
      { icon: '🍽️', badge: '3h antes', title: 'Alimentación', body: 'No comer en las 3 horas anteriores al examen. Las comidas alteran la composición del aire exhalado.' },
      { icon: '🦷', badge: '2h antes', title: 'Higiene Oral',  body: 'No cepillarse los dientes en las 2 horas anteriores. No usar enjuague, spray ni ningún producto bucal el día del examen.' },
      { icon: '🚭', badge: '2h antes', title: 'Sin Fumar',     body: 'No fumar en las 2 horas anteriores al examen. El cigarrillo interfiere directamente en la medición de los gases.' },
      { icon: '🌸', title: 'Sin Perfume', body: 'No usar perfume ni desodorante con fragancia fuerte el día del examen, ya que pueden interferir en la lectura del halímetro.' },
      { icon: '💧', title: 'Hidratación',  body: 'Beber agua normalmente está permitido y es recomendable para la sialometría.' },
    ],
    faqs: [
      { pergunta: '¿Qué es la halimetría?', resposta: 'Es un examen que mide objetivamente, en partes por billón, los compuestos sulfurados volátiles presentes en el aire exhalado, principales responsables del mal aliento.' },
      { pergunta: '¿Qué es la sialometría?', resposta: 'Es la medición del flujo salival en reposo y estimulado, usada para identificar la boca seca (xerostomía) como posible causa o factor agravante de la halitosis.' },
      { pergunta: '¿Los exámenes de halimetría y sialometría duelen?', resposta: 'No. Son exámenes simples, rápidos e indoloros, realizados con un equipo específico llamado halímetro.' },
      { pergunta: '¿Cuánto duran los exámenes?', resposta: 'La halimetría y la sialometría juntas duran cerca de 30 minutos.' },
      { pergunta: '¿La halitosis siempre tiene origen en la boca?', resposta: 'No. La halitosis puede tener origen digestivo (reflujo, SIBO), nasofaríngeo o sistémico. Por eso el protocolo de NU.V.E.M investiga todas las causas posibles en conjunto.' },
    ],
    espRel: ['halitose'],
  },
  'avaliacao-pelvica': {
    indicacoes: [
      'Incontinencia urinaria o fecal',
      'Disfunción del piso pélvico',
      'Estreñimiento obstructivo',
      'Dolor pélvico crónico',
      'Evaluación pre y posoperatoria pélvica',
      'Complementaria a la manometría anorrectal',
    ],
    preparo: [
      'Usar ropa cómoda',
      'No es necesario el ayuno',
      'Traer exámenes anteriores, si los tiene',
      'Informar el uso de medicamentos',
    ],
    preparoCards: [
      { icon: '🍽️', title: 'Sin Ayuno',        body: 'No es necesario el ayuno. Puede alimentarse normalmente antes del examen.' },
      { icon: '👕', title: 'Vestimenta',        body: 'Use ropa cómoda y fácil de quitar para facilitar la evaluación.' },
      { icon: '🚿', title: 'Higiene',           body: 'Realice su higiene íntima habitual el día del examen. No se requiere ninguna preparación especial.' },
      { icon: '📋', title: 'Exámenes Anteriores', body: 'Traiga exámenes anteriores si los tiene (manometría anorrectal, ecografía pélvica, urodinamia).' },
      { icon: '💊', title: 'Medicamentos',      body: 'Informe al equipo el uso de cualquier medicamento, especialmente los que afectan la musculatura.' },
    ],
    faqs: [
      { pergunta: '¿Qué es la evaluación pélvica?', resposta: 'Es un examen funcional del piso pélvico realizado con biofeedback electromiográfico, que mide la actividad muscular en reposo, durante la contracción y el esfuerzo.' },
      { pergunta: '¿La evaluación pélvica duele?', resposta: 'No. Es un examen indoloro y no invasivo, realizado con sensores externos o internos de baja complejidad.' },
      { pergunta: '¿Cuánto dura el examen?', resposta: 'La evaluación pélvica completa dura entre 40 y 60 minutos.' },
      { pergunta: '¿Para quién está indicada esta evaluación?', resposta: 'Está indicada para pacientes con incontinencia urinaria o fecal, disfunción del piso pélvico, estreñimiento obstructivo y dolor pélvico crónico.' },
      { pergunta: '¿Necesito alguna preparación especial?', resposta: 'No. Basta con usar ropa cómoda; no se requiere ayuno ni preparación intestinal.' },
    ],
    espRel: ['fisioterapia-pelvica'],
  },
}

export function getExameDetail(locale: AppLocale, slug: string): ExameDetailData | undefined {
  const table = locale === 'en' ? DETAIL_EN : locale === 'es' ? DETAIL_ES : DETAIL_PT
  return table[slug]
}
