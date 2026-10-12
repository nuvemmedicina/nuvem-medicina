import type { Metadata } from 'next'
import Image              from 'next/image'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { ExternalLink, Smartphone, WifiOff, ShieldCheck, Volume2, Hand, Shirt, Download, Printer } from 'lucide-react'
import { SITE_URL }       from '@/lib/site'

const ALBUM_URL = 'https://album.nuvemmedicina.com.br'
const PDF_URL   = '/downloads/album-da-saude-nuvem.pdf'

const DESCRICAO =
  'Álbum da Saúde da NU.V.E.M Medicina: sete hábitos de saúde para crianças de 2 a 6 anos, com selos, ' +
  'roupinhas e histórias narradas. Gratuito, funciona no celular e sem internet.'

export const metadata: Metadata = {
  alternates:  { canonical: '/album-da-saude' },
  title:       'Álbum da Saúde · para crianças de 2 a 6 anos',
  description: DESCRICAO,
  openGraph: {
    type:        'website',
    url:         `${SITE_URL}/album-da-saude`,
    title:       'Álbum da Saúde · NU.V.E.M Medicina',
    description: DESCRICAO,
    images: [{ url: '/images/album-saude/capa.webp', width: 900, height: 725, alt: 'Nuvenzinha, Nuvenzinho e a Dra. Vera Ângelo' }],
  },
}

const MISSOES = [
  { id: 'agua',    nome: 'Beber água' },
  { id: 'comer',   nome: 'Comer bem' },
  { id: 'brincar', nome: 'Brincar faz bem' },
  { id: 'dentes',  nome: 'Dentes e sono' },
  { id: 'banho',   nome: 'Higiene do banho' },
  { id: 'medico',  nome: 'Ir ao médico sem medo' },
  { id: 'vacinas', nome: 'Vacinas' },
]

const COMO_FUNCIONA = [
  { Icon: Hand,    title: 'Toque e arraste',     desc: 'A criança cola selos e veste os personagens com o dedo. Não precisa saber ler e não existe resposta errada.' },
  { Icon: Volume2, title: 'Tudo narrado',        desc: 'Cada toque tem uma fala da Dra. Vera Ângelo. As legendas pequenas são para o adulto acompanhar.' },
  { Icon: Shirt,   title: 'Roupinhas de prêmio', desc: 'O primeiro selo de uma missão libera um acessório, o terceiro libera uma roupa nova e o sexto vale uma medalha.' },
]

