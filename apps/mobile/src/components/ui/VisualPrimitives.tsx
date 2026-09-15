import type { ReactNode } from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  type StyleProp,
  type TextStyle,
  type ViewStyle,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, shadows, sizes, spacing } from "@/theme/tokens";
import { typeScale } from "@/theme/typography";
import { AppIcon, type AppIconName } from "./AppIcon";

export function Screen({
  children,
  scroll = true,
  contentStyle,
}: {
  children: ReactNode;
  scroll?: boolean;
  contentStyle?: StyleProp<ViewStyle>;
}) {
  const { colors } = useVisualTheme();
  const content = scroll ? (
    <ScrollView
      keyboardShouldPersistTaps="handled"
      showsVerticalScrollIndicator={false}
      contentContainerStyle={[styles.screenContent, contentStyle]}
    >
      {children}
    </ScrollView>
  ) : (
    <View style={[styles.screenContent, styles.fill, contentStyle]}>{children}</View>
  );

  return (
    <SafeAreaView style={[styles.fill, { backgroundColor: colors.background }]} edges={["top"]}>
      <KeyboardAvoidingView
        style={styles.fill}
        behavior={Platform.OS === "ios" ? "padding" : undefined}
      >
        {content}
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

export function AppText({
  children,
  variant = "body",
  color,
  style,
  numberOfLines,
}: {
  children: ReactNode;
  variant?: keyof typeof typeScale;
  color?: string;
  style?: StyleProp<TextStyle>;
  numberOfLines?: number;
}) {
  const { colors } = useVisualTheme();
  return (
    <Text
      numberOfLines={numberOfLines}
      style={[typeScale[variant], { color: color ?? colors.text }, style]}
    >
      {children}
    </Text>
  );
}

export function Card({ children, style }: { children: ReactNode; style?: StyleProp<ViewStyle> }) {
  const { colors } = useVisualTheme();
  return (
    <View style={[styles.card, shadows.card, { backgroundColor: colors.surface }, style]}>
      {children}
    </View>
  );
}

interface ButtonProps {
  label: string;
  onPress?: () => void;
  icon?: AppIconName;
  loading?: boolean;
  destructive?: boolean;
  style?: StyleProp<ViewStyle>;
}

export function PrimaryButton({ label, onPress, icon, loading, style }: ButtonProps) {
  const { colors } = useVisualTheme();
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      disabled={loading}
      style={({ pressed }) => [
        styles.primaryButton,
        { backgroundColor: pressed ? colors.primaryPressed : colors.primary },
        style,
      ]}
    >
      {loading ? (
        <ActivityIndicator color={colors.surface} />
      ) : (
        <>
          {icon ? <AppIcon name={icon} color={colors.surface} size={20} /> : null}
          <AppText variant="label" color={colors.surface} style={styles.buttonText}>
            {label}
          </AppText>
        </>
      )}
    </Pressable>
  );
}

export function SecondaryButton({ label, onPress, icon, destructive, style }: ButtonProps) {
  const { colors } = useVisualTheme();
  const color = destructive ? colors.expired : colors.primary;
  return (
    <Pressable
      accessibilityRole="button"
      onPress={onPress}
      style={({ pressed }) => [
        styles.secondaryButton,
        { borderColor: colors.border, backgroundColor: pressed ? colors.surfaceSecondary : colors.surface },
        style,
      ]}
    >
      {icon ? <AppIcon name={icon} color={color} size={20} /> : null}
      <AppText variant="label" color={color} style={styles.buttonText}>
        {label}
      </AppText>
    </Pressable>
  );
}

export function IconButton({ icon, label, onPress, inverse }: {
  icon: AppIconName;
  label: string;
  onPress?: () => void;
  inverse?: boolean;
}) {
  const { colors } = useVisualTheme();
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      onPress={onPress}
      style={({ pressed }) => [
        styles.iconButton,
        { backgroundColor: inverse ? "rgba(255,255,255,0.14)" : colors.surfaceSecondary },
        pressed && styles.pressed,
      ]}
    >
      <AppIcon name={icon} color={inverse ? "#FFFFFF" : colors.text} />
    </Pressable>
  );
}

export function SectionTitle({ title, subtitle }: { title: string; subtitle?: string }) {
  const { colors } = useVisualTheme();
  return (
    <View style={styles.sectionTitle}>
      <AppText variant="heading">{title}</AppText>
      {subtitle ? (
        <AppText color={colors.textSecondary}>{subtitle}</AppText>
      ) : null}
    </View>
  );
}

export function Pill({ label, color, icon }: { label: string; color: string; icon?: AppIconName }) {
  return (
    <View style={[styles.pill, { backgroundColor: `${color}1A` }]}>
      {icon ? <AppIcon name={icon} color={color} size={15} /> : null}
      <AppText variant="caption" color={color}>{label}</AppText>
    </View>
  );
}

