import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { AppIcon } from "@/components/ui/AppIcon";
import { ChoiceChip, PageHeader } from "@/components/ui/DesignSystem";
import {
  AppText,
  Card,
  Screen,
  SecondaryButton,
} from "@/components/ui/VisualPrimitives";
import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";

export function PreferencesScreen() {
  const { colors, choice, setChoice } = useVisualTheme();
  const [reminders, setReminders] = useState(true);
  return (
    <View style={[s.root, { backgroundColor: colors.background }]}>
      <Screen contentStyle={s.content}>
        <PageHeader
          title="OpenBy"
          subtitle="Configuración"
          accountHref={visualRoutes.account}
        />
        <AppText variant="title">A tu manera.</AppText>
        <AppText color={colors.textSecondary}>
          Tu inventario. Tus preferencias.
        </AppText>
        <View style={[s.accountBanner, { backgroundColor: colors.primary }]}>
          <AppIcon name="cloud" color={colors.onPrimary} size={32} />
          <View style={s.flex}>
            <AppText variant="heading" color={colors.onPrimary}>
              Mantén todo sincronizado
            </AppText>
            <AppText variant="caption" color={colors.onPrimary}>
              Lleva tus productos abiertos a otro dispositivo.
            </AppText>
          </View>
        </View>
        <Link href={visualRoutes.account} asChild>
          <SecondaryButton
            label="Cuenta y respaldo"
            icon="account"
          />
        </Link>
        <AppText variant="caption" color={colors.textSecondary} style={s.label}>
          TU EXPERIENCIA
        </AppText>
        <Card style={s.section}>
          <View style={s.row}>
            <View
              style={[s.icon, { backgroundColor: colors.surfaceSecondary }]}
            >
              <AppIcon name="dark" color={colors.primary} />
            </View>
            <View style={s.flex}>
              <AppText variant="heading">Apariencia</AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                Claro, oscuro o según tu dispositivo
              </AppText>
            </View>
          </View>
          <View style={s.choices}>
            {(["light", "dark", "system"] as const).map((value) => (
              <ChoiceChip
                key={value}
                label={{ light: "Claro", dark: "Oscuro", system: "Sistema" }[value]}
                selected={choice === value}
                onPress={() => setChoice(value)}
              />
            ))}
          </View>
        </Card>
        <Card style={s.section}>
          <View style={s.row}>
            <View
              style={[s.icon, { backgroundColor: colors.surfaceSecondary }]}
            >
              <AppIcon name="notification" color={colors.primary} />
            </View>
            <View style={s.flex}>
              <AppText variant="heading">Recordatorios de vencimiento</AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                Recibe un aviso antes de que venza un producto
              </AppText>
            </View>
            <Switch
              accessibilityLabel="Recordatorios de vencimiento"
              value={reminders}
              onValueChange={setReminders}
              trackColor={{
                true: colors.primary,
                false: colors.surfaceSecondary,
              }}
            />
          </View>
          <View style={[s.preference, { backgroundColor: colors.surfaceLow }]}>
            <AppText variant="caption" color={colors.textSecondary}>
              RECORDATORIO PREDETERMINADO
            </AppText>
            <AppText variant="bodyMedium">1 día antes del vencimiento</AppText>
          </View>
        </Card>
        <AppText variant="caption" color={colors.textSecondary} style={s.label}>
          SOBRE TUS DATOS
        </AppText>
        <Card style={s.section}>
          <View style={s.row}>
            <AppIcon name="shield" color={colors.primary} />
            <AppText variant="heading">Guardado en tu dispositivo</AppText>
          </View>
          <AppText color={colors.textSecondary}>
            Sin una cuenta, tu inventario de productos abiertos permanece en este
            dispositivo. El catálogo compartido ofrece información pública de
            productos y reglas de apertura verificadas.
          </AppText>
        </Card>
        <View style={s.about}>
          <AppText variant="label" color={colors.primary}>
            OpenBy
          </AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            Un poco de cuidado. Menos desperdicio. · v1.0.0
          </AppText>
        </View>
      </Screen>
    </View>
  );
}
const s = StyleSheet.create({
  root: { flex: 1 },
  content: { gap: 16, paddingBottom: 24 },
  flex: { flex: 1, gap: 4 },
  accountBanner: {
    flexDirection: "row",
    alignItems: "center",
    padding: 20,
    borderRadius: 14,
    gap: 14,
  },
  section: { gap: 18 },
  row: { flexDirection: "row", gap: 12, alignItems: "center" },
  icon: {
    width: 42,
    height: 42,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  choices: { flexDirection: "row", gap: 8 },
  label: { letterSpacing: 1.5, marginTop: 8 },
  preference: { padding: 14, borderRadius: 8, gap: 6 },
  about: { alignItems: "center", paddingVertical: 14, gap: 5 },
});
