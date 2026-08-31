# Links com marcação de campanha para a bio e os stories

Estes endereços são para uso fora do site: bio do Instagram, bio do Threads e
links de stories. Copie exatamente como estão.

## Regra que não pode ser quebrada

A marcação UTM entra uma vez, no link que fica fora do site (bio, stories).
Os links internos da página `/links` e do restante do site NÃO levam UTM.

Se um link interno levasse `utm_source` de novo, o GA4 entenderia que uma
nova campanha começou no meio da visita, encerraria a sessão anterior e a
atribuição ao Instagram se perderia. Por isso os cliques dentro de `/links`
são medidos por evento (`clique_link_bio`), não por parâmetro de URL.

## Link da bio do Instagram

Colar no campo de link da bio do perfil `@NuvemMedicina`:

```
https://www.nuvemmedicina.com.br/links?utm_source=instagram&utm_medium=social&utm_campaign=bio
```

## Links para stories

Cada story que aponta direto para uma página de exame precisa do próprio
link, com `utm_campaign=stories` e `utm_content` identificando o tema do
story. Modelo:

```
https://www.nuvemmedicina.com.br/exames/{slug-do-exame}?utm_source=instagram&utm_medium=social&utm_campaign=stories&utm_content={tema-do-story}
```

Exemplos prontos para os exames atuais (troque `{tema-do-story}` pelo texto
que descreve o story específico, se quiser diferenciar mais de um story sobre
o mesmo exame):

```
https://www.nuvemmedicina.com.br/exames/manometria-esofagica?utm_source=instagram&utm_medium=social&utm_campaign=stories&utm_content=manometria-esofagica

https://www.nuvemmedicina.com.br/exames/manometria-anorretal?utm_source=instagram&utm_medium=social&utm_campaign=stories&utm_content=manometria-anorretal

https://www.nuvemmedicina.com.br/exames/phmetria-impedanciometria?utm_source=instagram&utm_medium=social&utm_campaign=stories&utm_content=phmetria-impedanciometria

https://www.nuvemmedicina.com.br/exames/testes-respiratorios?utm_source=instagram&utm_medium=social&utm_campaign=stories&utm_content=testes-respiratorios

https://www.nuvemmedicina.com.br/exames/halimetria-sialometria?utm_source=instagram&utm_medium=social&utm_campaign=stories&utm_content=halimetria-sialometria

https://www.nuvemmedicina.com.br/exames/avaliacao-pelvica?utm_source=instagram&utm_medium=social&utm_campaign=stories&utm_content=avaliacao-pelvica
```

Um story também pode apontar para uma especialidade em vez de um exame. Mesmo
modelo, trocando o caminho:

```
https://www.nuvemmedicina.com.br/especialidades/{slug-da-especialidade}?utm_source=instagram&utm_medium=social&utm_campaign=stories&utm_content={tema-do-story}
```

## Bio do Threads

Vale diferenciar a origem, já que o comportamento de quem segue no Threads
pode ser diferente do Instagram:

```
https://www.nuvemmedicina.com.br/links?utm_source=threads&utm_medium=social&utm_campaign=bio
```

## Onde conferir os slugs atuais

A lista de exames e especialidades (e seus slugs) vem de `src/lib/data.ts` —
sempre confira ali antes de criar um link novo, caso um exame tenha sido
renomeado ou removido desde a última atualização deste arquivo.
