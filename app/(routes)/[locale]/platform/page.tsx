'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Cpu, Shield, Globe, Code, CheckCircle, TrendingUp, Users, Building, Briefcase } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import { Diagram } from '@/app/components/Diagram';

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

export default function PlatformPage() {
  const t = useTranslations('platform');

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[60vh] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-black" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-gold/5 via-transparent to-transparent" />
        
        <div className="relative container mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="space-y-6"
          >
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-4xl md:text-6xl lg:text-7xl font-bold text-gradient"
            >
              {t('hero.title')}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/60 max-w-4xl mx-auto"
            >
              {t('hero.subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <motion.a
                href="https://deltran.ai"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-semibold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300"
              >
                {t('hero.primaryCta')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Overview Section */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-8 md:p-12 bg-gradient-to-br from-white/10 to-white/5 border-gold/20">
              <h2 className="text-3xl font-bold text-white mb-6">
                {t('overview.title')}
              </h2>
              <p className="text-white/70 text-lg leading-relaxed">
                {t('overview.description')}
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Key Features Grid */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('keyFeatures.title')}
            className="mb-16"
          />
          
          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true }}
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            {(t.raw('keyFeatures.items') as Array<{title: string; description: string; icon: string}>).map((item, index) => (
              <motion.div key={index} variants={fadeInUp}>
                <Card gradient className="h-full p-8">
                  <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mb-4">
                    {index === 0 && <Building className="w-6 h-6 text-gold" />}
                    {index === 1 && <TrendingUp className="w-6 h-6 text-gold" />}
                    {index === 2 && <Briefcase className="w-6 h-6 text-gold" />}
                    {index === 3 && <Users className="w-6 h-6 text-gold" />}
                    {index === 4 && <Globe className="w-6 h-6 text-gold" />}
                    {index === 5 && <Shield className="w-6 h-6 text-gold" />}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {item.title}
                  </h3>
                  <p className="text-white/60">
                    {item.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Platform Architecture Diagram */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title="Platform Architecture"
            subtitle="Intelligent routing and instant settlement across global corridors"
            className="mb-16"
          />
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="max-w-6xl mx-auto"
          >
            <Diagram />
          </motion.div>
        </div>
      </section>

      {/* Platform Capabilities */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('features.title')}
            className="mb-16"
          />
          
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Cpu, key: 'liquidity' },
              { icon: Shield, key: 'compliance' },
              { icon: Globe, key: 'settlement' },
              { icon: Code, key: 'developer' },
            ].map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-6 h-6 text-gold" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {t(`features.${feature.key}.title`)}
                      </h3>
                      <p className="text-white/60">
                        {t(`features.${feature.key}.description`)}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Integration Process */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('integration.title')}
            subtitle={t('integration.subtitle')}
            className="mb-16"
          />
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <div className="space-y-4">
              {(t.raw('integration.steps') as string[]).map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center flex-shrink-0">
                        <span className="text-gold font-bold">{index + 1}</span>
                      </div>
                      <div className="flex items-center justify-between flex-1">
                        <p className="text-white/80">{step}</p>
                        <CheckCircle className="w-5 h-5 text-gold opacity-60" />
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('useCases.title')}
            className="mb-16"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: Building, key: 'banks' },
              { icon: TrendingUp, key: 'fintechs' },
              { icon: Briefcase, key: 'businesses' },
              { icon: Users, key: 'individuals' },
            ].map((useCase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card gradient className="p-6 h-full text-center">
                  <useCase.icon className="w-12 h-12 text-gold mx-auto mb-4" />
                  <h3 className="text-lg font-semibold text-white mb-2">
                    {t(`useCases.${useCase.key}.title`)}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {t(`useCases.${useCase.key}.description`)}
                  </p>
                </Card>
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
                {t('cta.primaryButton')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </motion.a>
            </motion.div>
          </Card>
        </div>
      </section>
    </div>
  );
}
