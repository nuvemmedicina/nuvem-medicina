import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CONTATO }        from '@/lib/data'

export const metadata: Metadata = {
  title:       'Direitos e Deveres do Paciente',
  description: 'Conheça seus direitos e deveres como paciente da NU.V.E.M Medicina — atendimento humanizado, privacidade, consentimento e muito mais.',
}

const DIREITOS = [
  {
    letra: 'A',
    titulo: 'Atendimento Humanizado e Identificação',
    cor: 'teal',
    itens: [
      {
        titulo: 'Identidade',
        desc: 'Você tem o direito de ser identificado pelo seu nome e sobrenome — nunca pelo nome da sua patologia, número de prontuário ou qualquer outra forma impessoal.',
      },
      {
        titulo: 'Respeito',
        desc: 'Receber atendimento livre de preconceitos de origem, raça, gênero, idade, orientação sexual ou qualquer outra forma de discriminação.',
      },
      {
        titulo: 'Dignidade',
        desc: 'Ter preservada sua privacidade e integridade física durante qualquer consulta, exame ou procedimento realizado na clínica.',
      },
    ],
    lei: 'Lei nº 14.737/2023',
  },
  {
    letra: 'B',
    titulo: 'Direito a Acompanhante',
    cor: 'gold',
    itens: [
      {
        titulo: 'Escolha livre',
        desc: 'É um direito garantido a toda mulher indicar um acompanhante de sua livre escolha para consultas, exames e procedimentos realizados na NU.V.E.M Medicina.',
      },
      {
        titulo: 'Procedimentos com sedação',
        desc: 'Em casos de exames ou procedimentos que exijam sedação, caso a paciente não traga acompanhante, a clínica indicará um profissional de saúde (preferencialmente feminino) para acompanhar todo o ato, garantindo segurança e conforto.',
      },
      {
        titulo: 'Transparência',
        desc: 'Este direito visa assegurar o bem-estar da paciente em todos os momentos dentro de nossa unidade.',
      },
    ],
    lei: null,
  },
  {
    letra: 'C',
    titulo: 'Informação e Consentimento',
    cor: 'teal',
    itens: [
      {
        titulo: 'Clareza',
        desc: 'Receber informações claras, objetivas e compreensíveis sobre diagnósticos, exames e tratamentos — incluindo riscos, benefícios e alternativas disponíveis.',
      },
      {
        titulo: 'Consentimento livre e esclarecido',
        desc: 'Dar ou negar seu consentimento livre e esclarecido antes de qualquer procedimento ou exame, sem pressão ou coerção.',
      },
      {
        titulo: 'Acesso ao prontuário',
        desc: 'Ter acesso ao seu prontuário médico de acordo com as normas do Conselho Federal de Medicina e da LGPD.',
      },
      {
        titulo: 'Segunda opinião',
        desc: 'Buscar uma segunda opinião médica sem que isso prejudique seu atendimento ou relacionamento com a clínica.',
      },
    ],
    lei: null,
  },
  {
    letra: 'D',
    titulo: 'Privacidade e Dados (LGPD)',
    cor: 'gold',
    itens: [
      {
        titulo: 'Sigilo médico',
        desc: 'Seus dados de saúde são protegidos pela Lei Geral de Proteção de Dados (LGPD — Lei nº 13.709/2018). Garantimos que suas informações sensíveis sejam utilizadas estritamente para o seu cuidado médico.',
      },
      {
        titulo: 'Não compartilhamento',
        desc: 'Suas informações nunca serão compartilhadas com terceiros sem sua autorização expressa, exceto quando exigido por lei ou órgão regulador.',
      },
      {
        titulo: 'Seus direitos de dados',
        desc: 'Você pode acessar, corrigir ou solicitar a eliminação dos seus dados a qualquer momento. Consulte nossa Política de Privacidade para detalhes.',
      },
    ],
    lei: 'LGPD — Lei nº 13.709/2018',
    linkLei: '/politica-de-privacidade',
  },
]

