import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, View } from "react-native";

import type { PreviewOption } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, spacing } from "@/theme/tokens";
import { AppText, IconButton } from "@/components/ui/VisualPrimitives";

export function PreviewStateSelector<T extends string>({
  value,
  options,
  onChange,
  inverse = false,
}: {
  value: T;
  options: PreviewOption<T>[];
  onChange: (value: T) => void;
  inverse?: boolean;
}) {
  const { colors } = useVisualTheme();
  const [dismissed, setDismissed] = useState(false);

  if (!__DEV__ || dismissed) return null;

  return (
    <View style={[styles.container, { backgroundColor: inverse ? "rgba(16,23,19,0.9)" : colors.surface, borderColor: inverse ? "rgba(255,255,255,0.2)" : colors.border }]}>
      <View style={styles.header}>
        <AppText variant="caption" color={inverse ? "#FFFFFF" : colors.textSecondary}>Visual preview</AppText>
        <IconButton icon="close" label="Hide preview controls" onPress={() => setDismissed(true)} inverse={inverse} />
      </View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.options}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <Pressable
              accessibilityRole="button"
              key={option.value}
              onPress={() => onChange(option.value)}
              style={[
                styles.option,
                { backgroundColor: selected ? colors.lime : inverse ? "rgba(255,255,255,0.12)" : colors.surfaceSecondary },
              ]}
            >
              <AppText variant="caption" color={selected ? "#17211C" : inverse ? "#FFFFFF" : colors.text}>{option.label}</AppText>
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { borderWidth: 1, borderRadius: radii.control, padding: spacing.xs, gap: spacing.xs },
  header: { minHeight: 48, paddingLeft: spacing.xs, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  options: { gap: spacing.xs },
  option: { minHeight: 40, borderRadius: radii.pill, paddingHorizontal: spacing.sm, alignItems: "center", justifyContent: "center" },
});
