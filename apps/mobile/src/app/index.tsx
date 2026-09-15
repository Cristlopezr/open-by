import { useRouter } from "expo-router";
import { useMemo, useState } from "react";
import { StyleSheet, View } from "react-native";

import { HomeInventoryControls } from "@/components/home/HomeInventoryControls";
import { HomeProductTable } from "@/components/home/HomeProductTable";
import { HomeSoonCarousel } from "@/components/home/HomeSoonCarousel";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { EmptyInventoryState } from "@/components/product/EmptyInventoryState";
import { AppIcon } from "@/components/ui/AppIcon";
import { AppText, Screen } from "@/components/ui/VisualPrimitives";
import { homeProducts } from "@/features/mvp-visual/fixtures";
import { getHomeInventoryResults } from "@/features/mvp-visual/homeInventory";
import { visualRoutes } from "@/features/mvp-visual/state";
import type { HomeStatusFilter, ProductFixture } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, spacing } from "@/theme/tokens";

export default function HomeScreen() {
  const router = useRouter();
  const { colors } = useVisualTheme();
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState<HomeStatusFilter>("all");
  const { tableProducts, soonProducts } = useMemo(
    () => getHomeInventoryResults(homeProducts, searchText, filter),
    [searchText, filter],
  );
  const attentionCount = homeProducts.filter(
    (product) => product.status === "soon" || product.status === "expired",
  ).length;
  const openProduct = (product: ProductFixture) =>
    router.push({ pathname: visualRoutes.productDetails, params: { id: product.id } });

  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Screen scroll={false} contentStyle={styles.content}>
        <View style={styles.header}>
          <View style={styles.headerCopy}>
            <AppText variant="display">OpenBy</AppText>
            <AppText color={colors.textSecondary}>
              {homeProducts.length === 0
                ? "Your kitchen is ready"
                : `${homeProducts.length} opened products · ${attentionCount} need attention`}
            </AppText>
          </View>
          <View style={[styles.brandMark, { backgroundColor: colors.lime }]}>
            <AppIcon name="leaf" color="#17211C" size={25} />
          </View>
        </View>

        {homeProducts.length === 0 ? (
          <EmptyInventoryState onScan={() => router.push(visualRoutes.scanner)} />
        ) : (
          <>
            <HomeSoonCarousel products={soonProducts} onSelect={openProduct} />
            <View style={styles.inventoryHeading}>
              <AppText variant="heading">Opened products</AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                Most urgent first
              </AppText>
            </View>
            <HomeInventoryControls
              searchText={searchText}
              onSearchChange={setSearchText}
              filter={filter}
              onFilterChange={setFilter}
            />
            <HomeProductTable products={tableProducts} onSelect={openProduct} />
          </>
        )}
      </Screen>
      <BottomNavigation active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingBottom: spacing.md },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    gap: spacing.md,
  },
  headerCopy: { flex: 1 },
  brandMark: {
    width: 52,
    height: 52,
    borderRadius: radii.card,
    alignItems: "center",
    justifyContent: "center",
  },
  inventoryHeading: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    gap: spacing.xs,
  },
});
