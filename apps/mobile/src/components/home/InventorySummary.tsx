import { StyleSheet, View } from "react-native";

import { AppIcon } from "@/components/ui/AppIcon";
import { AppText } from "@/components/ui/VisualPrimitives";
import type { ProductFixture } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, shadows, spacing } from "@/theme/tokens";

export function InventorySummary({ products }: { products: ProductFixture[] }) {
  const { colors } = useVisualTheme();
  const counts = {
    fresh: products.filter((product) => product.status === "fresh").length,
    soon: products.filter((product) => product.status === "soon").length,
    expired: products.filter((product) => product.status === "expired").length,
  };

  const items = [
    { label: "Vigentes", count: counts.fresh, color: colors.fresh, icon: "leaf" as const },
    { label: "Por vencer", count: counts.soon, color: colors.soon, icon: "clock" as const },
    { label: "Vencidos", count: counts.expired, color: colors.expired, icon: "warning" as const },
  ];

  return (
    <View style={styles.grid}>
      {items.map((item) => (
        <View key={item.label} style={[styles.card, shadows.card, { backgroundColor: colors.surface, borderBottomColor: item.color }]}>
          <View style={styles.cardHeader}>
            <View style={[styles.dot, { backgroundColor: item.color }]} />
            <AppIcon name={item.icon} color={item.color} size={18} />
          </View>
          <AppText variant="title">{item.count}</AppText>
          <AppText variant="caption" color={item.color}>{item.label}</AppText>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  grid: { flexDirection: "row", gap: spacing.xs },
  card: { flex: 1, minHeight: 112, borderRadius: radii.card, padding: spacing.sm, justifyContent: "space-between", borderBottomWidth: 3 },
  cardHeader: { flexDirection: "row", justifyContent: "space-between", alignItems: "center" },
  dot: { width: 8, height: 8, borderRadius: 4 },
});
