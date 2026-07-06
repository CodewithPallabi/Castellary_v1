"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { MicroAnimations } from '@/lib/motion/micro';

interface HeroBossProps {
  bossMainPath: string;
  isActive: boolean;
}

export default function HeroBoss({ bossMainPath, isActive }: HeroBossProps) {
  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none">
      {/* Cinematic Devil King Boss */}
      <motion.div
        animate={isActive ? MicroAnimations.breath.animate : {}}
        transition={MicroAnimations.breath.transition}
        className="relative w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] flex items-center justify-center"
      >
        {/* Glow Layer */}
        <motion.div 
          className="absolute inset-0 bg-red-600/10 blur-[50px] rounded-full"
          animate={isActive ? MicroAnimations.pulseGlow.animate : {}}
          transition={MicroAnimations.pulseGlow.transition}
        />
        
        {/* Boss Core Artwork */}
        <motion.div
          className="w-full h-full bg-contain bg-no-repeat bg-center drop-shadow-[0_0_30px_rgba(239,68,68,0.2)]"
          style={{ backgroundImage: `url(${bossMainPath})` }}
          initial={{ opacity: 0, scale: 0.85 }}
          animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.85 }}
          transition={{ duration: 1.5, ease: 'easeOut' }}
        />
      </motion.div>
    </div>
  );
}
export type HeroBossType = typeof HeroBoss;
