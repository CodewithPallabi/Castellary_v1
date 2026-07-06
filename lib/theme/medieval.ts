import { ThemeConfig } from './index';

export const medievalTheme: ThemeConfig = {
  id: 'medieval',
  name: 'Medieval Kingdom',
  displayFont: '--font-keep-medieval-display',
  quote: 'The crown is heavy. So is your backlog.',
  cta: 'Enter the Kingdom',
  palette: {
    primary: '#D4AF37',       // Royal Gold
    secondary: '#8B0000',     // Dark Crimson
    accent: '#FF8C00',        // Warm Amber
    success: '#228B22',       // Forest Green
    danger: '#B22222',        // Crimson Red
    background: '#121212',    // Deep Charcoal
    foreground: '#E0E0E0',    // Soft Parchment White
    muted: '#8A8A8A',         // Muted Stone Gray
    border: 'rgba(212, 175, 55, 0.2)', // Faint Golden Border
    overlay: 'rgba(10, 10, 10, 0.85)',
    glass: 'rgba(20, 20, 20, 0.6)'
  },
  particles: {
    type: 'embers',
    color: '#FF4500',
    density: 40
  },
  audio: {
    ambientLoop: '/themes/medieval/audio/ambient.mp3'
  },
  transitions: {
    type: 'ember-dissolve',
    duration: 1000
  },
  motionProfile: {
    easing: [0.85, 0, 0.15, 1],
    durationScale: 1
  }
};
