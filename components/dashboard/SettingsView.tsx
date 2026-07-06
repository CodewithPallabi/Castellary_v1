"use client";

import React, { useState } from 'react';
import { useRealmTheme } from '@/context/RealmThemeContext';
import { useAudioController } from '@/hooks/useAudioController';
import { resetMockDatabase } from '@/lib/mock/seed';
import { CivilizationId } from '@/types';
import GlassKeepPanel from '../ui/GlassKeepPanel';
import KeepButton from '../ui/KeepButton';
import { RefreshCw, ToggleLeft, ToggleRight } from 'lucide-react';

export default function SettingsView() {
  const { theme, setTheme } = useRealmTheme();
  const { playClick, playVictory } = useAudioController();
  const [flags, setFlags] = useState({
    useSupabase: false,
    useGemini: false,
    useNotifications: true
  });

  const civilizations: { id: CivilizationId; name: string }[] = [
    { id: 'medieval', name: 'Medieval Kingdom' },
    { id: 'roman', name: 'Roman Empire' },
    { id: 'cyberpunk', name: 'Cyberpunk City' },
    { id: 'samurai', name: 'Samurai Clan' },
    { id: 'robo', name: 'Robo Frontier' },
    { id: 'blockcraft', name: 'Blockcraft World' }
  ];

  const handleThemeChange = (id: CivilizationId) => {
    playVictory();
    setTheme(id);
  };

  const handleReset = () => {
    playClick();
    if (confirm("Are you sure you want to reset all campaign progress, levels, and quests?")) {
      resetMockDatabase();
      window.location.reload();
    }
  };

  const toggleFlag = (flagKey: keyof typeof flags) => {
    playClick();
    setFlags(prev => ({
      ...prev,
      [flagKey]: !prev[flagKey]
    }));
  };

  return (
    <div className="flex flex-col gap-6 w-full max-w-4xl mx-auto p-4">
      <div className="border-b border-keep-border pb-4">
        <h2 className="text-xl font-bold uppercase tracking-wider font-keep-display">
          Keep Settings & Council Deck
        </h2>
        <p className="text-xs text-keep-muted">Configure active civilization variables, toggle simulator integration modes, and seed database states.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Card: Active civilization selector */}
        <GlassKeepPanel className="p-6 flex flex-col gap-4 border border-keep-border bg-keep-glass">
          <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-keep-primary font-keep-display border-b border-keep-border pb-2">
            Active Civilization Overrides
          </h4>
          <div className="flex flex-col gap-2">
            {civilizations.map((civ) => {
              const isActive = theme.id === civ.id;
              return (
                <button
                   key={civ.id}
                  onClick={() => handleThemeChange(civ.id)}
                  className={`w-full text-left px-4 py-3 rounded text-xs font-bold uppercase tracking-wider border transition-all ${
                    isActive 
                      ? 'border-keep-primary bg-keep-primary/5 text-keep-primary shadow-[0_0_15px_rgba(212,175,55,0.05)]' 
                      : 'border-keep-border bg-keep-primary/5 text-keep-muted hover:border-keep-primary/40'
                  }`}
                >
                  {civ.name} {isActive && ' (ACTIVE)'}
                </button>
              );
            })}
          </div>
        </GlassKeepPanel>

        {/* Right Card: Services Flags and Seeder */}
        <div className="flex flex-col gap-6">
          {/* Service simulation flags */}
          <GlassKeepPanel className="p-6 flex flex-col gap-4 border border-keep-border bg-keep-glass">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-keep-primary font-keep-display border-b border-keep-border pb-2">
              Feature Simulator Flags
            </h4>
            <div className="flex flex-col gap-3.5">
              {(Object.keys(flags) as Array<keyof typeof flags>).map((key) => {
                const isEnabled = flags[key];
                return (
                  <div key={key} className="flex justify-between items-center bg-keep-primary/5 border border-keep-border p-3 rounded">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-xs font-bold uppercase text-white tracking-wide">
                        {key === 'useSupabase' ? 'Enable Supabase Cloud Sync' : key === 'useGemini' ? 'Enable Gemini AI Strategist' : 'Enable System Notifications'}
                      </span>
                      <span className="text-[10px] text-keep-muted">
                        {key === 'useSupabase' ? 'Route DB states to live cloud endpoints' : key === 'useGemini' ? 'Enable cooperative AI sidekick tips' : 'Enable scout notifications alerts'}
                      </span>
                    </div>
                    <button 
                      onClick={() => toggleFlag(key)}
                      className={`cursor-pointer ${isEnabled ? 'text-keep-primary glow-text' : 'text-keep-muted'}`}
                    >
                      {isEnabled ? <ToggleRight className="w-9 h-9" /> : <ToggleLeft className="w-9 h-9" />}
                    </button>
                  </div>
                );
              })}
            </div>
          </GlassKeepPanel>

          {/* Database Reset Action */}
          <GlassKeepPanel className="p-6 flex flex-col gap-4 border border-keep-border bg-keep-glass">
            <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-keep-danger font-keep-display border-b border-keep-border pb-2">
              System Clear Actions
            </h4>
            <p className="text-xs text-keep-muted leading-relaxed">
              Clears browser storage keys completely, resetting campaign logs, active hero profile statistics, quest board cards, and active boss HP values back to the default state.
            </p>
            <KeepButton variant="accent" onClick={handleReset} className="w-full flex justify-center gap-2 mt-2">
              <RefreshCw className="w-4 h-4" />
              Reset Local Database
            </KeepButton>
          </GlassKeepPanel>
        </div>
      </div>
    </div>
  );
}
export type SettingsViewType = typeof SettingsView;
