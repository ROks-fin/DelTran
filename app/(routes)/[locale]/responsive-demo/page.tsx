/**
 * Responsive Demo Page
 * Demonstrates ultra-premium responsive features
 */

'use client';

import { useResponsive, useBreakpoint, useAdaptiveColumns } from '@/app/components/responsive';
import { SmartImage } from '@/app/components/responsive/SmartImage';
import { SmartTypography } from '@/app/components/responsive/SmartTypography';
import { Card } from '@/app/components/Card';

export default function ResponsiveDemoPage() {
  const {
    device,
    viewport,
    isMobile,
    isTablet,
    isDesktop,
    isTouch,
    supportsHDR,
    supports3D,
    prefersReducedMotion,
    isSlowConnection,
    optimalImageFormat,
    optimalSettings
  } = useResponsive();

  const isLargeScreen = useBreakpoint(1920);
  const columns = useAdaptiveColumns({
    mobile: 1,
    tablet: 2,
    laptop: 3,
    desktop: 4
  });

  if (!device) {
    return (
      <div className="container mx-auto px-6 py-20">
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="w-16 h-16 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-20 space-y-16">
      {/* Hero Section */}
      <section className="space-y-8">
        <SmartTypography
          variant="display1"
          clamp
          balanceText
          gradient
          animate="fade"
          className="text-center"
        >
          Ultra-Premium Responsive Demo
        </SmartTypography>

        <SmartTypography
          variant="bodyLarge"
          className="text-center text-platinum/80 max-w-3xl mx-auto"
          balanceText
        >
          Демонстрация адаптивной системы с поддержкой всех типов устройств
        </SmartTypography>
      </section>

      {/* Device Info Section */}
      <section className="space-y-6">
        <SmartTypography variant="h2" gradient>
          Информация об устройстве
        </SmartTypography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-gold">Тип устройства</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-platinum/60">Тип:</span> <span className="text-white font-mono">{device.type}</span></p>
              <p><span className="text-platinum/60">ОС:</span> <span className="text-white font-mono">{device.os} {device.osVersion}</span></p>
              <p><span className="text-platinum/60">Браузер:</span> <span className="text-white font-mono">{device.browser} {device.browserVersion}</span></p>
            </div>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-gold">Экран</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-platinum/60">Размер:</span> <span className="text-white font-mono">{viewport.width} × {viewport.height}</span></p>
              <p><span className="text-platinum/60">Pixel Ratio:</span> <span className="text-white font-mono">{device.screen.pixelRatio}x</span></p>
              <p><span className="text-platinum/60">Ориентация:</span> <span className="text-white font-mono">{device.screen.orientation}</span></p>
              <p><span className="text-platinum/60">HDR:</span> <span className="text-white font-mono">{supportsHDR ? '✅ Да' : '❌ Нет'}</span></p>
            </div>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-gold">Производительность</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-platinum/60">Benchmark:</span> <span className="text-white font-mono">{device.performance.benchmark}/100</span></p>
              <p><span className="text-platinum/60">Cores:</span> <span className="text-white font-mono">{device.performance.cores}</span></p>
              <p><span className="text-platinum/60">Memory:</span> <span className="text-white font-mono">{device.performance.memory} GB</span></p>
              <p><span className="text-platinum/60">3D Support:</span> <span className="text-white font-mono">{supports3D ? '✅ Да' : '❌ Нет'}</span></p>
            </div>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-gold">Ввод</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-platinum/60">Touch:</span> <span className="text-white font-mono">{isTouch ? '✅ Да' : '❌ Нет'}</span></p>
              <p><span className="text-platinum/60">Mouse:</span> <span className="text-white font-mono">{device.input.mouse ? '✅ Да' : '❌ Нет'}</span></p>
              <p><span className="text-platinum/60">Keyboard:</span> <span className="text-white font-mono">{device.input.keyboard ? '✅ Да' : '❌ Нет'}</span></p>
              <p><span className="text-platinum/60">Touch Points:</span> <span className="text-white font-mono">{device.input.touchPoints}</span></p>
            </div>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-gold">Соединение</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-platinum/60">Тип:</span> <span className="text-white font-mono">{device.connection.effectiveType}</span></p>
              <p><span className="text-platinum/60">Downlink:</span> <span className="text-white font-mono">{device.connection.downlink} Mbps</span></p>
              <p><span className="text-platinum/60">RTT:</span> <span className="text-white font-mono">{device.connection.rtt} ms</span></p>
              <p><span className="text-platinum/60">Save Data:</span> <span className="text-white font-mono">{device.connection.saveData ? '✅ Да' : '❌ Нет'}</span></p>
            </div>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-gold">Предпочтения</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-platinum/60">Цветовая схема:</span> <span className="text-white font-mono">{device.preferences.colorScheme}</span></p>
              <p><span className="text-platinum/60">Reduced Motion:</span> <span className="text-white font-mono">{prefersReducedMotion ? '✅ Да' : '❌ Нет'}</span></p>
              <p><span className="text-platinum/60">High Contrast:</span> <span className="text-white font-mono">{device.preferences.highContrast ? '✅ Да' : '❌ Нет'}</span></p>
            </div>
          </Card>
        </div>
      </section>

      {/* Optimal Settings */}
      <section className="space-y-6">
        <SmartTypography variant="h2" gradient>
          Оптимальные настройки
        </SmartTypography>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-gold">Изображения</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-platinum/60">Формат:</span> <span className="text-white font-mono">{optimalImageFormat}</span></p>
              <p><span className="text-platinum/60">Качество:</span> <span className="text-white font-mono">{optimalSettings?.images.quality}%</span></p>
              <p><span className="text-platinum/60">Lazy Loading:</span> <span className="text-white font-mono">{optimalSettings?.images.lazyLoading ? '✅ Да' : '❌ Нет'}</span></p>
            </div>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-gold">Анимации</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-platinum/60">Включены:</span> <span className="text-white font-mono">{optimalSettings?.animations.enabled ? '✅ Да' : '❌ Нет'}</span></p>
              <p><span className="text-platinum/60">Качество:</span> <span className="text-white font-mono">{optimalSettings?.animations.quality}</span></p>
              <p><span className="text-platinum/60">FPS:</span> <span className="text-white font-mono">{optimalSettings?.animations.fps}</span></p>
            </div>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-gold">Видео</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-platinum/60">Codec:</span> <span className="text-white font-mono">{optimalSettings?.video.codec}</span></p>
              <p><span className="text-platinum/60">Качество:</span> <span className="text-white font-mono">{optimalSettings?.video.quality}</span></p>
              <p><span className="text-platinum/60">Autoplay:</span> <span className="text-white font-mono">{optimalSettings?.video.autoplay ? '✅ Да' : '❌ Нет'}</span></p>
            </div>
          </Card>

          <Card className="space-y-3">
            <h3 className="text-xl font-semibold text-gold">Layout</h3>
            <div className="space-y-2 text-sm">
              <p><span className="text-platinum/60">Колонки:</span> <span className="text-white font-mono">{columns}</span></p>
              <p><span className="text-platinum/60">Spacing:</span> <span className="text-white font-mono">{optimalSettings?.layout.spacing}</span></p>
              <p><span className="text-platinum/60">Density:</span> <span className="text-white font-mono">{optimalSettings?.layout.density}</span></p>
            </div>
          </Card>
        </div>
      </section>

      {/* Device Type Checks */}
      <section className="space-y-6">
        <SmartTypography variant="h2" gradient>
          Проверки типа устройства
        </SmartTypography>

        <div className="flex flex-wrap gap-4">
          {[
            { label: 'Mobile', active: isMobile },
            { label: 'Tablet', active: isTablet },
            { label: 'Desktop', active: isDesktop },
            { label: 'Large Screen (1920+)', active: isLargeScreen },
            { label: 'Touch', active: isTouch },
            { label: 'HDR', active: supportsHDR },
            { label: '3D', active: supports3D },
            { label: 'Slow Connection', active: isSlowConnection }
          ].map(check => (
            <div
              key={check.label}
              className={`
                px-6 py-3 rounded-lg border-2 transition-all
                ${check.active
                  ? 'bg-gold/20 border-gold text-gold'
                  : 'bg-gray-800/50 border-gray-700 text-gray-400'
                }
              `}
            >
              {check.active ? '✅' : '❌'} {check.label}
            </div>
          ))}
        </div>
      </section>

      {/* Adaptive Grid Demo */}
      <section className="space-y-6">
        <SmartTypography variant="h2" gradient>
          Адаптивная сетка
        </SmartTypography>

        <SmartTypography variant="body" className="text-platinum/80">
          Сетка автоматически адаптируется: {columns} колонки на текущем устройстве
        </SmartTypography>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `repeat(${columns}, 1fr)`,
            gap: 'clamp(1rem, 3vw, 2rem)'
          }}
        >
          {Array.from({ length: 8 }, (_, i) => (
            <Card key={i} className="h-40 flex items-center justify-center">
              <span className="text-4xl font-bold text-gold">{i + 1}</span>
            </Card>
          ))}
        </div>
      </section>

      {/* Fluid Typography Demo */}
      <section className="space-y-6">
        <SmartTypography variant="h2" gradient>
          Fluid Typography
        </SmartTypography>

        <div className="space-y-4">
          {(['display1', 'h1', 'h2', 'h3', 'body', 'caption'] as const).map(variant => (
            <SmartTypography
              key={variant}
              variant={variant}
              clamp
              className="text-platinum"
            >
              {variant.toUpperCase()}: Fluid responsive text
            </SmartTypography>
          ))}
        </div>
      </section>

      {/* CSS Utilities Demo */}
      <section className="space-y-6">
        <SmartTypography variant="h2" gradient>
          CSS Utilities
        </SmartTypography>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card>
            <h3 className="text-gold font-semibold mb-2">Fluid Text</h3>
            <p className="fluid-text-2xl text-platinum">
              Fluid typography using CSS clamp
            </p>
          </Card>

          <Card>
            <h3 className="text-gold font-semibold mb-2">Text Balance</h3>
            <p className="text-balance text-platinum">
              Text balancing for better readability on multiple lines
            </p>
          </Card>

          <Card>
            <h3 className="text-gold font-semibold mb-2">Text Glow</h3>
            <p className="text-glow text-platinum">
              Premium text with glow effect
            </p>
          </Card>

          <Card>
            <h3 className="text-gold font-semibold mb-2">Line Clamp</h3>
            <p className="line-clamp-2 text-platinum">
              This is a very long text that will be clamped to exactly two lines no matter how long it is and will show ellipsis at the end when it overflows
            </p>
          </Card>

          <Card>
            <h3 className="text-gold font-semibold mb-2">GPU Accelerated</h3>
            <div className="gpu-accelerated hover-lift text-platinum">
              Smooth hardware-accelerated animation
            </div>
          </Card>

          <Card>
            <h3 className="text-gold font-semibold mb-2">Responsive Grid</h3>
            <div className="grid-responsive">
              {[1, 2, 3].map(i => (
                <div key={i} className="h-20 bg-gold/20 rounded" />
              ))}
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
