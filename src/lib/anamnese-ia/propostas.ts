/**
 * Propostas para os pontos de preparo que ficaram sem orientação na validação
 * (07/11/2026): itens mantidos como "não informado" ou marcados para corrigir
 * sem texto, e o preparo novo do trânsito colônico.
 *
 * Cada proposta aponta para um item de listarPendencias() (mesmo id). Ao
 * aprovar na página de validação, a resposta desse item passa a ser
 * "corrigir" com o texto da proposta, e o gerador de documentos aplica como
 * qualquer outra decisão. Nada aqui vale antes da aprovação médica.
 *
 * Base: site da NU.V.E.M, respostas da própria validação (Dra. Vera) e
 * materiais publicados por outros serviços (HC-FMB/UNESP, Rede D'Or,
 * Sitzmarks®, hospitais na Espanha, revisões sobre H. pylori).
 */

export type Proposta = {
  id: string          // id do item em listarPendencias()
  exame: string
  ponto: string
  hoje: string        // o que está no preparo hoje
  proposta: string    // texto que entra no preparo, um item por linha
  referencia: string  // o que outras clínicas fazem / de onde vem
  responsavel: string
}

const ACOMPANHANTE = 'Acompanhante: não é necessário. É obrigatório para menores de 18 anos ou idosos, pessoas com dificuldade de locomoção ou limitações cognitivas e pacientes muito ansiosos ou propensos a desmaios.'

export const PROPOSTAS: Proposta[] = [
  {
    id: 'manometria-esofagica:noDia-2', exame: 'Manometria esofágica (alta resolução e convencional)', ponto: 'Chegada antecipada',
    responsavel: 'Dra. Vera Ângelo',
    hoje: 'Não informado. O card do site diz 15 minutos antes.',
    proposta: 'Chegue 15 minutos antes do horário marcado, para o cadastro.',
    referencia: 'Outras clínicas pedem de 15 minutos a 1 hora de antecedência (os prazos maiores são de hospitais). 15 minutos é o mais comum e é o que o site já publica.',
  },
  {
    id: 'manometria-esofagica:noDia-4', exame: 'Manometria esofágica (alta resolução e convencional)', ponto: 'Roupa',
    responsavel: 'Dra. Vera Ângelo',
    hoje: 'Não informado. O card do site diz roupas com abertura frontal e evitar gola alta.',
    proposta: 'Use roupas confortáveis, de preferência com abertura na frente. Evite gola alta.\nEvite colares e brincos grandes.\nSe usar prótese dentária móvel, ela poderá ser retirada durante o exame.',
    referencia: 'Outras clínicas orientam roupa confortável e sem joias. O protocolo do HC-FMB/UNESP inclui conferir a retirada da prótese dentária (aprove essa linha só se fizer parte da rotina da clínica).',
  },
  {
    id: 'phmetria-impedanciometria:noDia-2', exame: 'pHmetria e impedanciopHmetria esofágica', ponto: 'Chegada antecipada e acompanhante',
    responsavel: 'Dra. Vera Ângelo',
    hoje: 'Não informado (sem orientação).',
    proposta: `Chegue 15 minutos antes do horário marcado.\n${ACOMPANHANTE}`,
    referencia: 'A regra do acompanhante é a mesma que a Dra. Vera escreveu para a manometria, os testes respiratórios e a avaliação pélvica. Um hospital da Rede D\'Or exige acompanhante maior de 18 anos na pHmetria.',
  },
  {
    id: 'phmetria-impedanciometria:apos-0', exame: 'pHmetria e impedanciopHmetria esofágica', ponto: 'Retirada do aparelho',
    responsavel: 'Dra. Vera Ângelo',
    hoje: 'Marcado para corrigir, mas sem orientação escrita. Não diz quando nem onde devolver o aparelho.',
    proposta: 'Volte à clínica no dia seguinte, no mesmo horário em que a sonda foi colocada (cerca de 24 horas depois), para retirar a sonda e devolver o aparelho com o diário preenchido.\nNão retire a sonda em casa. Se ela sair do lugar ou causar desconforto forte, entre em contato com a clínica.\nO laudo fica pronto alguns dias após a devolução do aparelho.',
    referencia: 'O HC-FMB/UNESP orienta voltar no dia seguinte, no mesmo horário, para retirar a sonda. Serviços na Espanha fazem a retirada entre 22 e 24 horas depois e recolhem o diário. Na NU.V.E.M a pHmetria não é instalada na sexta-feira (confirmado pela gestão em 08/11), então a retirada no dia seguinte sempre cai em dia útil.',
  },
  {
    id: 'teste-respiratorio-hpylori:noDia-4', exame: 'Teste respiratório para H. pylori', ponto: 'Chegada antecipada e acompanhante',
    responsavel: 'Dra. Vera Ângelo',
    hoje: 'Não informado (sem orientação).',
    proposta: `Chegue 15 minutos antes do horário marcado. O exame dura de 30 a 40 minutos.\n${ACOMPANHANTE}`,
    referencia: 'Laboratórios pedem que o paciente fique disponível por cerca de 40 minutos (duas coletas de ar com 20 a 30 minutos de intervalo). Sem sedação: mesma regra de acompanhante do teste para SIBO.',
  },
  {
    id: 'teste-respiratorio-hpylori:med-2', exame: 'Teste respiratório para H. pylori', ponto: 'Conferência: prazos de suspensão de medicamentos',
    responsavel: 'Dra. Vera Ângelo',
    hoje: 'O texto validado diz "4 semanas antes: antibióticos e bismuto" e, na lista de "15 dias antes", repete subsalicilato de bismuto e antibióticos. O paciente pode ficar em dúvida sobre qual prazo seguir.',
    proposta: 'Suspensão de medicamentos:\n4 semanas antes: suspender antibióticos e bismuto (inclusive subsalicilato de bismuto).\n3 semanas antes: suspender análogos de GLP-1 (Ozempic®, Rybelsus®, Wegovy®, Mounjaro®).\n15 dias antes: suspender inibidores de bomba de prótons (ex.: omeprazol, pantoprazol, esomeprazol, vonoprazana).\nImportante: medicamentos como Sucrafilm e LuftaGastro Pro podem ser usados até a véspera do exame.\nAntiácidos simples, alginato e sucralfato podem ser mantidos.\nColírios e antibióticos de uso tópico (na pele) não interferem no teste e podem ser continuados.',
    referencia: 'Revisões para profissionais recomendam suspender inibidores de bomba de prótons de 7 a 14 dias antes, e antibióticos e bismuto por pelo menos 28 dias (4 semanas). O restante é o texto da Dra. Vera, sem mudança.',
  },
  {
    id: 'avaliacao-pelvica:nota-1', exame: 'Avaliação pélvica com biofeedback eletromiográfico', ponto: 'Medicamentos',
    responsavel: 'Dra. Anna Karoline, com validação médica',
    hoje: 'Não informado (sem orientação de suspensão).',
    proposta: 'Continue usando seus medicamentos de uso contínuo, a menos que seu médico tenha dado uma orientação específica.',
    referencia: 'É a mesma frase aprovada pela Dra. Vera para a manometria anorretal. Não encontramos orientação publicada de suspender medicamentos para esta avaliação, que não é invasiva.',
  },
]

