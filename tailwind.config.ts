import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:  ['var(--font-poppins)', 'sans-serif'],
        serif: ['var(--font-cormorant)', 'serif'],
      },
      colors: {
        // ── Light theme surfaces ──────────────────────────────────────────
        white:  '#FFFFFF',
        cloud:  '#FCFCFC',
        mist:   '#CBE4E6',
        steel:  '#363636',

        // ── Brand ─────────────────────────────────────────────────────────
        teal: {
          DEFAULT: '#00465F',
          mid:     '#0A5E7E',
          light:   '#CBE4E6',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E2C06A',
          dark:    '#A67C2E',
        },

        // ── Dark surfaces (footer, dark CTA blocks) ────────────────────
        ink:   '#050E14',
        deep:  '#071520',
        navy:  '#00293A',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse 80% 60% at 65% 35%, rgba(203,228,230,.45) 0%, transparent 65%), linear-gradient(170deg, #FFFFFF 0%, #FCFCFC 100%)',
        'gold-gradient':
          'linear-gradient(135deg, #C9A84C 0%, #E2C06A 100%)',
      },
      animation: {
        'drift':       'drift 12s ease-in-out infinite',
        'seal-spin':   'sealSpin 30s linear infinite',
        'seal-unspin': 'sealSpin 30s linear infinite reverse',
        'fade-up':     'fadeUp .8s var(--ease-out) both',
        'scroll-bar':  'scrollAnim 2s ease-in-out infinite',
      },
      keyframes: {
        drift: {
          '0%,100%': { transform: 'translate(0,0) scale(1)' },
          '33%':     { transform: 'translate(20px,-15px) scale(1.04)' },
          '66%':     { transform: 'translate(-10px,20px) scale(.97)' },
        },
        sealSpin: {
          from: { transform: 'rotate(0deg)' },
          to:   { transform: 'rotate(360deg)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
        scrollAnim: {
          '0%':   { transform: 'scaleY(0)', transformOrigin: 'top' },
          '50%':  { transform: 'scaleY(1)', transformOrigin: 'top' },
          '51%':  { transform: 'scaleY(1)', transformOrigin: 'bottom' },
          '100%': { transform: 'scaleY(0)', transformOrigin: 'bottom' },
        },
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(.16,1,.3,1)',
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}

export default config
