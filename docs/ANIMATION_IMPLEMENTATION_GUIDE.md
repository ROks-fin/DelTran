# Руководство по внедрению премиальных анимаций

## ✅ Что уже реализовано

### 1. Базовая инфраструктура
- ✅ Конфигурации пружин и easing функций (`spring-configs.ts`)
- ✅ Предустановленные варианты анимаций (`framer-variants.ts`)
- ✅ Система хуков для анимаций
- ✅ Компоненты-обёртки для анимаций
- ✅ Поддержка accessibility (reduced motion)
- ✅ Оптимизация производительности

### 2. Компоненты
- ✅ `AnimatedSection` - секции с scroll-triggered анимациями
- ✅ `StaggerContainer/StaggerItem` - последовательные анимации
- ✅ `AnimatedText` - текстовые анимации (8 типов)
- ✅ `MagneticButton` - магнитные кнопки
- ✅ `AnimatedCard` - 3D карточки с эффектами
- ✅ `FlipCard`, `ExpandableCard`, `GlassCard` и другие варианты

### 3. Хуки
- ✅ `useScrollAnimation` - детекция появления в viewport
- ✅ `useParallax` - параллакс эффекты (8 вариантов)
- ✅ `useMagneticEffect` - магнитное притяжение
- ✅ `useHoverTilt` - 3D наклон при hover
- ✅ `useReducedMotion` - accessibility
- ✅ И многие другие...

### 4. Примеры применения
- ✅ Создан `page-animated.tsx` с полностью анимированной главной страницей
- ✅ Документация по использованию

## 🚀 Как применить к остальным страницам

### Вариант 1: Быстрое применение (рекомендуется)

Замените существующий `page.tsx` на `page-animated.tsx`:

```bash
# В корне проекта
mv app/(routes)/[locale]/page.tsx app/(routes)/[locale]/page-old.tsx
mv app/(routes)/[locale]/page-animated.tsx app/(routes)/[locale]/page.tsx
```

### Вариант 2: Постепенное внедрение

Добавляйте анимации к существующим компонентам:

#### 1. Импортируйте компоненты

```tsx
import {
  AnimatedSection,
  StaggerContainer,
  StaggerItem,
  AnimatedText,
  MagneticButton,
  AnimatedCard
} from '@/app/lib/components/animated';
```

#### 2. Оберните секции

**Было:**
```tsx
<section className="py-32">
  <h2>Title</h2>
  <p>Description</p>
</section>
```

**Стало:**
```tsx
<AnimatedSection animation="fadeInUp" className="py-32">
  <AnimatedText animation="wordByWord" as="h2">Title</AnimatedText>
  <AnimatedText animation="fadeIn" as="p">Description</AnimatedText>
</AnimatedSection>
```

#### 3. Добавьте stagger к спискам

**Было:**
```tsx
{items.map(item => (
  <Card key={item.id}>{item.content}</Card>
))}
```

**Стало:**
```tsx
<StaggerContainer staggerDelay={0.1}>
  {items.map(item => (
    <StaggerItem key={item.id}>
      <AnimatedCard tilt3D={true} hoverLift={true}>
        <Card>{item.content}</Card>
      </AnimatedCard>
    </StaggerItem>
  ))}
</StaggerContainer>
```

#### 4. Улучшите кнопки

**Было:**
```tsx
<button onClick={handleClick}>Click me</button>
```

**Стало:**
```tsx
<MagneticButton
  magnetStrength={0.3}
  hoverScale={1.05}
  ripple={true}
  onClick={handleClick}
>
  Click me
</MagneticButton>
```

## 📄 Применение к конкретным страницам

### Platform Page (`/platform`)

