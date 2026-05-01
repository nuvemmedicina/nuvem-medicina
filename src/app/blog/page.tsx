import type { Metadata } from 'next'
import Link    from 'next/link'
import { PageHero }       from '@/components/ui/PageHero'
import { SectionWrapper } from '@/components/ui/SectionWrapper'

export const metadata: Metadata = {
  title:       'Blog · Conteúdo Científico',
  description: 'Artigos e conteúdos sobre gastroenterologia, saúde digestiva, testes respiratórios, fisioterapia pélvica e ensino médico pela equipe NU.V.E.M.',
}

const CATEGORIAS = [
  'Gastroenterologia', 'Testes Respiratórios', 'SIBO & Disbiose',
  'Fisioterapia Pélvica', 'Halitose', 'ISO 9001', 'Ensino Médico',
]

const POSTS = [
  {
    slug:     'intolerancia-histamina',
    category: 'Gastroenterologia',
    date:     '23 de abril de 2026',
    title:    'Intolerância à histamina: fique atento a esta condição patológica',
    excerpt:  'A intolerância à histamina é uma condição frequentemente subdiagnosticada que pode causar sintomas gastrointestinais, cutâneos e neurológicos. Entenda o diagnóstico e o manejo clínico.',
  },
  {
    slug:     'esofagite-eosinofilica',
    category: 'Gastroenterologia',
    date:     '10 de abril de 2026',
    title:    'Esofagite Eosinofílica: Tratamento com IBPs e Diagnóstico',
    excerpt:  'A esofagite eosinofílica tem ganhado destaque na prática clínica. Revisamos as evidências atuais para diagnóstico e tratamento, incluindo o papel dos inibidores de bomba de prótons.',
  },
  {
    slug:     'roupa-intima-microbiota',
    category: 'SIBO & Disbiose',
    date:     '17 de março de 2026',
    title:    'Ciência e Microbiota: a "Roupa Íntima Inteligente" que revela segredos do intestino',
    excerpt:  'Pesquisadores desenvolveram dispositivo vestível capaz de monitorar a microbiota intestinal em tempo real. Entenda as implicações para o diagnóstico de disbiose e SIBO.',
  },
  {
    slug:     'sibo-diagnostico-tratamento',
    category: 'SIBO & Disbiose',
    date:     '1 de março de 2026',
    title:    'SIBO: diagnóstico pelo teste respiratório e novas diretrizes de tratamento',
    excerpt:  'As diretrizes internacionais para SIBO foram atualizadas. Revisamos as principais mudanças no diagnóstico com testes respiratórios de H₂, CH₄ e H₂S.',
  },
  {
    slug:     'manometria-alta-resolucao',
    category: 'Gastroenterologia',
    date:     '15 de fevereiro de 2026',
    title:    'Manometria de Alta Resolução: o padrão-ouro no diagnóstico de distúrbios motores esofágicos',
    excerpt:  'A manometria de alta resolução revolucionou o diagnóstico da acalasia e outros distúrbios motores do esôfago. Entenda como o exame funciona e quais são suas indicações.',
  },
  {
    slug:     'fisioterapia-pelvica-intestino',
    category: 'Fisioterapia Pélvica',
    date:     '5 de fevereiro de 2026',
    title:    'Fisioterapia pélvica na constipação: evidências e protocolo clínico',
    excerpt:  'A disfunção do assoalho pélvico é uma causa subestimada de constipação crônica. Revisamos as evidências para fisioterapia pélvica integrada ao tratamento gastroenterológico.',
  },
]

export default function BlogPage() {
  return (
    <>
      <PageHero
        tag="Blog"
        title={<>Conteúdo <em>científico</em> especializado</>}
        desc="Artigos produzidos pela equipe NU.V.E.M sobre gastroenterologia, saúde digestiva, diagnóstico avançado e ensino médico baseado em evidências."
      />

      <SectionWrapper>
        {/* Categorias */}
        <div className="flex flex-wrap gap-2 mb-12">
          <button className="px-4 py-2 rounded-full text-white text-[0.72rem] font-semibold transition-all"
            style={{ background: 'linear-gradient(135deg, #00465F, #0e7fa5)' }}>
            Todos
          </button>
          {CATEGORIAS.map(cat => (
            <button key={cat}
              className="px-4 py-2 rounded-full bg-cloud border border-teal/12 text-[0.72rem] font-medium text-steel/60 hover:border-teal/30 hover:text-teal transition-all">
              {cat}
            </button>
          ))}
        </div>

        {/* Posts grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {POSTS.map((post, i) => (
            <article
              key={post.slug}
              className={`group bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm hover:border-teal/25 hover:-translate-y-1 hover:shadow-md transition-all reveal reveal-d${i % 3}`}
            >
              {/* Placeholder image area */}
              <div className="h-40 flex items-center justify-center border-b border-teal/8"
                style={{ background: 'linear-gradient(135deg, rgba(203,228,230,0.35), rgba(0,70,95,0.08))' }}>
                <span className="font-serif text-[0.68rem] uppercase tracking-[.15em] text-teal/40">{post.category}</span>
              </div>

              <div className="p-7">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-[0.65rem] font-semibold uppercase tracking-[.1em] text-teal bg-teal/8 border border-teal/15 px-2.5 py-0.5 rounded-full">
                    {post.category}
                  </span>
                  <span className="text-[0.68rem] text-steel/40">{post.date}</span>
                </div>
                <h2 className="text-[0.92rem] font-semibold text-steel leading-snug mb-3 group-hover:text-teal transition-colors">
                  {post.title}
                </h2>
                <p className="text-[0.78rem] font-light text-steel/60 leading-[1.7] mb-5">{post.excerpt}</p>
                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1.5 text-[0.78rem] font-medium text-teal border-b border-teal/25 pb-px hover:gap-2.5 transition-all"
                >
                  Ler artigo →
                </Link>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex justify-center mt-12 gap-2">
          {[1, 2, 3, '...', 8].map((p, i) => (
            <button key={i}
              className={`w-10 h-10 rounded-lg text-[0.82rem] font-medium transition-all ${
                p === 1
                  ? 'text-white'
                  : 'bg-cloud border border-teal/10 text-steel/55 hover:border-teal/25 hover:text-teal'
              }`}
              style={p === 1 ? { background: 'linear-gradient(135deg, #00465F, #0e7fa5)' } : undefined}
            >
              {p}
            </button>
          ))}
        </div>
      </SectionWrapper>
    </>
  )
}
