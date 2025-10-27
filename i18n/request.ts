import {getRequestConfig} from 'next-intl/server';

// Static imports for Edge Runtime compatibility
import enMessages from '../messages/en.json';
import arMessages from '../messages/ar.json';
import heMessages from '../messages/he.json';

// Can be imported from a shared config
export const locales = ['en', 'ar', 'he'] as const;
export type Locale = (typeof locales)[number];

// Messages map
const messages = {
  en: enMessages,
  ar: arMessages,
  he: heMessages
} as const;

export default getRequestConfig(async ({requestLocale}) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that the incoming locale is valid
  if (!locale || !locales.includes(locale as Locale)) {
    locale = 'en';
  }

  return {
    locale,
    messages: messages[locale as Locale]
  };
});
