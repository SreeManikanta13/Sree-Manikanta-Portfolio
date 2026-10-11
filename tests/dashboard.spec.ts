import { expect, test } from "@playwright/test";
import { AS_OF, holdings, ranges, transactions } from "../src/data/financial";
import { money } from "../src/lib/format";
import {
  filterHoldings,
  getAllocation,
  getPortfolioSummary,
  getRangePerformance,
  holdingValue,
} from "../src/lib/portfolio";

test("fictional snapshot math stays internally consistent", () => {
  const summary = getPortfolioSummary();
  expect(summary).toMatchObject({
    value: 120000,
    cost: 111990,
    gain: 8010,
    count: 6,
  });
  expect(getPortfolioSummary([])).toMatchObject({
    value: 0,
    cost: 0,
    returnRate: 0,
  });
  const allocation = getAllocation();
  expect(allocation.reduce((sum, item) => sum + item.value, 0)).toBe(
    summary.value,
  );
  expect(allocation.reduce((sum, item) => sum + item.share, 0)).toBeCloseTo(1);
  for (const range of ranges) {
    const performance = getRangePerformance(range);
    expect(performance.endValue).toBe(summary.value);
    expect(performance.points.at(-1)?.date).toBe(AS_OF);
    expect(performance.gain).toBe(
      performance.endValue - performance.startValue,
    );
    expect(performance.returnRate).toBe(
      performance.gain / performance.startValue,
    );
  }
  expect(filterHoldings(" f-tid ", "Equities", "value-desc")[0]?.name).toBe(
    "Tide Workshop",
  );
  for (const transaction of transactions) {
    if (transaction.units !== null && transaction.price !== null) {
      expect(Math.abs(transaction.amount)).toBe(
        transaction.units * transaction.price,
      );
      expect(transaction.amount < 0).toBe(transaction.type === "Buy");
    }
  }
});

test("ranges update opening values, gains and exact chart data", async ({
  page,
}) => {
  await page.goto("/fintech");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "in perspective",
  );
  await expect(page.getByTestId("portfolio-value")).toHaveText(money(120000));
  await page.getByText("View performance data", { exact: true }).click();
  for (const [range, opening, count] of [
    ["1M", 115200, 2],
    ["3M", 112000, 4],
    ["6M", 108000, 7],
    ["1Y", 100000, 13],
    ["ALL", 90000, 25],
  ] as const) {
    await page.getByRole("button", { name: range, exact: true }).click();
    await expect(
      page.getByRole("button", { name: range, exact: true }),
    ).toHaveAttribute("aria-pressed", "true");
    await expect(page.getByTestId("opening-value")).toHaveText(money(opening));
    await expect(page.getByTestId("period-gain")).toHaveText(
      `+${money(120000 - opening)}`,
    );
    const chartTable = page.locator("details table");
    await expect(chartTable.locator("tbody tr")).toHaveCount(count);
    await expect(chartTable.locator("tbody tr").last()).toContainText(
      money(120000),
    );
    await expect(page.getByTestId("portfolio-value")).toHaveText(money(120000));
  }
  const table = page.getByTestId("holdings-table");
  for (const holding of holdings) {
    await expect(
      table.getByRole("row").filter({ hasText: holding.name }),
    ).toContainText(money(holdingValue(holding)));
  }
});

