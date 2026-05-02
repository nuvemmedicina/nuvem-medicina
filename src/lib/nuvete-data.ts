// ─── Nuvete — Base de Conhecimento ───────────────────────────────────────────
// A Nuvete é a assistente virtual da NU.V.E.M Medicina.
// Personalidade: acolhedora, técnica, precisa e nunca faz diagnósticos.

export const NUVETE_PERSONA = {
  nome:       'Nuvete',
  descricao:  'Assistente da NU.V.E.M Medicina',
  avatar:     '/images/nuvete.png', // colocar foto real em /public/images/nuvete.png
  saudacao:   'Olá! Sou a Nuvete 👋 Assistente da NU.V.E.M Medicina. Posso te ajudar com preparos para exames, agendamentos e informações sobre nossa clínica. Como posso te ajudar?',
  disclaimer: 'Sou uma assistente virtual e não realizo diagnósticos médicos. Para avaliação clínica, consulte nossos especialistas.',
}

// ─── Tópicos de menu rápido ───────────────────────────────────────────────────
export type NuveteTopico = {
  id:    string
  emoji: string
  label: string
}

export const NUVETE_TOPICOS: NuveteTopico[] = [
  { id: 'preparo',      emoji: '📋', label: 'Preparo para exames' },
  { id: 'agendar',     emoji: '📅', label: 'Quero agendar' },
  { id: 'exames',      emoji: '🔬', label: 'Nossos exames' },
  { id: 'especialidades', emoji: '🩺', label: 'Especialidades' },
  { id: 'equipe',      emoji: '👩‍⚕️', label: 'Nossa equipe' },
  { id: 'convenios',   emoji: '💳', label: 'Convênios aceitos' },
  { id: 'localizacao', emoji: '📍', label: 'Como chegar' },
  { id: 'ensino',      emoji: '🎓', label: 'Cursos e treinamentos' },
]

// ─── Preparos detalhados por exame ────────────────────────────────────────────
export type PreparoExame = {
  id:       string
  nome:     string
  emoji:    string
  duracao:  string
  itens:    string[]
  aviso?:   string
}

