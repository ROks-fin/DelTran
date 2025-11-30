'use client';

/**
 * Platform Page Client - Interactive sections
 *
 * Redesigned to focus on OUTCOMES, not internal architecture
 * Shows: ISO 20022 → DelTran → Settled payment
 */

import { useTranslations } from 'next-intl';
import { ArrowRight, ArrowLeft, Target, Sparkles, Shield } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';
import { useTextDirection } from '@/app/lib/hooks/useTextDirection';
import { cn } from '@/lib/utils';
import { IsoFlowAnimation } from './components/IsoFlowAnimation';
import { PlatformSummary } from './components/PlatformSummary';

export function PlatformPageClient() {
  const t = useTranslations('platform');
  const { isRTL } = useTextDirection();

  return (
    <>
      {/* ISO Flow Animation - Core value proposition */}
      <IsoFlowAnimation />

      {/* Platform Summary - 4 outcome cards */}
      <PlatformSummary />

      {/* Mission & Vision - Simplified */}
      <section className="section-premium relative bg-gradient-to-b from-black to-[#050505]">
        <div className="container-premium">
          <SectionHeading
            title={t('mission.sectionTitle')}
            subtitle={t('mission.sectionSubtitle')}
            size="lg"
            className="mb-14 sm:mb-20"
          />

          <div className="grid md:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
            {/* Mission */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
              <Card variant="gradient" size="lg" className="h-full group">
                <div className={cn(
                  "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center mb-5 sm:mb-6",
                  "group-hover:bg-gold/15 group-hover:border-gold/30",
                  "transition-colors duration-300"
                )}>
                  <Target className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
                </div>

                <h3 className={cn(
                  "text-[10px] sm:text-xs font-semibold uppercase",
                  "tracking-[0.15em] text-gold/80",
                  "mb-3 sm:mb-4"
                )}>
                  {t('mission.missionLabel')}
                </h3>

                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  {t('mission.mission')}
                </p>
              </Card>
            </div>

            {/* Vision */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              <Card variant="gradient" size="lg" className="h-full group">
                <div className={cn(
                  "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center mb-5 sm:mb-6",
                  "group-hover:bg-gold/15 group-hover:border-gold/30",
                  "transition-colors duration-300"
                )}>
                  <Sparkles className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
                </div>

                <h3 className={cn(
                  "text-[10px] sm:text-xs font-semibold uppercase",
                  "tracking-[0.15em] text-gold/80",
                  "mb-3 sm:mb-4"
                )}>
                  {t('mission.visionLabel')}
                </h3>

                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  {t('mission.vision')}
                </p>
              </Card>
            </div>

            {/* Values */}
            <div className="animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
              <Card variant="gradient" size="lg" className="h-full group">
                <div className={cn(
                  "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center mb-5 sm:mb-6",
                  "group-hover:bg-gold/15 group-hover:border-gold/30",
                  "transition-colors duration-300"
                )}>
                  <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
                </div>

                <h3 className={cn(
                  "text-[10px] sm:text-xs font-semibold uppercase",
                  "tracking-[0.15em] text-gold/80",
                  "mb-3 sm:mb-4"
                )}>
                  {t('mission.valuesLabel')}
                </h3>

                <p className="text-white/70 text-base sm:text-lg leading-relaxed">
                  {t('mission.values')}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-premium relative bg-gradient-to-b from-black via-[#050505] to-black">
        <div className="container-premium">
          <div className={cn(
            "relative overflow-hidden rounded-3xl",
            "p-10 sm:p-14 lg:p-20 xl:p-24",
            "bg-gradient-to-br from-gold/15 via-gold/8 to-gold/3",
            "border border-gold/30",
            "text-center"
          )}>
            {/* Decorative glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)'
              }}
              aria-hidden="true"
            />

            <div className="relative space-y-6 sm:space-y-8 animate-fade-in">
              <h2 className={cn(
                "font-display font-bold text-fluid-2xl text-balance",
                "text-white"
              )}>
                {t('cta.title')}
              </h2>

              <p className={cn(
                "text-white/60 text-fluid-body-xl leading-relaxed text-balance",
                "max-w-3xl mx-auto"
              )}>
                {t('cta.subtitle')}
              </p>

              <div className="pt-4 sm:pt-6">
                <Link href="/contact">
                  <button
                    className={cn(
                      "inline-flex items-center gap-3",
                      "px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6",
                      "rounded-full",
                      "bg-gradient-to-r from-gold to-gold-light text-black",
                      "font-semibold text-base sm:text-lg lg:text-xl",
                      "shadow-[0_8px_32px_-8px_rgba(212,175,55,0.5)]",
                      "hover:shadow-[0_12px_40px_-8px_rgba(212,175,55,0.6)]",
                      "hover:scale-[1.02] active:scale-[0.98]",
                      "transition-all duration-300"
                    )}
                  >
                    {t('cta.button')}
                    {isRTL ? (
                      <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
