import { test, expect } from "@playwright/test";

const ROUTES = [
  "/admin/dashboard",
  "/admin/approvals",
  "/admin/shipments",
  "/admin/fleet",
  "/admin/omni-finance",
  "/admin/live-map",
  "/admin/settings",
];

test("admin: login + Prev/Next full walk + sidebar + signout", async ({ page }) => {
  await page.goto("/login");

  await page.getByTestId("login-email").fill("demo@britium.test");
  await page.getByTestId("login-password").fill("demo");
  await page.getByTestId("login-submit").click();

  await expect(page).toHaveURL(ROUTES[0]);

  // Forward walk
  await expect(page.getByTestId("btn-prev")).toBeDisabled();
  for (let i = 0; i < ROUTES.length - 1; i++) {
    await page.getByTestId("btn-next").click();
    await expect(page).toHaveURL(ROUTES[i + 1]);
  }
  await expect(page.getByTestId("btn-next")).toBeDisabled();

  // Backward walk
  for (let i = ROUTES.length - 1; i > 0; i--) {
    await page.getByTestId("btn-prev").click();
    await expect(page).toHaveURL(ROUTES[i - 1]);
  }
  await expect(page.getByTestId("btn-prev")).toBeDisabled();

  // Sidebar sanity
  await page.getByTestId("nav-shipments").click();
  await expect(page).toHaveURL("/admin/shipments");
  await page.getByTestId("nav-dashboard").click();
  await expect(page).toHaveURL("/admin/dashboard");

  // Sign out from menu
  await page.getByTestId("btn-account").click();
  await page.getByTestId("menu-signout").click();
  await expect(page).toHaveURL(/\/login/);
});
