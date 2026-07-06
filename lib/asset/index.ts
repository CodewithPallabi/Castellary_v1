import { CivilizationId } from '@/types';

export const AssetRegistry = {
  logo: {
    crest: '/logo/crest.png',
    wordmark: '/logo/crest.png'
  },
  audio: {
    hover: '/audio/hover.wav',
    click: '/audio/click.wav',
    victory: '/audio/victory.mp3',
    damage: '/audio/damage.mp3'
  },
  resolve(themeId: CivilizationId, assetKey: string): string {
    // Converts key sequence 'boss.main' into '/themes/[themeId]/boss/main.webp'
    const path = assetKey.replace(/\./g, '/');
    return `/themes/${themeId}/${path}.png`;
  }
};
export type AssetRegistryType = typeof AssetRegistry;
