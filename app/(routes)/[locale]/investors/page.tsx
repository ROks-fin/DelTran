'use client';

import { useTranslations } from 'next-intl';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  ArrowRight, 
  TrendingUp, 
  Globe, 
  Users, 
  Target, 
  Calendar, 
  Mail, 
  ChevronRight,
  Shield,
  Zap,
  Award,
  BarChart3,
  Building2,
  Rocket,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Clock,
  Network,
  Briefcase
} from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import { useRef } from 'react';

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

export default function InvestorsPage() {
  const t = useTranslations('investors');
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"]
  });
  
  const heroOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1]);

  return (
    <div className="relative overflow-hidden bg-black">
      {/* Animated Background */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-midnight via-black to-black" />
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: 'radial-gradient(circle at 20% 50%, rgba(212, 175, 55, 0.1) 0%, transparent 50%)'
          }}
        />
      </div>

      {/* Hero Section with Parallax */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center">
        <motion.div 
          animate={{ 
            opacity: heroOpacity.get(), 
            scale: heroScale.get() 
          }}
          className="relative container mx-auto px-6 py-32 text-center z-10"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7 }}
            className="space-y-8"
          >
            {/* Animated Badge */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center px-4 py-2 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-xl"
            >
              <Rocket className="w-4 h-4 text-gold mr-2" />
              <span className="text-sm font-medium text-gold">Investment Opportunity</span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-5xl md:text-7xl lg:text-8xl font-bold"
            >
              <span className="text-white">Build the Future of</span>
              <br />
              <span className="text-gradient">Global Payments</span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed"
            >
              {t('hero.subtitle')}
            </motion.p>

            {/* CTA Buttons with Hover Effects */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            >
              <motion.a
                href="mailto:investors@deltran.io"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-8 py-4 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-semibold text-lg hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] transition-all duration-300"
              >
                {t('hero.primaryCta')}
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </motion.a>
              <motion.a
                href="https://calendly.com/deltran"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group inline-flex items-center px-8 py-4 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 text-white font-semibold text-lg hover:bg-white/20 transition-all duration-300"
              >
                {t('hero.secondaryCta')}
                <Calendar className="ml-2 w-5 h-5 group-hover:rotate-12 transition-transform" />
              </motion.a>
            </motion.div>

            {/* Quick Stats */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12"
            >
              {[
                { label: 'Market Size', value: '$5.6T+', icon: Globe },
                { label: 'Growth Rate', value: '7.5% CAGR', icon: TrendingUp },
                { label: 'Target Raise', value: '$500K', icon: Target }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <stat.icon className="w-6 h-6 text-gold mx-auto mb-2" />
                  <div className="text-2xl font-bold text-white">{stat.value}</div>
                  <div className="text-sm text-white/50">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-white/30 flex justify-center"
          >
            <div className="w-1 h-3 bg-white/50 rounded-full mt-2" />
          </motion.div>
        </motion.div>
      </section>

      {/* Investment Overview with Enhanced Design */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('overview.title')}
            className="mb-16"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-5xl mx-auto"
          >
            <Card className="p-10 md:p-16 bg-gradient-to-br from-gold/10 via-gold/5 to-transparent border-gold/30 relative overflow-hidden">
              {/* Decorative Elements */}
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
              
              <div className="relative z-10">
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-12">
                  {t('overview.lead')}
                </p>
                
                <div className="grid md:grid-cols-3 gap-8">
                  {(t.raw('overview.highlights') as Array<{label: string; value: string}>).map((highlight, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.9 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.1 }}
                      className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                    >
                      <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                        {index === 0 && <Target className="w-6 h-6 text-gold" />}
                        {index === 1 && <Globe className="w-6 h-6 text-gold" />}
                        {index === 2 && <Clock className="w-6 h-6 text-gold" />}
                      </div>
                      <h3 className="text-gold font-semibold mb-2">{highlight.label}</h3>
                      <p className="text-white/70 text-sm">{highlight.value}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Market Opportunity with Interactive Cards */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('market.title')}
            className="mb-20"
          />
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { key: 'tam', icon: Globe, color: 'from-blue-500 to-purple-500' },
              { key: 'sam', icon: Target, color: 'from-green-500 to-teal-500' },
              { key: 'som', icon: TrendingUp, color: 'from-orange-500 to-red-500' },
              { key: 'growth', icon: BarChart3, color: 'from-purple-500 to-pink-500' },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -10 }}
                className="group"
              >
                <Card gradient className="p-8 h-full relative overflow-hidden">
                  <div className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`} />
                  
                  <div className="relative z-10">
                    <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center mb-6">
                      <item.icon className="w-7 h-7 text-gold" />
                    </div>
                    
                    <h3 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                      {t(`market.${item.key}.title`)}
                    </h3>
                    <div className="text-4xl font-bold text-gradient mb-3">
                      {t(`market.${item.key}.value`)}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {t(`market.${item.key}.description`)}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Target Segments with Visual Hierarchy */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('targetSegments.title')}
            className="mb-20"
          />
          
          <div className="grid lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {(t.raw('targetSegments.segments') as Array<{name: string; volume?: string; description: string}>).map((segment, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card className="p-8 h-full hover:border-gold/50 transition-all duration-300">
                  <div className="flex items-start space-x-4">
                    <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-gold/20 to-gold/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                      {index === 0 && <Users className="w-6 h-6 text-gold" />}
                      {index === 1 && <Building2 className="w-6 h-6 text-gold" />}
                      {index === 2 && <Globe className="w-6 h-6 text-gold" />}
                      {index === 3 && <Network className="w-6 h-6 text-gold" />}
                      {index === 4 && <DollarSign className="w-6 h-6 text-gold" />}
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {segment.name}
                      </h3>
                      {segment.volume && (
                        <div className="text-gold font-semibold mb-3">
                          {segment.volume}
                        </div>
                      )}
                      <p className="text-white/60 leading-relaxed">
                        {segment.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Metrics Dashboard */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('metrics.title')}
            subtitle={t('metrics.subtitle')}
            className="mb-20"
          />
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {(t.raw('metrics.items') as Array<{metric: string; current: string; description: string}>).map((metric, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="group"
              >
                <Card gradient className="p-10 text-center relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gold/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  <div className="relative z-10">
                    <div className="w-16 h-16 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 flex items-center justify-center mx-auto mb-6">
                      {index === 0 && <Zap className="w-8 h-8 text-gold" />}
                      {index === 1 && <Shield className="w-8 h-8 text-gold" />}
                      {index === 2 && <Award className="w-8 h-8 text-gold" />}
                    </div>
                    
                    <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
                      {metric.metric}
                    </div>
                    <div className="text-3xl md:text-4xl font-bold text-gradient mb-4">
                      {metric.current}
                    </div>
                    <p className="text-white/60 text-sm leading-relaxed">
                      {metric.description}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Traction & Milestones Timeline */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('traction.title')}
            className="mb-20"
          />
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12">
              {/* Achieved */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-10 h-full bg-gradient-to-br from-green-500/10 to-transparent border-green-500/30">
                  <div className="flex items-center mb-8">
                    <CheckCircle2 className="w-8 h-8 text-green-500 mr-3" />
                    <h3 className="text-2xl font-semibold text-white">
                      {t('traction.achieved.title')}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {(t.raw('traction.achieved.items') as string[]).map((item, i) => (
                      <motion.li 
                        key={i} 
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start group"
                      >
                        <div className="w-2 h-2 rounded-full bg-green-500 mt-2 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform" />
                        <span className="text-white/80 leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>

              {/* Upcoming */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
              >
                <Card className="p-10 h-full bg-gradient-to-br from-blue-500/10 to-transparent border-blue-500/30">
                  <div className="flex items-center mb-8">
                    <Rocket className="w-8 h-8 text-blue-500 mr-3" />
                    <h3 className="text-2xl font-semibold text-white">
                      {t('traction.upcoming.title')}
                    </h3>
                  </div>
                  <ul className="space-y-4">
                    {(t.raw('traction.upcoming.items') as string[]).map((item, i) => (
                      <motion.li 
                        key={i}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.1 }}
                        className="flex items-start group"
                      >
                        <div className="w-2 h-2 rounded-full bg-blue-500 mt-2 mr-4 flex-shrink-0 group-hover:scale-150 transition-transform" />
                        <span className="text-white/80 leading-relaxed">{item}</span>
                      </motion.li>
                    ))}
                  </ul>
                </Card>
              </motion.div>
            </div>
          </div>
        </div>
      </section>

      {/* Strategic Roadmap */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('roadmap.title')}
            className="mb-20"
          />
          
          <div className="max-w-5xl mx-auto">
            <div className="relative">
              {/* Timeline Line */}
              <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-gold/50 via-gold/30 to-transparent" />
              
              <div className="space-y-16">
                {(t.raw('roadmap.phases') as Array<{quarter: string; title: string; items: string[]}>).map((phase, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.2 }}
                    className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'}`}
                  >
                    <div className="flex-1">
                      <Card className="p-8 bg-gradient-to-br from-gold/10 to-transparent border-gold/30">
                        <div className="flex items-center mb-4">
                          <div className="px-4 py-2 rounded-full bg-gold/20 border border-gold/40">
                            <span className="text-gold font-semibold">{phase.quarter}</span>
                          </div>
                        </div>
                        <h3 className="text-2xl font-semibold text-white mb-4">{phase.title}</h3>
                        <ul className="space-y-2">
                          {phase.items.map((item: string, i: number) => (
                            <li key={i} className="flex items-start">
                              <ChevronRight className="w-4 h-4 text-gold mt-1 mr-2 flex-shrink-0" />
                              <span className="text-white/70">{item}</span>
                            </li>
                          ))}
                        </ul>
                      </Card>
                    </div>
                    
                    {/* Timeline Node */}
                    <div className="px-8 flex justify-center">
                      <motion.div
                        whileHover={{ scale: 1.2 }}
                        className="w-6 h-6 rounded-full bg-gold border-4 border-black relative z-10"
                      >
                        <div className="absolute inset-0 rounded-full bg-gold animate-ping" />
                      </motion.div>
                    </div>
                    
                    <div className="flex-1" />
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('team.title')}
            className="mb-20"
          />
          
          <div className="max-w-3xl mx-auto">
            {(t.raw('team.members') as Array<{name: string; role: string; bio: string}>).map((member, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                className="group"
              >
                <Card gradient className="p-12 text-center relative overflow-hidden">
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-br from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  />
                  
                  <div className="relative z-10">
                    <motion.div 
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                      className="w-32 h-32 rounded-full bg-gradient-to-br from-gold/30 to-gold/10 mx-auto mb-6 flex items-center justify-center border-2 border-gold/30"
                    >
                      <span className="text-4xl font-bold text-gold">
                        {member.name.split(' ').map((n: string) => n[0]).join('')}
                      </span>
                    </motion.div>
                    
                    <h3 className="text-3xl font-semibold text-white mb-2">
                      {member.name}
                    </h3>
                    <p className="text-gold text-lg mb-6">{member.role}</p>
                    <p className="text-white/70 leading-relaxed max-w-2xl mx-auto">
                      {member.bio}
                    </p>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Investment Terms */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('round.title')}
            className="mb-20"
          />
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl mx-auto"
          >
            <Card className="p-12 bg-gradient-to-br from-gold/20 to-gold/5 border-gold/30 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gold/10 rounded-full blur-3xl" />
              
              <div className="relative z-10 grid md:grid-cols-2 gap-8">
                {Object.entries(t.raw('round.details') as Record<string, string>).map(([key, value], index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.1 }}
                    className="text-center p-6 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10"
                  >
                    <div className="w-12 h-12 rounded-full bg-gold/20 flex items-center justify-center mx-auto mb-4">
                      {index === 0 && <Briefcase className="w-6 h-6 text-gold" />}
                      {index === 1 && <DollarSign className="w-6 h-6 text-gold" />}
                      {index === 2 && <Users className="w-6 h-6 text-gold" />}
                      {index === 3 && <Calendar className="w-6 h-6 text-gold" />}
                    </div>
                    <div className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </div>
                    <div className="text-2xl font-semibold text-white">
                      {value}
                    </div>
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </section>

      {/* Risk Mitigation */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <SectionHeading
            title={t('risks.title')}
            className="mb-20"
          />
          
          <div className="max-w-5xl mx-auto">
            <div className="grid md:grid-cols-3 gap-6">
              {(t.raw('risks.items') as Array<{risk: string; mitigation: string}>).map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  className="group"
                >
                  <Card className="p-8 h-full hover:border-gold/50 transition-all duration-300">
                    <div className="flex items-center mb-4">
                      <AlertCircle className="w-6 h-6 text-amber-500 mr-3" />
                      <h3 className="text-lg font-semibold text-white">{item.risk}</h3>
                    </div>
                    <div className="pl-9">
                      <div className="flex items-center mb-2">
                        <Shield className="w-4 h-4 text-green-500 mr-2" />
                        <span className="text-sm font-medium text-green-500">Mitigation</span>
                      </div>
                      <p className="text-white/60 text-sm leading-relaxed">
                        {item.mitigation}
                      </p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-32 relative">
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="relative"
          >
            <Card className="p-16 md:p-24 text-center bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border-gold/30 relative overflow-hidden">
              {/* Animated Background Elements */}
              <div className="absolute inset-0">
                <motion.div
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                  }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-0 left-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl"
                />
                <motion.div
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                  }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-0 right-0 w-96 h-96 bg-gold/20 rounded-full blur-3xl"
                />
              </div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="relative z-10 space-y-8"
              >
                <motion.div
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-gold to-gold-light mx-auto mb-8 flex items-center justify-center"
                >
                  <Rocket className="w-10 h-10 text-black" />
                </motion.div>
                
                <h2 className="text-4xl md:text-6xl font-bold text-white">
                  {t('contact.title')}
                </h2>
                <p className="text-xl md:text-2xl text-white/60 max-w-3xl mx-auto leading-relaxed">
                  {t('contact.subtitle')}
                </p>
                
                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center pt-8">
                  <motion.a
                    href="mailto:investors@deltran.io"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center px-10 py-5 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-semibold text-xl hover:shadow-[0_0_60px_rgba(212,175,55,0.6)] transition-all duration-300"
                  >
                    <Mail className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                    {t('contact.email')}
                  </motion.a>
                  <motion.a
                    href="https://calendly.com/deltran"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="group inline-flex items-center px-10 py-5 rounded-full bg-white/10 backdrop-blur-xl border-2 border-white/20 text-white font-semibold text-xl hover:bg-white/20 hover:border-white/40 transition-all duration-300"
                  >
                    <Calendar className="mr-3 w-6 h-6 group-hover:rotate-12 transition-transform" />
                    {t('contact.calendar')}
                  </motion.a>
                </div>
              </motion.div>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
}