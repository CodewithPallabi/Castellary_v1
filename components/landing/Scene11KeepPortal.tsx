"use client";

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { useHeroSession } from '@/context/HeroSessionContext';
import { useAudioController } from '@/hooks/useAudioController';
import { useRealmTheme } from '@/context/RealmThemeContext';
import { HeroClass } from '@/types';
import { Crown, Wand2, Sword } from 'lucide-react';

interface Scene11Props {
  isActive: boolean;
}

export default function Scene11KeepPortal({ isActive }: Scene11Props) {
  const router = useRouter();
  const { login, signup } = useHeroSession();
  const { playClick, playVictory } = useAudioController();
  const { activeThemeId } = useRealmTheme();

  const [isLogin, setIsLogin] = useState<boolean>(true);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [selectedClass, setSelectedClass] = useState<HeroClass>('knight');
  const [errorMsg, setErrorMsg] = useState<string>('');

  const getBgPath = (id: string) => {
    if (id === 'medieval' || id === 'blockcraft') {
      return `/themes/${id}/landing/background.png`;
    }
    return `/themes/${id}/landing/background.webp`;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg('');

    if (!username.trim()) {
      setErrorMsg('Hero name cannot be empty.');
      return;
    }

    if (isLogin) {
      const success = login(username.trim());
      if (success) {
        playVictory();
        router.push('/dashboard');
      } else {
        setErrorMsg('Galahad is the default hero in local storage. Sign up to create a new profile!');
      }
    } else {
      signup(username.trim(), selectedClass);
      playVictory();
      router.push('/dashboard');
    }
  };

  const classes: { id: HeroClass; name: string; icon: React.ComponentType<{ className?: string }>; desc: string }[] = [
    { id: 'king', name: 'King', icon: Crown, desc: 'Project Leader. Creates campaigns & approves quests.' },
    { id: 'mage', name: 'Mage', icon: Wand2, desc: 'Architect. Controls logs, specs, and strategic layouts.' },
    { id: 'knight', name: 'Knight', icon: Sword, desc: 'Developer. Carries out implementational quests.' }
  ];

  return (
    <section className="relative w-full h-[100svh] overflow-hidden bg-black flex flex-col justify-center items-center p-6 sm:p-12 md:p-20 snap-start snap-always">
      {/* Background Gate interior - Skin matches civilization */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-30 select-none pointer-events-none filter brightness-[0.35]"
        style={{ backgroundImage: `url(${getBgPath(activeThemeId)})` }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/85 via-transparent to-black/90 pointer-events-none" />
      
      {/* Main Content Pane */}
      <div className="relative z-10 w-full max-w-[1200px] flex flex-col md:flex-row items-center justify-between gap-16">
        
        {/* Left side: Premium gate details and two animated glass action cards */}
        <div className="flex flex-col gap-6 text-left max-w-xl">
          <span className="text-[11px] uppercase tracking-[0.45em] text-keep-primary font-bold font-keep-display">
            Gates of the Keep
          </span>
          <h2 className="text-4xl sm:text-5xl font-black uppercase font-keep-display tracking-[0.1em] leading-tight text-white">
            GATES OF THE KEEP
          </h2>
          <span className="text-sm uppercase font-bold tracking-[0.25em] text-keep-primary -mt-2">
            Answer the call, your party awaits.
          </span>
          <p className="text-sm font-light text-keep-muted leading-relaxed font-keep-body">
            Step through the gates to synchronise your logs, accept quests and engage boss battles with Galahad and the Alliance Party.
          </p>
          
          {/* Two animated side-by-side action cards */}
          <div className="grid grid-cols-2 gap-4 w-full mt-6">
            {/* Card 1: Rejoin Party */}
            <button
              onClick={() => { playClick(); setIsLogin(true); setErrorMsg(''); }}
              style={{
                background: isLogin ? 'rgba(212, 175, 55, 0.08)' : 'rgba(20, 20, 20, 0.45)',
                border: isLogin ? '1px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)',
                boxShadow: isLogin ? '0 0 20px rgba(212, 175, 55, 0.15)' : 'none'
              }}
              className="p-6 rounded-md flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="text-[9px] uppercase tracking-widest text-keep-muted font-keep-body">
                Begin your journey
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-white font-keep-display uppercase">
                Rejoin Party
              </span>
            </button>

            {/* Card 2: Form New Party */}
            <button
              onClick={() => { playClick(); setIsLogin(false); setErrorMsg(''); }}
              style={{
                background: !isLogin ? 'rgba(212, 175, 55, 0.08)' : 'rgba(20, 20, 20, 0.45)',
                border: !isLogin ? '1px solid #D4AF37' : '1px solid rgba(255, 255, 255, 0.05)',
                backdropFilter: 'blur(12px)',
                boxShadow: !isLogin ? '0 0 20px rgba(212, 175, 55, 0.15)' : 'none'
              }}
              className="p-6 rounded-md flex flex-col items-center justify-center text-center gap-1.5 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
            >
              <span className="text-[9px] uppercase tracking-widest text-keep-muted font-keep-body">
                Begin your journey
              </span>
              <span className="text-xs font-bold tracking-[0.2em] text-white font-keep-display uppercase">
                Form New Party
              </span>
            </button>
          </div>
        </div>

        {/* Right side: Authentication Panel */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={isActive ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
          transition={{ duration: 0.8, delay: 0.1, ease: 'easeOut' }}
          style={{
            background: 'rgba(20, 20, 20, 0.55)',
            backdropFilter: 'blur(18px)',
            border: '1px solid rgba(255, 255, 255, 0.08)',
            boxShadow: '0 20px 50px rgba(0, 0, 0, 0.5)'
          }}
          className="relative z-10 w-full max-w-md p-8 rounded shadow-2xl flex flex-col gap-6"
        >
          {/* Header */}
          <div className="flex flex-col gap-1 text-center border-b border-white/5 pb-4">
            <h3 className="text-lg font-black tracking-[0.2em] text-white font-keep-display uppercase">
              {isLogin ? "WELCOME BACK" : "CREATE CHARTER"}
            </h3>
            <span className="text-[9px] uppercase tracking-wider text-keep-muted">
              {isLogin ? "Inscribe hero identity" : "Form your project alliance"}
            </span>
          </div>

          {/* Form Container */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            {errorMsg && (
              <div className="p-3 text-[10px] bg-red-950/40 border border-keep-danger/30 text-keep-danger rounded uppercase tracking-wider">
                {errorMsg}
              </div>
            )}

            {/* Username */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-bold tracking-[0.25em] text-keep-muted">
                Hero Name
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Galahad"
                className="bg-[#0c0d10] border border-white/10 text-white rounded px-4 py-3.5 text-xs focus:outline-none focus:border-keep-primary/60 focus:shadow-[0_0_12px_rgba(212,175,55,0.2)] placeholder-white/20 transition-all font-light"
              />
            </div>

            {/* Password (Stubbed) */}
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-bold tracking-[0.25em] text-keep-muted">
                Passphrase
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="bg-[#0c0d10] border border-white/10 text-white rounded px-4 py-3.5 text-xs focus:outline-none focus:border-keep-primary/60 focus:shadow-[0_0_12px_rgba(212,175,55,0.2)] placeholder-white/20 transition-all"
              />
            </div>

            {/* Sign Up: RPG Class Selector */}
            {!isLogin && (
              <div className="flex flex-col gap-3 mt-2">
                <label className="text-[9px] uppercase font-bold tracking-[0.25em] text-keep-muted">
                  Choose Hero Class
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {classes.map((cls) => {
                    const Icon = cls.icon;
                    const isSelected = selectedClass === cls.id;
                    return (
                      <button
                        key={cls.id}
                        type="button"
                        onClick={() => { playClick(); setSelectedClass(cls.id); }}
                        className={`flex flex-col items-center gap-2 p-3 rounded border text-center transition-all ${
                          isSelected 
                            ? 'border-keep-primary bg-keep-primary/5 text-keep-primary shadow-[0_0_10px_rgba(212,175,55,0.15)]' 
                            : 'border-white/5 bg-[#0c0d10] text-keep-muted hover:border-white/15'
                        }`}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="text-[9px] uppercase font-bold tracking-[0.15em]">
                          {cls.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            )}

            <button
              type="submit"
              className="w-full mt-4 py-4 rounded bg-keep-primary text-black font-bold text-xs uppercase tracking-[0.25em] hover:bg-white hover:text-black transition-colors"
            >
              {isLogin ? "AUTHORIZE ACCESS" : "INITIALIZE ALLIANCE"}
            </button>
          </form>
        </motion.div>
      </div>

      {/* Subtle gold footer at the bottom */}
      <div className="absolute bottom-6 left-0 right-0 z-10 flex flex-col items-center justify-center text-[9px] sm:text-[10px] tracking-[0.2em] uppercase text-keep-primary/40 font-keep-display gap-2">
        <span>© 2026 Castellary</span>
        <div className="flex gap-6 mt-1 items-center">
          <a href="https://github.com" target="_blank" rel="noreferrer" className="hover:text-keep-primary opacity-50 hover:opacity-100 transition-all">
            <svg className="w-4 h-4 fill-current text-keep-primary" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
            </svg>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="hover:text-keep-primary opacity-50 hover:opacity-100 transition-all">
            <svg className="w-4 h-4 fill-current text-keep-primary" viewBox="0 0 24 24">
              <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
            </svg>
          </a>
          <a href="mailto:council@castellary.com" className="hover:text-keep-primary opacity-50 hover:opacity-100 transition-all">
            <svg className="w-4 h-4 fill-none stroke-current text-keep-primary stroke-[1.5]" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round">
              <rect width="20" height="16" x="2" y="4" rx="2"/>
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
            </svg>
          </a>
        </div>
      </div>
    </section>
  );
}
export type Scene11KeepPortalType = typeof Scene11KeepPortal;
