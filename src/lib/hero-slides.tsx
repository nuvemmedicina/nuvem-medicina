/**
 * hero-slides.tsx
 * Slides do carrossel do hero da home.
 * Para adicionar/editar um slide, basta alterar o array HERO_SLIDES.
 */
import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { Calendar, GraduationCap } from 'lucide-react'

export interface HeroSlide {
  id:           string
  badge:        string
  title:        ReactNode
  description:  ReactNode
  imagem:       { src: string; alt: string }
  primaryCta:   { label: string; href: string; Icon: LucideIcon }
  secondaryCta: { label: string; href: string }
}

const WA_AGENDAR =
  'https://wa.me/553197261029?text=Ol%C3%A1!%20Gostaria%20de%20agendar%20uma%20consulta%20na%20NU.V.E.M%20Medicina.'

export const HERO_SLIDES: HeroSlide[] = [
  {
    id:    'institucional',
    badge: 'Belo Horizonte · Santa Efigênia',
    title: (
      <>
        Excelência em{' '}
        <em className="italic text-teal">Saúde Digestiva</em>{' '}
        <span className="italic text-steel/40">e Diagnóstico Avançado</span>
      </>
    ),
    description: (
      <>
        O ecossistema completo de medicina especializada: diagnóstico de alta precisão,
        equipe multidisciplinar e formação profissional baseada em casos reais.{' '}
        <strong className="text-teal font-semibold">Clínica com certificação ISO 9001.</strong>
      </>
    ),
    imagem: {
      src: '/images/nuvem-medicina-bh.jpg',
      alt: 'Consultório da NU.V.E.M Medicina em Belo Horizonte',
    },
    primaryCta:   { label: 'Agendar Consulta', href: WA_AGENDAR, Icon: Calendar },
    secondaryCta: { label: 'Conhecer Especialidades', href: '/especialidades' },
  },
  {
    id:    'curso-dici',
    badge: 'Início em 03 de agosto de 2026',
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
    id:    'curso-testes-respiratorios',
    badge: '02 e 03 de outubro · 25 vagas',
    title: (
      <>
        Testes Respiratórios de H₂, CH₄ e H₂S:{' '}
        <em className="italic text-teal">Curso Hands-On</em>
      </>
    ),
    description: (
      <>
        Treinamento teórico-prático presencial com a Dra. Vera Ângelo. Domine o
        diagnóstico de SIBO, IMO, LIBO, SIFO e intolerâncias alimentares, com prática
        supervisionada nos equipamentos Dynamed e Health Go.
      </>
    ),
    imagem: {
      src: '/images/teste-respiratorio-2.webp',
      alt: 'Prática com equipamento de teste respiratório na NU.V.E.M Ensino',
    },
    primaryCta: {
      label: 'Matricular-se agora',
      href:  'https://www.nuvemensino.com.br/checkout/testes-respiratorios-h2-ch4-h2s-outubro',
      Icon:  GraduationCap,
    },
    secondaryCta: {
      label: 'Ver detalhes do curso',
      href:  'https://www.nuvemensino.com.br/cursos/testes-respiratorios-h2-ch4-h2s-outubro',
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
    primaryCta:   { label: 'Agendar este Exame', href: WA_AGENDAR, Icon: Calendar },
    secondaryCta: { label: 'Saiba mais sobre o exame', href: '/exames/testes-respiratorios' },
  },
]
