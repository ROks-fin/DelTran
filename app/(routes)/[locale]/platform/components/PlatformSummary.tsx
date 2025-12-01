'use client';

/**
 * Platform Summary Component
 * 4 outcome-focused cards: liquidity, compliance, finality, reporting
 *
 * Focus on WHAT the bank gets, not HOW it works internally
 */

import { useTranslations } from 'next-intl';
import { Droplets, ShieldCheck, Zap, FileBarChart2 } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import { cn } from '@/lib/utils';

const summaryItems = [
  {
    key: 'liquidity',
    icon: Droplets,
  },
  {
    key: 'compliance',
    icon: ShieldCheck,
  },
  {
    key: 'finality',
    icon: Zap,
  },
  {
    key: 'reporting',
    icon: FileBarChart2,
  },
];

export function PlatformSummary() {
  const t = useTranslations('platform');

  return (
    <section className="section-premium relative">
      {/* Subtle background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.03) 0%, transparent 60%)'
        }}
        aria-hidden="true"
      />

      <div className="container-premium relative">
        <SectionHeading
          title={t('summary.title')}
          subtitle={t('summary.subtitle')}
          size="lg"
          className="mb-12 sm:mb-16 lg:mb-20"
        />

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
          {summaryItems.map((item) => (
            <div key={item.key}>
              <Card
                variant="gradient"
                size="md"
                className="h-full"
              >
                {/* Mobile: Horizontal compact | Desktop: Vertical */}
                <div className="flex items-start gap-4 sm:block">
                  {/* Icon */}
                  <div className={cn(
                    "w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex-shrink-0",
                    "rounded-xl sm:mb-5",
                    "bg-gold/10 border border-gold/20",
                    "flex items-center justify-center"
                  )}>
                    <item.icon className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gold" />
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 className={cn(
                      "text-base sm:text-lg lg:text-xl font-display font-semibold",
                      "text-white mb-1 sm:mb-3"
                    )}>
                      {t(`summary.items.${item.key}.title`)}
                    </h3>

                    {/* Description - hidden on mobile for compactness */}
                    <p className="hidden sm:block text-white/50 text-sm lg:text-base leading-relaxed mb-4">
                      {t(`summary.items.${item.key}.description`)}
                    </p>

                    {/* Impact metric */}
                    <div className="sm:pt-4 sm:border-t sm:border-white/[0.06]">
                      <p className={cn(
                        "text-[10px] sm:text-xs uppercase tracking-[0.15em] text-gold/60 mb-0.5 sm:mb-1"
                      )}>
                        {t(`summary.items.${item.key}.impactLabel`)}
                      </p>
                      <p className={cn(
                        "text-base sm:text-lg lg:text-xl font-display font-semibold",
                        "bg-gradient-to-r from-gold via-gold-light to-gold",
                        "bg-clip-text text-transparent"
                      )}>
                        {t(`summary.items.${item.key}.impact`)}
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
