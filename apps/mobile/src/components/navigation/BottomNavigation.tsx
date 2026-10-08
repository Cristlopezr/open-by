import { Link } from "expo-router";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { AppIcon, type AppIconName } from "@/components/ui/AppIcon";
import { AppText } from "@/components/ui/VisualPrimitives";

export function BottomNavigation({
  active,
}: {
  active: "home" | "preferences";
}) {
  const { bottom } = useSafeAreaInsets();
  const { colors } = useVisualTheme();
  const items: {
    label: string;
    icon: AppIconName;
    route: (typeof visualRoutes)[keyof typeof visualRoutes];
    selected?: boolean;
  }[] = [
      {
        label: "Inventory",
        icon: "product",
        route: "/",
        selected: active === "home",
      },
      { label: "Scanner", icon: "scan", route: "/scanner" },
      {
        label: "Settings",
        icon: "preferences",
        route: "/preferences",
        selected: active === "preferences",
      },
    ];
  return (
    <View
      style={[
        styles.bar,
        {
          backgroundColor: colors.background,
          borderColor: colors.border,
          paddingBottom: Math.max(bottom, 8),
        },
      ]}
    >
      {items.map((item) => {
        if (item.icon === "scan") {
          return (
            <View key={item.label} style={styles.scanSlot}>
              <Link href={item.route} asChild>
                <Pressable
                  accessibilityRole="button"
                  accessibilityLabel="Scan"
                  style={StyleSheet.flatten([
                    styles.scan,
                    { backgroundColor: colors.primary },
                  ])}
                >
                  <AppIcon name="scan" color={colors.onPrimary} size={27} />
                  <AppText
                    variant="caption"
                    color={colors.onPrimary}
                    style={styles.scanLabel}
                  >
                    Scan
                  </AppText>
                </Pressable>
              </Link>
            </View>
          );
        }
        const button = <Pressable
          accessibilityRole="button"
          accessibilityState={{ selected: item.selected }}
          key={item.label}
          style={styles.item}
        >
          <View style={styles.iconWrap}>
            <AppIcon
              name={item.icon}
              color={item.selected ? colors.primary : colors.textSecondary}
              size={23}
            />
          </View>
          <AppText
            variant="caption"
            color={item.selected ? colors.primary : colors.textSecondary}
            style={styles.label}
          >
            {item.label}
          </AppText>
        </Pressable>;
        return item.selected ? button : <Link key={item.label} href={item.route} asChild>{button}</Link>;
      })}
    </View>
  );
}
const styles = StyleSheet.create({
  bar: {
    borderTopWidth: 1,
    paddingTop: 8,
    paddingHorizontal: 12,
    flexDirection: "row",
    alignItems: "center",
    minHeight: 68,
  },
  item: { flex: 1, minHeight: 48, alignItems: "center", gap: 3 },
  scanSlot: { flex: 1, alignItems: "center" },
  scan: {
    width: 68,
    height: 68,
    borderRadius: 34,
    alignItems: "center",
    justifyContent: "center",
    gap: 1,
    marginTop: -20,
  },
  scanLabel: { fontSize: 12, lineHeight: 16 },
  iconWrap: {
    width: 32,
    height: 28,
    justifyContent: "center",
    alignItems: "center",
  },
  label: { fontSize: 10, lineHeight: 14 },
});
