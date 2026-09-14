/**
 * Versões traduzidas (EN/ES) dos catálogos de ESPECIALIDADES, EXAMES e
 * DEPOIMENTOS definidos em src/lib/data.ts. Mantém apenas os campos de texto —
 * os campos estruturais (num, slug, id, icon, stars, initials) são os mesmos
 * de src/lib/data.ts e não precisam ser repetidos aqui.
 *
 * src/lib/data.ts continua sendo a fonte de verdade em português (usada por
 * scripts/validar-referencias-blog.mjs e pelo restante do código para ids/slugs).
 */
import type { Especialidade, Exame, Depoimento } from '@/types'
import { ESPECIALIDADES, EXAMES, DEPOIMENTOS } from '@/lib/data'
import type { AppLocale } from '@/i18n/routing'

// ─── Especialidades ────────────────────────────────────────────────────────

const ESPECIALIDADES_EN: Especialidade[] = [
  { num: '01', slug: 'gastroenterologia', icon: 'Activity',
    title: 'Gastroenterology',
    desc:  'Full digestive balance, from common symptoms to complex conditions like SIBO, IMO and DGBI – Disorders of Gut-Brain Interaction.',
    tags:  ['DGBI', 'SIBO / IMO', 'Motility'] },
  { num: '02', slug: 'fisioterapia-pelvica', icon: 'Globe',
    title: 'Pelvic Physical Therapy',
    desc:  'Pelvic floor rehabilitation, functional digestive disorders and incontinence with specialized biofeedback.',
    tags:  ['Pelvic Floor', 'Biofeedback', 'Rehabilitation'] },
  { num: '03', slug: 'halitose', icon: 'Shield',
    title: 'Halitosis',
    desc:  'Complete multidisciplinary diagnosis. We investigate digestive, oral and systemic causes with precision halimetry.',
    tags:  ['Halimetry', 'Sialometry', 'Integrated Diagnosis'] },
  { num: '04', slug: 'pediatria', icon: 'Users',
    title: 'Pediatrics',
    desc:  'Comprehensive care for children’s digestive health, with a welcoming approach that involves the whole family from the earliest years.',
    tags:  ['Children’s Health', 'Digestive', 'Prevention'] },
  { num: '05', slug: 'nefrologia', icon: 'Heart',
    title: 'Nephrology',
    desc:  'Specialized diagnosis and treatment of kidney disease with prevention and integrated multidisciplinary support.',
    tags:  ['Kidney Health', 'Prevention', 'Full Support'] },
  { num: '06', slug: 'motilidade-digestiva', icon: 'Star',
    title: 'Digestive Motility',
    desc:  'Advanced evaluation of esophageal and intestinal disorders with integrated high-resolution manometry, pH monitoring and impedance.',
    tags:  ['Esophageal Disorders', 'Reflux', 'High Resolution'] },
]

const ESPECIALIDADES_ES: Especialidade[] = [
  { num: '01', slug: 'gastroenterologia', icon: 'Activity',
    title: 'Gastroenterología',
    desc:  'Equilibrio intestinal pleno, desde síntomas comunes hasta patologías complejas como SIBO, IMO y DGBI – Trastorno de la Interacción Cerebro-Intestino.',
    tags:  ['DGBI', 'SIBO / IMO', 'Motilidad'] },
  { num: '02', slug: 'fisioterapia-pelvica', icon: 'Globe',
    title: 'Fisioterapia Pélvica',
    desc:  'Rehabilitación del piso pélvico, trastornos digestivos funcionales e incontinencia con biofeedback especializado.',
    tags:  ['Piso Pélvico', 'Biofeedback', 'Rehabilitación'] },
  { num: '03', slug: 'halitose', icon: 'Shield',
    title: 'Halitosis',
    desc:  'Diagnóstico multidisciplinario completo. Investigamos causas digestivas, orales y sistémicas con halimetría de precisión.',
    tags:  ['Halimetría', 'Sialometría', 'Diagnóstico Integrado'] },
  { num: '04', slug: 'pediatria', icon: 'Users',
    title: 'Pediatría',
    desc:  'Cuidado integral de la salud digestiva infantil con un enfoque cercano e integrado a la familia desde los primeros años.',
    tags:  ['Salud Infantil', 'Digestivo', 'Prevención'] },
  { num: '05', slug: 'nefrologia', icon: 'Heart',
    title: 'Nefrología',
    desc:  'Diagnóstico y tratamiento especializado de enfermedades renales con prevención y soporte multidisciplinario integrado.',
    tags:  ['Salud Renal', 'Prevención', 'Soporte Integral'] },
  { num: '06', slug: 'motilidade-digestiva', icon: 'Star',
    title: 'Motilidad Digestiva',
    desc:  'Evaluación avanzada de trastornos esofágicos e intestinales con manometría, pHmetría e impedancia integradas.',
    tags:  ['Trastornos Esofágicos', 'Reflujo', 'Alta Resolución'] },
]

