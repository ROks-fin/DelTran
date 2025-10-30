'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { DollarSign, Cpu, Shield, CheckCircle, ArrowRight, Building2, Globe, Award, Sparkles } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';

export default function BanksPage() {
  const t = useTranslations('banks');

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
              className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-emerald-500/20 to-gold/20 border border-emerald-500/40 backdrop-blur-sm"
            >
              <Building2 className="w-5 h-5 text-emerald-400 mr-2" />
              <span className="text-emerald-400 text-sm font-semibold uppercase tracking-wider">
                {t('hero.badge')}
              </span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold text-white">
              {t('hero.title')}
            </h1>

            <p className="text-2xl md:text-3xl text-white/90 max-w-4xl mx-auto leading-relaxed font-semibold">
              {t('hero.subtitle')}
            </p>

            <p className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed">
              {t('hero.description')}
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

      {/* ADGM Section */}
      <section className="py-32 relative bg-gradient-to-b from-black to-midnight">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('adgm.title')}
            subtitle={t('adgm.subtitle')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {(t.raw('adgm.benefits') as Array<{title: string, description: string}>).map((benefit, index) => {
              const icons = [Award, Globe, Shield];
              const Icon = icons[index];

              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-10 h-full bg-gradient-to-br from-emerald-500/10 to-gold/5 border-emerald-500/30 hover:border-emerald-500/50 transition-all duration-300">
                    <div className="w-16 h-16 rounded-2xl bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                      <Icon className="w-8 h-8 text-emerald-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4 text-center">
                      {benefit.title}
                    </h3>
                    <p className="text-white/70 text-lg text-center leading-relaxed">
                      {benefit.description}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Department Benefits */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('benefits.title')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {[
              { key: 'cfo', icon: DollarSign },
              { key: 'cto', icon: Cpu },
              { key: 'cro', icon: Shield },
              { key: 'cco', icon: CheckCircle }
            ].map((dept, index) => (
              <motion.div
                key={dept.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card gradient className="p-10 h-full hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <dept.icon className="w-7 h-7 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-2">
                        {t(`benefits.${dept.key}.title`)}
                      </h3>
                      <p className="text-gold text-sm font-semibold">
                        {t(`benefits.${dept.key}.description`)}
                      </p>
                    </div>
                  </div>

                  <ul className="space-y-3">
                    {(t.raw(`benefits.${dept.key}.items`) as string[]).map((item, i) => (
                      <li key={i} className="flex items-start gap-3">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
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

      {/* Use Cases */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('useCases.title')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {['international', 'multicurrency', 'correspondent'].map((useCase, index) => (
              <motion.div
                key={useCase}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full border-gold/30 hover:border-gold/50 transition-all duration-300">
                  <h3 className="text-2xl font-bold text-white mb-4">
                    {t(`useCases.${useCase}.title`)}
                  </h3>
                  <p className="text-white/70 text-lg leading-relaxed">
                    {t(`useCases.${useCase}.description`)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="p-12 md:p-16 bg-gradient-to-br from-gold/10 to-gold/5 border-gold/30">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t('integration.title')}
                </h2>
                <p className="text-2xl text-white/70 leading-relaxed">
                  {t('integration.description')}
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                {(t.raw('integration.items') as string[]).map((item, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <CheckCircle className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                    <span className="text-white/80 text-lg leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
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
