# SEO Quick Start Guide

Быстрое руководство по использованию SEO системы DelTran.

## 🚀 Быстрый старт (5 минут)

### 1. Настройте переменные окружения

```bash
# Скопируйте example файл
cp .env.example .env.local

# Добавьте ваши ключи
NEXT_PUBLIC_SITE_URL=https://deltran.ai
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

### 2. Базовое использование

Все основные SEO компоненты уже интегрированы в `layout.tsx`. Вам нужно только добавить метаданные на страницы:

```tsx
// app/(routes)/[locale]/your-page/page.tsx
import { generatePageMetadata, LocaleKey } from '@/lib/seo/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return generatePageMetadata({
    title: 'Your Page Title',
    description: 'Your page description',
    locale: locale as LocaleKey,
    path: '/your-page',
  });
}

export default function YourPage() {
  return <div>Your content</div>;
}
```

## 📦 Основные компоненты

### Оптимизированные изображения

```tsx
import { OptimizedImage } from '@/app/components/seo/OptimizedImage';

<OptimizedImage
  src="/image.jpg"
  alt="Description"
  width={800}
  height={600}
/>
```

### Breadcrumbs

```tsx
import { Breadcrumbs } from '@/app/components/seo/Breadcrumbs';

<Breadcrumbs locale={locale} />
```

### Отслеживание событий

```tsx
import { useAnalytics } from '@/app/components/seo/Analytics';

const { trackEvent } = useAnalytics();

trackEvent('button_click', { label: 'CTA' });
```

## ✅ Что уже работает

- ✅ Метаданные (title, description, OG)
- ✅ JSON-LD схемы на всех страницах
- ✅ Динамический sitemap.xml
- ✅ Robots.txt
- ✅ Google Analytics + Web Vitals
- ✅ Оптимизация изображений
- ✅ Security headers

## 📊 Проверка

```bash
# Проверьте sitemap
curl http://localhost:3000/sitemap.xml

# Проверьте robots
curl http://localhost:3000/robots.txt

# Запустите Lighthouse
npx lighthouse http://localhost:3000
```

## 🎯 Следующие шаги

1. Заполните уникальные метаданные для каждой страницы
2. Добавьте FAQ схемы где нужно
3. Настройте tracking events для конверсий
4. Проверьте в Google Search Console

Подробная документация: [docs/SEO.md](./SEO.md)
