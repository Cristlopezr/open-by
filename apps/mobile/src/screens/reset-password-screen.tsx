import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { AuthMessageHero } from "@/components/auth/AuthArtwork";
import { s } from "@/components/auth/authStyles";
import { InputField, PageHeader } from "@/components/ui/DesignSystem";
import { AppText, Card, PrimaryButton, Screen, StateNotice } from "@/components/ui/VisualPrimitives";
import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";

export function ResetPasswordScreen() {
  const router = useRouter();
  const { colors } = useVisualTheme();
  const [sent, setSent] = useState(false);

  return (
    <Screen>
      <View style={s.content}>
        <PageHeader title="Account recovery" onBack={() => router.back()} />
        <AuthMessageHero icon="lock" />
        <AppText variant="title">Forgot your password?</AppText>
        <AppText color={colors.textSecondary}>
          We’ll send a link to help you get back to your inventory.
        </AppText>
        {sent ? (
          <>
            <StateNotice
              tone="success"
              title="Check your inbox"
              message="If an account exists for this email, a recovery link will arrive shortly."
            />
            <PrimaryButton
              label="Continue to new password"
              onPress={() => router.replace(visualRoutes.newPassword)}
            />
          </>
        ) : (
          <Card style={s.form}>
            <InputField
              label="Email"
              placeholder="you@example.com"
              icon="mail"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <PrimaryButton label="Send recovery link" onPress={() => setSent(true)} />
          </Card>
        )}
      </View>
    </Screen>
  );
}
