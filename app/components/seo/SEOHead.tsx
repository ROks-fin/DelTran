import React from 'react';
import { StructuredData, MultipleStructuredData } from './StructuredData';
import {
  generateOrganizationSchema,
  generateSoftwareApplicationSchema,
  generateBreadcrumbSchema,
  generateWebSiteSchema,
  seoConfig,
} from '@/app/lib/seo/metadata';

interface SEOHeadProps {
  locale?: string;
  pagePath?: string;
  breadcrumbs?: Array<{ name: string; url?: string }>;
  includeOrganization?: boolean;
  includeSoftwareApp?: boolean;
  includeWebsite?: boolean;
  additionalSchemas?: Array<Record<string, any>>;
}

/**
 * SEOHead Component
 * Centralized component for managing all SEO-related head elements
 * Includes structured data, organization info, and breadcrumbs
 */
export default function SEOHead({
  locale = 'en',
  pagePath = '/',
  breadcrumbs,
  includeOrganization = true,
  includeSoftwareApp = false,
  includeWebsite = false,
  additionalSchemas = [],
}: SEOHeadProps) {
  const schemas: Array<Record<string, any>> = [];

  // Add Organization schema
  if (includeOrganization) {
    schemas.push(generateOrganizationSchema());
  }

  // Add SoftwareApplication schema
  if (includeSoftwareApp) {
    schemas.push(generateSoftwareApplicationSchema());
  }

  // Add WebSite schema with search
  if (includeWebsite) {
    schemas.push(
      generateWebSiteSchema({
        name: seoConfig.siteName,
        url: seoConfig.siteUrl,
        searchUrl: `${seoConfig.siteUrl}/search`,
      })
    );
  }

  // Add Breadcrumb schema if provided
  if (breadcrumbs && breadcrumbs.length > 0) {
    schemas.push(generateBreadcrumbSchema(breadcrumbs));
  }

  // Add any additional custom schemas
  schemas.push(...additionalSchemas);

  return <MultipleStructuredData schemas={schemas} />;
}

/**
 * Prebuilt SEOHead components for common page types
 */

// Home page SEO
export function HomePageSEO({ locale }: { locale?: string }) {
  return (
    <SEOHead
      locale={locale}
      pagePath="/"
      includeOrganization={true}
      includeSoftwareApp={true}
      includeWebsite={true}
      breadcrumbs={[{ name: 'Home', url: '/' }]}
    />
  );
}

// Platform page SEO
export function PlatformPageSEO({ locale }: { locale?: string }) {
  return (
    <SEOHead
      locale={locale}
      pagePath="/platform"
      includeOrganization={true}
      includeSoftwareApp={true}
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Platform', url: '/platform' },
      ]}
    />
  );
}

// Pricing page SEO
export function PricingPageSEO({ locale }: { locale?: string }) {
  return (
    <SEOHead
      locale={locale}
      pagePath="/pricing"
      includeOrganization={true}
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Pricing', url: '/pricing' },
      ]}
    />
  );
}

// Banks page SEO
export function BanksPageSEO({ locale }: { locale?: string }) {
  return (
    <SEOHead
      locale={locale}
      pagePath="/banks"
      includeOrganization={true}
      includeSoftwareApp={true}
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Banking Solutions', url: '/banks' },
      ]}
    />
  );
}

// Investors page SEO
export function InvestorsPageSEO({ locale }: { locale?: string }) {
  return (
    <SEOHead
      locale={locale}
      pagePath="/investors"
      includeOrganization={true}
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Investors', url: '/investors' },
      ]}
    />
  );
}

// Contact page SEO
export function ContactPageSEO({ locale }: { locale?: string }) {
  return (
    <SEOHead
      locale={locale}
      pagePath="/contact"
      includeOrganization={true}
      breadcrumbs={[
        { name: 'Home', url: '/' },
        { name: 'Contact', url: '/contact' },
      ]}
    />
  );
}