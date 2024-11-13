import { renderHook } from "@testing-library/react";
import { useThrottle } from "src";

beforeAll(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

it("updates value only once in a while", () => {
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

it("can customize `timeout`", () => {
  const { result, rerender } = renderHook(
    (count) => useThrottle(count, { timeout: 100 }),
    { initialProps: 0 },
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

it("responds to dynamic `timeout`", () => {
  const { result, rerender } = renderHook(
    ({ count, timeout }) => useThrottle(count, { timeout }),
    { initialProps: { count: 0, timeout: 100 } },
  );

  expect(result.current).toEqual(0);

  rerender({ count: 1, timeout: 200 });

  expect(result.current).toEqual(1);

  vi.advanceTimersByTime(199);
  rerender({ count: 2, timeout: 200 });
  rerender({ count: 3, timeout: 200 });
  rerender({ count: 4, timeout: 200 });

  expect(result.current).toEqual(1);

  vi.advanceTimersByTime(1);
  rerender({ count: 5, timeout: 200 });

  expect(result.current).toEqual(5);
});

it("can run on mount", () => {
  const { result, rerender } = renderHook(
    (count) => useThrottle(count, { onMount: true }),
    { initialProps: 0 },
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
