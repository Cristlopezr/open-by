import { Pressable, StyleSheet, View } from "react-native";

import type { PreferencesPreviewState, ThemeChoice } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, sizes, spacing } from "@/theme/tokens";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";
import { AppText, Card, Pill, StateNotice } from "@/components/ui/VisualPrimitives";

const themeOptions: { value: ThemeChoice; label: string; icon: AppIconName }[] = [
  { value: "light", label: "Light", icon: "light" },
  { value: "dark", label: "Dark", icon: "dark" },
  { value: "system", label: "System", icon: "system" },
];

export function PreferencesContent({ state }: { state: PreferencesPreviewState }) {
  const { choice, appearance, colors, setChoice } = useVisualTheme();
  const denied = state === "notificationsDenied";

  return (
    <View style={styles.content}>
      <PreferenceSection icon="notification" title="Notifications" subtitle="Choose when OpenBy reminds you">
        {denied ? (
          <StateNotice tone="warning" title="Notifications are disabled" message="Enable permission in Settings to receive reminders." actionLabel="Open settings" />
        ) : (
          <View style={styles.settingRow}>
            <View style={styles.settingCopy}>
              <AppText variant="label">Permission status</AppText>
              <AppText color={colors.textSecondary}>Allowed</AppText>
            </View>
            <Pill label="On" color={colors.fresh} icon="success" />
          </View>
        )}
        <View style={[styles.divider, { backgroundColor: colors.border }]} />
        <View style={styles.settingRow}>
          <View style={styles.settingCopy}>
            <AppText variant="label">Default reminder</AppText>
            <AppText color={colors.textSecondary}>1 day before expiration</AppText>
          </View>
          <AppText variant="label" color={colors.primary}>Change</AppText>
        </View>
      </PreferenceSection>

      <PreferenceSection icon="light" title="Appearance" subtitle="Choose how OpenBy looks">
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
            Following your device · currently {appearance}
          </AppText>
        ) : null}
      </PreferenceSection>

      <PreferenceSection icon="shield" title="Data and Privacy" subtitle="Your inventory, your choice">
        <AppText color={colors.textSecondary}>Without an account, your personal inventory remains on this device and is not sent to the backend.</AppText>
      </PreferenceSection>

      <PreferenceSection icon="info" title="About OpenBy" subtitle="Simple freshness, less waste">
        <View style={styles.settingRow}>
          <AppText color={colors.textSecondary}>Version</AppText>
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