export function getEspecialidades(locale: AppLocale): Especialidade[] {
  if (locale === 'en') return ESPECIALIDADES_EN
  if (locale === 'es') return ESPECIALIDADES_ES
  return ESPECIALIDADES
}

export function getEspecialidade(locale: AppLocale, slug: string): Especialidade | undefined {
  return getEspecialidades(locale).find(e => e.slug === slug)
}

// ─── Exames ────────────────────────────────────────────────────────────────

const EXAMES_EN: Exame[] = [
  {
    id: 'manometria-esofagica', num: '01',
    title: 'Esophageal Manometry', subtitle: 'High Resolution · Esophagus', tag: 'High Resolution',
    seoTitle: 'Esophageal Manometry in Belo Horizonte',
    seoDescription: 'High-resolution esophageal manometry in Belo Horizonte, no sedation. Diagnosis of achalasia, dysphagia and reflux. ISO 9001 certified.',
    desc: [
      'Precisely evaluates esophageal motility and lower esophageal sphincter function, essential for diagnosing achalasia, dysphagia and gastroesophageal reflux.',
      'Latest-generation equipment with full high-resolution esophageal pressure mapping. Reports issued by ISO 9001 certified specialists.',
    ],
    info: [
      { icon: 'Clock',  text: 'Duration: 30-45 minutes' },
      { icon: 'Shield', text: 'ISO 9001 certification, international standard' },
      { icon: 'Check',  text: 'Specific prep · no sedation' },
    ],
  },
  {
    id: 'manometria-anorretal', num: '02',
    title: 'Anorectal Manometry', subtitle: 'High Resolution · Anal Canal', tag: 'High Resolution',
    seoTitle: 'Anorectal Manometry in Belo Horizonte',
    seoDescription: 'Anorectal manometry in Belo Horizonte for fecal incontinence, chronic constipation and pelvic floor assessment. ISO 9001 certified.',
    desc: [
      'Evaluates the function of the anal canal and rectal sphincters, essential for diagnosing fecal incontinence, chronic constipation and pelvic floor disorders.',
      'Complete protocol with integrated biofeedback. Latest-generation equipment with ISO 9001 certified reports.',
    ],
    info: [
      { icon: 'Clock',  text: 'Duration: 30-45 minutes' },
      { icon: 'Shield', text: 'ISO 9001 certification, international standard' },
      { icon: 'Check',  text: 'Enema prep · no sedation' },
    ],
  },
  {
    id: 'phmetria-impedanciometria', num: '03',
    title: 'pH & Impedance Monitoring', subtitle: '24h Monitoring', tag: '24h Monitoring',
    seoTitle: 'pH & Impedance Monitoring in Belo Horizonte',
    seoDescription: '24-hour esophageal pH monitoring and impedance testing in Belo Horizonte. Diagnosis of acid and non-acid reflux refractory to treatment.',
    desc: [
      'Ambulatory monitoring that records acid and non-acid reflux episodes over 24 hours, correlating symptoms with reflux events during normal daily activity.',
      'Impedance monitoring detects reflux regardless of pH, essential in cases of reflux refractory to conventional treatment.',
    ],
    info: [
      { icon: 'Clock', text: '24-hour ambulatory monitoring' },
      { icon: 'Check', text: 'Normal activity throughout the exam' },
    ],
  },
  {
    id: 'testes-respiratorios', num: '04',
    title: 'Breath Tests', subtitle: 'H₂ · CH₄ · H₂S · H. pylori', tag: 'Non-Invasive',
    seoTitle: 'Breath Tests: SIBO and H. Pylori in Belo Horizonte',
    seoDescription: 'Non-invasive breath tests in Belo Horizonte for SIBO, IMO, H. pylori and food intolerances. No sedation, results from a single exam.',
    desc: [
      'Diagnosis of SIBO, IMO, food intolerances and H. pylori through exhaled breath analysis. No blood draw, no discomfort, high diagnostic specificity.',
      'The NU.V.E.M protocol detects H₂, CH₄ and H₂S in a single exam, covering SIBO, LIBO, SIFO and H. pylori infection.',
    ],
    info: [
      { icon: 'Check', text: 'No blood draw · no sedation' },
      { icon: 'Clock', text: 'Duration: 2-3 hours depending on substrate' },
    ],
  },
  {
    id: 'halimetria-sialometria', num: '05',
    title: 'Halimetry & Sialometry', subtitle: 'Halitosis Diagnosis', tag: 'Precision Diagnosis',
    seoTitle: 'Halimetry: Halitosis Diagnosis in Belo Horizonte',
    seoDescription: 'Halimetry and sialometry in Belo Horizonte for a precise diagnosis of halitosis. Exclusive NU.V.E.M multidisciplinary protocol.',
    desc: [
      'Halimetry objectively quantifies the volatile sulfur compounds that cause halitosis, with differential diagnosis between oral, digestive and systemic causes.',
      'Sialometry evaluates salivary flow, essential in investigating xerostomia and its relationship with halitosis and systemic conditions.',
    ],
    info: [
      { icon: 'Shield', text: 'Exclusive NU.V.E.M multidisciplinary protocol' },
    ],
  },
  {
    id: 'avaliacao-pelvica', num: '06',
    title: 'Pelvic Floor Assessment', subtitle: 'Biofeedback & Electromyography', tag: 'Integrated Specialty',
    seoTitle: 'Pelvic Floor Assessment with Biofeedback in Belo Horizonte',
    seoDescription: 'Pelvic floor assessment with biofeedback and electromyography in Belo Horizonte. Integration between gastroenterology and pelvic physical therapy.',
    desc: [
      'Complete functional pelvic floor assessment with electromyographic biofeedback for diagnosis and rehabilitation of pelvic dysfunction, incontinence and obstructive constipation.',
    ],
    info: [
      { icon: 'Check', text: 'GI + Pelvic Physical Therapy integration' },
      { icon: 'Check', text: 'Non-invasive, patient-centered approach' },
    ],
  },
]

