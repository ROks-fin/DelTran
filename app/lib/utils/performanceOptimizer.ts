/**
 * Performance Optimization Utilities
 * Ensures smooth 60fps animations and optimal rendering
 */

/**
 * Check if device prefers reduced motion
 */
export function prefersReducedMotion(): boolean {
  if (typeof window === 'undefined') return false;
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}

/**
 * Get device category based on viewport
 */
export function getDeviceCategory(): 'mobile' | 'tablet' | 'desktop' | 'large' {
  if (typeof window === 'undefined') return 'desktop';

  const width = window.innerWidth;

  if (width < 768) return 'mobile';
  if (width < 1024) return 'tablet';
  if (width < 1920) return 'desktop';
  return 'large';
}

/**
 * Check if device has high refresh rate
 */
export function hasHighRefreshRate(): boolean {
  if (typeof window === 'undefined') return false;
  return window.devicePixelRatio > 1.5;
}

/**
 * Debounce function for performance
 */
export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;

  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };

    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

/**
 * Throttle function for performance
 */
export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;

  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

/**
 * Request animation frame with fallback
 */
export const requestAnimationFrame =
  typeof window !== 'undefined'
    ? window.requestAnimationFrame ||
      ((callback: FrameRequestCallback) => setTimeout(callback, 1000 / 60) as any)
    : ((callback: FrameRequestCallback) => setTimeout(callback, 1000 / 60) as any);

/**
 * Cancel animation frame with fallback
 */
export const cancelAnimationFrame =
  typeof window !== 'undefined'
    ? window.cancelAnimationFrame || clearTimeout
    : clearTimeout;

/**
 * Check if browser supports backdrop filter
 */
export function supportsBackdropFilter(): boolean {
  if (typeof window === 'undefined') return false;
  return CSS.supports('backdrop-filter', 'blur(10px)');
}

/**
 * Check if browser supports 3D transforms
 */
export function supports3DTransforms(): boolean {
  if (typeof window === 'undefined') return false;

  const el = document.createElement('div');
  const has3d = 'WebKitPerspective' in el.style || 'perspective' in el.style;

  return has3d;
}

/**
 * Optimize animation based on device capabilities
 */
export function getOptimizedAnimationConfig() {
  const deviceCategory = getDeviceCategory();
  const reducedMotion = prefersReducedMotion();

  if (reducedMotion) {
    return {
      duration: 0.1,
      enableComplexAnimations: false,
      enableParallax: false,
      enable3D: false,
    };
  }

  switch (deviceCategory) {
    case 'mobile':
      return {
        duration: 0.3,
        enableComplexAnimations: false,
        enableParallax: false,
        enable3D: false,
      };
    case 'tablet':
      return {
        duration: 0.5,
        enableComplexAnimations: true,
        enableParallax: true,
        enable3D: false,
      };
    case 'desktop':
      return {
        duration: 0.6,
        enableComplexAnimations: true,
        enableParallax: true,
        enable3D: true,
      };
    case 'large':
      return {
        duration: 0.8,
        enableComplexAnimations: true,
        enableParallax: true,
        enable3D: true,
      };
  }
}

/**
 * Lazy load component with intersection observer
 */
export function lazyLoad(
  target: HTMLElement,
  callback: () => void,
  options?: IntersectionObserverInit
) {
  if (typeof window === 'undefined') return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        callback();
        observer.unobserve(entry.target);
      }
    });
  }, options);

  observer.observe(target);

  return () => observer.disconnect();
}

/**
 * Preload images for smooth transitions
 */
export function preloadImage(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve();
    img.onerror = reject;
    img.src = src;
  });
}

/**
 * Preload multiple images
 */
export async function preloadImages(sources: string[]): Promise<void> {
  await Promise.all(sources.map(preloadImage));
}

/**
 * Check if element is in viewport
 */
export function isInViewport(element: HTMLElement): boolean {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Get FPS counter
 */
export class FPSCounter {
  private frames = 0;
  private lastTime = performance.now();
  private fps = 60;

  measure(): number {
    this.frames++;
    const currentTime = performance.now();

    if (currentTime >= this.lastTime + 1000) {
      this.fps = Math.round((this.frames * 1000) / (currentTime - this.lastTime));
      this.frames = 0;
      this.lastTime = currentTime;
    }

    requestAnimationFrame(() => this.measure());
    return this.fps;
  }
}

/**
 * Detect touch device
 */
export function isTouchDevice(): boolean {
  if (typeof window === 'undefined') return false;
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

/**
 * Get optimal image size based on device
 */
export function getOptimalImageSize(): { width: number; height: number } {
  if (typeof window === 'undefined') {
    return { width: 1920, height: 1080 };
  }

  const width = window.innerWidth;
  const dpr = window.devicePixelRatio || 1;

  if (width < 768) {
    return { width: Math.round(768 * dpr), height: Math.round(432 * dpr) };
  } else if (width < 1024) {
    return { width: Math.round(1024 * dpr), height: Math.round(576 * dpr) };
  } else if (width < 1920) {
    return { width: Math.round(1920 * dpr), height: Math.round(1080 * dpr) };
  } else {
    return { width: Math.round(2560 * dpr), height: Math.round(1440 * dpr) };
  }
}

const performanceUtils = {
  prefersReducedMotion,
  getDeviceCategory,
  hasHighRefreshRate,
  debounce,
  throttle,
  requestAnimationFrame,
  cancelAnimationFrame,
  supportsBackdropFilter,
  supports3DTransforms,
  getOptimizedAnimationConfig,
  lazyLoad,
  preloadImage,
  preloadImages,
  isInViewport,
  FPSCounter,
  isTouchDevice,
  getOptimalImageSize,
};

export default performanceUtils;
