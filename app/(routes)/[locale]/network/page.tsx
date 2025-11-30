/**
 * Network Page - Server Component
 * Premium Fintech Design with consistent styling
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
  const t = await getTranslations({ locale, namespace: 'network' });
  return generatePageMetadata({
    title: t('meta.title').replace(' - DelTran', '').replace(' | Global Settlement Network', ''),
    description: t('meta.description'),
    path: '/network',
    locale: locale as LocaleKey,
  });
}
import { Globe } from 'lucide-react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// Dynamic import for client-side animations
const NetworkPageClient = dynamic(
  () => import('./NetworkPageClient').then(mod => mod.NetworkPageClient),
  {
    loading: () => <NetworkSkeleton />,
  }
);

export default async function NetworkPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);

  const t = await getTranslations('network');

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Clean, focused, minimal */}
      <section className="relative min-h-[50vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 70% 50% at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 60%)'
          }}
        />

        {/* Subtle background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/3 left-1/4 w-72 h-72 bg-gold/[0.03] rounded-full blur-3xl" />
          <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-gold/[0.03] rounded-full blur-3xl" />
        </div>

        <div className="relative container-premium py-20 sm:py-28 text-center">
          <div className="space-y-5 sm:space-y-6 animate-fade-in max-w-4xl mx-auto">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gold/[0.08] border border-gold/20 backdrop-blur-sm">
              <Globe className="w-4 h-4 text-gold" />
              <span className={cn(
                "text-gold font-medium",
                "text-[11px] sm:text-xs",
                "uppercase tracking-[0.15em]"
              )}>
                {t('hero.badge')}
              </span>
            </div>

            {/* Title - single h1 */}
            <h1 className={cn(
              "font-display font-bold tracking-tight",
              "text-3xl sm:text-4xl md:text-5xl lg:text-6xl"
            )}>
              <span
                className={cn(
                  "block",
                  "bg-gradient-to-r from-white via-white/95 to-white/85",
                  "bg-clip-text text-transparent"
                )}
              >
                {t('hero.title')}
              </span>
              <span className={cn(
                "block mt-2",
                "bg-gradient-to-r from-gold via-gold-light to-gold",
                "bg-clip-text text-transparent"
              )}>
                {t('hero.titleAccent')}
              </span>
            </h1>

            {/* Subtitle - concise */}
            <p className={cn(
              "text-white/60 leading-relaxed text-balance",
              "text-base sm:text-lg lg:text-xl",
              "max-w-2xl mx-auto"
            )}>
              {t('hero.subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Dynamic client sections */}
      <Suspense fallback={<NetworkSkeleton />}>
        <NetworkPageClient />
      </Suspense>
    </div>
  );
}

// Loading skeleton with new design system
function NetworkSkeleton() {
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
