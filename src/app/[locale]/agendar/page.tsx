import type { Metadata } from 'next'
import { getTranslations } from 'next-intl/server'
import { AgendarForm } from './AgendarForm'
import { CONTATO }    from '@/lib/data'
import { localizedAlternates } from '@/lib/i18n-seo'
import { Phone, MapPin, Clock, Mail } from 'lucide-react'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'agendarPage' })
  return {
    alternates:  localizedAlternates('/agendar', locale),
    title:       t('metaTitle'),
    description: t('metaDescription'),
  }
}

export default async function AgendarPage() {
  const t = await getTranslations('agendarPage')
  return (
    <div className="min-h-screen pt-[76px]">
      {/* Hero */}
      <div className="py-20 text-center relative overflow-hidden"
        style={{ background: 'linear-gradient(160deg, #00465F 0%, #0e7fa5 100%)' }}
      >
        <div className="absolute inset-0 hero-grid-bg opacity-30" />
        <div className="relative z-10 max-w-[1240px] mx-auto px-8">
          <p className="sec-tag justify-center mb-4 text-white/80">{t('tag')}</p>
          <h1 className="font-serif font-light text-white leading-tight tracking-tight" style={{ fontSize: 'clamp(2.2rem, 3.5vw, 3.2rem)' }}>
            {t('titlePrefix')} <em className="italic">{t('titleEm')}</em>
          </h1>
          <p className="text-[1rem] font-light text-white/70 mt-4 max-w-md mx-auto leading-relaxed">
            {t('desc')}
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-20 bg-white">
        <div className="max-w-[1240px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-2 gap-16">

          {/* Contacts */}
          <div>
            <p className="sec-tag mb-4">{t('contatoDiretoTag')}</p>
            <h2 className="font-serif font-light text-steel text-[1.8rem] leading-snug mb-4">
              {t('faleConoscoLine1')}<br/>{t('faleConoscoLine2')}
            </h2>
            <p className="text-[0.97rem] font-light text-steel/60 leading-relaxed mb-10">
              {t('prefereFalar')}
            </p>

            <div className="flex flex-col gap-3">
              {[
                { Icon: Phone,  label: t('telWhats'),   values: [CONTATO.telefone, CONTATO.whatsapp], href: [`tel:${CONTATO.telefone.replace(/\D/g,'')}`, CONTATO.whatsappUrl] },
                { Icon: MapPin, label: t('localizacao'), values: [CONTATO.endereco, CONTATO.bairro], href: [CONTATO.maps, CONTATO.maps] },
                { Icon: Clock,  label: t('horario'),     values: [CONTATO.horario], href: ['#'] },
                { Icon: Mail,   label: t('email'),       values: [CONTATO.email], href: [`mailto:${CONTATO.email}`] },
              ].map(({ Icon, label, values, href }) => (
                <div key={label} className="flex gap-3.5 items-start p-4 bg-cloud border border-teal/10 rounded-2xl shadow-sm hover:border-teal/25 transition-colors">
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

          {/* Form */}
          <div className="bg-white border border-teal/10 rounded-2xl shadow-sm p-10">
            <div className="h-px teal-line mb-8" />
            <h3 className="text-[1.2rem] font-semibold text-steel mb-1.5">{t('solicitarAgendamento')}</h3>
            <p className="text-[0.9rem] text-steel/60 mb-8">{t('equipeRespondera')}</p>
            <AgendarForm />
          </div>

        </div>
      </div>
    </div>
  )
}
