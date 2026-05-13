import { expect, test } from "@playwright/test";

test("home page renders hero, nav, and map", async ({ page }) => {
  await page.goto("/");

  await expect(page).toHaveTitle(/Home · Canada Transit Visualizer/);
  await expect(
    page.getByRole("heading", { name: /maps of canada that respect your time/i }),
  ).toBeVisible();
  await expect(
    page.getByRole("navigation").getByRole("link", { name: "Accessibility", exact: true }),
  ).toBeVisible();

  const mapCanvas = page.locator("canvas.maplibregl-canvas");
  await expect(mapCanvas).toBeVisible({ timeout: 10_000 });
});

test("accessibility route loads via client navigation", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: /explore transit accessibility/i }).click();
  await expect(page).toHaveURL(/\/accessibility$/);
  await expect(
    page.getByRole("heading", { name: /transit accessibility, anywhere/i }),
  ).toBeVisible();
});
