import type { Metadata } from 'next'
import Link    from 'next/link'
import { Phone, MapPin, Clock, Mail, Instagram, Youtube } from 'lucide-react'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { AgendarForm }    from '@/app/agendar/AgendarForm'
import { CONTATO }        from '@/lib/data'

export const metadata: Metadata = {
  alternates:  { canonical: '/contato' },
  title:       'Contato e Localização',
  description: 'Entre em contato com a NU.V.E.M Medicina. Rua Ceará, 600 – Sala 101, Santa Efigênia, Belo Horizonte – MG.',
}

export default function ContatoPage() {
  return (
    <>
      <PageHero
        tag="Contato"
        title={<>Fale com a <em>NU.V.E.M</em></>}
        desc="Estamos prontos para orientá-lo. Entre em contato para agendar consultas, exames ou tirar dúvidas sobre nossos serviços e programas de ensino."
      />

      <SectionWrapper dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Info side */}
          <div>
            <p className="sec-tag reveal">Canais de Atendimento</p>
            <h2 className="sec-title reveal reveal-d1 mb-8">Escolha o melhor <em>canal</em></h2>

            <div className="space-y-4 reveal reveal-d2">
              {[
                { Icon: Phone,   label: 'Telefone / WhatsApp', lines: [
                    { text: CONTATO.telefone,  href: `tel:${CONTATO.telefone.replace(/\D/g,'')}` },
                    { text: CONTATO.whatsapp,  href: CONTATO.whatsappUrl },
                  ]},
                { Icon: Mail,    label: 'E-mail', lines: [
                    { text: CONTATO.email, href: `mailto:${CONTATO.email}` },
                  ]},
                { Icon: MapPin,  label: 'Endereço', lines: [
                    { text: CONTATO.endereco, href: CONTATO.maps },
                    { text: CONTATO.bairro,   href: CONTATO.maps },
                    { text: CONTATO.cep,      href: null },
                  ]},
                { Icon: Clock,   label: 'Horário de Atendimento', lines: [
                    { text: CONTATO.horario, href: null },
                  ]},
              ].map(({ Icon, label, lines }) => (
                <div key={label} className="flex items-start gap-4 p-5 bg-white border border-teal/10 rounded-xl hover:border-teal/25 transition-colors">
                  <div className="w-10 h-10 rounded-lg bg-teal/8 flex items-center justify-center text-teal shrink-0">
                    <Icon className="w-[18px] h-[18px]" />
                  </div>
                  <div>
                    <strong className="block text-[0.68rem] font-semibold uppercase tracking-[.08em] text-steel/45 mb-2">{label}</strong>
                    {lines.map(l => l.href ? (
                      <a key={l.text} href={l.href} target={l.href.startsWith('http') ? '_blank' : undefined} rel="noopener noreferrer"
                        className="block text-[0.93rem] text-steel hover:text-teal transition-colors">{l.text}</a>
                    ) : (
                      <span key={l.text} className="block text-[0.93rem] text-steel/65">{l.text}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {/* Social */}
            <div className="mt-8 p-5 bg-white border border-teal/10 rounded-xl reveal reveal-d3">
              <strong className="block text-[0.68rem] font-semibold uppercase tracking-[.08em] text-steel/45 mb-4">Redes Sociais</strong>
              <div className="flex gap-3">
                {[
                  { href: CONTATO.instagram, Icon: Instagram, label: '@NuvemMedicina' },
                  { href: CONTATO.youtube,   Icon: Youtube,   label: 'YouTube' },
                  { href: CONTATO.whatsappUrl, Icon: Phone,   label: 'WhatsApp' },
                ].map(({ href, Icon, label }) => (
                  <a key={label} href={href} target="_blank" rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2 bg-cloud border border-teal/10 rounded-lg text-[0.78rem] text-steel/60 hover:border-teal/30 hover:text-teal transition-all">
                    <Icon className="w-4 h-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            {/* Ensino contact */}
            <div className="mt-4 p-5 border border-teal/15 rounded-xl reveal reveal-d4" style={{ background: 'rgba(203,228,230,0.18)' }}>
              <strong className="block text-[0.9rem] font-semibold text-steel mb-2">NU.V.E.M Ensino</strong>
              <p className="text-[0.78rem] text-steel/60 mb-3">Para informações sobre cursos e treinamentos:</p>
              <a href="mailto:cursos@nuvemensino.com.br" className="text-[0.9rem] text-teal hover:underline">cursos@nuvemensino.com.br</a>
            </div>
          </div>

          {/* Form side */}
          <div>
            <div className="bg-white border border-teal/10 shadow-sm rounded-2xl p-10 reveal reveal-d1">
              <div className="h-px teal-line mb-8" />
              <h3 className="text-[1.2rem] font-semibold text-steel mb-1.5">Enviar mensagem</h3>
              <p className="text-[0.9rem] text-steel/60 mb-8">Preencha o formulário e respondemos em até 24h.</p>
              <AgendarForm />
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Map embed placeholder */}
      <div className="bg-cloud border-t border-teal/10 h-64 flex items-center justify-center">
        <div className="text-center">
          <p className="text-steel/60 text-[0.9rem] mb-4">Rua Ceará, 600 – Sala 101 · Santa Efigênia · BH/MG</p>
          <a
            href={CONTATO.maps}
            target="_blank" rel="noopener noreferrer"
            className="btn-ghost text-[0.9rem]"
          >
            <MapPin className="w-4 h-4" />
            Abrir no Google Maps
          </a>
        </div>
      </div>
    </>
  )
}
