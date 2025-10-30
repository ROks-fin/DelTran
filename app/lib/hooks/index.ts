/**
 * Animation Hooks Exports
 * Central export point for all animation hooks
 */

// Scroll animation hooks
export {
  useScrollAnimation,
  useScrollProgress,
  useScrollDirection,
  useScrollVelocity,
  useScrollTrigger,
} from './useScrollAnimation';

export type {
  UseScrollAnimationOptions,
  ScrollAnimationState,
} from './useScrollAnimation';

// Parallax hooks
export {
  useParallax,
  useLayeredParallax,
  useParallax3D,
  useParallaxScale,
  useImageParallax,
  useHorizontalParallax,
  useTextParallax,
  useStickyParallax,
} from './useParallax';

export type {
  UseParallaxOptions,
} from './useParallax';

// Mouse position hooks
export {
  useMousePosition,
  useMousePositionRelative,
  useMousePositionSmooth,
  useMagneticEffect,
  useHoverTilt,
  useMouseDistance,
  useCursorFollower,
} from './useMousePosition';

export type {
  MousePosition,
  UseMousePositionOptions,
} from './useMousePosition';

// Accessibility hooks
export {
  useReducedMotion,
  useAccessibleAnimation,
  useConditionalAnimation,
  useSafeVariants,
} from './useReducedMotion';
