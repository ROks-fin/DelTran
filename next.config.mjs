import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./i18n/request.ts');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,

  // Оптимизация изображений для SEO и производительности
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'deltran.ai',
      },
    ],
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 31536000, // 1 год для immutable assets
  },

  // Essential performance optimizations - расширенный список библиотек
  experimental: {
    optimizePackageImports: [
      'framer-motion',
      'lucide-react',
      '@radix-ui/react-dialog',
      '@radix-ui/react-dropdown-menu',
      '@radix-ui/react-label',
      '@radix-ui/react-select',
      '@radix-ui/react-slot',
      'class-variance-authority',
      'clsx',
      'tailwind-merge',
      'next-intl',
      'next-themes',
      '@vercel/analytics',
      '@vercel/speed-insights',
      'react-dom',
    ],
    // Enable optimistic client cache for faster navigation
    staleTimes: {
      dynamic: 30,
      static: 180,
    },
  },

  // Modularize imports for better tree-shaking
  modularizeImports: {
    'lucide-react': {
      transform: 'lucide-react/dist/esm/icons/{{kebabCase member}}',
    },
  },

  // Optimize bundle size
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Сжатие для лучшей производительности
  compress: true,

  // SEO и Security headers с улучшенным кэшированием
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          // DNS Prefetch для улучшения скорости
          {
            key: 'X-DNS-Prefetch-Control',
            value: 'on',
          },
          // Security headers
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
          // Permissions Policy
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
        ],
      },
      // Кэширование для статических ресурсов
      {
        source: '/_next/static/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
      // Кэширование для изображений
      {
        source: '/images/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=86400, stale-while-revalidate=604800',
          },
        ],
      },
      // Кэширование для шрифтов
      {
        source: '/fonts/:path*',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, max-age=31536000, immutable',
          },
        ],
      },
    ];
  },

  // Редиректы для старых URL (пример)
  async redirects() {
    return [
      // Добавьте здесь 301 редиректы если нужно
    ];
  },

  // Rewrites для чистых URL
  async rewrites() {
    return [
      // Добавьте здесь rewrites если нужно
    ];
  },

  // ВАЖНО: НЕ переопределяем webpack splitChunks!
  // Next.js 14 имеет оптимизированную стратегию разбиения чанков.
  // Кастомный splitChunks создавал один огромный vendor.js (3.3MB).

  // Отключение x-powered-by header
  poweredByHeader: false,

  // Генерация ETags
  generateEtags: true,

  // Production Source Maps (отключено для безопасности и размера)
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
