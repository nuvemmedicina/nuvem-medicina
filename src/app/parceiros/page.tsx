import type { Metadata } from 'next'
import Link    from 'next/link'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'

export const metadata: Metadata = {
  title:       'Profissionais Parceiros',
  description: 'Médicos e especialistas parceiros da NU.V.E.M Medicina em Belo Horizonte — encaminhamentos e laudos com padrão ISO 9001.',
}

export default function ParceirosPage() {
  return (
    <>
      <PageHero
        tag="Parceiros"
        title={<>Profissionais <em>Parceiros</em></>}
        desc="A NU.V.E.M mantém parceria com médicos e especialistas que encaminham pacientes e confiam em nossos laudos certificados ISO 9001."
      />

      <SectionWrapper>
        <div className="max-w-3xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
            {[
              { title: 'Encaminhamentos', desc: 'Recebemos pacientes encaminhados por médicos de qualquer especialidade. Laudos detalhados e comunicação clara com o médico solicitante.' },
              { title: 'Laudos ISO 9001', desc: 'Nossos laudos seguem padrão ISO 9001 — estruturados, rastreáveis e entregues dentro do prazo acordado.' },
              { title: 'Telemedicina Colaborativa', desc: 'Disponível para discussão de casos complexos com colegas médicos mediante solicitação prévia.' },
              { title: 'Formação Conjunta', desc: 'Parceiros do NU.V.E.M Ensino têm acesso a condições especiais nos programas de treinamento hands-on.' },
            ].map((item, i) => (
              <div key={item.title} className={`bg-white border border-teal/10 rounded-xl p-7 shadow-sm hover:border-teal/22 hover:-translate-y-0.5 transition-all reveal reveal-d${i % 2}`}>
                <span className="block w-5 h-px bg-teal mb-4" />
                <h3 className="text-[0.92rem] font-semibold text-steel mb-2">{item.title}</h3>
                <p className="text-[0.82rem] font-light text-steel/60 leading-[1.75]">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="border border-teal/15 rounded-xl p-8 text-center" style={{ background: 'rgba(203,228,230,0.18)' }}>
            <h3 className="text-[1rem] font-semibold text-steel mb-3">Quer ser parceiro da NU.V.E.M?</h3>
            <p className="text-[0.82rem] text-steel/60 mb-5 max-w-sm mx-auto">
              Entre em contato para estabelecer parceria formal de encaminhamentos e receba materiais informativos sobre nossos serviços.
            </p>
            <Link href="/contato" className="btn-gold inline-flex">
              Entrar em contato
            </Link>
          </div>

          <CtaBanner />
        </div>
      </SectionWrapper>
    </>
  )
}
