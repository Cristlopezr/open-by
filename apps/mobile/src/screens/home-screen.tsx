import { Link } from "expo-router";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  TextInput,
  View,
} from "react-native";
import { BottomNavigation } from "@/components/navigation/BottomNavigation";
import { InventorySummary } from "@/components/home/InventorySummary";
import { InventoryGroup } from "@/components/home/InventoryGroup";
import { AppIcon } from "@/components/ui/AppIcon";
import {
  ChoiceChip,
  PageHeader,
} from "@/components/ui/DesignSystem";
import { AppText, Screen, StateNotice } from "@/components/ui/VisualPrimitives";
import { homeProducts } from "@/features/mvp-visual/fixtures";
import { visualRoutes } from "@/features/mvp-visual/state";
import { useVisualTheme } from "@/theme/ThemeProvider";

export function HomeScreen() {
  const { colors, isDark, setChoice } = useVisualTheme();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("All");
  const [cards, setCards] = useState(false);
  const categories = [
    "All",
    ...new Set(homeProducts.map((p) => p.categoryLabel)),
  ];
  const results = [...homeProducts]
    .sort((a, b) => a.urgencyRank - b.urgencyRank)
    .filter(
      (p) =>
        (category === "All" || p.categoryLabel === category) &&
        `${p.name} ${p.brand} ${p.barcode}`
          .toLowerCase()
          .includes(query.toLowerCase()),
    );
  const urgent = results.filter(
    (p) => p.status === "expired" || p.status === "soon",
  );
  const other = results.filter(
    (p) => p.status !== "expired" && p.status !== "soon",
  );
  return (
    <View style={[styles.root, { backgroundColor: colors.background }]}>
      <Screen contentStyle={styles.content}>
        <PageHeader
          title="OpenBy"
          subtitle="Tus productos abiertos"
          accountHref={visualRoutes.account}
        />
        <View style={styles.heading}>
          <View style={styles.flex}>
            <AppText
              variant="caption"
              color={colors.primary}
              style={styles.eyebrow}
            >
              MENOS DESPERDICIO, MÁS TRANQUILIDAD
            </AppText>
            <AppText variant="title">Tus productos</AppText>
          </View>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel={
              isDark
                ? "Cambiar a modo claro"
                : "Cambiar a modo oscuro"
            }
            onPress={() => setChoice(isDark ? "light" : "dark")}
            style={[styles.theme, { backgroundColor: colors.surfaceSecondary }]}
          >
            <AppIcon
              name={isDark ? "light" : "dark"}
              color={colors.primary}
              size={21}
            />
          </Pressable>
        </View>
        <InventorySummary products={homeProducts} />
        <View style={[styles.search, { backgroundColor: colors.surface }]}>
          <AppIcon name="search" color={colors.textSecondary} size={19} />
          <TextInput
            accessibilityLabel="Buscar en el inventario"
            placeholder="Buscar producto, marca o código de barras"
            placeholderTextColor={colors.textSecondary}
            value={query}
            onChangeText={setQuery}
            style={[styles.searchInput, { color: colors.text }]}
          />
          <Link href={visualRoutes.scanner} asChild>
            <Pressable
              accessibilityRole="button"
              accessibilityLabel="Escanear código de barras"
            >
              <AppIcon name="scan" color={colors.primary} size={20} />
            </Pressable>
          </Link>
        </View>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chips}
        >
          {categories.map((value) => (
            <ChoiceChip
              key={value}
              label={value === "All" ? `Todos · ${homeProducts.length}` : value}
              selected={value === category}
              onPress={() => setCategory(value)}
            />
          ))}
        </ScrollView>
        <View style={styles.listHeader}>
          <AppText variant="heading" style={styles.listTitle}>
            Productos registrados{" "}
            <AppText variant="caption" color={colors.textSecondary}>
              ({results.length})
            </AppText>
          </AppText>
          <View
            style={[
              styles.viewToggle,
              { backgroundColor: colors.surfaceSecondary },
            ]}
          >
            {[
              { label: "Compacta", showsCards: false },
              { label: "Tarjetas", showsCards: true },
            ].map((option) => (
              <Pressable
                key={option.label}
                accessibilityRole="button"
                accessibilityState={{ selected: cards === option.showsCards }}
                onPress={() => setCards(option.showsCards)}
                style={[
                  styles.viewOption,
                  cards === option.showsCards && { backgroundColor: colors.surface },
                ]}
              >
                <AppText
                  variant="caption"
                  color={
                    cards === option.showsCards ? colors.primary : colors.textSecondary
                  }
                >
                  {option.label}
                </AppText>
              </Pressable>
            ))}
          </View>
        </View>
        {urgent.length ? (
          <InventoryGroup
            label="Requieren atención"
            color={colors.expired}
            products={urgent}
            cards={cards}
          />
        ) : null}
        {other.length ? (
          <InventoryGroup
            label="Vigentes"
            color={colors.primary}
            products={other}
            cards={cards}
          />
        ) : null}
        {!results.length ? (
          <StateNotice
            tone="neutral"
            title="No se encontraron productos"
            message="Prueba con otro nombre, marca o categoría."
          />
        ) : null}
        <View
          style={[styles.tip, { backgroundColor: colors.surfaceSecondary }]}
        >
          <AppIcon name="shield" color={colors.primary} size={24} />
          <View style={styles.flex}>
            <AppText variant="label">Cuida tus productos por más tiempo</AppText>
            <AppText variant="caption" color={colors.textSecondary}>
              Las fechas se estiman según reglas de apertura verificadas. Sigue
              siempre las instrucciones de conservación del producto.
            </AppText>
          </View>
        </View>
      </Screen>
      <BottomNavigation active="home" />
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1 },
  content: { paddingTop: 4, paddingBottom: 24, gap: 16 },
  flex: { flex: 1, minWidth: 0 },
  heading: { flexDirection: "row", alignItems: "center", gap: 12 },
  eyebrow: { fontSize: 10, letterSpacing: 1.2, marginBottom: 5 },
  theme: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
  },
  search: {
    minHeight: 46,
    borderRadius: 12,
    paddingHorizontal: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  searchInput: { flex: 1, fontSize: 13, paddingVertical: 12 },
  chips: { gap: 8 },
  listHeader: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 8,
  },
  listTitle: { flexShrink: 1, minWidth: 0 },
  viewToggle: { flexDirection: "row", borderRadius: 8, padding: 3 },
  viewOption: { paddingHorizontal: 9, paddingVertical: 6, borderRadius: 6 },
  tip: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    padding: 16,
    borderRadius: 12,
  },
});
