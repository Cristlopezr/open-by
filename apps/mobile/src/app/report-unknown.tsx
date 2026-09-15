import { useRouter } from "expo-router";
import { StyleSheet, View } from "react-native";

import { UnknownProductForm } from "@/components/product/UnknownProductForm";
import { AppText, IconButton, Screen } from "@/components/ui/VisualPrimitives";
import { unknownBarcode } from "@/features/mvp-visual/fixtures";
import { usePreviewState, visualRoutes } from "@/features/mvp-visual/state";
import type { ReportPreviewState } from "@/features/mvp-visual/types";
import { sizes, spacing } from "@/theme/tokens";

export default function ReportUnknownScreen() {
  const router = useRouter();
  const [state, setState] = usePreviewState<ReportPreviewState>("ready");
  const submit = () => {
    if (state === "ready") setState("submitting");
    else if (state === "submitting") setState("submitted");
    else router.replace(visualRoutes.home);
  };

  return (
    <Screen>
      <View style={styles.header}>
        <IconButton icon="back" label="Back to Scanner" onPress={() => router.back()} />
        <AppText variant="heading">Report product</AppText>
        <View style={styles.spacer} />
      </View>
      <UnknownProductForm barcode={unknownBarcode} state={state} onSubmit={submit} onCancel={() => router.replace(visualRoutes.home)} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  header: { minHeight: 56, flexDirection: "row", alignItems: "center", justifyContent: "space-between", gap: spacing.sm },
  spacer: { width: sizes.touch },
});
