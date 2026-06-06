import type { Metadata } from 'next'
import { notFound }      from 'next/navigation'
import Link    from 'next/link'
import Image   from 'next/image'
import { ArrowRight, CheckCircle2, Stethoscope } from 'lucide-react'
import { IsoSeal } from '@/components/icons/IsoSeal'
import { PageHero }       from '@/components/ui/PageHero'
import { Breadcrumb }     from '@/components/ui/Breadcrumb'
import { SectionWrapper } from '@/components/ui/SectionWrapper'
import { CtaBanner }      from '@/components/ui/CtaBanner'
import { ESPECIALIDADES, EXAMES } from '@/lib/data'
import { renderRich } from '@/lib/rich'

// ─── Tipos ────────────────────────────────────────────────────────────────────

interface Especialista {
  nome:  string
  esp:   string
  crm?:  string
  foto:  string
  href?: string
}

interface DetailData {
  heroDesc:      string
  intro:         string[]
  sintomas:      string[]
  topics:        { title: string; body: string }[]
  diferenciais:  string[]
  paraMedicos:   { intro: string; bullets: string[] }
  especialistas: Especialista[]
  exames:        string[]
}

// ─── Dados por especialidade ──────────────────────────────────────────────────

const DETAIL: Record<string, DetailData> = {

  // ── Gastroenterologia ──────────────────────────────────────────────────────
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
      { nome: 'Dra. Vera Ângelo',     esp: 'Gastroenterologia e Motilidade', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg',       href: '/equipe/dra-vera' },
      { nome: 'Dra. Claudia Utsch',   esp: 'Gastroenterologia',              crm: '',             foto: '/images/claudia-utsch.jpg' },
      { nome: 'Dra. Danielle Martins',esp: 'Gastroenterologia e DGBI',       crm: '',             foto: '/images/danielle-martins.jpg' },
    ],
    exames: ['testes-respiratorios', 'manometria-esofagica', 'phmetria-impedanciometria'],
  },

  // ── Fisioterapia Pélvica ───────────────────────────────────────────────────
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
      'Única clínica em BH que integra fisioterapia pélvica e manometria anorretal no mesmo espaço',
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
  },

  // ── Halitose ───────────────────────────────────────────────────────────────
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
      'Único protocolo multidisciplinar completo para halitose em Belo Horizonte',
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
      { nome: 'Dra. Vera Ângelo', esp: 'Gastroenterologia · Diagnóstico de Halitose', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg', href: '/equipe/dra-vera' },
    ],
    exames: ['halimetria-sialometria', 'testes-respiratorios'],
  },

  // ── Pediatria ──────────────────────────────────────────────────────────────
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
      { nome: 'Dra. Eliane Basques',       esp: 'Cirurgia Pediátrica · Manometria',     crm: 'CRM-MG 27601', foto: '/images/dra-eliane.jpg', href: '/equipe/dra-eliane' },
    ],
    exames: ['testes-respiratorios', 'manometria-anorretal'],
  },

  // ── Nefrologia ─────────────────────────────────────────────────────────────
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
      'Única clínica em BH com nefrologia integrada à gastroenterologia no mesmo espaço',
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
  },

  // ── Motilidade Digestiva ───────────────────────────────────────────────────
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
      'Dr. Felipe Nelson, especialista em motilidade com foco em manometria e pHmetria',
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
      { nome: 'Dra. Vera Ângelo',   esp: 'Gastroenterologia e Motilidade', crm: 'CRM-MG 22284', foto: '/images/dra-vera.jpg', href: '/equipe/dra-vera' },
      { nome: 'Dr. Felipe Nelson',  esp: 'Gastroenterologia e Motilidade', crm: '', foto: '/images/felipe-nelson.jpg' },
    ],
    exames: ['manometria-esofagica', 'manometria-anorretal', 'phmetria-impedanciometria'],
  },
}

// ─── Page ─────────────────────────────────────────────────────────────────────

interface Props { params: Promise<{ slug: string }> }

