import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-ink">
      <div className="text-center px-8">
        <div className="font-serif text-[8rem] font-light text-teal-light/10 leading-none mb-6">404</div>
        <h1 className="font-serif font-light text-white text-[2rem] mb-4">
          Página não <em className="italic text-gold" style={{fontStyle:'italic'}}>encontrada</em>
        </h1>
        <p className="text-[0.9rem] text-muted mb-10 max-w-md">
          A página que você procura não existe ou foi movida. Navegue pelo menu ou volte à página inicial.
        </p>
        <div className="flex flex-wrap gap-4 justify-center">
          <Link href="/" className="btn-gold">Voltar ao início</Link>
          <Link href="/agendar" className="btn-ghost">Agendar Consulta</Link>
        </div>
      </div>
    </div>
  )
}
