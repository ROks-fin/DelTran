'use client';

import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { ReactNode } from 'react';

interface CardProps {
  children: ReactNode;
  className?: string;
  glowOnHover?: boolean;
  gradient?: boolean;
}

export function Card({ 
  children, 
  className,
  glowOnHover = true,
  gradient = false
}: CardProps) {
  return (
    <motion.div
      whileHover={glowOnHover ? { scale: 1.02 } : undefined}
      className={cn(
        'relative overflow-hidden rounded-2xl p-6',
        gradient 
          ? 'bg-gradient-to-br from-white/10 to-white/5' 
          : 'bg-white/5',
        'backdrop-blur-xl border border-white/10',
        glowOnHover && 'hover:border-gold/30 hover:shadow-[0_0_30px_rgba(212,175,55,0.2)]',
        'transition-all duration-300',
        className
      )}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-500" />
      )}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}
