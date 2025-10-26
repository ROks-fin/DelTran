import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'ar', 'he'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  // Validate that the incoming locale parameter is valid
  if (!locale || !locales.includes(locale as Locale)) {
    notFound();
  }

  // Dynamic import to avoid edge runtime issues
  const messages = (await import(`../messages/${locale}.json`)).default;

  return {
    messages
  };
});
