/**
 * Fashion Store Spacing System
 * Consistent spacing scale for layouts and components
 */

export const Spacing = {
  // Base spacing unit (4px)
  unit: 4,

  // Spacing scale
  xs: 4,    // 4px
  sm: 8,    // 8px
  md: 12,   // 12px
  lg: 16,   // 16px
  xl: 20,   // 20px
  '2xl': 24, // 24px
  '3xl': 32, // 32px
  '4xl': 40, // 40px
  '5xl': 48, // 48px
  '6xl': 64, // 64px
  '7xl': 80, // 80px
  '8xl': 96, // 96px

  // Component-specific spacing
  component: {
    // Padding
    buttonPaddingVertical: 12,
    buttonPaddingHorizontal: 24,
    inputPaddingVertical: 12,
    inputPaddingHorizontal: 16,
    cardPadding: 20,
    sectionPadding: 32,
    containerPadding: 16,

    // Margins
    sectionMargin: 48,
    elementMargin: 16,
    textMargin: 8,

    // Gaps
    gridGap: 16,
    flexGap: 12,
    listGap: 8,
  },

  // Layout spacing
  layout: {
    headerHeight: 60,
    footerHeight: 200,
    sidebarWidth: 280,
    maxContentWidth: 1200,
    containerMaxWidth: 1440,
  },

  // Border radius
  radius: {
    none: 0,
    sm: 4,
    md: 8,
    lg: 12,
    xl: 16,
    '2xl': 24,
    full: 9999,
  },
};

export type SpacingScheme = typeof Spacing;
