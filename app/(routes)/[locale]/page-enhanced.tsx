'use client';

/**
 * Enhanced Homepage with Ultra-Premium Animations
 * Fully responsive design optimized for all devices (mobile to 8K)
 */

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Shield, Zap, TrendingUp, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';
import { useTextDirection } from '@/app/lib/hooks/useTextDirection';
import { ScrollReveal, StaggerReveal, StaggerItem, FloatingElement, PulsingGlow } from '@/app/components/animations';

export default function HomePage() {
  const t = useTranslations('home');
  const { isRTL } = useTextDirection();
  const { scrollYProgress } = useScroll();

  // Hero parallax effects
  const heroOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.3], [1, 0.95]);

  return (
    <div className="relative overflow-hidden gpu-layer">
      {/* Hero Section with Advanced Parallax */}
      <motion.section
        className="relative min-h-screen flex items-center justify-center"
        style={{ opacity: heroOpacity, scale: heroScale }}
      >
        {/* Background gradients */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

        {/* Floating animated background orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <FloatingElement speed="slow" amplitude={30} className="absolute top-1/4 left-1/4">
            <PulsingGlow intensity={60} duration={3}>
              <div className="w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gold/5 rounded-full blur-3xl" />
            </PulsingGlow>
          </FloatingElement>

          <FloatingElement speed="normal" amplitude={25} className="absolute bottom-1/4 right-1/4">
            <PulsingGlow intensity={50} duration={4}>
              <div className="w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gold/5 rounded-full blur-3xl" />
            </PulsingGlow>
          </FloatingElement>

          <FloatingElement speed="fast" amplitude={20} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
            <div className="w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-gold/3 rounded-full blur-3xl" />
          </FloatingElement>
        </div>

        {/* Hero Content - Fully Responsive */}
        <div className="relative container mx-auto px-4 sm:px-6 py-20 sm:py-32 text-center safe-top safe-bottom">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="space-y-6 sm:space-y-8"
          >
            {/* Premium Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 sm:px-6 py-2 sm:py-3 rounded-full bg-gradient-to-r from-gold/20 to-gold-light/20 border border-gold/40 backdrop-blur-sm shimmer-overlay overflow-hidden"
            >
              <Sparkles className="w-4 sm:w-5 h-4 sm:h-5 text-gold mr-2" />
              <span className="text-gold text-xs sm:text-sm font-semibold uppercase tracking-wider">
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Main Heading - Fluid Typography */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="fluid-text-5xl lg:text-7xl xl:text-8xl 2k:text-[7rem] 4k:text-[10rem] font-bold text-balance"
            >
              <span className="block text-white">{t('hero.title')}</span>
              <span className="block text-gradient mt-2">{t('hero.titleAccent')}</span>
            </motion.h1>

            {/* Subtitle - Responsive */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="fluid-text-lg md:text-2xl lg:text-3xl 2k:text-4xl text-white/90 font-semibold max-w-4xl mx-auto text-balance"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Description - Responsive */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="fluid-text-base md:text-xl lg:text-2xl 2k:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed text-balance"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA Button - Responsive & Magnetic */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center pt-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-8 sm:px-12 py-4 sm:py-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-base sm:text-xl hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-300 flex items-center gap-2 sm:gap-3 card-3d shimmer-overlay overflow-hidden touch-device"
                >
                  <span>{t('hero.cta')}</span>
                  {isRTL ? (
                    <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6 group-hover:translate-x-1 transition-transform" />
                  )}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </motion.section>

      {/* Problem Statement - Scroll Reveal */}
      <section className="py-16 sm:py-24 lg:py-32 relative bg-gradient-to-b from-black to-midnight">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="fluid-text-4xl md:text-5xl lg:text-6xl 2k:text-7xl font-bold text-white mb-4 sm:mb-6 text-balance">
                {t('problem.title')}
              </h2>
              <p className="fluid-text-xl md:text-2xl 2k:text-3xl text-gold font-light italic mb-6 sm:mb-8">
                {t('problem.subtitle')}
              </p>
              <p className="fluid-text-base md:text-xl lg:text-2xl 2k:text-3xl text-white/70 leading-relaxed text-balance">
                {t('problem.description')}
              </p>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Solution - Enhanced Card */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <Card gradient className="p-8 sm:p-12 md:p-16 card-3d">
              <h2 className="fluid-text-3xl md:text-4xl lg:text-5xl 2k:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance">
                {t('solution.title')}
              </h2>
              <p className="fluid-text-lg md:text-xl 2k:text-2xl text-gold mb-4 sm:mb-6 font-semibold">
                {t('solution.subtitle')}
              </p>
              <p className="fluid-text-base md:text-xl 2k:text-2xl text-white/70 leading-relaxed text-balance">
                {t('solution.description')}
              </p>
            </Card>
          </ScrollReveal>
        </div>
      </section>

      {/* Value Propositions - Stagger Animation */}
      <section className="py-16 sm:py-24 lg:py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionHeading
              title={t('valueProps.title')}
              className="mb-12 sm:mb-20"
            />
          </ScrollReveal>

          <StaggerReveal staggerDelay={0.15} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {[
              { key: 'instant', icon: Zap },
              { key: 'capital', icon: TrendingUp },
              { key: 'compliance', icon: Shield }
            ].map((feature) => (
              <StaggerItem key={feature.key}>
                <Card gradient className="p-6 sm:p-10 h-full hover-glow hover-lift card-3d transition-all duration-300">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-4 sm:mb-6">
                    <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-gold" />
                  </div>
                  <h3 className="fluid-text-xl md:text-2xl 2k:text-3xl font-bold text-white mb-3 sm:mb-4 text-center">
                    {t(`valueProps.${feature.key}.title`)}
                  </h3>
                  <p className="text-white/70 fluid-text-base md:text-lg 2k:text-xl mb-4 sm:mb-6 text-center leading-relaxed">
                    {t(`valueProps.${feature.key}.description`)}
                  </p>
                  <div className="pt-3 sm:pt-4 border-t border-white/10 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {isRTL ? (
                        <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 text-gold flex-shrink-0" />
                      ) : (
                        <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-gold flex-shrink-0" />
                      )}
                      <p className="text-gold font-medium fluid-text-sm md:text-base">
                        {t(`valueProps.${feature.key}.impact`)}
                      </p>
                    </div>
                  </div>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* How It Works - Grid with Stagger */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionHeading
              title={t('howItWorks.title')}
              subtitle={t('howItWorks.subtitle')}
              className="mb-12 sm:mb-20"
            />
          </ScrollReveal>

          <StaggerReveal staggerDelay={0.1} className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {['step1', 'step2', 'step3', 'step4'].map((step, index) => (
              <StaggerItem key={step}>
                <Card className="p-6 sm:p-8 h-full border-gold/30 hover:border-gold/50 transition-all duration-300 card-3d">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black font-bold text-xl sm:text-2xl mb-4 sm:mb-6 animate-glow-pulse">
                    {index + 1}
                  </div>
                  <h3 className="fluid-text-lg md:text-xl 2k:text-2xl font-bold text-white mb-2 sm:mb-3">
                    {t(`howItWorks.${step}.title`)}
                  </h3>
                  <p className="text-white/70 fluid-text-sm md:text-base 2k:text-lg leading-relaxed">
                    {t(`howItWorks.${step}.description`)}
                  </p>
                </Card>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gold/30" />
                )}
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Metrics - Responsive Cards */}
      <section className="py-16 sm:py-24 lg:py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionHeading
              title={t('metrics.title')}
              subtitle={t('metrics.subtitle')}
              className="mb-12 sm:mb-20"
            />
          </ScrollReveal>

          <StaggerReveal staggerDelay={0.1} className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {[
              { key: 'tps' },
              { key: 'latency' },
              { key: 'netting' },
              { key: 'finality' }
            ].map((metric) => (
              <StaggerItem key={metric.key}>
                <Card className="p-4 sm:p-6 md:p-8 h-full bg-gradient-to-br from-gold/5 to-transparent border-gold/30 hover-glow card-3d">
                  <div className="text-2xs sm:text-xs md:text-sm text-gold uppercase tracking-wider mb-2 sm:mb-3 font-semibold text-center">
                    {t(`metrics.${metric.key}.label`)}
                  </div>
                  <div className="mb-2 sm:mb-3 flex items-baseline justify-center gap-1 sm:gap-2">
                    <span className="text-2xl xs:text-3xl sm:text-4xl md:text-5xl 2k:text-6xl font-bold text-gradient">
                      {t(`metrics.${metric.key}.value`)}
                    </span>
                    <span className="text-lg xs:text-xl sm:text-2xl md:text-3xl 2k:text-4xl font-bold text-gradient">
                      {t(`metrics.${metric.key}.unit`)}
                    </span>
                  </div>
                  <p className="text-white/60 text-2xs sm:text-xs md:text-sm 2k:text-base text-center">
                    {t(`metrics.${metric.key}.detail`)}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Why Banks Choose DelTran */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal>
            <SectionHeading
              title={t('why.title')}
              className="mb-12 sm:mb-20"
            />
          </ScrollReveal>

          <StaggerReveal staggerDelay={0.1} className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {(t.raw('why.reasons') as Array<{title: string, description: string}>).map((reason, index) => (
              <StaggerItem key={index}>
                <Card className="p-6 sm:p-10 h-full border-gold/20 hover:border-gold/40 transition-all duration-300 card-3d hover-lift">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-gold" />
                    </div>
                    <h3 className="fluid-text-lg md:text-2xl 2k:text-3xl font-bold text-white pt-1">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-white/70 fluid-text-base md:text-lg 2k:text-xl leading-relaxed pl-11 sm:pl-14">
                    {reason.description}
                  </p>
                </Card>
              </StaggerItem>
            ))}
          </StaggerReveal>
        </div>
      </section>

      {/* Contact CTA - Premium Final Section */}
      <section className="py-16 sm:py-24 lg:py-32 relative bg-gradient-to-b from-black via-midnight to-black">
        <div className="container mx-auto px-4 sm:px-6">
          <ScrollReveal delay={0.2}>
            <Card className="p-10 sm:p-16 md:p-24 text-center bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border-gold/50 card-3d">
              <div className="space-y-6 sm:space-y-8">
                <h2 className="fluid-text-3xl md:text-4xl lg:text-6xl 2k:text-7xl font-bold text-white text-balance">
                  {t('contact.title')}
                </h2>
                <p className="fluid-text-lg md:text-2xl 2k:text-3xl text-white/70 max-w-3xl mx-auto leading-relaxed text-balance">
                  {t('contact.subtitle')}
                </p>

                <div className="flex flex-col items-center gap-6 pt-4 sm:pt-6">
                  <Link href="/contact">
                    <motion.button
                      whileHover={{ scale: 1.05, y: -3 }}
                      whileTap={{ scale: 0.95 }}
                      className="inline-flex items-center px-8 sm:px-12 py-4 sm:py-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-base sm:text-xl hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition-all duration-300 gap-2 sm:gap-3 shimmer-overlay overflow-hidden touch-device"
                    >
                      <span>{t('cta.button')}</span>
                      {isRTL ? (
                        <ArrowLeft className="w-5 sm:w-6 h-5 sm:h-6" />
                      ) : (
                        <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
                      )}
                    </motion.button>
                  </Link>

                  <div className="text-center pt-4">
                    <p className="text-white/50 text-xs sm:text-sm mb-3 uppercase tracking-wider">
                      {t('contact.directContact')}
                    </p>
                    <a
                      href="mailto:contact@deltran.ai"
                      className="text-gold hover:text-gold-light transition-colors fluid-text-lg md:text-2xl 2k:text-3xl font-semibold"
                    >
                      {t('contact.email')}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
