/**
 * hero-slides.tsx
 * Slides do carrossel do hero da home, por idioma.
 * Para adicionar/editar um slide, altere o array correspondente ao idioma.
 */
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Calendar, GraduationCap } from 'lucide-react'
import type { AppLocale } from '@/i18n/routing'

export interface HeroSlide {
  id:           string
  badge:        string
  title:        ReactNode
  description:  ReactNode
  imagem:       { src: string; alt: string }
  primaryCta:   { label: string; href: string; Icon: LucideIcon }
  secondaryCta: { label: string; href: string }
}

const WA_AGENDAR: Record<AppLocale, string> = {
  'pt-BR': 'https://wa.me/553197261029?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20NU.V.E.M%20Medicina.',
  en:      'https://wa.me/553197261029?text=Hello!%20I%27d%20like%20to%20book%20an%20appointment%20at%20NU.V.E.M%20Medicina.',
  es:      'https://wa.me/553197261029?text=Hola!%20Me%20gustar%C3%ADa%20agendar%20una%20consulta%20en%20NU.V.E.M%20Medicina.',
}

const HERO_SLIDES_PT: HeroSlide[] = [
  {
    id:    'institucional',
    badge: 'Belo Horizonte · Santa Efigênia',
    title: (
      <>
        Cuidado em{' '}
        <em className="italic text-teal">Saúde Digestiva</em>{' '}
        <span className="italic text-steel/40">e Motilidade</span>
      </>
    ),
    description: (
      <>
        Clínica de gastroenterologia e motilidade digestiva: exames de alta resolução,
        equipe multidisciplinar e formação profissional baseada em casos reais.{' '}
        <strong className="text-teal font-semibold">Gestão certificada pela norma ISO 9001.</strong>
      </>
    ),
    imagem: {
      src: '/images/nuvem-medicina-bh.jpg',
      alt: 'Consultório da NU.V.E.M Medicina em Belo Horizonte',
    },
    primaryCta:   { label: 'Agendar Consulta', href: WA_AGENDAR['pt-BR'], Icon: Calendar },
    secondaryCta: { label: 'Conhecer Especialidades', href: '/especialidades' },
  },
  {
    id:    'curso-dici',
    badge: 'Curso Online · Certificado MEC/FACOP',
    title: (
      <>
        Curso de Aperfeiçoamento em{' '}
        <em className="italic text-teal">DICI</em>: Neurogastroenterologia
      </>
    ),
    description: (
      <>
        96h de formação online com encontros síncronos, certificado MEC/FACOP.
        Diagnóstico e manejo dos Distúrbios da Interação Cérebro-Intestino com a
        Dra. Vera Ângelo e equipe de especialistas.
      </>
    ),
    imagem: {
      src: '/images/dra-vera-angelo.jpg',
      alt: 'Dra. Vera Ângelo, instrutora do curso DICI',
    },
    primaryCta: {
      label: 'Matricular-se agora',
      href:  'https://www.nuvemensino.com.br/checkout/dici-neurogastroenterologia-2026',
      Icon:  GraduationCap,
    },
    secondaryCta: {
      label: 'Ver detalhes do curso',
      href:  'https://www.nuvemensino.com.br/cursos/dici-neurogastroenterologia-2026',
    },
  },
  {
    id:    'exame-teste-respiratorio',
    badge: 'Exame não invasivo',
    title: (
      <>
        Testes Respiratórios: Diagnóstico Preciso,{' '}
        <em className="italic text-teal">Não Invasivo</em>
      </>
    ),
    description: (
      <>
        Diagnóstico de SIBO, IMO, intolerâncias alimentares e H. pylori por análise do
        ar exalado. Protocolo NU.V.E.M detecta H₂, CH₄ e H₂S em um único exame, com
        tecnologia HealthGo AIR e Dynamed Easy H2, aprovadas pela ANVISA.
      </>
    ),
    imagem: {
      src: '/images/teste-respiratorio-1.webp',
      alt: 'Paciente realizando teste respiratório com equipamento HealthGo AIR',
    },
    primaryCta:   { label: 'Agendar este Exame', href: WA_AGENDAR['pt-BR'], Icon: Calendar },
    secondaryCta: { label: 'Saiba mais sobre o exame', href: '/exames/testes-respiratorios' },
  },
]

