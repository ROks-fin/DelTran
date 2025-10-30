'use client';

import { motion } from 'framer-motion';
import { useMagneticEffect } from '@/app/lib/hooks/useMousePosition';
import { useReducedMotion } from '@/app/lib/hooks/useReducedMotion';
import { springConfigs } from '@/app/lib/animations/spring-configs';
import { ReactNode, useState } from 'react';

export interface MagneticButtonProps {
  children: ReactNode;
  className?: string;
  /**
   * Magnetic effect strength (0-1)
   * @default 0.3
   */
  magnetStrength?: number;
  /**
   * Activation radius in pixels
   * @default 100
   */
  magnetRadius?: number;
  /**
   * Scale on hover
   * @default 1.05
   */
  hoverScale?: number;
  /**
   * Enable ripple effect on click
   * @default true
   */
  ripple?: boolean;
  /**
   * Button type
   * @default 'button'
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * On click handler
   */
  onClick?: () => void;
  /**
   * Disabled state
   */
  disabled?: boolean;
  /**
   * Enable pulse animation
   * @default false
   */
  pulse?: boolean;
}

/**
 * Premium magnetic button with smooth hover effects
 * Features magnetic attraction, hover scaling, and ripple effect
 */
export function MagneticButton({
  children,
  className = '',
  magnetStrength = 0.3,
  magnetRadius = 100,
  hoverScale = 1.05,
  ripple = true,
  type = 'button',
  onClick,
  disabled = false,
  pulse = false,
}: MagneticButtonProps) {
  const { ref, offset } = useMagneticEffect({
    strength: magnetStrength,
    radius: magnetRadius,
  });

  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);
  const [ripples, setRipples] = useState<{ x: number; y: number; id: number }[]>([]);

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;

    // Create ripple effect
    if (ripple && !prefersReducedMotion) {
      const rect = e.currentTarget.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      const id = Date.now();

      setRipples((prev) => [...prev, { x, y, id }]);

      // Remove ripple after animation
      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== id));
      }, 600);
    }

    onClick?.();
  };

  // Disable magnetic effect if user prefers reduced motion
  const animatedOffset = prefersReducedMotion ? { x: 0, y: 0 } : offset;

  return (
    <motion.button
      ref={ref as any}
      type={type}
      className={`relative overflow-hidden ${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={handleClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      animate={{
        x: animatedOffset.x,
        y: animatedOffset.y,
        scale: !disabled && isHovered ? hoverScale : 1,
      }}
      transition={springConfigs.smooth}
      whileTap={!disabled ? { scale: 0.95 } : {}}
    >
      {/* Pulse animation */}
      {pulse && !disabled && !prefersReducedMotion && (
        <motion.span
          className="absolute inset-0 rounded-inherit"
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.5, 0, 0.5],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
          style={{
            background: 'currentColor',
            filter: 'blur(10px)',
          }}
        />
      )}

      {/* Button content */}
      <span className="relative z-10">{children}</span>

      {/* Ripple effects */}
      {ripples.map((ripple) => (
        <motion.span
          key={ripple.id}
          className="absolute rounded-full bg-white/30 pointer-events-none"
          style={{
            left: ripple.x,
            top: ripple.y,
          }}
          initial={{
            width: 0,
            height: 0,
            x: 0,
            y: 0,
            opacity: 1,
          }}
          animate={{
            width: 300,
            height: 300,
            x: -150,
            y: -150,
            opacity: 0,
          }}
          transition={{
            duration: 0.6,
            ease: 'easeOut',
          }}
        />
      ))}

      {/* Hover glow effect */}
      {isHovered && !disabled && !prefersReducedMotion && (
        <motion.span
          className="absolute inset-0 rounded-inherit"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.2 }}
          exit={{ opacity: 0 }}
          style={{
            background: 'radial-gradient(circle at center, currentColor 0%, transparent 70%)',
          }}
        />
      )}
    </motion.button>
  );
}

/**
 * Magnetic link with hover effects
 */
export interface MagneticLinkProps {
  children: ReactNode;
  href: string;
  className?: string;
  magnetStrength?: number;
  magnetRadius?: number;
  external?: boolean;
}

export function MagneticLink({
  children,
  href,
  className = '',
  magnetStrength = 0.2,
  magnetRadius = 80,
  external = false,
}: MagneticLinkProps) {
  const { ref, offset } = useMagneticEffect({
    strength: magnetStrength,
    radius: magnetRadius,
  });

  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  const animatedOffset = prefersReducedMotion ? { x: 0, y: 0 } : offset;

  return (
    <motion.a
      ref={ref as any}
      href={href}
      className={`inline-block ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      animate={{
        x: animatedOffset.x,
        y: animatedOffset.y,
      }}
      transition={springConfigs.smooth}
      {...(external && {
        target: '_blank',
        rel: 'noopener noreferrer',
      })}
    >
      <motion.span
        animate={{
          scale: isHovered ? 1.05 : 1,
        }}
        transition={springConfigs.snappy}
      >
        {children}
      </motion.span>
    </motion.a>
  );
}

/**
 * Floating action button with magnetic effect
 */
export interface FloatingButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  position?: 'bottom-right' | 'bottom-left' | 'top-right' | 'top-left';
}

export function FloatingButton({
  children,
  className = '',
  onClick,
  position = 'bottom-right',
}: FloatingButtonProps) {
  const positionClasses = {
    'bottom-right': 'bottom-8 right-8',
    'bottom-left': 'bottom-8 left-8',
    'top-right': 'top-8 right-8',
    'top-left': 'top-8 left-8',
  };

  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      className={`fixed ${positionClasses[position]} z-50 rounded-full shadow-2xl ${className}`}
      onClick={onClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      animate={
        !prefersReducedMotion
          ? {
              y: [0, -10, 0],
            }
          : {}
      }
      transition={{
        y: {
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        },
        scale: springConfigs.snappy,
      }}
    >
      {children}
    </motion.button>
  );
}

/**
 * Icon button with rotation on hover
 */
export interface IconButtonProps {
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  rotateOnHover?: boolean;
  disabled?: boolean;
}

export function IconButton({
  children,
  className = '',
  onClick,
  rotateOnHover = true,
  disabled = false,
}: IconButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.button
      className={`${className} ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={disabled}
      whileHover={!disabled ? { scale: 1.1 } : {}}
      whileTap={!disabled ? { scale: 0.9 } : {}}
      transition={springConfigs.snappy}
    >
      <motion.span
        animate={{
          rotate: !disabled && isHovered && rotateOnHover && !prefersReducedMotion ? 360 : 0,
        }}
        transition={{
          duration: 0.3,
          ease: 'easeOut',
        }}
        style={{ display: 'inline-block' }}
      >
        {children}
      </motion.span>
    </motion.button>
  );
}
