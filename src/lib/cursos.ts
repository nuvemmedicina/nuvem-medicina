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
    id:         'testes-respiratorios-h2-ch4-h2s',
    titulo:     'Testes Respiratórios H₂/CH₄/H₂S na Prática Clínica',
    parceiro:   'NU.V.E.M Ensino',
    tipo:       'Curso',
    modalidade: 'Presencial',
    data:       'Junho 2025',
    descricao:  'Imersão prática completa em testes respiratórios para diagnóstico de SIBO, IMO, intolerâncias alimentares e H. pylori. Treinamento hands-on com equipamentos de última geração na NU.V.E.M.',
    imagem:     '/images/dra-vera.jpg',
    href:       'https://www.nuvemensino.com.br/cursos/testes-respiratorios-h2-ch4-h2s-junho',
    destaque:   true,
  },
  {
    id:         'manometria-phmetria-impedancia',
    titulo:     'Manometria, pHmetria e Impedânciometria',
    parceiro:   'NU.V.E.M Ensino',
    tipo:       'Curso',
    modalidade: 'Presencial',
    descricao:  'Especialize-se nos principais exames de motilidade digestiva. Aprenda Manometria de Alta Resolução, pHmetria e Impedância em ambiente clínico supervisionado com o Dr. Felipe Nelson.',
    imagem:     '/images/felipe-nelson.jpg',
    href:       'https://www.nuvemensino.com.br/cursos/manometria-phmetria-impedancia',
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
