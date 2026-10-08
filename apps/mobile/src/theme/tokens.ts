export const lightColors = {
  background: "#FAF8FF",
  surface: "#FFFFFF",
  surfaceSecondary: "#EAEDFF",
  surfaceLow: "#F2F3FF",
  onPrimary: "#FFFFFF",
  text: "#131B2E",
  textSecondary: "#3D4A42",
  border: "#BCCAC0",
  primary: "#006948",
  primaryPressed: "#005137",
  lime: "#85F8C4",
  fresh: "#006948",
  soon: "#A25A00",
  expired: "#B61722",
  info: "#286D87",
  unknown: "#63716A",
  overlay: "rgba(19, 27, 46, 0.72)",
  dangerSoft: "#FFDAD7",
  warningSoft: "#FFDDB8",
  infoSoft: "#E0F3FA",
  primarySoft: "#D7F7E6",
} as const;

export const darkColors = {
  background: "#0F131C",
  surface: "#181C24",
  surfaceSecondary: "#262A33",
  surfaceLow: "#1C2028",
  onPrimary: "#003824",
  text: "#DFE2EE",
  textSecondary: "#BBCABF",
  border: "#3C4A42",
  primary: "#4EDEA3",
  primaryPressed: "#85F8C4",
  lime: "#C0F6A0",
  fresh: "#4EDEA3",
  soon: "#FFB95F",
  expired: "#FFB4AB",
  info: "#8DD3E7",
  unknown: "#BAC9C0",
  overlay: "rgba(3, 10, 7, 0.84)",
  dangerSoft: "#54272A",
  warningSoft: "#513C22",
  infoSoft: "#1D3B43",
  primarySoft: "#1C3B2D",
} as const;

export type ThemeColors = {
  [Key in keyof typeof lightColors]: string;
};

export const spacing = {
  xxs: 4,
  xs: 8,
  sm: 12,
  md: 16,
  lg: 20,
  xl: 24,
  xxl: 32,
  xxxl: 40,
} as const;

export const radii = {
  small: 8,
  control: 12,
  card: 12,
  pill: 999,
} as const;

export const sizes = {
  touch: 48,
  primaryAction: 56,
  horizontalMargin: 20,
  icon: 22,
  bottomNav: 72,
} as const;

export const shadows = {
  card: {
    shadowColor: "#0A1A12",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.06,
    shadowRadius: 12,
    elevation: 2,
  },
} as const;
