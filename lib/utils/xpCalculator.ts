import { GlobalConstants } from '../constants';

export function getXpRequiredForLevel(level: number): number {
  return level * GlobalConstants.levels.baseXpRequired;
}

export function calculateLevelAndXp(currentLevel: number, currentXp: number, xpGained: number) {
  let xp = currentXp + xpGained;
  let level = currentLevel;
  let xpNeeded = getXpRequiredForLevel(level);

  while (xp >= xpNeeded) {
    xp -= xpNeeded;
    level += 1;
    xpNeeded = getXpRequiredForLevel(level);
  }

  return { level, xp };
}
