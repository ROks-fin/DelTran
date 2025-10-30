import React from 'react';
import Script from 'next/script';
import type {
  OrganizationSchema,
  SoftwareApplicationSchema,
  FAQSchema,
  BreadcrumbSchema,
} from '@/app/lib/seo/metadata';

interface StructuredDataProps {
  data: OrganizationSchema | SoftwareApplicationSchema | FAQSchema | BreadcrumbSchema | Record<string, any>;
}

/**
 * StructuredData Component
 * Renders JSON-LD structured data for SEO
 * Supports Organization, SoftwareApplication, FAQ, Breadcrumb, and custom schemas
 */
export function StructuredData({ data }: StructuredDataProps) {
  return (
    <Script
      id={`structured-data-${data['@type']}`}
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data),
      }}
      strategy="beforeInteractive"
    />
  );
}

/**
 * Multiple Structured Data Component
 * For pages that need multiple schema types
 */
interface MultipleStructuredDataProps {
  schemas: Array<OrganizationSchema | SoftwareApplicationSchema | FAQSchema | BreadcrumbSchema | Record<string, any>>;
}

export function MultipleStructuredData({ schemas }: MultipleStructuredDataProps) {
  return (
    <>
      {schemas.map((schema, index) => (
        <StructuredData key={`schema-${index}-${schema['@type']}`} data={schema} />
      ))}
    </>
  );
}

/**
 * Rich Snippet generators for specific use cases
 */

// Article Schema for blog posts
export interface ArticleSchemaProps {
  title: string;
  description: string;
  image: string;
  datePublished: string;
  dateModified?: string;
  author: string;
  url: string;
}

export function generateArticleSchema(props: ArticleSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: props.title,
    description: props.description,
    image: props.image,
    datePublished: props.datePublished,
    dateModified: props.dateModified || props.datePublished,
    author: {
      '@type': 'Person',
      name: props.author,
    },
    publisher: {
      '@type': 'Organization',
      name: 'Deltran.ai',
      logo: {
        '@type': 'ImageObject',
        url: 'https://deltran.ai/images/logo.png',
      },
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': props.url,
    },
  };
}

// Product Schema for platform/pricing pages
export interface ProductSchemaProps {
  name: string;
  description: string;
  image: string;
  brand: string;
  offers: {
    price: string;
    priceCurrency: string;
    availability?: string;
  };
  aggregateRating?: {
    ratingValue: string;
    reviewCount: string;
  };
}

export function generateProductSchema(props: ProductSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: props.name,
    description: props.description,
    image: props.image,
    brand: {
      '@type': 'Brand',
      name: props.brand,
    },
    offers: {
      '@type': 'Offer',
      price: props.offers.price,
      priceCurrency: props.offers.priceCurrency,
      availability: props.offers.availability || 'https://schema.org/InStock',
    },
    aggregateRating: props.aggregateRating
      ? {
          '@type': 'AggregateRating',
          ratingValue: props.aggregateRating.ratingValue,
          reviewCount: props.aggregateRating.reviewCount,
        }
      : undefined,
  };
}

// Video Schema for video content
export interface VideoSchemaProps {
  name: string;
  description: string;
  thumbnailUrl: string;
  uploadDate: string;
  duration?: string;
  contentUrl: string;
}

export function generateVideoSchema(props: VideoSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'VideoObject',
    name: props.name,
    description: props.description,
    thumbnailUrl: props.thumbnailUrl,
    uploadDate: props.uploadDate,
    duration: props.duration,
    contentUrl: props.contentUrl,
  };
}

// HowTo Schema for tutorials/guides
export interface HowToStep {
  name: string;
  text: string;
  image?: string;
  url?: string;
}

export interface HowToSchemaProps {
  name: string;
  description: string;
  image?: string;
  totalTime?: string;
  estimatedCost?: {
    currency: string;
    value: string;
  };
  steps: HowToStep[];
}

export function generateHowToSchema(props: HowToSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: props.name,
    description: props.description,
    image: props.image,
    totalTime: props.totalTime,
    estimatedCost: props.estimatedCost
      ? {
          '@type': 'MonetaryAmount',
          currency: props.estimatedCost.currency,
          value: props.estimatedCost.value,
        }
      : undefined,
    step: props.steps.map((step, index) => ({
      '@type': 'HowToStep',
      position: index + 1,
      name: step.name,
      text: step.text,
      image: step.image,
      url: step.url,
    })),
  };
}

// Service Schema for enterprise services
export interface ServiceSchemaProps {
  name: string;
  description: string;
  provider: string;
  areaServed: string;
  serviceType: string;
}

export function generateServiceSchema(props: ServiceSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: props.name,
    description: props.description,
    provider: {
      '@type': 'Organization',
      name: props.provider,
    },
    areaServed: props.areaServed,
    serviceType: props.serviceType,
  };
}

// WebSite Schema with SearchAction
export interface WebSiteSchemaProps {
  name: string;
  url: string;
  searchUrl: string;
}

export function generateWebSiteSchema(props: WebSiteSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: props.name,
    url: props.url,
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: `${props.searchUrl}?q={search_term_string}`,
      },
      'query-input': 'required name=search_term_string',
    },
  };
}

// LocalBusiness Schema for offices/locations
export interface LocalBusinessSchemaProps {
  name: string;
  address: {
    streetAddress: string;
    addressLocality: string;
    addressRegion: string;
    postalCode: string;
    addressCountry: string;
  };
  telephone?: string;
  email?: string;
  geo?: {
    latitude: string;
    longitude: string;
  };
  openingHours?: string[];
}

export function generateLocalBusinessSchema(props: LocalBusinessSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    name: props.name,
    address: {
      '@type': 'PostalAddress',
      streetAddress: props.address.streetAddress,
      addressLocality: props.address.addressLocality,
      addressRegion: props.address.addressRegion,
      postalCode: props.address.postalCode,
      addressCountry: props.address.addressCountry,
    },
    telephone: props.telephone,
    email: props.email,
    geo: props.geo
      ? {
          '@type': 'GeoCoordinates',
          latitude: props.geo.latitude,
          longitude: props.geo.longitude,
        }
      : undefined,
    openingHoursSpecification: props.openingHours?.map((hours) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: hours.split(':')[0],
      opens: hours.split(':')[1]?.split('-')[0],
      closes: hours.split(':')[1]?.split('-')[1],
    })),
  };
}

// Review Schema
export interface ReviewSchemaProps {
  itemReviewed: string;
  author: string;
  reviewRating: {
    ratingValue: string;
    bestRating: string;
  };
  reviewBody: string;
  datePublished: string;
}

export function generateReviewSchema(props: ReviewSchemaProps) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Product',
      name: props.itemReviewed,
    },
    author: {
      '@type': 'Person',
      name: props.author,
    },
    reviewRating: {
      '@type': 'Rating',
      ratingValue: props.reviewRating.ratingValue,
      bestRating: props.reviewRating.bestRating,
    },
    reviewBody: props.reviewBody,
    datePublished: props.datePublished,
  };
}

export default StructuredData;