/**
 * Fashion Store Color Palette
 * A sophisticated, minimalist color scheme for a high-end fashion brand
 */

export const Colors = {
  // Primary Brand Colors
  primary: {
    black: '#000000',
    charcoal: '#1a1a1a',
    darkGray: '#2d2d2d',
    mediumGray: '#666666',
    lightGray: '#a8a8a8',
    offWhite: '#fafafa',
    white: '#ffffff',
  },

  // Accent Colors
  accent: {
    gold: '#d4af37',
    rose: '#e8b4b8',
    sage: '#9caf88',
    cream: '#f5f5dc',
    blush: '#fdf2f8',
  },

  // Semantic Colors
  semantic: {
    success: '#10b981',
    warning: '#f59e0b',
    error: '#ef4444',
    info: '#3b82f6',
  },

  // Text Colors
  text: {
    primary: '#000000',
    secondary: '#666666',
    tertiary: '#a8a8a8',
    inverse: '#ffffff',
    muted: '#9ca3af',
  },

  // Background Colors
  background: {
    primary: '#ffffff',
    secondary: '#fafafa',
    tertiary: '#f5f5f5',
    dark: '#1a1a1a',
    overlay: 'rgba(0, 0, 0, 0.5)',
    overlayLight: 'rgba(255, 255, 255, 0.9)',
  },

  // Border Colors
  border: {
    light: '#e5e5e5',
    medium: '#d1d5db',
    dark: '#374151',
  },

  // Shadow Colors
  shadow: {
    light: 'rgba(0, 0, 0, 0.05)',
    medium: 'rgba(0, 0, 0, 0.1)',
    dark: 'rgba(0, 0, 0, 0.25)',
  },
};

export type ColorScheme = typeof Colors;
