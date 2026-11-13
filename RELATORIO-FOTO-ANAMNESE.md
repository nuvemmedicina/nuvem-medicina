# Foto e autorização de uso de imagem na anamnese dos médicos

Branch `feat/anamnese-foto-autorizacao`, criada a partir da `main` em 08/11/2026. Não há deploy em produção: o código só vai ao ar depois do merge.

## O que foi feito

Um commit por item:

| Commit | O que muda |
|---|---|
| `fix(anamnese): sem GTM e com noindex` | O GTM não carrega mais em `/anamnese-ia`. Antes, o GA4 recebia o endereço completo, com o código de acesso `?c=`. O `pushEvent` ignora essas rotas. O servidor manda `X-Robots-Tag: noindex`, `Referrer-Policy: no-referrer` e `Cache-Control: private` nas páginas e na API da anamnese. |
| `feat(anamnese): campo de Instagram` | Campo opcional "Instagram profissional" na identificação do médico. Aceita `@perfil`, `perfil` ou o link e guarda sempre como `@perfil`. Avisa quando o formato não vale. |
| `feat(anamnese): código de acesso v2` | O código passa de 10 para 32 caracteres. Cada profissional novo tem link próprio (`links.mjs --novo "Nome"`), e é possível cancelar o link de uma pessoa só. **Os links antigos deixam de funcionar.** |
| `feat(anamnese): envio da foto` | Seção "Sua foto para o site", com orientações, molduras 4:5 e 1:1 e as opções "a clínica providencia" e "sem foto". Envio direto para o armazenamento privado. No servidor: tipo conferido pelo conteúdo do arquivo, até 10 MB, mínimo de 1200 px, metadados removidos e versões em WebP. |
| `fix(anamnese): HEIC` | O sharp não lê HEIC. O navegador converte HEIC para JPG antes do envio quando consegue abrir o arquivo (Safari no iPhone e no Mac). Quando não consegue (Chrome e Edge no Windows), mostra uma mensagem pedindo JPG. O servidor só recebe JPG, PNG e WebP. |
| `chore(lint): ESLint 9` | É o mesmo commit do PR #140. A `main` usa `next lint`, que o Next 16 removeu, então o lint não rodava. Some sozinho quando os dois PRs entrarem. |
| `feat(anamnese): termo de autorização` | Termo (versão 1.0, hoje 1.1) em `src/lib/anamnese-ia/termo-imagem.ts`, com caixa de aceite obrigatória e desmarcada. Cada aceite gera um registro que não pode ser editado. |
| `feat(anamnese): aprovação da página` | Rota `/anamnese-ia/medico/<slug>/aprovacao`, com prévia e os botões "Aprovo a publicação" e "Quero ajustes". Status por médico e regras de publicação. |
| `feat(anamnese): painel` | Tela `/anamnese-ia/painel`, com um código para a Ana Paula e outro para a Dra. Vera. Tem lista com status, ações e o CSV das autorizações. |
| 2 commits `fix(anamnese)` | Ajustes encontrados nos testes: Instagram com espaço passou a mostrar o aviso; prévia do painel e iniciais sem acento. |
| `feat(anamnese): foto já usada no site` | A foto atual do site entra no histórico como envio 0 e aparece com o título "Esta é a foto que usamos hoje no site". As opções são "Aprovo esta foto" (exige o termo), "Quero enviar outra", "a clínica providencia" e "sem foto". |
| `feat(anamnese): origem da foto no painel` | Cada profissional mostra a origem da foto: atual do site, nova enviada, a clínica providencia ou sem foto. |
| `feat(anamnese): termo versão 1.1` | Acrescenta a frase "Esta autorização inclui as fotos minhas que a NU.V.E.M Medicina já usa no site e nos materiais da clínica." Continua pendente de revisão pela gestão. |

A rota `/anamnese-ia/validacao` não mudou.

## Fotos que o site já usa (envio 0)

Mapeadas em 08/11/2026, em `src/lib/anamnese-ia/fotos-site.ts`:

