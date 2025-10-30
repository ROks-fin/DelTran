'use client';

import { motion } from 'framer-motion';
import { useHoverTilt } from '@/app/lib/hooks/useMousePosition';
import { useScrollAnimation } from '@/app/lib/hooks/useScrollAnimation';
import { useReducedMotion } from '@/app/lib/hooks/useReducedMotion';
import { springConfigs } from '@/app/lib/animations/spring-configs';
import { ReactNode, useState } from 'react';

export interface AnimatedCardProps {
  children: ReactNode;
  className?: string;
  /**
   * Enable 3D tilt effect on hover
   * @default true
   */
  tilt3D?: boolean;
  /**
   * Tilt intensity (degrees)
   * @default 10
   */
  tiltIntensity?: number;
  /**
   * Enable hover lift effect
   * @default true
   */
  hoverLift?: boolean;
  /**
   * Lift distance in pixels
   * @default -10
   */
  liftDistance?: number;
  /**
   * Enable glow effect on hover
   * @default false
   */
  glowEffect?: boolean;
  /**
   * Glow color
   * @default 'rgba(59, 130, 246, 0.5)'
   */
  glowColor?: string;
  /**
   * Enable scroll animation
   * @default true
   */
  scrollAnimation?: boolean;
  /**
   * On click handler
   */
  onClick?: () => void;
}

/**
 * Premium 3D card with tilt and hover effects
 */
export function AnimatedCard({
  children,
  className = '',
  tilt3D = true,
  tiltIntensity = 10,
  hoverLift = true,
  liftDistance = -10,
  glowEffect = false,
  glowColor = 'rgba(59, 130, 246, 0.5)',
  scrollAnimation = true,
  onClick,
}: AnimatedCardProps) {
  const { ref: tiltRef, tilt } = useHoverTilt({ intensity: tiltIntensity });
  const { ref: scrollRef, shouldAnimate } = useScrollAnimation({
    threshold: 0.1,
    triggerOnce: true,
  });

  const prefersReducedMotion = useReducedMotion();
  const [isHovered, setIsHovered] = useState(false);

  // Combine refs
  const setRefs = (element: HTMLDivElement | null) => {
    if (element) {
      (tiltRef as any).current = element;
      (scrollRef as any).current = element;
    }
  };

  const animatedTilt = prefersReducedMotion || !tilt3D ? { x: 0, y: 0 } : tilt;

  return (
    <motion.div
      ref={setRefs}
      className={`relative ${className} ${onClick ? 'cursor-pointer' : ''}`}
      initial={scrollAnimation ? { opacity: 0, y: 50, scale: 0.9 } : {}}
      animate={
        scrollAnimation && shouldAnimate
          ? {
              opacity: 1,
              y: 0,
              scale: 1,
            }
          : {}
      }
      transition={springConfigs.smooth}
      onClick={onClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        transformStyle: 'preserve-3d',
        perspective: '1000px',
      }}
      whileHover={
        !prefersReducedMotion
          ? {
              y: hoverLift ? liftDistance : 0,
              transition: springConfigs.smooth,
            }
          : {}
      }
      whileTap={onClick && !prefersReducedMotion ? { scale: 0.98 } : {}}
    >
      <motion.div
        animate={
          !prefersReducedMotion && tilt3D
            ? {
                rotateX: animatedTilt.x,
                rotateY: animatedTilt.y,
              }
            : {}
        }
        transition={springConfigs.smooth}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {children}

        {/* Glow effect */}
        {glowEffect && isHovered && !prefersReducedMotion && (
          <motion.div
            className="absolute inset-0 rounded-inherit pointer-events-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            style={{
              boxShadow: `0 0 40px ${glowColor}, 0 0 80px ${glowColor}`,
              filter: 'blur(20px)',
            }}
          />
        )}
      </motion.div>

      {/* Shine effect on hover */}
      {isHovered && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 0.1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{
              x: ['-100%', '200%'],
            }}
            transition={{
              duration: 1.5,
              ease: 'easeInOut',
            }}
            style={{
              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.5), transparent)',
              transform: 'skewX(-20deg)',
            }}
          />
        </motion.div>
      )}
    </motion.div>
  );
}

/**
 * Flip card with front and back content
 */
export interface FlipCardProps {
  front: ReactNode;
  back: ReactNode;
  className?: string;
  /**
   * Auto flip on hover
   * @default true
   */
  flipOnHover?: boolean;
  /**
   * Flip direction
   * @default 'horizontal'
   */
  flipDirection?: 'horizontal' | 'vertical';
}

