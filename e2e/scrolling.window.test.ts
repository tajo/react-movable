import { Examples, getTestUrl, trackMouse } from './utils';

jest.setTimeout(10000);

beforeEach(async () => {
  await page.goto(getTestUrl(Examples.SCROLLING_WINDOW));
  await page.setViewport({ width: 400, height: 800 });
});

test('scroll down', async () => {
  await trackMouse(page);
  await page.mouse.move(190, 140);
  await page.mouse.down();
  await page.mouse.move(190, 690);
  await page.waitFor(200);
  await page.mouse.up();
  const pageYOffset = await page.evaluate(() => window.pageYOffset);
  expect(pageYOffset).toBeGreaterThan(100);
});

test('scroll up', async () => {
  await trackMouse(page);
  const list = await page.$('#root ul');
  await page.evaluate(() => window.scrollTo(0, 300));
  await page.mouse.move(190, 641);
  await page.mouse.down();
  await page.mouse.move(190, 100);
  await page.waitFor(200);
  await page.mouse.up();
  const pageYOffset = await page.evaluate(() => window.pageYOffset);
  expect(pageYOffset).toBe(0);
});
