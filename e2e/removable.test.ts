import { test, expect } from "@playwright/test";
import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
  getListItems,
  waitForList,
} from "./utils";

test.use({
  viewport: { width: 1030, height: 800 },
});

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.REMOVABLE));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page as any);
  await waitForList(page);
});

test("dnd the second item out the bounds to be removed", async ({ page }) => {
  await trackMouse(page as any);
  await page.mouse.move(517, 275);
  await page.mouse.down();
  await page.mouse.move(828, 222);
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 300));
  expect(await getListItems(page as any)).toEqual([
    "You can remove items by moving them far left or right. Also, onChange always gives you the getBoundingClientRect of the dropped item.",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
  await untrackMouse(page as any);
});
