export type CivilizationId = 'medieval' | 'roman' | 'cyberpunk' | 'samurai' | 'robo' | 'blockcraft';
export type HeroClass = 'king' | 'mage' | 'knight';
export type QuestDifficulty = 'easy' | 'medium' | 'hard' | 'legendary';
export type QuestPriority = 'low' | 'medium' | 'high' | 'critical';
export type QuestStatus = 'todo' | 'inprogress' | 'done';

export interface HeroProfile {
  username: string;
  heroClass: HeroClass;
  level: number;
  xp: number;
  joinedAt: string;
}

export interface Quest {
  id: string;
  title: string;
  description: string;
  status: QuestStatus;
  difficulty: QuestDifficulty;
  priority: QuestPriority;
  deadline: string; // ISO Date String
  estimatedHours: number;
  xpReward: number;
  ownerClass: HeroClass;
  kingdomId: string;
  createdAt: string;
  completedAt?: string;
}

export interface Boss {
  name: string;
  description: string;
  maxHp: number;
  currentHp: number;
  phase: number;
  difficulty: string;
}

export interface Kingdom {
  id: string;
  name: string;
  description: string;
  themeId: CivilizationId;
  level: number;
  xp: number;
  health: number;
  boss: Boss;
  createdAt: string;
}

export interface CampaignLog {
  id: string;
  type: 'quest_created' | 'quest_moved' | 'quest_completed' | 'boss_damaged' | 'boss_healed' | 'level_up' | 'kingdom_damage';
  message: string;
  timestamp: string;
  kingdomId: string;
}

export interface Transmission {
  id: string;
  message: string;
  type: 'alert' | 'success' | 'threat';
  timestamp: string;
  read: boolean;
}
