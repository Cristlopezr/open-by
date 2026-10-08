import { Tabs } from "expo-router";

import { AppIcon } from "@/components/ui/AppIcon";
import { useVisualTheme } from "@/theme/ThemeProvider";

export default function TabLayout() {
  const { colors } = useVisualTheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: {
          backgroundColor: colors.background,
          borderTopColor: colors.border,
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Inventario",
          tabBarIcon: ({ color, size }) => <AppIcon name="product" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="scanner"
        options={{
          title: "Escanear",
          tabBarIcon: ({ color, size }) => <AppIcon name="scan" color={color} size={size} />,
        }}
      />
      <Tabs.Screen
        name="preferences"
        options={{
          title: "Configuración",
          tabBarIcon: ({ color, size }) => <AppIcon name="preferences" color={color} size={size} />,
        }}
      />
    </Tabs>
  );
}
