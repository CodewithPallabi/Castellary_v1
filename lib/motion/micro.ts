import { MotionConstants } from './constants';

export const MicroAnimations = {
  breath: {
    animate: {
      y: [0, -10, 0],
    },
    transition: {
      duration: 4,
      ease: MotionConstants.easings.smooth,
      repeat: Infinity,
    }
  },
  pulseGlow: {
    animate: {
      opacity: [0.6, 1, 0.6],
    },
    transition: {
      duration: 2.5,
      ease: MotionConstants.easings.standard,
      repeat: Infinity,
    }
  },
  buttonHover: {
    scale: 1.05,
    transition: { duration: MotionConstants.durations.fast, ease: MotionConstants.easings.entrance }
  },
  buttonTap: {
    scale: 0.95
  },
  cardHover: {
    y: -4,
    boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
    transition: { duration: MotionConstants.durations.fast, ease: MotionConstants.easings.standard }
  }
};
