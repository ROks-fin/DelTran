'use client';

/**
 * Parallax Section Component
 * Adds depth and premium feel with scroll-based parallax
 */

import { motion } from 'framer-motion';
import { useParallax } from '@/app/lib/hooks/useParallax';
import { ReactNode } from 'react';

interface ParallaxSectionProps {
  children: ReactNode;
  speed?: number;
  className?: string;
}

export function ParallaxSection({
  children,
  speed = -50,
  className = '',
}: ParallaxSectionProps) {
  const { ref, y } = useParallax({ speed });

  return (
    <motion.div
      ref={ref as any}
      style={{ y }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * Parallax Image Component
 */
interface ParallaxImageProps {
  src: string;
  alt: string;
  speed?: number;
  className?: string;
}

export function ParallaxImage({
  src,
  alt,
  speed = -30,
  className = '',
}: ParallaxImageProps) {
  const { ref, y } = useParallax({ speed });

  return (
    <div className="relative overflow-hidden">
      <motion.img
        ref={ref as any}
        src={src}
        alt={alt}
        style={{ y }}
        className={className}
      />
    </div>
  );
}
