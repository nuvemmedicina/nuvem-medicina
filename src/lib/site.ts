/**
 * Origem canônica do site — fonte única de verdade.
 *
 * IMPORTANTE: precisa corresponder exatamente ao host que a Vercel serve.
 * Hoje o apex (nuvemmedicina.com.br) responde 308 e redireciona para o www,
 * então o www é a versão canônica. Declarar o apex aqui faria cada página
 * apontar seu canonical para uma URL que redireciona, o que divide a
 * autoridade de domínio entre as duas versões e fragmenta os relatórios.
 *
 * Se um dia a Vercel passar a servir o apex, troque aqui — e só aqui.
 */
export const SITE_URL = 'https://www.nuvemmedicina.com.br'
