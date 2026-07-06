"use client";

import React, { useEffect, useState } from 'react';
import ProgressBar from '@/components/ui/ProgressBar';
import GlassKeepPanel from '@/components/ui/GlassKeepPanel';
import { Crown, Wand2, Sword, Target, Skull } from 'lucide-react';

interface HeroIndicatorsProps {
  isActive: boolean;
}

export default function HeroIndicators({ isActive }: HeroIndicatorsProps) {
  const [bossHp, setBossHp] = useState<number>(100);

  useEffect(() => {
    if (!isActive) return;

    // Simulate gameplay: Boss HP briefly decreases to demonstrate progress and regenerates
    const hpTimer = setTimeout(() => {
      setBossHp(75);
    }, 3000);

    const regenTimer = setTimeout(() => {
      setBossHp(100);
    }, 6000);

    return () => {
      clearTimeout(hpTimer);
      clearTimeout(regenTimer);
    };
  }, [isActive]);

  const roles = [
    { name: 'King', icon: Crown, color: 'text-yellow-400' },
    { name: 'Mage', icon: Wand2, color: 'text-purple-400' },
    { name: 'Knight', icon: Sword, color: 'text-blue-400' },
    { name: 'Archer', icon: Target, color: 'text-green-400' },
    { name: 'Assassin', icon: Skull, color: 'text-red-400' }
  ];

  return (
    <GlassKeepPanel
      initial={{ opacity: 0, x: 50 }}
      animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
      transition={{ duration: 1.2, delay: 0.4, ease: 'easeOut' }}
      className="relative z-20 flex flex-col gap-6 w-full max-w-sm p-5 border border-white/5 shadow-2xl"
    >
      <div className="border-b border-white/10 pb-3">
        <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-keep-primary font-keep-display">
          Active Raid HUD
        </h4>
      </div>

      {/* Boss Health Bar */}
      <ProgressBar
        value={bossHp}
        max={100}
        label="Boss Health"
        variant="danger"
        className="glow-accent"
      />

      {/* Team XP Progress */}
      <ProgressBar
        value={6800}
        max={10000}
        label="Party Campaign XP"
        variant="success"
      />

      {/* Role Selection HUD */}
      <div className="flex flex-col gap-3">
        <span className="text-[10px] uppercase font-bold tracking-widest text-keep-muted font-keep-display">
          Party Guild Rosters
        </span>
        <div className="grid grid-cols-5 gap-2">
          {roles.map((role, idx) => {
            const Icon = role.icon;
            return (
              <div 
                key={idx} 
                className="flex flex-col items-center gap-1.5 p-2 rounded bg-black/40 border border-white/5 hover:border-keep-primary/30 transition-all cursor-pointer"
              >
                <Icon className={`w-5 h-5 ${role.color}`} />
                <span className="text-[9px] uppercase font-semibold text-keep-foreground tracking-wider font-keep-display">
                  {role.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>
    </GlassKeepPanel>
  );
}
export type HeroIndicatorsType = typeof HeroIndicators;
