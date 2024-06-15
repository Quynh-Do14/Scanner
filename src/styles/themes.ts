import {
  FontFamilyType,
  FontSizeType,
  RadiusType,
  ThemeColors,
  ZIndexType,
} from "@/types";

export const lightColors: ThemeColors = {
  primary: "#663399",
  secondary: "",
  background: "#f0f2f5",
  backdrop: "rgba(55, 46, 52, 0.4)",
  surface: "#ffffff",
  success: "#37b361",
  info: "#005ae0",
  warning: "hsl(40, 89%, 52%)",
  error: "#d91b1b",
  light: "#ffffff",
  dark: "#000000",
  notification: "",
  border: "#ccd",
  shadow: "#000000",
  link: "#216FDB",
  divider: "#c5c9ce",
  cursor: "#663399",
  selection: "#663399",
  "input-background": "#f0f2f5",
  "primary-text": "#050505",
  "secondary-text": "#65676B",
  "placeholder-text": "#65676B",
  "disabled-text": "",
  "primary-icon": "#050505",
  "secondary-icon": "#65676B",
  "placeholder-icon": "#65676B",
  "disabled-icon": "",
};

export const darkColors: ThemeColors = {
  ...lightColors,
};

export const radii: Record<RadiusType, number> = {
  "extra-small": 4,
  small: 8,
  medium: 12,
  large: 16,
  "extra-large": 24,
};

export const spacing = (number: number) => {
  return number * 4;
};

export const fonts: Record<FontFamilyType, string> = {
  rugular: "BaiJamjuree-Regular",
  "regular-italic": "BaiJamjuree-Italic",
  medium: "BaiJamjuree-Medium",
  "medium-italic": "BaiJamjuree-MediumItalic",
  "semi-bold": "BaiJamjuree-SemiBold",
  "semi-bold-italic": "BaiJamjuree-SemiBoldItalic",
  bold: "BaiJamjuree-Bold",
  "bold-italic": "BaiJamjuree-BoldItalic",
};

export const fontSizes: Record<FontSizeType, number> = {
  "display-large": 57,
  "display-medium": 45,
  "display-small": 36,
  "headline-large": 32,
  "headline-medium": 28,
  "headline-small": 24,
  "title-large": 22,
  "title-medium": 16,
  "title-small": 14,
  "body-large": 16,
  "body-medium": 14,
  "body-small": 12,
  "label-large": 14,
  "label-medium": 12,
  "label-small": 11,
};

export const lineHeights: Record<FontSizeType, number> = {
  "display-large": 64,
  "display-medium": 52,
  "display-small": 44,
  "headline-large": 40,
  "headline-medium": 36,
  "headline-small": 32,
  "title-large": 28,
  "title-medium": 24,
  "title-small": 20,
  "body-large": 24,
  "body-medium": 20,
  "body-small": 16,
  "label-large": 20,
  "label-medium": 16,
  "label-small": 16,
};

export const zIndices: Record<ZIndexType, number> = {
  base: 1,
  fab: 1000,
  drawer: 1100,
  backdrop: 1200,
  modal: 1300,
  snackbar: 1400,
  tooltip: 1500,
};
