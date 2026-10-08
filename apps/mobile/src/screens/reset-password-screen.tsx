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
        <PageHeader title="Recuperar cuenta" onBack={() => router.back()} />
        <AuthMessageHero icon="lock" />
        <AppText variant="title">¿Olvidaste tu contraseña?</AppText>
        <AppText color={colors.textSecondary}>
          Te enviaremos un enlace para que recuperes el acceso a tu inventario.
        </AppText>
        {sent ? (
          <>
            <StateNotice
              tone="success"
              title="Revisa tu correo"
              message="Si existe una cuenta asociada a este correo, recibirás un enlace de recuperación pronto."
            />
            <PrimaryButton
              label="Continuar para crear una contraseña"
              onPress={() => router.replace(visualRoutes.newPassword)}
            />
          </>
        ) : (
          <Card style={s.form}>
            <InputField
              label="Correo electrónico"
              placeholder="tu@ejemplo.cl"
              icon="mail"
              autoCapitalize="none"
              keyboardType="email-address"
            />
            <PrimaryButton label="Enviar enlace de recuperación" onPress={() => setSent(true)} />
          </Card>
        )}
      </View>
    </Screen>
  );
}
