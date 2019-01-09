export function arrayMove<T>(array: T[], from: number, to: number) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

export function getElementSize(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  const height =
    //parseInt(style['margin-top' as any], 10) +
    parseInt(style['margin-bottom' as any], 10) +
    element.getBoundingClientRect().height;

  const width =
    parseInt(style['margin-left' as any], 10) +
    parseInt(style['margin-right' as any], 10) +
    element.getBoundingClientRect().width;
  return { height, width };
}
