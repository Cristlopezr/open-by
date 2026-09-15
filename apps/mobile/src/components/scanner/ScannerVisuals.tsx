import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import type { ScannerPreviewState } from "@/features/mvp-visual/types";
import { spacing } from "@/theme/tokens";
import { AppIcon } from "@/components/ui/AppIcon";
import { AppText, IconButton, PrimaryButton, SecondaryButton } from "@/components/ui/VisualPrimitives";

const failureContent: Partial<Record<ScannerPreviewState, { icon: "camera" | "warning" | "offline" | "error" | "product"; title: string; message: string; action: string }>> = {
  cameraDenied: { icon: "camera", title: "Camera access is off", message: "Allow camera access in Settings to scan a barcode.", action: "Open settings" },
  unreadable: { icon: "warning", title: "We couldn't read that", message: "Keep the barcode flat, well lit, and inside the frame.", action: "Try again" },
  offline: { icon: "offline", title: "No connection", message: "Reconnect to look up this barcode, then try again.", action: "Try again" },
  lookupFailure: { icon: "error", title: "Lookup failed", message: "The catalog could not be reached. Your inventory was not changed.", action: "Try again" },
  unknownBarcode: { icon: "product", title: "Product not found", message: "This barcode isn't in the shared catalog yet.", action: "Report product" },
};

export function ScannerVisuals({
  state,
  onClose,
  onRetry,
  onAdvance,
  onReport,
}: {
  state: ScannerPreviewState;
  onClose: () => void;
  onRetry: () => void;
  onAdvance: () => void;
  onReport: () => void;
}) {
  const failure = failureContent[state];

  return (
    <View style={styles.root}>
      <View style={styles.cameraTexture}>
        <View style={styles.glowOne} />
        <View style={styles.glowTwo} />
      </View>
      <View style={styles.overlay} />
      <SafeAreaView style={styles.safe} edges={["top", "bottom"]}>
        <View style={styles.topRow}>
          <IconButton icon="close" label="Close scanner" onPress={onClose} inverse />
          <AppText variant="heading" color="#FFFFFF">Scan product</AppText>
          <IconButton icon="flash" label="Flash" inverse />
        </View>

        <View style={styles.center}>
          <View style={styles.frame}>
            <Corner position="topLeft" />
            <Corner position="topRight" />
            <Corner position="bottomLeft" />
            <Corner position="bottomRight" />
            {state === "loading" ? (
              <View style={styles.feedback}>
                <ActivityIndicator color="#D7F171" size="large" />
                <AppText variant="label" color="#FFFFFF">Looking up product…</AppText>
              </View>
            ) : null}
            {state === "success" ? (
              <View style={styles.feedback}>
                <AppIcon name="success" color="#D7F171" size={52} />
                <AppText variant="heading" color="#FFFFFF">Barcode found</AppText>
              </View>
            ) : null}
          </View>
          <AppText color="#FFFFFF" style={styles.instruction}>Center the barcode inside the frame.</AppText>
        </View>

        <View style={styles.bottom}>
          {failure ? (
            <View style={styles.failureCard}>
              <View style={styles.failureIcon}><AppIcon name={failure.icon} color="#D7F171" size={28} /></View>
              <AppText variant="heading" color="#FFFFFF" style={styles.centerText}>{failure.title}</AppText>
              <AppText color="#C8D2CC" style={styles.centerText}>{failure.message}</AppText>
              <PrimaryButton label={failure.action} onPress={state === "unknownBarcode" ? onReport : onRetry} />
              {state === "lookupFailure" ? <SecondaryButton label="Report unknown product" onPress={onReport} /> : null}
            </View>
          ) : state === "ready" ? (
            <Pressable accessibilityRole="button" onPress={onAdvance} style={styles.demoAction}>
              <AppIcon name="scan" color="#17211C" />
              <AppText variant="label" color="#17211C">Preview scan</AppText>
            </Pressable>
          ) : (
            <PrimaryButton label={state === "loading" ? "Show scan result" : "Review product"} onPress={onAdvance} />
          )}
        </View>
      </SafeAreaView>
    </View>
  );
}

function Corner({ position }: { position: "topLeft" | "topRight" | "bottomLeft" | "bottomRight" }) {
  return <View style={[styles.corner, styles[position]]} />;
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: "#25392D" },
  cameraTexture: { ...StyleSheet.absoluteFill, backgroundColor: "#4F6658", overflow: "hidden" },
  glowOne: { position: "absolute", width: 320, height: 320, borderRadius: 160, backgroundColor: "#78907F", top: -80, right: -120, opacity: 0.65 },
  glowTwo: { position: "absolute", width: 280, height: 420, borderRadius: 120, backgroundColor: "#31493A", bottom: -120, left: -80, transform: [{ rotate: "18deg" }] },
  overlay: { ...StyleSheet.absoluteFill, backgroundColor: "rgba(8,16,11,0.62)" },
  safe: { flex: 1, paddingHorizontal: spacing.lg, gap: spacing.md },
  topRow: { minHeight: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between" },
  center: { flex: 1, alignItems: "center", justifyContent: "center", gap: spacing.lg },
  frame: { width: "92%", maxWidth: 340, aspectRatio: 1.5, justifyContent: "center", alignItems: "center" },
  corner: { position: "absolute", width: 48, height: 48, borderColor: "#D7F171" },
  topLeft: { top: 0, left: 0, borderLeftWidth: 5, borderTopWidth: 5, borderTopLeftRadius: 18 },
  topRight: { top: 0, right: 0, borderRightWidth: 5, borderTopWidth: 5, borderTopRightRadius: 18 },
  bottomLeft: { bottom: 0, left: 0, borderLeftWidth: 5, borderBottomWidth: 5, borderBottomLeftRadius: 18 },
  bottomRight: { bottom: 0, right: 0, borderRightWidth: 5, borderBottomWidth: 5, borderBottomRightRadius: 18 },
  feedback: { alignItems: "center", gap: spacing.sm },
  instruction: { textAlign: "center" },
  bottom: { minHeight: 148, justifyContent: "flex-end", paddingBottom: spacing.md },
  failureCard: { backgroundColor: "rgba(16,23,19,0.94)", borderRadius: 18, padding: spacing.lg, gap: spacing.sm },
  failureIcon: { alignSelf: "center", width: 52, height: 52, borderRadius: 26, backgroundColor: "rgba(215,241,113,0.12)", alignItems: "center", justifyContent: "center" },
  centerText: { textAlign: "center" },
  demoAction: { alignSelf: "center", minHeight: 56, borderRadius: 28, backgroundColor: "#D7F171", paddingHorizontal: spacing.xl, flexDirection: "row", alignItems: "center", gap: spacing.xs },
});
