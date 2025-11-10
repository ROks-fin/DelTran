'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Shield, Zap, TrendingUp, ArrowRight, ArrowLeft, CheckCircle2, Sparkles } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';
import { useTextDirection } from '@/app/lib/hooks/useTextDirection';

export default function HomePage() {
  const t = useTranslations('home');
  const { isRTL } = useTextDirection();

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative container mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gold/20 to-gold-light/20 border border-gold/40 backdrop-blur-sm"
            >
              <Sparkles className="w-5 h-5 text-gold mr-2" />
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">
                {t('hero.badge')}
              </span>
            </motion.div>

            {/* Main heading */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold"
            >
              <span className="block text-white">{t('hero.title')}</span>
              <span className="block text-gradient mt-2">{t('hero.titleAccent')}</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-2xl md:text-3xl text-white/90 font-semibold max-w-4xl mx-auto"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              {t('hero.description')}
            </motion.p>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="flex justify-center pt-4"
            >
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="group px-12 py-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-300 flex items-center"
                >
                  {t('hero.cta')}
                  {isRTL ? (
                    <ArrowLeft className="mr-3 w-6 h-6 group-hover:-translate-x-1 transition-transform" />
                  ) : (
                    <ArrowRight className="ml-3 w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  )}
                </motion.button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Problem Statement */}
      <section className="py-32 relative bg-gradient-to-b from-black to-midnight">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-4xl mx-auto"
          >
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
              {t('problem.title')}
            </h2>
            <p className="text-2xl text-gold font-light italic mb-8">
              {t('problem.subtitle')}
            </p>
            <p className="text-xl md:text-2xl text-white/70 leading-relaxed">
              {t('problem.description')}
            </p>
          </motion.div>
        </div>
      </section>

      {/* Solution */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center max-w-5xl mx-auto"
          >
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
          </motion.div>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('valueProps.title')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              { key: 'instant', icon: Zap },
              { key: 'capital', icon: TrendingUp },
              { key: 'compliance', icon: Shield }
            ].map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card gradient className="p-10 h-full hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300">
                  <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-6">
                    <feature.icon className="w-8 h-8 text-gold" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-4 text-center">
                    {t(`valueProps.${feature.key}.title`)}
                  </h3>
                  <p className="text-white/70 text-lg mb-6 text-center leading-relaxed">
                    {t(`valueProps.${feature.key}.description`)}
                  </p>
                  <div className="pt-4 border-t border-white/10 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {isRTL ? (
                        <ArrowLeft className="w-5 h-5 text-gold flex-shrink-0" />
                      ) : (
                        <ArrowRight className="w-5 h-5 text-gold flex-shrink-0" />
                      )}
                      <p className="text-gold font-medium">
                        {t(`valueProps.${feature.key}.impact`)}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('howItWorks.title')}
            subtitle={t('howItWorks.subtitle')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
            {['step1', 'step2', 'step3', 'step4'].map((step, index) => (
              <motion.div
                key={step}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="relative"
              >
                <Card className="p-8 h-full border-gold/30 hover:border-gold/50 transition-all duration-300">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black font-bold text-2xl mb-6">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-bold text-white mb-3">
                    {t(`howItWorks.${step}.title`)}
                  </h3>
                  <p className="text-white/70 leading-relaxed">
                    {t(`howItWorks.${step}.description`)}
                  </p>
                </Card>
                {index < 3 && (
                  <div className="hidden lg:block absolute top-1/2 -right-3 w-6 h-0.5 bg-gold/30" />
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('metrics.title')}
            subtitle={t('metrics.subtitle')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              { key: 'tps' },
              { key: 'latency' },
              { key: 'netting' },
              { key: 'finality' }
            ].map((metric, index) => (
              <motion.div
                key={metric.key}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-6 md:p-8 h-full bg-gradient-to-br from-gold/5 to-transparent border-gold/30">
                  <div className="text-xs md:text-sm text-gold uppercase tracking-wider mb-2 md:mb-3 font-semibold text-center">
                    {t(`metrics.${metric.key}.label`)}
                  </div>
                  <div className="mb-2 md:mb-3 flex items-baseline justify-center gap-1 md:gap-2">
                    <span className="text-3xl sm:text-4xl md:text-5xl font-bold text-gradient">
                      {t(`metrics.${metric.key}.value`)}
                    </span>
                    <span className="text-xl sm:text-2xl md:text-3xl font-bold text-gradient">
                      {t(`metrics.${metric.key}.unit`)}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs md:text-sm text-center">
                    {t(`metrics.${metric.key}.detail`)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Banks Choose DelTran */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('why.title')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {(t.raw('why.reasons') as Array<{title: string, description: string}>).map((reason, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-10 h-full border-gold/20 hover:border-gold/40 transition-all duration-300">
                  <div className="flex items-start gap-4 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <CheckCircle2 className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-white pt-1">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-white/70 text-lg leading-relaxed pl-14">
                    {reason.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA Section */}
      <section className="py-32 relative bg-gradient-to-b from-black via-midnight to-black">
        <div className="container mx-auto px-6">
          <Card className="p-16 md:p-24 text-center bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border-gold/50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                {t('contact.title')}
              </h2>
              <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                {t('contact.subtitle')}
              </p>

              <div className="flex flex-col items-center gap-6 pt-6">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="inline-flex items-center px-12 py-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition-all duration-300"
                  >
                    {t('cta.button')}
                    {isRTL ? (
                      <ArrowLeft className="mr-3 w-6 h-6" />
                    ) : (
                      <ArrowRight className="ml-3 w-6 h-6" />
                    )}
                  </motion.button>
                </Link>

                <div className="text-center pt-4">
                  <p className="text-white/50 text-sm mb-3 uppercase tracking-wider">
                    {t('contact.directContact')}
                  </p>
                  <a
                    href="mailto:contact@deltran.ai"
                    className="text-gold hover:text-gold-light transition-colors text-2xl font-semibold"
                  >
                    {t('contact.email')}
                  </a>
                </div>
              </div>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
}
