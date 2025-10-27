/**
 * SEO утилиты и хелперы
 * Вспомогательные функции для SEO оптимизации
 */

import { SITE_CONFIG } from './config';

/**
 * Генерация читаемого URL slug из текста
 */
export function generateSlug(text: string): string {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Удаляем специальные символы
    .replace(/[\s_-]+/g, '-') // Заменяем пробелы на дефисы
    .replace(/^-+|-+$/g, ''); // Удаляем дефисы в начале и конце
}

/**
 * Обрезка текста до указанной длины с сохранением слов
 */
export function truncateText(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;

  const truncated = text.slice(0, maxLength);
  const lastSpace = truncated.lastIndexOf(' ');

  return lastSpace > 0
    ? truncated.slice(0, lastSpace) + '...'
    : truncated + '...';
}

/**
 * Генерация meta description из контента
 */
export function generateMetaDescription(content: string, maxLength: number = 160): string {
  // Удаляем HTML теги если есть
  const stripped = content.replace(/<[^>]*>/g, '');

  // Удаляем лишние пробелы
  const cleaned = stripped.replace(/\s+/g, ' ').trim();

  return truncateText(cleaned, maxLength);
}

/**
 * Валидация длины title и description
 */
export function validateMetadata(title: string, description: string): {
  valid: boolean;
  warnings: string[];
} {
  const warnings: string[] = [];

  // Проверка title
  if (title.length < 30) {
    warnings.push('Title слишком короткий (рекомендуется 50-60 символов)');
  }
  if (title.length > 60) {
    warnings.push('Title слишком длинный (может быть обрезан в поиске)');
  }

  // Проверка description
  if (description.length < 70) {
    warnings.push('Description слишком короткий (рекомендуется 150-160 символов)');
  }
  if (description.length > 160) {
    warnings.push('Description слишком длинный (будет обрезан в поиске)');
  }

  return {
    valid: warnings.length === 0,
    warnings,
  };
}

/**
 * Генерация Open Graph изображения URL
 */
export function getOgImageUrl(imagePath?: string): string {
  if (!imagePath) {
    return `${SITE_CONFIG.url}${SITE_CONFIG.ogImage}`;
  }

  // Если путь уже полный URL
  if (imagePath.startsWith('http')) {
    return imagePath;
  }

  // Добавляем базовый URL
  return `${SITE_CONFIG.url}${imagePath.startsWith('/') ? '' : '/'}${imagePath}`;
}

/**
 * Извлечение ключевых слов из текста
 */
export function extractKeywords(text: string, maxKeywords: number = 10): string[] {
  // Удаляем HTML и специальные символы
  const cleaned = text
    .replace(/<[^>]*>/g, '')
    .replace(/[^\w\s]/g, ' ')
    .toLowerCase();

  // Список stop-words (можно расширить)
  const stopWords = new Set([
    'the', 'a', 'an', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for',
    'of', 'with', 'by', 'from', 'as', 'is', 'was', 'are', 'were', 'been',
    'be', 'have', 'has', 'had', 'do', 'does', 'did', 'will', 'would', 'could',
    'should', 'may', 'might', 'can', 'this', 'that', 'these', 'those',
  ]);

  // Разбиваем на слова и фильтруем
  const words = cleaned
    .split(/\s+/)
    .filter(word => word.length > 3 && !stopWords.has(word));

  // Подсчитываем частоту
  const frequency = new Map<string, number>();
  words.forEach(word => {
    frequency.set(word, (frequency.get(word) || 0) + 1);
  });

  // Сортируем по частоте и берем топ N
  return Array.from(frequency.entries())
    .sort((a, b) => b[1] - a[1])
    .slice(0, maxKeywords)
    .map(([word]) => word);
}

/**
 * Генерация reading time для статей
 */
export function calculateReadingTime(content: string): number {
  const wordsPerMinute = 200;
  const words = content.trim().split(/\s+/).length;
  return Math.ceil(words / wordsPerMinute);
}

/**
 * Проверка наличия ключевых слов в контенте
 */
export function checkKeywordDensity(
  content: string,
  keyword: string
): {
  count: number;
  density: number;
  optimal: boolean;
} {
  const lowerContent = content.toLowerCase();
  const lowerKeyword = keyword.toLowerCase();

  const wordCount = content.trim().split(/\s+/).length;
  const keywordCount = (lowerContent.match(new RegExp(lowerKeyword, 'g')) || []).length;

  const density = (keywordCount / wordCount) * 100;

  // Оптимальная плотность: 1-3%
  const optimal = density >= 1 && density <= 3;

  return {
    count: keywordCount,
    density: Number(density.toFixed(2)),
    optimal,
  };
}

