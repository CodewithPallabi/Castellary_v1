"use client";

import { useEffect } from 'react';
import { useMotionValue, useSpring } from 'framer-motion';

export function useCursorParallax(strength: number = 20) {
  const xValue = useMotionValue(0);
  const yValue = useMotionValue(0);

  const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
  const x = useSpring(xValue, springConfig);
  const y = useSpring(yValue, springConfig);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const handleMouseMove = (event: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      // Normalize values between -0.5 and 0.5
      const normX = (event.clientX / innerWidth) - 0.5;
      const normY = (event.clientY / innerHeight) - 0.5;

      xValue.set(normX * strength);
      yValue.set(normY * strength);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [xValue, yValue, strength]);

  return { x, y };
}
