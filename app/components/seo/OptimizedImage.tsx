/**
 * Оптимизированный компонент изображений для максимальной производительности
 * Поддержка современных форматов, lazy loading, и адаптивных размеров
 */

'use client';

import Image from 'next/image';
import { useState } from 'react';

interface OptimizedImageProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  quality?: number;
  fill?: boolean;
  sizes?: string;
  onLoad?: () => void;
}

export function OptimizedImage({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  quality = 85,
  fill = false,
  sizes,
  onLoad,
}: OptimizedImageProps) {
  const [isLoaded, setIsLoaded] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  // Генерация srcset для адаптивных изображений
  const responsiveSizes = sizes || `
    (max-width: 640px) 100vw,
    (max-width: 1024px) 50vw,
    33vw
  `;

  return (
    <div className={`relative overflow-hidden ${className}`}>
      {/* Placeholder для лучшего CLS */}
      {!isLoaded && !fill && (
        <div
          className="absolute inset-0 bg-gradient-to-br from-white/5 to-white/10 animate-pulse"
          style={{
            width: width,
            height: height,
          }}
        />
      )}

      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        fill={fill}
        quality={quality}
        priority={priority}
        sizes={responsiveSizes}
        className={`transition-opacity duration-300 ${
          isLoaded ? 'opacity-100' : 'opacity-0'
        } ${className}`}
        onLoad={handleLoad}
        loading={priority ? undefined : 'lazy'}
        // Современные форматы изображений
        placeholder="blur"
        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg=="
        style={{
          objectFit: 'cover',
          objectPosition: 'center',
        }}
      />
    </div>
  );
}

/**
 * Компонент для изображений с соотношением сторон
 */
export function AspectImage({
  src,
  alt,
  aspectRatio = '16/9',
  className,
  priority = false,
}: {
  src: string;
  alt: string;
  aspectRatio?: string;
  className?: string;
  priority?: boolean;
}) {
  return (
    <div
      className={`relative w-full ${className}`}
      style={{ aspectRatio }}
    >
      <OptimizedImage
        src={src}
        alt={alt}
        fill
        priority={priority}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
      />
    </div>
  );
}

/**
 * Компонент для hero изображений
 */
export function HeroImage({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      fill
      priority
      quality={90}
      sizes="100vw"
      className={className}
    />
  );
}

/**
 * Компонент для thumbnail изображений
 */
export function ThumbnailImage({
  src,
  alt,
  size = 200,
  className,
}: {
  src: string;
  alt: string;
  size?: number;
  className?: string;
}) {
  return (
    <OptimizedImage
      src={src}
      alt={alt}
      width={size}
      height={size}
      quality={75}
      className={className}
    />
  );
}
