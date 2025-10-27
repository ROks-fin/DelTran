/**
 * Web Vitals мониторинг для отслеживания производительности
 * Отправка метрик в Google Analytics и собственную систему
 */

'use client';

import { useEffect } from 'react';
import { useReportWebVitals } from 'next/web-vitals';
import { sendToAnalytics } from '@/lib/seo/monitoring';

export function WebVitals() {
  useReportWebVitals((metric) => {
    // Отправляем все Core Web Vitals
    if (
      metric.name === 'FCP' || // First Contentful Paint
      metric.name === 'LCP' || // Largest Contentful Paint
      metric.name === 'CLS' || // Cumulative Layout Shift
      metric.name === 'FID' || // First Input Delay
      metric.name === 'TTFB' || // Time to First Byte
      metric.name === 'INP' // Interaction to Next Paint
    ) {
      sendToAnalytics({
        name: metric.name,
        value: metric.value,
        id: metric.id,
        delta: metric.delta,
      });

      // Логирование в development режиме
      if (process.env.NODE_ENV === 'development') {
        console.log(`[Web Vitals] ${metric.name}:`, {
          value: metric.value,
          rating: metric.rating,
          delta: metric.delta,
        });
      }
    }
  });

  // Отправка дополнительных метрик производительности
  useEffect(() => {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return;
    }

    // Отправка метрик после полной загрузки страницы
    const sendPerformanceMetrics = () => {
      const perfData = window.performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;

      if (perfData) {
        const metrics = {
          dns: perfData.domainLookupEnd - perfData.domainLookupStart,
          tcp: perfData.connectEnd - perfData.connectStart,
          ttfb: perfData.responseStart - perfData.requestStart,
          download: perfData.responseEnd - perfData.responseStart,
          domInteractive: perfData.domInteractive - perfData.fetchStart,
          domComplete: perfData.domComplete - perfData.fetchStart,
          loadComplete: perfData.loadEventEnd - perfData.fetchStart,
        };

        // Отправляем в аналитику
        if ('gtag' in window) {
          Object.entries(metrics).forEach(([name, value]) => {
            (window as any).gtag('event', 'performance_metric', {
              event_category: 'Performance',
              event_label: name,
              value: Math.round(value),
              non_interaction: true,
            });
          });
        }

        if (process.env.NODE_ENV === 'development') {
          console.log('[Performance Metrics]', metrics);
        }
      }
    };

    // Ждем полной загрузки
    if (document.readyState === 'complete') {
      sendPerformanceMetrics();
    } else {
      window.addEventListener('load', sendPerformanceMetrics);
      return () => window.removeEventListener('load', sendPerformanceMetrics);
    }
  }, []);

  return null;
}

/**
 * Хук для отслеживания пользовательских метрик производительности
 */
export function usePerformanceObserver() {
  useEffect(() => {
    if (typeof window === 'undefined' || !('PerformanceObserver' in window)) {
      return;
    }

    try {
      // Отслеживание долгих задач (Long Tasks)
      const longTaskObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (entry.duration > 50) {
            // Задачи дольше 50ms
            if (process.env.NODE_ENV === 'development') {
              console.warn('[Long Task]', {
                duration: entry.duration,
                name: entry.name,
                startTime: entry.startTime,
              });
            }

            // Отправка в аналитику
            if ('gtag' in window) {
              (window as any).gtag('event', 'long_task', {
                event_category: 'Performance',
                value: Math.round(entry.duration),
                non_interaction: true,
              });
            }
          }
        }
      });

      longTaskObserver.observe({ entryTypes: ['longtask'] });

      // Отслеживание layout shifts
      const layoutShiftObserver = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (process.env.NODE_ENV === 'development') {
            console.log('[Layout Shift]', {
              value: (entry as any).value,
              hadRecentInput: (entry as any).hadRecentInput,
            });
          }
        }
      });

      layoutShiftObserver.observe({ entryTypes: ['layout-shift'] });

      return () => {
        longTaskObserver.disconnect();
        layoutShiftObserver.disconnect();
      };
    } catch (error) {
      console.error('PerformanceObserver error:', error);
    }
  }, []);
}
