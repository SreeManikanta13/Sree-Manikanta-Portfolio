export const AS_OF = "2026-09-30";
export const ranges = ["1M", "3M", "6M", "1Y", "ALL"] as const;
export type Range = (typeof ranges)[number];
export type Category = "Equities" | "Bonds" | "Cash";
export type Holding = {
  id: string;
  name: string;
  symbol: string;
  category: Category;
  units: number;
  price: number;
  costPrice: number;
  description: string;
  color: string;
};

export const holdings: readonly Holding[] = [
  {
    id: "lumen",
    name: "Lumen Field",
    symbol: "F-LUM",
    category: "Equities",
    units: 240,
    price: 128,
    costPrice: 110,
    description:
      "An invented solar-materials business used to illustrate an equity holding.",
    color: "#b5e7bd",
  },
  {
    id: "tide",
    name: "Tide Workshop",
    symbol: "F-TID",
    category: "Equities",
    units: 180,
    price: 96,
    costPrice: 102,
    description:
      "An invented marine-design business. Its negative cost-basis return demonstrates a loss.",
    color: "#87b8e7",
  },
  {
    id: "grove",
    name: "Grove Systems",
    symbol: "F-GRV",
    category: "Equities",
    units: 350,
    price: 62,
    costPrice: 55,
    description:
      "An invented agricultural-software business in this sample portfolio.",
    color: "#d6c8a6",
  },
  {
    id: "orbit",
    name: "Orbit Loom",
    symbol: "F-ORB",
    category: "Equities",
    units: 120,
    price: 145,
    costPrice: 130,
    description:
      "An invented textile-automation business. No real security is represented.",
    color: "#b6a6dd",
  },
  {
    id: "stone",
    name: "Stonebridge Notes",
    symbol: "F-STN",
    category: "Bonds",
    units: 260,
    price: 80,
    costPrice: 78,
    description:
      "An invented fixed-income instrument; no actual issuer or yield is implied.",
    color: "#83c8c6",
  },
  {
    id: "cash",
    name: "Cash reserve",
    symbol: "F-CSH",
    category: "Cash",
    units: 12100,
    price: 1,
    costPrice: 1,
    description:
      "Uninvested nominal units in the fictional basket. The reserve earns no modeled interest.",
    color: "#a3acb5",
  },
];

export type PerformancePoint = { date: string; value: number };
export const performanceHistory: readonly PerformancePoint[] = [
  { date: "2024-09-30", value: 90000 },
  { date: "2024-10-31", value: 91800 },
  { date: "2024-11-30", value: 90800 },
  { date: "2024-12-31", value: 94300 },
  { date: "2025-01-31", value: 95100 },
  { date: "2025-02-28", value: 93600 },
  { date: "2025-03-31", value: 96900 },
  { date: "2025-04-30", value: 98200 },
  { date: "2025-05-31", value: 97500 },
  { date: "2025-06-30", value: 99100 },
  { date: "2025-07-31", value: 101600 },
  { date: "2025-08-31", value: 100800 },
  { date: "2025-09-30", value: 100000 },
  { date: "2025-10-31", value: 102200 },
  { date: "2025-11-30", value: 101400 },
  { date: "2025-12-31", value: 104300 },
  { date: "2026-01-31", value: 105200 },
  { date: "2026-02-28", value: 104500 },
  { date: "2026-03-31", value: 108000 },
  { date: "2026-04-30", value: 107100 },
  { date: "2026-05-31", value: 110300 },
  { date: "2026-06-30", value: 112000 },
  { date: "2026-07-31", value: 114400 },
  { date: "2026-08-31", value: 115200 },
  { date: AS_OF, value: 120000 },
];

export const transactionTypes = ["Buy", "Sell", "Dividend"] as const;
export type TransactionType = (typeof transactionTypes)[number];
export type Transaction = {
  id: string;
  date: string;
  holdingId: string;
  type: TransactionType;
  units: number | null;
  price: number | null;
  amount: number;
};

// A selected activity sample, not a complete account ledger or chart cash-flow series.
export const transactions: readonly Transaction[] = [
  {
    id: "TX-012",
    date: "2026-09-28",
    holdingId: "lumen",
    type: "Buy",
    units: 10,
    price: 126,
    amount: -1260,
  },
  {
    id: "TX-011",
    date: "2026-09-24",
    holdingId: "stone",
    type: "Dividend",
    units: null,
    price: null,
    amount: 104,
  },
  {
    id: "TX-010",
    date: "2026-09-18",
    holdingId: "tide",
    type: "Sell",
    units: 8,
    price: 97,
    amount: 776,
  },
  {
    id: "TX-009",
    date: "2026-09-11",
    holdingId: "grove",
    type: "Buy",
    units: 20,
    price: 60,
    amount: -1200,
  },
  {
    id: "TX-008",
    date: "2026-09-04",
    holdingId: "orbit",
    type: "Dividend",
    units: null,
    price: null,
    amount: 72,
  },
  {
    id: "TX-007",
    date: "2026-08-26",
    holdingId: "stone",
    type: "Buy",
    units: 12,
    price: 79,
    amount: -948,
  },
  {
    id: "TX-006",
    date: "2026-08-19",
    holdingId: "orbit",
    type: "Sell",
    units: 5,
    price: 140,
    amount: 700,
  },
  {
    id: "TX-005",
    date: "2026-08-12",
    holdingId: "lumen",
    type: "Buy",
    units: 8,
    price: 120,
    amount: -960,
  },
  {
    id: "TX-004",
    date: "2026-08-05",
    holdingId: "grove",
    type: "Dividend",
    units: null,
    price: null,
    amount: 87.5,
  },
  {
    id: "TX-003",
    date: "2026-07-29",
    holdingId: "tide",
    type: "Buy",
    units: 6,
    price: 99,
    amount: -594,
  },
  {
    id: "TX-002",
    date: "2026-07-22",
    holdingId: "stone",
    type: "Sell",
    units: 4,
    price: 79,
    amount: 316,
  },
  {
    id: "TX-001",
    date: "2026-07-15",
    holdingId: "grove",
    type: "Buy",
    units: 10,
    price: 58,
    amount: -580,
  },
];
