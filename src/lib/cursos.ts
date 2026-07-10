/**
 * cursos.ts
 * Lista de cursos e palestras da NU.V.E.M Ensino e parceiros.
 * Para adicionar um novo curso, basta incluir um novo objeto no array CURSOS.
 */

export interface Curso {
  id:          string
  titulo:      string
  subtitulo?:  string
  parceiro:    string
  tipo:        'Curso' | 'Palestra' | 'Workshop' | 'Congresso' | 'Live'
  modalidade:  'Online' | 'Presencial' | 'Híbrido'
  data?:       string      // ex: "junho 2025" ou "14/06/2025" — omitir se não definida
  instrutor?:  string      // nome do instrutor principal
  descricao:   string
  imagem:      string
  href:        string      // URL externa de inscrição
  destaque?:   boolean     // aparece em maior destaque
}

export const CURSOS: Curso[] = [
  {
    id:         'dici-neurogastroenterologia-2026',
    titulo:     'DICI: Neurogastroenterologia e Métodos Diagnósticos',
    parceiro:   'FACOP',
    tipo:       'Curso',
    modalidade: 'Online',
    data:       'Agosto 2026',
    instrutor:  'Dra. Vera Ângelo',
    descricao:  'Aperfeiçoamento em distúrbios da interação cérebro-intestino: SII, dispepsia funcional e ferramentas diagnósticas modernas. Online com encontros ao vivo, início em agosto de 2026.',
    imagem:     '/images/dra-vera-angelo-1.jpeg',
    href:       'https://www.nuvemensino.com.br/cursos/dici-neurogastroenterologia-2026',
    destaque:   true,
  },
  {
    id:         'testes-respiratorios-h2-ch4-h2s-julho',
    titulo:     'Testes Respiratórios de H₂, CH₄ e H₂S',
    parceiro:   'NU.V.E.M Ensino',
    tipo:       'Curso',
    modalidade: 'Presencial',
    data:       'Julho 2026',
    instrutor:  'Dra. Vera Ângelo',
    descricao:  'Treinamento teórico-prático completo em testes respiratórios para diagnóstico de intolerâncias alimentares, SIBO, IMO, LIBO e SIFO. Prática supervisionada com equipamentos Dynamed e Health Go.',
    imagem:     '/images/dra-vera-angelo-1.jpeg',
    href:       'https://www.nuvemensino.com.br/cursos/testes-respiratorios-h2-ch4-h2s-julho',
    destaque:   false,
  },
  {
    id:         'microbiota-gastroenterologista',
    titulo:     'Microbiota na Prática do Gastroenterologista',
    parceiro:   'Ganep Educação',
    tipo:       'Curso',
    modalidade: 'Online',
    descricao:  'Curso completo sobre o papel da microbiota intestinal na prática clínica do gastroenterologista. Com Dra. Vera Ângelo e Dr. Dan Waitzberg, referências nacionais em nutrição clínica e gastroenterologia.',
    imagem:     '/images/dra-vera-dr-dan-l-waiztberg.jpg',
    href:       'https://www.nuvemensino.com.br/cursos/microbiota-na-pratica-do-gastroenterologista',
    destaque:   false,
  },
]
