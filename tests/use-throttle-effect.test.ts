import { renderHook } from "@testing-library/react";
import { useThrottleEffect } from "src";

beforeAll(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

it("triggers effect only once in a while", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    (count) => useThrottleEffect(effect, [count]),
    { initialProps: 0 },
  );

  expect(effect).toHaveBeenCalledTimes(0);

  rerender(1);

  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(499);
  rerender(2);
  rerender(3);
  rerender(4);

  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);
  rerender(5);

  expect(effect).toHaveBeenCalledTimes(2);
});

it("can customize `timeout`", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    (count) => useThrottleEffect(effect, [count], { timeout: 100 }),
    { initialProps: 0 },
  );

  expect(effect).toHaveBeenCalledTimes(0);

  rerender(1);

  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(99);
  rerender(2);
  rerender(3);
  rerender(4);

  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);
  rerender(5);

  expect(effect).toHaveBeenCalledTimes(2);
});

it("responds to dynamic `timeout`", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    ({ count, timeout }) => useThrottleEffect(effect, [count], { timeout }),
    { initialProps: { count: 0, timeout: 100 } },
  );

  expect(effect).toHaveBeenCalledTimes(0);

  rerender({ count: 1, timeout: 200 });

  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(199);
  rerender({ count: 2, timeout: 200 });
  rerender({ count: 3, timeout: 200 });
  rerender({ count: 4, timeout: 200 });

  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);
  rerender({ count: 5, timeout: 200 });

  expect(effect).toHaveBeenCalledTimes(2);
});

it("can run on mount", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    (count) => useThrottleEffect(effect, [count], { onMount: true }),
    { initialProps: 0 },
  );

  expect(effect).toHaveBeenCalledTimes(1);

  rerender(1);

  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(499);
  rerender(2);
  rerender(3);
  rerender(4);

  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);
  rerender(5);

  expect(effect).toHaveBeenCalledTimes(2);
});
