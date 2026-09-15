import { ScrollView, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { ConfirmPreviewState, ProductFixture } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, shadows, sizes, spacing } from "@/theme/tokens";
import { AppIcon } from "@/components/ui/AppIcon";
import {
  AppText,
  Card,
  ConfirmationPanel,
  FieldDisplay,
  IconButton,
  Pill,
  PrimaryButton,
  SecondaryButton,
  StateNotice,
} from "@/components/ui/VisualPrimitives";

export function ConfirmOpeningContent({
  product,
  state,
  onBack,
  onAdd,
  onCancel,
  onDone,
}: {
  product: ProductFixture;
  state: ConfirmPreviewState;
  onBack: () => void;
  onAdd: () => void;
  onCancel: () => void;
  onDone: () => void;
}) {
  const { colors } = useVisualTheme();
  const unknown = state === "unknown";

  return (
    <SafeAreaView style={[styles.safe, { backgroundColor: colors.background }]} edges={["top", "bottom"]}>
      <View style={styles.header}>
        <IconButton icon="back" label="Back to scanner" onPress={onBack} />
        <AppText variant="heading">Confirm opening</AppText>
        <View style={styles.headerSpacer} />
      </View>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        {state === "discard" ? (
          <ConfirmationPanel title="Discard this product?" message="Nothing will be added to your opened products." confirmLabel="Discard" onConfirm={onCancel} onCancel={onBack} destructive />
        ) : (
          <>
            <Card style={styles.summary}>
              <View style={[styles.productIcon, { backgroundColor: colors.primarySoft }]}><AppIcon name="product" color={colors.primary} size={30} /></View>
              <View style={styles.summaryCopy}>
                <AppText variant="heading">{product.name}</AppText>
                <AppText color={colors.textSecondary}>{product.brand}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>{product.barcode}</AppText>
              </View>
              <Pill label={product.trust === "trusted" ? "Trusted catalog" : "Unverified"} color={product.trust === "trusted" ? colors.fresh : colors.unknown} icon="shield" />
            </Card>

            <FieldDisplay label="Opened" value={product.openedAtLabel} icon="clock" />

            {unknown ? (
              <StateNotice tone="neutral" title="Lifetime unavailable" message="No trusted post-opening lifetime is available, so no expiration date is shown." />
            ) : (
              <View style={[styles.lifetime, { backgroundColor: colors.primarySoft }]}>
                <AppIcon name="leaf" color={colors.primary} size={28} />
                <View style={styles.lifetimeCopy}>
                  <AppText variant="caption" color={colors.primary}>RECOMMENDED LIFETIME</AppText>
                  <AppText variant="heading" color={colors.primary}>{product.lifetimeLabel}</AppText>
                  <AppText color={colors.textSecondary}>Representative expiration · {product.expirationLabel}</AppText>
                </View>
              </View>
            )}

            <Card style={styles.reminder}>
              <View style={[styles.smallIcon, { backgroundColor: colors.infoSoft }]}><AppIcon name="notification" color={colors.info} /></View>
              <View style={styles.summaryCopy}>
                <AppText variant="label">Reminder</AppText>
                <AppText color={colors.textSecondary}>Notify me {product.reminderLabel.toLowerCase()}</AppText>
              </View>
              <AppText variant="label" color={colors.primary}>Change</AppText>
            </Card>

            {state === "added" ? <StateNotice tone="success" title="Product added" message="The product is visually ready in your opened inventory." /> : null}
          </>
        )}
      </ScrollView>

      {state !== "discard" ? (
        <View style={[styles.footer, shadows.card, { backgroundColor: colors.surface, borderColor: colors.border }]}>
          {state === "added" ? (
            <PrimaryButton label="Back to Home" icon="home" onPress={onDone} />
          ) : (
            <>
              <PrimaryButton label={state === "adding" ? "Adding product…" : "Add product"} loading={state === "adding"} onPress={onAdd} />
              <SecondaryButton label="Cancel and return to Scanner" onPress={onCancel} />
            </>
          )}
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1 },
  header: { minHeight: 64, paddingHorizontal: sizes.horizontalMargin, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  headerSpacer: { width: sizes.touch },
  content: { paddingHorizontal: sizes.horizontalMargin, paddingBottom: spacing.xl, gap: spacing.md },
  summary: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  productIcon: { width: 58, height: 58, borderRadius: radii.control, alignItems: "center", justifyContent: "center" },
  smallIcon: { width: 44, height: 44, borderRadius: 22, alignItems: "center", justifyContent: "center" },
  summaryCopy: { flex: 1, gap: 2 },
  lifetime: { borderRadius: radii.card, padding: spacing.lg, flexDirection: "row", alignItems: "flex-start", gap: spacing.sm },
  lifetimeCopy: { flex: 1, gap: spacing.xxs },
  reminder: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  footer: { borderTopWidth: 1, paddingHorizontal: sizes.horizontalMargin, paddingTop: spacing.sm, paddingBottom: spacing.sm, gap: spacing.xs },
});
