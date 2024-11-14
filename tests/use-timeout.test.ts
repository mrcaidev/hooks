import { renderHook } from "@testing-library/react";
import { useTimeout } from "src";

beforeAll(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

it("runs function after timeout", () => {
  const fn = vi.fn();

  renderHook(() => useTimeout(fn));

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(499);

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);

  expect(fn).toHaveBeenCalledTimes(1);
});

it("can customize `timeout`", () => {
  const fn = vi.fn();

  renderHook(() => useTimeout(fn, 100));

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(99);

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);

  expect(fn).toHaveBeenCalledTimes(1);
});

it("responds to dynamic `timeout`", () => {
  const fn = vi.fn();

  const { rerender } = renderHook((timeout) => useTimeout(fn, timeout), {
    initialProps: 100,
  });

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(99);

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);

  expect(fn).toHaveBeenCalledTimes(1);

  rerender(200);

  vi.advanceTimersByTime(199);

  expect(fn).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);

  expect(fn).toHaveBeenCalledTimes(2);
});
