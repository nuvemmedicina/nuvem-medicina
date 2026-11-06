# Relatório de validação — preparos e dados da clínica

Gerado em 06/11/2026 junto com `clinica-nuvem-dr-iagenda.pdf`. Fonte principal dos preparos: PDFs oficiais `public/pdfs/preparo-*-v1.pdf`. Comparados com: página `/exames/preparos`, `src/lib/content/exames-detail.ts` e chatbot Nuvete (`src/lib/nuvete-data.ts`).

## 1. Itens [VALIDAR COM A EQUIPE MÉDICA] (29)

### Manometria Esofágica de Alta Resolução

- [ ] **Medicamentos:** Medicamentos para hipertensão, diabetes, problemas pulmonares e cardiológicos: Pode manter
  - O card do site diz "podem ser tomados normalmente com o mínimo de água possível"; o PDF pede jejum absoluto inclusive de água a partir das 22h. Definir como o paciente toma esses medicamentos no dia.
- [ ] **Jejum:** Jejum absoluto (inclusive de água) a partir das 22h da noite anterior ao exame.
  - O site (/exames/preparos e card da página do exame) e o chatbot Nuvete dizem "jejum de 6 horas". O PDF oficial diz jejum absoluto a partir das 22h. Confirmar qual vale.
- [ ] **No dia do exame:** Chegada antecipada: Não informado no preparo oficial (o card do site diz 15 minutos antes).
  - Definir a antecedência de chegada.
- [ ] **No dia do exame:** Acompanhante: Não informado no preparo oficial (sem orientação).
  - Definir se é necessário ou recomendado.
- [ ] **No dia do exame:** Roupa: Não informado no preparo oficial (o card do site diz roupas com abertura frontal, evitar gola alta).
  - Confirmar orientação de vestimenta.

### Manometria Anorretal

- [ ] **Medicamentos:** Suspensão de medicamentos: Não informado no preparo oficial (sem orientação de suspensão).
  - Confirmar se algum medicamento deve ser suspenso (o chatbot cita supositórios; o site cita laxativos e fitoterápicos apenas para informar).
- [ ] **No dia do exame:** Preparo intestinal (essencial): aplicar 02 MINILAX 2 horas antes do horário agendado, conforme as instruções da embalagem, deitado de lado com os joelhos dobrados. Aguardar a evacuação completa antes de sair para a clínica.
  - Divergência entre versões: o site diz "enema Minilax® ou similar 1 a 2 horas antes"; o chatbot Nuvete diz "enema retal (Fleet) 2 horas antes"; as versões em inglês e espanhol citam Fleet®. Confirmar produto, quantidade e horário.
- [ ] **Após o exame:** Não informado no preparo oficial (sem orientação para depois do exame).
  - Definir orientações pós-exame (retorno às atividades, sinais de alerta).

### pHmetria e Impedanciometria Esofágica

- [ ] **Medicamentos:** Inibidores de bomba de prótons (IBP): omeprazol, pantoprazol, esomeprazol, lansoprazol: Suspender 10 dias antes
  - O site e o chatbot dizem 7 dias; o PDF oficial diz 10 dias.
- [ ] **Medicamentos:** Antiácidos: Mylanta, Gaviscon, Luftal, bicarbonato: Suspender 48 horas antes
  - O site diz 24 horas antes; o PDF oficial diz 48 horas.
- [ ] **Jejum:** Jejum ABSOLUTO a partir das 22h da noite anterior (nem água). Casos específicos são avaliados individualmente.
  - O site e o chatbot Nuvete dizem "jejum de 4 horas antes da instalação do cateter". Confirmar qual vale.
- [ ] **No dia do exame:** Chegada antecipada e acompanhante: Não informado no preparo oficial (sem orientação).
  - Definir antecedência de chegada e se acompanhante é necessário.
- [ ] **Durante o monitoramento:** Não ingira café, chás com cafeína, refrigerantes com cafeína ou qualquer medicamento para refluxo.
  - O chatbot Nuvete acrescenta "evitar alimentos muito ácidos (limão, vinagre)", que não está no PDF oficial. Confirmar.
- [ ] **Durante o monitoramento:** Banho: após a colocação do aparelho não é permitido tomar banho; evitar banho de imersão. Não pode molhar o aparelho.
  - Contradição dentro do PDF oficial: o item 2 diz que não será permitido tomar banho; o item 7 diz que uma ducha rápida é permitida com cuidado. Definir a orientação.
- [ ] **Após o exame:** Retirada do aparelho: Não informado no preparo oficial (não diz quando nem onde devolver o equipamento).
  - Definir orientação de retorno à clínica para retirada/devolução do aparelho após 24 horas.

