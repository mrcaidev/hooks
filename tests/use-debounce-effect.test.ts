import { renderHook } from "@testing-library/react";
import { useDebounceEffect } from "src";

beforeAll(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

it("triggers effect only once after multiple updates", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    (count) => useDebounceEffect(effect, [count]),
    { initialProps: 0 },
  );

  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(500);

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
    { initialProps: 0 },
  );

  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(100);

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

it("responds to dynamic `timeout`", () => {
  const effect = vi.fn();

  const { rerender } = renderHook(
    ({ count, timeout }) => useDebounceEffect(effect, [count], { timeout }),
    { initialProps: { count: 0, timeout: 500 } },
  );

  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(500);

  expect(effect).toHaveBeenCalledTimes(0);

  rerender({ count: 1, timeout: 500 });
  vi.advanceTimersByTime(499);
  rerender({ count: 1, timeout: 100 });
  vi.advanceTimersByTime(1);

  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(98);

  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);

  expect(effect).toHaveBeenCalledTimes(1);
});

it("can run on mount", () => {
  const effect = vi.fn();

  renderHook(() => useDebounceEffect(effect, [], { onMount: true }));

  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(499);

  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);

  expect(effect).toHaveBeenCalledTimes(1);
});
