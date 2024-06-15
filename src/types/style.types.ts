export interface ThemeColors {
  primary: string;

  secondary: string;

  /**
   * The background color appears behind scrollable content.
   */
  background: string;

  /**
   * Color for backdrops of various components such as modals.
   */
  backdrop: string;

  surface: string;

  success: string;

  info: string;

  warning: string;

  error: string;

  light: string;

  dark: string;

  /**
   * The color of Tab Navigator badge.
   */
  notification: string;

  /**
   * The color of borders.
   */
  border: string;

  shadow: string;

  link: string;

  divider: string;

  /**
   * Cursor color of a text input.
   */
  cursor: string;

  /**
   * The hightlight and cursor color of the text input.
   */
  selection: string;

  'input-background': string;

  /**
   * Text color for content.
   */
  'primary-text': string;

  'secondary-text': string;

  'placeholder-text': string;

  'disabled-text': string;

  'primary-icon': string;

  'secondary-icon': string;

  'placeholder-icon': string;

  'disabled-icon': string;
}

export type ThemeMode = 'light' | 'dark' | 'system';

export interface DefaultTheme {
  mode: ThemeMode;
  colors: ThemeColors;
  fonts: Record<FontFamilyType, string>;
  fontSizes: Record<FontSizeType, number>;
  lineHeights: Record<FontSizeType, number>;
  radii: Record<RadiusType, number>;
  spacing: (number: number) => number;
}

export type FontFamilyType =
  | 'rugular'
  | 'regular-italic'
  | 'medium'
  | 'medium-italic'
  | 'semi-bold'
  | 'semi-bold-italic'
  | 'bold'
  | 'bold-italic';

export type FontSizeType =
  | 'display-large'
  | 'display-medium'
  | 'display-small'
  | 'headline-large'
  | 'headline-medium'
  | 'headline-small'
  | 'title-large'
  | 'title-medium'
  | 'title-small'
  | 'body-large'
  | 'body-medium'
  | 'body-small'
  | 'label-large'
  | 'label-medium'
  | 'label-small';

export type RadiusType =
  | 'extra-small'
  | 'small'
  | 'medium'
  | 'large'
  | 'extra-large';

export type ZIndexType =
  | 'base'
  | 'fab'
  | 'drawer'
  | 'backdrop'
  | 'modal'
  | 'snackbar'
  | 'tooltip';
