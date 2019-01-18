declare export function arrayMove<T>(array: T[], from: number, to: number): T[];
declare export function arrayRemove<T>(array: T[], index: number): T[];
declare export function getTranslateOffset(element: Element): number;
declare export function transformItem(
  element: Element,
  offsetY?: number | null,
  offsetX?: number | null
): void;
declare export function isItemTransformed(element: Element): boolean;
declare export function setItemTransition(
  element: Element,
  duration: number
): void;
declare export function binarySearch(
  array: number[],
  targetValue: number
): number;
