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
