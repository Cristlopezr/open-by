import { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import type {
  DetailsPreviewState,
  ProductFixture,
} from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { AppIcon } from "@/components/ui/AppIcon";
import { ProductArtwork } from "@/components/ui/DesignSystem";
import {
  AppText,
  Card,
  ConfirmationPanel,
  Pill,
  SecondaryButton,
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
  const [reminder, setReminder] = useState(true);
  const [finished, setFinished] = useState(false);
  const color = colors[product.status];
  if (state === "delete")
    return (
      <ConfirmationPanel
        title="Remove opened product?"
        message="Remove this item from your inventory."
        confirmLabel="Remove item"
        onConfirm={onCancelConfirmation}
        onCancel={onCancelConfirmation}
        destructive
      />
    );
  if (state === "discard")
    return (
      <ConfirmationPanel
        title="Edit opening date"
        message="Opening dates determine the estimated expiration of this item."
        confirmLabel="Keep current date"
        onConfirm={onCancelConfirmation}
        onCancel={onCancelConfirmation}
      />
    );
  return (
    <>
      <Card style={s.identity}>
        <ProductArtwork product={product} size={86} />
        <View style={s.flex}>
          <Pill label={product.categoryLabel} color={colors.textSecondary} />
          <AppText variant="heading">{product.name}</AppText>
          {product.brand || product.quantity ? (
            <AppText variant="caption" color={colors.textSecondary}>
              {[product.brand, product.quantity].filter(Boolean).join(" · ")}
            </AppText>
          ) : null}
          <AppText variant="caption" color={colors.textSecondary}>
            {product.barcode}
          </AppText>
        </View>
      </Card>
      <Card style={s.gaugeCard}>
        <Pill
          label={
            finished
              ? "Finished"
              : product.status === "unknown"
                ? "Lifetime unavailable"
                : product.status === "soon"
                  ? "Use soon"
                  : product.status === "expired"
                    ? "Expired"
                    : "Fresh & active"
          }
          color={color}
        />
        <View
          style={[
            s.gauge,
            {
              borderColor: colors.surfaceSecondary,
              borderTopColor: color,
              borderRightColor: color,
              borderBottomColor:
                product.status === "fresh" ? color : colors.surfaceSecondary,
            },
          ]}
        >
          <AppIcon
            name={product.status === "expired" ? "warning" : "clock"}
            color={color}
            size={26}
          />
          <AppText variant="title" color={color} style={s.center}>
            {product.remainingLabel}
          </AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            after opening
          </AppText>
        </View>
        <View style={s.timeline}>
          <View style={[s.date, { backgroundColor: colors.surfaceLow }]}>
            <AppText variant="caption" color={colors.textSecondary}>
              OPENED
            </AppText>
            <AppText variant="label">{product.openedAtLabel}</AppText>
          </View>
          <View style={[s.date, { backgroundColor: colors.surfaceLow }]}>
            <AppText variant="caption" color={colors.textSecondary}>
              ESTIMATED EXPIRATION
            </AppText>
            <AppText variant="label">
              {product.expirationLabel ?? "Unavailable"}
            </AppText>
          </View>
        </View>
      </Card>
      <View style={s.sectionTitle}>
        <AppText variant="heading">Storage guide</AppText>
        {product.trust === "trusted" ? (
          <AppText variant="caption" color={colors.primary}>
            ✓ Verified rule
          </AppText>
        ) : null}
      </View>
      <Card style={s.guide}>
        <GuideRow
          icon="category"
          title={product.storageCondition ?? "Storage unavailable"}
          text={
            product.storageInstruction ??
            "No verified instruction is available."
          }
        />
        <View style={[s.line, { backgroundColor: colors.surfaceSecondary }]} />
        <GuideRow
          icon="clock"
          title="Lifetime after opening"
          text={product.lifetimeLabel ?? "No verified lifetime available."}
        />
      </Card>
      <AppText variant="heading">Expiration reminder</AppText>
      <Card style={s.identity}>
        <AppIcon name="notification" color={colors.primary} />
        <View style={s.flex}>
          <AppText variant="label">Remind me before expiration</AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            {product.reminderLabel}
          </AppText>
        </View>
        <Switch
          accessibilityLabel="Expiration reminder"
          value={reminder}
          onValueChange={setReminder}
          trackColor={{ true: colors.primary, false: colors.surfaceSecondary }}
        />
      </Card>
      <SecondaryButton
        label={finished ? "Marked as finished" : "Mark as finished / empty"}
        icon="success"
        onPress={() => setFinished(!finished)}
      />
      <SecondaryButton
        label="Edit opening date"
        icon="edit"
        onPress={onDiscard}
      />
      <SecondaryButton
        label="Discard & remove"
        icon="delete"
        destructive
        onPress={onDelete}
      />
    </>
  );
}
function GuideRow({
  icon,
  title,
  text,
}: {
  icon: "category" | "clock";
  title: string;
  text: string;
}) {
  const { colors } = useVisualTheme();
  return (
    <View style={s.guideRow}>
      <View style={[s.guideIcon, { backgroundColor: colors.surfaceSecondary }]}>
        <AppIcon name={icon} color={colors.primary} size={20} />
      </View>
      <View style={s.flex}>
        <AppText variant="bodyMedium">{title}</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {text}
        </AppText>
      </View>
    </View>
  );
}
const s = StyleSheet.create({
  flex: { flex: 1, minWidth: 0, gap: 5 },
  identity: { flexDirection: "row", gap: 14, alignItems: "center" },
  gaugeCard: { alignItems: "center", gap: 18 },
  gauge: {
    width: 198,
    height: 198,
    borderWidth: 9,
    borderRadius: 99,
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    padding: 16,
  },
  center: { textAlign: "center", fontSize: 25 },
  timeline: { flexDirection: "row", gap: 8, alignSelf: "stretch" },
  date: { flex: 1, padding: 12, borderRadius: 8, gap: 6 },
  sectionTitle: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  guide: { gap: 16 },
  guideRow: { flexDirection: "row", gap: 12 },
  guideIcon: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  line: { height: 1 },
});
