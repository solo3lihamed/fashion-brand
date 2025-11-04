/**
 * Fashion Store Animation Constants
 * Smooth, sophisticated animations for a premium user experience
 */

export const Animations = {
  // Duration (in milliseconds)
  duration: {
    fast: 150,
    normal: 300,
    slow: 500,
    slower: 750,
    slowest: 1000,
  },

  // Easing curves
  easing: {
    linear: 'linear',
    easeIn: 'ease-in',
    easeOut: 'ease-out',
    easeInOut: 'ease-in-out',
    // Custom cubic-bezier curves for sophisticated animations
    smooth: 'cubic-bezier(0.4, 0, 0.2, 1)',
    bounce: 'cubic-bezier(0.68, -0.55, 0.265, 1.55)',
    sharp: 'cubic-bezier(0.4, 0, 0.6, 1)',
    emphasized: 'cubic-bezier(0.2, 0, 0, 1)',
  },

  // Spring configurations for React Native Reanimated
  spring: {
    gentle: {
      damping: 20,
      stiffness: 300,
      mass: 1,
    },
    bouncy: {
      damping: 10,
      stiffness: 400,
      mass: 1,
    },
    smooth: {
      damping: 25,
      stiffness: 400,
      mass: 1,
    },
    snappy: {
      damping: 15,
      stiffness: 500,
      mass: 1,
    },
  },

  // Timing configurations
  timing: {
    fast: {
      duration: 150,
      easing: 'ease-out',
    },
    normal: {
      duration: 300,
      easing: 'ease-in-out',
    },
    slow: {
      duration: 500,
      easing: 'ease-in-out',
    },
    emphasized: {
      duration: 400,
      easing: 'cubic-bezier(0.2, 0, 0, 1)',
    },
  },

  // Common animation presets
  presets: {
    fadeIn: {
      from: { opacity: 0 },
      to: { opacity: 1 },
      duration: 300,
      easing: 'ease-out',
    },
    fadeOut: {
      from: { opacity: 1 },
      to: { opacity: 0 },
      duration: 200,
      easing: 'ease-in',
    },
    slideUp: {
      from: { transform: [{ translateY: 20 }], opacity: 0 },
      to: { transform: [{ translateY: 0 }], opacity: 1 },
      duration: 400,
      easing: 'ease-out',
    },
    slideDown: {
      from: { transform: [{ translateY: -20 }], opacity: 0 },
      to: { transform: [{ translateY: 0 }], opacity: 1 },
      duration: 400,
      easing: 'ease-out',
    },
    scaleIn: {
      from: { transform: [{ scale: 0.9 }], opacity: 0 },
      to: { transform: [{ scale: 1 }], opacity: 1 },
      duration: 300,
      easing: 'ease-out',
    },
    scaleOut: {
      from: { transform: [{ scale: 1 }], opacity: 1 },
      to: { transform: [{ scale: 0.9 }], opacity: 0 },
      duration: 200,
      easing: 'ease-in',
    },
  },
};

export type AnimationScheme = typeof Animations;
