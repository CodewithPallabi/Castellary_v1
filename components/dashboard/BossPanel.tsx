"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Kingdom } from '@/types';
import ProgressBar from '../ui/ProgressBar';
import GlassKeepPanel from '../ui/GlassKeepPanel';
import { MicroAnimations } from '@/lib/motion/micro';
import { Swords } from 'lucide-react';
import Image from 'next/image';

interface BossPanelProps {
  kingdom: Kingdom;
}

export default function BossPanel({ kingdom }: BossPanelProps) {
  const boss = kingdom.boss;
  const hpPercent = Math.round((boss.currentHp / boss.maxHp) * 100);
  const isDefeated = boss.currentHp === 0;

  const getBossPath = (id: string) => {
    if (id === 'medieval') {
      return `/themes/medieval/boss/main.png`;
    }
    return `/themes/${id}/boss/main.png`;
  };

  return (
    <GlassKeepPanel className="relative overflow-hidden p-6 border border-keep-border shadow-2xl flex flex-col md:flex-row items-center justify-between gap-6 bg-gradient-to-br from-black/60 to-keep-secondary/10">
      
      {/* Defeated Overlay filter */}
      {isDefeated && (
        <div className="absolute inset-0 bg-black/60 z-30 flex flex-col items-center justify-center gap-2">
          <Swords className="w-12 h-12 text-keep-success animate-bounce" />
          <h3 className="text-xl font-bold uppercase tracking-[0.2em] text-keep-success font-keep-display">
            Boss Vanquished
          </h3>
          <p className="text-xs text-keep-muted">This realm has been liberated. Discover another realm or reset state.</p>
        </div>
      )}

      {/* Left side: Boss stats info */}
      <div className="flex flex-col gap-4 w-full md:max-w-md">
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2">
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-keep-danger bg-keep-danger/10 px-2 py-0.5 rounded border border-keep-danger/25">
              Active Raid Boss
            </span>
            <span className="text-[9px] uppercase font-bold tracking-[0.2em] text-keep-muted">
              Phase {boss.phase || 1}
            </span>
          </div>
          <h3 className="text-2xl font-extrabold uppercase tracking-wide font-keep-display text-white mt-1">
            {boss.name}
          </h3>
        </div>

        <p className="text-xs sm:text-sm font-light leading-relaxed text-keep-muted">
          {boss.description}
        </p>

        {/* Boss HP Tracker */}
        <div className="flex flex-col gap-1.5 mt-2">
          <div className="flex justify-between items-center text-xs font-bold uppercase tracking-wider text-keep-foreground">
            <span>Raid health</span>
            <span className="text-keep-danger glow-accent">{hpPercent}% ({boss.currentHp}/{boss.maxHp} HP)</span>
          </div>
          <ProgressBar
            value={boss.currentHp}
            max={boss.maxHp}
            variant="danger"
            className="h-3 shadow-[0_0_15px_rgba(239,68,68,0.15)] animate-pulse"
          />
        </div>
      </div>

      {/* Right side: Floating Boss Avatar illustration */}
      <div className="relative w-40 h-40 flex items-center justify-center z-10">
        
        {/* Glow Ring backdrop */}
        <motion.div
          animate={!isDefeated ? MicroAnimations.pulseGlow.animate : {}}
          transition={MicroAnimations.pulseGlow.transition}
          className="absolute inset-0 bg-red-600/10 blur-[30px] rounded-full"
        />

        {/* Floating breathing boss model */}
        <motion.div
          animate={!isDefeated ? MicroAnimations.breath.animate : {}}
          transition={MicroAnimations.breath.transition}
          className="relative w-32 h-32 filter drop-shadow-[0_0_20px_rgba(239,68,68,0.3)]"
        >
          <Image
            src={getBossPath(kingdom.themeId)}
            alt={boss.name}
            fill
            sizes="128px"
            className="object-contain"
            loading="lazy"
          />
        </motion.div>
      </div>
    </GlassKeepPanel>
  );
}
