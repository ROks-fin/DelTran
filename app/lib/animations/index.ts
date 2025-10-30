/**
 * Animation Configuration Exports
 * Central export point for all animation configurations
 */

// Spring configurations and easing functions
export {
  springConfigs,
  easingFunctions,
  durations,
  staggerConfigs,
  transitionPresets,
  delays,
  gpuAcceleration,
  createSpringConfig,
  createTween,
} from './spring-configs';

export type {
  SpringConfig,
  EasingArray,
} from './spring-configs';

// Framer Motion variants
export {
  // Fade animations
  fadeIn,
  fadeInUp,
  fadeInDown,
  fadeInLeft,
  fadeInRight,

  // Scale animations
  scaleIn,
  scaleUp,
  scaleRotate,

  // Slide animations
  slideInUp,
  slideInDown,

  // Stagger containers
  staggerContainer,
  staggerContainerFast,
  staggerContainerSlow,

  // Text animations
  textReveal,
  textSlideUp,
  letterAnimation,
  wordAnimation,

  // Hover animations
  hoverScale,
  hoverLift,
  hoverRotate3D,

  // Card animations
  cardHover,
  card3D,

  // Button animations
  buttonHover,
  buttonPulse,

  // Image animations
  imageReveal,
  imageZoom,

  // Loading animations
  shimmer,
  spin,

  // Navigation animations
  navItemHover,
  mobileMenuSlide,

  // Form animations
  inputFocus,
  errorShake,

  // Success animations
  successCheckmark,

  // Floating animations
  floating,
  floatingSlow,

  // Parallax
  parallaxLayer,

  // Page transitions
  pageTransition,
} from './framer-variants';
