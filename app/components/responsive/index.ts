/**
 * Responsive Components Module
 * Export all responsive components and utilities
 */

export * from './SmartImage';
export * from './SmartTypography';

// Re-export responsive context hooks
export {
  useResponsive,
  useBreakpoint,
  useBreakpointRange,
  useDeviceType,
  useIsDeviceType,
  useOptimalImageFormat,
  useShouldAnimate,
  useAnimationQuality,
  useConnectionQuality,
  useResponsiveSpacing,
  useAdaptiveColumns,
  useMediaQuery
} from '@/app/lib/contexts/ResponsiveContext';
