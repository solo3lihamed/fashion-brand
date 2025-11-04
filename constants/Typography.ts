/**
 * Fashion Store Typography System
 * Clean, modern typography for a sophisticated fashion brand
 */

export const Typography = {
  // Font Families
  fonts: {
    primary: 'System', // Will use system font for better performance
    secondary: 'System',
    mono: 'Courier New',
  },

  // Font Sizes
  sizes: {
    xs: 12,
    sm: 14,
    base: 16,
    lg: 18,
    xl: 20,
    '2xl': 24,
    '3xl': 30,
    '4xl': 36,
    '5xl': 48,
    '6xl': 60,
    '7xl': 72,
  },

  // Line Heights
  lineHeights: {
    tight: 1.2,
    normal: 1.4,
    relaxed: 1.6,
    loose: 1.8,
  },

  // Font Weights
  weights: {
    light: '300' as const,
    normal: '400' as const,
    medium: '500' as const,
    semibold: '600' as const,
    bold: '700' as const,
    extrabold: '800' as const,
  },

  // Letter Spacing
  letterSpacing: {
    tight: -0.5,
    normal: 0,
    wide: 0.5,
    wider: 1,
    widest: 2,
  },

  // Text Styles
  styles: {
    h1: {
      fontSize: 48,
      fontWeight: '300' as const,
      lineHeight: 1.2,
      letterSpacing: -0.5,
    },
    h2: {
      fontSize: 36,
      fontWeight: '300' as const,
      lineHeight: 1.3,
      letterSpacing: -0.5,
    },
    h3: {
      fontSize: 30,
      fontWeight: '400' as const,
      lineHeight: 1.3,
    },
    h4: {
      fontSize: 24,
      fontWeight: '400' as const,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: 20,
      fontWeight: '500' as const,
      lineHeight: 1.4,
    },
    h6: {
      fontSize: 18,
      fontWeight: '500' as const,
      lineHeight: 1.4,
    },
    body: {
      fontSize: 16,
      fontWeight: '400' as const,
      lineHeight: 1.6,
    },
    bodySmall: {
      fontSize: 14,
      fontWeight: '400' as const,
      lineHeight: 1.5,
    },
    caption: {
      fontSize: 12,
      fontWeight: '400' as const,
      lineHeight: 1.4,
      letterSpacing: 0.5,
    },
    button: {
      fontSize: 16,
      fontWeight: '500' as const,
      letterSpacing: 0.5,
    },
    buttonSmall: {
      fontSize: 14,
      fontWeight: '500' as const,
      letterSpacing: 0.5,
    },
    label: {
      fontSize: 14,
      fontWeight: '500' as const,
      letterSpacing: 0.5,
    },
  },
};

export type TypographyScheme = typeof Typography;
