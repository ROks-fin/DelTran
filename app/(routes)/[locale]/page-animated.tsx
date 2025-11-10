'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';
import { AnimatedSection, StaggerContainer, StaggerItem } from '@/app/lib/components/animated/AnimatedSection';
import { AnimatedText, AnimatedHeading } from '@/app/lib/components/animated/AnimatedText';
import { MagneticButton } from '@/app/lib/components/animated/MagneticButton';
import { AnimatedCard } from '@/app/lib/components/animated/AnimatedCard';

export default function HomePage() {
  const t = useTranslations('home');

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section with Premium Animations */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

        {/* Animated background elements with parallax */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
          />
          <motion.div
            className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl"
            animate={{
              scale: [1.2, 1, 1.2],
              opacity: [0.6, 0.3, 0.6],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
          />
        </div>

        <div className="relative container mx-auto px-6 py-32 text-center">
          <StaggerContainer staggerDelay={0.15} initialDelay={0.2}>
            {/* Badge with premium animation */}
            <StaggerItem>
              <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gold/20 to-gold-light/20 border border-gold/40 backdrop-blur-sm">
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                >
                  <Sparkles className="w-5 h-5 text-gold mr-2" />
                </motion.div>
                <span className="text-gold text-sm font-semibold uppercase tracking-wider">
                  {t('hero.badge')}
                </span>
              </div>
            </StaggerItem>

            {/* Main heading with word-by-word animation */}
            <StaggerItem>
              <AnimatedText
                animation="wordByWord"
                stagger={0.08}
                scrollTrigger={false}
                as="h1"
                className="text-5xl md:text-7xl lg:text-8xl font-bold"
              >
                {t('hero.title')} {t('hero.titleAccent')}
              </AnimatedText>
            </StaggerItem>

            {/* Subtitle */}
            <StaggerItem>
              <AnimatedText
                animation="fadeIn"
                scrollTrigger={false}
                as="p"
                className="text-2xl md:text-3xl text-white/90 font-semibold max-w-4xl mx-auto mt-8"
              >
                {t('hero.subtitle')}
              </AnimatedText>
            </StaggerItem>

            {/* Description */}
            <StaggerItem>
              <AnimatedText
                animation="slideUp"
                scrollTrigger={false}
                as="p"
                className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed mt-6"
              >
                {t('hero.description')}
              </AnimatedText>
            </StaggerItem>

            {/* CTA with magnetic effect */}
            <StaggerItem>
              <div className="flex justify-center pt-8">
                <Link href="/contact">
                  <MagneticButton
                    magnetStrength={0.4}
                    magnetRadius={120}
                    hoverScale={1.08}
                    ripple={true}
                    pulse={true}
                    className="px-12 py-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl shadow-lg"
                  >
                    <span className="flex items-center">
                      {t('hero.cta')}
                      <ArrowRight className="ml-3 w-6 h-6" />
                    </span>
                  </MagneticButton>
                </Link>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* Problem Statement */}
      <AnimatedSection animation="fadeInUp" className="py-32 relative bg-gradient-to-b from-black to-midnight">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-4xl mx-auto">
            <AnimatedText animation="wordByWord" stagger={0.05} as="h2" className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('problem.title')}
            </AnimatedText>
            <AnimatedText animation="gradient" as="p" className="text-2xl font-light italic mb-8">
              {t('problem.subtitle')}
            </AnimatedText>
            <AnimatedText animation="fadeIn" delay={0.3} as="p" className="text-xl md:text-2xl text-white/70 leading-relaxed">
              {t('problem.description')}
            </AnimatedText>
          </div>
        </div>
      </AnimatedSection>

      {/* Solution */}
      <AnimatedSection animation="scaleIn" className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="text-center max-w-5xl mx-auto">
            <AnimatedCard tilt3D={true} glowEffect={true} glowColor="rgba(212, 175, 55, 0.4)">
              <Card gradient className="p-12 md:p-16">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t('solution.title')}
                </h2>
                <p className="text-xl text-gold mb-6 font-semibold">
                  {t('solution.subtitle')}
                </p>
                <p className="text-xl text-white/70 leading-relaxed">
                  {t('solution.description')}
                </p>
              </Card>
            </AnimatedCard>
          </div>
        </div>
      </AnimatedSection>

      {/* Value Propositions with 3D Cards */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fadeInUp">
            <SectionHeading title={t('valueProps.title')} className="mb-20" />
          </AnimatedSection>

          <StaggerContainer staggerDelay={0.15} className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { key: 'instant', icon: Zap },
              { key: 'capital', icon: TrendingUp },
              { key: 'compliance', icon: Shield }
            ].map((feature) => (
              <StaggerItem key={feature.key}>
                <AnimatedCard
                  tilt3D={true}
                  tiltIntensity={8}
                  hoverLift={true}
                  liftDistance={-15}
                  glowEffect={true}
                >
                  <Card gradient className="p-10 h-full">
                    <motion.div
                      className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-6"
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.6 }}
                    >
                      <feature.icon className="w-8 h-8 text-gold" />
                    </motion.div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      {t(`valueProps.${feature.key}.title`)}
                    </h3>
                    <p className="text-white/70 text-lg mb-6 text-center leading-relaxed">
                      {t(`valueProps.${feature.key}.description`)}
                    </p>
                    <div className="pt-4 border-t border-white/10 text-center">
                      <div className="flex items-center justify-center gap-2">
                        <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
                        <p className="text-gold font-medium">
                          {t(`valueProps.${feature.key}.impact`)}
                        </p>
                      </div>
                    </div>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fadeInUp">
            <SectionHeading
              title={t('howItWorks.title')}
              subtitle={t('howItWorks.subtitle')}
              className="mb-20"
            />
          </AnimatedSection>

          <StaggerContainer staggerDelay={0.12} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {['step1', 'step2', 'step3', 'step4'].map((step, index) => (
              <StaggerItem key={step} className="relative">
                <AnimatedCard hoverLift={true} liftDistance={-12}>
                  <Card className="p-8 h-full border-gold/30">
                    <motion.div
                      className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black font-bold text-2xl mb-6"
                      whileHover={{ scale: 1.2, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      {index + 1}
                    </motion.div>
                    <h3 className="text-xl font-bold text-white mb-3">
                      {t(`howItWorks.${step}.title`)}
                    </h3>
                    <p className="text-white/70 leading-relaxed">
                      {t(`howItWorks.${step}.description`)}
                    </p>
                  </Card>
                </AnimatedCard>
                {index < 3 && (
                  <motion.div
                    className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gold/30"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 + 0.5, duration: 0.5 }}
                  />
                )}
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Metrics with Counter Animation */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fadeInUp">
            <SectionHeading
              title={t('metrics.title')}
              subtitle={t('metrics.subtitle')}
              className="mb-20"
            />
          </AnimatedSection>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { key: 'tps' },
              { key: 'latency' },
              { key: 'netting' },
              { key: 'finality' }
            ].map((metric) => (
              <StaggerItem key={metric.key}>
                <AnimatedCard tilt3D={true} tiltIntensity={5} glowEffect={true}>
                  <Card className="p-6 md:p-8 h-full bg-gradient-to-br from-gold/5 to-transparent border-gold/30">
                    <div className="text-xs md:text-sm text-gold uppercase tracking-wider mb-2 md:mb-3 font-semibold text-center">
                      {t(`metrics.${metric.key}.label`)}
                    </div>
                    <motion.div
                      className="mb-2 md:mb-3 flex items-baseline justify-center gap-1 md:gap-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ type: 'spring', stiffness: 200, damping: 15, delay: 0.2 }}
                    >
                      <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
                        {t(`metrics.${metric.key}.value`)}
                      </span>
                      <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
                        {t(`metrics.${metric.key}.unit`)}
                      </span>
                    </motion.div>
                    <p className="text-white/60 text-xs md:text-sm text-center">
                      {t(`metrics.${metric.key}.detail`)}
                    </p>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Why Banks Choose DelTran */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <AnimatedSection animation="fadeInUp">
            <SectionHeading title={t('why.title')} className="mb-20" />
          </AnimatedSection>

          <StaggerContainer staggerDelay={0.1} className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {(t.raw('why.reasons') as Array<{title: string, description: string}>).map((reason, index) => (
              <StaggerItem key={index}>
                <AnimatedCard hoverLift={true} liftDistance={-10}>
                  <Card className="p-10 h-full border-gold/20">
                    <div className="flex items-start gap-4 mb-4">
                      <motion.div
                        className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0"
                        whileHover={{ rotate: 360 }}
                        transition={{ duration: 0.4 }}
                      >
                        <CheckCircle2 className="w-6 h-6 text-gold" />
                      </motion.div>
                      <h3 className="text-2xl font-bold text-white pt-1">
                        {reason.title}
                      </h3>
                    </div>
                    <p className="text-white/70 text-lg leading-relaxed pl-14">
                      {reason.description}
                    </p>
                  </Card>
                </AnimatedCard>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Contact CTA Section */}
      <AnimatedSection animation="scaleIn" className="py-32 relative bg-gradient-to-b from-black via-midnight to-black">
        <div className="container mx-auto px-6">
          <AnimatedCard tilt3D={true} tiltIntensity={3} glowEffect={true} glowColor="rgba(212, 175, 55, 0.5)">
            <Card className="p-16 md:p-24 text-center bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border-gold/50">
              <div className="space-y-8">
                <AnimatedText animation="wordByWord" stagger={0.06} as="h2" className="text-4xl md:text-6xl font-bold text-white">
                  {t('contact.title')}
                </AnimatedText>
                <AnimatedText animation="fadeIn" delay={0.3} as="p" className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                  {t('contact.subtitle')}
                </AnimatedText>

                <div className="flex flex-col items-center gap-6 pt-6">
                  <Link href="/contact">
                    <MagneticButton
                      magnetStrength={0.5}
                      magnetRadius={150}
                      hoverScale={1.1}
                      ripple={true}
                      pulse={true}
                      className="inline-flex items-center px-12 py-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl"
                    >
                      <span className="flex items-center">
                        {t('cta.button')}
                        <ArrowRight className="ml-3 w-6 h-6" />
                      </span>
                    </MagneticButton>
                  </Link>

                  <div className="text-center pt-4">
                    <p className="text-white/50 text-sm mb-3 uppercase tracking-wider">
                      {t('contact.directContact')}
                    </p>
                    <motion.a
                      href="mailto:contact@deltran.ai"
                      className="text-gold hover:text-gold-light transition-colors text-2xl font-semibold"
                      whileHover={{ scale: 1.05 }}
                      transition={{ type: 'spring', stiffness: 400 }}
                    >
                      {t('contact.email')}
                    </motion.a>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedCard>
        </div>
      </AnimatedSection>
    </div>
  );
}
