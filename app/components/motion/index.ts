/**
 * DelTran Motion v2 — Premium GPU-Optimized Animation System
 *
 * MOTION LANGUAGE:
 * - Micro-float: 3-5px subtle movement
 * - Fade: opacity 0 → 1
 * - Scale-in: 0.985 → 1 (subtle)
 * - Gold shimmer: gradient position animation (no blur)
 * - Soft stagger: 0ms / 80ms / 140ms / 200ms
 *
 * COLORS (strictly enforced):
 * - Black: #000000
 * - Gold: #D4AF37 / #FFD700
 * - White: #FFFFFF
 *
 * GPU-OPTIMIZED:
 * - Uses only transform and opacity
 * - No layout thrashing
 * - translateZ(0) for GPU acceleration
 * - Respects prefers-reduced-motion
 */

// Provider
export { DelTranMotionProvider, useMotion } from './DelTranMotionProvider';

// Hero animations
export { HeroReveal, HeroRevealStagger } from './HeroReveal';

// Premium effects
export { PremiumShimmer, GoldGradientText, GoldGlowBox } from './PremiumShimmer';

// Section animations
export { StaggerSection, RevealSection, CardStagger } from './StaggerSection';

// Item animations
export {
  FloatItem,
  PulseItem,
  FlowDot,
  ScaleOnHover,
  LiftOnHover
} from './FloatItem';
