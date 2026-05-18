import type { Metadata } from 'next'
import Link from 'next/link'
import { Download, ArrowRight } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'

export const metadata: Metadata = {
  title:       'Preparos para Exames',
  description: 'Guia completo de como se preparar para os exames da NU.V.E.M Medicina — manometria esofágica, manometria anorretal, pHmetria, testes respiratórios, halimetria e avaliação pélvica.',
}

const PREPAROS = [
  {
    exame:   'Manometria Esofágica',
    slug:    'manometria-esofagica',
    pdfUrl:  '/pdfs/preparo-manometria-esofagica-v1.pdf',
    itens: [
      'Jejum de 6 horas antes do exame',
      'Suspender medicamentos que afetam motilidade esofágica (com orientação médica)',
      'Usar roupa confortável',
      'Trazer o pedido médico e exames anteriores',
    ],
  },
  {
    exame:   'Manometria Anorretal',
    slug:    'manometria-anorretal',
    pdfUrl:  '/pdfs/preparo-manometria-anorretal-v1.pdf',
    itens: [
      'Realizar enema de limpeza (Minilax® ou similar) 1–2 horas antes do exame',
      'Não é necessário jejum',
      'Usar roupa confortável e calça que possa ser abaixada',
      'Trazer o pedido médico e exames anteriores',
      'Informar à equipe o uso de qualquer medicamento',
    ],
  },
  {
    exame:   'pHmetria e Impedânciometria',
    slug:    'phmetria-impedanciometria',
    pdfUrl:  '/pdfs/preparo-phmetria-impedanciometria-v1.pdf',
    itens: [
      'Suspender IBPs por 7 dias (apenas com orientação do médico solicitante)',
      'Suspender antiácidos 24 horas antes',
      'Jejum de 4 horas antes da instalação do cateter',
      'Manter atividade normal durante as 24 horas de monitoramento',
      'Registrar sintomas e refeições no diário fornecido pela clínica',
    ],
  },
  {
    exame:   'Testes Respiratórios',
    slug:    'testes-respiratorios',
    pdfUrl:  '/pdfs/preparo-teste-respiratorio-sibo-imo-v1.pdf',
    pdfExtra: { label: 'Preparo H. pylori', url: '/pdfs/preparo-teste-respiratorio-hpylori-v1.pdf' },
    itens: [
      'Jejum de 12 horas antes do exame (somente água é permitida)',
      'Dieta específica no dia anterior: sem grãos, leguminosas, vegetais crucíferos, frutas com alto teor de fibras ou açúcares fermentáveis',
      'Não usar antibióticos nas 4 semanas anteriores ao exame',
      'Não usar probióticos nas 2 semanas anteriores',
      'Não escovar dentes com creme dental 30 minutos antes',
      'Não fumar 1 hora antes',
      'Não praticar exercícios intensos 1 hora antes',
    ],
  },
  {
    exame:   'Halimetria e Sialometria',
    slug:    'halimetria-sialometria',
    pdfUrl:  '/pdfs/preparo-halimetria-sialometria-v1.pdf',
    itens: [
      'Não comer nas 3 horas anteriores ao exame',
      'Não escovar dentes nas 2 horas anteriores',
      'Não usar enxaguante bucal ou spray bucal no dia do exame',
      'Não fumar 2 horas antes',
      'Não usar perfume ou desodorante com fragrância forte',
      'Beber água normalmente é permitido',
    ],
  },
  {
    exame:   'Avaliação Pélvica',
    slug:    'avaliacao-pelvica',
    pdfUrl:  '/pdfs/preparo-avaliacao-pelvica-v1.pdf',
    itens: [
      'Não é necessário jejum',
      'Usar roupa confortável e de fácil remoção',
      'Realizar higiene íntima normal no dia',
      'Trazer exames anteriores se houver (manometria anorretal, ultrassom pélvico etc.)',
      'Informar à equipe o uso de qualquer medicamento',
    ],
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

      <SectionWrapper mist>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

          {/* Sidebar índice */}
          <div className="lg:col-span-1">
            <div className="bg-white border border-teal/12 rounded-2xl p-6 sticky top-24 shadow-sm">
              <h2 className="text-[0.75rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-4">Exames</h2>

              {/* Download all button */}
              <div className="bg-teal/6 border border-teal/15 rounded-xl p-3.5 mb-4">
                <p className="text-[0.75rem] text-steel/55 mb-2.5 leading-snug">
                  Baixe o preparo de qualquer exame em PDF:
                </p>
                <div className="flex flex-col gap-1.5">
                  {PREPAROS.map(p => (
                    <a
                      key={p.slug}
                      href={p.pdfUrl}
                      download
                      className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-[0.75rem] text-teal hover:bg-teal hover:text-white transition-all group"
                    >
                      <Download className="w-3 h-3 shrink-0" />
                      {p.exame}
                    </a>
                  ))}
                </div>
              </div>

              <div className="space-y-1">
                {PREPAROS.map(p => (
                  <a key={p.slug} href={`#${p.slug}`}
                    className="flex items-center gap-2 p-2.5 rounded-xl text-[0.88rem] text-steel/55 hover:text-teal hover:bg-teal/5 transition-colors">
                    <span className="w-1.5 h-1.5 rounded-full bg-teal/40" />
                    {p.exame}
                  </a>
                ))}
              </div>

              <div className="mt-6 pt-5 border-t border-teal/8">
                <p className="text-[0.78rem] text-steel/40 mb-3">Dúvidas sobre o preparo?</p>
                <Link href="/contato" className="btn-ghost w-full justify-center text-[0.88rem] py-2.5">
                  Fale conosco
                </Link>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-6">
            {PREPAROS.map((p, i) => (
              <div
                key={p.slug}
                id={p.slug}
                className={`bg-white border border-teal/10 rounded-2xl p-8 shadow-sm reveal reveal-d${i % 2}`}
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                  <h2 className="text-[1.1rem] font-semibold text-steel">{p.exame}</h2>
                  <div className="flex flex-wrap items-center gap-2 shrink-0">
                    {/* Download PDF */}
                    <a
                      href={p.pdfUrl}
                      download
                      className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-teal bg-teal/8 border border-teal/18 px-3.5 py-2 rounded-lg hover:bg-teal hover:text-white hover:border-teal transition-all"
                    >
                      <Download className="w-3.5 h-3.5" />
                      Baixar PDF
                    </a>
                    {/* Extra PDF (e.g. H. pylori) */}
                    {'pdfExtra' in p && p.pdfExtra && (
                      <a
                        href={(p.pdfExtra as { url: string }).url}
                        download
                        className="inline-flex items-center gap-1.5 text-[0.78rem] font-semibold text-gold bg-gold/8 border border-gold/20 px-3.5 py-2 rounded-lg hover:bg-gold hover:text-white hover:border-gold transition-all"
                      >
                        <Download className="w-3.5 h-3.5" />
                        {(p.pdfExtra as { label: string }).label}
                      </a>
                    )}
                    <Link href={`/exames/${p.slug}`} className="text-[0.78rem] text-steel/40 hover:text-teal transition-colors flex items-center gap-1">
                      Ver exame <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {/* Steps */}
                <div className="space-y-3">
                  {p.itens.map((item, j) => (
                    <div key={j} className="flex items-start gap-3 text-[0.9rem] text-steel/65">
                      <span className="w-6 h-6 rounded-full bg-teal/12 text-teal text-[0.68rem] font-semibold flex items-center justify-center shrink-0 mt-0.5 border border-teal/18">
                        {j + 1}
                      </span>
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            ))}

            {/* Important notice */}
            <div className="bg-gold/8 border border-gold/25 rounded-2xl p-6">
              <div className="flex items-start gap-3">
                <span className="text-gold text-2xl mt-0.5">⚠</span>
                <div>
                  <h3 className="text-[0.95rem] font-semibold text-steel mb-2">Informação importante</h3>
                  <p className="text-[0.88rem] text-steel/65 leading-relaxed">
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