```tsx
// Hero section
<AnimatedSection animation="fadeInUp">
  <AnimatedText animation="wordByWord" as="h1">
    {t('platform.title')}
  </AnimatedText>
</AnimatedSection>

// Features grid
<StaggerContainer className="grid md:grid-cols-3 gap-8">
  {features.map(feature => (
    <StaggerItem key={feature.id}>
      <AnimatedCard tilt3D={true} glowEffect={true}>
        <Card>{feature.content}</Card>
      </AnimatedCard>
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Investors Page (`/investors`)

```tsx
// Metrics section
<StaggerContainer className="grid md:grid-cols-4 gap-6">
  {metrics.map(metric => (
    <StaggerItem key={metric.key}>
      <AnimatedCard tilt3D={true}>
        <motion.div
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
        >
          {metric.value}
        </motion.div>
      </AnimatedCard>
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Contact Page (`/contact`)

```tsx
// Form inputs
import { inputFocus } from '@/app/lib/animations';

<motion.input
  variants={inputFocus}
  initial="initial"
  whileFocus="focus"
  className="..."
/>

// Submit button
<MagneticButton
  magnetStrength={0.5}
  hoverScale={1.1}
  ripple={true}
  pulse={true}
  type="submit"
>
  Send Message
</MagneticButton>
```

## 🎨 Рекомендуемые анимации для разных элементов

### Заголовки
- Hero: `animation="wordByWord"` с `stagger={0.08}`
- Секции: `animation="fadeIn"` или `animation="slideUp"`
- Акценты: `animation="gradient"` для анимированного градиента

### Карточки
```tsx
<AnimatedCard
  tilt3D={true}           // 3D эффект при hover
  tiltIntensity={8}        // Интенсивность наклона
  hoverLift={true}         // Поднятие при hover
  liftDistance={-15}       // Расстояние подъёма
  glowEffect={true}        // Свечение при hover
  glowColor="rgba(212, 175, 55, 0.5)"
/>
```

### Кнопки
```tsx
// Primary CTA
<MagneticButton
  magnetStrength={0.4}
  magnetRadius={120}
  hoverScale={1.08}
  ripple={true}
  pulse={true}
/>

// Secondary button
<MagneticButton
  magnetStrength={0.2}
  hoverScale={1.05}
  ripple={true}
/>

// Icon button
<IconButton rotateOnHover={true}>
  <Icon />
</IconButton>
```

### Списки и Grid
```tsx
<StaggerContainer
  staggerDelay={0.1}      // Задержка между элементами
  initialDelay={0.2}      // Начальная задержка
>
  {items.map(item => (
    <StaggerItem animation="fadeInUp">
      {item}
    </StaggerItem>
  ))}
</StaggerContainer>
```

### Изображения
```tsx
const { ref, scale, y } = useImageParallax({ intensity: 1.2 });

<motion.div ref={ref} style={{ scale, y }}>
  <Image src={...} />
</motion.div>
```

## ⚡ Советы по производительности

1. **Ограничивайте одновременные анимации**
   - На desktop: до 20 элементов одновременно
   - На mobile: до 10 элементов

2. **Используйте `triggerOnce={true}`** для секций, которые не нужно анимировать повторно

3. **Оптимизируйте threshold**
   ```tsx
   // Плохо - слишком точно
   <AnimatedSection threshold={0.5} />

   // Хорошо - запускается раньше
   <AnimatedSection threshold={0.1} />
   ```

4. **Отключайте сложные эффекты на мобильных**
   ```tsx
   const isMobile = useMediaQuery('(max-width: 768px)');

   <AnimatedCard
     tilt3D={!isMobile}
     glowEffect={!isMobile}
   />
   ```

## 🎯 Приоритеты внедрения

### Высокий приоритет (сделать первым)
1. ✅ Hero секции на всех страницах
2. ⏳ CTA кнопки (заменить на MagneticButton)
3. ⏳ Основные карточки с features/benefits

### Средний приоритет
4. ⏳ Statistics/Metrics (счётчики с анимацией)
5. ⏳ Testimonials/Reviews
6. ⏳ Footer navigation

### Низкий приоритет (опционально)
7. ⏳ Background elements
8. ⏳ Loading states
9. ⏳ Page transitions

## 🧪 Тестирование

### Проверьте в разных режимах

1. **Стандартный режим**
   - Все анимации работают плавно
   - 60 FPS без просадок

2. **Reduced motion**
   ```bash
   # В DevTools
   CMD/CTRL + Shift + P -> "Show Rendering"
   -> Enable "Emulate CSS prefers-reduced-motion"
   ```
   - Анимации отключены или минимальны
   - Контент доступен

3. **Медленное соединение**
   - Используйте skeleton loaders
   - Graceful degradation

4. **Мобильные устройства**
   - Упрощённые анимации
   - Нет parallax на iOS Safari

## 📱 Особенности для мобильных

```tsx
const isMobile = useMediaQuery('(max-width: 768px)');

<AnimatedSection
  animation={isMobile ? 'fadeIn' : 'fadeInUp'}
  threshold={isMobile ? 0.05 : 0.1}
>
  {/* Раньше триггер на мобильных */}
</AnimatedSection>

<AnimatedCard
  tilt3D={!isMobile}  // Отключить 3D на мобильных
  hoverLift={!isMobile}
  glowEffect={!isMobile}
/>
```

## 🐛 Распространённые ошибки

### Анимации не работают

1. ✅ Проверьте импорты
2. ✅ Убедитесь что `'use client'` добавлен
3. ✅ Проверьте что Framer Motion установлен
4. ✅ Очистите кэш Next.js

### Лаги и просадки FPS

1. ✅ Уменьшите количество одновременных анимаций
2. ✅ Используйте `will-change` (автоматически)
3. ✅ Упростите анимации на мобильных
4. ✅ Проверьте DevTools Performance

### Конфликты со стилями

1. ✅ Проверьте `overflow: hidden` на родителях
2. ✅ Убедитесь что z-index корректный
3. ✅ Проверьте CSS transforms

## 📊 Метрики успеха

После внедрения отслеживайте:

- ✅ **FPS**: должен быть стабильный 60 FPS
- ✅ **Lighthouse Performance**: > 90
- ✅ **Time to Interactive**: < 3.5s
- ✅ **Cumulative Layout Shift**: < 0.1
- ✅ **User engagement**: +20-30% (time on page, scroll depth)

## 🎓 Обучение команды

### Базовое использование (15 минут)
1. Импорты и setup
2. AnimatedSection для секций
3. MagneticButton для кнопок

### Продвинутое (1 час)
1. Кастомные варианты
2. Комбинирование эффектов
3. Оптимизация производительности

### Мастер-класс (2+ часа)
1. Создание собственных компонентов
2. Сложные параллакс сцены
3. Микро-интеракции

## 🔗 Полезные ссылки

- [Полная документация](./ANIMATIONS.md)
- [Примеры на главной странице](../app/(routes)/[locale]/page-animated.tsx)
- [Framer Motion API](https://www.framer.com/motion/)
- [Web Animations Best Practices](https://web.dev/animations/)

---

**Готово к использованию! 🚀**

Все компоненты протестированы, оптимизированы и готовы к production.
