/**
 * Ultra-Optimized Homepage for Deltran.ai
 *
 * Performance Strategy:
 * 1. Server Component for initial render (fast LCP)
 * 2. Client components only for interactive elements
 * 3. CSS animations replace JS animations where possible
 * 4. Lazy loading for below-the-fold content
 * 5. Reduced motion support
 * 6. ISR with 1-hour revalidation for caching
 */

// ISR: Revalidate every hour (3600 seconds)
export const revalidate = 3600;

import { getTranslations } from 'next-intl/server';
import { setRequestLocale } from 'next-intl/server';
import { ArrowRight, ArrowLeft, Sparkles, Play } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { TrustBar } from '@/app/components/TrustBar';
import { KeyOutcomes } from './components/KeyOutcomes';
import Link from 'next/link';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';
import { cn } from '@/lib/utils';

// PERFORMANCE: Client component for animations - lazy loaded
// Note: ssr:false not allowed in Server Components in Next.js 15
const AnimatedSections = dynamic(
  () => import('./components/AnimatedSections').then(mod => mod.AnimatedSections),
  {
    loading: () => null,
  }
);


export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('home');
  const isRTL = locale === 'ar' || locale === 'he';
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Server rendered for instant LCP */}
      <section className="relative min-h-[100svh] flex items-center justify-center">
        {/* Static background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#050505] to-black" />

        {/* Radial gradient overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 60%)'
          }}
        />

        {/* Static background orbs - animations removed for performance */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gold/[0.04] rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gold/[0.04] rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-gold/[0.02] rounded-full blur-3xl" />
        </div>

        {/* Subtle grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.1) 1px, transparent 1px)`,
            backgroundSize: '64px 64px'
          }}
          aria-hidden="true"
        />

        {/* Hero Content */}
        <div className="relative container-premium py-24 sm:py-32 lg:py-40 text-center">
          <div className="space-y-6 sm:space-y-8 max-w-5xl mx-auto">
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2 px-4 sm:px-5 py-2 sm:py-2.5 rounded-full bg-gold/[0.08] border border-gold/20 backdrop-blur-sm">
              <Sparkles className="w-4 h-4 text-gold" />
              <span className={cn(
                "text-gold font-medium",
                "fluid-text-xs",
                "uppercase tracking-[0.15em]"
              )}>
                {t('hero.badge')}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="font-display font-bold fluid-text-6xl">
              <span className={cn(
                "block",
                "bg-gradient-to-r from-white via-white/95 to-white/85",
                "bg-clip-text text-transparent"
              )}>
                {t('hero.title')}
              </span>
              <span className={cn(
                "block mt-2 sm:mt-3",
                "bg-gradient-to-r from-gold via-gold-light to-gold",
                "bg-clip-text text-transparent"
              )}>
                {t('hero.titleAccent')}
              </span>
            </h1>

            {/* Tagline - Three Key Effects Mantra */}
            <p className={cn(
              "fluid-text-xs",
              "uppercase tracking-[0.2em] sm:tracking-[0.25em]",
              "text-gold/60",
              "font-medium"
            )}>
              {t('hero.tagline')}
            </p>

            {/* Subtitle */}
            <p className={cn(
              "font-sans font-medium fluid-text-xl text-balance",
              "text-white/85",
              "max-w-4xl mx-auto"
            )}>
              {t('hero.subtitle')}
            </p>

            {/* Description */}
            <p className={cn(
              "text-white/75 fluid-text-lg leading-relaxed text-balance",
              "max-w-3xl mx-auto"
            )}>
              {t('hero.description')}
            </p>

            {/* Dual CTA Buttons */}
            <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-5 pt-4 sm:pt-6">
              {/* Primary CTA */}
              <Link
                href={`/${locale}/contact`}
                className={cn(
                  "inline-flex items-center gap-3",
                  "px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6",
                  "rounded-full",
                  "bg-gradient-to-r from-gold to-gold-light text-black",
                  "font-semibold fluid-text-lg",
                  "shadow-[0_8px_32px_-8px_rgba(212,175,55,0.4)]"
                )}
              >
                <span>{t('hero.cta')}</span>
                <Arrow className="w-5 h-5 sm:w-6 sm:h-6" />
              </Link>

              {/* Secondary CTA */}
              <Link
                href={`/${locale}/platform`}
                className={cn(
                  "inline-flex items-center gap-3",
                  "px-7 sm:px-8 lg:px-10 py-4 sm:py-5 lg:py-6",
                  "rounded-full",
                  "border border-white/15",
                  "text-white/80",
                  "font-medium fluid-text-base"
                )}
              >
                <Play className="w-4 h-4 sm:w-5 sm:h-5 text-gold" />
                <span>{t('hero.ctaSecondary')}</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2">
          <div className={cn(
            "w-6 h-10 rounded-full",
            "border border-white/15",
            "flex justify-center pt-2"
          )}>
            <div className="w-1 h-2 bg-gold/60 rounded-full" />
          </div>
        </div>
      </section>

      {/* Key Outcomes - Three core value propositions */}
      <KeyOutcomes />

      {/* Trust Bar */}
      <TrustBar
        translations={{
          designed: t('trustBar.designed'),
          iso: t('trustBar.iso'),
          aml: t('trustBar.aml'),
          enterprise: t('trustBar.enterprise'),
        }}
      />

      {/* Lazy-loaded animated sections */}
      <Suspense fallback={<SectionsSkeleton t={t} />}>
        <AnimatedSections translations={{
          problem: {
            title: t('problem.title'),
            subtitle: t('problem.subtitle'),
            description: t('problem.description'),
          },
          solution: {
            title: t('solution.title'),
            subtitle: t('solution.subtitle'),
            description: t('solution.description'),
          },
          valueProps: {
            title: t('valueProps.title'),
            instant: {
              title: t('valueProps.instant.title'),
              description: t('valueProps.instant.description'),
              impact: t('valueProps.instant.impact'),
            },
            capital: {
              title: t('valueProps.capital.title'),
              description: t('valueProps.capital.description'),
              impact: t('valueProps.capital.impact'),
            },
            compliance: {
              title: t('valueProps.compliance.title'),
              description: t('valueProps.compliance.description'),
              impact: t('valueProps.compliance.impact'),
            },
          },
          howItWorks: {
            title: t('howItWorks.title'),
            subtitle: t('howItWorks.subtitle'),
            step1: { title: t('howItWorks.step1.title'), description: t('howItWorks.step1.description') },
            step2: { title: t('howItWorks.step2.title'), description: t('howItWorks.step2.description') },
            step3: { title: t('howItWorks.step3.title'), description: t('howItWorks.step3.description') },
            step4: { title: t('howItWorks.step4.title'), description: t('howItWorks.step4.description') },
          },
          metrics: {
            title: t('metrics.title'),
            subtitle: t('metrics.subtitle'),
            tps: { label: t('metrics.tps.label'), value: t('metrics.tps.value'), unit: t('metrics.tps.unit'), detail: t('metrics.tps.detail') },
            latency: { label: t('metrics.latency.label'), value: t('metrics.latency.value'), unit: t('metrics.latency.unit'), detail: t('metrics.latency.detail') },
            netting: { label: t('metrics.netting.label'), value: t('metrics.netting.value'), unit: t('metrics.netting.unit'), detail: t('metrics.netting.detail') },
            finality: { label: t('metrics.finality.label'), value: t('metrics.finality.value'), unit: t('metrics.finality.unit'), detail: t('metrics.finality.detail') },
          },
          why: {
            title: t('why.title'),
            reasons: t.raw('why.reasons') as Array<{title: string, description: string}>,
          },
          contact: {
            title: t('contact.title'),
            subtitle: t('contact.subtitle'),
            directContact: t('contact.directContact'),
            email: t('contact.email'),
          },
          cta: {
            button: t('cta.button'),
          },
        }} />
      </Suspense>
    </div>
  );
}

