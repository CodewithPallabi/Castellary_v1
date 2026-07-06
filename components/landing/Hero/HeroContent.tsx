"use client";

import React from 'react';
import { motion } from 'framer-motion';
import KeepButton from '@/components/ui/KeepButton';
import GlassKeepPanel from '@/components/ui/GlassKeepPanel';
import { MotionConstants } from '@/lib/motion/constants';

interface HeroContentProps {
  isActive: boolean;
  onCtaClick: () => void;
}

export default function HeroContent({ isActive, onCtaClick }: HeroContentProps) {
  return (
    <div className="relative z-20 flex flex-col items-center sm:items-start text-center sm:text-left gap-6 max-w-xl px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ duration: 1, ease: MotionConstants.easings.emphasized }}
        className="flex flex-col gap-3"
      >
        <span className="text-xs uppercase tracking-[0.25em] text-keep-primary glow-text font-bold font-keep-display">
          Cinematic Project Arena
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold uppercase leading-tight font-keep-display" style={{ fontFamily: 'var(--font-keep-medieval-display)' }}>
          One Assignment.<br />
          <span className="text-keep-accent glow-accent">One Shared Boss Fight.</span>
        </h1>
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={isActive ? { opacity: 0.8 } : { opacity: 0 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="text-sm sm:text-base font-light text-keep-foreground leading-relaxed"
      >
        Command your party. Assign every quest. Complete work to deal damage to the Boss. missing deadlines will heal the monster. Defeat the impossible together.
      </motion.p>

      {/* Interactive CTAs inside Glass Keep Panel */}
      <GlassKeepPanel
        initial={{ opacity: 0, y: 15 }}
        animate={isActive ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ delay: 0.6, duration: 0.8, ease: MotionConstants.easings.standard }}
        className="flex flex-col sm:flex-row gap-4 p-4 w-full justify-center sm:justify-start"
      >
        <KeepButton variant="primary" onClick={onCtaClick}>
          Begin Your Campaign
        </KeepButton>
        <KeepButton variant="secondary" onClick={onCtaClick}>
          Join a Party
        </KeepButton>
      </GlassKeepPanel>
    </div>
  );
}
export type HeroContentType = typeof HeroContent;
