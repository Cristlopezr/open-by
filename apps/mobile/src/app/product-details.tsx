import { useLocalSearchParams, useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";

import { ProductDetailsContent } from "@/components/product/ProductDetailsContent";
import { AppText, IconButton, Screen } from "@/components/ui/VisualPrimitives";
import { homeProducts, products } from "@/features/mvp-visual/fixtures";
import type { DetailsPreviewState } from "@/features/mvp-visual/types";
import { sizes, spacing } from "@/theme/tokens";

export default function ProductDetailsScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams<{ id?: string }>();
  const product = homeProducts.find((entry) => entry.id === id) ?? products[0];
  const [state, setState] = useState<DetailsPreviewState>(product.status);

  useEffect(() => {
    setState(product.status);
  }, [product.id, product.status]);

  return (
    <Screen>
      <View style={styles.header}>
        <IconButton icon="back" label="Back to Home" onPress={() => router.back()} />
        <AppText variant="heading">Product details</AppText>
        <View style={styles.spacer} />
      </View>
      <ProductDetailsContent
        product={product}
        state={state}
        onDelete={() => setState("delete")}
        onDiscard={() => setState("discard")}
        onCancelConfirmation={() => setState(product.status)}
      />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm },
  spacer: { width: sizes.touch },
});
