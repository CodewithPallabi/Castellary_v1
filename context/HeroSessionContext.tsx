"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { HeroProfile, HeroClass } from '@/types';
import { initializeMockDatabase } from '@/lib/mock/seed';

interface HeroSessionContextType {
  profile: HeroProfile | null;
  isAuthenticated: boolean;
  login: (username: string) => boolean;
  signup: (username: string, heroClass: HeroClass) => void;
  logout: () => void;
  gainXp: (amount: number) => void;
}

const HeroSessionContext = createContext<HeroSessionContextType | undefined>(undefined);

export function HeroSessionProvider({ children }: { children: React.ReactNode }) {
  const [profile, setProfile] = useState<HeroProfile | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const data = initializeMockDatabase();
    if (data && data.user) {
      // For mock ease, we look up if a session key exists
      const session = localStorage.getItem('castellary_active_session');
      if (session) {
        setProfile(data.user);
        setIsAuthenticated(true);
      }
    }
  }, []);

  const login = (username: string): boolean => {
    if (typeof window === 'undefined') return false;
    const stored = localStorage.getItem('castellary_hero_profile');
    if (stored) {
      const parsed = JSON.parse(stored) as HeroProfile;
      if (parsed.username.toLowerCase() === username.toLowerCase()) {
        setProfile(parsed);
        setIsAuthenticated(true);
        localStorage.setItem('castellary_active_session', username);
        return true;
      }
    }
    return false;
  };

  const signup = (username: string, heroClass: HeroClass) => {
    if (typeof window === 'undefined') return;
    const newProfile: HeroProfile = {
      username,
      heroClass,
      level: 1,
      xp: 0,
      joinedAt: new Date().toISOString()
    };
    setProfile(newProfile);
    setIsAuthenticated(true);
    localStorage.setItem('castellary_hero_profile', JSON.stringify(newProfile));
    localStorage.setItem('castellary_active_session', username);
  };

  const logout = () => {
    if (typeof window === 'undefined') return;
    setProfile(null);
    setIsAuthenticated(false);
    localStorage.removeItem('castellary_active_session');
  };

  const gainXp = (amount: number) => {
    setProfile(prev => {
      if (!prev) return null;
      let nextXp = prev.xp + amount;
      let nextLevel = prev.level;
      let xpNeeded = nextLevel * 100; // standard constant threshold scale
      
      while (nextXp >= xpNeeded) {
        nextXp -= xpNeeded;
        nextLevel += 1;
        xpNeeded = nextLevel * 100;
      }

      const updated = { ...prev, level: nextLevel, xp: nextXp };
      localStorage.setItem('castellary_hero_profile', JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <HeroSessionContext.Provider value={{ profile, isAuthenticated, login, signup, logout, gainXp }}>
      {children}
    </HeroSessionContext.Provider>
  );
}

export function useHeroSession() {
  const context = useContext(HeroSessionContext);
  if (!context) {
    throw new Error('useHeroSession must be used within a HeroSessionProvider');
  }
  return context;
}
