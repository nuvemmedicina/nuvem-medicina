/**
 * Conteúdo extra exclusivo da página /exames/testes-respiratorios, por
 * idioma: PDFs de preparo, vídeos, cards de tecnologia e a seção de dieta
 * obrigatória do dia anterior. pt-BR é a fonte original; en/es são
 * traduções por IA — mesma observação de revisão clínica do arquivo
 * exames-detail.ts se aplica aqui (jejum, suspensão de medicamentos, dieta).
 */
import type { AppLocale } from '@/i18n/routing'

export interface RespPdf { label: string; sub: string; href: string }
export interface RespVideo { title: string; embed: string; short?: boolean }
export interface RespTecSpec { label: string; value: string }
export interface RespTecnologia {
  src: string; alt: string; badge: string; name: string; sub: string
  desc: string; specs: RespTecSpec[]; imgLeft: boolean
}

export interface DietItem { icon: string; label: string; value: string }
export interface MedSuspensao { prazo: string; med: string }

export interface RespExtra {
  pdfs:  RespPdf[]
  videos: RespVideo[]
  tecnologias: RespTecnologia[]
  diet: {
    tituloRefeicao: string
    subtitulo: string
    permitidoLabel: string
    permitido: string[]
    proibidoLabel: string
    proibido: string[]
    proibidoNota: string
    jejum: DietItem[]
    medsTitulo: string
    meds: MedSuspensao[]
    medsNota: string
    noDia: string[]
  }
}

const RESP_EXTRA_PT: RespExtra = {
  pdfs: [
    { label: 'Preparo: H₂ · CH₄ · H₂S', sub: 'SIBO, IMO, LIBO e intolerâncias', href: '/pdfs/preparo-teste-respiratorio-sibo-imo-v1.pdf' },
    { label: 'Preparo: H. pylori',      sub: 'Diagnóstico e controle de erradicação', href: '/pdfs/preparo-teste-respiratorio-hpylori-v1.pdf' },
  ],
  videos: [
    { title: 'Teste Respiratório com HealthGo AIR', embed: 'https://www.youtube.com/embed/k2hAIvNGD6I' },
    { title: 'Teste Respiratório | NU.V.E.M Ensino', embed: 'https://www.youtube.com/embed/t6pcq9TjFCU', short: true },
  ],
  tecnologias: [
    {
      src: '/images/teste-respiratorio-1.webp', alt: 'Equipamento HealthGo AIR em uso na NU.V.E.M Medicina',
      badge: 'Aprovado ANVISA', name: 'HealthGo AIR', sub: 'Tecnologia brasileira de última geração',
      desc: 'O primeiro equipamento nacional para diagnóstico funcional do trato gastrointestinal por teste respiratório. Detecta simultaneamente H₂, CH₄ e H₂S, diferenciando quadros de SIBO, IMO e outras disbioses com precisão superior aos aparelhos tradicionais.',
      specs: [
        { label: 'Gases medidos', value: 'H₂ · CH₄ · H₂S' },
        { label: 'Pacientes',     value: 'Até 5 simultâneos' },
        { label: 'Coleta',        value: 'A cada 2 minutos' },
        { label: 'Laudo',         value: 'Geração automática' },
        { label: 'Tecnologia',    value: 'Autolimpante' },
      ],
      imgLeft: true,
    },
    {
      src: '/images/teste-respiratorio-2.webp', alt: 'Teste respiratório com equipamento Dynamed Easy H2 no NU.V.E.M Ensino',
      badge: 'Aprovado ANVISA', name: 'Dynamed Easy H2', sub: 'Diagnóstico não invasivo portátil',
      desc: 'Equipamento portátil para teste respiratório de H₂ em ar expirado. Indicado no diagnóstico de intolerância à lactose e frutose, malabsorção de carboidratos e supercrescimento bacteriano. Resultado instantâneo em menos de 60 segundos, com exibição em display LCD.',
      specs: [
        { label: 'Gás medido',    value: 'H₂ (1-500 PPM)' },
        { label: 'Resposta',      value: '< 60 segundos' },
        { label: 'Portabilidade', value: '120g · pilhas AA' },
        { label: 'Conectividade', value: 'Standalone ou PC' },
        { label: 'Sensor',        value: '> 18 meses de vida' },
      ],
      imgLeft: false,
    },
  ],
  diet: {
    tituloRefeicao: 'Dieta obrigatória: dia anterior ao exame',
    subtitulo: 'O preparo alimentar é essencial para a precisão do diagnóstico',
    permitidoLabel: 'Permitido',
    permitido: [
      'Arroz branco · macarrão sem molho',
      'Frango, peixe ou carne grelhada',
      'Ovo cozido ou mexido (sem leite)',
      'Azeite, sal e limão como tempero',
      'Morango, abacate e limão (puros)',
      'Água · chá de camomila',
    ],
    proibidoLabel: 'Proibido',
    proibido: [
      'Leite, queijos e laticínios',
      'Feijão, lentilha, grão-de-bico, milho',
      'Repolho, brócolis, couve, cebola, alho',
      'Açúcar, mel, sorvete, adoçantes',
      'Café, álcool, refrigerante e chás*',
      'Frutas (exceto as permitidas)',
    ],
    proibidoNota: '*Exceto chá de camomila',
    jejum: [
      { icon: '🚫', label: 'Sólidos',           value: 'Jejum de 12h antes' },
      { icon: '💧', label: 'Líquidos',           value: 'Água até meia-noite' },
      { icon: '🕛', label: 'Após meia-noite',    value: 'Jejum total' },
    ],
    medsTitulo: 'Suspensão de medicamentos',
    meds: [
      { prazo: '4 semanas', med: 'Antibióticos' },
      { prazo: '3 semanas', med: 'Análogos GLP-1' },
      { prazo: '2 semanas', med: 'Probióticos' },
      { prazo: '5-7 dias',  med: 'Laxativos' },
    ],
    medsNota: '⚠️ IBPs, medicações contínuas e probióticos orientados pelo médico devem ser mantidos.',
    noDia: ['🚭 Não fumar', '🦷 Enxaguante sem álcool', '🍬 Sem chicletes ou balas', '🏃 Sem exercícios intensos'],
  },
}