// Skeleton for loading state - matches new design system
function SectionsSkeleton({ t }: { t: (key: string) => string }) {
  return (
    <>
      {/* Problem Statement */}
      <section className="section-premium relative bg-gradient-to-b from-black to-[#050505]">
        <div className="container-premium">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className={cn(
              "font-display font-bold tracking-tight text-balance",
              "fluid-text-4xl",
              "bg-gradient-to-r from-white via-white/95 to-white/80",
              "bg-clip-text text-transparent",
              "mb-5 sm:mb-6"
            )}>
              {t('problem.title')}
            </h2>
            <p className="text-gold font-light italic fluid-text-xl mb-6 sm:mb-8">
              {t('problem.subtitle')}
            </p>
            <p className="text-white/80 leading-relaxed text-balance fluid-text-lg">
              {t('problem.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="section-premium relative">
        <div className="container-premium">
          <Card variant="gradient" size="xl" className="max-w-5xl mx-auto">
            <h2 className={cn(
              "font-display font-bold tracking-tight text-balance",
              "fluid-text-3xl",
              "bg-gradient-to-r from-white via-white/95 to-white/80",
              "bg-clip-text text-transparent",
              "mb-4 sm:mb-5"
            )}>
              {t('solution.title')}
            </h2>
            <p className="text-gold fluid-text-xl font-medium mb-4 sm:mb-5">
              {t('solution.subtitle')}
            </p>
            <p className="text-white/80 fluid-text-lg leading-relaxed text-balance">
              {t('solution.description')}
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
