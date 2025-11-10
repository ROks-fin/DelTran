/**
 * Smart Image Component
 * Advanced responsive image with art direction, format selection, and performance optimization
 */

'use client';

import React, { useState, useRef, useEffect } from 'react';
import Image, { ImageProps } from 'next/image';
import { useResponsive } from '@/app/lib/contexts/ResponsiveContext';
import { cn } from '@/lib/utils';

export interface ArtDirection {
  mobile?: string;
  tablet?: string;
  desktop?: string;
  tv?: string;
  vr?: string;
  watch?: string;
}

export interface DensityVariants {
  '1x': string;
  '2x'?: string;
  '3x'?: string;
  '4x'?: string;
}

export interface FormatVariants {
  avif?: string;
  webp?: string;
  jpeg?: string;
  png?: string;
}

export interface SmartImageProps extends Omit<ImageProps, 'src' | 'loading'> {
  src: string;
  alt: string;

  // Art direction for different devices
  artDirection?: ArtDirection;

  // Density variants
  densities?: DensityVariants;

  // Format variants
  formats?: FormatVariants;

  // Loading strategy
  loading?: 'lazy' | 'eager';
  decoding?: 'sync' | 'async' | 'auto';
  fetchPriority?: 'high' | 'low' | 'auto';

  // Blur placeholder
  blurDataURL?: string;
  placeholder?: 'blur' | 'empty';

  // Callbacks
  onLoad?: () => void;
  onError?: () => void;
  onLoadingComplete?: () => void;

  // Container class
  containerClassName?: string;

  // Performance hints
  preload?: boolean;
  eager?: boolean;
}

