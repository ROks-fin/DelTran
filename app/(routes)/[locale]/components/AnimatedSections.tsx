'use client';

/**
 * Animated Sections Component
 * Premium fintech sections with scroll-triggered animations
 *
 * Design: Smooth transitions, soft edges, no harsh boundaries
 * Animation: DelTran Motion v2 - GPU-optimized
 *
 * Performance optimizations:
 * - Intersection Observer via Framer Motion useInView
 * - GPU-only animations (transform, opacity)
 * - Reduced motion support
 * - Staggered reveals for visual impact
 */

import { memo, useRef } from 'react';
import { motion, useInView, useReducedMotion } from 'framer-motion';
import { Shield, Zap, TrendingUp, ArrowRight, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useLocale } from 'next-intl';
import { cn } from '@/lib/utils';
import { Card } from '@/app/components/Card';
import { SectionHeading } from '@/app/components/SectionHeading';

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

// Animated section wrapper with scroll-triggered reveal
const AnimatedSection = memo(function AnimatedSection({
  children,
  className = '',
  delay = 0,
  direction = 'up',
}: {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'down' | 'left' | 'right' | 'none';
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const getInitialState = () => {
    if (prefersReducedMotion) return { opacity: 0 };
    switch (direction) {
      case 'up': return { opacity: 0, y: 20 };
      case 'down': return { opacity: 0, y: -20 };
      case 'left': return { opacity: 0, x: 30 };
      case 'right': return { opacity: 0, x: -30 };
      case 'none': return { opacity: 0 };
      default: return { opacity: 0, y: 20 };
    }
  };

  const getFinalState = () => {
    switch (direction) {
      case 'up':
      case 'down': return { opacity: 1, y: 0 };
      case 'left':
      case 'right': return { opacity: 1, x: 0 };
      case 'none': return { opacity: 1 };
      default: return { opacity: 1, y: 0 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialState()}
      animate={isInView ? getFinalState() : getInitialState()}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
});

// Soft gradient divider between sections
const SectionDivider = () => (
  <div className="relative h-32 sm:h-40 -my-16 sm:-my-20 z-10 pointer-events-none">
    <div
      className="absolute inset-0"
      style={{
        background: 'linear-gradient(180deg, transparent 0%, rgba(0,0,0,0.8) 30%, rgba(0,0,0,0.8) 70%, transparent 100%)'
      }}
    />
    <div
      className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[1px]"
      style={{
        background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.2) 50%, transparent 100%)'
      }}
    />
  </div>
);

export function AnimatedSections({ translations: t }: AnimatedSectionsProps) {
  const locale = useLocale();

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
      <section className="section-premium section-no-fade relative">
        {/* Soft background gradient */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(5,5,5,0.5) 50%, rgba(0,0,0,0) 100%)'
          }}
        />
        <div className="container-premium relative">
          <AnimatedSection>
            <div className="text-center max-w-4xl mx-auto">
              <h2 className={cn(
                "font-display font-bold fluid-text-4xl text-balance",
                "bg-gradient-to-r from-white via-white/95 to-white/80",
                "bg-clip-text text-transparent",
                "mb-5 sm:mb-6"
              )}>
                {t.problem.title}
              </h2>
              <p className={cn(
                "text-classic-italic text-gold/90 fluid-text-xl",
                "mb-6 sm:mb-8"
              )}>
                {t.problem.subtitle}
              </p>
              <p className="text-white/55 fluid-text-lg leading-relaxed text-balance">
                {t.problem.description}
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Solution */}
      <section className="section-premium section-no-fade relative">
        <div className="container-premium">
          <AnimatedSection>
            <Card variant="soft" size="xl" className="max-w-5xl mx-auto">
              <h2 className={cn(
                "font-display font-bold fluid-text-3xl text-balance",
                "bg-gradient-to-r from-white via-white/95 to-white/80",
                "bg-clip-text text-transparent",
                "mb-4 sm:mb-5"
              )}>
                {t.solution.title}
              </h2>
              <p className="text-gold/90 fluid-text-xl font-medium mb-4 sm:mb-5">
                {t.solution.subtitle}
              </p>
              <p className="text-white/55 fluid-text-lg leading-relaxed text-balance">
                {t.solution.description}
              </p>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      <SectionDivider />

      {/* Value Propositions */}
      <section className="section-premium section-no-fade relative">
        <div className="container-premium">
          <AnimatedSection>
            <SectionHeading
              title={t.valueProps.title}
              size="lg"
              className="mb-14 sm:mb-20"
            />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <AnimatedSection key={feature.key} delay={index * 120}>
                <Card
                  variant="soft"
                  size="lg"
                  className="h-full"
                >
                  {/* Icon */}
                  <div className={cn(
                    "w-14 h-14 sm:w-16 sm:h-16 rounded-2xl",
                    "bg-gradient-to-br from-gold/15 to-gold/5",
                    "border border-gold/10",
                    "flex items-center justify-center mx-auto mb-5 sm:mb-6"
                  )}>
                    <feature.icon className="w-7 h-7 sm:w-8 sm:h-8 text-gold" />
                  </div>

                  {/* Content */}
                  <h3 className="fluid-text-2xl font-display font-semibold text-white mb-3 text-center">
                    {feature.title}
                  </h3>
                  <p className="text-white/50 fluid-text-base mb-5 sm:mb-6 text-center leading-relaxed">
                    {feature.description}
                  </p>

                  {/* Impact - softer divider */}
                  <div className="pt-4 border-t border-white/[0.04]">
                    <div className="flex items-center justify-center gap-2 text-gold/80">
                      <ArrowRight className="w-4 h-4 flex-shrink-0" />
                      <span className="fluid-text-sm font-medium">{feature.impact}</span>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* How It Works */}
      <section className="section-premium section-no-fade relative">
        <div className="container-premium">
          <AnimatedSection>
            <SectionHeading
              title={t.howItWorks.title}
              subtitle={t.howItWorks.subtitle}
              size="lg"
              className="mb-14 sm:mb-20"
            />
          </AnimatedSection>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-6 max-w-7xl mx-auto">
            {steps.map((step, index) => (
              <AnimatedSection key={step.key} delay={index * 100}>
                <Card
                  variant="soft"
                  size="md"
                  className="h-full"
                >
                  {/* Step Number - softer gradient */}
                  <div className={cn(
                    "w-12 h-12 sm:w-14 sm:h-14 rounded-full",
                    "bg-gradient-to-br from-gold/90 to-gold-light/90",
                    "flex items-center justify-center",
                    "text-black font-bold text-xl sm:text-2xl",
                    "mb-5 sm:mb-6"
                  )}>
                    {index + 1}
                  </div>

                  <h3 className="fluid-text-xl font-display font-semibold text-white mb-2 sm:mb-3">
                    {step.title}
                  </h3>
                  <p className="text-white/50 fluid-text-sm leading-relaxed">
                    {step.description}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Metrics */}
      <section className="section-premium section-no-fade relative">
        <div className="container-premium">
          <AnimatedSection>
            <SectionHeading
              title={t.metrics.title}
              subtitle={t.metrics.subtitle}
              size="lg"
              className="mb-14 sm:mb-20"
            />
          </AnimatedSection>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 lg:gap-6 max-w-6xl mx-auto">
            {metrics.map((metric, index) => (
              <AnimatedSection key={metric.key} delay={index * 100}>
                <Card
                  variant="soft"
                  size="md"
                  className={cn(
                    "h-full text-center",
                    "!p-4 sm:!p-6 lg:!p-8",
                    "!bg-gradient-to-br !from-gold/[0.04] !via-gold/[0.02] !to-transparent",
                    "!border-gold/[0.1]"
                  )}
                >
                  {/* Label */}
                  <div className={cn(
                    "fluid-text-xs font-semibold uppercase",
                    "tracking-[0.1em] sm:tracking-[0.15em] text-gold/60",
                    "mb-2 sm:mb-3 lg:mb-4",
                    "line-clamp-2 min-h-[2em]"
                  )}>
                    {metric.label}
                  </div>

                  {/* Value - Enhanced visual weight */}
                  <div className={cn(
                    "flex flex-col items-center mb-1.5 sm:mb-2 lg:mb-3"
                  )}>
                    <span className={cn(
                      "fluid-text-5xl font-bold",
                      "bg-gradient-to-r from-gold via-gold-light to-gold",
                      "bg-clip-text text-transparent",
                      "drop-shadow-[0_0_20px_rgba(212,175,55,0.15)]",
                      "whitespace-nowrap"
                    )}>
                      {metric.value}
                    </span>
                    <span className={cn(
                      "fluid-text-xl font-bold mt-0.5",
                      "bg-gradient-to-r from-gold via-gold-light to-gold",
                      "bg-clip-text text-transparent"
                    )}>
                      {metric.unit}
                    </span>
                  </div>

                  {/* Detail */}
                  <p className={cn(
                    "text-white/35 fluid-text-xs leading-relaxed",
                    "line-clamp-3"
                  )}>
                    {metric.detail}
                  </p>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Why Banks Choose DelTran */}
      <section className="section-premium section-no-fade relative">
        <div className="container-premium">
          <AnimatedSection>
            <SectionHeading
              title={t.why.title}
              size="lg"
              className="mb-14 sm:mb-20"
            />
          </AnimatedSection>

          <div className="grid md:grid-cols-2 gap-5 sm:gap-6 lg:gap-8 max-w-6xl mx-auto">
            {t.why.reasons.map((reason, index) => (
              <AnimatedSection
                key={index}
                delay={index * 120}
                direction={index % 2 === 0 ? 'left' : 'right'}
              >
                <Card
                  variant="soft"
                  size="lg"
                  className="h-full"
                >
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div className={cn(
                      "w-10 h-10 sm:w-12 sm:h-12 rounded-xl flex-shrink-0",
                      "bg-gradient-to-br from-gold/15 to-gold/5",
                      "border border-gold/10",
                      "flex items-center justify-center"
                    )}>
                      <CheckCircle2 className="w-5 h-5 sm:w-6 sm:h-6 text-gold" />
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <h3 className="fluid-text-2xl font-display font-semibold text-white mb-2 sm:mb-3">
                        {reason.title}
                      </h3>
                      <p className="text-white/50 fluid-text-base leading-relaxed">
                        {reason.description}
                      </p>
                    </div>
                  </div>
                </Card>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      <SectionDivider />

      {/* Contact CTA - Enhanced design with refined glow */}
      <section className="section-premium section-no-fade relative">
        <div className="container-premium">
          <AnimatedSection>
            <div className={cn(
              "relative overflow-hidden rounded-[2rem]",
              "p-10 sm:p-14 lg:p-20 xl:p-24",
              // Enhanced gradient background
              "bg-gradient-to-br from-gold/[0.10] via-gold/[0.05] to-gold/[0.02]",
              // Refined border
              "border border-gold/[0.18]",
              // Soft shadow
              "shadow-[0_8px_60px_-12px_rgba(212,175,55,0.15),inset_0_1px_0_rgba(255,255,255,0.04)]",
              "text-center"
            )}>
              {/* Primary decorative glow - enhanced */}
              <div
                className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] pointer-events-none"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.12) 0%, rgba(212,175,55,0.04) 40%, transparent 70%)'
                }}
                aria-hidden="true"
              />

              {/* Secondary subtle glow at bottom */}
              <div
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[200px] pointer-events-none opacity-50"
                style={{
                  background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.06) 0%, transparent 70%)'
                }}
                aria-hidden="true"
              />

              <div className="relative space-y-6 sm:space-y-8">
                <h2 className={cn(
                  "font-display font-bold fluid-text-4xl text-balance",
                  "text-white"
                )}>
                  {t.contact.title}
                </h2>

                <p className={cn(
                  "text-white/55 fluid-text-xl leading-relaxed text-balance",
                  "max-w-3xl mx-auto"
                )}>
                  {t.contact.subtitle}
                </p>

                <div className="flex flex-col items-center gap-6 sm:gap-8 pt-4 sm:pt-6">
                  {/* Primary CTA */}
                  <Link
                    href={`/${locale}/contact`}
                    className={cn(
                      "inline-flex items-center gap-3",
                      "px-8 sm:px-10 lg:px-12 py-4 sm:py-5 lg:py-6",
                      "rounded-full",
                      "bg-gradient-to-r from-gold/95 to-gold-light/95 text-black",
                      "font-semibold fluid-text-lg",
                      "shadow-[0_4px_24px_-4px_rgba(212,175,55,0.35)]"
                    )}
                  >
                    <span>{t.cta.button}</span>
                    <ArrowRight className="w-5 h-5 sm:w-6 sm:h-6" />
                  </Link>

                  {/* Direct Contact */}
                  <div className="text-center space-y-2">
                    <p className={cn(
                      "text-white/35 fluid-text-xs",
                      "uppercase tracking-[0.2em] font-medium"
                    )}>
                      {t.contact.directContact}
                    </p>
                    <a
                      href="mailto:partnerships@deltran.ai"
                      className={cn(
                        "text-gold/80",
                        "fluid-text-2xl font-semibold"
                      )}
                    >
                      {t.contact.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </>
  );
}
