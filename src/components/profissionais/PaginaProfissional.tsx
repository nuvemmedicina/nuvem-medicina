import Image from 'next/image'
import Link from 'next/link'
import { MessageCircle, ArrowDown, ArrowRight, Phone, MapPin, Clock, FileText, ExternalLink } from 'lucide-react'
import { MapaClinica } from './MapaClinica'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CONTATO, EXAMES } from '@/lib/data'
import { confirmado, type Foto, type Profissional } from '@/lib/profissionais'
import {
  especialidadeDeExibicao, formatarRegistro, iniciais, linhasConvenios, mensagemWhatsApp,
  nomeCompleto, passosDoAtendimento, perguntasFrequentes, temExames,
  textoTeleconsulta, ROTULO_TIPO,
} from '@/lib/profissionais-texto'

/**
 * Página de um profissional da NU.V.E.M, gerada só a partir dos dados de
 * src/lib/profissionais.ts. Nenhum texto sobre a pessoa é escrito aqui.
 *
 * Rastreamento: os botões de WhatsApp levam data-local-clique, lido pelo GTM
 * no evento clique_whatsapp (local_clique = "pagina_profissional"). Nome e
 * especialidade do profissional não vão para o dataLayer.
 */

type Props = {
  p: Profissional
  foto: Foto | null
  /** Prévia: mostra a faixa de rascunho e as listas ainda não validadas. */
  previa: boolean
  /** Versão do texto (profissionais-publicacao.ts), mostrada na faixa. */
  versao: string
}

const LOCAL_CLIQUE = 'pagina_profissional'

const rotuloPequeno = 'font-sans text-[0.72rem] font-semibold uppercase tracking-[.16em]'

function linkWhatsApp(p: Profissional) {
  return `${CONTATO.whatsappUrl}?text=${encodeURIComponent(mensagemWhatsApp(p))}`
}

function BotaoWhatsApp({ p, className = '' }: { p: Profissional; className?: string }) {
  return (
    <a
      href={linkWhatsApp(p)}
      target="_blank"
      rel="noopener noreferrer"
      data-local-clique={LOCAL_CLIQUE}
      className={`btn-teal justify-center ${className}`}
    >
      <MessageCircle className="w-4 h-4" aria-hidden />
      Agendar pelo WhatsApp
    </a>
  )
}

function TituloSecao({ rotulo, antes, destaque, depois = '' }: { rotulo: string; antes: string; destaque: string; depois?: string }) {
  return (
    <div className="mb-10">
      <p className={`${rotuloPequeno} text-gold-dark mb-3`}>{rotulo}</p>
      <h2 className="font-serif font-light text-teal leading-tight text-[2rem] md:text-[2.5rem]">
        {antes}<em className="italic text-gold-dark">{destaque}</em>{depois}
      </h2>
      <span className="block w-16 h-px bg-gold mt-5" aria-hidden />
    </div>
  )
}

function Retrato({ p, foto }: { p: Profissional; foto: Foto | null }) {
  return (
    <div className="relative w-full aspect-[4/5] rounded-2xl overflow-hidden bg-mist border border-gold/40">
      {foto ? (
        <Image
          src={foto.src}
          alt={nomeCompleto(p)}
          fill
          sizes="(min-width: 1024px) 360px, 112px"
          className="object-cover object-top"
          priority
        />
      ) : (
        <span className="absolute inset-0 flex items-center justify-center font-serif text-teal text-[2rem] lg:text-[4.5rem]" aria-hidden>
          {iniciais(p.nome)}
        </span>
      )}
    </div>
  )
}

/** Faixa da prévia. A versão é a que o profissional e a clínica aprovam. */
export function FaixaRascunho({ versao }: { versao: string }) {
  return (
    <div role="status" className="bg-gold-light/30 border-b border-gold/50 text-steel">
      <p className="max-w-[1240px] mx-auto px-4 sm:px-8 py-2 text-center text-[0.8rem] font-semibold">
        Rascunho · aguardando aprovação
        <span className="ml-2 font-normal text-steel/60">versão do texto {versao}</span>
      </p>
    </div>
  )
}

