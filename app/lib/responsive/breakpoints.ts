/**
 * Ultra-Premium Breakpoints System
 * Comprehensive breakpoint configuration for all device types
 */

export const breakpoints = {
  // Micro devices
  xs: '320px',      // Minimum supported (iPhone SE old)
  sm: '375px',      // iPhone SE, small phones
  ms: '390px',      // iPhone 14
  ml: '428px',      // iPhone 14 Pro Max

  // Phablets
  ph: '480px',      // Large phones landscape
  ps: '600px',      // Small tablets portrait

  // Tablets
  tb: '768px',      // iPad portrait
  tm: '834px',      // iPad Pro 11" portrait
  tl: '1024px',     // iPad landscape

  // Laptops
  lp: '1280px',     // Small laptop
  lg: '1440px',     // Standard laptop
  xl: '1536px',     // Large laptop

  // Desktops
  dt: '1920px',     // Full HD
  '2k': '2048px',   // 2K
  '3k': '2560px',   // QHD
  '4k': '3840px',   // 4K UHD
  '5k': '5120px',   // 5K
  '8k': '7680px',   // 8K UHD

  // Special devices
  tv: '1920px',     // TV optimized
  vr: '2880px',     // VR headsets per eye
  car: '800px',     // Car displays
  watch: '200px',   // Smartwatches
  fold: '280px'     // Folded phones
} as const;

export type Breakpoint = keyof typeof breakpoints;

/**
 * Container queries configuration
 */
export const containerQueries = {
  card: { min: '250px', max: '600px' },
  sidebar: { min: '200px', max: '400px' },
  content: { min: '600px', max: '1200px' },
  hero: { min: '100%', max: '100%' },
  modal: { min: '320px', max: '800px' },
  navigation: { min: '200px', max: '1200px' }
} as const;

export type ContainerQuery = keyof typeof containerQueries;

/**
 * Device categories based on viewport width
 */
export const deviceCategories = {
  watch: { min: 0, max: 250 },
  mobile: { min: 250, max: 767 },
  tablet: { min: 768, max: 1023 },
  laptop: { min: 1024, max: 1439 },
  desktop: { min: 1440, max: 2559 },
  largeDesktop: { min: 2560, max: 3839 },
  ultraWide: { min: 3840, max: 7679 },
  extreme: { min: 7680, max: Infinity }
} as const;

/**
 * Responsive spacing scale
 */
export const spacingScale = {
  xs: { mobile: '0.5rem', tablet: '0.75rem', desktop: '1rem' },
  sm: { mobile: '1rem', tablet: '1.5rem', desktop: '2rem' },
  md: { mobile: '1.5rem', tablet: '2rem', desktop: '3rem' },
  lg: { mobile: '2rem', tablet: '3rem', desktop: '4rem' },
  xl: { mobile: '3rem', tablet: '4rem', desktop: '6rem' },
  '2xl': { mobile: '4rem', tablet: '6rem', desktop: '8rem' }
} as const;

/**
 * Responsive font sizes with fluid scaling
 */
export const fluidTypography = {
  // Display sizes
  display1: {
    min: '2.5rem',
    preferred: '5vw',
    max: '6rem',
    lineHeight: 1.1
  },
  display2: {
    min: '2rem',
    preferred: '4vw',
    max: '4.5rem',
    lineHeight: 1.15
  },

  // Heading sizes
  h1: {
    min: '1.75rem',
    preferred: '3vw',
    max: '3.5rem',
    lineHeight: 1.2
  },
  h2: {
    min: '1.5rem',
    preferred: '2.5vw',
    max: '2.75rem',
    lineHeight: 1.25
  },
  h3: {
    min: '1.25rem',
    preferred: '2vw',
    max: '2rem',
    lineHeight: 1.3
  },
  h4: {
    min: '1.125rem',
    preferred: '1.75vw',
    max: '1.5rem',
    lineHeight: 1.35
  },
  h5: {
    min: '1rem',
    preferred: '1.5vw',
    max: '1.25rem',
    lineHeight: 1.4
  },
  h6: {
    min: '0.875rem',
    preferred: '1.25vw',
    max: '1rem',
    lineHeight: 1.45
  },

  // Body sizes
  bodyLarge: {
    min: '1.125rem',
    preferred: '1.5vw',
    max: '1.375rem',
    lineHeight: 1.6
  },
  body: {
    min: '1rem',
    preferred: '1.25vw',
    max: '1.125rem',
    lineHeight: 1.6
  },
  bodySmall: {
    min: '0.875rem',
    preferred: '1vw',
    max: '1rem',
    lineHeight: 1.5
  },

  // Utility sizes
  caption: {
    min: '0.75rem',
    preferred: '0.875vw',
    max: '0.875rem',
    lineHeight: 1.4
  },
  overline: {
    min: '0.625rem',
    preferred: '0.75vw',
    max: '0.75rem',
    lineHeight: 1.5,
    letterSpacing: '0.1em',
    textTransform: 'uppercase' as const
  }
} as const;

/**
 * Generate CSS clamp function for fluid sizing
 */
