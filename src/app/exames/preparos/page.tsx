import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'

export const metadata: Metadata = {
  title:       'Preparos para Exames',
  description: 'Guia completo de como se preparar para os exames da NU.V.E.M Medicina — manometria, pHmetria, testes respiratórios, halimetria e avaliação pélvica.',
}

const PREPAROS = [
  {
    exame: 'Manometria de Alta Resolução', slug: 'manometria',
    itens: ['Jejum de 6 horas antes do exame', 'Suspender medicamentos que afetam motilidade (com orientação médica)', 'Usar roupa confortável e calça que possa ser abaixada', 'Trazer o pedido médico e exames anteriores'],
  },
  {
    exame: 'pHmetria e Impedânciometria', slug: 'phmetria',
    itens: ['Suspender IBPs por 7 dias (apenas com orientação do médico solicitante)', 'Suspender antiácidos 24 horas antes', 'Jejum de 4 horas antes da instalação do cateter', 'Manter atividade normal durante as 24 horas de monitoramento', 'Registrar sintomas e refeições no diário fornecido pela clínica'],
  },
  {
    exame: 'Testes Respiratórios', slug: 'respiratorio',
    itens: ['Jejum de 12 horas antes do exame (somente água é permitida)', 'Dieta específica no dia anterior: sem grãos, leguminosas, vegetais crucíferos, frutas com alto teor de fibras ou açúcares fermentáveis', 'Não usar antibióticos nas 4 semanas anteriores ao exame', 'Não usar probióticos nas 2 semanas anteriores', 'Não escovar dentes com creme dental 30 minutos antes', 'Não fumar 1 hora antes', 'Não praticar exercícios intensos 1 hora antes'],
  },
  {
    exame: 'Halimetria e Sialometria', slug: 'halimetria',
    itens: ['Não comer nas 3 horas anteriores ao exame', 'Não escovar dentes nas 2 horas anteriores', 'Não usar enxaguante bucal ou spray bucal no dia do exame', 'Não fumar 2 horas antes', 'Não usar perfume ou desodorante com fragrância forte', 'Beber água normalmente é permitido'],
  },
  {
    exame: 'Avaliação Pélvica', slug: 'pelvico',
    itens: ['Não é necessário jejum', 'Usar roupa confortável e de fácil remoção', 'Realizar higiene íntima normal no dia', 'Trazer exames anteriores se houver (manometria anorretal, ultrassom pélvico etc.)', 'Informar à equipe o uso de qualquer medicamento'],
  },
]

export default function PreparosPage() {
  return (
    <>
      <PageHero
        tag="Preparos para Exames"
        title={<>Como se <em>preparar</em> para os exames</>}
        desc="Siga as orientações abaixo para garantir a máxima qualidade e precisão nos seus exames. Em caso de dúvida, entre em contato antes do dia agendado."
      />

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
          {/* Index */}
          <div className="lg:col-span-1">
            <div className="bg-deep border border-teal-light/[0.08] rounded-xl p-6 sticky top-24">
              <h2 className="text-[0.72rem] font-bold uppercase tracking-[.1em] text-faint mb-4">Exames</h2>
              <div className="space-y-1">
                {PREPAROS.map(p => (
                  <a key={p.slug} href={`#${p.slug}`}
                    className="flex items-center gap-2 p-2.5 rounded-lg text-[0.82rem] text-muted hover:text-white hover:bg-teal-light/5 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-gold/50" />
                    {p.exame}
                  </a>
                ))}
              </div>
              <div className="mt-6 pt-5 border-t border-teal-light/[0.07]">
                <p className="text-[0.72rem] text-faint mb-3">Dúvidas sobre o preparo?</p>
                <Link href="/contato" className="btn-ghost w-full justify-center text-[0.78rem] py-2.5">
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            {PREPAROS.map((p, i) => (
              <div key={p.slug} id={p.slug} className={`bg-deep border border-teal-light/[0.08] rounded-2xl p-8 reveal reveal-d${i % 2}`}>
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-[1rem] font-semibold text-white">{p.exame}</h2>
                  <Link href={`/exames/${p.slug}`} className="text-[0.72rem] text-gold hover:underline shrink-0">
                    Ver exame →
                  </Link>
                </div>
                <div className="space-y-3">
                  {p.itens.map((item, j) => (
                    <div key={j} className="flex items-start gap-3 text-[0.83rem] text-muted">
                      <span className="w-5 h-5 rounded-full bg-teal/20 text-teal-light text-[0.65rem] font-semibold flex items-center justify-center shrink-0 mt-0.5">{j+1}</span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Important notice */}
            <div className="bg-gold-dim border border-gold-line rounded-xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-gold text-xl mt-0.5">⚠</span>
                <div>
                  <h3 className="text-[0.88rem] font-semibold text-white mb-2">Informação importante</h3>
                  <p className="text-[0.8rem] text-muted leading-relaxed">
                    As orientações acima são gerais. Seu médico poderá indicar preparos específicos
                    conforme seu caso clínico. Em caso de dúvida, entre em contato com nossa equipe
                    antes do exame.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <CtaBanner title="Agendar seus exames" desc="Marque seu exame com antecedência e receba as orientações de preparo personalizadas por WhatsApp." />
      </SectionWrapper>
    </>
  )
}
