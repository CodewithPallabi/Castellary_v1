"use client";

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useHeroSession } from '@/context/HeroSessionContext';
import { useKingdomCampaign } from '@/context/KingdomCampaignContext';
import { useRealmTheme } from '@/context/RealmThemeContext';
import { useAudioController } from '@/hooks/useAudioController';
import KeepSidebar from '@/components/dashboard/KeepSidebar';
import KeepTopbar from '@/components/dashboard/KeepTopbar';
import BossPanel from '@/components/dashboard/BossPanel';
import LogTimeline from '@/components/dashboard/LogTimeline';
import QuestBoard from '@/components/dashboard/QuestBoard';
import TransmissionsList from '@/components/dashboard/TransmissionsList';
import SettingsView from '@/components/dashboard/SettingsView';
import GlassKeepPanel from '@/components/ui/GlassKeepPanel';
import KeepButton from '@/components/ui/KeepButton';
import ProgressBar from '@/components/ui/ProgressBar';
import { Shield, Trophy, CheckSquare } from 'lucide-react';

type TabType = 'dashboard' | 'board' | 'notifications' | 'settings';

export default function DashboardPage() {
  const router = useRouter();
  const { isAuthenticated, login, signup } = useHeroSession();
  const { activeKingdom, quests, logs } = useKingdomCampaign();
  const { activeThemeId, setTheme } = useRealmTheme();
  const { playClick, playVictory } = useAudioController();

  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Direct access Sign In fallbacks
  const [username, setUsername] = useState('');
  const [selectedClass, setSelectedClass] = useState<'king' | 'mage' | 'knight'>('knight');
  const [isLogin, setIsLogin] = useState(true);

  const getBgPath = (id: string) => {
    if (id === 'medieval' || id === 'blockcraft') {
      return `/themes/${id}/landing/background.png`;
    }
    return `/themes/${id}/landing/background.webp`;
  };

  // Set theme colors matches active kingdom theme once mounted
  useEffect(() => {
    if (activeKingdom) {
      setTheme(activeKingdom.themeId);
    }
  }, [activeKingdom, setTheme]);

  const handleMockAuthSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!username.trim()) return;

    if (isLogin) {
      const success = login(username.trim());
      if (success) {
        playVictory();
      } else {
        alert("Galahad is the default hero. Or choose 'Form Party' tab to sign up!");
      }
    } else {
      signup(username.trim(), selectedClass);
      playVictory();
    }
  };

  // Render Gate Portal sign-in overlay if user visits /dashboard directly unauthenticated
  if (!isAuthenticated) {
    return (
      <div 
        className="w-full h-screen bg-black text-white flex items-center justify-center p-6 bg-cover bg-center" 
        style={{ backgroundImage: `url(${getBgPath(activeThemeId)})` }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />
        <GlassKeepPanel className="relative z-10 w-full max-w-md p-6 border border-[#D4AF37]/20 shadow-2xl flex flex-col gap-6 bg-black/90">
          <div className="text-center flex flex-col items-center gap-2 border-b border-white/5 pb-4">
            <Shield className="w-10 h-10 text-keep-primary glow-text animate-pulse" />
            <h2 className="text-2xl font-bold uppercase tracking-wider text-white font-keep-display">
              Keep Council Deck
            </h2>
            <p className="text-[10px] text-keep-muted uppercase tracking-widest">Access Restricted. Rejoin active party.</p>
          </div>

          <div className="grid grid-cols-2 gap-2 border-b border-white/5 pb-3 text-xs font-bold uppercase tracking-wider text-center font-keep-display">
            <button
              onClick={() => { playClick(); setIsLogin(true); }}
              className={`pb-2 transition-colors border-b ${isLogin ? 'text-keep-primary border-keep-primary' : 'text-keep-muted border-transparent hover:text-white'}`}
            >
              Rejoin
            </button>
            <button
              onClick={() => { playClick(); setIsLogin(false); }}
              className={`pb-2 transition-colors border-b ${!isLogin ? 'text-keep-primary border-keep-primary' : 'text-keep-muted border-transparent hover:text-white'}`}
            >
              Form Party
            </button>
          </div>

          <form onSubmit={handleMockAuthSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-[9px] uppercase font-bold tracking-widest text-keep-muted font-keep-display">
                Hero Username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="e.g. Galahad"
                className="bg-black/60 border border-white/10 text-white rounded px-4 py-2.5 text-xs focus:outline-none focus:border-keep-primary/60 placeholder-white/30"
              />
            </div>

            {!isLogin && (
              <div className="flex flex-col gap-2 mt-1">
                <label className="text-[9px] uppercase font-bold tracking-widest text-keep-muted font-keep-display">
                  Select Guild Role Class
                </label>
                <div className="grid grid-cols-3 gap-2 text-xs font-bold uppercase tracking-wider">
                  {(['king', 'mage', 'knight'] as const).map((role) => (
                    <button
                      key={role}
                      type="button"
                      onClick={() => { playClick(); setSelectedClass(role); }}
                      className={`py-2 rounded border transition-all ${selectedClass === role ? 'border-keep-primary bg-keep-primary/5 text-keep-primary' : 'border-white/5 bg-black/40 text-keep-muted'}`}
                    >
                      {role}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <KeepButton type="submit" variant="primary" className="w-full mt-2 py-3">
              {isLogin ? 'Authorize Access' : 'Create Hero Charter'}
            </KeepButton>
          </form>
          <button 
            onClick={() => router.push('/')}
            className="text-[10px] uppercase font-bold text-keep-muted hover:text-white text-center hover:underline"
          >
            ← Return to Landing Slides
          </button>
        </GlassKeepPanel>
      </div>
    );
  }

  // Dashboard Stats Calculations
  const kingdomQuests = quests.filter(q => q.kingdomId === activeKingdom?.id);
  const completedCount = kingdomQuests.filter(q => q.status === 'done').length;
  const totalCount = kingdomQuests.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const tabNames: Record<TabType, string> = {
    dashboard: 'Command Keep Overview',
    board: 'Active Campaign Board',
    notifications: 'Scout Transmissions Logs',
    settings: 'Council Settings'
  };

  return (
    <div className="flex h-screen w-full bg-black text-white overflow-hidden">
      {/* Sidebar Navigation */}
      <KeepSidebar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Workspace Frame container */}
      <div className="flex-grow flex flex-col h-full overflow-hidden bg-cover bg-center" style={{ backgroundImage: `url(${getBgPath(activeKingdom?.themeId || 'medieval')})` }}>
        <div className="absolute inset-0 bg-black/65 pointer-events-none" />
        
        {/* Top Header Profile Stats Bar */}
        <KeepTopbar activeTabName={tabNames[activeTab]} />

        {/* Dynamic Scrollable Content area */}
        <main className="flex-grow overflow-y-auto p-6 z-10 no-scrollbar">
          {activeTab === 'dashboard' && activeKingdom && (
            <div className="flex flex-col gap-6 max-w-5xl mx-auto">
              
              {/* Raid Boss stats panel */}
              <BossPanel kingdom={activeKingdom} />

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                
                {/* Chronicles list timeline */}
                <div className="md:col-span-2">
                  <LogTimeline logs={logs} />
                </div>

                {/* Dashboard Stats panel card */}
                <div className="flex flex-col gap-6">
                  <GlassKeepPanel className="p-5 border border-white/5 bg-black/40 flex flex-col gap-4 h-full justify-between">
                    <h4 className="text-xs uppercase font-bold tracking-[0.2em] text-keep-primary font-keep-display border-b border-white/5 pb-2">
                      Realm Campaign Stats
                    </h4>

                    <div className="flex flex-col gap-4">
                      {/* Metric 1 */}
                      <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded">
                        <CheckSquare className="w-5 h-5 text-keep-accent shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-keep-muted">Quests Finished</span>
                          <span className="text-sm font-extrabold text-white">{completedCount} / {totalCount}</span>
                        </div>
                      </div>

                      {/* Metric 2 */}
                      <div className="flex items-center gap-3 bg-black/40 border border-white/5 p-3 rounded">
                        <Trophy className="w-5 h-5 text-keep-success shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-[10px] uppercase font-bold text-keep-muted">Campaign Level</span>
                          <span className="text-sm font-extrabold text-white">Lvl {activeKingdom.level}</span>
                        </div>
                      </div>
                    </div>

                    {/* Progress tracking gauge */}
                    <div className="flex flex-col gap-1.5 border-t border-white/5 pt-4 mt-2">
                      <div className="flex justify-between items-center text-[10px] font-bold uppercase tracking-wider text-keep-muted">
                        <span>Realm progress completed</span>
                        <span className="text-keep-success">{progressPercent}%</span>
                      </div>
                      <ProgressBar
                        value={completedCount}
                        max={totalCount || 1}
                        variant="success"
                        className="h-2"
                      />
                    </div>
                  </GlassKeepPanel>
                </div>

              </div>

            </div>
          )}

          {activeTab === 'board' && (
            <QuestBoard />
          )}

          {activeTab === 'notifications' && (
            <TransmissionsList />
          )}

          {activeTab === 'settings' && (
            <SettingsView />
          )}
        </main>
      </div>
    </div>
  );
}
export type DashboardPageType = typeof DashboardPage;
