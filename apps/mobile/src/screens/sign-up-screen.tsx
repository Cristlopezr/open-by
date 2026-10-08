import { Link, useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";

import { AccessArtwork } from "@/components/auth/AuthArtwork";
import { s } from "@/components/auth/authStyles";
import { AppIcon } from "@/components/ui/AppIcon";
import { InputField, PageHeader } from "@/components/ui/DesignSystem";
import { AppText, Card, PrimaryButton, Screen, SecondaryButton } from "@/components/ui/VisualPrimitives";
import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";

export function SignUpScreen() {
  const router = useRouter();
  const { colors } = useVisualTheme();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const submit = () => {
    if (!email.includes("@") || password.length < 8) {
      setError(
        "Enter a valid email and a password with at least 8 characters.",
      );
      return;
    }
    router.push(visualRoutes.verifyEmail);
  };
  return (
    <Screen>
      <View style={s.content}>
        <PageHeader
          title="OpenBy"
          subtitle="A little care. A little less waste."
          onBack={() => router.back()}
        />
        <AccessArtwork />
        <View style={s.hero}>
          <AppText variant="title" style={s.center}>
            Make room for peace of mind.
          </AppText>
          <AppText color={colors.textSecondary} style={s.center}>
            Create an account to keep your opened products backed up.
          </AppText>
        </View>
        <SecondaryButton
          label="Continue with Google"
          icon="google"
          onPress={() => router.push(visualRoutes.account)}
        />
        <Card style={s.form}>
          <InputField
            label="Name"
            placeholder="Your name"
            autoCapitalize="words"
            icon="account"
          />
          <InputField
            label="Email"
            placeholder="you@example.com"
            autoCapitalize="none"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
            icon="mail"
          />
          <InputField
            label="Password"
            placeholder="At least 8 characters"
            secureTextEntry
            value={password}
            onChangeText={setPassword}
            icon="lock"
          />
          {error ? (
            <AppText variant="caption" color={colors.expired}>
              {error}
            </AppText>
          ) : null}
          <PrimaryButton
            label="Create account"
            onPress={submit}
          />
        </Card>
        <View style={s.footer}>
          <AppText variant="caption" color={colors.textSecondary}>
            Already have an account?
          </AppText>
          <Link href={visualRoutes.signIn} asChild>
            <Pressable
              accessibilityRole="button"
              style={s.textAction}
            >
              <AppText variant="label" color={colors.primary}>
                Sign in
              </AppText>
            </Pressable>
          </Link>
        </View>
        <Link href={visualRoutes.home} asChild>
          <Pressable
            accessibilityRole="button"
            style={StyleSheet.flatten([s.guest, { backgroundColor: colors.surfaceLow }])}
          >
            <AppText variant="label">Continue without an account</AppText>
            <AppIcon name="forward" color={colors.primary} size={18} />
          </Pressable>
        </Link>
        <AppText variant="caption" style={s.center} color={colors.textSecondary}>
          Your inventory stays on this device when you use OpenBy as a guest.
        </AppText>
      </View>
    </Screen>
  );
}
