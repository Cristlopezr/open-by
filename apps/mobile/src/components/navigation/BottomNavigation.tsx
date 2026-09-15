import { useRouter } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, shadows, sizes, spacing } from "@/theme/tokens";
import { AppIcon } from "@/components/ui/AppIcon";
import { AppText } from "@/components/ui/VisualPrimitives";

export function BottomNavigation({ active }: { active: "home" | "preferences" }) {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useVisualTheme();

  return (
    <View style={[styles.bar, shadows.card, { paddingBottom: Math.max(insets.bottom, spacing.xs), backgroundColor: colors.surface, borderColor: colors.border }]}>
      <NavItem label="Home" icon="home" active={active === "home"} onPress={() => router.replace(visualRoutes.home)} />
      <Pressable accessibilityRole="button" accessibilityLabel="Scan" onPress={() => router.push(visualRoutes.scanner)} style={[styles.scan, { backgroundColor: colors.primary }]}>
        <AppIcon name="scan" color={colors.surface} size={27} />
        <AppText variant="caption" color={colors.surface}>Scan</AppText>
      </Pressable>
      <NavItem label="Preferences" icon="preferences" active={active === "preferences"} onPress={() => router.replace(visualRoutes.preferences)} />
    </View>
  );
}

function NavItem({ label, icon, active, onPress }: { label: string; icon: "home" | "preferences"; active: boolean; onPress: () => void }) {
  const { colors } = useVisualTheme();
  const color = active ? colors.primary : colors.textSecondary;
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected: active, disabled: active }}
      disabled={active}
      onPress={onPress}
      style={styles.item}
    >
      <AppIcon name={icon} color={color} />
      <AppText variant="caption" color={color}>{label}</AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  bar: { minHeight: sizes.bottomNav, borderTopWidth: 1, paddingHorizontal: spacing.lg, paddingTop: spacing.xs, flexDirection: "row", alignItems: "flex-end", justifyContent: "space-around" },
  item: { minWidth: 92, minHeight: sizes.touch, alignItems: "center", justifyContent: "center", gap: 2 },
  scan: { width: 68, height: 68, borderRadius: radii.pill, alignItems: "center", justifyContent: "center", gap: 1, marginTop: -28 },
});
