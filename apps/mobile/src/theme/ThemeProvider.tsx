import {
  Manrope_400Regular,
  Manrope_500Medium,
  Manrope_600SemiBold,
  Manrope_700Bold,
  Manrope_800ExtraBold,
  useFonts,
} from "@expo-google-fonts/manrope";
import * as SplashScreen from "expo-splash-screen";
import { createContext, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { useColorScheme } from "react-native";

import type { EffectiveAppearance, ThemeChoice } from "@/features/mvp-visual/types";
import { darkColors, lightColors, type ThemeColors } from "./tokens";

void SplashScreen.preventAutoHideAsync();

interface ThemeContextValue {
  choice: ThemeChoice;
  appearance: EffectiveAppearance;
  colors: ThemeColors;
  isDark: boolean;
  setChoice: (choice: ThemeChoice) => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

export function VisualThemeProvider({ children }: { children: ReactNode }) {
  const [choice, setChoice] = useState<ThemeChoice>("system");
  const deviceAppearance = useColorScheme();
  const [fontsLoaded, fontError] = useFonts({
    Manrope_400Regular,
    Manrope_500Medium,
    Manrope_600SemiBold,
    Manrope_700Bold,
    Manrope_800ExtraBold,
  });

  useEffect(() => {
    if (fontsLoaded || fontError) {
      void SplashScreen.hideAsync();
    }
  }, [fontError, fontsLoaded]);

  const value = useMemo<ThemeContextValue>(() => {
    const appearance: EffectiveAppearance =
      choice === "system" ? (deviceAppearance === "dark" ? "dark" : "light") : choice;
    const isDark = appearance === "dark";
    return {
      choice,
      appearance,
      isDark,
      colors: isDark ? darkColors : lightColors,
      setChoice,
    };
  }, [choice, deviceAppearance]);

  if (!fontsLoaded && !fontError) {
    return null;
  }

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useVisualTheme() {
  const value = useContext(ThemeContext);
  if (!value) {
    throw new Error("useVisualTheme must be used inside VisualThemeProvider");
  }
  return value;
}