export function FlipCard({
  front,
  back,
  className = '',
  flipOnHover = true,
  flipDirection = 'horizontal',
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  const handleFlip = () => {
    if (!flipOnHover) {
      setIsFlipped(!isFlipped);
    }
  };

  const rotation = flipDirection === 'horizontal' ? 'rotateY' : 'rotateX';

  return (
    <div
      className={`relative ${className}`}
      style={{ perspective: '1000px' }}
      onMouseEnter={flipOnHover ? () => setIsFlipped(true) : undefined}
      onMouseLeave={flipOnHover ? () => setIsFlipped(false) : undefined}
      onClick={handleFlip}
    >
      <motion.div
        className="relative w-full h-full"
        animate={{
          [rotation]: prefersReducedMotion ? 0 : isFlipped ? 180 : 0,
        }}
        transition={springConfigs.smooth}
        style={{
          transformStyle: 'preserve-3d',
        }}
      >
        {/* Front */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
          }}
        >
          {front}
        </div>

        {/* Back */}
        <div
          className="absolute inset-0"
          style={{
            backfaceVisibility: 'hidden',
            WebkitBackfaceVisibility: 'hidden',
            transform: flipDirection === 'horizontal' ? 'rotateY(180deg)' : 'rotateX(180deg)',
          }}
        >
          {back}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Expandable card that reveals more content
 */
export interface ExpandableCardProps {
  preview: ReactNode;
  expanded: ReactNode;
  className?: string;
  /**
   * Initially expanded
   * @default false
   */
  defaultExpanded?: boolean;
}

export function ExpandableCard({
  preview,
  expanded,
  className = '',
  defaultExpanded = false,
}: ExpandableCardProps) {
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative overflow-hidden ${className}`}
      layout
      transition={springConfigs.smooth}
    >
      <div onClick={() => setIsExpanded(!isExpanded)} className="cursor-pointer">
        {preview}
      </div>

      <motion.div
        initial={false}
        animate={{
          height: isExpanded ? 'auto' : 0,
          opacity: isExpanded ? 1 : 0,
        }}
        transition={prefersReducedMotion ? { duration: 0 } : springConfigs.smooth}
        style={{ overflow: 'hidden' }}
      >
        {expanded}
      </motion.div>
    </motion.div>
  );
}

/**
 * Card with parallax layers
 */
export interface ParallaxCardProps {
  layers: ReactNode[];
  className?: string;
}

export function ParallaxCard({ layers, className = '' }: ParallaxCardProps) {
  const { ref, tilt } = useHoverTilt({ intensity: 5 });
  const prefersReducedMotion = useReducedMotion();

  return (
    <div ref={ref as any} className={`relative ${className}`} style={{ perspective: '1000px' }}>
      {layers.map((layer, index) => {
        const depth = (index + 1) * 10;
        return (
          <motion.div
            key={index}
            className={index === 0 ? 'relative' : 'absolute inset-0'}
            animate={
              !prefersReducedMotion
                ? {
                    x: tilt.y * (depth / 10),
                    y: tilt.x * (depth / 10),
                    rotateX: tilt.x / 2,
                    rotateY: tilt.y / 2,
                  }
                : {}
            }
            transition={springConfigs.smooth}
            style={{
              transformStyle: 'preserve-3d',
              transform: `translateZ(${depth}px)`,
            }}
          >
            {layer}
          </motion.div>
        );
      })}
    </div>
  );
}

/**
 * Glassmorphic card with blur effect
 */
export interface GlassCardProps {
  children: ReactNode;
  className?: string;
  /**
   * Blur intensity (px)
   * @default 10
   */
  blurIntensity?: number;
  /**
   * Background opacity (0-1)
   * @default 0.1
   */
  bgOpacity?: number;
}

export function GlassCard({
  children,
  className = '',
  blurIntensity = 10,
  bgOpacity = 0.1,
}: GlassCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const prefersReducedMotion = useReducedMotion();

  return (
    <motion.div
      className={`relative ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={
        !prefersReducedMotion
          ? {
              y: -5,
              transition: springConfigs.smooth,
            }
          : {}
      }
      style={{
        backdropFilter: `blur(${blurIntensity}px)`,
        WebkitBackdropFilter: `blur(${blurIntensity}px)`,
        backgroundColor: `rgba(255, 255, 255, ${bgOpacity})`,
      }}
    >
      {children}

      {/* Border glow effect */}
      {isHovered && !prefersReducedMotion && (
        <motion.div
          className="absolute inset-0 rounded-inherit pointer-events-none"
          initial={{ opacity: 0 }}
          animate={{
            opacity: 1,
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          exit={{ opacity: 0 }}
          style={{
            background: 'linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.3) 50%, transparent 70%)',
            backgroundSize: '200% 200%',
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      )}
    </motion.div>
  );
}
