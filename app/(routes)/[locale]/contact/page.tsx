/**
 * Contact Page - Server Component
 *
 * Performance Strategy:
 * 1. Hero section server-rendered for fast LCP
 * 2. Contact form loaded dynamically
 * 3. No framer-motion in critical path
 * 4. Consistent design system with section-premium, container-premium
 * 5. ISR with 1-hour revalidation for caching
 */

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { generatePageMetadata, LocaleKey } from '@/lib/seo/config';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'contact' });
  return generatePageMetadata({
    title: t('meta.title').replace(' - DelTran', '').replace(' | Get in Touch', ''),
    description: t('meta.description'),
    path: '/contact',
    locale: locale as LocaleKey,
  });
}
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamic import for client-side form
const ContactForm = dynamic(
  () => import('./ContactForm').then(mod => mod.ContactForm),
  {
    loading: () => <ContactSkeleton />,
  }
);

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations('contact');

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Server rendered for instant LCP */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        {/* Background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 60%)'
          }}
        />

        <div className="relative container-premium py-24 sm:py-32 text-center">
          <div className="space-y-6 animate-fade-in max-w-4xl mx-auto">
            <h1 className={cn(
              "font-display font-bold tracking-tight",
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl",
              "bg-gradient-to-r from-white via-white/95 to-white/85",
              "bg-clip-text text-transparent"
            )}>
              {t('hero.title')}
            </h1>

            <p className={cn(
              "text-white/80 leading-relaxed text-balance",
              "text-lg sm:text-xl lg:text-2xl",
              "max-w-3xl mx-auto"
            )}>
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic contact form */}
      <Suspense fallback={<ContactSkeleton />}>
        <ContactForm />
      </Suspense>
    </div>
  );
}

// Loading skeleton with consistent design system
function ContactSkeleton() {
  return (
    <section className="section-premium relative">
      <div className="container-premium">
        <div className="grid lg:grid-cols-3 gap-8 sm:gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <div className={cn(
              "p-6 sm:p-8 lg:p-12 rounded-2xl",
              "bg-white/[0.03] backdrop-blur-xl",
              "border border-white/[0.08]"
            )}>
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
                  <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
                </div>
                <div className="grid md:grid-cols-2 gap-4 sm:gap-6">
                  <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
                  <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
                </div>
                <div className="h-32 bg-white/5 rounded-lg animate-pulse" />
                <div className="h-14 bg-gold/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className={cn(
              "h-32 rounded-2xl animate-pulse",
              "bg-white/[0.03] border border-white/[0.08]"
            )} />
            <div className={cn(
              "h-24 rounded-2xl animate-pulse",
              "bg-gradient-to-br from-gold/10 to-transparent",
              "border border-gold/20"
            )} />
          </div>
        </div>
      </div>
    </section>
  );
}
