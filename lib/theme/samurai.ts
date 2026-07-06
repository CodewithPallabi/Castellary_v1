import { ThemeConfig } from './index';

export const samuraiTheme: ThemeConfig = {
  id: 'samurai',
  name: 'Samurai Clan',
  displayFont: '--font-keep-samurai-display',
  quote: 'The shōgun rewards resolve, not excuses.',
  cta: 'Enter the Clan',
  palette: {
    primary: '#E0115F',       // Vermilion / Crimson Red
    secondary: '#1A1A1A',     // Ink Black
    accent: '#FFB7C5',        // Sakura Pink
    success: '#00A86B',       // Jade Green
    danger: '#C8102E',        // Scarlet Red
    background: '#0D0C0B',    // Ink Wash Charcoal
    foreground: '#F5F5DC',    // Rice Paper Cream
    muted: '#6E6A64',         // Bamboo Ash
    border: 'rgba(224, 17, 95, 0.2)', // Vermilion Border
    overlay: 'rgba(8, 7, 7, 0.9)',
    glass: 'rgba(18, 16, 15, 0.6)'
  },
  particles: {
    type: 'petals',
    color: '#FFB7C5',
    density: 25
  },
  audio: {
    ambientLoop: '/themes/samurai/audio/ambient.mp3'
  },
  transitions: {
    type: 'ink-wipe',
    duration: 900
  },
  motionProfile: {
    easing: [0.4, 0, 0.2, 1],
    durationScale: 0.95
  }
};
