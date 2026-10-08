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
        <AppText variant="title">¿Encontraste un producto nuevo?</AppText>
        <AppText color={colors.textSecondary}>
            Ayúdanos a agregarlo al catálogo compartido.
        </AppText>
      </View>
      <View style={[s.barcode, { backgroundColor: colors.warningSoft }]}>
        <AppIcon name="scan" color={colors.soon} />
        <View style={s.flex}>
          <AppText variant="label">Código de barras no encontrado</AppText>
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
          <AppText variant="heading">Información del producto</AppText>
        </View>
        <InputField
          label="Nombre del producto"
          placeholder="Ej.: pasta de pimentón asado"
          defaultValue="Pasta de pimentón asado"
          icon="product"
        />
        <InputField
          label="Cantidad / tamaño del envase"
          placeholder="Ej.: 280 g"
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
          <AppText variant="heading">Elige una marca existente</AppText>
        </View>
        <InputField
          label="Buscar marcas"
          placeholder="Buscar por nombre"
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
            Las marcas del catálogo son administradas por el equipo de OpenBy.
        </AppText>
      </Card>
      <StateNotice
        tone="info"
        title="Revisión antes de publicar"
        message="El producto aparecerá en el catálogo público cuando se verifique su regla de apertura."
      />
      {state === "submitted" ? (
        <StateNotice
          tone="success"
          title="Solicitud recibida"
          message="Tu producto está pendiente de revisión."
        />
      ) : null}
      <PrimaryButton
        label={
          state === "submitted"
            ? "Volver al inventario"
            : state === "submitting"
              ? "Confirmar solicitud"
              : "Enviar solicitud de producto"
        }
        icon="success"
        onPress={onSubmit}
      />
      <SecondaryButton label="Cancelar" onPress={onCancel} />
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
