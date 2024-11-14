import { renderHook } from "@testing-library/react";
import { useInterval } from "src";

beforeAll(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.clearAllTimers();
});

afterAll(() => {
  vi.useRealTimers();
});

it("runs function after every interval", () => {
  const fn = vi.fn();

  renderHook(() => useInterval(fn));

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(499);

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);

  expect(fn).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(499);

  expect(fn).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);

  expect(fn).toHaveBeenCalledTimes(2);
});

it("can customize timeout", () => {
  const fn = vi.fn();

  renderHook(() => useInterval(fn, 100));

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(99);

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);

  expect(fn).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(99);

  expect(fn).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);

  expect(fn).toHaveBeenCalledTimes(2);
});

it("responds to dynamic `timeout`", () => {
  const fn = vi.fn();

  const { rerender } = renderHook((timeout) => useInterval(fn, timeout), {
    initialProps: 100,
  });

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(99);

  expect(fn).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);

  expect(fn).toHaveBeenCalledTimes(1);

  rerender(200);

  expect(fn).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(199);

  expect(fn).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);

  expect(fn).toHaveBeenCalledTimes(2);
});
