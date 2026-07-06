"use client";

import React from 'react';
import { useKingdomCampaign } from '@/context/KingdomCampaignContext';
import { useRealmTheme } from '@/context/RealmThemeContext';
import { useAudioController } from '@/hooks/useAudioController';
import { LayoutDashboard, KanbanSquare, BellRing, Settings, Shield, ChevronDown } from 'lucide-react';
import GlassKeepPanel from '../ui/GlassKeepPanel';
import { CivilizationId } from '@/types';

interface KeepSidebarProps {
  activeTab: 'dashboard' | 'board' | 'notifications' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'board' | 'notifications' | 'settings') => void;
}

export default function KeepSidebar({ activeTab, setActiveTab }: KeepSidebarProps) {
  const { kingdoms, activeKingdom, selectKingdom, createKingdom } = useKingdomCampaign();
  const { setTheme } = useRealmTheme();
  const { playClick } = useAudioController();

  const menuItems = [
    { id: 'dashboard', name: 'Command Keep', icon: LayoutDashboard },
    { id: 'board', name: 'Quest Board', icon: KanbanSquare },
    { id: 'notifications', name: 'Transmissions', icon: BellRing },
    { id: 'settings', name: 'Keep Settings', icon: Settings }
  ] as const;

  const handleKingdomChange = (kingdomId: string) => {
    playClick();
    selectKingdom(kingdomId);
    
    // Auto-update theme colors dynamically on select
    const selected = kingdoms.find(k => k.id === kingdomId);
    if (selected) {
      setTheme(selected.themeId);
    }
  };

  const handleAddKingdom = () => {
    playClick();
    const name = prompt("Enter Kingdom Name:");
    if (!name) return;
    const themes: ('medieval' | 'roman' | 'cyberpunk' | 'samurai' | 'robo' | 'blockcraft')[] = [
      'medieval', 'roman', 'cyberpunk', 'samurai', 'robo', 'blockcraft'
    ];
    const themeId = prompt(`Choose Civilization Theme (${themes.join(', ')}):`, 'medieval') as CivilizationId;
    if (!themes.includes(themeId)) {
      alert("Invalid theme chosen!");
      return;
    }
    createKingdom(name, `The newly discovered land of ${name}.`, themeId);
  };

  return (
    <GlassKeepPanel className="w-64 h-full flex flex-col justify-between p-5 border-r border-keep-border bg-keep-glass backdrop-blur-md rounded-none">
      <div className="flex flex-col gap-8">
        
        {/* Brand Group */}
        <div className="flex items-center gap-3 border-b border-keep-border pb-4">
          <Shield className="w-8 h-8 text-keep-primary glow-text" />
          <div>
            <h2 className="text-sm font-bold tracking-[0.2em] text-white font-keep-display">
              CASTELLARY
            </h2>
            <span className="text-[9px] uppercase tracking-wider text-keep-muted">Command Keep</span>
          </div>
        </div>

        {/* Kingdom Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-[9px] uppercase font-bold tracking-widest text-keep-muted font-keep-display">
            Active Campaign Realm
          </label>
          <div className="relative">
            <select
              value={activeKingdom?.id || ''}
              onChange={(e) => handleKingdomChange(e.target.value)}
              className="w-full bg-black/60 border border-keep-border text-xs text-white rounded px-3 py-2.5 focus:outline-none appearance-none font-semibold tracking-wide cursor-pointer hover:border-keep-primary/45 transition-all"
            >
              {kingdoms.map(k => (
                <option key={k.id} value={k.id} className="bg-black text-white">
                  {k.name} ({k.themeId.toUpperCase()})
                </option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-3 w-4 h-4 text-keep-muted pointer-events-none" />
          </div>
          <button 
            onClick={handleAddKingdom}
            className="text-[9px] uppercase font-bold tracking-widest text-keep-primary hover:text-keep-accent text-left mt-1 hover:underline transition-all"
          >
            + Discover New Realm
          </button>
        </div>

        {/* Navigation Menu */}
        <nav className="flex flex-col gap-1">
          {menuItems.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => { playClick(); setActiveTab(item.id); }}
                className={`flex items-center gap-3 px-4 py-3 rounded text-xs font-bold uppercase tracking-wider transition-all ${
                  isActive 
                    ? 'bg-keep-primary/10 border-l-2 border-keep-primary text-keep-primary font-bold' 
                    : 'text-keep-muted hover:bg-white/5 hover:text-keep-foreground'
                }`}
              >
                <Icon className="w-4 h-4" />
                <span className="font-keep-display">{item.name}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {/* Footer Info */}
      <div className="border-t border-keep-border pt-4 flex flex-col gap-2">
        <div className="text-[10px] text-keep-muted italic flex items-center justify-between">
          <span>Shield Integrity</span>
          <span className="text-keep-success">100%</span>
        </div>
      </div>
    </GlassKeepPanel>
  );
}
