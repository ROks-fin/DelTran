import createMiddleware from 'next-intl/middleware';
import {locales} from './i18n/request';

export default createMiddleware({
  // A list of all locales that are supported
  locales: locales as any,

  // Used when no locale matches
  defaultLocale: 'en',

  // Always use locale prefix in the URL
  localePrefix: 'always'
});

export const config = {
  // Matcher ignoring `/_next/` and `/api/`
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};