export function StateNotice({
  tone,
  title,
  message,
  actionLabel,
  onAction,
}: {
  tone: "info" | "warning" | "error" | "success" | "neutral";
  title: string;
  message: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  const { colors } = useVisualTheme();
  const toneMap = {
    info: { color: colors.info, bg: colors.infoSoft, icon: "info" as const },
    warning: { color: colors.soon, bg: colors.warningSoft, icon: "warning" as const },
    error: { color: colors.expired, bg: colors.dangerSoft, icon: "error" as const },
    success: { color: colors.fresh, bg: colors.primarySoft, icon: "success" as const },
    neutral: { color: colors.unknown, bg: colors.surfaceSecondary, icon: "info" as const },
  }[tone];
  return (
    <View style={[styles.notice, { backgroundColor: toneMap.bg }]}>
      <AppIcon name={toneMap.icon} color={toneMap.color} />
      <View style={styles.noticeCopy}>
        <AppText variant="label" color={toneMap.color}>{title}</AppText>
        <AppText color={colors.textSecondary}>{message}</AppText>
        {actionLabel ? (
          <Pressable onPress={onAction} style={styles.noticeAction} accessibilityRole="button">
            <AppText variant="label" color={toneMap.color}>{actionLabel}</AppText>
          </Pressable>
        ) : null}
      </View>
    </View>
  );
}

export function FieldDisplay({ label, value, icon }: { label: string; value: string; icon?: AppIconName }) {
  const { colors } = useVisualTheme();
  return (
    <View style={[styles.field, { borderColor: colors.border, backgroundColor: colors.surface }]}>
      {icon ? <AppIcon name={icon} color={colors.textSecondary} size={19} /> : null}
      <View style={styles.fieldCopy}>
        <AppText variant="caption" color={colors.textSecondary}>{label}</AppText>
        <AppText variant="bodyMedium">{value}</AppText>
      </View>
    </View>
  );
}

export function ConfirmationPanel({
  title,
  message,
  confirmLabel,
  onConfirm,
  onCancel,
  destructive,
}: {
  title: string;
  message: string;
  confirmLabel: string;
  onConfirm?: () => void;
  onCancel?: () => void;
  destructive?: boolean;
}) {
  const { colors } = useVisualTheme();
  return (
    <Card style={styles.confirmation}>
      <View style={[styles.confirmIcon, { backgroundColor: destructive ? colors.dangerSoft : colors.warningSoft }]}>
        <AppIcon name={destructive ? "delete" : "warning"} color={destructive ? colors.expired : colors.soon} size={26} />
      </View>
      <AppText variant="heading" style={styles.center}>{title}</AppText>
      <AppText color={colors.textSecondary} style={styles.center}>{message}</AppText>
      <PrimaryButton label={confirmLabel} onPress={onConfirm} />
      <SecondaryButton label="Cancel" onPress={onCancel} />
    </Card>
  );
}

const styles = StyleSheet.create({
  fill: { flex: 1 },
  screenContent: { paddingHorizontal: sizes.horizontalMargin, paddingTop: spacing.md, paddingBottom: 112, gap: spacing.md },
  card: { borderRadius: radii.card, padding: spacing.md },
  primaryButton: { minHeight: sizes.primaryAction, borderRadius: radii.control, paddingHorizontal: spacing.lg, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: spacing.xs },
  secondaryButton: { minHeight: sizes.touch, borderRadius: radii.control, borderWidth: 1, paddingHorizontal: spacing.lg, alignItems: "center", justifyContent: "center", flexDirection: "row", gap: spacing.xs },
  buttonText: { textAlign: "center" },
  iconButton: { width: sizes.touch, height: sizes.touch, borderRadius: sizes.touch / 2, alignItems: "center", justifyContent: "center" },
  pressed: { opacity: 0.72 },
  sectionTitle: { gap: spacing.xxs },
  pill: { minHeight: 30, borderRadius: radii.pill, paddingHorizontal: spacing.sm, paddingVertical: spacing.xxs, flexDirection: "row", alignItems: "center", gap: 6, alignSelf: "flex-start" },
  notice: { borderRadius: radii.control, padding: spacing.md, flexDirection: "row", gap: spacing.sm, alignItems: "flex-start" },
  noticeCopy: { flex: 1, gap: spacing.xxs },
  noticeAction: { minHeight: 36, justifyContent: "center", alignSelf: "flex-start" },
  field: { minHeight: sizes.touch, borderRadius: radii.control, borderWidth: 1, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, flexDirection: "row", alignItems: "center", gap: spacing.sm },
  fieldCopy: { flex: 1, gap: 2 },
  confirmation: { gap: spacing.md },
  confirmIcon: { width: 52, height: 52, borderRadius: 26, alignItems: "center", justifyContent: "center", alignSelf: "center" },
  center: { textAlign: "center" },
});
