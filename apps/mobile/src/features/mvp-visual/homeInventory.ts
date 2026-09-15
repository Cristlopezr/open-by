import type { HomeInventoryResults, HomeStatusFilter, ProductFixture } from "./types";

export function getHomeInventoryResults(
  inventory: ProductFixture[],
  searchText: string,
  filter: HomeStatusFilter,
): HomeInventoryResults {
  const ordered = [...inventory].sort((a, b) => a.urgencyRank - b.urgencyRank);
  const query = searchText.trim().toLocaleLowerCase();

  return {
    soonProducts: ordered.filter((product) => product.status === "soon"),
    tableProducts: ordered.filter((product) => {
      if (filter !== "all" && product.status !== filter) return false;
      if (!query) return true;
      return [product.name, product.brand, product.categoryLabel].some((value) =>
        value?.toLocaleLowerCase().includes(query),
      );
    }),
  };
}
