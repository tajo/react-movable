import {
  Examples,
  getTestUrl,
  getListItems,
  addFontStyles,
  waitForList
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.HEIGHTS));
  await page.setViewport({ width: 400, height: 800 });
  await addFontStyles(page as any);
  await waitForList(page);
});

test('move the first item to second position', async () => {
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Space');
  expect(await getListItems(page as any)).toEqual([
    '100px Item 2',
    '70px Item 1',
    '70px Item 3',
    '70px Item 4',
    '150px Item 5'
  ]);
  await page.mouse.click(1, 1);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('move the fifth item to fourth position', async () => {
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowUp');
  await page.keyboard.press('Space');
  expect(await getListItems(page as any)).toEqual([
    '70px Item 1',
    '100px Item 2',
    '70px Item 3',
    '150px Item 5',
    '70px Item 4'
  ]);
  await page.mouse.click(1, 1);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('move 1->5, 4->2 and 3->5', async () => {
  // 1->5
  await page.keyboard.press('Tab');
  await page.keyboard.press('Space');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('ArrowDown');
  await page.keyboard.press('Space');

  // 4->2
  await page.keyboard.down('Shift');
  await page.keyboard.press('Tab');
  await page.keyboard.up('Shift');
  await page.keyboard.press('Space');
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
    '100px Item 2',
    '150px Item 5',
    '70px Item 4',
    '70px Item 1',
    '70px Item 3'
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
    '70px Item 1',
    '100px Item 2',
    '70px Item 3',
    '70px Item 4',
    '150px Item 5'
  ]);
  await page.mouse.click(1, 1);
  expect(await page.screenshot()).toMatchImageSnapshot();
});