export const PREPAROS_EXAMES: PreparoExame[] = [
  {
    id:      'manometria',
    nome:    'Manometria Esofágica',
    emoji:   '🫁',
    duracao: '30–60 min',
    itens: [
      'Jejum de 6 horas antes do exame',
      'Suspender medicamentos que afetam motilidade (somente com orientação do seu médico)',
      'Usar roupas confortáveis (não precisa de roupa hospitalar)',
      'Trazer o pedido médico e exames anteriores',
    ],
    aviso: 'Caso use omeprazol ou similar, consulte seu médico antes de suspender.',
  },
  {
    id:      'manometria-anorretal',
    nome:    'Manometria Anorretal',
    emoji:   '🩺',
    duracao: '40–60 min',
    itens: [
      'Não é necessário jejum',
      'Realizar enema retal (Fleet) 2 horas antes, conforme orientação da clínica',
      'Roupas confortáveis e de fácil remoção',
      'Informar à equipe se usa anticoagulantes ou supositórios',
    ],
  },
  {
    id:      'phmetria',
    nome:    'pHmetria Esofágica 24h',
    emoji:   '⏱️',
    duracao: '24 horas de monitoramento',
    itens: [
      'Suspender inibidores de bomba de prótons (IBP) por 7 dias. SOMENTE com autorização do médico solicitante.',
      'Suspender antiácidos e procinéticos 48 horas antes',
      'Jejum de 4 horas antes da instalação do cateter',
      'Manter atividade normal durante as 24 horas',
      'Registrar sintomas e horários das refeições no diário fornecido pela clínica',
      'Evitar alimentos muito ácidos durante o exame (limão, vinagre)',
    ],
    aviso: 'Nunca suspenda IBPs por conta própria. Confirme com seu médico.',
  },
  {
    id:      'respiratorio-lactose',
    nome:    'Teste Respiratório: Lactose / Frutose',
    emoji:   '💨',
    duracao: '2–3 horas',
    itens: [
      'Jejum de 12 horas (somente água é permitida)',
      'Dia anterior: evitar feijão, lentilha, grão-de-bico, brócolis, couve-flor, pera, maçã, mel e alimentos com fibras fermentáveis',
      'Não usar antibióticos nas 4 semanas anteriores',
      'Não usar probióticos nas 2 semanas anteriores',
      'Não escovar dentes com creme dental 30 min antes do exame',
      'Não fumar 1 hora antes',
      'Não praticar exercícios intensos 1 hora antes',
    ],
  },
  {
    id:      'respiratorio-hpylori',
    nome:    'Teste Respiratório: *H. pylori* (UREA)',
    emoji:   '🦠',
    duracao: '30–40 min',
    itens: [
      'Jejum de 4 horas',
      'Suspender antibióticos e bismuto por 4 semanas antes',
      'Suspender IBPs por 2 semanas antes (com orientação médica)',
      'Não fumar no dia do exame',
    ],
    aviso: 'Confirme a suspensão de medicamentos com seu médico antes do exame.',
  },
  {
    id:      'respiratorio-sibo',
    nome:    'Teste Respiratório: SIBO (H₂/CH₄/H₂S)',
    emoji:   '🔬',
    duracao: '3 horas',
    itens: [
      'Jejum de 12 horas (somente água)',
      'Dia anterior: dieta especial restritiva: arroz branco, frango grelhado, carne bovina, ovos, peixe, azeite, sal. EVITAR todo o restante.',
      'Não usar antibióticos nas 4 semanas anteriores',
      'Não usar probióticos/prebióticos nas 2 semanas anteriores',
      'Não usar laxativos nas 24 horas anteriores',
      'Não escovar dentes 30 min antes',
      'Não fumar 1 hora antes',
    ],
    aviso: 'A dieta do dia anterior é essencial para a precisão do resultado. Não pulá-la.',
  },
  {
    id:      'halimetria',
    nome:    'Halimetria e Sialometria',
    emoji:   '💬',
    duracao: '30–40 min',
    itens: [
      'Não comer nas 3 horas anteriores ao exame',
      'Não escovar dentes nas 2 horas anteriores',
      'Não usar enxaguante bucal ou spray bucal no dia',
      'Não usar perfume forte ou desodorante no dia',
      'Não fumar 2 horas antes',
      'Água é permitida normalmente',
    ],
  },
  {
    id:      'pelvico',
    nome:    'Avaliação Pélvica (Biofeedback/EMG)',
    emoji:   '🧘',
    duracao: '40–60 min',
    itens: [
      'Não é necessário jejum',
      'Higiene íntima normal no dia',
      'Roupa confortável e de fácil remoção',
      'Trazer exames anteriores se houver (manometria anorretal, ultrassom pélvico)',
      'Informar todos os medicamentos em uso',
    ],
  },
]

// ─── Respostas automáticas por intenção ───────────────────────────────────────
export type NuveteResposta = {
  gatilhos:  string[]   // palavras-chave que ativam a resposta
  resposta:  string
  botoes?:   { label: string; acao: string }[]
}

