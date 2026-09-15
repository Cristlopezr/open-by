import { useRouter } from "expo-router";

import { ConfirmOpeningContent } from "@/components/product/ConfirmOpeningContent";
import { products } from "@/features/mvp-visual/fixtures";
import { usePreviewState, visualRoutes } from "@/features/mvp-visual/state";
import type { ConfirmPreviewState } from "@/features/mvp-visual/types";

export default function ConfirmOpeningScreen() {
  const router = useRouter();
  const [state, setState] = usePreviewState<ConfirmPreviewState>("known");
  const product = state === "unknown" ? products[3] : products[0];

  return (
    <ConfirmOpeningContent
      product={product}
      state={state}
      onBack={() => router.replace(visualRoutes.scanner)}
      onCancel={() => router.replace(visualRoutes.scanner)}
      onAdd={() => setState(state === "adding" ? "added" : "adding")}
      onDone={() => router.replace(visualRoutes.home)}
    />
  );
}
