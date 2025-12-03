import type { Config } from 'tailwindcss'
// eslint-disable-next-line @typescript-eslint/no-require-imports
const fluidType = require('tailwindcss-fluid-type')

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Ultra-premium responsive breakpoints (inlined for simplicity)
      screens: {
        'xs': '375px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
        '3xl': '1920px',
        '4xl': '2560px',
      },
      colors: {
        // Ultra-Premium Luxury Color Palette
        midnight: '#0a0a0a',
        charcoal: '#1a1a1a',
        obsidian: '#0f0f0f',
        platinum: '#e5e5e7',
        pearl: '#f8f8f8',
        // Refined Gold Spectrum
        gold: {
          DEFAULT: '#d4af37',
          50: '#fefbf0',
          100: '#fcf5d8',
          200: '#f8e8a8',
          300: '#f2d56c',
          400: '#e6c757',
          500: '#d4af37',
          600: '#b89730',
          700: '#9a7b28',
          800: '#7c6020',
          900: '#5e4818',
          light: '#e6c757',
          dark: '#b89730',
        },
        // Luxury Champagne
        champagne: {
          DEFAULT: '#f7e7ce',
          light: '#faf4e8',
          dark: '#e6d4b5',
        },
        // Rich Bronze
        bronze: {
          DEFAULT: '#cd7f32',
          light: '#daa060',
          dark: '#a66628',
        },
        // Elegant Silver
        silver: {
          DEFAULT: '#c0c0c0',
          light: '#e8e8e8',
          dark: '#a0a0a0',
        },
        // Deep Royal
        royal: {
          DEFAULT: '#1a1a2e',
          light: '#2d2d44',
          dark: '#0f0f1a',
        },
        // Semantic colors
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
      },
      fontFamily: {
        // Inter - body text and UI elements
        sans: ['var(--font-body)', 'Inter', 'system-ui', 'sans-serif'],
        // DM Serif Display - headings (28px+)
        serif: ['var(--font-display)', 'DM Serif Display', 'Georgia', 'serif'],
        display: ['var(--font-display)', 'DM Serif Display', 'Georgia', 'serif'],
        // Mono uses Inter for consistency
        mono: ['var(--font-body)', 'Inter', 'monospace'],
        // RTL language support
        hebrew: ['Noto Sans Hebrew', 'var(--font-body)', 'Inter', 'sans-serif'],
        arabic: ['Noto Sans Arabic', 'var(--font-body)', 'Inter', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.875rem' }],
        '3xs': ['0.5rem', { lineHeight: '0.75rem' }],
        // Premium typography scale with optimal line heights and letter spacing
        'display-2xl': ['4.5rem', { lineHeight: '1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-xl': ['3.75rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '700' }],
        'display-lg': ['3rem', { lineHeight: '1.1', letterSpacing: '-0.02em', fontWeight: '600' }],
        'display-md': ['2.25rem', { lineHeight: '1.2', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-sm': ['1.875rem', { lineHeight: '1.25', letterSpacing: '-0.01em', fontWeight: '600' }],
        'display-xs': ['1.5rem', { lineHeight: '1.3', letterSpacing: '-0.01em', fontWeight: '500' }],
        // Body text with optimal readability
        'body-xl': ['1.25rem', { lineHeight: '1.75', letterSpacing: '0' }],
        'body-lg': ['1.125rem', { lineHeight: '1.75', letterSpacing: '0' }],
        'body-md': ['1rem', { lineHeight: '1.625', letterSpacing: '0' }],
        'body-sm': ['0.875rem', { lineHeight: '1.5', letterSpacing: '0.01em' }],
        'body-xs': ['0.75rem', { lineHeight: '1.5', letterSpacing: '0.02em' }],
      },
      letterSpacing: {
        'ultra-tight': '-0.05em',
        'premium': '-0.025em',
        'elegant': '0.05em',
        'luxury': '0.15em',
        'display': '0.25em',
      },
      // ============================================
      // DELTRAN MOTION v2 — GPU-Optimized Animations
      // ============================================
      animation: {
        // Core animations
        'dt-fade': 'dt-fade 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'dt-fade-up': 'dt-fade-up 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'dt-fade-down': 'dt-fade-down 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'dt-scale-in': 'dt-scale-in 400ms cubic-bezier(0.22, 1, 0.36, 1) forwards',
        'dt-microfloat': 'dt-microfloat 4s ease-in-out infinite',
        'dt-pulse-subtle': 'dt-pulse-subtle 3s ease-in-out infinite',
        // Gold effects
        'dt-shimmer-gold': 'dt-shimmer-gold 3s linear infinite',
        'dt-glow-pulse': 'dt-glow-pulse 3s ease-in-out infinite',
        // Flow animations
        'dt-flow': 'dt-flow 2s ease-in-out infinite',
        'dt-flow-rtl': 'dt-flow-rtl 2s ease-in-out infinite',
        // Loading states
        'dt-spin': 'dt-spin 1s linear infinite',
        'dt-skeleton': 'dt-skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        'dt-fade': {
          from: { opacity: '0' },
          to: { opacity: '1' },
        },
        'dt-fade-up': {
          from: { opacity: '0', transform: 'translateY(10px) translateZ(0)' },
          to: { opacity: '1', transform: 'translateY(0) translateZ(0)' },
        },
        'dt-fade-down': {
          from: { opacity: '0', transform: 'translateY(-10px) translateZ(0)' },
          to: { opacity: '1', transform: 'translateY(0) translateZ(0)' },
        },
        'dt-scale-in': {
          from: { opacity: '0', transform: 'scale(0.985) translateZ(0)' },
          to: { opacity: '1', transform: 'scale(1) translateZ(0)' },
        },
        'dt-microfloat': {
          '0%, 100%': { transform: 'translateY(0) translateZ(0)' },
          '50%': { transform: 'translateY(-3px) translateZ(0)' },
        },
        'dt-pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        'dt-shimmer-gold': {
          from: { backgroundPosition: '-200% center' },
          to: { backgroundPosition: '200% center' },
        },
        'dt-glow-pulse': {
          '0%, 100%': { transform: 'scale(1) translateZ(0)', opacity: '0.6' },
          '50%': { transform: 'scale(1.02) translateZ(0)', opacity: '1' },
        },
        'dt-flow': {
          '0%': { opacity: '0', transform: 'translateX(0) translateZ(0)' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(100%) translateZ(0)' },
        },
        'dt-flow-rtl': {
          '0%': { opacity: '0', transform: 'translateX(0) translateZ(0)' },
          '20%': { opacity: '1' },
          '80%': { opacity: '1' },
          '100%': { opacity: '0', transform: 'translateX(-100%) translateZ(0)' },
        },
        'dt-spin': {
          to: { transform: 'rotate(360deg) translateZ(0)' },
        },
        'dt-skeleton': {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.7' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'gold-gradient': 'linear-gradient(135deg, #d4af37 0%, #e6c757 50%, #b89730 100%)',
        'dark-gradient': 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)',
      },
      backdropBlur: {
        xs: '2px',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
    },
  },
  plugins: [
    fluidType({
      // Fluid type settings - smooth scaling from mobile to desktop
      settings: {
        fontSizeMin: 1,        // 16px base on mobile
        fontSizeMax: 1.25,     // 20px base on desktop
        ratioMin: 1.125,       // Minor second scale on mobile
        ratioMax: 1.25,        // Major third scale on desktop
        screenMin: 20,         // 320px - small mobile
        screenMax: 96,         // 1536px - large desktop
        unit: 'rem',
        prefix: 'fluid-',      // Use prefix to coexist with default sizes
        extendValues: true,
      },
      // Typography scale with line heights
      values: {
        // Small text
        'xs': [-2, 1.5],       // ~12-14px
        'sm': [-1, 1.5],       // ~14-16px
        // Body text
        'base': [0, 1.65],     // 16-20px
        'lg': [1, 1.6],        // ~18-25px
        'xl': [2, 1.5],        // ~20-31px
        // Headings
        '2xl': [3, 1.3],       // ~23-39px
        '3xl': [4, 1.25],      // ~26-49px
        '4xl': [5, 1.2],       // ~29-61px
        '5xl': [6, 1.15],      // ~33-76px
        '6xl': [7, 1.1],       // ~37-95px
        '7xl': [8, 1.05],      // ~41-119px
        '8xl': [9, 1],         // ~47-149px
        '9xl': [10, 1],        // ~52-186px
      },
    }),
  ],
}

export default config
