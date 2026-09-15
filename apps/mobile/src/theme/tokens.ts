export const lightColors = {
  background: "#F6F7F2",
  surface: "#FFFFFF",
  surfaceSecondary: "#EDF2EB",
  text: "#17211C",
  textSecondary: "#66736C",
  border: "#DCE4DC",
  primary: "#176B4D",
  primaryPressed: "#10543C",
  lime: "#D7F171",
  fresh: "#2F855A",
  soon: "#D99024",
  expired: "#CC4B4B",
  info: "#347C98",
  unknown: "#6B7280",
  overlay: "rgba(10, 20, 15, 0.72)",
  dangerSoft: "#FBE9E7",
  warningSoft: "#FFF4DF",
  infoSoft: "#E8F3F7",
  primarySoft: "#E4F2EB",
} as const;

export const darkColors = {
  background: "#101713",
  surface: "#18211C",
  surfaceSecondary: "#202C25",
  text: "#F2F6F2",
  textSecondary: "#A8B5AC",
  border: "#34443A",
  primary: "#66D19E",
  primaryPressed: "#4EAD7E",
  lime: "#D7F171",
  fresh: "#67C58D",
  soon: "#F0B84B",
  expired: "#EF7772",
  info: "#69B4CF",
  unknown: "#A8B0AB",
  overlay: "rgba(4, 9, 6, 0.82)",
  dangerSoft: "#3A2523",
  warningSoft: "#3A3020",
  infoSoft: "#20343B",
  primarySoft: "#20372D",
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
  small: 10,
  control: 14,
  card: 18,
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
