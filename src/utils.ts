export function arrayMove<T>(array: T[], from: number, to: number) {
  array = array.slice();
  array.splice(to < 0 ? array.length + to : to, 0, array.splice(from, 1)[0]);
  return array;
}

export function getTranslateOffset(item: React.RefObject<HTMLElement>) {
  const element = item.current!;
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
  if (offsetY === null || offsetX === null) {
    item.current!.style.transform = null;
    return;
  }
  item.current!.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0px)`;
}

export function isItemTransformed(item: React.RefObject<HTMLElement>) {
  return !!item.current!.style.transform;
}

export function setItemTransition(
  item: React.RefObject<HTMLElement>,
  duration: number
) {
  item.current!.style['transition-duration' as any] = `${duration}ms`;
}
