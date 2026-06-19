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
    id:         'teste-respiratorio-de-hidrogenio-e-metano',
    titulo:     'Teste Respiratório de Hidrogênio e Metano',
    parceiro:   'NU.V.E.M Ensino',
    tipo:       'Curso',
    modalidade: 'Online',
    instrutor:  'Dra. Vera Ângelo',
    descricao:  'Aplicações no diagnóstico de SIBO, SIBO-TAU, IMO, LIBO e SIFO. Aprenda a interpretar o exame e diferenciar as condições que afetam a saúde intestinal com a Dra. Vera Ângelo.',
    imagem:     '/images/dra-vera.jpg',
    href:       'https://www.nuvemensino.com.br/cursos/teste-respiratorio-de-hidrogenio-e-metano',
    destaque:   true,
  },
  {
    id:         'desvendando-a-constipacao-intestinal',
    titulo:     'Desvendando a Constipação Intestinal',
    parceiro:   'NU.V.E.M Ensino',
    tipo:       'Curso',
    modalidade: 'Online',
    instrutor:  'Dra. Eliane Basques',
    descricao:  'Domine a abordagem diagnóstica da constipação intestinal: aplique corretamente a Classificação Roma IV, Tempo de Trânsito Colônico e Manometria Anorretal com a Dra. Eliane Basques.',
    imagem:     '/images/dra-eliane.jpg',
    href:       'https://www.nuvemensino.com.br/cursos/desvendando-a-constipacao-intestinal',
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
