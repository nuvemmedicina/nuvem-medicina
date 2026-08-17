// ─── Site-wide shared types ─────────────────────────────────────────────────

export interface NavItem {
  label: string
  href:  string
  children?: NavItem[]
}

export interface Especialidade {
  num:   string
  slug:  string
  title: string
  desc:  string
  tags:  string[]
  icon:  string // lucide icon name
}

export interface Exame {
  id:       string
  num:      string
  title:    string
  subtitle: string
  tag:      string
  desc:     string[]
  info:     { icon: string; text: string }[]
  /**
   * Título e descrição para <title> e meta description da página do exame.
   * Escritos para intenção de busca (com a cidade), diferente de `title`/`desc`,
   * que seguem em linguagem clínica para o corpo da página. Opcionais: sem eles,
   * generateMetadata cai de volta em `title` e `desc[0]`.
   */
  seoTitle?:       string
  seoDescription?: string
}

export interface Depoimento {
  id:     string
  text:   string
  name:   string
  role:   string
  stars:  number
  initials: string
}

export interface EspecialidadePage {
  slug:        string
  title:       string
  heroTitle:   string
  heroDesc:    string
  sections:    { title: string; content: string }[]
  examesRel:   string[]  // exame IDs relacionados
}
