/**
 * Premium Framer Motion Animation Variants
 * Pre-configured animation presets for consistent motion design
 */

import { Variants } from 'framer-motion';
import { easingFunctions, durations, staggerConfigs, springConfigs } from './spring-configs';

/**
 * Fade animations
 */
export const fadeIn: Variants = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easingFunctions.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    transition: { duration: durations.fast },
  },
};

export const fadeInUp: Variants = {
  initial: {
    opacity: 0,
    y: 60,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: durations.slow,
      ease: easingFunctions.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -30,
    transition: { duration: durations.fast },
  },
};

export const fadeInDown: Variants = {
  initial: {
    opacity: 0,
    y: -60,
    filter: 'blur(10px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: durations.slow,
      ease: easingFunctions.easeOutExpo,
    },
  },
};

export const fadeInLeft: Variants = {
  initial: {
    opacity: 0,
    x: -60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easingFunctions.easeOutExpo,
    },
  },
};

export const fadeInRight: Variants = {
  initial: {
    opacity: 0,
    x: 60,
  },
  animate: {
    opacity: 1,
    x: 0,
    transition: {
      duration: durations.normal,
      ease: easingFunctions.easeOutExpo,
    },
  },
};

/**
 * Scale animations
 */
export const scaleIn: Variants = {
  initial: {
    opacity: 0,
    scale: 0.8,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springConfigs.smooth,
  },
  exit: {
    opacity: 0,
    scale: 0.9,
    transition: { duration: durations.fast },
  },
};

export const scaleUp: Variants = {
  initial: {
    opacity: 0,
    scale: 0.5,
  },
  animate: {
    opacity: 1,
    scale: 1,
    transition: springConfigs.bouncy,
  },
};

export const scaleRotate: Variants = {
  initial: {
    scale: 0,
    rotate: -180,
    opacity: 0,
  },
  animate: {
    scale: 1,
    rotate: 0,
    opacity: 1,
    transition: springConfigs.bouncy,
  },
};

/**
 * Slide animations
 */
export const slideInUp: Variants = {
  initial: {
    y: '100%',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: durations.slow,
      ease: easingFunctions.easeOutExpo,
    },
  },
};

export const slideInDown: Variants = {
  initial: {
    y: '-100%',
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: durations.slow,
      ease: easingFunctions.easeOutExpo,
    },
  },
};

/**
 * Stagger containers
 */
export const staggerContainer: Variants = {
  initial: {},
  animate: {
    transition: staggerConfigs.normal,
  },
};

export const staggerContainerFast: Variants = {
  initial: {},
  animate: {
    transition: staggerConfigs.quick,
  },
};

export const staggerContainerSlow: Variants = {
  initial: {},
  animate: {
    transition: staggerConfigs.slow,
  },
};

/**
 * Text animations
 */
export const textReveal: Variants = {
  initial: {
    clipPath: 'inset(0 100% 0 0)',
  },
  animate: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: durations.slower,
      ease: easingFunctions.easeOutExpo,
    },
  },
};

export const textSlideUp: Variants = {
  initial: {
    y: '100%',
  },
  animate: {
    y: 0,
    transition: {
      duration: durations.slow,
      ease: easingFunctions.easeOutExpo,
    },
  },
};

export const letterAnimation: Variants = {
  initial: {
    opacity: 0,
    y: 50,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easingFunctions.easeOutExpo,
    },
  },
};

export const wordAnimation: Variants = {
  initial: {
    opacity: 0,
    y: 20,
    filter: 'blur(8px)',
  },
  animate: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: {
      duration: durations.normal,
      ease: easingFunctions.easeOutExpo,
    },
  },
};

/**
 * Hover animations
 */
export const hoverScale: Variants = {
  initial: { scale: 1 },
  whileHover: {
    scale: 1.05,
    transition: springConfigs.snappy,
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const hoverLift: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  },
  whileHover: {
    y: -8,
    boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
    transition: springConfigs.smooth,
  },
};

export const hoverRotate3D: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
  },
  whileHover: {
    rotateX: 5,
    rotateY: 5,
    transition: springConfigs.smooth,
  },
};

/**
 * Card animations
 */
