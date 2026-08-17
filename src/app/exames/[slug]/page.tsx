import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Link   from 'next/link'
import Image  from 'next/image'
import { Clock, Shield, Check, ArrowRight, Download } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { Breadcrumb }     from '@/components/ui/Breadcrumb'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { IsoSeal }        from '@/components/icons/IsoSeal'
import { EXAMES, ESPECIALIDADES, EXAM_PDFS } from '@/lib/data'
import { PhotoCarousel } from '@/components/ui/PhotoCarousel'
import { JsonLd } from '@/components/ui/JsonLd'
import { examSchema, faqSchema, breadcrumbSchema } from '@/lib/schema'
import { SITE_URL } from '@/lib/site'

const BASE_URL = SITE_URL

const ICON_MAP: Record<string, React.ElementType> = { Clock, Shield, Check }

interface PreparoCard {
  icon:      string
  title:     string
  body:      string
  badge?:    string
  section?:  string
  variant?:  'default' | 'warning' | 'permitted'
}

// Extended detail per exam
interface Faq { pergunta: string; resposta: string }

const EXAM_DETAIL: Record<string, {
  indicacoes:    string[]
  preparo:       string[]
  preparoCards?: PreparoCard[]
  photos?:       { src: string; alt: string }[]
  video?:        { embed: string; title: string; short?: boolean }
  espRel:        string[]
  faqs:          Faq[]
}> = {
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
      // ── Suspensão de Medicamentos ──────────────────────────
      { section: 'Suspensão de Medicamentos', icon: '💊', badge: '48h antes',        title: 'Procinéticos',           body: 'Suspender Bromoprida e Domperidona. Se houver dor torácica, suspender também Dilacoron, Isordil, Cardizem e Diltiazem; consulte seu médico.' },
      { section: 'Suspensão de Medicamentos', icon: '✅', badge: 'Véspera até 22h',   title: 'Medicamentos Permitidos', body: 'IBPs (Omeprazol, Pantoprazol, Lansoprazol), antiácidos simples, Sucrafilm e Lufta Gastro Pro podem ser usados normalmente.', variant: 'permitted' },
      { section: 'Suspensão de Medicamentos', icon: '⚠️',                             title: 'Uso Contínuo',           body: 'Medicamentos para hipertensão, diabetes, coração e pulmão podem ser tomados normalmente com o mínimo de água possível.', variant: 'warning' },
      // ── Preparação para o Jejum ────────────────────────────
      { section: 'Preparação para o Jejum',   icon: '🍽️', badge: 'A partir das 22h', title: 'Jejum Absoluto',         body: 'Jejum absoluto a partir das 22h da noite anterior ao exame, inclusive água.' },
      { section: 'Preparação para o Jejum',   icon: '🩺',                             title: 'Casos Especiais',        body: 'Para crianças, idosos e diabéticos, o tempo de jejum será avaliado individualmente no agendamento.' },
      // ── No Dia do Exame ────────────────────────────────────
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
      'Realizar enema de limpeza (Minilax® ou similar) 1–2 horas antes do exame',
      'Não é necessário jejum',
      'Usar roupa confortável e calça que possa ser abaixada',
      'Comparecer com o pedido médico e exames anteriores',
      'Informar à equipe o uso de qualquer medicamento',
    ],
    preparoCards: [
      { icon: '🚿', badge: '1–2h antes',   title: 'Enema de Limpeza', body: 'Realizar enema (Minilax® ou similar) 1 a 2 horas antes do exame para limpeza do canal anal.' },
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

// ─── Respiratory test extra content ──────────────────────────────────────────
const RESP_PDFS = [
  {
    label: 'Preparo: H₂ · CH₄ · H₂S',
    sub:   'SIBO, IMO, LIBO e intolerâncias',
    href:  '/pdfs/preparo-teste-respiratorio-sibo-imo-v1.pdf',
  },
  {
    label: 'Preparo: H. pylori',
    sub:   'Diagnóstico e controle de erradicação',
    href:  '/pdfs/preparo-teste-respiratorio-hpylori-v1.pdf',
  },
]

const RESP_VIDEOS = [
  {
    title:  'Teste Respiratório com HealthGo AIR',
    embed:  'https://www.youtube.com/embed/k2hAIvNGD6I',
  },
  {
    title:  'Teste Respiratório | NU.V.E.M Ensino',
    embed:  'https://www.youtube.com/embed/t6pcq9TjFCU',
    short:  true,
  },
]

const RESP_TECNOLOGIAS = [
  {
    src:    '/images/teste-respiratorio-1.webp',
    alt:    'Equipamento HealthGo AIR em uso na NU.V.E.M Medicina',
    badge:  'Aprovado ANVISA',
    name:   'HealthGo AIR',
    sub:    'Tecnologia brasileira de última geração',
    desc:   'O primeiro equipamento nacional para diagnóstico funcional do trato gastrointestinal por teste respiratório. Detecta simultaneamente H₂, CH₄ e H₂S, diferenciando quadros de SIBO, IMO e outras disbioses com precisão superior aos aparelhos tradicionais.',
    specs:  [
      { label: 'Gases medidos',  value: 'H₂ · CH₄ · H₂S' },
      { label: 'Pacientes',      value: 'Até 5 simultâneos' },
      { label: 'Coleta',         value: 'A cada 2 minutos' },
      { label: 'Laudo',          value: 'Geração automática' },
      { label: 'Tecnologia',     value: 'Autolimpante' },
    ],
    imgLeft: true,
  },
  {
    src:    '/images/teste-respiratorio-2.webp',
    alt:    'Teste respiratório com equipamento Dynamed Easy H2 no NU.V.E.M Ensino',
    badge:  'Aprovado ANVISA',
    name:   'Dynamed Easy H2',
    sub:    'Diagnóstico não invasivo portátil',
    desc:   'Equipamento portátil para teste respiratório de H₂ em ar expirado. Indicado no diagnóstico de intolerância à lactose e frutose, malabsorção de carboidratos e supercrescimento bacteriano. Resultado instantâneo em menos de 60 segundos, com exibição em display LCD.',
    specs:  [
      { label: 'Gás medido',    value: 'H₂ (1–500 PPM)' },
      { label: 'Resposta',      value: '< 60 segundos' },
      { label: 'Portabilidade', value: '120g · pilhas AA' },
      { label: 'Conectividade', value: 'Standalone ou PC' },
      { label: 'Sensor',        value: '> 18 meses de vida' },
    ],
    imgLeft: false,
  },
]

// ─────────────────────────────────────────────────────────────────────────────

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return EXAMES.map(e => ({ slug: e.id }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const exame = EXAMES.find(e => e.id === slug)
  if (!exame) return {}
  // seoTitle/seoDescription são escritos para intenção de busca, com a cidade
  // (ex.: "manometria esofágica bh") — diferente de title/desc, que seguem em
  // linguagem clínica no corpo da página.
  const title = exame.seoTitle       ?? exame.title
  const desc  = exame.seoDescription ?? exame.desc[0]
  return {
    title,
    description: desc,
    alternates:  { canonical: `/exames/${slug}` },
    openGraph: {
      title:       `${title} | NU.V.E.M Medicina`,
      description: desc,
      images: [{
        url:    '/images/nuvem-medicina-bh.jpg',
        width:  1200,
        height: 630,
        alt:    `Consultório NU.V.E.M Medicina — ${exame.title}`,
      }],
    },
    twitter: {
      card:        'summary_large_image',
      title:       `${title} | NU.V.E.M Medicina`,
      description: desc,
      images:      ['/images/nuvem-medicina-bh.jpg'],
    },
  }
}

export default async function ExameSlugPage({ params }: Props) {
  const { slug } = await params
  const exame  = EXAMES.find(e => e.id === slug)
  const detail = EXAM_DETAIL[slug]
  if (!exame || !detail) notFound()

  const espRel = ESPECIALIDADES.filter(e => detail.espRel.includes(e.slug))
  const pdfUrl = EXAM_PDFS[slug]
  const isResp = slug === 'testes-respiratorios'

  return (
    <>
      <JsonLd data={[
        examSchema(exame),
        faqSchema(detail.faqs),
        breadcrumbSchema([
          { name: 'Home',   url: BASE_URL },
          { name: 'Exames', url: `${BASE_URL}/exames` },
          { name: exame.title, url: `${BASE_URL}/exames/${exame.id}` },
        ]),
      ]} />
      {isResp ? (
        <div className="relative pt-[76px] pb-20 overflow-hidden bg-white">
          <div className="absolute -top-[20%] right-[-5%] w-[500px] h-[500px] rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(203,228,230,.50) 0%, transparent 65%)' }} />
          <div className="absolute inset-0 hero-grid-bg pointer-events-none" />
          <div className="absolute top-0 bottom-0 w-px opacity-20 pointer-events-none"
            style={{ right: '25%', background: 'linear-gradient(to bottom, transparent, rgba(0,70,95,.30) 30%, rgba(0,70,95,.30) 70%, transparent)' }} />
          <div className="relative z-10 max-w-[1240px] mx-auto px-8 pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
              <div>
                <p className="sec-tag">Exames</p>
                <h1 className="sec-title" style={{ fontSize: 'clamp(2.4rem, 4vw, 3.6rem)' }}>
                  <em>{exame.title}</em>
                </h1>
                <p className="text-[1rem] font-light text-steel/60 leading-[1.85] max-w-xl mt-4">{exame.subtitle}</p>
                <div className="mt-8">
                  <Breadcrumb crumbs={[{ label: 'Exames', href: '/exames' }, { label: exame.title }]} />
                </div>
              </div>
              <div className="rounded-2xl overflow-hidden shadow-xl border border-teal/10">
                <div className="relative w-full" style={{ aspectRatio: '16/9' }}>
                  <iframe src={RESP_VIDEOS[0].embed} title={RESP_VIDEOS[0].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="absolute inset-0 w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <PageHero tag="Exames" title={<em>{exame.title}</em>} desc={exame.subtitle}>
          <Breadcrumb crumbs={[
            { label: 'Exames', href: '/exames' },
            { label: exame.title },
          ]} />
        </PageHero>
      )}

      <SectionWrapper mist>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Main ──────────────────────────────────────────────────── */}
          <div className="lg:col-span-2 space-y-10">

            {/* Tag + desc */}
            <div>
              <span className="inline-block text-[0.68rem] font-bold tracking-[.12em] uppercase text-gold bg-gold/10 border border-gold/25 px-3 py-1 rounded-full mb-5">
                {exame.tag}
              </span>
              <div className="space-y-4">
                {exame.desc.map((p, i) => (
                  <p key={i} className="text-[0.98rem] font-light text-steel/65 leading-[1.85]">{p}</p>
                ))}
              </div>
            </div>

            {/* ── Fotos / Carrossel ───────────────────────────────────── */}
            {detail.photos && detail.photos.length > 0 && (
              <div>
                <h2 className="font-serif font-light text-steel text-[1.5rem] mb-5">
                  O exame na <em className="italic text-teal">prática</em>
                </h2>
                <PhotoCarousel images={detail.photos} />
              </div>
            )}

            {/* ── Tecnologias (somente testes respiratórios) ──────────── */}
            {isResp && (
              <div className="space-y-6">
                <h2 className="font-serif font-light text-steel text-[1.5rem]">
                  Nossas <em className="italic text-teal">tecnologias</em>
                </h2>
                {RESP_TECNOLOGIAS.map((tec) => (
                  <div key={tec.name}
                    className={`flex flex-col ${tec.imgLeft ? 'sm:flex-row' : 'sm:flex-row-reverse'} bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-teal/22 transition-all`}>
                    <div className="relative sm:w-[42%] shrink-0" style={{ minHeight: '260px' }}>
                      <Image src={tec.src} alt={tec.alt} fill className="object-cover" />
                    </div>
                    <div className="flex-1 p-6 flex flex-col justify-between gap-4">
                      <div>
                        <span className="inline-block text-[0.6rem] font-bold uppercase tracking-[.12em] text-teal bg-teal/8 border border-teal/20 px-2.5 py-0.5 rounded-full mb-3">{tec.badge}</span>
                        <h3 className="text-[1.05rem] font-semibold text-steel mb-0.5">{tec.name}</h3>
                        <p className="text-[0.72rem] font-medium text-teal/70 uppercase tracking-[.08em] mb-3">{tec.sub}</p>
                        <p className="text-[0.85rem] font-light text-steel/60 leading-relaxed">{tec.desc}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        {tec.specs.map(s => (
                          <div key={s.label} className="bg-cloud border border-teal/8 rounded-xl px-3 py-2">
                            <p className="text-[0.6rem] font-bold uppercase tracking-[.1em] text-steel/35 mb-0.5">{s.label}</p>
                            <p className="text-[0.78rem] font-semibold text-steel/75">{s.value}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* ── Indicações ──────────────────────────────────────────── */}
            <div>
              <h2 className="font-serif font-light text-steel text-[1.5rem] mb-5">
                Indicações do <em className="italic text-teal" style={{ fontStyle: 'italic' }}>exame</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {detail.indicacoes.map(ind => (
                  <div key={ind} className="flex items-start gap-3 p-4 bg-white border border-teal/10 rounded-xl text-[0.9rem] text-steel/65 hover:border-teal/22 transition-colors">
                    <span className="w-[18px] h-px bg-teal shrink-0 mt-3.5" />
                    {ind}
                  </div>
                ))}
              </div>
            </div>

            {/* ── Preparo ─────────────────────────────────────────────── */}
            <div>
              {isResp ? (
                /* Dois cards de preparo para testes respiratórios */
                <>
                  <h2 className="font-serif font-light text-steel text-[1.5rem] mb-6">
                    Preparos para <em className="italic text-teal">o exame</em>
                  </h2>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mb-6">
                    {RESP_PDFS.map(pdf => (
                      <div key={pdf.href} className="bg-white border border-teal/12 rounded-2xl p-6 shadow-sm flex flex-col gap-3 hover:border-teal/28 transition-colors">
                        <div>
                          <p className="text-[0.82rem] font-bold text-steel mb-0.5">{pdf.label}</p>
                          <p className="text-[0.75rem] text-steel/45 leading-snug">{pdf.sub}</p>
                        </div>
                        <a
                          href={pdf.href}
                          download
                          className="mt-auto inline-flex items-center justify-center gap-2 text-[0.85rem] font-semibold text-teal bg-teal/8 border border-teal/22 px-4 py-2.5 rounded-xl hover:bg-teal hover:text-white hover:border-teal transition-all"
                        >
                          <Download className="w-4 h-4" />
                          Baixar PDF
                        </a>
                      </div>
                    ))}
                  </div>

                  {/* ── Dieta do dia anterior ─────────────────────────── */}
                  <div className="rounded-2xl overflow-hidden border border-teal/15 shadow-sm">
                    {/* Header */}
                    <div className="px-6 py-4 flex items-center gap-3" style={{ background: 'linear-gradient(135deg, #002535, #00465F)' }}>
                      <span className="text-2xl">🥗</span>
                      <div>
                        <p className="text-white font-semibold text-[0.95rem]">Dieta obrigatória: dia anterior ao exame</p>
                        <p className="text-white/55 text-[0.75rem]">O preparo alimentar é essencial para a precisão do diagnóstico</p>
                      </div>
                    </div>

                    <div className="bg-white p-5 space-y-5">
                      {/* Permitido × Proibido */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {/* Permitido */}
                        <div className="rounded-xl bg-teal/5 border border-teal/15 p-4">
                          <p className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-teal mb-3 flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-teal text-white text-[0.6rem] flex items-center justify-center">✓</span>
                            Permitido
                          </p>
                          <ul className="space-y-1.5">
                            {[
                              'Arroz branco · macarrão sem molho',
                              'Frango, peixe ou carne grelhada',
                              'Ovo cozido ou mexido (sem leite)',
                              'Azeite, sal e limão como tempero',
                              'Morango, abacate e limão (puros)',
                              'Água · chá de camomila',
                            ].map(item => (
                              <li key={item} className="text-[0.8rem] text-steel/65 flex items-start gap-2">
                                <span className="text-teal mt-0.5 shrink-0">·</span>{item}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Proibido */}
                        <div className="rounded-xl bg-red-50 border border-red-100 p-4">
                          <p className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-red-500 mb-3 flex items-center gap-1.5">
                            <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[0.6rem] flex items-center justify-center">✕</span>
                            Proibido
                          </p>
                          <ul className="space-y-1.5">
                            {[
                              'Leite, queijos e laticínios',
                              'Feijão, lentilha, grão-de-bico, milho',
                              'Repolho, brócolis, couve, cebola, alho',
                              'Açúcar, mel, sorvete, adoçantes',
                              'Café, álcool, refrigerante e chás*',
                              'Frutas (exceto as permitidas)',
                            ].map(item => (
                              <li key={item} className="text-[0.8rem] text-steel/65 flex items-start gap-2">
                                <span className="text-red-400 mt-0.5 shrink-0">·</span>{item}
                              </li>
                            ))}
                          </ul>
                          <p className="text-[0.65rem] text-steel/35 mt-2">*Exceto chá de camomila</p>
                        </div>
                      </div>

                      {/* Jejum e horários */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                        {[
                          { icon: '🚫', label: 'Sólidos', value: 'Jejum de 12h antes' },
                          { icon: '💧', label: 'Líquidos', value: 'Água até meia-noite' },
                          { icon: '🕛', label: 'Após meia-noite', value: 'Jejum total' },
                        ].map(item => (
                          <div key={item.label} className="flex items-center gap-3 bg-cloud border border-teal/10 rounded-xl px-4 py-3">
                            <span className="text-xl shrink-0">{item.icon}</span>
                            <div>
                              <p className="text-[0.62rem] font-bold uppercase tracking-[.08em] text-steel/35">{item.label}</p>
                              <p className="text-[0.8rem] font-semibold text-steel/75">{item.value}</p>
                            </div>
                          </div>
                        ))}
                      </div>

                      {/* Suspensão de medicamentos */}
                      <div>
                        <p className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-2">Suspensão de medicamentos</p>
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          {[
                            { prazo: '4 semanas', med: 'Antibióticos' },
                            { prazo: '3 semanas', med: 'Análogos GLP-1' },
                            { prazo: '2 semanas', med: 'Probióticos' },
                            { prazo: '5–7 dias',  med: 'Laxativos' },
                          ].map(m => (
                            <div key={m.med} className="bg-gold/8 border border-gold/20 rounded-xl px-3 py-2.5 text-center">
                              <p className="text-[0.72rem] font-bold text-gold">{m.prazo}</p>
                              <p className="text-[0.72rem] text-steel/55">{m.med}</p>
                            </div>
                          ))}
                        </div>
                        <p className="text-[0.7rem] text-steel/40 mt-2">⚠️ IBPs, medicações contínuas e probióticos orientados pelo médico devem ser mantidos.</p>
                      </div>

                      {/* No dia */}
                      <div className="flex flex-wrap gap-2 pt-1 border-t border-teal/8">
                        {[
                          '🚭 Não fumar',
                          '🦷 Enxaguante sem álcool',
                          '🍬 Sem chicletes ou balas',
                          '🏃 Sem exercícios intensos',
                        ].map(item => (
                          <span key={item} className="text-[0.75rem] text-steel/60 bg-cloud border border-teal/10 px-3 py-1.5 rounded-full">{item}</span>
                        ))}
                      </div>
                    </div>
                  </div>

                </>
              ) : (
                /* Preparo padrão para outros exames */
                <>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">
                    <h2 className="font-serif font-light text-steel text-[1.5rem]">
                      Como se <em className="italic text-teal" style={{ fontStyle: 'italic' }}>preparar</em>
                    </h2>
                    {pdfUrl && (
                      <a
                        href={pdfUrl}
                        download
                        className="inline-flex items-center gap-2 text-[0.88rem] font-semibold text-teal bg-teal/8 border border-teal/20 px-4 py-2.5 rounded-xl hover:bg-teal hover:text-white hover:border-teal transition-all shrink-0"
                      >
                        <Download className="w-4 h-4" />
                        Baixar Preparo em PDF
                      </a>
                    )}
                  </div>

                  {detail.preparoCards ? (
                    /* Cards com ícones, badges e seções */
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {(() => {
                        type Sec = { name?: string; cards: PreparoCard[] }
                        const sections: Sec[] = []
                        detail.preparoCards!.forEach(card => {
                          const last = sections[sections.length - 1]
                          if (!last || last.name !== card.section) sections.push({ name: card.section, cards: [card] })
                          else last.cards.push(card)
                        })
                        return sections.map((sec, si) => (
                          <div key={sec.name ?? si} className="contents">
                            {sec.name && (
                              <div className="col-span-full flex items-center gap-3 mt-2">
                                <span className="h-px flex-1 bg-teal/12" />
                                <p className="text-[0.67rem] font-bold uppercase tracking-[.12em] text-steel/35 whitespace-nowrap">{sec.name}</p>
                                <span className="h-px flex-1 bg-teal/12" />
                              </div>
                            )}
                            {sec.cards.map(card => (
                              <div
                                key={card.title}
                                className={`rounded-2xl p-5 shadow-sm hover:shadow-md transition-all flex gap-4 items-start ${
                                  card.variant === 'warning'
                                    ? 'bg-gold/6 border border-gold/20 hover:border-gold/35'
                                    : card.variant === 'permitted'
                                    ? 'bg-teal/5 border border-teal/15 hover:border-teal/28'
                                    : 'bg-white border border-teal/10 hover:border-teal/22'
                                }`}
                              >
                                <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 text-[1.25rem] leading-none ${
                                  card.variant === 'warning'
                                    ? 'bg-gold/10 border border-gold/20'
                                    : card.variant === 'permitted'
                                    ? 'bg-teal/10 border border-teal/20'
                                    : 'bg-teal/8 border border-teal/15'
                                }`}>
                                  {card.icon}
                                </div>
                                <div className="flex-1 min-w-0">
                                  {card.badge && (
                                    <span className={`inline-block text-[0.6rem] font-bold uppercase tracking-[.1em] px-2 py-0.5 rounded-full mb-1.5 border ${
                                      card.variant === 'warning'
                                        ? 'text-gold bg-gold/10 border-gold/25'
                                        : 'text-teal bg-teal/8 border-teal/20'
                                    }`}>
                                      {card.badge}
                                    </span>
                                  )}
                                  <p className="text-[0.88rem] font-semibold text-steel mb-1">{card.title}</p>
                                  <p className="text-[0.82rem] font-light text-steel/60 leading-relaxed">{card.body}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ))
                      })()}
                    </div>
                  ) : (
                    /* Lista numerada (fallback) */
                    <div className="bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm">
                      {detail.preparo.map((p, i) => (
                        <div
                          key={p}
                          className={`flex items-start gap-4 p-5 text-[0.9rem] text-steel/65 ${i < detail.preparo.length - 1 ? 'border-b border-teal/8' : ''}`}
                        >
                          <span className="w-7 h-7 rounded-full bg-teal/10 text-teal text-[0.72rem] font-semibold flex items-center justify-center shrink-0 border border-teal/18">
                            {i + 1}
                          </span>
                          {p}
                        </div>
                      ))}
                    </div>
                  )}
                </>
              )}
            </div>

            {/* ── Perguntas Frequentes ──────────────────────────────────── */}
            <div>
              <h2 className="font-serif font-light text-steel text-[1.5rem] mb-5">
                Perguntas <em className="italic text-teal">frequentes</em>
              </h2>
              <div className="space-y-3">
                {detail.faqs.map(faq => (
                  <details key={faq.pergunta} className="group bg-white border border-teal/10 rounded-2xl px-5 py-4 shadow-sm open:border-teal/25">
                    <summary className="flex items-center justify-between gap-4 cursor-pointer list-none text-[0.92rem] font-semibold text-steel">
                      {faq.pergunta}
                      <span className="text-teal text-[1.1rem] shrink-0 transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="text-[0.86rem] font-light text-steel/60 leading-[1.7] mt-3">{faq.resposta}</p>
                  </details>
                ))}
              </div>
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────── */}
          <div className="space-y-5">

            {/* Info chips */}
            <div className="bg-white border border-teal/10 rounded-2xl p-6 space-y-3 shadow-sm">
              <h3 className="text-[0.75rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-4">Informações</h3>
              {exame.info.map(({ icon, text }) => {
                const Icon = ICON_MAP[icon] ?? Check
                return (
                  <div key={text} className="flex items-center gap-3 text-[0.88rem] text-steel/65">
                    <Icon className="w-4 h-4 text-teal shrink-0" />
                    {text}
                  </div>
                )
              })}
            </div>

            {/* PDF Download — dois botões para testes resp., um para outros */}
            {isResp ? (
              <div className="bg-teal/8 border border-teal/18 rounded-2xl p-5 space-y-3">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[.08em] text-teal mb-1">Preparos do Exame</h3>
                {RESP_PDFS.map(pdf => (
                  <a
                    key={pdf.href}
                    href={pdf.href}
                    download
                    className="flex items-center gap-3 w-full bg-white border border-teal/20 rounded-xl px-4 py-3 text-[0.82rem] font-semibold text-teal hover:bg-teal hover:text-white hover:border-teal transition-all"
                  >
                    <Download className="w-4 h-4 shrink-0" />
                    <span className="leading-snug">{pdf.label}</span>
                  </a>
                ))}
              </div>
            ) : pdfUrl ? (
              <div className="bg-teal/8 border border-teal/18 rounded-2xl p-5">
                <h3 className="text-[0.78rem] font-bold uppercase tracking-[.08em] text-teal mb-3">Preparo do Exame</h3>
                <p className="text-[0.82rem] text-steel/60 mb-4 leading-relaxed">
                  Baixe o guia completo de preparo em PDF para ler com calma em casa.
                </p>
                <a
                  href={pdfUrl}
                  download
                  className="btn-teal w-full justify-center text-[0.9rem] py-3"
                >
                  <Download className="w-4 h-4" />
                  Baixar Preparo em PDF
                </a>
              </div>
            ) : null}

            {/* ISO badge */}
            <div className="bg-gold/8 border border-gold/22 rounded-2xl p-5 flex items-center gap-3">
              <IsoSeal size={44} className="shrink-0" />
              <p className="text-[0.82rem] text-steel/65 leading-snug">
                Exame realizado com protocolo <strong className="text-steel font-semibold">certificado ISO 9001</strong>
              </p>
            </div>

            {/* Especialidades relacionadas */}
            {espRel.length > 0 && (
              <div className="bg-white border border-teal/10 rounded-2xl p-6 shadow-sm">
                <h3 className="text-[0.75rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-4">Especialidades relacionadas</h3>
                <div className="space-y-2">
                  {espRel.map(e => (
                    <Link key={e.slug} href={`/especialidades/${e.slug}`}
                      className="flex items-center justify-between p-3.5 rounded-xl bg-cloud border border-teal/8 hover:border-teal/22 hover:bg-teal/5 transition-all group">
                      <span className="text-[0.88rem] text-steel/60 group-hover:text-teal transition-colors">{e.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-steel/30 group-hover:text-teal transition-colors" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            <Link href="/agendar" className="btn-gold w-full justify-center">
              Agendar este Exame
            </Link>

            {/* Vídeo NU.V.E.M Ensino — somente testes respiratórios */}
            {isResp && (
              <div className="rounded-2xl overflow-hidden shadow-md border border-teal/10">
                <div className="relative w-full" style={{ aspectRatio: '9/16' }}>
                  <iframe src={RESP_VIDEOS[1].embed} title={RESP_VIDEOS[1].title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen className="absolute inset-0 w-full h-full" />
                </div>
              </div>
            )}

            {/* Vídeo específico do exame */}
            {!isResp && detail.video && (
              <div className="rounded-2xl overflow-hidden shadow-md border border-teal/10">
                <div className="relative w-full" style={{ aspectRatio: detail.video.short ? '9/16' : '16/9' }}>
                  <iframe
                    src={detail.video.embed}
                    title={detail.video.title}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner />
      </SectionWrapper>
    </>
  )
}
