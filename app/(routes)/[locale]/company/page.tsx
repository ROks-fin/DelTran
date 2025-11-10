'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { Target, Heart, Shield, Zap, BookOpen, FileText, Briefcase, Mail, ArrowRight, ArrowLeft } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';
import { useTextDirection } from '@/app/lib/hooks/useTextDirection';

export default function CompanyPage() {
  const t = useTranslations('company');
  const { isRTL } = useTextDirection();

  return (
    <div className="relative overflow-x-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-visible">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />

        <div className="relative container mx-auto px-6 py-50 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            className="space-y-12 py-8"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold leading-tight py-4"
            >
              <span className="block text-white py-3">{t('hero.title')}</span>
              <span className="block text-gradient py-3">{t('hero.titleAccent')}</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-xl md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision Section */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('mission.title')}
            subtitle={t('story.subtitle')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto mb-16">
            {/* Mission */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-10 h-full border-gold/30 bg-gradient-to-br from-gold/10 to-transparent">
                <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mb-6">
                  <Target className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{t('mission.title')}</h3>
                <p className="text-xl text-white/80 leading-relaxed">
                  {t('mission.content')}
                </p>
              </Card>
            </motion.div>

            {/* Vision */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-10 h-full border-gold/30 bg-gradient-to-br from-gold/10 to-transparent">
                <div className="w-16 h-16 rounded-2xl bg-gold/20 flex items-center justify-center mb-6">
                  <Zap className="w-8 h-8 text-gold" />
                </div>
                <h3 className="text-3xl font-bold text-white mb-4">{t('vision.title')}</h3>
                <p className="text-xl text-white/80 leading-relaxed">
                  {t('vision.content')}
                </p>
              </Card>
            </motion.div>
          </div>

          {/* Our Story */}
          <div className="max-w-4xl mx-auto">
            <Card className="p-12 border-gold/20">
              <h3 className="text-3xl font-bold text-white mb-6">{t('story.title')}</h3>
              <div className="space-y-4 text-lg text-white/70 leading-relaxed">
                <p>
                  {t('story.content')}
                </p>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('values.title')}
            subtitle={t('values.subtitle')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Compliance First */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-8 h-full border-gold/20">
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
                  <Shield className="w-7 h-7 text-gold" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">{t('values.security.title')}</h4>
                <p className="text-white/70 leading-relaxed">
                  {t('values.security.description')}
                </p>
              </Card>
            </motion.div>

            {/* Transparency */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-8 h-full border-gold/20">
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
                  <Heart className="w-7 h-7 text-gold" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">{t('values.transparency.title')}</h4>
                <p className="text-white/70 leading-relaxed">
                  {t('values.transparency.description')}
                </p>
              </Card>
            </motion.div>

            {/* Excellence */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-8 h-full border-gold/20">
                <div className="w-14 h-14 rounded-xl bg-gold/20 flex items-center justify-center mb-6">
                  <Zap className="w-7 h-7 text-gold" />
                </div>
                <h4 className="text-2xl font-bold text-white mb-3">{t('values.efficiency.title')}</h4>
                <p className="text-white/70 leading-relaxed">
                  {t('values.efficiency.description')}
                </p>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Careers Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-16 bg-gradient-to-br from-gold/10 to-transparent border-gold/30">
                <Briefcase className="w-16 h-16 text-gold mx-auto mb-6" />
                <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                  {t('careers.title')}
                </h2>
                <p className="text-xl text-white/70 mb-8 leading-relaxed">
                  {t('careers.subtitle')}
                </p>
                <div className="text-lg text-white/60">
                  <p className="mb-4">
                    {t('careers.description')}
                  </p>
                  <a
                    href={`mailto:${t('cta.email')}`}
                    className="inline-flex items-center text-gold hover:text-gold-light transition-colors font-semibold text-xl"
                  >
                    {t('cta.email')}
                    {isRTL ? (
                      <ArrowLeft className="mr-2 w-5 h-5" />
                    ) : (
                      <ArrowRight className="ml-2 w-5 h-5" />
                    )}
                  </a>
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
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

              <div className="pt-8 space-y-2">
                <p className="text-white/50 text-sm uppercase tracking-wider">
                  {t('cta.emailLabel')}
                </p>
                <a href={`mailto:${t('cta.email')}`} className="hover:text-gold transition-colors text-white/70 text-lg">
                  {t('cta.email')}
                </a>
              </div>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
}
