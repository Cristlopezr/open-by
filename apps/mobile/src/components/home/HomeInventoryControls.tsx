import { Pressable, StyleSheet, TextInput, View } from "react-native";

import { AppIcon } from "@/components/ui/AppIcon";
import { AppText } from "@/components/ui/VisualPrimitives";
import type { HomeStatusFilter } from "@/features/mvp-visual/types";
import { useVisualTheme } from "@/theme/ThemeProvider";
import { radii, sizes, spacing } from "@/theme/tokens";

const filters: { value: HomeStatusFilter; label: string }[] = [
  { value: "all", label: "Todos" },
  { value: "soon", label: "Por vencer" },
  { value: "expired", label: "Vencidos" },
];

export function HomeInventoryControls({
  searchText,
  onSearchChange,
  filter,
  onFilterChange,
}: {
  searchText: string;
  onSearchChange: (value: string) => void;
  filter: HomeStatusFilter;
  onFilterChange: (value: HomeStatusFilter) => void;
}) {
  const { colors } = useVisualTheme();

  return (
    <View style={styles.controls}>
      <View style={[styles.searchField, { backgroundColor: colors.surface, borderColor: colors.border }]}>
        <AppIcon name="search" color={colors.textSecondary} size={19} />
        <TextInput
          accessibilityLabel="Buscar productos abiertos"
          autoCapitalize="none"
          placeholder="Buscar nombre, marca o categoría"
          placeholderTextColor={colors.textSecondary}
          value={searchText}
          onChangeText={onSearchChange}
          style={[styles.searchInput, { color: colors.text }]}
        />
      </View>
      <View style={styles.filterRow}>
        {filters.map((option) => {
          const selected = filter === option.value;
          return (
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ selected }}
              key={option.value}
              onPress={() => onFilterChange(option.value)}
              style={[styles.filter, { backgroundColor: selected ? colors.primary : colors.surfaceSecondary }]}
            >
              <AppText variant="label" color={selected ? colors.surface : colors.textSecondary}>
                {option.label}
              </AppText>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

export function HomeNoResults() {
  const { colors } = useVisualTheme();
  return (
    <View style={styles.noResults}>
      <AppIcon name="search" color={colors.textSecondary} size={28} />
      <AppText variant="heading">No se encontraron productos</AppText>
      <AppText color={colors.textSecondary}>Prueba con otra búsqueda o filtro.</AppText>
    </View>
  );
}

const styles = StyleSheet.create({
  controls: { gap: spacing.xs },
  searchField: {
    minHeight: sizes.touch,
    borderWidth: 1,
    borderRadius: radii.control,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: spacing.sm,
    gap: spacing.xs,
  },
  searchInput: { flex: 1, minHeight: sizes.touch, fontSize: 14 },
  filterRow: { flexDirection: "row", gap: spacing.xs },
  filter: {
    flex: 1,
    minHeight: sizes.touch,
    borderRadius: radii.pill,
    alignItems: "center",
    justifyContent: "center",
  },
  noResults: { alignItems: "center", justifyContent: "center", gap: spacing.xs, padding: spacing.xl },
});
