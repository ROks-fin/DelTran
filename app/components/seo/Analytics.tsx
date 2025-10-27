/**
 * Google Analytics 4, Яндекс.Метрика и Microsoft Clarity интеграция
 * Централизованная аналитика для всех метрик
 */

'use client';

import { useEffect } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';
import Script from 'next/script';

export function GoogleAnalytics({ measurementId }: { measurementId?: string }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const GA_ID = measurementId || process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;

  useEffect(() => {
    if (!GA_ID) return;

    const url = pathname + searchParams.toString();

    // Отслеживание просмотра страницы при изменении URL
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('config', GA_ID, {
        page_path: url,
      });
    }
  }, [pathname, searchParams, GA_ID]);

  if (!GA_ID) {
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}', {
              page_path: window.location.pathname,
              send_page_view: true,
              anonymize_ip: true,
              cookie_flags: 'SameSite=None;Secure'
            });
          `,
        }}
      />
    </>
  );
}

export function YandexMetrika({ counterId }: { counterId?: string }) {
  const YANDEX_ID = counterId || process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;

  if (!YANDEX_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="yandex-metrika"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(m,e,t,r,i,k,a){m[i]=m[i]||function(){(m[i].a=m[i].a||[]).push(arguments)};
            m[i].l=1*new Date();
            k=e.createElement(t),a=e.getElementsByTagName(t)[0],k.async=1,k.src=r,a.parentNode.insertBefore(k,a)})
            (window, document, "script", "https://mc.yandex.ru/metrika/tag.js", "ym");

            ym(${YANDEX_ID}, "init", {
              clickmap:true,
              trackLinks:true,
              accurateTrackBounce:true,
              webvisor:true,
              ecommerce:"dataLayer"
            });
          `,
        }}
      />
      <noscript>
        <div>
          <img
            src={`https://mc.yandex.ru/watch/${YANDEX_ID}`}
            style={{ position: 'absolute', left: '-9999px' }}
            alt=""
          />
        </div>
      </noscript>
    </>
  );
}

export function MicrosoftClarity({ clarityId }: { clarityId?: string }) {
  const CLARITY_ID = clarityId || process.env.NEXT_PUBLIC_CLARITY_ID;

  if (!CLARITY_ID) {
    return null;
  }

  return (
    <Script
      id="microsoft-clarity"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          (function(c,l,a,r,i,t,y){
            c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
            t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
            y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
          })(window, document, "clarity", "script", "${CLARITY_ID}");
        `,
      }}
    />
  );
}

export function GoogleTagManager({ gtmId }: { gtmId?: string }) {
  const GTM_ID = gtmId || process.env.NEXT_PUBLIC_GTM_ID;

  if (!GTM_ID) {
    return null;
  }

  return (
    <>
      <Script
        id="google-tag-manager"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','${GTM_ID}');
          `,
        }}
      />
      <noscript>
        <iframe
          src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
          height="0"
          width="0"
          style={{ display: 'none', visibility: 'hidden' }}
        />
      </noscript>
    </>
  );
}

/**
 * Компонент для всех аналитических скриптов
 */
export function AllAnalytics({
  googleAnalyticsId,
  yandexMetrikaId,
  clarityId,
  gtmId,
}: {
  googleAnalyticsId?: string;
  yandexMetrikaId?: string;
  clarityId?: string;
  gtmId?: string;
}) {
  return (
    <>
      <GoogleAnalytics measurementId={googleAnalyticsId} />
      <YandexMetrika counterId={yandexMetrikaId} />
      <MicrosoftClarity clarityId={clarityId} />
      <GoogleTagManager gtmId={gtmId} />
    </>
  );
}

/**
 * Хук для отслеживания событий
 */
export function useAnalytics() {
  const trackEvent = (
    eventName: string,
    parameters?: Record<string, any>
  ) => {
    // Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('event', eventName, parameters);
    }

    // Яндекс.Метрика
    if (typeof window !== 'undefined' && 'ym' in window) {
      const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
      if (ymId) {
        (window as any).ym(ymId, 'reachGoal', eventName, parameters);
      }
    }
  };

  const trackPageView = (url: string) => {
    // Google Analytics
    if (typeof window !== 'undefined' && 'gtag' in window) {
      (window as any).gtag('config', process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID, {
        page_path: url,
      });
    }

    // Яндекс.Метрика
    if (typeof window !== 'undefined' && 'ym' in window) {
      const ymId = process.env.NEXT_PUBLIC_YANDEX_METRIKA_ID;
      if (ymId) {
        (window as any).ym(ymId, 'hit', url);
      }
    }
  };

  const trackConversion = (
    eventName: string,
    value?: number,
    currency: string = 'USD'
  ) => {
    trackEvent(eventName, {
      value,
      currency,
      event_category: 'conversion',
    });
  };

  return {
    trackEvent,
    trackPageView,
    trackConversion,
  };
}
