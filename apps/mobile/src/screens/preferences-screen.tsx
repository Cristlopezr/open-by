import { Link } from "expo-router";
import { useState } from "react";
import { StyleSheet, Switch, View } from "react-native";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
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
          subtitle="Settings"
          accountHref={visualRoutes.account}
        />
        <AppText variant="title">Make it yours.</AppText>
        <AppText color={colors.textSecondary}>
          Your inventory. Your preferences.
        </AppText>
        <View style={[s.accountBanner, { backgroundColor: colors.primary }]}>
          <AppIcon name="cloud" color={colors.onPrimary} size={32} />
          <View style={s.flex}>
            <AppText variant="heading" color={colors.onPrimary}>
              Keep everything in sync
            </AppText>
            <AppText variant="caption" color={colors.onPrimary}>
              Bring your opened products to another device.
            </AppText>
          </View>
        </View>
        <Link href={visualRoutes.account} asChild>
          <SecondaryButton
            label="Account & backup"
            icon="account"
          />
        </Link>
        <AppText variant="caption" color={colors.textSecondary} style={s.label}>
          YOUR EXPERIENCE
        </AppText>
        <Card style={s.section}>
          <View style={s.row}>
            <View
              style={[s.icon, { backgroundColor: colors.surfaceSecondary }]}
            >
              <AppIcon name="dark" color={colors.primary} />
            </View>
            <View style={s.flex}>
              <AppText variant="heading">Appearance</AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                Light, dark or follow your device
              </AppText>
            </View>
          </View>
          <View style={s.choices}>
            {(["light", "dark", "system"] as const).map((value) => (
              <ChoiceChip
                key={value}
                label={value[0].toUpperCase() + value.slice(1)}
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
              <AppText variant="heading">Expiration reminders</AppText>
              <AppText variant="caption" color={colors.textSecondary}>
                A heads-up before an item expires
              </AppText>
            </View>
            <Switch
              accessibilityLabel="Expiration reminders"
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
              DEFAULT REMINDER
            </AppText>
            <AppText variant="bodyMedium">1 day before expiration</AppText>
          </View>
        </Card>
        <AppText variant="caption" color={colors.textSecondary} style={s.label}>
          ABOUT YOUR DATA
        </AppText>
        <Card style={s.section}>
          <View style={s.row}>
            <AppIcon name="shield" color={colors.primary} />
            <AppText variant="heading">Local by default</AppText>
          </View>
          <AppText color={colors.textSecondary}>
            Without an account, your opened inventory stays on this device. The
            shared catalog provides public product information and verified
            opening rules.
          </AppText>
        </Card>
        <View style={s.about}>
          <AppText variant="label" color={colors.primary}>
            OpenBy
          </AppText>
          <AppText variant="caption" color={colors.textSecondary}>
            A little care. A little less waste. · v1.0.0
          </AppText>
        </View>
      </Screen>
      <BottomNavigation active="preferences" />
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