| Profissional | Arquivo | Tamanho | Onde aparece |
|---|---|---|---|
| Dra. Vera Ângelo | `/images/dra-vera.jpg` | 900 × 900 | /equipe, /dra-vera-angelo, /sobre, /ensino, especialidades gastroenterologia, halitose e motilidade digestiva |
| Dra. Eliane Basques | `/images/dra-eliane.jpg` | 900 × 900 | /equipe, /dra-eliane-basques, /sobre, /ensino, especialidade pediatria |
| Dra. Amanda Araújo | `/images/Amanda-Araujo.jpg` | 1691 × 1691 | /equipe |
| Dra. Anna Karoline | `/images/anna-karoline.jpg` | 900 × 900 | /equipe, especialidade fisioterapia pélvica |
| Dra. Claudia Utsch | `/images/claudia-utsch.jpg` | 900 × 900 | /equipe, especialidade gastroenterologia |
| Dra. Camilla Mendes | `/images/camilla-mendes.jpg` | 900 × 900 | /equipe |
| Dra. Danielle Martins | `/images/danielle-martins.jpg` | 900 × 900 | /equipe, especialidade gastroenterologia |
| Dr. Gabriel de Souza Fernandes Filho | `/images/dr-Gabriel-de-Souza-Fernandes-Filho.jpg` | 1691 × 1691 | /equipe, especialidade motilidade digestiva |
| Dra. Raissa Dalat | `/images/raissa-dalat.jpg` | 700 × 700 | /equipe |

As especialidades aparecem nos 3 idiomas.

- **Fora da importação**, por não entrarem no atendimento automático: Dra. Adrianna Buzatti Viana (`adrianna-buzatti-viana.jpg`), Dra. Luiza Auarek (`luiza-auarek.jpg`) e Dra. Mariana Fernandes (`mariana-fernandes.jpg`).
- **Outras fotos da Dra. Vera que não foram importadas:**
  - `dra-vera-angelo.jpg` (1080 × 1080), usada nos slides da home;
  - `dra-vera-angelo-1.jpeg` e `dra-vera-dr-dan-l-waiztberg.jpg`, que não são usadas em nenhuma página.

**Como funciona a importação:**
- Ela acontece na primeira vez que o médico abre a anamnese, ou quando o painel é aberto, e não se repete.
- A foto é lida no endereço público do site, porque na Vercel a pasta `public` não fica no disco das funções. O arquivo em `public/images` não muda.
- A cópia vai para o Blob privado, em `anamnese-ia/fotos/<escopo>/site/`, sem metadados e com as versões 4:5 e 1:1.
- Fotos com menos de 1200 px não são ampliadas. A versão 4:5 de uma foto de 900 px, por exemplo, sai com 720 × 900. O painel avisa quando a foto está abaixo de 1200 px.
- Importar não escolhe nada pelo médico. A foto do site só vira a foto da página quando ele marca "Aprovo esta foto" e aceita o termo. Esse aceite fica registrado com o identificador do envio 0. Ela é usada pela equipe toda para validar os preparos de exames, e misturar os dois fluxos ali quebraria o link compartilhado.

## Onde ficam as fotos e os registros

| O quê | Onde | Quem acessa |
|---|---|---|
| Fotos (original sem metadados em JPEG, versão 4:5 de 1200 × 1500 e 1:1 de 1080 × 1080 em WebP) | Vercel Blob **privado**, em `anamnese-ia/fotos/<escopo>/<id-da-foto>/` | Só pela rota `/api/anamnese-ia/foto/arquivo`. O médico vê as versões 4:5 e 1:1 das próprias fotos; o painel acessa tudo, inclusive a original. |
| Arquivo enviado pelo médico (com EXIF e GPS) | `anamnese-ia/envios/...` no Blob | É apagado logo depois do processamento, com ou sem erro. |
| Histórico de envios, foto atual, opção, tentativas e aprovação da clínica | Sanity, documento privado `anamnese-ia.fotos.<escopo>` | API com código |
| Registro das autorizações (aceites e revogações) | Sanity, um documento por registro: `anamnese-ia.autorizacao.<escopo>.<data>-<id>` | API com código do painel; CSV no painel |
| Versões do texto da página, decisões do médico e publicações | Sanity, `anamnese-ia.pagina.<escopo>` | API com código |

Todos os IDs no Sanity têm ponto, então são privados: não aparecem na leitura pública do blog. Nada disso entra em página pública nem no sitemap.

**Por que não usar o Sanity para as fotos:** arquivos no Sanity são públicos para quem tem o endereço, mesmo num dataset privado. Por isso eles não atendem a regra de "original com acesso restrito".

**Sobre a "original":** guardamos a foto em resolução cheia, mas já sem metadados (EXIF, GPS, modelo do aparelho). O arquivo exatamente como foi enviado é apagado, porque ele traz a localização.

### O que cada registro de autorização guarda

