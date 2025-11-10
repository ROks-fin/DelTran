'use client';

/**
 * Floating Animation Component
 * Creates smooth floating effects for premium aesthetics
 */

import { motion } from 'framer-motion';
import { ReactNode } from 'react';
import { floatingVariants } from '@/app/lib/animations/premiumAnimations';

interface FloatingElementProps {
  children: ReactNode;
  speed?: 'slow' | 'normal' | 'fast';
  amplitude?: number;
  className?: string;
}

export function FloatingElement({
  children,
  speed = 'normal',
  amplitude = 20,
  className = '',
}: FloatingElementProps) {
  const duration = {
    slow: 8,
    normal: 6,
    fast: 4,
  }[speed];

  return (
    <motion.div
      animate={{
        y: [-amplitude, amplitude, -amplitude],
        x: [-amplitude / 4, amplitude / 4, -amplitude / 4],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Orbiting Element
 */
interface OrbitingElementProps {
  children: ReactNode;
  radius?: number;
  duration?: number;
  reverse?: boolean;
  className?: string;
}

export function OrbitingElement({
  children,
  radius = 100,
  duration = 20,
  reverse = false,
  className = '',
}: OrbitingElementProps) {
  return (
    <motion.div
      animate={{
        rotate: reverse ? -360 : 360,
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'linear',
      }}
      style={{
        width: radius * 2,
        height: radius * 2,
      }}
      className={`relative ${className}`}
    >
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2"
        style={{
          transform: `translateX(-50%) rotate(${reverse ? 0 : -0}deg)`,
        }}
      >
        {children}
      </div>
    </motion.div>
  );
}

/**
 * Pulsing Glow Effect
 */
interface PulsingGlowProps {
  children: ReactNode;
  color?: string;
  intensity?: number;
  duration?: number;
  className?: string;
}

export function PulsingGlow({
  children,
  color = '212, 175, 55',
  intensity = 40,
  duration = 2,
  className = '',
}: PulsingGlowProps) {
  return (
    <motion.div
      animate={{
        boxShadow: [
          `0 0 ${intensity * 0.5}px rgba(${color}, 0.3)`,
          `0 0 ${intensity}px rgba(${color}, 0.6)`,
          `0 0 ${intensity * 0.5}px rgba(${color}, 0.3)`,
        ],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
