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
        ink:   '#1d485e',
        deep:  '#D7EAEA',
        navy:  '#004060',
        teal: {
          DEFAULT: '#00465F',
          mid:     '#0A5E7E',
          light:   '#D7EAEA',
        },
        gold: {
          DEFAULT: '#C9A84C',
          light:   '#E2C06A',
          dark:    '#A67C2E',
        },
        muted:  'rgba(203,228,230,0.55)',
        faint:  'rgba(203,228,230,0.25)',
      },
      backgroundImage: {
        'hero-gradient':
          'radial-gradient(ellipse 80% 60% at 70% 40%, rgba(0,80,110,.55) 0%, transparent 65%), radial-gradient(ellipse 50% 50% at 20% 80%, rgba(201,168,76,.06) 0%, transparent 60%), linear-gradient(170deg, #003555 0%, #002A45 60%, #001E35 100%)',
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
  plugins: [],
}

export default config