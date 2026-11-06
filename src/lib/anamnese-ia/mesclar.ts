/**
 * Junta duas versões da validação dos preparos (servidor x quem está salvando).
 *
 * Várias pessoas da equipe médica usam o mesmo link (/anamnese-ia/validacao):
 * a Dra. Vera valida os 34 pontos e a Dra. Eliane escreve o preparo do
 * trânsito colônico. Sem junção, quem salva por último apagaria as respostas
 * da outra. Cada resposta leva "em" (momento da edição); vale a mais recente
 * item a item, e itens que só existem de um lado são mantidos.
 */
type Resp = { em?: string } & Record<string, unknown>
type Validacao = {
  validador?: string
  observacoes?: string
  observacoesEm?: string
  respostas?: Record<string, Resp>
  atualizadoEm?: string
}

const maisNovo = (a?: string, b?: string) => ((a ?? '') >= (b ?? '') ? a : b)

export function mesclarValidacao(antigo: Validacao | null, novo: Validacao): Validacao {
  if (!antigo) return novo
  const respostas: Record<string, Resp> = { ...(antigo.respostas ?? {}) }
  for (const [k, r] of Object.entries(novo.respostas ?? {})) {
    const atual = respostas[k]
    if (!atual || (r.em ?? '') >= (atual.em ?? '')) respostas[k] = r
  }
  const obsNovo = (novo.observacoesEm ?? '') >= (antigo.observacoesEm ?? '')
  return {
    ...novo,
    validador: novo.validador || antigo.validador,
    observacoes: obsNovo ? novo.observacoes : antigo.observacoes,
    observacoesEm: maisNovo(novo.observacoesEm, antigo.observacoesEm),
    respostas,
    atualizadoEm: maisNovo(novo.atualizadoEm, antigo.atualizadoEm),
  }
}
