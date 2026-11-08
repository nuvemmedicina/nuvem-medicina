/**
 * Regra de comunicação do CFM aplicada às respostas da nuvete
 * (Res. CFM nº 2.336/2023: sem superlativo nem promessa de resultado).
 *
 * O prompt já proíbe estes termos, mas o modelo às vezes escapa. A resposta
 * passa por até três etapas:
 *   1. resposta original, se não tiver termo proibido;
 *   2. uma reescrita pedida ao modelo, se a original tiver;
 *   3. RESPOSTA_PADRAO, se a reescrita também tiver (ou vier vazia).
 *
 * Cada acionamento gera uma linha de log `nuvete_regra_cfm` para a revisão
 * mensal. O log NUNCA leva a pergunta, a resposta ou qualquer dado da pessoa:
 * só a etapa, os termos encontrados e a data.
 */

const PROIBIDAS = /(?<!\p{L})(garant(ir|ia|ias|ido|ida|idos|idas|e|em|imos)|s[óo]lid[ao]s?|excel[êe]ncia|refer[êe]ncia|melhor(es)?|[úu]nic[oa]s?|mais modern[oa]s?|[úu]ltima gera[çc][ãa]o|cura(s|r)?|resolv(e|em|er|ido|ida))(?!\p{L})|\u2014/giu

export const RESPOSTA_PADRAO = 'Para essa dúvida, nossa equipe pode ajudar: WhatsApp (31) 99726-1029. 💙'

/** Termos proibidos encontrados no texto, sem repetição, em minúsculas. */
export function termosProibidos(texto: string): string[] {
  return [...new Set((texto.match(PROIBIDAS) ?? []).map(t => t.toLowerCase()))]
}

export type EtapaRegraCfm = 'reescrita' | 'resposta_padrao'

export type RegistroRegraCfm = {
  evento: 'nuvete_regra_cfm'
  etapa:  EtapaRegraCfm
  termos: string[]
  data:   string
}

/** Grava o acionamento no log do servidor (Vercel), sem conteúdo da conversa. */
export function registrarNoLog(registro: RegistroRegraCfm): void {
  console.warn(JSON.stringify(registro))
}

/**
 * Aplica as três etapas. `reescrever` recebe os termos encontrados e devolve o
 * texto reescrito pelo modelo; `registrar` é injetável para teste.
 */
export async function aplicarRegraCfm(
  original: string,
  reescrever: (termos: string[]) => Promise<string>,
  registrar: (r: RegistroRegraCfm) => void = registrarNoLog,
): Promise<string> {
  const termosOriginal = termosProibidos(original)
  // Resposta vazia não é caso da regra: quem chama trata (mensagem de erro).
  if (!original || !termosOriginal.length) return original

  registrar({ evento: 'nuvete_regra_cfm', etapa: 'reescrita', termos: termosOriginal, data: new Date().toISOString() })

  let reescrita = ''
  try {
    reescrita = await reescrever(termosOriginal)
  } catch {
    // Falha na segunda chamada: cai na resposta padrão, nunca na original.
    reescrita = ''
  }

  const termosReescrita = termosProibidos(reescrita)
  if (reescrita && !termosReescrita.length) return reescrita

  registrar({
    evento: 'nuvete_regra_cfm',
    etapa:  'resposta_padrao',
    // Reescrita vazia ou com falha: registra os termos da original.
    termos: termosReescrita.length ? termosReescrita : termosOriginal,
    data:   new Date().toISOString(),
  })
  return RESPOSTA_PADRAO
}