### Teste Respiratório para H. pylori

- [ ] **Medicamentos:** Bismuto (Bepanthol, De-Nol etc.): Suspender 4 semanas antes
  - O PDF cita "Bepanthol" como exemplo de bismuto. Conferir o exemplo (Bepantol é um produto de dexpantenol, não de bismuto).
- [ ] **Jejum:** Jejum de 2 horas antes do exame. Somente água é permitida.
  - O chatbot Nuvete diz "jejum de 4 horas"; o PDF oficial diz 2 horas. Confirmar.
- [ ] **No dia do exame:** Chegada antecipada e acompanhante: Não informado no preparo oficial (sem orientação).
  - Definir antecedência de chegada e se acompanhante é necessário.
- [ ] **Após o exame:** Não informado no preparo oficial (sem orientação para depois do exame).
  - Confirmar se pode voltar às atividades e à alimentação normalmente.

### Teste Respiratório para SIBO, IMO, Lactose e Frutose

- [ ] **Medicamentos:** Laxativos: Suspender 5 a 7 dias antes
  - O chatbot Nuvete diz "não usar laxativos nas 24 horas anteriores"; o PDF oficial diz 5 a 7 dias.
- [ ] **Antes do exame:** Probióticos: Não informado no preparo oficial (o PDF não cita).
  - O site e o chatbot Nuvete pedem "não usar probióticos nas 2 semanas anteriores", que não está no PDF oficial. Confirmar.
- [ ] **Jejum:** Jejum completo de 12 horas antes do exame. Somente água é permitida, em pequena quantidade, até 0h.
  - Ambíguo: não fica claro se a água é permitida depois de 0h. Confirmar.
- [ ] **No dia do exame:** Faça uma boa higiene da boca e use enxaguante bucal sem álcool.
  - O site diz "não escovar os dentes com creme dental 30 minutos antes" e o chatbot diz "não escovar os dentes 30 min antes". Confirmar a orientação de higiene oral.
- [ ] **No dia do exame:** Não fume no dia do exame. Não use chicletes ou balas.
  - O site e o chatbot dizem "não fumar 1 hora antes"; o PDF oficial diz no dia do exame.
- [ ] **No dia do exame:** Acompanhante: Não informado no preparo oficial (sem orientação).
  - Definir se acompanhante é necessário (exame de 2 a 3 horas).
- [ ] **Após o exame:** Não informado no preparo oficial (sem orientação para depois do exame).
  - Confirmar se pode voltar à alimentação e aos medicamentos normalmente.

### Avaliação Pélvica com Biofeedback Eletromiográfico

- [ ] **Medicamentos:** Suspensão de medicamentos: Não informado no preparo oficial (sem orientação de suspensão).
  - Confirmar se algum medicamento deve ser suspenso.
- [ ] **No dia do exame:** Acompanhante: Não informado no preparo oficial (sem orientação).
  - Definir se acompanhante é permitido/recomendado.
- [ ] **Após o exame:** Não informado no preparo oficial (sem orientação para depois do exame).
  - Confirmar se há orientação pós-avaliação.

## 2. Divergências gerais entre versões publicadas

- O chatbot Nuvete (src/lib/nuvete-data.ts) e a página /exames/preparos repetem os preparos com várias orientações diferentes dos PDFs oficiais (jejum, tempos de suspensão, enema, higiene oral). Depois da validação, atualizar o site e o chatbot para não haver duas orientações diferentes publicadas.
- O chatbot Nuvete lista "Teste Respiratório: Lactose / Frutose" como preparo separado; o PDF oficial reúne SIBO, IMO, lactose e frutose num único preparo. Confirmar se o preparo é o mesmo.
- O chatbot Nuvete apresenta o teste de H. pylori como "UREA". Confirmar o nome a ser usado pela IA.
- As versões em inglês e espanhol de exames-detail.ts foram traduzidas por IA e citam Fleet® no enema da manometria anorretal (o PDF oficial cita Minilax).
- Textos com superlativos publicados no chatbot ("referência nacional", "o protocolo mais completo disponível", "altamente preciso") e no PDF de H. pylori ("o método não invasivo mais preciso") podem conflitar com as normas do CFM sobre publicidade médica. Foram retirados nesta versão padronizada.

## 3. Ajustes de texto feitos na padronização (sem mudar orientação clínica)

