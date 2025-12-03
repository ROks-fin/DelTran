'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface PremiumShimmerProps {
  children: ReactNode;
  className?: string;
  /** Enable gold shimmer animation */
  shimmer?: boolean;
  /** Enable subtle glow pulse */
  glow?: boolean;
}

/**
 * PremiumShimmer - Gold shimmer text effect
 *
 * Creates a premium gold shimmer effect on text.
 * Uses only background-position animation (GPU-friendly).
 *
 * Colors: #D4AF37 (gold), #FFD700 (light gold), #FFFFFF (white accent)
 *
 * @example
 * <PremiumShimmer shimmer>
 *   <span>Premium Feature</span>
 * </PremiumShimmer>
 */
export function PremiumShimmer({
  children,
  className = '',
  shimmer = false,
  glow = false
}: PremiumShimmerProps) {
  const prefersReducedMotion = useReducedMotion();

  const shimmerClass = shimmer && !prefersReducedMotion
    ? 'dt-shimmer-gold'
    : 'dt-gold-gradient';

  const glowClass = glow && !prefersReducedMotion
    ? 'dt-gold-glow-pulse'
    : glow
      ? 'dt-gold-glow'
      : '';

  return (
    <span className={`${shimmerClass} ${glowClass} ${className}`}>
      {children}
    </span>
  );
}

/**
 * GoldGradientText - Static gold gradient text (no animation)
 */
interface GoldGradientTextProps {
  children: ReactNode;
  className?: string;
}

export function GoldGradientText({ children, className = '' }: GoldGradientTextProps) {
  return (
    <span
      className={`dt-gold-gradient ${className}`}
      style={{
        background: 'linear-gradient(135deg, #D4AF37 0%, #FFD700 50%, #D4AF37 100%)',
        WebkitBackgroundClip: 'text',
        backgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </span>
  );
}

/**
 * GoldGlowBox - Box with gold glow effect
 */
interface GoldGlowBoxProps {
  children: ReactNode;
  className?: string;
  pulse?: boolean;
  intensity?: 'sm' | 'md' | 'lg';
}

export function GoldGlowBox({
  children,
  className = '',
  pulse = false,
  intensity = 'md'
}: GoldGlowBoxProps) {
  const prefersReducedMotion = useReducedMotion();

  const glowClasses = {
    sm: 'dt-gold-glow-sm',
    md: 'dt-gold-glow',
    lg: 'dt-gold-glow-lg',
  };

  const pulseAnimation = pulse && !prefersReducedMotion ? {
    boxShadow: [
      '0 0 30px rgba(212, 175, 55, 0.3)',
      '0 0 50px rgba(212, 175, 55, 0.5)',
      '0 0 30px rgba(212, 175, 55, 0.3)',
    ],
  } : {};

  return (
    <motion.div
      className={`${glowClasses[intensity]} ${className}`}
      animate={pulseAnimation}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}
