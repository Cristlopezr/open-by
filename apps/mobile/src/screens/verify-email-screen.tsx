import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { AuthMessageHero } from "@/components/auth/AuthArtwork";
import { s } from "@/components/auth/authStyles";
import { PageHeader } from "@/components/ui/DesignSystem";
import { AppText, Card, Pill, PrimaryButton, Screen, SecondaryButton, StateNotice } from "@/components/ui/VisualPrimitives";
import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";

export function VerifyEmailScreen() {
  const router = useRouter();
  const { colors } = useVisualTheme();
  const [resent, setResent] = useState(false);
  return (
    <Screen>
      <View style={s.content}>
        <PageHeader title="Email verification" onBack={() => router.back()} />
        <AuthMessageHero icon="mail" />
        <AppText variant="title" style={s.center}>
          Check your inbox
        </AppText>
        <AppText color={colors.textSecondary} style={s.center}>
          Open the verification link in your email to finish creating your
          account.
        </AppText>
        <Card style={s.form}>
          <Pill label="Verification pending" color={colors.soon} icon="clock" />
          <AppText variant="bodyMedium">One last step to get started</AppText>
          <AppText color={colors.textSecondary}>
            You can sign in after your email has been verified.
          </AppText>
          <PrimaryButton
            label="I've verified my email"
            icon="success"
            onPress={() => router.replace(visualRoutes.signIn)}
          />
          <SecondaryButton
            label="Resend verification link"
            icon="mail"
            onPress={() => setResent(true)}
          />
        </Card>
        {resent ? (
          <StateNotice
            tone="success"
            title="Link sent again"
            message="Check your inbox and spam folder."
          />
        ) : null}
      </View>
    </Screen>
  );
}


