'use client';

import { motion, Variants } from 'framer-motion';
import { useScrollAnimation } from '@/app/lib/hooks/useScrollAnimation';
import { useReducedMotion } from '@/app/lib/hooks/useReducedMotion';
import { ReactNode, useMemo } from 'react';
import { durations, easingFunctions } from '@/app/lib/animations/spring-configs';

export type TextAnimationType =
  | 'fadeIn'
  | 'slideUp'
  | 'slideDown'
  | 'wordByWord'
  | 'letterByLetter'
  | 'typewriter'
  | 'gradient'
  | 'reveal';

export interface AnimatedTextProps {
  children: string | ReactNode;
  className?: string;
  /**
   * Animation type
   * @default 'fadeIn'
   */
  animation?: TextAnimationType;
  /**
   * Delay before animation starts (in seconds)
   * @default 0
   */
  delay?: number;
  /**
   * Stagger delay between words/letters (in seconds)
   * @default 0.05
   */
  stagger?: number;
  /**
   * HTML element to render
   * @default 'p'
   */
  as?: keyof JSX.IntrinsicElements;
  /**
   * Trigger animation on scroll
   * @default true
   */
  scrollTrigger?: boolean;
  /**
   * Threshold for scroll trigger
   * @default 0.1
   */
  threshold?: number;
}

/**
 * Animated text component with multiple animation types
 */
export function AnimatedText({
  children,
  className = '',
  animation = 'fadeIn',
  delay = 0,
  stagger = 0.05,
  as: Component = 'p',
  scrollTrigger = true,
  threshold = 0.1,
}: AnimatedTextProps) {
  const { ref, shouldAnimate } = useScrollAnimation({
    threshold,
    triggerOnce: true,
  });

  const prefersReducedMotion = useReducedMotion();

  // Handle non-string children
  if (typeof children !== 'string') {
    return (
      <span ref={ref as any} className={className}>
        {children}
      </span>
    );
  }

  // Skip animations if user prefers reduced motion
  if (prefersReducedMotion) {
    return (
      <span ref={ref as any} className={className}>
        {children}
      </span>
    );
  }

  // Render based on animation type
  switch (animation) {
    case 'wordByWord':
      return (
        <WordByWord
          text={children}
          className={className}
          as={Component}
          delay={delay}
          stagger={stagger}
          shouldAnimate={scrollTrigger ? shouldAnimate : true}
        />
      );

    case 'letterByLetter':
      return (
        <LetterByLetter
          text={children}
          className={className}
          as={Component}
          delay={delay}
          stagger={stagger}
          shouldAnimate={scrollTrigger ? shouldAnimate : true}
        />
      );

    case 'typewriter':
      return (
        <Typewriter
          text={children}
          className={className}
          as={Component}
          delay={delay}
          shouldAnimate={scrollTrigger ? shouldAnimate : true}
        />
      );

    case 'gradient':
      return (
        <GradientText
          text={children}
          className={className}
          as={Component}
          shouldAnimate={scrollTrigger ? shouldAnimate : true}
        />
      );

    case 'reveal':
      return (
        <RevealText
          text={children}
          className={className}
          as={Component}
          delay={delay}
          shouldAnimate={scrollTrigger ? shouldAnimate : true}
        />
      );

    case 'slideUp':
    case 'slideDown':
    case 'fadeIn':
    default:
      const simpleVariants = getSimpleVariants(animation);
      return (
        <motion.span
          ref={ref as any}
          className={className}
          initial="initial"
          animate={shouldAnimate ? 'animate' : 'initial'}
          variants={simpleVariants}
        >
          {children}
        </motion.span>
      );
  }
}

// Helper function for simple animations
function getSimpleVariants(animation: TextAnimationType): Variants {
  switch (animation) {
    case 'slideUp':
      return {
        initial: { opacity: 0, y: 30 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: durations.slow,
            ease: easingFunctions.easeOutExpo,
          },
        },
      };
    case 'slideDown':
      return {
        initial: { opacity: 0, y: -30 },
        animate: {
          opacity: 1,
          y: 0,
          transition: {
            duration: durations.slow,
            ease: easingFunctions.easeOutExpo,
          },
        },
      };
    case 'fadeIn':
    default:
      return {
        initial: { opacity: 0 },
        animate: {
          opacity: 1,
          transition: {
            duration: durations.normal,
            ease: easingFunctions.easeOutExpo,
          },
        },
      };
  }
}

// Word by word animation
const WordByWord = motion(
  ({
    text,
    className,
    delay,
    stagger,
    shouldAnimate,
    as: Component = 'p',
  }: {
    text: string;
    className: string;
    delay: number;
    stagger: number;
    shouldAnimate: boolean;
    as?: keyof JSX.IntrinsicElements;
  }) => {
    const words = text.split(' ');

    const containerVariants: Variants = {
      initial: {},
      animate: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    };

    const wordVariants: Variants = {
      initial: {
        opacity: 0,
        y: 20,
        filter: 'blur(8px)',
      },
      animate: {
        opacity: 1,
        y: 0,
        filter: 'blur(0px)',
        transition: {
          duration: durations.normal,
          ease: easingFunctions.easeOutExpo,
        },
      },
    };

    return (
      <motion.div
        className={className}
        initial="initial"
        animate={shouldAnimate ? 'animate' : 'initial'}
        variants={containerVariants}
        // @ts-ignore
        as={Component}
      >
        {words.map((word, i) => (
          <motion.span
            key={`${word}-${i}`}
            variants={wordVariants}
            style={{ display: 'inline-block', marginRight: '0.25em' }}
          >
            {word}
          </motion.span>
        ))}
      </motion.div>
    );
  }
);

