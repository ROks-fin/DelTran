'use client';

/**
 * HeroBackground - GPU-optimized floating orbs animation
 *
 * Performance Strategy:
 * - Uses only transform and opacity (GPU-accelerated properties)
 * - will-change hints for compositor promotion
 * - useReducedMotion for accessibility
 * - Infinite animations with optimized easing
 * - translateZ(0) forces GPU layer
 */

import { motion, useReducedMotion } from 'framer-motion';

// Premium easing curve
const premiumEase = [0.22, 1, 0.36, 1] as const;

interface OrbProps {
  className: string;
  duration: number;
  delay?: number;
  xRange?: [number, number];
  yRange?: [number, number];
}

function FloatingOrb({
  className,
  duration,
  delay = 0,
  xRange = [-10, 10],
  yRange = [-20, 0]
}: OrbProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className} />;
  }

  return (
    <motion.div
      className={className}
      initial={{
        x: 0,
        y: 0,
        opacity: 0.5
      }}
      animate={{
        x: [xRange[0], xRange[1], xRange[0]],
        y: [0, yRange[0], yRange[1], 0],
        opacity: [0.5, 0.8, 0.5]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.33, 0.66, 1]
      }}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
    />
  );
}

interface PulsingOrbProps {
  className: string;
  duration: number;
  delay?: number;
}

function PulsingOrb({ className, duration, delay = 0 }: PulsingOrbProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className} />;
  }

  return (
    <motion.div
      className={className}
      initial={{ scale: 1, opacity: 0.3 }}
      animate={{
        scale: [1, 1.05, 1],
        opacity: [0.3, 0.6, 0.3]
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut'
      }}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
    />
  );
}

export function HeroBackground() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Main floating orbs */}
      <FloatingOrb
        className="absolute top-1/4 left-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gold/[0.04] rounded-full blur-3xl"
        duration={8}
        delay={0}
        xRange={[-5, 5]}
        yRange={[-15, 5]}
      />

      <FloatingOrb
        className="absolute bottom-1/4 right-1/4 w-48 sm:w-64 md:w-96 h-48 sm:h-64 md:h-96 bg-gold/[0.04] rounded-full blur-3xl"
        duration={7}
        delay={1}
        xRange={[5, -5]}
        yRange={[-10, 10]}
      />

      {/* Center pulsing orb */}
      <PulsingOrb
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 sm:w-48 md:w-72 h-32 sm:h-48 md:h-72 bg-gold/[0.02] rounded-full blur-3xl"
        duration={4}
        delay={0.5}
      />
    </div>
  );
}

/**
 * ScrollIndicator - Animated scroll down indicator
 */
export function ScrollIndicator() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <div className="absolute bottom-8 sm:bottom-10 left-1/2 -translate-x-1/2">
      <motion.div
        className="w-6 h-10 rounded-full border border-white/15 flex justify-center pt-2"
        initial={prefersReducedMotion ? false : { opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 1.5, ease: premiumEase }}
      >
        <motion.div
          className="w-1 h-2 bg-gold/60 rounded-full"
          animate={prefersReducedMotion ? {} : {
            y: [0, 8, 0],
            opacity: [0.6, 1, 0.6]
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          style={{
            willChange: 'transform, opacity',
          }}
        />
      </motion.div>
    </div>
  );
}

/**
 * HeroContent - Animated hero content with stagger
 */
interface HeroContentProps {
  children: React.ReactNode;
}

export function HeroContent({ children }: HeroContentProps) {
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className="space-y-6 sm:space-y-8 max-w-5xl mx-auto"
      initial={prefersReducedMotion ? false : { opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{
        duration: 0.8,
        ease: premiumEase,
        staggerChildren: 0.1
      }}
      style={{
        willChange: 'transform, opacity',
        transform: 'translateZ(0)',
      }}
    >
      {children}
    </motion.div>
  );
}