/** Chave da resposta à proposta (separada da resposta original do item). */
export const chaveProposta = (id: string) => `proposta:${id}`

/**
 * Ponto de partida para o preparo do trânsito colônico (Dra. Eliane). Os
 * [definir]/[confirmar] precisam ser trocados pela médica; enquanto houver
 * algum, o preparo não conta como respondido (novoCompleto).
 */
export const PROPOSTA_NOVOS: Record<string, { referencia: string; campos: Record<string, string> }> = {
  'transito-colonico': {
    referencia: 'Baseada no exame com marcadores radiopacos mais usado (Sitzmarks®): engolir a cápsula com um copo de água, sem laxantes, enemas ou supositórios, mantendo os medicamentos de uso contínuo; raio-X no 5º dia (normal quando mais de 80% dos marcadores já saíram). Outros serviços usam 20 marcadores e fazem raio-X nos dias 1, 2, 3, 5 e 8, por isso o protocolo precisa ser definido pela médica.',
    campos: {
      serve: 'Avalia quanto tempo o conteúdo leva para percorrer o intestino grosso (cólon). É usado na investigação da constipação (intestino preso).',
      ficha: 'O paciente engole uma cápsula com pequenos marcadores, que aparecem no raio-X, e faz radiografias simples do abdome nos dias definidos pela médica. Não é invasivo e não precisa de sedação. Pedido médico obrigatório.\n[definir] quantas cápsulas, em quais dias, e em quais dias é feito o raio-X.\n[definir] onde é feito o raio-X (na clínica ou em outro serviço).',
      antes: 'Não use laxantes, supositórios nem lavagens intestinais (enemas) durante todo o exame, até o último raio-X, conforme orientação médica.\n[definir] se é preciso parar também alguns dias antes de engolir a cápsula.',
      jejum: 'Não é necessário jejum. [confirmar]',
      medicamentos: 'Continue usando seus medicamentos de uso contínuo, a menos que seu médico tenha dado uma orientação específica.\nNão use laxantes, supositórios nem lavagens intestinais durante o exame.',
      noDia: 'Leve o pedido médico.\nEngula a cápsula com um copo de água, conforme orientação da médica.\nMantenha sua rotina e sua alimentação habituais, sem aumentar nem diminuir fibras e água por conta própria.\nCompareça a todos os raio-X nos dias e horários marcados.',
      apos: 'Os marcadores saem naturalmente nas fezes. Você poderá voltar às suas atividades normais e ao uso habitual dos seus medicamentos, conforme orientação médica.',
      contato: '',
    },
  },
}
