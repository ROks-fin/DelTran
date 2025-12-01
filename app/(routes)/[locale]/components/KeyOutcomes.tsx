/**
 * KeyOutcomes Component
 *
 * Displays 3 key value propositions immediately after hero:
 * - Zero trapped capital (liquidity)
 * - Built-in compliance
 * - Instant finality
 *
 * Server Component - uses getTranslations for i18n
 */

import { getTranslations } from 'next-intl/server';
import { Droplets, ShieldCheck, Zap } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { cn } from '@/lib/utils';

interface KeyOutcome {
  key: string;
  icon: React.ComponentType<{ className?: string }>;
  titleKey: string;
  descriptionKey: string;
}

const outcomes: KeyOutcome[] = [
  {
    key: 'liquidity',
    icon: Droplets,
    titleKey: 'keyOutcomes.liquidity.title',
    descriptionKey: 'keyOutcomes.liquidity.description',
  },
  {
    key: 'compliance',
    icon: ShieldCheck,
    titleKey: 'keyOutcomes.compliance.title',
    descriptionKey: 'keyOutcomes.compliance.description',
  },
  {
    key: 'finality',
    icon: Zap,
    titleKey: 'keyOutcomes.finality.title',
    descriptionKey: 'keyOutcomes.finality.description',
  },
];

export async function KeyOutcomes() {
  const t = await getTranslations('home');

  return (
    <section className="relative py-12 sm:py-16 lg:py-20">
      {/* Soft background transition */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'linear-gradient(180deg, transparent 0%, rgba(5,5,5,0.3) 50%, transparent 100%)'
        }}
        aria-hidden="true"
      />

      <div className="container-premium relative">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 max-w-5xl mx-auto">
          {outcomes.map((outcome) => {
            const Icon = outcome.icon;

            return (
              <Card
                key={outcome.key}
                variant="soft"
                size="sm"
                className="md:text-center"
                glowOnHover={false}
              >
                {/* Mobile: Horizontal layout | Desktop: Vertical layout */}
                <div className="flex items-start gap-4 md:block">
                  {/* Icon */}
                  <div className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 flex-shrink-0",
                    "md:mx-auto md:mb-4",
                    "rounded-xl",
                    "bg-gradient-to-br from-gold/15 to-gold/5",
                    "border border-gold/10",
                    "flex items-center justify-center"
                  )}>
                    <Icon className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                  </div>

                  {/* Text content */}
                  <div className="flex-1 min-w-0">
                    {/* Title */}
                    <h3 className={cn(
                      "fluid-text-base font-semibold",
                      "text-white",
                      "mb-1 md:mb-2"
                    )}>
                      {t(outcome.titleKey)}
                    </h3>

                    {/* Description */}
                    <p className={cn(
                      "fluid-text-sm",
                      "text-white/50",
                      "leading-relaxed",
                      "line-clamp-2"
                    )}>
                      {t(outcome.descriptionKey)}
                    </p>
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      </div>
    </section>
  );
}
