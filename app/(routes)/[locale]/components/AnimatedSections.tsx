'use client';

/**
 * Animated Sections Component
 * Lazy-loaded client component with scroll-triggered animations
 * Uses Intersection Observer for performance
 */

import { useRef, useEffect, useState } from 'react';
import { Shield, Zap, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';
import Link from 'next/link';

interface AnimatedSectionsProps {
  translations: {
    problem: { title: string; subtitle: string; description: string };
    solution: { title: string; subtitle: string; description: string };
    valueProps: {
      title: string;
      instant: { title: string; description: string; impact: string };
      capital: { title: string; description: string; impact: string };
      compliance: { title: string; description: string; impact: string };
    };
    howItWorks: {
      title: string;
      subtitle: string;
      step1: { title: string; description: string };
      step2: { title: string; description: string };
      step3: { title: string; description: string };
      step4: { title: string; description: string };
    };
    metrics: {
      title: string;
      subtitle: string;
      tps: { label: string; value: string; unit: string; detail: string };
      latency: { label: string; value: string; unit: string; detail: string };
      netting: { label: string; value: string; unit: string; detail: string };
      finality: { label: string; value: string; unit: string; detail: string };
    };
    why: {
      title: string;
      reasons: Array<{ title: string; description: string }>;
    };
    contact: {
      title: string;
      subtitle: string;
      directContact: string;
      email: string;
    };
    cta: { button: string };
  };
}

// Hook for intersection observer
function useInView(options = {}) {
  const ref = useRef<HTMLDivElement>(null);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(element);
        }
      },
      { threshold: 0.1, ...options }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, isInView };
}

// Animated section wrapper
function AnimatedSection({
  children,
  className = '',
  delay = 0
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}) {
  const { ref, isInView } = useInView();

  return (
    <div
      ref={ref}
      className={`transition-all duration-700 ease-out ${className}`}
      style={{
        opacity: isInView ? 1 : 0,
        transform: isInView ? 'translateY(0)' : 'translateY(30px)',
        transitionDelay: `${delay}ms`,
      }}
    >
      {children}
    </div>
  );
}

