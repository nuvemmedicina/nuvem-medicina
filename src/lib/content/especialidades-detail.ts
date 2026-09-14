/**
 * Conteúdo detalhado de cada especialidade (página /especialidades/[slug]),
 * por idioma. pt-BR é a fonte original (movida de
 * src/app/[locale]/especialidades/[slug]/page.tsx); en/es são traduções por IA.
 */
import type { AppLocale } from '@/i18n/routing'

export interface Especialista {
  nome:  string
  esp:   string
  crm?:  string
  foto:  string
  href?: string
}

export interface Faq { pergunta: string; resposta: string }

export interface DetailData {
  heroDesc:      string
  intro:         string[]
  sintomas:      string[]
  topics:        { title: string; body: string }[]
  diferenciais:  string[]
  paraMedicos:   { intro: string; bullets: string[] }
  especialistas: Especialista[]
  exames:        string[]
  faqs:          Faq[]
}

// ─── Português (fonte original) ───────────────────────────────────────────

const DETAIL_PT: Record<string, DetailData> = {

  gastroenterologia: {
    heroDesc: 'Especialidade focada no equilíbrio intestinal pleno, tratamos desde sintomas comuns até patologias complexas como SIBO, IMO, disbiose e DGBI – Distúrbio da Interação Cérebro-Intestino.',
    intro: [
      'A gastroenterologia da NU.V.E.M abrange o diagnóstico e tratamento completo das doenças do aparelho digestivo, com foco especial em DGBI – Distúrbio da Interação Cérebro-Intestino, disbiose intestinal e distúrbios de motilidade.',
      'Nossa abordagem integra avaliação clínica detalhada, exames de alta precisão como testes respiratórios e manometria, e protocolos terapêuticos baseados nas diretrizes Roma V, a mais recente e reconhecida classificação internacional para distúrbios funcionais digestivos.',
    ],
    sintomas: [
      'Inchaço e distensão abdominal persistente',
      'Alternância entre diarreia e constipação',
      'Dor ou desconforto abdominal recorrente',
      'Gases excessivos e flatulência',
      'Náuseas sem causa aparente',
      'Azia ou regurgitação frequente',
      'Fadiga e indisposição inexplicadas',
      'Diarreia após refeições',
      'Dificuldade de ganho ou perda de peso',
    ],
    topics: [
      { title: 'SIBO e IMO', body: 'Supercrescimento bacteriano no intestino delgado (SIBO) e supercrescimento de metanogênicos (IMO), diagnosticados com precisão pelos testes respiratórios realizados na própria clínica.' },
      { title: 'DGBI – Distúrbio da Interação Cérebro-Intestino', body: 'Síndrome do intestino irritável, dispepsia funcional e constipação funcional investigadas com metodologia completa e personalizada, seguindo rigorosamente as diretrizes Roma V.' },
      { title: 'Intolerâncias Alimentares', body: 'Lactose, frutose e outras intolerâncias identificadas por testes respiratórios validados, sem necessidade de biópsia ou coleta de sangue.' },
      { title: 'Helicobacter pylori', body: 'Diagnóstico preciso por teste respiratório (método não endoscópico de alta acurácia) e manejo terapêutico completo com controle de erradicação.' },
      { title: 'Disbiose Intestinal', body: 'Desequilíbrio da microbiota intestinal avaliado clinicamente, com protocolos terapêuticos individualizados para restauração do equilíbrio digestivo.' },
      { title: 'Doenças Inflamatórias e Funcionais', body: 'Investigação completa de doença de Crohn, retocolite ulcerativa e outras condições inflamatórias, com acompanhamento longitudinal.' },
    ],
    diferenciais: [
      'Testes respiratórios realizados na própria clínica: resultado e interpretação no mesmo dia',
      'Laudos baseados nas diretrizes Roma V, referência mundial para DGBI',
      'Equipe integrada de gastroenterologia, fisioterapia pélvica e motilidade digestiva',
      'Certificação ISO 9001 garantindo rastreabilidade e padronização de todos os procedimentos',
      'Dra. Vera Ângelo, professora convidada do Hospital Israelita Albert Einstein',
    ],
    paraMedicos: {
      intro: 'A NU.V.E.M é centro de referência em diagnóstico funcional digestivo em Belo Horizonte. Recebemos encaminhamentos para investigação de SIBO/IMO, intolerâncias alimentares, H. pylori não endoscópico e DGBI. Nossa equipe emite laudos detalhados e mantém comunicação com o médico solicitante nos casos que exigem condutas compartilhadas.',
      bullets: [
        'Laudos detalhados entregues em até 24h após o exame',
        'Curvas completas dos testes respiratórios com interpretação clínica individualizada',
        'Comunicação direta com o médico solicitante em casos complexos',
        'Aceita encaminhamentos de qualquer especialidade médica',
        'Certificação ISO 9001 com rastreabilidade de todos os procedimentos',
      ],
    },
    especialistas: [
      { nome: 'Dra. Vera Ângelo',     esp: 'Gastroenterologia e Motilidade', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg',       href: '/dra-vera-angelo' },
      { nome: 'Dra. Claudia Utsch',   esp: 'Gastroenterologia',              crm: '',             foto: '/images/claudia-utsch.jpg' },
      { nome: 'Dra. Danielle Martins',esp: 'Gastroenterologia e DGBI',       crm: '',             foto: '/images/danielle-martins.jpg' },
    ],
    exames: ['testes-respiratorios', 'manometria-esofagica', 'phmetria-impedanciometria'],
    faqs: [
      { pergunta: 'O que trata um gastroenterologista na NU.V.E.M?', resposta: 'Tratamos doenças do aparelho digestivo com foco especial em SIBO, IMO, disbiose intestinal e DGBI – Distúrbio da Interação Cérebro-Intestino, seguindo as diretrizes Roma V.' },
      { pergunta: 'Quando devo procurar um gastroenterologista?', resposta: 'Sintomas persistentes como inchaço abdominal, dor ou desconforto recorrente, alternância entre diarreia e constipação, gases excessivos e azia frequente são bons motivos para buscar avaliação.' },
      { pergunta: 'Quais exames são feitos na consulta de gastroenterologia?', resposta: 'Conforme a indicação clínica, podem ser solicitados teste respiratório, manometria esofágica e pHmetria com impedânciometria, todos realizados na própria clínica.' },
      { pergunta: 'SIBO e IMO têm cura?', resposta: 'O tratamento costuma envolver antibioticoterapia direcionada e ajustes na dieta, com bons resultados na maioria dos casos quando acompanhado adequadamente por um especialista.' },
    ],
  },

  'fisioterapia-pelvica': {
    heroDesc: 'Reabilitação especializada do assoalho pélvico: incontinência, disfunções pélvicas e distúrbios digestivos funcionais tratados com biofeedback e protocolos individualizados.',
    intro: [
      'A fisioterapia pélvica da NU.V.E.M é integrada ao tratamento gastroenterológico, reconhecendo que o assoalho pélvico desempenha papel fundamental na fisiologia digestiva e urinária.',
      'Utilizamos biofeedback eletromiográfico de última geração, eletroestimulação e técnicas manuais para reabilitar pacientes com disfunções complexas de forma não invasiva, humanizada e baseada em evidências científicas atualizadas.',
    ],
    sintomas: [
      'Perda de urina ao tossir, espirrar ou praticar exercício',
      'Urgência miccional súbita e difícil de controlar',
      'Dificuldade ou dor para evacuar',
      'Sensação de peso ou pressão pélvica',
      'Dor pélvica crônica ou durante relações sexuais',
      'Esvaziamento intestinal incompleto',
      'Incontinência fecal ou de gases',
      'Constipação crônica resistente ao tratamento clínico',
    ],
    topics: [
      { title: 'Incontinência Urinária e Fecal', body: 'Reabilitação muscular por biofeedback eletromiográfico e treinamento vesical com resultados comprovados em casos de leve a moderada complexidade, reduzindo ou eliminando o uso de absorventes.' },
      { title: 'Disfunção do Assoalho Pélvico', body: 'Hipertonia, hipotonia e assimetria do assoalho pélvico avaliadas com biofeedback e tratadas com protocolos individualizados, integrando técnicas manuais e eletroterapia.' },
      { title: 'Constipação Obstrutiva', body: 'Disfunção evacuatória tratada com biofeedback anorretal integrado à avaliação gastroenterológica da manometria anorretal: diagnóstico e reabilitação no mesmo espaço clínico.' },
      { title: 'Reabilitação Pós-Parto e Pós-Cirúrgica', body: 'Recuperação funcional do assoalho pélvico após parto normal, cesariana ou cirurgias pélvicas, com protocolos específicos para cada fase do pós-operatório.' },
      { title: 'Dor Pélvica Crônica', body: 'Abordagem multidisciplinar de síndromes dolorosas pélvicas, vaginismo e vulvodinia, em conjunto com ginecologistas e urologistas.' },
      { title: 'Integração GI + Pélvico', body: 'Abordagem única na NU.V.E.M que combina gastroenterologia e fisioterapia pélvica para resultados superiores em casos de constipação com componente funcional.' },
    ],
    diferenciais: [
      'Manometria anorretal e fisioterapia pélvica no mesmo espaço, do diagnóstico ao tratamento',
      'Biofeedback eletromiográfico de última geração com registro gráfico de evolução',
      'Protocolos individualizados com reavaliação periódica documentada',
      'Integração direta com gastroenterologia para casos de constipação obstrutiva',
      'Certificação ISO 9001: cada sessão registrada e rastreável',
    ],
    paraMedicos: {
      intro: 'Indicada para pacientes com disfunções do assoalho pélvico, incontinência urinária ou fecal, constipação com componente obstrutivo e dor pélvica crônica. Recebemos encaminhamentos de ginecologistas, urologistas, gastroenterologistas e cirurgiões colorretais.',
      bullets: [
        'Avaliação inicial com biofeedback EMG e anamnese funcional detalhada',
        'Evolução clínica documentada ao final de cada sessão',
        'Comunicação com médico solicitante em casos complexos',
        'Integração com manometria anorretal para diagnóstico complementar',
        'Relatório de alta com registro de evolução funcional',
      ],
    },
    especialistas: [
      { nome: 'Dra. Anna Karoline', esp: 'Fisioterapia Pélvica · Biofeedback EMG', crm: '', foto: '/images/anna-karoline.jpg' },
    ],
    exames: ['avaliacao-pelvica', 'manometria-anorretal'],
    faqs: [
      { pergunta: 'O que é fisioterapia pélvica?', resposta: 'É a reabilitação dos músculos do assoalho pélvico por meio de biofeedback eletromiográfico, eletroestimulação e técnicas manuais, indicada para disfunções urinárias, digestivas e dor pélvica.' },
      { pergunta: 'A fisioterapia pélvica é indicada só para mulheres?', resposta: 'Não. Atendemos homens e mulheres com disfunções do assoalho pélvico, incontinência urinária ou fecal e constipação obstrutiva.' },
      { pergunta: 'Quantas sessões são necessárias?', resposta: 'O número de sessões varia conforme o caso e é definido após a avaliação inicial com biofeedback, com reavaliações periódicas documentadas.' },
      { pergunta: 'O tratamento é doloroso?', resposta: 'Não. É uma abordagem não invasiva e humanizada, baseada em evidências científicas atualizadas.' },
    ],
  },

  halitose: {
    heroDesc: 'Diagnóstico multidisciplinar completo da halitose. Investigamos causas digestivas, orais e sistêmicas com halimetria e sialometria de alta precisão.',
    intro: [
      'A halitose é uma condição complexa que exige abordagem multidisciplinar. Na NU.V.E.M, investigamos todas as origens possíveis: digestivas, orais, nasofaríngeas e sistêmicas, com protocolo diagnóstico completo e personalizado.',
      'Nossa abordagem combina halimetria quantitativa objetiva, sialometria, avaliação gastroenterológica completa e, quando necessário, parceria com odontologia e otorrinolaringologia, tudo no mesmo atendimento integrado.',
    ],
    sintomas: [
      'Mau hálito persistente mesmo após higiene bucal rigorosa',
      'Gosto amargo ou metálico na boca',
      'Relatos de pessoas próximas sobre o hálito',
      'Boca seca frequente (xerostomia)',
      'Azia, regurgitação ou eructação associada',
      'Sensação de ardor ou saburra na língua',
      'Histórico de problemas gástricos ou intestinais',
      'Desconforto social por causa do hálito',
    ],
    topics: [
      { title: 'Halimetria Quantitativa', body: 'Quantificação objetiva de compostos sulfurados voláteis (CSV) no ar exalado com aparelho Halimeter® calibrado, para diagnóstico preciso e monitoramento da resposta ao tratamento.' },
      { title: 'Sialometria', body: 'Medição do fluxo salivar em repouso e estimulado, essencial no diagnóstico de xerostomia e suas relações diretas com a halitose de origem oral.' },
      { title: 'Halitose Digestiva', body: 'Investigação aprofundada de SIBO, gastroparesia, refluxo gastroesofágico e disbiose como causas de mau hálito de origem gastrointestinal, frequentemente subdiagnosticadas.' },
      { title: 'Protocolo Diagnóstico Integrado', body: 'Avaliação simultânea de todas as possíveis origens: oral, digestiva, nasofaríngea e sistêmica, com sequenciamento diagnóstico eficiente e preciso.' },
      { title: 'Plano Terapêutico Individualizado', body: 'Tratamento direcionado à causa identificada, combinando abordagem digestiva, orientações de higiene oral e encaminhamento para especialistas quando necessário.' },
      { title: 'Acompanhamento Evolutivo', body: 'Monitoramento periódico com halimetria para avaliar resposta ao tratamento de forma objetiva, garantindo que a melhora seja documentada e sustentada.' },
    ],
    diferenciais: [
      'Protocolo multidisciplinar para investigar a origem da halitose e tratar a causa',
      'Halimetria quantitativa objetiva: resultado em ppb (partes por bilhão) de CSV',
      'Investigação simultânea de origem oral, digestiva e sistêmica na mesma consulta',
      'Plano terapêutico individualizado com acompanhamento evolutivo documentado',
      'Certificação ISO 9001: resultados rastreáveis e comparáveis entre consultas',
    ],
    paraMedicos: {
      intro: 'Recebemos encaminhamentos de gastroenterologistas, otorrinolaringologistas, cirurgiões-dentistas e clínicos gerais para investigação diagnóstica completa de halitose. O protocolo NU.V.E.M inclui halimetria, sialometria, triagem digestiva e planejamento terapêutico integrado.',
      bullets: [
        'Laudo com quantificação de CSV (ppb) e interpretação clínica',
        'Investigação de SIBO, gastroparesia e DRGE como causas digestivas',
        'Parceria com odontologia para halitose oral confirmada',
        'Retorno ao médico solicitante com diagnóstico etiológico e plano terapêutico',
        'Monitoramento evolutivo disponível para acompanhamento de resultados',
      ],
    },
    especialistas: [
      { nome: 'Dra. Vera Ângelo', esp: 'Gastroenterologia · Diagnóstico de Halitose', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg', href: '/dra-vera-angelo' },
    ],
    exames: ['halimetria-sialometria', 'testes-respiratorios'],
    faqs: [
      { pergunta: 'A halitose sempre tem origem na boca?', resposta: 'Não. A halitose pode ter causas digestivas, nasofaríngeas ou sistêmicas, por isso investigamos todas as possíveis origens em um único atendimento integrado.' },
      { pergunta: 'Como é diagnosticada a causa da halitose?', resposta: 'Por meio de halimetria quantitativa, sialometria e avaliação gastroenterológica completa, com parceria com odontologia e otorrinolaringologia quando necessário.' },
      { pergunta: 'Existe tratamento definitivo para halitose?', resposta: 'Depende da causa identificada. Tratando a origem — por exemplo, SIBO ou xerostomia — a melhora costuma ser significativa e duradoura.' },
      { pergunta: 'O exame de halimetria é doloroso?', resposta: 'Não. É um exame simples, rápido e indolor, realizado com aparelho calibrado (Halimeter®).' },
    ],
  },

  pediatria: {
    heroDesc: 'Cuidado integral da saúde digestiva infantil. Prevenção, diagnóstico e tratamento com abordagem acolhedora, integrada à família e suporte cirúrgico pediátrico.',
    intro: [
      'A pediatria da NU.V.E.M oferece atenção especializada à saúde digestiva de crianças e adolescentes, com ambiente acolhedor projetado para reduzir a ansiedade infantil e facilitar o vínculo com a família.',
      'Trabalhamos em estreita colaboração com gastroenterologistas, cirurgiãs pediátricas e fisioterapeuta pélvica para oferecer a conduta mais completa em casos complexos, desde constipação infantil até investigação de APLV e H. pylori.',
    ],
    sintomas: [
      'Constipação crônica em crianças (menos de 3 evacuações por semana)',
      'Diarreias frequentes ou recorrentes sem causa identificada',
      'Dores abdominais recorrentes sem diagnóstico definido',
      'Distensão e desconforto abdominal persistente',
      'Suspeita de intolerância à lactose ou proteína do leite (APLV)',
      'Refluxo gastroesofágico infantil persistente',
      'Suspeita de H. pylori em crianças',
      'Fezes com muco, sangue ou consistência muito alterada',
    ],
    topics: [
      { title: 'Saúde Digestiva Infantil', body: 'Constipação, refluxo, cólicas persistentes e distúrbios funcionais avaliados com abordagem gentil, baseada em evidências pediátricas atualizadas e com total envolvimento da família no tratamento.' },
      { title: 'Intolerâncias Alimentares Pediátricas', body: 'Diagnóstico de intolerância à lactose, frutose e proteína do leite de vaca (APLV) com protocolos de testes respiratórios e dieta de exclusão adaptados à faixa etária.' },
      { title: 'H. pylori em Crianças', body: 'Investigação e confirmação de erradicação por teste respiratório não invasivo, evitando procedimentos invasivos desnecessários em crianças.' },
      { title: 'Constipação Crônica Infantil', body: 'Avaliação completa de constipação refratária ao tratamento clínico, integrando abordagem clínica, dietética e, quando necessário, manometria anorretal pediátrica.' },
      { title: 'Integração Cirúrgica Pediátrica', body: 'Casos que necessitam de avaliação cirúrgica são conduzidos em conjunto com as cirurgiãs pediátricas da NU.V.E.M (Dra. Eliane Basques e Dra. Adrianna Buzatti), integrando diagnóstico e conduta sem necessidade de múltiplos encaminhamentos.' },
      { title: 'Acompanhamento Longitudinal', body: 'Seguimento continuado do crescimento e desenvolvimento digestivo, com orientações para a família em cada consulta e adequação do plano terapêutico conforme a evolução.' },
    ],
    diferenciais: [
      'Ambiente acolhedor especialmente pensado para atendimento infantil',
      'Equipe com pediatra especialista em gastroenterologia pediátrica',
      'Cirurgiãs pediátricas integradas: avaliação cirúrgica sem encaminhamento externo',
      'Testes respiratórios adaptados para crianças (SIBO, lactose, frutose, H. pylori)',
      'Certificação ISO 9001: protocolos pediátricos padronizados e seguros',
    ],
    paraMedicos: {
      intro: 'Recebemos encaminhamentos de pediatras e clínicos gerais para investigação de distúrbios digestivos na infância. Nossa equipe inclui gastroenterologista especializada em pediatria e cirurgiãs pediátricas para os casos que necessitem de avaliação complementar ou conduta cirúrgica.',
      bullets: [
        'Testes respiratórios para SIBO, intolerâncias e H. pylori em crianças',
        'Ambiente adaptado para reduzir a ansiedade e facilitar o exame pediátrico',
        'Laudo detalhado com recomendações para o pediatra solicitante',
        'Integração cirúrgica imediata para casos que necessitem avaliação complementar',
        'Acompanhamento conjunto disponível para casos de alta complexidade',
      ],
    },
    especialistas: [
      { nome: 'Dra. Mariana Fernandes',    esp: 'Pediatria · Saúde Digestiva Infantil', crm: '', foto: '/images/mariana-fernandes.jpg' },
      { nome: 'Dra. Eliane Basques',       esp: 'Cirurgia Pediátrica · Manometria',     crm: 'CRM-MG 27601', foto: '/images/dra-eliane.jpg', href: '/dra-eliane-basques' },
    ],
    exames: ['testes-respiratorios', 'manometria-anorretal'],
    faqs: [
      { pergunta: 'A partir de que idade posso levar meu filho?', resposta: 'Atendemos crianças desde a primeira infância até a adolescência, com ambiente e abordagem adaptados a cada faixa etária.' },
      { pergunta: 'Os exames são adaptados para crianças?', resposta: 'Sim. Os testes respiratórios e demais exames seguem protocolos específicos para a faixa etária pediátrica, priorizando o conforto e reduzindo a ansiedade infantil.' },
      { pergunta: 'Quando devo procurar a pediatria da NU.V.E.M?', resposta: 'Em casos de constipação persistente, dores abdominais recorrentes, suspeita de intolerância alimentar ou de refluxo gastroesofágico infantil.' },
      { pergunta: 'Vocês fazem encaminhamento para cirurgia pediátrica?', resposta: 'Sim. Quando necessário, a avaliação cirúrgica é feita em conjunto com as cirurgiãs pediátricas da própria clínica, sem necessidade de encaminhamento externo.' },
    ],
  },

  nefrologia: {
    heroDesc: 'Diagnóstico e tratamento especializado de doenças renais, com diferencial único: a integração com gastroenterologia para investigação da interface GI-Renal e manejo de causas digestivas de progressão renal.',
    intro: [
      'O serviço de nefrologia da NU.V.E.M oferece diagnóstico precoce e acompanhamento de doenças renais com um diferencial clínico importante: a integração com a gastroenterologia no mesmo espaço, permitindo investigar causas digestivas frequentemente negligenciadas na progressão de doenças renais.',
      'A conexão entre intestino e rim é cientificamente estabelecida. Condições como oxalúria entérica, disbiose intestinal e absorção anormal de oxalatos têm impacto direto na saúde renal; na NU.V.E.M investigamos essa interface de forma completa.',
    ],
    sintomas: [
      'Edema (inchaço) nos pés, tornozelos ou pálpebras',
      'Urina espumosa ou com coloração alterada',
      'Diminuição do volume ou frequência urinária',
      'Dores ou pressão na região lombar',
      'Hipertensão arterial de difícil controle',
      'Cálculos renais recorrentes (pedras nos rins)',
      'Infecções urinárias de repetição',
      'Sintomas digestivos em pacientes com doença renal conhecida',
    ],
    topics: [
      { title: 'Doença Renal Crônica (DRC)', body: 'Acompanhamento clínico especializado com estratégias baseadas em evidências para retardo da progressão da DRC, preservação da função renal e melhora da qualidade de vida a longo prazo.' },
      { title: 'Litíase Renal Recorrente', body: 'Investigação metabólica completa de cálculos renais de repetição, incluindo avaliação da oxalúria entérica, causa pouco investigada relacionada à absorção intestinal anormal de oxalatos.' },
      { title: 'Interface GI-Renal', body: 'Investigação da relação entre disbiose intestinal, oxalúria entérica, síndrome do intestino permeável e progressão de doenças renais: abordagem integrativa única disponível na NU.V.E.M.' },
      { title: 'Infecções Urinárias de Repetição', body: 'Manejo de ITU recorrente com investigação de fatores predisponentes, perfil microbiológico e tratamento direcionado para reduzir recorrências.' },
      { title: 'Hipertensão Renovascular', body: 'Avaliação e acompanhamento da hipertensão de causa renal, com investigação complementar e manejo integrado com equipe de clínica médica.' },
      { title: 'Prevenção e Rastreamento', body: 'Avaliação renal preventiva em pacientes de risco (diabéticos, hipertensos, histórico familiar), com exames complementares e orientação dietética personalizada para proteção renal.' },
    ],
    diferenciais: [
      'Nefrologia e gastroenterologia no mesmo espaço, para quem precisa das duas avaliações',
      'Investigação de oxalúria entérica e disbiose como causas de litíase renal recorrente',
      'Abordagem da interface GI-Renal: impacto da microbiota na saúde renal',
      'Suporte multidisciplinar completo sem necessidade de múltiplos encaminhamentos',
      'Certificação ISO 9001: rastreabilidade de todos os exames e condutas',
    ],
    paraMedicos: {
      intro: 'A NU.V.E.M oferece avaliação nefrológica com diferencial diagnóstico: a integração com gastroenterologia permite investigar causas intestinais de progressão da DRC, litíase recorrente por oxalúria entérica e o impacto da disbiose intestinal na saúde renal, abordagem que a nefrologia isolada frequentemente não contempla.',
      bullets: [
        'Investigação metabólica completa em casos de litíase renal recorrente',
        'Avaliação conjunta GI-Renal com testes respiratórios e análise de permeabilidade intestinal',
        'Acompanhamento de DRC com foco em retardo de progressão e qualidade de vida',
        'Laudos e comunicação integrada com a equipe de gastroenterologia',
        'Aceita encaminhamentos de clínicos gerais, cardiologistas e endocrinologistas',
      ],
    },
    especialistas: [
      { nome: 'Dra. Luiza Auarek', esp: 'Nefrologia · Interface GI-Renal', crm: '', foto: '/images/luiza-auarek.jpg' },
    ],
    exames: [],
    faqs: [
      { pergunta: 'O que diferencia a nefrologia da NU.V.E.M?', resposta: 'A integração com a gastroenterologia no mesmo espaço, permitindo investigar causas digestivas de doenças renais, como a oxalúria entérica e a disbiose intestinal.' },
      { pergunta: 'Quando devo procurar um nefrologista?', resposta: 'Em casos de inchaço nos pés ou pálpebras, urina espumosa, hipertensão de difícil controle, cálculos renais recorrentes ou infecções urinárias de repetição.' },
      { pergunta: 'Cálculo renal de repetição tem relação com o intestino?', resposta: 'Sim. Em alguns casos, a absorção intestinal alterada de oxalato (oxalúria entérica) contribui diretamente para a formação recorrente de cálculos renais.' },
      { pergunta: 'Vocês acompanham pacientes com doença renal crônica?', resposta: 'Sim, com estratégias baseadas em evidências para retardar a progressão da doença, preservar a função renal e melhorar a qualidade de vida a longo prazo.' },
    ],
  },

  'motilidade-digestiva': {
    heroDesc: 'Avaliação avançada dos distúrbios esofágicos e intestinais com manometria de alta resolução, pHmetria e impedânciometria integradas, um dos centros mais especializados de BH.',
    intro: [
      'A avaliação de motilidade digestiva é uma das especialidades mais avançadas e raras disponíveis em Belo Horizonte. A NU.V.E.M utiliza equipamentos de última geração para mapear com precisão os distúrbios do esôfago e do trato gastrointestinal.',
      'Nossos laudos detalhados seguem a Classificação de Chicago v4.0, o padrão internacional de referência para distúrbios motores esofágicos, e permitem diagnóstico definitivo de condições que frequentemente passam despercebidas em investigações convencionais.',
    ],
    sintomas: [
      'Dificuldade para engolir (disfagia) sólidos ou líquidos',
      'Sensação de comida parada ou "entalada" no esôfago',
      'Regurgitação frequente de alimentos',
      'Dor torácica sem causa cardíaca identificada',
      'Azia resistente ao tratamento com inibidores de bomba',
      'Tosse crônica sem causa pulmonar',
      'Constipação crônica sem resposta a laxativos',
      'Incontinência fecal ou dificuldade de evacuar',
    ],
    topics: [
      { title: 'Acalasia e Distúrbios Motores Esofágicos', body: 'Diagnóstico definitivo por manometria esofágica de alta resolução (HRM) com classificação completa pela Classificação de Chicago v4.0, determinante para decisão terapêutica (dilatação, POEM ou cirurgia).' },
      { title: 'Refluxo Gastroesofágico Refratário', body: 'Investigação avançada por pHmetria e impedânciometria para casos que não respondem ao tratamento convencional, com diferenciação entre refluxo ácido, não ácido e alcalino.' },
      { title: 'Disfagia', body: 'Avaliação completa da deglutição com manometria de alta resolução para identificação precisa da causa funcional ou obstrutiva, essencial antes de qualquer procedimento intervencionista.' },
      { title: 'Disfunção Defecatória', body: 'Manometria anorretal de alta resolução para diferenciação entre constipação de trânsito lento, dissinergia do assoalho pélvico e outros distúrbios defecatórios; implicações terapêuticas distintas para cada caso.' },
      { title: 'Esôfago de Barrett e Vigilância', body: 'Investigação funcional complementar à endoscopia em pacientes com esôfago de Barrett, avaliando pressão do esfíncter esofágico inferior e padrão de refluxo.' },
      { title: 'Avaliação Pré e Pós-Operatória', body: 'Estudo de motilidade esofágica obrigatório antes de cirurgia anti-refluxo (fundoplicatura) e essencial para avaliação de resultados pós-operatórios insatisfatórios.' },
    ],
    diferenciais: [
      'Manometria de alta resolução (HRM) com análise Chicago Classification v4.0, padrão internacional',
      'Um dos poucos centros em BH com pHmetria + impedânciometria combinada',
      'Dr. Gabriel de Souza Fernandes Filho, gastroenterologista especializado em motilidade digestiva',
      'Laudos com traçados completos e recomendações terapêuticas individualizadas',
      'Certificação ISO 9001: padronização e rastreabilidade de todos os exames',
    ],
    paraMedicos: {
      intro: 'Indicada para investigação de disfagia, dor torácica não cardíaca, DRGE refratária, acalasia e distúrbios defecatórios. Nossos laudos seguem a Classificação de Chicago v4.0 e o protocolo DeMeester para pHmetria, fornecendo base técnica sólida para a decisão terapêutica.',
      bullets: [
        'Relatório completo com traçados de alta resolução e análise por especialista',
        'Classificação de Chicago v4.0 aplicada sistematicamente em todos os laudos de HRM',
        'Resultados com interpretação clínica disponíveis imediatamente após o exame',
        'Integração com fisioterapia pélvica para casos de disfunção defecatória',
        'Suporte para segunda opinião em casos de alta complexidade',
      ],
    },
    especialistas: [
      { nome: 'Dra. Vera Ângelo',   esp: 'Gastroenterologia e Motilidade', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg', href: '/dra-vera-angelo' },
      { nome: 'Dr. Gabriel de Souza Fernandes Filho', esp: 'Gastroenterologia', crm: '', foto: '/images/dr-Gabriel-de-Souza-Fernandes-Filho.jpg' },
    ],
    exames: ['manometria-esofagica', 'manometria-anorretal', 'phmetria-impedanciometria'],
    faqs: [
      { pergunta: 'O que avalia a motilidade digestiva?', resposta: 'Avalia o funcionamento muscular do esôfago e do intestino, identificando distúrbios como acalasia, disfagia e refluxo refratário ao tratamento convencional.' },
      { pergunta: 'Quais exames fazem parte dessa avaliação?', resposta: 'Manometria esofágica e anorretal de alta resolução, pHmetria e impedânciometria, todos com laudos baseados na Classificação de Chicago v4.0.' },
      { pergunta: 'Quando essa avaliação é indicada?', resposta: 'Em casos de disfagia, dor torácica sem causa cardíaca, refluxo refratário ao tratamento e antes de cirurgias antirrefluxo ou para investigar resultados pós-operatórios insatisfatórios.' },
      { pergunta: 'Esses exames substituem a endoscopia?', resposta: 'Não. São exames complementares: a endoscopia avalia a estrutura do trato digestivo, enquanto a manometria e a pHmetria avaliam a função e a motilidade.' },
    ],
  },
}

// ─── English ───────────────────────────────────────────────────────────────

const DETAIL_EN: Record<string, DetailData> = {

  gastroenterologia: {
    heroDesc: 'A specialty focused on full intestinal balance, treating everything from common symptoms to complex conditions like SIBO, IMO, dysbiosis and DGBI – Disorders of Gut-Brain Interaction.',
    intro: [
      'NU.V.E.M’s gastroenterology practice covers the complete diagnosis and treatment of digestive tract diseases, with special focus on DGBI – Disorders of Gut-Brain Interaction, intestinal dysbiosis and motility disorders.',
      'Our approach combines detailed clinical evaluation, high-precision exams such as breath tests and manometry, and treatment protocols based on the Rome V guidelines, the most recent and internationally recognized classification for functional digestive disorders.',
    ],
    sintomas: [
      'Persistent bloating and abdominal distension',
      'Alternating diarrhea and constipation',
      'Recurrent abdominal pain or discomfort',
      'Excessive gas and flatulence',
      'Nausea with no apparent cause',
      'Frequent heartburn or regurgitation',
      'Unexplained fatigue and malaise',
      'Diarrhea after meals',
      'Difficulty gaining or losing weight',
    ],
    topics: [
      { title: 'SIBO and IMO', body: 'Small intestinal bacterial overgrowth (SIBO) and intestinal methanogen overgrowth (IMO), precisely diagnosed through breath tests performed on-site at the clinic.' },
      { title: 'DGBI – Disorders of Gut-Brain Interaction', body: 'Irritable bowel syndrome, functional dyspepsia and functional constipation investigated with a complete, personalized methodology, rigorously following the Rome V guidelines.' },
      { title: 'Food Intolerances', body: 'Lactose, fructose and other intolerances identified through validated breath tests, with no need for biopsy or blood draw.' },
      { title: 'Helicobacter pylori', body: 'Precise diagnosis via breath test (a highly accurate non-endoscopic method) and complete therapeutic management with eradication confirmation.' },
      { title: 'Intestinal Dysbiosis', body: 'Imbalance of the gut microbiota clinically assessed, with individualized treatment protocols to restore digestive balance.' },
      { title: 'Inflammatory and Functional Diseases', body: 'Complete investigation of Crohn’s disease, ulcerative colitis and other inflammatory conditions, with longitudinal follow-up.' },
    ],
    diferenciais: [
      'Breath tests performed on-site: same-day results and interpretation',
      'Reports based on the Rome V guidelines, the world reference for DGBI',
      'Integrated team of gastroenterology, pelvic physical therapy and digestive motility',
      'ISO 9001 certification ensuring traceability and standardization of every procedure',
      'Dr. Vera Ângelo, invited professor at Hospital Israelita Albert Einstein',
    ],
    paraMedicos: {
      intro: 'NU.V.E.M is a reference center for functional digestive diagnosis in Belo Horizonte. We receive referrals for SIBO/IMO investigation, food intolerances, non-endoscopic H. pylori testing and DGBI. Our team issues detailed reports and maintains communication with the referring physician in cases requiring shared management.',
      bullets: [
        'Detailed reports delivered within 24h after the exam',
        'Full breath test curves with individualized clinical interpretation',
        'Direct communication with the referring physician in complex cases',
        'Accepts referrals from any medical specialty',
        'ISO 9001 certification with full procedure traceability',
      ],
    },
    especialistas: [
      { nome: 'Dra. Vera Ângelo',     esp: 'Gastroenterology and Motility', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg',       href: '/dra-vera-angelo' },
      { nome: 'Dra. Claudia Utsch',   esp: 'Gastroenterology',              crm: '',             foto: '/images/claudia-utsch.jpg' },
      { nome: 'Dra. Danielle Martins',esp: 'Gastroenterology and DGBI',     crm: '',             foto: '/images/danielle-martins.jpg' },
    ],
    exames: ['testes-respiratorios', 'manometria-esofagica', 'phmetria-impedanciometria'],
    faqs: [
      { pergunta: 'What does a gastroenterologist treat at NU.V.E.M?', resposta: 'We treat digestive tract diseases with special focus on SIBO, IMO, intestinal dysbiosis and DGBI – Disorders of Gut-Brain Interaction, following the Rome V guidelines.' },
      { pergunta: 'When should I see a gastroenterologist?', resposta: 'Persistent symptoms such as abdominal bloating, recurrent pain or discomfort, alternating diarrhea and constipation, excessive gas and frequent heartburn are good reasons to seek an evaluation.' },
      { pergunta: 'What exams are done during a gastroenterology visit?', resposta: 'Depending on the clinical indication, a breath test, esophageal manometry and pH monitoring with impedance may be ordered, all performed on-site at the clinic.' },
      { pergunta: 'Are SIBO and IMO curable?', resposta: 'Treatment usually involves targeted antibiotic therapy and dietary adjustments, with good results in most cases when properly followed by a specialist.' },
    ],
  },

  'fisioterapia-pelvica': {
    heroDesc: 'Specialized pelvic floor rehabilitation: incontinence, pelvic dysfunction and functional digestive disorders treated with biofeedback and individualized protocols.',
    intro: [
      'NU.V.E.M’s pelvic physical therapy is integrated with gastroenterological treatment, recognizing that the pelvic floor plays a fundamental role in digestive and urinary physiology.',
      'We use state-of-the-art electromyographic biofeedback, electrical stimulation and manual techniques to rehabilitate patients with complex dysfunctions in a non-invasive, patient-centered way, based on current scientific evidence.',
    ],
    sintomas: [
      'Urine leakage when coughing, sneezing or exercising',
      'Sudden urinary urgency that’s hard to control',
      'Difficulty or pain when having a bowel movement',
      'Feeling of pelvic heaviness or pressure',
      'Chronic pelvic pain or pain during intercourse',
      'Incomplete bowel emptying',
      'Fecal or gas incontinence',
      'Chronic constipation resistant to clinical treatment',
    ],
    topics: [
      { title: 'Urinary and Fecal Incontinence', body: 'Muscle rehabilitation through electromyographic biofeedback and bladder training, with proven results in mild to moderate cases, reducing or eliminating the need for pads.' },
      { title: 'Pelvic Floor Dysfunction', body: 'Hypertonia, hypotonia and pelvic floor asymmetry assessed with biofeedback and treated with individualized protocols, combining manual techniques and electrotherapy.' },
      { title: 'Obstructive Constipation', body: 'Evacuation disorders treated with anorectal biofeedback integrated with gastroenterological anorectal manometry assessment: diagnosis and rehabilitation in the same clinical space.' },
      { title: 'Post-Partum and Post-Surgical Rehabilitation', body: 'Functional recovery of the pelvic floor after vaginal delivery, C-section or pelvic surgery, with specific protocols for each stage of recovery.' },
      { title: 'Chronic Pelvic Pain', body: 'Multidisciplinary approach to painful pelvic syndromes, vaginismus and vulvodynia, together with gynecologists and urologists.' },
      { title: 'GI + Pelvic Integration', body: 'A unique approach at NU.V.E.M combining gastroenterology and pelvic physical therapy for superior results in cases of constipation with a functional component.' },
    ],
    diferenciais: [
      'Anorectal manometry and pelvic physical therapy in the same space, from diagnosis to treatment',
      'State-of-the-art electromyographic biofeedback with documented progress tracking',
      'Individualized protocols with periodic, documented reassessment',
      'Direct integration with gastroenterology for obstructive constipation cases',
      'ISO 9001 certification: every session recorded and traceable',
    ],
    paraMedicos: {
      intro: 'Indicated for patients with pelvic floor dysfunction, urinary or fecal incontinence, constipation with an obstructive component, and chronic pelvic pain. We receive referrals from gynecologists, urologists, gastroenterologists and colorectal surgeons.',
      bullets: [
        'Initial assessment with EMG biofeedback and detailed functional history',
        'Clinical progress documented at the end of each session',
        'Communication with the referring physician in complex cases',
        'Integration with anorectal manometry for complementary diagnosis',
        'Discharge report documenting functional progress',
      ],
    },
    especialistas: [
      { nome: 'Dra. Anna Karoline', esp: 'Pelvic Physical Therapy · EMG Biofeedback', crm: '', foto: '/images/anna-karoline.jpg' },
    ],
    exames: ['avaliacao-pelvica', 'manometria-anorretal'],
    faqs: [
      { pergunta: 'What is pelvic physical therapy?', resposta: 'It’s the rehabilitation of the pelvic floor muscles through electromyographic biofeedback, electrical stimulation and manual techniques, indicated for urinary, digestive and pelvic pain disorders.' },
      { pergunta: 'Is pelvic physical therapy only for women?', resposta: 'No. We treat men and women with pelvic floor dysfunction, urinary or fecal incontinence, and obstructive constipation.' },
      { pergunta: 'How many sessions are needed?', resposta: 'The number of sessions varies by case and is defined after the initial biofeedback assessment, with documented periodic reassessments.' },
      { pergunta: 'Is treatment painful?', resposta: 'No. It’s a non-invasive, patient-centered approach based on current scientific evidence.' },
    ],
  },

  halitose: {
    heroDesc: 'Complete multidisciplinary diagnosis of halitosis. We investigate digestive, oral and systemic causes with precision halimetry and sialometry.',
    intro: [
      'Halitosis is a complex condition that requires a multidisciplinary approach. At NU.V.E.M, we investigate every possible origin: digestive, oral, nasopharyngeal and systemic, with a complete, personalized diagnostic protocol.',
      'Our approach combines objective quantitative halimetry, sialometry, a complete gastroenterological evaluation and, when needed, partnership with dentistry and otolaryngology, all in the same integrated visit.',
    ],
    sintomas: [
      'Persistent bad breath even after rigorous oral hygiene',
      'Bitter or metallic taste in the mouth',
      'People close to you commenting on your breath',
      'Frequent dry mouth (xerostomia)',
      'Heartburn, regurgitation or belching',
      'Burning sensation or coating on the tongue',
      'History of gastric or intestinal problems',
      'Social discomfort due to breath odor',
    ],
    topics: [
      { title: 'Quantitative Halimetry', body: 'Objective quantification of volatile sulfur compounds (VSCs) in exhaled breath with a calibrated Halimeter®, for precise diagnosis and monitoring of treatment response.' },
      { title: 'Sialometry', body: 'Measurement of resting and stimulated salivary flow, essential in diagnosing xerostomia and its direct relationship with oral halitosis.' },
      { title: 'Digestive Halitosis', body: 'In-depth investigation of SIBO, gastroparesis, gastroesophageal reflux and dysbiosis as often underdiagnosed causes of gastrointestinal bad breath.' },
      { title: 'Integrated Diagnostic Protocol', body: 'Simultaneous evaluation of every possible origin: oral, digestive, nasopharyngeal and systemic, with efficient, precise diagnostic sequencing.' },
      { title: 'Individualized Treatment Plan', body: 'Treatment targeted at the identified cause, combining a digestive approach, oral hygiene guidance and referral to specialists when needed.' },
      { title: 'Progress Monitoring', body: 'Periodic monitoring with halimetry to objectively evaluate treatment response, ensuring improvement is documented and sustained.' },
    ],
    diferenciais: [
      'Multidisciplinary protocol to investigate the origin of halitosis and treat the cause',
      'Objective quantitative halimetry: result in ppb (parts per billion) of VSCs',
      'Simultaneous investigation of oral, digestive and systemic origin in the same visit',
      'Individualized treatment plan with documented progress monitoring',
      'ISO 9001 certification: traceable results comparable across visits',
    ],
    paraMedicos: {
      intro: 'We receive referrals from gastroenterologists, otolaryngologists, dentists and general practitioners for a complete diagnostic investigation of halitosis. The NU.V.E.M protocol includes halimetry, sialometry, digestive screening and integrated treatment planning.',
      bullets: [
        'Report with VSC quantification (ppb) and clinical interpretation',
        'Investigation of SIBO, gastroparesis and GERD as digestive causes',
        'Partnership with dentistry for confirmed oral halitosis',
        'Feedback to the referring physician with etiological diagnosis and treatment plan',
        'Progress monitoring available to track results',
      ],
    },
    especialistas: [
      { nome: 'Dra. Vera Ângelo', esp: 'Gastroenterology · Halitosis Diagnosis', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg', href: '/dra-vera-angelo' },
    ],
    exames: ['halimetria-sialometria', 'testes-respiratorios'],
    faqs: [
      { pergunta: 'Does halitosis always originate in the mouth?', resposta: 'No. Halitosis can have digestive, nasopharyngeal or systemic causes, which is why we investigate every possible origin in a single integrated visit.' },
      { pergunta: 'How is the cause of halitosis diagnosed?', resposta: 'Through quantitative halimetry, sialometry and a complete gastroenterological evaluation, with partnership with dentistry and otolaryngology when needed.' },
      { pergunta: 'Is there a definitive treatment for halitosis?', resposta: 'It depends on the identified cause. By treating the source — for example, SIBO or xerostomia — improvement is usually significant and lasting.' },
      { pergunta: 'Is the halimetry exam painful?', resposta: 'No. It’s a simple, quick and painless exam, performed with calibrated equipment (Halimeter®).' },
    ],
  },

  pediatria: {
    heroDesc: 'Comprehensive care for children’s digestive health. Prevention, diagnosis and treatment with a welcoming, family-centered approach and pediatric surgical support.',
    intro: [
      'NU.V.E.M’s pediatrics practice offers specialized attention to the digestive health of children and adolescents, in a welcoming environment designed to reduce children’s anxiety and build trust with the family.',
      'We work closely with gastroenterologists, pediatric surgeons and a pelvic physical therapist to provide the most complete approach in complex cases, from childhood constipation to the investigation of CMPA and H. pylori.',
    ],
    sintomas: [
      'Chronic constipation in children (fewer than 3 bowel movements per week)',
      'Frequent or recurrent diarrhea with no identified cause',
      'Recurrent abdominal pain with no defined diagnosis',
      'Persistent abdominal bloating and discomfort',
      'Suspected lactose intolerance or cow’s milk protein allergy (CMPA)',
      'Persistent infant gastroesophageal reflux',
      'Suspected H. pylori infection in children',
      'Stool with mucus, blood, or significantly altered consistency',
    ],
    topics: [
      { title: 'Children’s Digestive Health', body: 'Constipation, reflux, persistent colic and functional disorders assessed with a gentle approach, based on current pediatric evidence and full family involvement in treatment.' },
      { title: 'Pediatric Food Intolerances', body: 'Diagnosis of lactose intolerance, fructose intolerance and cow’s milk protein allergy (CMPA) with breath test protocols and elimination diets adapted to each age group.' },
      { title: 'H. pylori in Children', body: 'Investigation and eradication confirmation via non-invasive breath test, avoiding unnecessary invasive procedures in children.' },
      { title: 'Chronic Childhood Constipation', body: 'Complete evaluation of constipation refractory to clinical treatment, integrating clinical and dietary approaches and, when needed, pediatric anorectal manometry.' },
      { title: 'Pediatric Surgical Integration', body: 'Cases requiring surgical evaluation are managed together with NU.V.E.M’s pediatric surgeons (Dr. Eliane Basques and Dr. Adrianna Buzatti), integrating diagnosis and management without multiple referrals.' },
      { title: 'Longitudinal Follow-Up', body: 'Ongoing follow-up of digestive growth and development, with family guidance at every visit and treatment plan adjustments as needed.' },
    ],
    diferenciais: [
      'Welcoming environment specially designed for pediatric care',
      'Team includes a pediatrician specialized in pediatric gastroenterology',
      'Integrated pediatric surgeons: surgical evaluation with no external referral needed',
      'Breath tests adapted for children (SIBO, lactose, fructose, H. pylori)',
      'ISO 9001 certification: standardized, safe pediatric protocols',
    ],
    paraMedicos: {
      intro: 'We receive referrals from pediatricians and general practitioners to investigate digestive disorders in childhood. Our team includes a gastroenterologist specialized in pediatrics and pediatric surgeons for cases requiring complementary evaluation or surgical management.',
      bullets: [
        'Breath tests for SIBO, intolerances and H. pylori in children',
        'Environment adapted to reduce anxiety and ease the pediatric exam',
        'Detailed report with recommendations for the referring pediatrician',
        'Immediate surgical integration for cases requiring complementary evaluation',
        'Joint follow-up available for high-complexity cases',
      ],
    },
    especialistas: [
      { nome: 'Dra. Mariana Fernandes',    esp: 'Pediatrics · Children’s Digestive Health', crm: '', foto: '/images/mariana-fernandes.jpg' },
      { nome: 'Dra. Eliane Basques',       esp: 'Pediatric Surgery · Manometry',     crm: 'CRM-MG 27601', foto: '/images/dra-eliane.jpg', href: '/dra-eliane-basques' },
    ],
    exames: ['testes-respiratorios', 'manometria-anorretal'],
    faqs: [
      { pergunta: 'From what age can I bring my child?', resposta: 'We see children from early infancy through adolescence, with an environment and approach adapted to each age group.' },
      { pergunta: 'Are the exams adapted for children?', resposta: 'Yes. Breath tests and other exams follow protocols specific to the pediatric age group, prioritizing comfort and reducing children’s anxiety.' },
      { pergunta: 'When should I seek NU.V.E.M’s pediatrics team?', resposta: 'In cases of persistent constipation, recurrent abdominal pain, suspected food intolerance or infant gastroesophageal reflux.' },
      { pergunta: 'Do you refer for pediatric surgery?', resposta: 'Yes. When needed, surgical evaluation is done together with the clinic’s own pediatric surgeons, with no external referral required.' },
    ],
  },

  nefrologia: {
    heroDesc: 'Specialized diagnosis and treatment of kidney disease, with a unique advantage: integration with gastroenterology to investigate the GI-Kidney interface and manage digestive causes of kidney disease progression.',
    intro: [
      'NU.V.E.M’s nephrology service offers early diagnosis and follow-up of kidney disease with an important clinical advantage: integration with gastroenterology in the same space, allowing investigation of digestive causes often overlooked in the progression of kidney disease.',
      'The gut-kidney connection is scientifically established. Conditions such as enteric hyperoxaluria, intestinal dysbiosis and abnormal oxalate absorption have a direct impact on kidney health; at NU.V.E.M we investigate this interface thoroughly.',
    ],
    sintomas: [
      'Swelling in the feet, ankles or eyelids',
      'Foamy urine or abnormal urine color',
      'Decreased urine volume or frequency',
      'Lower back pain or pressure',
      'Hard-to-control high blood pressure',
      'Recurrent kidney stones',
      'Recurrent urinary tract infections',
      'Digestive symptoms in patients with known kidney disease',
    ],
    topics: [
      { title: 'Chronic Kidney Disease (CKD)', body: 'Specialized clinical follow-up with evidence-based strategies to slow CKD progression, preserve kidney function and improve long-term quality of life.' },
      { title: 'Recurrent Kidney Stones', body: 'Complete metabolic investigation of recurrent kidney stones, including assessment of enteric hyperoxaluria, an under-investigated cause related to abnormal intestinal oxalate absorption.' },
      { title: 'GI-Kidney Interface', body: 'Investigation of the relationship between intestinal dysbiosis, enteric hyperoxaluria, leaky gut syndrome and kidney disease progression: a unique integrative approach available at NU.V.E.M.' },
      { title: 'Recurrent Urinary Tract Infections', body: 'Management of recurrent UTIs with investigation of predisposing factors, microbiological profile and targeted treatment to reduce recurrence.' },
      { title: 'Renovascular Hypertension', body: 'Evaluation and follow-up of kidney-related hypertension, with complementary investigation and integrated management with the internal medicine team.' },
      { title: 'Prevention and Screening', body: 'Preventive kidney evaluation in at-risk patients (diabetics, hypertensive patients, family history), with complementary exams and personalized dietary guidance for kidney protection.' },
    ],
    diferenciais: [
      'Nephrology and gastroenterology in the same space, for those who need both evaluations',
      'Investigation of enteric hyperoxaluria and dysbiosis as causes of recurrent kidney stones',
      'GI-Kidney interface approach: the impact of the microbiota on kidney health',
      'Complete multidisciplinary support with no need for multiple referrals',
      'ISO 9001 certification: traceability of every exam and treatment decision',
    ],
    paraMedicos: {
      intro: 'NU.V.E.M offers nephrology evaluation with a diagnostic edge: integration with gastroenterology allows investigation of intestinal causes of CKD progression, recurrent stones from enteric hyperoxaluria, and the impact of intestinal dysbiosis on kidney health — an approach that nephrology alone often doesn’t cover.',
      bullets: [
        'Complete metabolic investigation in cases of recurrent kidney stones',
        'Joint GI-Kidney evaluation with breath tests and intestinal permeability analysis',
        'CKD follow-up focused on slowing progression and quality of life',
        'Reports and integrated communication with the gastroenterology team',
        'Accepts referrals from general practitioners, cardiologists and endocrinologists',
      ],
    },
    especialistas: [
      { nome: 'Dra. Luiza Auarek', esp: 'Nephrology · GI-Kidney Interface', crm: '', foto: '/images/luiza-auarek.jpg' },
    ],
    exames: [],
    faqs: [
      { pergunta: 'What sets NU.V.E.M’s nephrology apart?', resposta: 'Integration with gastroenterology in the same space, allowing investigation of digestive causes of kidney disease, such as enteric hyperoxaluria and intestinal dysbiosis.' },
      { pergunta: 'When should I see a nephrologist?', resposta: 'In cases of swelling in the feet or eyelids, foamy urine, hard-to-control hypertension, recurrent kidney stones or recurrent urinary tract infections.' },
      { pergunta: 'Is recurrent kidney stones related to the gut?', resposta: 'Yes. In some cases, altered intestinal absorption of oxalate (enteric hyperoxaluria) directly contributes to recurrent kidney stone formation.' },
      { pergunta: 'Do you follow patients with chronic kidney disease?', resposta: 'Yes, with evidence-based strategies to slow disease progression, preserve kidney function and improve long-term quality of life.' },
    ],
  },

  'motilidade-digestiva': {
    heroDesc: 'Advanced evaluation of esophageal and intestinal disorders with integrated high-resolution manometry, pH monitoring and impedance — one of the most specialized centers in Belo Horizonte.',
    intro: [
      'Digestive motility evaluation is one of the most advanced and rare specialties available in Belo Horizonte. NU.V.E.M uses latest-generation equipment to precisely map disorders of the esophagus and gastrointestinal tract.',
      'Our detailed reports follow the Chicago Classification v4.0, the international reference standard for esophageal motor disorders, allowing a definitive diagnosis of conditions that often go unnoticed in conventional investigations.',
    ],
    sintomas: [
      'Difficulty swallowing (dysphagia) solids or liquids',
      'Sensation of food getting stuck in the esophagus',
      'Frequent regurgitation of food',
      'Chest pain with no identified cardiac cause',
      'Heartburn resistant to proton pump inhibitor treatment',
      'Chronic cough with no pulmonary cause',
      'Chronic constipation unresponsive to laxatives',
      'Fecal incontinence or difficulty evacuating',
    ],
    topics: [
      { title: 'Achalasia and Esophageal Motor Disorders', body: 'Definitive diagnosis via high-resolution esophageal manometry (HRM) with complete classification per Chicago Classification v4.0, decisive for treatment choice (dilation, POEM or surgery).' },
      { title: 'Refractory Gastroesophageal Reflux', body: 'Advanced investigation via pH monitoring and impedance for cases unresponsive to conventional treatment, differentiating acid, non-acid and alkaline reflux.' },
      { title: 'Dysphagia', body: 'Complete swallowing evaluation with high-resolution manometry to precisely identify the functional or obstructive cause, essential before any interventional procedure.' },
      { title: 'Defecatory Dysfunction', body: 'High-resolution anorectal manometry to differentiate slow-transit constipation, pelvic floor dyssynergia and other defecatory disorders, each with distinct therapeutic implications.' },
      { title: 'Barrett’s Esophagus and Surveillance', body: 'Functional investigation complementary to endoscopy in patients with Barrett’s esophagus, assessing lower esophageal sphincter pressure and reflux pattern.' },
      { title: 'Pre- and Post-Operative Evaluation', body: 'Esophageal motility study required before anti-reflux surgery (fundoplication) and essential for evaluating unsatisfactory post-operative results.' },
    ],
    diferenciais: [
      'High-resolution manometry (HRM) with Chicago Classification v4.0 analysis, the international standard',
      'One of the few centers in Belo Horizonte with combined pH monitoring + impedance',
      'Dr. Gabriel de Souza Fernandes Filho, gastroenterologist specialized in digestive motility',
      'Reports with complete tracings and individualized treatment recommendations',
      'ISO 9001 certification: standardization and traceability of every exam',
    ],
    paraMedicos: {
      intro: 'Indicated for investigating dysphagia, non-cardiac chest pain, refractory GERD, achalasia and defecatory disorders. Our reports follow the Chicago Classification v4.0 and the DeMeester protocol for pH monitoring, providing a solid technical basis for treatment decisions.',
      bullets: [
        'Complete report with high-resolution tracings and specialist analysis',
        'Chicago Classification v4.0 systematically applied to every HRM report',
        'Results with clinical interpretation available immediately after the exam',
        'Integration with pelvic physical therapy for defecatory dysfunction cases',
        'Second-opinion support for high-complexity cases',
      ],
    },
    especialistas: [
      { nome: 'Dra. Vera Ângelo',   esp: 'Gastroenterology and Motility', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg', href: '/dra-vera-angelo' },
      { nome: 'Dr. Gabriel de Souza Fernandes Filho', esp: 'Gastroenterology', crm: '', foto: '/images/dr-Gabriel-de-Souza-Fernandes-Filho.jpg' },
    ],
    exames: ['manometria-esofagica', 'manometria-anorretal', 'phmetria-impedanciometria'],
    faqs: [
      { pergunta: 'What does a digestive motility evaluation assess?', resposta: 'It assesses the muscular function of the esophagus and intestine, identifying disorders such as achalasia, dysphagia and reflux refractory to conventional treatment.' },
      { pergunta: 'What exams are part of this evaluation?', resposta: 'High-resolution esophageal and anorectal manometry, pH monitoring and impedance, all with reports based on the Chicago Classification v4.0.' },
      { pergunta: 'When is this evaluation indicated?', resposta: 'In cases of dysphagia, chest pain with no cardiac cause, reflux refractory to treatment, and before anti-reflux surgery or to investigate unsatisfactory post-operative results.' },
      { pergunta: 'Do these exams replace endoscopy?', resposta: 'No. They’re complementary exams: endoscopy evaluates the structure of the digestive tract, while manometry and pH monitoring evaluate function and motility.' },
    ],
  },
}

// ─── Español ───────────────────────────────────────────────────────────────

const DETAIL_ES: Record<string, DetailData> = {

  gastroenterologia: {
    heroDesc: 'Especialidad enfocada en el equilibrio intestinal pleno: tratamos desde síntomas comunes hasta patologías complejas como SIBO, IMO, disbiosis y DGBI – Trastorno de la Interacción Cerebro-Intestino.',
    intro: [
      'La gastroenterología de NU.V.E.M abarca el diagnóstico y tratamiento completo de las enfermedades del aparato digestivo, con especial atención al DGBI – Trastorno de la Interacción Cerebro-Intestino, la disbiosis intestinal y los trastornos de la motilidad.',
      'Nuestro enfoque integra una evaluación clínica detallada, exámenes de alta precisión como pruebas respiratorias y manometría, y protocolos terapéuticos basados en las directrices Roma V, la clasificación internacional más reciente y reconocida para los trastornos funcionales digestivos.',
    ],
    sintomas: [
      'Hinchazón y distensión abdominal persistente',
      'Alternancia entre diarrea y estreñimiento',
      'Dolor o malestar abdominal recurrente',
      'Gases excesivos y flatulencia',
      'Náuseas sin causa aparente',
      'Acidez o regurgitación frecuente',
      'Fatiga y malestar inexplicables',
      'Diarrea después de las comidas',
      'Dificultad para ganar o perder peso',
    ],
    topics: [
      { title: 'SIBO e IMO', body: 'Sobrecrecimiento bacteriano del intestino delgado (SIBO) y sobrecrecimiento de metanógenos (IMO), diagnosticados con precisión mediante pruebas respiratorias realizadas en la propia clínica.' },
      { title: 'DGBI – Trastorno de la Interacción Cerebro-Intestino', body: 'Síndrome del intestino irritable, dispepsia funcional y estreñimiento funcional investigados con una metodología completa y personalizada, siguiendo rigurosamente las directrices Roma V.' },
      { title: 'Intolerancias Alimentarias', body: 'Lactosa, fructosa y otras intolerancias identificadas mediante pruebas respiratorias validadas, sin necesidad de biopsia ni extracción de sangre.' },
      { title: 'Helicobacter pylori', body: 'Diagnóstico preciso mediante prueba respiratoria (método no endoscópico de alta precisión) y manejo terapéutico completo con control de erradicación.' },
      { title: 'Disbiosis Intestinal', body: 'Desequilibrio de la microbiota intestinal evaluado clínicamente, con protocolos terapéuticos individualizados para restaurar el equilibrio digestivo.' },
      { title: 'Enfermedades Inflamatorias y Funcionales', body: 'Investigación completa de la enfermedad de Crohn, colitis ulcerosa y otras condiciones inflamatorias, con seguimiento longitudinal.' },
    ],
    diferenciais: [
      'Pruebas respiratorias realizadas en la propia clínica: resultado e interpretación el mismo día',
      'Informes basados en las directrices Roma V, referencia mundial para DGBI',
      'Equipo integrado de gastroenterología, fisioterapia pélvica y motilidad digestiva',
      'Certificación ISO 9001 que garantiza trazabilidad y estandarización de todos los procedimientos',
      'Dra. Vera Ângelo, profesora invitada del Hospital Israelita Albert Einstein',
    ],
    paraMedicos: {
      intro: 'NU.V.E.M es un centro de referencia en diagnóstico funcional digestivo en Belo Horizonte. Recibimos derivaciones para la investigación de SIBO/IMO, intolerancias alimentarias, H. pylori no endoscópico y DGBI. Nuestro equipo emite informes detallados y mantiene comunicación con el médico derivante en los casos que requieren manejo compartido.',
      bullets: [
        'Informes detallados entregados en un plazo de 24h tras el examen',
        'Curvas completas de las pruebas respiratorias con interpretación clínica individualizada',
        'Comunicación directa con el médico derivante en casos complejos',
        'Acepta derivaciones de cualquier especialidad médica',
        'Certificación ISO 9001 con trazabilidad de todos los procedimientos',
      ],
    },
    especialistas: [
      { nome: 'Dra. Vera Ângelo',     esp: 'Gastroenterología y Motilidad', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg',       href: '/dra-vera-angelo' },
      { nome: 'Dra. Claudia Utsch',   esp: 'Gastroenterología',              crm: '',             foto: '/images/claudia-utsch.jpg' },
      { nome: 'Dra. Danielle Martins',esp: 'Gastroenterología y DGBI',       crm: '',             foto: '/images/danielle-martins.jpg' },
    ],
    exames: ['testes-respiratorios', 'manometria-esofagica', 'phmetria-impedanciometria'],
    faqs: [
      { pergunta: '¿Qué trata un gastroenterólogo en NU.V.E.M?', resposta: 'Tratamos enfermedades del aparato digestivo con especial atención al SIBO, IMO, disbiosis intestinal y DGBI – Trastorno de la Interacción Cerebro-Intestino, siguiendo las directrices Roma V.' },
      { pergunta: '¿Cuándo debo consultar a un gastroenterólogo?', resposta: 'Síntomas persistentes como hinchazón abdominal, dolor o malestar recurrente, alternancia entre diarrea y estreñimiento, gases excesivos y acidez frecuente son buenos motivos para buscar una evaluación.' },
      { pergunta: '¿Qué exámenes se realizan en la consulta de gastroenterología?', resposta: 'Según la indicación clínica, se pueden solicitar prueba respiratoria, manometría esofágica y pHmetría con impedancia, todos realizados en la propia clínica.' },
      { pergunta: '¿El SIBO y el IMO tienen cura?', resposta: 'El tratamiento suele implicar antibioticoterapia dirigida y ajustes en la dieta, con buenos resultados en la mayoría de los casos cuando se realiza un seguimiento adecuado con un especialista.' },
    ],
  },

  'fisioterapia-pelvica': {
    heroDesc: 'Rehabilitación especializada del piso pélvico: incontinencia, disfunciones pélvicas y trastornos digestivos funcionales tratados con biofeedback y protocolos individualizados.',
    intro: [
      'La fisioterapia pélvica de NU.V.E.M está integrada al tratamiento gastroenterológico, reconociendo que el piso pélvico desempeña un papel fundamental en la fisiología digestiva y urinaria.',
      'Utilizamos biofeedback electromiográfico de última generación, electroestimulación y técnicas manuales para rehabilitar a pacientes con disfunciones complejas de forma no invasiva, humanizada y basada en evidencia científica actualizada.',
    ],
    sintomas: [
      'Pérdida de orina al toser, estornudar o hacer ejercicio',
      'Urgencia miccional súbita y difícil de controlar',
      'Dificultad o dolor para evacuar',
      'Sensación de peso o presión pélvica',
      'Dolor pélvico crónico o durante las relaciones sexuales',
      'Vaciado intestinal incompleto',
      'Incontinencia fecal o de gases',
      'Estreñimiento crónico resistente al tratamiento clínico',
    ],
    topics: [
      { title: 'Incontinencia Urinaria y Fecal', body: 'Rehabilitación muscular mediante biofeedback electromiográfico y entrenamiento vesical con resultados comprobados en casos de complejidad leve a moderada, reduciendo o eliminando el uso de protectores.' },
      { title: 'Disfunción del Piso Pélvico', body: 'Hipertonía, hipotonía y asimetría del piso pélvico evaluadas con biofeedback y tratadas con protocolos individualizados, integrando técnicas manuales y electroterapia.' },
      { title: 'Estreñimiento Obstructivo', body: 'Disfunción evacuatoria tratada con biofeedback anorrectal integrado a la evaluación gastroenterológica de la manometría anorrectal: diagnóstico y rehabilitación en el mismo espacio clínico.' },
      { title: 'Rehabilitación Posparto y Posquirúrgica', body: 'Recuperación funcional del piso pélvico después de parto vaginal, cesárea o cirugías pélvicas, con protocolos específicos para cada fase del posoperatorio.' },
      { title: 'Dolor Pélvico Crónico', body: 'Abordaje multidisciplinario de síndromes dolorosos pélvicos, vaginismo y vulvodinia, en conjunto con ginecólogos y urólogos.' },
      { title: 'Integración GI + Pélvico', body: 'Enfoque único en NU.V.E.M que combina gastroenterología y fisioterapia pélvica para resultados superiores en casos de estreñimiento con componente funcional.' },
    ],
    diferenciais: [
      'Manometría anorrectal y fisioterapia pélvica en el mismo espacio, desde el diagnóstico hasta el tratamiento',
      'Biofeedback electromiográfico de última generación con registro gráfico de evolución',
      'Protocolos individualizados con reevaluación periódica documentada',
      'Integración directa con gastroenterología para casos de estreñimiento obstructivo',
      'Certificación ISO 9001: cada sesión registrada y trazable',
    ],
    paraMedicos: {
      intro: 'Indicada para pacientes con disfunciones del piso pélvico, incontinencia urinaria o fecal, estreñimiento con componente obstructivo y dolor pélvico crónico. Recibimos derivaciones de ginecólogos, urólogos, gastroenterólogos y cirujanos colorrectales.',
      bullets: [
        'Evaluación inicial con biofeedback EMG y anamnesis funcional detallada',
        'Evolución clínica documentada al final de cada sesión',
        'Comunicación con el médico derivante en casos complejos',
        'Integración con manometría anorrectal para diagnóstico complementario',
        'Informe de alta con registro de evolución funcional',
      ],
    },
    especialistas: [
      { nome: 'Dra. Anna Karoline', esp: 'Fisioterapia Pélvica · Biofeedback EMG', crm: '', foto: '/images/anna-karoline.jpg' },
    ],
    exames: ['avaliacao-pelvica', 'manometria-anorretal'],
    faqs: [
      { pergunta: '¿Qué es la fisioterapia pélvica?', resposta: 'Es la rehabilitación de los músculos del piso pélvico mediante biofeedback electromiográfico, electroestimulación y técnicas manuales, indicada para disfunciones urinarias, digestivas y dolor pélvico.' },
      { pergunta: '¿La fisioterapia pélvica es solo para mujeres?', resposta: 'No. Atendemos a hombres y mujeres con disfunciones del piso pélvico, incontinencia urinaria o fecal y estreñimiento obstructivo.' },
      { pergunta: '¿Cuántas sesiones son necesarias?', resposta: 'El número de sesiones varía según el caso y se define después de la evaluación inicial con biofeedback, con reevaluaciones periódicas documentadas.' },
      { pergunta: '¿El tratamiento es doloroso?', resposta: 'No. Es un enfoque no invasivo y humanizado, basado en evidencia científica actualizada.' },
    ],
  },

  halitose: {
    heroDesc: 'Diagnóstico multidisciplinario completo de la halitosis. Investigamos causas digestivas, orales y sistémicas con halimetría y sialometría de alta precisión.',
    intro: [
      'La halitosis es una condición compleja que exige un abordaje multidisciplinario. En NU.V.E.M investigamos todos los orígenes posibles: digestivos, orales, nasofaríngeos y sistémicos, con un protocolo diagnóstico completo y personalizado.',
      'Nuestro enfoque combina halimetría cuantitativa objetiva, sialometría, evaluación gastroenterológica completa y, cuando es necesario, colaboración con odontología y otorrinolaringología, todo en la misma consulta integrada.',
    ],
    sintomas: [
      'Mal aliento persistente incluso después de una higiene bucal rigurosa',
      'Sabor amargo o metálico en la boca',
      'Comentarios de personas cercanas sobre el aliento',
      'Boca seca frecuente (xerostomía)',
      'Acidez, regurgitación o eructos asociados',
      'Sensación de ardor o saburra en la lengua',
      'Antecedentes de problemas gástricos o intestinales',
      'Malestar social por causa del aliento',
    ],
    topics: [
      { title: 'Halimetría Cuantitativa', body: 'Cuantificación objetiva de compuestos sulfurados volátiles (CSV) en el aire exhalado con un Halimeter® calibrado, para un diagnóstico preciso y seguimiento de la respuesta al tratamiento.' },
      { title: 'Sialometría', body: 'Medición del flujo salival en reposo y estimulado, esencial en el diagnóstico de la xerostomía y su relación directa con la halitosis de origen oral.' },
      { title: 'Halitosis Digestiva', body: 'Investigación profunda de SIBO, gastroparesia, reflujo gastroesofágico y disbiosis como causas de mal aliento de origen gastrointestinal, frecuentemente subdiagnosticadas.' },
      { title: 'Protocolo Diagnóstico Integrado', body: 'Evaluación simultánea de todos los orígenes posibles: oral, digestivo, nasofaríngeo y sistémico, con una secuencia diagnóstica eficiente y precisa.' },
      { title: 'Plan Terapéutico Individualizado', body: 'Tratamiento dirigido a la causa identificada, combinando el abordaje digestivo, orientaciones de higiene oral y derivación a especialistas cuando es necesario.' },
      { title: 'Seguimiento Evolutivo', body: 'Monitoreo periódico con halimetría para evaluar objetivamente la respuesta al tratamiento, garantizando que la mejora quede documentada y sea sostenida.' },
    ],
    diferenciais: [
      'Protocolo multidisciplinario para investigar el origen de la halitosis y tratar la causa',
      'Halimetría cuantitativa objetiva: resultado en ppb (partes por billón) de CSV',
      'Investigación simultánea de origen oral, digestivo y sistémico en la misma consulta',
      'Plan terapéutico individualizado con seguimiento evolutivo documentado',
      'Certificación ISO 9001: resultados trazables y comparables entre consultas',
    ],
    paraMedicos: {
      intro: 'Recibimos derivaciones de gastroenterólogos, otorrinolaringólogos, odontólogos y médicos generales para la investigación diagnóstica completa de la halitosis. El protocolo NU.V.E.M incluye halimetría, sialometría, cribado digestivo y planificación terapéutica integrada.',
      bullets: [
        'Informe con cuantificación de CSV (ppb) e interpretación clínica',
        'Investigación de SIBO, gastroparesia y ERGE como causas digestivas',
        'Colaboración con odontología para halitosis oral confirmada',
        'Retorno al médico derivante con diagnóstico etiológico y plan terapéutico',
        'Monitoreo evolutivo disponible para el seguimiento de resultados',
      ],
    },
    especialistas: [
      { nome: 'Dra. Vera Ângelo', esp: 'Gastroenterología · Diagnóstico de Halitosis', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg', href: '/dra-vera-angelo' },
    ],
    exames: ['halimetria-sialometria', 'testes-respiratorios'],
    faqs: [
      { pergunta: '¿La halitosis siempre tiene origen en la boca?', resposta: 'No. La halitosis puede tener causas digestivas, nasofaríngeas o sistémicas, por eso investigamos todos los orígenes posibles en una única consulta integrada.' },
      { pergunta: '¿Cómo se diagnostica la causa de la halitosis?', resposta: 'Mediante halimetría cuantitativa, sialometría y evaluación gastroenterológica completa, con colaboración de odontología y otorrinolaringología cuando es necesario.' },
      { pergunta: '¿Existe un tratamiento definitivo para la halitosis?', resposta: 'Depende de la causa identificada. Al tratar el origen —por ejemplo, SIBO o xerostomía— la mejora suele ser significativa y duradera.' },
      { pergunta: '¿El examen de halimetría es doloroso?', resposta: 'No. Es un examen simple, rápido e indoloro, realizado con un equipo calibrado (Halimeter®).' },
    ],
  },

  pediatria: {
    heroDesc: 'Cuidado integral de la salud digestiva infantil. Prevención, diagnóstico y tratamiento con un enfoque cercano, integrado a la familia y con soporte de cirugía pediátrica.',
    intro: [
      'La pediatría de NU.V.E.M ofrece atención especializada a la salud digestiva de niños y adolescentes, en un ambiente acogedor diseñado para reducir la ansiedad infantil y facilitar el vínculo con la familia.',
      'Trabajamos en estrecha colaboración con gastroenterólogos, cirujanas pediátricas y fisioterapeuta pélvica para ofrecer el manejo más completo en casos complejos, desde el estreñimiento infantil hasta la investigación de APLV y H. pylori.',
    ],
    sintomas: [
      'Estreñimiento crónico en niños (menos de 3 evacuaciones por semana)',
      'Diarreas frecuentes o recurrentes sin causa identificada',
      'Dolores abdominales recurrentes sin diagnóstico definido',
      'Distensión y malestar abdominal persistente',
      'Sospecha de intolerancia a la lactosa o proteína de la leche (APLV)',
      'Reflujo gastroesofágico infantil persistente',
      'Sospecha de H. pylori en niños',
      'Heces con moco, sangre o consistencia muy alterada',
    ],
    topics: [
      { title: 'Salud Digestiva Infantil', body: 'Estreñimiento, reflujo, cólicos persistentes y trastornos funcionales evaluados con un enfoque cercano, basado en evidencia pediátrica actualizada y con total participación de la familia en el tratamiento.' },
      { title: 'Intolerancias Alimentarias Pediátricas', body: 'Diagnóstico de intolerancia a la lactosa, la fructosa y la proteína de la leche de vaca (APLV) con protocolos de pruebas respiratorias y dietas de exclusión adaptadas a cada franja etaria.' },
      { title: 'H. pylori en Niños', body: 'Investigación y confirmación de erradicación mediante prueba respiratoria no invasiva, evitando procedimientos invasivos innecesarios en niños.' },
      { title: 'Estreñimiento Crónico Infantil', body: 'Evaluación completa del estreñimiento refractario al tratamiento clínico, integrando el abordaje clínico, dietético y, cuando es necesario, manometría anorrectal pediátrica.' },
      { title: 'Integración con Cirugía Pediátrica', body: 'Los casos que requieren evaluación quirúrgica se manejan junto con las cirujanas pediátricas de NU.V.E.M (Dra. Eliane Basques y Dra. Adrianna Buzatti), integrando diagnóstico y manejo sin necesidad de múltiples derivaciones.' },
      { title: 'Seguimiento Longitudinal', body: 'Seguimiento continuo del crecimiento y desarrollo digestivo, con orientaciones para la familia en cada consulta y ajuste del plan terapéutico según la evolución.' },
    ],
    diferenciais: [
      'Ambiente acogedor pensado especialmente para la atención infantil',
      'Equipo con pediatra especialista en gastroenterología pediátrica',
      'Cirujanas pediátricas integradas: evaluación quirúrgica sin derivación externa',
      'Pruebas respiratorias adaptadas para niños (SIBO, lactosa, fructosa, H. pylori)',
      'Certificación ISO 9001: protocolos pediátricos estandarizados y seguros',
    ],
    paraMedicos: {
      intro: 'Recibimos derivaciones de pediatras y médicos generales para la investigación de trastornos digestivos en la infancia. Nuestro equipo incluye una gastroenteróloga especializada en pediatría y cirujanas pediátricas para los casos que requieran evaluación complementaria o manejo quirúrgico.',
      bullets: [
        'Pruebas respiratorias para SIBO, intolerancias y H. pylori en niños',
        'Ambiente adaptado para reducir la ansiedad y facilitar el examen pediátrico',
        'Informe detallado con recomendaciones para el pediatra derivante',
        'Integración quirúrgica inmediata para casos que requieran evaluación complementaria',
        'Seguimiento conjunto disponible para casos de alta complejidad',
      ],
    },
    especialistas: [
      { nome: 'Dra. Mariana Fernandes',    esp: 'Pediatría · Salud Digestiva Infantil', crm: '', foto: '/images/mariana-fernandes.jpg' },
      { nome: 'Dra. Eliane Basques',       esp: 'Cirugía Pediátrica · Manometría',     crm: 'CRM-MG 27601', foto: '/images/dra-eliane.jpg', href: '/dra-eliane-basques' },
    ],
    exames: ['testes-respiratorios', 'manometria-anorretal'],
    faqs: [
      { pergunta: '¿A partir de qué edad puedo llevar a mi hijo?', resposta: 'Atendemos a niños desde la primera infancia hasta la adolescencia, con un ambiente y abordaje adaptados a cada franja etaria.' },
      { pergunta: '¿Los exámenes están adaptados para niños?', resposta: 'Sí. Las pruebas respiratorias y demás exámenes siguen protocolos específicos para la franja etaria pediátrica, priorizando la comodidad y reduciendo la ansiedad infantil.' },
      { pergunta: '¿Cuándo debo acudir a la pediatría de NU.V.E.M?', resposta: 'En casos de estreñimiento persistente, dolores abdominales recurrentes, sospecha de intolerancia alimentaria o de reflujo gastroesofágico infantil.' },
      { pergunta: '¿Hacen derivación a cirugía pediátrica?', resposta: 'Sí. Cuando es necesario, la evaluación quirúrgica se realiza junto con las cirujanas pediátricas de la propia clínica, sin necesidad de derivación externa.' },
    ],
  },

  nefrologia: {
    heroDesc: 'Diagnóstico y tratamiento especializado de enfermedades renales, con un diferencial único: la integración con gastroenterología para investigar la interfaz GI-Renal y el manejo de causas digestivas de la progresión renal.',
    intro: [
      'El servicio de nefrología de NU.V.E.M ofrece diagnóstico temprano y seguimiento de enfermedades renales con un diferencial clínico importante: la integración con la gastroenterología en el mismo espacio, permitiendo investigar causas digestivas frecuentemente descuidadas en la progresión de las enfermedades renales.',
      'La conexión entre el intestino y el riñón está científicamente establecida. Condiciones como la oxaluria entérica, la disbiosis intestinal y la absorción anormal de oxalatos tienen un impacto directo en la salud renal; en NU.V.E.M investigamos esta interfaz de forma completa.',
    ],
    sintomas: [
      'Edema (hinchazón) en los pies, tobillos o párpados',
      'Orina espumosa o con coloración alterada',
      'Disminución del volumen o la frecuencia urinaria',
      'Dolor o presión en la región lumbar',
      'Hipertensión arterial de difícil control',
      'Cálculos renales recurrentes (piedras en los riñones)',
      'Infecciones urinarias de repetición',
      'Síntomas digestivos en pacientes con enfermedad renal conocida',
    ],
    topics: [
      { title: 'Enfermedad Renal Crónica (ERC)', body: 'Seguimiento clínico especializado con estrategias basadas en evidencia para retrasar la progresión de la ERC, preservar la función renal y mejorar la calidad de vida a largo plazo.' },
      { title: 'Litiasis Renal Recurrente', body: 'Investigación metabólica completa de cálculos renales de repetición, incluyendo la evaluación de la oxaluria entérica, causa poco investigada relacionada con la absorción intestinal anormal de oxalatos.' },
      { title: 'Interfaz GI-Renal', body: 'Investigación de la relación entre la disbiosis intestinal, la oxaluria entérica, el síndrome del intestino permeable y la progresión de las enfermedades renales: un abordaje integrador único disponible en NU.V.E.M.' },
      { title: 'Infecciones Urinarias de Repetición', body: 'Manejo de ITU recurrente con investigación de factores predisponentes, perfil microbiológico y tratamiento dirigido para reducir las recurrencias.' },
      { title: 'Hipertensión Renovascular', body: 'Evaluación y seguimiento de la hipertensión de causa renal, con investigación complementaria y manejo integrado con el equipo de medicina interna.' },
      { title: 'Prevención y Cribado', body: 'Evaluación renal preventiva en pacientes de riesgo (diabéticos, hipertensos, antecedentes familiares), con exámenes complementarios y orientación dietética personalizada para la protección renal.' },
    ],
    diferenciais: [
      'Nefrología y gastroenterología en el mismo espacio, para quienes necesitan ambas evaluaciones',
      'Investigación de la oxaluria entérica y la disbiosis como causas de litiasis renal recurrente',
      'Abordaje de la interfaz GI-Renal: el impacto de la microbiota en la salud renal',
      'Soporte multidisciplinario completo sin necesidad de múltiples derivaciones',
      'Certificación ISO 9001: trazabilidad de todos los exámenes y decisiones',
    ],
    paraMedicos: {
      intro: 'NU.V.E.M ofrece evaluación nefrológica con un diferencial diagnóstico: la integración con gastroenterología permite investigar causas intestinales de la progresión de la ERC, la litiasis recurrente por oxaluria entérica y el impacto de la disbiosis intestinal en la salud renal, un abordaje que la nefrología aislada frecuentemente no contempla.',
      bullets: [
        'Investigación metabólica completa en casos de litiasis renal recurrente',
        'Evaluación conjunta GI-Renal con pruebas respiratorias y análisis de permeabilidad intestinal',
        'Seguimiento de la ERC con foco en retrasar la progresión y la calidad de vida',
        'Informes y comunicación integrada con el equipo de gastroenterología',
        'Acepta derivaciones de médicos generales, cardiólogos y endocrinólogos',
      ],
    },
    especialistas: [
      { nome: 'Dra. Luiza Auarek', esp: 'Nefrología · Interfaz GI-Renal', crm: '', foto: '/images/luiza-auarek.jpg' },
    ],
    exames: [],
    faqs: [
      { pergunta: '¿Qué diferencia a la nefrología de NU.V.E.M?', resposta: 'La integración con la gastroenterología en el mismo espacio, permitiendo investigar causas digestivas de las enfermedades renales, como la oxaluria entérica y la disbiosis intestinal.' },
      { pergunta: '¿Cuándo debo consultar a un nefrólogo?', resposta: 'En casos de hinchazón en los pies o párpados, orina espumosa, hipertensión de difícil control, cálculos renales recurrentes o infecciones urinarias de repetición.' },
      { pergunta: '¿El cálculo renal de repetición tiene relación con el intestino?', resposta: 'Sí. En algunos casos, la absorción intestinal alterada de oxalato (oxaluria entérica) contribuye directamente a la formación recurrente de cálculos renales.' },
      { pergunta: '¿Hacen seguimiento de pacientes con enfermedad renal crónica?', resposta: 'Sí, con estrategias basadas en evidencia para retrasar la progresión de la enfermedad, preservar la función renal y mejorar la calidad de vida a largo plazo.' },
    ],
  },

  'motilidade-digestiva': {
    heroDesc: 'Evaluación avanzada de los trastornos esofágicos e intestinales con manometría de alta resolución, pHmetría e impedancia integradas, uno de los centros más especializados de Belo Horizonte.',
    intro: [
      'La evaluación de la motilidad digestiva es una de las especialidades más avanzadas y escasas disponibles en Belo Horizonte. NU.V.E.M utiliza equipos de última generación para mapear con precisión los trastornos del esófago y del tracto gastrointestinal.',
      'Nuestros informes detallados siguen la Clasificación de Chicago v4.0, el estándar internacional de referencia para los trastornos motores esofágicos, y permiten un diagnóstico definitivo de condiciones que frecuentemente pasan desapercibidas en investigaciones convencionales.',
    ],
    sintomas: [
      'Dificultad para tragar (disfagia) sólidos o líquidos',
      'Sensación de comida atascada en el esófago',
      'Regurgitación frecuente de alimentos',
      'Dolor torácico sin causa cardíaca identificada',
      'Acidez resistente al tratamiento con inhibidores de la bomba de protones',
      'Tos crónica sin causa pulmonar',
      'Estreñimiento crónico sin respuesta a laxantes',
      'Incontinencia fecal o dificultad para evacuar',
    ],
    topics: [
      { title: 'Acalasia y Trastornos Motores Esofágicos', body: 'Diagnóstico definitivo mediante manometría esofágica de alta resolución (HRM) con clasificación completa según la Clasificación de Chicago v4.0, determinante para la decisión terapéutica (dilatación, POEM o cirugía).' },
      { title: 'Reflujo Gastroesofágico Refractario', body: 'Investigación avanzada mediante pHmetría e impedancia para casos que no responden al tratamiento convencional, diferenciando reflujo ácido, no ácido y alcalino.' },
      { title: 'Disfagia', body: 'Evaluación completa de la deglución con manometría de alta resolución para identificar con precisión la causa funcional u obstructiva, esencial antes de cualquier procedimiento intervencionista.' },
      { title: 'Disfunción Defecatoria', body: 'Manometría anorrectal de alta resolución para diferenciar el estreñimiento de tránsito lento, la disinergia del piso pélvico y otros trastornos defecatorios; implicaciones terapéuticas distintas para cada caso.' },
      { title: 'Esófago de Barrett y Vigilancia', body: 'Investigación funcional complementaria a la endoscopia en pacientes con esófago de Barrett, evaluando la presión del esfínter esofágico inferior y el patrón de reflujo.' },
      { title: 'Evaluación Pre y Posoperatoria', body: 'Estudio de motilidad esofágica obligatorio antes de la cirugía antirreflujo (funduplicatura) y esencial para evaluar resultados posoperatorios insatisfactorios.' },
    ],
    diferenciais: [
      'Manometría de alta resolución (HRM) con análisis según la Clasificación de Chicago v4.0, estándar internacional',
      'Uno de los pocos centros en Belo Horizonte con pHmetría + impedancia combinadas',
      'Dr. Gabriel de Souza Fernandes Filho, gastroenterólogo especializado en motilidad digestiva',
      'Informes con trazados completos y recomendaciones terapéuticas individualizadas',
      'Certificación ISO 9001: estandarización y trazabilidad de todos los exámenes',
    ],
    paraMedicos: {
      intro: 'Indicada para la investigación de disfagia, dolor torácico no cardíaco, ERGE refractaria, acalasia y trastornos defecatorios. Nuestros informes siguen la Clasificación de Chicago v4.0 y el protocolo DeMeester para pHmetría, proporcionando una base técnica sólida para la decisión terapéutica.',
      bullets: [
        'Informe completo con trazados de alta resolución y análisis de especialista',
        'Clasificación de Chicago v4.0 aplicada sistemáticamente en todos los informes de HRM',
        'Resultados con interpretación clínica disponibles inmediatamente después del examen',
        'Integración con fisioterapia pélvica para casos de disfunción defecatoria',
        'Soporte para segunda opinión en casos de alta complejidad',
      ],
    },
    especialistas: [
      { nome: 'Dra. Vera Ângelo',   esp: 'Gastroenterología y Motilidad', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg', href: '/dra-vera-angelo' },
      { nome: 'Dr. Gabriel de Souza Fernandes Filho', esp: 'Gastroenterología', crm: '', foto: '/images/dr-Gabriel-de-Souza-Fernandes-Filho.jpg' },
    ],
    exames: ['manometria-esofagica', 'manometria-anorretal', 'phmetria-impedanciometria'],
    faqs: [
      { pergunta: '¿Qué evalúa la motilidad digestiva?', resposta: 'Evalúa el funcionamiento muscular del esófago y del intestino, identificando trastornos como la acalasia, la disfagia y el reflujo refractario al tratamiento convencional.' },
      { pergunta: '¿Qué exámenes forman parte de esta evaluación?', resposta: 'Manometría esofágica y anorrectal de alta resolución, pHmetría e impedancia, todos con informes basados en la Clasificación de Chicago v4.0.' },
      { pergunta: '¿Cuándo está indicada esta evaluación?', resposta: 'En casos de disfagia, dolor torácico sin causa cardíaca, reflujo refractario al tratamiento y antes de cirugías antirreflujo o para investigar resultados posoperatorios insatisfactorios.' },
      { pergunta: '¿Estos exámenes sustituyen a la endoscopia?', resposta: 'No. Son exámenes complementarios: la endoscopia evalúa la estructura del tracto digestivo, mientras que la manometría y la pHmetría evalúan la función y la motilidad.' },
    ],
  },
}

export function getEspecialidadeDetail(locale: AppLocale, slug: string): DetailData | undefined {
  const table = locale === 'en' ? DETAIL_EN : locale === 'es' ? DETAIL_ES : DETAIL_PT
  return table[slug]
}
