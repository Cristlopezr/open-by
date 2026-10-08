import { View } from "react-native";

import { products } from "@/features/mvp-visual/fixtures";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { AppIcon } from "@/components/ui/AppIcon";
import { ProductArtwork } from "@/components/ui/DesignSystem";
import { AppText, Pill } from "@/components/ui/VisualPrimitives";
import { s } from "./authStyles";

export function AccessArtwork() {
  const { colors } = useVisualTheme();
  return (
    <View style={[s.illustration, { backgroundColor: colors.surfaceSecondary }]}>
      <View style={[s.orbit, { borderColor: colors.primary + "30" }]} />
      <View style={[s.previewCard, s.previewLeft, { backgroundColor: colors.surface }]}>
        <ProductArtwork product={products[0]} size={54} />
        <AppText variant="caption">{products[0].name}</AppText>
        <Pill label="18 hours left" color={colors.soon} />
      </View>
      <View style={[s.previewCard, s.previewRight, { backgroundColor: colors.surface }]}>
        <ProductArtwork product={products[2]} size={54} />
        <AppText variant="caption">{products[2].name}</AppText>
        <Pill label="Fresh & active" color={colors.primary} />
      </View>
      <View style={[s.cloudBubble, { backgroundColor: colors.primary }]}>
        <AppIcon name="cloud" color={colors.onPrimary} size={36} />
      </View>
    </View>
  );
}

export function AuthMessageHero({ icon }: { icon: "mail" | "lock" }) {
  const { colors } = useVisualTheme();
  return (
    <View style={[s.messageHero, { backgroundColor: colors.surfaceSecondary }]}>
      <View style={[s.messageIcon, { backgroundColor: colors.primary }]}>
        <AppIcon name={icon} color={colors.onPrimary} size={40} />
      </View>
    </View>
  );
}
