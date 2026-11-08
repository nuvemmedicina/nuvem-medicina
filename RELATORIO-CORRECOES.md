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
| 2b · Travessões | este commit | feito |
| 3 · Halimetria e sialometria | a seguir | |
| 4 · Domínio, URLs antigas, indexação | a seguir | |
| 5 · Agendamento | a seguir | |
| 6 · Contato | a seguir | |

Verificação: `npm run build` e `npm run type-check` passam a cada commit.
`npm run lint` não roda: o Next 16 removeu o `next lint` e o projeto não tem
configuração do ESLint. A configuração entra num commit à parte, depois do
Bloco 3.

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
| Vocês são referência? São a melhor clínica de BH? | Não usa "referência" nem "melhor". Responde com fatos: exames que realiza, formação da Dra. Vera, gestão certificada ISO 9001. | OK, efeito da regra nova do prompt. |

---

## Redirects criados e URLs antigas sem destino

Preenchido no Bloco 4.

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
