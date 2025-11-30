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
    gradient: 'from-blue-500/10 via-blue-400/5 to-transparent',
  },
  {
    key: 'compliance',
    icon: ShieldCheck,
    gradient: 'from-emerald-500/10 via-emerald-400/5 to-transparent',
  },
  {
    key: 'finality',
    icon: Zap,
    gradient: 'from-gold/15 via-gold/5 to-transparent',
  },
  {
    key: 'reporting',
    icon: FileBarChart2,
    gradient: 'from-purple-500/10 via-purple-400/5 to-transparent',
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

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6 max-w-7xl mx-auto">
          {summaryItems.map((item, index) => (
            <div
              key={item.key}
              className="animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <Card
                variant="gradient"
                size="lg"
                className={cn(
                  "h-full group relative overflow-hidden",
                  "hover:border-gold/30 transition-colors duration-300"
                )}
              >
                {/* Gradient overlay */}
                <div
                  className={cn(
                    "absolute inset-0 bg-gradient-to-br",
                    item.gradient,
                    "opacity-0 group-hover:opacity-100",
                    "transition-opacity duration-500"
                  )}
                  aria-hidden="true"
                />

                <div className="relative">
                  {/* Icon */}
                  <div className={cn(
                    "w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-5 sm:mb-6",
                    "bg-gold/10 border border-gold/20",
                    "flex items-center justify-center",
                    "group-hover:bg-gold/15 group-hover:border-gold/30",
                    "transition-colors duration-300"
                  )}>
                    <item.icon className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                  </div>

                  {/* Title */}
                  <h3 className={cn(
                    "text-lg sm:text-xl font-display font-semibold",
                    "text-white mb-3"
                  )}>
                    {t(`summary.items.${item.key}.title`)}
                  </h3>

                  {/* Description */}
                  <p className="text-white/50 text-sm sm:text-base leading-relaxed mb-4">
                    {t(`summary.items.${item.key}.description`)}
                  </p>

                  {/* Impact metric */}
                  <div className={cn(
                    "pt-4 border-t border-white/[0.06]",
                    "group-hover:border-gold/20",
                    "transition-colors duration-300"
                  )}>
                    <p className={cn(
                      "text-xs uppercase tracking-[0.15em] text-gold/60 mb-1"
                    )}>
                      {t(`summary.items.${item.key}.impactLabel`)}
                    </p>
                    <p className={cn(
                      "text-lg sm:text-xl font-display font-semibold",
                      "bg-gradient-to-r from-gold via-gold-light to-gold",
                      "bg-clip-text text-transparent"
                    )}>
                      {t(`summary.items.${item.key}.impact`)}
                    </p>
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
