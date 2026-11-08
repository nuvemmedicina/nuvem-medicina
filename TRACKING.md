# Rastreamento: GTM, GA4, Google Ads e Meta

Atualizado em 08/11/2026 · branch `fix/correcoes-cfm-rastreio-nov26` · Bloco 1.

Contêiner: **GTM-N78Z3XT** · GA4: **G-J90YW71NMZ** · Google Ads: **AW-18362842181** · Meta Pixel: **986883368837314**

O site não tem acesso ao painel do GTM, do GA4, do Ads nem do Meta. Tudo o que
aparece aqui como "contêiner" foi lido do arquivo público `gtm.js` publicado
em 08/11/2026. As seções 4 a 7 são tarefas para fazer nos painéis.

---

## 1. Diagnóstico: por que o GA4 mostra menos visualizações que usuários

Dados do GA4 (09/08 a 06/11/2026): home com 71 visualizações para 459
usuários, `/exames/testes-respiratorios` com 0 visualizações para 397 usuários.

Como o site carrega a medição:

1. `ConsentDefault` (antes de tudo) define `analytics_storage`, `ad_storage`,
   `ad_user_data` e `ad_personalization` como `denied`. Se a pessoa já escolheu
   antes, aplica a escolha salva na mesma passada.
2. `GoogleTagManager` carrega o contêiner. Não existe gtag.js em paralelo.
3. No contêiner, a tag do Google do GA4 dispara em **Initialization - All
   Pages**, com `send_page_view: true`, e **nenhuma tag exige consentimento
   adicional**: o Consent Mode está no modo avançado.

O que acontece na primeira visita:

| Momento | Consentimento | O que o GA4 recebe |
|---|---|---|
| Página carrega | negado | page_view como sinal sem cookie. Não entra nos relatórios padrão. |
| Pessoa clica em "Aceitar todos" | concedido | nada. O GA4 não reenvia o page_view. |
| Rola a página, clica em WhatsApp | concedido | `scroll_90`, `clique_whatsapp` etc. com cookie: o usuário passa a contar. |

Resultado: usuários sem visualização, inclusive na primeira página da visita.
Páginas de entrada de anúncio, como a de testes respiratórios, são as mais
afetadas, porque quase toda visita começa nelas com o banner aberto.

