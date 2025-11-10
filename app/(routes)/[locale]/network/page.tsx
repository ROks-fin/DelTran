'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Globe, Network, TrendingUp, Zap, ArrowRight, ArrowLeft, Building2, Users, MapPin, Target, Shield, CheckCircle2 } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';
import { useTextDirection } from '@/app/lib/hooks/useTextDirection';
import { RegulatoryTimeline } from '@/app/components/network/RegulatoryTimeline';

export default function NetworkPage() {
  const t = useTranslations('network');
  const { isRTL } = useTextDirection();

  const DirectionalArrow = ({ className }: { className?: string }) =>
    isRTL ? <ArrowLeft className={className} /> : <ArrowRight className={className} />;

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

        <div className="relative container mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gold/20 to-gold-light/20 border border-gold/40 backdrop-blur-sm"
            >
              <Globe className="w-5 h-5 text-gold mr-2" />
              <span className="text-gold text-sm font-semibold uppercase tracking-wider">
                {t('hero.badge')}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight"
            >
              <span className="block text-white">{t('hero.title')}</span>
              <span className="block text-gradient mt-2">{t('hero.titleAccent')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* The Network Effect Section */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('networkEffect.title')}
            subtitle={t('networkEffect.subtitle')}
            className="mb-20"
          />

          <div className="max-w-5xl mx-auto">
            {/* Visual Representation */}
            <div className="mb-16 relative">
              <Card className="p-12 bg-gradient-to-br from-gold/10 via-transparent to-gold/5 border-gold/30">
                <div className="grid md:grid-cols-3 gap-8 text-center">
                  {/* Stage 1 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.1 }}
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gold/20 flex items-center justify-center border-2 border-gold/40">
                        <span className="text-4xl font-bold text-gold">{t('networkEffect.stage1.number')}</span>
                      </div>
                      <Network className="absolute top-0 right-1/4 w-6 h-6 text-gold/60" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{t('networkEffect.stage1.title')}</h4>
                    <p className="text-white/60">{t('networkEffect.stage1.description')}</p>
                  </motion.div>

                  {/* Stage 2 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.2 }}
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gold/30 flex items-center justify-center border-2 border-gold/50">
                        <span className="text-4xl font-bold text-gold">{t('networkEffect.stage2.number')}</span>
                      </div>
                      <Network className="absolute top-0 right-1/4 w-8 h-8 text-gold/70 animate-pulse" />
                      <Network className="absolute bottom-0 left-1/4 w-8 h-8 text-gold/70 animate-pulse" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{t('networkEffect.stage2.title')}</h4>
                    <p className="text-white/60">{t('networkEffect.stage2.description')}</p>
                  </motion.div>

                  {/* Stage 3 */}
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3 }}
                  >
                    <div className="relative mb-6">
                      <div className="w-24 h-24 mx-auto rounded-full bg-gold/40 flex items-center justify-center border-2 border-gold animate-glow">
                        <span className="text-4xl font-bold text-gold">{t('networkEffect.stage3.number')}</span>
                      </div>
                      <Network className="absolute top-0 right-1/4 w-10 h-10 text-gold animate-pulse" />
                      <Network className="absolute bottom-0 left-1/4 w-10 h-10 text-gold animate-pulse" />
                      <Network className="absolute top-1/2 left-0 w-10 h-10 text-gold animate-pulse" />
                    </div>
                    <h4 className="text-xl font-bold text-white mb-2">{t('networkEffect.stage3.title')}</h4>
                    <p className="text-white/60">{t('networkEffect.stage3.description')}</p>
                  </motion.div>
                </div>

                {/* Arrow showing progression */}
                <div className="hidden md:flex absolute top-1/3 left-0 right-0 items-center justify-center pointer-events-none">
                  <DirectionalArrow className="w-12 h-12 text-gold/30 mx-4" />
                  <DirectionalArrow className="w-12 h-12 text-gold/30 mx-4" />
                </div>
              </Card>
            </div>

            {/* Network Mechanics */}
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="p-8 border-gold/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <TrendingUp className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{t('networkEffect.exponential.title')}</h4>
                    <p className="text-white/70 leading-relaxed">
                      {t('networkEffect.exponential.description')}
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-8 border-gold/20">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-12 h-12 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0">
                    <Zap className="w-6 h-6 text-gold" />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2">{t('networkEffect.netting.title')}</h4>
                    <p className="text-white/70 leading-relaxed">
                      {t('networkEffect.netting.description')}
                    </p>
                  </div>
                </div>
              </Card>
            </div>

            {/* Call to action */}
            <div className="text-center">
              <p className="text-xl text-white/80 mb-6">
                {t('networkEffect.cta')}
              </p>
              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  className="px-8 py-4 rounded-xl bg-gold/10 border-2 border-gold/50 text-gold font-semibold hover:bg-gold/20 transition-all"
                >
                  {t('networkEffect.button')}
                </motion.button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Global Expansion Roadmap */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('expansion.title')}
            subtitle={t('expansion.subtitle')}
            className="mb-20"
          />

          <div className="max-w-6xl mx-auto mb-16">
            <Card className="p-12 bg-gradient-to-br from-gold/5 to-transparent border-gold/20">
              <div className="text-center mb-12">
                <Globe className="w-16 h-16 text-gold mx-auto mb-4" />
                <h3 className="text-3xl font-bold text-white mb-4">
                  {t('expansion.parallel.title')}
                </h3>
                <p className="text-xl text-white/70 max-w-3xl mx-auto">
                  {t('expansion.description')}
                </p>
              </div>

              {/* Regional Expansion Phases */}
              <div className="grid md:grid-cols-3 gap-6">
                {/* Phase 1: MENA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="relative"
                >
                  <div className="p-6 rounded-xl bg-gold/10 border border-gold/30">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center text-black font-bold">
                        {t('expansion.mena.number')}
                      </div>
                      <h4 className="text-lg font-bold text-white">{t('expansion.mena.title')}</h4>
                    </div>
                    <div className="space-y-2 text-sm text-white/70">
                      <p><strong className="text-white">{t('expansion.labels.target')}</strong> {t('expansion.mena.target')}</p>
                      <p><strong className="text-white">{t('expansion.labels.markets')}</strong> {t('expansion.mena.markets')}</p>
                      <p>{t('expansion.mena.description')}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Phase 2: Europe */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="relative"
                >
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                        {t('expansion.europe.number')}
                      </div>
                      <h4 className="text-lg font-bold text-white">{t('expansion.europe.title')}</h4>
                    </div>
                    <div className="space-y-2 text-sm text-white/70">
                      <p><strong className="text-white">{t('expansion.labels.target')}</strong> {t('expansion.europe.target')}</p>
                      <p><strong className="text-white">{t('expansion.labels.markets')}</strong> {t('expansion.europe.markets')}</p>
                      <p>{t('expansion.europe.description')}</p>
                    </div>
                  </div>
                </motion.div>

                {/* Phase 3: Asia */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="relative"
                >
                  <div className="p-6 rounded-xl bg-white/5 border border-white/10">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center text-white font-bold">
                        {t('expansion.asia.number')}
                      </div>
                      <h4 className="text-lg font-bold text-white">{t('expansion.asia.title')}</h4>
                    </div>
                    <div className="space-y-2 text-sm text-white/70">
                      <p><strong className="text-white">{t('expansion.labels.target')}</strong> {t('expansion.asia.target')}</p>
                      <p><strong className="text-white">{t('expansion.labels.markets')}</strong> {t('expansion.asia.markets')}</p>
                      <p>{t('expansion.asia.description')}</p>
                    </div>
                  </div>
                </motion.div>
              </div>

              {/* Additional phases */}
              <div className="mt-8 pt-8 border-white/10">
                <div className="grid md:grid-cols-2 gap-4 text-sm">
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                    <span><strong className="text-white">{t('expansion.future.phase4.label')}</strong> {t('expansion.future.phase4.description')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                    <span><strong className="text-white">{t('expansion.future.phase5.label')}</strong> {t('expansion.future.phase5.description')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                    <span><strong className="text-white">{t('expansion.future.phase6.label')}</strong> {t('expansion.future.phase6.description')}</span>
                  </div>
                  <div className="flex items-center gap-3 text-white/60">
                    <MapPin className="w-5 h-5 text-gold flex-shrink-0" />
                    <span><strong className="text-white">{t('expansion.future.phase7.label')}</strong> {t('expansion.future.phase7.description')}</span>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Why This Approach Works */}
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <Card className="p-8 border-gold/20">
              <Building2 className="w-12 h-12 text-gold mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">{t('expansion.regulatoryFirst.title')}</h4>
              <p className="text-white/70 leading-relaxed">
                {t('expansion.regulatoryFirst.description')}
              </p>
            </Card>

            <Card className="p-8 border-gold/20">
              <Users className="w-12 h-12 text-gold mb-4" />
              <h4 className="text-xl font-bold text-white mb-3">{t('expansion.partnerships.title')}</h4>
              <p className="text-white/70 leading-relaxed">
                {t('expansion.partnerships.description')}
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Regulatory Timeline Section */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <RegulatoryTimeline />

          {/* Important Disclosure */}
          <div className="mt-16 max-w-4xl mx-auto">
            <Card className="p-8 bg-white/5 border border-white/10">
              <div className="flex items-start gap-4">
                <Shield className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                <div>
                  <h4 className="text-lg font-bold text-white mb-2">{t('regulatory.disclaimerCard.title')}</h4>
                  <p className="text-sm text-white/60 leading-relaxed">
                    {t('regulatory.disclaimerCard.content')}
                  </p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <Card className="p-16 md:p-24 text-center bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border-gold/50">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-6xl font-bold text-white">
                {t('cta.title')}
              </h2>
              <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                {t('cta.description')}
              </p>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6 pt-6">
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
              </div>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
}
