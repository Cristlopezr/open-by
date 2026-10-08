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
        <PageHeader title="Verificar correo" onBack={() => router.back()} />
        <AuthMessageHero icon="mail" />
        <AppText variant="title" style={s.center}>
          Revisa tu correo
        </AppText>
        <AppText color={colors.textSecondary} style={s.center}>
          Abre el enlace de verificación que te enviamos para terminar de crear
          tu cuenta.
        </AppText>
        <Card style={s.form}>
          <Pill label="Verificación pendiente" color={colors.soon} icon="clock" />
          <AppText variant="bodyMedium">Solo falta un paso para comenzar</AppText>
          <AppText color={colors.textSecondary}>
            Podrás iniciar sesión cuando se verifique tu correo.
          </AppText>
          <PrimaryButton
            label="Ya verifiqué mi correo"
            icon="success"
            onPress={() => router.replace(visualRoutes.signIn)}
          />
          <SecondaryButton
            label="Reenviar enlace de verificación"
            icon="mail"
            onPress={() => setResent(true)}
          />
        </Card>
        {resent ? (
          <StateNotice
            tone="success"
            title="Enlace reenviado"
            message="Revisa tu correo y la carpeta de correo no deseado."
          />
        ) : null}
      </View>
    </Screen>
  );
}
