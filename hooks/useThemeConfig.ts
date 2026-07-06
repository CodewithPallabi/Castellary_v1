"use client";

import { useRealmTheme } from '@/context/RealmThemeContext';
import { ThemeConfig } from '@/lib/theme';
import { AssetRegistry } from '@/lib/asset';

export function useThemeConfig() {
  const { activeThemeId, theme, setTheme } = useRealmTheme();

  // Helper to dynamically resolve asset URLs
  const getAsset = (key: string): string => {
    return AssetRegistry.resolve(activeThemeId, key);
  };

  return {
    themeId: activeThemeId,
    theme,
    setTheme,
    getAsset,
  };
}
export type UseThemeConfigType = typeof useThemeConfig;
