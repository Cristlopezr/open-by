import { StyleSheet, View } from "react-native";

import type { DetailsPreviewState, ProductFixture } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, spacing } from "@/theme/tokens";
import { AppIcon } from "@/components/ui/AppIcon";
import {
  AppText,
  Card,
  ConfirmationPanel,
  FieldDisplay,
  Pill,
  SecondaryButton,
  StateNotice,
} from "@/components/ui/VisualPrimitives";

export function ProductDetailsContent({
  product,
  state,
  onDelete,
  onDiscard,
  onCancelConfirmation,
}: {
  product: ProductFixture;
  state: DetailsPreviewState;
  onDelete: () => void;
  onDiscard: () => void;
  onCancelConfirmation: () => void;
}) {
  const { colors } = useVisualTheme();
  const statusColor = colors[product.status];

  if (state === "delete") {
    return <ConfirmationPanel title="Delete this product?" message="This removes it from the representative inventory." confirmLabel="Delete product" destructive onCancel={onCancelConfirmation} />;
  }
  if (state === "discard") {
    return <ConfirmationPanel title="Discard your changes?" message="The representative opening and reminder information will stay unchanged." confirmLabel="Discard changes" onCancel={onCancelConfirmation} />;
  }

  return (
    <>
      <View style={[styles.statusHero, { backgroundColor: `${statusColor}18` }]}>
        <Pill
          label={product.status === "soon" ? "Use soon" : product.status === "unknown" ? "Lifetime unknown" : product.status[0].toUpperCase() + product.status.slice(1)}
          color={statusColor}
          icon={product.status === "expired" ? "error" : product.status === "soon" ? "warning" : product.status === "fresh" ? "leaf" : "info"}
        />
        <AppText variant="display" color={statusColor}>{product.remainingLabel}</AppText>
        <AppText color={colors.textSecondary}>{product.expirationLabel ? `Exact expiration · ${product.expirationLabel}` : "No trusted expiration date available"}</AppText>
      </View>

      <Card style={styles.productCard}>
        <View style={[styles.productIcon, { backgroundColor: colors.surfaceSecondary }]}><AppIcon name="product" color={colors.primary} size={32} /></View>
        <View style={styles.copy}>
          <AppText variant="heading">{product.name || "Unnamed product"}</AppText>
          <AppText color={colors.textSecondary}>{product.brand || "Brand unavailable"}</AppText>
          <AppText variant="caption" color={colors.textSecondary}>{product.barcode}</AppText>
        </View>
        <Pill label={product.trust === "trusted" ? "Trusted" : "Unverified"} color={product.trust === "trusted" ? colors.fresh : colors.unknown} icon="shield" />
      </Card>

      <View style={styles.section}>
        <AppText variant="heading">Opening and lifetime</AppText>
        <FieldDisplay label="Opened" value={product.openedAtLabel} icon="clock" />
        {product.lifetimeLabel ? <FieldDisplay label="Recommended lifetime" value={product.lifetimeLabel} icon="leaf" /> : <StateNotice tone="neutral" title="Lifetime unavailable" message="No shelf life or expiration estimate has been invented." />}
      </View>

      <Card style={styles.reminderCard}>
        <View style={[styles.roundIcon, { backgroundColor: colors.infoSoft }]}><AppIcon name="notification" color={colors.info} /></View>
        <View style={styles.copy}>
          <AppText variant="label">Reminder</AppText>
          <AppText color={colors.textSecondary}>{product.reminderLabel}</AppText>
        </View>
      </Card>

      <View style={styles.secondaryActions}>
        <SecondaryButton label="Change opening date" icon="edit" onPress={onDiscard} style={styles.flexButton} />
        <SecondaryButton label="Change reminder" icon="notification" onPress={onDiscard} style={styles.flexButton} />
      </View>

      <View style={[styles.dangerZone, { borderColor: colors.border }]}>
        <SecondaryButton label="Mark as finished" icon="success" />
        <SecondaryButton label="Delete product" icon="delete" destructive onPress={onDelete} />
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  statusHero: { borderRadius: radii.card, padding: spacing.xl, gap: spacing.xs },
  productCard: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  productIcon: { width: 60, height: 60, borderRadius: radii.control, alignItems: "center", justifyContent: "center" },
  roundIcon: { width: 48, height: 48, borderRadius: 24, alignItems: "center", justifyContent: "center" },
  copy: { flex: 1, gap: 2 },
  section: { gap: spacing.sm },
  reminderCard: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  secondaryActions: { flexDirection: "row", gap: spacing.xs },
  flexButton: { flex: 1 },
  dangerZone: { borderTopWidth: 1, marginTop: spacing.sm, paddingTop: spacing.xl, gap: spacing.xs },
});
