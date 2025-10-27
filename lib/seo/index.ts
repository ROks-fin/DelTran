/**
 * Централизованный экспорт всех SEO утилит
 * Упрощает импорты в других частях приложения
 */

// Конфигурация
export {
  SITE_CONFIG,
  LOCALES,
  generatePageMetadata,
  generateAdditionalMetaTags,
  type LocaleKey,
} from './config';

// Схемы
export {
  SchemaScript,
  generateOrganizationSchema,
  generateServiceSchema,
  generateWebSiteSchema,
  generateBreadcrumbSchema,
  generateFAQSchema,
  generateArticleSchema,
  generateReviewSchema,
  generateLocalBusinessSchema,
  type SchemaOrgBase,
} from './schemas';

// Мониторинг
export {
  sendToAnalytics,
  initializeGA,
  trackConversion,
  trackPageView,
  trackOutboundLink,
  initializeYandexMetrika,
  initializeMicrosoftClarity,
  generatePerformanceReport,
  checkSiteHealth,
  getSEODebugInfo,
  type SEOMetrics,
} from './monitoring';

// Утилиты
export {
  generateSlug,
  truncateText,
  generateMetaDescription,
  validateMetadata,
  getOgImageUrl,
  extractKeywords,
  calculateReadingTime,
  checkKeywordDensity,
  generateTitleVariations,
  isUniqueUrl,
  generateBreadcrumbsFromPath,
  getCanonicalUrl,
  analyzeSEOQuality,
  formatSchemaDate,
  generateSocialTags,
} from './utils';
