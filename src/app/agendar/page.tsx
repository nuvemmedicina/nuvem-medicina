import type { Metadata } from 'next'
import { AgendarForm } from './AgendarForm'
import { CONTATO }    from '@/lib/data'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Agendar Consulta',
  description: 'Agende sua consulta na NU.V.E.M Medicina. Atendimento em gastroenterologia, fisioterapia pélvica, halitose e mais.',
}

export default function AgendarPage() {
  return (
    <div className="min-h-screen pt-[76px]">
      {/* Hero */}
      <div className="py-20 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #071520 0%, #050E14 100%)' }}
      >
        <div className="absolute inset-0 hero-grid-bg" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-8">
          <p className="sec-tag justify-center mb-4">Agendamento</p>
          <h1 className="sec-title">Agende sua <em>consulta</em></h1>
          <p className="text-[0.9rem] font-light text-muted mt-4 max-w-md mx-auto leading-relaxed">
            Preencha o formulário ou entre em contato diretamente. Nossa equipe responde em até 24h.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 bg-ink">
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contacts */}
          <div>
            <p className="sec-tag mb-4">Contato Direto</p>
            <h2 className="font-serif font-light text-white text-[1.8rem] leading-snug mb-4">
              Fale conosco<br/>agora mesmo
            </h2>
            <p className="text-[0.88rem] font-light text-muted leading-relaxed mb-10">
              Prefere falar diretamente? Utilize um dos canais abaixo.
            </p>

            <div className="flex flex-col gap-3">
              {[
                { Icon: Phone,  label: 'Telefone / WhatsApp', values: [CONTATO.telefone, CONTATO.whatsapp], href: [`tel:${CONTATO.telefone.replace(/\D/g,'')}`, CONTATO.whatsappUrl] },
                { Icon: MapPin, label: 'Localização',         values: [CONTATO.endereco, CONTATO.bairro], href: [CONTATO.maps, CONTATO.maps] },
                { Icon: Clock,  label: 'Horário',             values: [CONTATO.horario], href: ['#'] },
                { Icon: Mail,   label: 'E-mail',              values: [CONTATO.email], href: [`mailto:${CONTATO.email}`] },
              ].map(({ Icon, label, values, href }) => (
                <div key={label} className="flex gap-3.5 items-start p-4 bg-deep border border-teal-light/[0.08] rounded-xl hover:border-teal-light/[0.18] transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-teal-light/[0.06] flex items-center justify-center text-teal-light shrink-0">
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <strong className="block text-[0.72rem] font-semibold uppercase tracking-[.06em] text-faint mb-1">{label}</strong>
                    {values.map((v, i) => (
                      <a key={v} href={href[i]} className="block text-[0.85rem] text-white hover:text-gold transition-colors">{v}</a>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="bg-deep border border-teal-light/10 rounded-2xl p-10">
            <div className="h-px gold-line mb-8" />
            <h3 className="text-[1.2rem] font-semibold text-white mb-1.5">Solicitar Agendamento</h3>
            <p className="text-[0.82rem] text-muted mb-8">Nossa equipe entrará em contato em até 24h.</p>
            <AgendarForm />
          </div>

        </div>
      </div>
    </div>
  )
}
