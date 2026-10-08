import { Link, type Href } from "expo-router";
import {
  Pressable,
  StyleSheet,
  TextInput,
  View,
  type TextInputProps,
} from "react-native";
import { AppIcon, type AppIconName } from "./AppIcon";
import { AppText, IconButton } from "./VisualPrimitives";
import { useVisualTheme } from "@/theme/ThemeProvider";
import type { ProductFixture } from "@/features/mvp-visual/types";

export function PageHeader({
  title,
  subtitle,
  onBack,
  onAccount,
  accountHref,
}: {
  title: string;
  subtitle?: string;
  onBack?: () => void;
  onAccount?: () => void;
  accountHref?: Href;
}) {
  const { colors } = useVisualTheme();
  return (
    <View style={styles.header}>
      {onBack ? (
        <IconButton icon="back" label="Volver" onPress={onBack} />
      ) : (
        <View style={[styles.brand, { backgroundColor: colors.primary }]}>
          <AppIcon name="leaf" color={colors.onPrimary} size={22} />
        </View>
      )}
      <View style={styles.flex}>
        <AppText variant="bodyMedium">{title}</AppText>
        {subtitle ? (
          <AppText variant="caption" color={colors.textSecondary}>
            {subtitle}
          </AppText>
        ) : null}
      </View>
      {accountHref ? (
        <Link href={accountHref} asChild>
          <IconButton icon="account" label="Cuenta" />
        </Link>
      ) : onAccount ? (
        <IconButton icon="account" label="Cuenta" onPress={onAccount} />
      ) : null}
    </View>
  );
}

// Native shapes are image placeholders for products without image_url.
export function ProductArtwork({
  product,
  size = 52,
}: {
  product: Pick<ProductFixture, "categoryIcon" | "brand" | "name">;
  size?: number;
}) {
  const { colors } = useVisualTheme();
  const jar = product.categoryIcon === "jar" || product.categoryIcon === "milk";
  return (
    <View
      accessibilityLabel={product.name ?? "Producto"}
      style={[
        styles.artwork,
        { width: size, height: size, backgroundColor: colors.surfaceSecondary },
      ]}
    >
      <View
        style={[
          styles.package,
          {
            width: size * (jar ? 0.56 : 0.38),
            height: size * 0.68,
            backgroundColor: colors.surface,
            borderColor: colors.border,
            borderRadius: jar ? 6 : 4,
          },
        ]}
      >
        <View
          style={[
            styles.lid,
            {
              backgroundColor:
                product.categoryIcon === "milk" ? colors.info : colors.primary,
            },
          ]}
        />
        <View
          style={[styles.packageLabel, { backgroundColor: colors.primarySoft }]}
        >
          <AppIcon name="leaf" color={colors.primary} size={size * 0.19} />
        </View>
        {size > 80 ? (
          <AppText variant="caption" style={styles.artLabel} numberOfLines={1}>
            {product.brand}
          </AppText>
        ) : null}
      </View>
    </View>
  );
}

export function InputField({
  label,
  icon,
  ...props
}: TextInputProps & { label: string; icon?: AppIconName }) {
  const { colors } = useVisualTheme();
  return (
    <View style={styles.field}>
      <AppText variant="label">{label}</AppText>
      <View
        style={[
          styles.inputWrap,
          { backgroundColor: colors.surfaceLow, borderColor: colors.border },
        ]}
      >
        {icon ? (
          <AppIcon name={icon} color={colors.textSecondary} size={18} />
        ) : null}
        <TextInput
          accessibilityLabel={label}
          placeholderTextColor={colors.textSecondary}
          {...props}
          style={[styles.input, { color: colors.text }, props.style]}
        />
      </View>
    </View>
  );
}

export function ChoiceChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected: boolean;
  onPress: () => void;
}) {
  const { colors } = useVisualTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={[
        styles.chip,
        {
          backgroundColor: selected ? colors.primary : colors.surface,
          borderColor: selected ? colors.primary : colors.border,
        },
      ]}
    >
      <AppText
        variant="caption"
        color={selected ? colors.onPrimary : colors.textSecondary}
      >
        {label}
      </AppText>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  header: {
    minHeight: 56,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingBottom: 8,
  },
  flex: { flex: 1 },
  brand: {
    width: 34,
    height: 34,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  artwork: {
    borderRadius: 10,
    flexShrink: 0,
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  package: {
    borderWidth: 1,
    alignItems: "center",
    overflow: "hidden",
    justifyContent: "center",
  },
  lid: { position: "absolute", top: 0, height: "14%", width: "100%" },
  packageLabel: {
    width: "100%",
    height: "42%",
    alignItems: "center",
    justifyContent: "center",
  },
  artLabel: { fontSize: 8, lineHeight: 11, paddingHorizontal: 3 },
  field: { gap: 8 },
  inputWrap: {
    minHeight: 50,
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  input: { flex: 1, paddingVertical: 14, fontSize: 14 },
  chip: {
    borderWidth: 1,
    borderRadius: 99,
    paddingHorizontal: 14,
    minHeight: 36,
    justifyContent: "center",
  },
});
