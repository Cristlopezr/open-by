export const fontFamilies = {
  regular: "PlusJakartaSans_400Regular",
  medium: "PlusJakartaSans_500Medium",
  semibold: "PlusJakartaSans_600SemiBold",
  bold: "PlusJakartaSans_700Bold",
  extraBold: "PlusJakartaSans_800ExtraBold",
} as const;

export const typeScale = {
  display: { fontSize: 34, lineHeight: 40, fontFamily: fontFamilies.extraBold },
  title: { fontSize: 26, lineHeight: 32, fontFamily: fontFamilies.extraBold },
  heading: { fontSize: 18, lineHeight: 24, fontFamily: fontFamilies.bold },
  body: { fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.regular },
  bodyMedium: { fontSize: 14, lineHeight: 20, fontFamily: fontFamilies.semibold },
  label: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.semibold },
  caption: { fontSize: 11, lineHeight: 16, fontFamily: fontFamilies.medium },
} as const;
