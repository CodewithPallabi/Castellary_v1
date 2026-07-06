import { Kingdom, Quest, CampaignLog, Transmission, HeroProfile } from '@/types';

export const initialHeroProfile: HeroProfile = {
  username: 'Galahad',
  heroClass: 'knight',
  level: 1,
  xp: 0,
  joinedAt: new Date().toISOString(),
};

export const initialKingdoms: Kingdom[] = [
  {
    id: 'kingdom-midgard',
    name: 'Keep of Midgard',
    description: 'The ancient capital of the default realm, besieged by volcanic forces.',
    themeId: 'medieval',
    level: 1,
    xp: 0,
    health: 100,
    boss: {
      name: 'The Volcanic Devil King',
      description: 'A colossal demon king rising from the depths of Mount Doom.',
      maxHp: 100,
      currentHp: 100,
      phase: 1,
      difficulty: 'Hard'
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'kingdom-rome',
    name: 'Colosseum of Roma',
    description: 'The imperial center of stone and discipline, under trial by the Tyrant.',
    themeId: 'roman',
    level: 1,
    xp: 0,
    health: 100,
    boss: {
      name: 'The Tyrant Emperor',
      description: 'A corrupt Caesar wielding dark administrative magic.',
      maxHp: 100,
      currentHp: 100,
      phase: 1,
      difficulty: 'Medium'
    },
    createdAt: new Date().toISOString(),
  },
  {
    id: 'kingdom-neon',
    name: 'Neo-Tokyo Mainframe',
    description: 'A neon-lit cyber grid controlled by a rogue intelligence.',
    themeId: 'cyberpunk',
    level: 1,
    xp: 0,
    health: 100,
    boss: {
      name: 'Rogue AI Overlord',
      description: 'A corrupted supercomputer core consuming all system resources.',
      maxHp: 100,
      currentHp: 100,
      phase: 1,
      difficulty: 'Legendary'
    },
    createdAt: new Date().toISOString(),
  }
];

export const initialQuests: Quest[] = [
  // Midgard Quests
  {
    id: 'quest-midgard-1',
    title: 'Forge the Dragonblade',
    description: 'Smelt the golden core ore and shape the blade at the royal anvil.',
    status: 'todo',
    difficulty: 'hard',
    priority: 'high',
    deadline: new Date(Date.now() + 86400000 * 2).toISOString(),
    estimatedHours: 8,
    xpReward: 60,
    ownerClass: 'knight',
    kingdomId: 'kingdom-midgard',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-midgard-2',
    title: 'Draft the Royal Treaty',
    description: 'Negotiate trade boundaries and write the alliance charter scroll.',
    status: 'inprogress',
    difficulty: 'medium',
    priority: 'medium',
    deadline: new Date(Date.now() + 86400000 * 4).toISOString(),
    estimatedHours: 4,
    xpReward: 30,
    ownerClass: 'mage',
    kingdomId: 'kingdom-midgard',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-midgard-3',
    title: 'Survey the Outpost Gates',
    description: 'Inspect the eastern wall structures for structural fissures.',
    status: 'done',
    difficulty: 'easy',
    priority: 'low',
    deadline: new Date(Date.now() - 86400000).toISOString(),
    estimatedHours: 2,
    xpReward: 15,
    ownerClass: 'king',
    kingdomId: 'kingdom-midgard',
    createdAt: new Date().toISOString(),
    completedAt: new Date().toISOString(),
  },
  // Roma Quests
  {
    id: 'quest-roma-1',
    title: 'Reinforce Senate Pillars',
    description: 'Carve white marble slabs to repair the structural columns.',
    status: 'todo',
    difficulty: 'medium',
    priority: 'high',
    deadline: new Date(Date.now() + 86400000 * 3).toISOString(),
    estimatedHours: 5,
    xpReward: 30,
    ownerClass: 'knight',
    kingdomId: 'kingdom-rome',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'quest-roma-2',
    title: 'Pave the Appian Way',
    description: 'Organize the legions to place cobble stone paths to the eastern gates.',
    status: 'inprogress',
    difficulty: 'hard',
    priority: 'medium',
    deadline: new Date(Date.now() + 86400000 * 5).toISOString(),
    estimatedHours: 10,
    xpReward: 60,
    ownerClass: 'king',
    kingdomId: 'kingdom-rome',
    createdAt: new Date().toISOString(),
  },
  // Cyberpunk Quests
  {
    id: 'quest-cyber-1',
    title: 'Decrypt Mainframe Packets',
    description: 'Inject decrypt codes into the rogue memory sector database.',
    status: 'todo',
    difficulty: 'legendary',
    priority: 'critical',
    deadline: new Date(Date.now() + 86400000).toISOString(),
    estimatedHours: 12,
    xpReward: 120,
    ownerClass: 'mage',
    kingdomId: 'kingdom-neon',
    createdAt: new Date().toISOString(),
  }
];

export const initialCampaignLogs: CampaignLog[] = [
  {
    id: 'log-1',
    type: 'quest_created',
    message: 'Galahad initiated the quest: Forge the Dragonblade.',
    timestamp: new Date(Date.now() - 3600000 * 2).toISOString(),
    kingdomId: 'kingdom-midgard',
  },
  {
    id: 'log-2',
    type: 'quest_completed',
    message: 'The Outpost Gates survey is complete. The Devil King lost 5 HP.',
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    kingdomId: 'kingdom-midgard',
  }
];

export const initialTransmissions: Transmission[] = [
  {
    id: 'alert-1',
    message: 'The Volcanic Devil King is preparing a flame burst. Complete quests to defend!',
    type: 'threat',
    timestamp: new Date().toISOString(),
    read: false,
  },
  {
    id: 'alert-2',
    message: 'Welcome to the Keep, Galahad. Choose a quest and lead your party to victory.',
    type: 'alert',
    timestamp: new Date(Date.now() - 100000).toISOString(),
    read: false,
  }
];
