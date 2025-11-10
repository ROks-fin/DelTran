/**
 * Magnetic Button Effect Hook
 * Premium interaction for buttons that follow the cursor
 */

import { useRef, useEffect, useState } from 'react';

interface MagneticOptions {
  strength?: number;
  smoothness?: number;
  maxDistance?: number;
  disabled?: boolean;
}

export function useMagneticEffect(options: MagneticOptions = {}) {
  const {
    strength = 0.3,
    smoothness = 0.15,
    maxDistance = 100,
    disabled = false,
  } = options;

  const ref = useRef<HTMLElement>(null);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const requestRef = useRef<number>();
  const targetPosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (disabled || !ref.current) return;

    const element = ref.current;

    const handleMouseMove = (e: MouseEvent) => {
      const rect = element.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const distanceX = e.clientX - centerX;
      const distanceY = e.clientY - centerY;
      const distance = Math.sqrt(distanceX ** 2 + distanceY ** 2);

      if (distance < maxDistance) {
        const magneticPower = (maxDistance - distance) / maxDistance;
        targetPosition.current = {
          x: distanceX * strength * magneticPower,
          y: distanceY * strength * magneticPower,
        };
      } else {
        targetPosition.current = { x: 0, y: 0 };
      }
    };

    const handleMouseLeave = () => {
      targetPosition.current = { x: 0, y: 0 };
    };

    const animate = () => {
      setPosition((prev) => ({
        x: prev.x + (targetPosition.current.x - prev.x) * smoothness,
        y: prev.y + (targetPosition.current.y - prev.y) * smoothness,
      }));
      requestRef.current = requestAnimationFrame(animate);
    };

    element.addEventListener('mousemove', handleMouseMove);
    element.addEventListener('mouseleave', handleMouseLeave);
    requestRef.current = requestAnimationFrame(animate);

    return () => {
      element.removeEventListener('mousemove', handleMouseMove);
      element.removeEventListener('mouseleave', handleMouseLeave);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [strength, smoothness, maxDistance, disabled]);

  return { ref, position };
}