test("holdings search, category, sorting, empty state and keyboard dialog", async ({
  page,
}) => {
  await page.goto("/fintech");
  const table = page.getByTestId("holdings-table");
  await expect(table.locator("tbody tr").first()).toContainText("Lumen Field");
  await page.getByLabel("Sort holdings").selectOption("value-asc");
  await expect(table.locator("tbody tr").first()).toContainText("Cash reserve");
  await page.getByLabel("Sort holdings").selectOption("name-asc");
  await expect(table.locator("tbody tr").first()).toContainText("Cash reserve");
  await page.getByLabel("Sort holdings").selectOption("return-asc");
  await expect(table.locator("tbody tr").first()).toContainText(
    "Tide Workshop",
  );
  await page.getByLabel("Sort holdings").selectOption("return-desc");
  await expect(table.locator("tbody tr").first()).toContainText("Lumen Field");
  await page.getByLabel("Asset category").selectOption("Bonds");
  await expect(table.locator("tbody tr")).toHaveCount(1);
  await expect(table).toContainText("Stonebridge Notes");
  await page.getByLabel("Search holdings").fill("not a holding");
  await expect(page.getByText("No holdings match your filters")).toBeVisible();
  await page.getByRole("button", { name: "Reset holdings filters" }).click();
  await expect(table.locator("tbody tr")).toHaveCount(6);
  await page.getByLabel("Search holdings").fill("f-tid");
  await expect(table.locator("tbody tr")).toHaveCount(1);
  const trigger = page.getByRole("button", { name: /Tide Workshop/ });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Tide Workshop" });
  await expect(dialog).toBeVisible();
  await expect(dialog).toContainText(money(17280));
  await expect(dialog).toContainText(money(-1080));
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
  await trigger.click();
  await page.getByRole("button", { name: "Back to holdings" }).click();
  await expect(dialog).not.toBeVisible();
});

test("transaction pagination and type filters reset the page", async ({
  page,
}) => {
  await page.goto("/fintech");
  const table = page.getByTestId("transactions-table");
  const next = page.getByRole("button", { name: "Next", exact: true });
  const previous = page.getByRole("button", { name: "Previous", exact: true });
  await expect(table.locator("tbody tr")).toHaveCount(5);
  await expect(previous).toBeDisabled();
  await next.click();
  await expect(table).toContainText("TX-007");
  await next.click();
  await expect(table.locator("tbody tr")).toHaveCount(2);
  await expect(next).toBeDisabled();
  await page.getByLabel("Transaction type").selectOption("Buy");
  await expect(previous).toBeDisabled();
  await expect(table.locator("tbody tr")).toHaveCount(5);
  await expect(
    table.locator("tbody tr").filter({ hasText: "Sell" }),
  ).toHaveCount(0);
  await next.click();
  await expect(table.locator("tbody tr")).toHaveCount(1);
  await expect(next).toBeDisabled();
  await page.getByLabel("Transaction type").selectOption("Dividend");
  await expect(table.locator("tbody tr")).toHaveCount(3);
  await expect(previous).toBeDisabled();
  await expect(next).toBeDisabled();
  await page.getByLabel("Transaction type").selectOption("Sell");
  await expect(table.locator("tbody tr")).toHaveCount(3);
  await page.getByLabel("Transaction type").selectOption("All");
  await expect(table.locator("tbody tr")).toHaveCount(5);
  await expect(next).toBeEnabled();
});

test("locale and currency format nominal numbers without conversion", async ({
  page,
}) => {
  await page.goto("/fintech");
  await page
    .getByRole("combobox", { name: "Locale", exact: true })
    .selectOption("de-DE");
  await page.getByLabel("Display currency").selectOption("EUR");
  await expect(page.getByTestId("portfolio-value")).toHaveText(
    money(120000, "de-DE", "EUR"),
  );
  await expect(page.getByTestId("opening-value")).toHaveText(
    money(100000, "de-DE", "EUR"),
  );
  await expect(
    page.getByText("Numbers are not converted using exchange rates.", {
      exact: false,
    }),
  ).toBeVisible();
  await page.getByRole("button", { name: "1M", exact: true }).click();
  await expect(page.getByTestId("period-gain")).toHaveText(
    `+${money(4800, "de-DE", "EUR")}`,
  );
  await page
    .getByRole("combobox", { name: "Locale", exact: true })
    .selectOption("ja-JP");
  await page.getByLabel("Display currency").selectOption("JPY");
  await expect(page.getByTestId("portfolio-value")).toHaveText(
    money(120000, "ja-JP", "JPY"),
  );
});

test("mobile dashboard fits the viewport and preserves chart summaries", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/fintech");
  await expect(
    page.getByRole("heading", { name: "Asset allocation" }),
  ).toBeVisible();
  await expect(
    page.getByRole("cell", { name: "72.58%", exact: true }),
  ).toBeVisible();
  await page.getByText("View performance data", { exact: true }).click();
  await expect(page.locator("details tbody tr")).toHaveCount(13);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
