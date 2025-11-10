/**
 * Smart Typography Component
 * Fluid, responsive typography with automatic scaling and optimization
 */

'use client';

import React, { useMemo } from 'react';
import { useResponsive } from '@/app/lib/contexts/ResponsiveContext';
import { fluidTypography, generateFluidSize } from '@/app/lib/responsive/breakpoints';
import { cn } from '@/lib/utils';

export type TypographyVariant =
  | 'display1'
  | 'display2'
  | 'h1'
  | 'h2'
  | 'h3'
  | 'h4'
  | 'h5'
  | 'h6'
  | 'bodyLarge'
  | 'body'
  | 'bodySmall'
  | 'caption'
  | 'overline';

export interface SmartTypographyProps {
  variant: TypographyVariant;
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'div';
  className?: string;

  // Fluid sizing
  clamp?: boolean;

  // Responsive behavior
  responsive?: boolean;

  // Text balancing
  balanceText?: boolean;

  // Hyphenation
  hyphenate?: boolean;

  // Truncation
  truncate?: boolean | number;

  // Premium effects
  gradient?: boolean;
  glow?: boolean;

  // Animation
  animate?: 'fade' | 'slide' | 'type' | 'reveal' | 'none';

  // Accessibility
  srOnly?: boolean;
}

export function SmartTypography({
  variant,
  children,
  as,
  className,
  clamp = true,
  responsive = true,
  balanceText = false,
  hyphenate = false,
  truncate = false,
  gradient = false,
  glow = false,
  animate = 'none',
  srOnly = false
}: SmartTypographyProps) {
  const { viewport, isMobile, device, prefersReducedMotion } = useResponsive();

  // Determine HTML element
  const Component = useMemo(() => {
    if (as) return as;

    const elementMap: Record<TypographyVariant, string> = {
      display1: 'h1',
      display2: 'h2',
      h1: 'h1',
      h2: 'h2',
      h3: 'h3',
      h4: 'h4',
      h5: 'h5',
      h6: 'h6',
      bodyLarge: 'p',
      body: 'p',
      bodySmall: 'p',
      caption: 'span',
      overline: 'span'
    };

    return elementMap[variant] as any;
  }, [as, variant]);

  // Calculate fluid size
  const fontSize = useMemo(() => {
    if (!clamp) {
      // Fixed size based on device type
      const config = fluidTypography[variant];
      if (viewport.width < 768) return config.min;
      if (viewport.width < 1920) return config.preferred;
      return config.max;
    }

    const config = fluidTypography[variant];
    return generateFluidSize(config.min, config.preferred, config.max);
  }, [variant, clamp, viewport.width]);

  // Calculate line height
  const lineHeight = useMemo(() => {
    const config = fluidTypography[variant];
    return config.lineHeight;
  }, [variant]);

  // Hyphenation logic
  const shouldHyphenate = useMemo(() => {
    return hyphenate && isMobile && viewport.width < 480;
  }, [hyphenate, isMobile, viewport.width]);

  // Animation classes
  const animationClass = useMemo(() => {
    if (animate === 'none' || prefersReducedMotion) return '';

    const animations = {
      fade: 'animate-fade-in',
      slide: 'animate-slide-up',
      type: 'animate-typewriter',
      reveal: 'animate-reveal'
    };

    return animations[animate];
  }, [animate, prefersReducedMotion]);

  // Build style object
  const style = useMemo(() => {
    const config = fluidTypography[variant];

    return {
      fontSize: clamp ? fontSize : undefined,
      lineHeight,
      textWrap: balanceText ? ('balance' as any) : undefined,
      hyphens: shouldHyphenate ? ('auto' as any) : undefined,
      WebkitLineClamp: typeof truncate === 'number' ? truncate : undefined,
      display: typeof truncate === 'number' ? '-webkit-box' : undefined,
      WebkitBoxOrient: typeof truncate === 'number' ? ('vertical' as any) : undefined,
      overflow: truncate ? 'hidden' : undefined,
      textOverflow: truncate === true ? 'ellipsis' : undefined,
      whiteSpace: truncate === true ? ('nowrap' as any) : undefined,
      wordBreak: isMobile ? ('break-word' as any) : undefined,
      ...('letterSpacing' in config ? { letterSpacing: config.letterSpacing } : {}),
      ...('textTransform' in config ? { textTransform: config.textTransform } : {})
    };
  }, [variant, fontSize, lineHeight, clamp, balanceText, shouldHyphenate, truncate, isMobile]);

  return (
    <Component
      className={cn(
        'smart-typography',
        `variant-${variant}`,
        gradient && 'text-gradient',
        glow && 'text-glow',
        animationClass,
        srOnly && 'sr-only',
        className
      )}
      style={style}
    >
      {children}
    </Component>
  );
}
