"use client";

import React from 'react';
import { useHeroSession } from '@/context/HeroSessionContext';
import { useAudioController } from '@/hooks/useAudioController';
import ProgressBar from '../ui/ProgressBar';
import { LogOut, User, Crown, Wand2, Sword } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface KeepTopbarProps {
  activeTabName: string;
}

export default function KeepTopbar({ activeTabName }: KeepTopbarProps) {
  const router = useRouter();
  const { profile, logout } = useHeroSession();
  const { playClick } = useAudioController();

  const handleLogout = () => {
    playClick();
    logout();
    router.push('/');
  };

  const getRoleIcon = (roleClass: string) => {
    switch (roleClass) {
      case 'king': return Crown;
      case 'mage': return Wand2;
      case 'knight': return Sword;
      default: return User;
    }
  };

  const RoleIcon = getRoleIcon(profile?.heroClass || 'knight');
  const level = profile?.level || 1;
  const xp = profile?.xp || 0;
  const xpNeeded = level * 100;

  return (
    <header className="h-20 border-b border-keep-border bg-keep-glass backdrop-blur-md px-6 sm:px-8 flex items-center justify-between z-30">
      
      {/* Path Breadcrumbs */}
      <div className="flex items-center gap-2 text-xs uppercase tracking-wider font-bold font-keep-display">
        <span className="text-keep-muted select-none">Keep Command</span>
        <span className="text-keep-muted select-none">/</span>
        <span className="text-keep-primary">{activeTabName}</span>
      </div>

      {/* Hero Stats HUD Group */}
      <div className="flex items-center gap-6">
        
        {/* Profile Card Overlay */}
        <div className="hidden sm:flex items-center gap-3 bg-white/[0.02] border border-keep-border rounded px-4 py-2">
          {/* Level Circle Badge */}
          <div className="w-8 h-8 rounded-full bg-keep-primary/10 border border-keep-primary/30 flex items-center justify-center text-xs font-bold text-keep-primary glow-text font-keep-display">
            {level}
          </div>

          <div className="flex flex-col gap-0.5 min-w-[100px]">
            <div className="flex items-center gap-1.5">
              <RoleIcon className="w-3.5 h-3.5 text-keep-accent" />
              <span className="text-xs font-bold text-white tracking-wide">
                {profile?.username || 'Hero'}
              </span>
            </div>
            <ProgressBar
              value={xp}
              max={xpNeeded}
              variant="success"
              className="h-1"
            />
            <span className="text-[8px] text-keep-muted uppercase tracking-wider font-semibold">
              {xp} / {xpNeeded} XP
            </span>
          </div>
        </div>

        {/* Exit Button */}
        <button
          onClick={handleLogout}
          className="flex items-center justify-center p-2.5 rounded bg-red-950/20 border border-keep-danger/20 hover:border-keep-danger/55 hover:bg-red-950/35 text-keep-danger transition-all cursor-pointer"
          title="Leave Keep & Logout"
        >
          <LogOut className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
export type KeepTopbarType = typeof KeepTopbar;
