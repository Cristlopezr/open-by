import { StyleSheet, View } from "react-native";

import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, spacing } from "@/theme/tokens";
import { AppIcon } from "@/components/ui/AppIcon";
import { AppText, PrimaryButton } from "@/components/ui/VisualPrimitives";

export function EmptyInventoryState({ onScan }: { onScan: () => void }) {
  const { colors } = useVisualTheme();
  return (
    <View style={styles.container}>
      <View style={[styles.illustration, { backgroundColor: colors.primarySoft }]}>
        <View style={[styles.lid, { borderColor: colors.primary }]} />
        <View style={[styles.jar, { borderColor: colors.primary }]}>
          <AppIcon name="leaf" color={colors.primary} size={34} />
        </View>
      </View>
      <View style={styles.copy}>
        <AppText variant="heading" style={styles.center}>You have no opened products yet</AppText>
        <AppText color={colors.textSecondary} style={styles.center}>Scan a barcode when you open something and OpenBy will keep it easy to find.</AppText>
      </View>
      <PrimaryButton label="Scan my first product" icon="scan" onPress={onScan} style={styles.button} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", gap: spacing.xl, paddingVertical: spacing.xxxl },
  illustration: { width: 152, height: 152, borderRadius: 76, alignItems: "center", justifyContent: "center" },
  lid: { width: 70, height: 18, borderWidth: 3, borderRadius: radii.small, marginBottom: -2 },
  jar: { width: 82, height: 72, borderWidth: 3, borderRadius: radii.card, alignItems: "center", justifyContent: "center" },
  copy: { maxWidth: 300, gap: spacing.xs },
  center: { textAlign: "center" },
  button: { alignSelf: "stretch" },
});
