import { Pressable, StyleSheet, View } from "react-native";

import type { PreferencesPreviewState, ThemeChoice } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, sizes, spacing } from "@/theme/tokens";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";
import { AppText, Card, Pill, StateNotice } from "@/components/ui/VisualPrimitives";

const themeOptions: { value: ThemeChoice; label: string; icon: AppIconName }[] = [
  { value: "light", label: "Claro", icon: "light" },
  { value: "dark", label: "Oscuro", icon: "dark" },
  { value: "system", label: "Sistema", icon: "system" },
];

export function PreferencesContent({ state, onOpenAccount }: { state: PreferencesPreviewState; onOpenAccount: () => void }) {
  const { choice, appearance, colors, setChoice } = useVisualTheme();
  const denied = state === "notificationsDenied";

  return (
    <View style={styles.content}>
      <PreferenceSection icon="notification" title="Notificaciones" subtitle="Elige cuándo quieres recibir recordatorios">
        {denied ? (
          <StateNotice tone="warning" title="Las notificaciones están desactivadas" message="Activa el permiso en la configuración para recibir recordatorios." actionLabel="Abrir configuración" />
        ) : (
          <View style={styles.settingRow}>
            <View style={styles.settingCopy}>
              <AppText variant="label">Estado del permiso</AppText>
              <AppText color={colors.textSecondary}>Permitido</AppText>
            </View>
            <Pill label="Activado" color={colors.fresh} icon="success" />
          </View>
        )}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.settingRow}>
          <View style={styles.settingCopy}>
            <AppText variant="label">Recordatorio predeterminado</AppText>
            <AppText color={colors.textSecondary}>1 día antes del vencimiento</AppText>
          </View>
          <AppText variant="label" color={colors.primary}>Cambiar</AppText>
        </View>
      </PreferenceSection>

      <PreferenceSection icon="light" title="Apariencia" subtitle="Elige cómo se ve OpenBy">
        <View style={styles.themeRow}>
          {themeOptions.map((option) => {
            const selected = choice === option.value;
            return (
              <Pressable
                accessibilityRole="button"
                accessibilityState={{ selected }}
                key={option.value}
                onPress={() => setChoice(option.value)}
                style={[
                  styles.themeChoice,
                  { borderColor: selected ? colors.primary : colors.border, backgroundColor: selected ? colors.primarySoft : colors.surface },
                ]}
              >
                <AppIcon name={option.icon} color={selected ? colors.primary : colors.textSecondary} />
                <AppText variant="label" color={selected ? colors.primary : colors.textSecondary}>{option.label}</AppText>
                <View style={[styles.radio, { borderColor: selected ? colors.primary : colors.border }]}>{selected ? <View style={[styles.radioDot, { backgroundColor: colors.primary }]} /> : null}</View>
              </Pressable>
            );
          })}
        </View>
        {choice === "system" ? (
          <AppText variant="caption" color={colors.textSecondary}>
              Según tu dispositivo · actualmente {appearance === "dark" ? "oscuro" : "claro"}
          </AppText>
        ) : null}
      </PreferenceSection>

      <PreferenceSection icon="shield" title="Datos y privacidad" subtitle="Tú decides sobre tu inventario">
        <AppText color={colors.textSecondary}>Sin una cuenta, tu inventario personal permanece en este dispositivo y no se envía al servidor.</AppText>
      </PreferenceSection>

      <PreferenceSection icon="cloud" title="Cuenta y respaldo" subtitle="Lleva tus productos abiertos contigo">
        <View style={styles.settingRow}>
          <View style={styles.settingCopy}>
            <AppText variant="label">Respaldo en la nube</AppText>
            <AppText color={colors.textSecondary}>Configura o revisa el acceso a tu cuenta</AppText>
          </View>
          <Pressable accessibilityRole="button" onPress={onOpenAccount}>
            <AppText variant="label" color={colors.primary}>Abrir</AppText>
          </Pressable>
        </View>
      </PreferenceSection>

      <PreferenceSection icon="info" title="Acerca de OpenBy" subtitle="Productos vigentes, menos desperdicio">
        <View style={styles.settingRow}>
            <AppText color={colors.textSecondary}>Versión</AppText>
          <AppText variant="label">1.0.0</AppText>
        </View>
      </PreferenceSection>
    </View>
  );
}

function PreferenceSection({ icon, title, subtitle, children }: { icon: AppIconName; title: string; subtitle: string; children: React.ReactNode }) {
  const { colors } = useVisualTheme();
  return (
    <Card style={styles.section}>
      <View style={styles.sectionHeader}>
        <View style={[styles.sectionIcon, { backgroundColor: colors.primarySoft }]}><AppIcon name={icon} color={colors.primary} /></View>
        <View style={styles.settingCopy}>
          <AppText variant="heading">{title}</AppText>
          <AppText variant="caption" color={colors.textSecondary}>{subtitle}</AppText>
        </View>
      </View>
      {children}
    </Card>
  );
}

const styles = StyleSheet.create({
  content: { gap: spacing.md },
  section: { gap: spacing.md },
  sectionHeader: { flexDirection: "row", alignItems: "center", gap: spacing.sm },
  sectionIcon: { width: sizes.touch, height: sizes.touch, borderRadius: radii.control, alignItems: "center", justifyContent: "center" },
  settingRow: { minHeight: sizes.touch, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.md },
  settingCopy: { flex: 1, gap: 2 },
  divider: { height: 1 },
  themeRow: { flexDirection: "row", gap: spacing.xs },
  themeChoice: { flex: 1, minHeight: 98, borderRadius: radii.control, borderWidth: 2, alignItems: "center", justifyContent: "center", gap: spacing.xs, padding: spacing.xs },
  radio: { width: 18, height: 18, borderWidth: 2, borderRadius: 9, alignItems: "center", justifyContent: "center" },
  radioDot: { width: 8, height: 8, borderRadius: 4 },
});
