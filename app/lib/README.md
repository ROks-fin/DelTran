# DelTran Premium Animation Library

Enterprise-grade animation system for DelTran financial platform.

## 🚀 Quick Start

### 1. Basic Section Animation

```tsx
import { AnimatedSection } from '@/app/lib/components/animated';

export default function MyPage() {
  return (
    <AnimatedSection animation="fadeInUp">
      <h1>Your Content</h1>
    </AnimatedSection>
  );
}
```

### 2. Text Animations

```tsx
import { AnimatedText } from '@/app/lib/components/animated';

<AnimatedText animation="wordByWord" as="h1">
  Cross-Border Payments Reimagined
</AnimatedText>
```

### 3. Magnetic Button

```tsx
import { MagneticButton } from '@/app/lib/components/animated';

<MagneticButton
  magnetStrength={0.3}
  hoverScale={1.05}
  ripple={true}
>
  Get Started
</MagneticButton>
```

### 4. 3D Card

```tsx
import { AnimatedCard } from '@/app/lib/components/animated';

<AnimatedCard tilt3D={true} hoverLift={true} glowEffect={true}>
  <Card>Your content</Card>
</AnimatedCard>
```

### 5. Stagger List

```tsx
import { StaggerContainer, StaggerItem } from '@/app/lib/components/animated';

<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <Card>{item.content}</Card>
    </StaggerItem>
  ))}
</StaggerContainer>
```

## 📦 What's Included

### Components
- `AnimatedSection` - Scroll-triggered sections
- `AnimatedText` - 8 text animation types
- `MagneticButton` - Magnetic cursor attraction
- `AnimatedCard` - 3D tilt effects
- `FlipCard`, `GlassCard`, `ExpandableCard` - Card variants
- `StaggerContainer/StaggerItem` - Sequential animations

### Hooks
- `useScrollAnimation` - Viewport detection
- `useParallax` - Parallax effects (8 variants)
- `useMagneticEffect` - Magnetic attraction
- `useHoverTilt` - 3D hover tilt
- `useReducedMotion` - Accessibility

### Configuration
- `springConfigs` - Pre-configured springs
- `easingFunctions` - Cubic Bezier curves
- `durations` - Consistent timing
- `framerVariants` - Animation presets

## 📖 Documentation

- [Full Documentation](../../docs/ANIMATIONS.md)
- [Implementation Guide](../../docs/ANIMATION_IMPLEMENTATION_GUIDE.md)
- [Complete Example](../../../app/(routes)/[locale]/page-animated.tsx)

## ✨ Features

- ✅ **GPU-Accelerated** - Smooth 60 FPS animations
- ✅ **Accessibility-First** - Reduced motion support
- ✅ **TypeScript** - Full type safety
- ✅ **Production-Ready** - Battle-tested components
- ✅ **Customizable** - Extensive configuration options
- ✅ **Performant** - Optimized for web vitals

## 🎨 Animation Types

### Text Animations
- `fadeIn` - Simple fade
- `slideUp` / `slideDown` - Directional slides
- `wordByWord` - Reveal word by word
- `letterByLetter` - Reveal letter by letter
- `typewriter` - Typewriter effect
- `gradient` - Animated gradient
- `reveal` - Clip-path reveal

### Section Animations
- `fadeInUp` - Fade in from bottom
- `fadeInLeft` - Fade in from left
- `fadeInRight` - Fade in from right
- `scaleIn` - Scale from center

## 🔧 Configuration Examples

### Custom Spring

```tsx
import { createSpringConfig } from '@/app/lib/animations';

const customSpring = createSpringConfig(300, 25, 1);

<motion.div transition={customSpring}>
  Content
</motion.div>
```

### Custom Variants

```tsx
const customVariants = {
  initial: { opacity: 0, scale: 0.8 },
  animate: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.6 }
  }
};

<AnimatedSection customVariants={customVariants}>
  Content
</AnimatedSection>
```

## ⚡ Performance Tips

1. Use `triggerOnce={true}` for one-time animations
2. Limit simultaneous animations (max 20 on desktop)
3. Use simpler animations on mobile
4. Enable GPU acceleration (automatic)
5. Respect reduced motion preferences (automatic)

## 🧪 Testing

### Reduced Motion

```bash
# Chrome DevTools
CMD+Shift+P -> "Show Rendering" -> "Emulate CSS prefers-reduced-motion"
```

### Performance

```tsx
// Monitor FPS
import { useScrollVelocity } from '@/app/lib/hooks';

const velocity = useScrollVelocity();
console.log('Scroll velocity:', velocity);
```

## 🎯 Best Practices

### ✅ Do
- Use pre-configured components
- Respect reduced motion
- Test on real devices
- Monitor performance
- Use semantic HTML

### ❌ Don't
- Animate layout properties (width, height)
- Use too many simultaneous animations
- Rely on animations for critical content
- Skip accessibility testing
- Ignore performance metrics

## 📱 Mobile Considerations

```tsx
const isMobile = useMediaQuery('(max-width: 768px)');

<AnimatedCard
  tilt3D={!isMobile}
  glowEffect={!isMobile}
>
  Content
</AnimatedCard>
```

## 🐛 Troubleshooting

### Animations not working
1. Check imports
2. Verify `'use client'` directive
3. Ensure Framer Motion is installed
4. Clear Next.js cache

### Performance issues
1. Reduce simultaneous animations
2. Simplify on mobile
3. Check DevTools Performance tab
4. Verify GPU acceleration

## 📄 License

Proprietary - DelTran Financial Platform

## 🤝 Support

For questions or issues, contact the development team.

---

**Built with ❤️ for DelTran**
