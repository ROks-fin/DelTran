import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { ResponsiveProvider } from '@/app/lib/contexts/ResponsiveContext';
import type { Metadata } from 'next';
import { DM_Serif_Display, Inter, Noto_Sans_Hebrew, Noto_Sans_Arabic } from 'next/font/google';
import '@/app/globals.css';
import { generatePageMetadata, LocaleKey } from '@/lib/seo/config';
import {
  SchemaScript,
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateServiceSchema
} from '@/lib/seo/schemas';
import dynamic from 'next/dynamic';
import { Suspense } from 'react';
import { PreloadResources } from '@/app/components/PreloadResources';

// PERFORMANCE: Lazy load analytics and non-critical components
// These are loaded after hydration to reduce initial bundle size
const WebVitals = dynamic(() => import('@/app/components/seo/WebVitals').then(m => m.WebVitals));
const AllAnalytics = dynamic(() => import('@/app/components/seo/Analytics').then(m => m.AllAnalytics));
const SpeedInsights = dynamic(() => import('@vercel/speed-insights/next').then(m => m.SpeedInsights));
const Analytics = dynamic(() => import('@vercel/analytics/react').then(m => m.Analytics));

// DM Serif Display - for headings (28px+)
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-display',
  weight: ['400'],
});

// Inter - for body text and UI elements
// PERFORMANCE: Reduced weight variants to minimize font load time
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-body',
  weight: ['400', '600'],  // Only essential weights - 500/700 can use font-weight synthesis
});

// RTL fonts - loaded via next/font for better performance (no render-blocking)
const notoHebrew = Noto_Sans_Hebrew({
  subsets: ['hebrew'],
  display: 'swap',
  preload: false, // Only preload for Hebrew locale
  variable: '--font-hebrew',
  weight: ['400'],
});

const notoArabic = Noto_Sans_Arabic({
  subsets: ['arabic'],
  display: 'swap',
  preload: false, // Only preload for Arabic locale
  variable: '--font-arabic',
  weight: ['400'],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return generatePageMetadata({
    locale: locale as LocaleKey,
  });
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  // Validate that the incoming `locale` parameter is valid
  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'}
      suppressHydrationWarning
    >
      <head>
        {/* Favicon - DelTran custom icons */}
        <link rel="icon" href="/icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />

        {/* PWA Meta Tags */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="application-name" content="DelTran" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="DelTran" />
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta name="msapplication-tap-highlight" content="no" />
        <meta name="theme-color" content="#000000" />
        <meta name="format-detection" content="telephone=no" />

        {/* DNS Prefetch and Preconnect for Vercel Analytics (Google Fonts handled by next/font) */}
        <link rel="dns-prefetch" href="https://va.vercel-scripts.com" />
        <link rel="preconnect" href="https://va.vercel-scripts.com" crossOrigin="anonymous" />

        <SchemaScript
          schema={[
            generateOrganizationSchema(),
            generateWebSiteSchema(locale as LocaleKey),
            generateServiceSchema(locale as LocaleKey),
          ]}
        />
      </head>
      <body
        className={`${dmSerif.variable} ${inter.variable} ${locale === 'he' ? notoHebrew.variable : ''} ${locale === 'ar' ? notoArabic.variable : ''} font-sans`}
        suppressHydrationWarning
      >
        {/* PERFORMANCE: Preconnect hints via React 19 APIs */}
        <PreloadResources />
        <ResponsiveProvider>
          <ThemeProvider>
            <NextIntlClientProvider messages={messages}>
              <div className="min-h-screen bg-black text-white">
                <Header />
                <main>{children}</main>
                <Footer />
              </div>
            </NextIntlClientProvider>
          </ThemeProvider>
        </ResponsiveProvider>
        {/* PERFORMANCE: Wrap non-critical analytics in Suspense */}
        <Suspense fallback={null}>
          <WebVitals />
          <AllAnalytics />
          <SpeedInsights />
          <Analytics />
        </Suspense>
      </body>
    </html>
  );
}