import Link            from 'next/link'
import { Instagram, Youtube, MessageCircle, Linkedin } from 'lucide-react'
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
      { label: 'Manometria Esofágica',    href: '/exames/manometria-esofagica' },
      { label: 'Manometria Anorretal',    href: '/exames/manometria-anorretal' },
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
    <footer className="border-t border-teal/8 relative overflow-hidden" style={{ background: '#00465F' }}>

      <div className="max-w-[1240px] mx-auto px-8 pt-16 pb-8">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[280px_1fr_1fr_1fr] gap-10 mb-12">

          {/* Brand */}
          <div>
            <Link href="/" className="inline-block mb-5" aria-label="NU.V.E.M Medicina — Página inicial">
              <LogoBranco className="h-9 w-auto opacity-85 hover:opacity-100 transition-opacity" />
            </Link>

            <p className="text-[0.82rem] text-white/45 leading-relaxed mb-5">
              Ecossistema de excelência em saúde digestiva e ensino médico em Belo Horizonte, com certificação ISO 9001.
            </p>

            {/* ISO Seal */}
            <div className="flex items-center gap-3 mb-5">
              <IsoSeal size={48} />
              <div>
                <p className="text-[0.78rem] font-semibold text-white leading-tight">Certificação ISO 9001</p>
                <p className="text-[0.72rem] text-white/45 mt-0.5">Única clínica do segmento em BH</p>
              </div>
            </div>

            <div className="flex gap-2.5">
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
            <div key={col.title}>
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
          <div className="space-y-1">
            <p className="text-[0.72rem] text-white/35">
              © {new Date().getFullYear()} NU.V.E.M Medicina · CNPJ {CONTATO.cnpj} · {CONTATO.crmClinica}
            </p>
            <p className="text-[0.72rem] text-white/35">
              {CONTATO.endereco} – {CONTATO.bairro} · {CONTATO.cep}
            </p>
            <div className="flex items-center gap-4">
              <a href="/politica-de-privacidade" className="text-[0.72rem] text-white/35 hover:text-teal-light transition-colors">
                Política de Privacidade
              </a>
              <span className="text-white/25 text-[0.72rem]">·</span>
              <a href="/direitos-do-paciente" className="text-[0.72rem] text-white/35 hover:text-teal-light transition-colors">
                Direitos do Paciente
              </a>
            </div>
          </div>
          <div className="flex flex-col items-end gap-2">
            <p className="text-[0.65rem] text-white/20 max-w-md leading-relaxed text-right">
              As informações neste site têm caráter informativo e educacional, em conformidade com as normas do Conselho Federal de Medicina (Res. CFM nº 1.974/2011). Não substituem consulta médica profissional.
            </p>
            <a
              href="https://anawebdesign.com.br"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-[0.72rem] text-white/35 hover:text-teal-light transition-colors group"
            >
              Desenvolvido por
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
