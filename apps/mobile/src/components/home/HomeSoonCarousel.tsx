import { Pressable, ScrollView, StyleSheet, useWindowDimensions, View } from "react-native";

import { AppIcon } from "@/components/ui/AppIcon";
import { AppText } from "@/components/ui/VisualPrimitives";
import type { ProductFixture } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, sizes, spacing } from "@/theme/tokens";

export function HomeSoonCarousel({
  products,
  onSelect,
}: {
  products: ProductFixture[];
  onSelect: (product: ProductFixture) => void;
}) {
  const { colors } = useVisualTheme();
  const { width: windowWidth } = useWindowDimensions();
  const visibleWidth = windowWidth - sizes.horizontalMargin * 2;
  const itemWidth = Math.min(260, Math.max(188, visibleWidth * 0.68));
  if (products.length === 0) return null;

  return (
    <View style={styles.section}>
      <View style={styles.heading}>
        <AppText variant="heading">Use soon</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {products.length} to keep an eye on
        </AppText>
      </View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.carousel}
      >
        {products.map((product) => (
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={`Open ${product.name || "unnamed product"}, ${product.remainingLabel}`}
            key={product.id}
            onPress={() => onSelect(product)}
            style={[
              styles.item,
              { width: itemWidth },
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.copy}>
              <View style={styles.status}>
                <AppIcon name="warning" color={colors.soon} size={15} />
                <AppText variant="caption" color={colors.soon}>
                  Use soon
                </AppText>
              </View>
              <AppText variant="bodyMedium" numberOfLines={2}>
                {product.name || "Unnamed product"}
              </AppText>
              <AppText variant="bodyMedium" color={colors.soon} numberOfLines={2}>
                {product.remainingLabel}
              </AppText>
            </View>
            <View style={[styles.categoryMark, { backgroundColor: colors.primarySoft }]}>
              <AppIcon name="category" color={colors.primary} size={27} />
              <AppText variant="caption" color={colors.textSecondary} numberOfLines={1}>
                {product.categoryLabel}
              </AppText>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  section: { gap: spacing.xs },
  heading: { flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", gap: spacing.xs },
  carousel: { gap: spacing.xs, paddingBottom: spacing.xs },
  item: {
    minHeight: 112,
    borderWidth: 1,
    borderRadius: radii.card,
    padding: spacing.sm,
    flexDirection: "row",
    gap: spacing.xs,
  },
  copy: { flex: 1, minWidth: 0, justifyContent: "space-between" },
  categoryMark: {
    width: 68,
    borderRadius: radii.control,
    alignItems: "center",
    justifyContent: "center",
    gap: spacing.xxs,
  },
  status: { minHeight: sizes.touch / 2, flexDirection: "row", alignItems: "center", gap: spacing.xxs },
});
