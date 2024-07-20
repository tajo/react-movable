import { test, expect } from "@playwright/test";
import {
  Examples,
  getTestUrl,
  getListItems,
  addFontStyles,
  waitForList,
} from "./utils";

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.BASIC));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page as any);
  await waitForList(page);
});

test("move the first item to second position", async ({ page }) => {
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");
  expect(await getListItems(page as any)).toEqual([
    "Item 2",
    "Item 1",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
  await page.mouse.click(1, 1);
  await expect(page).toHaveScreenshot();
});

test("move the sixth item to fifth position", async ({ page }) => {
  await page.keyboard.down("Shift");
  await page.keyboard.press("Tab");
  await page.keyboard.up("Shift");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Space");
  expect(await getListItems(page as any)).toEqual([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 6",
    "Item 5",
  ]);
  await page.mouse.click(1, 1);
  await expect(page).toHaveScreenshot();
});

test("move 1->5, 6->2 and 3->5", async ({ page }) => {
  // 1->5
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");

  // 6->2
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("ArrowUp");
  await page.keyboard.press("Space");

  // 3->5
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Space");

  expect(await getListItems(page as any)).toEqual([
    "Item 2",
    "Item 6",
    "Item 4",
    "Item 5",
    "Item 3",
    "Item 1",
  ]);
  await page.mouse.click(1, 1);
  await expect(page).toHaveScreenshot();
});

test("cancel the move of first item to second position", async ({ page }) => {
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowDown");
  await page.keyboard.press("Escape");
  expect(await getListItems(page as any)).toEqual([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
  await page.mouse.click(1, 1);
  await expect(page).toHaveScreenshot();
});

test("cancel the move of first item to second with mouse click", async ({
  page,
}) => {
  await page.keyboard.press("Tab");
  await page.keyboard.press("Space");
  await page.keyboard.press("ArrowDown");
  await page.mouse.click(1, 1);
  expect(await getListItems(page as any)).toEqual([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
  await page.mouse.click(1, 1);
  await expect(page).toHaveScreenshot();
});
