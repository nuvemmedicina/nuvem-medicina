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
  descricao:   string
  imagem:      string
  href:        string      // URL externa de inscrição
  destaque?:   boolean     // aparece em maior destaque
}

export const CURSOS: Curso[] = [
  {
    id:         'microbiota-gastroenterologista',
    titulo:     'Microbiota na Prática do Gastroenterologista',
    parceiro:   'Ganep Educação',
    tipo:       'Curso',
    modalidade: 'Online',
    descricao:  'Curso completo sobre o papel da microbiota intestinal na prática clínica do gastroenterologista. Com Dra. Vera Ângelo e Dr. Dan Waitzberg — referências nacionais em nutrição clínica e gastroenterologia.',
    imagem:     '/images/dra-vera-dr-dan-l-waiztberg.jpg',
    href:       'https://ganepeducacao.com.br/produto/microbiota-na-pratica-do-gastroenterologista/',
    destaque:   true,
  },
]
