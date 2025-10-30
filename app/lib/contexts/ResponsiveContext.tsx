/**
 * Responsive Context Provider
 * Provides device information and responsive utilities throughout the app
 */

'use client';

import React, { createContext, useContext, useEffect, useState, useMemo } from 'react';
import type { DeviceInfo, OptimalSettings } from '../device/types';
import { deviceDetector } from '../device/detector';

export interface ResponsiveContextValue {
  // Device information
  device: DeviceInfo | null;

  // Viewport information
  viewport: {
    width: number;
    height: number;
  };

  // Quick access properties
  orientation: 'portrait' | 'landscape';
  isTouch: boolean;
  isHighDensity: boolean;
  isSlowConnection: boolean;
  prefersReducedMotion: boolean;
  prefersColorScheme: 'light' | 'dark' | 'no-preference';
  supportsHDR: boolean;
  supports3D: boolean;
  supportsHaptic: boolean;

  // Device type checks
  isMobile: boolean;
  isTablet: boolean;
  isLaptop: boolean;
  isDesktop: boolean;
  isTV: boolean;
  isWatch: boolean;
  isCar: boolean;
  isVR: boolean;

  // Optimal formats
  optimalImageFormat: 'avif' | 'webp' | 'jpeg' | 'png';
  optimalVideoCodec: 'av1' | 'vp9' | 'h265' | 'h264';

  // Optimal settings
  optimalSettings: OptimalSettings | null;

  // Loading state
  isInitialized: boolean;
}

const defaultContext: ResponsiveContextValue = {
  device: null,
  viewport: { width: 1920, height: 1080 },
  orientation: 'landscape',
  isTouch: false,
  isHighDensity: false,
  isSlowConnection: false,
  prefersReducedMotion: false,
  prefersColorScheme: 'no-preference',
  supportsHDR: false,
  supports3D: false,
  supportsHaptic: false,
  isMobile: false,
  isTablet: false,
  isLaptop: false,
  isDesktop: true,
  isTV: false,
  isWatch: false,
  isCar: false,
  isVR: false,
  optimalImageFormat: 'jpeg',
  optimalVideoCodec: 'h264',
  optimalSettings: null,
  isInitialized: false
};

export const ResponsiveContext = createContext<ResponsiveContextValue>(defaultContext);

export interface ResponsiveProviderProps {
  children: React.ReactNode;
}

export function ResponsiveProvider({ children }: ResponsiveProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [device, setDevice] = useState<DeviceInfo | null>(null);
  const [viewport, setViewport] = useState({ width: 0, height: 0 });

  // Initialize device detection
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      // Get initial device info
      const deviceInfo = deviceDetector.getDeviceInfo();
      setDevice(deviceInfo);
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight
      });
      setIsInitialized(true);

      // Subscribe to device changes
      const unsubscribe = deviceDetector.subscribe((newDeviceInfo) => {
        setDevice(newDeviceInfo);
      });

      // Handle viewport resize
      const handleResize = () => {
        setViewport({
          width: window.innerWidth,
          height: window.innerHeight
        });
      };

      window.addEventListener('resize', handleResize);

      return () => {
        unsubscribe();
        window.removeEventListener('resize', handleResize);
      };
    } catch (error) {
      console.error('Failed to initialize device detection:', error);
      setIsInitialized(true); // Set to true to avoid infinite loading
    }
  }, []);

  // Memoize context value to prevent unnecessary re-renders
  const contextValue = useMemo<ResponsiveContextValue>(() => {
    if (!device) {
      return {
        ...defaultContext,
        viewport,
        isInitialized
      };
    }

    const optimalSettings = deviceDetector.getOptimalSettings();

    return {
      device,
      viewport,
      orientation: device.screen.orientation,
      isTouch: device.isTouch,
      isHighDensity: device.isHighDensity,
      isSlowConnection: device.isSlowConnection,
      prefersReducedMotion: device.preferences.reducedMotion,
      prefersColorScheme: device.preferences.colorScheme,
      supportsHDR: device.supportsHDR,
      supports3D: device.supports3D,
      supportsHaptic: device.supportsHaptic,
      isMobile: device.type === 'mobile',
      isTablet: device.type === 'tablet',
      isLaptop: device.type === 'laptop',
      isDesktop: device.type === 'desktop',
      isTV: device.type === 'tv',
      isWatch: device.type === 'watch',
      isCar: device.type === 'car',
      isVR: device.type === 'vr' || device.type === 'ar',
      optimalImageFormat: optimalSettings.images.format,
      optimalVideoCodec: optimalSettings.video.codec,
      optimalSettings,
      isInitialized
    };
  }, [device, viewport, isInitialized]);

  return (
    <ResponsiveContext.Provider value={contextValue}>
      {children}
    </ResponsiveContext.Provider>
  );
}

