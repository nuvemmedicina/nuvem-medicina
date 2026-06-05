import Link            from 'next/link'
import { Calendar, ArrowRight, Activity, BookOpen, Shield } from 'lucide-react'
import { CONTATO }     from '@/lib/data'
import { LogoTeal }    from '@/components/icons/LogoTeal'
import { IsoSeal }     from '@/components/icons/IsoSeal'

export function HeroSection() {
  const waMsg = encodeURIComponent('Olá! Gostaria de agendar uma consulta na NU.V.E.M Medicina.')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-white">

      {/* Fundo hero — imagem com baixa opacidade */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/images/fundo-hero.jpeg)',
          backgroundSize: 'cover',
          backgroundPosition: 'center right',
          opacity: 0.07,
        }}
      />

      {/* Light grid background — the "tech" checkered look */}
      <div className="absolute inset-0 hero-grid-bg pointer-events-none" />

      {/* Soft mist orb top-right */}
      <div
        className="absolute -top-[15%] -right-[8%] w-[600px] h-[600px] rounded-full animate-drift pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(203,228,230,.55) 0%, transparent 65%)' }}
      />

      {/* Second orb bottom-left */}
      <div
        className="absolute bottom-[0%] -left-[5%] w-[380px] h-[380px] rounded-full animate-[drift_16s_ease-in-out_infinite_reverse] pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(0,70,95,.06) 0%, transparent 65%)' }}
      />

      {/* Vertical teal accent line */}
      <div
        className="absolute top-0 bottom-0 w-px opacity-20 pointer-events-none"
        style={{
          right: '30%',
          background: 'linear-gradient(to bottom, transparent, rgba(0,70,95,.35) 30%, rgba(0,70,95,.35) 70%, transparent)',
        }}
      />

      {/* Decorative ISO seal watermark */}
      <div className="absolute right-[6%] top-1/2 -translate-y-1/2 opacity-[0.045] animate-seal-spin pointer-events-none select-none hidden xl:block">
        <IsoSeal size={280} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-8 pt-[120px] pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_440px] gap-16 lg:gap-20 items-center">

          {/* ── LEFT ─────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2.5 text-teal text-[0.78rem] font-bold tracking-[.16em] uppercase mb-7 opacity-0 animate-[fadeUp_.8s_.2s_var(--ease-out)_forwards]">
              <span className="block w-7 h-px bg-teal" />
              Belo Horizonte · Santa Efigênia
            </p>

            {/* H1 */}
            <h1
              className="font-serif font-light leading-[1.08] tracking-tight text-steel opacity-0 animate-[fadeUp_.9s_.35s_var(--ease-out)_forwards]"
              style={{ fontSize: 'clamp(3.2rem, 5vw, 5rem)' }}
            >
              Excelência em<br />
              <em className="italic text-teal not-italic" style={{ fontStyle: 'italic' }}>Saúde Digestiva</em>
            </h1>
            <p
              className="font-serif font-light italic text-steel/40 opacity-0 animate-[fadeUp_.9s_.45s_var(--ease-out)_forwards] mb-8"
              style={{ fontSize: 'clamp(3.2rem, 5vw, 5rem)', lineHeight: 1.05 }}
            >
              e Diagnóstico Avançado
            </p>

            <p className="text-[1.05rem] font-light text-steel/65 leading-[1.82] max-w-[480px] mb-11 opacity-0 animate-[fadeUp_.9s_.55s_var(--ease-out)_forwards]">
              O ecossistema completo de medicina especializada: diagnóstico de alta precisão,
              equipe multidisciplinar e formação profissional baseada em casos reais.{' '}
              <strong className="text-teal font-semibold">Única clínica do segmento com gestão ISO 9001.</strong>
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap gap-3.5 mb-14 opacity-0 animate-[fadeUp_.9s_.65s_var(--ease-out)_forwards]">
              <a href={`${CONTATO.whatsappUrl}?text=${waMsg}`} target="_blank" rel="noopener noreferrer" className="btn-gold">
                <Calendar className="w-4 h-4" />
                Agendar Consulta
              </a>
              <Link href="/especialidades" className="btn-ghost">
                Conhecer Especialidades
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>

          {/* ── RIGHT PANEL ──────────────────────── */}
          <div className="opacity-0 animate-[fadeUp_.9s_.5s_var(--ease-out)_forwards]">
            <div className="relative border border-teal/15 rounded-[20px] p-9 overflow-hidden" style={{ background: 'rgba(203,228,230,0.42)' }}>
              {/* Top teal line */}
              <div className="absolute top-0 left-0 right-0 h-[3px] rounded-t-[20px]" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,70,95,.3), transparent)' }} />

              {/* Grid inside panel */}
              <div className="absolute inset-0 hero-grid-bg opacity-60 pointer-events-none" />

              <div className="relative z-10">
                <p className="flex items-center gap-2 text-teal text-[0.72rem] font-bold tracking-[.14em] uppercase mb-5">
                  <span className="w-4 h-px bg-teal" />
                  Diferenciais da Clínica
                </p>

                {/* ISO Badge */}
                <div className="flex items-center gap-3.5 p-4 bg-white border border-gold/25 rounded-xl mb-6 shadow-sm">
                  <IsoSeal size={54} priority className="shrink-0" />
                  <div>
                    <strong className="block text-[0.88rem] font-semibold text-steel mb-0.5">Certificação ISO 9001</strong>
                    <span className="text-[0.76rem] text-steel/55 leading-snug">
                      Única clínica do segmento em BH<br />com gestão de qualidade certificada
                    </span>
                  </div>
                </div>

                {/* Feature list */}
                <div className="flex flex-col gap-2.5 mb-6">
                  {[
                    {
                      Icon: Activity,
                      title: 'Tecnologia Diagnóstica de Ponta',
                      desc: 'Manometria AR, pHmetria, testes respiratórios H₂/CH₄/H₂S',
                    },
                    {
                      Icon: Shield,
                      title: 'Equipe Multidisciplinar',
                      desc: 'Gastro, fisioterapia pélvica, nefrologia, pediatria',
                    },
                    {
                      Icon: BookOpen,
                      title: 'Centro de Ensino Médico',
                      desc: 'Formação hands-on com certificação validada ISO 9001',
                    },
                  ].map(({ Icon, title, desc }) => (
                    <div
                      key={title}
                      className="flex items-start gap-3 p-3.5 rounded-[12px] bg-white border border-teal/10 hover:border-teal/25 hover:-translate-y-0.5 transition-all cursor-default"
                    >
                      <div className="w-9 h-9 rounded-lg bg-teal/10 flex items-center justify-center text-teal shrink-0">
                        <Icon className="w-[18px] h-[18px]" />
                      </div>
                      <div>
                        <strong className="block text-[0.86rem] font-semibold text-steel mb-0.5">{title}</strong>
                        <span className="text-[0.75rem] text-steel/55">{desc}</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Credential */}
                <div className="pt-4 border-t border-teal/10 text-[0.72rem] text-steel/40 leading-[1.75]">
                  <strong className="text-steel/55 font-medium">{CONTATO.crmClinica} · NUVEM MEDICINA</strong><br />
                  {CONTATO.diretora.nome} · {CONTATO.diretora.crm} · {CONTATO.diretora.rqe}<br />
                  {CONTATO.endereco} · {CONTATO.bairro}
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>

    </section>
  )
}
