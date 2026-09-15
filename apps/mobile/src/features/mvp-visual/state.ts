import { useState } from "react";

import type {
  ConfirmPreviewState,
  DetailsPreviewState,
  HomePreviewState,
  PreviewOption,
  PreferencesPreviewState,
  ReportPreviewState,
  ScannerPreviewState,
} from "./types";

export const visualRoutes = {
  home: "/",
  scanner: "/scanner",
  confirmOpening: "/confirm-opening",
  productDetails: "/product-details",
  reportUnknown: "/report-unknown",
  preferences: "/preferences",
} as const;

export function usePreviewState<T extends string>(initial: T) {
  return useState<T>(initial);
}

export const homeOptions: PreviewOption<HomePreviewState>[] = [
  { value: "mixed", label: "Inventory" },
  { value: "empty", label: "Empty" },
  { value: "edge", label: "Long text" },
];

export const scannerOptions: PreviewOption<ScannerPreviewState>[] = [
  { value: "ready", label: "Ready" },
  { value: "loading", label: "Loading" },
  { value: "success", label: "Success" },
  { value: "cameraDenied", label: "Camera denied" },
  { value: "unreadable", label: "Unreadable" },
  { value: "offline", label: "No connection" },
  { value: "lookupFailure", label: "Lookup error" },
  { value: "unknownBarcode", label: "Unknown" },
];

export const confirmOptions: PreviewOption<ConfirmPreviewState>[] = [
  { value: "known", label: "Known lifetime" },
  { value: "unknown", label: "Unknown lifetime" },
  { value: "adding", label: "Adding" },
  { value: "added", label: "Added" },
  { value: "discard", label: "Discard" },
];

export const detailsOptions: PreviewOption<DetailsPreviewState>[] = [
  { value: "fresh", label: "Fresh" },
  { value: "soon", label: "Soon" },
  { value: "expired", label: "Expired" },
  { value: "unknown", label: "Unknown" },
  { value: "delete", label: "Delete" },
  { value: "discard", label: "Discard" },
];

export const reportOptions: PreviewOption<ReportPreviewState>[] = [
  { value: "ready", label: "Ready" },
  { value: "submitting", label: "Submitting" },
  { value: "submitted", label: "Submitted" },
];

export const preferencesOptions: PreviewOption<PreferencesPreviewState>[] = [
  { value: "default", label: "Default" },
  { value: "notificationsDenied", label: "Notifications denied" },
];