export function generateFluidSize(
  min: string,
  preferred: string,
  max: string
): string {
  return `clamp(${min}, ${preferred}, ${max})`;
}

/**
 * Get breakpoint value in pixels
 */
export function getBreakpointValue(breakpoint: Breakpoint): number {
  return parseInt(breakpoints[breakpoint]);
}

/**
 * Check if viewport matches breakpoint
 */
export function matchesBreakpoint(
  viewportWidth: number,
  breakpoint: Breakpoint,
  direction: 'min' | 'max' = 'min'
): boolean {
  const value = getBreakpointValue(breakpoint);
  return direction === 'min' ? viewportWidth >= value : viewportWidth <= value;
}

/**
 * Get current device category based on viewport width
 */
export function getDeviceCategory(
  viewportWidth: number
): keyof typeof deviceCategories {
  for (const [category, range] of Object.entries(deviceCategories)) {
    if (viewportWidth >= range.min && viewportWidth <= range.max) {
      return category as keyof typeof deviceCategories;
    }
  }
  return 'desktop';
}

/**
 * Generate media query string
 */
export function mediaQuery(
  breakpoint: Breakpoint,
  direction: 'min' | 'max' = 'min'
): string {
  const prop = direction === 'min' ? 'min-width' : 'max-width';
  return `@media (${prop}: ${breakpoints[breakpoint]})`;
}

/**
 * Generate container query string
 */
export function containerQueryString(
  container: ContainerQuery,
  direction: 'min' | 'max' = 'min'
): string {
  const query = containerQueries[container];
  const value = direction === 'min' ? query.min : query.max;
  const prop = direction === 'min' ? 'min-width' : 'max-width';
  return `@container (${prop}: ${value})`;
}

/**
 * Tailwind-compatible breakpoint extensions
 */
export const tailwindBreakpoints = {
  screens: {
    'xs': breakpoints.xs,
    'sm': breakpoints.sm,
    'ms': breakpoints.ms,
    'ml': breakpoints.ml,
    'ph': breakpoints.ph,
    'ps': breakpoints.ps,
    'tb': breakpoints.tb,
    'tm': breakpoints.tm,
    'tl': breakpoints.tl,
    'lp': breakpoints.lp,
    'lg': breakpoints.lg,
    'xl': breakpoints.xl,
    'dt': breakpoints.dt,
    '2k': breakpoints['2k'],
    '3k': breakpoints['3k'],
    '4k': breakpoints['4k'],
    '5k': breakpoints['5k'],
    '8k': breakpoints['8k'],
    'tv': breakpoints.tv,
    'vr': breakpoints.vr,
    'car': breakpoints.car,
    'watch': breakpoints.watch,
    'fold': breakpoints.fold
  }
};

/**
 * Common viewport sizes for testing
 */
export const commonViewports = {
  // Mobile devices
  'iPhone SE': { width: 375, height: 667, dpr: 2 },
  'iPhone 12': { width: 390, height: 844, dpr: 3 },
  'iPhone 14': { width: 390, height: 844, dpr: 3 },
  'iPhone 14 Pro': { width: 393, height: 852, dpr: 3 },
  'iPhone 14 Pro Max': { width: 428, height: 926, dpr: 3 },
  'Samsung Galaxy S21': { width: 360, height: 800, dpr: 3 },
  'Samsung Galaxy S22 Ultra': { width: 384, height: 854, dpr: 3.5 },
  'Pixel 7': { width: 412, height: 915, dpr: 2.625 },

  // Tablets
  'iPad Mini': { width: 768, height: 1024, dpr: 2 },
  'iPad': { width: 810, height: 1080, dpr: 2 },
  'iPad Air': { width: 820, height: 1180, dpr: 2 },
  'iPad Pro 11"': { width: 834, height: 1194, dpr: 2 },
  'iPad Pro 12.9"': { width: 1024, height: 1366, dpr: 2 },
  'Surface Pro': { width: 912, height: 1368, dpr: 2 },

  // Laptops
  'MacBook Air': { width: 1440, height: 900, dpr: 2 },
  'MacBook Pro 13"': { width: 1440, height: 900, dpr: 2 },
  'MacBook Pro 14"': { width: 1512, height: 982, dpr: 2 },
  'MacBook Pro 16"': { width: 1728, height: 1117, dpr: 2 },
  'Dell XPS 13': { width: 1920, height: 1200, dpr: 2 },

  // Desktops
  '24" iMac': { width: 2240, height: 1260, dpr: 2 },
  '27" iMac 5K': { width: 2560, height: 1440, dpr: 2 },
  '32" 4K Monitor': { width: 3840, height: 2160, dpr: 1 },
  '49" Ultrawide': { width: 5120, height: 1440, dpr: 1 },

  // Special
  'Apple Watch 41mm': { width: 176, height: 215, dpr: 2 },
  'Apple Watch 45mm': { width: 198, height: 242, dpr: 2 },
  'Apple TV 4K': { width: 1920, height: 1080, dpr: 2 },
  'Meta Quest 2': { width: 1832, height: 1920, dpr: 1 },
  'CarPlay': { width: 800, height: 480, dpr: 2 }
} as const;
