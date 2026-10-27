/**
 * SLEEP & DREAM — Design Tokens (TypeScript)
 * Gunakan ini untuk nilai token di JavaScript/TypeScript.
 * Untuk CSS biasa, pakai CSS variables atau Tailwind class.
 */

export const colors = {
  sky:   '#78a5cb',
  steel: '#537799',
  navy:  '#0f2c3c',
  amber: '#f2ac2a',
  gold:  '#ffd101',
  bg:    '#e6e6e6',
  surface: '#f5f5f5',
  white:   '#ffffff',
  navyAlpha: {
    10: 'rgba(15, 44, 60, 0.10)',
    20: 'rgba(15, 44, 60, 0.20)',
    60: 'rgba(15, 44, 60, 0.60)',
  },
} as const

export const fonts = {
  // Heading, nav, CTA, label
  sans: 'var(--font-sora), system-ui, sans-serif',
  // Paragraf, deskripsi produk, body text
  body: 'var(--font-manrope), system-ui, sans-serif',
} as const

// Font weight guide:
// 400 → body/paragraf (Manrope)
// 500 → nav, label, subheading
// 600 → section heading h2/h3, CTA
// 700 → hero h1
export const fontWeights = {
  regular:  400,
  medium:   500,
  semibold: 600,
  bold:     700,
} as const

export const spacing = {
  1:  '0.25rem',
  2:  '0.5rem',
  3:  '0.75rem',
  4:  '1rem',
  5:  '1.25rem',
  6:  '1.5rem',
  8:  '2rem',
  10: '2.5rem',
  12: '3rem',
  16: '4rem',
  20: '5rem',
  24: '6rem',
  32: '8rem',
} as const

export const breakpoints = {
  xs:    480,
  sm:    640,
  md:    768,
  lg:    1024,
  xl:    1280,
  '2xl': 1440,
} as const

export type ColorKey = keyof typeof colors
export type SpacingKey = keyof typeof spacing