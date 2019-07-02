import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
  getListItems
} from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.REMOVABLE));
  await page.setViewport({ width: 1030, height: 800 });
  await addFontStyles(page);
});

test('dnd the second item out the bounds to be removed', async () => {
  await trackMouse(page);
  await page.mouse.move(517, 275);
  await page.mouse.down();
  await page.mouse.move(828, 222);
  await page.mouse.up();
  // make sure that originally dragged item is visible (rendered)
  // in a new place
  await page.waitForSelector(`#root li:nth-child(1)`, {
    visible: true
  });
  expect(await getListItems(page)).toEqual([
    'You can remove items by moving them far left or right. Also, onChange always gives you the getBoundingClientRect of the dropped item.',
    'Item 3',
    'Item 4',
    'Item 5',
    'Item 6'
  ]);
  await untrackMouse(page);
});
