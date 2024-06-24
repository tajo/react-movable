import { Examples, getTestUrl, trackMouse, waitForList } from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.SCROLLING_CONTAINER));
  await page.setViewport({ width: 400, height: 800 });
  await waitForList(page);
});

test('scroll down', async () => {
  await trackMouse(page as any);
  await page.mouse.move(190, 140);
  await page.mouse.down();
  await page.mouse.move(190, 690);
  await new Promise((r) => setTimeout(r, 200));
  await page.mouse.up();
  const list = await page.$('#ladle-root ul');
  const scrollTop = await page.evaluate((el) => {
    if (el) {
      return el.scrollTop;
    }
  }, list);
  expect(scrollTop).toBeGreaterThan(0);
});

test('scroll up', async () => {
  await trackMouse(page as any);
  const list = await page.$('#ladle-root ul');
  await page.evaluate((el) => {
    if (el) {
      el.scrollTop = 300;
    }
  }, list);
  await page.mouse.move(190, 641);
  await page.mouse.down();
  await page.mouse.move(190, 100);
  await new Promise((r) => setTimeout(r, 200));
  await page.mouse.up();
  const scrollTop = await page.evaluate((el) => {
    if (el) {
      return el.scrollTop;
    }
  }, list);
  expect(scrollTop).toBeLessThan(300);
});
