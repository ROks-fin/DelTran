import { Metadata } from 'next';

// SEO Configuration
export const seoConfig = {
  siteName: 'Deltran.ai',
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://deltran.ai',
  defaultTitle: 'Deltran.ai - Enterprise AI Translation Platform | Secure Business Translation',
  titleTemplate: '%s | Deltran.ai',
  defaultDescription: 'Transform global communication with Deltran.ai - the most secure, AI-powered enterprise translation platform. Real-time translation for 100+ languages with bank-grade security.',
  defaultKeywords: [
    'AI translation platform',
    'enterprise translation software',
    'secure document translation',
    'business translation API',
    'multilingual platform',
    'real-time translation',
    'corporate translation solution',
    'AI language processing',
    'translation management system',
    'global communication platform'
  ],
  defaultImage: '/images/og-default.jpg',
  twitterHandle: '@deltran_ai',
  linkedinHandle: 'deltran-ai',
  facebookAppId: '', // Add if available
  defaultLocale: 'en',
  availableLocales: ['en', 'he', 'ar'],
  themeColor: '#0066CC',
  backgroundColor: '#FFFFFF',
  googleSiteVerification: '', // Add your Google verification code
  bingSiteVerification: '', // Add your Bing verification code
  yandexVerification: '', // Add your Yandex verification code
};

// Page-specific SEO configurations
export const pageSEO = {
  home: {
    title: 'AI-Powered Enterprise Translation Platform',
    description: 'Deltran.ai delivers secure, real-time translation for global enterprises. Support 100+ languages with bank-grade security and 99.9% accuracy.',
    keywords: ['AI translation', 'enterprise translation', 'secure translation platform'],
    image: '/images/og-home.jpg',
  },
  platform: {
    title: 'Translation Platform Features - Advanced AI Technology',
    description: 'Explore Deltran.ai\'s powerful features: real-time translation, document processing, API integration, and enterprise-grade security for global businesses.',
    keywords: ['translation features', 'AI translation technology', 'document translation'],
    image: '/images/og-platform.jpg',
  },
  pricing: {
    title: 'Enterprise Translation Pricing - Flexible Plans',
    description: 'Transparent pricing for Deltran.ai\'s enterprise translation platform. Custom solutions for businesses of all sizes with unlimited scalability.',
    keywords: ['translation pricing', 'enterprise plans', 'translation costs'],
    image: '/images/og-pricing.jpg',
  },
  banks: {
    title: 'Banking Translation Solutions - Secure Financial Communication',
    description: 'Specialized translation platform for banks and financial institutions. Comply with regulations while enabling global communication.',
    keywords: ['banking translation', 'financial translation', 'secure banking platform'],
    image: '/images/og-banks.jpg',
  },
  investors: {
    title: 'Investment Opportunity - AI Translation Market Leader',
    description: 'Join Deltran.ai in revolutionizing global business communication. Leading AI translation technology with proven ROI and market growth.',
    keywords: ['investment opportunity', 'AI startup', 'translation technology investment'],
    image: '/images/og-investors.jpg',
  },
  contact: {
    title: 'Contact Us - Get Enterprise Translation Solution',
    description: 'Connect with Deltran.ai experts. Get personalized demo and discover how AI translation can transform your global business communication.',
    keywords: ['contact translation platform', 'enterprise demo', 'translation consultation'],
    image: '/images/og-contact.jpg',
  },
};

