# Relatório de correções · site NU.V.E.M Medicina

Branch `fix/correcoes-cfm-rastreio-nov26` · iniciado em 08/11/2026.

Origem: diagnóstico com GA4 (09/08 a 06/11/2026), Search Console (jun a
nov/2026) e as regras de publicidade médica da clínica (Res. CFM nº
2.336/2023). Rastreamento detalhado em [TRACKING.md](TRACKING.md).

Convenções deste relatório:

- **validar** = a troca muda o sentido de um texto clínico e precisa de
  aprovação da Dra. Vera Ângelo, responsável técnica.
- **[A CONFIRMAR]** = informação que falta ou que não pode ser inventada.
- Nas colunas "Antes", o travessão longo do texto original aparece como
  `(travessão)`.

## Situação por bloco

| Bloco | Commit | Situação |
|---|---|---|
| 1 · Rastreamento | `6d16b95`, `3fb8192` | feito |
| 2a · Textos CFM | `99de578` | feito, com textos para validar |
| 2b · Travessões | `e3c7e56` | feito |
| 3 · Halimetria e sialometria | `6e27c1d` | feito, com textos para validar |
| ESLint | `9937033` | configurado, lint passando |
| Ajuste da nuvete | `e1bb073` | feito |
| 4 · Domínio, URLs antigas, indexação | `98888ae` | feito |
| 5 · Agendamento | este commit | documentado, sem mudança de campo |
| 6 · Contato | a seguir | |

Verificação: `npm run build` e `npm run type-check` passam a cada commit.
Até o Bloco 3, `npm run lint` não rodava: o Next 16 removeu o `next lint` e o
projeto não tinha configuração do ESLint. O commit do ESLint (depois do Bloco
3) resolveu isso; a partir do Bloco 4, o lint também passa antes de cada commit.

### Configuração do ESLint

- ESLint 9 com `eslint-config-next` 16.2.4 (flat config em `eslint.config.mjs`);
  o script `lint` passou de `next lint` para `eslint .`.
- Ignorados: `.next`, `node_modules`, `.claude` (cópias de trabalho), `docs` e `public`.
- Corrigidos para o lint passar: 20 links internos com `<a>` viraram `Link`
  (rodapé, banner de cookies, página de avaliação, mesmos endereços), o
  `require` do `tailwind.config.ts` ganhou exceção comentada, e saíram 5
  imports sem uso.
- Ficaram como **aviso** (não erro), com justificativa no arquivo: as regras
  do React Compiler (`react-hooks/set-state-in-effect`, `refs`,
  `immutability`, `preserve-manual-memoization`) e `no-explicit-any`.
  Apontam código anterior (banner de consentimento, nuvete, anamnese, blog);
  corrigir mexe em lógica e fica para uma tarefa própria.
- Resultado: 0 erros, 27 avisos.

---

## Bloco 1 · Rastreamento (resumo)

Detalhes, diagnóstico e passo a passo de teste em [TRACKING.md](TRACKING.md).

| Arquivo | Antes | Depois |
|---|---|---|
| `src/lib/consent.ts` | aceite não gerava nenhum evento | emite `consentimento_concedido` (page_location, page_path, page_title) na passagem de negado para concedido, uma vez por página |
| `src/app/[locale]/agendar/AgendarForm.tsx` | `servico_interesse: 'Testes Respiratórios'` | `servico_interesse: 'exame'` (consulta, exame, fisioterapia, ensino) |
| `src/components/blog/ChamadaExame.tsx` | `destino: '/exames/...'` | `tipo_destino`, `tipo_atendimento` |
| `src/components/links/LinkBioButton.tsx` | `rotulo`, `destino` | `tipo_destino`, `tipo_atendimento` |
| `src/lib/gtm.ts` | | auxiliares de tipo de atendimento |
| `src/components/ui/GoogleTagManager.tsx` | GTM carregava em todo ambiente | GTM só carrega com `VERCEL_ENV === 'production'` |

Problemas encontrados no contêiner do GTM (seção 5 do TRACKING.md):

1. A tag acionada por `interacao_nuvete` envia o evento `envio_agendamento`.
2. O Meta Pixel carrega antes do consentimento e para quem recusa.
3. A conversão de telefone do Ads tem ID de pedido fixo.
4. `download_preparo` e `clique_whatsapp` enviam o nome do arquivo e o texto do botão.

---

## Bloco 2a · Textos e regras do CFM

### O que foi feito

- **Título da home** em pt, en e es, no `<title>` padrão, Open Graph, Twitter e
  `messages/*.json`:
  - pt: NU.V.E.M Medicina · Gastroenterologia e Motilidade Digestiva em Belo Horizonte
  - en: NU.V.E.M Medicina · Gastroenterology and Digestive Motility in Belo Horizonte, Brazil
  - es: NU.V.E.M Medicina · Gastroenterología y Motilidad Digestiva en Belo Horizonte, Brasil
- **Hero da home**: "Excelência em Saúde Digestiva e Diagnóstico Avançado" virou
  "Cuidado em Saúde Digestiva e Motilidade" (en e es equivalentes).
- **Tabela de troca** aplicada nos arquivos aprovados: referência, última
  geração, exclusivo, mais confiáveis, mais especializado, excelência, único,
  líder, cura, resultado definitivo, doenças funcionais.
- **"Referência nacional"** saiu dos 5 lugares (equipe, ensino, nuvete-data,
  prompt da nuvete, página da Dra. Vera). No lugar, a bio factual: "Atua em
  SIBO/IMO, testes respiratórios, motilidade digestiva e DGBI".
- **Dr. Gabriel** entrou na página da equipe com "CRM 81843 · RQE 61806 ·
  Gastroenterologia". O registro também aparece nas três versões da página de
  Motilidade Digestiva. "Hepatologista" não aparecia em nenhum lugar.
- **Dra. Amanda Araújo**: registro continua vazio na página. Ficou um
  comentário `[A CONFIRMAR]` no dado, em `src/app/[locale]/equipe/page.tsx`.
- **Rodapé**: novo texto da responsável técnica, "Registro da clínica CRM-MG
  20532" e o aviso padrão da Res. 2.336/2023, nas três línguas. O selo ISO
  passou a dizer "Gestão certificada pela norma ISO 9001".
