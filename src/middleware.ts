import { NextRequest, NextResponse } from 'next/server'
import createIntlMiddleware from 'next-intl/middleware'
import { routing } from '@/i18n/routing'
import { SLUGS_PROFISSIONAIS } from '@/lib/profissionais'

/**
 * Páginas ainda não traduzidas (fase 2 do projeto multilíngue). Uma tentativa
 * de acessá-las com prefixo de idioma (/en/sobre, /es/sobre) volta para a
 * versão pt-BR sem prefixo: nunca mostramos conteúdo português como se fosse
 * a versão em inglês/espanhol. Quando uma dessas páginas for traduzida, basta
 * tirar o segmento desta lista.
 */
const PT_ONLY_SEGMENTS = [
  'sobre',
  'equipe',
  // Páginas dos profissionais (src/lib/profissionais.ts).
  ...SLUGS_PROFISSIONAIS,
  'ensino',
  'convenios-medicos',
  'gestao-da-qualidade',
  'album-da-saude',
  'direitos-do-paciente',
  'politica-de-privacidade',
  'links',
  'obrigado',
  'anamnese-ia',
  // A página de preparos é só em português (lista e PDFs não traduzidos).
  'exames/preparos',
]
const ptOnlyPattern = new RegExp(`^/(en|es)/(${PT_ONLY_SEGMENTS.join('|')})(/.*)?$`)

const intlMiddleware = createIntlMiddleware(routing)

/**
 * Documentos internos do WordPress antigo que o Google ainda tem no índice.
 * Respondem 410 (Gone), e não redirect, para saírem do índice: não são página
 * pública e não têm equivalente no site.
 */
const REMOVIDAS_410 = new Set([
  '/biosseguranca-procedimento-operacional-padrao',
])

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (REMOVIDAS_410.has(pathname)) {
    return new NextResponse('Gone', {
      status:  410,
      headers: { 'Content-Type': 'text/plain; charset=utf-8', 'X-Robots-Tag': 'noindex' },
    })
  }

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
