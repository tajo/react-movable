import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
  getListItems,
  makeDnd,
  waitForList
} from './utils';

jest.setTimeout(10000);

const POSITIONS = [
  [190, 111],
  [190, 190],
  [190, 263],
  [190, 346],
  [190, 418],
  [190, 501]
];

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.DISABLED_ITEMS));
  await page.setViewport({ width: 400, height: 800 });
  await addFontStyles(page as any);
  await waitForList(page);
});

test('dnd the first item to second position', async () => {
  await trackMouse(page as any);
  await makeDnd(page.mouse, 1, 2, POSITIONS);
  expect(await getListItems(page as any)).toEqual([
    'Item 2',
    'Item 1',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  await untrackMouse(page as any);
  expect(await page.screenshot()).toMatchImageSnapshot();
});

test('attempt to dnd the fourth item, should have no effect', async () => {
  await trackMouse(page as any);
  await makeDnd(page.mouse, 4, 1, POSITIONS);
  expect(await getListItems(page as any)).toEqual([
    'Item 1',
    'Item 2',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  await untrackMouse(page as any);
  expect(await page.screenshot()).toMatchImageSnapshot();
});
