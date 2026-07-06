"use client";

import { AudioEngine } from '@/services/audio/Engine';
import { CivilizationId } from '@/types';

export function useAudioController() {
  const playClick = () => {
    AudioEngine.playSFX('click');
  };

  const playHover = () => {
    AudioEngine.playSFX('hover');
  };

  const playDamage = () => {
    AudioEngine.playSFX('damage');
  };

  const playVictory = () => {
    AudioEngine.playSFX('victory');
  };

  const playAmbient = (themeId: CivilizationId) => {
    AudioEngine.playAmbient(themeId);
  };

  const stopAmbient = () => {
    AudioEngine.stopAmbient();
  };

  return {
    playClick,
    playHover,
    playDamage,
    playVictory,
    playAmbient,
    stopAmbient,
  };
}
