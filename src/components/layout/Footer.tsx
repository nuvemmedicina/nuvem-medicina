'use client'

import { useTranslations } from 'next-intl'
import { Instagram, Youtube, MessageCircle, Linkedin } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { LogoBranco }  from '@/components/icons/LogoBranco'
import { IsoSeal }     from '@/components/icons/IsoSeal'
import { CookiePreferencesLink } from '@/components/ui/CookiePreferencesLink'
import { CONTATO }     from '@/lib/data'

export function Footer() {
  const t = useTranslations('footer')
  const tNav = useTranslations('nav')

  const FOOTER_COLS = [
    {
      title: t('colEspecialidades'),
      links: [
        { label: tNav('gastroenterologia'),   href: '/especialidades/gastroenterologia' },
        { label: tNav('fisioterapiaPelvica'), href: '/especialidades/fisioterapia-pelvica' },
        { label: tNav('halitose'),            href: '/especialidades/halitose' },
        { label: tNav('pediatria'),           href: '/especialidades/pediatria' },
        { label: tNav('nefrologia'),          href: '/especialidades/nefrologia' },
        { label: tNav('motilidadeDigestiva'), href: '/especialidades/motilidade-digestiva' },
      ],
    },
    {
      title: t('colExames'),
      links: [
        { label: tNav('manometriaEsofagica'),   href: '/exames/manometria-esofagica' },
        { label: tNav('manometriaAnorretal'),   href: '/exames/manometria-anorretal' },
        { label: t('phmetriaImpedancia'),       href: '/exames/phmetria-impedanciometria' },
        { label: tNav('testesRespiratorios'),   href: '/exames/testes-respiratorios' },
        { label: tNav('halimetriaSialometria'), href: '/exames/halimetria-sialometria' },
        { label: tNav('avaliacaoPelvica'),      href: '/exames/avaliacao-pelvica' },
        { label: t('preparos'),                 href: '/exames/preparos' },
      ],
    },
    {
      title: t('colInstitucional'),
      links: [
        { label: t('institucionalSobre'),     href: '/sobre' },
        { label: t('institucionalEquipe'),    href: '/equipe' },
        { label: t('institucionalQualidade'), href: '/gestao-da-qualidade' },
        { label: t('institucionalEnsino'),    href: '/ensino' },
        { label: t('institucionalConvenios'), href: '/convenios-medicos' },
        { label: t('institucionalBlog'),      href: '/blog' },
      ],
    },
  ]

  return (
    <footer className="border-t border-teal/8 relative overflow-hidden" style={{ background: '#00465F' }}>

      <div className="max-w-[1240px] mx-auto px-8 pt-16 pb-8">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[280px_1fr_1fr_1fr] gap-10 mb-12">

          {/* Brand */}
          <div className="text-left">
            <Link href="/" className="inline-block mb-5" aria-label="NU.V.E.M Medicina — Página inicial">
              <LogoBranco className="h-9 w-auto opacity-85 hover:opacity-100 transition-opacity" />
            </Link>

            <p className="text-[0.82rem] text-white/45 leading-relaxed mb-5">
              {t('tagline')}
            </p>

            {/* ISO Seal */}
            <div className="flex items-center gap-3 mb-5 justify-start">
              <IsoSeal size={48} />
              <div>
                <p className="text-[0.78rem] font-semibold text-white leading-tight">{t('isoTitle')}</p>
                <p className="text-[0.72rem] text-white/45 mt-0.5">{t('isoSubtitle')}</p>
              </div>
            </div>

            <div className="flex gap-2.5 justify-start">
              {[
                { href: 'https://www.instagram.com/nuvemmedicina/', Icon: Instagram,     label: 'Instagram' },
                { href: 'https://www.youtube.com/@NuvemMedicina',   Icon: Youtube,       label: 'YouTube' },
                { href: 'https://www.linkedin.com/company/nuvem-medicina/', Icon: Linkedin, label: 'LinkedIn' },
                { href: CONTATO.whatsappUrl,                         Icon: MessageCircle, label: 'WhatsApp' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/15 text-white/40 flex items-center justify-center hover:border-gold/45 hover:text-gold transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title} className="text-left">
              <h4 className="text-[0.72rem] font-bold tracking-[.1em] uppercase text-white/55 mb-4 pb-2.5 border-b border-white/10">
                {col.title}
              </h4>
              <ul className="space-y-2.5">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.82rem] font-light text-white/40 hover:text-teal-light transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom */}
        <div className="pt-6 border-t border-white/10 flex flex-col md:flex-row md:justify-between gap-4">
          <div className="space-y-1 text-left">
            <p className="text-[0.72rem] text-white/35">
              © {new Date().getFullYear()} NU.V.E.M Medicina · CNPJ {CONTATO.cnpj} · {CONTATO.crmClinica}
            </p>
            <a
              href={CONTATO.maps}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[0.72rem] text-white/35 hover:text-teal-light transition-colors"
            >
              {CONTATO.endereco} – {CONTATO.bairro} · {CONTATO.cep}
            </a>
            <div className="flex items-center gap-4 justify-start">
              <a href="/politica-de-privacidade" className="text-[0.72rem] text-white/35 hover:text-teal-light transition-colors">
                {t('privacyPolicy')}
              </a>
              <span className="text-white/25 text-[0.72rem]">·</span>
              <a href="/direitos-do-paciente" className="text-[0.72rem] text-white/35 hover:text-teal-light transition-colors">
                {t('patientRights')}
              </a>
              <span className="text-white/25 text-[0.72rem]">·</span>
              <CookiePreferencesLink />
            </div>
          </div>
          <div className="flex flex-col items-center md:items-end gap-2">
            <p className="text-[0.65rem] text-white/20 max-w-md leading-relaxed text-center md:text-right">
              {t('disclaimer')}
            </p>
            <a
              href="https://anawebdesign.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.72rem] text-white/35 hover:text-teal-light transition-colors group"
            >
              {t('developedBy')}
              <span className="font-semibold text-teal-light/55 group-hover:text-teal-light transition-colors">
                Ana Webdesign
              </span>
              <span className="text-white/20 group-hover:text-gold transition-colors">↗</span>
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