const EXAMES_ES: Exame[] = [
  {
    id: 'manometria-esofagica', num: '01',
    title: 'Manometría Esofágica', subtitle: 'Alta Resolución · Esófago', tag: 'Alta Resolución',
    seoTitle: 'Manometría Esofágica en Belo Horizonte',
    seoDescription: 'Manometría esofágica de alta resolución en Belo Horizonte, sin sedación. Diagnóstico de acalasia, disfagia y reflujo. Certificación ISO 9001.',
    desc: [
      'Evalúa con precisión la motilidad del esófago y la función del esfínter esofágico inferior, esencial en el diagnóstico de acalasia, disfagia y reflujo gastroesofágico.',
      'Equipos de última generación con mapeo completo de la presión esofágica en alta resolución. Informes emitidos por especialistas certificados ISO 9001.',
    ],
    info: [
      { icon: 'Clock',  text: 'Duración: 30-45 minutos' },
      { icon: 'Shield', text: 'Certificación ISO 9001, estándar internacional' },
      { icon: 'Check',  text: 'Preparación específica · sin sedación' },
    ],
  },
  {
    id: 'manometria-anorretal', num: '02',
    title: 'Manometría Anorrectal', subtitle: 'Alta Resolución · Canal Anal', tag: 'Alta Resolución',
    seoTitle: 'Manometría Anorrectal en Belo Horizonte',
    seoDescription: 'Manometría anorrectal en Belo Horizonte para incontinencia fecal, estreñimiento crónico y evaluación del piso pélvico. Certificación ISO 9001.',
    desc: [
      'Evalúa la función de los esfínteres del canal anal y el recto, fundamental en el diagnóstico de incontinencia fecal, estreñimiento crónico y trastornos del piso pélvico.',
      'Protocolo completo con biofeedback integrado. Equipos de última generación con informes certificados ISO 9001.',
    ],
    info: [
      { icon: 'Clock',  text: 'Duración: 30-45 minutos' },
      { icon: 'Shield', text: 'Certificación ISO 9001, estándar internacional' },
      { icon: 'Check',  text: 'Preparación con enema · sin sedación' },
    ],
  },
  {
    id: 'phmetria-impedanciometria', num: '03',
    title: 'pHmetría e Impedancia', subtitle: 'Monitoreo de 24h', tag: 'Monitoreo de 24h',
    seoTitle: 'pHmetría e Impedancia en Belo Horizonte',
    seoDescription: 'pHmetría esofágica de 24 horas e impedancia en Belo Horizonte. Diagnóstico de reflujo ácido y no ácido refractario al tratamiento.',
    desc: [
      'Monitoreo ambulatorio que registra episodios de reflujo ácido y no ácido durante 24 horas, correlacionando síntomas con eventos de reflujo en actividad normal.',
      'La impedancia detecta reflujo independientemente del pH, esencial en casos de reflujo refractario al tratamiento convencional.',
    ],
    info: [
      { icon: 'Clock', text: 'Monitoreo ambulatorio de 24 horas' },
      { icon: 'Check', text: 'Actividad normal durante todo el examen' },
    ],
  },
  {
    id: 'testes-respiratorios', num: '04',
    title: 'Pruebas Respiratorias', subtitle: 'H₂ · CH₄ · H₂S · H. pylori', tag: 'No Invasivo',
    seoTitle: 'Pruebas Respiratorias: SIBO y H. Pylori en Belo Horizonte',
    seoDescription: 'Pruebas respiratorias no invasivas en Belo Horizonte para SIBO, IMO, H. pylori e intolerancias alimentarias. Sin sedación, resultado en un único examen.',
    desc: [
      'Diagnóstico de SIBO, IMO, intolerancias alimentarias y H. pylori mediante análisis del aire exhalado. Sin extracción de sangre, sin molestias y con alta especificidad diagnóstica.',
      'El protocolo NU.V.E.M detecta H₂, CH₄ y H₂S en un único examen, cubriendo SIBO, LIBO, SIFO e infección por H. pylori.',
    ],
    info: [
      { icon: 'Check', text: 'Sin extracción de sangre · sin sedación' },
      { icon: 'Clock', text: 'Duración: 2-3 horas según el sustrato' },
    ],
  },
  {
    id: 'halimetria-sialometria', num: '05',
    title: 'Halimetría y Sialometría', subtitle: 'Diagnóstico de Halitosis', tag: 'Diagnóstico Preciso',
    seoTitle: 'Halimetría: Diagnóstico de Halitosis en Belo Horizonte',
    seoDescription: 'Halimetría y sialometría en Belo Horizonte para el diagnóstico preciso de la halitosis. Protocolo multidisciplinario exclusivo NU.V.E.M.',
    desc: [
      'La halimetría cuantifica objetivamente los compuestos sulfurados volátiles causantes de la halitosis, con diagnóstico diferencial entre causas orales, digestivas y sistémicas.',
      'La sialometría evalúa el flujo salival, esencial en la investigación de la xerostomía y su relación con la halitosis y enfermedades sistémicas.',
    ],
    info: [
      { icon: 'Shield', text: 'Protocolo multidisciplinario exclusivo NU.V.E.M' },
    ],
  },
  {
    id: 'avaliacao-pelvica', num: '06',
    title: 'Evaluación del Piso Pélvico', subtitle: 'Biofeedback y Electromiografía', tag: 'Especialidad Integrada',
    seoTitle: 'Evaluación del Piso Pélvico con Biofeedback en Belo Horizonte',
    seoDescription: 'Evaluación del piso pélvico con biofeedback y electromiografía en Belo Horizonte. Integración entre gastroenterología y fisioterapia pélvica.',
    desc: [
      'Evaluación funcional completa del piso pélvico con biofeedback electromiográfico para el diagnóstico y la rehabilitación de disfunciones pélvicas, incontinencia y estreñimiento obstructivo.',
    ],
    info: [
      { icon: 'Check', text: 'Integración GI + Fisioterapia Pélvica' },
      { icon: 'Check', text: 'Enfoque no invasivo y humanizado' },
    ],
  },
]