- Retirados superlativos e promessas para seguir as normas do CFM: "o método não invasivo mais preciso" (H. pylori), "O exame não causa dor" (manometria esofágica), "laudo com o diagnóstico diferencial completo" (halimetria).
- Corrigidos erros de digitação dos PDFs ("esfinsteres", texto repetido no PDF de H. pylori).
- Termos técnicos explicados entre parênteses (ex.: disfagia = dificuldade para engolir).
- Toda menção a suspender ou manter medicamentos passou a trazer "conforme orientação médica".

## 4. Dados da clínica que faltam (Parte A) — 36

- **Identificação e escopo** · E-mail utilizado na compra *(obrigatório)*
- **Identificação e escopo** · Responsável pelo preenchimento (nome e cargo) *(obrigatório)*
- **Localização, horários e contato** · Feriados, recessos e férias coletivas
- **Localização, horários e contato** · Horário em que há atendente humano no WhatsApp
- **Serviços, exames e posicionamento** · Exames e procedimentos realizados na clínica (estruturado) *(obrigatório)* — parcialmente preenchido (tem ___)
- **Serviços, exames e posicionamento** · Valores dos exames e procedimentos (tabela da clínica)
- **Serviços, exames e posicionamento** · O que a clínica não realiza e quem não atende *(obrigatório)*
- **Serviços, exames e posicionamento** · Principais dores e problemas dos pacientes que procuram a clínica *(obrigatório)*
- **Serviços, exames e posicionamento** · História da clínica *(obrigatório)* — parcialmente preenchido (tem ___)
- **Convênios** · Regras detalhadas de convênios *(obrigatório)* — parcialmente preenchido (tem ___)
- **Pagamento** · A IA deve cobrar pagamento antecipado? *(obrigatório)*
- **Pagamento** · Qual a dinâmica do pagamento? *(obrigatório)*
- **Pagamento** · Métodos de pagamento *(obrigatório)*
- **Pagamento** · Se cobrar antecipado, como deve ser feito?
- **Pagamento** · Regras de parcelamento *(obrigatório)*
- **Pagamento** · Recibo e reembolso — parcialmente preenchido (tem ___)
- **Agenda e confirmação** · Regras de agenda da clínica *(obrigatório)*
- **Agenda e confirmação** · Restrições gerais de agenda *(obrigatório)*
- **Agenda e confirmação** · Antecedência mínima para agendar *(obrigatório)*
- **Agenda e confirmação** · Usa algum prontuário ou sistema de agenda? Qual? *(obrigatório)*
- **Agenda e confirmação** · Dados que a IA deve pedir ao paciente para confirmar o agendamento *(obrigatório)*
- **Agenda e confirmação** · Perguntas antes de marcar (triagem geral) *(obrigatório)* — parcialmente preenchido (tem ___)
- **Agenda e confirmação** · Documentos que o paciente deve levar *(obrigatório)* — parcialmente preenchido (tem ___)
- **Agenda e confirmação** · Orientações após confirmar o agendamento *(obrigatório)* — parcialmente preenchido (tem ___)
- **Políticas e exceções** · Política de cancelamento *(obrigatório)*
- **Políticas e exceções** · Remarcação e no-show (falta sem aviso) *(obrigatório)*
- **Políticas e exceções** · Paciente antigo e indicação *(obrigatório)*
- **Políticas e exceções** · Tolerância de atraso *(obrigatório)*
- **Secretária IA** · Nome da Secretária IA *(obrigatório)*
- **Secretária IA** · Tom de voz da IA *(obrigatório)* — parcialmente preenchido (tem ___)
- **Secretária IA** · O que a IA nunca deve dizer ou fazer *(obrigatório)* — parcialmente preenchido (tem ___)
- **Secretária IA** · Perguntas frequentes (pergunta e resposta) *(obrigatório)* — parcialmente preenchido (tem ___)
- **Encaminhamento humano, urgência e anexos** · Regra de urgência: o que a IA deve fazer *(obrigatório)*
- **Encaminhamento humano, urgência e anexos** · Gatilhos específicos da clínica para atendimento humano
- **Encaminhamento humano, urgência e anexos** · Para quem transferir e como
- **Encaminhamento humano, urgência e anexos** · Observações gerais

## 5. Profissionais

- Dra. Amanda Araújo: registro profissional (CRM/RQE) não consta no site
- Dr. Gabriel de Souza Fernandes Filho: registro profissional (CRM/RQE) não consta no site
- Agenda, valores, duração, retorno, faixa etária, teleconsulta e restrições: dependem da Parte B (link individual de cada profissional).
- A Dra. Anna Karoline é fisioterapeuta (Crefito); foi mantida na Parte B como profissional que realiza a avaliação pélvica.
