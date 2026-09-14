import type { Metadata } from 'next'
import Image             from 'next/image'
import { PageHero }      from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }     from '@/components/ui/CtaBanner'
import { IsoSeal }       from '@/components/icons/IsoSeal'
import { CONTATO }       from '@/lib/data'
import { CheckCircle, Shield, FileText, BarChart3, RefreshCw, Users, ChevronDown } from 'lucide-react'

export const metadata: Metadata = {
  alternates:  { canonical: '/gestao-da-qualidade' },
  title:       'Gestão da Qualidade · ISO 9001',
  description: 'Conheça o sistema de gestão da qualidade ISO 9001 da NU.V.E.M Medicina em Belo Horizonte.',
}

const PRINCIPIOS = [
  { Icon: Users,      title: 'Foco no Paciente',         desc: 'Todo processo é desenhado para maximizar a segurança, o conforto e a satisfação do paciente em cada ponto de contato.' },
  { Icon: Shield,     title: 'Liderança e Comprometimento', desc: 'A alta direção lidera pelo exemplo, garantindo que a cultura da qualidade permeie cada membro da equipe.' },
  { Icon: RefreshCw,  title: 'Melhoria Contínua',         desc: 'Indicadores são medidos mensalmente. Não conformidades são registradas, analisadas e eliminadas sistematicamente.' },
  { Icon: FileText,   title: 'Tomada de Decisão Baseada em Dados', desc: 'Decisões clínicas e gerenciais são fundamentadas em evidências, dados de desempenho e auditorias periódicas.' },
  { Icon: BarChart3,  title: 'Gestão de Processos',       desc: 'Cada processo, do agendamento ao diagnóstico, é mapeado, padronizado e continuamente monitorado.' },
  { Icon: CheckCircle, title: 'Rastreabilidade Total',    desc: 'Exames, prontuários e certificações são rastreáveis e auditáveis a qualquer momento, garantindo segurança e conformidade.' },
]

const BENEFICIOS = [
  'Processos clínicos padronizados conforme norma internacional',
  'Auditorias externas periódicas por organismo certificador independente',
  'Treinamentos e capacitações documentados e controlados',
  'Gestão de reclamações e melhorias com prazo e responsável definidos',
  'Manual da qualidade atualizado e acessível a toda equipe',
  'Política da qualidade desdobrada em objetivos mensuráveis',
  'Controle de documentos e registros com versionamento',
  'Análise crítica pela direção realizada periodicamente',
]

