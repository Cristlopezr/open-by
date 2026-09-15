import { FlatList, Pressable, StyleSheet, View } from "react-native";

import { HomeNoResults } from "@/components/home/HomeInventoryControls";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";
import { AppText } from "@/components/ui/VisualPrimitives";
import type { ExpirationStatus, ProductFixture } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, sizes, spacing } from "@/theme/tokens";

const statuses: Record<ExpirationStatus, { label: string; icon: AppIconName }> = {
  fresh: { label: "Fresh", icon: "leaf" },
  soon: { label: "Soon", icon: "warning" },
  expired: { label: "Expired", icon: "error" },
  unknown: { label: "Unknown", icon: "info" },
};

export function HomeProductTable({
  products,
  onSelect,
}: {
  products: ProductFixture[];
  onSelect: (product: ProductFixture) => void;
}) {
  const { colors } = useVisualTheme();
  return (
    <View style={[styles.table, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <View
        style={[
          styles.header,
          { backgroundColor: colors.surfaceSecondary, borderBottomColor: colors.border },
        ]}
      >
        <AppText variant="caption" color={colors.textSecondary} style={styles.identity}>
          Product
        </AppText>
        <AppText variant="caption" color={colors.textSecondary} style={styles.status}>
          Status
        </AppText>
        <AppText variant="caption" color={colors.textSecondary} style={styles.time}>
          Time
        </AppText>
      </View>
      <FlatList
        data={products}
        keyExtractor={(product) => product.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<HomeNoResults />}
        renderItem={({ item }) => <ProductRow product={item} onPress={() => onSelect(item)} />}
        style={styles.list}
      />
    </View>
  );
}

function ProductRow({ product, onPress }: { product: ProductFixture; onPress: () => void }) {
  const { colors } = useVisualTheme();
  const status = statuses[product.status];
  const color = colors[product.status];

  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`Open ${product.name || "unnamed product"}, ${status.label}, ${product.remainingLabel}`}
      onPress={onPress}
      style={({ pressed }) => [
        styles.row,
        {
          borderBottomColor: colors.border,
          backgroundColor: pressed ? colors.surfaceSecondary : colors.surface,
        },
      ]}
    >
      <View style={styles.identity}>
        <View style={[styles.productIcon, { backgroundColor: colors.surfaceSecondary }]}>
          <AppIcon
            name={product.categoryIcon === "food" ? "food" : "product"}
            color={colors.primary}
            size={19}
          />
        </View>
        <View style={styles.productText}>
          <AppText variant="bodyMedium" numberOfLines={1}>
            {product.name || "Unnamed product"}
          </AppText>
          <AppText variant="caption" color={colors.textSecondary} numberOfLines={1}>
            {product.brand || product.categoryLabel}
          </AppText>
        </View>
      </View>
      <View style={styles.status}>
        <AppIcon name={status.icon} color={color} size={14} />
        <AppText variant="caption" color={color} numberOfLines={1}>{status.label}</AppText>
      </View>
      <AppText variant="label" color={color} style={styles.time} numberOfLines={2}>
        {product.remainingLabel}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  table: { flex: 1, minHeight: 120, borderWidth: 1, borderRadius: radii.card, overflow: "hidden" },
  header: { minHeight: 36, paddingHorizontal: spacing.xs, flexDirection: "row", alignItems: "center", borderBottomWidth: 1 },
  list: { flex: 1 },
  row: { minHeight: sizes.touch + spacing.md, paddingHorizontal: spacing.xs, flexDirection: "row", alignItems: "center", borderBottomWidth: 1 },
  identity: { flex: 1, minWidth: 0, flexDirection: "row", alignItems: "center", gap: spacing.xs },
  productIcon: { width: 34, height: 34, borderRadius: radii.small, alignItems: "center", justifyContent: "center" },
  productText: { flex: 1, minWidth: 0 },
  status: { width: 76, flexDirection: "row", alignItems: "center", gap: spacing.xxs },
  time: { width: 82, textAlign: "right" },
});
