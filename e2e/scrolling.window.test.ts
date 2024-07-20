import { test, expect } from "@playwright/test";
import { Examples, getTestUrl, trackMouse, waitForList } from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.SCROLLING_WINDOW));
  await page.waitForSelector("[data-storyloaded]");
  await waitForList(page);
});

test("scroll down", async ({ page }) => {
  await trackMouse(page as any);
  await page.mouse.move(190, 140);
  await page.mouse.down();
  await page.mouse.move(190, 690);
  await new Promise((r) => setTimeout(r, 200));
  await page.mouse.up();
  const pageYOffset = await page.evaluate(() => window.pageYOffset);
  expect(pageYOffset).toBeGreaterThan(0);
});

test("scroll up", async ({ page }) => {
  await trackMouse(page as any);
  const list = await page.$("#ladle-root ul");
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.mouse.move(190, 641);
  await page.mouse.down();
  await page.mouse.move(190, 100);
  await new Promise((r) => setTimeout(r, 200));
  await page.mouse.up();
  const pageYOffset = await page.evaluate(() => window.pageYOffset);
  expect(pageYOffset).toBeLessThan(301);
});
