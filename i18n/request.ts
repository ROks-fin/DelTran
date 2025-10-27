import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'ar', 'he'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  // Use static imports for Edge Runtime compatibility
  const messages = await (async () => {
    switch (locale) {
      case 'ar':
        return (await import('../messages/ar.json')).default;
      case 'he':
        return (await import('../messages/he.json')).default;
      default:
        return (await import('../messages/en.json')).default;
    }
  })();

  return {
    locale,
    messages
  } as any;
});
