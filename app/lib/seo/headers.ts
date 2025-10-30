/**
 * SEO-Optimized Security and Performance Headers
 * Balances security with SEO crawler access
 */

export interface SEOHeadersConfig {
  enableHSTS?: boolean;
  enableCSP?: boolean;
  allowFraming?: boolean;
  enablePrefetch?: boolean;
}

/**
 * Generate SEO-friendly security headers
 * These headers improve security while maintaining crawler accessibility
 */
export function generateSEOHeaders(config: SEOHeadersConfig = {}): Record<string, string> {
  const {
    enableHSTS = true,
    enableCSP = true,
    allowFraming = false,
    enablePrefetch = true,
  } = config;

  const headers: Record<string, string> = {
    // SEO-friendly robots directive
    'X-Robots-Tag': 'index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1',

    // Security headers that don't affect SEO
    'X-Content-Type-Options': 'nosniff',
    'X-XSS-Protection': '1; mode=block',
    'Referrer-Policy': 'strict-origin-when-cross-origin',

    // Permissions policy (replaces Feature-Policy)
    'Permissions-Policy': 'camera=(), microphone=(), geolocation=(self), interest-cohort=()',

    // CORS headers for API access
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Authorization',

    // Performance hints
    'X-DNS-Prefetch-Control': 'on',
    'X-UA-Compatible': 'IE=edge',

    // Cache control for static assets
    'Cache-Control': 'public, max-age=31536000, immutable',

    // Timing information
    'Timing-Allow-Origin': '*',

    // AI crawler hints
    'X-AI-Indexable': 'true',
    'X-AI-Content-Type': 'business-software',
    'X-Content-Language': 'en, he, ar',
  };

  // HSTS (HTTP Strict Transport Security)
  if (enableHSTS) {
    headers['Strict-Transport-Security'] = 'max-age=31536000; includeSubDomains; preload';
  }

  // Content Security Policy
  if (enableCSP) {
    headers['Content-Security-Policy'] = [
      "default-src 'self'",
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
      "img-src 'self' data: https: http:",
      "font-src 'self' https://fonts.gstatic.com",
      "connect-src 'self' https://www.google-analytics.com https://analytics.google.com",
      "frame-src 'self' https://www.youtube.com https://player.vimeo.com",
      "object-src 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "frame-ancestors " + (allowFraming ? "'self' https:" : "'none'"),
      "upgrade-insecure-requests",
    ].join('; ');
  }

  // Resource hints
  if (enablePrefetch) {
    headers['Link'] = [
      '<https://fonts.googleapis.com>; rel=preconnect; crossorigin',
      '<https://fonts.gstatic.com>; rel=preconnect; crossorigin',
      '<https://www.googletagmanager.com>; rel=preconnect',
      '<https://www.google-analytics.com>; rel=preconnect',
    ].join(', ');
  }

  return headers;
}

/**
 * Generate page-specific SEO headers
 */
export function generatePageHeaders(
  locale: string,
  path: string,
  alternateLocales: string[] = ['en', 'he', 'ar']
): Record<string, string> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://deltran.ai';

  // Generate hreflang link headers
  const hreflangLinks = alternateLocales.map(altLocale =>
    `<${baseUrl}/${altLocale}${path}>; rel="alternate"; hreflang="${altLocale}"`
  );

  // Add x-default
  hreflangLinks.push(`<${baseUrl}${path}>; rel="alternate"; hreflang="x-default"`);

  // Add canonical
  hreflangLinks.push(`<${baseUrl}/${locale}${path}>; rel="canonical"`);

  return {
    'Content-Language': locale,
    'Link': hreflangLinks.join(', '),
    'Vary': 'Accept-Language',
  };
}

/**
 * Performance optimization headers
 */
export function generatePerformanceHeaders(): Record<string, string> {
  return {
    // Early hints for critical resources
    'Link': [
      '</fonts/primary.woff2>; rel=preload; as=font; type=font/woff2; crossorigin',
      '</css/critical.css>; rel=preload; as=style',
      '</js/main.js>; rel=preload; as=script',
    ].join(', '),

    // Server timing (useful for debugging)
    'Server-Timing': 'total;dur=0',

    // Connection optimization
    'Connection': 'keep-alive',
    'Keep-Alive': 'timeout=5, max=100',
  };
}