export const NUVETE_RESPOSTAS: NuveteResposta[] = [

  // ── Médicas ──────────────────────────────────────────────────────────────────
  {
    gatilhos: ['dra vera', 'vera ângelo', 'vera angelo', 'dr vera', 'diretora técnica', 'fundadora', 'vera'],
    resposta: '👩‍⚕️ **Dra. Vera Ângelo**\nGastroenterologista · Sócia Fundadora da NU.V.E.M\n\n🎓 Mestre e Doutora em Patologia pela UFMG\n📜 Título de Especialista pela Federação Brasileira de Gastroenterologia\n📚 Professora convidada do Hospital Israelita Albert Einstein\n✍️ Autora de diversas obras pela Editora Rubio\n🔬 Referência nacional em testes respiratórios e motilidade digestiva\n\n**CRM-MG 22284 · RQE 10411 · RQE 22736**',
    botoes: [
      { label: '👩‍⚕️ Ver perfil completo', acao: 'link:/equipe/dra-vera' },
      { label: '📅 Agendar com a Dra. Vera', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['dra eliane', 'eliane', 'basques', 'cirurgia pediátrica', 'diretora substituta'],
    resposta: '👩‍⚕️ **Dra. Eliane Basques Moura**\nCirurgiã Pediátrica · Diretora Técnica Substituta\n\nEspecialista em cirurgia pediátrica com ampla experiência no atendimento de crianças e adolescentes, integrando a equipe multidisciplinar da NU.V.E.M com o olhar clínico voltado ao paciente pediátrico.\n\n**CRM-MG 27601 · RQE 9324**',
    botoes: [
      { label: '👩‍⚕️ Ver perfil completo', acao: 'link:/equipe/dra-eliane' },
      { label: '📅 Agendar consulta', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['equipe', 'médicos', 'medicos', 'especialistas', 'quem atende', 'profissionais'],
    resposta: '👩‍⚕️ **Nossa Equipe Multidisciplinar:**\n\n- **Dra. Vera Ângelo**, Gastroenterologista, fundadora e referência em motilidade digestiva\n- **Dra. Eliane Basques Moura**, Cirurgiã Pediátrica\n- Fisioterapeutas pélvicos especializados\n- Nefrologista\n- Pediatra\n- Especialistas em halitose\n\nTodos os profissionais atuam de forma integrada sob gestão ISO 9001 💙',
    botoes: [
      { label: '👥 Conhecer toda a equipe', acao: 'link:/equipe' },
      { label: '📅 Agendar consulta', acao: 'whatsapp' },
    ],
  },

  // ── Especialidades ───────────────────────────────────────────────────────────
  {
    gatilhos: ['especialidade', 'especialidades', 'o que vocês tratam', 'o que voces tratam', 'que doenças', 'que doencas'],
    resposta: '🩺 **Especialidades da NU.V.E.M:**\n\n🔹 **Gastroenterologia**: doenças do aparelho digestivo\n🔹 **Fisioterapia Pélvica**: assoalho pélvico e constipação\n🔹 **Halitose**: diagnóstico e tratamento do mau hálito\n🔹 **Pediatria**: saúde digestiva infantil\n🔹 **Nefrologia**: saúde renal\n🔹 **Motilidade Digestiva**: exames funcionais avançados\n\nQuer saber mais sobre alguma especialidade específica?',
    botoes: [
      { label: '🩺 Ver todas as especialidades', acao: 'link:/especialidades' },
      { label: '📅 Agendar consulta', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['gastroenterologia', 'gastro', 'digestivo', 'intestino', 'estômago', 'estomago', 'cólon', 'colon', 'gastrite', 'colite', 'crohn', 'celiaca', 'celíaca'],
    resposta: '🔹 **Gastroenterologia**\n\nA NU.V.E.M é especializada em doenças do aparelho digestivo, com foco em diagnóstico de precisão:\n\n- Doença do refluxo (DRGE)\n- Acalasia e distúrbios motores esofágicos\n- Síndrome do intestino irritável (SII)\n- Doença de Crohn e retocolite\n- Doença celíaca\n- Gastrite e *H. pylori*\n- SIBO e disbiose intestinal\n- Constipação crônica\n- Doenças funcionais digestivas',
    botoes: [
      { label: '🩺 Saiba mais', acao: 'link:/especialidades/gastroenterologia' },
      { label: '📅 Agendar consulta', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['fisioterapia pélvica', 'pelvico', 'pélvico', 'assoalho pélvico', 'assoalho pelvico', 'incontinência', 'incontinencia', 'bexiga', 'constipação', 'constipacao'],
    resposta: '🔹 **Fisioterapia Pélvica**\n\nEspecialidade que cuida do assoalho pélvico, indicada para:\n\n- Incontinência urinária ou fecal\n- Constipação funcional\n- Disfunções do assoalho pélvico\n- Dor pélvica crônica\n- Preparação e recuperação pós-parto\n- Prolapso de órgãos pélvicos\n\nRealizamos avaliação com biofeedback e eletromiografia (EMG) de superfície.',
    botoes: [
      { label: '🩺 Saiba mais', acao: 'link:/especialidades/fisioterapia-pelvica' },
      { label: '📅 Agendar avaliação', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['pediatria', 'criança', 'crianca', 'bebê', 'bebe', 'infantil', 'filho', 'pediatra'],
    resposta: '🔹 **Pediatria**\n\nAtendemos crianças e adolescentes com queixas digestivas e funcionais:\n\n- Constipação infantil\n- Dor abdominal recorrente\n- Refluxo em crianças\n- Problemas alimentares\n- Avaliação do crescimento e saúde intestinal\n\nA Dra. Eliane Basques Moura, cirurgiã pediátrica, integra nossa equipe para os casos cirúrgicos.',
    botoes: [
      { label: '🩺 Saiba mais', acao: 'link:/especialidades/pediatria' },
      { label: '📅 Agendar consulta pediátrica', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['nefrologia', 'rim', 'rins', 'renal', 'nefro'],
    resposta: '🔹 **Nefrologia**\n\nA NU.V.E.M conta com nefrologista para cuidar da saúde renal de forma integrada com o acompanhamento digestivo:\n\n- Doença renal crônica\n- Pedras nos rins (nefrolitíase)\n- Hipertensão de causa renal\n- Alterações em exames de urina e sangue',
    botoes: [
      { label: '🩺 Saiba mais', acao: 'link:/especialidades/nefrologia' },
      { label: '📅 Agendar consulta', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['motilidade', 'motilidade digestiva', 'funcional', 'doenças funcionais', 'dgbi', 'distúrbio cérebro-intestino', 'disturbio cerebro-intestino', 'interação cérebro-intestino'],
    resposta: '🔹 **Motilidade Digestiva**\n\nAvaliação dos movimentos e da função do aparelho digestivo com exames de alta precisão:\n\n- Manometria Esofágica de Alta Resolução\n- Manometria Anorretal\n- pHmetria e Impedanciopletismografia\n- Testes Respiratórios (H₂, CH₄, H₂S)\n\nSomos referência nacional nessa área, com a Dra. Vera Ângelo à frente das pesquisas.',
    botoes: [
      { label: '🩺 Saiba mais', acao: 'link:/especialidades/motilidade-digestiva' },
      { label: '📅 Agendar exame', acao: 'whatsapp' },
    ],
  },

  // ── Exames ───────────────────────────────────────────────────────────────────
  {
    gatilhos: ['exames', 'que exames', 'quais exames', 'exame disponível', 'exame disponivel'],
    resposta: '🔬 **Exames disponíveis na NU.V.E.M:**\n\n- 🫁 Manometria Esofágica de Alta Resolução\n- 🩺 Manometria Anorretal\n- ⏱️ pHmetria Esofágica 24h\n- 💨 Testes Respiratórios (Lactose, Frutose, SIBO, *H. pylori*)\n- 💬 Halimetria e Sialometria\n- 🧘 Avaliação Pélvica (Biofeedback/EMG)\n\nQuer saber o preparo para algum exame?',
    botoes: [
      { label: '🔬 Ver todos os exames', acao: 'link:/exames' },
      { label: '📋 Ver preparos', acao: 'link:/exames/preparos' },
      { label: '📅 Agendar exame', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['laudo', 'resultado', 'quando fica pronto', 'prazo'],
    resposta: '📄 **Prazos dos laudos na NU.V.E.M:**\n\n- Manometria: até 3 dias úteis\n- pHmetria: alguns dias após a devolução do equipamento\n- Testes Respiratórios: até 3 dias úteis\n- Halimetria e Sialometria: até 2 dias úteis\n\nTodos os laudos seguem o padrão ISO 9001. Estruturados, detalhados e entregues no prazo. 💙',
    botoes: [
      { label: '📅 Agendar exame', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['encaminhamento', 'pedido médico', 'pedido medico', 'precisa de pedido', 'precisa de encaminhamento'],
    resposta: '📋 **Pedido médico:**\n\nPara a maioria dos **exames**, é necessário um pedido médico.\n\nPara **consultas**, não é necessário encaminhamento. Você pode agendar diretamente conosco!\n\nEm dúvida sobre seu caso? Nossa equipe te orienta pelo WhatsApp. 💙',
    botoes: [
      { label: '📱 Falar pelo WhatsApp', acao: 'whatsapp' },
    ],
  },

  // ── Respostas gerais ─────────────────────────────────────────────────────────
  {
    gatilhos: ['agendar', 'marcar', 'consulta', 'appointment', 'vaga'],
    resposta: 'Para agendar uma consulta na NU.V.E.M, você pode:\n\n📱 **WhatsApp:** (31) 99726-1029\n📞 **Telefone:** (31) 2537-3131\n🌐 **Online:** pelo nosso formulário de agendamento\n\nAtendemos de segunda a sexta, das 7h30 às 17h30.',
    botoes: [
      { label: '📱 Abrir WhatsApp', acao: 'whatsapp' },
      { label: '📋 Formulário online', acao: 'link:/agendar' },
    ],
  },
  {
    gatilhos: ['convenio', 'convênio', 'plano', 'saúde', 'unimed', 'bradesco', 'sulamerica', 'amil'],
    resposta: 'Trabalhamos com os principais convênios: Unimed BH, Bradesco Saúde, SulAmérica, Amil, NotreDame e outros.\n\nTambém aceitamos particular com emissão de recibo para reembolso.\n\nQuer que eu consulte um plano específico?',
    botoes: [
      { label: '💳 Ver convênios completo', acao: 'link:/convenios' },
    ],
  },
  {
    gatilhos: ['endereço', 'endereco', 'localização', 'localizacao', 'onde fica', 'como chegar', 'santa efigênia'],
    resposta: '📍 **NU.V.E.M Medicina**\nRua Ceará, 600 – Sala 101\nSanta Efigênia, Belo Horizonte – MG\n\n🚇 Próximo ao metrô Santa Efigênia\n🚌 Várias linhas de ônibus passam pela Rua Ceará\n🚗 Estacionamentos privados nas proximidades',
    botoes: [
      { label: '🗺️ Abrir no Maps', acao: 'link:https://goo.gl/maps/BELYyu7yUHd41gdc8' },
    ],
  },
  {
    gatilhos: ['horário', 'horario', 'funciona', 'aberto', 'atende'],
    resposta: '🕐 **Horário de Atendimento:**\nSegunda a Sexta: 7h30 às 17h30\n\n📞 (31) 2537-3131\n📱 (31) 99726-1029',
  },
  {
    gatilhos: ['sibo', 'supercrescimento', 'imo', 'libo'],
    resposta: 'A NU.V.E.M é referência em diagnóstico de SIBO (supercrescimento bacteriano intestinal) e IMO (supercrescimento de metanogênicos).\n\nUtilizamos testes respiratórios com H₂, CH₄ e H₂S, o protocolo mais completo disponível, sem coleta de sangue.\n\nGostaria de saber sobre o preparo para o teste respiratório?',
    botoes: [
      { label: '📋 Ver preparo SIBO', acao: 'preparo:respiratorio-sibo' },
      { label: '📅 Agendar exame', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['ensino', 'curso', 'treinamento', 'hands-on', 'capacitação'],
    resposta: 'O **NU.V.E.M Ensino** oferece formação especializada para médicos e profissionais de saúde:\n\n🎓 Aperfeiçoamento Teórico (~R$ 450)\n🔬 Imersão Hands-On (R$ 2.200–5.000)\n📜 Certificação ISO 9001 inclusa no Hands-On\n\nTrilhas: Gastroenterologia & Motilidade · Saúde Pélvica · Halitose',
    botoes: [
      { label: '🎓 Ver programas de ensino', acao: 'link:/ensino' },
      { label: '📧 Solicitar informações', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['iso', '9001', 'certificação', 'certificado', 'qualidade'],
    resposta: 'A NU.V.E.M é a **única clínica do segmento em Belo Horizonte** com certificação ISO 9001.\n\nIsso significa que cada processo, do agendamento ao diagnóstico, é padronizado, auditado e continuamente melhorado conforme padrões internacionais de qualidade.',
    botoes: [
      { label: '🏆 Saiba mais sobre a ISO 9001', acao: 'link:/gestao-da-qualidade' },
    ],
  },
  {
    gatilhos: ['h pylori', 'pylori', 'helicobacter'],
    resposta: 'O diagnóstico de *H. pylori* na NU.V.E.M é feito pelo **teste respiratório com ureia marcada**: não invasivo, sem endoscopia e altamente preciso.\n\nGostaria de saber como se preparar para o exame?',
    botoes: [
      { label: '📋 Preparo H. pylori', acao: 'preparo:respiratorio-hpylori' },
      { label: '📅 Agendar', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['halitose', 'mau hálito', 'mau halito', 'hálito'],
    resposta: 'A NU.V.E.M tem um programa completo para diagnóstico e tratamento da halitose, com:\n\n🔬 Halimetria: quantificação objetiva dos compostos causadores\n💧 Sialometria: avaliação do fluxo salivar\n👥 Abordagem multidisciplinar (gastro + odonto)\n\nGostaria de saber o preparo para a halimetria?',
    botoes: [
      { label: '📋 Preparo halimetria', acao: 'preparo:halimetria' },
    ],
  },
  {
    gatilhos: ['manometria', 'esôfago', 'esofago', 'acalasia', 'disfagia'],
    resposta: 'A manometria de alta resolução avalia a motilidade do esôfago e os esfíncteres, sendo essencial no diagnóstico de acalasia, disfagia e refluxo.\n\nGostaria de saber como se preparar?',
    botoes: [
      { label: '📋 Preparo manometria', acao: 'preparo:manometria' },
      { label: '📅 Agendar', acao: 'whatsapp' },
    ],
  },
  {
    gatilhos: ['phmetria', 'ph', 'refluxo', 'azia', 'drge'],
    resposta: 'A pHmetria monitora o refluxo esofágico por 24 horas em ambiente ambulatorial. Você faz suas atividades normais enquanto o exame registra os episódios de refluxo.\n\nGostaria de ver o preparo?',
    botoes: [
      { label: '📋 Preparo pHmetria', acao: 'preparo:phmetria' },
    ],
  },
]

// ─── Perguntas frequentes ──────────────────────────────────────────────────────
export const NUVETE_FAQ = [
  {
    pergunta: 'Quanto tempo dura uma consulta na NU.V.E.M?',
    resposta: 'Consultas médicas têm duração média de 30 a 50 minutos. Já os exames variam: testes respiratórios levam 2–3 horas; manometria 30–60 min; pHmetria 24 horas de monitoramento.',
  },
  {
    pergunta: 'A clínica aceita planos de saúde?',
    resposta: 'Sim! Trabalhamos com Unimed BH, Bradesco Saúde, SulAmérica, Amil, NotreDame e outros. Também atendemos particular com recibo para reembolso.',
  },
  {
    pergunta: 'Preciso de encaminhamento médico para os exames?',
    resposta: 'Para a maioria dos exames, sim. Um pedido médico é necessário. Para consultas, não é preciso encaminhamento. Nossa equipe pode orientar caso a caso.',
  },
  {
    pergunta: 'Os resultados ficam prontos no mesmo dia?',
    resposta: 'Depende do exame. Alguns laudos são emitidos em até 3 dias úteis. Para exames de 24h como a pHmetria, o laudo fica pronto em alguns dias após a devolução do equipamento.',
  },
]
