import { CivilizationId } from '@/types';

export interface ThemeConfig {
  id: CivilizationId;
  name: string;
  displayFont: string;
  quote: string;
  cta: string;
  palette: {
    primary: string;
    secondary: string;
    accent: string;
    success: string;
    danger: string;
    background: string;
    foreground: string;
    muted: string;
    border: string;
    overlay: string;
    glass: string;
  };
  particles: {
    type: 'embers' | 'dust' | 'pixels' | 'petals' | 'steam';
    color: string;
    density: number;
  };
  audio: {
    ambientLoop: string;
  };
  transitions: {
    type: 'ember-dissolve' | 'marble-sweep' | 'rgb-glitch' | 'ink-wipe' | 'shutter-shudder' | 'voxel-assemble';
    duration: number;
  };
  motionProfile: {
    easing: number[];
    durationScale: number;
  };
}

export { medievalTheme } from './medieval';
export { romeTheme } from './rome';
export { cyberpunkTheme } from './cyberpunk';
export { samuraiTheme } from './samurai';
export { roboTheme } from './robo';
export { blockcraftTheme } from './blockcraft';
export { applyThemeVariables } from './resolver';
export { DesignTokens } from './tokens';
