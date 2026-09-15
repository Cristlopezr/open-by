import { DarkTheme, DefaultTheme, Stack, ThemeProvider } from "expo-router";
import { StatusBar } from "expo-status-bar";
import * as SystemUI from "expo-system-ui";
import { useEffect, useMemo } from "react";

import { VisualThemeProvider, useVisualTheme } from "@/theme/ThemeProvider";

export default function RootLayout() {
  return (
    <VisualThemeProvider>
      <AppStack />
    </VisualThemeProvider>
  );
}

function AppStack() {
  const { colors, isDark } = useVisualTheme();
  const navigationTheme = useMemo(() => {
    const base = isDark ? DarkTheme : DefaultTheme;
    return {
      ...base,
      colors: {
        ...base.colors,
        background: colors.background,
        card: colors.background,
        border: colors.border,
        text: colors.text,
        primary: colors.primary,
      },
    };
  }, [colors, isDark]);

  useEffect(() => {
    void SystemUI.setBackgroundColorAsync(colors.background);
  }, [colors.background]);

  return (
    <ThemeProvider value={navigationTheme}>
      <StatusBar style={isDark ? "light" : "dark"} />
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "slide_from_right",
          contentStyle: { backgroundColor: colors.background },
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="scanner" options={{ animation: "fade" }} />
        <Stack.Screen name="confirm-opening" />
        <Stack.Screen name="product-details" />
        <Stack.Screen name="report-unknown" />
        <Stack.Screen name="preferences" />
      </Stack>
    </ThemeProvider>
  );
}
