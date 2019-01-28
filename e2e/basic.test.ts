import {
  Examples,
  getTestUrl,
  trackMouse,
  getListItems,
  makeDnd
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

describe('Basic example', () => {
  beforeEach(async () => {
    await page.goto(getTestUrl(Examples.BASIC));
    await page.setViewport({ width: 400, height: 800 });
    await trackMouse(page);
  });

  it('dnd the first item to second position', async () => {
    await makeDnd(page.mouse, 1, 2, POSITIONS);
    expect(await getListItems(page)).toEqual([
      'Item 2',
      'Item 1',
      'Item 3',
      'Item 4',
      'Item 5',
      'Item 6'
    ]);
  });

  it('dnd the sixth item to fifth position', async () => {
    await makeDnd(page.mouse, 6, 5, POSITIONS);
    expect(await getListItems(page)).toEqual([
      'Item 1',
      'Item 2',
      'Item 3',
      'Item 4',
      'Item 6',
      'Item 5'
    ]);
  });

  it('dnd 1->5, 6->2 and 3->5', async () => {
    await makeDnd(page.mouse, 1, 5, POSITIONS);
    await makeDnd(page.mouse, 6, 2, POSITIONS);
    await makeDnd(page.mouse, 3, 5, POSITIONS);
    expect(await getListItems(page)).toEqual([
      'Item 2',
      'Item 6',
      'Item 4',
      'Item 5',
      'Item 3',
      'Item 1'
    ]);
  });
});
