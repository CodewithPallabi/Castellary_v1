import { ThemeConfig } from './index';

export const romeTheme: ThemeConfig = {
  id: 'roman',
  name: 'Roman Empire',
  displayFont: '--font-keep-rome-display',
  quote: 'Fortune favors the disciplined.',
  cta: 'March Forward',
  palette: {
    primary: '#E5D3B3',       // Ivory Marble
    secondary: '#800020',     // Imperial Burgundy
    accent: '#CD7F32',        // Antique Bronze
    success: '#556B2F',       // Olive Green
    danger: '#8B0000',        // Blood Red
    background: '#151412',    // Dark Travertine Slate
    foreground: '#ECE5D8',    // Soft Alabaster
    muted: '#7E766B',         // Dust Gray
    border: 'rgba(229, 211, 179, 0.25)', // Ivory Border
    overlay: 'rgba(15, 14, 12, 0.85)',
    glass: 'rgba(25, 23, 20, 0.65)'
  },
  particles: {
    type: 'dust',
    color: '#D2B48C',
    density: 30
  },
  audio: {
    ambientLoop: '/themes/roman/audio/ambient.mp3'
  },
  transitions: {
    type: 'marble-sweep',
    duration: 800
  },
  motionProfile: {
    easing: [0.25, 0.1, 0.25, 1],
    durationScale: 0.9
  }
};
