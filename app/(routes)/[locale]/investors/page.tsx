'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  TrendingUp,
  Zap,
  Shield,
  Globe,
  ArrowRight,
  CheckCircle2,
  Mail,
  Sparkles,
  Target,
  Rocket,
  Clock,
  DollarSign
} from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';

export default function InvestorsPage() {
  const t = useTranslations('investors');

  return (
    <div className="relative overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-black via-midnight to-black" />

        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gold/5 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="relative container mx-auto px-6 py-32 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center px-6 py-3 rounded-full bg-gradient-to-r from-gold/20 to-gold-light/20 border border-gold/40 backdrop-blur-sm">
              <Sparkles className="w-5 h-5 text-gold mr-2" />
              <span className="text-gold font-semibold text-sm uppercase tracking-wider">
                {t('hero.badge')}
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold">
              <span className="block text-white mb-4">{t('hero.title')}</span>
            </h1>

            <p className="text-2xl md:text-3xl text-white/70 max-w-4xl mx-auto font-light leading-relaxed">
              {t('hero.subtitle')}
            </p>

            <div className="pt-8">
              <a
                href={`mailto:${t('hero.cta')}`}
                className="inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-lg hover:shadow-[0_0_50px_rgba(212,175,55,0.6)] transition-all duration-300 transform hover:scale-105"
              >
                <Mail className="mr-3 w-6 h-6" />
                {t('hero.cta')}
                <ArrowRight className="ml-3 w-6 h-6" />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <div className="text-center mb-12">
              <h2 className="text-5xl md:text-6xl font-bold text-white mb-6">
                {t('vision.title')}
              </h2>
              <p className="text-2xl md:text-3xl text-gold font-light italic mb-8">
                {t('vision.tagline')}
              </p>
            </div>

            <Card gradient className="p-12 md:p-16 text-center">
              <p className="text-xl md:text-2xl text-white/80 leading-relaxed mb-8">
                {t('vision.description')}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent my-8" />
              <p className="text-xl md:text-2xl text-white font-semibold">
                {t('vision.highlight')}
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Problem Section */}
      <section className="py-32 relative bg-gradient-to-b from-black to-midnight">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('problem.title')}
            subtitle={t('problem.subtitle')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {(t.raw('problem.stats') as Array<{value: string, label: string, description: string}>).map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 text-center h-full bg-gradient-to-br from-gold/10 to-transparent border-gold/30">
                  <div className="text-5xl md:text-6xl font-bold text-gradient mb-4">
                    {stat.value}
                  </div>
                  <div className="text-gold text-sm uppercase tracking-wider mb-3 font-semibold">
                    {stat.label}
                  </div>
                  <p className="text-white/60 text-sm">
                    {stat.description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-12 bg-gradient-to-br from-midnight to-black border-gold/40">
              <p className="text-2xl md:text-3xl text-white text-center font-light italic">
                &ldquo;{t('problem.insight')}&rdquo;
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Solution Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('solution.title')}
            subtitle={t('solution.subtitle')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {(t.raw('solution.features') as Array<{title: string, description: string, impact: string}>).map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card gradient className="p-10 h-full hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] transition-all duration-300">
                  <div className="flex items-start gap-4 mb-6">
                    <div className="w-12 h-12 rounded-xl bg-gold/20 flex items-center justify-center flex-shrink-0">
                      <Zap className="w-6 h-6 text-gold" />
                    </div>
                    <h3 className="text-2xl font-bold text-white pt-2">
                      {feature.title}
                    </h3>
                  </div>
                  <p className="text-white/70 text-lg mb-4 leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="flex items-start gap-2 pt-4 border-t border-white/10">
                    <ArrowRight className="w-5 h-5 text-gold mt-1 flex-shrink-0" />
                    <p className="text-gold font-medium">
                      {feature.impact}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Traction Section */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <div className="max-w-5xl mx-auto">
            <SectionHeading
              title={t('traction.title')}
              subtitle={t('traction.subtitle')}
              className="mb-20"
            />

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              {(t.raw('traction.metrics') as Array<{metric: string, value: string, detail: string, status: string}>).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 bg-gradient-to-br from-gold/5 to-transparent border-gold/30 h-full">
                    <div className="flex items-start justify-between mb-4">
                      <div className="text-sm text-gold uppercase tracking-wider font-semibold">
                        {item.metric}
                      </div>
                      <div className="px-3 py-1 rounded-full bg-green-500/20 border border-green-500/40">
                        <span className="text-green-400 text-xs font-semibold">{item.status}</span>
                      </div>
                    </div>
                    <div className="text-5xl font-bold text-white mb-3">
                      {item.value}
                    </div>
                    <p className="text-white/60">
                      {item.detail}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>

            <Card className="p-10 text-center bg-gradient-to-br from-gold/10 to-gold/5 border-gold/40">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gold/20 mb-6">
                <CheckCircle2 className="w-8 h-8 text-gold" />
              </div>
              <div className="text-2xl font-bold text-white mb-2">{t('traction.status')}</div>
              <p className="text-white/70 text-lg">{t('traction.readiness')}</p>
            </Card>
          </div>
        </div>
      </section>

      {/* Market Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('market.title')}
            subtitle={t('market.subtitle')}
            className="mb-12"
          />

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-16"
          >
            <p className="text-xl text-white/70 text-center leading-relaxed">
              {t('market.overview')}
            </p>
          </motion.div>

          <div className="space-y-6 max-w-5xl mx-auto mb-16">
            {(t.raw('market.segments') as Array<{name: string, size: string, growth: string, why: string}>).map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 hover:border-gold/40 transition-all duration-300">
                  <div className="flex items-start gap-6">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold to-gold-light flex items-center justify-center flex-shrink-0">
                      <Target className="w-6 h-6 text-black" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white mb-3">{segment.name}</h3>
                      <div className="flex flex-wrap gap-4 mb-4">
                        <div className="flex items-center gap-2">
                          <DollarSign className="w-4 h-4 text-gold" />
                          <span className="text-gold font-semibold">{segment.size}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <TrendingUp className="w-4 h-4 text-green-400" />
                          <span className="text-green-400 font-semibold">{segment.growth}</span>
                        </div>
                      </div>
                      <p className="text-white/70 leading-relaxed">{segment.why}</p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="p-12 text-center bg-gradient-to-br from-gold/20 to-gold/5 border-gold/40">
              <div className="text-sm text-gold uppercase tracking-wider mb-3 font-semibold">Total Addressable Market</div>
              <div className="text-6xl md:text-7xl font-bold text-gradient mb-4">
                {(t.raw('market.tam') as {value: string}).value}
              </div>
              <p className="text-white/70 text-lg mb-8">
                {(t.raw('market.tam') as {description: string}).description}
              </p>
              <div className="h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent my-8" />
              <p className="text-white/80 italic text-lg">
                {t('market.approach')}
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Why Now Section */}
      <section className="py-32 relative bg-gradient-to-b from-black to-midnight">
        <div className="container mx-auto px-6">
          <h2 className="text-5xl md:text-6xl font-bold text-white text-center mb-20">
            {t('why.title')}
          </h2>

          <div className="grid lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
            {/* Timing */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card gradient className="p-10 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <Clock className="w-8 h-8 text-gold" />
                  <h3 className="text-3xl font-bold text-white">{t('why.timing.title')}</h3>
                </div>
                <ul className="space-y-4">
                  {(t.raw('why.timing.reasons') as string[]).map((reason, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <CheckCircle2 className="w-6 h-6 text-gold flex-shrink-0 mt-1" />
                      <span className="text-white/80 text-lg leading-relaxed">{reason}</span>
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>

            {/* Moat */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <Card gradient className="p-10 h-full">
                <div className="flex items-center gap-3 mb-8">
                  <Shield className="w-8 h-8 text-gold" />
                  <h3 className="text-3xl font-bold text-white">{t('why.moat.title')}</h3>
                </div>
                <div className="space-y-6">
                  {(t.raw('why.moat.advantages') as Array<{title: string, description: string}>).map((advantage, index) => (
                    <div key={index}>
                      <h4 className="text-xl font-semibold text-gold mb-2">{advantage.title}</h4>
                      <p className="text-white/70 leading-relaxed">{advantage.description}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Business Model */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('business.title')}
            subtitle={t('business.subtitle')}
            className="mb-20"
          />

          <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto mb-12">
            {(t.raw('business.model') as Array<{stream: string, description: string, scale: string}>).map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <Card className="p-8 h-full border-gold/20 hover:border-gold/40 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-gold/20 flex items-center justify-center">
                      <DollarSign className="w-5 h-5 text-gold" />
                    </div>
                    <h3 className="text-xl font-bold text-white">{item.stream}</h3>
                  </div>
                  <p className="text-white/70 mb-4">{item.description}</p>
                  <div className="pt-4 border-t border-white/10">
                    <p className="text-gold text-sm font-medium">{item.scale}</p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto"
          >
            <Card className="p-10 text-center bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30">
              <p className="text-xl md:text-2xl text-white font-semibold">
                {t('business.unit_economics')}
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Roadmap */}
      <section className="py-32 relative bg-gradient-to-b from-midnight to-black">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('roadmap.title')}
            subtitle={t('roadmap.subtitle')}
            className="mb-20"
          />

          <div className="max-w-4xl mx-auto">
            <div className="space-y-6">
              {(t.raw('roadmap.phases') as Array<{phase: string, title: string, description: string}>).map((phase, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className="p-8 border-gold/30 hover:border-gold/50 transition-all duration-300">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center">
                          <span className="text-black font-bold text-lg">{index + 1}</span>
                        </div>
                      </div>
                      <div className="flex-1">
                        <div className="text-sm text-gold uppercase tracking-wider mb-2 font-semibold">
                          {phase.phase}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-3">{phase.title}</h3>
                        <p className="text-white/70 text-lg leading-relaxed">{phase.description}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto text-center"
          >
            <Card gradient className="p-16">
              <Globe className="w-16 h-16 text-gold mx-auto mb-6" />
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t('team.title')}
              </h2>
              <p className="text-xl text-white/70 mb-8">
                {t('team.subtitle')}
              </p>
              <p className="text-gold italic">
                {t('team.note')}
              </p>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 relative bg-gradient-to-b from-black via-midnight to-black">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="p-16 md:p-24 text-center bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border-gold/50">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-light mb-8">
                <Rocket className="w-10 h-10 text-black" />
              </div>

              <h2 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {t('ask.title')}
              </h2>

              <p className="text-2xl text-white/80 mb-8 font-light">
                {t('ask.subtitle')}
              </p>

              <p className="text-xl text-white/70 mb-12 max-w-3xl mx-auto leading-relaxed">
                {t('ask.opportunity')}
              </p>

              <div className="mb-12">
                <h3 className="text-2xl font-semibold text-white mb-4">{t('ask.cta_title')}</h3>
                <p className="text-white/60 mb-8">{t('ask.cta_subtitle')}</p>

                <a
                  href={`mailto:${t('contact.email')}`}
                  className="inline-flex items-center px-12 py-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-xl hover:shadow-[0_0_60px_rgba(212,175,55,0.7)] transition-all duration-300 transform hover:scale-105"
                >
                  <Mail className="mr-3 w-7 h-7" />
                  {t('contact.email')}
                  <ArrowRight className="ml-3 w-7 h-7" />
                </a>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
