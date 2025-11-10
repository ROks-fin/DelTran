/**
 * Scroll Progress Hook
 * Track scroll progress for animations and indicators
 */

import { useEffect, useState, useCallback } from 'react';
import { useScroll, useSpring, useTransform } from 'framer-motion';

export function useScrollProgress() {
  const [progress, setProgress] = useState(0);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setProgress(latest);
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  return progress;
}

/**
 * Smooth scroll progress with spring physics
 */
export function useSmoothScrollProgress() {
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return smoothProgress;
}

/**
 * Section-based scroll progress
 */
export function useSectionProgress(sectionId: string) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const section = document.getElementById(sectionId);
      if (!section) return;

      const rect = section.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const sectionHeight = rect.height;

      // Calculate how much of the section is visible
      const visibleTop = Math.max(0, -rect.top);
      const visibleBottom = Math.min(sectionHeight, windowHeight - rect.top);
      const visibleHeight = Math.max(0, visibleBottom - visibleTop);

      const sectionProgress = visibleHeight / sectionHeight;
      setProgress(Math.min(1, Math.max(0, sectionProgress)));
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    updateProgress();

    return () => {
      window.removeEventListener('scroll', updateProgress);
      window.removeEventListener('resize', updateProgress);
    };
  }, [sectionId]);

  return progress;
}

/**
 * Viewport intersection progress
 */
export function useViewportProgress(threshold: number = 0.5) {
  const [isInView, setIsInView] = useState(false);
  const [progress, setProgress] = useState(0);

  const observeElement = useCallback(
    (element: Element | null) => {
      if (!element) return;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setIsInView(entry.isIntersecting);
          setProgress(entry.intersectionRatio);
        },
        { threshold: [0, threshold, 1] }
      );

      observer.observe(element);

      return () => observer.disconnect();
    },
    [threshold]
  );

  return { isInView, progress, observeElement };
}

/**
 * Reading progress (for long content)
 */
export function useReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const calculateProgress = () => {
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight - windowHeight;
      const scrolled = window.scrollY;
      const progress = scrolled / documentHeight;

      setProgress(Math.min(1, Math.max(0, progress)));
    };

    window.addEventListener('scroll', calculateProgress, { passive: true });
    window.addEventListener('resize', calculateProgress);
    calculateProgress();

    return () => {
      window.removeEventListener('scroll', calculateProgress);
      window.removeEventListener('resize', calculateProgress);
    };
  }, []);

  return progress;
}

/**
 * Scroll direction detection
 */
export function useScrollDirection() {
  const [direction, setDirection] = useState<'up' | 'down' | null>(null);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY) {
        setDirection('down');
      } else if (currentScrollY < lastScrollY) {
        setDirection('up');
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return direction;
}

/**
 * Scroll velocity detection
 */
export function useScrollVelocity() {
  const [velocity, setVelocity] = useState(0);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [lastTime, setLastTime] = useState(Date.now());

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const currentTime = Date.now();

      const distance = currentScrollY - lastScrollY;
      const time = currentTime - lastTime;

      const currentVelocity = Math.abs(distance / time);
      setVelocity(currentVelocity);

      setLastScrollY(currentScrollY);
      setLastTime(currentTime);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, lastTime]);

  return velocity;
}