export function getExames(locale: AppLocale): Exame[] {
  if (locale === 'en') return EXAMES_EN
  if (locale === 'es') return EXAMES_ES
  return EXAMES
}

export function getExame(locale: AppLocale, id: string): Exame | undefined {
  return getExames(locale).find(e => e.id === id)
}

// ─── Depoimentos ───────────────────────────────────────────────────────────
// name/stars/initials não mudam por idioma — só role/text (depoimentos reais
// de pacientes/alunos, traduzidos por IA; revisão da clínica recomendada
// antes de publicar em produção).

const DEPOIMENTOS_EN: Depoimento[] = DEPOIMENTOS.map(d => ({ ...d }))
const DEPOIMENTOS_ES: Depoimento[] = DEPOIMENTOS.map(d => ({ ...d }))

const DEPOIMENTOS_EN_OVERRIDES: Record<string, Pick<Depoimento, 'role' | 'text'>> = {
  '1': { role: 'Clinic patient', text: 'Excellent care from start to finish. The clinic’s facilities are modern, well equipped and very reassuring. These are specialists who really look for the root cause, not just the symptoms.' },
  '2': { role: 'Healthcare professional · Hands-On Course', text: 'The Nuvem clinic has amazing facilities and the breath test course was wonderful, flawless! Thank you Dr. Vera and team for the warm welcome!' },
  '3': { role: 'Physician · NU.V.E.M Ensino Training', text: 'Dr. Vera is extremely didactic and practical. It’s worth the investment and the trip to BH. If you plan to work with breath tests, you need this course.' },
  '4': { role: 'Patient', text: 'Great, very humane care. I can only thank Dr. Vera and the whole team for their attention and care throughout the visit.' },
  '5': { role: 'Professional · Education', text: 'Excellent, very thorough course, both in theory and practice. The clinic’s facilities are flawless and Dr. Vera’s teaching style makes all the difference.' },
  '6': { role: 'Healthcare professional', text: 'My experience was excellent in every way. Wonderful classes, up to date, didactic and practical. I’ll definitely be back!' },
}

