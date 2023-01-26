import { renderHook } from "@testing-library/react";
import { useThrottle } from "src/use-throttle";

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});
afterEach(() => {
  vi.clearAllTimers();
});

it("updates value only once in a period", () => {
  const { result, rerender } = renderHook((count) => useThrottle(count), {
    initialProps: 0,
  });
  expect(result.current).toEqual(0);

  rerender(1);
  expect(result.current).toEqual(1);

  vi.advanceTimersByTime(499);
  rerender(2);
  rerender(3);
  rerender(4);
  expect(result.current).toEqual(1);

  vi.advanceTimersByTime(1);
  rerender(5);
  expect(result.current).toEqual(5);
});

it("can customize timeout", () => {
  const { result, rerender } = renderHook(
    (count) => useThrottle(count, { timeout: 100 }),
    { initialProps: 0 }
  );
  expect(result.current).toEqual(0);

  rerender(1);
  expect(result.current).toEqual(1);

  vi.advanceTimersByTime(99);
  rerender(2);
  rerender(3);
  rerender(4);
  expect(result.current).toEqual(1);

  vi.advanceTimersByTime(1);
  rerender(5);
  expect(result.current).toEqual(5);
});

it("can start timing on mount", () => {
  const { result, rerender } = renderHook(
    (count) => useThrottle(count, { onMount: true }),
    { initialProps: 0 }
  );
  expect(result.current).toEqual(0);

  rerender(1);
  expect(result.current).toEqual(0);

  vi.advanceTimersByTime(499);
  rerender(2);
  rerender(3);
  rerender(4);
  expect(result.current).toEqual(0);

  vi.advanceTimersByTime(1);
  rerender(5);
  expect(result.current).toEqual(5);
});