const DEVERES = [
  {
    num: '01',
    titulo: 'Informação verídica',
    desc: 'Fornecer informações precisas e completas sobre seu histórico de saúde, uso de medicamentos e alergias — isso é essencial para um diagnóstico seguro.',
  },
  {
    num: '02',
    titulo: 'Comprometimento com o preparo',
    desc: 'Seguir rigorosamente as recomendações de preparo para exames e as orientações médicas pós-atendimento. O preparo correto garante a precisão do diagnóstico.',
  },
  {
    num: '03',
    titulo: 'Respeito mútuo',
    desc: 'Tratar com cortesia e respeito todos os profissionais, colaboradores e demais pacientes da clínica. O respeito é a base de um ambiente seguro e acolhedor.',
  },
  {
    num: '04',
    titulo: 'Pontualidade',
    desc: 'Comparecer aos horários agendados ou avisar com antecedência mínima de 24 horas em caso de cancelamento, permitindo que outra pessoa seja atendida.',
  },
  {
    num: '05',
    titulo: 'Documentação',
    desc: 'Apresentar documentos necessários (pedido médico, carteirinha do convênio, documento de identidade) no dia do atendimento ou exame.',
  },
]

export default function DireitosPacientePage() {
  return (
    <>
      <PageHero
        tag="Transparência e Cuidado"
        title={<>Direitos e Deveres <em>do Paciente</em></>}
        desc="Na NU.V.E.M Medicina acreditamos que a base de um bom atendimento é o respeito mútuo e a clareza nas informações. Conheça seus direitos e como colaboramos para sua segurança."
      />

      {/* Intro */}
      <SectionWrapper dark>
        <div className="max-w-3xl mx-auto text-center">
          <div className="inline-flex items-center gap-3 bg-gold-dim border border-gold-line rounded-xl px-6 py-4 mb-8 reveal">
            <span className="text-2xl">⚖️</span>
            <p className="text-[0.88rem] text-gold font-medium">
              Seu cuidado começa pelo respeito aos seus direitos
            </p>
          </div>
          <p className="text-[0.9rem] font-light text-muted leading-[1.9] reveal reveal-d1">
            Estes direitos são garantidos pela legislação brasileira, pelo Conselho Federal de
            Medicina e pelos valores que fundamentam o atendimento da NU.V.E.M Medicina.
            Conhecê-los é o primeiro passo para uma relação de confiança e cuidado mútuo.
          </p>
        </div>
      </SectionWrapper>

      {/* Direitos */}
      <SectionWrapper>
        <div className="text-center mb-14">
          <p className="sec-tag justify-center reveal">Seus Direitos</p>
          <h2 className="sec-title reveal reveal-d1">
            Pilares do atendimento <em>humanizado</em>
          </h2>
        </div>

        <div className="space-y-6 max-w-4xl mx-auto">
          {DIREITOS.map((d, di) => (
            <div
              key={d.letra}
              className={`bg-deep border rounded-2xl overflow-hidden reveal reveal-d${di % 2} ${d.cor === 'gold' ? 'border-gold/20' : 'border-teal-light/[0.08]'}`}
            >
              {/* Header */}
              <div
                className="px-8 py-5 flex items-center gap-4"
                style={{
                  background: d.cor === 'gold'
                    ? 'linear-gradient(135deg, rgba(201,168,76,0.08), transparent)'
                    : 'linear-gradient(135deg, rgba(0,70,95,0.3), transparent)',
                }}
              >
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-[1rem] font-bold shrink-0"
                  style={{
                    background: d.cor === 'gold' ? 'rgba(201,168,76,0.15)' : 'rgba(0,70,95,0.4)',
                    color: d.cor === 'gold' ? '#C9A84C' : '#CBE4E6',
                    border: `1px solid ${d.cor === 'gold' ? 'rgba(201,168,76,0.3)' : 'rgba(203,228,230,0.15)'}`,
                  }}
                >
                  {d.letra}
                </div>
                <div className="flex-1">
                  <h3 className="text-[1rem] font-semibold text-white">{d.titulo}</h3>
                  {d.lei && (
                    <span className="text-[0.68rem] font-medium text-faint">
                      {d.linkLei ? (
                        <Link href={d.linkLei} className="hover:text-teal-light transition-colors">
                          {d.lei} ↗
                        </Link>
                      ) : d.lei}
                    </span>
                  )}
                </div>
              </div>

              {/* Items */}
              <div className="px-8 pb-6 grid grid-cols-1 md:grid-cols-2 gap-4 pt-4">
                {d.itens.map((item) => (
                  <div key={item.titulo} className="flex items-start gap-3">
                    <span
                      className="w-1.5 h-1.5 rounded-full mt-2 shrink-0"
                      style={{ background: d.cor === 'gold' ? '#C9A84C' : '#CBE4E6' }}
                    />
                    <div>
                      <p className="text-[0.85rem] font-semibold text-white mb-1">{item.titulo}</p>
                      <p className="text-[0.8rem] font-light text-muted leading-[1.7]">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Deveres */}
      <SectionWrapper dark>
        <div className="text-center mb-12">
          <p className="sec-tag justify-center reveal">Seus Deveres</p>
          <h2 className="sec-title reveal reveal-d1">
            Para um cuidado <em>completo</em>
          </h2>
          <p className="text-[0.88rem] text-muted mt-3 max-w-lg mx-auto reveal reveal-d2">
            A colaboração do paciente é fundamental para garantir a qualidade e a precisão do atendimento.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 max-w-4xl mx-auto">
          {DEVERES.map((d, i) => (
            <div
              key={d.num}
              className={`bg-ink border border-teal-light/[0.08] rounded-xl p-7 hover:border-teal-light/25 transition-all reveal reveal-d${i % 3}`}
            >
              <span className="font-serif text-[3rem] font-light text-teal-light/10 leading-none block mb-4">
                {d.num}
              </span>
              <h3 className="text-[0.92rem] font-semibold text-white mb-3">{d.titulo}</h3>
              <p className="text-[0.8rem] font-light text-muted leading-[1.75]">{d.desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Fale conosco */}
      <SectionWrapper>
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-4xl block mb-6">💬</span>
          <p className="sec-tag justify-center reveal">Queremos te ouvir</p>
          <h2 className="sec-title reveal reveal-d1 mb-4">
            Algo não foi como <em>esperado?</em>
          </h2>
          <p className="text-[0.88rem] font-light text-muted leading-[1.85] mb-8 reveal reveal-d2">
            Se você sente que algum destes direitos não foi respeitado, ou tem sugestões para
            melhorarmos nossa experiência, entre em contato. Sua opinião é parte essencial
            do nosso Sistema de Gestão da Qualidade ISO 9001.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8 reveal reveal-d3">
            <a
              href={CONTATO.whatsappUrl}
              target="_blank" rel="noopener noreferrer"
              className="flex flex-col items-center gap-2 bg-deep border border-teal-light/[0.08] rounded-xl p-5 hover:border-gold/30 transition-all group"
            >
              <span className="text-2xl">📱</span>
              <span className="text-[0.82rem] font-semibold text-white">{CONTATO.whatsapp}</span>
              <span className="text-[0.7rem] text-faint">WhatsApp</span>
            </a>
            <a
              href={`tel:${CONTATO.telefone.replace(/\D/g,'')}`}
              className="flex flex-col items-center gap-2 bg-deep border border-teal-light/[0.08] rounded-xl p-5 hover:border-gold/30 transition-all"
            >
              <span className="text-2xl">📞</span>
              <span className="text-[0.82rem] font-semibold text-white">{CONTATO.telefone}</span>
              <span className="text-[0.7rem] text-faint">Telefone</span>
            </a>
            <a
              href={`mailto:${CONTATO.email}`}
              className="flex flex-col items-center gap-2 bg-deep border border-teal-light/[0.08] rounded-xl p-5 hover:border-gold/30 transition-all"
            >
              <span className="text-2xl">✉️</span>
              <span className="text-[0.82rem] font-semibold text-white truncate w-full text-center">{CONTATO.email}</span>
              <span className="text-[0.7rem] text-faint">E-mail</span>
            </a>
          </div>

          {/* Responsáveis técnicos */}
          <div className="bg-deep border border-teal-light/[0.08] rounded-xl p-6 text-left reveal reveal-d4">
            <p className="text-[0.68rem] font-bold uppercase tracking-[.1em] text-faint mb-4">Responsáveis Técnicos</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <Link href="/equipe/dra-vera" className="text-[0.85rem] font-semibold text-white hover:text-gold transition-colors">
                  Dra. Vera Ângelo
                </Link>
                <p className="text-[0.72rem] text-faint mt-0.5">CRM 22284 MG · RQE 10411 · RQE 22736</p>
                <p className="text-[0.72rem] text-muted mt-0.5">Diretora Técnica</p>
              </div>
              <div>
                <Link href="/equipe/dra-eliane" className="text-[0.85rem] font-semibold text-white hover:text-gold transition-colors">
                  Dra. Eliane Basques Moura
                </Link>
                <p className="text-[0.72rem] text-faint mt-0.5">CRM 27601 MG · RQE 9324</p>
                <p className="text-[0.72rem] text-muted mt-0.5">Diretora Técnica Substituta</p>
              </div>
            </div>
            <p className="text-[0.7rem] text-faint mt-4 pt-4 border-t border-teal-light/[0.06]">
              Inscrita sob CRM n° 0020532-MG · CNPJ 42.678.705/0001-02
            </p>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
