import { View } from "react-native";

import { useVisualTheme } from "@/theme/ThemeProvider";
import { AppIcon } from "@/components/ui/AppIcon";
import { AppText } from "@/components/ui/VisualPrimitives";
import { s } from "./authStyles";

export function AccountRow({
  icon,
  title,
  detail,
}: {
  icon: "product" | "shield";
  title: string;
  detail: string;
}) {
  const { colors } = useVisualTheme();
  return (
    <View style={s.accountRow}>
      <View style={[s.smallIcon, { backgroundColor: colors.surfaceSecondary }]}>
        <AppIcon name={icon} color={colors.primary} />
      </View>
      <View style={s.flex}>
        <AppText variant="label">{title}</AppText>
        <AppText variant="caption" color={colors.textSecondary}>
          {detail}
        </AppText>
      </View>
    </View>
  );
}
