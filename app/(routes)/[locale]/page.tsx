/**
 * Ultra-Optimized Homepage for Deltran.ai
 *
 * Performance Strategy:
 * 1. Server Component for initial render (fast LCP)
 * 2. Client components only for interactive elements
 * 3. CSS animations replace JS animations where possible
 * 4. Lazy loading for below-the-fold content
 * 5. Reduced motion support
 */

import { getTranslations } from 'next-intl/server';
import { ArrowRight, Sparkles } from 'lucide-react';
import { Card } from '@/app/components/Card';
import Link from 'next/link';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Client component for animations - lazy loaded with dynamic import
// Это разбивает бандл и загружает AnimatedSections только когда нужно
const AnimatedSections = dynamic(
  () => import('./components/AnimatedSections').then(mod => mod.AnimatedSections),
  {
    loading: () => null, // Skeleton рендерится через Suspense fallback
    ssr: false, // Отключаем SSR для анимаций - они не нужны для SEO
  }
);

export default async function HomePage() {
  const t = await getTranslations('home');

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Server rendered for instant LCP */}
      <section className="relative min-h-[100svh] flex items-center justify-center">
        {/* Static background */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-[#0a0a0a] to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#d4af37]/10 via-transparent to-transparent" />

        {/* CSS-only animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <div className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#d4af37]/5 rounded-full blur-3xl animate-float-slow" />
          <div className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-[#d4af37]/5 rounded-full blur-3xl animate-float-medium" />
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-[#d4af37]/3 rounded-full blur-3xl animate-pulse-slow" />
        </div>

        {/* Hero Content - Immediately visible */}
        <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center">
          <div className="space-y-6 sm:space-y-8 animate-fade-in">
            {/* Premium Badge */}
            <div className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-[#d4af37]/20 to-[#d4af37]/10 border border-[#d4af37]/40 backdrop-blur-sm">
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-[#d4af37] mr-2" />
              <span className="text-[#d4af37] text-xs sm:text-sm font-semibold uppercase tracking-wider">
                {t('hero.badge')}
              </span>
            </div>

            {/* Main Heading */}
            <h1 className="text-4xl sm:text-5xl lg:text-7xl xl:text-8xl font-bold">
              <span className="block text-white">{t('hero.title')}</span>
              <span className="block bg-gradient-to-r from-[#d4af37] via-[#e6c757] to-[#d4af37] bg-clip-text text-transparent mt-2">
                {t('hero.titleAccent')}
              </span>
            </h1>

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl lg:text-3xl text-white/90 font-semibold max-w-4xl mx-auto text-balance">
              {t('hero.subtitle')}
            </p>

            {/* Description */}
            <p className="text-base md:text-xl lg:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed text-balance">
              {t('hero.description')}
            </p>

            {/* CTA Button */}
            <div className="flex justify-center pt-4">
              <Link
                href="/contact"
                className="group px-8 sm:px-12 py-4 sm:py-6 rounded-full bg-gradient-to-r from-[#d4af37] to-[#e6c757] text-black font-bold text-base sm:text-xl shadow-lg shadow-[#d4af37]/25 hover:shadow-xl hover:shadow-[#d4af37]/40 transition-all duration-300 flex items-center gap-2 sm:gap-3 hover:scale-[1.02] active:scale-[0.98]"
              >
                <span>{t('hero.cta')}</span>
                <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator - CSS only */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex justify-center pt-2 animate-bounce-slow">
            <div className="w-1 h-2 bg-[#d4af37] rounded-full" />
          </div>
        </div>
      </section>

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

// Skeleton for loading state
function SectionsSkeleton({ t }: { t: any }) {
  return (
    <>
      {/* Problem Statement */}
      <section className="py-16 sm:py-24 lg:py-32 relative bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance">
              {t('problem.title')}
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[#d4af37] font-light italic mb-6 sm:mb-8">
              {t('problem.subtitle')}
            </p>
            <p className="text-base md:text-xl lg:text-2xl text-white/70 leading-relaxed text-balance">
              {t('problem.description')}
            </p>
          </div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <Card gradient className="p-8 sm:p-12 md:p-16">
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 text-balance">
              {t('solution.title')}
            </h2>
            <p className="text-lg md:text-xl text-[#d4af37] mb-4 sm:mb-6 font-semibold">
              {t('solution.subtitle')}
            </p>
            <p className="text-base md:text-xl text-white/70 leading-relaxed text-balance">
              {t('solution.description')}
            </p>
          </Card>
        </div>
      </section>
    </>
  );
}
