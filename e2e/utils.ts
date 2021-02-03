import * as puppeteer from 'puppeteer';

export enum Examples {
  BASIC,
  HEIGHTS,
  SCROLLING_CONTAINER,
  SCROLLING_WINDOW,
  REMOVABLE
}

export const getTestUrl = (example: Examples): string => {
  const PORT = 61000;
  switch (example) {
    case Examples.BASIC:
      return `http://localhost:${PORT}/?story=list--basic&mode=preview`;
    case Examples.HEIGHTS:
      return `http://localhost:${PORT}/?story=list--varying-heights&mode=preview`;
    case Examples.SCROLLING_CONTAINER:
      return `http://localhost:${PORT}/?story=list--scrolling-container&mode=preview`;
    case Examples.SCROLLING_WINDOW:
      return `http://localhost:${PORT}/?story=list--scrolling-window&mode=preview`;
    case Examples.REMOVABLE:
      return `http://localhost:${PORT}/?story=list--removable-by-move&mode=preview`;
  }
};

export const getListItems = async (page: puppeteer.Page) => {
  const items = await page.$$('#ladle-root li');
  await page.waitForTimeout(200);
  return await Promise.all(
    items.map((item) => page.evaluate((el) => el.innerText, item))
  );
};

export const waitForList = async (page: puppeteer.Page) => {
  await page.waitForSelector(`#ladle-root li`);
};

export const makeDnd = async (
  mouse: puppeteer.Mouse,
  from: number,
  to: number,
  positions: number[][]
) => {
  await mouse.move(positions[from - 1][0], positions[from - 1][1]);
  await mouse.down();
  await mouse.move(positions[to - 1][0], positions[to - 1][1]);
  await mouse.up();
  // make sure that originally dragged item is visible (rendered)
  // in a new place
  await page.waitForSelector(`#ladle-root li:nth-child(${from})`, {
    visible: true
  });
};

export const trackMouse = async (page: puppeteer.Page) => {
  await page.evaluate(showCursor);
};

export const untrackMouse = async (page: puppeteer.Page) => {
  await page.evaluate(hideCursor);
  await page.waitForSelector('.mouse-helper', { hidden: true });
};

export const addFontStyles = async (page: puppeteer.Page) => {
  await page.evaluate(fontStyles);
};

// This injects a box into the page that moves with the mouse;
// Useful for debugging
const showCursor = () => {
  const box = document.createElement('div');
  box.classList.add('mouse-helper');
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
  .mouse-helper {
    pointer-events: none;
    position: absolute;
    top: 0;
    left: 0;
    width: 20px;
    height: 20px;
    background: rgba(0,0,0,.4);
    border: 1px solid white;
    border-radius: 10px;
    margin-left: -10px;
    margin-top: -10px;
    transition: background .2s, border-radius .2s, border-color .2s;
    z-index: 5000;
  }
  .mouse-helper.button-1 {
    transition: none;
    background: rgba(0,0,0,0.9);
  }
  .mouse-helper.button-2 {
    transition: none;
    border-color: rgba(0,0,255,0.9);
  }
  .mouse-helper.button-3 {
    transition: none;
    border-radius: 4px;
  }
  .mouse-helper.button-4 {
    transition: none;
    border-color: rgba(255,0,0,0.9);
  }
  .mouse-helper.button-5 {
    transition: none;
    border-color: rgba(0,255,0,0.9);
  }
  `;

  const onMouseMove = (event: MouseEvent) => {
    box.style.left = event.pageX + 'px';
    box.style.top = event.pageY + 'px';
    updateButtons(event.buttons);
  };

  const onMouseDown = (event: MouseEvent) => {
    updateButtons(event.buttons);
    box.classList.add('button-' + event.which);
  };

  const onMouseUp = (event: MouseEvent) => {
    updateButtons(event.buttons);
    box.classList.remove('button-' + event.which);
  };

  document.head.appendChild(styleElement);
  document.body.appendChild(box);
  document.addEventListener('mousemove', onMouseMove, true);
  document.addEventListener('mousedown', onMouseDown, true);
  document.addEventListener('mouseup', onMouseUp, true);
  function updateButtons(buttons: any) {
    for (let i = 0; i < 5; i++)
      // @ts-ignore
      box.classList.toggle('button-' + i, buttons & (1 << i));
  }
};

// make the cursor invisble, good for visual snaps
const hideCursor = () => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
  .mouse-helper {
    display: none;
  }
  `;
  document.head.appendChild(styleElement);
};

// This injects a box into the page that moves with the mouse;
// Useful for debugging
const fontStyles = () => {
  const styleElement = document.createElement('style');
  styleElement.innerHTML = `
  body {
    margin: 8px;
  }
  li {
    font-weight: normal;
    font-style: normal;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
  }
  `;
  document.head.appendChild(styleElement);
};
