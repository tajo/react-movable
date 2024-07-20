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

const POSITIONS = [
  [190, 111],
  [190, 190],
  [190, 263],
  [190, 346],
  [190, 418],
  [190, 501],
];

test.beforeEach(async ({ page }) => {
  await page.goto(getTestUrl(Examples.DISABLED_LIST));
  await page.waitForSelector("[data-storyloaded]");
  await addFontStyles(page as any);
  await waitForList(page);
});

test("attempt to dnd the first item to second position, should have no effect", async ({
  page,
}) => {
  await trackMouse(page as any);
  await makeDnd(page, page.mouse, 1, 2, POSITIONS);
  expect(await getListItems(page as any)).toEqual([
    "Item 1",
    "Item 2",
    "Item 3",
    "Item 4",
    "Item 5",
    "Item 6",
  ]);
  await untrackMouse(page as any);
  await expect(page).toHaveScreenshot();
});