- Nome completo, registro profissional, slug e escopo.
- Versão do termo e SHA-256 do texto exato que a pessoa leu, com o nome e o registro dela.
- Data e hora em UTC; o CSV mostra também em Brasília.
- Identificador da foto enviada.
- Início do IP: 2 números no IPv4 (`189.6.x.x`) e 2 grupos no IPv6.
- Quem registrou: o profissional ou a gestora.
- Motivo, no caso de revogação.
- Hash do registro anterior e o próprio hash. Isso forma uma corrente: se alguém editar um registro direto no Sanity, o painel e o CSV mostram "Corrente íntegra: NÃO".

Nenhuma rota altera ou apaga esses registros. Uma revogação cria um registro novo.

## Verificação antes do merge (08/11/2026)

**1. Sanity sem token.** Consulta à API pública (`q8ibxbuz.apicdn.sanity.io` e `api.sanity.io`, dataset `production`), sem token:

| Consulta GROQ | Sem token | Com o token do projeto |
|---|---|---|
| `count(*[_type == "post"])` | 25 | – |
| `count(*[_id in path("anamnese-ia.**")])` | **0** | 7 (respostas da anamnese) |
| `count(*[_type in ["anamneseIaResposta","anamneseIaFotos","anamneseIaAutorizacao","anamneseIaPagina"]])` | **0** | – |
| `count(*[string::startsWith(_id, "anamnese")])` | **0** | – |

Os documentos existem, mas a leitura pública não os enxerga. Todo ID criado pelo código começa com `anamnese-ia.` e tem ponto: respostas, `anamnese-ia.fotos.*`, `anamnese-ia.autorizacao.*` e `anamnese-ia.pagina.*`. Um teste automático confere isso.

**2. Blob privado.** O único `put` grava com `access: 'private'`, e o envio do navegador também é `private`. Não existe nenhuma gravação pública no código, nem depois da aprovação: a publicação no site continua manual. O caminho no Blob fica guardado no Sanity, e a imagem só sai pela rota com código. Com o código do médico, a rota recusa a original (403); sem código, recusa tudo (403).

**3. HEIC.** O navegador converte para JPG ou mostra uma mensagem pedindo JPG. No Chromium, um arquivo HEIC mostra a mensagem e não libera o botão de envio. Se um HEIC chegar ao servidor mesmo assim, a resposta traz a mesma explicação.

**4. Painel e aprovação.** Resultado das rotas com segredo de teste:

| Rota | Sem código | Código errado | Código de médico | Código do painel |
|---|---|---|---|---|
| Painel, GET | 403 | 403 | 403 | aceito |
| Painel, POST | 403 | – | 403 | – |
| CSV de autorizações | 403 | 403 | 403 | aceito |
| Imagem da foto | 403 | – | só 4:5 e 1:1 | aceito |

- O painel, a aprovação e a anamnese têm `<meta name="robots" content="noindex, nofollow">` e o cabeçalho `X-Robots-Tag` com noindex.
- **GTM.** Depois do PR #140, o GTM só carrega em produção, então localmente nenhuma página o carrega. Por isso, testei a regra executando o próprio script do GTM com endereços simulados:
  - Nas 7 rotas da anamnese (inclusive o painel, a aprovação e as rotas com `/en` e `/pt-BR`), o `gtm.js` não é inserido e o dataLayer nem é criado.
  - Nas rotas públicas, o GTM carrega normalmente.
  - O `pushEvent` também ignora a anamnese, e não há Meta Pixel no site.
- O `<noscript>` do GTM ainda aparece no HTML das páginas internas, porque elas são pré-geradas, mas só é usado por navegadores sem JavaScript. Mesmo nesse caso, o `Referrer-Policy: no-referrer` impede que o endereço com o código seja enviado.

## Fluxo

1. A clínica gera os links novos (veja "Antes do merge") e envia a cada médico.
2. O médico responde a anamnese, escolhe a opção da foto e, para enviar, preenche nome e registro e aceita o termo.
3. No painel, a clínica aprova a foto (ou confirma "sem foto"). Ela clica em "Preencher com a anamnese", revisa o texto e salva a versão.
4. O médico abre o link de aprovação (botão "Link de aprovação da página" no painel) e aprova ou pede ajustes.
5. Com as três condições cumpridas (autorização ou "sem foto", aprovação do médico e aprovação da clínica), o painel libera "Marcar como publicada".
6. **A publicação no site continua manual.** As páginas `/dra-vera-angelo` e `/dra-eliane-basques` são escritas no código. Baixe a foto 4:5 e a 1:1 no painel, atualize a página no código, faça o deploy e marque como publicada.

Se o texto ou a foto mudarem depois de qualquer aprovação, a página volta para "aguardando aprovação". Se a autorização for revogada depois da publicação, o painel mostra o alerta para retirar a foto.