export function AnimatedSections({ translations: t }: AnimatedSectionsProps) {
  const features = [
    { key: 'instant', icon: Zap, ...t.valueProps.instant },
    { key: 'capital', icon: TrendingUp, ...t.valueProps.capital },
    { key: 'compliance', icon: Shield, ...t.valueProps.compliance },
  ];

  const steps = [
    { key: 'step1', ...t.howItWorks.step1 },
    { key: 'step2', ...t.howItWorks.step2 },
    { key: 'step3', ...t.howItWorks.step3 },
    { key: 'step4', ...t.howItWorks.step4 },
  ];

  const metrics = [
    { key: 'tps', ...t.metrics.tps },
    { key: 'latency', ...t.metrics.latency },
    { key: 'netting', ...t.metrics.netting },
    { key: 'finality', ...t.metrics.finality },
  ];

  return (
    <>
      {/* Problem Statement */}
      <section className="py-16 sm:py-24 lg:py-32 relative bg-gradient-to-b from-black to-[#0a0a0a]">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4 sm:mb-6 text-balance">
                {t.problem.title}
              </h2>
              <p className="text-lg sm:text-xl md:text-2xl text-gold font-light italic mb-6 sm:mb-8">
                {t.problem.subtitle}
              </p>
              <p className="text-base md:text-xl lg:text-2xl text-white/70 leading-relaxed text-balance">
                {t.problem.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Solution */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <Card gradient className="p-8 sm:p-12 md:p-16">
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-4 sm:mb-6 text-balance">
                {t.solution.title}
              </h2>
              <p className="text-lg md:text-xl text-gold mb-4 sm:mb-6 font-semibold">
                {t.solution.subtitle}
              </p>
              <p className="text-base md:text-xl text-white/70 leading-relaxed text-balance">
                {t.solution.description}
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Value Propositions */}
      <section className="py-16 sm:py-24 lg:py-32 relative bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <SectionHeading title={t.valueProps.title} className="mb-12 sm:mb-20" />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.key} delay={index * 100}>
                <Card gradient className="p-6 sm:p-10 h-full hover:border-gold/50 transition-colors duration-300 group">
                  <div className="w-12 sm:w-16 h-12 sm:h-16 rounded-2xl bg-gold/20 flex items-center justify-center mx-auto mb-4 sm:mb-6 group-hover:bg-gold/30 transition-colors">
                    <feature.icon className="w-6 sm:w-8 h-6 sm:h-8 text-gold" />
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-white mb-3 sm:mb-4 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-white/70 text-base md:text-lg mb-4 sm:mb-6 text-center leading-relaxed">
                    {feature.description}
                  </p>
                  <div className="pt-3 sm:pt-4 border-t border-white/10 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <ArrowRight className="w-4 sm:w-5 h-4 sm:h-5 text-gold flex-shrink-0" />
                      <p className="text-gold font-medium text-sm md:text-base">
                        {feature.impact}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <SectionHeading
              title={t.howItWorks.title}
              subtitle={t.howItWorks.subtitle}
              className="mb-12 sm:mb-20"
            />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-7xl mx-auto">
            {steps.map((step, index) => (
              <AnimatedSection key={step.key} delay={index * 80}>
                <Card className="p-6 sm:p-8 h-full border-gold/30 hover:border-gold/50 transition-colors duration-300">
                  <div className="w-12 sm:w-14 h-12 sm:h-14 rounded-full bg-gradient-to-br from-gold to-gold-light flex items-center justify-center text-black font-bold text-xl sm:text-2xl mb-4 sm:mb-6">
                    {index + 1}
                  </div>
                  <h3 className="text-lg md:text-xl font-bold text-white mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/70 text-sm md:text-base leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Metrics */}
      <section className="py-16 sm:py-24 lg:py-32 relative bg-gradient-to-b from-[#0a0a0a] to-black">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <SectionHeading
              title={t.metrics.title}
              subtitle={t.metrics.subtitle}
              className="mb-12 sm:mb-20"
            />
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-6xl mx-auto">
            {metrics.map((metric, index) => (
              <AnimatedSection key={metric.key} delay={index * 80}>
                <Card className="p-4 sm:p-6 md:p-8 h-full bg-gradient-to-br from-gold/5 to-transparent border-gold/30 hover:border-gold/50 transition-colors">
                  <div className="text-xs md:text-sm text-gold uppercase tracking-wider mb-2 sm:mb-3 font-semibold text-center">
                    {metric.label}
                  </div>
                  <div className="mb-2 sm:mb-3 flex items-baseline justify-center gap-1 sm:gap-2">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                      {metric.value}
                    </span>
                    <span className="text-lg sm:text-xl md:text-2xl font-bold bg-gradient-to-r from-gold to-gold-light bg-clip-text text-transparent">
                      {metric.unit}
                    </span>
                  </div>
                  <p className="text-white/60 text-xs md:text-sm text-center">
                    {metric.detail}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Why Banks Choose DelTran */}
      <section className="py-16 sm:py-24 lg:py-32 relative">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <SectionHeading title={t.why.title} className="mb-12 sm:mb-20" />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-6 sm:gap-8 max-w-6xl mx-auto">
            {t.why.reasons.map((reason, index) => (
              <AnimatedSection key={index} delay={index * 100}>
                <Card className="p-6 sm:p-10 h-full border-gold/20 hover:border-gold/40 transition-colors duration-300 group">
                  <div className="flex items-start gap-3 sm:gap-4 mb-3 sm:mb-4">
                    <div className="w-8 sm:w-10 h-8 sm:h-10 rounded-lg bg-gold/20 flex items-center justify-center flex-shrink-0 group-hover:bg-gold/30 transition-colors">
                      <CheckCircle2 className="w-5 sm:w-6 h-5 sm:h-6 text-gold" />
                    </div>
                    <h3 className="text-lg md:text-2xl font-bold text-white pt-1">
                      {reason.title}
                    </h3>
                  </div>
                  <p className="text-white/70 text-base md:text-lg leading-relaxed pl-11 sm:pl-14">
                    {reason.description}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-16 sm:py-24 lg:py-32 relative bg-gradient-to-b from-black via-[#0a0a0a] to-black">
        <div className="container mx-auto px-4 sm:px-6">
          <AnimatedSection>
            <Card className="p-10 sm:p-16 md:p-24 text-center bg-gradient-to-br from-gold/20 via-gold/10 to-gold/5 border-gold/50">
              <div className="space-y-6 sm:space-y-8">
                <h2 className="text-3xl md:text-4xl lg:text-6xl font-bold text-white text-balance">
                  {t.contact.title}
                </h2>
                <p className="text-lg md:text-2xl text-white/70 max-w-3xl mx-auto leading-relaxed text-balance">
                  {t.contact.subtitle}
                </p>

                <div className="flex flex-col items-center gap-6 pt-4 sm:pt-6">
                  <Link
                    href="/contact"
                    className="inline-flex items-center px-8 sm:px-12 py-4 sm:py-6 rounded-full bg-gradient-to-r from-gold to-gold-light text-black font-bold text-base sm:text-xl shadow-lg shadow-gold/30 hover:shadow-xl hover:shadow-gold/50 transition-all duration-300 gap-2 sm:gap-3 hover:scale-[1.02] active:scale-[0.98]"
                  >
                    <span>{t.cta.button}</span>
                    <ArrowRight className="w-5 sm:w-6 h-5 sm:h-6" />
                  </Link>

                  <div className="text-center pt-4">
                    <p className="text-white/50 text-xs sm:text-sm mb-3 uppercase tracking-wider">
                      {t.contact.directContact}
                    </p>
                    <a
                      href="mailto:contact@deltran.ai"
                      className="text-gold hover:text-gold-light transition-colors text-lg md:text-2xl font-semibold"
                    >
                      {t.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
