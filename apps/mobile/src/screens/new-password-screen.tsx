import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { AuthMessageHero } from "@/components/auth/AuthArtwork";
import { s } from "@/components/auth/authStyles";
import { InputField, PageHeader } from "@/components/ui/DesignSystem";
import { AppText, Card, PrimaryButton, Screen, StateNotice } from "@/components/ui/VisualPrimitives";
import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";

export function NewPasswordScreen() {
  const router = useRouter();
  const { colors } = useVisualTheme();
  const [sent, setSent] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmation, setConfirmation] = useState("");
  const [error, setError] = useState("");

  const save = () => {
    if (password.length < 8 || password !== confirmation) {
      setError("Use at least 8 characters and make sure both passwords match.");
      return;
    }
    setSent(true);
  };

  return (
    <Screen>
      <View style={s.content}>
        <PageHeader title="Account recovery" onBack={() => router.back()} />
        <AuthMessageHero icon="lock" />
        <AppText variant="title">Choose a new password</AppText>
        <AppText color={colors.textSecondary}>Make it something only you know.</AppText>
        {sent ? (
          <>
            <StateNotice
              tone="success"
              title="Password updated"
              message="You can now sign in with your new password."
            />
            <PrimaryButton
              label="Back to sign in"
              onPress={() => router.replace(visualRoutes.signIn)}
            />
          </>
        ) : (
          <Card style={s.form}>
            <InputField
              label="New password"
              placeholder="At least 8 characters"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <InputField
              label="Confirm password"
              placeholder="Repeat your new password"
              secureTextEntry
              value={confirmation}
              onChangeText={setConfirmation}
            />
            {error ? <AppText variant="caption" color={colors.expired}>{error}</AppText> : null}
            <PrimaryButton label="Save new password" onPress={save} />
          </Card>
        )}
      </View>
    </Screen>
  );
}