- **ISO 9001 de forma factual**: saíram as frases que davam a entender que a
  ISO certifica pessoas, laudos ou protocolos ("especialistas certificados ISO
  9001", "laudos certificados", "protocolo certificado ISO 9001", "equipe
  certificada").
- **Gestão da qualidade**: os dois trechos do escopo (linhas 327 e 370) viraram
  "Gestão certificada pela norma ISO 9001 para os atendimentos clínicos e
  exames da NU.V.E.M Medicina." Ver pendência da gestão abaixo.
- **Prompt da nuvete** (`src/app/api/route.ts`): ganhou um bloco de regras de
  comunicação do CFM (sem superlativo, comparação, promessa, desconto ou preço;
  resposta factual se perguntarem se a clínica é referência; não inventar dado).

### O que foi mantido de propósito

| Trecho | Onde | Por quê |
|---|---|---|
| "Roma V, referência mundial para DGBI" e "Chicago v4.0, padrão internacional de referência" | especialidades | "referência" no sentido técnico de diretriz |
| Livros "Doenças Funcionais na Gastrenterologia" e "Métodos Diagnósticos em Doenças Funcionais e Motilidade Digestiva" | página da Dra. Vera | título publicado de obra |
| "pós-graduação em Doenças Funcionais e Manometria" | Dra. Vera e prompt da nuvete | nome do programa do Einstein |
| "antes se chamava doenças funcionais digestivas" | nuvete-data e prompt | texto que explica a mudança de nome para DGBI |
| Gatilhos `'doenças funcionais'` | nuvete-data | palavras que a pessoa digita para achar a resposta |
| "dispepsia funcional", "constipação funcional" | vários | nome de diagnóstico dos critérios de Roma |
| "Título de Especialista em Gastroenterologia" (Dra. Vera) e "em Cirurgia Pediátrica" (Dra. Eliane) | páginas das doutoras | títulos com RQE |
| "garantido" em direitos do paciente e na política de privacidade | páginas legais | direito garantido em lei, não promessa de resultado |
| "Escolha o melhor canal", "O que poderíamos ter feito melhor?" | contato, avaliação | texto de interface, não publicidade |
| Depoimentos ("Atendimento excelente...") | home | fala de paciente, não da clínica |
| "equipe de especialistas" (plural, genérico) | hero, ensino, nuvete | não atribui especialidade a uma pessoa |

### Tabela de mudanças do Bloco 2a

| Arquivo | Antes | Depois | Bloco |
|---|---|---|---|
| `src/app/[locale]/layout.tsx` | 'Clínica especializada em gastroenterologia, manometria, testes respiratórios (SIBO/H. pylori), fisioterapia pélvica e ensino médico. ISO 9001. Santa Efigênia, Belo Ho… | 'Clínica de gastroenterologia e motilidade digestiva: manometria, testes respiratórios (SIBO/H. pylori), fisioterapia pélvica e ensino médico. Gestão certificada pela … | 2 |
| `src/app/[locale]/layout.tsx` | 'NU.V.E.M Medicina (travessão) Gastroenterologia e Diagnóstico Avançado em BH' | 'NU.V.E.M Medicina · Gastroenterologia e Motilidade Digestiva em Belo Horizonte' | 2 |
| `src/app/[locale]/layout.tsx` | 'Clínica especializada com ISO 9001. Manometria, testes respiratórios, pHmetria e fisioterapia pélvica em Belo Horizonte.' | 'Gestão certificada pela norma ISO 9001. Manometria, testes respiratórios, pHmetria e fisioterapia pélvica em Belo Horizonte.' | 2 |
| `src/app/[locale]/layout.tsx` | 'NU.V.E.M Medicina (travessão) Gastroenterologia com ISO 9001 em BH' | 'NU.V.E.M Medicina · Gastroenterologia e Motilidade Digestiva em Belo Horizonte' | 2 |
| `src/app/[locale]/layout.tsx` | 'Clínica especializada com certificação ISO 9001. SIBO, H. pylori, manometria, fisioterapia pélvica.' | 'Gestão certificada pela norma ISO 9001. SIBO, H. pylori, manometria e fisioterapia pélvica.' | 2 |
| `src/lib/schema.ts` | 'Clínica especializada em gastroenterologia, diagnóstico avançado e ensino médico em Belo Horizonte. Clínica com certificação ISO 9001.' | 'Clínica de gastroenterologia e motilidade digestiva, exames diagnósticos e ensino médico em Belo Horizonte. Gestão certificada pela norma ISO 9001.' | 2 |
| `src/lib/schema.ts` | 'Clínica de Gastroenterologia com Certificação ISO 9001 em Belo Horizonte' | 'Clínica de gastroenterologia e motilidade digestiva em Belo Horizonte, com gestão certificada pela norma ISO 9001' | 2 |
| `src/lib/hero-slides.tsx` | Excelência em{' '}         <em className="italic text-teal">Saúde Digestiva</em>{' '}         <span className="italic text-steel/40">e Diagnóstico Avançado</span> | Cuidado em{' '}         <em className="italic text-teal">Saúde Digestiva</em>{' '}         <span className="italic text-steel/40">e Motilidade</span> | 2 |
| `src/lib/hero-slides.tsx` | O ecossistema completo de medicina especializada: diagnóstico de alta precisão, | Clínica de gastroenterologia e motilidade digestiva: exames de alta resolução, | 2 |
| `src/lib/hero-slides.tsx` | Clínica com certificação ISO 9001.</strong> | Gestão certificada pela norma ISO 9001.</strong> | 2 |
| `src/lib/hero-slides.tsx` | Excellence in{' '}         <em className="italic text-teal">Digestive Health</em>{' '}         <span className="italic text-steel/40">and Advanced Diagnostics</span> | Care in{' '}         <em className="italic text-teal">Digestive Health</em>{' '}         <span className="italic text-steel/40">and Motility</span> | 2 |
| `src/lib/hero-slides.tsx` | A complete ecosystem of specialized medicine: high-precision diagnostics, | A gastroenterology and digestive motility clinic: high-resolution exams, | 2 |
| `src/lib/hero-slides.tsx` | ISO 9001 certified clinic.</strong> | Management certified under ISO 9001.</strong> | 2 |
| `src/lib/hero-slides.tsx` | Excelencia en{' '}         <em className="italic text-teal">Salud Digestiva</em>{' '}         <span className="italic text-steel/40">y Diagnóstico Avanzado</span> | Cuidado en{' '}         <em className="italic text-teal">Salud Digestiva</em>{' '}         <span className="italic text-steel/40">y Motilidad</span> | 2 |
| `src/lib/hero-slides.tsx` | El ecosistema completo de medicina especializada: diagnóstico de alta         precisión, | Clínica de gastroenterología y motilidad digestiva: exámenes de alta         resolución, | 2 |
| `src/lib/hero-slides.tsx` | Clínica con certificación ISO 9001.</strong> | Gestión certificada según la norma ISO 9001.</strong> | 2 |
| `src/lib/data.ts` | 'Reabilitação do assoalho pélvico, distúrbios digestivos funcionais e incontinência com biofeedback especializado.' | 'Reabilitação do assoalho pélvico, distúrbios da interação cérebro-intestino (DGBI) e incontinência com biofeedback.' | 2 |
| `src/lib/data.ts` | 'Equipamentos de última geração com mapeamento completo da pressão esofágica em alta resolução. Laudos emitidos por especialistas certificados ISO 9001.' | 'Equipamentos atualizados com mapeamento completo da pressão esofágica em alta resolução. Laudos emitidos em clínica com gestão certificada pela norma ISO 9001.' | 2 |
| `src/lib/data.ts` | 'Protocolo completo com biofeedback integrado. Equipamentos de última geração com laudos certificados ISO 9001.' | 'Protocolo completo com biofeedback integrado. Equipamentos atualizados e laudos emitidos em clínica com gestão certificada pela norma ISO 9001.' | 2 |
| `src/lib/content/catalog.ts` | 'Pelvic floor rehabilitation, functional digestive disorders and incontinence with specialized biofeedback.' | 'Pelvic floor rehabilitation, disorders of gut-brain interaction (DGBI) and incontinence with biofeedback.' | 2 |
| `src/lib/content/catalog.ts` | 'Rehabilitación del piso pélvico, trastornos digestivos funcionales e incontinencia con biofeedback especializado.' | 'Rehabilitación del piso pélvico, trastornos de la interacción cerebro-intestino (DGBI) e incontinencia con biofeedback.' | 2 |
| `src/lib/content/catalog.ts` | 'Latest-generation equipment with full high-resolution esophageal pressure mapping. Reports issued by ISO 9001 certified specialists.' | 'Up-to-date equipment with full high-resolution esophageal pressure mapping. Reports issued at a clinic with management certified under ISO 9001.' | 2 |
| `src/lib/content/catalog.ts` | 'Complete protocol with integrated biofeedback. Latest-generation equipment with ISO 9001 certified reports.' | 'Complete protocol with integrated biofeedback. Up-to-date equipment and reports issued at a clinic with management certified under ISO 9001.' | 2 |
| `src/lib/content/catalog.ts` | 'Equipos de última generación con mapeo completo de la presión esofágica en alta resolución. Informes emitidos por especialistas certificados ISO 9001.' | 'Equipos actualizados con mapeo completo de la presión esofágica en alta resolución. Informes emitidos en una clínica con gestión certificada según la norma ISO 9001.' | 2 |
| `src/lib/content/catalog.ts` | 'Protocolo completo con biofeedback integrado. Equipos de última generación con informes certificados ISO 9001.' | 'Protocolo completo con biofeedback integrado. Equipos actualizados e informes emitidos en una clínica con gestión certificada según la norma ISO 9001.' | 2 |
| `src/lib/content/catalog.ts` | ISO 9001 certified.' | Management certified under ISO 9001.' | 2 |
| `src/lib/content/exames-resp-extra.ts` | 'Tecnologia brasileira de última geração' | 'Tecnologia brasileira' | 2 |
| `src/lib/content/exames-resp-extra.ts` | 'Latest-generation Brazilian technology' | 'Brazilian technology' | 2 |
| `src/lib/content/exames-resp-extra.ts` | 'Tecnología brasileña de última generación' | 'Tecnología brasileña' | 2 |
| `src/lib/content/exames-resp-extra.ts` | 'O primeiro equipamento nacional para | 'Equipamento nacional para | 2 · **validar** |
| `src/lib/content/exames-resp-extra.ts` | , diferenciando quadros de SIBO, IMO e outras disbioses com precisão superior aos aparelhos tradicionais. | , o que ajuda o médico a investigar quadros de SIBO, IMO e outras disbioses. | 2 · **validar** |
| `src/lib/content/exames-resp-extra.ts` | 'The first Brazilian-made equipment for | 'Brazilian-made equipment for | 2 · **validar** |
| `src/lib/content/exames-resp-extra.ts` | , differentiating SIBO, IMO and other dysbioses with greater precision than traditional devices. | , which helps the physician investigate SIBO, IMO and other dysbioses. | 2 · **validar** |
| `src/lib/content/exames-resp-extra.ts` | 'El primer equipo nacional para | 'Equipo nacional para | 2 · **validar** |
| `src/lib/content/exames-resp-extra.ts` | , diferenciando cuadros de SIBO, IMO y otras disbiosis con una precisión superior a los equipos tradicionales. | , lo que ayuda al médico a investigar cuadros de SIBO, IMO y otras disbiosis. | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | a mais recente e reconhecida classificação internacional para distúrbios funcionais digestivos. | classificação internacional atual para os distúrbios da interação cérebro-intestino (DGBI). | 2 |
| `src/lib/content/especialidades-detail.ts` | 'Doenças Inflamatórias e Funcionais' | 'Doenças Inflamatórias Intestinais' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Certificação ISO 9001 garantindo rastreabilidade e padronização de todos os procedimentos' | 'Gestão certificada pela norma ISO 9001, com rastreabilidade e padronização dos procedimentos' | 2 |
| `src/lib/content/especialidades-detail.ts` | A NU.V.E.M é centro de referência em diagnóstico funcional digestivo em Belo Horizonte. | A NU.V.E.M realiza diagnóstico funcional digestivo em Belo Horizonte. | 2 |
| `src/lib/content/especialidades-detail.ts` | 'SIBO e IMO têm cura?' | 'Como é o tratamento de SIBO e IMO?' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | , com bons resultados na maioria dos casos quando acompanhado adequadamente por um especialista. | , sempre com acompanhamento médico. A resposta ao tratamento varia de pessoa para pessoa. | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | distúrbios digestivos funcionais tratados com biofeedback | distúrbios da interação cérebro-intestino (DGBI) tratados com biofeedback | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | biofeedback eletromiográfico de última geração, eletroestimulação | biofeedback eletromiográfico com equipamento atualizado, eletroestimulação | 2 |
| `src/lib/content/especialidades-detail.ts` | 'Biofeedback eletromiográfico de última geração com registro | 'Biofeedback eletromiográfico com equipamento atualizado e registro | 2 |
| `src/lib/content/especialidades-detail.ts` | Abordagem única na NU.V.E.M que combina gastroenterologia e fisioterapia pélvica para resultados superiores em casos | Abordagem da NU.V.E.M que combina gastroenterologia e fisioterapia pélvica nos casos | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Existe tratamento definitivo para halitose?' | 'Como é o tratamento da halitose?' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | a melhora costuma ser significativa e duradoura. | o plano de tratamento é definido pelo médico para cada caso. | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | para oferecer a conduta mais completa em casos complexos | na condução de casos complexos | 2 |
| `src/lib/content/especialidades-detail.ts` | cólicas persistentes e distúrbios funcionais avaliados | cólicas persistentes e distúrbios da interação cérebro-intestino (DGBI) avaliados | 2 |
| `src/lib/content/especialidades-detail.ts` | 'Equipe com pediatra especialista em gastroenterologia pediátrica' | 'Equipe com pediatra com atuação em saúde digestiva infantil' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | Nossa equipe inclui gastroenterologista especializada em pediatria e cirurgiãs pediátricas | Nossa equipe inclui médicas com atuação em saúde digestiva infantil e cirurgiãs pediátricas | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | Diagnóstico e tratamento especializado de doenças renais, com diferencial único: a integração com gastroenterologia para | Diagnóstico e tratamento de doenças renais, integrados à gastroenterologia para | 2 |
| `src/lib/content/especialidades-detail.ts` | : abordagem integrativa única disponível na NU.V.E.M. | , em abordagem integrada na NU.V.E.M. | 2 |
| `src/lib/content/especialidades-detail.ts` | impedânciometria integradas, um dos centros mais especializados de BH. | impedânciometria integradas. | 2 |
| `src/lib/content/especialidades-detail.ts` | A avaliação de motilidade digestiva é uma das especialidades mais avançadas e raras disponíveis em Belo Horizonte. A NU.V.E.M utiliza equipamentos de última geração pa… | A avaliação de motilidade digestiva estuda o funcionamento do esôfago e do intestino. A NU.V.E.M utiliza equipamentos atualizados para mapear | 2 |
| `src/lib/content/especialidades-detail.ts` | , e permitem diagnóstico definitivo de condições que frequentemente passam despercebidas em investigações convencionais. | , e ajudam o médico a investigar condições que nem sempre aparecem em investigações convencionais. | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Diagnóstico definitivo por manometria | 'Auxilia no diagnóstico por manometria | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | determinante para decisão terapêutica | informação que apoia a decisão terapêutica | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Dr. Gabriel de Souza Fernandes Filho, gastroenterologista especializado em motilidade digestiva' | 'Dr. Gabriel de Souza Fernandes Filho, gastroenterologista (CRM 81843 · RQE 61806) com atuação em motilidade digestiva' | 2 |
| `src/lib/content/especialidades-detail.ts` | the most recent and internationally recognized classification for functional digestive disorders. | the current international classification for disorders of gut-brain interaction (DGBI). | 2 |
| `src/lib/content/especialidades-detail.ts` | 'Inflammatory and Functional Diseases' | 'Inflammatory Bowel Diseases' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'ISO 9001 certification ensuring traceability and standardization of every procedure' | 'Management certified under ISO 9001, with traceability and standardization of procedures' | 2 |
| `src/lib/content/especialidades-detail.ts` | NU.V.E.M is a reference center for functional digestive diagnosis in Belo Horizonte. | NU.V.E.M performs functional digestive diagnosis in Belo Horizonte. | 2 |
| `src/lib/content/especialidades-detail.ts` | 'Are SIBO and IMO curable?' | 'How are SIBO and IMO treated?' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | , with good results in most cases when properly followed by a specialist. | , always with medical follow-up. Response to treatment varies from person to person. | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | functional digestive disorders treated with biofeedback | disorders of gut-brain interaction (DGBI) treated with biofeedback | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | We use state-of-the-art electromyographic biofeedback | We use electromyographic biofeedback with up-to-date equipment | 2 |
| `src/lib/content/especialidades-detail.ts` | 'State-of-the-art electromyographic biofeedback with documented progress tracking' | 'Electromyographic biofeedback with up-to-date equipment and documented progress tracking' | 2 |
| `src/lib/content/especialidades-detail.ts` | A unique approach at NU.V.E.M combining gastroenterology and pelvic physical therapy for superior results in cases | An approach at NU.V.E.M combining gastroenterology and pelvic physical therapy in cases | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Is there a definitive treatment for halitosis?' | 'How is halitosis treated?' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | improvement is usually significant and lasting. | the treatment plan is defined by the physician for each case. | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | to provide the most complete approach in complex cases | in the management of complex cases | 2 |
| `src/lib/content/especialidades-detail.ts` | persistent colic and functional disorders assessed | persistent colic and disorders of gut-brain interaction (DGBI) assessed | 2 |
| `src/lib/content/especialidades-detail.ts` | 'Team includes a pediatrician specialized in pediatric gastroenterology' | 'Team includes a pediatrician working in children’s digestive health' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | Our team includes a gastroenterologist specialized in pediatrics and pediatric surgeons | Our team includes physicians working in children’s digestive health and pediatric surgeons | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | Specialized diagnosis and treatment of kidney disease, with a unique advantage: integration with gastroenterology to | Diagnosis and treatment of kidney disease, integrated with gastroenterology to | 2 |
| `src/lib/content/especialidades-detail.ts` | : a unique integrative approach available at NU.V.E.M. | , in an integrated approach at NU.V.E.M. | 2 |
| `src/lib/content/especialidades-detail.ts` |  (travessão) one of the most specialized centers in Belo Horizonte. | . | 2 |
| `src/lib/content/especialidades-detail.ts` | Digestive motility evaluation is one of the most advanced and rare specialties available in Belo Horizonte. NU.V.E.M uses latest-generation equipment to precisely map | Digestive motility evaluation studies how the esophagus and intestine work. NU.V.E.M uses up-to-date equipment to map | 2 |
| `src/lib/content/especialidades-detail.ts` | , allowing a definitive diagnosis of conditions that often go unnoticed in conventional investigations. | , and help the physician investigate conditions that do not always show up in conventional investigations. | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Definitive diagnosis via high-resolution | 'Supports diagnosis via high-resolution | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | decisive for treatment choice | information that supports the treatment decision | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Dr. Gabriel de Souza Fernandes Filho, gastroenterologist specialized in digestive motility' | 'Dr. Gabriel de Souza Fernandes Filho, gastroenterologist (CRM 81843 · RQE 61806) working in digestive motility' | 2 |
| `src/lib/content/especialidades-detail.ts` | la clasificación internacional más reciente y reconocida para los trastornos funcionales digestivos. | la clasificación internacional actual para los trastornos de la interacción cerebro-intestino (DGBI). | 2 |
| `src/lib/content/especialidades-detail.ts` | 'Enfermedades Inflamatorias y Funcionales' | 'Enfermedades Inflamatorias Intestinales' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Certificación ISO 9001 que garantiza trazabilidad y estandarización de todos los procedimientos' | 'Gestión certificada según la norma ISO 9001, con trazabilidad y estandarización de los procedimientos' | 2 |
| `src/lib/content/especialidades-detail.ts` | NU.V.E.M es un centro de referencia en diagnóstico funcional digestivo en Belo Horizonte. | NU.V.E.M realiza diagnóstico funcional digestivo en Belo Horizonte. | 2 |
| `src/lib/content/especialidades-detail.ts` | '¿El SIBO y el IMO tienen cura?' | '¿Cómo se tratan el SIBO y el IMO?' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | , con buenos resultados en la mayoría de los casos cuando se realiza un seguimiento adecuado con un especialista. | , siempre con seguimiento médico. La respuesta al tratamiento varía de una persona a otra. | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | trastornos digestivos funcionales tratados con biofeedback | trastornos de la interacción cerebro-intestino (DGBI) tratados con biofeedback | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | biofeedback electromiográfico de última generación, electroestimulación | biofeedback electromiográfico con equipos actualizados, electroestimulación | 2 |
| `src/lib/content/especialidades-detail.ts` | 'Biofeedback electromiográfico de última generación con registro | 'Biofeedback electromiográfico con equipos actualizados y registro | 2 |
| `src/lib/content/especialidades-detail.ts` | Enfoque único en NU.V.E.M que combina gastroenterología y fisioterapia pélvica para resultados superiores en casos | Enfoque de NU.V.E.M que combina gastroenterología y fisioterapia pélvica en casos | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | '¿Existe un tratamiento definitivo para la halitosis?' | '¿Cómo se trata la halitosis?' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | la mejora suele ser significativa y duradera. | el plan de tratamiento lo define el médico para cada caso. | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | para ofrecer el manejo más completo en casos complejos | en el manejo de casos complejos | 2 |
| `src/lib/content/especialidades-detail.ts` | cólicos persistentes y trastornos funcionales evaluados | cólicos persistentes y trastornos de la interacción cerebro-intestino (DGBI) evaluados | 2 |
| `src/lib/content/especialidades-detail.ts` | 'Equipo con pediatra especialista en gastroenterología pediátrica' | 'Equipo con pediatra con actuación en salud digestiva infantil' | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | Nuestro equipo incluye una gastroenteróloga especializada en pediatría y cirujanas pediátricas | Nuestro equipo incluye médicas con actuación en salud digestiva infantil y cirujanas pediátricas | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | Diagnóstico y tratamiento especializado de enfermedades renales, con un diferencial único: la integración con gastroenterología para | Diagnóstico y tratamiento de enfermedades renales, integrados a la gastroenterología para | 2 |
| `src/lib/content/especialidades-detail.ts` | : un abordaje integrador único disponible en NU.V.E.M. | , en un abordaje integrado en NU.V.E.M. | 2 |
| `src/lib/content/especialidades-detail.ts` | , uno de los centros más especializados de Belo Horizonte. | . | 2 |
| `src/lib/content/especialidades-detail.ts` | La evaluación de la motilidad digestiva es una de las especialidades más avanzadas y escasas disponibles en Belo Horizonte. NU.V.E.M utiliza equipos de última generaci… | La evaluación de la motilidad digestiva estudia el funcionamiento del esófago y del intestino. NU.V.E.M utiliza equipos actualizados para mapear | 2 |
| `src/lib/content/especialidades-detail.ts` | , y permiten un diagnóstico definitivo de condiciones que frecuentemente pasan desapercibidas en investigaciones convencionales. | , y ayudan al médico a investigar condiciones que no siempre aparecen en investigaciones convencionales. | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Diagnóstico definitivo mediante manometría | 'Apoya el diagnóstico mediante manometría | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | determinante para la decisión terapéutica | información que apoya la decisión terapéutica | 2 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Dr. Gabriel de Souza Fernandes Filho, gastroenterólogo especializado en motilidad digestiva' | 'Dr. Gabriel de Souza Fernandes Filho, gastroenterólogo (CRM 81843 · RQE 61806) con actuación en motilidad digestiva' | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | 'Certificação pela principal entidade de gastroenterologia do país' | 'Título concedido pela Federação Brasileira de Gastroenterologia' | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | 'Formação especializada em gastroenterologia no hospital de referência em BH' | 'Residência em gastroenterologia no Hospital Felício Rocho, em Belo Horizonte' | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | 'Fundadora e líder do ecossistema NU.V.E.M: | 'Fundadora do ecossistema NU.V.E.M: | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | Manometria de um dos principais hospitais do Brasil.' | Manometria do Hospital Israelita Albert Einstein.' | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | 'Membro ativo do grupo de estudos de referência nacional em doenças inflamatórias intestinais.' | 'Membro do grupo brasileiro de estudos dedicado às doenças inflamatórias intestinais.' | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | tornou-se uma das principais                   referências nacionais em testes respiratórios e motilidade digestiva. | atua em SIBO/IMO,                   testes respiratórios e motilidade digestiva. | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | criou um ecossistema único que integra                   assistência clínica de excelência com formação profissional avançada. | criou um ecossistema que integra                   assistência clínica e formação profissional. | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | pela Editora Rubio, sendo os três lançamentos mais recentes destaques em                   programas de formação em todo o Brasil. | pela Editora Rubio, entre elas três lançamentos recentes. | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | mantém-se na vanguarda da produção científica e da prática                   clínica, traduzindo o conhecimento mais recente em cuidado | participa da produção científica e da prática                   clínica, levando o conhecimento atualizado para o cuidado | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | Autora de obras de referência pela Editora Rubio, utilizadas em programas de formação em todo o Brasil. | Autora e organizadora de obras pela Editora Rubio. | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | "Atendimento especializado em gastroenterologia, motilidade digestiva e testes respiratórios com padrão ISO 9001." | "Atendimento em gastroenterologia, motilidade digestiva e testes respiratórios, em clínica com gestão certificada pela norma ISO 9001." | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | Cirurgiã Pediátrica e especialista em Manometria Anorretal. | Cirurgiã Pediátrica com atuação em manometria anorretal. | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | 'Especialista na avaliação funcional do assoalho pélvico | 'Atuação na avaliação funcional do assoalho pélvico | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | 'Formação especializada em cirurgia pediátrica no hospital universitário de referência em Minas Gerais.' | 'Formação em cirurgia pediátrica em hospital universitário de Minas Gerais.' | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | responsável técnica substituta e especialista em manometria anorretal. Atua na interface entre gastroenterologia, fisioterapia pélvica e cirurgia nos casos mais comple… | responsável técnica substituta, com atuação em manometria anorretal. Atua na interface entre gastroenterologia, fisioterapia pélvica e cirurgia em casos complexos. | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | 'Especialista em Manometria Anorretal' | 'Manometria Anorretal' | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | 'Integração única entre cirurgia pediátrica e gastroenterologia | 'Integração entre cirurgia pediátrica e gastroenterologia | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | Cirurgiã Pediátrica · Especialista em Manometria Anorretal · | Cirurgiã Pediátrica · Atuação em Manometria Anorretal · | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | Expertise única em <em>manometria anorretal</em> | Atuação em <em>manometria anorretal</em> | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | cirurgiã pediátrica e especialista em manometria  | cirurgiã pediátrica com atuação em manometria  | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | traz para a clínica uma combinação rara: a visão | traz para a clínica a visão | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | à expertise em avaliação funcional | à experiência em avaliação funcional | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | com uma perspectiva completa e diferenciada. | com uma perspectiva integrada. | 2 |
| `src/app/[locale]/dra-eliane-basques/page.tsx` | "Atendimento especializado em manometria anorretal e avaliação funcional do assoalho pélvico com padrão ISO 9001." | "Atendimento em manometria anorretal e avaliação funcional do assoalho pélvico, em clínica com gestão certificada pela norma ISO 9001." | 2 |
| `src/app/[locale]/equipe/page.tsx` | Autora de diversas obras pela Editora Rubio. Referência nacional em testes respiratórios e motilidade digestiva. | Autora de obras pela Editora Rubio. Atua em SIBO/IMO, testes respiratórios, motilidade digestiva e DGBI. | 2 |
| `src/app/[locale]/equipe/page.tsx` | 'Cirurgiã pediátrica com expertise em manometria anorretal | 'Cirurgiã pediátrica com atuação em manometria anorretal | 2 |
| `src/app/[locale]/equipe/page.tsx` | { nome: 'Dra. Amanda Araújo',          esp: 'Gastroenterologia e Motilidade Digestiva', reg: '', | // [A CONFIRMAR] registro da Dra. Amanda Araújo: aguardando conferência no portal do CFM.   // Não publicar o número antes disso. Ver RELATORIO-CORRECOES.md.   { nome:… | 2 |
| `src/app/[locale]/equipe/page.tsx` | esp: 'Gastroenterologia',    reg: '', | esp: 'Gastroenterologia',    reg: 'CRM 81843 · RQE 61806', | 2 |
| `src/app/[locale]/equipe/page.tsx` | Especialistas unidos pelo <em>cuidado</em> | Profissionais unidos pelo <em>cuidado</em> | 2 |
| `src/app/[locale]/equipe/page.tsx` | "Uma equipe multidisciplinar de excelência: gastroenterologistas, fisioterapeuta pélvica, cirurgiãs, nefrologista, pediatra e clínicos, unidos pelo padrão ISO 9001." | "Equipe multidisciplinar: gastroenterologistas, fisioterapeuta pélvica, cirurgiãs, nefrologista, pediatra e clínicos, em clínica com gestão certificada pela norma ISO … | 2 |
| `src/app/[locale]/equipe/page.tsx` | As médicas que fundaram a NU.V.E.M e definem o padrão de excelência da clínica. | As médicas que fundaram a NU.V.E.M e conduzem a direção técnica da clínica. | 2 |
| `src/app/[locale]/equipe/page.tsx` | Profissionais dedicados que garantem o acolhimento e a excelência operacional da NU.V.E.M. | Profissionais que cuidam do acolhimento e da rotina da NU.V.E.M. | 2 |
| `src/app/[locale]/equipe/page.tsx` | "Agende sua consulta e experimente o cuidado multidisciplinar com padrão ISO 9001 da NU.V.E.M Medicina." | "Agende sua consulta com a equipe multidisciplinar da NU.V.E.M Medicina." | 2 |
| `src/app/[locale]/ensino/page.tsx` | Autora de diversas obras pela Editora Rubio. Referência nacional em testes respiratórios e motilidade digestiva. | Autora de obras pela Editora Rubio. Atua em SIBO/IMO, testes respiratórios, motilidade digestiva e DGBI. | 2 |
| `src/app/[locale]/ensino/page.tsx` | 'Cirurgiã pediátrica e especialista em manometria anorretal. | 'Cirurgiã pediátrica com atuação em manometria anorretal. | 2 |
| `src/app/[locale]/ensino/page.tsx` | H. pylori, SIBO, IMO e distúrbios funcionais digestivos. | H. pylori, SIBO, IMO e distúrbios da interação cérebro-intestino (DGBI). | 2 |
| `src/app/[locale]/ensino/page.tsx` | equipamentos de ponta na NU.V.E.M. | equipamentos atualizados na NU.V.E.M. | 2 |
| `src/app/[locale]/ensino/page.tsx` | plataforma exclusiva do NU.V.E.M Ensino | plataforma do NU.V.E.M Ensino | 2 |
| `src/components/sections/EnsinoSection.tsx` | IMO e distúrbios funcionais digestivos com especialistas da clínica. | IMO e distúrbios da interação cérebro-intestino (DGBI) com a equipe da clínica. | 2 |
| `src/components/sections/EnsinoSection.tsx` | equipamentos de ponta na NU.V.E.M. | equipamentos atualizados na NU.V.E.M. | 2 |
| `src/components/sections/EnsinoSection.tsx` | 'Alunos levam a excelência para seus consultórios. | 'Alunos levam o que aprenderam para seus consultórios. | 2 |
| `src/app/[locale]/sobre/page.tsx` | 'Equipamentos de última geração operados por especialistas certificados, garantindo resultados confiáveis e laudos detalhados.' | 'Equipamentos atualizados, operados por equipe treinada, com laudos detalhados.' | 2 |
| `src/app/[locale]/sobre/page.tsx` | nefrologista, pediatra e especialistas em halitose | nefrologista, pediatra e profissionais com atuação em halitose | 2 |
| `src/app/[locale]/sobre/page.tsx` | "O ecossistema completo de excelência em saúde digestiva, onde tecnologia de ponta, cuidado humanizado e gestão certificada se unem em um único lugar." | "Clínica de gastroenterologia e motilidade digestiva que reúne equipamentos atualizados, cuidado humanizado e gestão certificada pela norma ISO 9001." | 2 |
| `src/app/[locale]/sobre/page.tsx` | um atendimento em gastroenterologia verdadeiramente especializado, que une                 tecnologia diagnóstica de última geração com um olhar profundamente humano. | um atendimento em gastroenterologia que une                 equipamentos diagnósticos atualizados a um olhar humano. | 2 |
| `src/app/[locale]/sobre/page.tsx` | a clínica tornou-se referência                 em diagnósticos avançados: | a clínica realiza                 exames diagnósticos: | 2 |
| `src/app/[locale]/sobre/page.tsx` | O que nos torna <em>únicos</em> | O que nos <em>orienta</em> | 2 |
| `src/app/[locale]/gestao-da-qualidade/page.tsx` | "Somos uma clínica com gestão certificada pela norma ISO 9001, o padrão internacional de excelência em qualidade." | "Somos uma clínica com gestão certificada pela norma ISO 9001, a norma internacional de sistemas de gestão da qualidade." | 2 |
| `src/app/[locale]/gestao-da-qualidade/page.tsx` | O padrão <em>internacional</em> de excelência | A norma <em>internacional</em> de gestão da qualidade | 2 |
| `src/app/[locale]/gestao-da-qualidade/page.tsx` | garantindo a máxima segurança para pacientes e colaboradores. | com foco na segurança de pacientes e colaboradores. | 2 |
| `src/app/[locale]/gestao-da-qualidade/page.tsx` | <p className="mb-3">A Clínica NU.V.E.M atua na prestação de serviços médicos especializados em gastroenterologia, nutrologia e exames complementares voltados às doença… | <p className="mb-3">Gestão certificada pela norma ISO 9001 para os atendimentos clínicos e exames da NU.V.E.M Medicina.</p> | 2 |
| `src/app/[locale]/gestao-da-qualidade/page.tsx` | Prestação de atendimentos clínicos nas áreas de gastroenterologia e nutrologia, bem como a realização de exames complementares relacionados às doenças funcionais do tr… | Gestão certificada pela norma ISO 9001 para os atendimentos clínicos e exames da NU.V.E.M Medicina.</p> | 2 |
| `src/lib/nuvete-data.ts` | 🔬 Referência nacional em testes respiratórios e motilidade digestiva | 🔬 Atua em SIBO/IMO, testes respiratórios, motilidade digestiva e DGBI | 2 |
| `src/lib/nuvete-data.ts` | Especialista em assoalho pélvico, biofeedback eletromiográfico e tratamento de incontinência. | Atua em assoalho pélvico, biofeedback eletromiográfico e tratamento de incontinência. | 2 |
| `src/lib/nuvete-data.ts` | Pediatra especializada em saúde digestiva infantil. | Pediatra com atuação em saúde digestiva infantil. | 2 |
| `src/lib/nuvete-data.ts` | Diretora Técnica Substituta, especialista em manometria anorretal | Diretora Técnica Substituta, com atuação em manometria anorretal | 2 |
| `src/lib/nuvete-data.ts` | A NU.V.E.M é especializada em doenças do aparelho digestivo, com foco em diagnóstico de precisão: | A NU.V.E.M atua no diagnóstico e no cuidado das doenças do aparelho digestivo: | 2 |
| `src/lib/nuvete-data.ts` | \n\nSomos referência nacional nessa área, com a Dra. Vera Ângelo à frente das pesquisas. | \n\nA Dra. Vera Ângelo, Diretora Técnica da clínica, atua nessa área. | 2 |
| `src/lib/nuvete-data.ts` | A NU.V.E.M é referência em diagnóstico de SIBO | A NU.V.E.M realiza testes respiratórios para investigação de SIBO | 2 |
| `src/lib/nuvete-data.ts` | Utilizamos testes respiratórios com H₂, CH₄ e H₂S, o protocolo mais completo disponível, sem coleta de sangue. | O teste mede H₂, CH₄ e H₂S no ar expirado, sem coleta de sangue. | 2 · **validar** |
| `src/lib/nuvete-data.ts` | Todos os laudos seguem o padrão ISO 9001. | Os laudos seguem os processos da gestão certificada pela norma ISO 9001. | 2 |
| `src/components/nuvete/NuveteChat.tsx` | fundadora da NU.V.E.M e referência em motilidade digestiva | fundadora da NU.V.E.M, com atuação em motilidade digestiva | 2 |
| `src/components/nuvete/NuveteChat.tsx` | nefrologista, pediatra e especialistas em halitose | nefrologista, pediatra e profissionais com atuação em halitose | 2 |
| `src/app/api/route.ts` | - Referência nacional em testes respiratórios, SIBO e motilidade digestiva | - Atua em SIBO/IMO, testes respiratórios, motilidade digestiva e DGBI | 2 |
| `src/app/api/route.ts` | - SIBO com H₂, CH₄ e H₂S (travessão) protocolo mais completo disponível | - SIBO com medição de H₂, CH₄ e H₂S no ar expirado | 2 |
| `src/app/api/route.ts` | - NUNCA faça diagnósticos médicos (travessão) sempre redirecione para consulta com o médico | - NUNCA faça diagnósticos médicos (travessão) sempre redirecione para consulta com o médico  REGRAS DE COMUNICAÇÃO (Resolução CFM nº 2.336/2023), valem para toda respo… | 2 |
| `messages/pt-BR.json` · `footer.tagline` | Ecossistema de excelência em saúde digestiva e ensino médico em Belo Horizonte, com certificação ISO 9001. | Gastroenterologia, motilidade digestiva e ensino médico em Belo Horizonte, com gestão certificada pela norma ISO 9001. | 2 |
| `messages/pt-BR.json` · `footer.isoSubtitle` | Clínica com certificação ISO 9001 | Gestão certificada pela norma ISO 9001 | 2 |
| `messages/pt-BR.json` · `footer.disclaimer` | As informações neste site têm caráter informativo e educacional, em conformidade com as normas do Conselho Federal de Medicina (Res. CFM nº 2.336/2023). Não substituem… | Conteúdo informativo e educacional, em conformidade com a Res. CFM nº 2.336/2023. Não substitui consulta médica. | 2 |
| `messages/pt-BR.json` · `footer.responsavelTecnica` | (nova chave) | Responsável técnica: Dra. Vera Ângelo · CRM-MG 22284 · RQE 10411 · RQE 22736 · Diretora Técnica | 2 |
| `messages/pt-BR.json` · `footer.registroClinica` | (nova chave) | Registro da clínica | 2 |
| `messages/pt-BR.json` · `ctaBanner.desc` | Agende sua consulta e experimente o padrão de excelência ISO 9001 da NU.V.E.M Medicina. | Agende sua consulta na NU.V.E.M Medicina, clínica com gestão certificada pela norma ISO 9001. | 2 |
| `messages/pt-BR.json` · `examesPage.desc` | Infraestrutura diagnóstica de última geração operada por especialistas com treinamento e certificação ISO 9001: os resultados mais confiáveis do segmento. | Equipamentos atualizados, operados por equipe treinada, em clínica com gestão certificada pela norma ISO 9001. | 2 |
| `messages/pt-BR.json` · `home.meta.title` | NU.V.E.M Medicina (travessão) Excelência em Saúde Digestiva · Belo Horizonte | NU.V.E.M Medicina · Gastroenterologia e Motilidade Digestiva em Belo Horizonte | 2 |
| `messages/pt-BR.json` · `home.exames.desc` | Infraestrutura diagnóstica de última geração operada por especialistas com treinamento e certificação ISO 9001. | Equipamentos atualizados, operados por equipe treinada, em clínica com gestão certificada pela norma ISO 9001. | 2 |
| `messages/pt-BR.json` · `home.iso.desc` | A ISO 9001 é o padrão internacional de excelência em gestão. Cada processo, do agendamento ao diagnóstico, segue protocolos rigorosos de qualidade, rastreabilidade e m… | A ISO 9001 é a norma internacional de sistemas de gestão da qualidade. Cada processo, do agendamento ao diagnóstico, segue protocolos de qualidade, rastreabilidade e m… | 2 |
| `messages/pt-BR.json` · `home.iso.isoBadgeDesc` | Clínica com certificação ISO 9001 | Gestão certificada pela norma ISO 9001 | 2 |
| `messages/pt-BR.json` · `home.iso.feat1Title` | Tecnologia Diagnóstica de Ponta | Equipamentos Diagnósticos Atualizados | 2 |
| `messages/pt-BR.json` · `home.iso.feat3Desc` | Formação hands-on com certificação validada ISO 9001 | Formação hands-on em clínica com gestão certificada pela norma ISO 9001 | 2 |
| `messages/pt-BR.json` · `home.cursos.desc` | Cursos, palestras e workshops com a equipe NU.V.E.M e parceiros de referência nacional. Conteúdo aplicado à prática clínica real. | Cursos, palestras e workshops com a equipe NU.V.E.M e parceiros convidados. Conteúdo aplicado à prática clínica real. | 2 |
| `messages/pt-BR.json` · `especialidadeDetail.agendarDesc` | Atendimento especializado em {esp} com equipe certificada ISO 9001. | Atendimento em {esp}, em clínica com gestão certificada pela norma ISO 9001. | 2 |
| `messages/pt-BR.json` · `especialidadeDetail.isoBadgeStrong` | certificado ISO 9001 | gestão certificada pela norma ISO 9001 | 2 |
| `messages/pt-BR.json` · `exameDetail.isoBadgeStrong` | certificado ISO 9001 | gestão certificada pela norma ISO 9001 | 2 |
| `messages/pt-BR.json` · `especialidadeDetail.isoBadge` | Especialidade realizada com protocolo | Atendimento realizado em clínica com | 2 |
| `messages/pt-BR.json` · `exameDetail.isoBadge` | Exame realizado com protocolo | Exame realizado em clínica com | 2 |
| `messages/en.json` · `footer.tagline` | A full ecosystem of digestive health excellence and medical education in Belo Horizonte, ISO 9001 certified. | Gastroenterology, digestive motility and medical education in Belo Horizonte, with management certified under ISO 9001. | 2 |
| `messages/en.json` · `footer.isoSubtitle` | ISO 9001 certified clinic | Management certified under ISO 9001 | 2 |
| `messages/en.json` · `footer.disclaimer` | The information on this site is for informational and educational purposes, in accordance with the standards of the Brazilian Federal Council of Medicine (Res. CFM No.… | Informational and educational content, in accordance with Res. CFM No. 2,336/2023 (Brazilian Federal Council of Medicine). It does not replace a medical consultation. | 2 |
| `messages/en.json` · `footer.responsavelTecnica` | (nova chave) | Responsible physician: Dr. Vera Ângelo · CRM-MG 22284 · RQE 10411 · RQE 22736 · Technical Director | 2 |
| `messages/en.json` · `footer.registroClinica` | (nova chave) | Clinic registration | 2 |
| `messages/en.json` · `ctaBanner.desc` | Book your appointment and experience the ISO 9001 standard of excellence at NU.V.E.M Medicina. | Book your appointment at NU.V.E.M Medicina, a clinic with management certified under ISO 9001. | 2 |
| `messages/en.json` · `examesPage.desc` | State-of-the-art diagnostic infrastructure operated by specialists trained and certified under ISO 9001: the most reliable results in the field. | Up-to-date equipment operated by a trained team, in a clinic with management certified under ISO 9001. | 2 |
| `messages/en.json` · `home.meta.title` | NU.V.E.M Medicina (travessão) Digestive Health Excellence · Belo Horizonte, Brazil | NU.V.E.M Medicina · Gastroenterology and Digestive Motility in Belo Horizonte, Brazil | 2 |
| `messages/en.json` · `home.exames.desc` | State-of-the-art diagnostic infrastructure operated by specialists trained and certified under ISO 9001. | Up-to-date equipment operated by a trained team, in a clinic with management certified under ISO 9001. | 2 |
| `messages/en.json` · `home.iso.desc` | ISO 9001 is the international standard of excellence in management. Every process, from scheduling to diagnosis, follows rigorous protocols for quality, traceability a… | ISO 9001 is the international standard for quality management systems. Every process, from scheduling to diagnosis, follows protocols for quality, traceability and con… | 2 |
| `messages/en.json` · `home.iso.isoBadgeDesc` | ISO 9001 certified clinic | Management certified under ISO 9001 | 2 |
| `messages/en.json` · `home.iso.feat1Title` | Leading-Edge Diagnostic Technology | Up-to-Date Diagnostic Equipment | 2 |
| `messages/en.json` · `home.iso.feat3Desc` | Hands-on training with ISO 9001-validated certification | Hands-on training at a clinic with management certified under ISO 9001 | 2 |
| `messages/en.json` · `home.cursos.desc` | Courses, talks and workshops with the NU.V.E.M team and leading national partners. Content applied to real clinical practice. | Courses, talks and workshops with the NU.V.E.M team and invited partners. Content applied to real clinical practice. | 2 |
| `messages/en.json` · `especialidadeDetail.agendarDesc` | Specialized care in {esp} with an ISO 9001 certified team. | Care in {esp}, at a clinic with management certified under ISO 9001. | 2 |
| `messages/en.json` · `especialidadeDetail.isoBadgeStrong` | ISO 9001 certified protocol | management certified under ISO 9001 | 2 |
| `messages/en.json` · `exameDetail.isoBadgeStrong` | ISO 9001 certified protocol | management certified under ISO 9001 | 2 |
| `messages/en.json` · `especialidadeDetail.isoBadge` | Specialty delivered under an | Care provided at a clinic with | 2 |
| `messages/en.json` · `exameDetail.isoBadge` | Exam performed under an | Exam performed at a clinic with | 2 |
| `messages/es.json` · `footer.tagline` | Ecosistema de excelencia en salud digestiva y formación médica en Belo Horizonte, con certificación ISO 9001. | Gastroenterología, motilidad digestiva y formación médica en Belo Horizonte, con gestión certificada según la norma ISO 9001. | 2 |
| `messages/es.json` · `footer.isoSubtitle` | Clínica con certificación ISO 9001 | Gestión certificada según la norma ISO 9001 | 2 |
| `messages/es.json` · `footer.disclaimer` | La información de este sitio tiene carácter informativo y educativo, conforme a las normas del Consejo Federal de Medicina de Brasil (Res. CFM n.º 2.336/2023). No sust… | Contenido informativo y educativo, conforme a la Res. CFM n.º 2.336/2023 (Consejo Federal de Medicina de Brasil). No sustituye la consulta médica. | 2 |
| `messages/es.json` · `footer.responsavelTecnica` | (nova chave) | Responsable técnica: Dra. Vera Ângelo · CRM-MG 22284 · RQE 10411 · RQE 22736 · Directora Técnica | 2 |
| `messages/es.json` · `footer.registroClinica` | (nova chave) | Registro de la clínica | 2 |
| `messages/es.json` · `ctaBanner.desc` | Agenda tu consulta y experimenta el estándar de excelencia ISO 9001 de NU.V.E.M Medicina. | Agenda tu consulta en NU.V.E.M Medicina, clínica con gestión certificada según la norma ISO 9001. | 2 |
| `messages/es.json` · `examesPage.desc` | Infraestructura diagnóstica de última generación operada por especialistas con formación y certificación ISO 9001: los resultados más confiables del sector. | Equipos actualizados, operados por un equipo capacitado, en una clínica con gestión certificada según la norma ISO 9001. | 2 |
| `messages/es.json` · `home.meta.title` | NU.V.E.M Medicina (travessão) Excelencia en Salud Digestiva · Belo Horizonte, Brasil | NU.V.E.M Medicina · Gastroenterología y Motilidad Digestiva en Belo Horizonte, Brasil | 2 |
| `messages/es.json` · `home.exames.desc` | Infraestructura diagnóstica de última generación operada por especialistas con formación y certificación ISO 9001. | Equipos actualizados, operados por un equipo capacitado, en una clínica con gestión certificada según la norma ISO 9001. | 2 |
| `messages/es.json` · `home.iso.desc` | La ISO 9001 es el estándar internacional de excelencia en gestión. Cada proceso, desde el agendamiento hasta el diagnóstico, sigue protocolos rigurosos de calidad, tra… | La ISO 9001 es la norma internacional de sistemas de gestión de la calidad. Cada proceso, desde el agendamiento hasta el diagnóstico, sigue protocolos de calidad, traz… | 2 |
| `messages/es.json` · `home.iso.isoBadgeDesc` | Clínica con certificación ISO 9001 | Gestión certificada según la norma ISO 9001 | 2 |
| `messages/es.json` · `home.iso.feat1Title` | Tecnología Diagnóstica de Vanguardia | Equipos Diagnósticos Actualizados | 2 |
| `messages/es.json` · `home.iso.feat3Desc` | Formación práctica con certificación validada ISO 9001 | Formación práctica en una clínica con gestión certificada según la norma ISO 9001 | 2 |
| `messages/es.json` · `home.cursos.desc` | Cursos, charlas y talleres con el equipo NU.V.E.M y socios de referencia nacional. Contenido aplicado a la práctica clínica real. | Cursos, charlas y talleres con el equipo NU.V.E.M y socios invitados. Contenido aplicado a la práctica clínica real. | 2 |
| `messages/es.json` · `especialidadeDetail.agendarDesc` | Atención especializada en {esp} con equipo certificado ISO 9001. | Atención en {esp}, en una clínica con gestión certificada según la norma ISO 9001. | 2 |
| `messages/es.json` · `especialidadeDetail.isoBadgeStrong` | certificado ISO 9001 | gestión certificada según la norma ISO 9001 | 2 |
| `messages/es.json` · `exameDetail.isoBadgeStrong` | certificado ISO 9001 | gestión certificada según la norma ISO 9001 | 2 |
| `messages/es.json` · `especialidadeDetail.isoBadge` | Especialidad realizada con protocolo | Atención realizada en una clínica con | 2 |
| `messages/es.json` · `exameDetail.isoBadge` | Examen realizado con protocolo | Examen realizado en una clínica con | 2 |
| `src/app/llms.txt/route.ts` | Clínica especializada em gastroenterologia, diagnóstico avançado e ensino médico em Belo Horizonte, Minas Gerais, Brasil. Clínica com certificação ISO 9001. | Clínica de gastroenterologia e motilidade digestiva, exames diagnósticos e ensino médico em Belo Horizonte, Minas Gerais, Brasil. Gestão certificada pela norma ISO 9001. | 2 |
| `src/app/llms.txt/route.ts` | - **Gastroenterologia:** Doenças funcionais, | - **Gastroenterologia:** Distúrbios da interação cérebro-intestino (DGBI), | 2 |
| `src/app/llms.txt/route.ts` | Equipamentos de última geração para manometria | Equipamentos atualizados para manometria | 2 |
| `src/app/llms.txt/route.ts` | Imersão presencial com equipamentos de ponta. | Imersão presencial com equipamentos atualizados. | 2 |
| `src/app/[locale]/dra-vera-angelo/page.tsx` | Mestre e Doutora pela UFMG, especialista em gastroenterologia, motilidade digestiva e testes respiratórios. | Mestre e Doutora pela UFMG, gastroenterologista com atuação em motilidade digestiva, testes respiratórios e DGBI. | 2 |

---

## Bloco 2b · Travessões

169 travessões longos em 162 linhas de `src/` e `messages/` (a contagem de 180
do reconhecimento incluía os que o Bloco 2a já tinha removido). Só textos
visíveis e comentários; nenhuma lógica mudou. Regras usadas:

| Contexto | Troca | Exemplo |
|---|---|---|
| nome e descrição, título, rótulo | ` · ` | "NU.V.E.M Medicina · Links", "Dra. Vera Ângelo · Gastroenterologista", "Parte A · Clínica", "Nota {score}/10 ·" |
| um travessão numa frase ou comentário | `: ` | "Consent Mode v2: consentimento de cookies..." |
| par de travessões numa frase | `, ` | "Tratando a origem, por exemplo, SIBO ou xerostomia, o plano..." |
| pergunta seguida de resposta | ponto de interrogação basta | "Preciso de pedido médico? Para a maioria dos exames, sim." |
| campo vazio na ferramenta de anamnese | `'·'` | especialidade não preenchida |

Doze trocas automáticas que ficaram estranhas foram ajustadas à mão (política
de privacidade, descrições do Studio, comentários de `IsoSeal`, `WaFloat`,
`site.ts`, `google-reviews.ts`, `linkBio.ts`). Restam 0 travessões em `src/` e
`messages/`. `scripts/`, `docs/` e o README não entraram no escopo.

Observação, sem alteração: o título da página da equipe sai duplicado
("Equipe · NU.V.E.M Medicina | NU.V.E.M Medicina"), porque a página já declara
o sufixo e o layout acrescenta outro. Já era assim antes desta branch.

---

## Bloco 3 · Halimetria e sialometria saem do site

Decisão da clínica em 06/11/2026: halimetria e sialometria não são mais
realizadas. A clínica também não realiza endoscopia, colonoscopia nem ultrassom.

### O que foi feito

- **Exame removido** de `data.ts`, `catalog.ts` (en/es), `exames-detail.ts`
  (pt/en/es), do menu Exames, do rodapé, da página de preparos, de "sobre" e
  das meta descriptions. O sitemap e o schema saem sozinhos, porque são
  gerados a partir de `EXAMES`. A Avaliação Pélvica passou a ser o exame 05.
- **PDF removido**: `public/pdfs/preparo-halimetria-sialometria-v1.pdf`.
- **Nuvete**: saiu o preparo de halimetria, a linha nos exames e nos prazos de
  laudo, e a resposta de halitose foi reescrita. O prompt diz que a clínica
  **não realiza** halimetria, sialometria, endoscopia, colonoscopia nem
  ultrassom.
- **llms.txt**: sem a seção de halimetria; halitose descrita pelas causas digestivas.
- **docs/utm-links-bio.md**: saiu o link de story da página removida.
- **Página /especialidades/halitose** (mantida, decisão pendente): reescrita
  nas três línguas para tratar só das causas digestivas, com encaminhamento
  para odontologia e otorrinolaringologia. Exames relacionados passaram a ser
  testes respiratórios e pHmetria. Saíram os tópicos de halimetria,
  sialometria e acompanhamento por halimetria, o laudo em ppb e o FAQ
  "O exame de halimetria é doloroso?". Todos os textos novos estão na lista de
  validação.
- **LIBO e SIFO**: saíram as frases que davam a entender que a clínica
  diagnostica ("com cobertura de SIBO, LIBO, SIFO", "Suspeita de IMO ou LIBO"
  como indicação, "SIBO, IMO, LIBO e intolerâncias" no botão do preparo, lista
  de condições do llms.txt). Continuam no conteúdo dos cursos (página Ensino e
  `cursos.ts`) e como palavra-gatilho da nuvete.
- **Manometria esofágica**: passa a citar "alta resolução (24 canais) ou
  convencional (8 canais), conforme a indicação médica", nas três línguas.
- **pHmetria**: o exame passa a se chamar "pHmetria e ImpedanciopHmetria
  Esofágica" (slug igual). O termo errado "Impedanciopletismografia", que
  aparecia no prompt e na base da nuvete, foi corrigido.
- **Endoscopia, colonoscopia e ultrassom**: nenhum trecho do site diz que a
  clínica realiza. As menções são do tipo "traga sua endoscopia anterior" ou
  "exame complementar à endoscopia" e ficaram.

### Mantido de propósito

| Trecho | Onde | Por quê |
|---|---|---|
| Trilha "Halitose, halimetria e sialometria" | `src/app/[locale]/ensino/page.tsx` | conteúdo de curso, não exame da clínica |
| Registro "Halimetria e sialometria" em `PREPAROS_TODOS` | `src/lib/anamnese-ia/preparos.ts` | histórico da ferramenta interna; já fica de fora pelo `EXAMES_FORA` desde `e9dfbba` |
| "A clínica não realiza halimetria nem sialometria" | prompt, nuvete, llms.txt | resposta correta quando perguntarem |

### Redirects criados (Bloco 3)

| De | Para | Testado (local) |
|---|---|---|
| `/exames/halimetria-sialometria` | `/exames` | 308 |
| `/en/exames/halimetria-sialometria` | `/en/exames` | 308 |
| `/es/exames/halimetria-sialometria` | `/es/exames` | 308 |
| `/halimetria`, `/halimetria-e-sialometria` (já existiam, apontavam para a página removida) | `/exames` | 308 |
| `/preparo-halimetria`, `/preparo-halimetria-e-sialometria` (antes iam para `/exames/preparos`) | `/exames` | 308 |
| `/pdfs/preparo-halimetria-sialometria.pdf` e `-v1.pdf` | `/exames/preparos` | 308 |

O Next responde **308** para `permanent: true`, não 301. O Google trata os dois
como redirecionamento permanente, e os cerca de 80 redirects que já existiam
também são 308. A decisão de manter ou trocar por 301 explícito fica para o
Bloco 4.

### Lista oficial de exames comparada com o site

| Exame da lista oficial | No site | Situação |
|---|---|---|
| Manometria esofágica de alta resolução (24 canais) | sim | ok |
| Manometria esofágica convencional (8 canais) | não existia | **acrescentada** na página da manometria esofágica (validar) |
| Manometria anorretal | sim, como "Alta Resolução · Canal Anal" | **[A CONFIRMAR]**: a lista oficial não diz que é de alta resolução |
| pHmetria esofágica e impedanciopHmetria esofágica (24h) | sim, como "pHmetria e Impedânciometria" | **renomeado** |
| Testes respiratórios: SIBO (H₂), SIBO + metano/IMO, H. pylori, lactose, frutose | sim | ok; o site cita também H₂S (ver abaixo) |
| Avaliação pélvica com biofeedback eletromiográfico | sim | ok |
| Trânsito colônico (somente particular) | **não existe** | **pendência**: sem página, falta o preparo oficial |
| Halimetria e sialometria | existia | **removido** |

### H₂S · [A CONFIRMAR com a Dra. Vera]

O preparo oficial do teste respiratório cita H₂ · CH₄ · H₂S, mas a lista da
equipe não. Nada foi alterado. Ocorrências (fora da ferramenta de anamnese):

| Arquivo:linha | Trecho |
|---|---|
| `src/app/api/route.ts:119` | …- Testes Respiratórios (H₂, CH₄, H₂S)… |
| `src/app/api/route.ts:176` | …- SIBO com medição de H₂, CH₄ e H₂S no ar expirado… |
| `src/app/llms.txt/route.ts:41` | …- **H₂/CH₄/H₂S (SIBO/IMO):** Diagnóstico de supercrescimento bacteriano… |
| `src/lib/content/catalog.ts:129` | …title: 'Breath Tests', subtitle: 'H₂ · CH₄ · H₂S · H. pylori', tag: 'Non-Invasive',… |
| `src/lib/content/catalog.ts:134` | …'The tests measure H₂, CH₄ and H₂S in exhaled breath and help the physician investigate SIB… |
| `src/lib/content/catalog.ts:203` | …title: 'Pruebas Respiratorias', subtitle: 'H₂ · CH₄ · H₂S · H. pylori', tag: 'No Invasivo',… |
| `src/lib/content/catalog.ts:208` | …'Las pruebas miden H₂, CH₄ y H₂S en el aire exhalado y ayudan al médico a investigar SIBO… |
| `src/lib/content/exames-detail.ts:148` | …'Investigação de gases intestinais (H₂, CH₄, H₂S)',… |
| `src/lib/content/exames-detail.ts:312` | …'Investigation of intestinal gases (H₂, CH₄, H₂S)',… |
| `src/lib/content/exames-detail.ts:476` | …'Investigación de gases intestinales (H₂, CH₄, H₂S)',… |
| `src/lib/content/exames-resp-extra.ts:43` | …{ label: 'Preparo: H₂ · CH₄ · H₂S', sub: 'SIBO, IMO e intolerâncias', href: '/pdfs/preparo… |
| `src/lib/content/exames-resp-extra.ts:54` | …ointestinal por teste respiratório. Detecta simultaneamente H₂, CH₄ e H₂S, o que ajuda o médico a investigar quadros de SIBO, IMO … |
| `src/lib/content/exames-resp-extra.ts:56` | …{ label: 'Gases medidos', value: 'H₂ · CH₄ · H₂S' },… |
| `src/lib/content/exames-resp-extra.ts:119` | …{ label: 'Prep Guide: H₂ · CH₄ · H₂S', sub: 'SIBO, IMO and intolerances', href: '/pdfs/prepar… |
| `src/lib/content/exames-resp-extra.ts:130` | …estinal diagnosis via breath test. Simultaneously detects H₂, CH₄ and H₂S, which helps the physician investigate SIBO, IMO and oth… |
| `src/lib/content/exames-resp-extra.ts:132` | …{ label: 'Gases measured', value: 'H₂ · CH₄ · H₂S' },… |
| `src/lib/content/exames-resp-extra.ts:195` | …{ label: 'Preparación: H₂ · CH₄ · H₂S', sub: 'SIBO, IMO e intolerancias', href: '/pdfs/preparo… |
| `src/lib/content/exames-resp-extra.ts:206` | …tinal mediante prueba respiratoria. Detecta simultáneamente H₂, CH₄ y H₂S, lo que ayuda al médico a investigar cuadros de SIBO, IM… |
| `src/lib/content/exames-resp-extra.ts:208` | …{ label: 'Gases medidos',      value: 'H₂ · CH₄ · H₂S' },… |
| `src/lib/cursos.ts:39` | …titulo:     'Testes Respiratórios de H₂, CH₄ e H₂S',… |
| `src/lib/data.ts:164` | …subtitle: 'H₂ · CH₄ · H₂S · H. pylori',… |
| `src/lib/data.ts:170` | …'Os testes medem H₂, CH₄ e H₂S no ar expirado e ajudam o médico a investigar SIBO, IMO,… |
| `src/lib/hero-slides.tsx:94` | …ar exalado. Protocolo NU.V.E.M detecta H₂, CH₄ e H₂S em um único exame, com… |
| `src/lib/hero-slides.tsx:174` | …breath analysis. The NU.V.E.M protocol detects H₂, CH₄ and H₂S in a single… |
| `src/lib/hero-slides.tsx:255` | …análisis del aire exhalado. El protocolo NU.V.E.M detecta H₂, CH₄ y H₂S en… |
| `src/lib/nuvete-data.ts:112` | …nome:    'Teste Respiratório: SIBO (H₂/CH₄/H₂S)',… |
| `src/lib/nuvete-data.ts:291` | … impedanciopHmetria esofágica (24h)\n- Testes Respiratórios (H₂, CH₄, H₂S)\n\nA Dra. Vera Ângelo, Diretora Técnica da clínica, atu… |
| `src/lib/nuvete-data.ts:352` | … todos não invasivos e sem coleta de sangue:\n\n- 🔬 **SIBO** (H₂/CH₄/H₂S): supercrescimento bacteriano\n- 🦠 ***H. pylori*** (URE… |
| `src/lib/nuvete-data.ts:362` | … e IMO (supercrescimento de metanogênicos).\n\nO teste mede H₂, CH₄ e H₂S no ar expirado, sem coleta de sangue.\n\nGostaria de sab… |
| `messages/en.json:301` | …"feat1Desc": "High-resolution manometry, pH monitoring, H₂/CH₄/H₂S breath tests",… |
| `messages/es.json:301` | …Manometría de alta resolución, pHmetría, pruebas respiratorias H₂/CH₄/H₂S",… |
| `messages/pt-BR.json:301` | …"feat1Desc": "Manometria AR, pHmetria, testes respiratórios H₂/CH₄/H₂S",… |

### Tabela de mudanças do Bloco 3

| Arquivo | Antes | Depois | Bloco |
|---|---|---|---|
| `src/lib/data.ts` | objeto com id: 'halimetria-sialometria' | (removido) | 3 |
| `src/lib/content/catalog.ts` | objeto com id: 'halimetria-sialometria' | (removido) | 3 |
| `src/lib/content/catalog.ts` | objeto com id: 'halimetria-sialometria' | (removido) | 3 |
| `src/lib/content/exames-detail.ts` | objeto com 'halimetria-sialometria': { | (removido) | 3 |
| `src/lib/content/exames-detail.ts` | objeto com 'halimetria-sialometria': { | (removido) | 3 |
| `src/lib/content/exames-detail.ts` | objeto com 'halimetria-sialometria': { | (removido) | 3 |
| `src/lib/data.ts` | 'halimetria-sialometria':    '/pdfs/preparo-halimetria-sialometria-v1.pdf', | (removido) | 3 |
| `src/lib/data.ts` | { key: 'halimetriaSialometria',    href: '/exames/halimetria-sialometria' }, | (removido) | 3 |
| `src/lib/data.ts` | id: 'avaliacao-pelvica', num: '06' | id: 'avaliacao-pelvica', num: '05' | 3 |
| `src/lib/content/catalog.ts` | id: 'avaliacao-pelvica', num: '06' | id: 'avaliacao-pelvica', num: '05' | 3 |
| `src/components/layout/Footer.tsx` | { label: tNav('halimetriaSialometria'), href: '/exames/halimetria-sialometria' }, | (removido) | 3 |
| `src/app/[locale]/exames/preparos/page.tsx` | objeto com slug:    'halimetria-sialometria' | (removido) | 3 |
| `src/app/[locale]/exames/preparos/page.tsx` | pHmetria, testes respiratórios, halimetria e avaliação pélvica. | pHmetria e impedanciopHmetria, testes respiratórios e avaliação pélvica. | 3 |
| `src/app/[locale]/sobre/page.tsx` | pHmetria, halimetria e muito mais, | pHmetria e avaliação pélvica, | 3 |
| `src/lib/data.ts` | desc: 'Diagnóstico multidisciplinar completo. Investigamos causas digestivas, orais e sistêmicas com halimetria de precisão.',     tags: ['Halimetria', 'Sialometria', … | desc: 'Investigação das causas digestivas do mau hálito, com encaminhamento para odontologia e otorrinolaringologia quando a origem é oral ou nasofaríngea.',     tags:… | 3 · **validar** |
| `src/lib/content/catalog.ts` | desc:  'Complete multidisciplinary diagnosis. We investigate digestive, oral and systemic causes with precision halimetry.',     tags:  ['Halimetry', 'Sialometry', 'In… | desc:  'Investigation of the digestive causes of bad breath, with referral to dentistry and otolaryngology when the origin is oral or nasopharyngeal.',     tags:  ['Di… | 3 · **validar** |
| `src/lib/content/catalog.ts` | desc:  'Diagnóstico multidisciplinario completo. Investigamos causas digestivas, orales y sistémicas con halimetría de precisión.',     tags:  ['Halimetría', 'Sialomet… | desc:  'Investigación de las causas digestivas del mal aliento, con derivación a odontología y otorrinolaringología cuando el origen es oral o nasofaríngeo.',     tags… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Diagnóstico multidisciplinar completo da halitose. Investigamos causas digestivas, orais e sistêmicas com halimetria e sialometria de alta precisão.' | 'Avaliação da halitose com foco nas causas digestivas. Investigamos refluxo, SIBO, H. pylori e outras origens gastrointestinais, com encaminhamento para odontologia e … | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'A halitose é uma condição complexa que exige abordagem multidisciplinar. Na NU.V.E.M, investigamos todas as origens possíveis: digestivas, orais, nasofaríngeas e sist… | 'A halitose pode ter origem oral, nasofaríngea, sistêmica ou digestiva. Na NU.V.E.M, a consulta de gastroenterologia investiga as causas digestivas do mau hálito.' | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Nossa abordagem combina halimetria quantitativa objetiva, sialometria, avaliação gastroenterológica completa e, quando necessário, parceria com odontologia e otorrino… | 'Conforme a indicação médica, a investigação pode incluir exames realizados na clínica, como testes respiratórios e pHmetria. Quando a origem provável é oral ou nasofa… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | { title: 'Halimetria Quantitativa', body: 'Quantificação objetiva de compostos sulfurados voláteis (CSV) no ar exalado com aparelho Halimeter® calibrado, para diagnóst… | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | { title: 'Sialometria', body: 'Medição do fluxo salivar em repouso e estimulado, essencial no diagnóstico de xerostomia e suas relações diretas com a halitose de orige… | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | { title: 'Protocolo Diagnóstico Integrado', body: 'Avaliação simultânea de todas as possíveis origens: oral, digestiva, nasofaríngea e sistêmica, com sequenciamento di… | { title: 'Avaliação Integrada', body: 'Consulta que considera as possíveis origens do mau hálito (oral, digestiva, nasofaríngea e sistêmica) para orientar a investigaç… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | { title: 'Acompanhamento Evolutivo', body: 'Monitoramento periódico com halimetria para avaliar resposta ao tratamento de forma objetiva, garantindo que a melhora seja… | { title: 'Exames Digestivos', body: 'Testes respiratórios (SIBO, IMO e H. pylori) e pHmetria podem ajudar o médico a investigar causas digestivas do mau hálito.' } | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Halimetria quantitativa objetiva: resultado em ppb (partes por bilhão) de CSV' | 'Exames digestivos realizados na própria clínica, conforme a indicação médica' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Investigação simultânea de origem oral, digestiva e sistêmica na mesma consulta' | 'Avaliação das possíveis origens oral, digestiva e sistêmica na consulta' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Plano terapêutico individualizado com acompanhamento evolutivo documentado' | 'Plano terapêutico individualizado, com acompanhamento médico' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Certificação ISO 9001: resultados rastreáveis e comparáveis entre consultas' | 'Gestão certificada pela norma ISO 9001' | 3 |
| `src/lib/content/especialidades-detail.ts` | para investigação diagnóstica completa de halitose. O protocolo NU.V.E.M inclui halimetria, sialometria, triagem digestiva e planejamento terapêutico integrado.' | para investigação das causas digestivas da halitose. A avaliação inclui triagem das causas digestivas e planejamento terapêutico integrado.' | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Laudo com quantificação de CSV (ppb) e interpretação clínica', | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Monitoramento evolutivo disponível para acompanhamento de resultados', | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | esp: 'Gastroenterologia · Diagnóstico de Halitose' | esp: 'Gastroenterologia' | 3 |
| `src/lib/content/especialidades-detail.ts` | por isso investigamos todas as possíveis origens em um único atendimento integrado.' | por isso a consulta considera todas as possíveis origens e orienta os encaminhamentos.' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Por meio de halimetria quantitativa, sialometria e avaliação gastroenterológica completa, com parceria com odontologia e otorrinolaringologia quando necessário.' | 'Por meio da avaliação gastroenterológica e, quando indicado, de exames como testes respiratórios e pHmetria. Causas orais e nasofaríngeas são avaliadas por odontologi… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | { pergunta: 'O exame de halimetria é doloroso?', resposta: 'Não. É um exame simples, rápido e indolor, realizado com aparelho calibrado (Halimeter®).' }, | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | exames: ['halimetria-sialometria', 'testes-respiratorios'], | exames: ['testes-respiratorios', 'phmetria-impedanciometria'], | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Complete multidisciplinary diagnosis of halitosis. We investigate digestive, oral and systemic causes with precision halimetry and sialometry.' | 'Halitosis evaluation focused on digestive causes. We investigate reflux, SIBO, H. pylori and other gastrointestinal origins, with referral to dentistry and otolaryngo… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Halitosis is a complex condition that requires a multidisciplinary approach. At NU.V.E.M, we investigate every possible origin: digestive, oral, nasopharyngeal and sy… | 'Halitosis can have an oral, nasopharyngeal, systemic or digestive origin. At NU.V.E.M, the gastroenterology visit investigates the digestive causes of bad breath.' | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Our approach combines objective quantitative halimetry, sialometry, a complete gastroenterological evaluation and, when needed, partnership with dentistry and otolary… | 'As indicated by the physician, the investigation may include exams performed at the clinic, such as breath tests and pH monitoring. When the likely origin is oral or … | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | { title: 'Quantitative Halimetry', body: 'Objective quantification of volatile sulfur compounds (VSCs) in exhaled breath with a calibrated Halimeter®, for precise diag… | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | { title: 'Sialometry', body: 'Measurement of resting and stimulated salivary flow, essential in diagnosing xerostomia and its direct relationship with oral halitosis.' }, | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | { title: 'Integrated Diagnostic Protocol', body: 'Simultaneous evaluation of every possible origin: oral, digestive, nasopharyngeal and systemic, with efficient, preci… | { title: 'Integrated Evaluation', body: 'A visit that considers the possible origins of bad breath (oral, digestive, nasopharyngeal and systemic) to guide the investig… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | { title: 'Progress Monitoring', body: 'Periodic monitoring with halimetry to objectively evaluate treatment response, ensuring improvement is documented and sustained.' } | { title: 'Digestive Exams', body: 'Breath tests (SIBO, IMO and H. pylori) and pH monitoring can help the physician investigate digestive causes of bad breath.' } | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Objective quantitative halimetry: result in ppb (parts per billion) of VSCs' | 'Digestive exams performed at the clinic, as indicated by the physician' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Simultaneous investigation of oral, digestive and systemic origin in the same visit' | 'Evaluation of possible oral, digestive and systemic origins during the visit' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Individualized treatment plan with documented progress monitoring' | 'Individualized treatment plan, with medical follow-up' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'ISO 9001 certification: traceable results comparable across visits' | 'Management certified under ISO 9001' | 3 |
| `src/lib/content/especialidades-detail.ts` | for a complete diagnostic investigation of halitosis. The NU.V.E.M protocol includes halimetry, sialometry, digestive screening and integrated treatment planning.' | to investigate the digestive causes of halitosis. The evaluation includes screening for digestive causes and integrated treatment planning.' | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Report with VSC quantification (ppb) and clinical interpretation', | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Progress monitoring available to track results', | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | esp: 'Gastroenterology · Halitosis Diagnosis' | esp: 'Gastroenterology' | 3 |
| `src/lib/content/especialidades-detail.ts` | which is why we investigate every possible origin in a single integrated visit.' | which is why the visit considers every possible origin and guides referrals.' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Through quantitative halimetry, sialometry and a complete gastroenterological evaluation, with partnership with dentistry and otolaryngology when needed.' | 'Through a gastroenterological evaluation and, when indicated, exams such as breath tests and pH monitoring. Oral and nasopharyngeal causes are evaluated by dentistry … | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | { pergunta: 'Is the halimetry exam painful?', resposta: 'No. It’s a simple, quick and painless exam, performed with calibrated equipment (Halimeter®).' }, | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Diagnóstico multidisciplinario completo de la halitosis. Investigamos causas digestivas, orales y sistémicas con halimetría y sialometría de alta precisión.' | 'Evaluación de la halitosis con foco en las causas digestivas. Investigamos reflujo, SIBO, H. pylori y otros orígenes gastrointestinales, con derivación a odontología … | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'La halitosis es una condición compleja que exige un abordaje multidisciplinario. En NU.V.E.M investigamos todos los orígenes posibles: digestivos, orales, nasofarínge… | 'La halitosis puede tener origen oral, nasofaríngeo, sistémico o digestivo. En NU.V.E.M, la consulta de gastroenterología investiga las causas digestivas del mal alien… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Nuestro enfoque combina halimetría cuantitativa objetiva, sialometría, evaluación gastroenterológica completa y, cuando es necesario, colaboración con odontología y o… | 'Según la indicación médica, la investigación puede incluir exámenes realizados en la clínica, como pruebas respiratorias y pHmetría. Cuando el origen probable es oral… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | { title: 'Halimetría Cuantitativa', body: 'Cuantificación objetiva de compuestos sulfurados volátiles (CSV) en el aire exhalado con un Halimeter® calibrado, para un di… | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | { title: 'Sialometría', body: 'Medición del flujo salival en reposo y estimulado, esencial en el diagnóstico de la xerostomía y su relación directa con la halitosis de… | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | { title: 'Protocolo Diagnóstico Integrado', body: 'Evaluación simultánea de todos los orígenes posibles: oral, digestivo, nasofaríngeo y sistémico, con una secuencia d… | { title: 'Evaluación Integrada', body: 'Consulta que considera los orígenes posibles del mal aliento (oral, digestivo, nasofaríngeo y sistémico) para orientar la inves… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | { title: 'Seguimiento Evolutivo', body: 'Monitoreo periódico con halimetría para evaluar objetivamente la respuesta al tratamiento, garantizando que la mejora quede do… | { title: 'Exámenes Digestivos', body: 'Las pruebas respiratorias (SIBO, IMO y H. pylori) y la pHmetría pueden ayudar al médico a investigar causas digestivas del mal a… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Halimetría cuantitativa objetiva: resultado en ppb (partes por billón) de CSV' | 'Exámenes digestivos realizados en la propia clínica, según la indicación médica' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Investigación simultánea de origen oral, digestivo y sistémico en la misma consulta' | 'Evaluación de los orígenes posibles oral, digestivo y sistémico en la consulta' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Plan terapéutico individualizado con seguimiento evolutivo documentado' | 'Plan terapéutico individualizado, con seguimiento médico' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Certificación ISO 9001: resultados trazables y comparables entre consultas' | 'Gestión certificada según la norma ISO 9001' | 3 |
| `src/lib/content/especialidades-detail.ts` | para la investigación diagnóstica completa de la halitosis. El protocolo NU.V.E.M incluye halimetría, sialometría, cribado digestivo y planificación terapéutica integr… | para investigar las causas digestivas de la halitosis. La evaluación incluye el cribado de causas digestivas y la planificación terapéutica integrada.' | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | 'Informe con cuantificación de CSV (ppb) e interpretación clínica', | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Monitoreo evolutivo disponible para el seguimiento de resultados', | (removido) | 3 |
| `src/lib/content/especialidades-detail.ts` | esp: 'Gastroenterología · Diagnóstico de Halitosis' | esp: 'Gastroenterología' | 3 |
| `src/lib/content/especialidades-detail.ts` | por eso investigamos todos los orígenes posibles en una única consulta integrada.' | por eso la consulta considera todos los orígenes posibles y orienta las derivaciones.' | 3 |
| `src/lib/content/especialidades-detail.ts` | 'Mediante halimetría cuantitativa, sialometría y evaluación gastroenterológica completa, con colaboración de odontología y otorrinolaringología cuando es necesario.' | 'Mediante la evaluación gastroenterológica y, cuando está indicado, exámenes como pruebas respiratorias y pHmetría. Las causas orales y nasofaríngeas las evalúan odont… | 3 · **validar** |
| `src/lib/content/especialidades-detail.ts` | { pergunta: '¿El examen de halimetría es doloroso?', resposta: 'No. Es un examen simple, rápido e indoloro, realizado con un equipo calibrado (Halimeter®).' }, | (removido) | 3 |
| `src/lib/data.ts` | 'Protocolo NU.V.E.M detecta H₂, CH₄ e H₂S em um único exame, com cobertura de SIBO, LIBO, SIFO e infecção por H. pylori.' | 'Os testes medem H₂, CH₄ e H₂S no ar expirado e ajudam o médico a investigar SIBO, IMO, intolerâncias e infecção por H. pylori.' | 3 · **validar** |
| `src/lib/content/catalog.ts` | 'The NU.V.E.M protocol detects H₂, CH₄ and H₂S in a single exam, covering SIBO, LIBO, SIFO and H. pylori infection.' | 'The tests measure H₂, CH₄ and H₂S in exhaled breath and help the physician investigate SIBO, IMO, intolerances and H. pylori infection.' | 3 · **validar** |
| `src/lib/content/catalog.ts` | 'El protocolo NU.V.E.M detecta H₂, CH₄ y H₂S en un único examen, cubriendo SIBO, LIBO, SIFO e infección por H. pylori.' | 'Las pruebas miden H₂, CH₄ y H₂S en el aire exhalado y ayudan al médico a investigar SIBO, IMO, intolerancias e infección por H. pylori.' | 3 · **validar** |
| `src/lib/content/exames-detail.ts` | 'Suspeita de IMO (supercrescimento de metanogênicos) ou LIBO' | 'Suspeita de IMO (supercrescimento de metanogênicos)' | 3 · **validar** |
| `src/lib/content/exames-detail.ts` | 'Suspected IMO (methanogen overgrowth) or LIBO' | 'Suspected IMO (methanogen overgrowth)' | 3 · **validar** |
| `src/lib/content/exames-detail.ts` | 'Sospecha de IMO (sobrecrecimiento de metanógenos) o LIBO' | 'Sospecha de IMO (sobrecrecimiento de metanógenos)' | 3 · **validar** |
| `src/lib/content/exames-resp-extra.ts` | sub: 'SIBO, IMO, LIBO e intolerâncias' | sub: 'SIBO, IMO e intolerâncias' | 3 |
| `src/lib/content/exames-resp-extra.ts` | sub: 'SIBO, IMO, LIBO and intolerances' | sub: 'SIBO, IMO and intolerances' | 3 |
| `src/lib/content/exames-resp-extra.ts` | sub: 'SIBO, IMO, LIBO e intolerancias' | sub: 'SIBO, IMO e intolerancias' | 3 |
| `src/app/llms.txt/route.ts` | SIBO, IMO, LIBO, disbiose intestinal | SIBO, IMO, disbiose intestinal | 3 |
| `src/lib/data.ts` | subtitle: 'Alta Resolução · Esôfago', | subtitle: 'Alta Resolução e Convencional · Esôfago', | 3 |
| `src/lib/data.ts` | 'Manometria esofágica de alta resolução em Belo Horizonte, sem sedação. | 'Manometria esofágica de alta resolução e convencional em Belo Horizonte, sem sedação. | 3 |
| `src/lib/data.ts` | 'Equipamentos atualizados com mapeamento completo da pressão esofágica em alta resolução. | 'Realizada em alta resolução (24 canais) ou pelo método convencional (8 canais), conforme a indicação médica. Equipamentos atualizados com mapeamento da pressão esofág… | 3 · **validar** |
| `src/lib/content/catalog.ts` | subtitle: 'High Resolution · Esophagus', | subtitle: 'High Resolution and Conventional · Esophagus', | 3 |
| `src/lib/content/catalog.ts` | 'High-resolution esophageal manometry in Belo Horizonte, no sedation. | 'High-resolution and conventional esophageal manometry in Belo Horizonte, no sedation. | 3 |
| `src/lib/content/catalog.ts` | 'Up-to-date equipment with full high-resolution esophageal pressure mapping. | 'Performed with high-resolution (24-channel) or conventional (8-channel) manometry, as indicated by the physician. Up-to-date equipment with esophageal pressure mapping. | 3 · **validar** |
| `src/lib/content/catalog.ts` | subtitle: 'Alta Resolución · Esófago', | subtitle: 'Alta Resolución y Convencional · Esófago', | 3 |
| `src/lib/content/catalog.ts` | 'Manometría esofágica de alta resolución en Belo Horizonte, sin sedación. | 'Manometría esofágica de alta resolución y convencional en Belo Horizonte, sin sedación. | 3 |
| `src/lib/content/catalog.ts` | 'Equipos actualizados con mapeo completo de la presión esofágica en alta resolución. | 'Realizada en alta resolución (24 canales) o con el método convencional (8 canales), según la indicación médica. Equipos actualizados con mapeo de la presión esofágica. | 3 · **validar** |
| `src/lib/data.ts` | title: 'pHmetria e Impedânciometria', | title: 'pHmetria e ImpedanciopHmetria Esofágica', | 3 |
| `src/lib/data.ts` | seoTitle: 'pHmetria e Impedânciometria em BH', | seoTitle: 'pHmetria e ImpedanciopHmetria Esofágica em BH', | 3 |
| `src/lib/data.ts` | 'pHmetria esofágica de 24 horas e impedanciometria em Belo Horizonte. | 'pHmetria esofágica e impedanciopHmetria esofágica (24h) em Belo Horizonte. | 3 |
| `src/lib/data.ts` | 'A impedânciometria detecta refluxo | 'A impedanciopHmetria detecta refluxo | 3 |
| `src/lib/data.ts` | com manometria, pHmetria e impedânciometria integradas.' | com manometria, pHmetria e impedanciopHmetria esofágica.' | 3 |
| `src/lib/content/catalog.ts` | title: 'pH & Impedance Monitoring', subtitle: | title: 'Esophageal pH and Impedance-pH Monitoring', subtitle: | 3 |
| `src/lib/content/catalog.ts` | seoTitle: 'pH & Impedance Monitoring in Belo Horizonte', | seoTitle: 'Esophageal pH and Impedance-pH Monitoring in Belo Horizonte', | 3 |
| `src/lib/content/catalog.ts` | '24-hour esophageal pH monitoring and impedance testing in Belo Horizonte. | '24-hour esophageal pH monitoring and impedance-pH monitoring in Belo Horizonte. | 3 |
| `src/lib/content/catalog.ts` | 'Impedance monitoring detects reflux | 'Impedance-pH monitoring detects reflux | 3 |
| `src/lib/content/catalog.ts` | title: 'pHmetría e Impedancia', subtitle: | title: 'pHmetría e ImpedanciopHmetría Esofágica', subtitle: | 3 |
| `src/lib/content/catalog.ts` | seoTitle: 'pHmetría e Impedancia en Belo Horizonte', | seoTitle: 'pHmetría e ImpedanciopHmetría Esofágica en Belo Horizonte', | 3 |
| `src/lib/content/catalog.ts` | 'pHmetría esofágica de 24 horas e impedancia en Belo Horizonte. | 'pHmetría esofágica e impedanciopHmetría esofágica (24h) en Belo Horizonte. | 3 |
| `src/lib/content/catalog.ts` | 'La impedancia detecta reflujo | 'La impedanciopHmetría detecta reflujo | 3 |
| `src/lib/nuvete-data.ts` | objeto com id:      'halimetria', | (removido) | 3 |
| `src/lib/nuvete-data.ts` | \n- 💬 Halimetria e Sialometria |  | 3 |
| `src/lib/nuvete-data.ts` | \n- Halimetria e Sialometria: até 2 dias úteis |  | 3 |
| `src/lib/nuvete-data.ts` | - 🫁 Manometria Esofágica de Alta Resolução\n | - 🫁 Manometria Esofágica (alta resolução e convencional)\n | 3 |
| `src/lib/nuvete-data.ts` | - ⏱️ pHmetria Esofágica 24h\n | - ⏱️ pHmetria e impedanciopHmetria esofágica (24h)\n | 3 |
| `src/lib/nuvete-data.ts` | pHmetria e Impedanciopletismografia | pHmetria e impedanciopHmetria esofágica (24h) | 3 |
| `src/lib/nuvete-data.ts` | 'A NU.V.E.M tem um programa completo para diagnóstico e tratamento da halitose, com:\n\n🔬 Halimetria: quantificação objetiva dos compostos causadores\n💧 Sialometria:… | 'Na NU.V.E.M, a consulta de gastroenterologia investiga as causas digestivas da halitose (mau hálito), como refluxo, SIBO e H. pylori.\n\nA clínica não realiza halimet… | 3 · **validar** |
| `src/lib/nuvete-data.ts` | { label: '📋 Preparo halimetria', acao: 'preparo:halimetria' }, | { label: '🩺 Saiba mais', acao: 'link:/especialidades/halitose' },       { label: '📅 Agendar consulta', acao: 'whatsapp' }, | 3 |
| `src/app/api/route.ts` | 4. HALITOSE Diagnóstico e tratamento do mau hálito: - Halimetria · quantificação dos compostos voláteis causadores - Sialometria · avaliação do fluxo salivar - Abordag… | 4. HALITOSE Investigação das causas digestivas do mau hálito na consulta de gastroenterologia: - Refluxo, SIBO, H. pylori e outras causas gastrointestinais - Exames da… | 3 · **validar** |
| `src/app/api/route.ts` | HALIMETRIA E SIALOMETRIA: - Quantificação objetiva do mau hálito e avaliação salivar - Duração: 30–40 min - Preparo: não comer 3h antes, não escovar dentes 2h antes, s… |  | 3 |
| `src/app/api/route.ts` | - Manometria Esofágica de Alta Resolução - Manometria Anorretal - pHmetria Esofágica 24h e Impedanciopletismografia | - Manometria Esofágica de alta resolução (24 canais) e convencional (8 canais) - Manometria Anorretal - pHmetria esofágica e impedanciopHmetria esofágica (24h) | 3 |
| `src/app/api/route.ts` | MANOMETRIA ESOFÁGICA DE ALTA RESOLUÇÃO: | A clínica NÃO realiza halimetria, sialometria, endoscopia, colonoscopia nem ultrassom. Se perguntarem, diga isso com clareza e oriente a falar com o médico.  MANOMETRI… | 3 |
| `src/app/api/route.ts` | PHMETRIA ESOFÁGICA 24H + IMPEDÂNCIOMETRIA: | PHMETRIA ESOFÁGICA E IMPEDANCIOPHMETRIA ESOFÁGICA (24H): | 3 |
| `src/app/llms.txt/route.ts` | - **Halitose:** Diagnóstico multidisciplinar com halimetria e sialometria | - **Halitose:** Investigação das causas digestivas do mau hálito na consulta de gastroenterologia. A clínica não realiza halimetria nem sialometria. | 3 |
| `src/app/llms.txt/route.ts` | ### Halimetria e Sialometria - Quantificação objetiva de compostos sulfurados. Diagnóstico diferencial da halitose. Preparo: sem comida 3h, sem escovação 2h, sem enxag… |  | 3 |
| `src/app/llms.txt/route.ts` | ### Manometria de Alta Resolução - **Esofágica:** | ### Manometria - **Esofágica (alta resolução, 24 canais, ou convencional, 8 canais):** | 3 |
| `src/app/llms.txt/route.ts` | ### pHmetria e Impedânciometria | ### pHmetria e ImpedanciopHmetria Esofágica (24h) | 3 |
| `next.config.ts` |   'preparo-halimetria-sialometria',  |  | 3 |
| `next.config.ts` | { source: '/halimetria',                                                      destination: '/exames/halimetria-sialometria' }, | { source: '/halimetria',                                                      destination: '/exames' }, | 3 |
| `next.config.ts` | { source: '/halimetria-e-sialometria',                                        destination: '/exames/halimetria-sialometria' }, | { source: '/halimetria-e-sialometria',                                        destination: '/exames' }, | 3 |
| `next.config.ts` |   'preparo-halimetria',   'preparo-halimetria-e-sialometria',  |  | 3 |
| `next.config.ts` | const nextConfig: NextConfig = { | /**  * Halimetria e sialometria saíram do site (decisão da clínica em 06/11/2026).  * A página do exame volta para a lista de exames, na língua de origem; os  * PDFs d… | 3 |
| `next.config.ts` |       ...pdfsRenomeados,  |       ...halimetriaRemovida,       ...pdfsRenomeados,  | 3 |
| `docs/utm-links-bio.md` | https://www.nuvemmedicina.com.br/exames/halimetria-sialometria?utm_source=instagram&utm_medium=social&utm_campaign=stories&utm_content=halimetria-sialometria   |  | 3 |
| `messages/pt-BR.json` | nav.halimetriaSialometria | (removido) | 3 |
| `messages/pt-BR.json` · `nav.phmetriaImpedanciometria` | pHmetria e Impedânciometria | pHmetria e ImpedanciopHmetria | 3 |
| `messages/pt-BR.json` · `footer.phmetriaImpedancia` | pHmetria e Impedância | pHmetria e ImpedanciopHmetria | 3 |
| `messages/pt-BR.json` · `examesPage.metaDescription` | Manometria esofágica e anorretal de alta resolução, pHmetria, testes respiratórios, halimetria e avaliação pélvica em Belo Horizonte. Certificação ISO 9001. | Manometria esofágica de alta resolução e convencional, manometria anorretal, pHmetria e impedanciopHmetria, testes respiratórios e avaliação pélvica em Belo Horizonte.… | 3 |
| `messages/en.json` | nav.halimetriaSialometria | (removido) | 3 |
| `messages/en.json` · `nav.phmetriaImpedanciometria` | pH & Impedance Monitoring | pH and Impedance-pH Monitoring | 3 |
| `messages/en.json` · `footer.phmetriaImpedancia` | pH & Impedance Monitoring | pH and Impedance-pH Monitoring | 3 |
| `messages/en.json` · `examesPage.metaDescription` | High-resolution esophageal and anorectal manometry, pH monitoring, breath tests, halimetry and pelvic assessment in Belo Horizonte. ISO 9001 certified. | High-resolution and conventional esophageal manometry, anorectal manometry, pH and impedance-pH monitoring, breath tests and pelvic assessment in Belo Horizonte. Manag… | 3 |
| `messages/es.json` | nav.halimetriaSialometria | (removido) | 3 |
| `messages/es.json` · `nav.phmetriaImpedanciometria` | pHmetría e Impedancia | pHmetría e ImpedanciopHmetría | 3 |
| `messages/es.json` · `footer.phmetriaImpedancia` | pHmetría e Impedancia | pHmetría e ImpedanciopHmetría | 3 |
| `messages/es.json` · `examesPage.metaDescription` | Manometría esofágica y anorrectal de alta resolución, pHmetría, pruebas respiratorias, halimetría y evaluación pélvica en Belo Horizonte. Certificación ISO 9001. | Manometría esofágica de alta resolución y convencional, manometría anorrectal, pHmetría e impedanciopHmetría, pruebas respiratorias y evaluación pélvica en Belo Horizo… | 3 |
| `public/pdfs/preparo-halimetria-sialometria-v1.pdf` | arquivo | (removido) | 3 |

---

## Bloco 4 · Domínio, URLs antigas e indexação

### Já estava certo (sem mudança)

- `metadataBase` e `SITE_URL` apontam para `https://www.nuvemmedicina.com.br`.
- Canonical e hreflang (pt-BR, en, es, x-default) em todas as páginas traduzidas, pelo `localizedAlternates`; páginas só em português têm canonical próprio.
- O domínio sem www já responde 308 para o www na Vercel, mantendo o caminho (item 4.2 saiu do escopo).
- URLs com barra no final redirecionam (308) para a versão sem barra.
- `/obrigado` e as páginas da anamnese já tinham noindex; o sitemap já não listava páginas internas.
- 79 redirects permanentes existentes cobriam a maior parte da tabela de URLs do WordPress.

### O que mudou

| Arquivo | Mudança |
|---|---|
| `src/middleware.ts` | `/en/exames/preparos` e `/es/exames/preparos` voltam para `/exames/preparos` (a página só existe em português e já tinha canonical pt). `/biosseguranca-procedimento-operacional-padrao` responde **410** com `X-Robots-Tag: noindex`. |
| `src/app/sitemap.ts` | `/exames/preparos` sai do grupo traduzido (sem entradas en/es nem hreflang) e entra no grupo só em português. |
| `src/app/studio/layout.tsx` | `robots: noindex, nofollow` no Studio. |
| `next.config.ts` · `headers` | `X-Robots-Tag: noindex, nofollow` em `/api/*`, `/studio` e `/studio/*` também em produção (antes só nos previews). |
| `next.config.ts` · `redirects` | 6 redirects avulsos, 28 de slugs com erro, 39 de artigos antigos sem par (detalhes abaixo). Todos 308. |

O redirect de `/en/exames/preparos` usa **307**, o mesmo das outras páginas só em português no middleware, pensado para quando a página for traduzida. Os redirects do `next.config.ts` são todos 308.

### /wp-content: bloqueado pelo Firewall, de propósito

`/wp-content/uploads/...` (inclusive `2021/09`, `2024` e os PDFs de `2026`) responde **403** com `X-Vercel-Mitigated: deny`: o Firewall da Vercel barra a requisição antes de ela chegar ao site. O Google trata 403 como 404 e retira os arquivos do índice. A regra fica como está, porque também protege o site de robôs que procuram o WordPress antigo. Por isso **não** foram criados o 410 para `2021/09` e `2024` nem o redirect de `2026`: seria código que nunca roda. Para acelerar a retirada, use a remoção temporária do Search Console pelo prefixo `/wp-content/uploads/2021/09/`.

### Redirects avulsos criados

| De | Para |
|---|---|
| `/eleve-sua-carreira-na-saude-nuvem-ensino` | `/ensino` |
| `/category/dra-vera-angelo` | `/dra-vera-angelo` (antes ia para `/blog` pela regra geral) |
| `/category/nuvem-ensino` | `/ensino` (antes ia para `/blog`) |
| `/profissionais-parceiros` | `/equipe` (antes `/sobre`) |
| `/preparos-for-exames` | `/exames/preparos` |
| `/avaliacao-nuvem-medicina` | `/avaliacao` |

Já existiam e continuam: `/equipe/dra-vera` → `/dra-vera-angelo` e `/youtube` → canal `youtube.com/@NuvemMedicina`.

### Slugs com erro de digitação

Não existem no Sanity nem em link interno: vêm de links externos. Os 25 da lista do Search Console e `/exames/testes-respiratorios-sibo-e-h-pylori-em-bh` → `/exames/testes-respiratorios` foram criados. As duas variantes com "relação" entram também na forma codificada (`rela%C3%A7%C3%A3o`), total de 28 regras. Nenhum slug publicado mudou.

### Artigos antigos na raiz (lista do Search Console)

| Slug antigo (raiz) | Destino | Critério | Motivo |
|---|---|---|---|
| `/flatulencia-um-tabu-social-nuvem-medicina` | `/blog/inchaco-e-distensao-abdominal-abordagem-atualizada-roma-v` | artigo de tema parecido | gases e distensão abdominal: artigo de inchaço e distensão (Roma V) |
| `/existe-relacao-entre-uso-de-inibidores-de-bomba-de-protons-ibps-e-demencia` | `/blog/existe-relacao-entre-uso-de-inibidores-de-bomba-de-protons-ibps-e-demencia` | mesmo slug no Sanity (já existia) | mesmo slug no Sanity; redirect já existia |
| `/disfagia-secundaria-a-clozapina-uma-relacao-negligenciada` | `/exames/manometria-esofagica` | página de exame | sem artigo sobre disfagia; a manometria esofágica investiga disfagia |
| `/intolerancia-a-sacarose-e-sintomas-inexplicaveis-do-trato-gastrointestinal` | `/blog/teste-respiratorio-sibo-imo-intolerancias` | artigo de tema parecido | intolerância a carboidratos: artigo de teste respiratório e intolerâncias |
| `/disfagia-globus-tosse-cronica-laringofaringea` | `/exames/phmetria-impedanciometria` | página de exame | sem artigo; refluxo laringofaríngeo é investigado com impedanciopHmetria |
| `/impacto-do-uso-de-probioticos-nas-prostatites` | `/blog` | /blog (último caso) | tema urológico, sem artigo, exame ou especialidade próximos |
| `/voce-ja-ouviu-falar-sobre-os-dilemas-da-vida-celiaca` | `/blog/vida-celiaca-em-casa-com-gluten-como-sobreviver-e-viver-bem-dividindo-a-cozinha` | artigo de tema parecido | vida com doença celíaca: artigo Vida celíaca em casa |
| `/dez-equivocos-no-diagnostico-das-intolerancias-a-carboidratos-2` | `/blog/teste-respiratorio-sibo-imo-intolerancias` | artigo de tema parecido | diagnóstico das intolerâncias a carboidratos: artigo de teste respiratório |
| `/candidiase-de-repeticao-qual-a-relacao-com-o-intestino` | `/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino` | mesmo slug no Sanity (já existia) | mesmo slug no Sanity; redirect já existia |
| `/reacao-adversa-aos-salicilatos-alimentares` | `/blog/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica` | artigo de tema parecido | intolerância a substância química dos alimentos: artigo de intolerância à histamina |
| `/intolerancia-a-lactose-e-supercrescimento-bacteriano-do-intestino-delgado` | `/blog/intolerancia-a-lactose-e-supercrescimento-bacteriano-do-intestino-delgado` | mesmo slug no Sanity (já existia) | mesmo slug no Sanity; redirect já existia |
| `/supercrescimento-fungico-intestinal-uma-condicao-patologica-pouco-conhecida` | `/blog/sibo-supercrescimento-bacteriano-no-intestino-delgado-guia-completo` | artigo de tema parecido | supercrescimento intestinal (SIFO): guia completo de SIBO |
| `/cepa-probiotica-para-saude-gastrointestinal` | `/blog/a-suplementacao-de-probioticos-para-o-tratamento-de-h-pylori-visando-minimizar-os-efeitos` | artigo de tema parecido | probióticos na saúde digestiva: único artigo sobre probióticos |
| `/incoordenacao-abdomino-anal-nas-desordens-da-evacuacao` | `/blog/incoordenacao-abdomino-anal-nas-desordens-da-evacuacao` | mesmo slug no Sanity (já existia) | mesmo slug no Sanity; redirect já existia |
| `/efetividade-da-osteopatia-na-constipacao-refrataria-por-ptose-do-colon-transverso` | `/blog/efetividade-da-osteopatia-na-constipacao-refrataria-por-ptose-do-colon-transverso` | mesmo slug no Sanity (já existia) | mesmo slug no Sanity; redirect já existia |
| `/transtorno-alimentar-restritivo-evitativo-tare` | `/blog` | /blog (último caso) | transtorno alimentar com componente de saúde mental; redirect para Pediatria sugeriria que a clínica trata o transtorno |
| `/disbiose-doencas-inflamatorias-intestinais` | `/especialidades/gastroenterologia` | página de especialidade | sem artigo; a Gastroenterologia trata doenças inflamatórias intestinais |
| `/sindrome-de-hiperemese-por-canabinoides` | `/blog/sindrome-de-hiperemese-por-canabinoides-como-diferenciar-do-vomito-ciclico` | mesmo slug no Sanity (já existia) | mesmo artigo revisado; redirect já existia |
| `/leaky-gut-syndrome-o-que-sabemos-sobre-ela` | `/especialidades/gastroenterologia` | página de especialidade | sem artigo; tema de gastroenterologia |
| `/mulungu-e-sua-atividade-antimicrobiana-na-cavidade-oral` | `/blog` | /blog (último caso) | cavidade oral; a página de halitose está pendente, por isso não foi usada |
| `/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica` | `/blog/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica` | mesmo slug no Sanity (já existia) | mesmo slug no Sanity; redirect já existia |
| `/sindrome-do-intestino-irritavel-e-a-relacao-com-a-saude-e-a-autoestima-da-mulher` | `/blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro` | artigo de tema parecido | síndrome do intestino irritável é um DGBI: artigo O que é DGBI |
| `/como-o-uso-de-probioticos-pode-auxiliar-na-prevencao-de-vaginose-bacteriana-recorrente` | `/blog` | /blog (último caso) | tema ginecológico, sem artigo, exame ou especialidade próximos |
| `/title-regurgitacao-infantil` | `/especialidades/pediatria` | página de especialidade | sem artigo; a Pediatria trata refluxo infantil |
| `/alergia-alfa-gal-e-anafilaxia-tardia-a-carne-vermelha-que-sindrome-e-essa` | `/blog` | /blog (último caso) | alergia alimentar, sem artigo, exame ou especialidade próximos |
| `/como-os-probioticos-topicos-podem-auxiliar-no-tratamento-dermatologico` | `/blog` | /blog (último caso) | tema dermatológico, sem artigo, exame ou especialidade próximos |
| `/gastroparesia-por-canabinoides-o-que-se-sabe` | `/blog/sindrome-de-hiperemese-por-canabinoides-como-diferenciar-do-vomito-ciclico` | artigo de tema parecido | efeito digestivo dos canabinoides: artigo de hiperêmese por canabinoides |
| `/treinamento-vesical-bexiga-hiperativa` | `/especialidades/fisioterapia-pelvica` | página de especialidade | sem artigo; a Fisioterapia Pélvica trata incontinência urinária |
| `/diarreia-do-viajante-no-pos-pandemia` | `/especialidades/gastroenterologia` | página de especialidade | sem artigo; tema de gastroenterologia |
| `/atualizacao-do-manejo-da-doenca-do-refluxo-gastroesofagico-refrataria` | `/exames/phmetria-impedanciometria` | página de exame | o artigo de refluxo do Sanity é sobre osteopatia; o refluxo refratário é investigado com impedanciopHmetria |
| `/sindrome-latex-fruta-como-diagnosticar-e-tratar` | `/blog` | /blog (último caso) | alergia, sem artigo, exame ou especialidade próximos |
| `/existe-vantagem-de-probiotico-multicepas-x-cepa-unica` | `/blog/a-suplementacao-de-probioticos-para-o-tratamento-de-h-pylori-visando-minimizar-os-efeitos` | artigo de tema parecido | escolha de probióticos: único artigo sobre probióticos |
| `/roma-atualizacao-sobre-inchaco-e-distensao-abdominal` | `/blog/inchaco-e-distensao-abdominal-abordagem-atualizada-roma-v` | mesmo slug no Sanity (já existia) | mesmo artigo revisado; redirect já existia |
| `/o-que-e-incontinencia-fecal` | `/blog/o-que-e-incontinencia-fecal` | mesmo slug no Sanity (já existia) | mesmo slug no Sanity; redirect já existia |
| `/gluten-e-risco-de-neoplasias-gastrointestinais` | `/blog/vida-celiaca-em-casa-com-gluten-como-sobreviver-e-viver-bem-dividindo-a-cozinha` | artigo de tema parecido | glúten e doença celíaca: artigo Vida celíaca em casa |
| `/deficiencia-de-taurina-como-fator-de-envelhecimento` | `/blog/microbioma-intestinal-e-longevidade` | artigo de tema parecido | envelhecimento: artigo Microbioma intestinal e longevidade |
| `/microbioma-intestinal-e-longevidade` | `/blog/microbioma-intestinal-e-longevidade` | mesmo slug no Sanity (já existia) | mesmo slug no Sanity; redirect já existia |
| `/h-pylori-novas-perspectivas-com-lgg-podcast` | `/blog/a-suplementacao-de-probioticos-para-o-tratamento-de-h-pylori-visando-minimizar-os-efeitos` | artigo de tema parecido | H. pylori e probiótico (LGG): artigo de probióticos no tratamento do H. pylori |
| `/uso-prolongado-de-inibidores-de-bomba-de-protons-mitos-e-verdades` | `/blog/existe-relacao-entre-uso-de-inibidores-de-bomba-de-protons-ibps-e-demencia` | artigo de tema parecido | uso prolongado de IBP: artigo IBP e demência |
| `/o-uso-de-probioticos-na-dor-abdominal-funcional-pode-ser-benefico` | `/blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro` | artigo de tema parecido | dor abdominal funcional é um DGBI: artigo O que é DGBI |
| `/e-possivel-atuar-na-microbiota-de-pacientes-com-dermatite-atopica` | `/blog` | /blog (último caso) | tema dermatológico, sem artigo, exame ou especialidade próximos |
| `/transtorno-comportamental-disbiose-intestinal` | `/blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro` | artigo de tema parecido | eixo intestino-cérebro: artigo O que é DGBI |
| `/efeitos-das-preferencias-alimentares-na-composicao-de-microbiota` | `/blog/microbioma-intestinal-e-longevidade` | artigo de tema parecido | microbiota intestinal: artigo Microbioma intestinal e longevidade |
| `/impacto-dos-probioticos-no-tratamento-e-na-prevencao-de-doencas-comuns-na-infancia` | `/especialidades/pediatria` | página de especialidade | sem artigo; saúde digestiva infantil |
| `/roupa-intima-inteligente-microbiota` | `/blog` | /blog (último caso) | tema sem artigo, exame ou especialidade próximos |
| `/influencia-da-microbiota-nas-escolhas-alimentares` | `/blog/microbioma-intestinal-e-longevidade` | artigo de tema parecido | microbiota intestinal: artigo Microbioma intestinal e longevidade |
| `/doenca-celiaca-e-a-dieta-sem-gluten` | `/blog/vida-celiaca-em-casa-com-gluten-como-sobreviver-e-viver-bem-dividindo-a-cozinha` | artigo de tema parecido | dieta sem glúten: artigo Vida celíaca em casa |
| `/risco-de-obesidade-e-disbiose-podcast` | `/blog/microbioma-intestinal-e-longevidade` | artigo de tema parecido | disbiose e microbiota: artigo Microbioma intestinal e longevidade |
| `/brain-fog-disbiose-e-probioticos-o-que-ha-de` | `/blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro` | artigo de tema parecido | eixo intestino-cérebro: artigo O que é DGBI; slug truncado no Search Console, o redirect cobre o começo e o resto |

URL que não ganhou destino: nenhuma. Os 8 que foram para `/blog` não têm artigo, exame nem especialidade de tema próximo.

### Amostra testada com curl (servidor local, 08/11/2026)

Primeiro salto e destino final, seguindo a cadeia.

| URL | Primeiro salto | Final | Saltos |
|---|---|---|---|
| `/teste-respiratorio-de-hidrogenio-e-metano/` | 308 → `/teste-respiratorio-de-hidrogenio-e-metano` | 200 `/exames/testes-respiratorios` | 2 |
| `/preparo-manometria-anorretal/` | 308 → `/preparo-manometria-anorretal` | 200 `/exames/preparos` | 2 |
| `/halimetria-e-sialometria/` | 308 → `/halimetria-e-sialometria` | 200 `/exames` | 2 |
| `/ph-impedanciometria-esofagica/` | 308 → `/ph-impedanciometria-esofagica` | 200 `/exames/phmetria-impedanciometria` | 2 |
| `/agende-sua-consulta/` | 308 → `/agende-sua-consulta` | 200 `/agendar` | 2 |
| `/category/dra-vera-angelo/` | 308 → `/category/dra-vera-angelo` | 200 `/dra-vera-angelo` | 2 |
| `/category/nuvem-ensino/` | 308 → `/category/nuvem-ensino` | 200 `/ensino` | 2 |
| `/category/outra-categoria/` | 308 → `/category/outra-categoria` | 200 `/blog` | 2 |
| `/profissionais-parceiros/` | 308 → `/profissionais-parceiros` | 200 `/equipe` | 2 |
| `/eleve-sua-carreira-na-saude-nuvem-ensino/` | 308 → `/eleve-sua-carreira-na-saude-nuvem-ensino` | 200 `/ensino` | 2 |
| `/equipe/dra-vera` | 308 → `/dra-vera-angelo` | 200 `/dra-vera-angelo` | 1 |
| `/preparos-for-exames` | 308 → `/exames/preparos` | 200 `/exames/preparos` | 1 |
| `/avaliacao-nuvem-medicina/` | 308 → `/avaliacao-nuvem-medicina` | 200 `/avaliacao` | 2 |
| `/2021/09/` | 308 → `/2021/09` | 200 `/blog` | 2 |
| `/candidiase-de-repeticao-qual-a-relacao-com-o-intestino/` | 308 → `/candidiase-de-repeticao-qual-a-relacao-com-o-intestino` | 200 `/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino` | 2 |
| `/blog/candidiase-de-repetica-qual-a-relacao-com-o-intestino` | 308 → `/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino` | 200 `/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino` | 1 |
| `/blog/candidiase-de-repeticao-qual-a-rela%C3%A7%C3%A3o-com-o-intestino` | 308 → `/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino` | 200 `/blog/candidiase-de-repeticao-qual-a-relacao-com-o-intestino` | 1 |
| `/blog/intolerancia-a-histamina-fique-atento-a-chegar-esta-condicao-patologica` | 308 → `/blog/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica` | 200 `/blog/intolerancia-a-histamina-fique-atento-a-esta-condicao-patologica` | 1 |
| `/exames/testes-respiratorios-sibo-e-h-pylori-em-bh` | 308 → `/exames/testes-respiratorios` | 200 `/exames/testes-respiratorios` | 1 |
| `/flatulencia-um-tabu-social-nuvem-medicina/` | 308 → `/flatulencia-um-tabu-social-nuvem-medicina` | 200 `/blog/inchaco-e-distensao-abdominal-abordagem-atualizada-roma-v` | 2 |
| `/brain-fog-disbiose-e-probioticos-o-que-ha-de-novo` | 308 → `/blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro` | 200 `/blog/o-que-e-dgbi-disturbio-interacao-intestino-cerebro` | 1 |
| `/transtorno-alimentar-restritivo-evitativo-tare/` | 308 → `/transtorno-alimentar-restritivo-evitativo-tare` | 200 `/blog` | 2 |
| `/biosseguranca-procedimento-operacional-padrao/` | 308 → `/biosseguranca-procedimento-operacional-padrao` | 410 `/biosseguranca-procedimento-operacional-padrao` | 1 |
| `/en/exames/preparos` | 307 → `/exames/preparos` | 200 `/exames/preparos` | 1 |
| `/exames/halimetria-sialometria` | 308 → `/exames` | 200 `/exames` | 1 |

| URL | Cabeçalho |
|---|---|
| `/api/avaliacao` | `X-Robots-Tag: noindex, nofollow` |
| `/studio` | `X-Robots-Tag: noindex, nofollow` |
| `/biosseguranca-procedimento-operacional-padrao` | `x-robots-tag: noindex` |

Sitemap local: 87 URLs, todas com www, sem halimetria, sem páginas internas, `/exames/preparos` só em português.

---

## Bloco 5 · Formulário de agendamento

No GA4, `/agendar` teve 207 usuários e `/obrigado` ("Solicitação Recebida"), 5.
Nenhum campo foi alterado. A única mudança de código veio do Bloco 1:
`servico_interesse` leva só o tipo do atendimento.

### Como o fluxo funciona (lido no código e testado no servidor local)

1. A pessoa preenche nome (obrigatório), telefone (obrigatório), e-mail
   (opcional), serviço (obrigatório) e mensagem (opcional).
2. **Validação**: sem nome, telefone ou serviço, os campos ficam vermelhos e
   nada acontece. Testado: envio vazio não gera evento.
3. **Envio**: o formulário **não manda os dados para servidor nenhum**. Ele abre
   `wa.me/553197261029` com uma mensagem pronta ("Olá! Gostaria de agendar...
   Nome, Telefone, Serviço, Mensagem"). Os dados só chegam à clínica se a
   pessoa tocar em **enviar** dentro do WhatsApp.
4. **Evento**: `envio_agendamento` sai **uma vez** por envio, com
   `servico_interesse` (consulta, exame, fisioterapia ou ensino),
   `origem_pagina` e `whatsapp_abriu`. Nome, telefone, e-mail e mensagem não
   entram no dataLayer. Testado: `{"servico_interesse":"exame","origem_pagina":"/agendar","whatsapp_abriu":false}`
   (falso só porque o teste bloqueou a janela).
5. **Redirecionamento**: depois de 800 ms a aba do site vai para `/obrigado`,
   que emite `pagina_obrigado` uma vez. Testado.

### A queda de 207 para 5 é falha técnica ou comportamento?

As duas coisas, e o número de `/obrigado` não mede agendamentos:

- **Medição (técnico).** O page_view de `/obrigado` depende da navegação dentro
  do site depois que o WhatsApp abre. No celular, o WhatsApp é aberto como
  aplicativo e o navegador vai para segundo plano: o navegador costuma pausar
  os timers da aba, a navegação para `/obrigado` pode só acontecer quando a
  pessoa volta (ou nunca) e o page_view não sai. Some-se a isso a falha do
  page_view após o consentimento (Bloco 1).
- **Comportamento (real).** A própria página `/agendar` oferece telefone e
  WhatsApp direto ao lado do formulário, e o site tem o botão flutuante de
  WhatsApp. Parte das 207 pessoas agenda por esses canais, que contam como
  `clique_whatsapp` e `clique_telefone`, e não passam por `/obrigado`.
- **O evento certo para medir é `envio_agendamento`**, mas hoje ele está
  inflado pela tag do GTM que registra as conversas da nuvete com esse nome
  (TRACKING.md, 5.1). Só depois dessa correção dá para ler a taxa real
  (envios ÷ usuários de `/agendar`).

### Pontos para sua decisão (não alterados)

| Ponto | Situação | Sugestão |
|---|---|---|
| "Solicitação enviada!" e "Nossa equipe responde em até 24h" | A mensagem aparece antes de qualquer envio: quem não tocar em enviar no WhatsApp acha que agendou, e a clínica nunca recebe. | Trocar por algo como "Confirme o envio no WhatsApp para concluir a solicitação." |
| Campo **E-mail** | É pedido, mas não entra na mensagem do WhatsApp nem vai para lugar nenhum. | Pela LGPD (minimização), retirar o campo ou passar a usá-lo. |
| Placeholder da mensagem: "Descreva brevemente sua necessidade…" | Convida a pessoa a escrever sintomas, que vão no texto do WhatsApp para a clínica (não para o GA4). | Trocar por algo neutro, como "Melhor dia e horário para contato (opcional)". |
| Serviço de interesse | Necessário para agendar; vai só no texto do WhatsApp, e o dataLayer recebe apenas o tipo. | Manter. |

O formulário não pede outro dado de saúde além do serviço e da mensagem livre opcional.

---

## Textos marcados para validação da Dra. Vera

### Bloco 2a

1. `src/lib/content/exames-resp-extra.ts`
   - Antes: 'O primeiro equipamento nacional para
   - Depois: 'Equipamento nacional para
2. `src/lib/content/exames-resp-extra.ts`
   - Antes: , diferenciando quadros de SIBO, IMO e outras disbioses com precisão superior aos aparelhos tradicionais.
   - Depois: , o que ajuda o médico a investigar quadros de SIBO, IMO e outras disbioses.
3. `src/lib/content/exames-resp-extra.ts`
   - Antes: 'The first Brazilian-made equipment for
   - Depois: 'Brazilian-made equipment for
4. `src/lib/content/exames-resp-extra.ts`
   - Antes: , differentiating SIBO, IMO and other dysbioses with greater precision than traditional devices.
   - Depois: , which helps the physician investigate SIBO, IMO and other dysbioses.
5. `src/lib/content/exames-resp-extra.ts`
   - Antes: 'El primer equipo nacional para
   - Depois: 'Equipo nacional para
6. `src/lib/content/exames-resp-extra.ts`
   - Antes: , diferenciando cuadros de SIBO, IMO y otras disbiosis con una precisión superior a los equipos tradicionales.
   - Depois: , lo que ayuda al médico a investigar cuadros de SIBO, IMO y otras disbiosis.
7. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Doenças Inflamatórias e Funcionais'
   - Depois: 'Doenças Inflamatórias Intestinais'
8. `src/lib/content/especialidades-detail.ts`
   - Antes: 'SIBO e IMO têm cura?'
   - Depois: 'Como é o tratamento de SIBO e IMO?'
9. `src/lib/content/especialidades-detail.ts`
   - Antes: , com bons resultados na maioria dos casos quando acompanhado adequadamente por um especialista.
   - Depois: , sempre com acompanhamento médico. A resposta ao tratamento varia de pessoa para pessoa.
10. `src/lib/content/especialidades-detail.ts`
   - Antes: distúrbios digestivos funcionais tratados com biofeedback
   - Depois: distúrbios da interação cérebro-intestino (DGBI) tratados com biofeedback
11. `src/lib/content/especialidades-detail.ts`
   - Antes: Abordagem única na NU.V.E.M que combina gastroenterologia e fisioterapia pélvica para resultados superiores em casos
   - Depois: Abordagem da NU.V.E.M que combina gastroenterologia e fisioterapia pélvica nos casos
12. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Existe tratamento definitivo para halitose?'
   - Depois: 'Como é o tratamento da halitose?'
13. `src/lib/content/especialidades-detail.ts`
   - Antes: a melhora costuma ser significativa e duradoura.
   - Depois: o plano de tratamento é definido pelo médico para cada caso.
14. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Equipe com pediatra especialista em gastroenterologia pediátrica'
   - Depois: 'Equipe com pediatra com atuação em saúde digestiva infantil'
15. `src/lib/content/especialidades-detail.ts`
   - Antes: Nossa equipe inclui gastroenterologista especializada em pediatria e cirurgiãs pediátricas
   - Depois: Nossa equipe inclui médicas com atuação em saúde digestiva infantil e cirurgiãs pediátricas
16. `src/lib/content/especialidades-detail.ts`
   - Antes: , e permitem diagnóstico definitivo de condições que frequentemente passam despercebidas em investigações convencionais.
   - Depois: , e ajudam o médico a investigar condições que nem sempre aparecem em investigações convencionais.
17. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Diagnóstico definitivo por manometria
   - Depois: 'Auxilia no diagnóstico por manometria
18. `src/lib/content/especialidades-detail.ts`
   - Antes: determinante para decisão terapêutica
   - Depois: informação que apoia a decisão terapêutica
19. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Inflammatory and Functional Diseases'
   - Depois: 'Inflammatory Bowel Diseases'
20. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Are SIBO and IMO curable?'
   - Depois: 'How are SIBO and IMO treated?'
21. `src/lib/content/especialidades-detail.ts`
   - Antes: , with good results in most cases when properly followed by a specialist.
   - Depois: , always with medical follow-up. Response to treatment varies from person to person.
22. `src/lib/content/especialidades-detail.ts`
   - Antes: functional digestive disorders treated with biofeedback
   - Depois: disorders of gut-brain interaction (DGBI) treated with biofeedback
23. `src/lib/content/especialidades-detail.ts`
   - Antes: A unique approach at NU.V.E.M combining gastroenterology and pelvic physical therapy for superior results in cases
   - Depois: An approach at NU.V.E.M combining gastroenterology and pelvic physical therapy in cases
24. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Is there a definitive treatment for halitosis?'
   - Depois: 'How is halitosis treated?'
25. `src/lib/content/especialidades-detail.ts`
   - Antes: improvement is usually significant and lasting.
   - Depois: the treatment plan is defined by the physician for each case.
26. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Team includes a pediatrician specialized in pediatric gastroenterology'
   - Depois: 'Team includes a pediatrician working in children’s digestive health'
27. `src/lib/content/especialidades-detail.ts`
   - Antes: Our team includes a gastroenterologist specialized in pediatrics and pediatric surgeons
   - Depois: Our team includes physicians working in children’s digestive health and pediatric surgeons
28. `src/lib/content/especialidades-detail.ts`
   - Antes: , allowing a definitive diagnosis of conditions that often go unnoticed in conventional investigations.
   - Depois: , and help the physician investigate conditions that do not always show up in conventional investigations.
29. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Definitive diagnosis via high-resolution
   - Depois: 'Supports diagnosis via high-resolution
30. `src/lib/content/especialidades-detail.ts`
   - Antes: decisive for treatment choice
   - Depois: information that supports the treatment decision
31. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Enfermedades Inflamatorias y Funcionales'
   - Depois: 'Enfermedades Inflamatorias Intestinales'
32. `src/lib/content/especialidades-detail.ts`
   - Antes: '¿El SIBO y el IMO tienen cura?'
   - Depois: '¿Cómo se tratan el SIBO y el IMO?'
33. `src/lib/content/especialidades-detail.ts`
   - Antes: , con buenos resultados en la mayoría de los casos cuando se realiza un seguimiento adecuado con un especialista.
   - Depois: , siempre con seguimiento médico. La respuesta al tratamiento varía de una persona a otra.
34. `src/lib/content/especialidades-detail.ts`
   - Antes: trastornos digestivos funcionales tratados con biofeedback
   - Depois: trastornos de la interacción cerebro-intestino (DGBI) tratados con biofeedback
35. `src/lib/content/especialidades-detail.ts`
   - Antes: Enfoque único en NU.V.E.M que combina gastroenterología y fisioterapia pélvica para resultados superiores en casos
   - Depois: Enfoque de NU.V.E.M que combina gastroenterología y fisioterapia pélvica en casos
36. `src/lib/content/especialidades-detail.ts`
   - Antes: '¿Existe un tratamiento definitivo para la halitosis?'
   - Depois: '¿Cómo se trata la halitosis?'
37. `src/lib/content/especialidades-detail.ts`
   - Antes: la mejora suele ser significativa y duradera.
   - Depois: el plan de tratamiento lo define el médico para cada caso.
38. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Equipo con pediatra especialista en gastroenterología pediátrica'
   - Depois: 'Equipo con pediatra con actuación en salud digestiva infantil'
39. `src/lib/content/especialidades-detail.ts`
   - Antes: Nuestro equipo incluye una gastroenteróloga especializada en pediatría y cirujanas pediátricas
   - Depois: Nuestro equipo incluye médicas con actuación en salud digestiva infantil y cirujanas pediátricas
40. `src/lib/content/especialidades-detail.ts`
   - Antes: , y permiten un diagnóstico definitivo de condiciones que frecuentemente pasan desapercibidas en investigaciones convencionales.
   - Depois: , y ayudan al médico a investigar condiciones que no siempre aparecen en investigaciones convencionales.
41. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Diagnóstico definitivo mediante manometría
   - Depois: 'Apoya el diagnóstico mediante manometría
42. `src/lib/content/especialidades-detail.ts`
   - Antes: determinante para la decisión terapéutica
   - Depois: información que apoya la decisión terapéutica
43. `src/lib/nuvete-data.ts`
   - Antes: Utilizamos testes respiratórios com H₂, CH₄ e H₂S, o protocolo mais completo disponível, sem coleta de sangue.
   - Depois: O teste mede H₂, CH₄ e H₂S no ar expirado, sem coleta de sangue.

### Bloco 3 · Página de halitose (texto completo, validação da Dra. Vera)

O texto novo sobre causas digestivas e encaminhamento para odontologia e
otorrinolaringologia é conteúdo clínico e precisa de validação. A permanência
da especialidade Halitose no site também está **pendente com a gestão**.
Abaixo, como a página está agora nas três línguas.

#### Português

**Card da especialidade:** Investigação das causas digestivas do mau hálito, com encaminhamento para odontologia e otorrinolaringologia quando a origem é oral ou nasofaríngea. · Áreas: Causas Digestivas, Refluxo e SIBO, Encaminhamento Integrado

**Abertura:** Avaliação da halitose com foco nas causas digestivas. Investigamos refluxo, SIBO, H. pylori e outras origens gastrointestinais, com encaminhamento para odontologia e otorrinolaringologia quando necessário.

**Introdução:**

> A halitose pode ter origem oral, nasofaríngea, sistêmica ou digestiva. Na NU.V.E.M, a consulta de gastroenterologia investiga as causas digestivas do mau hálito.
>
> Conforme a indicação médica, a investigação pode incluir exames realizados na clínica, como testes respiratórios e pHmetria. Quando a origem provável é oral ou nasofaríngea, a pessoa é orientada a procurar odontologia ou otorrinolaringologia.

**Sintomas (sem alteração):** Mau hálito persistente mesmo após higiene bucal rigorosa; Gosto amargo ou metálico na boca; Relatos de pessoas próximas sobre o hálito; Boca seca frequente (xerostomia); Azia, regurgitação ou eructação associada; Sensação de ardor ou saburra na língua; Histórico de problemas gástricos ou intestinais; Desconforto social por causa do hálito.

**Tópicos:**

- **Halitose Digestiva:** Investigação aprofundada de SIBO, gastroparesia, refluxo gastroesofágico e disbiose como causas de mau hálito de origem gastrointestinal, frequentemente subdiagnosticadas.
- **Avaliação Integrada:** Consulta que considera as possíveis origens do mau hálito (oral, digestiva, nasofaríngea e sistêmica) para orientar a investigação e os encaminhamentos.
- **Plano Terapêutico Individualizado:** Tratamento direcionado à causa identificada, combinando abordagem digestiva, orientações de higiene oral e encaminhamento para especialistas quando necessário.
- **Exames Digestivos:** Testes respiratórios (SIBO, IMO e H. pylori) e pHmetria podem ajudar o médico a investigar causas digestivas do mau hálito.

**Diferenciais:**

- Protocolo multidisciplinar para investigar a origem da halitose e tratar a causa
- Exames digestivos realizados na própria clínica, conforme a indicação médica
- Avaliação das possíveis origens oral, digestiva e sistêmica na consulta
- Plano terapêutico individualizado, com acompanhamento médico
- Gestão certificada pela norma ISO 9001

**Para médicos:** Recebemos encaminhamentos de gastroenterologistas, otorrinolaringologistas, cirurgiões-dentistas e clínicos gerais para investigação das causas digestivas da halitose. A avaliação inclui triagem das causas digestivas e planejamento terapêutico integrado.

- Investigação de SIBO, gastroparesia e DRGE como causas digestivas
- Parceria com odontologia para halitose oral confirmada
- Retorno ao médico solicitante com diagnóstico etiológico e plano terapêutico

**Médica indicada:** Dra. Vera Ângelo · Gastroenterologia · CRM-MG 22284

**Exames relacionados:** testes-respiratorios, phmetria-impedanciometria

**Perguntas frequentes:**

- **A halitose sempre tem origem na boca?** Não. A halitose pode ter causas digestivas, nasofaríngeas ou sistêmicas, por isso a consulta considera todas as possíveis origens e orienta os encaminhamentos.
- **Como é diagnosticada a causa da halitose?** Por meio da avaliação gastroenterológica e, quando indicado, de exames como testes respiratórios e pHmetria. Causas orais e nasofaríngeas são avaliadas por odontologia e otorrinolaringologia.
- **Como é o tratamento da halitose?** Depende da causa identificada. Tratando a origem, por exemplo, SIBO ou xerostomia, o plano de tratamento é definido pelo médico para cada caso.

#### Inglês

**Card da especialidade:** Investigation of the digestive causes of bad breath, with referral to dentistry and otolaryngology when the origin is oral or nasopharyngeal. · Áreas: Digestive Causes, Reflux and SIBO, Integrated Referral

**Abertura:** Halitosis evaluation focused on digestive causes. We investigate reflux, SIBO, H. pylori and other gastrointestinal origins, with referral to dentistry and otolaryngology when needed.

**Introdução:**

> Halitosis can have an oral, nasopharyngeal, systemic or digestive origin. At NU.V.E.M, the gastroenterology visit investigates the digestive causes of bad breath.
>
> As indicated by the physician, the investigation may include exams performed at the clinic, such as breath tests and pH monitoring. When the likely origin is oral or nasopharyngeal, the patient is advised to see a dentist or an otolaryngologist.

**Sintomas (sem alteração):** Persistent bad breath even after rigorous oral hygiene; Bitter or metallic taste in the mouth; People close to you commenting on your breath; Frequent dry mouth (xerostomia); Heartburn, regurgitation or belching; Burning sensation or coating on the tongue; History of gastric or intestinal problems; Social discomfort due to breath odor.

**Tópicos:**

- **Digestive Halitosis:** In-depth investigation of SIBO, gastroparesis, gastroesophageal reflux and dysbiosis as often underdiagnosed causes of gastrointestinal bad breath.
- **Integrated Evaluation:** A visit that considers the possible origins of bad breath (oral, digestive, nasopharyngeal and systemic) to guide the investigation and referrals.
- **Individualized Treatment Plan:** Treatment targeted at the identified cause, combining a digestive approach, oral hygiene guidance and referral to specialists when needed.
- **Digestive Exams:** Breath tests (SIBO, IMO and H. pylori) and pH monitoring can help the physician investigate digestive causes of bad breath.

**Diferenciais:**

- Multidisciplinary protocol to investigate the origin of halitosis and treat the cause
- Digestive exams performed at the clinic, as indicated by the physician
- Evaluation of possible oral, digestive and systemic origins during the visit
- Individualized treatment plan, with medical follow-up
- Management certified under ISO 9001

**Para médicos:** We receive referrals from gastroenterologists, otolaryngologists, dentists and general practitioners to investigate the digestive causes of halitosis. The evaluation includes screening for digestive causes and integrated treatment planning.

- Investigation of SIBO, gastroparesis and GERD as digestive causes
- Partnership with dentistry for confirmed oral halitosis
- Feedback to the referring physician with etiological diagnosis and treatment plan

**Médica indicada:** Dra. Vera Ângelo · Gastroenterology · CRM-MG 22284

**Exames relacionados:** testes-respiratorios, phmetria-impedanciometria

**Perguntas frequentes:**

- **Does halitosis always originate in the mouth?** No. Halitosis can have digestive, nasopharyngeal or systemic causes, which is why the visit considers every possible origin and guides referrals.
- **How is the cause of halitosis diagnosed?** Through a gastroenterological evaluation and, when indicated, exams such as breath tests and pH monitoring. Oral and nasopharyngeal causes are evaluated by dentistry and otolaryngology.
- **How is halitosis treated?** It depends on the identified cause. By treating the source, for example, SIBO or xerostomia, the treatment plan is defined by the physician for each case.

#### Espanhol

**Card da especialidade:** Investigación de las causas digestivas del mal aliento, con derivación a odontología y otorrinolaringología cuando el origen es oral o nasofaríngeo. · Áreas: Causas Digestivas, Reflujo y SIBO, Derivación Integrada

**Abertura:** Evaluación de la halitosis con foco en las causas digestivas. Investigamos reflujo, SIBO, H. pylori y otros orígenes gastrointestinales, con derivación a odontología y otorrinolaringología cuando es necesario.

**Introdução:**

> La halitosis puede tener origen oral, nasofaríngeo, sistémico o digestivo. En NU.V.E.M, la consulta de gastroenterología investiga las causas digestivas del mal aliento.
>
> Según la indicación médica, la investigación puede incluir exámenes realizados en la clínica, como pruebas respiratorias y pHmetría. Cuando el origen probable es oral o nasofaríngeo, se orienta a la persona a consultar odontología u otorrinolaringología.

**Sintomas (sem alteração):** Mal aliento persistente incluso después de una higiene bucal rigurosa; Sabor amargo o metálico en la boca; Comentarios de personas cercanas sobre el aliento; Boca seca frecuente (xerostomía); Acidez, regurgitación o eructos asociados; Sensación de ardor o saburra en la lengua; Antecedentes de problemas gástricos o intestinales; Malestar social por causa del aliento.

**Tópicos:**

- **Halitosis Digestiva:** Investigación profunda de SIBO, gastroparesia, reflujo gastroesofágico y disbiosis como causas de mal aliento de origen gastrointestinal, frecuentemente subdiagnosticadas.
- **Evaluación Integrada:** Consulta que considera los orígenes posibles del mal aliento (oral, digestivo, nasofaríngeo y sistémico) para orientar la investigación y las derivaciones.
- **Plan Terapéutico Individualizado:** Tratamiento dirigido a la causa identificada, combinando el abordaje digestivo, orientaciones de higiene oral y derivación a especialistas cuando es necesario.
- **Exámenes Digestivos:** Las pruebas respiratorias (SIBO, IMO y H. pylori) y la pHmetría pueden ayudar al médico a investigar causas digestivas del mal aliento.

**Diferenciais:**

- Protocolo multidisciplinario para investigar el origen de la halitosis y tratar la causa
- Exámenes digestivos realizados en la propia clínica, según la indicación médica
- Evaluación de los orígenes posibles oral, digestivo y sistémico en la consulta
- Plan terapéutico individualizado, con seguimiento médico
- Gestión certificada según la norma ISO 9001

**Para médicos:** Recibimos derivaciones de gastroenterólogos, otorrinolaringólogos, odontólogos y médicos generales para investigar las causas digestivas de la halitosis. La evaluación incluye el cribado de causas digestivas y la planificación terapéutica integrada.

- Investigación de SIBO, gastroparesia y ERGE como causas digestivas
- Colaboración con odontología para halitosis oral confirmada
- Retorno al médico derivante con diagnóstico etiológico y plan terapéutico

**Médica indicada:** Dra. Vera Ângelo · Gastroenterología · CRM-MG 22284

**Exames relacionados:** testes-respiratorios, phmetria-impedanciometria

**Perguntas frequentes:**

- **¿La halitosis siempre tiene origen en la boca?** No. La halitosis puede tener causas digestivas, nasofaríngeas o sistémicas, por eso la consulta considera todos los orígenes posibles y orienta las derivaciones.
- **¿Cómo se diagnostica la causa de la halitosis?** Mediante la evaluación gastroenterológica y, cuando está indicado, exámenes como pruebas respiratorias y pHmetría. Las causas orales y nasofaríngeas las evalúan odontología y otorrinolaringología.
- **¿Cómo se trata la halitosis?** Depende de la causa identificada. Al tratar el origen, por ejemplo, SIBO o xerostomía, el plan de tratamiento lo define el médico para cada caso.

### Bloco 3 · Demais trocas

1. `src/lib/data.ts`
   - Antes: desc: 'Diagnóstico multidisciplinar completo. Investigamos causas digestivas, orais e sistêmicas com halimetria de precisão.',     tags: ['Halimetria', 'Sialometria', 'Diagnóstico Integrado'],
   - Depois: desc: 'Investigação das causas digestivas do mau hálito, com encaminhamento para odontologia e otorrinolaringologia quando a origem é oral ou nasofaríngea.',     tags: ['Causas Digestivas', 'Refluxo e SIBO', 'Encaminhamento Integrado'],
2. `src/lib/content/catalog.ts`
   - Antes: desc:  'Complete multidisciplinary diagnosis. We investigate digestive, oral and systemic causes with precision halimetry.',     tags:  ['Halimetry', 'Sialometry', 'Integrated Diagnosis'] },
   - Depois: desc:  'Investigation of the digestive causes of bad breath, with referral to dentistry and otolaryngology when the origin is oral or nasopharyngeal.',     tags:  ['Digestive Causes', 'Reflux and SIBO', 'Integrated Referral'] },
3. `src/lib/content/catalog.ts`
   - Antes: desc:  'Diagnóstico multidisciplinario completo. Investigamos causas digestivas, orales y sistémicas con halimetría de precisión.',     tags:  ['Halimetría', 'Sialometría', 'Diagnóstico Integrado'] },
   - Depois: desc:  'Investigación de las causas digestivas del mal aliento, con derivación a odontología y otorrinolaringología cuando el origen es oral o nasofaríngeo.',     tags:  ['Causas Digestivas', 'Reflujo y SIBO', 'Derivación Integrada'] },
4. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Diagnóstico multidisciplinar completo da halitose. Investigamos causas digestivas, orais e sistêmicas com halimetria e sialometria de alta precisão.'
   - Depois: 'Avaliação da halitose com foco nas causas digestivas. Investigamos refluxo, SIBO, H. pylori e outras origens gastrointestinais, com encaminhamento para odontologia e otorrinolaringologia quando necessário.'
5. `src/lib/content/especialidades-detail.ts`
   - Antes: 'A halitose é uma condição complexa que exige abordagem multidisciplinar. Na NU.V.E.M, investigamos todas as origens possíveis: digestivas, orais, nasofaríngeas e sistêmicas, com protocolo diagnóstico completo e personalizado.'
   - Depois: 'A halitose pode ter origem oral, nasofaríngea, sistêmica ou digestiva. Na NU.V.E.M, a consulta de gastroenterologia investiga as causas digestivas do mau hálito.'
6. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Nossa abordagem combina halimetria quantitativa objetiva, sialometria, avaliação gastroenterológica completa e, quando necessário, parceria com odontologia e otorrinolaringologia, tudo no mesmo atendimento integrado.'
   - Depois: 'Conforme a indicação médica, a investigação pode incluir exames realizados na clínica, como testes respiratórios e pHmetria. Quando a origem provável é oral ou nasofaríngea, a pessoa é orientada a procurar odontologia ou otorrinolaringologia.'
7. `src/lib/content/especialidades-detail.ts`
   - Antes: { title: 'Protocolo Diagnóstico Integrado', body: 'Avaliação simultânea de todas as possíveis origens: oral, digestiva, nasofaríngea e sistêmica, com sequenciamento diagnóstico eficiente e preciso.' }
   - Depois: { title: 'Avaliação Integrada', body: 'Consulta que considera as possíveis origens do mau hálito (oral, digestiva, nasofaríngea e sistêmica) para orientar a investigação e os encaminhamentos.' }
8. `src/lib/content/especialidades-detail.ts`
   - Antes: { title: 'Acompanhamento Evolutivo', body: 'Monitoramento periódico com halimetria para avaliar resposta ao tratamento de forma objetiva, garantindo que a melhora seja documentada e sustentada.' }
   - Depois: { title: 'Exames Digestivos', body: 'Testes respiratórios (SIBO, IMO e H. pylori) e pHmetria podem ajudar o médico a investigar causas digestivas do mau hálito.' }
9. `src/lib/content/especialidades-detail.ts`
   - Antes: para investigação diagnóstica completa de halitose. O protocolo NU.V.E.M inclui halimetria, sialometria, triagem digestiva e planejamento terapêutico integrado.'
   - Depois: para investigação das causas digestivas da halitose. A avaliação inclui triagem das causas digestivas e planejamento terapêutico integrado.'
10. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Por meio de halimetria quantitativa, sialometria e avaliação gastroenterológica completa, com parceria com odontologia e otorrinolaringologia quando necessário.'
   - Depois: 'Por meio da avaliação gastroenterológica e, quando indicado, de exames como testes respiratórios e pHmetria. Causas orais e nasofaríngeas são avaliadas por odontologia e otorrinolaringologia.'
11. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Complete multidisciplinary diagnosis of halitosis. We investigate digestive, oral and systemic causes with precision halimetry and sialometry.'
   - Depois: 'Halitosis evaluation focused on digestive causes. We investigate reflux, SIBO, H. pylori and other gastrointestinal origins, with referral to dentistry and otolaryngology when needed.'
12. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Halitosis is a complex condition that requires a multidisciplinary approach. At NU.V.E.M, we investigate every possible origin: digestive, oral, nasopharyngeal and systemic, with a complete, personalized diagnostic protocol.'
   - Depois: 'Halitosis can have an oral, nasopharyngeal, systemic or digestive origin. At NU.V.E.M, the gastroenterology visit investigates the digestive causes of bad breath.'
13. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Our approach combines objective quantitative halimetry, sialometry, a complete gastroenterological evaluation and, when needed, partnership with dentistry and otolaryngology, all in the same integrated visit.'
   - Depois: 'As indicated by the physician, the investigation may include exams performed at the clinic, such as breath tests and pH monitoring. When the likely origin is oral or nasopharyngeal, the patient is advised to see a dentist or an otolaryngologist.'
14. `src/lib/content/especialidades-detail.ts`
   - Antes: { title: 'Integrated Diagnostic Protocol', body: 'Simultaneous evaluation of every possible origin: oral, digestive, nasopharyngeal and systemic, with efficient, precise diagnostic sequencing.' }
   - Depois: { title: 'Integrated Evaluation', body: 'A visit that considers the possible origins of bad breath (oral, digestive, nasopharyngeal and systemic) to guide the investigation and referrals.' }
15. `src/lib/content/especialidades-detail.ts`
   - Antes: { title: 'Progress Monitoring', body: 'Periodic monitoring with halimetry to objectively evaluate treatment response, ensuring improvement is documented and sustained.' }
   - Depois: { title: 'Digestive Exams', body: 'Breath tests (SIBO, IMO and H. pylori) and pH monitoring can help the physician investigate digestive causes of bad breath.' }
16. `src/lib/content/especialidades-detail.ts`
   - Antes: for a complete diagnostic investigation of halitosis. The NU.V.E.M protocol includes halimetry, sialometry, digestive screening and integrated treatment planning.'
   - Depois: to investigate the digestive causes of halitosis. The evaluation includes screening for digestive causes and integrated treatment planning.'
17. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Through quantitative halimetry, sialometry and a complete gastroenterological evaluation, with partnership with dentistry and otolaryngology when needed.'
   - Depois: 'Through a gastroenterological evaluation and, when indicated, exams such as breath tests and pH monitoring. Oral and nasopharyngeal causes are evaluated by dentistry and otolaryngology.'
18. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Diagnóstico multidisciplinario completo de la halitosis. Investigamos causas digestivas, orales y sistémicas con halimetría y sialometría de alta precisión.'
   - Depois: 'Evaluación de la halitosis con foco en las causas digestivas. Investigamos reflujo, SIBO, H. pylori y otros orígenes gastrointestinales, con derivación a odontología y otorrinolaringología cuando es necesario.'
19. `src/lib/content/especialidades-detail.ts`
   - Antes: 'La halitosis es una condición compleja que exige un abordaje multidisciplinario. En NU.V.E.M investigamos todos los orígenes posibles: digestivos, orales, nasofaríngeos y sistémicos, con un protocolo diagnóstico completo y personalizado.'
   - Depois: 'La halitosis puede tener origen oral, nasofaríngeo, sistémico o digestivo. En NU.V.E.M, la consulta de gastroenterología investiga las causas digestivas del mal aliento.'
20. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Nuestro enfoque combina halimetría cuantitativa objetiva, sialometría, evaluación gastroenterológica completa y, cuando es necesario, colaboración con odontología y otorrinolaringología, todo en la misma consulta integrada.'
   - Depois: 'Según la indicación médica, la investigación puede incluir exámenes realizados en la clínica, como pruebas respiratorias y pHmetría. Cuando el origen probable es oral o nasofaríngeo, se orienta a la persona a consultar odontología u otorrinolaringología.'
21. `src/lib/content/especialidades-detail.ts`
   - Antes: { title: 'Protocolo Diagnóstico Integrado', body: 'Evaluación simultánea de todos los orígenes posibles: oral, digestivo, nasofaríngeo y sistémico, con una secuencia diagnóstica eficiente y precisa.' }
   - Depois: { title: 'Evaluación Integrada', body: 'Consulta que considera los orígenes posibles del mal aliento (oral, digestivo, nasofaríngeo y sistémico) para orientar la investigación y las derivaciones.' }
22. `src/lib/content/especialidades-detail.ts`
   - Antes: { title: 'Seguimiento Evolutivo', body: 'Monitoreo periódico con halimetría para evaluar objetivamente la respuesta al tratamiento, garantizando que la mejora quede documentada y sea sostenida.' }
   - Depois: { title: 'Exámenes Digestivos', body: 'Las pruebas respiratorias (SIBO, IMO y H. pylori) y la pHmetría pueden ayudar al médico a investigar causas digestivas del mal aliento.' }
23. `src/lib/content/especialidades-detail.ts`
   - Antes: para la investigación diagnóstica completa de la halitosis. El protocolo NU.V.E.M incluye halimetría, sialometría, cribado digestivo y planificación terapéutica integrada.'
   - Depois: para investigar las causas digestivas de la halitosis. La evaluación incluye el cribado de causas digestivas y la planificación terapéutica integrada.'
24. `src/lib/content/especialidades-detail.ts`
   - Antes: 'Mediante halimetría cuantitativa, sialometría y evaluación gastroenterológica completa, con colaboración de odontología y otorrinolaringología cuando es necesario.'
   - Depois: 'Mediante la evaluación gastroenterológica y, cuando está indicado, exámenes como pruebas respiratorias y pHmetría. Las causas orales y nasofaríngeas las evalúan odontología y otorrinolaringología.'
25. `src/lib/data.ts`
   - Antes: 'Protocolo NU.V.E.M detecta H₂, CH₄ e H₂S em um único exame, com cobertura de SIBO, LIBO, SIFO e infecção por H. pylori.'
   - Depois: 'Os testes medem H₂, CH₄ e H₂S no ar expirado e ajudam o médico a investigar SIBO, IMO, intolerâncias e infecção por H. pylori.'
26. `src/lib/content/catalog.ts`
   - Antes: 'The NU.V.E.M protocol detects H₂, CH₄ and H₂S in a single exam, covering SIBO, LIBO, SIFO and H. pylori infection.'
   - Depois: 'The tests measure H₂, CH₄ and H₂S in exhaled breath and help the physician investigate SIBO, IMO, intolerances and H. pylori infection.'
27. `src/lib/content/catalog.ts`
   - Antes: 'El protocolo NU.V.E.M detecta H₂, CH₄ y H₂S en un único examen, cubriendo SIBO, LIBO, SIFO e infección por H. pylori.'
   - Depois: 'Las pruebas miden H₂, CH₄ y H₂S en el aire exhalado y ayudan al médico a investigar SIBO, IMO, intolerancias e infección por H. pylori.'
28. `src/lib/content/exames-detail.ts`
   - Antes: 'Suspeita de IMO (supercrescimento de metanogênicos) ou LIBO'
   - Depois: 'Suspeita de IMO (supercrescimento de metanogênicos)'
29. `src/lib/content/exames-detail.ts`
   - Antes: 'Suspected IMO (methanogen overgrowth) or LIBO'
   - Depois: 'Suspected IMO (methanogen overgrowth)'
30. `src/lib/content/exames-detail.ts`
   - Antes: 'Sospecha de IMO (sobrecrecimiento de metanógenos) o LIBO'
   - Depois: 'Sospecha de IMO (sobrecrecimiento de metanógenos)'
31. `src/lib/data.ts`
   - Antes: 'Equipamentos atualizados com mapeamento completo da pressão esofágica em alta resolução.
   - Depois: 'Realizada em alta resolução (24 canais) ou pelo método convencional (8 canais), conforme a indicação médica. Equipamentos atualizados com mapeamento da pressão esofágica.
32. `src/lib/content/catalog.ts`
   - Antes: 'Up-to-date equipment with full high-resolution esophageal pressure mapping.
   - Depois: 'Performed with high-resolution (24-channel) or conventional (8-channel) manometry, as indicated by the physician. Up-to-date equipment with esophageal pressure mapping.
33. `src/lib/content/catalog.ts`
   - Antes: 'Equipos actualizados con mapeo completo de la presión esofágica en alta resolución.
   - Depois: 'Realizada en alta resolución (24 canales) o con el método convencional (8 canales), según la indicación médica. Equipos actualizados con mapeo de la presión esofágica.
34. `src/lib/nuvete-data.ts`
   - Antes: 'A NU.V.E.M tem um programa completo para diagnóstico e tratamento da halitose, com:\n\n🔬 Halimetria: quantificação objetiva dos compostos causadores\n💧 Sialometria: avaliação do fluxo salivar\n👥 Abordagem multidisciplinar (gastro + odonto)\n\nGostaria de saber o preparo para a halimetria?'
   - Depois: 'Na NU.V.E.M, a consulta de gastroenterologia investiga as causas digestivas da halitose (mau hálito), como refluxo, SIBO e H. pylori.\n\nA clínica não realiza halimetria nem sialometria. Quando a causa provável é oral, a orientação é procurar um dentista.\n\nGostaria de agendar uma consulta?'
35. `src/app/api/route.ts`
   - Antes: 4. HALITOSE Diagnóstico e tratamento do mau hálito: - Halimetria · quantificação dos compostos voláteis causadores - Sialometria · avaliação do fluxo salivar - Abordagem multidisciplinar (gastro + odonto)
   - Depois: 4. HALITOSE Investigação das causas digestivas do mau hálito na consulta de gastroenterologia: - Refluxo, SIBO, H. pylori e outras causas gastrointestinais - Exames da clínica que podem ajudar: testes respiratórios e pHmetria, conforme indicação médica - Causas orais e nasofaríngeas: orientar a procurar odontologia ou otorrinolaringologia - A clínica NÃO realiza halimetria nem sialometria

Pontos de conteúdo clínico que **não** foram alterados, mas pedem revisão:

- "síndrome do intestino permeável" / "leaky gut syndrome" / "síndrome del
  intestino permeable" na interface GI-Renal (Nefrologia, três línguas). O
  termo não é diagnóstico estabelecido.
- "Testes respiratórios realizados na própria clínica: resultado e
  interpretação no mesmo dia" (Gastroenterologia). Confirmar o prazo, porque
  a nuvete diz "Testes respiratórios: até 3 dias úteis".

---

## Pendências [A CONFIRMAR]

| # | Pendência | Onde aparece | Quem confirma |
|---|---|---|---|
| 1 | Registro da Dra. Amanda Araújo (informado: CRM-MG 86343 · RQE 66655) | Não publicado. Marcador em `src/app/[locale]/equipe/page.tsx`. O número também não aparece em nenhum outro arquivo do site nem no prompt da nuvete. | você, no portal do CFM |
| 2 | Escopo do certificado ISO 9001 | `gestao-da-qualidade`: o texto antigo do escopo citava gastroenterologia, **nutrologia** e "doenças funcionais". Foi trocado por frase sem áreas. | gestão da qualidade, com o certificado |
| 3 | "Certificação ISO 9001 inclusa/incluída" nos cursos Hands-On | `ensino/page.tsx`, `EnsinoSection.tsx`, `nuvete-data.ts`, prompt da nuvete, `llms.txt` | gestão da qualidade: a ISO certifica a gestão, não o aluno; confirmar o que o certificado do curso diz |
| 4 | "O primeiro equipamento nacional" (HealthGo AIR) | trocado por "Equipamento nacional" em `exames-resp-extra.ts`; volta se houver fonte do fabricante | clínica |
| 5 | RQE da pediatra com atuação em saúde digestiva infantil (Dra. Mariana Fernandes, CRM 65936) | textos de Pediatria passaram a "com atuação em" | clínica |
| 6 | RQEs da Dra. Danielle Martins (CRM 72935) | página da equipe já dizia "Gastroenterologia e Motilidade", sem "especialista" | clínica |
| 7 | H₂S no teste respiratório | 32 ocorrências, lista no Bloco 3 | Dra. Vera |
| 8 | Manometria anorretal "de alta resolução" | `data.ts`, `catalog.ts`, `exames-detail.ts`, llms.txt | Dra. Vera |
| 9 | Trânsito colônico (somente particular) | sem página no site; falta o preparo oficial | clínica |
| 10 | Futuro da página /especialidades/halitose | página mantida e reescrita, decisão pendente | clínica |

---

## Artigos do Sanity a revisar (somente leitura, nada foi editado)

Leitura feita em 08/11/2026 nos 25 posts publicados (pt, en, es).

| Artigo (slug) | Trecho | Sugestão |
|---|---|---|
| `teste-respiratorio-sibo-imo-intolerancias` | "...normas do Conselho Federal de Medicina (Res. CFM nº 1.974/2011), e não substituem consulta médica..." | trocar pelo aviso padrão: "Conteúdo informativo e educacional, em conformidade com a Res. CFM nº 2.336/2023. Não substitui consulta médica." |
| `sibo-supercrescimento-bacteriano-no-intestino-delgado-guia-completo` | "Por que a NUVEM é referência em Saúde Digestiva?" | "Como a NU.V.E.M realiza o teste respiratório" |
| `sibo-supercrescimento-bacteriano-no-intestino-delgado-guia-completo` | "a NUVEM Medicina une tecnologia de ponta e governança clínica rigorosa" | "a NU.V.E.M Medicina une equipamentos atualizados e gestão certificada pela norma ISO 9001" |
| `sibo-supercrescimento-bacteriano-no-intestino-delgado-guia-completo` | "Certificação ISO 9001: Qualidade garantida em cada etapa do exame." | "Gestão certificada pela norma ISO 9001, com processos padronizados em cada etapa do exame." |
| `imo-supercrescimento-metanogenico-intestinal-guia-completo` | "como a tecnologia de ponta da NUVEM Medicina está revolucionando o diagnóstico e o tratamento dessa patologia" | "como a NU.V.E.M Medicina realiza o diagnóstico com teste respiratório em Belo Horizonte" |
| `imo-supercrescimento-metanogenico-intestinal-guia-completo` | "seguimos um Protocolo Operacional Padrão (POP) certificado" | "seguimos um Procedimento Operacional Padrão (POP) do sistema de gestão certificado pela norma ISO 9001" |
| `osteopatia-no-tratamento-do-refluxo-gastroesofagico-estudo-cientifico` | "Integramos o que há de mais moderno em diagnóstico, como a Manometria de Alta Resolução" | "Integramos exames de alta resolução, como a Manometria de Alta Resolução" |
| `disturbios-da-interacao-cerebro-intestino-dici` | "trazendo o que há de mais moderno na ciência digestiva" | "trazendo conteúdo atualizado da ciência digestiva" |
| `disturbios-da-interacao-cerebro-intestino-dici` | "uma exigência para quem busca excelência na saúde digestiva" | "uma exigência para quem busca atualização em saúde digestiva" |
| `disturbios-da-interacao-cerebro-intestino-dici` | "aprender com um corpo docente de excelência" | "aprender com um corpo docente com experiência clínica" |
| `disturbios-da-interacao-cerebro-intestino-dici` | link de WhatsApp `https://wa.me/553172291029?...` (número errado, (31) 7229-1029) | trocar por `https://wa.me/553197261029?...` mantendo o texto da mensagem |
| `o-que-e-incontinencia-fecal` | "Procure um médico especialista em motilidade intestinal" | "Procure um médico com atuação em motilidade intestinal" |
| `ordem-correta-tomar-remedios-guia` (resumo) | "a ordem correta para garantir a eficácia do tratamento" | "a ordem correta para o tratamento funcionar como esperado" |
| `microbioma-intestinal-e-longevidade` (resumo) | "estratégia promissora para garantir um envelhecimento saudável" | "estratégia promissora para contribuir com um envelhecimento saudável" (validar) |
| `sindrome-de-hiperemese-por-canabinoides-como-diferenciar-do-vomito-ciclico` (resumo) | "o tratamento definitivo exige cessar o uso" | "o tratamento principal é interromper o uso" (validar) |
| `a-suplementacao-de-probioticos-para-o-tratamento-de-h-pylori-visando-minimizar-os-efeitos` | "Prevenir é o melhor caminho!" | "A prevenção começa pelo diagnóstico." |
| `intolerancia-a-lactose-e-supercrescimento-bacteriano-do-intestino-delgado` (tabela) | "amplamente aceito como o melhor método diagnóstico para SIBO" | opcional: "considerado o método de referência (padrão-ouro) na literatura" (validar) |
| `esofagite-eosinofilica-tratamento-com-ibps-e-diagnostico` | "(travessão) Dra. Vera Ângelo" | "Dra. Vera Ângelo" ou "· Dra. Vera Ângelo" |
| `vida-celiaca-em-casa-com-gluten-como-sobreviver-e-viver-bem-dividindo-a-cozinha` | dois travessões: "acumula glúten (travessão) nunca fritar" e "90% dos acidentes (travessão) e o guia" | trocar por dois-pontos e vírgula |

Sem alteração necessária, conferidos:

- "A doença celíaca tem cura?" / "Não existe cura definitiva" (vida celíaca): informa que não há cura, não promete.
- Menções a endoscopia, colonoscopia e ultrassom (14): todas educativas, nenhuma diz que a clínica realiza.
- Halimetria e sialometria nos três posts do Summit BH 2026: tema de uma sessão do evento, não serviço da clínica.
- Nenhum artigo tem o telefone (31) 7229-1029 escrito no texto; o número errado está só no link de WhatsApp acima.

---

## Teste da nuvete (5 perguntas)

Rodado em 08/11/2026 no servidor local, com o prompt do Bloco 2a. O horário e
a halimetria ainda vinham do prompt antigo: são corrigidos nos Blocos 6 e 3, e
o teste será repetido no fim.

| Pergunta | Resposta (resumo fiel) | Avaliação |
|---|---|---|
| Como é o preparo para o teste respiratório de SIBO? | Dieta restrita no dia anterior (arroz branco, frango/carne/peixe, ovos, azeite, sal), jejum de 12 h, sem antibióticos por 4 semanas e sem probióticos por 2 semanas, exame de 2 a 3 h que "mede H₂, CH₄ e H₂S no ar expirado". Indica o artigo do blog. | OK. Diz "garantir um resultado confiável" sobre o preparo (não é promessa de resultado clínico). Horário errado no fim. |
| Quais convênios vocês atendem? | Unimed BH, Amil, Porto Seguro Saúde, Hapvida, Plamed, Samp; particular com recibo para reembolso; recomenda confirmar a cobertura com a equipe. | OK. Horário errado no fim. |
| Qual o horário de atendimento? | "Segunda a Sexta-feira, das 7h30 às 17h30" | **Errado.** Corrigido no Bloco 6. |
| Vocês fazem halimetria? | "Sim, fazemos!", com preparo de halimetria e sialometria. | **Errado.** Corrigido no Bloco 3. |

Depois do Bloco 3, "Vocês fazem halimetria?" passou a responder: "A halimetria **não é realizada** aqui na clínica", seguido das causas digestivas investigadas na consulta e da orientação de procurar dentista ou otorrinolaringologista. Ponto a revisar: a nuvete acrescentou por conta própria que o exame "é geralmente feito em consultórios odontológicos especializados em halitose", informação que não está no prompt.

**Correção (antes do Bloco 4).** O prompt ganhou a seção "EXAMES QUE A CLÍNICA NÃO REALIZA": para halimetria, sialometria, endoscopia, colonoscopia, ultrassom ou qualquer exame fora da lista, a resposta é só que o exame não é feito na NU.V.E.M e que a pessoa deve conversar com o médico que pediu, sem sugerir onde fazer, sem explicar o exame e sem oferecer outro no lugar. Também passou a proibir qualquer informação que não esteja nas instruções e o travessão longo. Teste em 08/11/2026, servidor local (o horário ainda é o antigo, corrigido no Bloco 6):

- **Vocês fazem halimetria?**

  > Olá! 💙 Obrigada por entrar em contato com a NU.V.E.M Medicina!
  > A halimetria não é realizada aqui na clínica. Para esse exame, você deve conversar com o profissional que fez a solicitação para orientações de onde realizá-lo. 😊
  > Se quiser, posso te contar mais sobre como a nossa equipe de gastroenterologia investiga as **causas digestivas da halitose** (como refluxo, SIBO e H. pylori) em consulta! 🌿
  > Para agendar ou tirar dúvidas, fale com a nossa equipe:
  > 📱 **WhatsApp:** (31) 99726-1029
  > 📞 **Telefone:** (31) 2537-3131
  > ⏰ **Seg a Sex, 7h30 às 17h30**

- **Vocês fazem endoscopia?**

  > Olá! 💙 Obrigada por entrar em contato com a NU.V.E.M Medicina!
  > A endoscopia não é realizada aqui na clínica. Para esse exame, você deve conversar com o médico que solicitou o pedido, pois ele poderá orientá-la sobre onde realizá-lo.
  > Se você tiver outras dúvidas ou quiser saber mais sobre os exames e consultas que realizamos por aqui, estou à disposição! 😊
  > Caso queira agendar uma consulta ou tirar dúvidas com nossa equipe:
  > 📱 WhatsApp: (31) 99726-1029
  > 📞 Telefone: (31) 2537-3131
  > ⏰ Seg a Sex, 7h30 às 17h30

- **Onde faço ultrassom?**

  > Olá! 😊 Oi, tudo bem com você?
  > O ultrassom não é um exame realizado aqui na NU.V.E.M Medicina. Para saber onde realizá-lo, recomendo entrar em contato com o médico que solicitou o exame : ele poderá te orientar da melhor forma sobre onde realizá-lo. 💙
  > Se tiver alguma outra dúvida ou quiser saber mais sobre os exames e especialidades que oferecemos por aqui, é só me chamar! 😊

Avaliação: as três respostas dizem que o exame não é feito na clínica e mandam conversar com o médico que pediu, sem indicar local. Na de halimetria, a nuvete oferece explicar a consulta de causas digestivas da halitose, que está na base da clínica. Nas respostas originais havia um travessão longo, que foi trocado por dois-pontos nesta citação; a regra nova do prompt proíbe o travessão.
| Vocês são referência? São a melhor clínica de BH? | Não usa "referência" nem "melhor". Responde com fatos: exames que realiza, formação da Dra. Vera, gestão certificada ISO 9001. | OK, efeito da regra nova do prompt. |

---

## Redirects criados e URLs antigas sem destino

Ver as seções do Bloco 3 (halimetria) e do Bloco 4 (WordPress, slugs com erro e artigos antigos). Nenhuma URL da lista ficou sem destino. `/wp-content/uploads/*` fica bloqueado pelo Firewall da Vercel, de propósito.

---

## Tarefas que ficam com você (fora do código)

1. **GTM e GA4** (detalhes no TRACKING.md):
   - criar a tag `GA4 · page_view após consentimento`;
   - corrigir o nome do evento da tag acionada por `interacao_nuvete`;
   - exigir consentimento `ad_storage` nas tags do Meta Pixel e desligar a correspondência avançada automática no Meta;
   - apagar o ID de pedido fixo da conversão de telefone;
   - tirar `arquivo` e `texto_botao` dos eventos de download e WhatsApp;
   - atualizar a tag `clique_link_bio` e criar as de `clique_cta_artigo` e `abriu_faq`;
   - trocar a conversão principal para `envio_agendamento` e `clique_whatsapp`.
2. **Sanity**: editar os artigos da seção acima (nada foi editado em produção).
3. **CFM**: conferir o registro da Dra. Amanda Araújo.
4. **Gestão da qualidade**: conferir o escopo do certificado ISO 9001 e o que o certificado dos cursos diz.
5. Demais itens dos Blocos 3 a 6 entram aqui conforme forem feitos.