/**
 * AI Crawler specific headers
 */
export function generateAICrawlerHeaders(): Record<string, string> {
  return {
    // OpenAI GPT
    'X-GPT-Indexable': 'true',
    'X-GPT-Content-Type': 'documentation',
    'X-GPT-API-Available': 'true',

    // Anthropic Claude
    'X-Claude-Indexable': 'true',
    'X-Claude-Content-Type': 'technical-documentation',

    // Perplexity
    'X-Perplexity-Citable': 'true',
    'X-Perplexity-Source-Type': 'official',

    // Google SGE
    'X-Google-SGE-Compatible': 'true',

    // Generic AI headers
    'X-AI-Content-Structure': 'hierarchical',
    'X-AI-Content-Quality': 'high',
    'X-AI-Content-Verified': 'true',
  };
}

/**
 * Mobile optimization headers
 */
export function generateMobileHeaders(): Record<string, string> {
  return {
    'X-Mobile-Optimized': 'true',
    'X-Viewport': 'width=device-width, initial-scale=1',
    'X-App-Capable': 'yes',
    'X-Touch-Icon': '/icon-192x192.png',
  };
}

/**
 * Combine all SEO headers
 */
export function generateComprehensiveSEOHeaders(
  locale: string,
  path: string,
  config: SEOHeadersConfig = {}
): Record<string, string> {
  return {
    ...generateSEOHeaders(config),
    ...generatePageHeaders(locale, path),
    ...generatePerformanceHeaders(),
    ...generateAICrawlerHeaders(),
    ...generateMobileHeaders(),
  };
}

/**
 * Header presets for different page types
 */
export const headerPresets = {
  // Landing pages - maximum SEO
  landing: (locale: string, path: string) => ({
    ...generateComprehensiveSEOHeaders(locale, path, {
      enableHSTS: true,
      enableCSP: true,
      allowFraming: false,
      enablePrefetch: true,
    }),
    'Cache-Control': 'public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800',
  }),

  // API documentation - technical focus
  apiDocs: (locale: string, path: string) => ({
    ...generateComprehensiveSEOHeaders(locale, path),
    'X-Content-Type': 'application/json',
    'X-API-Version': '1.0',
    'Cache-Control': 'public, max-age=1800, s-maxage=3600',
  }),

  // Blog posts - content focus
  blog: (locale: string, path: string) => ({
    ...generateComprehensiveSEOHeaders(locale, path),
    'X-Content-Type': 'article',
    'X-Article-Type': 'blog-post',
    'Cache-Control': 'public, max-age=7200, s-maxage=86400',
  }),

  // Dynamic pages - short cache
  dynamic: (locale: string, path: string) => ({
    ...generateComprehensiveSEOHeaders(locale, path),
    'Cache-Control': 'public, max-age=60, s-maxage=300, stale-while-revalidate=600',
  }),

  // Private pages - no indexing
  private: () => ({
    'X-Robots-Tag': 'noindex, nofollow',
    'Cache-Control': 'private, no-cache, no-store, must-revalidate',
    'Pragma': 'no-cache',
    'Expires': '0',
  }),
};

/**
 * Helper to set headers in Next.js responses
 */
export function applyHeaders(
  headers: Headers,
  seoHeaders: Record<string, string>
): void {
  Object.entries(seoHeaders).forEach(([key, value]) => {
    headers.set(key, value);
  });
}

/**
 * Middleware helper for Next.js
 */
export function createSEOMiddleware(
  locale: string,
  path: string,
  preset: keyof typeof headerPresets = 'landing'
) {
  const headers = headerPresets[preset](locale, path);
  return new Headers(Object.entries(headers));
}

const SEOHeadersModule = {
  generateSEOHeaders,
  generatePageHeaders,
  generatePerformanceHeaders,
  generateAICrawlerHeaders,
  generateMobileHeaders,
  generateComprehensiveSEOHeaders,
  headerPresets,
  applyHeaders,
  createSEOMiddleware,
};

export default SEOHeadersModule;