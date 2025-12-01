/**
 * Premium Section Heading Component
 * Fintech-grade typography with refined hierarchy
 * Server Component - no 'use client' needed
 */

import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

type HeadingSize = 'sm' | 'md' | 'lg' | 'xl';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  badge?: string;
  className?: string;
  centered?: boolean;
  size?: HeadingSize;
  titleClassName?: string;
  subtitleClassName?: string;
  as?: 'h1' | 'h2' | 'h3';
  children?: ReactNode;
}

// Fluid typography sizes - seamless scaling
const headingSizes: Record<HeadingSize, string> = {
  sm: 'fluid-text-2xl',
  md: 'fluid-text-3xl',
  lg: 'fluid-text-4xl',
  xl: 'fluid-text-5xl',
};

const subtitleSizes: Record<HeadingSize, string> = {
  sm: 'fluid-text-base',
  md: 'fluid-text-lg',
  lg: 'fluid-text-xl',
  xl: 'fluid-text-xl',
};

const spacingBetween: Record<HeadingSize, string> = {
  sm: 'space-y-3',
  md: 'space-y-4',
  lg: 'space-y-5',
  xl: 'space-y-6',
};

export function SectionHeading({
  title,
  subtitle,
  badge,
  className,
  centered = true,
  size = 'md',
  titleClassName,
  subtitleClassName,
  as: HeadingTag = 'h2',
  children,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        spacingBetween[size],
        centered && 'text-center',
        className
      )}
    >
      {/* Badge / Eyebrow */}
      {badge && (
        <div
          className={cn(
            'inline-flex items-center',
            centered && 'justify-center'
          )}
        >
          <span
            className={cn(
              'label-luxury text-gold',
              'px-4 py-1.5 rounded-full',
              'bg-gold/10 border border-gold/20'
            )}
          >
            {badge}
          </span>
        </div>
      )}

      {/* Title */}
      <HeadingTag
        className={cn(
          'font-display font-bold tracking-tight',
          headingSizes[size],
          // Gradient text
          'bg-gradient-to-r from-white via-white/95 to-white/80',
          'bg-clip-text text-transparent',
          // Text balance for better wrapping
          'text-balance',
          titleClassName
        )}
      >
        {title}
      </HeadingTag>

      {/* Subtitle */}
      {subtitle && (
        <p
          className={cn(
            'text-white/60 leading-relaxed',
            subtitleSizes[size],
            centered && 'max-w-3xl mx-auto',
            'text-balance',
            subtitleClassName
          )}
        >
          {subtitle}
        </p>
      )}

      {/* Optional children for additional content */}
      {children}
    </div>
  );
}

/**
 * Alternate export for section headers with gold accent title
 */
export function SectionHeadingGold({
  title,
  subtitle,
  badge,
  className,
  centered = true,
  size = 'md',
}: Omit<SectionHeadingProps, 'titleClassName' | 'as' | 'children'>) {
  return (
    <SectionHeading
      title={title}
      subtitle={subtitle}
      badge={badge}
      className={className}
      centered={centered}
      size={size}
      titleClassName="text-gradient-gold"
    />
  );
}
