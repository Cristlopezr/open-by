import { useState } from "react";
import { ScrollView, StyleSheet, View } from "react-native";
import type { ReportPreviewState } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { AppIcon } from "@/components/ui/AppIcon";
import { ChoiceChip, InputField } from "@/components/ui/DesignSystem";
import {
  AppText,
  Card,
  PrimaryButton,
  SecondaryButton,
  StateNotice,
} from "@/components/ui/VisualPrimitives";

const brands = ["Casa Verde", "Valley Kitchen", "North Mill", "Pantry Table"];
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
  const [brand, setBrand] = useState("Pantry Table");
  const [search, setSearch] = useState("");
  return (
    <View style={s.content}>
      <View>
        <AppText variant="title">A new find?</AppText>
        <AppText color={colors.textSecondary}>
          Help us add this product to the shared catalog.
        </AppText>
      </View>
      <View style={[s.barcode, { backgroundColor: colors.warningSoft }]}>
        <AppIcon name="scan" color={colors.soon} />
        <View style={s.flex}>
          <AppText variant="label">Barcode not found</AppText>
          <AppText variant="caption" color={colors.soon}>
            {barcode}
          </AppText>
        </View>
      </View>
      <Card style={s.form}>
        <View style={s.sectionTitle}>
          <View style={[s.number, { backgroundColor: colors.primarySoft }]}>
            <AppText variant="label" color={colors.primary}>
              01
            </AppText>
          </View>
          <AppText variant="heading">Product information</AppText>
        </View>
        <InputField
          label="Product name"
          placeholder="e.g. Roasted red pepper spread"
          defaultValue="Roasted red pepper spread"
          icon="product"
        />
        <InputField
          label="Quantity / package size"
          placeholder="e.g. 280 g"
          defaultValue="280 g"
        />
      </Card>
      <Card style={s.form}>
        <View style={s.sectionTitle}>
          <View style={[s.number, { backgroundColor: colors.primarySoft }]}>
            <AppText variant="label" color={colors.primary}>
              02
            </AppText>
          </View>
          <AppText variant="heading">Choose an existing brand</AppText>
        </View>
        <InputField
          label="Search brands"
          placeholder="Search by name"
          icon="search"
          value={search}
          onChangeText={setSearch}
        />
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={s.chips}
        >
          {brands
            .filter((b) => b.toLowerCase().includes(search.toLowerCase()))
            .map((b) => (
              <ChoiceChip
                key={b}
                label={b}
                selected={brand === b}
                onPress={() => setBrand(b)}
              />
            ))}
        </ScrollView>
        <AppText variant="caption" color={colors.textSecondary}>
          Catalog brands are managed by the OpenBy team.
        </AppText>
      </Card>
      <StateNotice
        tone="info"
        title="Reviewed before publication"
        message="A product appears in the public catalog only after its opening rule is verified."
      />
      {state === "submitted" ? (
        <StateNotice
          tone="success"
          title="Request received"
          message="Your product is pending catalog review."
        />
      ) : null}
      <PrimaryButton
        label={
          state === "submitted"
            ? "Back to inventory"
            : state === "submitting"
              ? "Confirm request"
              : "Submit product request"
        }
        icon="success"
        onPress={onSubmit}
      />
      <SecondaryButton label="Cancel" onPress={onCancel} />
    </View>
  );
}
const s = StyleSheet.create({
  content: { gap: 18 },
  barcode: {
    padding: 14,
    borderRadius: 12,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
  flex: { flex: 1, gap: 4 },
  form: { gap: 18 },
  sectionTitle: { flexDirection: "row", alignItems: "center", gap: 10 },
  number: {
    width: 30,
    height: 30,
    borderRadius: 8,
    alignItems: "center",
    justifyContent: "center",
  },
  chips: { gap: 8 },
});
