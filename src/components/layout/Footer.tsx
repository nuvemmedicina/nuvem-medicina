import Link            from 'next/link'
import { Instagram, Youtube, MessageCircle } from 'lucide-react'
import { LogoBranco }  from '@/components/icons/LogoBranco'
import { IsoSeal }     from '@/components/icons/IsoSeal'
import { CONTATO }     from '@/lib/data'

const FOOTER_COLS = [
  {
    title: 'Especialidades',
    links: [
      { label: 'Gastroenterologia',    href: '/especialidades/gastroenterologia' },
      { label: 'Fisioterapia Pélvica', href: '/especialidades/fisioterapia-pelvica' },
      { label: 'Halitose',             href: '/especialidades/halitose' },
      { label: 'Pediatria',            href: '/especialidades/pediatria' },
      { label: 'Nefrologia',           href: '/especialidades/nefrologia' },
      { label: 'Motilidade Digestiva', href: '/especialidades/motilidade-digestiva' },
    ],
  },
  {
    title: 'Exames',
    links: [
      { label: 'Manometria AR',           href: '/exames/manometria-esofagica' },
      { label: 'pHmetria e Impedância',   href: '/exames/phmetria-impedanciometria' },
      { label: 'Testes Respiratórios',    href: '/exames/testes-respiratorios' },
      { label: 'Halimetria e Sialometria',href: '/exames/halimetria-sialometria' },
      { label: 'Avaliação Pélvica',       href: '/exames/avaliacao-pelvica' },
      { label: 'Preparos para Exames',    href: '/exames/preparos' },
    ],
  },
  {
    title: 'Institucional',
    links: [
      { label: 'Sobre a Clínica',         href: '/sobre' },
      { label: 'Equipe',                  href: '/equipe' },
      { label: 'Gestão da Qualidade',     href: '/gestao-da-qualidade' },
      { label: 'NU.V.E.M Ensino',         href: '/ensino' },
      { label: 'Convênios',               href: '/convenios' },
      { label: 'Blog',                    href: '/blog' },
    ],
  },
]

export function Footer() {
  return (
    <footer className="bg-ink border-t border-teal-light/[0.06]">
      <div className="max-w-[1240px] mx-auto px-8 pt-16 pb-8">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[280px_1fr_1fr_1fr] gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-5" aria-label="NU.V.E.M Medicina — Página inicial">
              <LogoBranco className="h-9 w-auto opacity-85 hover:opacity-100 transition-opacity" />
            </Link>

            <p className="text-[0.76rem] text-faint leading-relaxed mb-5">
              Ecossistema de excelência em saúde digestiva e ensino médico em Belo Horizonte, com certificação ISO 9001.
            </p>

            {/* ISO Seal */}
            <div className="flex items-center gap-3 mb-5">
              <IsoSeal size={48} />
              <div>
                <p className="text-[0.72rem] font-semibold text-white leading-tight">Certificação ISO 9001</p>
                <p className="text-[0.68rem] text-faint mt-0.5">Única clínica do segmento em BH</p>
              </div>
            </div>

            <div className="flex gap-2.5">
              {[
                { href: CONTATO.instagram, Icon: Instagram, label: 'Instagram' },
                { href: CONTATO.youtube,   Icon: Youtube,   label: 'YouTube' },
                { href: CONTATO.whatsappUrl, Icon: MessageCircle, label: 'WhatsApp' },
              ].map(({ href, Icon, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-teal-light/10 text-faint flex items-center justify-center hover:border-gold/35 hover:text-gold transition-all"
                >
                  <Icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Columns */}
          {FOOTER_COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-[0.7rem] font-bold tracking-[.1em] uppercase text-muted mb-4 pb-2.5 border-b border-teal-light/[0.07]">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map(link => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-[0.76rem] font-light text-faint hover:text-teal-light transition-colors"
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
        <div className="pt-6 border-t border-teal-light/[0.06] flex flex-col md:flex-row md:justify-between gap-4">
          <div className="space-y-1">
            <p className="text-[0.7rem] text-faint">
              © {new Date().getFullYear()} NU.V.E.M Medicina · CNPJ {CONTATO.cnpj} · {CONTATO.crmClinica}
            </p>
            <p className="text-[0.7rem] text-faint">
              {CONTATO.endereco} – {CONTATO.bairro} · {CONTATO.cep}
            </p>
          </div>
          <p className="text-[0.65rem] text-teal-light/15 max-w-md leading-relaxed">
            As informações neste site têm caráter informativo e educacional, em conformidade com as normas do Conselho Federal de Medicina (Res. CFM nº 1.974/2011). Não substituem consulta médica profissional.
          </p>
        </div>
      </div>
    </footer>
  )
}
