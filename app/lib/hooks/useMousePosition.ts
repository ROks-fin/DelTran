'use client';

import { useEffect, useRef, useState } from 'react';

export interface MousePosition {
  x: number;
  y: number;
}

export interface UseMousePositionOptions {
  /**
   * Update frequency in milliseconds
   * @default 16 (~60fps)
   */
  throttle?: number;

  /**
   * Only track within specific element
   */
  includeTouch?: boolean;

  /**
   * Reset position when mouse leaves
   */
  resetOnLeave?: boolean;
}

/**
 * Track mouse position globally
 */
export function useMousePosition(options: UseMousePositionOptions = {}) {
  const { throttle = 16, includeTouch = true, resetOnLeave = false } = options;

  const [mousePosition, setMousePosition] = useState<MousePosition>({ x: 0, y: 0 });
  const lastUpdate = useRef(0);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent | TouchEvent) => {
      const now = Date.now();
      if (now - lastUpdate.current < throttle) return;

      lastUpdate.current = now;

      if ('touches' in e && e.touches[0]) {
        setMousePosition({
          x: e.touches[0].clientX,
          y: e.touches[0].clientY,
        });
      } else if ('clientX' in e) {
        setMousePosition({
          x: e.clientX,
          y: e.clientY,
        });
      }
    };

    const handleMouseLeave = () => {
      if (resetOnLeave) {
        setMousePosition({ x: 0, y: 0 });
      }
    };

    window.addEventListener('mousemove', updateMousePosition);
    if (includeTouch) {
      window.addEventListener('touchmove', updateMousePosition);
    }
    if (resetOnLeave) {
      document.addEventListener('mouseleave', handleMouseLeave);
    }

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (includeTouch) {
        window.removeEventListener('touchmove', updateMousePosition);
      }
      if (resetOnLeave) {
        document.removeEventListener('mouseleave', handleMouseLeave);
      }
    };
  }, [throttle, includeTouch, resetOnLeave]);

  return mousePosition;
}

/**
 * Track mouse position relative to an element
 * Returns normalized coordinates (-1 to 1)
 */
export function useMousePositionRelative() {
  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
      const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);

      setPosition({ x, y });
    };

    const handleMouseLeave = () => {
      setPosition({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  return { ref, position };
}

/**
 * Track mouse position with smooth interpolation
 * Creates lag effect for magnetic/follow animations
 */
export function useMousePositionSmooth(smoothness: number = 0.1) {
  const [targetPosition, setTargetPosition] = useState({ x: 0, y: 0 });
  const [smoothPosition, setSmoothPosition] = useState({ x: 0, y: 0 });
  const animationFrame = useRef<number>();

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setTargetPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);
    return () => window.removeEventListener('mousemove', updateMousePosition);
  }, []);

  useEffect(() => {
    const animate = () => {
      setSmoothPosition((prev) => ({
        x: prev.x + (targetPosition.x - prev.x) * smoothness,
        y: prev.y + (targetPosition.y - prev.y) * smoothness,
      }));

      animationFrame.current = requestAnimationFrame(animate);
    };

    animationFrame.current = requestAnimationFrame(animate);
    return () => {
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [targetPosition, smoothness]);

  return smoothPosition;
}

/**
 * Magnetic button effect hook
 * Elements are attracted to cursor when nearby
 */
export function useMagneticEffect(options: { strength?: number; radius?: number } = {}) {
  const { strength = 0.3, radius = 100 } = options;
  const ref = useRef<HTMLElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      if (distance < radius) {
        const factor = (1 - distance / radius) * strength;
        setOffset({
          x: deltaX * factor,
          y: deltaY * factor,
        });
      } else {
        setOffset({ x: 0, y: 0 });
      }
    };

    const handleMouseLeave = () => {
      setOffset({ x: 0, y: 0 });
    };

    document.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [strength, radius]);

  return { ref, offset };
}

/**
 * Hover tilt effect based on mouse position
 * Creates 3D card effect
 */
export function useHoverTilt(options: { intensity?: number } = {}) {
  const { intensity = 10 } = options;
  const ref = useRef<HTMLElement>(null);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const x = (e.clientY - rect.top - rect.height / 2) / rect.height;
      const y = -(e.clientX - rect.left - rect.width / 2) / rect.width;

      setTilt({
        x: x * intensity,
        y: y * intensity,
      });
    };

    const handleMouseLeave = () => {
      setTilt({ x: 0, y: 0 });
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [intensity]);

  return { ref, tilt };
}

/**
 * Track cursor distance from element
 * Useful for proximity-based effects
 */
export function useMouseDistance() {
  const ref = useRef<HTMLElement>(null);
  const [distance, setDistance] = useState(Infinity);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const deltaX = e.clientX - centerX;
      const deltaY = e.clientY - centerY;
      const dist = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

      setDistance(dist);
    };

    document.addEventListener('mousemove', handleMouseMove);
    return () => document.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return { ref, distance };
}

/**
 * Custom cursor follower
 * For creating custom cursor effects
 */
export function useCursorFollower(options: { delay?: number } = {}) {
  const { delay = 0.1 } = options;
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const targetPosition = useRef({ x: 0, y: 0 });
  const animationFrame = useRef<number>();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      targetPosition.current = { x: e.clientX, y: e.clientY };
    };

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (targetPosition.current.x - prev.x) * delay,
        y: prev.y + (targetPosition.current.y - prev.y) * delay,
      }));

      animationFrame.current = requestAnimationFrame(animate);
    };

    window.addEventListener('mousemove', handleMouseMove);
    animationFrame.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      if (animationFrame.current) {
        cancelAnimationFrame(animationFrame.current);
      }
    };
  }, [delay]);

  return position;
}
