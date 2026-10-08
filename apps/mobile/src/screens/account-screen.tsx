import { useRouter } from "expo-router";
import { useState } from "react";
import { View } from "react-native";

import { AccountRow } from "@/components/auth/AccountRow";
import { s } from "@/components/auth/authStyles";
import { AppIcon } from "@/components/ui/AppIcon";
import { ChoiceChip, PageHeader } from "@/components/ui/DesignSystem";
import { AppText, Card, Pill, Screen, SecondaryButton } from "@/components/ui/VisualPrimitives";
import { homeProducts } from "@/features/mvp-visual/fixtures";
import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";

export function AccountScreen() {
  const router = useRouter();
  const { colors } = useVisualTheme();
  const [connected, setConnected] = useState(true);
  const [sync, setSync] = useState(false);
  return (
    <Screen>
      <View style={s.content}>
        <PageHeader title="Cuenta y sincronización" onBack={() => router.back()} />
        <Card style={s.profile}>
          <View style={[s.avatar, { backgroundColor: colors.primarySoft }]}>
            <AppText variant="title" color={colors.primary}>
              JD
            </AppText>
          </View>
          <View style={s.flex}>
            <AppText variant="heading">Jamie Demo</AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              jamie@example.com
            </AppText>
            <Pill label="Correo verificado" color={colors.primary} icon="shield" />
          </View>
        </Card>
        <View style={[s.syncHero, { backgroundColor: colors.primary }]}>
          <View style={s.row}>
            <AppIcon name="cloud" color={colors.onPrimary} size={32} />
            <Pill
              label={connected ? "Conectado" : "Sin conexión"}
              color={colors.onPrimary}
            />
          </View>
          <AppText variant="title" color={colors.onPrimary}>
            {"Tu inventario,\nrespaldado."}
          </AppText>
          <AppText color={colors.onPrimary}>
            {sync
              ? "Todos tus productos abiertos están al día."
              : "Mantén tus productos abiertos disponibles en otros dispositivos."}
          </AppText>
          <View style={s.syncNumbers}>
            <View>
              <AppText variant="title" color={colors.onPrimary}>
                {homeProducts.length}
              </AppText>
              <AppText variant="caption" color={colors.onPrimary}>
                Productos abiertos
              </AppText>
            </View>
            <View>
              <AppText variant="title" color={colors.onPrimary}>
                1
              </AppText>
              <AppText variant="caption" color={colors.onPrimary}>
                Cuenta
              </AppText>
            </View>
          </View>
        </View>
        <SecondaryButton
          label={sync ? "Inventario al día" : "Sincronizar inventario"}
          icon="sync"
          onPress={() => setSync(true)}
        />
        <View style={s.row}>
          <ChoiceChip
            label="Conectado"
            selected={connected}
            onPress={() => setConnected(true)}
          />
          <ChoiceChip
            label="Sin conexión"
            selected={!connected}
            onPress={() => setConnected(false)}
          />
        </View>
        <Card style={s.form}>
          <AppText variant="heading">En este dispositivo</AppText>
          <AccountRow
            icon="product"
            title="Productos abiertos"
            detail="Nombres, fechas de apertura y vencimientos estimados"
          />
          <AccountRow
            icon="shield"
            title="Inventario local"
            detail="Tu inventario sigue disponible sin conexión."
          />
        </Card>
        <SecondaryButton
          label="Cerrar sesión"
          icon="logout"
          destructive
          onPress={() => router.replace(visualRoutes.signIn)}
        />
      </View>
    </Screen>
  );
}
