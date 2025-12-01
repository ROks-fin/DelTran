/**
 * Premium Fintech Card Component
 * Soft edges, smooth shadows, no harsh borders
 * Uses CSS-only animations for optimal performance
 */

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type CardVariant = 'default' | 'gradient' | 'elevated' | 'bordered' | 'soft';
type CardSize = 'sm' | 'md' | 'lg' | 'xl';

interface CardProps {
  children: ReactNode;
  className?: string;
  variant?: CardVariant;
  size?: CardSize;
  glowOnHover?: boolean;
  gradient?: boolean; // Backwards compatibility
  as?: 'div' | 'article' | 'section';
}

const sizeStyles: Record<CardSize, string> = {
  sm: 'p-5 sm:p-6',
  md: 'p-6 sm:p-8 lg:p-10',
  lg: 'p-8 sm:p-10 lg:p-12',
  xl: 'p-10 sm:p-12 lg:p-16',
};

const variantStyles: Record<CardVariant, string> = {
  default: cn(
    'backdrop-blur-2xl',
    // Soft gradient background instead of flat color
    'bg-gradient-to-br from-white/[0.04] via-white/[0.02] to-transparent',
    // Subtle border
    'border border-white/[0.06]',
    // Soft shadow
    'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.2),inset_0_1px_0_rgba(255,255,255,0.04)]'
  ),
  gradient: cn(
    'backdrop-blur-2xl',
    // Richer gradient
    'bg-gradient-to-br from-white/[0.06] via-white/[0.03] to-white/[0.01]',
    'border border-white/[0.06]',
    'shadow-[0_4px_32px_-4px_rgba(0,0,0,0.25),inset_0_1px_0_rgba(255,255,255,0.05)]'
  ),
  elevated: cn(
    'backdrop-blur-2xl',
    'bg-gradient-to-br from-white/[0.05] via-white/[0.03] to-transparent',
    'border border-white/[0.05]',
    // Deeper shadow for elevation
    'shadow-[0_8px_40px_-8px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.04)]'
  ),
  bordered: cn(
    'bg-gradient-to-br from-gold/[0.04] via-transparent to-transparent',
    'backdrop-blur-xl',
    // Soft gold border
    'border border-gold/[0.15]',
    'shadow-[0_4px_24px_-4px_rgba(0,0,0,0.2),inset_0_0_60px_rgba(212,175,55,0.02)]'
  ),
  soft: cn(
    'backdrop-blur-2xl',
    // Extra soft appearance
    'bg-gradient-to-br from-white/[0.03] via-white/[0.015] to-transparent',
    'border border-white/[0.04]',
    'shadow-[0_2px_16px_-2px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.03)]'
  ),
};

export function Card({
  children,
  className,
  variant = 'default',
  size = 'md',
  glowOnHover = false, // Disabled by default
  gradient = false, // Backwards compatibility
  as: Component = 'div',
}: CardProps) {
  // Support legacy gradient prop
  const resolvedVariant = gradient ? 'gradient' : variant;

  return (
    <Component
      className={cn(
        // Base styles - softer corners
        'relative overflow-hidden rounded-3xl',
        // Size
        sizeStyles[size],
        // Variant
        variantStyles[resolvedVariant],
        className
      )}
    >
      {/* Content */}
      <div className="relative z-10">
        {children}
      </div>
    </Component>
  );
}

/**
 * Card Header - for titles and descriptions at top of card
 */
export function CardHeader({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-5 sm:mb-6', className)}>
      {children}
    </div>
  );
}

/**
 * Card Title
 */
export function CardTitle({
  children,
  className,
  as: Component = 'h3',
}: {
  children: ReactNode;
  className?: string;
  as?: 'h2' | 'h3' | 'h4';
}) {
  return (
    <Component
      className={cn(
        'font-display font-semibold text-white',
        'fluid-text-2xl',
        'tracking-tight',
        className
      )}
    >
      {children}
    </Component>
  );
}

/**
 * Card Description
 */
export function CardDescription({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <p
      className={cn(
        'text-white/80 fluid-text-base',
        'leading-relaxed mt-2',
        className
      )}
    >
      {children}
    </p>
  );
}

/**
 * Card Content - main content area
 */
export function CardContent({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      {children}
    </div>
  );
}

/**
 * Card Footer - for CTAs and actions
 */
export function CardFooter({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'mt-6 pt-5',
        // Softer divider line
        'border-t border-white/[0.04]',
        className
      )}
    >
      {children}
    </div>
  );
}
