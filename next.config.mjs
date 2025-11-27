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
    minimumCacheTTL: 60,
  },

  // Essential performance optimizations
  experimental: {
    optimizePackageImports: ['framer-motion', 'lucide-react', '@headlessui/react'],
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

  // SEO и Security headers
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
    ];
  },

  // Редиректы для старых URL (пример)
  async redirects() {
    return [
      // Добавьте здесь 301 редиректы если нужно
      // {
      //   source: '/old-page',
      //   destination: '/new-page',
      //   permanent: true,
      // },
    ];
  },

  // Rewrites для чистых URL
  async rewrites() {
    return [
      // Добавьте здесь rewrites если нужно
    ];
  },

  // Webpack оптимизации
  webpack: (config, { isServer }) => {
    // Оптимизация для production
    if (!isServer) {
      config.optimization = {
        ...config.optimization,
        splitChunks: {
          chunks: 'all',
          cacheGroups: {
            default: false,
            vendors: false,
            // Vendor chunk для библиотек
            vendor: {
              name: 'vendor',
              chunks: 'all',
              test: /node_modules/,
              priority: 20,
            },
            // Common chunk для общего кода
            common: {
              name: 'common',
              minChunks: 2,
              chunks: 'all',
              priority: 10,
              reuseExistingChunk: true,
              enforce: true,
            },
          },
        },
      };
    }
    return config;
  },

  // Отключение x-powered-by header
  poweredByHeader: false,

  // Генерация ETags
  generateEtags: true,

  // Production Source Maps (отключено для безопасности)
  productionBrowserSourceMaps: false,
};

export default withNextIntl(nextConfig);
