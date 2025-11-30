/**
 * Централизованная SEO конфигурация для DelTran
 * Сверхпремиальное SEO решение уровня Enterprise
 */

import { Metadata } from 'next';

export const SITE_CONFIG = {
  name: 'DelTran',
  title: 'DelTran - Enterprise Settlement Infrastructure for Banks',
  description: 'Banking-grade settlement infrastructure. On-demand settlement, multilateral netting and automated compliance for regulated financial institutions.',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://deltran.ai',
  ogImage: '/og-image.png',
  keywords: [
    'settlement infrastructure',
    'bank settlement',
    'multilateral netting',
    'correspondent banking',
    'on-demand settlement',
    'trapped capital',
    'nostro vostro',
    'ISO 20022',
    'AML CFT compliance',
    'regulated institutions',
    'payment rails',
    'cross-border settlement'
  ] as string[],
  authors: [
    {
      name: 'DelTran',
      url: 'https://deltran.ai',
    },
  ],
  creator: 'DelTran',
  publisher: 'DelTran',
  social: {
    twitter: '@deltran',
    linkedin: 'company/deltran',
  },
  contact: {
    email: 'contact@deltran.ai',
  },
};

export const LOCALES = {
  en: {
    locale: 'en' as const,
    name: 'English',
    dir: 'ltr' as const,
    title: 'DelTran - Enterprise Settlement Infrastructure for Banks',
    description: 'One rail. Infinite reach. On-demand settlement, multilateral netting and automated compliance for regulated financial institutions.',
  },
  ar: {
    locale: 'ar' as const,
    name: 'العربية',
    dir: 'rtl' as const,
    title: 'DelTran - بنية تحتية للتسوية المصرفية',
    description: 'طريق واحد. فرص لا محدودة. تسوية عند الطلب وتسوية ذكية متعددة الأطراف للمؤسسات المالية المنظمة.',
  },
  he: {
    locale: 'he' as const,
    name: 'עברית',
    dir: 'rtl' as const,
    title: 'DelTran - תשתית סליקה לבנקים',
    description: 'מסלול אחד. אפשרויות אינסופיות. סליקה על-פי-דרישה, נטינג רב-צדדי וציות אוטומטי למוסדות פיננסיים מפוקחים.',
  },
};

export type LocaleKey = keyof typeof LOCALES;

/**
 * Генерирует базовые метаданные для страницы
 */
export function generatePageMetadata({
  title,
  description,
  path = '',
  locale = 'en' as LocaleKey,
  keywords,
  noIndex = false,
  openGraph,
}: {
  title?: string;
  description?: string;
  path?: string;
  locale?: LocaleKey;
  keywords?: string[];
  noIndex?: boolean;
  openGraph?: {
    title?: string;
    description?: string;
    images?: string[];
    type?: 'website' | 'article' | 'profile';
  };
}): Metadata {
  const pageTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : LOCALES[locale].title;

  const pageDescription = description || LOCALES[locale].description;
  const url = `${SITE_CONFIG.url}/${locale}${path}`;
  const ogImage = openGraph?.images?.[0] || `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;

  return {
    title: pageTitle,
    description: pageDescription,
    keywords: keywords || SITE_CONFIG.keywords,
    authors: SITE_CONFIG.authors,
    creator: SITE_CONFIG.creator,
    publisher: SITE_CONFIG.publisher,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: url,
      languages: {
        'en': `${SITE_CONFIG.url}/en${path}`,
        'ar': `${SITE_CONFIG.url}/ar${path}`,
        'he': `${SITE_CONFIG.url}/he${path}`,
      },
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    openGraph: {
      type: openGraph?.type || 'website',
      locale: locale,
      alternateLocale: Object.keys(LOCALES).filter(l => l !== locale),
      url: url,
      title: openGraph?.title || pageTitle,
      description: openGraph?.description || pageDescription,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: pageTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: openGraph?.title || pageTitle,
      description: openGraph?.description || pageDescription,
      site: SITE_CONFIG.social.twitter,
      creator: SITE_CONFIG.social.twitter,
      images: [ogImage],
    },
    verification: {
      google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
      yandex: process.env.NEXT_PUBLIC_YANDEX_VERIFICATION,
    },
    category: 'finance',
    icons: {
      icon: [
        { url: '/icon.svg', type: 'image/svg+xml' },
        { url: '/favicon.ico', sizes: 'any' },
      ],
      apple: [
        { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
      ],
    },
    manifest: '/manifest.json',
  };
}

/**
 * Генерирует дополнительные SEO теги для <head>
 */
export function generateAdditionalMetaTags(locale: LocaleKey = 'en') {
  return {
    'application-name': SITE_CONFIG.name,
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'apple-mobile-web-app-title': SITE_CONFIG.name,
    'format-detection': 'telephone=no',
    'mobile-web-app-capable': 'yes',
    'msapplication-TileColor': '#000000',
    'msapplication-tap-highlight': 'no',
    'theme-color': '#000000',
    'og:image': '/og-image.png',
    'lang': locale,
    'dir': LOCALES[locale].dir,
  };
}
