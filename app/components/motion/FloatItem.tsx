'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { ReactNode } from 'react';

interface FloatItemProps {
  children: ReactNode;
  className?: string;
  /** Float intensity: micro (3px), small (5px), medium (10px) */
  intensity?: 'micro' | 'small' | 'medium';
  /** Animation duration in seconds */
  duration?: number;
  /** Delay before animation starts */
  delay?: number;
}

/**
 * FloatItem - Subtle floating animation
 *
 * Creates a gentle floating effect using only transform.
 * Perfect for decorative elements, icons, or cards.
 *
 * @example
 * <FloatItem intensity="micro">
 *   <Icon />
 * </FloatItem>
 */
export function FloatItem({
  children,
  className = '',
  intensity = 'micro',
  duration = 4,
  delay = 0
}: FloatItemProps) {
  const prefersReducedMotion = useReducedMotion();

  const floatAmounts = {
    micro: 3,
    small: 5,
    medium: 10,
  };

  const amount = floatAmounts[intensity];

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        y: [0, -amount, 0],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      style={{
        willChange: 'transform',
        transform: 'translateZ(0)',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * PulseItem - Subtle opacity pulse
 */
interface PulseItemProps {
  children: ReactNode;
  className?: string;
  /** Minimum opacity (0-1) */
  minOpacity?: number;
  /** Duration in seconds */
  duration?: number;
}

export function PulseItem({
  children,
  className = '',
  minOpacity = 0.85,
  duration = 3,
}: PulseItemProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      animate={{
        opacity: [1, minOpacity, 1],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    >
      {children}
    </motion.div>
  );
}

/**
 * FlowDot - Animated dot for network flow visualizations
 */
interface FlowDotProps {
  className?: string;
  /** Direction: ltr (left to right) or rtl (right to left) */
  direction?: 'ltr' | 'rtl';
  /** Duration in seconds */
  duration?: number;
  /** Size of the dot */
  size?: number;
  /** Color of the dot */
  color?: string;
}

export function FlowDot({
  className = '',
  direction = 'ltr',
  duration = 2,
  size = 6,
  color = '#D4AF37',
}: FlowDotProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return (
      <div
        className={className}
        style={{
          width: size,
          height: size,
          borderRadius: '50%',
          backgroundColor: color,
        }}
      />
    );
  }

  const xValues = direction === 'ltr'
    ? ['0%', '100%']
    : ['0%', '-100%'];

  return (
    <motion.div
      className={className}
      style={{
        width: size,
        height: size,
        borderRadius: '50%',
        backgroundColor: color,
        willChange: 'transform, opacity',
      }}
      animate={{
        x: xValues,
        opacity: [0, 1, 1, 0],
      }}
      transition={{
        duration,
        repeat: Infinity,
        ease: 'easeInOut',
        times: [0, 0.2, 0.8, 1],
      }}
    />
  );
}

/**
 * ScaleOnHover - Subtle scale effect on hover
 */
interface ScaleOnHoverProps {
  children: ReactNode;
  className?: string;
  /** Scale amount (1.02 = 2% larger) */
  scale?: number;
}

export function ScaleOnHover({
  children,
  className = '',
  scale = 1.02,
}: ScaleOnHoverProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ scale }}
      transition={{
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}

/**
 * LiftOnHover - Subtle lift effect on hover
 */
interface LiftOnHoverProps {
  children: ReactNode;
  className?: string;
  /** Lift amount in pixels */
  lift?: number;
}

export function LiftOnHover({
  children,
  className = '',
  lift = 2,
}: LiftOnHoverProps) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div
      className={className}
      whileHover={{ y: -lift }}
      transition={{
        duration: 0.2,
        ease: [0.22, 1, 0.36, 1],
      }}
      style={{ transform: 'translateZ(0)' }}
    >
      {children}
    </motion.div>
  );
}
