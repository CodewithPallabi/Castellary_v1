"use client";

import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import RealmCharacter from './Realms/RealmCharacter';
import RealmContent from './Realms/RealmContent';
import { useCursorParallax } from '@/hooks/useCursorParallax';
import { useRealmTheme } from '@/context/RealmThemeContext';
import { CivilizationId } from '@/types';
import { ThemeConfig, medievalTheme, romeTheme, cyberpunkTheme, samuraiTheme, roboTheme, blockcraftTheme } from '@/lib/theme';
import { useAudioController } from '@/hooks/useAudioController';

interface SceneShowcaseProps {
  themeId: CivilizationId;
  isActive: boolean;
  onComplete: () => void;
}

const themeMap: Record<CivilizationId, ThemeConfig> = {
  medieval: medievalTheme,
  roman: romeTheme,
  cyberpunk: cyberpunkTheme,
  samurai: samuraiTheme,
  robo: roboTheme,
  blockcraft: blockcraftTheme
};

export default function SceneShowcase({ themeId, isActive, onComplete }: SceneShowcaseProps) {
  const { setTheme } = useRealmTheme();
  const { playAmbient } = useAudioController();
  const activeConfig = themeMap[themeId] || medievalTheme;

  // Parallax vectors
  const bgParallax = useCursorParallax(5);      // Subtle bg offset
  const charParallax = useCursorParallax(15);   // Moderate character offset
  const contentParallax = useCursorParallax(25); // Heavy panel offset

  useEffect(() => {
    if (isActive) {
      setTheme(themeId); // Swaps active theme variables on body dynamically
      playAmbient(themeId); // Plays local ambient theme music loop
    }
  }, [isActive, themeId, setTheme, playAmbient]);

  const alignMap: Record<CivilizationId, { char: 'left' | 'right'; panel: 'left' | 'right' }> = {
    medieval: { char: 'left', panel: 'right' },
    roman: { char: 'right', panel: 'left' },
    cyberpunk: { char: 'left', panel: 'right' },
    samurai: { char: 'right', panel: 'left' },
    robo: { char: 'left', panel: 'right' },
    blockcraft: { char: 'right', panel: 'left' }
  };

  const align = alignMap[themeId] || { char: 'left', panel: 'right' };

  const getBgPath = (id: string) => {
    if (id === 'medieval' || id === 'blockcraft') {
      return `/themes/${id}/landing/background.png`;
    }
    return `/themes/${id}/landing/background.webp`;
  };

  const getCharPath = (id: string) => {
    if (id === 'blockcraft') {
      return `/themes/blockcraft/characters/leader.png`;
    }
    return `/themes/${id}/landing/leader.png`;
  };

  const renderParticles = () => {
    if (!isActive) return null;
    const colors: Record<CivilizationId, string> = {
      medieval: 'rgba(212,175,55,0.12)',
      roman: 'rgba(220,200,160,0.12)',
      cyberpunk: 'rgba(213,0,249,0.12)',
      samurai: 'rgba(255,168,182,0.15)',
      robo: 'rgba(255,159,0,0.12)',
      blockcraft: 'rgba(16,185,129,0.12)'
    };
    const c = colors[themeId] || 'rgba(255,255,255,0.1)';
    return (
      <div 
        className="absolute inset-0 pointer-events-none mix-blend-screen opacity-20 z-2 animate-drift"
        style={{
          backgroundImage: `radial-gradient(circle, ${c} 1.5px, transparent 2px)`,
          backgroundSize: '40px 40px',
        }}
      />
    );
  };

  return (
    <section className="relative w-full h-[100svh] overflow-hidden flex items-center justify-between snap-start snap-always bg-black">
      {/* Background Environment (Sharp, unblurred, premium visual hero) */}
      <motion.div
        style={{ x: bgParallax.x, y: bgParallax.y }}
        className="absolute inset-0 z-0 bg-cover bg-center opacity-55 select-none pointer-events-none"
        initial={{ scale: 1.05 }}
        animate={isActive ? { scale: 1.01 } : { scale: 1.05 }}
        transition={{ duration: 7, ease: 'easeOut' }}
      >
        <div 
          className="w-full h-full bg-cover bg-center"
          style={{ backgroundImage: `url(${getBgPath(themeId)})` }}
        />
      </motion.div>

      {/* Theme Specific Particle Drift Layer */}
      {renderParticles()}

      {/* Atmospheric Volcanic Fog/Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/35 pointer-events-none select-none z-1" />

      {/* Parallax Character Layer */}
      <RealmCharacter
        charPath={getCharPath(themeId)}
        isActive={isActive}
        align={align.char}
        parallaxX={charParallax.x}
        parallaxY={charParallax.y}
        themeId={themeId}
      />

      {/* Parallax Description Layout */}
      <RealmContent
        name={activeConfig.name}
        quote={activeConfig.quote}
        description={
          themeId === 'medieval' ? 'In unity, we build kingdoms. In focus, we defeat chaos. Lead your realm. Assign roles. Conquer every challenge together.' :
          themeId === 'roman' ? 'Discipline builds empires. Plans conquer the impossible. Organize. Execute. Dominate. The empire awaits your command.' :
          themeId === 'cyberpunk' ? 'Code. Plan. Execute. In the future, only the efficient survive. Outbuild, outthink, outlast. Your squad. Your rules.' :
          themeId === 'samurai' ? 'Honor the plan. Master the task. Bring victory to your clan. Precision. Patience. Power.' :
          themeId === 'robo' ? 'Automate the repetitive. Focus on the mission. Win as one. Technology is your strength.' :
          'Build together. Explore together. Achieve together. Create. Share. Conquer.'
        }
        ctaText={activeConfig.cta}
        isActive={isActive}
        align={align.panel}
        parallaxX={contentParallax.x}
        parallaxY={contentParallax.y}
        onCtaClick={onComplete}
      />

      <style jsx global>{`
        @keyframes particleDrift {
          0% { background-position: 0px 800px; }
          100% { background-position: 0px 0px; }
        }
        .animate-drift {
          animation: particleDrift 16s linear infinite;
        }
      `}</style>
    </section>
  );
}
export type SceneShowcaseType = typeof SceneShowcase;
