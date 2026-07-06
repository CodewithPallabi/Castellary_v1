import {
  initialHeroProfile,
  initialKingdoms,
  initialQuests,
  initialCampaignLogs,
  initialTransmissions
} from './database';

export function initializeMockDatabase() {
  if (typeof window === 'undefined') return;

  const getOrSet = <T>(key: string, defaultValue: T): T => {
    const existing = localStorage.getItem(key);
    if (!existing) {
      localStorage.setItem(key, JSON.stringify(defaultValue));
      return defaultValue;
    }
    return JSON.parse(existing) as T;
  };

  const user = getOrSet('castellary_hero_profile', initialHeroProfile);
  const kingdoms = getOrSet('castellary_kingdoms', initialKingdoms);
  const quests = getOrSet('castellary_quests', initialQuests);
  const logs = getOrSet('castellary_campaign_logs', initialCampaignLogs);
  const alerts = getOrSet('castellary_transmissions', initialTransmissions);

  return {
    user,
    kingdoms,
    quests,
    logs,
    alerts
  };
}

export function resetMockDatabase() {
  if (typeof window === 'undefined') return;
  localStorage.removeItem('castellary_hero_profile');
  localStorage.removeItem('castellary_kingdoms');
  localStorage.removeItem('castellary_quests');
  localStorage.removeItem('castellary_campaign_logs');
  localStorage.removeItem('castellary_transmissions');
  return initializeMockDatabase();
}
