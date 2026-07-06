"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { CivilizationId } from '@/types';
import {
  ThemeConfig,
  medievalTheme,
  romeTheme,
  cyberpunkTheme,
  samuraiTheme,
  roboTheme,
  blockcraftTheme,
  applyThemeVariables
} from '@/lib/theme';

interface RealmThemeContextType {
  activeThemeId: CivilizationId;
  theme: ThemeConfig;
  setTheme: (id: CivilizationId) => void;
}

const themeMap: Record<CivilizationId, ThemeConfig> = {
  medieval: medievalTheme,
  roman: romeTheme,
  cyberpunk: cyberpunkTheme,
  samurai: samuraiTheme,
  robo: roboTheme,
  blockcraft: blockcraftTheme
};

const RealmThemeContext = createContext<RealmThemeContextType | undefined>(undefined);

export function RealmThemeProvider({ children }: { children: React.ReactNode }) {
  const [activeThemeId, setActiveThemeId] = useState<CivilizationId>('medieval');
  const [theme, setThemeState] = useState<ThemeConfig>(medievalTheme);

  const setTheme = (id: CivilizationId) => {
    const nextTheme = themeMap[id];
    if (nextTheme) {
      setActiveThemeId(id);
      setThemeState(nextTheme);
      applyThemeVariables(nextTheme);
      if (typeof window !== 'undefined') {
        localStorage.setItem('castellary_active_theme_id', id);
      }
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedId = localStorage.getItem('castellary_active_theme_id') as CivilizationId;
      if (storedId && themeMap[storedId]) {
        setTheme(storedId);
      } else {
        applyThemeVariables(medievalTheme);
      }
    }
  }, []);

  return (
    <RealmThemeContext.Provider value={{ activeThemeId, theme, setTheme }}>
      {children}
    </RealmThemeContext.Provider>
  );
}

export function useRealmTheme() {
  const context = useContext(RealmThemeContext);
  if (!context) {
    throw new Error('useRealmTheme must be used within a RealmThemeProvider');
  }
  return context;
}
