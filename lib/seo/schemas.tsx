/**
 * JSON-LD структурированные данные для максимальной SEO оптимизации
 * Поддержка Schema.org разметки для поисковых систем
 */

import { SITE_CONFIG, LocaleKey } from './config';

export interface SchemaOrgBase {
  '@context': 'https://schema.org';
  '@type': string;
}

/**
 * Схема организации (Organization)
 * Базовая информация о компании для всех страниц
 */
export function generateOrganizationSchema(): SchemaOrgBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: {
      '@type': 'ImageObject',
      url: `${SITE_CONFIG.url}/icon.png`,
      width: '512',
      height: '512',
    },
    description: SITE_CONFIG.description,
    email: SITE_CONFIG.contact.email,
    sameAs: [
      `https://twitter.com/${SITE_CONFIG.social.twitter}`,
      `https://linkedin.com/company/${SITE_CONFIG.social.linkedin}`,
    ],
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'AE',
      addressLocality: 'Abu Dhabi',
      addressRegion: 'Abu Dhabi',
    },
    contactPoint: {
      '@type': 'ContactPoint',
      email: SITE_CONFIG.contact.email,
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic', 'Hebrew'],
    },
  } as any;
}

/**
 * Схема сервиса (Service)
 * Описание предоставляемых услуг
 */
export function generateServiceSchema(locale: LocaleKey = 'en'): SchemaOrgBase {
  const serviceName = locale === 'ar'
    ? 'خدمة الدفع عبر الحدود'
    : locale === 'he'
    ? 'שירות תשלומים חוצי גבולות'
    : 'Cross-Border Payment Service';

  const serviceDescription = locale === 'ar'
    ? 'بنية تحتية عالمية للدفع مع تسويات فورية وأمان على مستوى البنوك'
    : locale === 'he'
    ? 'תשתית תשלומים גלובלית עם סליקה מיידית ואבטחה ברמת בנקאית'
    : 'Global payment infrastructure with instant settlements and bank-grade security';

  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: serviceName,
    description: serviceDescription,
    provider: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    serviceType: 'Payment Processing',
    areaServed: {
      '@type': 'GeoShape',
      name: 'Worldwide',
    },
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: SITE_CONFIG.url,
      servicePhone: '',
      availableLanguage: ['en', 'ar', 'he'],
    },
    offers: {
      '@type': 'Offer',
      description: 'Instant cross-border payment settlements',
      priceSpecification: {
        '@type': 'PriceSpecification',
        priceCurrency: 'USD',
      },
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '100',
      bestRating: '5',
      worstRating: '1',
    },
  } as any;
}

/**
 * Схема веб-сайта (WebSite)
 * Основная информация о сайте с поисковой функцией
 */
export function generateWebSiteSchema(locale: LocaleKey = 'en'): SchemaOrgBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_CONFIG.name,
    url: `${SITE_CONFIG.url}/${locale}`,
    description: SITE_CONFIG.description,
    inLanguage: locale,
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/icon.png`,
      },
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${SITE_CONFIG.url}/${locale}/search?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  } as any;
}

/**
 * Схема хлебных крошек (BreadcrumbList)
 */
export function generateBreadcrumbSchema({
  items,
  locale = 'en',
}: {
  items: Array<{ name: string; url: string }>;
  locale?: LocaleKey;
}): SchemaOrgBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.name,
      item: `${SITE_CONFIG.url}/${locale}${item.url}`,
    })),
  } as any;
}

/**
 * Схема FAQ
 */
export function generateFAQSchema({
  faqs,
}: {
  faqs: Array<{ question: string; answer: string }>;
}): SchemaOrgBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  } as any;
}

/**
 * Схема статьи (Article)
 */
export function generateArticleSchema({
  title,
  description,
  image,
  datePublished,
  dateModified,
  author,
  locale = 'en',
}: {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author?: string;
  locale?: LocaleKey;
}): SchemaOrgBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description: description,
    image: `${SITE_CONFIG.url}${image}`,
    datePublished: datePublished,
    dateModified: dateModified || datePublished,
    author: {
      '@type': 'Organization',
      name: author || SITE_CONFIG.name,
      url: SITE_CONFIG.url,
    },
    publisher: {
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      logo: {
        '@type': 'ImageObject',
        url: `${SITE_CONFIG.url}/icon.png`,
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': SITE_CONFIG.url,
    },
    inLanguage: locale,
  } as any;
}

/**
 * Схема отзывов (Review)
 */
export function generateReviewSchema({
  reviews,
}: {
  reviews: Array<{
    author: string;
    rating: number;
    reviewBody: string;
    datePublished: string;
  }>;
}): SchemaOrgBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: `${SITE_CONFIG.name} Payment Service`,
    description: SITE_CONFIG.description,
    brand: {
      '@type': 'Brand',
      name: SITE_CONFIG.name,
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: reviews.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: reviews.map((review) => ({
      '@type': 'Review',
      author: {
        '@type': 'Person',
        name: review.author,
      },
      reviewRating: {
        '@type': 'Rating',
        ratingValue: review.rating,
        bestRating: '5',
        worstRating: '1',
      },
      reviewBody: review.reviewBody,
      datePublished: review.datePublished,
    })),
  } as any;
}

/**
 * Схема местного бизнеса (LocalBusiness)
 */
export function generateLocalBusinessSchema(): SchemaOrgBase {
  return {
    '@context': 'https://schema.org',
    '@type': 'FinancialService',
    name: SITE_CONFIG.name,
    image: `${SITE_CONFIG.url}/icon.png`,
    '@id': SITE_CONFIG.url,
    url: SITE_CONFIG.url,
    telephone: '',
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      streetAddress: '',
      addressLocality: 'Abu Dhabi',
      addressRegion: 'Abu Dhabi',
      postalCode: '',
      addressCountry: 'AE',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 24.4539,
      longitude: 54.3773,
    },
    openingHoursSpecification: {
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      opens: '00:00',
      closes: '23:59',
    },
    sameAs: [
      `https://twitter.com/${SITE_CONFIG.social.twitter}`,
      `https://linkedin.com/company/${SITE_CONFIG.social.linkedin}`,
    ],
  } as any;
}

/**
 * Утилита для вставки JSON-LD в страницу
 * Server Component для использования в layout
 */
export function SchemaScript({ schema }: { schema: SchemaOrgBase | SchemaOrgBase[] }) {
  const schemaData = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemaData.map((data, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(data, null, 0),
          }}
          suppressHydrationWarning
        />
      ))}
    </>
  );
}