Não havia `send_page_view: false`, nem carregamento duplicado, nem page_view
dependente de evento que não dispara. A navegação entre páginas do App Router
é coberta pela medição otimizada do GA4 ("mudanças de página com base em
eventos do histórico do navegador"), que precisa continuar ligada (seção 4.2).

## 2. O que mudou no código

| Arquivo | Mudança |
|---|---|
| `src/lib/consent.ts` | Emite `consentimento_concedido` quando o analytics passa de negado para concedido na mesma visita. |
| `src/lib/gtm.ts` | Novos auxiliares `TipoAtendimento`, `tipoAtendimentoDaEspecialidade` e `tipoAtendimentoDoCaminho`. |
| `src/app/[locale]/agendar/AgendarForm.tsx` | `servico_interesse` passa a levar só o tipo: `consulta`, `exame`, `fisioterapia` ou `ensino`. |
| `src/components/blog/ChamadaExame.tsx` | `clique_cta_artigo` deixa de levar o caminho do exame ou da especialidade; ganha `tipo_atendimento`. |
| `src/components/links/LinkBioButton.tsx` | `clique_link_bio` deixa de levar `rotulo` e `destino`; ganha `tipo_destino` e `tipo_atendimento`. |
| `src/app/[locale]/obrigado/ConversaoTag.tsx` | Só comentário. `pagina_obrigado` continua igual. |

### 2.1 Evento `consentimento_concedido`

```js
{
  event:         'consentimento_concedido',
  page_location: 'https://www.nuvemmedicina.com.br/exames/testes-respiratorios?utm_source=google&gclid=...',
  page_path:     '/exames/testes-respiratorios',
  page_title:    'Testes Respiratórios | NU.V.E.M Medicina'
}
```

Regras implementadas:

- Só dispara na passagem de **negado para concedido** do analytics. Quem volta
  com o aceite já salvo não dispara: o page_view normal da tag do Google já
  saiu com consentimento.
- Uma vez por página (por caminho) na mesma visita.
- Quem recusa não dispara nada. "Personalizar" com analytics desligado também não.
- O update de consentimento entra no dataLayer **antes** do evento, então a tag
  acionada por ele já sai com analytics concedido.
- `page_location` leva a URL completa de propósito: é deste page_view que o
  GA4 tira a origem da sessão (utm_*, gclid) de quem aceitou. Os formulários do
  site não usam GET, então não há dado pessoal na query string.

### 2.2 Dado de saúde fora dos eventos

Regra do projeto: nenhum dado pessoal ou de saúde no dataLayer, GA4 ou Meta.
O nome do exame ou da especialidade escolhida pela pessoa conta como dado de
saúde. O caminho da página visitada continua permitido.

| Evento | Antes | Depois |
|---|---|---|
| `envio_agendamento` | `servico_interesse: 'Testes Respiratórios'` | `servico_interesse: 'exame'` |
| `clique_cta_artigo` | `destino: '/exames/testes-respiratorios'`, `tipo_destino: 'exame'` | `tipo_destino: 'pagina'` ou `'whatsapp'`, `tipo_atendimento: 'exame'` |
| `clique_link_bio` | `rotulo: 'Testes Respiratórios'`, `destino: '/exames/testes-respiratorios'` | `tipo_destino: 'interno'`, `tipo_atendimento: 'exame'` |

Valores de `tipo_atendimento`: `consulta`, `exame`, `fisioterapia`, `ensino` e,
no `clique_link_bio`, também `institucional` (convênios, blog, WhatsApp etc.).
A especialidade Fisioterapia Pélvica vira `fisioterapia`; a Avaliação Pélvica,
que é exame, vira `exame`.

O parâmetro do formulário continua com o nome `servico_interesse`, para a
variável do GTM seguir funcionando sem mudança.

## 3. Os eventos do site

| Evento | Quem emite | Parâmetros | Tag GA4 no contêiner |
|---|---|---|---|
| `clique_whatsapp` | GTM, clique em link `wa.me` | `origem_pagina`, `texto_botao` | sim (+ conversão Ads) |
| `clique_telefone` | GTM, clique em link `tel:` | `origem_pagina` | sim (+ conversão Ads) |
| `envio_agendamento` | código, `pushEvent` no /agendar | `servico_interesse`, `origem_pagina`, `whatsapp_abriu` | sim |
| `download_preparo` | GTM, clique em link `.pdf` | `arquivo`, `origem_pagina` | sim |
| `interacao_nuvete` | código, `pushEvent`, 1x por sessão | `origem_pagina` | **errada, ver 5.1** |
| `clique_mapa` | GTM, clique em link do Google Maps | `origem_pagina` | sim |
| `scroll_90` | GTM, profundidade de rolagem | `origem_pagina` | sim |
| `pagina_obrigado` | código, `pushEvent` no /obrigado | nenhum | só conversão Ads |
| `clique_link_bio` | código, `pushEvent` no /links | `tipo_destino`, `tipo_atendimento`, `bloco`, `posicao` | sim (+ Meta) |
| `clique_cta_artigo` | código, `pushEvent` no blog | `artigo`, `tipo_destino`, `tipo_atendimento` | **não existe** |
| `abriu_faq` | código, `pushEvent` no blog, 1x por sessão | `artigo` | **não existe** |
| `consentimento_concedido` | código, `consent.ts` | `page_location`, `page_path`, `page_title` | **criar, ver 4.1** |

Dos 7 eventos de conversão, só `envio_agendamento` e `interacao_nuvete` saem
pelo `pushEvent`. Os outros 5 vêm de acionadores do próprio GTM (cliques em
link e rolagem). Cada um dispara uma vez por ação. Nenhum evento emitido pelo
código leva nome, telefone, e-mail, sintoma, exame ou texto da nuvete.

---

## 4. Tarefas no GTM (obrigatórias para corrigir as visualizações)

### 4.1 Nova tag: page_view após o consentimento

1. **Variáveis** › Variáveis definidas pelo usuário › Nova › *Variável da camada de dados*. Criar três, versão 2:
   - `DLV · page_location` → nome `page_location`
   - `DLV · page_path` → nome `page_path`
   - `DLV · page_title` → nome `page_title`
2. **Acionadores** › Novo › *Evento personalizado*:
   - Nome: `CE · consentimento_concedido`
   - Nome do evento: `consentimento_concedido`
   - Todos os eventos personalizados.
3. **Tags** › Nova › *Google Analytics: evento do GA4*:
   - Nome: `GA4 · page_view após consentimento`
   - ID de medição: `G-J90YW71NMZ`
   - Nome do evento: `page_view`
   - Parâmetros do evento:
     - `page_location` → `{{DLV · page_location}}`
     - `page_path` → `{{DLV · page_path}}`
     - `page_title` → `{{DLV · page_title}}`
   - Acionador: `CE · consentimento_concedido`
4. **Não mude** a tag do Google do GA4: ela continua com `send_page_view: true`.
   As duas tags não contam em dobro, porque a nova só dispara para quem
   carregou a página com analytics negado, e o page_view dessa pessoa no
   carregamento foi um sinal sem cookie.

### 4.2 Conferir no GA4

Administrador › Fluxos de dados › Web › **Medição otimizada** › engrenagem ›
Visualizações de página › Mostrar configurações avançadas:

- "Mudanças de página com base em eventos do histórico do navegador":
  **ligada**. É isso que conta a navegação entre páginas do App Router.

### 4.3 Tags para os eventos sem tag

**`clique_cta_artigo`**

1. Variáveis da camada de dados: `DLV · artigo`, `DLV · tipo_destino`,
   `DLV · tipo_atendimento`.
2. Acionador *Evento personalizado* `CE · clique_cta_artigo`, nome do evento `clique_cta_artigo`.
3. Tag *Evento do GA4* `GA4 · clique_cta_artigo`, nome do evento `clique_cta_artigo`,
   parâmetros `artigo`, `tipo_destino`, `tipo_atendimento`, `origem_pagina` (`{{Page Path}}`).

**`abriu_faq`**

1. Acionador *Evento personalizado* `CE · abriu_faq`, nome do evento `abriu_faq`.
2. Tag *Evento do GA4* `GA4 · abriu_faq`, parâmetros `artigo` (`{{DLV · artigo}}`)
   e `origem_pagina` (`{{Page Path}}`).

Depois, no GA4 › Administrador › Definições personalizadas, criar as
dimensões de evento `tipo_destino`, `tipo_atendimento` e `artigo`, se ainda
não existirem.

### 4.4 Atualizar a tag do `clique_link_bio`

A tag `GA4 · clique_link_bio` (e a tag HTML `CliqueLinkBio` do Meta) usam as
variáveis `rotulo` e `destino`, que o código deixou de enviar. Trocar por
`tipo_destino` e `tipo_atendimento`, mantendo `bloco` e `posicao`.

---

## 5. Problemas encontrados no contêiner (corrigir no painel)

### 5.1 Conversa com a nuvete está sendo contada como agendamento · URGENTE

A tag de id 37 envia o evento GA4 **`envio_agendamento`**, mas o acionador
dela é `interacao_nuvete`. Toda pessoa que abre a nuvete aparece no GA4 como
se tivesse enviado o formulário de agendamento, e o evento `interacao_nuvete`
não existe no GA4.

Corrigir: abrir a tag acionada por `interacao_nuvete` e trocar o **nome do
evento** para `interacao_nuvete`. Os números de `envio_agendamento` até hoje
estão inflados por isso.

### 5.2 Meta Pixel carrega sem consentimento · URGENTE (LGPD)

A tag HTML personalizada do Meta Pixel dispara em todas as páginas
(`gtm.js`) e faz `fbq('track','PageView')`. Tag HTML personalizada não
respeita o Consent Mode sozinha: o Pixel carrega e envia PageView **antes do
aceite e também para quem recusa**. O PageView do Meta leva a URL da página,
inclusive de páginas de exame.

Corrigir:

1. Na tag do Pixel e na `CliqueLinkBio`: Configurações avançadas ›
   Configurações de consentimento › **Exigir consentimento adicional** ›
   `ad_storage`. Com isso o GTM segura a tag até o aceite e dispara depois.
2. No Gerenciador de Eventos do Meta › Pixel › Configurações: **desligar a
   correspondência avançada automática**. Ligada, ela lê campos de formulário
   (nome, telefone, e-mail do /agendar) e envia ao Meta.
3. Avaliar com a clínica se o Pixel precisa ficar nas páginas de exame e de
   especialidade. O Meta trata URL de saúde como informação sensível.

### 5.3 Conversão de telefone do Ads com ID de transação fixo

A tag de conversão `M-bJCM3ms98cEMX4irRE` (acionada por clique em `tel:`) tem
o campo **ID do pedido** preenchido com o valor fixo `18362842181`. O Google
Ads remove conversões duplicadas pelo ID do pedido: com um valor fixo, só a
primeira ligação da história da conta é contada. Corrigir: **apagar** o campo
ID do pedido dessa tag.

### 5.4 `download_preparo` e `clique_whatsapp` levam o que a pessoa escolheu

- `download_preparo` envia `arquivo` com a URL do PDF
  (`preparo-manometria-esofagica-v1.pdf`), ou seja, qual exame a pessoa vai
  fazer. Pela regra do projeto, trocar o parâmetro por um valor genérico
  (por exemplo o texto fixo `preparo`) ou removê-lo, mantendo `origem_pagina`.
- `clique_whatsapp` envia `texto_botao` (Click Text). Se algum botão de
  WhatsApp tiver nome de exame no texto, ele vai junto. Recomendação: remover
  o parâmetro, ou trocar por `origem_pagina` apenas.

### 5.5 Variável de coleta automática de dados do usuário

O contêiner tem uma variável de dados fornecidos pelo usuário em modo
automático (`__awec`, coleta automática de PII ligada). Nenhuma tag lida no
`gtm.js` a usa hoje, e as conversões estão com conversões otimizadas
desligadas. Conferir em Administrador › Configurações da tag do Google se a
"coleta automática de dados fornecidos pelo usuário" está desligada, e apagar
a variável se não tiver uso.

---

## 6. Conversão principal de agendamento

O `/obrigado` não serve como conversão principal: a pessoa vai para o
WhatsApp e muitas vezes não volta para a aba do site. O `pagina_obrigado`
continua no código.

**GA4** (Administrador › Eventos principais):

1. Marcar `envio_agendamento` e `clique_whatsapp` como eventos principais.
2. Corrigir antes a tag 37 (seção 5.1), senão a nuvete continua inflando
   `envio_agendamento`.

**Google Ads** (Metas › Conversões › Resumo):

1. Nova ação de conversão por importação do GA4: importar `envio_agendamento`.
   Definir como **Principal**, contagem **Uma**.
2. A ação de clique no WhatsApp (tag `SRxQCIzCsd8cEMX4irRE`) já existe:
   deixar como **Principal**, contagem **Uma**.
3. A ação ligada ao `pagina_obrigado` (tag `VjVOCP6y6t4cEMX4irRE`): mudar para
   **Secundária**. Ela continua registrando, mas sai da otimização de lances.
4. Não importar `envio_agendamento` do GA4 e manter `pagina_obrigado` como
   principal ao mesmo tempo: o mesmo agendamento contaria duas vezes.

Atenção: quem envia o formulário também abre o WhatsApp pelo `window.open`,
mas isso **não** gera `clique_whatsapp` (não é clique em link). Os dois
eventos não se sobrepõem.

---

## 7. Passo a passo para testar

### 7.1 GTM Preview / Tag Assistant

1. No GTM, clique em **Visualizar** e informe a URL do preview da Vercel
   (o deploy de preview do PR). Abra em aba anônima, para começar sem
   consentimento salvo.
2. **Primeira visita, aceitando:**
   - No carregamento, o painel mostra `Consent` com tudo `denied` e a tag do
     Google do GA4 disparada.
   - Clique em "Aceitar todos". Devem aparecer, nesta ordem, um evento
     `Consent` (update, `granted`) e o evento `consentimento_concedido`.
   - Em `consentimento_concedido`, a tag `GA4 · page_view após consentimento`
     deve estar em **Tags disparadas**. Na aba Camada de dados, conferir
     `page_location`, `page_path` e `page_title`.
3. **Mesma visita, navegando:** clique num link interno. Deve aparecer
   `gtm.historyChange`, e **não** um novo `consentimento_concedido`.
4. **Visita de volta:** recarregue a página. O `Consent` inicial já mostra
   `granted` e não há `consentimento_concedido`.
5. **Recusa:** limpe os dados do site (ou outra aba anônima) e clique em
   "Recusar". Não deve haver `consentimento_concedido`. Depois de corrigir a
   seção 5.2, as tags do Meta também não podem aparecer como disparadas.
6. **Formulário:** em `/agendar`, preencha e envie. O evento
   `envio_agendamento` deve ter `servico_interesse` igual a `consulta`,
   `exame`, `fisioterapia` ou `ensino`, nunca o nome do exame. Nome,
   telefone, e-mail e mensagem não podem aparecer em nenhuma variável.
7. **Nuvete:** abra a nuvete e clique num tópico. Depois de corrigir a seção
   5.1, a tag disparada deve ser a do evento `interacao_nuvete`, e não
   `envio_agendamento`.

### 7.2 DebugView do GA4

1. Com o Preview ativo, abra GA4 › Administrador › **DebugView**.
2. Repita o passo 7.1.2: após o aceite deve chegar um `page_view` com
   `page_location` da página atual.
3. Navegue para outra página: chega um `page_view` (da medição otimizada).
4. Confira que não chegam dois `page_view` seguidos para a mesma página.

### 7.3 Depois de publicado

Em Relatórios › Engajamento › Páginas e telas, comparar visualizações e
usuários por página uma semana antes e uma semana depois. A diferença entre
visualizações e usuários deve cair bastante. O número não fica igual ao de
usuários, porque quem recusa não é contado, e isso é o comportamento
esperado.
