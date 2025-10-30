'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'framer-motion';

export interface UseScrollAnimationOptions {
  /**
   * Percentage of element that must be visible (0-1)
   * @default 0.1
   */
  threshold?: number;

  /**
   * Margin around the viewport for triggering animation
   * @default "0px"
   */
  rootMargin?: string;

  /**
   * Whether animation should trigger only once
   * @default true
   */
  triggerOnce?: boolean;

  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
}

export interface ScrollAnimationState {
  isInView: boolean;
  hasBeenInView: boolean;
  progress: number;
}

/**
 * Premium scroll animation hook with Intersection Observer
 * Provides smooth, performant scroll-triggered animations
 */
export function useScrollAnimation(options: UseScrollAnimationOptions = {}) {
  const {
    threshold = 0.1,
    rootMargin = '0px',
    triggerOnce = true,
    delay = 0,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [hasBeenInView, setHasBeenInView] = useState(false);
  const [shouldAnimate, setShouldAnimate] = useState(false);

  const isInView = useInView(ref, {
    amount: threshold,
    margin: rootMargin as any,
    once: triggerOnce,
  });

  useEffect(() => {
    if (isInView && !hasBeenInView) {
      setHasBeenInView(true);

      if (delay > 0) {
        const timer = setTimeout(() => {
          setShouldAnimate(true);
        }, delay * 1000);
        return () => clearTimeout(timer);
      } else {
        setShouldAnimate(true);
      }
    }
  }, [isInView, hasBeenInView, delay]);

  return {
    ref,
    isInView,
    hasBeenInView,
    shouldAnimate: triggerOnce ? shouldAnimate : isInView,
  };
}

/**
 * Hook for scroll progress tracking
 * Returns progress value from 0 to 1 as element scrolls into view
 */
export function useScrollProgress(options: { offset?: number[] } = {}) {
  const { offset = [0, 1] } = options;
  const [progress, setProgress] = useState(0);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleScroll = () => {
      const rect = element.getBoundingClientRect();
      const windowHeight = window.innerHeight;

      // Calculate progress based on element position
      const start = windowHeight * offset[0];
      const end = windowHeight * offset[1];
      const distance = end - start;
      const current = windowHeight - rect.top;

      const scrollProgress = Math.max(0, Math.min(1, (current - start) / distance));
      setProgress(scrollProgress);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, [offset]);

  return { ref, progress };
}

/**
 * Hook for detecting scroll direction
 */
export function useScrollDirection() {
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down' | null>(null);
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    let lastScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setScrollDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setScrollDirection('up');
      }

      setScrollY(currentScrollY);
      lastScrollY = currentScrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { scrollDirection, scrollY };
}

/**
 * Hook for scroll velocity tracking
 * Useful for physics-based animations
 */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const lastScrollY = useRef(0);
  const lastTimestamp = useRef(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTimestamp = Date.now();

      const distance = currentScrollY - lastScrollY.current;
      const time = currentTimestamp - lastTimestamp.current;

      const currentVelocity = distance / time;
      setVelocity(currentVelocity);

      lastScrollY.current = currentScrollY;
      lastTimestamp.current = currentTimestamp;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return velocity;
}

/**
 * Hook for element visibility with callback
 */
export function useScrollTrigger(
  callback: (isVisible: boolean) => void,
  options: IntersectionObserverInit = {}
) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        callback(entry.isIntersecting);
      },
      {
        threshold: 0.1,
        ...options,
      }
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [callback, options]);

  return ref;
}
