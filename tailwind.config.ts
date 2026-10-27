import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
  './app/**/*.{js,ts,jsx,tsx,mdx}',
],
  theme: {
    screens: {
      'xs':  '480px',
      'sm':  '640px',
      'md':  '768px',
      'lg':  '1024px',
      'xl':  '1280px',
      '2xl': '1440px',
    },
    extend: {
      // ── COLORS ───────────────────────────────────────────
      colors: {
        sky:   '#78a5cb',
        steel: '#537799',
        navy:  '#0f2c3c',
        amber: '#f2ac2a',
        gold:  '#ffd101',
        bg:    '#e6e6e6',
        surface: '#f5f5f5',
      },

      // ── TYPOGRAPHY ───────────────────────────────────────
      // sans  → Sora     : heading, nav, CTA
      // body  → Manrope  : paragraf, deskripsi
      fontFamily: {
        sans: ['var(--font-sora)', 'system-ui', 'sans-serif'],
        body: ['var(--font-manrope)', 'system-ui', 'sans-serif'],
      },
      fontSize: {
        'xs':   ['0.75rem',   { lineHeight: '1rem' }],
        'sm':   ['0.875rem',  { lineHeight: '1.25rem' }],
        'base': ['1rem',      { lineHeight: '1.5rem' }],
        'md':   ['1.125rem',  { lineHeight: '1.75rem' }],
        'lg':   ['1.25rem',   { lineHeight: '1.75rem' }],
        'xl':   ['1.5rem',    { lineHeight: '2rem' }],
        '2xl':  ['1.875rem',  { lineHeight: '2.25rem' }],
        '3xl':  ['2.25rem',   { lineHeight: '2.5rem' }],
        '4xl':  ['3rem',      { lineHeight: '1.2' }],
        '5xl':  ['3.75rem',   { lineHeight: '1.15' }],
        '6xl':  ['4.5rem',    { lineHeight: '1.1' }],
      },
      fontWeight: {
        // 400 → body/paragraf (Manrope)
        // 500 → nav, label, subheading
        // 600 → section heading h2/h3
        // 700 → hero h1
        regular:  '400',
        medium:   '500',
        semibold: '600',
        bold:     '700',
      },
      letterSpacing: {
        tight:  '-0.02em',
        normal:  '0em',
        wide:    '0.02em',
        wider:   '0.05em',
      },

      // ── SPACING ──────────────────────────────────────────
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '26': '6.5rem',
        '30': '7.5rem',
      },

      // ── MAX WIDTH ────────────────────────────────────────
      maxWidth: {
        'xs':      '20rem',
        'sm':      '36rem',
        'md':      '48rem',
        'lg':      '64rem',
        'xl':      '80rem',
        '2xl':     '90rem',
        'content': '65ch',
      },

      // ── BORDER RADIUS ────────────────────────────────────
      borderRadius: {
        'sm':  '4px',
        'md':  '8px',
        'lg':  '12px',
        'xl':  '20px',
        '2xl': '32px',
      },

      // ── BOX SHADOW ───────────────────────────────────────
      boxShadow: {
        'sm':  '0 1px 3px rgba(15,44,60,0.10), 0 1px 2px rgba(15,44,60,0.10)',
        'md':  '0 4px 12px rgba(15,44,60,0.10), 0 2px 4px rgba(15,44,60,0.10)',
        'lg':  '0 10px 32px rgba(15,44,60,0.12), 0 4px 8px rgba(15,44,60,0.10)',
        'xl':  '0 20px 48px rgba(15,44,60,0.15)',
        'none': 'none',
      },

      // ── TRANSITIONS ──────────────────────────────────────
      transitionDuration: {
        'fast': '150ms',
        'base': '250ms',
        'slow': '400ms',
      },

      // ── ANIMATIONS ───────────────────────────────────────
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 40s linear infinite',
      },
    },
  },
  plugins: [],
}

export default config