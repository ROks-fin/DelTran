'use client';

/**
 * HeroAnimated - Client component for Hero section animations
 * DelTran Motion v2 - GPU-optimized
 */

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface HeroAnimatedProps {
  children: ReactNode;
  className?: string;
}

// Container for staggered hero animations
export function HeroAnimated({ children, className = '' }: HeroAnimatedProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="visible"
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.12,
            delayChildren: prefersReducedMotion ? 0 : 0.1,
          },
        },
      }}
    >
      {children}
    </motion.div>
  );
}

// Individual animated item for hero content
interface HeroItemProps {
  children: ReactNode;
  className?: string;
  index?: number;
}

export function HeroItem({ children, className = '', index = 0 }: HeroItemProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={{
        hidden: {
          opacity: 0,
          y: prefersReducedMotion ? 0 : 20,
          scale: prefersReducedMotion ? 1 : 0.98,
        },
        visible: {
          opacity: 1,
          y: 0,
          scale: 1,
          transition: {
            duration: prefersReducedMotion ? 0 : 0.6,
            ease: [0.22, 1, 0.36, 1],
          },
        },
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}

// Floating orb with subtle animation
interface FloatingOrbProps {
  className?: string;
  delay?: number;
}

export function FloatingOrb({ className = '', delay = 0 }: FloatingOrbProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className} />;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -10, 0],
        opacity: [0.04, 0.06, 0.04],
      }}
      transition={{
        duration: 8,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{ transform: 'translateZ(0)' }}
    />
  );
}

// Scroll indicator with bounce animation
export function ScrollIndicator({ className = '' }: { className?: string }) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        delay: prefersReducedMotion ? 0 : 1.5,
        duration: prefersReducedMotion ? 0 : 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      <motion.div
        className="w-1 h-2 bg-gold/60 rounded-full"
        animate={
          prefersReducedMotion
            ? {}
            : {
                y: [0, 4, 0],
              }
        }
        transition={{
          duration: 1.5,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />
    </motion.div>
  );
}

// Gold shimmer text effect
interface ShimmerTextProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
}

export function ShimmerText({ children, className = '', animate = true }: ShimmerTextProps) {
  const prefersReducedMotion = useReducedMotion();

  if (!animate || prefersReducedMotion) {
    return <span className={className}>{children}</span>;
  }

  return (
    <motion.span
      className={`${className} dt-shimmer-gold`}
      initial={{ backgroundPosition: '-200% center' }}
      animate={{ backgroundPosition: '200% center' }}
      transition={{
        duration: 3,
        repeat: Infinity,
        ease: 'linear',
      }}
    >
      {children}
    </motion.span>
  );
}

/**
 * GlowingBackground - Smooth animated radial gradient glow
 * GPU-optimized with transform and opacity only
 */
export function GlowingBackground() {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 80% 60% at 50% 40%, rgba(212,175,55,0.08) 0%, transparent 60%)'
        }}
      />
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {/* Primary glow - moves slowly */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.6, 1, 0.6],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        style={{
          background: 'radial-gradient(ellipse 70% 50% at 50% 45%, rgba(212,175,55,0.1) 0%, transparent 60%)',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        }}
      />

      {/* Secondary glow - offset movement */}
      <motion.div
        className="absolute inset-0"
        animate={{
          scale: [1.1, 1, 1.1],
          opacity: [0.4, 0.8, 0.4],
          x: ['-5%', '5%', '-5%'],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
        style={{
          background: 'radial-gradient(ellipse 60% 40% at 55% 50%, rgba(212,175,55,0.06) 0%, transparent 55%)',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        }}
      />

      {/* Tertiary subtle pulse */}
      <motion.div
        className="absolute inset-0"
        animate={{
          opacity: [0.3, 0.6, 0.3],
          y: ['-3%', '3%', '-3%'],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
        style={{
          background: 'radial-gradient(ellipse 90% 70% at 45% 40%, rgba(212,175,55,0.04) 0%, transparent 70%)',
          willChange: 'transform, opacity',
          transform: 'translateZ(0)',
        }}
      />
    </div>
  );
}