/**
 * Hook to access responsive context
 */
export function useResponsive(): ResponsiveContextValue {
  const context = useContext(ResponsiveContext);

  if (!context) {
    throw new Error('useResponsive must be used within ResponsiveProvider');
  }

  return context;
}

/**
 * Hook to check specific breakpoints
 */
export function useBreakpoint(breakpoint: number, direction: 'min' | 'max' = 'min'): boolean {
  const { viewport } = useResponsive();

  return useMemo(() => {
    if (direction === 'min') {
      return viewport.width >= breakpoint;
    }
    return viewport.width <= breakpoint;
  }, [viewport.width, breakpoint, direction]);
}

/**
 * Hook to check if viewport is within a range
 */
export function useBreakpointRange(min: number, max: number): boolean {
  const { viewport } = useResponsive();

  return useMemo(() => {
    return viewport.width >= min && viewport.width <= max;
  }, [viewport.width, min, max]);
}

/**
 * Hook to get current device type
 */
export function useDeviceType(): string | null {
  const { device } = useResponsive();
  return device?.type || null;
}

/**
 * Hook to check if device matches specific type
 */
export function useIsDeviceType(
  type: 'mobile' | 'tablet' | 'laptop' | 'desktop' | 'tv' | 'watch' | 'car' | 'vr'
): boolean {
  const deviceType = useDeviceType();
  return deviceType === type;
}

/**
 * Hook to get optimal image format
 */
export function useOptimalImageFormat(): 'avif' | 'webp' | 'jpeg' | 'png' {
  const { optimalImageFormat } = useResponsive();
  return optimalImageFormat;
}

/**
 * Hook to check if animations should be enabled
 */
export function useShouldAnimate(): boolean {
  const { prefersReducedMotion, device } = useResponsive();

  return useMemo(() => {
    if (prefersReducedMotion) return false;
    if (!device) return true;

    // Disable complex animations on low-end devices
    const performanceScore = device.performance.benchmark;
    return performanceScore > 30;
  }, [prefersReducedMotion, device]);
}

/**
 * Hook to get animation quality level
 */
export function useAnimationQuality(): 'low' | 'medium' | 'high' | 'ultra' {
  const { optimalSettings } = useResponsive();
  return optimalSettings?.animations.quality || 'medium';
}

/**
 * Hook to check connection quality
 */
export function useConnectionQuality(): 'slow' | 'moderate' | 'fast' {
  const { device } = useResponsive();

  return useMemo(() => {
    if (!device) return 'moderate';

    const { effectiveType, saveData } = device.connection;

    if (saveData || effectiveType === 'slow-2g' || effectiveType === '2g') {
      return 'slow';
    }

    if (effectiveType === '3g') {
      return 'moderate';
    }

    return 'fast';
  }, [device]);
}

/**
 * Hook to get responsive spacing value
 */
export function useResponsiveSpacing(
  size: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl'
): string {
  const { viewport } = useResponsive();

  return useMemo(() => {
    const spacingMap = {
      xs: viewport.width < 768 ? '0.5rem' : viewport.width < 1920 ? '0.75rem' : '1rem',
      sm: viewport.width < 768 ? '1rem' : viewport.width < 1920 ? '1.5rem' : '2rem',
      md: viewport.width < 768 ? '1.5rem' : viewport.width < 1920 ? '2rem' : '3rem',
      lg: viewport.width < 768 ? '2rem' : viewport.width < 1920 ? '3rem' : '4rem',
      xl: viewport.width < 768 ? '3rem' : viewport.width < 1920 ? '4rem' : '6rem',
      '2xl': viewport.width < 768 ? '4rem' : viewport.width < 1920 ? '6rem' : '8rem'
    };

    return spacingMap[size];
  }, [viewport.width, size]);
}

/**
 * Hook for adaptive columns
 */
export function useAdaptiveColumns(
  options?: {
    mobile?: number;
    tablet?: number;
    laptop?: number;
    desktop?: number;
  }
): number {
  const { viewport } = useResponsive();

  return useMemo(() => {
    const defaults = {
      mobile: 1,
      tablet: 2,
      laptop: 3,
      desktop: 4
    };

    const config = { ...defaults, ...options };

    if (viewport.width < 768) return config.mobile;
    if (viewport.width < 1024) return config.tablet;
    if (viewport.width < 1920) return config.laptop;
    return config.desktop;
  }, [viewport.width, options]);
}

/**
 * Hook to check if viewport matches media query
 */
export function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia(query);
    setMatches(mediaQuery.matches);

    const handler = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    mediaQuery.addEventListener('change', handler);

    return () => {
      mediaQuery.removeEventListener('change', handler);
    };
  }, [query]);

  return matches;
}
