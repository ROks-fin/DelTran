'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Zap, Shield, TrendingUp, Code, CheckCircle2, ArrowRight, Sparkles, Download, FileCheck } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';

export default function PlatformPage() {
  const t = useTranslations('platform');

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

            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-white">
              {t('hero.title')}
            </h1>
            <p className="text-2xl md:text-3xl text-white/80 max-w-4xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-12 py-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-300"
              >
                {t('hero.cta')}
                <ArrowRight className="ml-3 w-6 h-6" />
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-32 relative bg-gradient-to-b from-black to-midnight">
        <div className="container mx-auto px-6">
          <Card className="p-12 md:p-16 max-w-5xl mx-auto bg-gradient-to-br from-gold/10 to-gold/5 border-gold/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="text-center"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-16">
                {t('mission.title')}
              </h2>

              <div className="grid md:grid-cols-3 gap-12">
                <div>
                  <h3 className="text-gold text-sm uppercase tracking-wider mb-4 font-bold">
                    Mission
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {t('mission.mission')}
                  </p>
                </div>

                <div>
                  <h3 className="text-gold text-sm uppercase tracking-wider mb-4 font-bold">
                    Vision
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {t('mission.vision')}
                  </p>
                </div>

                <div>
                  <h3 className="text-gold text-sm uppercase tracking-wider mb-4 font-bold">
                    Values
                  </h3>
                  <p className="text-white/80 text-lg leading-relaxed">
                    {t('mission.values')}
                  </p>
                </div>
              </div>
            </motion.div>
          </Card>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('capabilities.title')}
            subtitle={t('capabilities.subtitle')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { key: 'settlement', icon: Zap },
              { key: 'compliance', icon: FileCheck },
              { key: 'capital', icon: TrendingUp },
              { key: 'integration', icon: Code }
            ].map((capability, index) => (
              <motion.div
                key={capability.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card gradient className="p-10 h-full hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <capability.icon className="w-7 h-7 text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {t(`capabilities.${capability.key}.title`)}
                    </h3>
                  </div>

                  <p className="text-white/70 text-lg mb-6 leading-relaxed">
                    {t(`capabilities.${capability.key}.description`)}
                  </p>

                  <ul className="space-y-3">
                    {(t.raw(`capabilities.${capability.key}.items`) as string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle2 className="w-5 h-5 text-gold flex-shrink-0 mt-0.5" />
                        <span className="text-white/80 leading-relaxed">{item}</span>
                      </li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Big 4 Compliance Feature Highlight */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="p-16 md:p-20 text-center bg-gradient-to-br from-green-500/10 via-gold/10 to-gold/5 border-gold/40">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gold/20 mb-8">
                <Download className="w-10 h-10 text-gold" />
              </div>

              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                Big 4 Quality Compliance Reporting
              </h2>

              <p className="text-2xl text-white/80 mb-8 leading-relaxed">
                One button in your dashboard. Any audit report. Big 4 accounting firm quality.
              </p>

              <div className="grid md:grid-cols-3 gap-6 mt-12">
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-gold font-semibold mb-2">Zero Manual Work</h3>
                  <p className="text-white/70 text-sm">All compliance reporting automated</p>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-gold font-semibold mb-2">Audit-Ready</h3>
                  <p className="text-white/70 text-sm">Big 4 quality standards built-in</p>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10">
                  <h3 className="text-gold font-semibold mb-2">One-Click Export</h3>
                  <p className="text-white/70 text-sm">Download any report instantly</p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Architecture */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('architecture.title')}
            subtitle={t('architecture.subtitle')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {(t.raw('architecture.items') as Array<{title: string, description: string}>).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-10 h-full border-gold/30 hover:border-gold/50 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
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
                {t('cta.title')}
              </h2>
              <p className="text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
                {t('cta.subtitle')}
              </p>

              <Link href="/contact">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="inline-flex items-center px-12 py-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition-all duration-300"
                >
                  {t('cta.button')}
                  <ArrowRight className="ml-3 w-6 h-6" />
                </motion.button>
              </Link>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
}
