'use client';

/**
 * Company Page Client Component
 * Redesigned for clarity, banking-grade feel, pre-launch messaging
 *
 * Structure:
 * 1. Company Status - Quick snapshot of current stage
 * 2. Mission & Vision - Side by side cards
 * 3. Our Story - Structured narrative
 * 4. Core Values - 2x2 grid with all 4 values
 * 5. Careers - Clean centered block
 * 6. Final CTA
 */

import { useTranslations, useLocale } from 'next-intl';
import {
  Target, Heart, Shield, Zap, Briefcase, ArrowRight, ArrowLeft,
  CheckCircle2, Clock, Users, Lightbulb, Rocket
} from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';
import { useTextDirection } from '@/app/lib/hooks/useTextDirection';
import { cn } from '@/lib/utils';

export function CompanyPageClient() {
  const t = useTranslations('company');
  const locale = useLocale();
  const { isRTL } = useTextDirection();
  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  return (
    <>
      {/* ========================================
          SECTION 1: COMPANY STATUS
          Quick snapshot: MVP ready, pre-launch, seeking partners
          ======================================== */}
      <section className="py-12 sm:py-16 relative">
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'radial-gradient(ellipse 80% 50% at 50% 0%, rgba(212,175,55,0.04) 0%, transparent 60%)'
          }}
          aria-hidden="true"
        />

        <div className="container-premium relative">
          <div className="max-w-4xl mx-auto">
            {/* Status chips row */}
            <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
              {/* MVP Ready */}
              <div className={cn(
                "inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3",
                "rounded-full",
                "bg-gradient-to-r from-gold/15 to-gold/10",
                "border border-gold/25",
                "text-gold font-medium text-sm sm:text-base"
              )}>
                <CheckCircle2 className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t('status.mvpReady')}</span>
              </div>

              {/* Pre-launch */}
              <div className={cn(
                "inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3",
                "rounded-full",
                "bg-white/[0.04] border border-white/10",
                "text-white/70 font-medium text-sm sm:text-base"
              )}>
                <Rocket className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t('status.prelaunch')}</span>
              </div>

              {/* ADGM Sandbox */}
              <div className={cn(
                "inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3",
                "rounded-full",
                "bg-white/[0.04] border border-white/10",
                "text-white/70 font-medium text-sm sm:text-base"
              )}>
                <Clock className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t('status.sandbox')}</span>
              </div>

              {/* Partners */}
              <div className={cn(
                "inline-flex items-center gap-2 px-4 sm:px-5 py-2.5 sm:py-3",
                "rounded-full",
                "bg-white/[0.04] border border-white/10",
                "text-white/70 font-medium text-sm sm:text-base"
              )}>
                <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                <span>{t('status.partners')}</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 2: MISSION & VISION
          Two cards side by side
          ======================================== */}
      <section className="section-premium relative">
        <div className="container-premium">
          <SectionHeading
            title={t('mission.title')}
            subtitle={t('story.subtitle')}
            size="lg"
            className="mb-12 sm:mb-16"
          />

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {/* Mission */}
            <div>
              <Card variant="gradient" size="lg" className="h-full group">
                <div className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-5",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center"
                )}>
                  <Target className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                </div>
                <h3 className={cn(
                  "font-display font-bold text-white",
                  "text-xl sm:text-2xl",
                  "mb-3"
                )}>
                  {t('mission.title')}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {t('mission.content')}
                </p>
              </Card>
            </div>

            {/* Vision */}
            <div>
              <Card variant="gradient" size="lg" className="h-full group">
                <div className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-5",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center"
                )}>
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                </div>
                <h3 className={cn(
                  "font-display font-bold text-white",
                  "text-xl sm:text-2xl",
                  "mb-3"
                )}>
                  {t('vision.title')}
                </h3>
                <p className="text-white/60 text-sm sm:text-base leading-relaxed">
                  {t('vision.content')}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 3: OUR STORY
          Structured narrative with readable typography
          ======================================== */}
      <section className="section-premium relative bg-gradient-to-b from-black to-[#050505]">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto">
            <div>
              <Card variant="bordered" size="lg" className="border-gold/20">
                {/* Story Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div className={cn(
                    "w-10 h-10 sm:w-12 sm:h-12 rounded-xl",
                    "bg-gold/10 border border-gold/20",
                    "flex items-center justify-center"
                  )}>
                    <Lightbulb className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                  </div>
                  <h3 className={cn(
                    "font-display font-bold text-white",
                    "text-xl sm:text-2xl lg:text-3xl"
                  )}>
                    {t('story.title')}
                  </h3>
                </div>

                {/* Story Content - structured */}
                <div className="space-y-5 text-white/60 text-sm sm:text-base lg:text-lg leading-relaxed">
                  {/* Insight highlight */}
                  <div className={cn(
                    "p-4 sm:p-5 rounded-xl",
                    "bg-gold/[0.05] border border-gold/10"
                  )}>
                    <p className="text-white/70 font-medium">
                      {t('story.insight')}
                    </p>
                  </div>

                  {/* Main story text */}
                  <p className="whitespace-pre-line">{t('story.content')}</p>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 4: CORE VALUES
          2x2 grid with all 4 values
          ======================================== */}
      <section className="section-premium relative">
        <div className="container-premium">
          <SectionHeading
            title={t('values.title')}
            subtitle={t('values.subtitle')}
            size="lg"
            className="mb-12 sm:mb-16"
          />

          <div className="grid sm:grid-cols-2 gap-5 sm:gap-6 max-w-5xl mx-auto">
            {/* Security / Compliance First */}
            <div>
              <Card variant="gradient" size="md" className="h-full group">
                <div className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-5",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center"
                )}>
                  <Shield className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                </div>
                <h4 className={cn(
                  "font-display font-semibold text-white",
                  "text-lg sm:text-xl",
                  "mb-2"
                )}>
                  {t('values.security.title')}
                </h4>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                  {t('values.security.description')}
                </p>
              </Card>
            </div>

            {/* Efficiency */}
            <div>
              <Card variant="gradient" size="md" className="h-full group">
                <div className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-5",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center"
                )}>
                  <Zap className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                </div>
                <h4 className={cn(
                  "font-display font-semibold text-white",
                  "text-lg sm:text-xl",
                  "mb-2"
                )}>
                  {t('values.efficiency.title')}
                </h4>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                  {t('values.efficiency.description')}
                </p>
              </Card>
            </div>

            {/* Transparency */}
            <div>
              <Card variant="gradient" size="md" className="h-full group">
                <div className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-5",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center"
                )}>
                  <Heart className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                </div>
                <h4 className={cn(
                  "font-display font-semibold text-white",
                  "text-lg sm:text-xl",
                  "mb-2"
                )}>
                  {t('values.transparency.title')}
                </h4>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                  {t('values.transparency.description')}
                </p>
              </Card>
            </div>

            {/* Innovation - 4th value */}
            <div>
              <Card variant="gradient" size="md" className="h-full group">
                <div className={cn(
                  "w-12 h-12 sm:w-14 sm:h-14 rounded-xl mb-5",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center"
                )}>
                  <Lightbulb className="w-6 h-6 sm:w-7 sm:h-7 text-gold" />
                </div>
                <h4 className={cn(
                  "font-display font-semibold text-white",
                  "text-lg sm:text-xl",
                  "mb-2"
                )}>
                  {t('values.innovation.title')}
                </h4>
                <p className="text-white/50 text-sm sm:text-base leading-relaxed">
                  {t('values.innovation.description')}
                </p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 5: CAREERS
          Clean centered block with proper spacing
          ======================================== */}
      <section className="py-20 sm:py-24 lg:py-28 relative bg-gradient-to-b from-[#050505] to-black">
        <div className="container-premium">
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <Card variant="soft" size="xl">
                <div className={cn(
                  "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl",
                  "bg-gold/10 border border-gold/20",
                  "flex items-center justify-center mb-6",
                  "mx-auto"
                )}>
                  <Briefcase className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
                </div>
                <h2 className={cn(
                  "font-display font-bold tracking-tight",
                  "text-2xl sm:text-3xl lg:text-4xl",
                  "bg-gradient-to-r from-white via-white/95 to-white/80",
                  "bg-clip-text text-transparent",
                  "mb-4 sm:mb-5"
                )}>
                  {t('careers.title')}
                </h2>
                <p className="text-white/60 text-base sm:text-lg mb-5 sm:mb-6 leading-relaxed max-w-xl mx-auto">
                  {t('careers.subtitle')}
                </p>
                <div className="text-white/50 text-sm sm:text-base">
                  <p className="mb-4 leading-relaxed">
                    {t('careers.description')}
                  </p>
                  <a
                    href={`mailto:${t('cta.email')}`}
                    className={cn(
                      "inline-flex items-center gap-2",
                      "text-gold/80 hover:text-gold",
                      "font-semibold text-base sm:text-lg"
                    )}
                  >
                    {t('cta.email')}
                    <Arrow className="w-4 h-4 sm:w-5 sm:h-5" />
                  </a>
                </div>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================
          SECTION 6: FINAL CTA
          Premium banking feel
          ======================================== */}
      <section className="section-premium relative">
        <div className="container-premium">
          <Card
            variant="bordered"
            size="xl"
            className={cn(
              "text-center",
              "bg-gradient-to-br from-gold/15 via-gold/8 to-gold/3",
              "border-gold/30",
              "max-w-4xl mx-auto"
            )}
          >
            {/* Decorative glow */}
            <div
              className="absolute top-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] pointer-events-none"
              style={{
                background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, transparent 70%)'
              }}
              aria-hidden="true"
            />

            <div className="relative space-y-5 sm:space-y-6">
              <h2 className={cn(
                "font-display font-bold text-balance",
                "text-2xl sm:text-3xl md:text-4xl lg:text-5xl",
                "text-white"
              )}>
                {t('cta.title')}
              </h2>

              <p className={cn(
                "text-white/60 text-base sm:text-lg lg:text-xl leading-relaxed text-balance",
                "max-w-2xl mx-auto"
              )}>
                {t('cta.subtitle')}
              </p>

              <div className="pt-4 sm:pt-6">
                <Link href={`/${locale}/contact`}>
                  <button
                    className={cn(
                      "group relative inline-flex items-center gap-3",
                      "px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6",
                      "rounded-full",
                      "bg-gradient-to-r from-gold via-gold-light to-gold text-black",
                      "font-semibold text-base sm:text-lg",
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

              <div className="pt-4 sm:pt-6">
                <p className="text-white/35 text-xs uppercase tracking-wider mb-2">
                  {t('cta.emailLabel')}
                </p>
                <a
                  href={`mailto:${t('cta.email')}`}
                  className="text-white/50 hover:text-gold/80 text-sm sm:text-base"
                >
                  {t('cta.email')}
                </a>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}
