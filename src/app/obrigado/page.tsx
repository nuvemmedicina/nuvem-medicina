import type { Metadata } from 'next'
import Link from 'next/link'
import { Check, MessageCircle, Phone, MapPin, Clock, FileText, ArrowRight } from 'lucide-react'
import { CONTATO } from '@/lib/data'
import { ConversaoTag } from './ConversaoTag'

export const metadata: Metadata = {
  alternates:  { canonical: '/obrigado' },
  title:       'Solicitação Recebida',
  description: 'Recebemos sua solicitação de agendamento. Nossa equipe entrará em contato em até 24h.',
  // Página de conversão: não deve aparecer nos resultados de busca
  robots: {
    index:     false,
    follow:    true,
    googleBot: { index: false, follow: true },
  },
}

const PROXIMOS_PASSOS = [
  {
    num:   '01',
    title: 'Confirmação de recebimento',
    desc:  'Sua solicitação já está na fila de atendimento da nossa secretaria.',
  },
  {
    num:   '02',
    title: 'Contato em até 24h',
    desc:  'Ligamos ou enviamos mensagem no WhatsApp para confirmar data, horário e convênio.',
  },
  {
    num:   '03',
    title: 'Orientações de preparo',
    desc:  'Se o seu atendimento for um exame, enviamos o preparo completo antes da data marcada.',
  },
]

export default function ObrigadoPage() {
  return (
    <div className="min-h-screen pt-[76px]">
      <ConversaoTag />

      {/* Hero */}
      <div
        className="py-20 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #00465F 0%, #0e7fa5 100%)' }}
      >
        <div className="absolute inset-0 hero-grid-bg opacity-30" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-8">
          <div className="w-16 h-16 rounded-full bg-white/12 border border-white/25 flex items-center justify-center text-white mx-auto mb-6">
            <Check className="w-7 h-7" strokeWidth={2.5} />
          </div>
          <p className="sec-tag justify-center mb-4 text-white/80">Agendamento</p>
          <h1
            className="font-serif font-light text-white leading-tight tracking-tight"
            style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)' }}
          >
            Obrigada pelo seu <em className="italic">contato</em>
          </h1>
          <p className="text-[1rem] font-light text-white/70 mt-4 max-w-lg mx-auto leading-relaxed">
            Recebemos sua solicitação de agendamento. Nossa equipe entrará em contato
            em até 24h para confirmar todos os detalhes.
          </p>

          <div className="flex flex-wrap gap-4 justify-center mt-10">
            <a
              href={CONTATO.whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-white text-teal font-semibold text-base px-8 py-4 rounded-xl transition-all hover:-translate-y-0.5 hover:shadow-lg"
            >
              <MessageCircle className="w-[18px] h-[18px]" />
              Falar agora no WhatsApp
            </a>
            <a
              href={`tel:${CONTATO.telefone.replace(/\D/g, '')}`}
              className="btn-ghost-dark"
            >
              <Phone className="w-[18px] h-[18px]" />
              {CONTATO.telefone}
            </a>
          </div>
        </div>
      </div>

      {/* Próximos passos */}
      <div className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-8">
          <div className="text-center max-w-xl mx-auto mb-14">
            <p className="sec-tag justify-center">O que acontece agora</p>
            <h2 className="font-serif font-light text-steel text-[1.9rem] leading-snug">
              Os próximos passos
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {PROXIMOS_PASSOS.map(passo => (
              <div key={passo.num} className="card-light p-8">
                <div className="h-px teal-line mb-6" />
                <span className="block font-serif text-[1.6rem] text-teal/35 leading-none mb-4">
                  {passo.num}
                </span>
                <h3 className="text-[1.05rem] font-semibold text-steel mb-2">{passo.title}</h3>
                <p className="text-[0.92rem] font-light text-steel/60 leading-relaxed">{passo.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Dados da clínica + próximos cliques */}
      <div className="py-20 bg-cloud">
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

          <div>
            <p className="sec-tag">A Clínica</p>
            <h2 className="font-serif font-light text-steel text-[1.8rem] leading-snug mb-4">
              Onde vamos<br />receber você
            </h2>
            <p className="text-[0.97rem] font-light text-steel/60 leading-relaxed mb-10">
              Guarde nossos dados — eles também chegam por WhatsApp junto com a confirmação.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { Icon: MapPin, label: 'Endereço', values: [CONTATO.endereco, `${CONTATO.bairro} · ${CONTATO.cep}`], href: [CONTATO.maps, CONTATO.maps] },
                { Icon: Clock,  label: 'Horário',  values: [CONTATO.horario], href: ['#'] },
                { Icon: Phone,  label: 'Telefone / WhatsApp', values: [CONTATO.telefone, CONTATO.whatsapp], href: [`tel:${CONTATO.telefone.replace(/\D/g, '')}`, CONTATO.whatsappUrl] },
              ].map(({ Icon, label, values, href }) => (
                <div key={label} className="flex gap-3.5 items-start p-4 bg-white border border-teal/10 rounded-2xl shadow-sm">
                  <div className="w-10 h-10 rounded-lg bg-teal/8 flex items-center justify-center text-teal shrink-0">
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <strong className="block text-[0.72rem] font-semibold uppercase tracking-[.06em] text-steel/45 mb-1">{label}</strong>
                    {values.map((v, i) => (
                      <a key={v} href={href[i]} className="block text-[0.93rem] text-steel hover:text-teal transition-colors">{v}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <p className="sec-tag">Enquanto isso</p>
            <h2 className="font-serif font-light text-steel text-[1.8rem] leading-snug mb-4">
              Conheça um pouco<br />mais da NU.V.E.M
            </h2>
            <p className="text-[0.97rem] font-light text-steel/60 leading-relaxed mb-10">
              Conteúdos que ajudam a chegar preparado para a sua consulta ou exame.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { href: '/exames/preparos',      title: 'Preparos para exames',    desc: 'Orientações completas para cada exame realizado na clínica.' },
                { href: '/especialidades',       title: 'Nossas especialidades',   desc: 'Gastroenterologia, motilidade digestiva, fisioterapia pélvica e mais.' },
                { href: '/convenios-medicos',    title: 'Convênios atendidos',     desc: 'Confira os planos de saúde aceitos para consultas e exames.' },
                { href: '/blog',                 title: 'Blog da NU.V.E.M',        desc: 'Artigos sobre saúde digestiva escritos pela nossa equipe médica.' },
              ].map(item => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="group flex gap-3.5 items-start p-4 bg-white border border-teal/10 rounded-2xl shadow-sm hover:border-teal/25 transition-colors"
                >
                  <div className="w-10 h-10 rounded-lg bg-teal/8 flex items-center justify-center text-teal shrink-0">
                    <FileText className="w-[18px] h-[18px]" />
                  </div>
                  <div className="flex-1">
                    <strong className="block text-[0.95rem] font-semibold text-steel mb-0.5">{item.title}</strong>
                    <span className="block text-[0.85rem] font-light text-steel/55 leading-relaxed">{item.desc}</span>
                  </div>
                  <ArrowRight className="w-4 h-4 text-teal/40 shrink-0 mt-3 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
