/**
 * Service Stub: Supabase SDK Wrapper
 * Target: Round 2 Database Synchronizations
 */
import { Kingdom, Quest } from '@/types';
import { FeatureFlags } from '../flags';

export class SupabaseService {
  static async getKingdoms(): Promise<Kingdom[]> {
    if (!FeatureFlags.enableSupabaseDB) {
      // Fetch from local mock list
      return [];
    }
    // Real Supabase Client logic goes here
    return [];
  }

  static async getQuests(kingdomId: string): Promise<Quest[]> {
    if (!FeatureFlags.enableSupabaseDB) {
      return [];
    }
    return [];
  }

  static async updateQuestStatus(questId: string, status: Quest['status']): Promise<void> {
    if (!FeatureFlags.enableSupabaseDB) return;
  }

  static subscribeToBoardUpdates(kingdomId: string, callback: (payload: any) => void): () => void {
    if (!FeatureFlags.enableRealtimeSync) return () => {};
    // Real listener subscription
    return () => {};
  }
}
