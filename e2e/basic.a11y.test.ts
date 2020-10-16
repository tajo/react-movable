import * as puppeteer from 'puppeteer';
import { Examples, getTestUrl, getListItems, addFontStyles } from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.BASIC));
  await page.setViewport({ width: 400, height: 800 });
  await addFontStyles(page as any);
});

test('move the first item to second position', async () => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Space');
  expect(await getListItems(page as any)).toEqual([
    'Item 2',
    'Item 1',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  await page.mouse.click(1, 1);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('move the sixth item to fifth position', async () => {
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('Space');
  expect(await getListItems(page as any)).toEqual([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 6',
    'Item 5'
  ]);
  await page.mouse.click(1, 1);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('move 1->5, 6->2 and 3->5', async () => {
  // 1->5
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Space');

  // 6->2
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('Space');

  // 3->5
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Space');

  expect(await getListItems(page as any)).toEqual([
    'Item 2',
    'Item 6',
    'Item 4',
    'Item 5',
    'Item 3',
    'Item 1'
  ]);
  await page.mouse.click(1, 1);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('cancel the move of first item to second position', async () => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Escape');
  expect(await getListItems(page as any)).toEqual([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  await page.mouse.click(1, 1);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('cancel the move of first item to second with mouse click', async () => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await page.mouse.click(1, 1);
  expect(await getListItems(page as any)).toEqual([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  await page.mouse.click(1, 1);
  expect(await page.screenshot()).toMatchImageSnapshot();
});