const RESP_EXTRA_EN: RespExtra = {
  pdfs: [
    { label: 'Prep Guide: H₂ · CH₄ · H₂S', sub: 'SIBO, IMO, LIBO and intolerances', href: '/pdfs/preparo-teste-respiratorio-sibo-imo-v1.pdf' },
    { label: 'Prep Guide: H. pylori',      sub: 'Diagnosis and eradication control', href: '/pdfs/preparo-teste-respiratorio-hpylori-v1.pdf' },
  ],
  videos: [
    { title: 'Breath Test with HealthGo AIR', embed: 'https://www.youtube.com/embed/k2hAIvNGD6I' },
    { title: 'Breath Test | NU.V.E.M Ensino', embed: 'https://www.youtube.com/embed/t6pcq9TjFCU', short: true },
  ],
  tecnologias: [
    {
      src: '/images/teste-respiratorio-1.webp', alt: 'HealthGo AIR equipment in use at NU.V.E.M Medicina',
      badge: 'ANVISA Approved', name: 'HealthGo AIR', sub: 'Latest-generation Brazilian technology',
      desc: 'The first Brazilian-made equipment for functional gastrointestinal diagnosis via breath test. Simultaneously detects H₂, CH₄ and H₂S, differentiating SIBO, IMO and other dysbioses with greater precision than traditional devices.',
      specs: [
        { label: 'Gases measured', value: 'H₂ · CH₄ · H₂S' },
        { label: 'Patients',       value: 'Up to 5 simultaneous' },
        { label: 'Sampling',       value: 'Every 2 minutes' },
        { label: 'Report',         value: 'Automatic generation' },
        { label: 'Technology',     value: 'Self-cleaning' },
      ],
      imgLeft: true,
    },
    {
      src: '/images/teste-respiratorio-2.webp', alt: 'Breath test with Dynamed Easy H2 equipment at NU.V.E.M Ensino',
      badge: 'ANVISA Approved', name: 'Dynamed Easy H2', sub: 'Portable non-invasive diagnosis',
      desc: 'Portable equipment for H₂ breath testing in exhaled air. Indicated for diagnosing lactose and fructose intolerance, carbohydrate malabsorption and bacterial overgrowth. Instant results in under 60 seconds, shown on an LCD display.',
      specs: [
        { label: 'Gas measured',   value: 'H₂ (1-500 PPM)' },
        { label: 'Response time',  value: '< 60 seconds' },
        { label: 'Portability',    value: '120g · AA batteries' },
        { label: 'Connectivity',   value: 'Standalone or PC' },
        { label: 'Sensor',         value: '> 18 months lifespan' },
      ],
      imgLeft: false,
    },
  ],
  diet: {
    tituloRefeicao: 'Mandatory diet: the day before the exam',
    subtitulo: 'Dietary preparation is essential for diagnostic accuracy',
    permitidoLabel: 'Allowed',
    permitido: [
      'White rice · pasta without sauce',
      'Grilled chicken, fish or meat',
      'Boiled or scrambled egg (no milk)',
      'Olive oil, salt and lemon as seasoning',
      'Strawberry, avocado and lemon (plain)',
      'Water · chamomile tea',
    ],
    proibidoLabel: 'Not Allowed',
    proibido: [
      'Milk, cheese and dairy products',
      'Beans, lentils, chickpeas, corn',
      'Cabbage, broccoli, kale, onion, garlic',
      'Sugar, honey, ice cream, sweeteners',
      'Coffee, alcohol, soda and teas*',
      'Fruit (except those allowed)',
    ],
    proibidoNota: '*Except chamomile tea',
    jejum: [
      { icon: '🚫', label: 'Solids',           value: '12h fasting before' },
      { icon: '💧', label: 'Liquids',           value: 'Water until midnight' },
      { icon: '🕛', label: 'After midnight',    value: 'Total fasting' },
    ],
    medsTitulo: 'Medication suspension',
    meds: [
      { prazo: '4 weeks',  med: 'Antibiotics' },
      { prazo: '3 weeks',  med: 'GLP-1 analogs' },
      { prazo: '2 weeks',  med: 'Probiotics' },
      { prazo: '5-7 days', med: 'Laxatives' },
    ],
    medsNota: '⚠️ PPIs, ongoing medications and doctor-prescribed probiotics should be continued.',
    noDia: ['🚭 No smoking', '🦷 Alcohol-free mouthwash', '🍬 No gum or candy', '🏃 No intense exercise'],
  },
}

