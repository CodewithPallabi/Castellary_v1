type BezierEasing = [number, number, number, number];

export const MotionConstants = {
  durations: {
    instant: 0,
    fast: 0.15,
    normal: 0.3,
    slow: 0.5,
    verySlow: 0.8,
    cinematic: 1.2
  },
  easings: {
    standard: [0.25, 0.1, 0.25, 1] as BezierEasing,
    smooth: [0.4, 0, 0.2, 1] as BezierEasing,
    emphasized: [0.85, 0, 0.15, 1] as BezierEasing,
    entrance: [0, 0, 0.2, 1] as BezierEasing,
    exit: [0.4, 0, 1, 1] as BezierEasing
  }
};
