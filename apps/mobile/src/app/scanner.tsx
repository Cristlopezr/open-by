import { useRouter } from "expo-router";

import { ScannerVisuals } from "@/components/scanner/ScannerVisuals";
import { usePreviewState, visualRoutes } from "@/features/mvp-visual/state";
import type { ScannerPreviewState } from "@/features/mvp-visual/types";

export default function ScannerScreen() {
  const router = useRouter();
  const [state, setState] = usePreviewState<ScannerPreviewState>("ready");

  const advance = () => {
    if (state === "ready") setState("loading");
    else if (state === "loading") setState("success");
    else if (state === "success") router.push(visualRoutes.confirmOpening);
  };

  return (
    <ScannerVisuals
      state={state}
      onClose={() => router.replace(visualRoutes.home)}
      onRetry={() => setState("ready")}
      onAdvance={advance}
      onReport={() => router.push(visualRoutes.reportUnknown)}
    />
  );
}
