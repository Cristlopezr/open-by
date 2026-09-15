import { StyleSheet, View } from "react-native";

import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { PreferencesContent } from "@/components/preferences/PreferencesContent";
import { AppText, Screen } from "@/components/ui/VisualPrimitives";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { spacing } from "@/theme/tokens";

export default function PreferencesScreen() {
  const { colors } = useVisualTheme();
  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Screen contentStyle={styles.screenContent}>
        <View style={styles.header}>
          <AppText variant="display">Preferences</AppText>
          <AppText color={colors.textSecondary}>Make OpenBy feel right for your kitchen.</AppText>
        </View>
        <PreferencesContent state="default" />
      </Screen>
      <BottomNavigation active="preferences" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  screenContent: { paddingBottom: spacing.lg },
  header: { gap: spacing.xxs },
});
