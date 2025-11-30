/**
 * Platform Page - Server Component
 * Premium Fintech Design with consistent styling
 */

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

import type { Metadata } from 'next';
import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import { generatePageMetadata, LocaleKey } from '@/lib/seo/config';
import { Sparkles, ArrowRight, ArrowLeft } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'platform' });
  return generatePageMetadata({
    title: t('meta.title').replace(' - DelTran', '').replace(' | Settlement Infrastructure', ''),
    description: t('meta.description'),
    path: '/platform',
    locale: locale as LocaleKey,
  });
}
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { cn } from '@/lib/utils';

// Dynamic import for client-side animations
const PlatformPageClient = dynamic(
  () => import('./PlatformPageClient').then(mod => mod.PlatformPageClient),
  {
    loading: () => <PlatformSkeleton />,
  }
);

export default async function PlatformPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations('platform');
  const isRTL = locale === 'ar' || locale === 'he';

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Server rendered for instant LCP */}
      <section className="relative min-h-[70vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 60%)'
          }}
        />

        {/* Static background elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/[0.04] rounded-full blur-3xl" />
        </div>

        <div className="relative container-premium py-32 text-center">
          <div className="space-y-8 max-w-5xl mx-auto animate-fade-in">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gold/[0.08] border border-gold/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className={cn(
                "text-gold font-medium",
                "text-[11px] sm:text-xs",
                "uppercase tracking-[0.15em]"
              )}>
                {t('hero.badge')}
              </span>
            </div>

            <h1 className={cn(
              "font-display font-bold tracking-tight",
              "text-4xl sm:text-5xl md:text-6xl lg:text-7xl"
            )}>
              <span className={cn(
                "block",
                "bg-gradient-to-r from-white via-white/95 to-white/85",
                "bg-clip-text text-transparent"
              )}>
                {t('hero.title')}
              </span>
            </h1>

            {/* Tagline - Three Key Effects Mantra */}
            <p className={cn(
              "text-[10px] sm:text-xs",
              "uppercase tracking-[0.2em] sm:tracking-[0.25em]",
              "text-gold/60",
              "font-medium"
            )}>
              {t('hero.tagline')}
            </p>

            <p className={cn(
              "text-white/60 leading-relaxed text-balance",
              "text-lg sm:text-xl lg:text-2xl",
              "max-w-4xl mx-auto"
            )}>
              {t('hero.subtitle')}
            </p>

            {/* CTA Button - Premium with extra spacing */}
            <div className="pt-6 sm:pt-8 lg:pt-10">
              <Link href="/contact">
                <button
                  className={cn(
                    "group relative inline-flex items-center gap-3",
                    "px-10 sm:px-12 lg:px-14 py-5 sm:py-6 lg:py-7",
                    "rounded-full",
                    "bg-gradient-to-r from-gold via-gold-light to-gold text-black",
                    "font-semibold text-base sm:text-lg lg:text-xl",
                    "shadow-[0_8px_40px_-8px_rgba(212,175,55,0.5)]",
                    "hover:shadow-[0_16px_60px_-8px_rgba(212,175,55,0.6)]",
                    "hover:scale-[1.03] active:scale-[0.98]",
                    "transition-all duration-500",
                    "overflow-hidden"
                  )}
                >
                  {/* Shine effect */}
                  <span
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
                    aria-hidden="true"
                  />
                  <span className="relative">{t('hero.cta')}</span>
                  {isRTL ? (
                    <ArrowLeft className="relative w-5 h-5 sm:w-6 sm:h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                  ) : (
                    <ArrowRight className="relative w-5 h-5 sm:w-6 sm:h-6 group-hover:translate-x-1 transition-transform duration-300" />
                  )}
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic client sections */}
      <Suspense fallback={<PlatformSkeleton />}>
        <PlatformPageClient />
      </Suspense>
    </div>
  );
}

// Loading skeleton
function PlatformSkeleton() {
  return (
    <section className="section-premium">
      <div className="container-premium">
        <div className="max-w-5xl mx-auto space-y-8">
          <div className="h-8 bg-white/[0.03] rounded-lg w-1/3 mx-auto animate-pulse" />
          <div className="h-4 bg-white/[0.03] rounded w-1/2 mx-auto animate-pulse" />
          <div className="grid md:grid-cols-3 gap-6 mt-16">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-64 bg-white/[0.03] rounded-2xl border border-white/[0.06] animate-pulse" />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
