"use client";

import React from 'react';
import { motion, MotionValue } from 'framer-motion';

interface RealmCharacterProps {
  charPath: string;
  isActive: boolean;
  align: 'left' | 'right';
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  themeId?: string;
}

export default function RealmCharacter({
  charPath,
  isActive,
  align,
  parallaxX,
  parallaxY,
  themeId
}: RealmCharacterProps) {
  const isBlockcraft = themeId === 'blockcraft';
  
  // Decreasing the right position of blockcraft moves it closer to the right viewport edge (further from the card)
  const horizontalPosition = align === 'left' 
    ? 'left-[48px] sm:left-[72px]' 
    : isBlockcraft 
      ? 'right-[24px] sm:right-[36px]' 
      : 'right-[48px] sm:right-[72px]';

  const isMedieval = charPath.toLowerCase().includes('medieval');

  return (
    <motion.div
      style={{ 
        x: parallaxX, 
        y: parallaxY,
        scale: isMedieval ? 1.2 : 1.0,
        transformOrigin: 'bottom center'
      }}
      className={`absolute bottom-0 z-20 w-[320px] h-[85%] sm:w-[600px] sm:h-[95%] bg-contain bg-no-repeat bg-bottom pointer-events-none select-none ${horizontalPosition}`}
    >
      {/* Dynamic Glowing Halo behind character */}
      <motion.div
        className="absolute inset-x-0 bottom-1/4 h-2/3 bg-keep-primary/5 blur-[50px] rounded-full"
        animate={{ opacity: isActive ? [0.3, 0.6, 0.3] : 0 }}
        transition={{ duration: 3, repeat: Infinity }}
      />

      {/* Hero Illustration */}
      <motion.div
        className="w-full h-full bg-contain bg-no-repeat bg-bottom"
        style={{ backgroundImage: `url(${charPath})` }}
        initial={{ opacity: 0, y: 80 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 80 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
}
export type RealmCharacterType = typeof RealmCharacter;