export default function AlbumDaSaudePage() {
  return (
    <>
      <PageHero
        tag="Álbum da Saúde"
        title={<>Hábitos saudáveis viram <em>brincadeira</em></>}
        desc="A versão online do álbum impresso da NU.V.E.M: sete missões de saúde para crianças de 2 a 6 anos, com a Nuvenzinha, o Nuvenzinho e a Dra. Vera Ângelo."
      />

      {/* Abrir o álbum: QR no computador, botão em qualquer tela */}
      <SectionWrapper dark>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="reveal flex justify-center">
            <Image
              src="/images/album-saude/capa.webp"
              alt="Nuvenzinho, a Dra. Vera Ângelo e a Nuvenzinha"
              width={900}
              height={725}
              className="w-full max-w-[460px] h-auto"
              priority
            />
          </div>

          <div className="reveal reveal-d1">
            <p className="sec-tag">Abra no celular ou tablet</p>
            <h2 className="sec-title mt-2 mb-5">
              Gratuito, sem cadastro e <em>funciona sem internet</em>
            </h2>

            <div className="flex flex-col sm:flex-row lg:flex-col xl:flex-row items-center lg:items-start xl:items-center gap-8">
              <div className="hidden sm:block shrink-0 bg-white rounded-2xl p-3 border border-teal/10 shadow-sm">
                <Image
                  src="/images/album-saude/qr-album.png"
                  alt={`QR code para abrir o Álbum da Saúde em ${ALBUM_URL}`}
                  width={200}
                  height={200}
                  className="w-[180px] h-[180px]"
                />
              </div>
              <div className="min-w-0 text-center sm:text-left">
                <p className="hidden sm:block text-[0.95rem] font-light text-steel/65 leading-[1.8] mb-5">
                  Aponte a câmera do celular para o código ou acesse{' '}
                  <strong className="text-steel font-medium">album.nuvemmedicina.com.br</strong>.
                </p>
                <a href={ALBUM_URL} target="_blank" rel="noopener" className="btn-teal inline-flex items-center gap-2">
                  Abrir o Álbum da Saúde <ExternalLink className="w-4 h-4" aria-hidden="true" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </SectionWrapper>

      {/* Versão impressa para baixar */}
      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          <div className="reveal order-2 lg:order-1">
            <p className="sec-tag">Versão impressa</p>
            <h2 className="sec-title mt-2 mb-5">
              Prefere no <em>papel</em>? Baixe e imprima
            </h2>
            <p className="text-[0.95rem] font-light text-steel/65 leading-[1.8] mb-7">
              O Meu Álbum da Saúde também existe em versão para imprimir em casa: 22 páginas em A4,
              com as sete missões, os selos para marcar e as roupinhas da Nuvenzinha e do Nuvenzinho.
              É gratuito e pode ser usado junto com o álbum online.
            </p>
            <a href={PDF_URL} download className="btn-teal inline-flex items-center gap-2">
              Baixar o álbum em PDF <Download className="w-4 h-4" aria-hidden="true" />
            </a>
            <p className="flex items-center gap-2 mt-4 text-[0.82rem] font-light text-steel/55">
              <Printer className="w-4 h-4" aria-hidden="true" /> PDF · 22 páginas · 5,4 MB
            </p>
          </div>
          <div className="reveal reveal-d1 order-1 lg:order-2 flex justify-center">
            <a href={PDF_URL} download aria-label="Baixar o Meu Álbum da Saúde em PDF" className="block">
              <Image
                src="/images/album-saude/capa-impresso.webp"
                alt="Capa do Meu Álbum da Saúde impresso, com a Dra. Vera Ângelo, a Nuvenzinha e o Nuvenzinho"
                width={600}
                height={850}
                className="w-full max-w-[300px] h-auto rounded-xl shadow-[0_12px_32px_rgba(27,72,94,0.18)] rotate-[-2deg]"
              />
            </a>
          </div>
        </div>
      </SectionWrapper>

      {/* As sete missões */}
      <SectionWrapper>
        <div className="text-center max-w-2xl mx-auto mb-12 reveal">
          <p className="sec-tag">As sete missões</p>
          <h2 className="sec-title mt-2">Um selo para cada <em>hábito</em></h2>
        </div>
        <ul className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-6 reveal reveal-d1">
          {MISSOES.map(m => (
            <li key={m.id} className="flex flex-col items-center text-center gap-3">
              <Image src={`/images/album-saude/selo-${m.id}.webp`} alt="" width={120} height={120} className="w-[96px] h-[96px]" />
              <span className="text-[0.85rem] font-medium text-steel/80 leading-snug">{m.nome}</span>
            </li>
          ))}
        </ul>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16">
          {COMO_FUNCIONA.map(({ Icon, title, desc }) => (
            <div key={title} className="rounded-2xl border border-teal/10 bg-cloud p-7 reveal">
              <Icon className="w-6 h-6 text-teal mb-4" aria-hidden="true" />
              <h3 className="text-[1.05rem] font-medium text-steel mb-2">{title}</h3>
              <p className="text-[0.92rem] font-light text-steel/65 leading-[1.75]">{desc}</p>
            </div>
          ))}
        </div>
      </SectionWrapper>

      {/* Instalação e privacidade */}
      <SectionWrapper mist>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          <div className="reveal">
            <p className="sec-tag">Para os pais</p>
            <h2 className="sec-title mt-2 mb-6">Instale como <em>aplicativo</em></h2>
            <ol className="space-y-5 text-[0.95rem] font-light text-steel/70 leading-[1.75]">
              <li className="flex gap-3">
                <Smartphone className="w-5 h-5 text-teal shrink-0 mt-1" aria-hidden="true" />
                <span><strong className="text-steel font-medium">Android (Chrome):</strong> abra o álbum, toque no menu ⋮ e escolha “Instalar app” ou “Adicionar à tela inicial”.</span>
              </li>
              <li className="flex gap-3">
                <Smartphone className="w-5 h-5 text-teal shrink-0 mt-1" aria-hidden="true" />
                <span><strong className="text-steel font-medium">iPhone e iPad (Safari):</strong> abra o álbum, toque em Compartilhar e escolha “Adicionar à Tela de Início”.</span>
              </li>
              <li className="flex gap-3">
                <WifiOff className="w-5 h-5 text-teal shrink-0 mt-1" aria-hidden="true" />
                <span>Depois do primeiro acesso, o álbum funciona mesmo sem internet.</span>
              </li>
            </ol>
          </div>

          <div className="reveal reveal-d1">
            <p className="sec-tag">Privacidade</p>
            <h2 className="sec-title mt-2 mb-6">Nenhum dado sai do <em>aparelho</em></h2>
            <div className="flex gap-3 text-[0.95rem] font-light text-steel/70 leading-[1.75]">
              <ShieldCheck className="w-5 h-5 text-teal shrink-0 mt-1" aria-hidden="true" />
              <p>
                O álbum não tem cadastro nem login. Os selos, as roupinhas e o nome da criança ficam guardados
                apenas no próprio celular ou tablet. A área do adulto, para marcar consultas e vacinas e imprimir
                o diploma, é protegida por um portão simples.
              </p>
            </div>
          </div>
        </div>
      </SectionWrapper>
    </>
  )
}
