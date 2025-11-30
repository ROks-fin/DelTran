'use client';

/**
 * ISO Flow Animation Component
 * Visual representation of the payment flow: ISO 20022 → DelTran → Settlement
 *
 * Design: Animated flow diagram showing input → processing → output
 * No Framer Motion - CSS-only animations for performance
 */

import { useTranslations } from 'next-intl';
import { FileText, Cpu, CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';
import { useTextDirection } from '@/app/lib/hooks/useTextDirection';
import { cn } from '@/lib/utils';

export function IsoFlowAnimation() {
  const t = useTranslations('platform');
  const { isRTL } = useTextDirection();

  const Arrow = isRTL ? ArrowLeft : ArrowRight;

  const steps = [
    {
      key: 'input',
      icon: FileText,
      color: 'from-blue-500/20 to-blue-600/10',
      borderColor: 'border-blue-500/30',
      iconColor: 'text-blue-400',
      glowColor: 'rgba(59, 130, 246, 0.15)',
    },
    {
      key: 'process',
      icon: Cpu,
      color: 'from-gold/20 to-gold/10',
      borderColor: 'border-gold/30',
      iconColor: 'text-gold',
      glowColor: 'rgba(212, 175, 55, 0.2)',
      isPrimary: true,
    },
    {
      key: 'output',
      icon: CheckCircle2,
      color: 'from-emerald-500/20 to-emerald-600/10',
      borderColor: 'border-emerald-500/30',
      iconColor: 'text-emerald-400',
      glowColor: 'rgba(16, 185, 129, 0.15)',
    },
  ];

  return (
    <section className="section-premium relative bg-gradient-to-b from-[#050505] to-black overflow-hidden">
      {/* Subtle background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 50% 50%, rgba(212,175,55,0.04) 0%, transparent 70%)'
        }}
        aria-hidden="true"
      />

      <div className="container-premium relative">
        {/* Section Header */}
        <div className="text-center mb-12 sm:mb-16 lg:mb-20">
          <h2 className={cn(
            "font-display font-bold tracking-tight text-balance",
            "text-3xl sm:text-4xl lg:text-5xl",
            "bg-gradient-to-r from-white via-white/95 to-white/80",
            "bg-clip-text text-transparent",
            "mb-4 sm:mb-6"
          )}>
            {t('isoFlow.title')}
          </h2>
          <p className="text-white/60 text-lg sm:text-xl max-w-3xl mx-auto">
            {t('isoFlow.subtitle')}
          </p>
        </div>

        {/* Flow Diagram */}
        <div className="max-w-5xl mx-auto">
          <div className={cn(
            "flex items-center justify-center gap-4 sm:gap-6 lg:gap-8",
            isRTL && "flex-row-reverse"
          )}>
            {steps.map((step, index) => (
              <div key={step.key} className="contents">
                {/* Step Card */}
                <div
                  className={cn(
                    "relative flex-1 max-w-[280px]",
                    "animate-fade-in-up"
                  )}
                  style={{ animationDelay: `${index * 0.15}s` }}
                >
                  <div className={cn(
                    "relative p-6 sm:p-8 rounded-2xl",
                    "bg-gradient-to-br",
                    step.color,
                    "border",
                    step.borderColor,
                    "backdrop-blur-sm",
                    step.isPrimary && "ring-1 ring-gold/20",
                    "group hover:scale-[1.02] transition-transform duration-300"
                  )}
                  style={{
                    boxShadow: step.isPrimary
                      ? `0 0 60px -10px ${step.glowColor}, inset 0 1px 0 rgba(255,255,255,0.05)`
                      : `0 0 40px -10px ${step.glowColor}`
                  }}
                  >
                    {/* Icon */}
                    <div className={cn(
                      "w-14 h-14 sm:w-16 sm:h-16 rounded-xl mx-auto mb-4 sm:mb-5",
                      "bg-black/40 border border-white/10",
                      "flex items-center justify-center",
                      "group-hover:border-white/20 transition-colors duration-300"
                    )}>
                      <step.icon className={cn(
                        "w-7 h-7 sm:w-8 sm:h-8",
                        step.iconColor
                      )} />
                    </div>

                    {/* Text */}
                    <h3 className={cn(
                      "text-lg sm:text-xl font-display font-semibold text-white text-center mb-2"
                    )}>
                      {t(`isoFlow.steps.${step.key}.title`)}
                    </h3>
                    <p className="text-white/50 text-sm sm:text-base text-center leading-relaxed">
                      {t(`isoFlow.steps.${step.key}.description`)}
                    </p>

                    {/* Pulse animation for primary step */}
                    {step.isPrimary && (
                      <div
                        className="absolute inset-0 rounded-2xl animate-pulse-slow pointer-events-none"
                        style={{
                          background: 'radial-gradient(ellipse at center, rgba(212,175,55,0.1) 0%, transparent 70%)'
                        }}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                </div>

                {/* Arrow between steps */}
                {index < steps.length - 1 && (
                  <div
                    className="hidden sm:flex items-center justify-center animate-fade-in"
                    style={{ animationDelay: `${(index + 0.5) * 0.15}s` }}
                  >
                    <div className="relative">
                      {/* Animated arrow line */}
                      <div className={cn(
                        "w-8 lg:w-12 h-[2px]",
                        "bg-gradient-to-r from-white/20 via-gold/40 to-white/20",
                        "rounded-full"
                      )} />
                      <Arrow className={cn(
                        "absolute top-1/2 -translate-y-1/2",
                        isRTL ? "-left-1" : "-right-1",
                        "w-4 h-4 text-gold/60"
                      )} />

                      {/* Flowing dot animation */}
                      <div
                        className={cn(
                          "absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5",
                          "bg-gold rounded-full",
                          "animate-flow-dot"
                        )}
                        style={{
                          left: isRTL ? 'auto' : '0',
                          right: isRTL ? '0' : 'auto',
                        }}
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile: Vertical arrows */}
          <div className="sm:hidden flex flex-col items-center gap-4 mt-6">
            {steps.map((step, index) => (
              <div key={step.key} className="contents">
                {index > 0 && (
                  <div className="flex flex-col items-center gap-1 -my-2">
                    <div className="w-[2px] h-6 bg-gradient-to-b from-white/10 via-gold/30 to-white/10 rounded-full" />
                    <ArrowRight className="w-4 h-4 text-gold/60 rotate-90" />
                  </div>
                )}
                <div
                  className={cn(
                    "w-full max-w-[280px] p-5 rounded-2xl",
                    "bg-gradient-to-br",
                    step.color,
                    "border",
                    step.borderColor,
                    step.isPrimary && "ring-1 ring-gold/20"
                  )}
                >
                  <div className="flex items-center gap-4">
                    <div className={cn(
                      "w-12 h-12 rounded-xl flex-shrink-0",
                      "bg-black/40 border border-white/10",
                      "flex items-center justify-center"
                    )}>
                      <step.icon className={cn("w-6 h-6", step.iconColor)} />
                    </div>
                    <div>
                      <h3 className="text-base font-display font-semibold text-white">
                        {t(`isoFlow.steps.${step.key}.title`)}
                      </h3>
                      <p className="text-white/50 text-sm">
                        {t(`isoFlow.steps.${step.key}.description`)}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
