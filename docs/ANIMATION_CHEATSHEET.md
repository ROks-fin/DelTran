# 🎬 Animation Cheatsheet

Быстрая справка по премиальным анимациям DelTran.

## 📦 Импорты

```tsx
// Компоненты
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  AnimatedText,
  MagneticButton,
  AnimatedCard
} from '@/app/lib/components/animated';

// Хуки
import {
  useScrollAnimation,
  useParallax,
  useMagneticEffect,
  useReducedMotion
} from '@/app/lib/hooks';

// Конфигурация
import {
  springConfigs,
  easingFunctions,
  durations
} from '@/app/lib/animations';
```

## 🎨 Компоненты

### AnimatedSection
```tsx
<AnimatedSection
  animation="fadeInUp"    // fadeInUp | fadeInLeft | fadeInRight | scaleIn
  delay={0.2}             // секунды
  threshold={0.1}         // 0-1
  triggerOnce={true}      // boolean
>
  Content
</AnimatedSection>
```

### AnimatedText
```tsx
<AnimatedText
  animation="wordByWord"  // fadeIn | slideUp | wordByWord | letterByLetter | typewriter | gradient | reveal
  stagger={0.05}         // секунды между словами/буквами
  as="h1"                // HTML элемент
  scrollTrigger={true}   // триггер при скролле
>
  Your text here
</AnimatedText>
```

### MagneticButton
```tsx
<MagneticButton
  magnetStrength={0.3}   // 0-1
  magnetRadius={100}     // px
  hoverScale={1.05}      // множитель
  ripple={true}          // boolean
  pulse={true}           // boolean
  onClick={handler}
>
  Button text
</MagneticButton>
```

### AnimatedCard
```tsx
<AnimatedCard
  tilt3D={true}          // boolean
  tiltIntensity={10}     // градусы
  hoverLift={true}       // boolean
  liftDistance={-15}     // px (отрицательное = вверх)
  glowEffect={true}      // boolean
  glowColor="rgba(212, 175, 55, 0.5)"
>
  <Card>Content</Card>
</AnimatedCard>
```

### StaggerContainer
```tsx
<StaggerContainer
  staggerDelay={0.1}     // секунды между элементами
  initialDelay={0.2}     // начальная задержка
>
  <StaggerItem animation="fadeInUp">Item 1</StaggerItem>
  <StaggerItem animation="fadeInUp">Item 2</StaggerItem>
</StaggerContainer>
```

## 🪝 Хуки

### useScrollAnimation
```tsx
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
```tsx
const { ref, y } = useParallax({
  speed: -50,          // скорость параллакса
  smoothness: 0        // 0-1 (0 = без сглаживания)
});

<motion.div ref={ref} style={{ y }}>
  Parallax content
</motion.div>
```

### useMagneticEffect
```tsx
const { ref, offset } = useMagneticEffect({
  strength: 0.3,       // 0-1
  radius: 100          // px
});

<motion.div
  ref={ref}
  animate={{ x: offset.x, y: offset.y }}
>
  Magnetic element
</motion.div>
```

### useReducedMotion
```tsx
const prefersReducedMotion = useReducedMotion();

if (prefersReducedMotion) {
  // Упростить или отключить анимации
}
```

## ⚙️ Конфигурация

### Springs
```tsx
springConfigs.smooth   // Ультра-плавный
springConfigs.snappy   // Быстрый отклик
springConfigs.bouncy   // С отскоком
springConfigs.slow     // Медленный
springConfigs.gentle   // Мягкий
springConfigs.wobbly   // Колеблющийся
```

### Easing
```tsx
easingFunctions.easeOutExpo      // Драматичный
easingFunctions.easeInOutCubic   // Плавный
easingFunctions.easeOutBack      // С превышением
easingFunctions.customSmooth     // Оптимизированный
easingFunctions.appleEasing      // Apple-стиль
```

### Durations
```tsx
durations.fastest  // 0.15s
durations.fast     // 0.3s
durations.normal   // 0.5s
durations.slow     // 0.8s
durations.slower   // 1.2s
durations.slowest  // 1.8s
```

## 🎯 Готовые паттерны

### Hero Section
```tsx
<StaggerContainer staggerDelay={0.15}>
  <StaggerItem>
    <AnimatedText animation="wordByWord" as="h1">
      Main Title
    </AnimatedText>
  </StaggerItem>
  <StaggerItem>
    <AnimatedText animation="fadeIn" as="p">
      Subtitle
    </AnimatedText>
  </StaggerItem>
  <StaggerItem>
    <MagneticButton pulse={true}>CTA</MagneticButton>
  </StaggerItem>
