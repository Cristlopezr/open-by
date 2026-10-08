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
        title="¿Eliminar el producto abierto?"
        message="Elimina este producto de tu inventario."
        confirmLabel="Eliminar producto"
        onConfirm={onCancelConfirmation}
        onCancel={onCancelConfirmation}
        destructive
      />
    );
  if (state === "discard")
    return (
      <ConfirmationPanel
        title="Editar fecha de apertura"
        message="La fecha de apertura determina el vencimiento estimado de este producto."
        confirmLabel="Mantener fecha actual"
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
              ? "Terminado"
              : product.status === "unknown"
                ? "Duración no disponible"
                : product.status === "soon"
                  ? "Usar pronto"
                  : product.status === "expired"
                    ? "Vencido"
                    : "Vigente"
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
              después de abrir
          </AppText>
        </View>
        <View style={s.timeline}>
          <View style={[s.date, { backgroundColor: colors.surfaceLow }]}>
            <AppText variant="caption" color={colors.textSecondary}>
                ABIERTO
            </AppText>
            <AppText variant="label">{product.openedAtLabel}</AppText>
          </View>
          <View style={[s.date, { backgroundColor: colors.surfaceLow }]}>
            <AppText variant="caption" color={colors.textSecondary}>
                VENCIMIENTO ESTIMADO
            </AppText>
            <AppText variant="label">
                {product.expirationLabel ?? "No disponible"}
            </AppText>
          </View>
        </View>
      </Card>
      <View style={s.sectionTitle}>
        <AppText variant="heading">Guía de conservación</AppText>
        {product.trust === "trusted" ? (
          <AppText variant="caption" color={colors.primary}>
              ✓ Regla verificada
          </AppText>
        ) : null}
      </View>
      <Card style={s.guide}>
        <GuideRow
          icon="category"
          title={product.storageCondition ?? "Conservación no disponible"}
          text={
            product.storageInstruction ??
            "No hay instrucciones verificadas disponibles."
          }
        />
        <View style={[s.line, { backgroundColor: colors.surfaceSecondary }]} />
        <GuideRow
          icon="clock"
          title="Duración después de abrir"
          text={product.lifetimeLabel ?? "No hay una duración verificada disponible."}
        />
      </Card>
      <AppText variant="heading">Recordatorio de vencimiento</AppText>
      <Card style={s.identity}>
        <AppIcon name="notification" color={colors.primary} />
        <View style={s.flex}>
          <AppText variant="label">Avisarme antes del vencimiento</AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            {product.reminderLabel}
          </AppText>
        </View>
        <Switch
          accessibilityLabel="Recordatorio de vencimiento"
          value={reminder}
          onValueChange={setReminder}
          trackColor={{ true: colors.primary, false: colors.surfaceSecondary }}
        />
      </Card>
      <SecondaryButton
        label={finished ? "Marcado como terminado" : "Marcar como terminado o vacío"}
        icon="success"
        onPress={() => setFinished(!finished)}
      />
      <SecondaryButton
        label="Editar fecha de apertura"
        icon="edit"
        onPress={onDiscard}
      />
      <SecondaryButton
        label="Descartar y eliminar"
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
