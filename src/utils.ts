export function arrayMove<T>(array: T[], from: number, to: number) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

export function getTranslateOffset(element: HTMLElement) {
  const style = window.getComputedStyle(element);
  return (
    Math.max(
      parseInt(style['margin-top' as any], 10),
      parseInt(style['margin-bottom' as any], 10)
    ) + element.getBoundingClientRect().height
  );
}
