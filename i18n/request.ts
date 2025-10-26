import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';
import { messages } from './messages';

// Can be imported from a shared config
export const locales = ['en', 'ar', 'he'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({requestLocale}) => {
  // requestLocale is provided by next-intl 3.22 in the context
  const resolvedLocale = (await requestLocale) ?? 'en';

  if (!locales.includes(resolvedLocale as Locale)) notFound();

  return {
    locale: resolvedLocale,
    messages: messages[resolvedLocale as keyof typeof messages] as any
  };
});
