# SEO Documentation - DelTran

Комплексное SEO решение сверхпремиального уровня для DelTran.

## 📋 Содержание

1. [Обзор](#обзор)
2. [Установка и настройка](#установка-и-настройка)
3. [Компоненты](#компоненты)
4. [Метаданные страниц](#метаданные-страниц)
5. [Структурированные данные](#структурированные-данные)
6. [Аналитика и мониторинг](#аналитика-и-мониторинг)
7. [Оптимизация производительности](#оптимизация-производительности)
8. [Чеклист](#чеклист)

---

## 🎯 Обзор

Наше SEO решение включает:

- ✅ Динамическая генерация метаданных для всех страниц
- ✅ JSON-LD структурированные данные (Schema.org)
- ✅ Динамический sitemap.xml с поддержкой мультиязычности
- ✅ Оптимизированный robots.txt
- ✅ Open Graph и Twitter Card теги
- ✅ Мониторинг Core Web Vitals
- ✅ Google Analytics 4, Яндекс.Метрика, Microsoft Clarity
- ✅ Оптимизация изображений (WebP, AVIF)
- ✅ Внутренняя перелинковка и breadcrumbs
- ✅ Security и Performance headers

---

## 🚀 Установка и настройка

### 1. Переменные окружения

Создайте `.env.local` файл на основе `.env.example`:

```bash
cp .env.example .env.local
```

Заполните необходимые значения:

```env
# Основной URL сайта
NEXT_PUBLIC_SITE_URL=https://deltran.ai

# Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Яндекс.Метрика (опционально)
NEXT_PUBLIC_YANDEX_METRIKA_ID=XXXXXXXX

# Microsoft Clarity (опционально)
NEXT_PUBLIC_CLARITY_ID=XXXXXXXXXX

# Верификация для поисковых систем
NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION=your-code
```

### 2. Структура файлов

```
lib/seo/
├── config.ts          # Централизованная SEO конфигурация
├── schemas.ts         # JSON-LD схемы
└── monitoring.ts      # Мониторинг и аналитика

app/components/seo/
├── Analytics.tsx      # Google Analytics, Яндекс.Метрика, Clarity
├── WebVitals.tsx      # Core Web Vitals мониторинг
├── OptimizedImage.tsx # Оптимизированные изображения
└── Breadcrumbs.tsx    # Навигация и внутренние ссылки

app/
├── sitemap.ts         # Динамический sitemap
└── robots.ts          # Динамический robots.txt
```

---

## 📦 Компоненты

### SEO Config

Централизованная конфигурация в `lib/seo/config.ts`:

```typescript
import { generatePageMetadata } from '@/lib/seo/config';

export async function generateMetadata({ params }) {
  const { locale } = await params;

  return generatePageMetadata({
    title: 'Your Page Title',
    description: 'Your page description',
    locale: locale,
    path: '/your-path',
    keywords: ['keyword1', 'keyword2'],
  });
}
```

### JSON-LD Схемы

Добавление структурированных данных:

```tsx
import { SchemaScript, generateOrganizationSchema } from '@/lib/seo/schemas';

export default function Page() {
  return (
    <>
      <SchemaScript schema={generateOrganizationSchema()} />
      {/* Ваш контент */}
    </>
  );
}
```

Доступные схемы:
- `generateOrganizationSchema()` - информация о компании
- `generateServiceSchema(locale)` - описание услуг
- `generateWebSiteSchema(locale)` - информация о сайте
- `generateBreadcrumbSchema({ items, locale })` - навигация
- `generateFAQSchema({ faqs })` - FAQ
- `generateArticleSchema({ ... })` - статьи
- `generateLocalBusinessSchema()` - локальный бизнес

### Оптимизированные изображения

```tsx
import { OptimizedImage } from '@/app/components/seo/OptimizedImage';

<OptimizedImage
  src="/path/to/image.jpg"
  alt="Описание изображения"
  width={800}
  height={600}
  priority={false} // true для изображений above-the-fold
  quality={85}
/>
```

Специализированные компоненты:
```tsx
import { HeroImage, ThumbnailImage, AspectImage } from '@/app/components/seo/OptimizedImage';

// Hero изображение (приоритет, высокое качество)
<HeroImage src="/hero.jpg" alt="Hero" />

// Thumbnail (сжатие, маленький размер)
<ThumbnailImage src="/thumb.jpg" alt="Thumb" size={200} />

// С соотношением сторон
<AspectImage src="/image.jpg" alt="Image" aspectRatio="16/9" />
```

### Breadcrumbs и навигация

```tsx
import { Breadcrumbs, InternalLinks } from '@/app/components/seo/Breadcrumbs';

// Автоматические breadcrumbs
<Breadcrumbs locale="en" />

// Кастомные breadcrumbs
<Breadcrumbs
  locale="en"
  items={[
    { name: 'Platform', url: '/platform' },
    { name: 'Features', url: '/platform/features' }
  ]}
/>

// Внутренние ссылки
<InternalLinks
  title="Related Pages"
  links={[
    { href: '/platform', label: 'Platform', description: 'Our platform' },
    { href: '/investors', label: 'Investors', description: 'For investors' }
  ]}
/>
```

---

## 📄 Метаданные страниц

### Базовая страница

```tsx
// app/(routes)/[locale]/your-page/page.tsx
import { generatePageMetadata, LocaleKey } from '@/lib/seo/config';
import { Metadata } from 'next';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  return generatePageMetadata({
    title: 'Your Page Title',
    description: 'Your page description with keywords',
    path: '/your-page',
    locale: locale as LocaleKey,
    keywords: ['cross-border payments', 'fintech'],
    openGraph: {
      title: 'Your Page Title for Social',
      description: 'Description for social media',
      images: ['/og-image.jpg'],
      type: 'website',
    },
  });
}

export default function YourPage() {
  return <div>Your content</div>;
}
```

### Мультиязычные метаданные

Метаданные автоматически генерируют hreflang теги для всех языков:

```typescript
alternates: {
  canonical: 'https://deltran.ai/en/platform',
  languages: {
    'en': 'https://deltran.ai/en/platform',
    'ar': 'https://deltran.ai/ar/platform',
    'he': 'https://deltran.ai/he/platform',
  },
}
```

---

## 🔍 Структурированные данные

### Organization Schema (на всех страницах)

Автоматически добавлено в `layout.tsx`:

```tsx
<SchemaScript
  schema={[
    generateOrganizationSchema(),
    generateWebSiteSchema(locale),
    generateServiceSchema(locale),
  ]}
/>
```

### FAQ Schema

```tsx
import { SchemaScript, generateFAQSchema } from '@/lib/seo/schemas';

<SchemaScript
  schema={generateFAQSchema({
    faqs: [
      {
        question: 'What is DelTran?',
        answer: 'DelTran is a global payment infrastructure...'
      },
      // больше FAQ
    ]
  })}
/>
```

### Article Schema

```tsx
import { generateArticleSchema } from '@/lib/seo/schemas';

<SchemaScript
  schema={generateArticleSchema({
    title: 'Article Title',
    description: 'Article description',
    image: '/article-image.jpg',
    datePublished: '2025-01-01',
    dateModified: '2025-01-15',
    author: 'Author Name',
    locale: 'en',
  })}
/>
```

---

## 📊 Аналитика и мониторинг

### Google Analytics 4

Автоматически интегрировано в `layout.tsx`:

```tsx
import { AllAnalytics } from '@/app/components/seo/Analytics';

<AllAnalytics />
```

### Отслеживание событий

```tsx
import { useAnalytics } from '@/app/components/seo/Analytics';

function MyComponent() {
  const { trackEvent, trackConversion } = useAnalytics();

  const handleClick = () => {
    trackEvent('button_click', {
      category: 'engagement',
      label: 'cta_button',
    });
  };

  const handlePurchase = () => {
    trackConversion('purchase', 100, 'USD');
  };

  return (
    <button onClick={handleClick}>Click me</button>
  );
}
```

### Core Web Vitals

Автоматический мониторинг производительности:

```tsx
import { WebVitals } from '@/app/components/seo/WebVitals';

// Уже добавлено в layout.tsx
<WebVitals />
```

Отслеживаемые метрики:
- **LCP** (Largest Contentful Paint) - < 2.5s
- **FID** (First Input Delay) - < 100ms
- **CLS** (Cumulative Layout Shift) - < 0.1
- **FCP** (First Contentful Paint)
- **TTFB** (Time to First Byte)
- **INP** (Interaction to Next Paint)

---

## ⚡ Оптимизация производительности

### Next.js Config

Оптимизации в `next.config.mjs`:

```javascript
// Оптимизация изображений
images: {
  formats: ['image/avif', 'image/webp'],
  deviceSizes: [640, 750, 828, 1080, 1200, 1920],
}

// Сжатие
compress: true,

// Security headers
async headers() {
  return [{
    source: '/:path*',
    headers: [
      { key: 'X-DNS-Prefetch-Control', value: 'on' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      // и другие
    ]
  }];
}
```

### Оптимизация шрифтов

```tsx
import { Inter } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap', // Предотвращает FOIT
  preload: true,
  variable: '--font-inter',
});
```

### Lazy Loading

```tsx
import dynamic from 'next/dynamic';

// Динамический импорт для тяжелых компонентов
const HeavyComponent = dynamic(
  () => import('./HeavyComponent'),
  { ssr: false, loading: () => <div>Loading...</div> }
);
```

---

## 🗺️ Sitemap и Robots

### Sitemap

Автоматически генерируется в `app/sitemap.ts`:

```
https://deltran.ai/sitemap.xml
```

Включает:
- Все языковые версии (en, ar, he)
- Все страницы с правильными приоритетами
- Alternates для hreflang

### Robots.txt

Автоматически генерируется в `app/robots.ts`:

```
User-agent: *
Allow: /
Disallow: /api/

Sitemap: https://deltran.ai/sitemap.xml
```

---

## ✅ Чеклист SEO

### Обязательные элементы

- [x] Уникальные title и description на всех страницах
- [x] Open Graph теги
- [x] Twitter Card теги
- [x] Canonical URL
- [x] Hreflang теги для мультиязычности
- [x] JSON-LD структурированные данные
- [x] Sitemap.xml
- [x] Robots.txt
- [x] Alt теги на изображениях
- [x] Semantic HTML (h1, h2, nav, main, footer)

### Техническое SEO

- [x] SSL/HTTPS
- [x] Mobile-friendly
- [x] Core Web Vitals оптимизированы
- [x] Скорость загрузки < 3 секунд
- [x] Security headers
- [x] Сжатие (gzip/brotli)
- [x] Кэширование
- [x] CDN для статических ресурсов

### Контентное SEO

- [x] Ключевые слова в title, description, h1
- [x] Внутренняя перелинковка
- [x] Breadcrumbs навигация
- [x] Уникальный контент
- [x] Оптимизация под featured snippets (FAQ)

### Аналитика

- [x] Google Analytics 4
- [x] Google Search Console
- [x] Web Vitals мониторинг
- [x] Конверсионные цели
- [x] Яндекс.Метрика (для RU рынка)

---

## 🔧 Расширенные возможности

### Custom Metadata для специальных страниц

```typescript
// Страница блога с Article schema
export async function generateMetadata({ params, searchParams }) {
  const post = await getPost(searchParams.id);

  return generatePageMetadata({
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    openGraph: {
      type: 'article',
      images: [post.image],
    },
  });
}
```

### Динамические Breadcrumbs

```tsx
// Автоматическая генерация из URL
<Breadcrumbs locale="en" />

// или кастомные
<Breadcrumbs
  locale="en"
  items={[
    { name: 'Blog', url: '/blog' },
    { name: post.category, url: `/blog/${post.category}` },
    { name: post.title, url: `/blog/${post.slug}` }
  ]}
/>
```

### A/B тестирование для SEO

```tsx
import { useAnalytics } from '@/app/components/seo/Analytics';

function TestComponent() {
  const { trackEvent } = useAnalytics();
  const variant = Math.random() > 0.5 ? 'A' : 'B';

  useEffect(() => {
    trackEvent('ab_test_view', { variant });
  }, []);

  return variant === 'A' ? <VariantA /> : <VariantB />;
}
```

---

## 📈 Мониторинг результатов

### Инструменты для проверки

1. **Google Search Console** - индексация, ошибки, производительность
2. **Google PageSpeed Insights** - Core Web Vitals
3. **Lighthouse** - общая оценка SEO
4. **Schema.org Validator** - проверка JSON-LD
5. **Mobile-Friendly Test** - мобильная версия

### Команды для тестирования

```bash
# Проверка sitemap
curl https://deltran.ai/sitemap.xml

# Проверка robots.txt
curl https://deltran.ai/robots.txt

# Lighthouse аудит
npx lighthouse https://deltran.ai --view

# Bundle analyzer
npm run build && npm run analyze
```

---

## 🚨 Troubleshooting

### Метаданные не появляются

1. Проверьте, что используете `generateMetadata` в серверном компоненте
2. Убедитесь, что не переопределяете метаданные в родительских layout
3. Проверьте `NEXT_PUBLIC_SITE_URL` в `.env.local`

### JSON-LD не валидируется

1. Используйте [Google Rich Results Test](https://search.google.com/test/rich-results)
2. Проверьте формат данных в консоли браузера
3. Убедитесь, что все обязательные поля заполнены

### Core Web Vitals низкие

1. Оптимизируйте изображения (используйте OptimizedImage)
2. Уменьшите JavaScript бандл (code splitting)
3. Включите кэширование
4. Используйте CDN
5. Оптимизируйте CLS (зарезервируйте место для динамического контента)

---

## 📚 Полезные ресурсы

- [Google Search Central](https://developers.google.com/search)
- [Next.js SEO Guide](https://nextjs.org/learn/seo/introduction-to-seo)
- [Schema.org Documentation](https://schema.org/)
- [Web.dev Performance](https://web.dev/performance/)
- [Core Web Vitals](https://web.dev/vitals/)

---

## 🎓 Дополнительная информация

Для получения дополнительной помощи:

1. Проверьте логи в development mode
2. Используйте React DevTools для анализа компонентов
3. Проверьте Network tab для оптимизации загрузки
4. Используйте Performance tab для профилирования

---

**Версия:** 1.0.0
**Последнее обновление:** 2025-10-27
**Автор:** DelTran Team
