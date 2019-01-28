import {
  Examples,
  getTestUrl,
  trackMouse,
  untrackMouse,
  addFontStyles,
  getListItems,
  makeDnd
} from './utils';

jest.setTimeout(10000);

const getPositions = (yPositions: number[]) => {
  return [
    [190, yPositions[0] || 1],
    [190, yPositions[1] || 1],
    [190, yPositions[2] || 1],
    [190, yPositions[3] || 1],
    [190, yPositions[4] || 1]
  ];
};

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.HEIGHTS));
  await page.setViewport({ width: 400, height: 800 });
  await addFontStyles(page);
  await addFontStyles(page);
});

test('dnd the first item to second position', async () => {
  await trackMouse(page);
  await makeDnd(page.mouse, 1, 2, getPositions([111, 190]));
  expect(await getListItems(page)).toEqual([
    '100px Item 2',
    '70px Item 1',
    '70px Item 3',
    '70px Item 4',
    '150px Item 5'
  ]);
  await untrackMouse(page);
  //expect(await page.screenshot()).toMatchImageSnapshot();
});

test.only('dnd the fifth item to fourth position', async () => {
  await trackMouse(page);
  await makeDnd(page.mouse, 5, 4, getPositions([0, 0, 0, 395, 493]));
  expect(await getListItems(page)).toEqual([
    '70px Item 1',
    '100px Item 2',
    '70px Item 3',
    '150px Item 5',
    '70px Item 4'
  ]);
  await untrackMouse(page);
  //expect(await page.screenshot()).toMatchImageSnapshot();
});

// test('dnd 1->5, 6->2 and 3->5', async () => {
//   await trackMouse(page);
//   await makeDnd(page.mouse, 1, 5, POSITIONS);
//   await makeDnd(page.mouse, 6, 2, POSITIONS);
//   await makeDnd(page.mouse, 3, 5, POSITIONS);
//   expect(await getListItems(page)).toEqual([
//     'Item 2',
//     'Item 6',
//     'Item 4',
//     'Item 5',
//     'Item 3',
//     'Item 1'
//   ]);
//   await untrackMouse(page);
//   expect(await page.screenshot()).toMatchImageSnapshot();
// });
