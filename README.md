# NU.V.E.M Medicina — Next.js 14

Site institucional da **NU.V.E.M Medicina**, construído com Next.js 14 (App Router), TypeScript e Tailwind CSS.

---

## Stack

| Tecnologia | Versão | Papel |
|---|---|---|
| Next.js | 14.2.x | Framework (App Router, SSG, SSR) |
| React | 18.x | UI |
| TypeScript | 5.x | Tipagem |
| Tailwind CSS | 3.4.x | Estilização utility-first |
| Poppins | Google Fonts | Tipografia sans-serif principal |
| Cormorant Garamond | Google Fonts | Tipografia serif para títulos |
| Lucide React | 0.395.x | Ícones |
| clsx | 2.x | Utilitário de classes condicionais |

---

## Setup

```bash
# 1. Clone e instale
git clone <repo>
cd nuvem-medicina
npm install

# 2. Desenvolvimento
npm run dev
# http://localhost:3000

# 3. Build de produção
npm run build
npm start

# 4. Type check
npm run type-check

# 5. Lint
npm run lint
```

---

## Estrutura de pastas

```
src/
├── app/                        # App Router (Next.js 14)
│   ├── layout.tsx              # Root layout + fonts + metadata
│   ├── page.tsx                # Home page
│   ├── not-found.tsx           # 404 page
│   ├── agendar/                # Página de agendamento + formulário
│   ├── sobre/                  # Sobre a Clínica
│   ├── equipe/                 # Equipe médica
│   ├── gestao-da-qualidade/    # ISO 9001 + Biossegurança
│   ├── especialidades/
│   │   ├── page.tsx            # Hub: lista todas especialidades
│   │   └── [slug]/page.tsx     # Página dinâmica por especialidade
│   ├── exames/
│   │   ├── page.tsx            # Hub: lista todos exames
│   │   ├── preparos/page.tsx   # Guia de preparos
│   │   └── [slug]/page.tsx     # Página dinâmica por exame
│   ├── ensino/                 # NU.V.E.M Ensino
│   ├── blog/                   # Blog (integrar com CMS)
│   ├── contato/                # Contato + localização
│   ├── convenios/              # Planos aceitos
│   └── parceiros/              # Profissionais parceiros
│
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx          # Navegação fixa com dropdowns
│   │   └── Footer.tsx          # Rodapé completo
│   ├── sections/               # Seções da Home page
│   │   ├── HeroSection.tsx
│   │   ├── NumbersBar.tsx
│   │   ├── EspecialidadesSection.tsx
│   │   ├── ExamesSection.tsx   # ← 'use client' (tabs interativas)
│   │   ├── IsoSection.tsx
│   │   ├── EnsinoSection.tsx
│   │   ├── DepoimentosSection.tsx
│   │   └── CtaSection.tsx
│   ├── ui/
│   │   ├── PageHero.tsx        # Hero reutilizável para páginas internas
│   │   ├── Breadcrumb.tsx      # Breadcrumb navigation
│   │   ├── SectionWrapper.tsx  # Wrapper com padding consistente
│   │   ├── CtaBanner.tsx       # Banner CTA reutilizável
│   │   ├── RevealInit.tsx      # ← 'use client' (IntersectionObserver)
│   │   └── WaFloat.tsx         # Botão flutuante WhatsApp
│   └── icons/
│       └── CloudLogo.tsx       # Logo SVG da nuvem
│
├── lib/
│   ├── data.ts                 # Todos os dados estáticos do site
│   └── utils.ts                # cn() + helpers
│
├── styles/
│   └── globals.css             # Tailwind + design tokens + componentes
│
└── types/
    └── index.ts                # Tipos TypeScript globais
```

---

## Páginas implementadas (38 rotas)

### Públicas
| Rota | Descrição |
|---|---|
| `/` | Home completa com todas as seções |
| `/sobre` | Sobre a Clínica, missão, pilares, responsáveis técnicos |
| `/equipe` | Perfis da equipe médica |
| `/gestao-da-qualidade` | ISO 9001, biossegurança, princípios e benefícios |
| `/especialidades` | Hub com todas as especialidades |
| `/especialidades/gastroenterologia` | Página detalhada |
| `/especialidades/fisioterapia-pelvica` | Página detalhada |
| `/especialidades/halitose` | Página detalhada |
| `/especialidades/pediatria` | Página detalhada |
| `/especialidades/nefrologia` | Página detalhada |
| `/especialidades/motilidade-digestiva` | Página detalhada |
| `/exames` | Hub com todos os exames |
| `/exames/manometria` | Página detalhada |
| `/exames/phmetria` | Página detalhada |
| `/exames/respiratorio` | Página detalhada |
| `/exames/halimetria` | Página detalhada |
| `/exames/pelvico` | Página detalhada |
| `/exames/preparos` | Guia unificado de preparos |
| `/ensino` | NU.V.E.M Ensino — metodologia e trilhas |
| `/blog` | Lista de artigos |
| `/agendar` | Formulário de agendamento com redirect WhatsApp |
| `/contato` | Contato e localização |
| `/convenios` | Convênios médicos aceitos |
| `/parceiros` | Profissionais parceiros |

---

## Personalização

### Dados do site
Edite `src/lib/data.ts` para atualizar:
- Informações de contato (`CONTATO`)
- Especialidades (`ESPECIALIDADES`)
- Exames (`EXAMES`)
- Depoimentos (`DEPOIMENTOS`)
- Links de navegação (`NAV_ITEMS`)

### Design tokens
Edite `src/styles/globals.css` e `tailwind.config.ts` para ajustar:
- Cores (variáveis CSS)
- Fontes
- Animações

### Blog
Atualmente usa dados estáticos em `src/app/blog/page.tsx`.
Para CMS, integre com **Contentful**, **Sanity**, **Strapi** ou **MDX**
via Server Components em `src/app/blog/[slug]/page.tsx`.

---

## Deploy

### Vercel (recomendado)
```bash
npx vercel
```

### Docker
```dockerfile
FROM node:20-alpine AS base
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

---

## SEO
- Metadata por página via `export const metadata`
- `generateStaticParams` em rotas dinâmicas
- `robots: index/follow` no layout raiz
- OpenGraph configurado no layout raiz
- Altere `metadataBase` em `layout.tsx` para a URL de produção

---

## Licença
Projeto proprietário — NU.V.E.M Medicina. Todos os direitos reservados.
