# Removed Animations Backup

This document contains all animations that were removed from the codebase for optimization.
These can be re-implemented in a more optimized way later.

## CSS Animations (from globals.css)

### Keyframes
```css
@keyframes revealUp {
  from { opacity: 0; transform: translateY(30px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes revealScale {
  from { opacity: 0; transform: scale(0.9); }
  to { opacity: 1; transform: scale(1); }
}

@keyframes revealBlur {
  from { opacity: 0; filter: blur(10px); }
  to { opacity: 1; filter: blur(0); }
}

@keyframes glowPulse {
  0%, 100% { box-shadow: 0 0 20px rgba(212, 175, 55, 0.3), 0 0 40px rgba(212, 175, 55, 0.1); }
  50% { box-shadow: 0 0 40px rgba(212, 175, 55, 0.6), 0 0 80px rgba(212, 175, 55, 0.3); }
}

@keyframes shimmerSlide {
  0% { transform: translateX(-100%) translateY(-100%); }
  100% { transform: translateX(100%) translateY(100%); }
}

@keyframes floatGentle {
  0%, 100% { transform: translateY(0) translateX(0); }
  25% { transform: translateY(-10px) translateX(5px); }
  50% { transform: translateY(-5px) translateX(-5px); }
  75% { transform: translateY(-15px) translateX(3px); }
}

@keyframes floatSlow {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-30px) translateX(10px); }
}

@keyframes floatMedium {
  0%, 100% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-20px) translateX(-15px); }
}

@keyframes pulseSlow {
  0%, 100% { opacity: 0.5; transform: translate(-50%, -50%) scale(1); }
  50% { opacity: 0.8; transform: translate(-50%, -50%) scale(1.05); }
}

@keyframes fadeIn {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

@keyframes bounceSlow {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(8px); }
}

@keyframes rotateContinuous {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}

@keyframes flowDot {
  0% { opacity: 0; transform: translateX(0); }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateX(100%); }
}

@keyframes flowDotRTL {
  0% { opacity: 0; transform: translateX(0); }
  20% { opacity: 1; }
  80% { opacity: 1; }
  100% { opacity: 0; transform: translateX(-100%); }
}
```

### Animation Classes
```css
.animate-reveal-up { animation: revealUp 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.animate-reveal-scale { animation: revealScale 0.8s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.animate-reveal-blur { animation: revealBlur 1s cubic-bezier(0.22, 1, 0.36, 1) forwards; }
.animate-glow-pulse { animation: glowPulse 3s ease-in-out infinite; }
.animate-float-gentle { animation: floatGentle 8s ease-in-out infinite; }
.animate-float-slow { animation: floatSlow 8s ease-in-out infinite; }
.animate-float-medium { animation: floatMedium 6s ease-in-out infinite; }
.animate-pulse-slow { animation: pulseSlow 4s ease-in-out infinite; }
.animate-fade-in { animation: fadeIn 0.8s ease-out forwards; }
.animate-bounce-slow { animation: bounceSlow 2s ease-in-out infinite; }
.animate-rotate { animation: rotateContinuous 2s linear infinite; }
.animate-flow-dot { animation: flowDot 2s ease-in-out infinite; }
```

### Animation Delay Utilities
```css
.animation-delay-0 { animation-delay: 0ms; }
.animation-delay-75 { animation-delay: 75ms; }
.animation-delay-100 { animation-delay: 100ms; }
.animation-delay-150 { animation-delay: 150ms; }
.animation-delay-200 { animation-delay: 200ms; }
.animation-delay-300 { animation-delay: 300ms; }
.animation-delay-500 { animation-delay: 500ms; }
```

## Tailwind Animation Config (from tailwind.config.ts)

```typescript
animation: {
  'fade-in': 'fadeIn 0.5s ease-in-out',
  'fade-up': 'fadeUp 0.5s ease-out',
  'fade-down': 'fadeDown 0.5s ease-out',
  'slide-in': 'slideIn 0.3s ease-out',
  'slide-up': 'slideUp 0.3s ease-out',
  'scale-in': 'scaleIn 0.3s ease-out',
  'glow': 'glow 2s ease-in-out infinite',
  'shimmer': 'shimmer 2s linear infinite',
  'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
  'float': 'float 6s ease-in-out infinite',
  'gradient': 'gradient 8s linear infinite',
},
keyframes: {
  fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
  fadeUp: { '0%': { opacity: '0', transform: 'translateY(10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
  fadeDown: { '0%': { opacity: '0', transform: 'translateY(-10px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
  slideIn: { '0%': { transform: 'translateX(-100%)' }, '100%': { transform: 'translateX(0)' } },
  slideUp: { '0%': { transform: 'translateY(100%)' }, '100%': { transform: 'translateY(0)' } },
  scaleIn: { '0%': { transform: 'scale(0.9)', opacity: '0' }, '100%': { transform: 'scale(1)', opacity: '1' } },
  glow: { '0%, 100%': { boxShadow: '0 0 20px rgba(212, 175, 55, 0.5)' }, '50%': { boxShadow: '0 0 40px rgba(212, 175, 55, 0.8)' } },
  shimmer: { '0%': { backgroundPosition: '-200% 0' }, '100%': { backgroundPosition: '200% 0' } },
  pulseGlow: { '0%, 100%': { opacity: '1' }, '50%': { opacity: '0.5' } },
  float: { '0%, 100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-20px)' } },
  gradient: { '0%': { backgroundPosition: '0% 50%' }, '50%': { backgroundPosition: '100% 50%' }, '100%': { backgroundPosition: '0% 50%' } },
}
```