export async function generateStaticParams() {
  return ESPECIALIDADES.map(e => ({ slug: e.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const esp = ESPECIALIDADES.find(e => e.slug === slug)
  if (!esp) return {}
  return {
    title:       esp.title,
    description: DETAIL[esp.slug]?.heroDesc ?? esp.desc,
  }
}

export default async function EspecialidadeSlugPage({ params }: Props) {
  const { slug } = await params
  const esp    = ESPECIALIDADES.find(e => e.slug === slug)
  const detail = DETAIL[slug]
  if (!esp || !detail) notFound()

  const relExames = EXAMES.filter(e => detail.exames.includes(e.id))

  return (
    <>
      <PageHero
        tag="Especialidade"
        title={<em>{esp.title}</em>}
        desc={detail.heroDesc}
      >
        <Breadcrumb crumbs={[
          { label: 'Especialidades', href: '/especialidades' },
          { label: esp.title },
        ]} />
      </PageHero>

      <SectionWrapper mist grid>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* ── Conteúdo principal ── */}
          <div className="lg:col-span-2 space-y-12">

            {/* Intro */}
            <div className="space-y-4 text-[0.98rem] font-light text-steel/65 leading-[1.85]">
              {detail.intro.map((p, i) => <p key={i}>{p}</p>)}
            </div>

            {/* Sintomas */}
            <div>
              <h2 className="font-serif font-light text-steel text-[1.4rem] mb-1 reveal">
                Quando buscar <em className="italic text-teal">{esp.title}</em>
              </h2>
              <p className="text-[0.85rem] text-steel/50 mb-5 reveal reveal-d1">
                Você pode se beneficiar desta especialidade se apresentar um ou mais dos sintomas abaixo:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 reveal reveal-d2">
                {detail.sintomas.map((s) => (
                  <div key={s} className="flex items-start gap-2.5 bg-white border border-teal/10 rounded-xl px-4 py-3 shadow-sm">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <span className="text-[0.85rem] font-light text-steel/70 leading-[1.6]">{s}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* O que tratamos */}
            <div>
              <h2 className="font-serif font-light text-steel text-[1.4rem] mb-6 reveal">
                O que tratamos em <em className="italic text-teal">{esp.title}</em>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {detail.topics.map((t, i) => (
                  <div
                    key={t.title}
                    className={`bg-white border border-teal/10 rounded-2xl p-6 hover:border-teal/22 hover:-translate-y-0.5 transition-all reveal reveal-d${i % 2} shadow-sm`}
                  >
                    <span className="block w-5 h-px bg-teal mb-3" />
                    <h3 className="text-[0.95rem] font-semibold text-steel mb-2">{t.title}</h3>
                    <p className="text-[0.88rem] font-light text-steel/60 leading-[1.72]">{renderRich(t.body)}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Diferenciais */}
            <div className="bg-gradient-to-br from-[#001f2e] via-[#002a3d] to-[#00465F] rounded-2xl p-8 reveal">
              <p className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal-light/80 mb-3">Por que a NU.V.E.M</p>
              <h2 className="font-serif font-light text-white text-[1.3rem] mb-6">
                Nossos <em>diferenciais</em> em {esp.title}
              </h2>
              <ul className="space-y-3">
                {detail.diferenciais.map((d) => (
                  <li key={d} className="flex items-start gap-3">
                    <span className="mt-[5px] w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                    <span className="text-[0.88rem] font-light text-white/75 leading-[1.7]">{d}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Para médicos */}
            <div className="border border-teal/15 rounded-2xl p-8 bg-white shadow-sm reveal">
              <div className="flex items-center gap-2.5 mb-4">
                <div className="w-8 h-8 rounded-lg bg-teal/10 border border-teal/15 flex items-center justify-center">
                  <Stethoscope className="w-4 h-4 text-teal" />
                </div>
                <p className="text-[0.65rem] font-bold tracking-[.12em] uppercase text-teal">Para médicos que encaminham</p>
              </div>
              <p className="text-[0.93rem] font-light text-steel/65 leading-[1.82] mb-6">
                {detail.paraMedicos.intro}
              </p>
              <ul className="space-y-2.5 mb-6">
                {detail.paraMedicos.bullets.map((b) => (
                  <li key={b} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-4 h-4 text-teal shrink-0 mt-0.5" />
                    <span className="text-[0.88rem] font-light text-steel/65 leading-[1.65]">{b}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-3">
                <Link href="/contato" className="btn-ghost text-[0.85rem] py-2.5 px-5">
                  Falar com a clínica <ArrowRight className="w-3.5 h-3.5" />
                </Link>
                <Link href="/ensino" className="text-[0.85rem] font-medium text-teal hover:text-teal/70 transition-colors inline-flex items-center gap-1.5 py-2.5">
                  Conheça o NU.V.E.M Ensino <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

          </div>

          {/* ── Sidebar ── */}
          <div className="space-y-5">

            {/* Especialista(s) */}
            <div className="bg-white border border-teal/10 rounded-2xl overflow-hidden shadow-sm">
              <div className="px-5 pt-5 pb-3">
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40">
                  {detail.especialistas.length > 1 ? 'Especialistas' : 'Especialista'}
                </h3>
              </div>
              {detail.especialistas.map((esp_item) => {
                const inner = (
                  <div className="flex items-center gap-3 px-5 py-3 hover:bg-teal/4 transition-colors">
                    <div className="w-12 h-12 rounded-full overflow-hidden border border-teal/15 shrink-0 relative">
                      <Image
                        src={esp_item.foto}
                        alt={esp_item.nome}
                        fill
                        className="object-cover object-top"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[0.88rem] font-semibold text-steel leading-tight">{esp_item.nome}</div>
                      <div className="text-[0.75rem] text-teal mt-0.5 leading-tight">{esp_item.esp}</div>
                      {esp_item.crm && <div className="text-[0.68rem] text-steel/35 mt-0.5">{esp_item.crm}</div>}
                    </div>
                    {esp_item.href && <ArrowRight className="w-3.5 h-3.5 text-steel/25 shrink-0" />}
                  </div>
                )
                return esp_item.href ? (
                  <Link key={esp_item.nome} href={esp_item.href} className="block border-t border-teal/8 group">
                    {inner}
                  </Link>
                ) : (
                  <div key={esp_item.nome} className="border-t border-teal/8">{inner}</div>
                )
              })}
              <div className="px-5 pb-5 pt-2">
                <Link href="/equipe" className="text-[0.78rem] text-teal hover:text-teal/70 transition-colors inline-flex items-center gap-1">
                  Ver equipe completa <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* Tags */}
            <div className="bg-white border border-teal/10 rounded-2xl p-5 shadow-sm">
              <h3 className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-3">Áreas de atuação</h3>
              <div className="flex flex-wrap gap-2">
                {esp.tags.map(tag => (
                  <span key={tag} className="text-[0.78rem] font-medium px-3 py-1.5 rounded-full bg-teal/8 border border-teal/15 text-teal">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Exames relacionados */}
            {relExames.length > 0 && (
              <div className="bg-white border border-teal/10 rounded-2xl p-5 shadow-sm">
                <h3 className="text-[0.7rem] font-bold uppercase tracking-[.1em] text-steel/40 mb-3">Exames relacionados</h3>
                <div className="space-y-2">
                  {relExames.map(e => (
                    <Link
                      key={e.id}
                      href={`/exames/${e.id}`}
                      className="flex items-center justify-between p-3 rounded-xl bg-cloud border border-teal/8 hover:border-teal/22 hover:bg-teal/5 transition-all group"
                    >
                      <span className="text-[0.86rem] text-steel/60 group-hover:text-teal transition-colors">{e.title}</span>
                      <ArrowRight className="w-3.5 h-3.5 text-steel/30 group-hover:text-teal transition-colors shrink-0" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* ISO badge */}
            <div className="bg-gold/8 border border-gold/22 rounded-2xl p-5 flex items-center gap-3">
              <IsoSeal size={44} className="shrink-0" />
              <div>
                <p className="text-[0.82rem] text-steel/65 leading-snug">
                  Especialidade realizada com protocolo <strong className="text-steel font-semibold">certificado ISO 9001</strong>
                </p>
                <Link href="/gestao-da-qualidade" className="text-[0.72rem] text-teal hover:text-teal/70 transition-colors mt-1 inline-flex items-center gap-1">
                  Saiba mais <ArrowRight className="w-3 h-3" />
                </Link>
              </div>
            </div>

            {/* CTA */}
            <div className="bg-teal rounded-2xl p-6">
              <h3 className="text-[0.95rem] font-semibold text-white mb-2">Agendar consulta</h3>
              <p className="text-[0.85rem] text-white/70 mb-4 leading-relaxed">
                Atendimento especializado em {esp.title} com equipe certificada ISO 9001.
              </p>
              <Link href="/agendar" className="btn-gold w-full justify-center">
                Agendar agora
              </Link>
            </div>

          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper>
        <CtaBanner />
      </SectionWrapper>
    </>
  )
}
