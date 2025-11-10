'use client';

/**
 * Scroll Reveal Animation Component
 * Reveals elements as they enter the viewport
 */

import { motion, useInView } from 'framer-motion';
import { useRef, ReactNode } from 'react';
import {
  scrollReveal,
  scrollRevealLeft,
  scrollRevealRight,
  transitions,
} from '@/app/lib/animations/premiumAnimations';

interface ScrollRevealProps {
  children: ReactNode;
  direction?: 'up' | 'left' | 'right';
  delay?: number;
  duration?: number;
  once?: boolean;
  className?: string;
  amount?: number;
}

export function ScrollReveal({
  children,
  direction = 'up',
  delay = 0,
  duration = 0.8,
  once = true,
  className = '',
  amount = 0.3,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount });

  const variants = {
    up: scrollReveal,
    left: scrollRevealLeft,
    right: scrollRevealRight,
  }[direction];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      transition={{
        ...transitions.default,
        duration,
        delay,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Reveal - reveals children one by one
 */
interface StaggerRevealProps {
  children: ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
}

export function StaggerReveal({
  children,
  staggerDelay = 0.1,
  initialDelay = 0,
  className = '',
}: StaggerRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            delayChildren: initialDelay,
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger Item - child of StaggerReveal
 */
export function StaggerItem({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