## Component Animations Usage

### Files with animations to remove:

1. **page.tsx (home)** - lines 66-68, 83, 153-155, 160-161, 172-176, 192
   - `animate-float-slow`, `animate-float-medium`, `animate-pulse-slow`
   - `animate-fade-in`, `animate-bounce-slow`
   - `hover:shadow`, `hover:scale`, `transition-all`

2. **KeyOutcomes.tsx** - lines 72-75
   - `animate-fade-in`, `animation-delay-*`

3. **AnimatedSections.tsx** - entire AnimatedSection component + lines 537-560
   - `will-change-[opacity,transform]`, transform animations
   - `hover:shadow`, `hover:scale`, `transition-all`

4. **Header.tsx** - multiple lines
   - `transition-all`, `transition-colors`, `transition-transform`
   - `hover:*`, `scale-*`, `animate-fade-in-up`

5. **Footer.tsx** - multiple lines
   - `transition-all`, `transition-colors`, `hover:*`, `group-hover:*`

6. **PlatformSummary.tsx** - line 61
   - `animate-fade-in-up`

7. **PlatformPageClient.tsx** - lines 45, 51-52, 72, 78-79, 99, 105-106, 147, 172-174
   - `animate-fade-in-up`, `animate-fade-in`
   - `group-hover:*`, `transition-colors`, `hover:*`

8. **NetworkPageClient.tsx** - many lines
   - `animate-fade-in-up`, `animate-pulse`, `animate-fade-in`
   - `hover:*`, `group-hover:*`, `transition-*`

9. **CompanyPageClient.tsx** - many lines
   - `animate-fade-in-up`, `animate-fade-in`
   - `hover:*`, `group-hover:*`, `transition-*`

10. **ContactForm.tsx** - lines 81, 94, 174, 184, 202-210, 225, 252
    - `animate-fade-in`, `animate-spin`
    - `hover:*`, `transition-*`

11. **IsoFlowAnimation.tsx** - lines 90, 102, 115, 136, 149, 170
    - `animate-fade-in-up`, `animate-pulse-slow`, `animate-fade-in`, `animate-flow-dot`
    - `hover:scale`, `group-hover:*`, `transition-*`

12. **RegulatoryTimeline.tsx** - lines 59, 87, 117, 131, 145, 173, 180, 198, 206
    - `animate-pulse`, `animate-fade-in`, `animate-fade-in-up`
    - `hover:*`, `transition-*`

13. **TrustBar.tsx** - line 45
    - `hover:*`, `transition-colors`

14. **AnimatedStats.tsx** - line 98
    - `transformStyle: 'preserve-3d'` (Framer Motion based)

## Hover Effects to Remove

All instances of:
- `hover:shadow-*`
- `hover:scale-*`
- `hover:bg-*`
- `hover:text-*`
- `hover:border-*`
- `group-hover:*`
- `active:scale-*`

## Transition Effects to Remove

All instances of:
- `transition-all`
- `transition-colors`
- `transition-transform`
- `transition-opacity`
- `duration-*`
- `ease-*`

## Framer Motion Components

**AnimatedStats.tsx** uses Framer Motion for:
- `useMotionValue`, `useSpring`, `useTransform`
- `motion.div` with `rotateX`, `rotateY`, `scale` animations
- `ParallaxCard`, `GlowingBorder`, `PulsingDot`, `ShimmerText`, `StaggeredList`, `MagneticButton`

**AnimatedSections.tsx** uses:
- `useInView` from `framer-motion`
- Custom `AnimatedSection` component with opacity/transform transitions

---

## Recommended Optimization Path

1. Remove all `animate-*` classes from components
2. Remove all `hover:*` and `group-hover:*` classes
3. Remove all `transition-*` classes
4. Remove keyframes from globals.css
5. Remove animation config from tailwind.config.ts
6. Keep only essential loading states (`animate-pulse` for skeletons, `animate-spin` for loading)
7. Consider using CSS `@media (prefers-reduced-motion: no-preference)` for any future animations
