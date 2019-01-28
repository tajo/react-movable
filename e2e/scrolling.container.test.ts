import { Examples, getTestUrl, trackMouse } from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.SCROLLING_CONTAINER));
  await page.setViewport({ width: 400, height: 800 });
});

test('scroll down', async () => {
  await trackMouse(page);
  await page.mouse.move(190, 140);
  await page.mouse.down();
  await page.mouse.move(190, 690);
  await page.waitFor(200);
  await page.mouse.up();
  const list = await page.$('#root ul');
  const scrollTop = await page.evaluate(el => el.scrollTop, list);
  expect(scrollTop).toBeGreaterThan(100);
});

test('scroll up', async () => {
  await trackMouse(page);
  const list = await page.$('#root ul');
  await page.evaluate(el => (el.scrollTop = 300), list);
  await page.mouse.move(190, 641);
  await page.mouse.down();
  await page.mouse.move(190, 100);
  await page.waitFor(200);
  await page.mouse.up();
  const scrollTop = await page.evaluate(el => el.scrollTop, list);
  expect(scrollTop).toBeLessThan(300);
});
