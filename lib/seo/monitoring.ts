/**
 * SEO мониторинг и аналитика
 * Отслеживание Core Web Vitals и SEO метрик
 */

import { SITE_CONFIG } from './config';

export interface SEOMetrics {
  // Core Web Vitals
  LCP: number; // Largest Contentful Paint (< 2.5s)
  FID: number; // First Input Delay (< 100ms)
  CLS: number; // Cumulative Layout Shift (< 0.1)
  FCP: number; // First Contentful Paint
  TTFB: number; // Time to First Byte
  INP: number; // Interaction to Next Paint

  // SEO показатели
  organicTraffic: number;
  keywordRankings: Map<string, number>;
  backlinks: number;
  domainAuthority: number;
  pageSpeed: number;
  mobileUsability: boolean;

  // Конверсии
  conversionRate: number;
  bounceRate: number;
  avgSessionDuration: number;
}

/**
 * Отправка Core Web Vitals в Google Analytics
 */
export function sendToAnalytics(metric: {
  name: string;
  value: number;
  id: string;
  delta: number;
}) {
  if (typeof window === 'undefined') return;

  // Отправка в Google Analytics 4
  if ('gtag' in window) {
    (window as any).gtag('event', metric.name, {
      value: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
      event_category: 'Web Vitals',
      event_label: metric.id,
      non_interaction: true,
    });
  }

  // Отправка в собственную систему мониторинга
  if (process.env.NODE_ENV === 'production') {
    fetch('/api/analytics/web-vitals', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        metric: metric.name,
        value: metric.value,
        id: metric.id,
        url: window.location.href,
        timestamp: Date.now(),
      }),
      keepalive: true,
    }).catch(() => {
      // Игнорируем ошибки отправки метрик
    });
  }
}

/**
 * Инициализация Google Analytics 4
 */
export function initializeGA(measurementId: string) {
  if (typeof window === 'undefined') return;

  // Загрузка Google Analytics script
  const script = document.createElement('script');
  script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
  script.async = true;
  document.head.appendChild(script);

  // Инициализация gtag
  (window as any).dataLayer = (window as any).dataLayer || [];
  function gtag(...args: any[]) {
    (window as any).dataLayer.push(args);
  }
  (window as any).gtag = gtag;

  gtag('js', new Date());
  gtag('config', measurementId, {
    page_path: window.location.pathname,
    send_page_view: true,
  });
}

/**
 * Отслеживание событий конверсии
 */
export function trackConversion(eventName: string, value?: number, params?: Record<string, any>) {
  if (typeof window === 'undefined') return;

  if ('gtag' in window) {
    (window as any).gtag('event', eventName, {
      value: value,
      currency: 'USD',
      ...params,
    });
  }
}

/**
 * Отслеживание просмотра страницы
 */
export function trackPageView(url: string) {
  if (typeof window === 'undefined') return;

  if ('gtag' in window) {
    (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
      page_path: url,
    });
  }
}

/**
 * Отслеживание кликов по ссылкам
 */
export function trackOutboundLink(url: string, label?: string) {
  if (typeof window === 'undefined') return;

  if ('gtag' in window) {
    (window as any).gtag('event', 'click', {
      event_category: 'outbound',
      event_label: label || url,
      transport_type: 'beacon',
      event_callback: function () {
        // Callback после отправки события
      },
    });
  }
}

/**
 * Инициализация Яндекс.Метрика
 */
export function initializeYandexMetrika(counterId: number) {
  if (typeof window === 'undefined') return;

  (window as any).ym =
    (window as any).ym ||
    function (...args: any[]) {
      ((window as any).ym.a = (window as any).ym.a || []).push(args);
    };
  (window as any).ym.l = Date.now();

  const script = document.createElement('script');
  script.src = 'https://mc.yandex.ru/metrika/tag.js';
  script.async = true;
  document.head.appendChild(script);

  (window as any).ym(counterId, 'init', {
    clickmap: true,
    trackLinks: true,
    accurateTrackBounce: true,
    webvisor: true,
  });
}

/**
 * Инициализация Microsoft Clarity
 */
export function initializeMicrosoftClarity(clarityId: string) {
  if (typeof window === 'undefined') return;

  (window as any).clarity =
    (window as any).clarity ||
    function (...args: any[]) {
      ((window as any).clarity.q = (window as any).clarity.q || []).push(args);
    };

  const script = document.createElement('script');
  script.src = `https://www.clarity.ms/tag/${clarityId}`;
  script.async = true;
  document.head.appendChild(script);
}

/**
 * Генерация отчета о производительности
 */
export async function generatePerformanceReport() {
  if (typeof window === 'undefined' || !('performance' in window)) {
    return null;
  }

  const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

  return {
    dns: perfData.domainLookupEnd - perfData.domainLookupStart,
    tcp: perfData.connectEnd - perfData.connectStart,
    ttfb: perfData.responseStart - perfData.requestStart,
    download: perfData.responseEnd - perfData.responseStart,
    domInteractive: perfData.domInteractive - perfData.fetchStart,
    domComplete: perfData.domComplete - perfData.fetchStart,
    loadComplete: perfData.loadEventEnd - perfData.fetchStart,
  };
}

/**
 * Проверка доступности сайта
 */
export async function checkSiteHealth() {
  const checks = {
    robots: false,
    sitemap: false,
    ssl: false,
    performance: false,
  };

  try {
    // Проверка robots.txt
    const robotsRes = await fetch('/robots.txt');
    checks.robots = robotsRes.ok;

    // Проверка sitemap.xml
    const sitemapRes = await fetch('/sitemap.xml');
    checks.sitemap = sitemapRes.ok;

    // Проверка SSL
    checks.ssl = window.location.protocol === 'https:';

    // Проверка производительности
    if ('performance' in window) {
      const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
      checks.performance = perfData.loadEventEnd - perfData.fetchStart < 3000;
    }
  } catch (error) {
    console.error('Site health check failed:', error);
  }

  return checks;
}

/**
 * SEO Debug информация (только для разработки)
 */
export function getSEODebugInfo() {
  if (typeof window === 'undefined' || process.env.NODE_ENV !== 'development') {
    return null;
  }

  const head = document.head;
  const meta = Array.from(head.querySelectorAll('meta')).map((tag) => ({
    name: tag.getAttribute('name') || tag.getAttribute('property'),
    content: tag.getAttribute('content'),
  }));

  const links = Array.from(head.querySelectorAll('link')).map((tag) => ({
    rel: tag.getAttribute('rel'),
    href: tag.getAttribute('href'),
  }));

  const title = document.title;
  const canonical = head.querySelector('link[rel="canonical"]')?.getAttribute('href');

  return {
    title,
    canonical,
    meta,
    links,
    schemas: Array.from(head.querySelectorAll('script[type="application/ld+json"]')).map(
      (script) => JSON.parse(script.textContent || '{}')
    ),
  };
}
