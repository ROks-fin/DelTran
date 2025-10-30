/**
 * Premium Spring Configurations & Easing Functions
 * Inspired by Linear, Stripe, and Apple animations
 */

import { Transition } from 'framer-motion';

export type SpringConfig = {
  type: 'spring';
  stiffness: number;
  damping: number;
  mass: number;
};

export type EasingArray = [number, number, number, number];

/**
 * Spring configurations for different animation types
 */
export const springConfigs = {
  // Ultra-smooth spring for premium feel
  smooth: {
    type: 'spring' as const,
    stiffness: 100,
    damping: 30,
    mass: 1,
  },

  // Snappy response for micro-interactions
  snappy: {
    type: 'spring' as const,
    stiffness: 400,
    damping: 40,
    mass: 0.8,
  },

  // Bouncy for playful elements
  bouncy: {
    type: 'spring' as const,
    stiffness: 300,
    damping: 20,
    mass: 1.2,
  },

  // Slow for background elements
  slow: {
    type: 'spring' as const,
    stiffness: 50,
    damping: 20,
    mass: 2,
  },

  // Gentle for subtle animations
  gentle: {
    type: 'spring' as const,
    stiffness: 120,
    damping: 25,
    mass: 0.5,
  },

  // Wobbly for attention-grabbing
  wobbly: {
    type: 'spring' as const,
    stiffness: 180,
    damping: 12,
    mass: 1.5,
  },
} as const;

/**
 * Cubic Bezier easing functions for premium animations
 */
export const easingFunctions = {
  // Expo easing - dramatic acceleration/deceleration
  easeOutExpo: [0.16, 1, 0.3, 1] as EasingArray,
  easeInExpo: [0.7, 0, 0.84, 0] as EasingArray,
  easeInOutExpo: [0.87, 0, 0.13, 1] as EasingArray,

  // Cubic easing - smooth and balanced
  easeInOutCubic: [0.65, 0, 0.35, 1] as EasingArray,
  easeOutCubic: [0.33, 1, 0.68, 1] as EasingArray,
  easeInCubic: [0.32, 0, 0.67, 0] as EasingArray,

  // Back easing - slight overshoot
  easeOutBack: [0.34, 1.56, 0.64, 1] as EasingArray,
  easeInBack: [0.36, 0, 0.66, -0.56] as EasingArray,
  easeInOutBack: [0.68, -0.6, 0.32, 1.6] as EasingArray,

  // Circ easing - circular curve
  easeOutCirc: [0, 0.55, 0.45, 1] as EasingArray,
  easeInCirc: [0.55, 0, 1, 0.45] as EasingArray,
  easeInOutCirc: [0.85, 0, 0.15, 1] as EasingArray,

  // Custom smooth - optimized for web
  customSmooth: [0.25, 0.46, 0.45, 0.94] as EasingArray,

  // Apple-style easing
  appleEasing: [0.4, 0, 0.2, 1] as EasingArray,

  // Linear-style easing
  linearEasing: [0.25, 0.1, 0.25, 1] as EasingArray,
} as const;

/**
 * Duration presets for consistent timing
 */
export const durations = {
  fastest: 0.15,
  fast: 0.3,
  normal: 0.5,
  slow: 0.8,
  slower: 1.2,
  slowest: 1.8,
} as const;

/**
 * Stagger configurations for sequential animations
 */
export const staggerConfigs = {
  // Quick stagger for lists
  quick: {
    staggerChildren: 0.05,
    delayChildren: 0.1,
  },

  // Normal stagger for cards/sections
  normal: {
    staggerChildren: 0.1,
    delayChildren: 0.2,
  },

  // Slow stagger for hero elements
  slow: {
    staggerChildren: 0.15,
    delayChildren: 0.3,
  },

  // Custom stagger with fade
  fade: {
    staggerChildren: 0.08,
    delayChildren: 0.15,
  },
} as const;

/**
 * Transition presets combining spring configs and durations
 */
export const transitionPresets: Record<string, Transition> = {
  // Smooth fade and scale
  fadeScale: {
    ...springConfigs.smooth,
    duration: durations.normal,
  },

  // Quick hover response
  hoverQuick: {
    ...springConfigs.snappy,
    duration: durations.fast,
  },

  // Smooth slide
  slide: {
    ...springConfigs.smooth,
    duration: durations.slow,
  },

  // Bouncy entrance
  entrance: {
    ...springConfigs.bouncy,
    duration: durations.normal,
  },

  // Gentle background
  background: {
    ...springConfigs.gentle,
    duration: durations.slower,
  },
};

/**
 * Delay presets for sequential animations
 */
export const delays = {
  none: 0,
  short: 0.1,
  medium: 0.2,
  long: 0.4,
  longer: 0.6,
} as const;

/**
 * GPU-accelerated transform defaults
 */
export const gpuAcceleration = {
  transform: 'translate3d(0, 0, 0)',
  willChange: 'transform, opacity',
} as const;

/**
 * Helper to create custom spring config
 */
export const createSpringConfig = (
  stiffness: number,
  damping: number,
  mass: number = 1
): SpringConfig => ({
  type: 'spring',
  stiffness,
  damping,
  mass,
});

/**
 * Helper to create tween transition
 */
export const createTween = (
  duration: number,
  ease: EasingArray,
  delay: number = 0
): Transition => ({
  duration,
  ease,
  delay,
});
