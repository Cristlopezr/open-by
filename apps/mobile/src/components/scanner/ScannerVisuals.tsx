import { Link } from "expo-router";
import { ActivityIndicator, Pressable, StyleSheet, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import type { ScannerPreviewState } from "@/features/mvp-visual/types";
import { products } from "@/features/mvp-visual/fixtures";
import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { AppIcon } from "@/components/ui/AppIcon";
import { PageHeader, ProductArtwork } from "@/components/ui/DesignSystem";
import {
  AppText,
  Card,
  Pill,
  PrimaryButton,
  SecondaryButton,
} from "@/components/ui/VisualPrimitives";

export function ScannerVisuals({
  state,
  onClose,
  onRetry,
  onAdvance,
}: {
  state: ScannerPreviewState;
  onClose: () => void;
  onRetry: () => void;
  onAdvance: () => void;
}) {
  const { colors } = useVisualTheme();
  const success = state === "success";
  const failure = !["ready", "loading", "success"].includes(state);
  return (
    <SafeAreaView
      style={[s.root, { backgroundColor: colors.background }]}
      edges={["top", "bottom"]}
    >
      <View style={s.header}>
        <PageHeader
          title="Escáner de códigos de barras"
          subtitle="Busca un producto en el catálogo"
          onBack={onClose}
        />
      </View>
      <View style={[s.camera, { backgroundColor: colors.surfaceSecondary }]}>
        <View style={[s.cameraObject, { backgroundColor: colors.surface }]}>
          <ProductArtwork product={products[0]} size={160} />
        </View>
        <View style={[s.frame, { borderColor: colors.primary }]}>
          <View style={[s.scanLine, { backgroundColor: colors.primary }]} />
          {state === "loading" ? (
            <ActivityIndicator color={colors.primary} size="large" />
          ) : null}
        </View>
        <View style={[s.scannerBadge, { backgroundColor: colors.surface }]}>
          <AppIcon
            name={success ? "success" : "scan"}
            color={colors.primary}
            size={18}
          />
          <AppText variant="caption">
            {success ? "Producto encontrado" : "Alinea el código de barras dentro del marco"}
          </AppText>
        </View>
        <View style={s.cameraTools}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Vista previa del producto encontrado"
            onPress={onAdvance}
            style={StyleSheet.flatten([s.tool, { backgroundColor: colors.surface }])}
          >
            <AppIcon name="scan" color={colors.primary} />
          </Pressable>
          <Link href={visualRoutes.reportUnknown} asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Ingresar un código de barras desconocido"
              style={StyleSheet.flatten([s.tool, { backgroundColor: colors.surface }])}
            >
              <AppIcon name="edit" color={colors.textSecondary} />
            </Pressable>
          </Link>
        </View>
      </View>
      <View style={s.sheet}>
        {success ? (
          <>
            <View style={s.row}>
              <ProductArtwork product={products[0]} size={64} />
              <View style={s.flex}>
                <Pill
                  label="Producto verificado en el catálogo"
                  color={colors.primary}
                  icon="shield"
                />
                <AppText variant="heading">{products[0].name}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>
                  {products[0].brand} · {products[0].quantity}
                </AppText>
              </View>
            </View>
            <View style={[s.rule, { backgroundColor: colors.surfaceLow }]}>
              <AppIcon name="clock" color={colors.primary} />
              <View style={s.flex}>
                <AppText variant="label">{products[0].lifetimeLabel}</AppText>
                <AppText variant="caption" color={colors.textSecondary}>
                  {products[0].storageCondition}
                </AppText>
              </View>
            </View>
            <PrimaryButton
              label="Indicar fecha de apertura"
              icon="success"
              onPress={onAdvance}
            />
          </>
        ) : failure ? (
          <Card>
            <AppText variant="heading">No pudimos leer este producto</AppText>
            <AppText color={colors.textSecondary}>
              Intenta escanear el código de nuevo o solicita agregar el producto.
            </AppText>
            <SecondaryButton label="Intentar de nuevo" onPress={onRetry} />
          </Card>
        ) : (
          <>
            <AppText variant="heading">Conócelo. Ábrelo. Hazle seguimiento.</AppText>
            <AppText color={colors.textSecondary}>
              Escanea el envase para conocer su duración verificada después de abrir.
            </AppText>
            <PrimaryButton
              label={
                state === "loading" ? "Mostrar producto encontrado" : "Escanear código de barras"
              }
              icon="scan"
              onPress={onAdvance}
            />
          </>
        )}
        <Link href={visualRoutes.reportUnknown} asChild>
          <SecondaryButton label="¿El producto no está en el catálogo?" />
        </Link>
      </View>
    </SafeAreaView>
  );
}
const s = StyleSheet.create({
  root: { flex: 1 },
  header: { paddingHorizontal: 20 },
  camera: {
    flex: 1,
    minHeight: 240,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  cameraObject: {
    position: "absolute",
    borderRadius: 24,
    padding: 30,
    transform: [{ rotate: "-12deg" }],
    opacity: 0.65,
  },
  frame: {
    width: "78%",
    height: 158,
    borderWidth: 2,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  scanLine: { position: "absolute", height: 2, width: "100%" },
  scannerBadge: {
    position: "absolute",
    top: 16,
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 99,
    flexDirection: "row",
    gap: 6,
  },
  cameraTools: {
    position: "absolute",
    bottom: 16,
    right: 20,
    flexDirection: "row",
    gap: 10,
  },
  tool: {
    width: 44,
    height: 44,
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
  },
  sheet: { padding: 20, gap: 14 },
  row: { flexDirection: "row", alignItems: "center", gap: 14 },
  flex: { flex: 1, gap: 4 },
  rule: {
    padding: 12,
    borderRadius: 10,
    flexDirection: "row",
    gap: 12,
    alignItems: "center",
  },
});
