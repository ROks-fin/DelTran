'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

/**
 * HeroReveal - Premium hero section reveal animation
 *
 * GPU-optimized animation using only transform and opacity.
 * Respects user's reduced motion preferences.
 *
 * @example
 * <HeroReveal>
 *   <h1>Welcome to DelTran</h1>
 * </HeroReveal>
 */
export function HeroReveal({ children, className = '', delay = 0 }: HeroRevealProps) {
  const prefersReducedMotion = useReducedMotion();

  const variants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 20,
      scale: prefersReducedMotion ? 1 : 0.985,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={variants}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.6,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1], // Premium easing
      }}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)', // Force GPU layer
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * HeroRevealStagger - Staggered hero reveal for multiple elements
 */
interface HeroRevealStaggerProps {
  children: ReactNode[];
  className?: string;
  staggerDelay?: number;
}

export function HeroRevealStagger({
  children,
  className = '',
  staggerDelay = 0.08
}: HeroRevealStaggerProps) {
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 15,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.5,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {children.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