export default function GestaoQualidadePage() {
  return (
    <>
      <PageHero
        tag="Gestão da Qualidade"
        title={<>Certificação <em>ISO 9001</em>,<br />o padrão que nos define</>}
        desc="Somos uma clínica com gestão certificada pela norma ISO 9001, o padrão internacional de excelência em qualidade."
      />

      {/* O que é ISO 9001 */}
      <SectionWrapper dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Seal */}
          <div className="flex justify-center reveal">
            <div className="relative">
              <div
                className="absolute inset-0 rounded-full blur-[60px] opacity-20 pointer-events-none"
                style={{ background: 'radial-gradient(circle, #C9A84C 0%, transparent 70%)' }}
              />
              <IsoSeal size={260} priority className="relative z-10 hover:scale-105 transition-transform duration-500" />
            </div>
          </div>

          <div className="reveal reveal-d1">
            <p className="sec-tag">O que é ISO 9001</p>
            <h2 className="sec-title mt-2 mb-5">
              O padrão <em>internacional</em> de excelência
            </h2>
            <div className="space-y-4 text-[0.97rem] font-light text-steel/65 leading-[1.85]">
              <p>
                A ISO 9001 é a norma internacional mais reconhecida para sistemas de gestão da qualidade,
                publicada pela International Organization for Standardization (ISO). Ela estabelece
                requisitos para que uma organização demonstre capacidade de fornecer produtos e
                serviços que atendam consistentemente às necessidades dos clientes.
              </p>
              <p>
                Para a NU.V.E.M Medicina, ser certificada pela ISO 9001 significa que cada processo,
                desde o agendamento da consulta até a entrega do laudo, segue protocolos rigorosos,
                documentados, auditados externamente e em constante melhoria.
              </p>
              <p>
                <strong className="text-steel font-medium">Somos uma clínica
                de gastroenterologia e diagnóstico digestivo em Belo Horizonte</strong> com
                esta certificação, o que representa um diferencial concreto de segurança e
                confiança para nossos pacientes e parceiros.
              </p>
            </div>

            {/* Credential */}
            <div className="mt-8 border-l-2 border-teal/40 rounded-r-lg px-5 py-4" style={{ background: 'rgba(0,70,95,0.06)' }}>
              <strong className="block text-[0.9rem] font-semibold text-steel mb-1">
                NUVEM MEDICINA · {CONTATO.crmClinica}
              </strong>
              <span className="text-[0.72rem] text-steel/55">
                {CONTATO.diretora.nome} · {CONTATO.diretora.crm} · {CONTATO.diretora.rqe}
              </span>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Princípios */}
      <SectionWrapper>
        <div className="text-center mb-14">
          <p className="sec-tag justify-center reveal">Nossos Princípios</p>
          <h2 className="sec-title reveal reveal-d1">Os pilares da nossa <em>gestão</em></h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {PRINCIPIOS.map(({ Icon, title, desc }, i) => (
            <div key={title} className={`bg-white border border-teal/10 rounded-2xl shadow-sm p-7 hover:border-teal/25 transition-all reveal reveal-d${i % 3}`}>
              <div className="w-11 h-11 rounded-lg bg-teal/8 border border-teal/20 flex items-center justify-center text-teal mb-5">
                <Icon className="w-5 h-5" />
              </div>
              <h3 className="text-[0.92rem] font-semibold text-steel mb-2.5">{title}</h3>
              <p className="text-[0.9rem] font-light text-steel/60 leading-[1.75]">{desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Benefícios */}
      <SectionWrapper dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <div>
            <p className="sec-tag reveal">O que isso significa para você</p>
            <h2 className="sec-title reveal reveal-d1">
              Benefícios <em>concretos</em> da certificação
            </h2>
            <p className="text-[0.97rem] font-light text-steel/65 leading-[1.85] mt-5 reveal reveal-d2">
              Quando você escolhe a NU.V.E.M Medicina, não está apenas escolhendo um médico. Está
              escolhendo um sistema completo de qualidade que garante consistência,
              segurança e melhoria em cada visita.
            </p>
          </div>
          <div className="space-y-3 reveal reveal-d2">
            {BENEFICIOS.map((b, i) => (
              <div key={b} className={`flex items-start gap-3 text-[0.92rem] text-steel/65 reveal reveal-d${Math.min(i, 4)}`}>
                <span className="w-[18px] h-px bg-teal shrink-0 mt-3" />
                {b}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Biossegurança */}
      <SectionWrapper>
        <div className="max-w-3xl mx-auto text-center">
          <p className="sec-tag justify-center reveal">Biossegurança</p>
          <h2 className="sec-title reveal reveal-d1">Procedimentos Operacionais <em>Padrão</em></h2>
          <p className="text-[0.97rem] font-light text-steel/65 leading-[1.85] mt-5 mb-8 reveal reveal-d2">
            Todos os procedimentos de biossegurança da NU.V.E.M seguem os Procedimentos
            Operacionais Padrão (POPs) documentados e aprovados conforme a ISO 9001.
            Equipamentos são higienizados, esterilizados e rastreados entre cada uso,
            garantindo a máxima segurança para pacientes e colaboradores.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 reveal reveal-d3">
            {['Higienização certificada', 'Rastreabilidade de equipamentos', 'Treinamento contínuo da equipe'].map(item => (
              <div key={item} className="bg-white border border-teal/10 rounded-2xl shadow-sm p-5 text-[0.9rem] text-steel/60">
                <span className="block w-5 h-px bg-teal mb-3 mx-auto" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* Certificados */}
      <SectionWrapper dark grid>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Documentação Oficial</p>
          <h2 className="sec-title reveal reveal-d1">Certificados <em>ISO 9001</em></h2>
          <p className="text-[0.93rem] text-steel/65 mt-3 reveal reveal-d2 max-w-lg mx-auto">
            Certificações emitidas por organismo certificador independente, validando o sistema de gestão da qualidade da NU.V.E.M Medicina.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
          {[
            { src: '/images/2023-certificado-iso-9001-nuvem-medicina.svg', label: 'Certificado ISO 9001 · 2023' },
            { src: '/images/certificado-iso-9001-nuvem-medicina.svg',      label: 'Certificado ISO 9001 · Atual' },
          ].map((cert, i) => (
            <div key={cert.src} className={`bg-white border border-teal/12 rounded-2xl overflow-hidden shadow-sm hover:shadow-md hover:border-teal/25 transition-all reveal reveal-d${i}`}>
              <div className="relative w-full" style={{ aspectRatio: '1 / 1.414' }}>
                <Image
                  src={cert.src}
                  alt={cert.label}
                  fill
                  className="object-contain p-4"
                  unoptimized
                />
              </div>
              <div className="px-5 py-3 border-t border-teal/8 flex justify-end">
                <a
                  href={cert.src}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[0.72rem] font-medium text-teal hover:underline"
                >
                  Abrir ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Análise Crítica pela Direção */}
      <SectionWrapper>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Documentação Oficial</p>
          <h2 className="sec-title reveal reveal-d1">Análise Crítica <em>pela Direção</em></h2>
          <p className="text-[0.97rem] font-light text-steel/60 max-w-xl mx-auto mt-3 reveal reveal-d2">
            Documento formal de avaliação do Sistema de Gestão da Qualidade, conforme item 9.3 da ABNT NBR ISO 9001:2015.
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-2 reveal reveal-d2">

          {/* 1 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">01</span>
                <span className="text-[0.95rem] font-semibold text-steel">Contextualização e Fundamentação do SGQ</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82] space-y-4">
              <p>A Clínica NU.V.E.M – Medicina estruturou e implementou seu Sistema de Gestão da Qualidade (SGQ) como parte integrante de sua governança organizacional, com o objetivo de assegurar a confiabilidade dos processos assistenciais, a segurança do paciente, a conformidade regulatória e a sustentabilidade institucional em um ambiente de saúde caracterizado por elevada complexidade técnica, exigências normativas crescentes e expectativas cada vez mais qualificadas das partes interessadas.</p>
              <p>O SGQ foi desenvolvido em conformidade com os requisitos da ABNT NBR ISO 9001:2015, norma internacionalmente reconhecida, cuja finalidade é garantir que a organização seja capaz de planejar, executar, monitorar e melhorar sistematicamente seus processos, assegurando a entrega consistente de serviços que atendam aos requisitos contratuais, legais, regulamentares e às necessidades explícitas e implícitas dos clientes/pacientes.</p>
              <p>A adoção desse modelo de gestão representa uma decisão estratégica da Alta Direção, alinhada às boas práticas internacionais de qualidade, segurança e governança clínica, permitindo à NU.V.E.M:</p>
              <ul className="list-none space-y-2 pl-2">
                {['Estruturar seus processos com base na abordagem por processos e no pensamento baseado em riscos, conforme preconizado pela ISO 9001:2015;',
                  'Promover a padronização, rastreabilidade e controle operacional das atividades assistenciais e de apoio;',
                  'Monitorar o desempenho organizacional por meio de indicadores objetivos, auditorias e análises críticas sistemáticas;',
                  'Sustentar a melhoria contínua, a tomada de decisão baseada em evidências e o alinhamento com o direcionamento estratégico institucional.',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2"><span className="w-4 h-px bg-teal shrink-0 mt-3" />{item}</li>
                ))}
              </ul>
              <p>A Análise Crítica pela Direção constitui elemento central do SGQ, sendo o principal fórum formal de avaliação da eficácia do sistema, conforme estabelecido no item 9.3 da ABNT NBR ISO 9001:2015, permitindo que a Alta Direção avalie periodicamente o desempenho global do SGQ e delibere sobre ações estratégicas, corretivas e de melhoria.</p>
            </div>
          </details>

          {/* 2 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">02</span>
                <span className="text-[0.95rem] font-semibold text-steel">Objetivo e Escopo da Análise Crítica</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82] space-y-4">
              <p>A presente Análise Crítica tem por objetivo avaliar, de forma sistemática, documentada e baseada em evidências, a:</p>
              <ul className="list-none space-y-2 pl-2">
                {['Adequação do SGQ ao contexto interno e externo da organização;',
                  'Suficiência dos recursos, processos e controles implementados;',
                  'Eficácia do sistema em atingir os objetivos da qualidade e os resultados planejados;',
                  'Aderência aos requisitos da ABNT NBR ISO 9001:2015 e aos requisitos legais e regulamentares aplicáveis;',
                  'Coerência estratégica do SGQ com a missão, visão e valores da Clínica NU.V.E.M.',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2"><span className="w-4 h-px bg-teal shrink-0 mt-3" />{item}</li>
                ))}
              </ul>
              <p>Esta análise contempla as entradas e saídas formalmente definidas no Procedimento Gerencial PG 12 – Objetivos e Análise Crítica do SGQ, atendendo integralmente aos requisitos do item 9.3.2 e 9.3.3 da ISO 9001:2015.</p>
            </div>
          </details>

          {/* 3 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">03</span>
                <span className="text-[0.95rem] font-semibold text-steel">Referencial Normativo, Regulatório e Legal</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82] space-y-5">
              <p>A Análise Crítica foi conduzida considerando os seguintes referenciais de alto nível:</p>
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-teal mb-2">Normas internacionais e nacionais</p>
                <ul className="list-none space-y-1.5 pl-2">
                  {['ABNT NBR ISO 9001:2015 – Sistemas de Gestão da Qualidade – Requisitos',
                    'ABNT NBR ISO 9000:2015 – Sistemas de Gestão da Qualidade – Fundamentos e Vocabulário',
                    'ISO 9004:2018 – Quality management – Quality of an organization – Guidance to achieve sustained success',
                    'ISO 19011:2018 – Diretrizes para auditoria de sistemas de gestão',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2"><span className="w-4 h-px bg-teal shrink-0 mt-3" />{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-teal mb-2">Legislação e requisitos aplicáveis</p>
                <ul className="list-none space-y-1.5 pl-2">
                  {['Lei nº 13.709/2018 – Lei Geral de Proteção de Dados Pessoais (LGPD), com atualizações posteriores',
                    'Legislação sanitária federal, estadual e municipal aplicável aos serviços de saúde',
                    'Requisitos estatutários e regulamentares inerentes à prática médica, diagnóstica e assistencial',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2"><span className="w-4 h-px bg-teal shrink-0 mt-3" />{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-teal mb-2">Documentação interna</p>
                <ul className="list-none space-y-1.5 pl-2">
                  {['Plano de Gestão da Qualidade (PGQ)',
                    'Procedimentos Gerenciais (PGs)',
                    'Procedimentos Operacionais Padrão (POPs)',
                    'Registros e indicadores do SGQ',
                    'Lista Mestra de Documentos Internos e Externos',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2"><span className="w-4 h-px bg-teal shrink-0 mt-3" />{item}</li>
                  ))}
                </ul>
              </div>
            </div>
          </details>

          {/* 4 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">04</span>
                <span className="text-[0.95rem] font-semibold text-steel">Contexto da Organização e Partes Interessadas</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82] space-y-5">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-teal mb-2">4.1 Análise do Contexto Organizacional (ISO 9001:2015 – item 4.1)</p>
                <p className="mb-3">A Clínica NU.V.E.M atua na prestação de serviços médicos especializados em gastroenterologia, nutrologia e exames complementares voltados às doenças funcionais do trato gastrointestinal e intolerâncias alimentares, em ambiente ambulatorial especializado.</p>
                <p className="mb-2">Foram analisadas questões internas e externas relevantes que impactam a capacidade da organização em atingir os resultados pretendidos do SGQ, incluindo:</p>
                <ul className="list-none space-y-1.5 pl-2">
                  {['Estrutura organizacional e capacidade operacional;',
                    'Competência técnica e experiência da equipe multiprofissional;',
                    'Evolução tecnológica aplicada ao diagnóstico e acompanhamento clínico;',
                    'Exigências regulatórias e normativas do setor de saúde;',
                    'Expectativas crescentes dos pacientes quanto à qualidade, segurança e experiência assistencial.',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2"><span className="w-4 h-px bg-teal shrink-0 mt-3" />{item}</li>
                  ))}
                </ul>
                <p className="mt-3">Não foram identificadas alterações contextuais que comprometam a conformidade ou a eficácia do SGQ.</p>
              </div>
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-teal mb-2">4.2 Partes Interessadas (ISO 9001:2015 – item 4.2)</p>
                <p className="mb-2">Foram identificadas como partes interessadas relevantes:</p>
                <ul className="list-none space-y-1.5 pl-2">
                  {['Pacientes/clientes;',
                    'Corpo clínico e equipe multiprofissional;',
                    'Colaboradores administrativos;',
                    'Fornecedores e parceiros estratégicos;',
                    'Organismos reguladores e certificadores.',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2"><span className="w-4 h-px bg-teal shrink-0 mt-3" />{item}</li>
                  ))}
                </ul>
                <p className="mt-3">As necessidades e expectativas dessas partes são monitoradas por meio de feedbacks, indicadores de desempenho, auditorias e avaliações periódicas de conformidade.</p>
              </div>
            </div>
          </details>

          {/* 5 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">05</span>
                <span className="text-[0.95rem] font-semibold text-steel">Escopo do Sistema de Gestão da Qualidade</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82] space-y-3">
              <p>O escopo do SGQ da Clínica NU.V.E.M permanece definido como:</p>
              <p className="italic border-l-2 border-teal/40 pl-4 text-steel/75">Prestação de atendimentos clínicos nas áreas de gastroenterologia e nutrologia, bem como a realização de exames complementares relacionados às doenças funcionais do trato gastrointestinal e intolerâncias alimentares.</p>
              <p>O escopo está devidamente documentado, implementado e comunicado, atendendo aos requisitos do item 4.3 da ISO 9001:2015.</p>
            </div>
          </details>

          {/* 6 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">06</span>
                <span className="text-[0.95rem] font-semibold text-steel">Liderança, Política e Direcionamento Estratégico</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82] space-y-4">
              <p>A Alta Direção demonstra comprometimento contínuo com o SGQ, conforme item 5.1 da ISO 9001:2015, assegurando:</p>
              <ul className="list-none space-y-1.5 pl-2">
                {['Integração do SGQ aos processos estratégicos e assistenciais;',
                  'Disponibilização de recursos humanos, tecnológicos e financeiros adequados;',
                  'Promoção da cultura da qualidade e da melhoria contínua;',
                  'Comunicação eficaz da importância do atendimento aos requisitos do SGQ.',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2"><span className="w-4 h-px bg-teal shrink-0 mt-3" />{item}</li>
                ))}
              </ul>
              <p>A Política da Qualidade foi revisada nesta Análise Crítica e permanece apropriada ao contexto organizacional, alinhada ao direcionamento estratégico e comunicada a todas as partes pertinentes, conforme item 5.2 da norma.</p>
            </div>
          </details>

          {/* 7 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">07</span>
                <span className="text-[0.95rem] font-semibold text-steel">Planejamento, Riscos e Oportunidades</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82] space-y-3">
              <p>Em conformidade com o item 6.1 da ISO 9001:2015, a NU.V.E.M adota o pensamento baseado em riscos como princípio estruturante do SGQ. A ferramenta SWOT (FOFA) é utilizada para identificação, análise e tratamento de riscos e oportunidades estratégicas, com definição de ações mitigadoras e de melhoria.</p>
              <p>As ações planejadas demonstraram-se eficazes no período avaliado, não sendo identificados riscos críticos não tratados.</p>
            </div>
          </details>

          {/* 8 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">08</span>
                <span className="text-[0.95rem] font-semibold text-steel">Avaliação de Desempenho do SGQ</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82] space-y-5">
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-teal mb-3">8.1 Satisfação do Cliente (ISO 9001:2015 – item 9.1.2)</p>
                <p className="mb-3">No ano de 2024:</p>
                <div className="grid grid-cols-3 gap-3">
                  {[
                    { val: '9.670', label: 'Atendimentos realizados' },
                    { val: '2',     label: 'Reclamações registradas' },
                    { val: '0,02%', label: 'Índice de reclamações'   },
                  ].map(s => (
                    <div key={s.label} className="bg-teal/5 border border-teal/12 rounded-xl p-4 text-center">
                      <span className="block font-serif font-medium text-[1.45rem] text-teal mb-1">{s.val}</span>
                      <span className="text-[0.72rem] text-steel/55">{s.label}</span>
                    </div>
                  ))}
                </div>
                <p className="mt-3">Os dados indicam elevado nível de satisfação dos pacientes. A Direção deliberou pela elevação da meta mínima de satisfação para 95% no próximo ciclo avaliativo.</p>
              </div>
              <div>
                <p className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-teal mb-2">8.2 Não Conformidades e Ações Corretivas (ISO 9001:2015 – item 10.2)</p>
                <p className="mb-2">Foram registradas 3 não conformidades no período avaliado, todas:</p>
                <ul className="list-none space-y-1.5 pl-2">
                  {['Formalmente registradas;',
                    'Analisadas quanto à causa raiz;',
                    'Tratadas com ações corretivas apropriadas;',
                    'Monitoradas quanto à eficácia.',
                  ].map(item => (
                    <li key={item} className="flex items-start gap-2"><span className="w-4 h-px bg-teal shrink-0 mt-3" />{item}</li>
                  ))}
                </ul>
                <p className="mt-3">Não foi observada recorrência das não conformidades.</p>
              </div>
            </div>
          </details>

          {/* 9 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">09</span>
                <span className="text-[0.95rem] font-semibold text-steel">Auditorias Internas e Externas</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82] space-y-3">
              <p>As auditorias internas foram conduzidas conforme a ISO 19011:2018 e o procedimento interno PG 11, por auditor qualificado e independente.</p>
              <p>A auditoria externa conduzida pelo organismo certificador RINA confirmou a conformidade do SGQ com os requisitos da ABNT NBR ISO 9001:2015, destacando maturidade do sistema e oportunidades de melhoria já incorporadas.</p>
            </div>
          </details>

          {/* 10 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">10</span>
                <span className="text-[0.95rem] font-semibold text-steel">Saídas da Análise Crítica (ISO 9001:2015 – item 9.3.3)</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82] space-y-3">
              <p>Como resultado desta Análise Crítica, a Alta Direção deliberou:</p>
              <ul className="list-none space-y-1.5 pl-2">
                {['Manutenção e fortalecimento do SGQ;',
                  'Elevação da meta de satisfação do cliente para 95%;',
                  'Manutenção da certificação ISO 9001;',
                  'Continuidade do planejamento estratégico 2025;',
                  'Reforço da cultura de melhoria contínua e gestão de riscos;',
                  'Garantia da suficiência de recursos.',
                ].map(item => (
                  <li key={item} className="flex items-start gap-2"><span className="w-4 h-px bg-teal shrink-0 mt-3" />{item}</li>
                ))}
              </ul>
            </div>
          </details>

          {/* 11 */}
          <details className="group border border-teal/12 rounded-2xl overflow-hidden bg-white shadow-sm">
            <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-teal/3 transition-colors">
              <div className="flex items-center gap-3">
                <span className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal/50 shrink-0">11</span>
                <span className="text-[0.95rem] font-semibold text-steel">Conclusão</span>
              </div>
              <ChevronDown className="w-4 h-4 text-teal shrink-0 transition-transform duration-300 group-open:rotate-180" />
            </summary>
            <div className="px-6 pb-6 pt-1 border-t border-teal/8 text-[0.88rem] font-light text-steel/65 leading-[1.82]">
              <p>Com base nas evidências analisadas, conclui-se que o Sistema de Gestão da Qualidade da Clínica NU.V.E.M é <strong className="text-steel font-medium">adequado, suficiente, eficaz e plenamente conforme</strong> aos requisitos da ABNT NBR ISO 9001:2015, sustentando o desempenho organizacional, a segurança assistencial e a satisfação dos pacientes.</p>
            </div>
          </details>

        </div>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner
          title="Conheça o padrão ISO 9001 na prática"
          desc="Agende sua consulta e experimente o atendimento com qualidade internacionalmente certificada."
        />
      </SectionWrapper>
    </>
  )
}
