/**
 * Динамическая генерация sitemap.xml
 * Автоматически включает все языковые версии и страницы
 */

import { MetadataRoute } from 'next';
import { SITE_CONFIG, LOCALES } from '@/lib/seo/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const locales = Object.keys(LOCALES);

  // Определяем все страницы сайта
  const pages = [
    '', // главная страница
    '/platform',
    '/investors',
    '/contact',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Генерируем URL для каждой языковой версии каждой страницы
  for (const locale of locales) {
    for (const page of pages) {
      sitemap.push({
        url: `${SITE_CONFIG.url}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === '' ? 'daily' : 'weekly',
        priority: page === '' ? 1.0 : 0.8,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${SITE_CONFIG.url}/${loc}${page}`])
          ),
        },
      });
    }
  }

  // Добавляем дополнительные статические страницы если нужно
  // Например, страницы политик
  const staticPages = [
    '/privacy',
    '/terms',
    '/cookies',
  ];

  for (const locale of locales) {
    for (const page of staticPages) {
      sitemap.push({
        url: `${SITE_CONFIG.url}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: Object.fromEntries(
            locales.map((loc) => [loc, `${SITE_CONFIG.url}/${loc}${page}`])
          ),
        },
      });
    }
  }

  return sitemap;
}