## Como revogar a autorização de um médico

1. Abra o painel, abra o cartão do médico e vá até "Revogar autorização".
2. Escreva como o pedido chegou, por exemplo "WhatsApp, 10/11, pela própria médica", e clique em "Registrar revogação".
3. O sistema cria o registro de revogação (o aceite continua no histórico) e tira a aprovação da foto. A página volta a não poder ser publicada.
4. **Em até 10 dias úteis:** retire a foto do site (no código, troque pelas iniciais ou tire a página), faça o deploy e clique em "Marcar como retirada do site". Deixe de usar a imagem em novas publicações do Instagram e de materiais.
5. Baixe o CSV para o arquivo da ISO.

Se o médico enviar uma foto nova depois, ele aceita o termo de novo e um novo aceite é registrado.

## Antes do merge (pendências de configuração)

1. **Criar o Blob privado na Vercel:** Storage › Create › Blob, com acesso **Private**, conectado ao projeto nos três ambientes. Isso cria a variável `BLOB_READ_WRITE_TOKEN`. Sem ela, a seção da foto avisa que o envio ainda está sendo configurado.
   - Confira o custo no plano atual. A cota gratuita deve cobrir umas dezenas de fotos.
2. **Gerar e reenviar todos os links**, inclusive o da Parte A e o da validação dos preparos, porque o código mudou:
   - `node --import ./scripts/anamnese-ia/register.mjs scripts/anamnese-ia/links.mjs`
   - O arquivo `docs/anamnese-ia/respostas/links.md` (fora do git) traz os links de anamnese, de aprovação e do painel.
3. Opcional: `ANAMNESE_IA_SEGREDO` próprio na Vercel e no `.env.local`. Hoje o segredo cai no `SANITY_WRITE_TOKEN`; se esse token for trocado, todos os links mudam.
4. Para cancelar o link de uma pessoa: `ANAMNESE_IA_GERACOES={"medico-<slug>":2}` na Vercel e no `.env.local`, novo deploy e novo link pelo `links.mjs`.

## O que ficou pendente

- **Revisão do termo pela gestão.** O texto está em `src/lib/anamnese-ia/termo-imagem.ts`, na versão 1.1. Ao mudar qualquer palavra, suba a versão (1.2, 2.0…) e anote a anterior em `VERSOES_ANTERIORES`.
- **Importação real da foto do site.** Foi testada com o Sanity e o Blob simulados: a foto real da Dra. Vera foi lida do site, os 3 arquivos foram gravados como privados e sem EXIF, a importação aconteceu uma única vez e nada foi importado para a Dra. Luiza. A gravação real depende do Blob.
- **Teste de ponta a ponta com o Blob e o Sanity reais.** Não foi feito porque o Blob ainda não existe e a geração de um código real foi bloqueada nesta sessão por proteção de credenciais. O que foi testado:
  - 44 verificações automáticas fora do servidor: metadados e GPS removidos, orientação, tamanhos 4:5 e 1:1, recorte, tipo pelo conteúdo, termo 1.1, corrente de hashes, revogação, todos os status e regras de publicação, fotos do site mapeadas (existem, tamanhos certos, exclusões) e envio 0.
  - Telas no navegador com um segredo de teste e sem acesso ao Sanity: anamnese com a seção da foto, prévia nas molduras, termo, aceite obrigatório, painel e aprovação no celular.
  - Respostas certas para código errado (403), slug inválido (404) e ausência do GTM.
  - Build e lint passando.
- **HEIC no iPhone.** A mensagem do Chrome foi testada. A conversão no Safari não foi, por falta de iPhone e de foto HEIC. Vale fazer o primeiro envio real de um iPhone.
- **"A clínica providencia a foto".** Hoje isso só registra a pendência. Quando a foto chegar, ela pode ser enviada pelo link do próprio médico, mas o aceite do termo precisa ser dele. Se preferir que a clínica envie pelo painel, isso precisa de uma tela a mais.
- **Página do site automática.** A publicação continua manual. Ligar as páginas dos médicos ao Sanity seria um projeto separado.
- **Cache das páginas internas.** Nas páginas pré-geradas, o Next substitui o `Cache-Control: private`. As respostas da API e as imagens ficam com `private, no-store`, e as páginas não têm dados (tudo vem da API com código).
- **Quem tem o token do Sanity ainda consegue editar os registros direto no Studio.** A corrente de hashes mostra a edição, mas não a impede. Para impedir de fato, seria preciso um armazenamento só de escrita.
