"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface HeroBackgroundProps {
  bgPath: string;
  isActive: boolean;
}

export default function HeroBackground({ bgPath, isActive }: HeroBackgroundProps) {
  return (
    <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none bg-black">
      {/* Cinematic Environmental Layer */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center opacity-45"
        style={{ backgroundImage: `url(${bgPath})` }}
        initial={{ scale: 1.1 }}
        animate={isActive ? { scale: 1 } : { scale: 1.1 }}
        transition={{ duration: 10, ease: 'easeOut' }}
      />

      {/* Volcanic Fog Overlay */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-red-950/10 mix-blend-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 2 }}
      />
      
      {/* Volcanic embers rising */}
      {isActive && (
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom,_var(--tw-gradient-stops))] from-yellow-700/10 via-transparent to-transparent opacity-60 mix-blend-color-dodge animate-pulse" />
      )}
    </div>
  );
}
export type HeroBackgroundType = typeof HeroBackground;
