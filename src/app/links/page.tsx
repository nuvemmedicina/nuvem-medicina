import type { Metadata } from 'next'
import { Calendar, ArrowRight } from 'lucide-react'
import { LogoTeal }     from '@/components/icons/LogoTeal'
import { LinkBioButton } from '@/components/links/LinkBioButton'
import { getLinkBio }    from '@/lib/sanity/queries'
import { DEFAULT_LINK_BIO } from '@/lib/linkBio'
import { CONTATO }       from '@/lib/data'
import { SITE_URL }      from '@/lib/site'

export const revalidate = 60

export const metadata: Metadata = {
  alternates: { canonical: '/links' },
  title:      'Links',
  description: 'Agende sua consulta ou exame, veja convênios, preparos e conteúdos da NU.V.E.M Medicina.',
  // Página de menu, não de conteúdo: não deve ser indexada, mas o Google
  // precisa poder seguir os links internos para continuar rastreando o site.
  robots: {
    index:     false,
    follow:    true,
    googleBot: { index: false, follow: true },
  },
  openGraph: {
    type:  'website',
    url:   `${SITE_URL}/links`,
    title: 'NU.V.E.M Medicina — Links',
    description: 'Agende sua consulta ou exame, veja convênios, preparos e conteúdos da NU.V.E.M Medicina.',
    images: [{
      url:    '/images/clinica-nuvem-medicna.png',
      width:  1080,
      height: 1080,
      alt:    'NU.V.E.M Medicina',
    }],
  },
  twitter: {
    card:        'summary_large_image',
    title:       'NU.V.E.M Medicina — Links',
    description: 'Agende sua consulta ou exame, veja convênios, preparos e conteúdos da NU.V.E.M Medicina.',
    images:      ['/images/clinica-nuvem-medicna.png'],
  },
}

export default async function LinksPage() {
  let dados = DEFAULT_LINK_BIO
  try {
    dados = (await getLinkBio()) ?? DEFAULT_LINK_BIO
  } catch {
    // Sanity indisponível no momento da requisição: a página segue no ar com
    // o conteúdo inicial em vez de derrubar a rota inteira.
    dados = DEFAULT_LINK_BIO
  }

  const { posicionamento, chamadaPrincipal, destaques = [], blocos = [], mensagemWhatsapp, avisoTemporario } = dados
  const destaquesAtivos = destaques.filter(d => d.ativo !== false)

  return (
    <div className="min-h-screen bg-cloud flex flex-col items-center px-5 py-10">
      <div className="w-full max-w-[440px] flex flex-col items-center text-center">

        <LogoTeal className="h-11 w-auto" />

        <h1 className="font-serif font-light text-steel text-[1.3rem] mt-4 leading-snug">
          NU.V.E.M Medicina
        </h1>

        {posicionamento && (
          <p className="text-steel/55 text-[0.85rem] mt-1.5 leading-relaxed max-w-[340px]">
            {posicionamento}
          </p>
        )}

        {avisoTemporario?.ativo && avisoTemporario.texto && (
          <div className="w-full bg-gold/10 border border-gold/30 text-steel text-[0.85rem] rounded-xl px-4 py-3 mt-5 leading-snug">
            {avisoTemporario.texto}
          </div>
        )}

        <LinkBioButton
          rotulo={chamadaPrincipal.rotulo}
          destino={chamadaPrincipal.destino}
          bloco="Chamada principal"
          posicao={1}
          mensagemWhatsapp={mensagemWhatsapp}
          className="btn-gold w-full justify-center min-h-[52px] mt-6 text-[1rem]"
        >
          <Calendar className="w-5 h-5 shrink-0" />
          {chamadaPrincipal.rotulo}
        </LinkBioButton>

        {destaquesAtivos.length > 0 && (
          <section className="w-full mt-8">
            <p className="sec-tag justify-center">Em destaque</p>
            <div className="flex flex-col gap-3 mt-2">
              {destaquesAtivos.map((item, i) => (
                <LinkBioButton
                  key={item._key}
                  rotulo={item.rotulo}
                  destino={item.destino}
                  bloco="Em destaque"
                  posicao={i + 1}
                  mensagemWhatsapp={mensagemWhatsapp}
                  className="card-light w-full min-h-[56px] flex items-center justify-between gap-3 px-5 py-3 text-left transition-colors hover:border-teal/30"
                >
                  <span className="min-w-0">
                    <span className="block text-steel font-semibold text-[0.92rem] truncate">{item.rotulo}</span>
                    {item.descricao && (
                      <span className="block text-steel/55 text-[0.78rem] mt-0.5 leading-snug">{item.descricao}</span>
                    )}
                  </span>
                  <ArrowRight className="w-4 h-4 text-teal/50 shrink-0" />
                </LinkBioButton>
              ))}
            </div>
          </section>
        )}

        {blocos.map(bloco => (
          <section key={bloco._key} className="w-full mt-8">
            <p className="sec-tag justify-center">{bloco.titulo}</p>
            <div className="flex flex-col gap-2.5 mt-2">
              {bloco.itens.map((item, i) => (
                <LinkBioButton
                  key={item._key}
                  rotulo={item.rotulo}
                  destino={item.destino}
                  bloco={bloco.titulo}
                  posicao={i + 1}
                  mensagemWhatsapp={mensagemWhatsapp}
                  className="w-full min-h-[48px] flex items-center justify-between gap-3 px-5 rounded-xl border border-teal/15 bg-white text-steel text-[0.9rem] font-medium transition-colors hover:border-teal/35"
                >
                  <span className="truncate">{item.rotulo}</span>
                  <ArrowRight className="w-4 h-4 text-teal/40 shrink-0" />
                </LinkBioButton>
              ))}
            </div>
          </section>
        ))}

        <footer className="w-full mt-10 pt-6 border-t border-teal/10 text-center">
          <p className="text-[0.7rem] text-steel/45 leading-relaxed">
            {CONTATO.endereco} – {CONTATO.bairro}
          </p>
          <p className="text-[0.7rem] text-steel/45 mt-1 leading-relaxed">
            {CONTATO.diretora.nome} · {CONTATO.diretora.crm} · {CONTATO.crmClinica}
          </p>
          <LinkBioButton
            rotulo="Política de Privacidade"
            destino={{ tipo: 'interno', rotaInterna: '/politica-de-privacidade' }}
            bloco="Rodapé"
            posicao={1}
            className="inline-flex items-center justify-center min-h-11 text-[0.7rem] text-teal/70 underline underline-offset-2 mt-1"
          >
            Política de Privacidade
          </LinkBioButton>
        </footer>

      </div>
    </div>
  )
}
