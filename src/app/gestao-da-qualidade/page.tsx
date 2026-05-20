import type { Metadata } from 'next'
import Image             from 'next/image'
import { PageHero }      from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }     from '@/components/ui/CtaBanner'
import { IsoSeal }       from '@/components/icons/IsoSeal'
import { CONTATO }       from '@/lib/data'
import { CheckCircle, Shield, FileText, BarChart3, RefreshCw, Users } from 'lucide-react'

export const metadata: Metadata = {
  title:       'Gestão da Qualidade · ISO 9001',
  description: 'Conheça o sistema de gestão da qualidade ISO 9001 da NU.V.E.M Medicina, única clínica do segmento certificada em Belo Horizonte.',
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
        desc="Somos a única clínica do segmento em Belo Horizonte com gestão certificada pela norma ISO 9001, o padrão internacional de excelência em qualidade."
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
                <strong className="text-steel font-medium">Somos a única clínica do segmento
                de gastroenterologia e diagnóstico digestivo em Belo Horizonte</strong> a possuir
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

      <SectionWrapper>
        <CtaBanner
          title="Conheça o padrão ISO 9001 na prática"
          desc="Agende sua consulta e experimente o atendimento com qualidade internacionalmente certificada."
        />
      </SectionWrapper>
    </>
  )
}
