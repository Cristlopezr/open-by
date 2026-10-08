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
      setError("Usa al menos 8 caracteres y asegúrate de que ambas contraseñas coincidan.");
      return;
    }
    setSent(true);
  };

  return (
    <Screen>
      <View style={s.content}>
        <PageHeader title="Recuperar cuenta" onBack={() => router.back()} />
        <AuthMessageHero icon="lock" />
        <AppText variant="title">Elige una nueva contraseña</AppText>
        <AppText color={colors.textSecondary}>Elige una que solo tú conozcas.</AppText>
        {sent ? (
          <>
            <StateNotice
              tone="success"
              title="Contraseña actualizada"
              message="Ya puedes iniciar sesión con tu nueva contraseña."
            />
            <PrimaryButton
              label="Volver a iniciar sesión"
              onPress={() => router.replace(visualRoutes.signIn)}
            />
          </>
        ) : (
          <Card style={s.form}>
            <InputField
              label="Nueva contraseña"
              placeholder="Al menos 8 caracteres"
              secureTextEntry
              value={password}
              onChangeText={setPassword}
            />
            <InputField
              label="Confirmar contraseña"
              placeholder="Repite tu nueva contraseña"
              secureTextEntry
              value={confirmation}
              onChangeText={setConfirmation}
            />
            {error ? <AppText variant="caption" color={colors.expired}>{error}</AppText> : null}
            <PrimaryButton label="Guardar nueva contraseña" onPress={save} />
          </Card>
        )}
      </View>
    </Screen>
  );
}
