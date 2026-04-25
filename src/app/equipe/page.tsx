import type { Metadata } from 'next'
import { PageHero }      from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }     from '@/components/ui/CtaBanner'

export const metadata: Metadata = {
  title:       'Equipe',
  description: 'Conheça os médicos e especialistas da NU.V.E.M Medicina — gastroenterologistas, fisioterapeuta pélvica, pediatra e nefrologista.',
}

const EQUIPE = [
  {
    nome:     'Dra. Vera Ângelo',
    cargo:    'Diretora Técnica',
    esp:      'Gastroenterologista',
    crm:      'CRM-MG 22284 · RQE 10411 · RQE 22736',
    destaque: true,
    areas:    ['Testes Respiratórios H₂/CH₄/H₂S', 'Intolerâncias Alimentares', 'SIBO e Disbiose', 'Doenças Funcionais Digestivas'],
    bio:      'Especialista em doenças funcionais do aparelho digestivo, com vasta experiência em testes respiratórios e diagnóstico avançado de SIBO. Fundadora da NU.V.E.M e referência nacional em ensino de testes respiratórios.',
  },
  {
    nome:  'Dr. Felipe Nelson',
    cargo: 'Gastroenterologista',
    esp:   'Gastroenterologia',
    crm:   'Consulte CRM-MG',
    areas: ['Manometria de Alta Resolução', 'pHmetria Esofágica', 'Impedânciometria', 'Motilidade Digestiva'],
    bio:   'Especialista em distúrbios da motilidade esofágica e anorretal, com expertise em exames de alta resolução e diagnóstico avançado de refluxo.',
  },
  {
    nome:  'Dra. Karol Rocha',
    cargo: 'Fisioterapeuta Pélvica',
    esp:   'Fisioterapia Pélvica',
    crm:   'Consulte CREFITO',
    areas: ['Disfunções do Assoalho Pélvico', 'Biofeedback Eletromiográfico', 'Treinamento Vesical', 'Incontinência Urinária/Fecal'],
    bio:   'Especialista em reabilitação do assoalho pélvico com integração gastroenterológica, tratando disfunções pélvicas complexas com abordagem multidisciplinar.',
  },
  {
    nome:  'Dra. Eliane Basques Moura',
    cargo: 'Diretora Técnica Substituta',
    esp:   'Cirurgia Pediátrica',
    crm:   'CRM-MG 27601 · RQE 9324',
    areas: ['Cirurgia Pediátrica', 'Casos Interdisciplinares', 'Visão Cirúrgica Integrada', 'Saúde Digestiva Infantil'],
    bio:   'Cirurgiã pediátrica com experiência em casos interdisciplinares complexos, atuando na interface entre gastroenterologia e cirurgia em pacientes pediátricos.',
  },
]

export default function EquipePage() {
  return (
    <>
      <PageHero
        tag="Nossa Equipe"
        title={<>Especialistas dedicados à sua <em>saúde digestiva</em></>}
        desc="Médicos e especialistas altamente qualificados, unidos pela tecnologia diagnóstica de ponta e pela excelência no cuidado com o paciente."
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {EQUIPE.map((m, i) => (
            <div
              key={m.nome}
              className={`bg-deep border rounded-2xl p-8 hover:-translate-y-1 transition-all reveal reveal-d${i % 2} ${m.destaque ? 'border-gold/25 bg-gradient-to-br from-deep to-[rgba(201,168,76,0.04)]' : 'border-teal-light/[0.08]'}`}
            >
              {/* Avatar */}
              <div className="flex items-start gap-5 mb-6">
                <div className={`w-16 h-16 rounded-full flex items-center justify-center text-xl font-semibold shrink-0 ${m.destaque ? 'bg-gold-dim border border-gold/35 text-gold' : 'bg-teal border-teal-mid text-teal-light border'}`}>
                  {m.nome.replace('Dr. ','').replace('Dra. ','').split(' ').slice(0,2).map(w=>w[0]).join('')}
                </div>
                <div>
                  {m.destaque && (
                    <span className="text-[0.65rem] font-bold uppercase tracking-[.12em] text-gold bg-gold-dim border border-gold-line px-2.5 py-0.5 rounded-full inline-block mb-2">
                      {m.cargo}
                    </span>
                  )}
                  <h2 className="text-[1.05rem] font-semibold text-white">{m.nome}</h2>
                  <p className="text-[0.82rem] text-gold mt-0.5">{m.esp}</p>
                  <p className="text-[0.7rem] text-faint mt-0.5">{m.crm}</p>
                </div>
              </div>

              <p className="text-[0.82rem] font-light text-muted leading-[1.75] mb-5">{m.bio}</p>

              <div>
                <p className="text-[0.68rem] font-bold uppercase tracking-[.1em] text-faint mb-3">Áreas de atuação</p>
                <div className="flex flex-wrap gap-2">
                  {m.areas.map(a => (
                    <span key={a} className="text-[0.68rem] font-medium px-2.5 py-1 rounded-full bg-teal-light/[0.06] border border-teal-light/10 text-faint">
                      {a}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <CtaBanner
          title="Consulte nossos especialistas"
          desc="Agende com o especialista ideal para o seu caso. Nossa equipe está pronta para orientá-lo."
        />
      </SectionWrapper>
    </>
  )
}
