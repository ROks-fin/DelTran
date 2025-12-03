'use client';

/**
 * AnimatedWrapper - Universal animation wrapper for page sections
 * DelTran Motion v2 - GPU-optimized
 *
 * Usage:
 * <AnimatedWrapper>
 *   <Section />
 * </AnimatedWrapper>
 *
 * <AnimatedWrapper stagger>
 *   <Card />
 *   <Card />
 * </AnimatedWrapper>
 */

import { motion, useInView, useReducedMotion, Variants } from 'framer-motion';
import { ReactNode, useRef, Children, isValidElement, cloneElement } from 'react';

// Animation variants
const fadeUpVariant: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const fadeVariant: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const scaleVariant: Variants = {
  hidden: { opacity: 0, scale: 0.985 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideLeftVariant: Variants = {
  hidden: { opacity: 0, x: 30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

const slideRightVariant: Variants = {
  hidden: { opacity: 0, x: -30 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1],
    },
  },
};

type AnimationType = 'fadeUp' | 'fade' | 'scale' | 'slideLeft' | 'slideRight';

const variantMap: Record<AnimationType, Variants> = {
  fadeUp: fadeUpVariant,
  fade: fadeVariant,
  scale: scaleVariant,
  slideLeft: slideLeftVariant,
  slideRight: slideRightVariant,
};

interface AnimatedWrapperProps {
  children: ReactNode;
  className?: string;
  /** Animation type */
  animation?: AnimationType;
  /** Delay in ms */
  delay?: number;
  /** Trigger animation once or every time in view */
  once?: boolean;
  /** Threshold for intersection observer (0-1) */
  threshold?: number;
  /** Enable stagger animation for children */
  stagger?: boolean;
  /** Stagger delay between children in seconds */
  staggerDelay?: number;
}

export function AnimatedWrapper({
  children,
  className = '',
  animation = 'fadeUp',
  delay = 0,
  once = true,
  threshold = 0.2,
  stagger = false,
  staggerDelay = 0.1,
}: AnimatedWrapperProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once, amount: threshold });
  const prefersReducedMotion = useReducedMotion();

  // Get base variants
  const baseVariants = variantMap[animation];

  // If reduced motion, show immediately
  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  // Stagger mode - wrap each child
  if (stagger) {
    const containerVariants: Variants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          staggerChildren: staggerDelay,
          delayChildren: delay / 1000,
        },
      },
    };

    const childVariants: Variants = {
      hidden: baseVariants.hidden,
      visible: baseVariants.visible,
    };

    return (
      <motion.div
        ref={ref}
        className={className}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        variants={containerVariants}
        style={{ transform: 'translateZ(0)' }}
      >
        {Children.map(children, (child, index) => {
          if (!isValidElement(child)) return child;

          return (
            <motion.div
              key={index}
              variants={childVariants}
              style={{ transform: 'translateZ(0)' }}
            >
              {child}
            </motion.div>
          );
        })}
      </motion.div>
    );
  }

  // Single element mode
  const variants: Variants = {
    hidden: baseVariants.hidden,
    visible: {
      ...baseVariants.visible,
      transition: {
        ...(baseVariants.visible as { transition?: object }).transition,
        delay: delay / 1000,
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      variants={variants}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedCard - Pre-configured card animation
 */
interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  index?: number;
}

export function AnimatedCard({
  children,
  className = '',
  delay = 0,
  index = 0,
}: AnimatedCardProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 15, scale: 0.98 }}
      animate={
        isInView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 15, scale: 0.98 }
      }
      transition={{
        duration: 0.5,
        delay: (delay + index * 100) / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedSection - Pre-configured section animation
 */
interface AnimatedSectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
}

export function AnimatedSection({
  children,
  className = '',
  delay = 0,
}: AnimatedSectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 25 }}
      animate={
        isInView
          ? { opacity: 1, y: 0 }
          : { opacity: 0, y: 25 }
      }
      transition={{
        duration: 0.7,
        delay: delay / 1000,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * AnimatedHeading - Staggered heading animation
 */
interface AnimatedHeadingProps {
  children: ReactNode;
  className?: string;
}

export function AnimatedHeading({ children, className = '' }: AnimatedHeadingProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{
        duration: 0.6,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}
