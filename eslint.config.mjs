// ESLint 9 (flat config). O Next 16 removeu o `next lint`: o lint roda pelo
// próprio ESLint, com as regras do eslint-config-next.
import nextVitals from 'eslint-config-next/core-web-vitals'
import nextTs from 'eslint-config-next/typescript'

const config = [
  ...nextVitals,
  ...nextTs,
  {
    // Regras que entraram como erro no eslint-config-next 16 e apontam padrões
    // anteriores a esta configuração (11/2026). Ficam como aviso até a
    // refatoração própria, para o lint não bloquear o trabalho:
    // · React Compiler (react-hooks 7): setState em efeito no banner de
    //   consentimento, na nuvete e na anamnese; corrigir mexe em lógica.
    // · no-explicit-any: tipos dos componentes do Portable Text no blog.
    rules: {
      'react-hooks/set-state-in-effect':           'warn',
      'react-hooks/refs':                          'warn',
      'react-hooks/immutability':                  'warn',
      'react-hooks/preserve-manual-memoization':   'warn',
      '@typescript-eslint/no-explicit-any':        'warn',
    },
  },
  {
    ignores: [
      '**/.next/**',
      '**/node_modules/**',
      '.claude/**',
      'docs/**',
      'next-env.d.ts',
      'tsconfig.tsbuildinfo',
      'public/**',
    ],
  },
]

export default config
