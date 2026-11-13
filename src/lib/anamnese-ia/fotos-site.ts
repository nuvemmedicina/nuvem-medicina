/**
 * Fotos dos profissionais que o site já usa (public/images), ponto de partida
 * da seção "Sua foto para o site". Mapeadas em 08/11/2026.
 *
 * Ficam de fora, por não entrarem no atendimento automático: Dra. Adrianna
 * Buzatti Viana, Dra. Luiza Auarek e Dra. Mariana Fernandes.
 *
 * A importação copia o arquivo para o Blob privado (envio 0). O original em
 * public/images não muda.
 */
export type FotoSite = {
  arquivo: string           // caminho público no site
  largura: number
  altura: number
  ondeAparece: string[]
}

export const FOTOS_SITE: Record<string, FotoSite> = {
  'vera-angelo': {
    arquivo: '/images/dra-vera.jpg', largura: 900, altura: 900,
    ondeAparece: ['/equipe', '/dra-vera-angelo', '/sobre', '/ensino', '/especialidades (gastroenterologia, halitose e motilidade digestiva, nos 3 idiomas)'],
  },
  'eliane-basques': {
    arquivo: '/images/dra-eliane.jpg', largura: 900, altura: 900,
    ondeAparece: ['/equipe', '/dra-eliane-basques', '/sobre', '/ensino', '/especialidades/pediatria (nos 3 idiomas)'],
  },
  'amanda-araujo': {
    arquivo: '/images/Amanda-Araujo.jpg', largura: 1691, altura: 1691,
    ondeAparece: ['/equipe'],
  },
  'anna-karoline': {
    arquivo: '/images/anna-karoline.jpg', largura: 900, altura: 900,
    ondeAparece: ['/equipe', '/especialidades/fisioterapia-pelvica (nos 3 idiomas)'],
  },
  'claudia-utsch': {
    arquivo: '/images/claudia-utsch.jpg', largura: 900, altura: 900,
    ondeAparece: ['/equipe', '/especialidades/gastroenterologia (nos 3 idiomas)'],
  },
  'camilla-mendes': {
    arquivo: '/images/camilla-mendes.jpg', largura: 900, altura: 900,
    ondeAparece: ['/equipe'],
  },
  'danielle-martins': {
    arquivo: '/images/danielle-martins.jpg', largura: 900, altura: 900,
    ondeAparece: ['/equipe', '/especialidades/gastroenterologia (nos 3 idiomas)'],
  },
  'gabriel-fernandes-filho': {
    arquivo: '/images/dr-Gabriel-de-Souza-Fernandes-Filho.jpg', largura: 1691, altura: 1691,
    ondeAparece: ['/equipe', '/especialidades/motilidade-digestiva (nos 3 idiomas)'],
  },
  'raissa-dalat': {
    arquivo: '/images/raissa-dalat.jpg', largura: 700, altura: 700,
    ondeAparece: ['/equipe'],
  },
}

export const fotoSiteDe = (escopo: string): FotoSite | null => FOTOS_SITE[escopo.replace(/^medico-/, '')] ?? null
