import { renderHook } from "@testing-library/react";
import { useThrottleEffect } from "src/use-throttle-effect";

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});
afterEach(() => {
  vi.clearAllTimers();
});

it("triggers effect only once in a period", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    (count) => useThrottleEffect(effect, [count]),
    { initialProps: 0 }
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

it("can customize timeout", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    (count) => useThrottleEffect(effect, [count], { timeout: 100 }),
    { initialProps: 0 }
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

it("can start timing on mount", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    (count) => useThrottleEffect(effect, [count], { onMount: true }),
    { initialProps: 0 }
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
