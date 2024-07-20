import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
  getListItems,
  waitForList
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.REMOVABLE));
  await page.setViewport({ width: 1030, height: 800 });
  await addFontStyles(page as any);
  await waitForList(page);
});

test('dnd the second item out the bounds to be removed', async () => {
  await trackMouse(page as any);
  await page.mouse.move(517, 275);
  await page.mouse.down();
  await page.mouse.move(828, 222);
  await page.mouse.up();
  await new Promise((r) => setTimeout(r, 300));
  expect(await getListItems(page as any)).toEqual([
    'You can remove items by moving them far left or right. Also, onChange always gives you the getBoundingClientRect of the dropped item.',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  await untrackMouse(page as any);
});
