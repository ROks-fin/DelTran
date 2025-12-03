'use client';

import { motion, useInView, useReducedMotion } from 'framer-motion';
import { ReactNode, useRef } from 'react';

interface StaggerSectionProps {
  children: ReactNode;
  className?: string;
  /** Stagger delay between items (seconds) */
  staggerDelay?: number;
  /** Trigger animation once or every time in view */
  once?: boolean;
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
}

/**
 * StaggerSection - Section with staggered child animations
 *
 * Animates children with staggered delays when section comes into view.
 * Uses IntersectionObserver for performance.
 * GPU-optimized (transform + opacity only).
 *
 * @example
 * <StaggerSection staggerDelay={0.08}>
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </StaggerSection>
 */
export function StaggerSection({
  children,
  className = '',
  staggerDelay = 0.08,
  once = true,
  threshold = 0.1
}: StaggerSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = useReducedMotion();

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: prefersReducedMotion ? 0 : 10,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: prefersReducedMotion ? 0 : 0.4,
        ease: [0.22, 1, 0.36, 1],
      },
    },
  };

  // Wrap children in motion.div for stagger effect
  const childArray = Array.isArray(children) ? children : [children];

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={containerVariants}
      style={{ transform: 'translateZ(0)' }}
    >
      {childArray.map((child, index) => (
        <motion.div key={index} variants={itemVariants}>
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}

/**
 * RevealSection - Single section reveal animation
 */
interface RevealSectionProps {
  children: ReactNode;
  className?: string;
  direction?: 'up' | 'down' | 'left' | 'right' | 'scale';
  once?: boolean;
  delay?: number;
}

export function RevealSection({
  children,
  className = '',
  direction = 'up',
  once = true,
  delay = 0,
}: RevealSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  const getInitialState = () => {
    if (prefersReducedMotion) return { opacity: 0 };

    switch (direction) {
      case 'up': return { opacity: 0, y: 20 };
      case 'down': return { opacity: 0, y: -20 };
      case 'left': return { opacity: 0, x: 20 };
      case 'right': return { opacity: 0, x: -20 };
      case 'scale': return { opacity: 0, scale: 0.985 };
      default: return { opacity: 0 };
    }
  };

  const getFinalState = () => {
    switch (direction) {
      case 'up':
      case 'down': return { opacity: 1, y: 0 };
      case 'left':
      case 'right': return { opacity: 1, x: 0 };
      case 'scale': return { opacity: 1, scale: 1 };
      default: return { opacity: 1 };
    }
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={getInitialState()}
      animate={isInView ? getFinalState() : getInitialState()}
      transition={{
        duration: prefersReducedMotion ? 0 : 0.5,
        delay: prefersReducedMotion ? 0 : delay,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * CardStagger - Optimized for card grids
 */
interface CardStaggerProps {
  children: ReactNode[];
  className?: string;
  columns?: 2 | 3 | 4;
}

export function CardStagger({
  children,
  className = '',
  columns = 3
}: CardStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const prefersReducedMotion = useReducedMotion();

  const gridClass = {
    2: 'grid-cols-1 md:grid-cols-2',
    3: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3',
    4: 'grid-cols-1 md:grid-cols-2 lg:grid-cols-4',
  };

  return (
    <motion.div
      ref={ref}
      className={`grid gap-6 ${gridClass[columns]} ${className}`}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: prefersReducedMotion ? 0 : 0.1,
          },
        },
      }}
    >
      {children.map((child, index) => (
        <motion.div
          key={index}
          variants={{
            hidden: { opacity: 0, scale: prefersReducedMotion ? 1 : 0.985 },
            visible: {
              opacity: 1,
              scale: 1,
              transition: {
                duration: prefersReducedMotion ? 0 : 0.4,
                ease: [0.22, 1, 0.36, 1],
              },
            },
          }}
          style={{ transform: 'translateZ(0)' }}
        >
          {child}
        </motion.div>
      ))}
    </motion.div>
  );
}
