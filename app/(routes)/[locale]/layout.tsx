import { NextIntlClientProvider } from 'next-intl';
import { getMessages, unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing, type Locale } from '@/i18n/routing';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { ResponsiveProvider } from '@/app/lib/contexts/ResponsiveContext';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
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
import { WebVitals } from '@/app/components/seo/WebVitals';
import { AllAnalytics } from '@/app/components/seo/Analytics';

// DM Serif Display - for headings (28px+)
const dmSerif = DM_Serif_Display({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-display',
  weight: ['400'],
});

// Inter - for body text and UI elements
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-body',
  weight: ['400', '500', '600', '700'],
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
  unstable_setRequestLocale(locale);

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
        <WebVitals />
        <AllAnalytics />
        <SpeedInsights />
        <Analytics />
      </body>
    </html>
  );
}