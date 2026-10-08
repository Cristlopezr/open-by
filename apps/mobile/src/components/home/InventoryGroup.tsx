import { Link } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AppIcon } from "@/components/ui/AppIcon";
import { ProductArtwork } from "@/components/ui/DesignSystem";
import { AppText } from "@/components/ui/VisualPrimitives";
import { visualRoutes } from "@/features/mvp-visual/state";
import type { ProductFixture } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";

export function InventoryGroup({
  label,
  color,
  products,
  cards,
}: {
  label: string;
  color: string;
  products: ProductFixture[];
  cards: boolean;
}) {
  const { colors } = useVisualTheme();
  const [pressedId, setPressedId] = useState<string | null>(null);
  return (
    <View style={styles.group}>
      <View style={styles.heading}>
        <AppText variant="caption" color={color}>
          {label.toUpperCase()} · {products.length}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          By expiration
        </AppText>
      </View>
      <View
        style={StyleSheet.flatten([
          styles.rows,
          cards ? styles.cardRows : styles.compactRows,
          !cards && { backgroundColor: colors.surface, borderColor: colors.border },
        ])}
      >
        {products.map((product, index) => (
          <Link
            key={product.id}
            href={{ pathname: visualRoutes.productDetails, params: { id: product.id } }}
            asChild
          >
            <Pressable
              accessibilityRole="button"
              accessibilityLabel={`${product.name || product.categoryLabel}, ${product.remainingLabel}`}
              onPressIn={() => setPressedId(product.id)}
              onPressOut={() => setPressedId(null)}
              style={StyleSheet.flatten([
                styles.row,
                cards && styles.cardRow,
                !cards && index < products.length - 1 && styles.divider,
                {
                  backgroundColor: pressedId === product.id ? colors.surfaceSecondary : colors.surface,
                  borderColor: colors.border,
                },
              ])}
            >
              <ProductArtwork product={product} size={cards ? 68 : 40} />
              <View style={styles.copy}>
                <View style={styles.nameLine}>
                  <AppText
                    variant="bodyMedium"
                    numberOfLines={cards ? 2 : 1}
                    style={styles.flex}
                  >
                    {product.name || product.categoryLabel}
                  </AppText>
                  <AppIcon name="forward" color={colors.textSecondary} size={17} />
                </View>
                <AppText variant="caption" color={colors.textSecondary} numberOfLines={1}>
                  {product.brand || product.categoryLabel}
                </AppText>
                <View style={styles.meta}>
                  <View
                    style={[
                      styles.status,
                      { backgroundColor: `${colors[product.status]}1A` },
                    ]}
                  >
                    <AppText
                      variant="caption"
                      color={colors[product.status]}
                      numberOfLines={2}
                    >
                      {product.remainingLabel}
                    </AppText>
                  </View>
                  {product.lifetimeLabel ? (
                    <AppText variant="caption" color={colors.textSecondary} numberOfLines={1} style={styles.flex}>
                      {product.lifetimeLabel}
                    </AppText>
                  ) : null}
                </View>
                {cards && product.storageCondition ? (
                  <AppText variant="caption" color={colors.textSecondary} numberOfLines={2}>
                    {product.storageCondition}
                  </AppText>
                ) : null}
              </View>
            </Pressable>
          </Link>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  flex: { flex: 1, minWidth: 0 },
  group: { gap: 8 },
  heading: { flexDirection: "row", justifyContent: "space-between", paddingHorizontal: 4, paddingVertical: 4 },
  rows: { overflow: "hidden" },
  compactRows: { borderWidth: 1, borderRadius: 12 },
  cardRows: { gap: 8 },
  row: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 10,
    paddingHorizontal: 10,
    paddingVertical: 10,
    minHeight: 68,
  },
  divider: { borderBottomWidth: 1 },
  cardRow: { padding: 16, minHeight: 116, borderWidth: 1, borderRadius: 12, gap: 14 },
  copy: { flex: 1, minWidth: 0, gap: 4 },
  nameLine: { flexDirection: "row", alignItems: "center", gap: 6 },
  meta: { flexDirection: "row", alignItems: "center", gap: 7, flexWrap: "wrap" },
  status: { borderRadius: 6, paddingHorizontal: 7, paddingVertical: 3, maxWidth: "100%" },
});