const HERO_SLIDES_EN: HeroSlide[] = [
  {
    id:    'institucional',
    badge: 'Belo Horizonte · Santa Efigênia',
    title: (
      <>
        Care in{' '}
        <em className="italic text-teal">Digestive Health</em>{' '}
        <span className="italic text-steel/40">and Motility</span>
      </>
    ),
    description: (
      <>
        A gastroenterology and digestive motility clinic: high-resolution exams,
        a multidisciplinary team, and case-based medical education.{' '}
        <strong className="text-teal font-semibold">Management certified under ISO 9001.</strong>
      </>
    ),
    imagem: {
      src: '/images/nuvem-medicina-bh.jpg',
      alt: 'NU.V.E.M Medicina office in Belo Horizonte',
    },
    primaryCta:   { label: 'Book an Appointment', href: WA_AGENDAR.en, Icon: Calendar },
    secondaryCta: { label: 'Explore Specialties', href: '/especialidades' },
  },
  {
    id:    'curso-dici',
    badge: 'Online Course · MEC/FACOP Certified',
    title: (
      <>
        Advanced Course in{' '}
        <em className="italic text-teal">DICI</em>: Neurogastroenterology
      </>
    ),
    description: (
      <>
        96 hours of online training with live sessions, MEC/FACOP certified.
        Diagnosis and management of Disorders of Gut-Brain Interaction with Dr.
        Vera Ângelo and her team of specialists.
      </>
    ),
    imagem: {
      src: '/images/dra-vera-angelo.jpg',
      alt: 'Dr. Vera Ângelo, instructor of the DICI course',
    },
    primaryCta: {
      label: 'Enroll now',
      href:  'https://www.nuvemensino.com.br/checkout/dici-neurogastroenterologia-2026',
      Icon:  GraduationCap,
    },
    secondaryCta: {
      label: 'See course details',
      href:  'https://www.nuvemensino.com.br/cursos/dici-neurogastroenterologia-2026',
    },
  },
  {
    id:    'exame-teste-respiratorio',
    badge: 'Non-invasive exam',
    title: (
      <>
        Breath Tests: Precise Diagnosis,{' '}
        <em className="italic text-teal">Non-Invasive</em>
      </>
    ),
    description: (
      <>
        Diagnosis of SIBO, IMO, food intolerances and H. pylori through exhaled
        breath analysis. The NU.V.E.M protocol detects H₂, CH₄ and H₂S in a single
        exam, using ANVISA-approved HealthGo AIR and Dynamed Easy H2 technology.
      </>
    ),
    imagem: {
      src: '/images/teste-respiratorio-1.webp',
      alt: 'Patient undergoing a breath test with HealthGo AIR equipment',
    },
    primaryCta:   { label: 'Book This Exam', href: WA_AGENDAR.en, Icon: Calendar },
    secondaryCta: { label: 'Learn more about this exam', href: '/exames/testes-respiratorios' },
  },
]

const HERO_SLIDES_ES: HeroSlide[] = [
  {
    id:    'institucional',
    badge: 'Belo Horizonte · Santa Efigênia',
    title: (
      <>
        Cuidado en{' '}
        <em className="italic text-teal">Salud Digestiva</em>{' '}
        <span className="italic text-steel/40">y Motilidad</span>
      </>
    ),
    description: (
      <>
        Clínica de gastroenterología y motilidad digestiva: exámenes de alta
        resolución, equipo multidisciplinario y formación profesional basada en
        casos reales.{' '}
        <strong className="text-teal font-semibold">Gestión certificada según la norma ISO 9001.</strong>
      </>
    ),
    imagem: {
      src: '/images/nuvem-medicina-bh.jpg',
      alt: 'Consultorio de NU.V.E.M Medicina en Belo Horizonte',
    },
    primaryCta:   { label: 'Agendar Consulta', href: WA_AGENDAR.es, Icon: Calendar },
    secondaryCta: { label: 'Conocer Especialidades', href: '/especialidades' },
  },
  {
    id:    'curso-dici',
    badge: 'Curso Online · Certificado MEC/FACOP',
    title: (
      <>
        Curso de Perfeccionamiento en{' '}
        <em className="italic text-teal">DICI</em>: Neurogastroenterología
      </>
    ),
    description: (
      <>
        96h de formación online con encuentros sincrónicos, certificado MEC/FACOP.
        Diagnóstico y manejo de los Trastornos de la Interacción Cerebro-Intestino
        con la Dra. Vera Ângelo y su equipo de especialistas.
      </>
    ),
    imagem: {
      src: '/images/dra-vera-angelo.jpg',
      alt: 'Dra. Vera Ângelo, instructora del curso DICI',
    },
    primaryCta: {
      label: 'Inscribirme ahora',
      href:  'https://www.nuvemensino.com.br/checkout/dici-neurogastroenterologia-2026',
      Icon:  GraduationCap,
    },
    secondaryCta: {
      label: 'Ver detalles del curso',
      href:  'https://www.nuvemensino.com.br/cursos/dici-neurogastroenterologia-2026',
    },
  },
  {
    id:    'exame-teste-respiratorio',
    badge: 'Examen no invasivo',
    title: (
      <>
        Pruebas Respiratorias: Diagnóstico Preciso,{' '}
        <em className="italic text-teal">No Invasivo</em>
      </>
    ),
    description: (
      <>
        Diagnóstico de SIBO, IMO, intolerancias alimentarias y H. pylori mediante
        análisis del aire exhalado. El protocolo NU.V.E.M detecta H₂, CH₄ y H₂S en
        un único examen, con tecnología HealthGo AIR y Dynamed Easy H2, aprobadas
        por ANVISA.
      </>
    ),
    imagem: {
      src: '/images/teste-respiratorio-1.webp',
      alt: 'Paciente realizando una prueba respiratoria con equipo HealthGo AIR',
    },
    primaryCta:   { label: 'Agendar este Examen', href: WA_AGENDAR.es, Icon: Calendar },
    secondaryCta: { label: 'Más información del examen', href: '/exames/testes-respiratorios' },
  },
]

export function getHeroSlides(locale: AppLocale): HeroSlide[] {
  if (locale === 'en') return HERO_SLIDES_EN
  if (locale === 'es') return HERO_SLIDES_ES
  return HERO_SLIDES_PT
}
