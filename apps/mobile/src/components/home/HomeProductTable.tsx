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
    <View style={styles.table}>
      <View style={styles.header}>
        <View style={styles.headingCopy}>
          <AppText variant="heading">Tracked items</AppText>
          <AppText variant="caption" color={colors.textSecondary}>{products.length} visible · sorted by urgency</AppText>
        </View>
        <View style={[styles.count, { backgroundColor: colors.surfaceSecondary }]}><AppText variant="caption" color={colors.textSecondary}>{products.length}</AppText></View>
      </View>
      <FlatList
        data={products}
        keyExtractor={(product) => product.id}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={<HomeNoResults />}
        renderItem={({ item }) => <ProductRow product={item} onPress={() => onSelect(item)} />}
        contentContainerStyle={styles.list}
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
          borderColor: colors.border,
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
        <View style={[styles.statusPill, { backgroundColor: `${color}1A` }]}>
          <AppIcon name={status.icon} color={color} size={13} />
          <AppText variant="caption" color={color} numberOfLines={1}>{status.label}</AppText>
        </View>
      </View>
      <View style={styles.time}>
        <AppText variant="label" color={color} numberOfLines={1}>{product.remainingLabel}</AppText>
        <AppText variant="caption" color={colors.textSecondary} numberOfLines={1}>{product.storageCondition ?? product.openedAtLabel}</AppText>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  table: { flex: 1, minHeight: 120 },
  header: { minHeight: 42, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headingCopy: { gap: 1 },
  count: { minWidth: 28, minHeight: 24, borderRadius: radii.pill, alignItems: "center", justifyContent: "center", paddingHorizontal: spacing.xs },
  list: { gap: spacing.xs, paddingBottom: spacing.md },
  row: { minHeight: 78, paddingHorizontal: spacing.sm, flexDirection: "row", alignItems: "center", borderWidth: 1, borderRadius: radii.control },
  identity: { flex: 1, minWidth: 0, flexDirection: "row", alignItems: "center", gap: spacing.xs },
  productIcon: { width: 34, height: 34, borderRadius: radii.small, alignItems: "center", justifyContent: "center" },
  productText: { flex: 1, minWidth: 0 },
  status: { width: 74, alignItems: "center" },
  statusPill: { borderRadius: radii.pill, paddingHorizontal: 6, paddingVertical: 4, flexDirection: "row", alignItems: "center", gap: 3 },
  time: { width: 88, gap: 2, alignItems: "flex-end" },
});
