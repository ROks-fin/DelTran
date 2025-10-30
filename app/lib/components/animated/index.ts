/**
 * Premium Animation Components
 * Export all animated components for easy import
 */

// Core animation components
export {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  ParallaxSection,
} from './AnimatedSection';

export type { AnimatedSectionProps, AnimationType } from './AnimatedSection';

// Text animations
export {
  AnimatedText,
  AnimatedHeading,
} from './AnimatedText';

export type {
  AnimatedTextProps,
  TextAnimationType,
  AnimatedHeadingProps,
} from './AnimatedText';

// Interactive buttons
export {
  MagneticButton,
  MagneticLink,
  FloatingButton,
  IconButton,
} from './MagneticButton';

export type {
  MagneticButtonProps,
  MagneticLinkProps,
  FloatingButtonProps,
  IconButtonProps,
} from './MagneticButton';

// Card components
export {
  AnimatedCard,
  FlipCard,
  ExpandableCard,
  ParallaxCard,
  GlassCard,
} from './AnimatedCard';

export type {
  AnimatedCardProps,
  FlipCardProps,
  ExpandableCardProps,
  ParallaxCardProps,
  GlassCardProps,
} from './AnimatedCard';
