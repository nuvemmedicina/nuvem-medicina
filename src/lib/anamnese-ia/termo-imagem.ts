/**
 * Termo de autorização de uso de imagem e nome (texto único, versionado).
 *
 * Ao mudar QUALQUER palavra do texto, suba a versão. Cada aceite guarda a
 * versão e a impressão digital (SHA-256) do texto exato que a pessoa leu,
 * então um aceite antigo continua ligado ao texto que valia na época.
 * Versões anteriores ficam em VERSOES_ANTERIORES, para consulta.
 *
 * Situação: versão 1.1 ainda vai passar por revisão da gestão.
 */

export const TERMO = {
  versao: '1.1',
  revisao: '[A REVISAR PELA GESTÃO]',
  titulo: 'Termo de autorização de uso de imagem e nome',
} as const

export type DadosTermo = { nomeCompleto: string; registro: string }

/** Blocos do termo, com os dados da pessoa já preenchidos. */
export function blocosTermo({ nomeCompleto, registro }: DadosTermo) {
  const nome = nomeCompleto.trim() || '{nome completo}'
  const reg  = registro.trim() || '{registro profissional}'
  return [
    { tipo: 'p' as const, texto: `Eu, ${nome}, ${reg}, autorizo a NU.V.E.M Medicina (CRM-MG 20532) a usar minha imagem, meu nome, meu registro profissional e as informações profissionais que informei nesta anamnese em:` },
    { tipo: 'lista' as const, itens: [
      'site www.nuvemmedicina.com.br;',
      'perfis @nuvemmedicina e @nuvemensino;',
      'materiais institucionais e de divulgação da NU.V.E.M Medicina e da NU.V.E.M Ensino.',
    ] },
    { tipo: 'p' as const, texto: 'Esta autorização inclui as fotos minhas que a NU.V.E.M Medicina já usa no site e nos materiais da clínica.' },
    { tipo: 'p' as const, texto: 'A autorização é gratuita e vale enquanto eu fizer parte do corpo clínico. A clínica pode fazer recortes e ajustes de luz e cor, sem alterar minha aparência. Posso revogar esta autorização a qualquer momento pelo e-mail ou WhatsApp da clínica. Nesse caso, a clínica retira a imagem do site em até 10 dias úteis e deixa de usá-la em novas publicações.' },
    { tipo: 'p' as const, texto: 'Declaro que sou titular da foto enviada ou que tenho autorização do fotógrafo para cedê-la a este uso.' },
    { tipo: 'p' as const, texto: 'Também confirmo que o texto da minha página só será publicado depois da minha aprovação.' },
  ]
}

/** Texto corrido do termo (é este texto que tem a impressão digital guardada). */
export function textoTermo(d: DadosTermo) {
  const corpo = blocosTermo(d).map(b => b.tipo === 'p' ? b.texto : b.itens.map(i => `• ${i}`).join('\n')).join('\n\n')
  return `${TERMO.titulo} · versão ${TERMO.versao} · ${TERMO.revisao}\n\n${corpo}`
}

/** Histórico de versões do termo (texto de cada uma, para consulta). */
export const VERSOES_ANTERIORES: { versao: string; vigencia: string; observacao: string }[] = [
  {
    versao: '1.0',
    vigencia: '08/11/2026 (nunca usada em produção)',
    observacao: 'Igual à 1.1, sem a frase "Esta autorização inclui as fotos minhas que a NU.V.E.M Medicina já usa no site e nos materiais da clínica."',
  },
]
