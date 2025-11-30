import {defineRouting} from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'ar', 'he'],
  defaultLocale: 'en',
  localePrefix: 'always'
  // Note: localeDetection is true by default - middleware auto-detects
  // locale from Accept-Language header and redirects accordingly
});

export type Locale = (typeof routing.locales)[number];
