"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Kingdom, Quest, CampaignLog, Transmission, CivilizationId, QuestDifficulty, QuestPriority, QuestStatus, HeroClass } from '@/types';
import { useHeroSession } from './HeroSessionContext';
import { GlobalConstants } from '@/lib/constants';
import { initializeMockDatabase } from '@/lib/mock/seed';
import confetti from 'canvas-confetti';

interface KingdomCampaignContextType {
  kingdoms: Kingdom[];
  activeKingdom: Kingdom | null;
  quests: Quest[];
  logs: CampaignLog[];
  transmissions: Transmission[];
  selectKingdom: (id: string) => void;
  createKingdom: (name: string, description: string, themeId: CivilizationId) => void;
  deleteKingdom: (id: string) => void;
  addQuest: (questData: {
    title: string;
    description: string;
    difficulty: QuestDifficulty;
    priority: QuestPriority;
    deadline: string;
    estimatedHours: number;
    ownerClass: HeroClass;
  }) => void;
  deleteQuest: (id: string) => void;
  updateQuestStatus: (id: string, status: QuestStatus) => void;
  readTransmission: (id: string) => void;
}

const KingdomCampaignContext = createContext<KingdomCampaignContextType | undefined>(undefined);

export function KingdomCampaignProvider({ children }: { children: React.ReactNode }) {
  const { gainXp } = useHeroSession();
  const [kingdoms, setKingdoms] = useState<Kingdom[]>([]);
  const [activeKingdom, setActiveKingdom] = useState<Kingdom | null>(null);
  const [quests, setQuests] = useState<Quest[]>([]);
  const [logs, setLogs] = useState<CampaignLog[]>([]);
  const [transmissions, setTransmissions] = useState<Transmission[]>([]);

  useEffect(() => {
    const data = initializeMockDatabase();
    if (data) {
      setKingdoms(data.kingdoms);
      setQuests(data.quests);
      setLogs(data.logs);
      setTransmissions(data.alerts);
      
      const storedActiveId = localStorage.getItem('castellary_active_kingdom_id');
      const active = data.kingdoms.find((k: Kingdom) => k.id === storedActiveId) || data.kingdoms[0] || null;
      setActiveKingdom(active);
      if (active) {
        localStorage.setItem('castellary_active_kingdom_id', active.id);
      }
    }
  }, []);

  const selectKingdom = (id: string) => {
    const active = kingdoms.find(k => k.id === id) || null;
    setActiveKingdom(active);
    if (active) {
      localStorage.setItem('castellary_active_kingdom_id', active.id);
    }
  };

  const createKingdom = (name: string, description: string, themeId: CivilizationId) => {
    const newKingdom: Kingdom = {
      id: `kingdom-${Date.now()}`,
      name,
      description,
      themeId,
      level: 1,
      xp: 0,
      health: 100,
      boss: {
        name: `Overlord of ${name}`,
        description: `The guardian monster of the ${themeId} landscape.`,
        maxHp: 100,
        currentHp: 100,
        phase: 1,
        difficulty: 'Medium'
      },
      createdAt: new Date().toISOString()
    };
    const updatedKingdoms = [...kingdoms, newKingdom];
    setKingdoms(updatedKingdoms);
    localStorage.setItem('castellary_kingdoms', JSON.stringify(updatedKingdoms));
    setActiveKingdom(newKingdom);
    localStorage.setItem('castellary_active_kingdom_id', newKingdom.id);
  };

  const deleteKingdom = (id: string) => {
    const updated = kingdoms.filter(k => k.id !== id);
    setKingdoms(updated);
    localStorage.setItem('castellary_kingdoms', JSON.stringify(updated));
    if (activeKingdom?.id === id) {
      const nextActive = updated[0] || null;
      setActiveKingdom(nextActive);
      if (nextActive) {
        localStorage.setItem('castellary_active_kingdom_id', nextActive.id);
      } else {
        localStorage.removeItem('castellary_active_kingdom_id');
      }
    }
  };

  const addQuest = (questData: {
    title: string;
    description: string;
    difficulty: QuestDifficulty;
    priority: QuestPriority;
    deadline: string;
    estimatedHours: number;
    ownerClass: HeroClass;
  }) => {
    if (!activeKingdom) return;
    const xpReward = GlobalConstants.quests.xpRewards[questData.difficulty];
    const newQuest: Quest = {
      id: `quest-${Date.now()}`,
      ...questData,
      status: 'todo',
      xpReward,
      kingdomId: activeKingdom.id,
      createdAt: new Date().toISOString()
    };
    const updatedQuests = [...quests, newQuest];
    setQuests(updatedQuests);
    localStorage.setItem('castellary_quests', JSON.stringify(updatedQuests));

    // Log the event
    const newLog: CampaignLog = {
      id: `log-${Date.now()}`,
      type: 'quest_created',
      message: `A new quest [${questData.title}] has been added to the scroll.`,
      timestamp: new Date().toISOString(),
      kingdomId: activeKingdom.id
    };
    const updatedLogs = [newLog, ...logs];
    setLogs(updatedLogs);
    localStorage.setItem('castellary_campaign_logs', JSON.stringify(updatedLogs));
  };

  const deleteQuest = (id: string) => {
    const updated = quests.filter(q => q.id !== id);
    setQuests(updated);
    localStorage.setItem('castellary_quests', JSON.stringify(updated));
  };

  const updateQuestStatus = (id: string, status: QuestStatus) => {
    if (!activeKingdom) return;
    let xpGained = 0;
    let damageDealt = 0;
    let questTitle = '';

    const updatedQuests = quests.map(q => {
      if (q.id === id) {
        questTitle = q.title;
        const prevStatus = q.status;
        if (prevStatus !== 'done' && status === 'done') {
          // Quest is completed!
          xpGained = q.xpReward;
          damageDealt = GlobalConstants.quests.damageWeights[q.difficulty];
          return { ...q, status, completedAt: new Date().toISOString() };
        }
        return { ...q, status };
      }
      return q;
    });

    setQuests(updatedQuests);
    localStorage.setItem('castellary_quests', JSON.stringify(updatedQuests));

    if (xpGained > 0 && activeKingdom) {
      // Trigger celebrate confetti
      confetti({ particleCount: 80, spread: 60, origin: { y: 0.75 } });

      // Award XP to the active hero
      gainXp(xpGained);

      // Deal damage to active boss
      const nextHp = Math.max(0, activeKingdom.boss.currentHp - damageDealt);
      const isDefeated = nextHp === 0;

      const updatedKingdoms = kingdoms.map(k => {
        if (k.id === activeKingdom.id) {
          return {
            ...k,
            boss: {
              ...k.boss,
              currentHp: nextHp,
              phase: isDefeated ? 0 : nextHp <= 50 ? 2 : 1
            }
          };
        }
        return k;
      });

      setKingdoms(updatedKingdoms);
      localStorage.setItem('castellary_kingdoms', JSON.stringify(updatedKingdoms));
      setActiveKingdom(updatedKingdoms.find(k => k.id === activeKingdom.id) || null);

      // Create Logs
      const compLog: CampaignLog = {
        id: `log-${Date.now()}-comp`,
        type: 'quest_completed',
        message: `Quest [${questTitle}] completed! Gained ${xpGained} XP.`,
        timestamp: new Date().toISOString(),
        kingdomId: activeKingdom.id
      };

      const bossLog: CampaignLog = {
        id: `log-${Date.now()}-boss`,
        type: 'boss_damaged',
        message: `${activeKingdom.boss.name} took ${damageDealt} damage! ${isDefeated ? 'The boss is defeated!' : `HP remaining: ${nextHp}/100`}`,
        timestamp: new Date().toISOString(),
        kingdomId: activeKingdom.id
      };

      const updatedLogs = [compLog, bossLog, ...logs];
      setLogs(updatedLogs);
      localStorage.setItem('castellary_campaign_logs', JSON.stringify(updatedLogs));

      // Trigger transmission alert
      const newAlert: Transmission = {
        id: `alert-${Date.now()}`,
        message: isDefeated 
          ? `VICTORY! The ${activeKingdom.boss.name} has been vanquished. Cleanse the Keep!` 
          : `The boss took damage! Hit for ${damageDealt} points.`,
        type: isDefeated ? 'success' : 'alert',
        timestamp: new Date().toISOString(),
        read: false
      };
      const updatedAlerts = [newAlert, ...transmissions];
      setTransmissions(updatedAlerts);
      localStorage.setItem('castellary_transmissions', JSON.stringify(updatedAlerts));
    }
  };

  const readTransmission = (id: string) => {
    const updated = transmissions.map(t => t.id === id ? { ...t, read: true } : t);
    setTransmissions(updated);
    localStorage.setItem('castellary_transmissions', JSON.stringify(updated));
  };

  return (
    <KingdomCampaignContext.Provider value={{
      kingdoms,
      activeKingdom,
      quests,
      logs: logs.filter(l => l.kingdomId === activeKingdom?.id),
      transmissions,
      selectKingdom,
      createKingdom,
      deleteKingdom,
      addQuest,
      deleteQuest,
      updateQuestStatus,
      readTransmission
    }}>
      {children}
    </KingdomCampaignContext.Provider>
  );
}

export function useKingdomCampaign() {
  const context = useContext(KingdomCampaignContext);
  if (!context) {
    throw new Error('useKingdomCampaign must be used within a KingdomCampaignProvider');
  }
  return context;
}
