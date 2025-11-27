/**
 * Network Page - Server Component
 *
 * Performance Strategy:
 * 1. Hero section server-rendered for fast LCP
 * 2. Animated sections loaded dynamically (no SSR)
 * 3. Framer-motion only loaded when needed
 */

import { getTranslations } from 'next-intl/server';
import { Globe } from 'lucide-react';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for client-side animations
const NetworkPageClient = dynamic(
  () => import('./NetworkPageClient').then(mod => mod.NetworkPageClient),
  {
    loading: () => <NetworkSkeleton />,
    ssr: false, // No SSR for animations - improves TBT/TTI
  }
);

export default async function NetworkPage() {
  const t = await getTranslations('network');

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Server rendered for instant LCP */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

        <div className="relative container mx-auto px-6 py-32 text-center">
          <div className="space-y-8 animate-fade-in">
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gold/20 to-gold-light/20 border border-gold/40 backdrop-blur-sm">
              <Globe className="w-5 h-5 text-gold mr-2" />
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight">
              <span className="block text-white">{t('hero.title')}</span>
              <span className="block text-gradient mt-2">{t('hero.titleAccent')}</span>
            </h1>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
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

// Loading skeleton
function NetworkSkeleton() {
  return (
    <div className="py-32 container mx-auto px-6">
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="h-8 bg-white/5 rounded-lg w-1/3 mx-auto animate-pulse" />
        <div className="h-4 bg-white/5 rounded w-1/2 mx-auto animate-pulse" />
        <div className="grid md:grid-cols-3 gap-8 mt-16">
          {[1, 2, 3].map(i => (
            <div key={i} className="h-64 bg-white/5 rounded-xl animate-pulse" />
          ))}
        </div>
      </div>
    </div>
  );
}
