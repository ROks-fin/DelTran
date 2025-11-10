import { useLocale } from 'next-intl';

export function useTextDirection() {
  const locale = useLocale();
  const isRTL = locale === 'ar' || locale === 'he';

  return {
    isRTL,
    dir: isRTL ? 'rtl' : 'ltr',
    textAlign: isRTL ? 'right' : 'left',
  };
}
