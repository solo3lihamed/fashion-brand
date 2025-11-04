/**
 * Fashion Store Design System
 * Centralized export of all design tokens and constants
 */

export { Colors } from './Colors';
export { Typography } from './Typography';
export { Spacing } from './Spacing';
export { Animations } from './Animations';

export type { ColorScheme } from './Colors';
export type { TypographyScheme } from './Typography';
export type { SpacingScheme } from './Spacing';
export type { AnimationScheme } from './Animations';

// Combined theme object for easy access
import { Colors } from './Colors';
import { Typography } from './Typography';
import { Spacing } from './Spacing';
import { Animations } from './Animations';

export const Theme = {
  colors: Colors,
  typography: Typography,
  spacing: Spacing,
  animations: Animations,
} as const;

export type ThemeType = typeof Theme;
