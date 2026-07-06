import { ThemeConfig } from './index';

export const cyberpunkTheme: ThemeConfig = {
  id: 'cyberpunk',
  name: 'Cyberpunk City',
  displayFont: '--font-keep-cyberpunk-display',
  quote: 'Only optimized teams survive the system.',
  cta: 'Access the Network',
  palette: {
    primary: '#00F0FF',       // Neon Cyan
    secondary: '#FF007F',     // Hot Pink/Magenta
    accent: '#BD00FF',        // Electric Purple
    success: '#39FF14',       // Neon Lime
    danger: '#FF3131',        // Neon Red
    background: '#08080E',    // Synthesizer Black
    foreground: '#00F0FF',    // Cyan HUD Text
    muted: '#5271FF',         // Electric Blue Muted
    border: 'rgba(0, 240, 255, 0.25)', // Cyan Grid Border
    overlay: 'rgba(5, 5, 8, 0.9)',
    glass: 'rgba(10, 10, 20, 0.55)'
  },
  particles: {
    type: 'pixels',
    color: '#00F0FF',
    density: 50
  },
  audio: {
    ambientLoop: '/themes/cyberpunk/audio/ambient.mp3'
  },
  transitions: {
    type: 'rgb-glitch',
    duration: 600
  },
  motionProfile: {
    easing: [0.85, 0, 0.15, 1],
    durationScale: 0.7
  }
};
