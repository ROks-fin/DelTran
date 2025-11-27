/**
 * Contact Page - Server Component
 *
 * Performance Strategy:
 * 1. Hero section server-rendered for fast LCP
 * 2. Contact form loaded dynamically
 * 3. No framer-motion in critical path
 */

import { getTranslations } from 'next-intl/server';
import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// Dynamic import for client-side form
const ContactForm = dynamic(
  () => import('./ContactForm').then(mod => mod.ContactForm),
  {
    loading: () => <ContactSkeleton />,
    ssr: false, // Form needs client-side state
  }
);

export default async function ContactPage() {
  const t = await getTranslations('contact');

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section - Server rendered for instant LCP */}
      <section className="relative min-h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-black" />

        <div className="relative container mx-auto px-6 py-24 text-center">
          <div className="space-y-6 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              {t('hero.title')}
            </h1>

            <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto">
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

// Loading skeleton
function ContactSkeleton() {
  return (
    <section className="py-24 relative">
      <div className="container mx-auto px-6">
        <div className="grid lg:grid-cols-3 gap-12 max-w-6xl mx-auto">
          <div className="lg:col-span-2">
            <div className="p-8 md:p-12 rounded-xl bg-white/5 border border-white/10">
              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
                  <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
                  <div className="h-12 bg-white/5 rounded-lg animate-pulse" />
                </div>
                <div className="h-32 bg-white/5 rounded-lg animate-pulse" />
                <div className="h-14 bg-gold/20 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          <div className="space-y-6">
            <div className="h-32 bg-white/5 rounded-xl animate-pulse" />
            <div className="h-24 bg-white/5 rounded-xl animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
