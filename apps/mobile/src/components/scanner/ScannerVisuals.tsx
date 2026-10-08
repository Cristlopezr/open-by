import { Link } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ScannerPreviewState } from "@/features/mvp-visual/types";
import { products } from "@/features/mvp-visual/fixtures";
import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { AppIcon } from "@/components/ui/AppIcon";
import { PageHeader, ProductArtwork } from "@/components/ui/DesignSystem";
import {
  AppText,
  Card,
  Pill,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/VisualPrimitives";

export function ScannerVisuals({
  state,
  onClose,
  onRetry,
  onAdvance,
}: {
  state: ScannerPreviewState;
  onClose: () => void;
  onRetry: () => void;
  onAdvance: () => void;
}) {
  const { colors } = useVisualTheme();
  const success = state === "success";
  const failure = !["ready", "loading", "success"].includes(state);
  return (
    <SafeAreaView
      style={[s.root, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      <View style={s.header}>
        <PageHeader
          title="Barcode scanner"
          subtitle="Find a product in the catalog"
          onBack={onClose}
        />
      </View>
      <View style={[s.camera, { backgroundColor: colors.surfaceSecondary }]}>
        <View style={[s.cameraObject, { backgroundColor: colors.surface }]}>
          <ProductArtwork product={products[0]} size={160} />
        </View>
        <View style={[s.frame, { borderColor: colors.primary }]}>
          <View style={[s.scanLine, { backgroundColor: colors.primary }]} />
          {state === "loading" ? (
            <ActivityIndicator color={colors.primary} size="large" />
          ) : null}
        </View>
        <View style={[s.scannerBadge, { backgroundColor: colors.surface }]}>
          <AppIcon
            name={success ? "success" : "scan"}
            color={colors.primary}
            size={18}
          />
          <AppText variant="caption">
            {success ? "Product matched" : "Align the barcode inside the frame"}
          </AppText>
        </View>
        <View style={s.cameraTools}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Preview barcode match"
            onPress={onAdvance}
            style={StyleSheet.flatten([s.tool, { backgroundColor: colors.surface }])}
          >
            <AppIcon name="scan" color={colors.primary} />
          </Pressable>
          <Link href={visualRoutes.reportUnknown} asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Enter an unknown barcode"
              style={StyleSheet.flatten([s.tool, { backgroundColor: colors.surface }])}
            >
              <AppIcon name="edit" color={colors.textSecondary} />
            </Pressable>
          </Link>
        </View>
      </View>
      <View style={s.sheet}>
        {success ? (
          <>
            <View style={s.row}>
              <ProductArtwork product={products[0]} size={64} />
              <View style={s.flex}>
                <Pill
                  label="Verified catalog match"
                  color={colors.primary}
                  icon="shield"
                />
                <AppText variant="heading">{products[0].name}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>
                  {products[0].brand} · {products[0].quantity}
                </AppText>
              </View>
            </View>
            <View style={[s.rule, { backgroundColor: colors.surfaceLow }]}>
              <AppIcon name="clock" color={colors.primary} />
              <View style={s.flex}>
                <AppText variant="label">{products[0].lifetimeLabel}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>
                  {products[0].storageCondition}
                </AppText>
              </View>
            </View>
            <PrimaryButton
              label="Set opening date"
              icon="success"
              onPress={onAdvance}
            />
          </>
        ) : failure ? (
          <Card>
            <AppText variant="heading">Couldn’t read this product</AppText>
            <AppText color={colors.textSecondary}>
              Try the barcode again, or submit a product request.
            </AppText>
            <SecondaryButton label="Try again" onPress={onRetry} />
          </Card>
        ) : (
          <>
            <AppText variant="heading">Know it. Open it. Track it.</AppText>
            <AppText color={colors.textSecondary}>
              Scan the packaging to find its verified lifetime after opening.
            </AppText>
            <PrimaryButton
              label={
                state === "loading" ? "Show product match" : "Scan barcode"
              }
              icon="scan"
              onPress={onAdvance}
            />
          </>
        )}
        <Link href={visualRoutes.reportUnknown} asChild>
          <SecondaryButton label="Product not in the catalog?" />
        </Link>
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 20 },
  camera: {
    flex: 1,
    minHeight: 240,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cameraObject: {
    position: "absolute",
    borderRadius: 24,
    padding: 30,
    transform: [{ rotate: "-12deg" }],
    opacity: 0.65,
  },
  frame: {
    width: "78%",
    height: 158,
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  scanLine: { position: "absolute", height: 2, width: "100%" },
  scannerBadge: {
    position: "absolute",
    top: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
    flexDirection: "row",
    gap: 6,
  },
  cameraTools: {
    position: "absolute",
    bottom: 16,
    right: 20,
    flexDirection: "row",
    gap: 10,
  },
  tool: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  sheet: { padding: 20, gap: 14 },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  flex: { flex: 1, gap: 4 },
  rule: {
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
