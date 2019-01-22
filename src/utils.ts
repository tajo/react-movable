export function arrayMove<T>(array: T[], from: number, to: number) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

export function arrayRemove<T>(array: T[], index: number) {
  array = array.slice();
  array.splice(index, 1);
  return array;
}

export function getTranslateOffset(element: Element) {
  const style = window.getComputedStyle(element);
  return (
    Math.max(
      parseInt(style['margin-top' as any], 10),
      parseInt(style['margin-bottom' as any], 10)
    ) + element.getBoundingClientRect().height
  );
}

export function transformItem(
  element: Element,
  offsetY: number | null = 0,
  offsetX: number | null = 0
) {
  if (offsetY === null || offsetX === null) {
    (element as HTMLElement).style.removeProperty('transform');
    return;
  }
  (element as HTMLElement).style.transform = `translate(${offsetX}px, ${offsetY}px)`;
}

export function isItemTransformed(element: Element) {
  return !!(element as HTMLElement).style.transform;
}

export function setItemTransition(element: Element, duration: number) {
  (element as HTMLElement).style[
    'transition-duration' as any
  ] = `${duration}ms`;
}

export function binarySearch(array: number[], targetValue: number) {
  let min = 0;
  let max = array.length - 1;
  let guess: number;
  while (min <= max) {
    guess = Math.floor((max + min) / 2);
    if (
      !array[guess + 1] ||
      (array[guess] <= targetValue && array[guess + 1] >= targetValue)
    ) {
      return guess;
    } else if (array[guess] < targetValue && array[guess + 1] < targetValue) {
      min = guess + 1;
    } else {
      max = guess - 1;
    }
  }
  return -1;
}
