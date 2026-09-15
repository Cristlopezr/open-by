import { Pressable, StyleSheet, View } from "react-native";

import type { ProductFixture } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, spacing } from "@/theme/tokens";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";
import { AppText, Card, Pill } from "@/components/ui/VisualPrimitives";

const statusMeta: Record<ProductFixture["status"], { label: string; icon: AppIconName }> = {
  fresh: { label: "Fresh", icon: "leaf" },
  soon: { label: "Use soon", icon: "warning" },
  expired: { label: "Expired", icon: "error" },
  unknown: { label: "Lifetime unknown", icon: "info" },
};

export function ProductCard({ product, onPress }: { product: ProductFixture; onPress?: () => void }) {
  const { colors } = useVisualTheme();
  const statusColor = colors[product.status];
  const meta = statusMeta[product.status];
  const categoryIcon: AppIconName = product.categoryIcon === "food" ? "food" : "product";

  return (
    <Pressable accessibilityRole="button" onPress={onPress}>
      {({ pressed }) => (
        <Card style={[styles.card, pressed && styles.pressed]}>
          <View style={styles.row}>
            <View style={[styles.imageFallback, { backgroundColor: `${statusColor}18` }]}>
              <AppIcon name={categoryIcon} color={statusColor} size={28} />
            </View>
            <View style={styles.copy}>
              <View style={styles.nameRow}>
                <View style={styles.nameCopy}>
                  <AppText variant="bodyMedium" numberOfLines={2}>{product.name || "Unnamed product"}</AppText>
                  <AppText variant="caption" color={colors.textSecondary} numberOfLines={1}>{product.brand || "Brand unavailable"}</AppText>
                </View>
                <Pill label={meta.label} color={statusColor} icon={meta.icon} />
              </View>
              <AppText variant="heading" color={statusColor}>{product.remainingLabel}</AppText>
              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <AppIcon name="clock" color={colors.textSecondary} size={15} />
                  <AppText variant="caption" color={colors.textSecondary}>{product.expirationLabel ?? "No expiration date"}</AppText>
                </View>
                <View style={styles.metaItem}>
                  <AppIcon name="notification" color={colors.textSecondary} size={15} />
                  <AppText variant="caption" color={colors.textSecondary}>{product.reminderLabel}</AppText>
                </View>
              </View>
            </View>
          </View>
        </Card>
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: { padding: spacing.sm },
  pressed: { opacity: 0.76 },
  row: { flexDirection: "row", gap: spacing.sm },
  imageFallback: { width: 68, minHeight: 92, borderRadius: radii.control, alignItems: "center", justifyContent: "center" },
  copy: { flex: 1, gap: spacing.xs },
  nameRow: { flexDirection: "row", gap: spacing.xs, alignItems: "flex-start" },
  nameCopy: { flex: 1, gap: 1 },
  metaRow: { gap: spacing.xxs },
  metaItem: { flexDirection: "row", alignItems: "center", gap: 6 },
});
