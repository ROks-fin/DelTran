'use client';

import { useEffect, useState } from 'react';

/**
 * Detects if user prefers reduced motion
 * Returns true if user has enabled reduced motion in OS settings
 * Essential for accessibility compliance
 */
export function useReducedMotion(): boolean {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    // Check initial preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    // Modern browsers
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
      return () => mediaQuery.removeEventListener('change', handleChange);
    }
    // Fallback for older browsers
    else if (mediaQuery.addListener) {
      mediaQuery.addListener(handleChange);
      return () => mediaQuery.removeListener(handleChange);
    }
  }, []);

  return prefersReducedMotion;
}

/**
 * Returns animation config adjusted for reduced motion preference
 * If reduced motion is enabled, returns simplified animations
 */
export function useAccessibleAnimation<T extends Record<string, any>>(
  fullAnimation: T,
  reducedAnimation: Partial<T> = {}
): T {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    return {
      ...fullAnimation,
      ...reducedAnimation,
      // Disable most motion by default
      transition: { duration: 0.01 },
    } as T;
  }

  return fullAnimation;
}

/**
 * Hook to conditionally apply animations based on reduced motion preference
 */
export function useConditionalAnimation() {
  const prefersReducedMotion = useReducedMotion();

  return {
    shouldAnimate: !prefersReducedMotion,
    getDuration: (normalDuration: number) => (prefersReducedMotion ? 0.01 : normalDuration),
    getTransition: (transition: any) =>
      prefersReducedMotion ? { duration: 0.01 } : transition,
  };
}

/**
 * Safe animation variants that respect reduced motion
 */
export function useSafeVariants(variants: any) {
  const prefersReducedMotion = useReducedMotion();

  if (prefersReducedMotion) {
    // Return variants with minimal animation
    return {
      initial: variants.initial,
      animate: {
        ...variants.animate,
        transition: { duration: 0 },
      },
      exit: {
        ...variants.exit,
        transition: { duration: 0 },
      },
    };
  }

  return variants;
}
