"use client";

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface Scene03Props {
  isActive: boolean;
  onComplete: () => void;
}

const Scene03BattleBegins = memo(function Scene03BattleBegins({ isActive, onComplete }: Scene03Props) {
  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black flex items-center justify-start p-16 sm:p-24 snap-start snap-always">
      {/* Background Volcanic Devil Boss (Full Bleed AAA Artwork poster, sharp, unblurred) */}
      <motion.div
        className="absolute inset-0 select-none pointer-events-none filter brightness-[0.55] z-0"
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.85 } : { opacity: 0 }}
        transition={{ duration: 1.2, ease: 'easeOut' }}
      >
        <Image
          src="/themes/medieval/boss/demon.jpg"
          alt="Volcanic Devil Boss Background"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
      </motion.div>
      
      {/* Gradient mask to focus left text readability */}
      <div className="absolute inset-y-0 left-0 w-[55%] bg-gradient-to-r from-black via-black/55 to-transparent pointer-events-none z-1" />

      {/* LEFT CONTENT PANEL (Movie Poster layout) */}
      <AnimatePresence>
        {isActive && (
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
            className="relative z-20 flex flex-col gap-6 max-w-xl text-left pl-6 sm:pl-12"
          >
            <span className="text-[12px] uppercase font-bold tracking-[0.45em] text-keep-primary font-keep-display bg-keep-primary/5 border border-keep-primary/20 px-3 py-1.5 rounded-sm self-start">
              Ultimate Challenge
            </span>
            <h2 className="text-5xl sm:text-6xl md:text-7xl font-black tracking-normal text-keep-primary uppercase font-keep-display leading-[1.08]">
              Are You Ready<br />
              To Defeat<br />
              The Devil?
            </h2>
            <div className="flex flex-col gap-3 max-w-md">
              <p className="font-bold text-keep-primary uppercase tracking-[0.2em] text-[11px] font-keep-display">
                Choose your kingdom. Begin your quest.
              </p>
              <p className="text-base sm:text-lg font-light leading-relaxed text-[#fcf8f2]/85 font-keep-serif">
                Only by completing your daily task you can strike down the demon, protect your party and reclaim your keep.
              </p>
            </div>
            
            <button 
              onClick={onComplete}
              className="w-[280px] py-4 rounded-full border border-keep-primary/50 hover:border-keep-primary text-keep-primary hover:text-white hover:bg-keep-primary/10 text-xs font-bold tracking-[0.3em] uppercase transition-all mt-4"
            >
              Choose Your Kingdom →
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
});

export default Scene03BattleBegins;
export type Scene03BattleBeginsType = typeof Scene03BattleBegins;
