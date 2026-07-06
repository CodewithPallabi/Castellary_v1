import { ThemeConfig } from './index';

export const blockcraftTheme: ThemeConfig = {
  id: 'blockcraft',
  name: 'Blockcraft World',
  displayFont: '--font-keep-blockcraft-display',
  quote: 'Build together. Conquer together.',
  cta: 'Begin Building',
  palette: {
    primary: '#4A5D4E',       // Oak Leaves Green
    secondary: '#5C4033',     // Oak Wood Brown
    accent: '#50C878',        // Emerald Green
    success: '#00A86B',       // Pixel Emerald
    danger: '#FF2400',        // Lava Red
    background: '#1A1C19',    // Deep Stone Gray
    foreground: '#FFFFFF',    // Crisp White
    muted: '#7F8C8D',         // Cobblestone Gray
    border: 'rgba(80, 200, 120, 0.25)', // Emerald Outline
    overlay: 'rgba(10, 11, 10, 0.9)',
    glass: 'rgba(26, 28, 25, 0.6)'
  },
  particles: {
    type: 'pixels',
    color: '#32CD32',
    density: 30
  },
  audio: {
    ambientLoop: '/themes/blockcraft/audio/ambient.mp3'
  },
  transitions: {
    type: 'voxel-assemble',
    duration: 1100
  },
  motionProfile: {
    easing: [0.25, 0.1, 0.25, 1],
    durationScale: 1.1
  }
};