export function SmartImage({
  src,
  alt,
  artDirection,
  densities,
  formats,
  loading = 'lazy',
  decoding = 'async',
  fetchPriority = 'auto',
  blurDataURL,
  placeholder = 'blur',
  onLoad,
  onError,
  onLoadingComplete,
  containerClassName,
  preload,
  eager,
  className,
  ...props
}: SmartImageProps) {
  const {
    device,
    viewport,
    isSlowConnection,
    optimalImageFormat,
    isMobile,
    isTablet,
    isDesktop,
    isTV,
    isWatch,
    isVR
  } = useResponsive();

  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  /**
   * Select appropriate source based on art direction
   */
  const getArtDirectionSource = (): string => {
    if (!artDirection) return src;

    if (isWatch && artDirection.watch) return artDirection.watch;
    if (isMobile && artDirection.mobile) return artDirection.mobile;
    if (isTablet && artDirection.tablet) return artDirection.tablet;
    if (isTV && artDirection.tv) return artDirection.tv;
    if (isVR && artDirection.vr) return artDirection.vr;
    if (isDesktop && artDirection.desktop) return artDirection.desktop;

    return src;
  };

  /**
   * Get optimal format based on browser support and settings
   */
  const getOptimalFormat = (): string => {
    if (!formats) return getArtDirectionSource();

    const source = getArtDirectionSource();

    // Use optimal format detected by device detector
    if (optimalImageFormat === 'avif' && formats.avif) {
      return formats.avif;
    }
    if (optimalImageFormat === 'webp' && formats.webp) {
      return formats.webp;
    }
    if (formats.jpeg) {
      return formats.jpeg;
    }
    if (formats.png) {
      return formats.png;
    }

    return source;
  };

  /**
   * Generate srcSet for different pixel densities
   */
  const generateSrcSet = (): string | undefined => {
    if (!densities || !device) return undefined;

    const pixelRatio = device.screen.pixelRatio;
    const parts: string[] = [];

    // Add 1x
    if (densities['1x']) {
      parts.push(`${densities['1x']} 1x`);
    }

    // Add 2x if device supports it
    if (pixelRatio >= 2 && densities['2x']) {
      parts.push(`${densities['2x']} 2x`);
    }

    // Add 3x if device supports it
    if (pixelRatio >= 3 && densities['3x']) {
      parts.push(`${densities['3x']} 3x`);
    }

    // Add 4x for extreme high-density displays
    if (pixelRatio >= 4 && densities['4x']) {
      parts.push(`${densities['4x']} 4x`);
    }

    return parts.length > 0 ? parts.join(', ') : undefined;
  };

  /**
   * Calculate optimal sizes attribute
   */
  const calculateSizes = (): string => {
    if (props.sizes) return props.sizes;

    // Default responsive sizes based on viewport
    if (isMobile) return '100vw';
    if (isTablet) return '(max-width: 1024px) 100vw, 50vw';
    return '(max-width: 1920px) 50vw, 33vw';
  };

  /**
   * Determine loading strategy
   */
  const getLoadingStrategy = (): 'lazy' | 'eager' => {
    if (eager || preload) return 'eager';
    return loading || 'lazy';
  };

  /**
   * Determine fetch priority
   */
  const getFetchPriority = (): 'high' | 'low' | 'auto' => {
    if (fetchPriority !== 'auto') return fetchPriority;
    if (preload || props.priority) return 'high';
    if (isSlowConnection) return 'low';
    return 'auto';
  };

  /**
   * Handle image load
   */
  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  /**
   * Handle image error
   */
  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  /**
   * Handle loading complete (Next.js specific)
   */
  const handleLoadingComplete = () => {
    onLoadingComplete?.();
  };

  /**
   * Generate blur placeholder
   */
  const getBlurPlaceholder = (): string | undefined => {
    if (placeholder === 'empty') return undefined;
    if (blurDataURL) return blurDataURL;

    // Generate a simple gradient placeholder
    const color1 = '#e5e5e7';
    const color2 = '#d4d4d6';
    return `data:image/svg+xml;base64,${btoa(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 300"><defs><linearGradient id="g" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:${color1}"/><stop offset="100%" style="stop-color:${color2}"/></linearGradient></defs><rect width="400" height="300" fill="url(#g)"/></svg>`
    )}`;
  };

  const finalSrc = getOptimalFormat();
  const srcSet = generateSrcSet();
  const sizes = calculateSizes();
  const loadingStrategy = getLoadingStrategy();
  const priority = getFetchPriority();

  // Preload critical images
  useEffect(() => {
    if (preload && typeof window !== 'undefined') {
      const link = document.createElement('link');
      link.rel = 'preload';
      link.as = 'image';
      link.href = finalSrc;
      if (srcSet) link.setAttribute('imagesrcset', srcSet);
      if (sizes) link.setAttribute('imagesizes', sizes);
      document.head.appendChild(link);

      return () => {
        document.head.removeChild(link);
      };
    }
  }, [preload, finalSrc, srcSet, sizes]);

  return (
    <div
      ref={containerRef}
      className={cn(
        'smart-image-container',
        'relative overflow-hidden',
        containerClassName
      )}
    >
      <Image
        src={finalSrc}
        alt={alt}
        loading={loadingStrategy}
        decoding={decoding}
        sizes={sizes}
        placeholder={placeholder === 'blur' && getBlurPlaceholder() ? 'blur' : 'empty'}
        blurDataURL={getBlurPlaceholder()}
        onLoad={handleLoad}
        onError={handleError}
        onLoadingComplete={handleLoadingComplete}
        className={cn(
          'smart-image',
          'transition-opacity duration-500',
          isLoaded ? 'opacity-100' : 'opacity-0',
          hasError && 'opacity-50',
          className
        )}
        quality={isSlowConnection ? 75 : 85}
        {...props}
      />

      {/* Loading indicator */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="text-center text-gray-500">
            <svg
              className="w-12 h-12 mx-auto mb-2"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
              />
            </svg>
            <p className="text-sm">Image failed to load</p>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Helper component for picture element with multiple sources
 */
export interface SmartPictureProps extends Omit<SmartImageProps, 'formats'> {
  sources: Array<{
    srcSet: string;
    type?: string;
    media?: string;
    sizes?: string;
  }>;
}

export function SmartPicture({
  sources,
  src,
  alt,
  className,
  containerClassName,
  onLoad,
  onError,
  ...props
}: SmartPictureProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  const handleLoad = () => {
    setIsLoaded(true);
    onLoad?.();
  };

  const handleError = () => {
    setHasError(true);
    onError?.();
  };

  return (
    <div className={cn('smart-picture-container', 'relative', containerClassName)}>
      <picture>
        {sources.map((source, index) => (
          <source
            key={index}
            srcSet={source.srcSet}
            type={source.type}
            media={source.media}
            sizes={source.sizes}
          />
        ))}
        <img
          src={src}
          alt={alt}
          onLoad={handleLoad}
          onError={handleError}
          className={cn(
            'smart-picture-img',
            'transition-opacity duration-500',
            isLoaded ? 'opacity-100' : 'opacity-0',
            hasError && 'opacity-50',
            className
          )}
          {...props}
        />
      </picture>

      {!isLoaded && !hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <div className="w-8 h-8 border-4 border-gold border-t-transparent rounded-full animate-spin" />
        </div>
      )}

      {hasError && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 dark:bg-gray-800">
          <p className="text-sm text-gray-500">Image failed to load</p>
        </div>
      )}
    </div>
  );
}
