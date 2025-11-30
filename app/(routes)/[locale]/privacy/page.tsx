/**
 * Privacy Policy Page
 */

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
  return generatePageMetadata({
    title: 'Privacy Policy',
    description: 'DelTran Privacy Policy. Learn how we collect, use, and protect your personal information.',
    path: '/privacy',
    locale: locale as LocaleKey,
  });
}
import { cn } from '@/lib/utils';

export default async function PrivacyPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  const t = await getTranslations('privacy');

  const sections = [
    'introduction',
    'dataCollection',
    'dataUse',
    'dataSharing',
    'dataSecurity',
    'cookies',
    'yourRights',
    'retention',
    'changes',
    'contact'
  ] as const;

  // Sections that have items arrays
  const sectionsWithItems = ['dataCollection', 'dataUse', 'dataSharing', 'cookies', 'yourRights'];

  return (
    <div className="relative">
      {/* Hero */}
      <section className="relative min-h-[40vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-black" />
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.06) 0%, transparent 70%)'
          }}
        />
        <div className="relative container-premium py-24 sm:py-32 text-center">
          <h1 className={cn(
            "font-display font-bold tracking-tight",
            "text-3xl sm:text-4xl md:text-5xl lg:text-6xl",
            "bg-gradient-to-r from-white via-white/95 to-white/85",
            "bg-clip-text text-transparent"
          )}>
            {t('title')}
          </h1>
          <p className="text-white/70 mt-4 text-sm">
            {t('lastUpdated')}
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="relative py-16 sm:py-24">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto space-y-12">
            {sections.map((section) => {
              const hasItems = sectionsWithItems.includes(section);
              const items = hasItems ? t.raw(`sections.${section}.items`) as string[] | undefined : undefined;

              return (
                <div key={section} className="space-y-4">
                  <h2 className={cn(
                    "font-display font-semibold",
                    "text-xl sm:text-2xl",
                    "text-white"
                  )}>
                    {t(`sections.${section}.title`)}
                  </h2>
                  <div className="text-white/80 leading-relaxed space-y-4 text-sm sm:text-base">
                    <p>{t(`sections.${section}.content`)}</p>
                    {items && Array.isArray(items) && items.length > 0 && (
                      <ul className="list-disc list-inside space-y-2 ml-4">
                        {items.map((item: string, idx: number) => (
                          <li key={idx}>{item}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