/**
 * Генерация альтернативных вариантов title
 */
export function generateTitleVariations(baseTitle: string): string[] {
  const variations: string[] = [];

  // С брендом в конце
  variations.push(`${baseTitle} | ${SITE_CONFIG.name}`);

  // С брендом в начале
  variations.push(`${SITE_CONFIG.name} - ${baseTitle}`);

  // С разделителем
  variations.push(`${baseTitle} · ${SITE_CONFIG.name}`);

  // Короткая версия
  if (baseTitle.length > 40) {
    variations.push(`${truncateText(baseTitle, 40)} | ${SITE_CONFIG.name}`);
  }

  return variations;
}

/**
 * Проверка уникальности URL
 */
export function isUniqueUrl(url: string, existingUrls: string[]): boolean {
  return !existingUrls.includes(url.toLowerCase());
}

/**
 * Генерация structured data для Breadcrumb из пути
 */
export function generateBreadcrumbsFromPath(pathname: string): Array<{ name: string; url: string }> {
  const segments = pathname.split('/').filter(Boolean);

  const breadcrumbs: Array<{ name: string; url: string }> = [];
  let currentPath = '';

  for (const segment of segments) {
    // Пропускаем сегмент языка (en, ar, he)
    if (['en', 'ar', 'he'].includes(segment)) {
      continue;
    }

    currentPath += `/${segment}`;

    // Форматируем имя
    const name = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');

    breadcrumbs.push({
      name,
      url: currentPath,
    });
  }

  return breadcrumbs;
}

/**
 * Генерация canonical URL
 */
export function getCanonicalUrl(path: string, locale: string = 'en'): string {
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_CONFIG.url}/${locale}${cleanPath}`;
}

/**
 * Проверка качества SEO контента
 */
export function analyzeSEOQuality(content: {
  title: string;
  description: string;
  content: string;
  keywords: string[];
}): {
  score: number;
  issues: string[];
  suggestions: string[];
} {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Проверка title
  if (content.title.length < 30) {
    issues.push('Title слишком короткий');
    score -= 10;
  }
  if (content.title.length > 60) {
    issues.push('Title слишком длинный');
    score -= 5;
  }

  // Проверка description
  if (content.description.length < 70) {
    issues.push('Description слишком короткий');
    score -= 10;
  }
  if (content.description.length > 160) {
    issues.push('Description слишком длинный');
    score -= 5;
  }

  // Проверка контента
  const wordCount = content.content.trim().split(/\s+/).length;
  if (wordCount < 300) {
    suggestions.push('Рекомендуется минимум 300 слов контента');
    score -= 15;
  }

  // Проверка ключевых слов
  if (content.keywords.length === 0) {
    issues.push('Не указаны ключевые слова');
    score -= 10;
  }

  // Проверка наличия ключевых слов в title
  const titleLower = content.title.toLowerCase();
  const keywordsInTitle = content.keywords.filter(k => titleLower.includes(k.toLowerCase()));
  if (keywordsInTitle.length === 0) {
    suggestions.push('Добавьте ключевые слова в title');
    score -= 10;
  }

  // Проверка наличия ключевых слов в description
  const descriptionLower = content.description.toLowerCase();
  const keywordsInDescription = content.keywords.filter(k => descriptionLower.includes(k.toLowerCase()));
  if (keywordsInDescription.length === 0) {
    suggestions.push('Добавьте ключевые слова в description');
    score -= 10;
  }

  return {
    score: Math.max(0, score),
    issues,
    suggestions,
  };
}

/**
 * Форматирование даты для Schema.org
 */
export function formatSchemaDate(date: Date): string {
  return date.toISOString();
}

/**
 * Генерация социальных мета-тегов
 */
export function generateSocialTags(data: {
  title: string;
  description: string;
  image?: string;
  url: string;
  type?: 'website' | 'article';
  author?: string;
}) {
  return {
    // Open Graph
    'og:title': data.title,
    'og:description': data.description,
    'og:image': getOgImageUrl(data.image),
    'og:url': data.url,
    'og:type': data.type || 'website',
    'og:site_name': SITE_CONFIG.name,

    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:title': data.title,
    'twitter:description': data.description,
    'twitter:image': getOgImageUrl(data.image),
    'twitter:site': SITE_CONFIG.social.twitter,
    'twitter:creator': data.author || SITE_CONFIG.social.twitter,
  };
}
