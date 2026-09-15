export const fontFamilies = {
  regular: "Manrope_400Regular",
  medium: "Manrope_500Medium",
  semibold: "Manrope_600SemiBold",
  bold: "Manrope_700Bold",
  extraBold: "Manrope_800ExtraBold",
} as const;

export const typeScale = {
  display: { fontSize: 34, lineHeight: 40, fontFamily: fontFamilies.extraBold },
  title: { fontSize: 26, lineHeight: 32, fontFamily: fontFamilies.extraBold },
  heading: { fontSize: 20, lineHeight: 26, fontFamily: fontFamilies.bold },
  body: { fontSize: 15, lineHeight: 22, fontFamily: fontFamilies.regular },
  bodyMedium: { fontSize: 15, lineHeight: 22, fontFamily: fontFamilies.medium },
  label: { fontSize: 13, lineHeight: 18, fontFamily: fontFamilies.semibold },
  caption: { fontSize: 12, lineHeight: 17, fontFamily: fontFamilies.medium },
} as const;
