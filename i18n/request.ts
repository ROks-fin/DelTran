import {getRequestConfig} from 'next-intl/server';

// Can be imported from a shared config
export const locales = ['en', 'ar', 'he'] as const;
export type Locale = (typeof locales)[number];

export default getRequestConfig(async ({locale}) => {
  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});
