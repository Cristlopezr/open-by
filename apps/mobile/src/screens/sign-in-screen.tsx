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
        "Ingresa un correo válido y una contraseña de al menos 8 caracteres.",
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
          subtitle="Un poco de cuidado. Menos desperdicio."
          onBack={() => router.back()}
        />
        <AccessArtwork />
        <View style={s.hero}>
          <AppText variant="title" style={s.center}>
            {"Tu inventario.\nSiempre contigo."}
          </AppText>
          <AppText color={colors.textSecondary} style={s.center}>
            Respalda tus productos abiertos y continúa donde quedaste.
          </AppText>
        </View>
        <SecondaryButton
          label="Continuar con Google"
          icon="google"
          onPress={() => router.push(visualRoutes.account)}
        />
        {!emailVisible ? (
          <PrimaryButton
            label="Continuar con correo"
            icon="mail"
            onPress={() => setEmailVisible(true)}
          />
        ) : (
          <Card style={s.form}>
            <InputField
              label="Correo electrónico"
              placeholder="tu@ejemplo.cl"
              autoCapitalize="none"
              keyboardType="email-address"
              value={email}
              onChangeText={setEmail}
              icon="mail"
            />
            <InputField
              label="Contraseña"
              placeholder="Al menos 8 caracteres"
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
                  ¿Olvidaste tu contraseña?
                </AppText>
              </Pressable>
            </Link>
            <PrimaryButton
              label="Iniciar sesión"
              onPress={submit}
            />
          </Card>
        )}
        <View style={s.footer}>
          <AppText variant="caption" color={colors.textSecondary}>
            ¿Eres nuevo en OpenBy?
          </AppText>
          <Link href={visualRoutes.signUp} asChild>
            <Pressable
              accessibilityRole="button"
              style={s.textAction}
            >
              <AppText variant="label" color={colors.primary}>
                Crear una cuenta
              </AppText>
            </Pressable>
          </Link>
        </View>
        <Link href={visualRoutes.home} asChild>
          <Pressable
            accessibilityRole="button"
            style={StyleSheet.flatten([s.guest, { backgroundColor: colors.surfaceLow }])}
          >
            <AppText variant="label">Continuar sin una cuenta</AppText>
            <AppIcon name="forward" color={colors.primary} size={18} />
          </Pressable>
        </Link>
        <AppText variant="caption" style={s.center} color={colors.textSecondary}>
          Tu inventario permanece en este dispositivo cuando usas OpenBy sin una cuenta.
        </AppText>
      </View>
    </Screen>
  );
}
