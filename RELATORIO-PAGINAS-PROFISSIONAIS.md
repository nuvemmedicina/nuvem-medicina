# Relatório · Páginas dos profissionais

Branch `feat/paginas-profissionais`, a partir da `main` (com o PR #140). PR sem merge e sem deploy em produção. Data: 08/11/2026.

**Fontes dos dados:**
- arquivos da clínica, versão de 06/11/2026;
- registros conferidos no portal do CFM em 08/11/2026;
- anexos validados de 08/11/2026: "Tabela de preços e procedimentos" e "Lista e regras de convênio". Quando há divergência com os arquivos de 06/11, valem os anexos de 08/11.

**O que os anexos de 08/11 mudaram:**
- **Dra. Vera:**
  - Convênios da consulta: particular, Unimed (Unipart, Unimax, Uniplan) ou Amagis Saúde. Fecha a pendência.
  - Testes respiratórios: SIBO e SIBO + IMO, somente particular.
  - A lista "Quando procurar avaliação" perdeu os itens de intolerância à lactose e à frutose e de H. pylori. Pela tabela, esses testes não são feitos por ela.
- **Dra. Amanda:**
  - Manometria esofágica de alta resolução e impedanciopHmetria: somente particular.
  - pHmetria esofágica: particular ou Unimed (Unipart, Unimax, Uniplan).
- **Dr. Gabriel:**
  - Passa a ter consulta, somente particular.
  - Exames: manometria esofágica de alta resolução e convencional, pHmetria e impedanciopHmetria, todos somente particular, como na lista por profissional. Confirmado pela gestão em 09/11/2026.
- **Dra. Raissa e Dra. Anna Karoline:** somente particular, confirmado.
- **Dra. Anna Karoline:**
  - O nome passa a ser "Anna Karoline Rocha".
  - A faixa etária ficou [A CONFIRMAR]: 12 a 90 anos nos dados de 06/11 e 15 a 90 na anamnese dela.
- **Dra. Camilla:** particular ou Unimed (Unipart, Unimax, Uniplan).
- **Dra. Claudia:** particular ou Unimed. Os planos da Unimed ficaram [A CONFIRMAR].
- **FAQ "Atende convênio?":** agora diz que, se o plano não estiver na lista, o atendimento pode ser particular, com recibo para reembolso.
- **Valores:** os anexos têm os preços, mas eles não aparecem nas páginas, porque o modelo aprovado não prevê preço.

## 1. O que mudou

| Etapa | Arquivos |
|---|---|
| Dados | `src/lib/profissionais.ts` (fonte única), `src/lib/profissionais-texto.ts` (frases derivadas), `src/lib/profissionais-publicacao.ts` (regras de publicação, **único ponto de troca** com a anamnese) |
| Componente | `src/components/profissionais/PaginaProfissional.tsx`: as 8 seções, sem texto escrito à mão sobre a pessoa |
| Páginas | rota única `src/app/[locale]/[profissional]/page.tsx`; as páginas atuais da Dra. Vera e da Dra. Eliane foram movidas, sem mudar o texto, para `src/components/profissionais/antigas/`; sitemap e middleware (páginas só em português) passam a ler os dados |
| Equipe | `/equipe` gerada a partir dos mesmos dados |
| Schema | `profissionalSchema()` em `src/lib/schema.ts`; `directorSchema` sai do mesmo gerador |

Arquivos do PR #142 não foram tocados.

## 2. Como fica no ar

| Ambiente | O que aparece |
|---|---|
| **Produção** (`VERCEL_ENV=production`) | Só páginas **aprovadas** geram rota e entram no sitemap. `/dra-vera-angelo` e `/dra-eliane-basques` continuam com a **página antiga**, no mesmo endereço, até a nova ser aprovada. As demais dão 404. |
| **Prévia da Vercel** e computador local | Todas as 9 páginas, com a faixa "Rascunho · aguardando aprovação", a versão do texto e `noindex`. |

Uma página só conta como aprovada quando as três condições abaixo valem ao mesmo tempo:
1. `status: 'aprovada'`;
2. o profissional **e** a clínica aprovaram a **versão atual** do texto;
3. não há pendência que bloqueie, como CRM sem UF ou bio sem texto.

A versão é um código de 10 caracteres calculado a partir de tudo o que aparece na página, inclusive a foto. Se qualquer dado mudar depois da aprovação, a versão muda e a página volta a não ser publicada. Nesse caso o build mostra um aviso `[profissionais] ... não vai ao ar: ...`.

**Endereços.** Os dois endereços atuais foram mantidos. Os novos seguem o padrão `dra-`/`dr-` + o slug da anamnese:

| Profissional | Endereço | Status | Versão do texto |
|---|---|---|---|
| Dra. Vera Ângelo | `/dra-vera-angelo` | **aprovada** (09/11/2026) | `2597ae4057` |
| Dra. Eliane Basques | `/dra-eliane-basques` | **aprovada** (09/11/2026) | `85c578a344` |
| Dra. Raissa Dalat | `/dra-raissa-dalat` | **aprovada** (09/11/2026) | `b7ffad55df` |
| Dra. Anna Karoline Rocha | `/dra-anna-karoline` | **aprovada** (09/11/2026) | `22ade9e187` |
| Dr. Gabriel de Souza Fernandes Filho | `/dr-gabriel-fernandes-filho` | **aprovada** (09/11/2026) | `8daf788a11` |
| Dra. Amanda Araújo | `/dra-amanda-araujo` | **aprovada** (09/11/2026) | `24ebb384d3` |
| Dra. Danielle Martins | `/dra-danielle-martins` | **aprovada** (09/11/2026) | `49d9899a98` |
| Dra. Claudia Utsch | `/dra-claudia-utsch` | **aprovada** (09/11/2026) | `7268ebc8f1` |
| Dra. Camilla Mendes | `/dra-camilla-mendes` | rascunho (fase 2, sem rota em produção) | `93c2662977` |

## 3. Como publicar uma página (hoje, com os campos à mão)

1. Envie ao profissional o texto da seção 6 deste relatório (ou o link da prévia da Vercel, que mostra a versão na faixa do topo).
2. Quando o profissional e a clínica aprovarem, abra `src/lib/profissionais.ts` e, no bloco da pessoa, troque:

   ```ts
   status: 'aguardando_medico',
   aprovacoes: {},
   ```
   por
   ```ts
   status: 'aprovada',
   aprovacoes: {
     medico:  { data: '2026-11-20', versao: 'b7ffad55df', por: 'Dra. Raissa Dalat' },
     clinica: { data: '2026-11-20', versao: 'b7ffad55df', por: 'Ana Paula' },
   },
   ```
   Use a versão que o profissional aprovou, que aparece na faixa da prévia e na tabela acima.
3. Abra um PR e confira a prévia da Vercel: a página aprovada perde a faixa de rascunho.
4. Depois do merge, a página entra no ar, no sitemap e com link no cartão do `/equipe`. Para a Dra. Vera e a Dra. Eliane, a página nova substitui a antiga no mesmo endereço. A partir daí os arquivos de `src/components/profissionais/antigas/` podem ser apagados.

**Para mudar um texto aprovado**, edite os dados. A versão muda e a página sai do ar até ser aprovada de novo. As páginas da Dra. Vera e da Dra. Eliane voltam para a versão antiga nesse intervalo.

**Lista "Quando procurar avaliação":** depois da validação da Dra. Vera, troque `validacao: 'rascunho'` por `validacao: { por: 'Dra. Vera Ângelo', data: 'AAAA-MM-DD' }`. Até lá, a lista só aparece na prévia. Essa troca muda a versão do texto, então faça antes da aprovação final.

Testei este passo a passo num build de produção, com a Dra. Raissa marcada como aprovada de forma temporária (o teste não foi commitado):
- a página dela entrou no ar sem a faixa, no sitemap e com link no `/equipe`;
- o Dr. Gabriel, marcado como "aprovada" sem as aprovações da versão atual, continuou com 404 e gerou o aviso no build.

## 4. Como ligar a anamnese (depois do merge do PR #142)

Tudo fica em `src/lib/profissionais-publicacao.ts`.

1. Troque `export const FONTE_PUBLICACAO = 'manual' as FontePublicacao` por `'anamnese'`.
2. Substitua o corpo de `lerDaAnamnese` por:

   ```ts
   import { sanity } from './anamnese-ia/servidor'
   import { carregarProfissional } from './anamnese-ia/pagina-servidor'

   async function lerDaAnamnese(p: Profissional): Promise<DadosPublicacao> {
     const client = sanity()
     if (!client) throw new Error('SANITY_WRITE_TOKEN ausente no build')
     const { fotos, situacao: s } = await carregarProfissional(client, `medico-${p.slugAnamnese}`)

     // Foto: "site" = a foto atual (pública); "sem-foto" = iniciais;
     // "enviada" = precisa de cópia pública (ver observação 2 abaixo).
     const foto = fotos?.opcao === 'sem-foto' ? null
       : fotos?.opcao === 'enviada' ? fotoPublicaDaAnamnese(p, fotos) // a criar
       : p.foto
     const versao = versaoDoTexto(p, foto)

     // A aprovação só vale para a página inteira (ver observação 1).
     const aprovouEsta = s.texto?.conteudo.versaoPagina === versao
     const aprovada = s.podePublicar && aprovouEsta
     const quando = s.decisaoAtual?.em.slice(0, 10) ?? ''
     return {
       status: aprovada ? 'aprovada' : s.texto ? 'aguardando_medico' : 'rascunho',
       foto,
       aprovacoes: aprovada
         ? { medico: { data: quando, versao, por: 'anamnese' }, clinica: { data: quando, versao, por: 'painel' } }
         : {},
     }
   }
   ```
3. Confira se a Vercel tem `SANITY_WRITE_TOKEN` disponível no build. A leitura é feita no build e o resultado é estático. Uma aprovação nova só aparece depois de um novo deploy, ou de um deploy hook acionado pelo painel quando a clínica marcar "publicada".

**Observações sobre o #142 que precisam de ajuste antes de ligar:**

1. **O texto aprovado no #142 tem 6 campos** (nome, registro, especialidade, áreas, bio, Instagram). A página nova tem mais: o que faz, convênios, faixa etária, FAQ, lista "Quando procurar".
   - **Recomendação:** quando a clínica criar a versão do texto no painel, gravar também `versaoPagina: versaoDoTexto(p)` e mostrar ao médico o texto completo da página (a seção 6 deste relatório é gerada pelas mesmas funções).
   - Assim, a aprovação do médico fica ligada à página inteira. É isso que o trecho acima confere em `aprovouEsta`.
2. **A foto enviada fica no Blob privado.** Para ir para a página pública, a foto aprovada precisa de uma cópia pública (por exemplo em `public/images/` ou num Blob público), feita só depois da aprovação da clínica e da autorização de imagem vigente.
   - A opção "usar a foto atual do site" já funciona sem esse passo.
   - Enquanto isso não existir, `fotoPublicaDaAnamnese` pode devolver `null`, e a página sai com iniciais.
3. A autorização de imagem revogada faz `s.podePublicar` ficar falso, e a página sai do ar no próximo build. Isso atende ao prazo de 10 dias úteis do termo, desde que haja um deploy nesse prazo.

## 5. Rastreamento (GTM)

- A página não envia nome nem especialidade ao dataLayer. Ela não tem nenhum `pushEvent`.
- Os dois botões de WhatsApp levam o atributo `data-local-clique="pagina_profissional"`. O texto dos botões é sempre "Agendar pelo WhatsApp", sem nome.
- **Falta configurar no GTM** (eu não alterei o contêiner):
  1. Variáveis > Nova > *Variável de evento automático* > tipo *Atributo do elemento* > atributo `data-local-clique`. Nome sugerido: `AEV - local_clique`.
  2. Na tag GA4 do evento `clique_whatsapp`, adicionar o parâmetro `local_clique` = `{{AEV - local_clique}}`.
  3. No GA4, registrar `local_clique` como dimensão personalizada (escopo de evento).
  4. Testar pelo GTM Preview no site publicado. O GTM só carrega em produção.
- **Atenção:** o `origem_pagina` (caminho da página) vai continuar trazendo o nome do profissional, como `/dra-vera-angelo`. O `TRACKING.md` permite o caminho, porque ele descreve o conteúdo visitado. Se a gestão preferir, uma tabela de consulta no GTM pode trocar esses caminhos por `/profissional` antes de enviar.
- A mensagem pronta do WhatsApp tem o nome do profissional, mas vai só para o WhatsApp. Ela não é enviada ao GA4, porque a URL do clique não é parâmetro do evento.

## 6. Texto final de cada página (para validação)

Os textos abaixo saem das mesmas funções que montam a página. Seções sem dado confirmado ficam ocultas. Onde falta um dado no FAQ, a resposta diz que a equipe confirma no agendamento.

### Dra. Vera Ângelo · `/dra-vera-angelo`

Status: **aprovada** em 09/11/2026 · versão do texto `2597ae4057` · foto: `/images/dra-vera.jpg`

**1. Apresentação**

- Rótulo: Gastroenterologia
- Nome: Dra. Vera Ângelo
- Registro: CRM-MG 22284 · RQE 10411 (Gastroenterologia) · RQE 22736 (Medicina do Trabalho)
- Linha de apresentação: Médica especialista em Gastroenterologia. Sócia fundadora e Diretora Técnica da NU.V.E.M.
- Botões: "Agendar pelo WhatsApp" (mensagem: "Olá! Gostaria de agendar com a Dra. Vera Ângelo na NU.V.E.M.") e "Ver exames"

**2. O que faz na NU.V.E.M**

- Consulta · Particular, Unimed (Unipart, Unimax, Uniplan) ou Amagis Saúde
- Teste respiratório para SIBO · Somente particular
- Teste respiratório para SIBO + IMO (metano) · Somente particular
- Faixa etária: 12 a 99 anos
- Teleconsulta: Sim, no atendimento particular

**3. Formação**

> Sócia fundadora e diretora técnica da NU.V.E.M. Mestre e Doutora pela UFMG. Professora convidada do Hospital Israelita Albert Einstein. Autora de obras pela Editora Rubio.

**3b. Publicações · Livros publicados**

- Organizadora: Doenças Funcionais na Gastrenterologia · Editora Rubio · 2025 (link para a editora)
- Coorganizadora: Métodos Diagnósticos em Doenças Funcionais e Motilidade Digestiva · Editora Rubio · 2025 (link para a editora)
- Organizadora: Perguntas e Respostas Comentadas de Gastrenterologia Clínica e Hepatologia · Editora Rubio · 2025 (link para a editora)
- Autora: Testes Respiratórios em Gastrenterologia: Hidrogênio, Metano e Helicobacter pylori · Editora Rubio · 2024 (link para a editora)

**4. Como pode ajudar**

- Atua em: SIBO e IMO · Testes respiratórios · Motilidade digestiva · Distúrbios da interação cérebro-intestino (DGBI)
- Quando procurar avaliação: ver a lista na seção "Listas para a Dra. Vera" (só aparece em produção depois de validada)

**5. Exames relacionados**

- Testes Respiratórios · links "Sobre o exame" (`/exames/testes-respiratorios`) e "Preparo" (`/exames/preparos#testes-respiratorios`)

**6. Como é o atendimento**

1. Agendamento: Pelo WhatsApp ou pelo telefone da clínica.
2. Preparo: A clínica envia as orientações de preparo do exame.
3. Exame ou consulta: Atendimento na NU.V.E.M, na Rua Ceará, 600, em Belo Horizonte.
4. Laudo: Enviado para o médico que pediu o exame, com rastreabilidade pela gestão certificada na norma ISO 9001.

**7. Perguntas frequentes**

- *Precisa de pedido médico?*
  Para exames, sim: o pedido médico é obrigatório. Para a consulta, a equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.
- *Atende convênio?*
  - Consulta: Particular, Unimed (Unipart, Unimax, Uniplan) ou Amagis Saúde.
  - Teste respiratório para SIBO: Somente particular.
  - Teste respiratório para SIBO + IMO (metano): Somente particular.
  Se o plano não estiver na lista, o atendimento pode ser particular, com recibo para reembolso.
- *Faz teleconsulta?*
  Sim, no atendimento particular.
- *Qual idade atende?*
  12 a 99 anos.
- *O que levar?*
  Leve no dia do atendimento:
  - Pedido médico (obrigatório para exames)
  - Guia ou número de autorização (exames por convênio)
  - Documento com foto
  - Carteirinha do convênio
  - Exames anteriores
  - Lista de medicamentos em uso

**8. Agendamento:** "Agende com a Dra. Vera Ângelo", telefone, horário, endereço e botão "Agendar pelo WhatsApp". Rodapé padrão do site (responsável técnica e aviso da Res. CFM nº 2.336/2023).

---

### Dra. Eliane Basques · `/dra-eliane-basques`

Status: **aprovada** em 09/11/2026 · versão do texto `85c578a344` · foto: `/images/dra-eliane.jpg`

**1. Apresentação**

- Rótulo: Médica com atuação em cirurgia pediátrica
- Nome: Dra. Eliane Basques
- Registro: CRM-MG 27601 · RQE 9324
- Linha de apresentação: Cofundadora e Diretora Técnica Substituta da NU.V.E.M.
- Botões: "Agendar pelo WhatsApp" (mensagem: "Olá! Gostaria de agendar com a Dra. Eliane Basques na NU.V.E.M.") e "Ver exames"

**2. O que faz na NU.V.E.M**

- Manometria anorretal · Particular ou Unimed (Unipart, Unimax, Uniplan)
- Trânsito colônico · Somente particular
- Faixa etária: 1 a 80 anos
- Consulta: Não faz consulta. Atende somente exames.
- Dias de atendimento: Somente às quintas-feiras

**3. Formação**

> Cirurgiã pediátrica, cofundadora da NU.V.E.M. Atua em manometria anorretal e disfunções do assoalho pélvico, na interface entre gastroenterologia e cirurgia.

**4. Como pode ajudar**

- Atua em: Manometria anorretal · Assoalho pélvico · Casos interdisciplinares
- Quando procurar avaliação: ver a lista na seção "Listas para a Dra. Vera" (só aparece em produção depois de validada)

**5. Exames relacionados**

- Manometria Anorretal · links "Sobre o exame" (`/exames/manometria-anorretal`) e "Preparo" (`/exames/preparos#manometria-anorretal`)
- Trânsito colônico · sem link: "Informações e preparo pelo WhatsApp ou telefone."

**6. Como é o atendimento**

1. Agendamento: Pelo WhatsApp ou pelo telefone da clínica.
2. Preparo: A clínica envia as orientações de preparo do exame.
3. Exame: Atendimento na NU.V.E.M, na Rua Ceará, 600, em Belo Horizonte.
4. Laudo: Enviado para o médico que pediu o exame, com rastreabilidade pela gestão certificada na norma ISO 9001.

**7. Perguntas frequentes**

- *Precisa de pedido médico?*
  Sim. Os exames precisam de pedido médico.
- *Atende convênio?*
  - Manometria anorretal: Particular ou Unimed (Unipart, Unimax, Uniplan).
  - Trânsito colônico: Somente particular.
  Se o plano não estiver na lista, o atendimento pode ser particular, com recibo para reembolso.
- *Faz teleconsulta?*
  Não. A Dra. Eliane Basques realiza exames presenciais na NU.V.E.M e não faz consulta.
- *Qual idade atende?*
  1 a 80 anos.
- *O que levar?*
  Leve no dia do atendimento:
  - Pedido médico (obrigatório para exames)
  - Guia ou número de autorização (exames por convênio)
  - Documento com foto
  - Carteirinha do convênio
  - Exames anteriores
  - Lista de medicamentos em uso

**8. Agendamento:** "Agende com a Dra. Eliane Basques", telefone, horário, endereço e botão "Agendar pelo WhatsApp". Rodapé padrão do site (responsável técnica e aviso da Res. CFM nº 2.336/2023).

---

### Dra. Raissa Dalat · `/dra-raissa-dalat`

Status: **aprovada** em 09/11/2026 · versão do texto `b7ffad55df` · foto: `/images/raissa-dalat.jpg`

**1. Apresentação**

- Rótulo: Médica com atuação em cirurgia pediátrica
- Nome: Dra. Raissa Dalat
- Registro: CRM-MG 78824 · RQE 61983
- Botões: "Agendar pelo WhatsApp" (mensagem: "Olá! Gostaria de agendar com a Dra. Raissa Dalat na NU.V.E.M.")

**2. O que faz na NU.V.E.M**

- Consulta de cirurgia pediátrica geral · Somente particular
- Consulta de coloproctologia infantil · Somente particular
- Faixa etária: 0 a 14 anos
- Teleconsulta: Sim, no atendimento particular

**3. Formação**

> Cirurgiã pediátrica com atuação em cirurgia pediátrica geral e coloproctologia infantil, pós-graduada em doenças funcionais do aparelho digestivo e manometrias.

**4. Como pode ajudar**

- Atua em: Cirurgia pediátrica geral · Coloproctologia infantil

**5. Exames relacionados**

_(seção oculta: não realiza exames)_

**6. Como é o atendimento**

1. Agendamento: Pelo WhatsApp ou pelo telefone da clínica.
2. Preparo: A clínica envia as orientações para o dia do atendimento.
3. Consulta: Atendimento na NU.V.E.M, na Rua Ceará, 600, em Belo Horizonte.
4. Registro: Atendimento registrado em prontuário, com rastreabilidade pela gestão certificada na norma ISO 9001.

**7. Perguntas frequentes**

- *Precisa de pedido médico?*
  Para a consulta, a equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.
- *Atende convênio?*
  - Consulta de cirurgia pediátrica geral: Somente particular.
  - Consulta de coloproctologia infantil: Somente particular.
  Todo atendimento particular tem recibo para reembolso, que o paciente verifica com o próprio plano.
- *Faz teleconsulta?*
  Sim, no atendimento particular.
- *Qual idade atende?*
  0 a 14 anos.
- *O que levar?*
  Leve no dia do atendimento:
  - Pedido médico (obrigatório para exames)
  - Guia ou número de autorização (exames por convênio)
  - Documento com foto
  - Carteirinha do convênio
  - Exames anteriores
  - Lista de medicamentos em uso

**8. Agendamento:** "Agende com a Dra. Raissa Dalat", telefone, horário, endereço e botão "Agendar pelo WhatsApp". Rodapé padrão do site (responsável técnica e aviso da Res. CFM nº 2.336/2023).

---

### Dra. Anna Karoline Rocha · `/dra-anna-karoline`

Status: **aprovada** em 09/11/2026 · versão do texto `22ade9e187` · foto: `/images/anna-karoline.jpg`

**1. Apresentação**

- Rótulo: Fisioterapia Pélvica
- Nome: Dra. Anna Karoline Rocha
- Registro: Crefito 4/270579-F
- Linha de apresentação: Fisioterapeuta com atuação em fisioterapia pélvica.
- Botões: "Agendar pelo WhatsApp" (mensagem: "Olá! Gostaria de agendar com a Dra. Anna Karoline Rocha na NU.V.E.M.") e "Ver exames"

**2. O que faz na NU.V.E.M**

- Avaliação pélvica com biofeedback eletromiográfico · Somente particular
- Reabilitação do assoalho pélvico · Somente particular
- Teleconsulta: Sim, no atendimento particular

**3. Formação**

> Fisioterapeuta com atuação em assoalho pélvico e biofeedback eletromiográfico (incontinência urinária e fecal, constipação, dor pélvica, pré e pós-parto, entre outros).

**4. Como pode ajudar**

- Atua em: Assoalho pélvico · Biofeedback eletromiográfico
- Quando procurar avaliação: ver a lista na seção "Listas para a Dra. Vera" (só aparece em produção depois de validada)

**5. Exames relacionados**

- Avaliação Pélvica · links "Sobre o exame" (`/exames/avaliacao-pelvica`) e "Preparo" (`/exames/preparos#avaliacao-pelvica`)

**6. Como é o atendimento**

1. Agendamento: Pelo WhatsApp ou pelo telefone da clínica.
2. Preparo: A clínica envia as orientações de preparo do exame.
3. Exame ou consulta: Atendimento na NU.V.E.M, na Rua Ceará, 600, em Belo Horizonte.
4. Laudo: Enviado para o médico que pediu o exame, com rastreabilidade pela gestão certificada na norma ISO 9001.

**7. Perguntas frequentes**

- *Precisa de pedido médico?*
  Para exames, sim: o pedido médico é obrigatório. Para a consulta, a equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.
- *Atende convênio?*
  - Avaliação pélvica com biofeedback eletromiográfico: Somente particular.
  - Reabilitação do assoalho pélvico: Somente particular.
  Todo atendimento particular tem recibo para reembolso, que o paciente verifica com o próprio plano.
- *Faz teleconsulta?*
  Sim, no atendimento particular.
- *Qual idade atende?*
  A equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.
- *O que levar?*
  Leve no dia do atendimento:
  - Pedido médico (obrigatório para exames)
  - Guia ou número de autorização (exames por convênio)
  - Documento com foto
  - Carteirinha do convênio
  - Exames anteriores
  - Lista de medicamentos em uso

**8. Agendamento:** "Agende com a Dra. Anna Karoline Rocha", telefone, horário, endereço e botão "Agendar pelo WhatsApp". Rodapé padrão do site (responsável técnica e aviso da Res. CFM nº 2.336/2023).

---

### Dr. Gabriel de Souza Fernandes Filho · `/dr-gabriel-fernandes-filho`

Status: **aprovada** em 09/11/2026 · versão do texto `8daf788a11` · foto: `/images/dr-Gabriel-de-Souza-Fernandes-Filho.jpg`

**1. Apresentação**

- Rótulo: Gastroenterologia
- Nome: Dr. Gabriel de Souza Fernandes Filho
- Registro: CRM-MG 81843 · RQE 54179 (Clínica Médica) · RQE 61806 (Gastroenterologia)
- Linha de apresentação: Médico especialista em Gastroenterologia.
- Botões: "Agendar pelo WhatsApp" (mensagem: "Olá! Gostaria de agendar com o Dr. Gabriel de Souza Fernandes Filho na NU.V.E.M.") e "Ver exames"

**2. O que faz na NU.V.E.M**

- Consulta · Somente particular
- Manometria esofágica de alta resolução · Somente particular
- Manometria esofágica convencional · Somente particular
- pHmetria esofágica · Somente particular
- ImpedanciopHmetria esofágica · Somente particular
- Faixa etária: A partir de 15 anos
- Teleconsulta: Não. O atendimento é presencial na NU.V.E.M.

**3. Formação**

> Médico pela UFJF, com residência em Gastroenterologia pelo IPSEMG. Realiza manometria, pHmetria e impedanciopHmetria na NU.V.E.M. Atua nos hospitais Eduardo de Menezes, Orizonti e Mater Dei.

**4. Como pode ajudar**

- Atua em: Manometria esofágica · pHmetria e impedanciopHmetria
- Quando procurar avaliação: ver a lista na seção "Listas para a Dra. Vera" (só aparece em produção depois de validada)

**5. Exames relacionados**

- Manometria Esofágica · links "Sobre o exame" (`/exames/manometria-esofagica`) e "Preparo" (`/exames/preparos#manometria-esofagica`)
- pHmetria e ImpedanciopHmetria Esofágica · links "Sobre o exame" (`/exames/phmetria-impedanciometria`) e "Preparo" (`/exames/preparos#phmetria-impedanciometria`)

**6. Como é o atendimento**

1. Agendamento: Pelo WhatsApp ou pelo telefone da clínica.
2. Preparo: A clínica envia as orientações de preparo do exame.
3. Exame ou consulta: Atendimento na NU.V.E.M, na Rua Ceará, 600, em Belo Horizonte.
4. Laudo: Enviado para o médico que pediu o exame, com rastreabilidade pela gestão certificada na norma ISO 9001.

**7. Perguntas frequentes**

- *Precisa de pedido médico?*
  Para exames, sim: o pedido médico é obrigatório. Para a consulta, a equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.
- *Atende convênio?*
  - Consulta: Somente particular.
  - Manometria esofágica de alta resolução: Somente particular.
  - Manometria esofágica convencional: Somente particular.
  - pHmetria esofágica: Somente particular.
  - ImpedanciopHmetria esofágica: Somente particular.
  Todo atendimento particular tem recibo para reembolso, que o paciente verifica com o próprio plano.
- *Faz teleconsulta?*
  Não. O atendimento é presencial na NU.V.E.M.
- *Qual idade atende?*
  A partir de 15 anos.
- *O que levar?*
  Leve no dia do atendimento:
  - Pedido médico (obrigatório para exames)
  - Guia ou número de autorização (exames por convênio)
  - Documento com foto
  - Carteirinha do convênio
  - Exames anteriores
  - Lista de medicamentos em uso

**8. Agendamento:** "Agende com o Dr. Gabriel de Souza Fernandes Filho", telefone, horário, endereço e botão "Agendar pelo WhatsApp". Rodapé padrão do site (responsável técnica e aviso da Res. CFM nº 2.336/2023).

---

### Dra. Amanda Araújo · `/dra-amanda-araujo`

Status: **aprovada** em 09/11/2026 · versão do texto `24ebb384d3` · foto: `/images/Amanda-Araujo.jpg`

**1. Apresentação**

- Rótulo: Gastroenterologia
- Nome: Dra. Amanda Araújo
- Registro: CRM-MG 86343 · RQE 58941 (Clínica Médica) · RQE 66655 (Gastroenterologia)
- Linha de apresentação: Médica especialista em Gastroenterologia.
- Botões: "Agendar pelo WhatsApp" (mensagem: "Olá! Gostaria de agendar com a Dra. Amanda Araújo na NU.V.E.M.") e "Ver exames"

**2. O que faz na NU.V.E.M**

- Manometria esofágica de alta resolução · Somente particular
- pHmetria esofágica · Particular ou Unimed (Unipart, Unimax, Uniplan)
- ImpedanciopHmetria esofágica · Somente particular
- Consulta: Não faz consulta. Atende somente exames.

**3. Formação**

> Gastroenterologista com atuação em motilidade, disfagia, refluxo e acalasia.

**4. Como pode ajudar**

- Atua em: Motilidade digestiva · Disfagia · Refluxo · Acalasia
- Quando procurar avaliação: ver a lista na seção "Listas para a Dra. Vera" (só aparece em produção depois de validada)

**5. Exames relacionados**

- Manometria Esofágica · links "Sobre o exame" (`/exames/manometria-esofagica`) e "Preparo" (`/exames/preparos#manometria-esofagica`)
- pHmetria e ImpedanciopHmetria Esofágica · links "Sobre o exame" (`/exames/phmetria-impedanciometria`) e "Preparo" (`/exames/preparos#phmetria-impedanciometria`)

**6. Como é o atendimento**

1. Agendamento: Pelo WhatsApp ou pelo telefone da clínica.
2. Preparo: A clínica envia as orientações de preparo do exame.
3. Exame: Atendimento na NU.V.E.M, na Rua Ceará, 600, em Belo Horizonte.
4. Laudo: Enviado para o médico que pediu o exame, com rastreabilidade pela gestão certificada na norma ISO 9001.

**7. Perguntas frequentes**

- *Precisa de pedido médico?*
  Sim. Os exames precisam de pedido médico.
- *Atende convênio?*
  - Manometria esofágica de alta resolução: Somente particular.
  - pHmetria esofágica: Particular ou Unimed (Unipart, Unimax, Uniplan).
  - ImpedanciopHmetria esofágica: Somente particular.
  Se o plano não estiver na lista, o atendimento pode ser particular, com recibo para reembolso.
- *Faz teleconsulta?*
  Não. A Dra. Amanda Araújo realiza exames presenciais na NU.V.E.M e não faz consulta.
- *Qual idade atende?*
  A equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.
- *O que levar?*
  Leve no dia do atendimento:
  - Pedido médico (obrigatório para exames)
  - Guia ou número de autorização (exames por convênio)
  - Documento com foto
  - Carteirinha do convênio
  - Exames anteriores
  - Lista de medicamentos em uso

**8. Agendamento:** "Agende com a Dra. Amanda Araújo", telefone, horário, endereço e botão "Agendar pelo WhatsApp". Rodapé padrão do site (responsável técnica e aviso da Res. CFM nº 2.336/2023).

---

### Dra. Danielle Martins · `/dra-danielle-martins`

Status: **aprovada** em 09/11/2026 · versão do texto `49d9899a98` · foto: `/images/danielle-martins.jpg`

**1. Apresentação**

- Rótulo: Gastroenterologia
- Nome: Dra. Danielle Martins
- Registro: CRM-MG 72935 · RQE 55612 (Clínica Médica) · RQE 60835 (Gastroenterologia)
- Linha de apresentação: Médica especialista em Gastroenterologia.
- Botões: "Agendar pelo WhatsApp" (mensagem: "Olá! Gostaria de agendar com a Dra. Danielle Martins na NU.V.E.M.")

**2. O que faz na NU.V.E.M**

- Consulta de gastroenterologia · Particular ou convênios: Agros, Allianz, Amagis, Amil, AMMP, Assefaz, Saúde Caixa, Care Plus, Cemig, Cenibra, Copass, Correios (Postal), Desban, Fundação Libertas, Fundaffemg, Fusex, Omint, Petrobras, Proasa e Vale
- Consulta de nutrologia · Somente particular
- Faixa etária: A partir de 16 anos
- Teleconsulta: Sim, no atendimento particular

**3. Formação**

> Graduada pela Unifenas-BH, membro titular da Federação Brasileira de Gastroenterologia, pós-graduada em Nutrologia, docente do curso de Medicina do UniBH, corpo clínico da NU.V.E.M e da Rede Mater Dei.

**4. Como pode ajudar**

- Atua em: Gastroenterologia clínica

**5. Exames relacionados**

_(seção oculta: não realiza exames)_

**6. Como é o atendimento**

1. Agendamento: Pelo WhatsApp ou pelo telefone da clínica.
2. Preparo: A clínica envia as orientações para o dia do atendimento.
3. Consulta: Atendimento na NU.V.E.M, na Rua Ceará, 600, em Belo Horizonte.
4. Registro: Atendimento registrado em prontuário, com rastreabilidade pela gestão certificada na norma ISO 9001.

**7. Perguntas frequentes**

- *Precisa de pedido médico?*
  Para a consulta, a equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.
- *Atende convênio?*
  - Consulta de gastroenterologia: Particular ou convênios: Agros, Allianz, Amagis, Amil, AMMP, Assefaz, Saúde Caixa, Care Plus, Cemig, Cenibra, Copass, Correios (Postal), Desban, Fundação Libertas, Fundaffemg, Fusex, Omint, Petrobras, Proasa e Vale.
  - Consulta de nutrologia: Somente particular.
  Se o plano não estiver na lista, o atendimento pode ser particular, com recibo para reembolso.
- *Faz teleconsulta?*
  Sim, no atendimento particular.
- *Qual idade atende?*
  A partir de 16 anos.
- *O que levar?*
  Leve no dia do atendimento:
  - Pedido médico (obrigatório para exames)
  - Guia ou número de autorização (exames por convênio)
  - Documento com foto
  - Carteirinha do convênio
  - Exames anteriores
  - Lista de medicamentos em uso

**8. Agendamento:** "Agende com a Dra. Danielle Martins", telefone, horário, endereço e botão "Agendar pelo WhatsApp". Rodapé padrão do site (responsável técnica e aviso da Res. CFM nº 2.336/2023).

---

### Dra. Claudia Utsch · `/dra-claudia-utsch`

Status: **aprovada** em 09/11/2026 · versão do texto `7268ebc8f1` · foto: `/images/claudia-utsch.jpg`

**1. Apresentação**

- Rótulo: Médica com atuação em gastroenterologia
- Nome: Dra. Claudia Utsch
- Registro: CRM-MG 47651 · RQE 51470 · RQE 51471
- Botões: "Agendar pelo WhatsApp" (mensagem: "Olá! Gostaria de agendar com a Dra. Claudia Utsch na NU.V.E.M.")

**2. O que faz na NU.V.E.M**

- Consulta · Particular ou Unimed
- Faixa etária: 15 a 95 anos
- Teleconsulta: Não. O atendimento é presencial na NU.V.E.M.

**3. Formação**

> Mestre em Doenças Inflamatórias Intestinais pela Universidade Federal de São Paulo (Unifesp), com residência médica em Gastroenterologia e em Endoscopia Digestiva pela Unifesp. Título de Endoscopia pela Sociedade Brasileira de Endoscopia Digestiva (Sobed) e de Gastroenterologia pela Federação Brasileira de Gastroenterologia (FBG).

**4. Como pode ajudar**

- Atua em: Gastroenterologia clínica

**5. Exames relacionados**

_(seção oculta: não realiza exames)_

**6. Como é o atendimento**

1. Agendamento: Pelo WhatsApp ou pelo telefone da clínica.
2. Preparo: A clínica envia as orientações para o dia do atendimento.
3. Consulta: Atendimento na NU.V.E.M, na Rua Ceará, 600, em Belo Horizonte.
4. Registro: Atendimento registrado em prontuário, com rastreabilidade pela gestão certificada na norma ISO 9001.

**7. Perguntas frequentes**

- *Precisa de pedido médico?*
  Para a consulta, a equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.
- *Atende convênio?*
  - Consulta: Particular ou Unimed.
  Se o plano não estiver na lista, o atendimento pode ser particular, com recibo para reembolso.
- *Faz teleconsulta?*
  Não. O atendimento é presencial na NU.V.E.M.
- *Qual idade atende?*
  15 a 95 anos.
- *O que levar?*
  Leve no dia do atendimento:
  - Pedido médico (obrigatório para exames)
  - Guia ou número de autorização (exames por convênio)
  - Documento com foto
  - Carteirinha do convênio
  - Exames anteriores
  - Lista de medicamentos em uso

**8. Agendamento:** "Agende com a Dra. Claudia Utsch", telefone, horário, endereço e botão "Agendar pelo WhatsApp". Rodapé padrão do site (responsável técnica e aviso da Res. CFM nº 2.336/2023).

---

### Dra. Camilla Mendes · `/dra-camilla-mendes`

Status: rascunho (fase 2, sem rota em produção) · versão do texto `93c2662977` · foto: `/images/camilla-mendes.jpg`

**1. Apresentação**

- Rótulo: Médica com atuação em clínica médica
- Nome: Dra. Camilla Mendes
- Registro: CRM 61518
- Botões: "Agendar pelo WhatsApp" (mensagem: "Olá! Gostaria de agendar com a Dra. Camilla Mendes na NU.V.E.M.")

**2. O que faz na NU.V.E.M**

- Consulta de clínica médica · Particular ou Unimed (Unipart, Unimax, Uniplan)
- Faixa etária: 18 a 65 anos
- Teleconsulta: Não. O atendimento é presencial na NU.V.E.M.

**3. Formação**

_(seção oculta: bio pendente)_

**4. Como pode ajudar**

- Atua em: Clínica médica

**5. Exames relacionados**

_(seção oculta: não realiza exames)_

**6. Como é o atendimento**

1. Agendamento: Pelo WhatsApp ou pelo telefone da clínica.
2. Preparo: A clínica envia as orientações para o dia do atendimento.
3. Consulta: Atendimento na NU.V.E.M, na Rua Ceará, 600, em Belo Horizonte.
4. Registro: Atendimento registrado em prontuário, com rastreabilidade pela gestão certificada na norma ISO 9001.

**7. Perguntas frequentes**

- *Precisa de pedido médico?*
  Para a consulta, a equipe confirma essa informação no agendamento, pelo WhatsApp ou telefone.
- *Atende convênio?*
  - Consulta de clínica médica: Particular ou Unimed (Unipart, Unimax, Uniplan).
  Se o plano não estiver na lista, o atendimento pode ser particular, com recibo para reembolso.
- *Faz teleconsulta?*
  Não. O atendimento é presencial na NU.V.E.M.
- *Qual idade atende?*
  18 a 65 anos.
- *O que levar?*
  Leve no dia do atendimento:
  - Pedido médico (obrigatório para exames)
  - Guia ou número de autorização (exames por convênio)
  - Documento com foto
  - Carteirinha do convênio
  - Exames anteriores
  - Lista de medicamentos em uso

**8. Agendamento:** "Agende com a Dra. Camilla Mendes", telefone, horário, endereço e botão "Agendar pelo WhatsApp". Rodapé padrão do site (responsável técnica e aviso da Res. CFM nº 2.336/2023).

---

## 7. Listas "Quando procurar avaliação" · validadas pela Dra. Vera em 09/11/2026

As listas foram montadas só a partir das indicações ("para que serve") das páginas de exame que já estão no site, em linguagem do paciente, sem promessa nem orientação individual. Cada página traz o aviso: "Lista informativa, feita a partir das indicações dos exames. A indicação de cada exame é sempre do médico que acompanha o paciente." A Dra. Raissa, a Dra. Danielle, a Dra. Claudia e a Dra. Camilla não têm lista, porque não realizam exames.

**Dra. Vera Ângelo** (fonte: Testes Respiratórios)

- [x] Gases e inchaço na barriga que se repetem  _(de: Testes Respiratórios)_
- [x] Suspeita de SIBO ou IMO levantada pelo médico  _(de: Testes Respiratórios)_
- [x] Intestino irritável em investigação  _(de: Testes Respiratórios)_

**Dra. Eliane Basques** (fonte: Manometria Anorretal)

- [x] Perda involuntária de fezes  _(de: Manometria Anorretal)_
- [x] Prisão de ventre que continua mesmo com o tratamento  _(de: Manometria Anorretal)_
- [x] Alterações do assoalho pélvico  _(de: Manometria Anorretal)_
- [x] Suspeita de doença de Hirschsprung  _(de: Manometria Anorretal)_
- [x] Avaliação antes ou depois de cirurgia anorretal  _(de: Manometria Anorretal)_

**Dra. Anna Karoline Rocha** (fonte: Avaliação Pélvica)

- [x] Perda involuntária de urina ou de fezes  _(de: Avaliação Pélvica)_
- [x] Alterações do assoalho pélvico  _(de: Avaliação Pélvica)_
- [x] Dificuldade para evacuar ligada ao assoalho pélvico  _(de: Avaliação Pélvica)_
- [x] Dor pélvica que se prolonga  _(de: Avaliação Pélvica)_
- [x] Preparo ou recuperação de cirurgia pélvica  _(de: Avaliação Pélvica)_

**Dr. Gabriel de Souza Fernandes Filho** (fonte: Manometria Esofágica, pHmetria e ImpedanciopHmetria Esofágica)

- [x] Dificuldade para engolir  _(de: Manometria Esofágica)_
- [x] Refluxo que continua mesmo com o tratamento  _(de: Manometria Esofágica)_
- [x] Dor no peito quando o coração já foi avaliado  _(de: Manometria Esofágica)_
- [x] Tosse ou rouquidão que o médico relaciona ao refluxo  _(de: pHmetria e ImpedanciopHmetria Esofágica)_
- [x] Avaliação antes ou depois de cirurgia para refluxo  _(de: pHmetria e ImpedanciopHmetria Esofágica)_

**Dra. Amanda Araújo** (fonte: Manometria Esofágica, pHmetria e ImpedanciopHmetria Esofágica)

- [x] Dificuldade para engolir  _(de: Manometria Esofágica)_
- [x] Suspeita de acalasia  _(de: Manometria Esofágica)_
- [x] Refluxo que continua mesmo com o tratamento  _(de: Manometria Esofágica)_
- [x] Dor no peito quando o coração já foi avaliado  _(de: Manometria Esofágica)_
- [x] Tosse ou rouquidão que o médico relaciona ao refluxo  _(de: pHmetria e ImpedanciopHmetria Esofágica)_

## 8. Pendências [A CONFIRMAR] por profissional

Nenhum desses dados aparece na página enquanto estiver pendente.

**Dra. Vera Ângelo** (`/dra-vera-angelo`)

- A página antiga e o blog citam "Patologia Clínica"; no CFM o RQE 22736 é de Medicina do Trabalho. Confirmar a menção do blog e o item "Residência em Clínica Médica e Patologia Clínica" da página antiga.

**Dra. Eliane Basques** (`/dra-eliane-basques`)

- [A CONFIRMAR] especialidade do RQE 9324 (conferir no portal do CFM)

**Dra. Raissa Dalat** (`/dra-raissa-dalat`)

- [A CONFIRMAR] especialidade do RQE 61983 (conferir no portal do CFM)
- Bio: manter "doenças funcionais do aparelho digestivo" só se for o nome oficial do curso (confirmar com a médica). No resto do site usamos DGBI.

**Dra. Anna Karoline Rocha** (`/dra-anna-karoline`)

- [A CONFIRMAR] faixa etária: os dados de 06/11 dizem "12 a 90 anos" e a anamnese dela diz "15 a 90 anos"
- Tratamento "Dra." para fisioterapeuta: confirmar com a gestão. A página sempre diz "fisioterapeuta" e nunca "médica".

**Dr. Gabriel de Souza Fernandes Filho** (`/dr-gabriel-fernandes-filho`)

- Consulta: os dados de 06/11 diziam que ele só faz exames; a tabela validada de 08/11 inclui consulta particular. A página segue a tabela.

**Dra. Amanda Araújo** (`/dra-amanda-araujo`)

- [A CONFIRMAR] faixa etária: "4 meses a 80 anos"

**Dra. Danielle Martins** (`/dra-danielle-martins`)

- Sem RQE de Nutrologia no CFM: "Nutrologia" não aparece como especialidade. Revisar com a médica e a gestão a "Consulta de nutrologia" e o trecho "pós-graduada em Nutrologia" da bio.

**Dra. Claudia Utsch** (`/dra-claudia-utsch`)

- [A CONFIRMAR] especialidade do RQE 51470
- [A CONFIRMAR] especialidade do RQE 51471
- Convênios: a lista validada diz só "Unimed", sem os planos. Confirmar se são Unipart, Unimax e Uniplan.

**Dra. Camilla Mendes** (`/dra-camilla-mendes`)

- [A CONFIRMAR] UF do CRM 61518
- [A CONFIRMAR] bio
- Sem RQE: a página diz "médica com atuação em clínica médica", nunca "especialista".
- **Bloqueia a publicação:** CRM sem UF confirmada; bio sem texto confirmado

**Dra. Adrianna Buzatti Viana** (só no /equipe, sem página)

- [A CONFIRMAR] especialidade

**Dra. Luiza Auarek** (só no /equipe, sem página)

- [A CONFIRMAR] UF
- [A CONFIRMAR] especialidade

**Dra. Mariana Fernandes** (só no /equipe, sem página)

- [A CONFIRMAR] UF

## 9. Decisões aplicadas e observações de CFM

- **Fotos no `/equipe`:** ficam as fotos atuais até chegar a aprovada pela anamnese. Nas páginas novas, a foto entra junto com a aprovação da página (ela faz parte da versão do texto).
- **`/equipe` em produção:**
  - todos os cartões mostram foto, nome, registro e especialidade;
  - "Na NU.V.E.M" e o link para a página individual só aparecem quando a página está no ar, que hoje são só as duas antigas, da Dra. Vera e da Dra. Eliane;
  - Dra. Adrianna, Dra. Luiza e Dra. Mariana continuam no `/equipe` como hoje, sem página.
- **Mudanças que entram no ar com o merge**, por correção de CFM:
  - no `/equipe`, "Gastroenterologia e Motilidade" vira "Gastroenterologia" (Vera, Amanda e Danielle);
  - quem não tem RQE confirmado da especialidade aparece como "Médica com atuação em ...", hoje Eliane, Raissa, Claudia, Camilla, Adrianna, Luiza e Mariana;
  - os registros passam a seguir o formato `CRM-MG 00000 · RQE 00000 (Especialidade)`;
  - os RQEs da Dra. Vera mostram a especialidade.
- **"Especialista em"** só aparece com RQE confirmado daquela especialidade. Hoje isso vale para Vera, Gabriel, Amanda e Danielle, todos em Gastroenterologia. Os outros aparecem como "Médica com atuação em ...".
- **"Áreas de atuação"** é um termo técnico do CFM. Na página, a lista aparece como "Atua em", e motilidade digestiva aparece só nela, nunca como especialidade.
- **Fisioterapeuta:** registro do Crefito, sempre "Fisioterapeuta", nunca "médica". Fica a pendência do tratamento "Dra.".
- **Schema:** os profissionais passam a ser `Person`, com os registros em `hasCredential` (CRM-MG e cada RQE com a especialidade confirmada, ou Crefito-4), mais `worksFor` e `workLocation` na clínica com endereço.
  - `Physician` foi trocado porque, no schema.org, ele é um tipo de estabelecimento e não aceita `hasCredential`.
  - O `@id` `/#dra-vera-angelo` usado pelo blog foi mantido.
  - A página emite também `BreadcrumbList` e `FAQPage`.
  - Os autores do blog que não são a Dra. Vera continuam como `Physician`. Fica para outro PR.
- **Fora do escopo, para revisar:**
  - o rodapé mostra "RQE 10411 · RQE 22736" sem a especialidade;
  - o blog atribui o RQE 22736 a Patologia Clínica, mas no CFM ele é de Medicina do Trabalho.

## 10. O que foi verificado

- `npm run lint`: sem erros. Os 27 avisos já existiam e nenhum é dos arquivos novos.
- Build de produção (`VERCEL_ENV=production npm run build`): passou.
  - Rotas geradas: só `/dra-vera-angelo` e `/dra-eliane-basques`, com a página antiga.
  - As outras 7 dão 404.
  - O sitemap e o `/equipe` só apontam para as duas.
- Prévia local:
  - as 9 páginas abrem, com faixa e `noindex`;
  - `/en/dra-raissa-dalat` volta para o português;
  - um endereço inexistente dá 404;
  - no celular (375 px), os dois botões aparecem sem rolar.
- Teste de aprovação: o passo a passo da seção 3 foi testado num build de produção e não foi commitado.
- **Não verificado:**
  - a prévia da Vercel, que só existe depois do PR;
  - a configuração do GTM;
  - a ligação com o #142, que depende do merge.

## 10. Atualização de 09/11/2026

**Página antiga da Dra. Vera (a que está no ar em `/dra-vera-angelo`), corrigida:**

- Sem superlativos: saíram "formação sólida" e "a maior universidade federal de Minas Gerais".
- Saiu "Residência em Clínica Médica e Patologia Clínica · Hospital Sarah Kubitschek": no CFM o RQE 22736 é de Medicina do Trabalho. Volta só se a Dra. Vera confirmar.
- Os RQEs aparecem com a especialidade: RQE 10411 (Gastroenterologia) · RQE 22736 (Medicina do Trabalho).
- "Áreas de atuação" segue o que ela informou na anamnese: SIBO e IMO, testes respiratórios, motilidade digestiva e DGBI. Saíram manometria, pHmetria, intolerâncias, disbiose, doença inflamatória intestinal e ensino, que ela não realiza na NU.V.E.M.
- "Certificado ISO 9001" virou "com gestão certificada pela norma ISO 9001".
- Último parágrafo sem "cuidado concreto e humanizado": diz o que ela faz na clínica (consulta e testes respiratórios para SIBO e IMO).

**Página antiga da Dra. Eliane:** saíram "formação sólida" e "a maior universidade federal de Minas Gerais".

**Dados das páginas novas:**

- Dr. Gabriel: convênios "somente particular" confirmados pela gestão (sai a pendência).
- Dra. Claudia: bio a partir do currículo enviado pela gestão. Continuam pendentes as especialidades dos RQEs 51470 e 51471.
- Continua pendente: faixa etária da Dra. Amanda ("4 meses a 80 anos" no link; "a partir de 15 anos" no PDF).

## 11. Atualização de 09/11/2026: livros e agendamento

- **Página nova da Dra. Vera:** entra a seção "Publicações · Livros publicados", logo depois da formação, com os 4 livros da página antiga (mesmos títulos, capas e links para a Editora Rubio). O selo "Novo" da página antiga não foi levado.
  - Os livros ficam no campo `livros` de `src/lib/profissionais.ts`, e qualquer profissional pode ter a seção.
  - A versão do texto da Dra. Vera passou a ser `2a689f0041`. Se a aprovação já tiver sido dada sobre a versão anterior, ela precisa ser registrada de novo com esta versão.
- **Bloco de agendamento** (vale para todas as páginas):
  - à esquerda, os botões "Agendar pelo WhatsApp" e "Ligar", com o horário da clínica em duas linhas e o endereço com CEP;
  - à direita, o mapa;
  - quando o profissional tem dia de atendimento próprio (ex.: Dra. Eliane, às quintas), esse dia aparece embaixo do horário.
- **Mapa:** é o Google Maps, mas só carrega quando a pessoa clica em "Mostrar mapa". Antes disso aparecem o endereço e o link "Abrir no Google Maps".
  - O mapa incorporado grava cookies do Google, e o banner de cookies do site só cobre análise e anúncios. Carregar só no clique evita cookie sem consentimento (LGPD).
  - O clique em "Abrir no Google Maps" continua contando como `clique_mapa` no GTM.

## 12. Página da Dra. Vera aprovada (09/11/2026)

- Aprovação registrada em `src/lib/profissionais.ts`, na versão `2a689f0041` (a versão com os livros):
  - médica: Dra. Vera Ângelo;
  - clínica: Ana Paula, gestão do site, em nome da clínica.
- Com o merge, a página nova substitui a antiga em `/dra-vera-angelo`, no mesmo endereço. Ela continua no sitemap e o cartão do `/equipe` passa a mostrar "Na NU.V.E.M". A foto é a atual do site (`/images/dra-vera.jpg`), que fazia parte da versão aprovada.
- A lista "Quando procurar avaliação" continua como rascunho e não aparece em produção. Para publicá-la, a Dra. Vera precisa validar a lista. Isso muda a versão do texto, e a aprovação tem de ser registrada de novo.
- Depois do merge, `src/components/profissionais/antigas/PaginaAntigaVera.tsx` deixa de ser usada. Ela só volta ao ar se o texto mudar sem uma nova aprovação.
- Verificado num build de produção local:
  - `/dra-vera-angelo` sem a faixa de rascunho, com os livros e o mapa;
  - `/dra-eliane-basques` com a página antiga;
  - as demais páginas dão 404.

## 13. Listas "Quando procurar avaliação" validadas (09/11/2026)

- A Dra. Vera validou as 5 listas: a dela e as da Dra. Eliane, da Dra. Anna Karoline, do Dr. Gabriel e da Dra. Amanda. Em `src/lib/profissionais.ts`, cada lista passou de `validacao: 'rascunho'` para `{ por: 'Dra. Vera Ângelo', data: '2026-11-09' }`.
- **Dra. Vera:** a lista passa a aparecer na página publicada, sem o selo de rascunho.
  - Como a validação faz parte do texto, a versão mudou de `2a689f0041` para `2597ae4057`.
  - A aprovação foi registrada de novo nessa versão, com a mesma médica, a mesma clínica e a mesma data. Sem isso, a página voltaria para a antiga no próximo deploy.
- **Demais profissionais:** a lista já sai validada e entra no ar junto com a página quando ela for aprovada. Isso mudou a versão do texto de Eliane, Anna Karoline, Gabriel e Amanda. Use as versões da tabela da seção 2 ao registrar as aprovações.
- Conferido num build de produção local:
  - `/dra-vera-angelo` mostra "Quando procurar avaliação" com os 3 itens e o aviso;
  - `/dra-eliane-basques` continua com a página antiga.

## 14. Páginas publicadas (09/11/2026)

A gestão do site informou que os profissionais aprovaram as páginas e pediu a publicação. As aprovações foram registradas em `src/lib/profissionais.ts` na versão atual de cada página:
- profissional: o próprio nome, com a observação "informada pela gestão do site";
- clínica: Ana Paula, gestão do site, em nome da clínica.

| Página | Versão aprovada |
|---|---|
| Dra. Eliane Basques · `/dra-eliane-basques` (substitui a página antiga) | `85c578a344` |
| Dra. Raissa Dalat · `/dra-raissa-dalat` | `b7ffad55df` |
| Dra. Anna Karoline Rocha · `/dra-anna-karoline` (fisioterapeuta) | `22ade9e187` |
| Dr. Gabriel de Souza Fernandes Filho · `/dr-gabriel-fernandes-filho` | `8daf788a11` |
| Dra. Amanda Araújo · `/dra-amanda-araujo` | `24ebb384d3` |
| Dra. Danielle Martins · `/dra-danielle-martins` (era fase 2) | `49d9899a98` |
| Dra. Claudia Utsch · `/dra-claudia-utsch` (era fase 2) | `7268ebc8f1` |

- **Dra. Camilla Mendes continua fora do ar.** Faltam o UF do CRM e a bio, e as duas pendências bloqueiam a publicação.
- **Dados pendentes não aparecem nas páginas:**
  - faixa etária da Dra. Anna e da Dra. Amanda;
  - especialidade dos RQEs da Dra. Eliane, da Dra. Raissa e da Dra. Claudia;
  - planos Unimed da Dra. Claudia.
  Quando forem confirmados, o texto muda e a aprovação precisa ser registrada de novo.
- **Para revisar com a gestão (CFM):** na página da Dra. Danielle aparecem a "Consulta de nutrologia" e "pós-graduada em Nutrologia" na bio, sem RQE de Nutrologia. A página não a chama de especialista em Nutrologia.
- **Com isso, saem de uso:** `src/components/profissionais/antigas/` (páginas antigas da Vera e da Eliane), já que as duas têm páginas novas aprovadas.
- **Conferido num build de produção local:**
  - as 8 páginas respondem 200, sem faixa de rascunho e sem noindex;
  - `/dra-camilla-mendes` dá 404;
  - o sitemap e o `/equipe` apontam para as 8.