// Generate metadata for pages
export function generateMetadata(
  page: keyof typeof pageSEO,
  locale: string = 'en',
  customMeta?: Partial<Metadata>
): Metadata {
  const pageConfig = pageSEO[page];
  const url = `${seoConfig.siteUrl}/${locale}${page === 'home' ? '' : `/${page}`}`;

  const metadata: Metadata = {
    title: pageConfig.title,
    description: pageConfig.description,
    keywords: [...seoConfig.defaultKeywords, ...(pageConfig.keywords || [])],
    authors: [{ name: 'Deltran.ai Team' }],
    creator: 'Deltran.ai',
    publisher: 'Deltran.ai',
    formatDetection: {
      telephone: false,
      date: false,
      email: false,
      address: false,
    },
    metadataBase: new URL(seoConfig.siteUrl),
    alternates: {
      canonical: url,
      languages: {
        'en': `${seoConfig.siteUrl}/en${page === 'home' ? '' : `/${page}`}`,
        'he': `${seoConfig.siteUrl}/he${page === 'home' ? '' : `/${page}`}`,
        'ar': `${seoConfig.siteUrl}/ar${page === 'home' ? '' : `/${page}`}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'he' ? 'he_IL' : locale === 'ar' ? 'ar_AE' : 'en_US',
      url,
      siteName: seoConfig.siteName,
      title: pageConfig.title,
      description: pageConfig.description,
      images: [
        {
          url: pageConfig.image || seoConfig.defaultImage,
          width: 1200,
          height: 630,
          alt: pageConfig.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
      title: pageConfig.title,
      description: pageConfig.description,
      images: [pageConfig.image || seoConfig.defaultImage],
    },
    robots: {
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
    verification: {
      google: seoConfig.googleSiteVerification,
      other: {
        'msvalidate.01': seoConfig.bingSiteVerification,
        'yandex-verification': seoConfig.yandexVerification,
      },
    },
    ...customMeta,
  };

  return metadata;
}

// JSON-LD Structured Data Types
export interface OrganizationSchema {
  '@context': 'https://schema.org';
  '@type': 'Organization';
  name: string;
  url: string;
  logo: string;
  sameAs: string[];
  contactPoint: {
    '@type': 'ContactPoint';
    telephone: string;
    contactType: string;
    areaServed: string;
    availableLanguage: string[];
  };
}

export interface SoftwareApplicationSchema {
  '@context': 'https://schema.org';
  '@type': 'SoftwareApplication';
  name: string;
  applicationCategory: string;
  operatingSystem: string;
  offers: {
    '@type': 'Offer';
    price: string;
    priceCurrency: string;
  };
  aggregateRating?: {
    '@type': 'AggregateRating';
    ratingValue: string;
    reviewCount: string;
  };
}

export interface FAQSchema {
  '@context': 'https://schema.org';
  '@type': 'FAQPage';
  mainEntity: Array<{
    '@type': 'Question';
    name: string;
    acceptedAnswer: {
      '@type': 'Answer';
      text: string;
    };
  }>;
}

export interface BreadcrumbSchema {
  '@context': 'https://schema.org';
  '@type': 'BreadcrumbList';
  itemListElement: Array<{
    '@type': 'ListItem';
    position: number;
    name: string;
    item?: string;
  }>;
}

// Generate JSON-LD structured data
export function generateOrganizationSchema(): OrganizationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Deltran.ai',
    url: seoConfig.siteUrl,
    logo: `${seoConfig.siteUrl}/images/logo.png`,
    sameAs: [
      `https://twitter.com/${seoConfig.twitterHandle.replace('@', '')}`,
      `https://linkedin.com/company/${seoConfig.linkedinHandle}`,
      'https://github.com/deltran-ai',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: '+1-888-DELTRAN',
      contactType: 'Customer Service',
      areaServed: 'Worldwide',
      availableLanguage: ['English', 'Hebrew', 'Arabic'],
    },
  };
}

export function generateSoftwareApplicationSchema(): SoftwareApplicationSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    name: 'Deltran.ai Translation Platform',
    applicationCategory: 'BusinessApplication',
    operatingSystem: 'Web, iOS, Android',
    offers: {
      '@type': 'Offer',
      price: '0',
      priceCurrency: 'USD',
    },
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '1250',
    },
  };
}

export function generateFAQSchema(faqs: Array<{ question: string; answer: string }>): FAQSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map(faq => ({
      '@type': 'Question' as const,
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer' as const,
        text: faq.answer,
      },
    })),
  };
}

export function generateBreadcrumbSchema(items: Array<{ name: string; url?: string }>): BreadcrumbSchema {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem' as const,
      position: index + 1,
      name: item.name,
      item: item.url ? `${seoConfig.siteUrl}${item.url}` : undefined,
    })),
  };
}

export function generateWebSiteSchema(options?: { name?: string; url?: string; searchUrl?: string }) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: options?.name || seoConfig.siteName,
    url: options?.url || seoConfig.siteUrl,
    ...(options?.searchUrl && {
      potentialAction: {
        '@type': 'SearchAction',
        target: `${options.searchUrl}?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    }),
  };
}

// Helper function to generate hreflang links
export function generateHreflangLinks(path: string) {
  return seoConfig.availableLocales.map(locale => ({
    rel: 'alternate',
    hreflang: locale,
    href: `${seoConfig.siteUrl}/${locale}${path}`,
  })).concat({
    rel: 'alternate',
    hreflang: 'x-default',
    href: `${seoConfig.siteUrl}${path}`,
  });
}

// Generate canonical URL
export function generateCanonicalUrl(path: string, locale?: string): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return locale
    ? `${seoConfig.siteUrl}/${locale}${cleanPath}`
    : `${seoConfig.siteUrl}${cleanPath}`;
}

// SEO-friendly slug generator
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '')
    .replace(/[\s_-]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

// Generate meta tags for social media
export function generateSocialMetaTags(
  title: string,
  description: string,
  image?: string,
  url?: string
) {
  return {
    openGraph: {
      title,
      description,
      url: url || seoConfig.siteUrl,
      images: image ? [image] : [seoConfig.defaultImage],
      site_name: seoConfig.siteName,
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: image ? [image] : [seoConfig.defaultImage],
      site: seoConfig.twitterHandle,
      creator: seoConfig.twitterHandle,
    },
  };
}

// AI Search Engine Optimization helpers
export function generateAISearchTags() {
  return {
    // For ChatGPT and other AI crawlers
    'ai-content-type': 'business-software',
    'ai-content-category': 'translation-platform',
    'ai-content-language': 'multilingual',
    'ai-content-update-frequency': 'daily',
    'ai-content-reliability': 'verified',
    'ai-api-available': 'true',
    'ai-integration-ready': 'true',
  };
}

// Performance hints for SEO
export function generateResourceHints(resources: string[]) {
  return resources.map(resource => ({
    rel: 'preconnect',
    href: resource,
    crossOrigin: 'anonymous',
  }));
}

// Default resource hints
export const defaultResourceHints = [
  'https://fonts.googleapis.com',
  'https://fonts.gstatic.com',
  'https://www.googletagmanager.com',
  'https://www.google-analytics.com',
];

const SEOMetadataModule = {
  seoConfig,
  pageSEO,
  generateMetadata,
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
  generateFAQSchema,
  generateBreadcrumbSchema,
  generateHreflangLinks,
  generateCanonicalUrl,
  generateSlug,
  generateSocialMetaTags,
  generateAISearchTags,
  generateResourceHints,
  defaultResourceHints,
};

export default SEOMetadataModule;