export const cardHover: Variants = {
  initial: {
    y: 0,
    boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
  },
  whileHover: {
    y: -10,
    boxShadow: '0 20px 40px -10px rgba(0, 0, 0, 0.15)',
    transition: springConfigs.smooth,
  },
  whileTap: {
    scale: 0.98,
    transition: { duration: 0.1 },
  },
};

export const card3D: Variants = {
  initial: {
    rotateX: 0,
    rotateY: 0,
    scale: 1,
  },
  whileHover: {
    scale: 1.02,
    transition: springConfigs.smooth,
  },
};

/**
 * Button animations
 */
export const buttonHover: Variants = {
  initial: {
    scale: 1,
    boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)',
  },
  whileHover: {
    scale: 1.05,
    boxShadow: '0 10px 30px -5px rgba(37, 99, 235, 0.3)',
    transition: springConfigs.snappy,
  },
  whileTap: {
    scale: 0.95,
    transition: { duration: 0.1 },
  },
};

export const buttonPulse: Variants = {
  initial: { scale: 1 },
  animate: {
    scale: [1, 1.05, 1],
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Image animations
 */
export const imageReveal: Variants = {
  initial: {
    clipPath: 'inset(0 100% 0 0)',
  },
  animate: {
    clipPath: 'inset(0 0% 0 0)',
    transition: {
      duration: durations.slower,
      ease: easingFunctions.easeInOutExpo,
    },
  },
};

export const imageZoom: Variants = {
  initial: {
    scale: 1.2,
    opacity: 0,
  },
  animate: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: durations.slower,
      ease: easingFunctions.easeOutExpo,
    },
  },
};

/**
 * Loading animations
 */
export const shimmer: Variants = {
  initial: {
    backgroundPosition: '-1000px 0',
  },
  animate: {
    backgroundPosition: '1000px 0',
    transition: {
      duration: 2,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

export const spin: Variants = {
  animate: {
    rotate: 360,
    transition: {
      duration: 1,
      repeat: Infinity,
      ease: 'linear',
    },
  },
};

/**
 * Navigation animations
 */
export const navItemHover: Variants = {
  initial: { scale: 1 },
  whileHover: {
    scale: 1.05,
    transition: { duration: 0.2 },
  },
};

export const mobileMenuSlide: Variants = {
  initial: {
    x: '100%',
    opacity: 0,
  },
  animate: {
    x: 0,
    opacity: 1,
    transition: {
      duration: durations.normal,
      ease: easingFunctions.easeOutExpo,
    },
  },
  exit: {
    x: '100%',
    opacity: 0,
    transition: {
      duration: durations.fast,
      ease: easingFunctions.easeInExpo,
    },
  },
};

/**
 * Form animations
 */
export const inputFocus: Variants = {
  initial: {
    boxShadow: '0 0 0 0 rgba(37, 99, 235, 0)',
  },
  focus: {
    boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
    transition: { duration: 0.2 },
  },
};

export const errorShake: Variants = {
  animate: {
    x: [-10, 10, -10, 10, 0],
    transition: {
      duration: 0.4,
    },
  },
};

/**
 * Success animations
 */
export const successCheckmark: Variants = {
  initial: {
    pathLength: 0,
    opacity: 0,
  },
  animate: {
    pathLength: 1,
    opacity: 1,
    transition: {
      duration: durations.slow,
      ease: easingFunctions.easeInOutCubic,
    },
  },
};

/**
 * Floating animation for hero elements
 */
export const floating: Variants = {
  animate: {
    y: [-10, 10, -10],
    transition: {
      duration: 4,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

export const floatingSlow: Variants = {
  animate: {
    y: [-15, 15, -15],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  },
};

/**
 * Parallax layers
 */
export const parallaxLayer = (speed: number): Variants => ({
  initial: { y: 0 },
  animate: { y: speed },
});

/**
 * Page transitions
 */
export const pageTransition: Variants = {
  initial: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,
    transition: {
      duration: durations.normal,
      ease: easingFunctions.easeOutExpo,
    },
  },
  exit: {
    opacity: 0,
    y: -20,
    transition: {
      duration: durations.fast,
      ease: easingFunctions.easeInExpo,
    },
  },
};
