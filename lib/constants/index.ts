import { QuestDifficulty } from '@/types';

export const GlobalConstants = {
  levels: {
    baseXpRequired: 100,
    multiplier: 1.5,
  },
  kingdom: {
    maxHealth: 100,
    defaultBossHealth: 100,
  },
  quests: {
    xpRewards: {
      easy: 15,
      medium: 30,
      hard: 60,
      legendary: 120
    } as Record<QuestDifficulty, number>,
    damageWeights: {
      easy: 5,
      medium: 10,
      hard: 25,
      legendary: 50
    } as Record<QuestDifficulty, number>
  }
};
