'use client';

import { useEffect, useRef, useState } from 'react';
import { useScroll, useTransform, MotionValue } from 'framer-motion';

export interface UseParallaxOptions {
  /**
   * Speed multiplier for parallax effect
   * Positive values move down, negative values move up
   * @default -50
   */
  speed?: number;

  /**
   * Start offset for parallax (0-1 of viewport)
   * @default 0
   */
  startOffset?: number;

  /**
   * End offset for parallax (0-1 of viewport)
   * @default 1
   */
  endOffset?: number;

  /**
   * Enable horizontal parallax
   * @default false
   */
  horizontal?: boolean;

  /**
   * Smooth factor (higher = smoother but more lag)
   * @default 0
   */
  smoothness?: number;
}

/**
 * Premium parallax scrolling hook
 * Creates smooth depth-based motion effects
 */
export function useParallax(options: UseParallaxOptions = {}) {
  const {
    speed = -50,
    startOffset = 0,
    endOffset = 1,
    horizontal = false,
    smoothness = 0,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [`start ${startOffset * 100}%`, `end ${endOffset * 100}%`],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  const x = useTransform(scrollYProgress, [0, 1], horizontal ? [0, speed] : [0, 0]);

  // Optional smoothing
  const [smoothY, setSmoothY] = useState(0);
  const [smoothX, setSmoothX] = useState(0);

  useEffect(() => {
    if (smoothness === 0) return;

    const unsubscribeY = y.on('change', (latest) => {
      setSmoothY((prev) => prev + (latest - prev) * (1 - smoothness));
    });

    const unsubscribeX = x.on('change', (latest) => {
      setSmoothX((prev) => prev + (latest - prev) * (1 - smoothness));
    });

    return () => {
      unsubscribeY();
      unsubscribeX();
    };
  }, [y, x, smoothness]);

  return {
    ref,
    y: smoothness > 0 ? smoothY : y,
    x: smoothness > 0 ? smoothX : x,
    scrollYProgress,
  };
}

/**
 * Multi-layer parallax for complex scenes
 */
export function useLayeredParallax(layers: number = 3) {
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  // Create parallax values for each layer
  const layer1 = useTransform(scrollYProgress, [0, 1], [0, -30]);
  const layer2 = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const layer3 = useTransform(scrollYProgress, [0, 1], [0, -90]);

  const layerValues = [layer1, layer2, layer3].slice(0, layers);

  return {
    ref,
    layers: layerValues,
    scrollYProgress,
  };
}

/**
 * Parallax with rotation for 3D effects
 */
export function useParallax3D(options: { depth?: number } = {}) {
  const { depth = 50 } = options;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, -depth]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [15, 0, -15]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return {
    ref,
    y,
    rotateX,
    opacity,
    scrollYProgress,
  };
}

/**
 * Scale parallax for zoom effects
 */
export function useParallaxScale(options: { scaleRange?: [number, number] } = {}) {
  const { scaleRange = [0.8, 1.2] } = options;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [scaleRange[0], 1, scaleRange[1]]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return {
    ref,
    scale,
    opacity,
    scrollYProgress,
  };
}

/**
 * Image parallax with Ken Burns effect
 */
export function useImageParallax(options: { intensity?: number } = {}) {
  const { intensity = 1.2 } = options;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [intensity, 1, intensity]);

  return {
    ref,
    y,
    scale,
    scrollYProgress,
  };
}

/**
 * Horizontal parallax for side-scrolling effects
 */
export function useHorizontalParallax(options: { speed?: number } = {}) {
  const { speed = -100 } = options;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const x = useTransform(scrollYProgress, [0, 1], [0, speed]);

  return {
    ref,
    x,
    scrollYProgress,
  };
}

/**
 * Text parallax with blur effect
 */
export function useTextParallax(options: { speed?: number } = {}) {
  const { speed = -30 } = options;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, speed]);
  const opacity = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [0, 1, 1, 0]);
  const blur = useTransform(scrollYProgress, [0, 0.1, 0.9, 1], [10, 0, 0, 10]);

  return {
    ref,
    y,
    opacity,
    filter: useTransform(blur, (value) => `blur(${value}px)`),
    scrollYProgress,
  };
}

/**
 * Sticky parallax for fixed sections with scroll effects
 */
export function useStickyParallax(options: { height?: number } = {}) {
  const { height = 300 } = options;
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.8]);

  return {
    ref,
    opacity,
    scale,
    scrollYProgress,
  };
}
