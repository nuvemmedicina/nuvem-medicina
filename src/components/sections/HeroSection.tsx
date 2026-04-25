import Link            from 'next/link'
import { Calendar, ArrowRight, Activity, BookOpen, Shield } from 'lucide-react'
import { CONTATO }     from '@/lib/data'
import { LogoBranco }  from '@/components/icons/LogoBranco'
import { IsoSeal }     from '@/components/icons/IsoSeal'

export function HeroSection() {
  const waMsg = encodeURIComponent('Olá! Gostaria de agendar uma consulta na NU.V.E.M Medicina.')

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden">

      {/* Layered background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 hero-grid-bg" />

      {/* Vertical gold accent line */}
      <div
        className="absolute top-0 bottom-0 w-px opacity-40"
        style={{
          right: '30%',
          background: 'linear-gradient(to bottom, transparent, rgba(201,168,76,.35) 30%, rgba(201,168,76,.35) 70%, transparent)',
        }}
      />

      {/* Floating orbs */}
      <div className="absolute -top-[10%] -right-[5%] w-[500px] h-[500px] rounded-full bg-teal/40 animate-drift blur-[80px] pointer-events-none" />
      <div className="absolute bottom-[5%] left-[5%] w-[320px] h-[320px] rounded-full bg-gold/5 animate-[drift_16s_ease-in-out_infinite_reverse] blur-[80px] pointer-events-none" />

      {/* Decorative ISO seal watermark */}
      <div className="absolute right-[6%] top-1/2 -translate-y-1/2 opacity-[0.06] animate-seal-spin pointer-events-none select-none hidden xl:block">
        <IsoSeal size={280} />
      </div>

      {/* Content */}
      <div className="relative z-10 w-full max-w-[1240px] mx-auto px-8 pt-[120px] pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-16 lg:gap-20 items-center">

          {/* ── LEFT ─────────────────────────────── */}
          <div>
            {/* Eyebrow */}
            <p className="inline-flex items-center gap-2.5 text-gold text-[0.72rem] font-bold tracking-[.16em] uppercase mb-7 opacity-0 animate-[fadeUp_.8s_.2s_var(--ease-out)_forwards]">
              <span className="block w-7 h-px bg-gold" />
              Belo Horizonte · Santa Efigênia
            </p>

            {/* H1 */}
            <h1 className="font-serif font-light leading-[1.08] tracking-tight text-white opacity-0 animate-[fadeUp_.9s_.35s_var(--ease-out)_forwards]"
              style={{ fontSize: 'clamp(3rem, 5vw, 4.8rem)' }}
            >
              Excelência em<br />
              <em className="italic text-teal-light not-italic" style={{ fontStyle: 'italic' }}>Saúde Digestiva</em>
            </h1>
            <p
              className="font-serif font-light italic text-gold opacity-0 animate-[fadeUp_.9s_.45s_var(--ease-out)_forwards] mb-8"
              style={{ fontSize: 'clamp(3rem, 5vw, 4.8rem)', lineHeight: 1.05 }}
            >
              e Diagnóstico Avançado
            </p>

            <p className="text-[0.95rem] font-light text-muted leading-[1.8] max-w-[480px] mb-11 opacity-0 animate-[fadeUp_.9s_.55s_var(--ease-out)_forwards]">
              O ecossistema completo de medicina especializada — diagnóstico de alta precisão,
              equipe multidisciplinar e formação profissional baseada em casos reais.{' '}
              <strong className="text-white font-medium">Única clínica do segmento com gestão ISO 9001.</strong>
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

            {/* Stats */}
            <div
              className="flex flex-col sm:flex-row gap-0 pt-8 border-t border-teal-light/[0.08] opacity-0 animate-[fadeUp_.9s_.75s_var(--ease-out)_forwards]"
            >
              {[
                { num: '1.991', label: 'Avaliações Google', sub: '★★★★★', gold: true },
                { num: 'ISO 9001', label: 'Gestão Certificada', sub: 'Única no segmento', gold: false },
                { num: '6', label: 'Especialidades', sub: 'Equipe integrada', gold: false },
              ].map((s, i) => (
                <div
                  key={s.label}
                  className={`flex-1 ${i > 0 ? 'sm:pl-8 sm:border-l border-teal-light/[0.08]' : ''} ${i > 0 ? 'mt-6 sm:mt-0' : ''}`}
                >
                  <span className={`font-serif font-light text-[2.6rem] leading-none block mb-1 ${s.gold ? 'text-gold' : 'text-white'}`}>
                    {s.num}
                  </span>
                  <div className="text-[0.72rem] font-medium tracking-[.08em] uppercase text-muted">{s.label}</div>
                  <div className="text-[0.7rem] text-faint mt-0.5">{s.sub}</div>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT PANEL ──────────────────────── */}
          <div className="opacity-0 animate-[fadeUp_.9s_.5s_var(--ease-out)_forwards]">
            <div className="relative bg-teal-light/[0.04] border border-teal-light/10 rounded-[20px] p-9 overflow-hidden">
              {/* Top gold line */}
              <div className="absolute top-0 left-0 right-0 h-px gold-line" />

              <p className="flex items-center gap-2 text-gold text-[0.68rem] font-bold tracking-[.14em] uppercase mb-5">
                <span className="w-4 h-px bg-gold" />
                Diferenciais da Clínica
              </p>

              {/* ISO Badge */}
              <div className="flex items-center gap-3.5 p-4 bg-gold-dim border border-gold-line rounded-xl mb-6">
                <IsoSeal size={54} priority className="shrink-0" />
                <div>
                  <strong className="block text-[0.82rem] font-semibold text-white mb-0.5">Certificação ISO 9001</strong>
                  <span className="text-[0.72rem] text-muted leading-snug">
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
                    className="flex items-start gap-3 p-3 rounded-[10px] bg-sky-faint border border-teal-light/[0.07] hover:border-teal-light/[0.18] transition-colors"
                  >
                    <div className="w-9 h-9 rounded-lg bg-teal-light/[0.06] flex items-center justify-center text-teal-light shrink-0">
                      <Icon className="w-[18px] h-[18px]" />
                    </div>
                    <div>
                      <strong className="block text-[0.82rem] font-semibold text-white mb-0.5">{title}</strong>
                      <span className="text-[0.72rem] text-muted">{desc}</span>
                    </div>
                  </div>
                ))}
              </div>

              {/* Credential */}
              <div className="pt-4 border-t border-teal-light/[0.08] text-[0.7rem] text-faint leading-[1.7]">
                <strong className="text-muted font-medium">{CONTATO.crmClinica} · NUVEM MEDICINA</strong><br />
                {CONTATO.diretora.nome} · {CONTATO.diretora.crm} · {CONTATO.diretora.rqe}<br />
                {CONTATO.endereco} · {CONTATO.bairro}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-9 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-faint text-[0.65rem] tracking-[.12em] uppercase opacity-0 animate-[fadeIn_1s_1.5s_both]">
        <span>Explorar</span>
        <div className="w-px h-12 animate-scroll-bar" style={{ background: 'linear-gradient(to bottom, #0A5E7E, transparent)' }} />
      </div>
    </section>
  )
}
