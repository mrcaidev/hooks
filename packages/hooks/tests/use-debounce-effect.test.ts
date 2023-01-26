import { renderHook } from "@testing-library/react";
import { useDebounceEffect } from "src";

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});
afterEach(() => {
  vi.clearAllTimers();
});

it("triggers effect only once after continuous updates", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    (count) => useDebounceEffect(effect, [count]),
    { initialProps: 0 }
  );
  expect(effect).toHaveBeenCalledTimes(0);

  rerender(1);
  vi.advanceTimersByTime(499);
  rerender(2);
  vi.advanceTimersByTime(499);
  rerender(3);
  vi.advanceTimersByTime(499);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);
});

it("can customize timeout", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    (count) => useDebounceEffect(effect, [count], { timeout: 100 }),
    { initialProps: 0 }
  );
  expect(effect).toHaveBeenCalledTimes(0);

  rerender(1);
  vi.advanceTimersByTime(99);
  rerender(2);
  vi.advanceTimersByTime(99);
  rerender(3);
  vi.advanceTimersByTime(99);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);
});

it("can start timing on mount", () => {
  const effect = vi.fn();

  renderHook(() => useDebounceEffect(effect, [], { onMount: true }));
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(499);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);
});
