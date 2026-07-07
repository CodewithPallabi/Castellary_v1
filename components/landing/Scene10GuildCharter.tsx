"use client";

import React, { memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, BookOpen, ShieldCheck, Flame, Trophy } from 'lucide-react';
import Image from 'next/image';

interface Scene10Props {
  isActive: boolean;
  onComplete: () => void;
}

const Scene10GuildCharter = memo(function Scene10GuildCharter({ isActive, onComplete }: Scene10Props) {
  const steps = [
    {
      title: "CREATE GUILD",
      desc: "Build your team and invite allies.",
      icon: Users
    },
    {
      title: "ACCEPT QUESTS",
      desc: "Turn tasks into meaningful quests.",
      icon: BookOpen
    },
    {
      title: "COMPLETE QUESTS",
      desc: "Work together and track progress.",
      icon: ShieldCheck
    },
    {
      title: "DEFEAT BOSSES",
      desc: "Overcome challenges and grow stronger.",
      icon: Flame
    },
    {
      title: "LEVEL UP",
      desc: "Earn rewards and become legendary.",
      icon: Trophy
    }
  ];

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black flex flex-col items-center justify-center p-6 sm:p-12 snap-start snap-always">
      {/* Background Medieval Environment (Slightly darker, not black) */}
      <div className="absolute inset-0 select-none pointer-events-none filter brightness-[0.25] opacity-45">
        <Image
          src="/themes/medieval/landing/background.png"
          alt="Medieval Guild Environment"
          fill
          sizes="100vw"
          className="object-cover"
          loading="lazy"
        />
      </div>
      
      {/* Dark gradient mask */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/90 pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1400px] flex flex-col items-center gap-12">
        {/* Title */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.8, ease: 'easeOut' }}
              className="text-center flex flex-col items-center gap-2"
            >
              <h2 className="text-3xl sm:text-4xl font-light text-white uppercase font-keep-display tracking-[0.2em]">
                HOW CASTELLARY WORKS
              </h2>
              <span className="text-[10px] uppercase font-bold tracking-[0.35em] text-keep-primary mt-1">
                Your adventure. Step by step.
              </span>
              <div className="w-16 h-[1px] bg-keep-primary/30 mt-3" />
            </motion.div>
          )}
        </AnimatePresence>

        {/* 5 Shield Cards */}
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6 w-full justify-items-center">
          {steps.map((step, idx) => {
            const Icon = step.icon;
            return (
              <AnimatePresence key={idx}>
                {isActive && (
                  <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 30 }}
                    transition={{ duration: 0.8, delay: idx * 0.12, ease: [0.16, 1, 0.3, 1] }}
                    className="w-[245px] h-[270px] p-8 pt-12 flex flex-col items-center justify-center text-center gap-4 relative group"
                  >
                    {/* Shield Frame Background */}
                    <div className="absolute inset-0 select-none pointer-events-none filter drop-shadow-[0_15px_30px_rgba(0,0,0,0.75)] z-0">
                      <Image
                        src="/logo/shield.png"
                        alt="Shield Frame"
                        fill
                        sizes="245px"
                        className="object-contain"
                        loading="lazy"
                      />
                    </div>

                    {/* Gold Thin-Line Icon */}
                    <div className="text-keep-primary group-hover:scale-110 transition-transform z-10">
                      <Icon className="w-8 h-8 stroke-[1.25]" />
                    </div>

                    <div className="flex flex-col gap-2 max-w-[170px] z-10">
                      <h3 className="text-sm font-black tracking-[0.15em] text-white font-keep-display">
                        {step.title}
                      </h3>
                      <p className="text-xs text-keep-muted font-light leading-relaxed font-keep-body">
                        {step.desc}
                      </p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            );
          })}
        </div>

        {/* Sub-label and Next Trigger */}
        <AnimatePresence>
          {isActive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 1.0, duration: 0.8 }}
              className="flex flex-col items-center gap-5 mt-4"
            >
              <span className="text-xs italic tracking-wider text-keep-muted/65 font-serif">
                &ldquo;One quest at a time. One victory at a time.&rdquo;
              </span>

              <button
                onClick={onComplete}
                className="py-4 px-10 rounded-full border border-keep-primary/50 hover:border-keep-primary text-keep-primary hover:text-white hover:bg-keep-primary/10 text-[10px] font-bold tracking-[0.3em] uppercase transition-all"
              >
                Create Your Territory →
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
});

export default Scene10GuildCharter;
export type Scene10GuildCharterType = typeof Scene10GuildCharter;
