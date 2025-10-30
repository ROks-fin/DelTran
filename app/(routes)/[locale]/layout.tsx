import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales, type Locale } from '@/i18n/request';
import { Header } from '@/app/components/Header';
import { Footer } from '@/app/components/Footer';
import { ThemeProvider } from '@/app/components/ThemeProvider';
import { ResponsiveProvider } from '@/app/lib/contexts/ResponsiveContext';
import { SpeedInsights } from '@vercel/speed-insights/next';
import { Analytics } from '@vercel/analytics/react';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
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

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  preload: true,
  variable: '--font-inter',
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
  return locales.map((locale) => ({ locale }));
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
  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  // Enable static rendering
  setRequestLocale(locale);

  // Providing all messages to the client
  // side is the easiest way to get started
  const messages = await getMessages();

  return (
    <html lang={locale} dir={locale === 'ar' || locale === 'he' ? 'rtl' : 'ltr'}>
      <head>
        <SchemaScript
          schema={[
            generateOrganizationSchema(),
            generateWebSiteSchema(locale as LocaleKey),
            generateServiceSchema(locale as LocaleKey),
          ]}
        />
      </head>
      <body className={inter.className}>
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