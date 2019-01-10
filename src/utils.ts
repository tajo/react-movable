export function arrayMove<T>(array: T[], from: number, to: number) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

export function getTranslateOffset(item: React.RefObject<HTMLElement>) {
  const element = item.current;
  if (!element) return 0;
  const style = window.getComputedStyle(element);
  return (
    Math.max(
      parseInt(style['margin-top' as any], 10),
      parseInt(style['margin-bottom' as any], 10)
    ) + element.getBoundingClientRect().height
  );
}

export function transformItem(
  item: React.RefObject<HTMLElement>,
  offsetY: number | null = 0,
  offsetX: number | null = 0
) {
  if (!item.current) return;
  if (offsetY === null || offsetX === null) {
    item.current.style.transform = null;
    return;
  }
  item.current.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0px)`;
}

export function isItemTransformed(item: React.RefObject<HTMLElement>) {
  if (!item.current) return false;
  return !!item.current.style.transform;
}

export function setItemTransition(
  item: React.RefObject<HTMLElement>,
  duration: number
) {
  if (!item.current) return;
  item.current.style['transition-duration' as any] = `${duration}ms`;
}

export const throttle = (func: Function, limit: number) => {
  let inThrottle = false;
  return function(...args: any[]) {
    if (!inThrottle) {
      func.apply(null, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
};

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
