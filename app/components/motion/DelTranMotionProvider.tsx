'use client';

import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

interface MotionContextType {
  prefersReducedMotion: boolean;
  isLoaded: boolean;
}

const MotionContext = createContext<MotionContextType>({
  prefersReducedMotion: false,
  isLoaded: false,
});

export function useMotion() {
  return useContext(MotionContext);
}

interface DelTranMotionProviderProps {
  children: ReactNode;
}

/**
 * DelTran Motion Provider
 *
 * Provides motion context to all child components:
 * - Detects user preference for reduced motion
 * - Provides loading state for animations
 * - Centralizes motion settings
 */
export function DelTranMotionProvider({ children }: DelTranMotionProviderProps) {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Check for reduced motion preference
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    // Listen for changes
    const handleChange = (event: MediaQueryListEvent) => {
      setPrefersReducedMotion(event.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    setIsLoaded(true);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  return (
    <MotionContext.Provider value={{ prefersReducedMotion, isLoaded }}>
      {children}
    </MotionContext.Provider>
  );
}