const DEPOIMENTOS_ES_OVERRIDES: Record<string, Pick<Depoimento, 'role' | 'text'>> = {
  '1': { role: 'Paciente de la clínica', text: 'Atención excelente de principio a fin. Las instalaciones de la clínica son modernas, están bien equipadas y transmiten mucha confianza. Son especialistas que realmente buscan la causa del problema, no solo los síntomas.' },
  '2': { role: 'Profesional de la salud · Curso Práctico', text: '¡La clínica Nuvem cuenta con una infraestructura increíble y el curso de prueba respiratoria fue maravilloso, sin fallos! ¡Gracias Dra. Vera y equipo por la recepción y la calidez!' },
  '3': { role: 'Médico · Formación NU.V.E.M Ensino', text: 'La Dra. Vera es extremadamente didáctica y práctica. Vale la pena la inversión y el viaje hasta BH. Si piensas trabajar con pruebas respiratorias, necesitas este curso.' },
  '4': { role: 'Paciente', text: 'Muy buena atención, muy humana. Solo puedo agradecer a la Dra. Vera y a todo el equipo por la atención y el cuidado durante toda la consulta.' },
  '5': { role: 'Profesional · Formación', text: 'Curso excelente y muy completo, tanto en la parte teórica como en la práctica. Las instalaciones de la clínica son impecables y la didáctica de la Dra. Vera marca la diferencia.' },
  '6': { role: 'Profesional de la salud', text: 'Mi experiencia fue excelente en todos los sentidos. Clases maravillosas, actualizadas, didácticas y prácticas. ¡Sin duda volveré!' },
}

for (const d of DEPOIMENTOS_EN) Object.assign(d, DEPOIMENTOS_EN_OVERRIDES[d.id])
for (const d of DEPOIMENTOS_ES) Object.assign(d, DEPOIMENTOS_ES_OVERRIDES[d.id])

export function getDepoimentos(locale: AppLocale): Depoimento[] {
  if (locale === 'en') return DEPOIMENTOS_EN
  if (locale === 'es') return DEPOIMENTOS_ES
  return DEPOIMENTOS
}
