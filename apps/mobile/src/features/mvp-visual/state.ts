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
  signIn: "/sign-in",
  signUp: "/sign-up",
  verifyEmail: "/verify-email",
  resetPassword: "/reset-password",
  newPassword: "/new-password",
  account: "/account",
} as const;

export function usePreviewState<T extends string>(initial: T) {
  return useState<T>(initial);
}

export const homeOptions: PreviewOption<HomePreviewState>[] = [
  { value: "mixed", label: "Inventario" },
  { value: "empty", label: "Vacío" },
  { value: "edge", label: "Texto largo" },
];

export const scannerOptions: PreviewOption<ScannerPreviewState>[] = [
  { value: "ready", label: "Listo" },
  { value: "loading", label: "Cargando" },
  { value: "success", label: "Encontrado" },
  { value: "cameraDenied", label: "Cámara denegada" },
  { value: "unreadable", label: "No se pudo leer" },
  { value: "offline", label: "Sin conexión" },
  { value: "lookupFailure", label: "Error de búsqueda" },
  { value: "unknownBarcode", label: "Desconocido" },
];

export const confirmOptions: PreviewOption<ConfirmPreviewState>[] = [
  { value: "known", label: "Duración conocida" },
  { value: "unknown", label: "Duración desconocida" },
  { value: "adding", label: "Agregando" },
  { value: "added", label: "Agregado" },
  { value: "discard", label: "Descartar" },
];

export const detailsOptions: PreviewOption<DetailsPreviewState>[] = [
  { value: "fresh", label: "Vigente" },
  { value: "soon", label: "Por vencer" },
  { value: "expired", label: "Vencido" },
  { value: "unknown", label: "Desconocido" },
  { value: "delete", label: "Eliminar" },
  { value: "discard", label: "Descartar" },
];

export const reportOptions: PreviewOption<ReportPreviewState>[] = [
  { value: "ready", label: "Listo" },
  { value: "submitting", label: "Enviando" },
  { value: "submitted", label: "Enviado" },
];

export const preferencesOptions: PreviewOption<PreferencesPreviewState>[] = [
  { value: "default", label: "Predeterminado" },
  { value: "notificationsDenied", label: "Notificaciones denegadas" },
];
