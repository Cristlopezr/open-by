import { useState } from "react";
import { StyleSheet, View } from "react-native";
import type {
  ConfirmPreviewState,
  ProductFixture,
} from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import {
  ChoiceChip,
  InputField,
  PageHeader,
  ProductArtwork,
} from "@/components/ui/DesignSystem";
import {
  AppText,
  Card,
  Pill,
  PrimaryButton,
  Screen,
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
  const [day, setDay] = useState("Today");
  return (
    <Screen>
      <PageHeader title="Add to inventory" onBack={onBack} />
      <Card style={s.identity}>
        <ProductArtwork product={product} size={80} />
        <View style={s.flex}>
          <Pill
            label="Verified opening rule"
            color={colors.primary}
            icon="shield"
          />
          <AppText variant="heading">{product.name}</AppText>
          {product.brand || product.quantity ? (
            <AppText color={colors.textSecondary}>
              {[product.brand, product.quantity].filter(Boolean).join(" · ")}
            </AppText>
          ) : null}
        </View>
      </Card>
      <View style={[s.lifetime, { backgroundColor: colors.primarySoft }]}>
        <AppText variant="caption" color={colors.primary}>
          LIFETIME AFTER OPENING
        </AppText>
        <AppText variant="title" color={colors.primary}>
          {product.lifetimeLabel ?? "Unavailable"}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {product.storageCondition}
        </AppText>
      </View>
      <AppText variant="heading">When did you open it?</AppText>
      <View style={s.choices}>
        {["Today", "Yesterday", "Custom"].map((value) => (
          <ChoiceChip
            key={value}
            label={value}
            selected={day === value}
            onPress={() => setDay(value)}
          />
        ))}
      </View>
      {day === "Custom" ? (
        <InputField
          label="Opening date"
          placeholder="YYYY-MM-DD"
          defaultValue="2026-09-14"
        />
      ) : null}
      <Card style={s.dates}>
        <View style={s.flex}>
          <AppText variant="caption" color={colors.textSecondary}>
            OPENED
          </AppText>
          <AppText variant="label">
            {day === "Today" ? product.openedAtLabel : day}
          </AppText>
        </View>
        <View style={s.flex}>
          <AppText variant="caption" color={colors.textSecondary}>
            ESTIMATED EXPIRATION
          </AppText>
          <AppText variant="label">
            {product.expirationLabel ?? "Unavailable"}
          </AppText>
        </View>
      </Card>
      {state === "added" ? (
        <StateNotice
          tone="success"
          title="Added to your inventory"
          message="You can find the product in your opened items."
        />
      ) : (
        <StateNotice
          tone="neutral"
          title="Stored on this device"
          message="Your opened products are available without an account."
        />
      )}
      <PrimaryButton
        label={
          state === "added"
            ? "Back to inventory"
            : state === "adding"
              ? "Confirm opening"
              : "Save to my inventory"
        }
        icon="success"
        onPress={state === "added" ? onDone : onAdd}
      />
      <SecondaryButton label="Cancel" onPress={onCancel} />
    </Screen>
  );
}
const s = StyleSheet.create({
  identity: { flexDirection: "row", alignItems: "center", gap: 14 },
  flex: { flex: 1, minWidth: 0, gap: 6 },
  lifetime: { borderRadius: 12, padding: 22, gap: 8 },
  choices: { flexDirection: "row", gap: 10 },
  dates: { flexDirection: "row", gap: 16 },
});
