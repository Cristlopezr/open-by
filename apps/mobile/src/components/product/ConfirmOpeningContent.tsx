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
      <PageHeader title="Agregar al inventario" onBack={onBack} />
      <Card style={s.identity}>
        <ProductArtwork product={product} size={80} />
        <View style={s.flex}>
          <Pill
            label="Regla de apertura verificada"
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
          DURACIÓN DESPUÉS DE ABRIR
        </AppText>
        <AppText variant="title" color={colors.primary}>
          {product.lifetimeLabel ?? "No disponible"}
        </AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {product.storageCondition}
        </AppText>
      </View>
      <AppText variant="heading">¿Cuándo lo abriste?</AppText>
      <View style={s.choices}>
        {[
          { value: "Today", label: "Hoy" },
          { value: "Yesterday", label: "Ayer" },
          { value: "Custom", label: "Otra fecha" },
        ].map(({ value, label }) => (
          <ChoiceChip
            key={value}
            label={label}
            selected={day === value}
            onPress={() => setDay(value)}
          />
        ))}
      </View>
      {day === "Custom" ? (
        <InputField
          label="Fecha de apertura"
          placeholder="YYYY-MM-DD"
          defaultValue="2026-09-14"
        />
      ) : null}
      <Card style={s.dates}>
        <View style={s.flex}>
          <AppText variant="caption" color={colors.textSecondary}>
            ABIERTO
          </AppText>
          <AppText variant="label">
            {day === "Today" ? product.openedAtLabel : day === "Yesterday" ? "Ayer" : "Otra fecha"}
          </AppText>
        </View>
        <View style={s.flex}>
          <AppText variant="caption" color={colors.textSecondary}>
            VENCIMIENTO ESTIMADO
          </AppText>
          <AppText variant="label">
            {product.expirationLabel ?? "No disponible"}
          </AppText>
        </View>
      </Card>
      {state === "added" ? (
        <StateNotice
          tone="success"
          title="Agregado a tu inventario"
          message="Puedes encontrarlo entre tus productos abiertos."
        />
      ) : (
        <StateNotice
          tone="neutral"
          title="Guardado en este dispositivo"
          message="Tus productos abiertos están disponibles sin una cuenta."
        />
      )}
      <PrimaryButton
        label={
          state === "added"
            ? "Volver al inventario"
            : state === "adding"
              ? "Confirmar apertura"
              : "Guardar en mi inventario"
        }
        icon="success"
        onPress={state === "added" ? onDone : onAdd}
      />
      <SecondaryButton label="Cancelar" onPress={onCancel} />
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
