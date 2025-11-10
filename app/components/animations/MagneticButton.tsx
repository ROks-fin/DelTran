'use client';

/**
 * Magnetic Button Component
 * Premium button with magnetic cursor following effect
 */

import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/app/lib/hooks/useMagneticEffect';
import { transitions } from '@/app/lib/animations/premiumAnimations';
import { ReactNode } from 'react';

interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  maxDistance?: number;
  onClick?: () => void;
  disabled?: boolean;
}

export function MagneticButton({
  children,
  className = '',
  strength = 0.3,
  maxDistance = 100,
  onClick,
  disabled = false,
}: MagneticButtonProps) {
  const { ref, position } = useMagneticEffect({
    strength,
    maxDistance,
    disabled,
  });

  return (
    <motion.button
      ref={ref as any}
      onClick={onClick}
      disabled={disabled}
      className={className}
      animate={{
        x: position.x,
        y: position.y,
      }}
      transition={transitions.springSmooth}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {children}
    </motion.button>
  );
}
