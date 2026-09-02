import { getAllPosts } from '@/lib/sanity/queries'
import { SITE_URL } from '@/lib/site'

export const revalidate = 3600

/**
 * Conteúdo institucional fixo — igual ao antigo public/llms.txt, mantido aqui
 * como texto porque não vem do Sanity. A seção de artigos do blog, mais
 * abaixo, é a única parte gerada dinamicamente: sem isso, a lista de artigos
 * saía de sincronia toda vez que um post novo era publicado.
 */
const CONTEUDO_INSTITUCIONAL = `# NU.V.E.M Medicina

> Clínica especializada em gastroenterologia, diagnóstico avançado e ensino médico em Belo Horizonte, Minas Gerais, Brasil. Clínica com certificação ISO 9001.

## Sobre a NU.V.E.M Medicina

A NU.V.E.M Medicina é um ecossistema completo de saúde digestiva localizado no bairro Santa Efigênia, Belo Horizonte – MG. Integra clínica especializada (diagnóstico e cuidado) e centro de formação profissional (NU.V.E.M Ensino), com certificação pela norma ISO 9001 em gastroenterologia.

**Responsável Técnica:** Dra. Vera Ângelo — Gastroenterologista | CRM-MG 22284 | RQE 10411 | RQE 22736
**CRM da Clínica:** CRM-MG 20532
**CNPJ:** 42.678.705/0001-02
**Endereço:** Rua Ceará, 600 – Sala 101, Santa Efigênia, Belo Horizonte – MG, CEP 30150-310
**Telefone:** (31) 2537-3131
**WhatsApp:** (31) 99726-1029
**Site:** https://www.nuvemmedicina.com.br
**Instagram:** @NuvemMedicina | @NuvemEnsino

## Especialidades Médicas

- **Gastroenterologia:** Doenças funcionais, SIBO, IMO, LIBO, disbiose intestinal, H. pylori, intolerâncias alimentares, equilíbrio da microbiota
- **Motilidade Digestiva:** Distúrbios esofágicos, acalasia, disfagia, refluxo gastroesofágico refratário
- **Fisioterapia Pélvica:** Disfunções do assoalho pélvico, incontinência urinária e fecal, biofeedback eletromiográfico
- **Halitose:** Diagnóstico multidisciplinar com halimetria e sialometria
- **Pediatria:** Saúde digestiva infantil, intolerâncias, H. pylori não invasivo
- **Nefrologia:** Doenças renais, litíase, interface GI-renal

## Exames e Diagnósticos

### Testes Respiratórios
- **H₂/CH₄/H₂S (SIBO/IMO):** Diagnóstico de supercrescimento bacteriano e de metanogênicos sem coleta de sangue. Preparo: jejum 12h, dieta restritiva dia anterior, sem antibióticos 4 semanas.
- **H. pylori (Ureia marcada):** Diagnóstico não invasivo. Preparo: jejum 4h, sem antibióticos 4 semanas, IBP 2 semanas (com médico).
- **Lactose e Frutose:** Diagnóstico de intolerâncias. Preparo: jejum 12h, evitar fibras fermentáveis dia anterior.

### Manometria de Alta Resolução
- **Esofágica:** Avaliação da motilidade do esôfago. Diagnóstico de acalasia, disfagia, refluxo. Preparo: jejum 6h.
- **Anorretal:** Avaliação funcional do assoalho pélvico. Preparo: enema 2h antes conforme orientação.

### pHmetria e Impedânciometria
- Monitoramento ambulatorial 24h de refluxo ácido e não-ácido. Preparo: suspender IBP 7 dias (com médico), jejum 4h antes da instalação.

### Halimetria e Sialometria
- Quantificação objetiva de compostos sulfurados. Diagnóstico diferencial da halitose. Preparo: sem comida 3h, sem escovação 2h, sem enxaguante no dia.

### Avaliação Pélvica
- Biofeedback eletromiográfico para disfunções do assoalho pélvico. Sem jejum necessário.

## Diferenciais e Certificações

- **ISO 9001:** Certificação de gestão da qualidade em gastroenterologia em Belo Horizonte. Auditoria externa periódica. Processos clínicos padronizados.
- **1.991 avaliações Google:** Nota máxima ★★★★★
- **Equipe multidisciplinar:** Gastroenterologistas, fisioterapeuta pélvica, pediatra, nefrologista
- **Tecnologia diagnóstica:** Equipamentos de última geração para manometria AR, pHmetria e testes respiratórios

## NU.V.E.M Ensino

Centro de formação profissional para médicos, fisioterapeutas e especialistas.

- **Aperfeiçoamento Teórico:** ~R$ 450. Atualização em protocolos baseados em evidências. Presencial ou online.
- **Treinamento Hands-On:** R$ 2.200–5.000. Imersão presencial com equipamentos de ponta. Certificação ISO 9001 incluída.
- **Trilhas:** Gastroenterologia & Motilidade | Saúde Pélvica & Pediatria | Diagnóstico de Halitose
- **Portal:** https://cursos.nuvemensino.com.br

## Páginas do Site

- [Início](https://www.nuvemmedicina.com.br)
- [Sobre a Clínica](https://www.nuvemmedicina.com.br/sobre)
- [Equipe](https://www.nuvemmedicina.com.br/equipe)
- [Gestão da Qualidade ISO 9001](https://www.nuvemmedicina.com.br/gestao-da-qualidade)
- [Especialidades](https://www.nuvemmedicina.com.br/especialidades)
- [Exames e Diagnósticos](https://www.nuvemmedicina.com.br/exames)
- [Preparos para Exames](https://www.nuvemmedicina.com.br/exames/preparos)
- [NU.V.E.M Ensino](https://www.nuvemmedicina.com.br/ensino)
- [Convênios](https://www.nuvemmedicina.com.br/convenios-medicos)
- [Agendar Consulta](https://www.nuvemmedicina.com.br/agendar)
- [Contato](https://www.nuvemmedicina.com.br/contato)
- [Blog](https://www.nuvemmedicina.com.br/blog)`