export function PaginaProfissional({ p, foto, previa, versao }: Props) {
  const esp = especialidadeDeExibicao(p)
  const registro = formatarRegistro(p.registro)
  const exames = temExames(p)
  const partesNome = p.nome.split(' ')
  const sobrenome = partesNome.length > 1 ? partesNome.pop()! : ''
  const bio = confirmado(p.bio)
  const faixa = confirmado(p.faixaEtaria)
  const tele = textoTeleconsulta(p)
  const dias = confirmado(p.diasDeAtendimento)
  const convenios = linhasConvenios(p)
  const lista = p.quandoProcurar
  const mostrarLista = !!lista && (previa || lista.validacao !== 'rascunho')
  const slugsExames = [...new Set(p.oQueFazNaNuvem.map(s => s.exameSlug).filter((s): s is string => !!s))]
  const cartoesExames = slugsExames.map(s => EXAMES.find(e => e.id === s)).filter(e => !!e)
  const faqs = perguntasFrequentes(p)
  // Linha sob o nome: a descrição só quando acrescenta algo ao rótulo
  // (ex.: "Médica especialista em Gastroenterologia"), mais o cargo.
  const apresentacao = [
    esp.descricao !== esp.rotulo ? `${esp.descricao}.` : null,
    p.cargo ? `${p.cargo} da NU.V.E.M.` : null,
  ].filter(Boolean).join(' ')

  return (
    <div className="pt-[76px] font-sans text-steel">
      {previa && <FaixaRascunho versao={versao} />}

      {/* 1 · Apresentação */}
      <header className="relative overflow-hidden bg-white">
        <div
          className="absolute -top-[20%] right-[-5%] w-[420px] h-[420px] rounded-full pointer-events-none"
          style={{ background: 'radial-gradient(circle, rgba(203,228,230,.55) 0%, transparent 65%)' }}
          aria-hidden
        />
        <div className="relative max-w-[1240px] mx-auto px-4 sm:px-8 pt-6 pb-12 lg:py-20 grid lg:grid-cols-[1fr_360px] gap-8 lg:gap-16 items-center">
          <div>
            <div className="flex gap-4 items-start lg:block">
              <div className="w-28 shrink-0 lg:hidden">
                <Retrato p={p} foto={foto} />
              </div>
              <div className="min-w-0">
                <p className={`${rotuloPequeno} text-gold-dark mb-2 lg:mb-4`}>{esp.rotulo}</p>
                <h1 className="font-serif font-light text-teal leading-[1.05] text-[2.1rem] sm:text-[2.6rem] lg:text-[3.8rem]">
                  {p.tratamento} {partesNome.join(' ')}{sobrenome && <> <em className="italic text-gold-dark">{sobrenome}</em></>}
                </h1>
                <p className="mt-2 lg:mt-4 text-[0.82rem] lg:text-[0.9rem] text-steel/75">{registro}</p>
              </div>
            </div>

            <span className="block w-16 h-px bg-gold my-5 lg:my-7" aria-hidden />

            {apresentacao && (
              <p className="text-[0.95rem] lg:text-[1.05rem] text-steel/80 leading-relaxed max-w-xl">{apresentacao}</p>
            )}

            <div className="mt-6 lg:mt-8 flex flex-col sm:flex-row gap-3">
              <BotaoWhatsApp p={p} className="w-full sm:w-auto" />
              {exames && (
                <a href="#exames" className="btn-ghost justify-center w-full sm:w-auto">
                  Ver exames <ArrowDown className="w-4 h-4" aria-hidden />
                </a>
              )}
            </div>
          </div>

          <div className="hidden lg:block">
            <Retrato p={p} foto={foto} />
          </div>
        </div>
        <div className="gold-line" aria-hidden />
      </header>

      {/* 2 · O que faz na NU.V.E.M */}
      <SectionWrapper id="atendimento" className="!py-16 lg:!py-24">
        <TituloSecao rotulo="Atendimento" antes="O que faz na " destaque="NU.V.E.M" />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {p.oQueFazNaNuvem.map(s => (
            <div key={s.nome} className="rounded-2xl bg-mist/40 border border-teal/10 p-6">
              {ROTULO_TIPO[s.tipo] !== s.nome && <p className={`${rotuloPequeno} text-teal/70 mb-2`}>{ROTULO_TIPO[s.tipo]}</p>}
              <h3 className="text-[1.05rem] font-semibold text-teal">{s.nome}</h3>
              {confirmado(s.convenios) && <p className="mt-2 text-[0.88rem] text-steel/75">{confirmado(s.convenios)}</p>}
            </div>
          ))}
        </div>

        <dl className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {faixa && <Info rotulo="Faixa etária" valor={faixa} />}
          {tele && p.fazConsulta && <Info rotulo="Teleconsulta" valor={tele} />}
          {!p.fazConsulta && <Info rotulo="Consulta" valor="Não faz consulta. Atende somente exames." />}
          {dias && <Info rotulo="Dias de atendimento" valor={dias} />}
        </dl>
        {convenios.length > 0 && (
          <p className="mt-6 text-[0.82rem] text-steel/60">
            Lista completa de convênios aceitos pela clínica em{' '}
            <Link href="/convenios-medicos" className="text-teal underline underline-offset-2 hover:text-teal-mid">convênios médicos</Link>.
          </p>
        )}
      </SectionWrapper>

      {/* 3 · Formação */}
      {bio && (
        <SectionWrapper dark className="!py-16 lg:!py-24">
          <TituloSecao rotulo="Formação" antes="Formação e " destaque="trajetória" />
          <p className="max-w-3xl text-[1rem] lg:text-[1.08rem] leading-[1.9] text-steel/85">{bio}</p>
        </SectionWrapper>
      )}

      {/* 3b · Publicações (só quando há livros nos dados) */}
      {p.livros && p.livros.length > 0 && (
        <SectionWrapper className="!py-16 lg:!py-24">
          <TituloSecao rotulo="Publicações" antes="Livros " destaque="publicados" />
          <ul className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
            {p.livros.map(livro => (
              <li key={livro.titulo}>
                <a
                  href={livro.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group h-full flex flex-col bg-white border border-teal/10 rounded-2xl overflow-hidden hover:border-gold/60 hover:-translate-y-1 hover:shadow-md transition-all"
                >
                  <div className="relative w-full aspect-[3/4] bg-mist overflow-hidden">
                    <Image
                      src={livro.capa}
                      alt={`Capa do livro ${livro.titulo}`}
                      fill
                      sizes="(min-width: 1024px) 280px, 50vw"
                      className="object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                    <div className="absolute bottom-0 left-0 right-0 h-px bg-gold" aria-hidden />
                  </div>
                  <div className="p-4 flex-1 flex flex-col">
                    <p className={`${rotuloPequeno} !text-[0.62rem] text-gold-dark mb-1.5`}>{livro.papel}</p>
                    <h3 className="text-[0.85rem] font-semibold text-teal leading-snug flex-1">{livro.titulo}</h3>
                    <p className="mt-3 pt-3 border-t border-teal/10 flex items-center justify-between gap-2 text-[0.72rem] text-steel/60">
                      {livro.editora} · {livro.ano}
                      <ExternalLink className="w-3.5 h-3.5 text-teal shrink-0" aria-label="Abre o site da editora" />
                    </p>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </SectionWrapper>
      )}

      {/* 4 · Como pode ajudar */}
      <SectionWrapper className="!py-16 lg:!py-24">
        <TituloSecao rotulo="Atuação" antes="Como pode " destaque="ajudar" />
        <p className={`${rotuloPequeno} text-steel/60 mb-3`}>Atua em</p>
        <ul className="flex flex-wrap gap-2">
          {p.areasDeAtuacao.map(a => (
            <li key={a} className="text-[0.85rem] px-4 py-2 rounded-full bg-mist/50 border border-teal/10 text-teal">{a}</li>
          ))}
        </ul>

        {mostrarLista && lista && (
          <div className="mt-10 rounded-2xl border border-gold/40 p-6 lg:p-8 max-w-3xl">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <h3 className="font-serif text-[1.6rem] text-teal">Quando procurar avaliação</h3>
              {lista.validacao === 'rascunho' && (
                <span className="text-[0.7rem] font-semibold uppercase tracking-[.12em] text-gold-dark border border-gold/50 rounded-full px-3 py-1">
                  Rascunho para validação da Dra. Vera
                </span>
              )}
            </div>
            <ul className="space-y-2">
              {lista.itens.map(i => (
                <li key={i.texto} className="flex gap-3 text-[0.95rem] text-steel/85">
                  <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden />
                  {i.texto}
                </li>
              ))}
            </ul>
            <p className="mt-5 text-[0.8rem] text-steel/60">
              Lista informativa, feita a partir das indicações dos exames. A indicação de cada exame é sempre do médico que acompanha o paciente.
            </p>
          </div>
        )}
      </SectionWrapper>

      {/* 5 · Exames relacionados */}
      {exames && (
        <SectionWrapper id="exames" dark className="!py-16 lg:!py-24 scroll-mt-20">
          <TituloSecao rotulo="Exames" antes="Exames " destaque="relacionados" />
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {cartoesExames.map(e => (
              <div key={e.id} className="rounded-2xl bg-white border border-teal/10 p-6 flex flex-col">
                <h3 className="text-[1.05rem] font-semibold text-teal">{e.title}</h3>
                <p className="mt-1 text-[0.85rem] text-steel/65">{e.subtitle}</p>
                <div className="mt-5 pt-4 border-t border-gold/30 flex flex-wrap gap-x-5 gap-y-2 text-[0.85rem] font-medium">
                  <Link href={`/exames/${e.id}`} className="inline-flex items-center gap-1 text-teal hover:text-teal-mid">
                    Sobre o exame <ArrowRight className="w-3.5 h-3.5" aria-hidden />
                  </Link>
                  <Link href={`/exames/preparos#${e.id}`} className="inline-flex items-center gap-1 text-teal hover:text-teal-mid">
                    <FileText className="w-3.5 h-3.5" aria-hidden /> Preparo
                  </Link>
                </div>
              </div>
            ))}
            {(p.servicosSemPagina ?? []).map(nome => (
              <div key={nome} className="rounded-2xl bg-white border border-teal/10 p-6">
                <h3 className="text-[1.05rem] font-semibold text-teal">{nome}</h3>
                <p className="mt-1 text-[0.85rem] text-steel/65">Informações e preparo pelo WhatsApp ou telefone.</p>
              </div>
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* 6 · Como é o atendimento */}
      <SectionWrapper className="!py-16 lg:!py-24">
        <TituloSecao rotulo="Passo a passo" antes="Como é o " destaque="atendimento" />
        <ol className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {passosDoAtendimento(p).map((passo, i) => (
            <li key={passo.titulo} className="rounded-2xl border border-teal/10 p-6">
              <span className="font-serif text-[2rem] text-gold-dark leading-none">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-3 text-[1rem] font-semibold text-teal">{passo.titulo}</h3>
              <p className="mt-1 text-[0.88rem] text-steel/75 leading-relaxed">{passo.texto}</p>
            </li>
          ))}
        </ol>
      </SectionWrapper>

      {/* 7 · Perguntas frequentes */}
      <SectionWrapper dark className="!py-16 lg:!py-24">
        <TituloSecao rotulo="Dúvidas" antes="Perguntas " destaque="frequentes" />
        <div className="max-w-3xl divide-y divide-teal/10 border-y border-teal/10">
          {faqs.map(f => (
            <details key={f.pergunta} className="group py-5">
              <summary className="cursor-pointer list-none flex justify-between gap-4 text-[1rem] font-semibold text-teal">
                {f.pergunta}
                <span className="text-gold-dark transition-transform group-open:rotate-45" aria-hidden>+</span>
              </summary>
              {f.resposta && <p className="mt-3 text-[0.93rem] text-steel/80 leading-relaxed">{f.resposta}</p>}
              {f.lista && f.lista.length > 0 && (
                <ul className="mt-3 space-y-1.5">
                  {f.lista.map(item => (
                    <li key={item} className="flex gap-3 text-[0.93rem] text-steel/80">
                      <span className="mt-[0.6em] w-1.5 h-1.5 rounded-full bg-gold shrink-0" aria-hidden />
                      {item}
                    </li>
                  ))}
                </ul>
              )}
              {f.nota && <p className="mt-3 text-[0.93rem] text-steel/80 leading-relaxed">{f.nota}</p>}
            </details>
          ))}
        </div>
      </SectionWrapper>

      {/* 8 · Agendamento (o rodapé do site vem do layout) */}
      <SectionWrapper id="agendamento" className="!py-16 lg:!py-24">
        <div className="grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] rounded-2xl overflow-hidden border border-teal/10 shadow-sm">
          <div className="relative bg-teal text-white p-5 sm:p-10">
            <div className="absolute top-0 left-0 right-0 h-px bg-gold" aria-hidden />
            <p className={`${rotuloPequeno} text-gold mb-3`}>Agendamento</p>
            <h2 className="font-serif font-light text-[1.9rem] sm:text-[2.2rem] leading-tight">
              Agende com {p.tratamento === 'Dr.' ? 'o' : 'a'}<br /><em className="italic text-gold">{nomeCompleto(p)}</em>
            </h2>

            <div className="mt-7 flex flex-col gap-3">
              <a
                href={linkWhatsApp(p)}
                target="_blank"
                rel="noopener noreferrer"
                data-local-clique={LOCAL_CLIQUE}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-white text-teal font-semibold px-4 sm:px-6 py-4 whitespace-nowrap hover:bg-mist transition-colors"
              >
                <MessageCircle className="w-4 h-4" aria-hidden />
                Agendar pelo WhatsApp
              </a>
              <a
                href={`tel:+55${CONTATO.telefone.replace(/\D/g, '')}`}
                className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/30 text-white font-semibold px-4 sm:px-6 py-4 whitespace-nowrap hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" aria-hidden />
                Ligar: {CONTATO.telefone}
              </a>
            </div>

            <dl className="mt-8 pt-6 border-t border-white/15 space-y-5 text-[0.9rem]">
              <div className="flex gap-3">
                <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" aria-hidden />
                <div>
                  <dt className={`${rotuloPequeno} !text-[0.62rem] text-white/55 mb-1`}>Horário da clínica</dt>
                  {CONTATO.horario.split(' · ').map(h => <dd key={h} className="text-white/85">{h}</dd>)}
                  {dias && <dd className="text-gold mt-1">{nomeCompleto(p)}: {dias.charAt(0).toLowerCase()}{dias.slice(1)}</dd>}
                </div>
              </div>
              <div className="flex gap-3">
                <MapPin className="w-4 h-4 text-gold shrink-0 mt-0.5" aria-hidden />
                <div>
                  <dt className={`${rotuloPequeno} !text-[0.62rem] text-white/55 mb-1`}>Endereço</dt>
                  <dd className="text-white/85">{CONTATO.endereco}</dd>
                  <dd className="text-white/85">{CONTATO.bairro} · {CONTATO.cep}</dd>
                </div>
              </div>
            </dl>
          </div>

          <div className="bg-white p-3 sm:p-4 min-h-[320px]">
            <MapaClinica />
          </div>
        </div>
      </SectionWrapper>
    </div>
  )
}

function Info({ rotulo, valor }: { rotulo: string; valor: string }) {
  return (
    <div className="rounded-2xl border border-teal/10 p-5">
      <dt className={`${rotuloPequeno} text-steel/55`}>{rotulo}</dt>
      <dd className="mt-1 text-[0.95rem] text-teal font-medium">{valor}</dd>
    </div>
  )
}
