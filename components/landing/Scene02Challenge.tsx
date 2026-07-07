"use client";

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Scene02Props {
  isActive: boolean;
  onComplete: () => void;
}

const Scene02Challenge = memo(function Scene02Challenge({ isActive, onComplete }: Scene02Props) {
  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black flex flex-col items-center justify-center p-6 sm:p-12 snap-start snap-always">
      {/* Background Castle scenery (same clean castle image from Slide 01, blurred and darkened) */}
      <div className="absolute inset-0 select-none pointer-events-none filter blur-[3px] brightness-[0.22] opacity-65">
        <Image
          src="/themes/medieval/hero/background.png"
          alt="Blurred Castle Scenery"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Subtle vignette layer to improve text legibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/90 pointer-events-none z-1" />
      
      {/* Page decorative manuscript frame (always visible, covers screen with equal padding) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.85 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: 'easeOut' }}
            className="absolute inset-6 sm:inset-10 md:inset-14 select-none pointer-events-none z-10"
          >
            <Image
              src="/logo/shield.png"
              alt="Decorative Manuscript Frame"
              fill
              sizes="(max-width: 768px) 100vw, 1200px"
              className="object-contain"
              loading="lazy"
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Center Symmetrical Content (stays inside the border) */}
      <div className="relative z-20 flex flex-col items-center justify-center text-center max-w-3xl px-12 sm:px-24">
        <AnimatePresence>
          {isActive && (
            <div className="flex flex-col items-center gap-6">
              {/* Large Heading (Rises upward 15px while fading in) */}
              <motion.h2
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 15 }}
                transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
                className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-[0.15em] text-keep-primary uppercase font-keep-display drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]"
              >
                THE VISION OF CASTELLARY
              </motion.h2>

              {/* Small Gold Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0, scaleX: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
                className="flex items-center gap-4 w-40 justify-center mt-1"
              >
                <div className="h-[1px] bg-keep-primary/45 flex-grow" />
                <span className="text-keep-primary text-xs select-none">✦</span>
                <div className="h-[1px] bg-keep-primary/45 flex-grow" />
              </motion.div>

              {/* Single narrative paragraph (warm parchment white) */}
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 0.9 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.4, delay: 0.6, ease: 'easeOut' }}
                className="text-sm sm:text-base md:text-lg font-light leading-relaxed text-[#fcf8f2]/90 font-keep-serif max-w-2xl mt-3"
              >
                Castellary is an ancient keep forged for modern scholars. Born from the weariness of cold, lifeless project boards, it transforms the academic grind into an epic role-playing campaign. Daily assignments become heroic quests, project boards evolve into living kingdoms, and routine collaboration transforms into unforgettable adventures. By blending immersive fantasy with structured productivity, Castellary empowers students to conquer challenges together, reclaim their motivation, and build legendary teamwork—one completed quest at a time.
              </motion.p>

              {/* Action trigger button */}
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.8, delay: 0.9 }}
                onClick={onComplete}
                className="py-3.5 px-8 rounded-full border border-keep-primary/50 hover:border-keep-primary text-keep-primary hover:text-white hover:bg-keep-primary/10 text-[10px] font-bold tracking-[0.3em] uppercase transition-all mt-6 shadow-[0_0_15px_rgba(212,175,55,0.08)]"
              >
                Understand the threat →
              </motion.button>
            </div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

export default Scene02Challenge;
export type Scene02ChallengeType = typeof Scene02Challenge;
