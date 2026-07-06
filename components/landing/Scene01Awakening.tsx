"use client";

import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useThemeConfig } from '@/hooks/useThemeConfig';

interface Scene01Props {
  isActive: boolean;
  onComplete: () => void;
}

export default function Scene01Awakening({ isActive, onComplete }: Scene01Props) {
  const { getAsset } = useThemeConfig();

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black flex items-center justify-start snap-start snap-always">
      {/* Background Castle Scenery - Fades in, full screen, uncropped */}
      <motion.div
        className="absolute inset-0 bg-cover bg-center select-none pointer-events-none filter brightness-[0.6] z-0"
        style={{ backgroundImage: `url(${getAsset('hero.background')})` }}
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.75 } : { opacity: 0 }}
        transition={{ duration: 1.5, ease: 'easeOut' }}
      />
      
      {/* Subtle dark gradient mask on the left third to guarantee typography contrast */}
      <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-black via-black/45 to-transparent pointer-events-none z-1" />

      {/* Main content display (appears after intro glides) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 1.0, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 flex flex-col gap-6 max-w-3xl px-24 sm:px-32 text-left"
          >
            {/* Title Group */}
            <div className="flex flex-col gap-3">
              <h1 className="text-5xl sm:text-6xl md:text-[80px] font-black tracking-normal text-keep-primary uppercase font-keep-display leading-[1.05]">
                From Chaos,<br />
                We Forge Legends
              </h1>
            </div>

            {/* Description */}
            <p className="text-base sm:text-lg font-light leading-relaxed text-[#fcf8f2]/85 max-w-xl font-keep-serif">
              Every task strengthens your kingdom. Recruit legendary heroes, conquer epic quests, and reclaim a realm threatened by darkness. Your productivity becomes your greatest adventure.
            </p>

            {/* Action Call-to-Action */}
            <button 
              onClick={onComplete}
              className="w-[260px] py-4 rounded-full border border-keep-primary/50 hover:border-keep-primary text-keep-primary hover:text-white hover:bg-keep-primary/10 text-[10px] font-bold tracking-[0.3em] uppercase transition-all mt-4 shadow-[0_0_15px_rgba(212,175,55,0.08)]"
            >
              Begin Your Journey →
            </button>
          </motion.div>
        )}
      </AnimatePresence>


    </section>
  );
}
