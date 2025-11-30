import type { Config } from 'tailwindcss'
import { tailwindBreakpoints } from './app/lib/responsive/breakpoints'

const config: Config = {
  darkMode: ['class'],
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // Ultra-premium responsive breakpoints
      screens: tailwindBreakpoints.screens,
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
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'fade-up': 'fadeUp 0.5s ease-out',
        'fade-down': 'fadeDown 0.5s ease-out',
        'slide-in': 'slideIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'glow': 'glow 2s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient': 'gradient 8s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeDown: {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideIn: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(0)' },
        },
        slideUp: {
          '0%': { transform: 'translateY(100%)' },
          '100%': { transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        glow: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)' },
          '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        pulseGlow: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
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
  plugins: [],
}

export default config
