import { test, expect } from "@playwright/test";
import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
  getListItems,
  makeDnd,
  waitForList,
} from "./utils";

const getPositions = (yPositions: number[]) => {
  return [
    [190, yPositions[0] || 1],
    [190, yPositions[1] || 1],
    [190, yPositions[2] || 1],
    [190, yPositions[3] || 1],
    [190, yPositions[4] || 1],
  ];
};

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.HEIGHTS));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page as any);
  await addFontStyles(page as any);
  await waitForList(page);
});

test("dnd the first item to second position", async ({ page }) => {
  await trackMouse(page as any);
  await makeDnd(page, page.mouse, 1, 2, getPositions([111, 190]));
  expect(await getListItems(page as any)).toEqual([
    "100px Item 2",
    "70px Item 1",
    "70px Item 3",
    "70px Item 4",
    "150px Item 5",
  ]);
  await untrackMouse(page as any);
  await expect(page).toHaveScreenshot();
});

test("dnd the fifth item to fourth position", async ({ page }) => {
  await trackMouse(page as any);
  await makeDnd(page, page.mouse, 5, 4, getPositions([0, 0, 0, 395, 493]));
  expect(await getListItems(page as any)).toEqual([
    "70px Item 1",
    "100px Item 2",
    "70px Item 3",
    "150px Item 5",
    "70px Item 4",
  ]);
  await untrackMouse(page as any);
  await expect(page).toHaveScreenshot();
});

test("dnd 1->5, 4->2 and 3->5", async ({ page }) => {
  await trackMouse(page as any);
  await makeDnd(page, page.mouse, 1, 5, getPositions([108, 0, 0, 0, 491]));
  await makeDnd(page, page.mouse, 4, 2, getPositions([0, 228, 0, 419, 0]));
  await makeDnd(page, page.mouse, 3, 5, getPositions([0, 0, 373, 0, 536]));
  expect(await getListItems(page as any)).toEqual([
    "100px Item 2",
    "150px Item 5",
    "70px Item 4",
    "70px Item 1",
    "70px Item 3",
  ]);
  await untrackMouse(page as any);
  await expect(page).toHaveScreenshot();
});
