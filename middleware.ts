import createMiddleware from 'next-intl/middleware';

const locales = ['en', 'ar', 'he'] as const;

export default createMiddleware({
  // A list of all locales that are supported
  locales,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use locale prefix in the URL
  localePrefix: 'always'
});

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};