</StaggerContainer>
```

### Feature Grid
```tsx
<StaggerContainer className="grid md:grid-cols-3 gap-8">
  {features.map(f => (
    <StaggerItem key={f.id}>
      <AnimatedCard tilt3D hoverLift glowEffect>
        <Card>{f.content}</Card>
      </AnimatedCard>
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Statistics
```tsx
<AnimatedSection animation="scaleIn">
  <motion.div
    initial={{ scale: 0 }}
    whileInView={{ scale: 1 }}
    viewport={{ once: true }}
    transition={springConfigs.bouncy}
  >
    <span className="text-5xl">10,000+</span>
  </motion.div>
</AnimatedSection>
```

### Steps/Timeline
```tsx
<StaggerContainer className="grid md:grid-cols-4">
  {steps.map((step, i) => (
    <StaggerItem key={i}>
      <AnimatedCard hoverLift>
        <motion.div
          className="step-number"
          whileHover={{ scale: 1.2, rotate: 360 }}
        >
          {i + 1}
        </motion.div>
        <h3>{step.title}</h3>
        <p>{step.description}</p>
      </AnimatedCard>
    </StaggerItem>
  ))}
</StaggerContainer>
```

## 📱 Мобильная оптимизация

```tsx
const isMobile = useMediaQuery('(max-width: 768px)');

<AnimatedSection
  animation={isMobile ? 'fadeIn' : 'fadeInUp'}
  threshold={isMobile ? 0.05 : 0.1}
>
  <AnimatedCard
    tilt3D={!isMobile}
    glowEffect={!isMobile}
  >
    Content
  </AnimatedCard>
</AnimatedSection>
```

## 🎨 Кастомные анимации

### Кастомные варианты
```tsx
const customVariants = {
  initial: { opacity: 0, scale: 0.8, rotate: -10 },
  animate: {
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.6,
      ease: easingFunctions.easeOutBack
    }
  }
};

<AnimatedSection customVariants={customVariants}>
  Content
</AnimatedSection>
```

### Inline Motion
```tsx
<motion.div
  initial={{ opacity: 0, x: -50 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true }}
  transition={springConfigs.smooth}
>
  Content
</motion.div>
```

## 🔥 Продвинутые эффекты

### Parallax Image
```tsx
const { ref, scale, y } = useImageParallax({ intensity: 1.2 });

<motion.div ref={ref} style={{ scale, y }}>
  <Image src={...} />
</motion.div>
```

### 3D Hover Tilt
```tsx
const { ref, tilt } = useHoverTilt({ intensity: 10 });

<motion.div
  ref={ref}
  animate={{ rotateX: tilt.x, rotateY: tilt.y }}
  transition={springConfigs.smooth}
  style={{ transformStyle: 'preserve-3d' }}
>
  Content
</motion.div>
```

### Gradient Text
```tsx
<AnimatedText animation="gradient" as="h1">
  Animated Gradient Text
</AnimatedText>
```

## ⚡ Производительность

```tsx
// ✅ Хорошо
<AnimatedSection triggerOnce={true}>  // Анимация 1 раз
  <AnimatedCard tilt3D={!isMobile}>   // Упрощение на мобильных
    Content
  </AnimatedCard>
</AnimatedSection>

// ❌ Плохо
<AnimatedSection triggerOnce={false}>  // Повторные анимации
  <AnimatedCard tilt3D={true}>         // 3D на мобильных
    {heavyContent.map(...)}            // Слишком много элементов
  </AnimatedCard>
</AnimatedSection>
```

## 🐛 Дебаг

```tsx
// Проверка FPS
const { scrollY } = useScroll();

useEffect(() => {
  const unsubscribe = scrollY.on('change', () => {
    console.log('Scroll position:', scrollY.get());
  });
  return unsubscribe;
}, [scrollY]);

// Проверка Reduced Motion
const prefersReducedMotion = useReducedMotion();
console.log('Reduced motion:', prefersReducedMotion);

// Проверка Viewport
const { ref, isInView } = useScrollAnimation();
console.log('In view:', isInView);
```

## 📊 Чеклист внедрения

- [ ] Hero section: `AnimatedText` + `MagneticButton`
- [ ] Feature cards: `AnimatedCard` + `StaggerContainer`
- [ ] Statistics: Counter animations
- [ ] CTA buttons: `MagneticButton` с `pulse`
- [ ] Text headings: `AnimatedText` с `wordByWord`
- [ ] Lists/Grids: `StaggerContainer`
- [ ] Mobile optimization
- [ ] Reduced motion testing
- [ ] Performance check (60 FPS)

## 🔗 Ссылки

- [Полная документация](./ANIMATIONS.md)
- [Руководство по внедрению](./ANIMATION_IMPLEMENTATION_GUIDE.md)
- [Пример страницы](../app/(routes)/[locale]/page-animated.tsx)
- [API Reference](../app/lib/README.md)

---

**Используй ctrl+F для быстрого поиска! 🔍**
