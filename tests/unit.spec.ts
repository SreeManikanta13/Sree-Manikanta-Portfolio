import { expect, test } from "@playwright/test";
import { date, money, number, percent } from "../src/lib/format";
import { projects } from "../src/data/projects";
import { profile } from "../src/data/profile";

test.describe("@unit formatting and published content", () => {
  test("formats nominal currencies and locale-specific separators", () => {
    expect(money(1234.56, "en-US", "USD")).toBe("$1,234.56");
    expect(money(1234.56, "de-DE", "EUR")).toBe("1.234,56\u00a0€");
    expect(money(1234.56, "ja-JP", "JPY")).toBe("￥1,235");
    expect(number(1234.56, "de-DE")).toBe("1.234,56");
    expect(percent(0.125, "en-US")).toBe("12.5%");
    expect(date("2025-01-15", "en-US")).toBe("Jan 15, 2025");
  });
  test("all eight case studies have complete structure and unique destinations", () => {
    expect(projects).toHaveLength(8);
    expect(new Set(projects.map((project) => project.slug)).size).toBe(8);
    for (const project of projects) {
      for (const text of [
        project.context,
        project.role,
        project.approach,
        project.decisions,
        project.tradeoffs,
        project.outcome,
      ])
        expect(text.length).toBeGreaterThan(20);
    }
    expect(
      projects.find((project) => project.slug === "customer-product")?.pending,
    ).toBe(true);
    expect(
      projects.find((project) => project.slug === "transaction-workflows")
        ?.pending,
    ).toBe(true);
  });
  test("resume and LinkedIn point to the supplied destinations", () => {
    expect(profile.resumePath).toBe("/Sree-Manikanta-Resume.pdf");
    expect(profile.linkedInUrl).toBe(
      "https://www.linkedin.com/in/sree-manikanta",
    );
  });
});
