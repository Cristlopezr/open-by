import { StyleSheet, View } from "react-native";

import type { ReportPreviewState } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/theme/tokens";
import {
  AppText,
  Card,
  FieldDisplay,
  PrimaryButton,
  SecondaryButton,
  StateNotice,
} from "@/components/ui/VisualPrimitives";

export function UnknownProductForm({
  barcode,
  state,
  onSubmit,
  onCancel,
}: {
  barcode: string;
  state: ReportPreviewState;
  onSubmit: () => void;
  onCancel: () => void;
}) {
  const { colors } = useVisualTheme();
  return (
    <View style={styles.content}>
      <Card style={styles.barcodeCard}>
        <AppText variant="caption" color={colors.textSecondary}>SCANNED BARCODE</AppText>
        <AppText variant="heading">{barcode}</AppText>
        <AppText color={colors.textSecondary}>This product is not in the shared catalog yet.</AppText>
      </Card>

      <StateNotice tone="info" title="Community submission" message="Your information stays unverified until it is reviewed. It will not appear as trusted catalog data." />

      <View style={styles.fields}>
        <FieldDisplay label="Product name" value="Roasted red pepper spread" icon="product" />
        <FieldDisplay label="Brand" value="Pantry Table" />
        <FieldDisplay label="Quantity or package size" value="280 g" />
        <View style={styles.fieldRow}>
          <View style={styles.flex}><FieldDisplay label="Estimated lifetime" value="5" /></View>
          <View style={styles.flex}><FieldDisplay label="Unit" value="Days" /></View>
        </View>
      </View>

      <StateNotice tone="neutral" title="Unverified information" message="The estimated lifetime is a user submission and is not trusted guidance." />

      {state === "submitted" ? <StateNotice tone="success" title="Product submitted" message="Thanks. It remains unverified while awaiting review." /> : null}

      <PrimaryButton label={state === "submitting" ? "Submitting product…" : state === "submitted" ? "Return Home" : "Submit product"} loading={state === "submitting"} onPress={onSubmit} />
      <SecondaryButton label="Cancel and return Home" onPress={onCancel} />
    </View>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.md },
  barcodeCard: { gap: spacing.xxs },
  fields: { gap: spacing.sm },
  fieldRow: { flexDirection: "row", gap: spacing.xs },
  flex: { flex: 1 },
});
