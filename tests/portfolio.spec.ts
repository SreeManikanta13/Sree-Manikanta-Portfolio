import { expect, test } from "@playwright/test";

test("portfolio navigation, contact, and honest resume state", async ({
  page,
}) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Thoughtful fintech",
  );
  await expect(
    page.getByText("Senior Frontend Engineer / Full-Stack Developer", {
      exact: true,
    }),
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "Explore My Work" }),
  ).toHaveAttribute("href", "/projects");
  await expect(
    page.getByText("View Resume · coming soon").first(),
  ).toHaveAttribute("aria-disabled", "true");
  await expect(
    page.getByRole("link", { name: "sreemanikanta13@gmail.com" }),
  ).toHaveAttribute("href", "mailto:sreemanikanta13@gmail.com");
  await page.getByRole("link", { name: "Experience", exact: true }).click();
  await page
    .getByText("Explore contributions at Hatcher", { exact: true })
    .click();
  await expect(
    page.getByText(
      "Led the end-to-end migration of FAAST from Vue 2 to Vue 3.",
      { exact: true },
    ),
  ).toBeVisible();
});

test("project search, category filters, detail routes, and unknown route", async ({
  page,
}) => {
  await page.goto("/projects");
  await page.getByLabel("Search projects").fill("FAAST");
  await expect(page.locator(".project-card")).toHaveCount(1);
  await page.getByRole("link", { name: /Modernizing FAAST/ }).click();
  await expect(
    page.getByRole("heading", { name: "My role", exact: true }),
  ).toBeVisible();
  await expect(
    page.getByText(
      "I led the end-to-end migration of FAAST from Vue 2 to Vue 3 at Hatcher.",
      { exact: true },
    ),
  ).toBeVisible();
  await page
    .getByRole("link", { name: "All case studies", exact: false })
    .click();
  await page.getByRole("button", { name: "Engineering", exact: true }).click();
  await page.getByLabel("Search projects").fill("");
  await expect(page.locator(".project-card")).toHaveCount(2);
  await page.getByLabel("Search projects").fill("unmatched query");
  await expect(page.getByRole("status").first()).toContainText(
    "0 case studies",
  );
  await expect(page.getByText("No matching case studies")).toBeVisible();
  await page.goto("/projects/not-a-project");
  await expect(
    page.getByRole("heading", { name: "A page not in the portfolio." }),
  ).toBeVisible();
});

test("mobile navigation is operable and the page fits its viewport", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).not.toBeVisible();
  await page.getByRole("button", { name: "Menu", exact: true }).click();
  await expect(
    page.getByRole("button", { name: "Close menu" }),
  ).toHaveAttribute("aria-expanded", "true");
  await page.getByRole("link", { name: "Projects", exact: true }).click();
  await expect(page).toHaveURL(/\/projects$/);
  await expect(
    page.getByRole("navigation", { name: "Main navigation" }),
  ).not.toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= window.innerWidth,
    ),
  ).toBe(true);
});
