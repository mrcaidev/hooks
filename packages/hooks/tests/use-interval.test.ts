import { renderHook } from "@testing-library/react";
import { useInterval } from "src";

beforeAll(() => {
  vi.useFakeTimers();
});
afterAll(() => {
  vi.useRealTimers();
});
afterEach(() => {
  vi.clearAllTimers();
});

it("triggers effect after every timeout", () => {
  const effect = vi.fn();

  renderHook(() => useInterval(effect));
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(499);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(499);
  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(2);
});

it("can customize timeout", () => {
  const effect = vi.fn();

  renderHook(() => useInterval(effect, 100));
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(99);
  expect(effect).toHaveBeenCalledTimes(0);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(99);
  expect(effect).toHaveBeenCalledTimes(1);

  vi.advanceTimersByTime(1);
  expect(effect).toHaveBeenCalledTimes(2);
});
