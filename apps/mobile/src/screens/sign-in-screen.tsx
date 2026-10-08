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

export function SignInScreen() {
  const router = useRouter();
  const { colors } = useVisualTheme();
  const [emailVisible, setEmailVisible] = useState(false);
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
    router.push(visualRoutes.account);
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
            {"Your inventory.\nAlways with you."}
          </AppText>
          <AppText color={colors.textSecondary} style={s.center}>
            Back up your opened products and pick up where you left off.
          </AppText>
        </View>
        <SecondaryButton
          label="Continue with Google"
          icon="google"
          onPress={() => router.push(visualRoutes.account)}
        />
        {!emailVisible ? (
          <PrimaryButton
            label="Continue with email"
            icon="mail"
            onPress={() => setEmailVisible(true)}
          />
        ) : (
          <Card style={s.form}>
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
            <Link href={visualRoutes.resetPassword} asChild>
              <Pressable
                accessibilityRole="button"
                style={s.textAction}
              >
                <AppText variant="label" color={colors.primary}>
                  Forgot password?
                </AppText>
              </Pressable>
            </Link>
            <PrimaryButton
              label="Sign in"
              onPress={submit}
            />
          </Card>
        )}
        <View style={s.footer}>
          <AppText variant="caption" color={colors.textSecondary}>
            New to OpenBy?
          </AppText>
          <Link href={visualRoutes.signUp} asChild>
            <Pressable
              accessibilityRole="button"
              style={s.textAction}
            >
              <AppText variant="label" color={colors.primary}>
                Create an account
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
