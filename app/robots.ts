/**
 * Динамическая генерация robots.txt
 * Управление индексацией поисковыми ботами
 */

import { MetadataRoute } from 'next';
import { SITE_CONFIG } from '@/lib/seo/config';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/admin/',
          '/*.json$',
          '/private/',
        ],
      },
      // Специальные правила для Google
      {
        userAgent: 'Googlebot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
        crawlDelay: 0,
      },
      // Специальные правила для Bing
      {
        userAgent: 'Bingbot',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
        crawlDelay: 0,
      },
      // Специальные правила для Яндекс
      {
        userAgent: 'Yandex',
        allow: '/',
        disallow: ['/api/', '/admin/', '/private/'],
        crawlDelay: 0,
      },
      // Блокировка агрессивных краулеров
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'DotBot',
          'MJ12bot',
        ],
        disallow: '/',
      },
    ],
    sitemap: [
      `${SITE_CONFIG.url}/sitemap.xml`,
      // Можно добавить специализированные sitemap
      // `${SITE_CONFIG.url}/sitemap-images.xml`,
      // `${SITE_CONFIG.url}/sitemap-news.xml`,
    ],
    host: SITE_CONFIG.url,
  };
}
