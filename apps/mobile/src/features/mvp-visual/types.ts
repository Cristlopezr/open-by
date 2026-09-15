export type ThemeChoice = "light" | "dark" | "system";
export type EffectiveAppearance = "light" | "dark";
export type ExpirationStatus = "fresh" | "soon" | "expired" | "unknown";
export type HomeStatusFilter = "all" | "soon" | "expired";
export type TrustState = "trusted" | "unverified";

export interface ProductFixture {
  id: string;
  name?: string;
  brand?: string;
  categoryLabel: string;
  barcode: string;
  categoryIcon: "milk" | "jar" | "bottle" | "food";
  openedAtLabel: string;
  lifetimeLabel?: string;
  expirationLabel?: string;
  remainingLabel: string;
  status: ExpirationStatus;
  urgencyRank: number;
  trust: TrustState;
  reminderLabel: string;
}

export interface HomeInventoryResults {
  tableProducts: ProductFixture[];
  soonProducts: ProductFixture[];
}

export type HomePreviewState = "mixed" | "empty" | "edge";
export type ScannerPreviewState =
  | "ready"
  | "loading"
  | "success"
  | "cameraDenied"
  | "unreadable"
  | "offline"
  | "lookupFailure"
  | "unknownBarcode";
export type ConfirmPreviewState =
  | "known"
  | "unknown"
  | "adding"
  | "added"
  | "discard";
export type DetailsPreviewState =
  | "fresh"
  | "soon"
  | "expired"
  | "unknown"
  | "delete"
  | "discard";
export type ReportPreviewState = "ready" | "submitting" | "submitted";
export type PreferencesPreviewState = "default" | "notificationsDenied";

export interface PreviewOption<T extends string> {
  value: T;
  label: string;
}
