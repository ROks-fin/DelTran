'use client';

import { motion, Variants } from 'framer-motion';
import { useScrollAnimation } from '@/app/lib/hooks/useScrollAnimation';
import { useReducedMotion } from '@/app/lib/hooks/useReducedMotion';
import { fadeInUp, fadeInLeft, fadeInRight, scaleIn } from '@/app/lib/animations/framer-variants';
import { ReactNode } from 'react';

export type AnimationType = 'fadeInUp' | 'fadeInLeft' | 'fadeInRight' | 'scaleIn' | 'none';

export interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  /**
   * Animation variant to use
   * @default 'fadeInUp'
   */
  animation?: AnimationType;
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  /**
   * Threshold for triggering animation (0-1)
   * @default 0.1
   */
  threshold?: number;
  /**
   * Whether animation should trigger only once
   * @default true
   */
  triggerOnce?: boolean;
  /**
   * Custom animation variants
   */
  customVariants?: Variants;
  /**
   * Viewport margin for triggering animation
   * @default "-100px"
   */
  viewportMargin?: string;
  /**
   * HTML element type to render
   * @default 'div'
   */
  as?: keyof JSX.IntrinsicElements;
}

const animationVariants: Record<AnimationType, Variants> = {
  fadeInUp,
  fadeInLeft,
  fadeInRight,
  scaleIn,
  none: {
    initial: {},
    animate: {},
  },
};

/**
 * Animated section component with scroll-triggered animations
 * Respects user's reduced motion preferences
 */
export function AnimatedSection({
  children,
  className = '',
  animation = 'fadeInUp',
  delay = 0,
  threshold = 0.1,
  triggerOnce = true,
  customVariants,
  viewportMargin = '-100px',
  as: Component = 'div',
}: AnimatedSectionProps) {
  const { ref, shouldAnimate } = useScrollAnimation({
    threshold,
    triggerOnce,
    delay,
    rootMargin: viewportMargin,
  });

  const prefersReducedMotion = useReducedMotion();

  // Use custom variants or predefined animation
  const variants = customVariants || animationVariants[animation];

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <div ref={ref as any} className={className}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref as any}
      className={className}
      initial="initial"
      animate={shouldAnimate ? 'animate' : 'initial'}
      variants={variants}
      // @ts-ignore - Component prop type compatibility
      as={Component}
    >
      {children}
    </motion.div>
  );
}

/**
 * Stagger container for animating children sequentially
 */
interface StaggerContainerProps {
  children: ReactNode;
  className?: string;
  /**
   * Delay between each child animation (in seconds)
   * @default 0.1
   */
  staggerDelay?: number;
  /**
   * Initial delay before first child animates (in seconds)
   * @default 0
   */
  initialDelay?: number;
  threshold?: number;
  triggerOnce?: boolean;
}

export function StaggerContainer({
  children,
  className = '',
  staggerDelay = 0.1,
  initialDelay = 0,
  threshold = 0.1,
  triggerOnce = true,
}: StaggerContainerProps) {
  const { ref, shouldAnimate } = useScrollAnimation({
    threshold,
    triggerOnce,
  });

  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : staggerDelay,
        delayChildren: prefersReducedMotion ? 0 : initialDelay,
      },
    },
  };

  return (
    <motion.div
      ref={ref as any}
      className={className}
      initial="initial"
      animate={shouldAnimate ? 'animate' : 'initial'}
      variants={containerVariants}
    >
      {children}
    </motion.div>
  );
}

/**
 * Individual stagger item to be used inside StaggerContainer
 */
interface StaggerItemProps {
  children: ReactNode;
  className?: string;
  animation?: AnimationType;
}

export function StaggerItem({ children, className = '', animation = 'fadeInUp' }: StaggerItemProps) {
  const variants = animationVariants[animation];

  return (
    <motion.div className={className} variants={variants}>
      {children}
    </motion.div>
  );
}

/**
 * Section with parallax effect
 */
interface ParallaxSectionProps {
  children: ReactNode;
  className?: string;
  /**
   * Parallax speed multiplier
   * @default -50
   */
  speed?: number;
  /**
   * Enable 3D transforms for depth
   * @default false
   */
  enable3D?: boolean;
}

export function ParallaxSection({
  children,
  className = '',
  speed = -50,
  enable3D = false,
}: ParallaxSectionProps) {
  const prefersReducedMotion = useReducedMotion();

  // Import parallax hook dynamically to avoid SSR issues
  const { useParallax } = require('@/app/lib/hooks/useParallax');
  const { ref, y } = useParallax({ speed });

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref as any}
      className={className}
      style={{
        y,
        ...(enable3D && { transform: 'translate3d(0, 0, 0)' }),
      }}
    >
      {children}
    </motion.div>
  );
}
