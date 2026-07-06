import { MotionConstants } from './constants';

export const transitionVariants = {
  // Medieval: Ember Dissolve
  'ember-dissolve': {
    initial: { opacity: 0, filter: 'brightness(1.5)' },
    animate: { opacity: 1, filter: 'brightness(1)' },
    exit: { opacity: 0, filter: 'brightness(0.2)' },
    transition: { ease: MotionConstants.easings.emphasized, duration: 1 }
  },
  // Roman: Marble Dust Sweep
  'marble-sweep': {
    initial: { x: '100vw', opacity: 0 },
    animate: { x: 0, opacity: 1 },
    exit: { x: '-100vw', opacity: 0 },
    transition: { ease: MotionConstants.easings.standard, duration: 0.8 }
  },
  // Cyberpunk: RGB Glitch
  'rgb-glitch': {
    initial: { skewX: 0, opacity: 0, scale: 1.05 },
    animate: { skewX: 0, opacity: 1, scale: 1 },
    exit: { skewX: [0, 15, -15, 0], opacity: 0, scale: 0.95 },
    transition: { ease: MotionConstants.easings.exit, duration: 0.6 }
  },
  // Samurai: Ink Wipe
  'ink-wipe': {
    initial: { scale: 0, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.1, opacity: 0 },
    transition: { ease: MotionConstants.easings.smooth, duration: 0.9 }
  },
  // Robo: Mechanical Shutter
  'shutter-shudder': {
    initial: { scaleY: 0, opacity: 0 },
    animate: { scaleY: 1, opacity: 1 },
    exit: { scaleY: 0, opacity: 0 },
    transition: { ease: MotionConstants.easings.emphasized, duration: 0.75 }
  },
  // Blockcraft: Voxel Assemble
  'voxel-assemble': {
    initial: { scale: 0.8, opacity: 0 },
    animate: { scale: 1, opacity: 1 },
    exit: { scale: 1.2, opacity: 0 },
    transition: { ease: MotionConstants.easings.entrance, duration: 1.1 }
  }
};
