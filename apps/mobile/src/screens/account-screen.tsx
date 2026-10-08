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
        <PageHeader title="Account & sync" onBack={() => router.back()} />
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
            <Pill label="Email verified" color={colors.primary} icon="shield" />
          </View>
        </Card>
        <View style={[s.syncHero, { backgroundColor: colors.primary }]}>
          <View style={s.row}>
            <AppIcon name="cloud" color={colors.onPrimary} size={32} />
            <Pill
              label={connected ? "Connected" : "Offline"}
              color={colors.onPrimary}
            />
          </View>
          <AppText variant="title" color={colors.onPrimary}>
            {"Your inventory,\nbacked up."}
          </AppText>
          <AppText color={colors.onPrimary}>
            {sync
              ? "All opened products are up to date."
              : "Keep the products you’ve opened with you across devices."}
          </AppText>
          <View style={s.syncNumbers}>
            <View>
              <AppText variant="title" color={colors.onPrimary}>
                {homeProducts.length}
              </AppText>
              <AppText variant="caption" color={colors.onPrimary}>
                Opened items
              </AppText>
            </View>
            <View>
              <AppText variant="title" color={colors.onPrimary}>
                1
              </AppText>
              <AppText variant="caption" color={colors.onPrimary}>
                Account
              </AppText>
            </View>
          </View>
        </View>
        <SecondaryButton
          label={sync ? "Inventory up to date" : "Sync inventory"}
          icon="sync"
          onPress={() => setSync(true)}
        />
        <View style={s.row}>
          <ChoiceChip
            label="Connected"
            selected={connected}
            onPress={() => setConnected(true)}
          />
          <ChoiceChip
            label="Offline"
            selected={!connected}
            onPress={() => setConnected(false)}
          />
        </View>
        <Card style={s.form}>
          <AppText variant="heading">On this device</AppText>
          <AccountRow
            icon="product"
            title="Opened products"
            detail="Product names, opening dates and expiration snapshots"
          />
          <AccountRow
            icon="shield"
            title="Local inventory"
            detail="Your inventory stays available when you’re offline."
          />
        </Card>
        <SecondaryButton
          label="Sign out"
          icon="logout"
          destructive
          onPress={() => router.replace(visualRoutes.signIn)}
        />
      </View>
    </Screen>
  );
}
