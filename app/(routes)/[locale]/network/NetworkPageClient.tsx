'use client';

/**
 * Network Page Client Component
 * Redesigned for clarity and reduced cognitive load
 *
 * Structure:
 * 1. Early Benefits - Quick value snapshot (reusing existing keys)
 * 2. Network Effect - Visual stages with collapsible details
 * 3. Global Expansion - Clean phase cards
 * 4. Regulatory Timeline - Collapsible deep-dive
 * 5. Final CTA
 */

import { useTranslations, useLocale } from 'next-intl';
import { useState } from 'react';
import {
  Network, TrendingUp, Zap, ArrowRight, ArrowLeft,
  Building2, Users, MapPin, Shield, ChevronDown, Coins,
  Globe, FileCheck
} from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';
import { useTextDirection } from '@/app/lib/hooks/useTextDirection';
import { RegulatoryTimeline } from '@/app/components/network/RegulatoryTimeline';
import { cn } from '@/lib/utils';
import { AnimatedWrapper, AnimatedCard, AnimatedSection } from '@/app/components/motion/AnimatedWrapper';

export function NetworkPageClient() {
  const t = useTranslations('network');
  const locale = useLocale();
  const { isRTL } = useTextDirection();
  const [showTimeline, setShowTimeline] = useState(false);
  const [expandedDetails, setExpandedDetails] = useState<string | null>(null);

  return (
    <>
      {/* ========================================
          SECTION 1: EARLY BENEFITS
          Quick value snapshot for banks joining early
          ======================================== */}
      <section className="section-premium relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 60%)'
          }}
          aria-hidden="true"
        />

        <div className="container-premium relative">
          <AnimatedWrapper animation="fadeUp">
            <SectionHeading
              title={t('networkEffect.title')}
              subtitle={t('networkEffect.subtitle')}
              size="lg"
              className="mb-12 sm:mb-16"
            />
          </AnimatedWrapper>

          {/* 4 Benefit Cards - reusing existing translation keys */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
            {/* Capital Efficiency */}
            <AnimatedCard index={0}>
              <Card variant="gradient" size="md" className="h-full">
                <div className="flex items-start gap-4 sm:block">
                  <div className={cn(
                    "w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex-shrink-0",
                    "rounded-xl sm:mb-5",
                    "bg-gold/10 border border-gold/20",
                    "flex items-center justify-center"
                  )}>
                    <Coins className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg lg:text-xl font-display font-semibold text-white mb-1 sm:mb-2">
                      {t('networkEffect.exponential.title')}
                    </h3>
                    <p className="hidden sm:block text-white/50 text-sm lg:text-base leading-relaxed">
                      {t('networkEffect.exponential.description')}
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedCard>

            {/* Netting Benefits */}
            <AnimatedCard index={1}>
              <Card variant="gradient" size="md" className="h-full">
                <div className="flex items-start gap-4 sm:block">
                  <div className={cn(
                    "w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex-shrink-0",
                    "rounded-xl sm:mb-5",
                    "bg-gold/10 border border-gold/20",
                    "flex items-center justify-center"
                  )}>
                    <Zap className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg lg:text-xl font-display font-semibold text-white mb-1 sm:mb-2">
                      {t('networkEffect.netting.title')}
                    </h3>
                    <p className="hidden sm:block text-white/50 text-sm lg:text-base leading-relaxed">
                      {t('networkEffect.netting.description')}
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedCard>

            {/* Regulatory First */}
            <AnimatedCard index={2}>
              <Card variant="gradient" size="md" className="h-full">
                <div className="flex items-start gap-4 sm:block">
                  <div className={cn(
                    "w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex-shrink-0",
                    "rounded-xl sm:mb-5",
                    "bg-gold/10 border border-gold/20",
                    "flex items-center justify-center"
                  )}>
                    <Shield className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg lg:text-xl font-display font-semibold text-white mb-1 sm:mb-2">
                      {t('expansion.regulatoryFirst.title')}
                    </h3>
                    <p className="hidden sm:block text-white/50 text-sm lg:text-base leading-relaxed">
                      {t('expansion.regulatoryFirst.description')}
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedCard>

            {/* Partnership Network */}
            <AnimatedCard index={3}>
              <Card variant="gradient" size="md" className="h-full">
                <div className="flex items-start gap-4 sm:block">
                  <div className={cn(
                    "w-11 h-11 sm:w-12 sm:h-12 lg:w-14 lg:h-14 flex-shrink-0",
                    "rounded-xl sm:mb-5",
                    "bg-gold/10 border border-gold/20",
                    "flex items-center justify-center"
                  )}>
                    <Users className="w-5 h-5 sm:w-6 sm:h-6 lg:w-7 lg:h-7 text-gold" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-base sm:text-lg lg:text-xl font-display font-semibold text-white mb-1 sm:mb-2">
                      {t('expansion.partnerships.title')}
                    </h3>
                    <p className="hidden sm:block text-white/50 text-sm lg:text-base leading-relaxed">
                      {t('expansion.partnerships.description')}
                    </p>
                  </div>
                </div>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: NETWORK EFFECT VISUALIZATION
          3 stages showing growth from 5 → 20 → 100+ banks
          ======================================== */}
      <section className="section-premium relative bg-gradient-to-b from-black to-[#050505]">
        <div className="container-premium">
          {/* Visual Network Growth */}
          <AnimatedWrapper animation="scale" delay={100}>
            <div className="max-w-5xl mx-auto">
              <Card
              variant="bordered"
              size="lg"
              className="relative overflow-visible"
            >
              {/* 3 Stages Grid */}
              <div className={cn(
                "grid md:grid-cols-3 gap-6 sm:gap-8 text-center",
                isRTL && "md:flex-row-reverse"
              )}>
                {/* Stage 1 */}
                <div>
                  <div className="relative mb-5">
                    <div className={cn(
                      "w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full",
                      "bg-gold/20 border-2 border-gold/40",
                      "flex items-center justify-center"
                    )}>
                      <span className="text-3xl sm:text-4xl font-bold text-gold">
                        {t('networkEffect.stage1.number')}
                      </span>
                    </div>
                    <Network className="absolute top-0 right-1/4 w-5 h-5 text-gold/50" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {t('networkEffect.stage1.title')}
                  </h4>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {t('networkEffect.stage1.description')}
                  </p>
                </div>

                {/* Stage 2 */}
                <div>
                  <div className="relative mb-5">
                    <div className={cn(
                      "w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full",
                      "bg-gold/30 border-2 border-gold/50",
                      "flex items-center justify-center"
                    )}>
                      <span className="text-3xl sm:text-4xl font-bold text-gold">
                        {t('networkEffect.stage2.number')}
                      </span>
                    </div>
                    <Network className="absolute top-0 right-1/4 w-6 h-6 text-gold/60" />
                    <Network className="absolute bottom-0 left-1/4 w-6 h-6 text-gold/60" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {t('networkEffect.stage2.title')}
                  </h4>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {t('networkEffect.stage2.description')}
                  </p>
                </div>

                {/* Stage 3 */}
                <div>
                  <div className="relative mb-5">
                    <div className={cn(
                      "w-20 h-20 sm:w-24 sm:h-24 mx-auto rounded-full",
                      "bg-gold/40 border-2 border-gold",
                      "flex items-center justify-center",
                      "shadow-[0_0_40px_-10px_rgba(212,175,55,0.4)]"
                    )}>
                      <span className="text-3xl sm:text-4xl font-bold text-gold">
                        {t('networkEffect.stage3.number')}
                      </span>
                    </div>
                    <Network className="absolute top-0 right-1/4 w-7 h-7 text-gold" />
                    <Network className="absolute bottom-0 left-1/4 w-7 h-7 text-gold" />
                    <Network className="absolute top-1/2 left-0 w-7 h-7 text-gold" />
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                    {t('networkEffect.stage3.title')}
                  </h4>
                  <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                    {t('networkEffect.stage3.description')}
                  </p>
                </div>
              </div>

              {/* Connecting arrows (desktop only) */}
              <div className="hidden md:flex absolute top-1/3 left-0 right-0 items-center justify-center pointer-events-none -z-10">
                {isRTL ? (
                  <>
                    <ArrowLeft className="w-10 h-10 text-gold/20 mx-8" />
                    <ArrowLeft className="w-10 h-10 text-gold/20 mx-8" />
                  </>
                ) : (
                  <>
                    <ArrowRight className="w-10 h-10 text-gold/20 mx-8" />
                    <ArrowRight className="w-10 h-10 text-gold/20 mx-8" />
                  </>
                )}
              </div>
            </Card>
            </div>
          </AnimatedWrapper>

            {/* Secondary CTA */}
            <AnimatedWrapper animation="fadeUp" delay={200}>
            <div className="text-center mt-10 sm:mt-12 max-w-5xl mx-auto">
              <p className="text-white/70 text-base sm:text-lg mb-5">
                {t('networkEffect.cta')}
              </p>
              <Link href={`/${locale}/contact`}>
                <button className={cn(
                  "inline-flex items-center gap-2",
                  "px-6 py-3 rounded-full",
                  "bg-white/5 border border-gold/30 text-gold",
                  "font-medium text-sm sm:text-base"
                )}>
                  {t('networkEffect.button')}
                  {isRTL ? (
                    <ArrowLeft className="w-4 h-4" />
                  ) : (
                    <ArrowRight className="w-4 h-4" />
                  )}
                </button>
              </Link>
            </div>
            </AnimatedWrapper>
        </div>
      </section>

      {/* ========================================
          SECTION 3: GLOBAL EXPANSION
          Clean phase cards with future markets collapsed
          ======================================== */}
      <section className="section-premium relative">
        <div className="container-premium">
          <AnimatedWrapper animation="fadeUp">
            <SectionHeading
              title={t('expansion.title')}
              subtitle={t('expansion.subtitle')}
              size="lg"
              className="mb-12 sm:mb-16"
            />
          </AnimatedWrapper>

          <div className="max-w-6xl mx-auto">
            {/* Parallel Expansion Intro */}
            <AnimatedWrapper animation="fade" delay={100}>
            <div className="text-center mb-10 sm:mb-12">
              <div className={cn(
                "inline-flex items-center gap-3 px-5 py-3",
                "rounded-full bg-gold/10 border border-gold/20"
              )}>
                <Globe className="w-5 h-5 text-gold" />
                <span className="text-gold font-medium text-sm sm:text-base">
                  {t('expansion.parallel.title')}
                </span>
              </div>
              <p className="text-white/60 text-base sm:text-lg max-w-3xl mx-auto mt-4">
                {t('expansion.description')}
              </p>
            </div>
            </AnimatedWrapper>

            {/* 3 Main Phases */}
            <div className="grid md:grid-cols-3 gap-5 sm:gap-6 mb-8">
              {/* Phase 1: MENA */}
              <AnimatedCard index={0}>
                <Card
                  variant="bordered"
                  size="md"
                  className="h-full border-gold/30 bg-gradient-to-br from-gold/10 to-transparent"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
                      "bg-gold flex items-center justify-center",
                      "text-black font-bold text-lg"
                    )}>
                      {t('expansion.mena.number')}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      {t('expansion.mena.title')}
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm sm:text-base text-white/70">
                    <p>
                      <span className="text-white font-medium">{t('expansion.labels.target')}</span>{' '}
                      {t('expansion.mena.target')}
                    </p>
                    <p>
                      <span className="text-white font-medium">{t('expansion.labels.markets')}</span>{' '}
                      {t('expansion.mena.markets')}
                    </p>
                    <p className="pt-2 text-white/50">{t('expansion.mena.description')}</p>
                  </div>
                </Card>
              </AnimatedCard>

              {/* Phase 2: Europe */}
              <AnimatedCard index={1}>
                <Card variant="gradient" size="md" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
                      "bg-white/20 flex items-center justify-center",
                      "text-white font-bold text-lg"
                    )}>
                      {t('expansion.europe.number')}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      {t('expansion.europe.title')}
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm sm:text-base text-white/70">
                    <p>
                      <span className="text-white font-medium">{t('expansion.labels.target')}</span>{' '}
                      {t('expansion.europe.target')}
                    </p>
                    <p>
                      <span className="text-white font-medium">{t('expansion.labels.markets')}</span>{' '}
                      {t('expansion.europe.markets')}
                    </p>
                    <p className="pt-2 text-white/50">{t('expansion.europe.description')}</p>
                  </div>
                </Card>
              </AnimatedCard>

              {/* Phase 3: Asia */}
              <AnimatedCard index={2}>
                <Card variant="gradient" size="md" className="h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-full",
                      "bg-white/20 flex items-center justify-center",
                      "text-white font-bold text-lg"
                    )}>
                      {t('expansion.asia.number')}
                    </div>
                    <h4 className="text-lg sm:text-xl font-bold text-white">
                      {t('expansion.asia.title')}
                    </h4>
                  </div>
                  <div className="space-y-2 text-sm sm:text-base text-white/70">
                    <p>
                      <span className="text-white font-medium">{t('expansion.labels.target')}</span>{' '}
                      {t('expansion.asia.target')}
                    </p>
                    <p>
                      <span className="text-white font-medium">{t('expansion.labels.markets')}</span>{' '}
                      {t('expansion.asia.markets')}
                    </p>
                    <p className="pt-2 text-white/50">{t('expansion.asia.description')}</p>
                  </div>
                </Card>
              </AnimatedCard>
            </div>

            {/* Future Phases - Collapsible */}
            <Card variant="soft" size="md" className="mb-8">
              <button
                onClick={() => setExpandedDetails(expandedDetails === 'future' ? null : 'future')}
                className="w-full flex items-center justify-between text-left"
              >
                <div className="flex items-center gap-3">
                  <MapPin className="w-5 h-5 text-gold" />
                  <span className="text-white font-medium">
                    {/* TODO: t('network.futureMarkets.title') */}
                    Phase 4–7: Future Markets
                  </span>
                </div>
                <ChevronDown className={cn(
                  "w-5 h-5 text-white/50",
                  expandedDetails === 'future' && "rotate-180"
                )} />
              </button>

              <div className={cn(
                "overflow-hidden",
                expandedDetails === 'future' ? "max-h-96 opacity-100 mt-6" : "max-h-0 opacity-0"
              )}>
                <div className="grid sm:grid-cols-2 gap-4 pt-4 border-t border-white/10">
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>
                      <strong className="text-white">{t('expansion.future.phase4.label')}</strong>{' '}
                      {t('expansion.future.phase4.description')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>
                      <strong className="text-white">{t('expansion.future.phase5.label')}</strong>{' '}
                      {t('expansion.future.phase5.description')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>
                      <strong className="text-white">{t('expansion.future.phase6.label')}</strong>{' '}
                      {t('expansion.future.phase6.description')}
                    </span>
                  </div>
                  <div className="flex items-center gap-3 text-white/70 text-sm">
                    <MapPin className="w-4 h-4 text-gold flex-shrink-0" />
                    <span>
                      <strong className="text-white">{t('expansion.future.phase7.label')}</strong>{' '}
                      {t('expansion.future.phase7.description')}
                    </span>
                  </div>
                </div>
              </div>
            </Card>

            {/* Regulatory First + Partnerships - Side by Side */}
            <div className="grid md:grid-cols-2 gap-5 sm:gap-6">
              <Card variant="gradient" size="md" className="group">
                <div className={cn(
                  "w-12 h-12 rounded-xl mb-4",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center"
                )}>
                  <Building2 className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {t('expansion.regulatoryFirst.title')}
                </h4>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {t('expansion.regulatoryFirst.description')}
                </p>
              </Card>

              <Card variant="gradient" size="md" className="group">
                <div className={cn(
                  "w-12 h-12 rounded-xl mb-4",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center"
                )}>
                  <Users className="w-6 h-6 text-gold" />
                </div>
                <h4 className="text-lg sm:text-xl font-bold text-white mb-2">
                  {t('expansion.partnerships.title')}
                </h4>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {t('expansion.partnerships.description')}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4: REGULATORY TIMELINE
          Collapsible deep-dive with disclaimer visible
          ======================================== */}
      <section className="section-premium relative bg-gradient-to-b from-[#050505] to-black">
        <div className="container-premium">
          {/* Disclaimer Card - Always visible */}
          <div className="max-w-4xl mx-auto mb-10">
            <Card variant="soft" size="md">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-gold flex-shrink-0 mt-0.5" />
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-white mb-2">
                    {t('regulatory.disclaimerCard.title')}
                  </h4>
                  <p className="text-sm sm:text-base text-white/70 leading-relaxed">
                    {t('regulatory.disclaimerCard.content')}
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Timeline Toggle */}
          <div className="max-w-6xl mx-auto">
            <button
              onClick={() => setShowTimeline(!showTimeline)}
              className={cn(
                "w-full flex items-center justify-center gap-3",
                "px-6 py-4 rounded-2xl",
                "bg-gradient-to-r from-gold/10 to-gold/5",
                "border border-gold/20",
                "text-gold font-medium",
                "mb-8"
              )}
            >
              <FileCheck className="w-5 h-5" />
              <span>
                {/* TODO: t('network.regulatory.toggleButton') */}
                {showTimeline
                  ? 'Hide Regulatory Roadmap'
                  : 'View Detailed Regulatory Roadmap'
                }
              </span>
              <ChevronDown className={cn(
                "w-5 h-5",
                showTimeline && "rotate-180"
              )} />
            </button>

            {/* Collapsible Timeline */}
            <div className={cn(
              "overflow-hidden",
              showTimeline ? "max-h-[5000px] opacity-100" : "max-h-0 opacity-0"
            )}>
              <RegulatoryTimeline />
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5: FINAL CTA
          Strong, clear call-to-action
          ======================================== */}
      <section className="section-premium relative">
        <div className="container-premium">
          <AnimatedWrapper animation="scale" delay={100}>
          <Card
            variant="bordered"
            size="xl"
            className={cn(
              "text-center",
              "bg-gradient-to-br from-gold/15 via-gold/8 to-gold/3",
              "border-gold/30"
            )}
          >
            {/* Decorative glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.15) 0%, transparent 70%)'
              }}
              aria-hidden="true"
            />

            <div className="relative space-y-6 sm:space-y-8">
              <h2 className={cn(
                "font-display font-bold text-balance",
                "text-3xl sm:text-4xl md:text-5xl",
                "text-white"
              )}>
                {t('cta.title')}
              </h2>

              <p className={cn(
                "text-white/60 text-lg sm:text-xl leading-relaxed text-balance",
                "max-w-3xl mx-auto"
              )}>
                {t('cta.description')}
              </p>

              <div className="pt-4 sm:pt-6">
                <Link href={`/${locale}/contact`}>
                  <button
                    className={cn(
                      "group relative inline-flex items-center gap-3",
                      "px-10 sm:px-12 lg:px-14 py-5 sm:py-6 lg:py-7",
                      "rounded-full",
                      "bg-gradient-to-r from-gold via-gold-light to-gold text-black",
                      "font-semibold text-base sm:text-lg lg:text-xl",
                      "shadow-[0_8px_40px_-8px_rgba(212,175,55,0.5)]",
                      "overflow-hidden"
                    )}
                  >
                    <span className="relative">{t('cta.button')}</span>
                    {isRTL ? (
                      <ArrowLeft className="relative w-5 h-5 sm:w-6 sm:h-6" />
                    ) : (
                      <ArrowRight className="relative w-5 h-5 sm:w-6 sm:h-6" />
                    )}
                  </button>
                </Link>
              </div>
            </div>
          </Card>
          </AnimatedWrapper>
        </div>
      </section>
    </>
  );
}
