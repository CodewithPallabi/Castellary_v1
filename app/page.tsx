"use client";

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import Navbar from '@/components/landing/Navbar/Navbar';
import Scene01Awakening from '@/components/landing/Scene01Awakening';
import Scene02Challenge from '@/components/landing/Scene02Challenge';
import Scene03BattleBegins from '@/components/landing/Scene03BattleBegins';
import SceneShowcase from '@/components/landing/SceneShowcase';
import Scene10GuildCharter from '@/components/landing/Scene10GuildCharter';
import Scene11KeepPortal from '@/components/landing/Scene11KeepPortal';
import { useRealmTheme } from '@/context/RealmThemeContext';
import { CivilizationId } from '@/types';

export default function LandingPage() {
  const { setTheme } = useRealmTheme();
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [introStep, setIntroStep] = useState<number>(0); // 0: Center, 1: Glide, 2: Finished

  useEffect(() => {
    // Logo reveal timeline
    const t1 = setTimeout(() => {
      setIntroStep(1); // Glide logo to upper-left
    }, 2500);

    const t2 = setTimeout(() => {
      setIntroStep(2); // Fade in contents
    }, 3500);

    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  // Update theme dynamically when active slide changes
  useEffect(() => {
    const themeMapping: Record<number, CivilizationId> = {
      3: 'medieval',
      4: 'roman',
      5: 'cyberpunk',
      6: 'samurai',
      7: 'robo',
      8: 'blockcraft'
    };
    
    const nextTheme = themeMapping[activeSlide];
    if (nextTheme) {
      setTheme(nextTheme);
    } else {
      setTheme('medieval');
    }
  }, [activeSlide, setTheme]);

  // Intercept mouse wheel events (with 1s lock to prevent jitter/abrupt spamming)
  useEffect(() => {
    if (introStep < 2) return;

    let lastScrollTime = 0;
    const handleWheel = (e: WheelEvent) => {
      e.preventDefault();
      const now = Date.now();
      if (now - lastScrollTime < 1000) return;

      if (e.deltaY > 15) {
        setActiveSlide(prev => Math.min(prev + 1, 10));
        lastScrollTime = now;
      } else if (e.deltaY < -15) {
        setActiveSlide(prev => Math.max(prev - 1, 0));
        lastScrollTime = now;
      }
    };

    window.addEventListener('wheel', handleWheel, { passive: false });
    return () => window.removeEventListener('wheel', handleWheel);
  }, [introStep]);

  // Intercept keyboard arrow navigation
  useEffect(() => {
    if (introStep < 2) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (['ArrowDown', 'PageDown'].includes(e.key)) {
        e.preventDefault();
        setActiveSlide(prev => Math.min(prev + 1, 10));
      } else if (['ArrowUp', 'PageUp'].includes(e.key)) {
        e.preventDefault();
        setActiveSlide(prev => Math.max(prev - 1, 0));
      } else if (e.key === 'Home') {
        e.preventDefault();
        setActiveSlide(0);
      } else if (e.key === 'End') {
        e.preventDefault();
        setActiveSlide(10);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [introStep]);

  // Intercept mobile/trackpad touch swipe gestures
  useEffect(() => {
    if (introStep < 2) return;

    let touchStart = 0;
    const handleTouchStart = (e: TouchEvent) => {
      touchStart = e.touches[0].clientY;
    };
    const handleTouchEnd = (e: TouchEvent) => {
      const touchEnd = e.changedTouches[0].clientY;
      const diff = touchStart - touchEnd;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          setActiveSlide(prev => Math.min(prev + 1, 10));
        } else {
          setActiveSlide(prev => Math.max(prev - 1, 0));
        }
      }
    };

    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);
    return () => {
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, [introStep]);

  return (
    <div className="relative w-full h-[100svh] overflow-hidden bg-black text-white selection:bg-keep-primary selection:text-black">
      {/* Shared Morphing Logo - Habitica Style */}
      <motion.div
        layout
        transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
        style={{ originX: 0.5, originY: 0.5 }}
        className={
          introStep === 0
            ? "fixed inset-0 m-auto w-40 h-40 z-50 flex items-center justify-center pointer-events-none"
            : "fixed top-[11px] left-[48px] w-[66px] h-[66px] z-50 flex items-center justify-center pointer-events-none"
        }
      >
        <motion.img 
          src="/logo/crest.png" 
          alt="Castellary Logo" 
          className="w-full h-full object-contain drop-shadow-[0_0_12px_rgba(212,175,55,0.25)]"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.75 }}
        />
      </motion.div>

      {/* Cinematic Navigation Header */}
      <Navbar 
        showNavbar={introStep === 2} 
        onHome={() => setActiveSlide(0)}
        onCovenants={() => setActiveSlide(3)}
        onGetStarted={() => setActiveSlide(10)}
      />

      {/* Presentation Deck Container (CSS Translate Y - no native scroll shifts) */}
      <div
        className="w-full h-full transition-transform duration-[750ms] ease-[cubic-bezier(0.16,1,0.3,1)]"
        style={{ transform: `translateY(-${activeSlide * 100}%)`, willChange: 'transform' }}
      >
        {/* Slide 01: Arrival */}
        <div className="w-full h-full flex-shrink-0">
          <Scene01Awakening
            isActive={activeSlide === 0 && introStep === 2}
            onComplete={() => setActiveSlide(1)}
          />
        </div>

        {/* Slide 02: Why Castellary Exists */}
        <div className="w-full h-full flex-shrink-0">
          <Scene02Challenge
            isActive={activeSlide === 1}
            onComplete={() => setActiveSlide(2)}
          />
        </div>

        {/* Slide 03: The Devil Boss */}
        <div className="w-full h-full flex-shrink-0">
          <Scene03BattleBegins
            isActive={activeSlide === 2}
            onComplete={() => setActiveSlide(3)}
          />
        </div>

        {/* Slides 04-09: Civilizations Showcases */}
        <div className="w-full h-full flex-shrink-0">
          <SceneShowcase
            themeId="medieval"
            isActive={activeSlide === 3}
            onComplete={() => setActiveSlide(10)}
          />
        </div>
        <div className="w-full h-full flex-shrink-0">
          <SceneShowcase
            themeId="roman"
            isActive={activeSlide === 4}
            onComplete={() => setActiveSlide(10)}
          />
        </div>
        <div className="w-full h-full flex-shrink-0">
          <SceneShowcase
            themeId="cyberpunk"
            isActive={activeSlide === 5}
            onComplete={() => setActiveSlide(10)}
          />
        </div>
        <div className="w-full h-full flex-shrink-0">
          <SceneShowcase
            themeId="samurai"
            isActive={activeSlide === 6}
            onComplete={() => setActiveSlide(10)}
          />
        </div>
        <div className="w-full h-full flex-shrink-0">
          <SceneShowcase
            themeId="robo"
            isActive={activeSlide === 7}
            onComplete={() => setActiveSlide(10)}
          />
        </div>
        <div className="w-full h-full flex-shrink-0">
          <SceneShowcase
            themeId="blockcraft"
            isActive={activeSlide === 8}
            onComplete={() => setActiveSlide(10)}
          />
        </div>

        {/* Slide 10: How It Works */}
        <div className="w-full h-full flex-shrink-0">
          <Scene10GuildCharter
            isActive={activeSlide === 9}
            onComplete={() => setActiveSlide(10)}
          />
        </div>

        {/* Slide 11: Keep Portal Gateway + Footer */}
        <div className="w-full h-full flex-shrink-0">
          <Scene11KeepPortal
            isActive={activeSlide === 10}
          />
        </div>
      </div>
    </div>
  );
}