const RESP_EXTRA_ES: RespExtra = {
  pdfs: [
    { label: 'Preparación: H₂ · CH₄ · H₂S', sub: 'SIBO, IMO, LIBO e intolerancias', href: '/pdfs/preparo-teste-respiratorio-sibo-imo-v1.pdf' },
    { label: 'Preparación: H. pylori',      sub: 'Diagnóstico y control de erradicación', href: '/pdfs/preparo-teste-respiratorio-hpylori-v1.pdf' },
  ],
  videos: [
    { title: 'Prueba Respiratoria con HealthGo AIR', embed: 'https://www.youtube.com/embed/k2hAIvNGD6I' },
    { title: 'Prueba Respiratoria | NU.V.E.M Ensino', embed: 'https://www.youtube.com/embed/t6pcq9TjFCU', short: true },
  ],
  tecnologias: [
    {
      src: '/images/teste-respiratorio-1.webp', alt: 'Equipo HealthGo AIR en uso en NU.V.E.M Medicina',
      badge: 'Aprobado por ANVISA', name: 'HealthGo AIR', sub: 'Tecnología brasileña de última generación',
      desc: 'El primer equipo nacional para el diagnóstico funcional del tracto gastrointestinal mediante prueba respiratoria. Detecta simultáneamente H₂, CH₄ y H₂S, diferenciando cuadros de SIBO, IMO y otras disbiosis con una precisión superior a los equipos tradicionales.',
      specs: [
        { label: 'Gases medidos',      value: 'H₂ · CH₄ · H₂S' },
        { label: 'Pacientes',          value: 'Hasta 5 simultáneos' },
        { label: 'Toma de muestra',    value: 'Cada 2 minutos' },
        { label: 'Informe',            value: 'Generación automática' },
        { label: 'Tecnología',         value: 'Autolimpiante' },
      ],
      imgLeft: true,
    },
    {
      src: '/images/teste-respiratorio-2.webp', alt: 'Prueba respiratoria con equipo Dynamed Easy H2 en NU.V.E.M Ensino',
      badge: 'Aprobado por ANVISA', name: 'Dynamed Easy H2', sub: 'Diagnóstico portátil no invasivo',
      desc: 'Equipo portátil para prueba respiratoria de H₂ en aire exhalado. Indicado en el diagnóstico de intolerancia a la lactosa y la fructosa, malabsorción de carbohidratos y sobrecrecimiento bacteriano. Resultado instantáneo en menos de 60 segundos, con pantalla LCD.',
      specs: [
        { label: 'Gas medido',     value: 'H₂ (1-500 PPM)' },
        { label: 'Respuesta',      value: '< 60 segundos' },
        { label: 'Portabilidad',   value: '120g · pilas AA' },
        { label: 'Conectividad',   value: 'Independiente o con PC' },
        { label: 'Sensor',         value: '> 18 meses de vida útil' },
      ],
      imgLeft: false,
    },
  ],
  diet: {
    tituloRefeicao: 'Dieta obligatoria: el día anterior al examen',
    subtitulo: 'La preparación alimentaria es esencial para la precisión del diagnóstico',
    permitidoLabel: 'Permitido',
    permitido: [
      'Arroz blanco · pasta sin salsa',
      'Pollo, pescado o carne a la parrilla',
      'Huevo cocido o revuelto (sin leche)',
      'Aceite de oliva, sal y limón como condimento',
      'Fresa, aguacate y limón (solos)',
      'Agua · té de manzanilla',
    ],
    proibidoLabel: 'Prohibido',
    proibido: [
      'Leche, quesos y lácteos',
      'Frijoles, lentejas, garbanzos, maíz',
      'Repollo, brócoli, col, cebolla, ajo',
      'Azúcar, miel, helado, edulcorantes',
      'Café, alcohol, refresco y tés*',
      'Frutas (excepto las permitidas)',
    ],
    proibidoNota: '*Excepto té de manzanilla',
    jejum: [
      { icon: '🚫', label: 'Sólidos',                  value: 'Ayuno de 12h antes' },
      { icon: '💧', label: 'Líquidos',                  value: 'Agua hasta la medianoche' },
      { icon: '🕛', label: 'Después de la medianoche',  value: 'Ayuno total' },
    ],
    medsTitulo: 'Suspensión de medicamentos',
    meds: [
      { prazo: '4 semanas', med: 'Antibióticos' },
      { prazo: '3 semanas', med: 'Análogos GLP-1' },
      { prazo: '2 semanas', med: 'Probióticos' },
      { prazo: '5-7 días',  med: 'Laxantes' },
    ],
    medsNota: '⚠️ Los IBP, medicamentos de uso continuo y probióticos indicados por el médico deben mantenerse.',
    noDia: ['🚭 No fumar', '🦷 Enjuague bucal sin alcohol', '🍬 Sin chicles ni caramelos', '🏃 Sin ejercicio intenso'],
  },
}

export function getRespExtra(locale: AppLocale): RespExtra {
  if (locale === 'en') return RESP_EXTRA_EN
  if (locale === 'es') return RESP_EXTRA_ES
  return RESP_EXTRA_PT
}
