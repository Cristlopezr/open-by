import { SymbolView, type AndroidSymbol, type SFSymbol } from "expo-symbols";
import { Text, type StyleProp, type ViewStyle } from "react-native";

export type AppIconName =
  | "home"
  | "scan"
  | "preferences"
  | "notification"
  | "clock"
  | "warning"
  | "error"
  | "success"
  | "product"
  | "category"
  | "offline"
  | "camera"
  | "flash"
  | "close"
  | "back"
  | "delete"
  | "edit"
  | "shield"
  | "dark"
  | "light"
  | "system"
  | "info"
  | "search"
  | "food"
  | "leaf"
  | "account"
  | "cloud"
  | "mail"
  | "lock"
  | "google"
  | "sync"
  | "logout"
  | "forward"
  | "add";

const icons: Record<
  AppIconName,
  { ios: SFSymbol; android: AndroidSymbol; web: AndroidSymbol }
> = {
  home: { ios: "house.fill", android: "home", web: "home" },
  scan: { ios: "barcode.viewfinder", android: "barcode_scanner", web: "barcode_scanner" },
  preferences: { ios: "slider.horizontal.3", android: "tune", web: "tune" },
  notification: { ios: "bell.fill", android: "notifications", web: "notifications" },
  clock: { ios: "clock.fill", android: "schedule", web: "schedule" },
  warning: { ios: "exclamationmark.triangle.fill", android: "warning", web: "warning" },
  error: { ios: "xmark.circle.fill", android: "error", web: "error" },
  success: { ios: "checkmark.circle.fill", android: "check_circle", web: "check_circle" },
  product: { ios: "shippingbox.fill", android: "inventory_2", web: "inventory_2" },
  category: { ios: "square.grid.2x2.fill", android: "category", web: "category" },
  offline: { ios: "wifi.slash", android: "wifi_off", web: "wifi_off" },
  camera: { ios: "camera.fill", android: "camera", web: "camera" },
  flash: { ios: "flashlight.on.fill", android: "flashlight_on", web: "flashlight_on" },
  close: { ios: "xmark", android: "close", web: "close" },
  back: { ios: "chevron.left", android: "arrow_back", web: "arrow_back" },
  delete: { ios: "trash.fill", android: "delete", web: "delete" },
  edit: { ios: "pencil", android: "edit", web: "edit" },
  shield: { ios: "checkmark.shield.fill", android: "shield", web: "shield" },
  dark: { ios: "moon.fill", android: "dark_mode", web: "dark_mode" },
  light: { ios: "sun.max.fill", android: "light_mode", web: "light_mode" },
  system: {
    ios: "circle.lefthalf.filled",
    android: "settings_brightness",
    web: "settings_brightness",
  },
  info: { ios: "info.circle.fill", android: "info", web: "info" },
  search: { ios: "magnifyingglass", android: "search", web: "search" },
  food: { ios: "fork.knife", android: "restaurant", web: "restaurant" },
  leaf: { ios: "leaf.fill", android: "spa", web: "spa" },
  account: { ios: "person.crop.circle.fill", android: "account_circle", web: "account_circle" },
  cloud: { ios: "cloud.fill", android: "cloud", web: "cloud" },
  mail: { ios: "envelope.fill", android: "mail", web: "mail" },
  lock: { ios: "lock.fill", android: "lock", web: "lock" },
  google: { ios: "g.circle.fill", android: "g_mobiledata", web: "g_mobiledata" },
  sync: { ios: "arrow.triangle.2.circlepath", android: "sync", web: "sync" },
  logout: { ios: "rectangle.portrait.and.arrow.right", android: "logout", web: "logout" },
  forward: { ios: "chevron.right", android: "chevron_right", web: "chevron_right" },
  add: { ios: "plus", android: "add", web: "add" },
};

interface AppIconProps {
  name: AppIconName;
  color: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function AppIcon({ name, color, size = 22, style }: AppIconProps) {
  return (
    <SymbolView
      name={icons[name]}
      size={size}
      tintColor={color}
      style={style}
      fallback={<Text style={{ color, fontSize: size }}>•</Text>}
    />
  );
}
