import { test, expect } from "vitest";
import { arrayMove, arrayRemove, binarySearch } from "./utils";

const items = [1, 2, 3, 4, 5];
const values = [100, 200, 300, 400, 500];

test("arrayMove", () => {
  expect(arrayMove(items, 3, 0)).toEqual([4, 1, 2, 3, 5]);
  expect(arrayMove(items, -1, 0)).toEqual([5, 1, 2, 3, 4]);
  expect(arrayMove(items, 1, -2)).toEqual([1, 3, 4, 2, 5]);
  expect(arrayMove(items, -3, -4)).toEqual([1, 3, 2, 4, 5]);
});

test("arrayRemove", () => {
  expect(arrayRemove(items, 0)).toEqual([2, 3, 4, 5]);
  expect(arrayRemove(items, -1)).toEqual([1, 2, 3, 4]);
  expect(arrayRemove(items, -2)).toEqual([1, 2, 3, 5]);
  expect(arrayRemove(items, 3)).toEqual([1, 2, 3, 5]);
});

test("binarySearch", () => {
  expect(binarySearch(values, 50)).toBe(-1);
  expect(binarySearch(values, 150)).toBe(0);
  expect(binarySearch(values, 250)).toBe(1);
  expect(binarySearch(values, 399)).toBe(2);
  expect(binarySearch(values, 400)).toBe(2);
  expect(binarySearch(values, 401)).toBe(3);
  expect(binarySearch(values, 1000)).toBe(4);
});
