'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Shield, Zap, Globe, Eye, Check, TrendingUp, Users, Building, Briefcase } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import { useMemo } from 'react';

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
};

const staggerContainer = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
};

export default function HomePage() {
  const t = useTranslations('home');
  
  // Optimize particle generation - reduce from 20 to 8 for better performance
  const particles = useMemo(() => 
    Array.from({ length: 8 }, (_, i) => ({
      id: i,
      x: `${Math.random() * 100}vw`,
      y: `${Math.random() * 100}vh`
    })), []
  );

  const safeT = (key: string, fallbackKey?: string): string => {
    try {
      return (t as any)(key);
    } catch {
      return fallbackKey ? (t as any)(fallbackKey) : '';
    }
  };

  // Safely read comparison items to avoid runtime translation errors
  const comparisonBeforeItems = useMemo(() => {
    try {
      const rawBefore = (t as any).raw('comparison.before.items');
      return Array.isArray(rawBefore) ? rawBefore as string[] : [];
    } catch {
      return [];
    }
  }, [t]);

  const comparisonAfterItems = useMemo(() => {
    try {
      const rawAfter = (t as any).raw('comparison.after.items');
      return Array.isArray(rawAfter) ? rawAfter as string[] : [];
    } catch {
      return [];
    }
  }, [t]);

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        {/* Background effects */}
        <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-gold/10 via-transparent to-transparent" />
        
        {/* Optimized animated particles - reduced count and simplified animations */}
        <div className="absolute inset-0">
          {particles.map((particle) => (
                         <motion.div
               key={particle.id}
               className="absolute w-1 h-1 bg-gold/30 rounded-full"
               style={{
                 left: particle.x,
                 top: particle.y
               } as React.CSSProperties}
               initial={{ 
                 x: 0,
                 y: 0
               }}
               animate={{
                 x: [`${Math.random() * 100}vw`, `${Math.random() * 100}vw`],
                 y: [`${Math.random() * 100}vh`, `${Math.random() * 100}vh`],
               }}
               transition={{
                 duration: 15 + (particle.id * 2), // Simplified timing
                 repeat: Infinity,
                 repeatType: "reverse",
                 ease: "linear" // Use linear easing for better performance
               }}
             />
          ))}
        </div>

        <div className="relative container mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-xl"
            >
              <span className="text-gold text-sm font-medium">
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
              className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            >
              <motion.a
                href="https://deltran.ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-semibold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300 flex items-center"
              >
                {t('hero.primaryCta')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="https://deltran.ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                {t('hero.secondaryCta')}
              </motion.a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/60 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Trust Indicators */}
      <section className="py-20 relative">
        <div className="container mx-auto px-6">
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl font-semibold text-white/60">
              {t('trust.title')}
            </h2>
          </motion.div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { key: 'adgm', icon: Shield },
              { key: 'bank', icon: Building },
              { key: 'security', icon: Eye },
              { key: 'availability', icon: Zap }
            ].map((item, index) => (
              <motion.div
                key={item.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-gold/10 flex items-center justify-center mx-auto mb-3">
                  <item.icon className="w-6 h-6 text-gold" />
                </div>
                <p className="text-white/60 text-sm">
                  {t(`trust.${item.key}`)}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('features.title')}
            className="mb-16"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'instant', icon: Zap },
              { key: 'compliant', icon: Shield },
              { key: 'global', icon: Globe },
              { key: 'transparent', icon: Eye }
            ].map((feature, index) => (
              <motion.div
                key={feature.key}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card gradient className="p-6 h-full">
                  <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center mb-4">
                    <feature.icon className="w-6 h-6 text-gold" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">
                    {t(`features.${feature.key}.title`)}
                  </h3>
                  <p className="text-white/60">
                    {t(`features.${feature.key}.description`)}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Comparison */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={safeT('comparison.title')}
            className="mb-16"
          />
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {/* Before */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full border-red-500/20 bg-red-500/5">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  {safeT('comparison.before.title')}
                </h3>
                <ul className="space-y-4">
                  {comparisonBeforeItems.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <div className="w-5 h-5 rounded-full bg-red-500/20 flex items-center justify-center mt-0.5 mr-3 flex-shrink-0">
                        <div className="w-2 h-2 bg-red-500 rounded-full" />
                      </div>
                      <span className="text-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* After */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card className="p-8 h-full border-green-500/20 bg-green-500/5">
                <h3 className="text-2xl font-semibold text-white mb-6">
                  {safeT('comparison.after.title')}
                </h3>
                <ul className="space-y-4">
                  {comparisonAfterItems.map((item, i) => (
                    <li key={i} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                      <span className="text-white/60">{item}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Network Stats */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: TrendingUp, value: '10 seconds', label: 'Settlement time' },
              { icon: Users, value: '99.99%', label: 'Uptime SLA' },
              { icon: Briefcase, value: '24/7/365', label: 'Always available' }
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="w-8 h-8 text-gold" />
                </div>
                <div className="text-3xl font-bold text-gradient mb-2">
                  {stat.value}
                </div>
                <p className="text-white/60">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <Card className="p-12 md:p-16 text-center bg-gradient-to-br from-gold/20 to-gold/5 border-gold/30">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="space-y-6"
            >
              <h2 className="text-3xl md:text-5xl font-bold text-white">
                {t('cta.title')}
              </h2>
              <p className="text-xl text-white/60 max-w-2xl mx-auto">
                {t('cta.subtitle')}
              </p>
              
              <motion.a
                href="https://deltran.ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-semibold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300"
              >
                {safeT('cta.button', 'cta.primaryButton')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
}