// Letter by letter animation
const LetterByLetter = motion(
  ({
    text,
    className,
    delay,
    stagger,
    shouldAnimate,
    as: Component = 'p',
  }: {
    text: string;
    className: string;
    delay: number;
    stagger: number;
    shouldAnimate: boolean;
    as?: keyof JSX.IntrinsicElements;
  }) => {
    const letters = text.split('');

    const containerVariants: Variants = {
      initial: {},
      animate: {
        transition: {
          staggerChildren: stagger,
          delayChildren: delay,
        },
      },
    };

    const letterVariants: Variants = {
      initial: {
        opacity: 0,
        y: 50,
      },
      animate: {
        opacity: 1,
        y: 0,
        transition: {
          duration: durations.normal,
          ease: easingFunctions.easeOutExpo,
        },
      },
    };

    return (
      <motion.div
        className={className}
        initial="initial"
        animate={shouldAnimate ? 'animate' : 'initial'}
        variants={containerVariants}
        // @ts-ignore
        as={Component}
      >
        {letters.map((letter, i) => (
          <motion.span key={`${letter}-${i}`} variants={letterVariants} style={{ display: 'inline-block' }}>
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </motion.div>
    );
  }
);

// Typewriter effect
const Typewriter = motion(
  ({
    text,
    className,
    delay,
    shouldAnimate,
    as: Component = 'p',
  }: {
    text: string;
    className: string;
    delay: number;
    shouldAnimate: boolean;
    as?: keyof JSX.IntrinsicElements;
  }) => {
    return (
      <motion.div
        className={className}
        initial={{ width: 0 }}
        animate={
          shouldAnimate
            ? {
                width: '100%',
                transition: {
                  duration: text.length * 0.05,
                  delay,
                  ease: 'linear',
                },
              }
            : {}
        }
        style={{
          overflow: 'hidden',
          whiteSpace: 'nowrap',
          borderRight: '2px solid currentColor',
        }}
        // @ts-ignore
        as={Component}
      >
        {text}
      </motion.div>
    );
  }
);

// Gradient animated text
const GradientText = motion(
  ({
    text,
    className,
    shouldAnimate,
    as: Component = 'p',
  }: {
    text: string;
    className: string;
    shouldAnimate: boolean;
    as?: keyof JSX.IntrinsicElements;
  }) => {
    return (
      <motion.div
        className={className}
        initial={{ backgroundPosition: '0% 50%' }}
        animate={
          shouldAnimate
            ? {
                backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'],
                transition: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'linear',
                },
              }
            : {}
        }
        style={{
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899, #3b82f6)',
          backgroundSize: '200% 100%',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
        }}
        // @ts-ignore
        as={Component}
      >
        {text}
      </motion.div>
    );
  }
);

// Reveal text with clip path
const RevealText = motion(
  ({
    text,
    className,
    delay,
    shouldAnimate,
    as: Component = 'p',
  }: {
    text: string;
    className: string;
    delay: number;
    shouldAnimate: boolean;
    as?: keyof JSX.IntrinsicElements;
  }) => {
    return (
      <motion.div
        className={className}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={
          shouldAnimate
            ? {
                clipPath: 'inset(0 0% 0 0)',
                transition: {
                  duration: durations.slower,
                  delay,
                  ease: easingFunctions.easeOutExpo,
                },
              }
            : {}
        }
        // @ts-ignore
        as={Component}
      >
        {text}
      </motion.div>
    );
  }
);

/**
 * Animated heading with emphasis on certain words
 */
export interface AnimatedHeadingProps {
  children: string;
  className?: string;
  emphasizeWords?: number[]; // Indices of words to emphasize
  as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
}

export function AnimatedHeading({
  children,
  className = '',
  emphasizeWords = [],
  as: Component = 'h1',
}: AnimatedHeadingProps) {
  const words = children.split(' ');
  const prefersReducedMotion = useReducedMotion();

  const containerVariants: Variants = {
    initial: {},
    animate: {
      transition: {
        staggerChildren: prefersReducedMotion ? 0 : 0.08,
        delayChildren: 0.1,
      },
    },
  };

  const wordVariants: Variants = {
    initial: {
      opacity: 0,
      y: 20,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: durations.normal,
        ease: easingFunctions.easeOutExpo,
      },
    },
  };

  return (
    <motion.div
      className={className}
      initial="initial"
      animate="animate"
      variants={containerVariants}
      // @ts-ignore
      as={Component}
    >
      {words.map((word, i) => (
        <motion.span
          key={`${word}-${i}`}
          variants={wordVariants}
          className={emphasizeWords.includes(i) ? 'text-primary font-bold' : ''}
          style={{ display: 'inline-block', marginRight: '0.25em' }}
        >
          {word}
        </motion.span>
      ))}
    </motion.div>
  );
}
