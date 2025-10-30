# Premium Animation System Documentation

This document describes the enterprise-grade animation system implemented for DelTran.

## 📚 Table of Contents

1. [Overview](#overview)
2. [Components](#components)
3. [Hooks](#hooks)
4. [Configuration](#configuration)
5. [Usage Examples](#usage-examples)
6. [Performance](#performance)
7. [Accessibility](#accessibility)

## Overview

The DelTran animation system is built on **Framer Motion** and includes:

- 🎨 **Pre-configured animation variants** for consistency
- 🎯 **Scroll-triggered animations** with Intersection Observer
- 🧲 **Magnetic interactions** for premium feel
- 🎪 **3D transforms** and parallax effects
- ♿ **Accessibility-first** with reduced motion support
- ⚡ **GPU-accelerated** animations for 60fps performance

## Components

### AnimatedSection

Wrapper component for scroll-triggered sections.

```tsx
import { AnimatedSection } from '@/app/lib/components/animated';

<AnimatedSection
  animation="fadeInUp"
  delay={0.2}
  threshold={0.1}
  triggerOnce={true}
>
  <YourContent />
</AnimatedSection>
```

**Props:**
- `animation`: Animation type (`fadeInUp`, `fadeInLeft`, `fadeInRight`, `scaleIn`, `none`)
- `delay`: Delay before animation starts (seconds)
- `threshold`: Viewport intersection threshold (0-1)
- `triggerOnce`: Whether animation triggers only once
- `customVariants`: Custom Framer Motion variants

### StaggerContainer & StaggerItem

For sequential animations of child elements.

```tsx
import { StaggerContainer, StaggerItem } from '@/app/lib/components/animated';

<StaggerContainer staggerDelay={0.1} initialDelay={0.2}>
  <StaggerItem>
    <Card>First item</Card>
  </StaggerItem>
  <StaggerItem>
    <Card>Second item</Card>
  </StaggerItem>
</StaggerContainer>
```

### AnimatedText

Text animations with multiple effects.

```tsx
import { AnimatedText } from '@/app/lib/components/animated';

<AnimatedText
  animation="wordByWord"
  stagger={0.05}
  as="h1"
>
  Cross-Border Payments Reimagined
</AnimatedText>
```

**Animation Types:**
- `fadeIn`: Simple fade in
- `slideUp`: Slide from bottom
- `slideDown`: Slide from top
- `wordByWord`: Reveal word by word
- `letterByLetter`: Reveal letter by letter
- `typewriter`: Typewriter effect
- `gradient`: Animated gradient text
- `reveal`: Clip-path reveal

### MagneticButton

Premium button with magnetic cursor attraction.

```tsx
import { MagneticButton } from '@/app/lib/components/animated';

<MagneticButton
  magnetStrength={0.3}
  magnetRadius={100}
  hoverScale={1.05}
  ripple={true}
  pulse={true}
  onClick={handleClick}
>
  Get Started
</MagneticButton>
```

**Features:**
- Magnetic attraction when cursor approaches
- Ripple effect on click
- Optional pulse animation
- Smooth spring transitions

### AnimatedCard

3D card with hover tilt effect.

```tsx
import { AnimatedCard } from '@/app/lib/components/animated';

<AnimatedCard
  tilt3D={true}
  tiltIntensity={10}
  hoverLift={true}
  liftDistance={-15}
  glowEffect={true}
  glowColor="rgba(212, 175, 55, 0.5)"
>
  <Card>Your content</Card>
</AnimatedCard>
```

**Variants:**
- `AnimatedCard`: Basic 3D tilt card
- `FlipCard`: Card that flips to reveal back
- `ExpandableCard`: Card that expands to show more content
- `ParallaxCard`: Multi-layer parallax card
- `GlassCard`: Glassmorphic card with blur

## Hooks

### useScrollAnimation

Detect when element enters viewport.

```tsx
import { useScrollAnimation } from '@/app/lib/hooks';

const { ref, shouldAnimate } = useScrollAnimation({
  threshold: 0.1,
  triggerOnce: true,
  delay: 0.2
});

<div ref={ref}>
  {shouldAnimate && <Animation />}
</div>
```

### useParallax

Create parallax scrolling effects.

```tsx
import { useParallax } from '@/app/lib/hooks';

const { ref, y } = useParallax({ speed: -50 });

<motion.div ref={ref} style={{ y }}>
  Parallax content
</motion.div>
```

**Variants:**
- `useParallax`: Basic parallax
- `useLayeredParallax`: Multiple layers
- `useParallax3D`: 3D transforms
- `useParallaxScale`: Scale effect
- `useImageParallax`: Ken Burns effect

### useMagneticEffect

Magnetic attraction for elements.

```tsx
import { useMagneticEffect } from '@/app/lib/hooks';

const { ref, offset } = useMagneticEffect({
  strength: 0.3,
  radius: 100
});

<motion.button
  ref={ref}
  animate={{ x: offset.x, y: offset.y }}
>
  Magnetic Button
</motion.button>
```

### useReducedMotion

Respect user's motion preferences.

```tsx
import { useReducedMotion } from '@/app/lib/hooks';

const prefersReducedMotion = useReducedMotion();

if (prefersReducedMotion) {
  // Skip or simplify animations
}
```

## Configuration

### Spring Configs

Pre-configured spring animations for consistent feel:

```tsx
import { springConfigs } from '@/app/lib/animations';

// Available configs:
springConfigs.smooth   // Ultra-smooth for premium feel
springConfigs.snappy   // Quick response for interactions
springConfigs.bouncy   // Playful with overshoot
springConfigs.slow     // Background elements
springConfigs.gentle   // Subtle animations
springConfigs.wobbly   // Attention-grabbing
```

### Easing Functions

Cubic Bezier curves for tween animations:

```tsx
import { easingFunctions } from '@/app/lib/animations';

// Available easings:
easingFunctions.easeOutExpo     // Dramatic deceleration
easingFunctions.easeInOutCubic  // Smooth and balanced
easingFunctions.easeOutBack     // Slight overshoot
easingFunctions.customSmooth    // Web-optimized
easingFunctions.appleEasing     // Apple-style
```

### Durations

Consistent timing values:

```tsx
import { durations } from '@/app/lib/animations';

durations.fastest  // 0.15s
durations.fast     // 0.3s
durations.normal   // 0.5s
durations.slow     // 0.8s
durations.slower   // 1.2s
durations.slowest  // 1.8s
```

## Usage Examples

### Hero Section

```tsx
<StaggerContainer staggerDelay={0.15}>
  <StaggerItem>
    <AnimatedText animation="wordByWord" as="h1">
      Cross-Border Payments Reimagined
    </AnimatedText>
  </StaggerItem>

  <StaggerItem>
    <AnimatedText animation="fadeIn" as="p">
      Instant settlement for financial institutions
    </AnimatedText>
  </StaggerItem>

  <StaggerItem>
    <MagneticButton pulse={true}>
      Get Started
    </MagneticButton>
  </StaggerItem>
</StaggerContainer>
```

### Feature Cards

```tsx
<StaggerContainer className="grid md:grid-cols-3 gap-8">
  {features.map((feature) => (
    <StaggerItem key={feature.id}>
      <AnimatedCard tilt3D={true} hoverLift={true} glowEffect={true}>
        <Card>
          <h3>{feature.title}</h3>
          <p>{feature.description}</p>
        </Card>
      </AnimatedCard>
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Statistics Counter

```tsx
<AnimatedSection animation="scaleIn">
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={{ type: 'spring', stiffness: 200 }}
  >
    <span className="text-5xl font-bold">10,000+</span>
    <p>Transactions per second</p>
  </motion.div>
</AnimatedSection>
```

### Parallax Section

```tsx
const { ref, y } = useParallax({ speed: -30 });

<motion.div ref={ref} style={{ y }}>
  <Image src="/background.jpg" />
</motion.div>
```

## Performance

### Optimization Tips

1. **Use GPU-accelerated properties**: `transform`, `opacity`
2. **Enable will-change** for animated elements (done automatically)
3. **Debounce scroll events** (built into hooks)
4. **Lazy load animations** for off-screen elements
5. **Limit simultaneous animations** to prevent jank

### Performance Monitoring

```tsx
// Check frame rate
const { scrollY } = useScroll();

useEffect(() => {
  let lastTime = performance.now();

  const unsubscribe = scrollY.on('change', () => {
    const now = performance.now();
    const fps = 1000 / (now - lastTime);
    console.log('FPS:', fps);
    lastTime = now;
  });

  return unsubscribe;
}, [scrollY]);
```

## Accessibility

### Reduced Motion Support

All components automatically respect `prefers-reduced-motion`:

```tsx
// User with reduced motion preference:
// - Animations are disabled or minimal
// - Transitions use instant durations
// - No parallax or 3D effects
```

### Manual Control

```tsx
import { useReducedMotion } from '@/app/lib/hooks';

const prefersReducedMotion = useReducedMotion();

<motion.div
  animate={prefersReducedMotion ? {} : { y: [0, -10, 0] }}
>
  Content
</motion.div>
```

### Best Practices

1. ✅ Always use animation components that check reduced motion
2. ✅ Provide static fallbacks for essential content
3. ✅ Don't rely on animation for critical information
4. ✅ Test with `prefers-reduced-motion: reduce`
5. ✅ Ensure keyboard navigation works with animations

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE 11 (fallback to no animations)

## Migration Guide

### From Basic Motion to Premium

**Before:**
```tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
>
  Content
</motion.div>
```

**After:**
```tsx
<AnimatedSection animation="fadeInUp">
  Content
</AnimatedSection>
```

### Benefits
- Consistent animations across app
- Accessibility built-in
- Performance optimized
- Less code to maintain

## Troubleshooting

### Animations not triggering

1. Check if element is in viewport
2. Verify `triggerOnce` setting
3. Check `threshold` value
4. Ensure parent has proper overflow

### Performance issues

1. Reduce number of simultaneous animations
2. Use simpler animations for mobile
3. Check for layout thrashing
4. Profile with Chrome DevTools

### Reduced motion not working

1. Check browser support for media query
2. Test in browser settings
3. Verify hook implementation
4. Check component props

## Resources

- [Framer Motion Docs](https://www.framer.com/motion/)
- [Animation Performance](https://web.dev/animations/)
- [Reduced Motion](https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-reduced-motion)
