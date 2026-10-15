import { test, expect } from "@playwright/test";

test.beforeEach(async ({ page }) => {
  await page.goto(
    `${process.env.PLAYWRIGHT_BASE_URL ?? "http://127.0.0.1:3000"}/lab`,
  );
});

test("locale and currency format fixed values without conversion", async ({
  page,
}) => {
  await page.getByLabel("Display locale").selectOption("de-DE");
  await page.getByLabel("Display currency").selectOption("EUR");
  await expect(page.getByTestId("formatted-money")).toHaveText(
    new Intl.NumberFormat("de-DE", {
      style: "currency",
      currency: "EUR",
    }).format(12345.67),
  );
  await expect(page.getByTestId("formatted-number")).toHaveText("12.345,67");
  await expect(page.getByTestId("formatted-percent")).toHaveText(
    new Intl.NumberFormat("de-DE", {
      style: "percent",
      maximumFractionDigits: 2,
    }).format(0.1265),
  );
  await expect(page.getByTestId("formatted-date")).toHaveText(
    new Intl.DateTimeFormat("de-DE", {
      dateStyle: "medium",
      timeZone: "UTC",
    }).format(new Date("2026-06-15T00:00:00Z")),
  );
  await expect(page.getByText(/NOT FX conversion/)).toBeVisible();
  await page.getByLabel("Display locale").selectOption("ja-JP");
  await page.getByLabel("Display currency").selectOption("JPY");
  await expect(page.getByTestId("formatted-money")).toHaveText(
    new Intl.NumberFormat("ja-JP", {
      style: "currency",
      currency: "JPY",
    }).format(12345.67),
  );
  await page.getByRole("button", { name: "Reset formatting" }).click();
  await expect(page.getByLabel("Display locale")).toHaveValue("en-SG");
});

test("single entry validates finite amounts and duplicate references then adds locally", async ({
  page,
}) => {
  await page.getByRole("button", { name: "Add demo transaction" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Entry not added" }),
  ).toContainText("Correct the highlighted fields");
  await expect(page.getByLabel("Reference", { exact: true })).toBeFocused();
  await page.getByLabel("Reference", { exact: true }).fill("DEMO-101");
  await page.getByLabel("Amount", { exact: true }).fill("Infinity");
  await page.getByRole("button", { name: "Add demo transaction" }).click();
  await expect(page.locator("#reference-error")).toContainText(
    "already exists",
  );
  await expect(page.locator("#amount-error")).toContainText(
    "at most 1,000,000",
  );
  await page.getByLabel("Reference", { exact: true }).fill("DEMO-107");
  await page.getByLabel("Amount", { exact: true }).fill("150.25");
  await page.getByLabel("Category", { exact: true }).selectOption("Travel");
  await page.getByRole("button", { name: "Add demo transaction" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Added DEMO-107" }),
  ).toBeVisible();
  await expect(
    page.getByRole("row").filter({ hasText: "DEMO-107" }),
  ).toContainText("Travel");
  await page.reload();
  await expect(
    page.getByRole("row").filter({ hasText: "DEMO-107" }),
  ).toHaveCount(0);
});

test("tabs support arrows home and end; bulk validation is atomic and actionable", async ({
  page,
}) => {
  const single = page.getByRole("tab", { name: "Single entry" });
  const bulk = page.getByRole("tab", { name: "Bulk import" });
  await single.focus();
  await page.keyboard.press("ArrowRight");
  await expect(bulk).toBeFocused();
  await expect(bulk).toHaveAttribute("aria-selected", "true");
  await page.keyboard.press("Home");
  await expect(single).toBeFocused();
  await page.keyboard.press("End");
  await expect(bulk).toBeFocused();
  await page
    .getByLabel("Batch text")
    .fill(
      "reference,amount,category\nDEMO-108,50,Travel\nDEMO-109,NaN,Software",
    );
  await page.getByRole("button", { name: "Validate batch" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Nothing added" }),
  ).toContainText("Line 3");
  await expect(
    page.getByRole("button", { name: "Add validated batch" }),
  ).toHaveCount(0);
  await expect(
    page.getByRole("row").filter({ hasText: "DEMO-108" }),
  ).toHaveCount(0);
  await page.getByRole("button", { name: "Load sample" }).click();
  await page.getByRole("button", { name: "Validate batch" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "3 valid rows" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Add validated batch" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Added 3 transactions" }),
  ).toBeVisible();
  await expect(
    page.getByRole("row").filter({ hasText: "DEMO-104" }),
  ).toHaveCount(1);
  await page.getByRole("button", { name: "Validate batch" }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Nothing added" }),
  ).toContainText("already exists");
});

test("native modal supports keyboard dismissal and restores focus", async ({
  page,
}) => {
  const trigger = page.getByRole("button", { name: "Review demo session" });
  await trigger.click();
  const dialog = page.getByRole("dialog", { name: "Demo session summary" });
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("button", { name: "Close dialog" }),
  ).toBeFocused();
  await page.keyboard.press("Tab");
  await expect(
    dialog.getByRole("button", { name: "Back to workspace" }),
  ).toBeFocused();
  await page.keyboard.press("Shift+Tab");
  await expect(
    dialog.getByRole("button", { name: "Close dialog" }),
  ).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(trigger).toBeFocused();
});

test("loading error empty and data states preserve the local ledger", async ({
  page,
}) => {
  const states = page.getByRole("group", { name: "Preview ledger state" });
  await states.getByRole("button", { name: "Loading", exact: true }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Loading preview" }),
  ).toBeVisible();
  await expect(
    page.getByRole("button", { name: "Loading…", exact: true }),
  ).toBeDisabled();
  await states.getByRole("button", { name: "Error", exact: true }).click();
  await expect(
    page.getByRole("alert").filter({ hasText: "Simulated failure" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Retry ledger" }).click();
  await expect(
    page.getByRole("row").filter({ hasText: "DEMO-101" }),
  ).toBeVisible();
  await states.getByRole("button", { name: "Empty", exact: true }).click();
  await expect(page.getByText("No transactions in this preview")).toBeVisible();
  await page.getByRole("button", { name: "Show demo data" }).click();
  await expect(
    page.getByRole("row").filter({ hasText: "DEMO-101" }),
  ).toBeVisible();
});

test("mobile workspace remains usable and provides chart text equivalents", async ({
  page,
}) => {
  await expect(page.getByRole("main")).toHaveCount(1);
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(
    page.getByRole("heading", { name: "Amount by category" }),
  ).toBeVisible();
  await expect(page.locator("dl")).toContainText("Services");
  await expect(page.locator("dl")).toContainText("1,800");
  await expect
    .poll(() =>
      page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    )
    .toBe(true);
  await page.getByRole("tab", { name: "Bulk import" }).click();
  await expect(page.getByLabel("Batch text")).toBeVisible();
  await page.getByRole("button", { name: "Validate batch" }).click();
  await expect(
    page.getByRole("button", { name: "Add validated batch" }),
  ).toBeVisible();
});
