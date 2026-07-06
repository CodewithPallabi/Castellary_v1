import React from 'react';
import { motion, MotionValue } from 'framer-motion';
import { useAudioController } from '@/hooks/useAudioController';

interface RealmContentProps {
  name: string;
  quote: string;
  description: string;
  ctaText: string;
  isActive: boolean;
  align: 'left' | 'right';
  parallaxX: MotionValue<number>;
  parallaxY: MotionValue<number>;
  onCtaClick: () => void;
}

export default function RealmContent({
  name,
  quote,
  description,
  ctaText,
  isActive,
  align,
  parallaxX,
  parallaxY,
  onCtaClick
}: RealmContentProps) {
  const horizontalPosition = align === 'left' ? 'left-[48px] sm:left-[128px]' : 'right-[48px] sm:right-[128px]';
  const { playClick } = useAudioController();

  return (
    <motion.div
      style={{ x: parallaxX, y: parallaxY }}
      initial={{ opacity: 0, scale: 0.96 }}
      animate={isActive ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.96 }}
      transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
      className={`absolute top-[18%] z-10 w-[90%] max-w-[700px] h-auto flex flex-col justify-center ${horizontalPosition}`}
    >
      <div
        style={{
          background: 'rgba(20, 20, 20, 0.55)',
          backdropFilter: 'blur(18px)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
        }}
        className="flex flex-col gap-8 p-[64px] rounded-lg"
      >
        {/* Title Group */}
        <div className="flex flex-col gap-2">
          <h2 className={`uppercase text-white font-keep-display leading-tight ${
            name.toLowerCase().includes('blockcraft') 
              ? 'text-3xl sm:text-4xl tracking-[0.05em]' 
              : 'text-5xl sm:text-6xl tracking-[0.1em]'
          }`}>
            {name}
          </h2>
        </div>

        {/* Cinematic Quote */}
        <div className="flex gap-4 pl-4 border-l-2 border-keep-primary/30 py-1">
          <p className="text-base sm:text-lg font-light italic leading-relaxed text-white font-serif">
            &ldquo;{quote}&rdquo;
          </p>
        </div>

        {/* Narrative Description */}
        <p className="text-sm sm:text-base font-light leading-relaxed text-keep-muted">
          {description}
        </p>

        {/* Features list */}
        <div className="flex flex-wrap gap-3 mt-1">
          {["Guild Campaigns", "Active Quests", "Kingdom Boss"].map((feat, idx) => (
            <span 
              key={idx} 
              className="px-3.5 py-1 text-[9px] font-bold tracking-[0.2em] uppercase rounded-full border border-keep-primary/25 text-keep-primary bg-keep-primary/5"
            >
              {feat}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <button 
          onClick={() => {
            playClick();
            onCtaClick();
          }}
          className="w-full py-4 rounded-full border border-keep-primary/50 hover:border-keep-primary text-keep-primary hover:text-white hover:bg-keep-primary/10 transition-all text-[11px] font-bold tracking-[0.3em] uppercase mt-4 shadow-[0_0_15px_rgba(212,175,55,0.08)]"
        >
          {ctaText}
        </button>
      </div>
    </motion.div>
  );
}
export type RealmContentType = typeof RealmContent;
