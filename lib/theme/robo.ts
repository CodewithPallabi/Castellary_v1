import { ThemeConfig } from './index';

export const roboTheme: ThemeConfig = {
  id: 'robo',
  name: 'Robo Frontier',
  displayFont: '--font-keep-robo-display',
  quote: 'Precision defeats repetition.',
  cta: 'Initialize Command',
  palette: {
    primary: '#4682B4',       // Steel Blue
    secondary: '#FF7F50',     // Warning Orange
    accent: '#00FFFF',        // Electric Cyan
    success: '#3CB371',       // Medium Sea Green
    danger: '#FF4500',        // Orange Red
    background: '#181A1F',    // Dark Graphite Industrial
    foreground: '#D3D3D3',    // Light Steel Gray
    muted: '#5A606E',         // Dark Slate Gray
    border: 'rgba(70, 130, 180, 0.25)', // Steel Border
    overlay: 'rgba(12, 14, 17, 0.88)',
    glass: 'rgba(24, 26, 31, 0.65)'
  },
  particles: {
    type: 'steam',
    color: '#E6E6FA',
    density: 35
  },
  audio: {
    ambientLoop: '/themes/robo/audio/ambient.mp3'
  },
  transitions: {
    type: 'shutter-shudder',
    duration: 750
  },
  motionProfile: {
    easing: [0.85, 0, 0.15, 1],
    durationScale: 0.8
  }
};
