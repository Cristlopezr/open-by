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
        <AppText variant="heading" style={styles.center}>Aún no tienes productos abiertos</AppText>
        <AppText color={colors.textSecondary} style={styles.center}>Escanea el código de barras al abrir un producto para encontrarlo fácilmente en OpenBy.</AppText>
      </View>
      <PrimaryButton label="Escanear mi primer producto" icon="scan" onPress={onScan} style={styles.button} />
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
