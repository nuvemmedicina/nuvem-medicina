import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'

/**
 * Páginas ainda não traduzidas (fase 2 do projeto multilíngue). Uma tentativa
 * de acessá-las com prefixo de idioma (/en/sobre, /es/sobre) volta para a
 * versão pt-BR sem prefixo — nunca mostramos conteúdo português como se fosse
 * a versão em inglês/espanhol. Quando uma dessas páginas for traduzida, basta
 * tirar o segmento desta lista.
 */
const PT_ONLY_SEGMENTS = [
  'sobre',
  'equipe',
  'dra-vera-angelo',
  'dra-eliane-basques',
  'ensino',
  'convenios-medicos',
  'gestao-da-qualidade',
  'direitos-do-paciente',
  'politica-de-privacidade',
  'links',
  'obrigado',
]
const ptOnlyPattern = new RegExp(`^/(en|es)/(${PT_ONLY_SEGMENTS.join('|')})(/.*)?$`)

const intlMiddleware = createIntlMiddleware(routing)

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (ptOnlyPattern.test(pathname)) {
    const url = request.nextUrl.clone()
    url.pathname = pathname.replace(/^\/(en|es)/, '') || '/'
    return NextResponse.redirect(url, 307)
  }

  return intlMiddleware(request)
}

export const config = {
  matcher: ['/((?!api|studio|llms\\.txt|_next|_vercel|.*\\..*).*)'],
}