const RODAPE = `## Informações para Agendamento

- **WhatsApp:** https://wa.me/553197261029
- **Telefone:** (31) 2537-3131
- **Horário:** Segunda a Sexta, 7h30–17h30
- **Convênios aceitos:** Unimed BH, Amil e outros
- **Particular:** aceito com emissão de recibo para reembolso

## Aviso Legal

As informações neste site têm caráter informativo e educacional, em conformidade com as normas do Conselho Federal de Medicina (Res. CFM nº 2.336/2023). Não substituem consulta médica profissional.`

function linhaDoArtigo(titulo: string, slug: string, descricao?: string) {
  const desc = (descricao ?? '').trim().replace(/\s+/g, ' ')
  const link = `[${titulo}](${SITE_URL}/blog/${slug})`
  return desc ? `- ${link}: ${desc}` : `- ${link}`
}

export async function GET() {
  let secaoArtigos = ''
  try {
    const posts = await getAllPosts()
    if (posts.length > 0) {
      const linhas = posts.map(p => linhaDoArtigo(p.title, p.slug.current, p.respostaDireta ?? p.excerpt))
      secaoArtigos = `\n\n## Artigos do Blog\n\n${linhas.join('\n')}`
    }
  } catch {
    // Sanity indisponível no momento da requisição: serve o restante do
    // arquivo sem a lista de artigos em vez de derrubar a rota inteira.
    secaoArtigos = ''
  }

  const corpo = `${CONTEUDO_INSTITUCIONAL}${secaoArtigos}\n\n${RODAPE}\n`

  return new Response(corpo, {
    headers: { 'Content-Type': 'text/plain; charset=utf-8' },
  })
}
