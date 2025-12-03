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
    '/network',
    '/company',
    '/contact',
  ];

  const sitemap: MetadataRoute.Sitemap = [];

  // Генерируем URL для каждой языковой версии каждой страницы
  for (const locale of locales) {
    for (const page of pages) {
      // Определяем приоритет и частоту обновления для каждой страницы
      let priority = 0.8;
      let changeFrequency: 'daily' | 'weekly' | 'monthly' = 'weekly';

      if (page === '') {
        priority = 1.0;
        changeFrequency = 'daily';
      } else if (page === '/platform' || page === '/network') {
        priority = 0.9;
        changeFrequency = 'weekly';
      } else if (page === '/company') {
        priority = 0.7;
        changeFrequency = 'monthly';
      }

      sitemap.push({
        url: `${SITE_CONFIG.url}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales.map((loc) => [loc, `${SITE_CONFIG.url}/${loc}${page}`])
            ),
            'en-US': `${SITE_CONFIG.url}/en${page}`,
          },
        },
      });
    }
  }

  // Добавляем дополнительные статические страницы если нужно
  // Например, страницы политик
  const staticPages = [
    '/privacy',
    '/terms',
  ];

  for (const locale of locales) {
    for (const page of staticPages) {
      sitemap.push({
        url: `${SITE_CONFIG.url}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: 'monthly',
        priority: 0.5,
        alternates: {
          languages: {
            ...Object.fromEntries(
              locales.map((loc) => [loc, `${SITE_CONFIG.url}/${loc}${page}`])
            ),
            'en-US': `${SITE_CONFIG.url}/en${page}`,
          },
        },
      });
    }
  }

  return sitemap;
}
