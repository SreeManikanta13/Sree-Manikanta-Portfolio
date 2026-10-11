import {
  holdings,
  performanceHistory,
  type Category,
  type Holding,
  type Range,
} from "@/data/financial";

export const holdingValue = (holding: Holding) => holding.units * holding.price;
export const holdingCost = (holding: Holding) =>
  holding.units * holding.costPrice;
export const holdingReturn = (holding: Holding) =>
  holding.costPrice === 0
    ? 0
    : (holding.price - holding.costPrice) / holding.costPrice;

export function getPortfolioSummary(items: readonly Holding[] = holdings) {
  const value = items.reduce((sum, item) => sum + holdingValue(item), 0);
  const cost = items.reduce((sum, item) => sum + holdingCost(item), 0);
  return {
    value,
    cost,
    gain: value - cost,
    returnRate: cost ? (value - cost) / cost : 0,
    count: items.length,
  };
}

export function getRangePerformance(range: Range = "1Y") {
  const months: Record<Range, number> = {
    "1M": 1,
    "3M": 3,
    "6M": 6,
    "1Y": 12,
    ALL: performanceHistory.length - 1,
  };
  const points = performanceHistory.slice(-(months[range] + 1));
  const startValue = points[0].value;
  const endValue = points[points.length - 1].value;
  return {
    points,
    startValue,
    endValue,
    gain: endValue - startValue,
    returnRate: (endValue - startValue) / startValue,
  };
}

export function getAllocation(items: readonly Holding[] = holdings) {
  const total = getPortfolioSummary(items).value;
  const categories: Category[] = ["Equities", "Bonds", "Cash"];
  const colors = ["#b5e7bd", "#83c8c6", "#a3acb5"];
  return categories.map((name, index) => {
    const value = items
      .filter((item) => item.category === name)
      .reduce((sum, item) => sum + holdingValue(item), 0);
    return {
      name,
      value,
      share: total ? value / total : 0,
      color: colors[index],
    };
  });
}

export type HoldingSort =
  "value-desc" | "value-asc" | "name-asc" | "return-desc" | "return-asc";
export function filterHoldings(
  query: string,
  category: Category | "All",
  sort: HoldingSort,
  items: readonly Holding[] = holdings,
) {
  const normalized = query.trim().toLocaleLowerCase("en");
  return items
    .filter(
      (item) =>
        (category === "All" || item.category === category) &&
        `${item.name} ${item.symbol}`
          .toLocaleLowerCase("en")
          .includes(normalized),
    )
    .sort((a, b) => {
      switch (sort) {
        case "value-desc":
          return holdingValue(b) - holdingValue(a);
        case "value-asc":
          return holdingValue(a) - holdingValue(b);
        case "name-asc":
          return a.name.localeCompare(b.name, "en");
        case "return-desc":
          return holdingReturn(b) - holdingReturn(a);
        case "return-asc":
          return holdingReturn(a) - holdingReturn(b);
      }
    });
}
